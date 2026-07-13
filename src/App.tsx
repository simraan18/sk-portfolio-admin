import MainContent from "./components/MainContent";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div className="flex flex-col">
      <Toolbar />
      <MainContent />
    </div>
  );
};

export default App;
