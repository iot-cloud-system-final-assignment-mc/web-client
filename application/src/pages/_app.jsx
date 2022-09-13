import React, { useEffect, useState } from "react";

import Routes from "./_routes";
import authUtils from "../utils/authUtils";

const App = () => {
  const [routesType, setRoutesType] = useState("public");


  useEffect(() => {
    if (authUtils.checkToken()) {
      setRoutesType("private");
    } else {
      setRoutesType("public");
    }
  }, []);

  return <Routes modality={routesType} />;
};

export default App;
