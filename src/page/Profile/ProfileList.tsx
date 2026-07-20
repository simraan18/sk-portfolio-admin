import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import TTable from "@/components/TTable/TTable";
import Pagelayout from "@/layout/Pagelayout";
import { columns } from "@/model/ProfileModel";
import { routePath } from "@/routes/route-path";
import { useGetProfileQuery } from "@/store/service/profileApi";

const ProfileList = () => {
  // Hooks
  const { data: profileData, isFetching } = useGetProfileQuery();

  // States

  // Effects

  // Functions

  // Constants

  if (isFetching) return <Loading />;

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Profile"
        description="Manage portfolio profile section."
        createPath={profileData?.response ? undefined : routePath.profileCreate}
      />
      <TTable
        data={profileData?.response ? [profileData.response] : []}
        columns={columns}
        updatePath={routePath.updateProfile}
      />
    </Pagelayout>
  );
};

export default ProfileList;
