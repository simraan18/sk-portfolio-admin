import FormSubmitButtons from "@/components/FormSubmitButtons";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import { CardFormFields, cardFormSchema } from "@/model/CardModel";
import { routePath } from "@/routes/route-path";
import { useCreateCardMutation } from "@/store/service/cardApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const CardCreatePage = () => {
  const [createCard, { isLoading }] = useCreateCardMutation();

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardCategoryId: "",
      description: "",
      title: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (formValues: z.infer<typeof cardFormSchema>) => {
    try {
      await createCard({
        cardCategoryId: formValues.cardCategoryId,
        description: formValues.description,
        title: formValues.title,
      }).unwrap();
      toast.success("Card created successfully");
      navigate(routePath.card);
    } catch (error) {
      apiError(error);
    }
  };

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Card Create"
        backPath={routePath.card}
        description="Create cards sections"
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>{CardFormFields(form)}</FormLayout>
        <FormSubmitButtons isLoading={isLoading} />
      </form>
    </Pagelayout>
  );
};

export default CardCreatePage;
