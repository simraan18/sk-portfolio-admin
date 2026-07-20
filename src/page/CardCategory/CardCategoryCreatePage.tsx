import FormSubmitButtons from "@/components/FormSubmitButtons";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import {
  CardCategoryFormField,
  cardCategoryFormSchema,
} from "@/model/CardCategory";
import { routePath } from "@/routes/route-path";
import { useCreateCardCategoryMutation } from "@/store/service/cardCategoryApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const CardCategoryCreatePage = () => {
  // hooks
  const form = useForm<z.infer<typeof cardCategoryFormSchema>>({
    resolver: zodResolver(cardCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createCardCategory, { isLoading }] = useCreateCardCategoryMutation();

  const navigate = useNavigate();

  // states

  // effects

  // functions
  const onSubmit = async (
    formValues: z.infer<typeof cardCategoryFormSchema>,
  ) => {
    try {
      await createCardCategory({
        description: formValues.description,
        name: formValues.name,
      }).unwrap();
      toast.success("Card Category created successfully");
      navigate(routePath.cardCategoy);
    } catch (error) {
      apiError(error);
    }
  };

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Card Category Create"
        backPath={routePath.cardCategoy}
        description="Create a card category"
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          {CardCategoryFormField(form)}
          <FormSubmitButtons
            isLoading={isLoading}
            className="col-span-full"
            onReset={() => form.reset()}
          />
        </FormLayout>
      </form>
    </Pagelayout>
  );
};

export default CardCategoryCreatePage;
