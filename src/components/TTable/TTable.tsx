import { cn } from "@/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buildCustomTableColumns } from "./BuildCustomColumns";
import type { routePath } from "@/routes/route-path";

interface TTableProps<T> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  className?: string;
  updatePath?: (typeof routePath)[keyof typeof routePath];
  deleteUrl?: string;
}

const TTable = <T extends Object>({
  data,
  columns,
  className,
  updatePath,
  deleteUrl,
  ...rest
}: TTableProps<T>) => {
  const table = useReactTable({
    data,
    columns: buildCustomTableColumns(columns)
      .addSerialNumber()
      .addActionBtns(updatePath, deleteUrl)
      .build(),
    getCoreRowModel: getCoreRowModel(),
    getRowId(originalRow) {
      return (originalRow as any).id;
    },
    ...rest,
  });

  return (
    <>
      <div className={cn("overflow-hidden rounded-md border", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TTable;
