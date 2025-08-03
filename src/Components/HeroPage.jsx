import React, { useState } from "react";
import Scene from "./ThreeComp/Scene";
import Sidebar from "./Sidebar/Sidebar";
import Toolbar from "./Sidebar/Toolbar";
import useObjectStore from "../store";

function HeroPage() {
 
  const [scene, setScene] = useState();
  const { targetObject, objects, values, updateValue } = useObjectStore();


  return (
    <>
      <Sidebar scene={scene} />
      <Scene scene={scene} setScene={setScene} objects={objects} />
      {targetObject &&<Toolbar scene={scene} />}

    </>
  );
}

export default HeroPage;
