import FormSubmitButtons from "@/components/FormSubmitButtons";
import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import FormLayout from "@/layout/FormLayout";
import Pagelayout from "@/layout/Pagelayout";
import { CardFormFields, cardFormSchema } from "@/model/CardModel";
import { routePath } from "@/routes/route-path";
import {
  useGetCardByIdQuery,
  useUpdateCardMutation,
} from "@/store/service/cardApi";
import { apiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const CardUpdatePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useGetCardByIdQuery(id || "", {
    skip: !id,
  });

  const [updateCard, { isLoading }] = useUpdateCardMutation();

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardCategoryId: "",
      description: "",
      title: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.response) return;

    form.reset({
      cardCategoryId: data.response.cardCategoryId,
      description: data.response.description,
      title: data.response.title,
    });
  }, [data]);

  const onSubmit = async (formValues: z.infer<typeof cardFormSchema>) => {
    try {
      await updateCard({
        id: id || "",
        payload: {
          cardCategoryId: formValues.cardCategoryId,
          description: formValues.description,
          title: formValues.title,
        },
      });
      toast.success("Card updated successfully");
      navigate(routePath.card);
    } catch (error) {
      apiError(error);
    }
  };

  if (isFetching) return <Loading />;

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Card Update"
        backPath={routePath.card}
        description="Update a card"
      />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>{CardFormFields(form)}</FormLayout>
        <FormSubmitButtons isLoading={isLoading} cancel />
      </form>
    </Pagelayout>
  );
};

export default CardUpdatePage;
