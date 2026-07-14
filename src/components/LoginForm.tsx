import { FormFields, formSchema } from "@/model/AuthModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Field, FieldGroup } from "./ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useSignInMutation } from "@/store/service/authApi";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/vite-env";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setAuthState, setToken } from "@/store/slice/auth-slice";
import { useNavigate } from "react-router";
import { routePath } from "@/routes/route-path";

const LoginForm = () => {
  const [signIn] = useSignInMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const data = await signIn({
        email: formValues.email,
        password: formValues.password,
      }).unwrap();
      dispatch(setAuthState("authenticated"));
      dispatch(setToken(data.response.access_token));
      navigate(routePath.home);
    } catch (error) {
      const message =
        (error as ApiErrorResponse)?.data?.message ?? "Something went wrong!";
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full sm:w-125">
      <Card className="w-full py-15">
        <CardHeader>
          <CardTitle className="text-primary">
            Welcome to SK Portfolio Admin Panel
          </CardTitle>
          <CardDescription>Login with admin credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
            id="sk-porfolio-login-form"
          >
            <FieldGroup>{FormFields(form)}</FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="sk-porfolio-login-form"
              disabled={loading}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
