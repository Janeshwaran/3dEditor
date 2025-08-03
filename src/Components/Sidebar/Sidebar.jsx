import React, { useRef, useState } from "react";

import styles from "./Sidebar.module.css";
import SceneTree from "../ThreeComp/TreeView/SceneTree";
import useObjectStore from "../../store";

function Sidebar({ scene }) {
  const { objects, setObjects } = useObjectStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { // 50MB
      setError("File size should not exceed 50MB.");
      setTimeout(() => setError("") , 3000);
      return;
    }
    setLoading(true);
    try {
      const url = URL.createObjectURL(file);
      setObjects([
        ...objects,
        { path: url, name: file.name, scale: 1 },
      ]);
    } catch (err) {
      setError("Failed to upload model.");
      setTimeout(() => setError("") , 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        {error && <div className={styles.error}>{error}</div>}
        {loading && <div className={styles.loader}>Uploading...</div>}
  
    <div className={styles.sidebarContainer}>
      {/* Asset Tree View */}
      {scene && <SceneTree scene={scene} />}

      <div className={styles.btnFlx}>
        <label
          htmlFor="target"
          className={`${styles.sidebarBtn} ${styles.qrflex}`}
        >
          <span>Upload (GLB)</span>
          <input
            type="file"
            id="target"
            className={styles.hidden}
            accept=".glb,.gltf"
            required
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>  </>
  );
}

export default Sidebar;
