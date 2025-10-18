
import React from "react";
import Joinquiz from "../components/Joinquiz";
import Acheivement from "../components/Acheivement";
import Quizroomplayerview from "../components/Quizroomplayerview";
import Leaderbord from "../components/Leaderbord";

const Host = () => {
  return (
    <div>
        <Joinquiz/>
        <Leaderbord/>
        <Acheivement/>
        <Quizroomplayerview/>
    </div>
  );
};

export default Host;
