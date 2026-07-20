import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AdminBaseEntity } from "@/vite-env";
import type { ColumnDef } from "@tanstack/react-table";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export interface CardCategory extends AdminBaseEntity {
  name: string;
  description: string;
  slug: string;
}

export const columns: ColumnDef<CardCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
    id: "name",
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

export const cardCategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const CardCategoryFormField = (
  form: ReturnType<typeof useForm<z.infer<typeof cardCategoryFormSchema>>>,
) => (
  <>
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            {...field}
            id="name"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
    <Controller
      name="description"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input
            {...field}
            id="description"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  </>
);
