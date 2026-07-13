import PageTitle from "@/components/PageTitle";
import Pagelayout from "@/layout/Pagelayout";

const Profile = () => {
  return (
    <Pagelayout>
      <PageTitle
        title="Profile"
        description="Manage portfolio profile section."
        createPath="/profile-create"
      />
    </Pagelayout>
  );
};

export default Profile;
