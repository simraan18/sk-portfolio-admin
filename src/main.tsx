import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";

import { persistor, store } from "./store/store";

import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
