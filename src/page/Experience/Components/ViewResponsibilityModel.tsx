import TModel from "@/components/TModel";
import type { Experience } from "@/model/ExperienceModel";

interface ViewResponsibilityModelProps {
  experience: Experience;
}

const ViewResponsibilityModel = ({
  experience,
}: ViewResponsibilityModelProps) => {
  return (
    <TModel title="Responsibilities">
      <ul className="flex flex-col gap-4 px-4 py-2">
        {experience.responsibilities.map((res) => (
          <li key={res.id} className="text-sm text-muted-foreground list-disc">
            {res.content}
          </li>
        ))}
      </ul>
    </TModel>
  );
};

export default ViewResponsibilityModel;
