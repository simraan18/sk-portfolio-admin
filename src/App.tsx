import { useSelector } from "react-redux";
import MainContent from "./components/MainContent";
import { selectAuth, setAuthState, setToken } from "./store/slice/auth-slice";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { routePath } from "./routes/route-path";
import Loading from "./components/Loading";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { sidePanel } from "./routes/navigation";

const App = () => {
  const { token, authState } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAuthState("loading"));
    if (token !== null) {
      dispatch(setAuthState("authenticated"));
      dispatch(setToken(token));
      navigate(window.location.pathname);
    } else {
      dispatch(setAuthState(null));
    }
  }, [token]);

  if (authState === "loading")
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );

  if (!authState || !token) {
    return <Navigate to={routePath.login} />;
  }

  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <AppSidebar sidePanel={sidePanel} />
        <SidebarTrigger className="m-5" />
        <MainContent />
      </SidebarProvider>
    </div>
  );
};

export default App;
