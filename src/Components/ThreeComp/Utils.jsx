import { Environment, GizmoHelper, GizmoViewport } from "@react-three/drei";

const Utils = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="sunset" />

      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport
          axisColors={["#f92d68", "#78d89b", "#368ee2"]}
          labelColor="white"
        />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
    </>
  );
};

export default Utils;
