import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AdminBaseEntity } from "@/vite-env";
import type { ColumnDef } from "@tanstack/react-table";
import { Controller, type useForm } from "react-hook-form";
import z from "zod";

export interface SocialLink extends AdminBaseEntity {
  label: string;
  platform: string;
  title: string;
  url: string;
}

export const Columns: ColumnDef<SocialLink>[] = [
  {
    accessorKey: "title",
    header: "Title",
    id: "title",
  },
  {
    accessorKey: "label",
    header: "Label",
    id: "label",
  },
  {
    accessorKey: "platform",
    header: "Platform",
    id: "platform",
  },
  {
    accessorKey: "url",
    header: "URL",
    id: "url",
  },
];

export const socialLinkFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  label: z.string().min(1, "Label is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().min(1, "URL is required"),
});

export const SocialLinkFormField = (
  form: ReturnType<typeof useForm<z.infer<typeof socialLinkFormSchema>>>,
) => (
  <>
    <Controller
      name="title"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            {...field}
            id="title"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />

    <Controller
      name="label"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="label">Label</FieldLabel>
          <Input
            {...field}
            id="label"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />

    <Controller
      name="platform"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="platform">Platform</FieldLabel>
          <Input
            {...field}
            id="platform"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />

    <Controller
      name="url"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="url">URL</FieldLabel>
          <Input
            {...field}
            id="url"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  </>
);
