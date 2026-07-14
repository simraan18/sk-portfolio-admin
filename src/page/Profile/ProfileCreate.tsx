import PageTitle from "@/components/PageTitle";
import Pagelayout from "@/layout/Pagelayout";

const ProfileCreate = () => {
  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle title="Profile Create" backPath="/profile" />
      </div>
    </Pagelayout>
  );
};

export default ProfileCreate;
