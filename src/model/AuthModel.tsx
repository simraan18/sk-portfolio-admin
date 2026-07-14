import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const formSchema = z.object({
  email: z
    .email({ error: "Invalid email" })
    .nonempty({ error: "Email required" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export const FormFields = (
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>,
) => (
  <>
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
            placeholder="john@domain.com"
            autoComplete="off"
            type="email"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="password"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            {...field}
            id="password"
            aria-invalid={fieldState.invalid}
            placeholder="Password"
            autoComplete="off"
            type="password"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </>
);
