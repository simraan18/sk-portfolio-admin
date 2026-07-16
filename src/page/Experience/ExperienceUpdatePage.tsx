import FormSubmitButtons from "@/components/FormSubmitButtons";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  ExperienceFormFields,
  experienceFormSchema,
} from "@/model/ExperienceModel";
import { routePath } from "@/routes/route-path";
import {
  useGetExperienceByIdQuery,
  useUpdateExperienceMutation,
} from "@/store/service/experienceApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const ExperienceUpdatePage = () => {
  // Hooks
  const params = useParams<{ id: string }>();

  const { data, isFetching } = useGetExperienceByIdQuery(params.id || "", {
    skip: !params.id,
  });

  const [updateExperience] = useUpdateExperienceMutation();

  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: "",
      country: "",
      endDate: undefined,
      role: "",
      startDate: undefined,
    },
  });

  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(() => {
    if (!data?.response) return;
    form.reset({
      company: data.response.company,
      country: data.response.country,
      endDate: data.response.endDate
        ? new Date(data.response.endDate)
        : undefined,
      role: data.response.role,
      startDate: new Date(data.response.startDate),
    });
  }, [data?.response]);

  // Functions
  const onSubmit = async (data: z.infer<typeof experienceFormSchema>) => {
    setLoading(true);
    console.log(data);
    try {
      await updateExperience({
        id: params.id || "",
        payload: {
          company: data.company,
          country: data.country,
          endDate: data.endDate
            ? new Date(data.endDate).toISOString()
            : undefined,
          role: data.role,
          startDate: new Date(data.startDate).toISOString(),
          isCurrent: data.endDate ? false : true,
        },
      }).unwrap();
      toast.success("Experience updated successfully");
      navigate(routePath.experience);
    } catch (error) {
      apiError(error);
    }
  };

  // Constants

  if (isFetching) return <Loading />;

  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Experience Update"
          description="Manage portfolio experience section."
          backPath={routePath.experience}
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLayout>
            {ExperienceFormFields(form)}
            <FormSubmitButtons
              isLoading={loading}
              cancel
              className="col-span-full"
            />
          </FormLayout>
        </form>
      </div>
    </Pagelayout>
  );
};

export default ExperienceUpdatePage;
