import { Outlet } from "react-router";

type MainContentProps = Record<string, never>;

const MainContent = ({}: MainContentProps) => {
  return (
    <main className="h-screen w-full bg-base overflow-hidden">
      <Outlet />
    </main>
  );
};

export default MainContent;
