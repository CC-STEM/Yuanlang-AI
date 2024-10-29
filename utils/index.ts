export const px2vw = (px: number): string => {
  console.log("(((", `${(px / window.screen.width) * 100}vw`);
  return `${(px / 1920) * 100}vw`;
};
