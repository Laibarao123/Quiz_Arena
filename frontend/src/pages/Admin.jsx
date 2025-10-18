
import React from "react";
import Admindashbord from "../components/Admindashbord";
import Reports from "../components/Reports";
import Systemmonitor from "../components/Systemmonitor";

const Host = () => {
  return (
    <div>
        <Admindashbord/>
        <Reports/>
        <Systemmonitor/>

    </div>
  );
};

export default Host;
