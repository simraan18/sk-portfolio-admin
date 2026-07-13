import LeftNavigationPanel from "./components/LeftNavigationPanel";
import MainContent from "./components/MainContent";
import { sidePanel } from "./routes/navigation";

const App = () => {
  return (
    <div className="flex">
      <LeftNavigationPanel navigations={sidePanel} />
      <MainContent />
    </div>
  );
};

export default App;
