export const px2vw = (px: number): string => {
  return `${(px / 1920) * 100}vw`;
};
