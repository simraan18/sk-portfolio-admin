import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/utils";
import type { IAppNavigation } from "@/vite-env";
import { Link } from "react-router";

type LeftNavigationPanelProps = {
  navigations: IAppNavigation[];
};

const LeftNavigationPanel = ({ navigations }: LeftNavigationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleHideSidePanel = () => {
    if (!isOpen) return;
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        aria-label={isOpen ? "Close navigation panel" : "Open navigation panel"}
        aria-expanded={isOpen}
        className="z-40 p-2 text-copy-secondary hover:text-copy-primary transition-colors"
      >
        {isOpen ? (
          <PanelRightOpen className="h-5 w-5" />
        ) : (
          <PanelRightClose className="h-5 w-5" />
        )}
      </button>

      {/* Navigation Panel Overlay */}
      <div
        className={cn("absolute inset-0 invisible", {
          "bg-black/30 visible": isOpen,
        })}
        onClick={handleHideSidePanel}
      >
        <nav
          className={`${cn("fixed left-0 w-75 top-0 h-screen  bg-surface border-r border-surface-border z-30")}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="p-6 pt-16 flex flex-col gap-6">
            {navigations.map(({ id, label, icon: Icon, path }) => (
              <Link key={id} to={path}>
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  <h2 className="text-lg font-semibold text-copy-primary">
                    {label}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default LeftNavigationPanel;
