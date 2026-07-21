import { Outlet } from "react-router";

type MainContentProps = Record<string, never>;

const MainContent = ({}: MainContentProps) => {
  return (
    <main className="h-screen w-full bg-base overflow-x-hidden">
      <Outlet />
    </main>
  );
};

export default MainContent;
