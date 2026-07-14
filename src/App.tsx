import { useSelector } from "react-redux";
import MainContent from "./components/MainContent";
import Toolbar from "./components/Toolbar";
import { selectAuth, setAuthState, setToken } from "./store/slice/auth-slice";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { routePath } from "./routes/route-path";
import Loading from "./components/Loading";

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
      <Toolbar />
      <MainContent />
    </div>
  );
};

export default App;
