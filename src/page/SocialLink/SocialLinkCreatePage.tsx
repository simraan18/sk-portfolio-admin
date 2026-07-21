import FormSubmitButtons from "@/components/FormSubmitButtons";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  SocialLinkFormField,
  socialLinkFormSchema,
} from "@/model/SocialLinkModel";
import { routePath } from "@/routes/route-path";
import { useCreateSocialLinkMutation } from "@/store/service/socialLinkApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const SocialLinkCreatePage = () => {
  const [createSocialLink, { isLoading }] = useCreateSocialLinkMutation();

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

  const onSubmit = async (formValues: z.infer<typeof socialLinkFormSchema>) => {
    try {
      await createSocialLink({
        title: formValues.title,
        label: formValues.label,
        url: formValues.url,
        platform: formValues.platform,
      }).unwrap();
      toast.success("Social Link created successfully");
      navigate(routePath.socialLinks);
    } catch (error) {
      apiError(error);
    }
  };

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Create Social Link"
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
          />
        </FormLayout>
      </form>
    </Pagelayout>
  );
};

export default SocialLinkCreatePage;
