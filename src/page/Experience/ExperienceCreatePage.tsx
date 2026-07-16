import FormSubmitButtons from "@/components/FormSubmitButtons";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  ExperienceFormFields,
  experienceFormSchema,
  type Experience,
} from "@/model/ExperienceModel";
import { routePath } from "@/routes/route-path";
import { useCreateExperienceMutation } from "@/store/service/experienceApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const ExperienceCreatePage = () => {
  // Hooks
  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: "",
      country: "",
      endDate: undefined,
      role: "",
      startDate: new Date(),
    },
  });

  const [createExperience] = useCreateExperienceMutation();

  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);
  // Effects

  // Functions
  const onSubmit = async (data: z.infer<typeof experienceFormSchema>) => {
    setLoading(true);
    try {
      const payload: Partial<Experience> = {
        company: data.company,
        country: data.country,
        endDate: data.endDate
          ? new Date(data.endDate).toISOString()
          : undefined,
        role: data.role,
        startDate: new Date(data.startDate).toISOString(),
        isCurrent: data.endDate ? true : false,
      };

      await createExperience(payload).unwrap();
      toast.success("Experience created successfully");
      navigate(routePath.experience);
    } catch (error) {
      apiError(error);
    }
    setLoading(false);
  };

  // Constants
  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Experience Create"
          backPath={routePath.experience}
          description="Create a new experience entry for your profile."
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLayout>
            {ExperienceFormFields(form)}
            <FormSubmitButtons isLoading={loading} className="col-span-full" />
          </FormLayout>
        </form>
      </div>
    </Pagelayout>
  );
};

export default ExperienceCreatePage;
