import type { AdminBaseEntity } from "@/vite-env";
import type { CardCategory } from "./CardCategory";
import type { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import TSelect from "@/components/TSelect";
import { useGetCardCategoriesQuery } from "@/store/service/cardCategoryApi";
import { Input } from "@/components/ui/input";

export interface Card extends AdminBaseEntity {
  title: string;
  description: string;
  slug: string;
  cardCategoryId: string;
  cardCategory: CardCategory;
}

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "title",
    header: "Title",
    id: "title",
  },
  {
    accessorKey: "description",
    header: "Description",
    id: "description",
  },
  {
    accessorKey: "slug",
    header: "Slug",
    id: "slug",
  },
];

export const cardFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  cardCategoryId: z.string().min(1, "Card Category is required"),
});

export const CardFormFields = (
  form: ReturnType<typeof useForm<z.infer<typeof cardFormSchema>>>,
) => (
  <>
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="title">Card Title</FieldLabel>
          <Input {...field} id="title" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="description"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="description">Card Description</FieldLabel>
          <Input
            {...field}
            id="description"
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="cardCategoryId"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="cardCategoryId">Card Category</FieldLabel>
          <TSelect
            labelKey="name"
            valueKey="id"
            useGetQuery={useGetCardCategoriesQuery}
            onChange={(ev) => {
              field.onChange(ev);
            }}
            queryArgs={undefined as void}
            value={field.value}
            id={field.name}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </>
);
