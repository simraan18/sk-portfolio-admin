import { Badge } from "@/components/ui/badge";
import { clipText } from "@/utils";
import type { AdminBaseEntity } from "@/vite-env";
import { type ColumnDef } from "@tanstack/react-table";

export interface Profile extends AdminBaseEntity {
  aboutProfile: string;
  education: string;
  educationCountry: string;
  educationInstitue: string;
  email: string;
  experience: number;
  location: string;
  name: string;
  resumeUrl: string;
  roles: string[];
  title: string;
  topSkills: string[];
  visaStatus: string;
}

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Display Name",
  },
  {
    accessorKey: "title",
    id: "title",
    header: "Title",
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "education",
    id: "education",
    header: "Education",
    cell: ({ row }) => {
      const degree = row.original["education"];
      const educationCountry = row.original["educationCountry"];
      const educationInstitue = row.original["educationInstitue"];
      return (
        <div className="flex flex-col gap-2">
          <p>{degree}</p>
          <span className="text-[12px] text-muted-foreground">
            {educationInstitue} - {educationCountry}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "experience",
    id: "experience",
    header: "Experience",
    cell: ({ row }) => {
      return <span>{row.original["experience"] ?? 0} Years</span>;
    },
  },
  {
    accessorKey: "location",
    id: "location",
    header: "Curren Location",
  },
  {
    accessorKey: "visaStatus",
    id: "visaStatus",
    header: "Curren Visa Status",
    cell: ({ row }) => {
      const visaStatus = row.original["visaStatus"];
      return <span>{visaStatus ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "roles",
    id: "roles",
    header: "Roles",
    cell: ({ row }) => {
      return (
        <>
          {row.original["roles"].map((role) => (
            <Badge variant={"outline"}>{role}</Badge>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "topSkills",
    id: "topSkills",
    header: "Top Skills",
    cell: ({ row }) => {
      return (
        <>
          {row.original["topSkills"].map((skill) => (
            <Badge variant={"outline"}>{skill}</Badge>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "aboutProfile",
    id: "aboutProfile",
    header: "About Me",
    cell: ({ row }) => {
      const text = row.original["aboutProfile"];
      if (!text) return "N/A";
      return <span title={text}>{clipText(text)}</span>;
    },
  },
];
