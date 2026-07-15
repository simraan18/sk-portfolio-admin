import { cn } from "@/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface FormSubmitButtonsProps {
  formElementId?: string;
  submitBtnText?: string;
  resetBtnText?: string;
  className?: string;
  onReset?: () => void;
  isLoading: boolean;
  cancel?: boolean;
}

const FormSubmitButtons = ({
  formElementId,
  submitBtnText = "Submit",
  resetBtnText = "Reset",
  className,
  onReset,
  isLoading,
  cancel,
}: FormSubmitButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      <Button type="submit" form={formElementId} disabled={isLoading}>
        {submitBtnText}
      </Button>
      <Button
        type="button"
        variant={"secondary"}
        onClick={onReset}
        disabled={isLoading}
      >
        {resetBtnText}
      </Button>
      {cancel ? (
        <Button type="button" onClick={() => navigate(-1)} variant={"outline"}>
          Cancel
        </Button>
      ) : null}
    </div>
  );
};

export default FormSubmitButtons;
