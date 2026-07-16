import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import TTable from "@/components/TTable/TTable";
import Pagelayout from "@/layout/Pagelayout";
import { columns } from "@/model/ExperienceModel";
import { routePath } from "@/routes/route-path";
import { useGetExperienceListQuery } from "@/store/service/experienceApi";

const ExperienceListPage = () => {
  // Hooks
  const { data, isFetching } = useGetExperienceListQuery();

  if (isFetching) return <Loading />;

  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Experience"
          description="Manage portfolio experience section."
          createPath={routePath.experienceCreate}
        />
        <TTable
          data={data?.response?.data || []}
          columns={columns}
          updatePath={routePath.experienceUpdate}
        />
      </div>
    </Pagelayout>
  );
};

export default ExperienceListPage;
