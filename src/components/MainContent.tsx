import { Outlet } from "react-router";

type MainContentProps = Record<string, never>;

const MainContent = ({}: MainContentProps) => {
  return (
    <main className="h-[calc(100dvh-61px)] w-full bg-base">
      <Outlet />
    </main>
  );
};

export default MainContent;
