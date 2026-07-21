import { Button } from "./ui/button";
import { Bell, User } from "lucide-react";
import { Link } from "react-router";
import { routePath } from "@/routes/route-path";

const Toolbar = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] bg-surface border-b border-surface-border px-5 py-3">
      <div className="flex w-full items-center gap-4">
        {/* <LeftNavigationPanel navigations={sidePanel} /> */}
        <Link to={routePath.home}>
          <h1 className="font-semibold text-lg tracking-widest">
            SK Portfolio CMS
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button className="cursor-pointer">
          <Bell />
        </Button>
        <Button className="cursor-pointer">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
