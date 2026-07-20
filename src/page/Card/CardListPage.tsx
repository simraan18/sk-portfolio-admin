import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import TTable from "@/components/TTable/TTable";
import Pagelayout from "@/layout/Pagelayout";
import { columns } from "@/model/CardModel";
import { routePath } from "@/routes/route-path";
import { useGetAllCardsQuery } from "@/store/service/cardApi";

const CardListPage = () => {
  const { data, isFetching, refetch } = useGetAllCardsQuery();

  if (isFetching) return <Loading />;

  return (
    <Pagelayout className="flex flex-col gap-4">
      <PageTitle
        title="Card"
        description="Manage portfolio card section."
        createPath={routePath.cardCreate}
      />
      <TTable
        columns={columns}
        data={data?.response?.data || []}
        updatePath={routePath.cardUpdate}
        onRefresh={refetch}
      />
    </Pagelayout>
  );
};

export default CardListPage;
