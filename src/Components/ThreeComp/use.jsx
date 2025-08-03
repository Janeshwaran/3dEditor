import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Grid,
  OrbitControls,
  PivotControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import Utils from "./Utils";
import ModelLoader from "./ModelLoader";
import ObjectEditor from "./ObjectEditor";

function Scene({ scene, setScene, objects }) {
  const [targetObject, setTargetObject] = useState(null);

  const [values, setValues] = useState({
    position: [],
    rotation: [],
    scale: [],
  });

  const handleInputChange = (type, index, value) => {
    const newValues = { ...values };
    newValues[type][index] = parseFloat(value) || 0;
    setValues(newValues);

    if (targetObject) {
      // Update the Three.js object's properties
      targetObject.position.set(
        values.position[0],
        values.position[1],
        values.position[2]
      );
      targetObject.rotation.set(
        values.rotation[0],
        values.rotation[1],
        values.rotation[2]
      );
      targetObject.scale.set(values.scale[0], values.scale[1], values.scale[2]);
    }
    //

    // if (onUpdate) {
    //   onUpdate({
    //     ...targetObject,
    //     position: newValues.position,
    //     rotation: newValues.rotation,
    //     scale: newValues.scale,
    //   });
    // }
  };

  return (
    <>
      <Canvas
        onCreated={({ scene }) => {
          scene.name = "Scene";
          setScene(scene);
        }}
        camera={{ position: [0, 5, 5] }}
        onPointerMissed={() => {
          setTargetObject(null);
        }}
      >
        {targetObject && (
          <PivotControls
            name="exclude"
            disableScaling
            disableSliders
            matrix={targetObject.matrix}
            scale={2}
            depthTest={false}
            onDrag={(local) => {
              const position = new THREE.Vector3();
              const scale = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              local.decompose(position, quaternion, scale);
              targetObject;
              targetObject.position.copy(position);
              targetObject.scale.copy(scale);
              targetObject.quaternion.copy(quaternion);

              // setting the values in a state for displaying it in the inputs

              {
                targetObject &&
                  setValues({
                    position: [
                      targetObject.position.x,
                      targetObject.position.y,
                      targetObject.position.z,
                    ],
                    rotation: [
                      targetObject.rotation.x,
                      targetObject.rotation.y,
                      targetObject.rotation.z,
                    ],
                    scale: [
                      targetObject.scale.x,
                      targetObject.scale.y,
                      targetObject.scale.z,
                    ],
                  });
              }
            }}
          />
        )}

        {objects &&
          objects.map((obj, i) => (
            <ModelLoader
              path={obj.path}
              name={obj.name}
              scale={obj.scale}
              position={[i + 1, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                if (e.delta === 0) {
                  console.log(e);

                  setTargetObject(e.eventObject);
                }
              }}
            />
          ))}
        {/* <Box
          onClick={(e) => {
            e.stopPropagation();
            if (e.delta === 0) {
              console.log(e);

              setTargetObject(e.eventObject);
            }
          }}
        /> */}
        <Grid
          position={[0, -1, 0]}
          name="exclude"
          infiniteGrid={true}
          cellSize={1}
          sectionSize={1}
          fadeDistance={100}
          fadeStrength={10}
        />
        <OrbitControls makeDefault />
        <Utils />
      </Canvas>

      {/* <ObjectEditor
            targetObject={initialObject}
            onUpdate={handleObjectUpdate}
      /> */}

      {targetObject && (
        <div className="val">
          <strong>Object:</strong> {targetObject.name} <br />
          <strong>Position:</strong>{" "}
          {values.position.map((n, i) => (
            <>
              <input
                type="number"
                onChange={(e) =>
                  handleInputChange("position", i, e.target.value)
                }
                value={n}
              />
            </>
          ))}{" "}
          <br />
          <strong>Rotation:</strong>{" "}
          {values.rotation.map((n, i) => (
            <>
              <input
                type="number"
                onChange={(e) =>
                  handleInputChange("rotation", i, e.target.value)
                }
                value={n}
              />
            </>
          ))}{" "}
          <br />
          <strong>Scale:</strong>{" "}
          {values.scale.map((n) => n.toFixed(2)).join(", ")}
        </div>
      )}
    </>
  );
}

export default Scene;
