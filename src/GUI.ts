// @ts-ignore
export const GUI = globalThis["GUI"];
export type GUI = typeof GUI;

export const radToDegOptions = {
  min: -360,
  max: 360,
  step: 1,
  converters: GUI.converters.radToDeg,
};
