import { Badge } from "@/components/ui/badge";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clipText } from "@/utils";
import type { AdminBaseEntity } from "@/vite-env";
import { type ColumnDef } from "@tanstack/react-table";
import { Controller, type useForm } from "react-hook-form";
import z from "zod";

export interface Profile extends AdminBaseEntity {
  aboutProfile: string;
  education: string;
  educationCountry: string;
  educationInstitue: string;
  email: string;
  experience: number;
  location: string;
  name: string;
  resumeUrl: string;
  roles: string[];
  title: string;
  topSkills: string[];
  visaStatus: string;
}

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Display Name",
  },
  {
    accessorKey: "title",
    id: "title",
    header: "Title",
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "education",
    id: "education",
    header: "Education",
    cell: ({ row }) => {
      const degree = row.original["education"];
      const educationCountry = row.original["educationCountry"];
      const educationInstitue = row.original["educationInstitue"];
      return (
        <div className="flex flex-col gap-2">
          <p>{degree}</p>
          <span className="text-[12px] text-muted-foreground">
            {educationInstitue} - {educationCountry}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "experience",
    id: "experience",
    header: "Experience",
    cell: ({ row }) => {
      return <span>{row.original["experience"] ?? 0} Years</span>;
    },
  },
  {
    accessorKey: "location",
    id: "location",
    header: "Curren Location",
  },
  {
    accessorKey: "visaStatus",
    id: "visaStatus",
    header: "Curren Visa Status",
    cell: ({ row }) => {
      const visaStatus = row.original["visaStatus"];
      return <span>{visaStatus ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "roles",
    id: "roles",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {row.original["roles"].map((role) => (
            <Badge variant={"outline"}>{role}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "topSkills",
    id: "topSkills",
    header: "Top Skills",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {row.original["topSkills"].map((skill) => (
            <Badge variant={"outline"}>{skill}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "aboutProfile",
    id: "aboutProfile",
    header: "About Me",
    cell: ({ row }) => {
      const text = row.original["aboutProfile"];
      if (!text) return "N/A";
      return <span title={text}>{clipText(text)}</span>;
    },
  },
];

export const profileFormSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  email: z.email().nonempty({ error: "Email is required" }),
  aboutProfile: z.string().nonempty({ error: "About profile is required" }),
  experience: z.string().nonempty({ error: "Experience is required" }),
  resumeUrl: z.string().optional(),
  education: z.string().nonempty({ error: "Education is required" }),
  educationInstitue: z
    .string()
    .nonempty({ error: "Education Institue is required" }),
  educationCountry: z
    .string()
    .nonempty({ error: "Education Country is required" }),
  location: z.string().nonempty({ error: "Current Location is required" }),
  visaStatus: z.string().optional(),
  topSkills: z
    .array(z.string())
    .min(1, { error: "You should add at least 1 skill" }),
  roles: z.array(z.string()).min(1, "You should add at least 1 role"),
});

export const ProfileFormFields = (
  form: ReturnType<typeof useForm<z.infer<typeof profileFormSchema>>>,
) => (
  <>
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="name">Display Name</FieldLabel>
          <Input
            {...field}
            id="name"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...field}
            id="email"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            type="email"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="aboutProfile"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="col-span-full">
          <FieldLabel htmlFor="aboutProfile">About Profile</FieldLabel>
          <Textarea
            {...field}
            id="aboutProfile"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="experience"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="experience">Experience</FieldLabel>
          <Input
            {...field}
            id="experience"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            type="number"
            min={1}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="resumeUrl"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="resumeUrl">Resume URL</FieldLabel>
          <Input
            {...field}
            id="resumeUrl"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="education"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="education">Education</FieldLabel>
          <Input
            {...field}
            id="education"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="educationInstitue"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="educationInstitue">
            Education Institue
          </FieldLabel>
          <Input
            {...field}
            id="educationInstitue"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="educationCountry"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="educationCountry">Education Country</FieldLabel>
          <Input
            {...field}
            id="educationCountry"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="location"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="location">Current location</FieldLabel>
          <Input
            {...field}
            id="location"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="visaStatus"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="visaStatus">Visa Status</FieldLabel>
          <Input
            {...field}
            id="visaStatus"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </>
);
