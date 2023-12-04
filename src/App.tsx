import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";

import "@/modules/i18n";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-4MBLZVJ6FK");
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
