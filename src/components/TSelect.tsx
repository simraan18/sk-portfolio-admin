import type { baseQuery } from "@/store/service/baseQuery";
import type { TypedUseQuery } from "@reduxjs/toolkit/query/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMemo } from "react";
import type { ResponseDataList } from "@/vite-env";

interface TSelectProps<T, K> {
  useGetQuery: TypedUseQuery<ResponseDataList<T>, K, typeof baseQuery>;
  valueKey: string;
  labelKey: string;
  onChange: (event: any) => void;
  queryArgs: K;
  value: unknown;
  id?: string;
}

const TSelect = <T, K>({
  useGetQuery,
  valueKey,
  labelKey,
  onChange,
  queryArgs,
  value,
  id,
}: TSelectProps<T, K>) => {
  const { data, isFetching } = useGetQuery(queryArgs);

  const items = useMemo(() => {
    if (!data || !data?.response?.data || !data?.response?.data.length)
      return [];

    return data?.response?.data.map((item: any) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  }, [data?.response]);

  return (
    <>
      <Select
        items={items}
        onValueChange={(value) => {
          onChange({
            target: {
              value,
            },
          });
        }}
        value={value}
        name={id}
        disabled={isFetching}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder={"Select a value"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isFetching && (
        <p className="text-sm text-muted-foreground">Loading...</p>
      )}
    </>
  );
};

export default TSelect;
