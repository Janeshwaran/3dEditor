// src/store/useObjectStore.js
import { create } from "zustand";

const useObjectStore = create((set) => ({
  targetObject: null,
  values: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  objects: [
    { path: "/suzanne.glb", name: "Char1", scale: 1 },
    { path: "/suzanne.glb", name: "Char2", scale: 1 },
  ],
  setObjects: (objects) => set({ objects }),
  setTargetObject: (object) => set({ targetObject: object }),
  setValues: (values) => set({ values }),
  updateValue: (type, index, value) =>
    set((state) => {
      const updated = { ...state.values };
      updated[type][index] = parseFloat(value) || 0;
      return { values: updated };
    }),
}));

export default useObjectStore;
