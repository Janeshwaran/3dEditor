import { useState } from 'react';

const ObjectEditor = ({ targetObject, onUpdate }) => {
  const [values, setValues] = useState({
    position: targetObject?.position || [0, 0, 0],
    rotation: targetObject?.rotation || [0, 0, 0],
    scale: targetObject?.scale || [1, 1, 1],
  });


  const handleInputChange = (type, index, value) => {
    const newValues = { ...values };
    newValues[type][index] = parseFloat(value) || 0;
    setValues(newValues);
    // onUpdate callback to update the object
    if (onUpdate) {
      onUpdate({
        ...targetObject,
        position: newValues.position,
        rotation: newValues.rotation,
        scale: newValues.scale,
      });
    }
  };

  return targetObject ? (
    <div className="val">
      <div>
        <strong>Object:</strong> {targetObject.name}
      </div>
      <div>
        <strong>Position:</strong>
        {values.position.map((n, i) => (
          <input
            key={`pos-${i}`}
            type="number"
            value={n.toFixed(2)}
            onChange={(e) => handleInputChange('position', i, e.target.value)}
            className="w-16 mx-1 border rounded"
            step="0.01"
          />
        ))}
      </div>
      <div>
        <strong>Rotation:</strong>
        {values.rotation.map((n, i) => (
          <input
            key={`rot-${i}`}
            type="number"
            value={n.toFixed(2)}
            onChange={(e) => handleInputChange('rotation', i, e.target.value)}
            className="w-16 mx-1 border rounded"
            step="0.01"
          />
        ))}
      </div>
      <div>
        <strong>Scale:</strong>
        {values.scale.map((n, i) => (
          <input
            key={`scale-${i}`}
            type="number"
            value={n.toFixed(2)}
            onChange={(e) => handleInputChange('scale', i, e.target.value)}
            className="w-16 mx-1 border rounded"
            step="0.01"
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default ObjectEditor;