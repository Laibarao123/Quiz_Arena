
import React from "react";
import Model from "../components/Model";
import Timer  from "../components/Timer";
import Loadingspinner from "../components/Loadingspinner";
import Errorbound from "../components/Errorbound";
const Host = () => {
  return (
    <div>
       <Model/>
       <Timer/>
       <Loadingspinner/>
       <Errorbound/>
        
    </div>
  );
};

export default Host;
