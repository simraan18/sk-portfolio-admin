import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

export function buildCustomTableColumns<T>(columns: ColumnDef<T>[]) {
  return {
    columns,
    addSerialNumber() {
      const newCols = [...this.columns];
      newCols.unshift({
        accessorFn: (_, index) => {
          return index + 1;
        },
        header: "#",
        id: "serialNumber",
      });
      this.columns = newCols;
      return this;
    },
    addActionBtns(updatePath?: string, deleteUrl?: string) {
      if (!updatePath && !deleteUrl) return this;

      const newCols = [...this.columns];
      newCols.push({
        accessorKey: "action",
        header: "Action",
        id: "actions",
        cell: ({ row }) => {
          const entityId = (row as any).original["id"];
          const actionUIs: ReactNode[] = [];
          if (updatePath) {
            actionUIs.push(
              <Link
                to={`${updatePath.replace(":id", entityId)}`}
                className="text-primary"
                key={uuidv4()}
              >
                Update
              </Link>,
            );
          }

          if (deleteUrl) {
          }
          return <>{actionUIs}</>;
        },
      });
      this.columns = newCols;
      return this;
    },
    build() {
      return this.columns;
    },
  };
}
