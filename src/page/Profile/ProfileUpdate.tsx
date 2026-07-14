import PageTitle from "@/components/PageTitle";
import Pagelayout from "@/layout/Pagelayout";

const ProfileUpdate = () => {
  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle title="Profile Update" backPath="/profile" />
      </div>
    </Pagelayout>
  );
};

export default ProfileUpdate;
