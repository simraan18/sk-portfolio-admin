import DatePicker from "@/components/DatePicker";
import { Badge } from "@/components/ui/badge";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ViewResponsibilityModel from "@/page/Experience/Components/ViewResponsibilityModel";
import type { AdminBaseEntity } from "@/vite-env";
import type { ColumnDef } from "@tanstack/react-table";
import { Controller, type useForm } from "react-hook-form";
import z from "zod";

export interface Experience extends AdminBaseEntity {
  company: string;
  country: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities: any[];
  role: string;
  startDate: string;
  technologies: any[];
}

export const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: "company",
    header: "Company",
    id: "company",
  },
  {
    accessorKey: "role",
    header: "Role",
    id: "role",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    id: "startDate",
    cell: ({ row }) => {
      return <span>{new Date(row.original["startDate"]).getFullYear()}</span>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    id: "endDate",
    cell: ({ row }) => {
      const endDate = row.original?.["endDate"];
      if (!endDate) return <Badge variant={"outline"}>Present</Badge>;
      return <span>{new Date(endDate).getFullYear()}</span>;
    },
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    id: "technologies",
    cell: ({ row }) => {
      const technologies = row.original?.["technologies"];
      if (!technologies || technologies.length === 0) return <span>N/A</span>;
      return (
        <div className="flex flex-wrap gap-1">
          {technologies.map((tech: any) => (
            <Badge key={tech.id} variant="secondary">
              {tech.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "responsibilities",
    header: "Responsibilities",
    id: "responsibilities",
    cell: ({ row }) => {
      const responsibilities = row.original?.["responsibilities"];
      if (!responsibilities || responsibilities.length === 0)
        return <span>N/A</span>;
      return <ViewResponsibilityModel experience={row.original} />;
    },
  },
];

export const experienceFormSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.date({ error: "Start date is required" }),
  endDate: z.date().optional(),
  country: z.string().min(1, "Country is required"),
});

export const ExperienceFormFields = (
  form: ReturnType<typeof useForm<z.infer<typeof experienceFormSchema>>>,
) => (
  <>
    <Controller
      control={form.control}
      name="role"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <Input
            {...field}
            id="role"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={form.control}
      name="company"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Input
            {...field}
            id="company"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={form.control}
      name="country"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="country">Country</FieldLabel>
          <Input
            {...field}
            id="country"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={form.control}
      name="startDate"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
          <DatePicker
            onChange={(e) => {
              field.onChange(e);
            }}
            value={new Date(field.value)}
            id="startDate"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />

    <Controller
      control={form.control}
      name="endDate"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="endDate">End Date</FieldLabel>
          <DatePicker
            onChange={(e) => {
              field.onChange(e);
            }}
            value={field.value ? new Date(field.value) : undefined}
            id="endDate"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </>
);
