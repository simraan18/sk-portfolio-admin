import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Pagelayout from "@/layout/Pagelayout";
import { ProfileFormFields, profileFormSchema } from "@/model/ProfileModel";
import {
  profileApi,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/service/profileApi";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import FormSubmitButtons from "@/components/FormSubmitButtons";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { routePath } from "@/routes/route-path";
import { apiError } from "@/utils";

const ProfileUpdate = () => {
  // Hooks
  const selectProfile = profileApi.endpoints.getProfile.select();
  const { data: profileDataCached } = useSelector(selectProfile);

  const [fetchProfile, results] = useLazyGetProfileQuery();
  const { data: profileData, isFetching } = results;

  const [updateProfile] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      aboutProfile: "",
      experience: "",
      resumeUrl: "",
      education: "",
      educationInstitue: "",
      educationCountry: "",
      visaStatus: "",
      topSkills: [],
      roles: [],
      location: "",
    },
  });

  const {
    fields: topSkillFields,
    append: topSkillAppend,
    remove: topSkillRemove,
  } = useFieldArray({
    control: form.control,
    name: "topSkills" as never,
  });

  const {
    fields: rolesFields,
    append: roleAppend,
    remove: roleRemove,
  } = useFieldArray({
    control: form.control,
    name: "roles" as never,
  });

  const addNewSkillRef = useRef<HTMLInputElement>(null);
  const addNewRoleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // States
  const [isLoading, setIsLoading] = useState(false);

  // Effects
  useEffect(() => {
    if (!profileDataCached) {
      fetchProfile();
    }
  }, [profileDataCached]);

  useEffect(() => {
    if (!profileData && !profileDataCached) return;
    const data = profileDataCached ?? profileData;
    if (!data) return;
    form.reset({
      name: data.response.name ?? "",
      email: data.response.email ?? "",
      aboutProfile: data.response.aboutProfile ?? "",
      experience: String(data.response.experience) ?? "",
      resumeUrl: data.response.resumeUrl ?? "",
      education: data.response.education ?? "",
      educationInstitue: data.response.educationInstitue ?? "",
      educationCountry: data.response.educationCountry ?? "",
      visaStatus: data.response.visaStatus ?? "",
      topSkills: data.response.topSkills ?? [],
      roles: data.response.roles ?? [],
      location: data.response.location ?? "",
    });
  }, [profileData, profileDataCached]);

  // Functions
  const onSubmit = async (formValues: z.infer<typeof profileFormSchema>) => {
    try {
      setIsLoading(true);
      const data = profileDataCached ?? profileData;
      await updateProfile({
        id: data?.response.id!,
        payload: {
          ...data?.response,
          ...formValues,
          experience: Number(formValues.experience),
        },
      }).unwrap();
      toast.success("Profile updated successfully!");
      navigate(routePath.profile);
    } catch (error) {
      apiError(error);
    }
    setIsLoading(false);
  };

  // Constants

  if (isFetching) return <Loading />;

  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle title="Profile Update" backPath="/profile" />
        <form id="profile-update-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid sm:grid-cols-2  gap-4">
            {ProfileFormFields(form)}
            <FieldLabel className="col-span-full">Top Skills</FieldLabel>
            <InputGroup className="col-span-full sm:w-1/2">
              <InputGroupInput
                ref={addNewSkillRef}
                placeholder="Add a new skill"
              />
              <Button
                onClick={() => {
                  if (!addNewSkillRef.current?.value) return;
                  topSkillAppend(addNewSkillRef.current?.value);
                  addNewSkillRef.current.value = "";
                }}
                type="button"
                variant={"secondary"}
              >
                <Plus />
              </Button>
            </InputGroup>
            {topSkillFields.map((fieldItem, index) => (
              <Controller
                key={fieldItem.id}
                name={`topSkills.${index}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`topSkills.${index}`}
                          aria-invalid={fieldState.invalid}
                        />
                        <Button
                          onClick={() => topSkillRemove(index)}
                          type="button"
                          variant={"ghost"}
                        >
                          <X />
                        </Button>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            ))}

            <FieldLabel className="col-span-full">Roles</FieldLabel>
            <InputGroup className="col-span-full sm:w-1/2">
              <InputGroupInput
                ref={addNewRoleRef}
                placeholder="Add a new role"
              />
              <Button
                onClick={() => {
                  if (!addNewRoleRef.current?.value) return;
                  roleAppend(addNewRoleRef.current?.value);
                  addNewRoleRef.current.value = "";
                }}
                type="button"
                variant={"secondary"}
              >
                <Plus />
              </Button>
            </InputGroup>
            {rolesFields.map((fieldItem, index) => (
              <Controller
                key={fieldItem.id}
                name={`roles.${index}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`roles.${index}`}
                          aria-invalid={fieldState.invalid}
                        />
                        <Button
                          onClick={() => roleRemove(index)}
                          type="button"
                          variant={"ghost"}
                        >
                          <X />
                        </Button>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            ))}
            <FormSubmitButtons
              formElementId="profile-update-form"
              className="col-span-full"
              onReset={() => form.reset()}
              isLoading={isLoading}
              cancel
            />
          </FieldGroup>
        </form>
      </div>
    </Pagelayout>
  );
};

export default ProfileUpdate;
