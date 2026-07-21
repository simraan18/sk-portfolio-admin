import FormSubmitButtons from "@/components/FormSubmitButtons";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  SocialLinkFormField,
  socialLinkFormSchema,
} from "@/model/SocialLinkModel";
import { routePath } from "@/routes/route-path";
import {
  useGetSocialLinkByIdQuery,
  useUpdateSocialLinkMutation,
} from "@/store/service/socialLinkApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const SocialLinkUpdatePage = () => {
  const [updateSocialLink, { isLoading }] = useUpdateSocialLinkMutation();

  const form = useForm<z.infer<typeof socialLinkFormSchema>>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: {
      title: "",
      label: "",
      url: "",
      platform: "",
    },
  });

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetSocialLinkByIdQuery(id || "", {
    skip: !id,
  });

  useEffect(() => {
    if (!data?.response) return;

    form.reset({
      title: data.response.title,
      label: data.response.label,
      url: data.response.url,
      platform: data.response.platform,
    });
  }, [data?.response]);

  const onSubmit = async (formValues: z.infer<typeof socialLinkFormSchema>) => {
    const payload = {
      title: formValues.title,
      label: formValues.label,
      url: formValues.url,
      platform: formValues.platform,
    };
    try {
      await updateSocialLink({ id: id!, payload }).unwrap();
      toast.success("Social Link updated successfully");
      navigate(routePath.socialLinks);
    } catch (error) {
      apiError(error);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Update Social Link"
        backPath={routePath.socialLinks}
        description="Manage portfolio social link section."
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          {SocialLinkFormField(form)}
          <FormSubmitButtons
            className="col-span-full"
            isLoading={isLoading}
            onReset={() => form.reset()}
            cancel
          />
        </FormLayout>
      </form>
    </Pagelayout>
  );
};

export default SocialLinkUpdatePage;
