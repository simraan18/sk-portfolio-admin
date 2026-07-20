import FormSubmitButtons from "@/components/FormSubmitButtons";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  CardCategoryFormField,
  cardCategoryFormSchema,
} from "@/model/CardCategory";
import { routePath } from "@/routes/route-path";
import {
  useGetCardCategoryByIdQuery,
  useUpdateCardCategoryMutation,
} from "@/store/service/cardCategoryApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const CardCategoryUpdatePage = () => {
  // Hooks
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetCardCategoryByIdQuery(id || "", {
    skip: !id,
  });

  const [updateCardCategory, { isLoading }] = useUpdateCardCategoryMutation();

  const form = useForm<z.infer<typeof cardCategoryFormSchema>>({
    resolver: zodResolver(cardCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  // States

  // Effects
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.response?.name ?? "",
        description: data.response?.description ?? "",
      });
    }
  }, [data]);

  // Functions
  const onSubmit = async (
    formValues: z.infer<typeof cardCategoryFormSchema>,
  ) => {
    try {
      await updateCardCategory({
        id: id || "",
        payload: {
          name: formValues["name"],
          description: formValues["description"],
        },
      });
      toast.success("Card Category updated successfully");
      navigate(routePath.cardCategoy);
    } catch (error) {
      apiError(error);
    }
  };

  if (isFetching) return <Loading />;

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Card Category"
        description="Manage card category"
        backPath={routePath.cardCategoy}
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          {CardCategoryFormField(form)}
          <FormSubmitButtons
            isLoading={isLoading}
            className="col-span-full"
            onReset={() => form.reset()}
            cancel
          />
        </FormLayout>
      </form>
    </Pagelayout>
  );
};

export default CardCategoryUpdatePage;
