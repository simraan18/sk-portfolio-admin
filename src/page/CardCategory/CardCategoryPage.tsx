import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import TTable from "@/components/TTable/TTable";
import Pagelayout from "@/layout/Pagelayout";
import { columns } from "@/model/CardCategory";
import { routePath } from "@/routes/route-path";
import { useGetCardCategoriesQuery } from "@/store/service/cardCategoryApi";

const CardCategoryPage = () => {
  const { data, isFetching, refetch } = useGetCardCategoriesQuery();

  if (isFetching) return <Loading />;

  return (
    <Pagelayout>
      <div className="flex flex-col gap-4">
        <PageTitle
          title="Card Category"
          description="Manage card category"
          createPath={routePath.cardCategoryCreate}
        />
        <TTable
          data={data?.response?.data || []}
          columns={columns}
          updatePath={routePath.cardCategoryUpdate}
          onRefresh={refetch}
        />
      </div>
    </Pagelayout>
  );
};

export default CardCategoryPage;
