import React from "react";
import styles from "./Sidebar.module.css";
import useObjectStore from "../../store";

function Toolbar() {
  const { targetObject, values, updateValue } = useObjectStore();

  return (
    <div className={styles.toolbarContainer}>
      {targetObject && (
        <div className="tools">
          <strong>Object:</strong> {targetObject.name} <br />
          <strong>Position:</strong>{" "}
          {values.position.map((n, i) => (
            <input
              key={`pos-${i}`}
              type="number"
              onChange={(e) => updateValue("position", i, e.target.value)}
              value={n}
            />
          ))}{" "}
          <br />
          <strong>Rotation:</strong>{" "}
          {values.rotation.map((n, i) => (
            <input
              key={`rot-${i}`}
              type="number"
              onChange={(e) => updateValue("rotation", i, e.target.value)}
              value={n}
            />
          ))}{" "}
          <br />
          <strong>Scale:</strong>{" "}
          {values.scale.map((n,i) => (
            <input
            key={`scale-${i}`}
            type="number"
            onChange={(e) => updateValue("scale", i, e.target.value)}
            value={n}
          />
          ))}
          {/* Animation Section */}
          {targetObject.animations && targetObject.animations.length > 0 && (
            <div className={styles.animSection}>
              <strong>Animations:</strong>
              <ul>
                {targetObject.animations.map((anim, idx) => (
                  <li key={anim.name || idx}>
                    {anim.name || `Animation ${idx+1}`}
                    {/* You can add play/stop buttons here if needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Toolbar;
