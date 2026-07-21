import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import TTable from "@/components/TTable/TTable";
import Pagelayout from "@/layout/Pagelayout";
import { Columns } from "@/model/SocialLinkModel";
import { routePath } from "@/routes/route-path";
import { useGetAllSocialLinksQuery } from "@/store/service/socialLinkApi";

const SocialLinkListPage = () => {
  const { data, isFetching } = useGetAllSocialLinksQuery();

  if (isFetching) return <Loading />;

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Social Link"
        backPath={routePath.socialLinks}
        createPath={routePath.socialLinkCreate}
        description="Manage portfolio social link section."
      />
      <TTable
        columns={Columns}
        data={data?.response?.data || []}
        updatePath={routePath.socialLinkUpdate}
      />
    </Pagelayout>
  );
};

export default SocialLinkListPage;
