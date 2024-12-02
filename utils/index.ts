import type { ModelFusionTypeOption } from "@/types";

export const px2vw = (px: number): string => {
  return `${(px / 1920) * 100}vw`;
};

export const GENERAL_MODEL_TYPE = "GENERAL_MODEL_TYPE";
export const COMIC_MODEL_TYPE = "COMIC_MODEL_TYPE";
export const MJ_MODEL_TYPE = "MJ_MODEL_TYPE";

export const MODEL_TYPE_VALUE_MAP = {
  GENERAL_MODEL_TYPE: 1,
  COMIC_MODEL_TYPE: 3,
  MJ_MODEL_TYPE: 7,
  STYLE_MODEL_TYPE: 0, // TODO 特殊处理
};

export const MODEL_TYPE_NAME_MAP = {
  GENERAL_MODEL_TYPE: "通用模型",
  COMIC_MODEL_TYPE: "漫画模型",
  MJ_MODEL_TYPE: "MJ模型",
  STYLE_MODEL_TYPE: "风格模型",
};

export const MODEL_TYPE_LIST = [
  {
    name: MODEL_TYPE_NAME_MAP.GENERAL_MODEL_TYPE,
    value: MODEL_TYPE_VALUE_MAP.GENERAL_MODEL_TYPE,
  },
  {
    name: MODEL_TYPE_NAME_MAP.COMIC_MODEL_TYPE,
    value: MODEL_TYPE_VALUE_MAP.COMIC_MODEL_TYPE,
  },
  {
    name: MODEL_TYPE_NAME_MAP.MJ_MODEL_TYPE,
    value: MODEL_TYPE_VALUE_MAP.MJ_MODEL_TYPE,
  },
  {
    name: MODEL_TYPE_NAME_MAP.STYLE_MODEL_TYPE,
    value: MODEL_TYPE_VALUE_MAP.STYLE_MODEL_TYPE,
  },
];

export const modelFusionOptionsKey = Symbol() as InjectionKey<
  Ref<ModelFusionTypeOption[]>
>;

export const RESOLUTION_RATIO_CN_MAP = {
  "1:1": "头像图",
  "1:2": "手机屏幕",
  "4:3": "文章配图",
  "3:4": "社交媒体",
  "16:9": "电脑壁纸",
  "9:16": "宣传海报",
};
