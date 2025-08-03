import React, { useState } from "react";
import styles from "./SceneTree.module.css";
import useObjectStore from "../../../store";

function SceneTree({ scene }) {
  const [openNodes, setOpenNodes] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);
  const {targetObject,setTargetObject } = useObjectStore();

  const toggleNode = (nodeName) => {
    setOpenNodes((prev) => ({
      ...prev,
      [nodeName]: !prev[nodeName],
    }));
  };

  const handleControls = (element) => {
  // Use element.uuid as the unique key for selection
  // setSelectedKey(element.uuid);
    console.log('element.type : ', element );
    if (element.type !== "AmbientLight" || element.type !== "PointLight" || element.type !== "Scene") {
    // if (element.type === "Group" || element.type === "Mesh" || element.type === "Mesh") {
      setTargetObject(element);
    }
  };

  const renderChildren = (children, parentName = "") => {
    if (!children || children.length === 0) return null;

    return (
      <div className={styles.treeWrapper}>
        {children.map((element, index) => {
          if (element.name === "exclude") return null;

          const nodeKey = `${parentName}-${index}`;
          const isOpen = openNodes[nodeKey];

          return (
            <div className={styles.assetWrapper} key={nodeKey}>
              <li
                className={`${styles.asset} ${
                  targetObject === element ? styles.selected : ""
                }`}
                onClick={() => {
                  handleControls(element, nodeKey);
                  if (element.children?.length > 0) {
                    toggleNode(nodeKey);
                  }
                }}
              >
                {element.children?.length > 0 && (
                  <span
                    className={`${styles.toggleIcon} ${
                      isOpen ? styles.open : ""
                    }`}
                  >
                    ▶
                  </span>
                )}
                <span className={styles.assetName}>
                  {element.name ? element.name : element.type}
                </span>
              </li>
              {isOpen && element.children && (
                <div className={styles.children}>
                  {renderChildren(element.children, nodeKey)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.treeContainer}>
      <div className={styles.assetWrapper}>
        <li
          className={styles.asset}
          onClick={() => {
            handleControls(scene);
            toggleNode("root");
          }}
        >
          {scene.children?.length > 0 && (
            <span
              className={`${styles.toggleIcon} ${
                openNodes["root"] ? styles.open : ""
              }`}
            >
              ▶
            </span>
          )}
          <span className={styles.assetName}>{scene.name}</span>
        </li>
        {openNodes["root"] && renderChildren(scene.children, "root")}
      </div>
    </div>
  );
}

export default SceneTree;
