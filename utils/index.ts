import type { ModelFusionTypeOption } from "@/types";
import type { UploadRawFile } from "element-plus";

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

export const ARTWORK_SUBMITTED = 0; // 已提交
export const ARTWORK_QUEUING = 1; // 排队中
export const ARTWORK_CREATING = 2; // 生成中
export const ARTWORK_CREATE_FAILED = 3; // 生成失败
export const ARTWORK_CREATE_SUCCESS = 4; // 生成成功
export const ARTWORK_REVERTED = -1; // 已撤回

// export const CREATE_ARTWORK_STATUS_MAP = {

// }

export const getBase64FromFile = (file: UploadRawFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let fileResult = "";
    reader.readAsDataURL(file);
    // 开始转
    reader.onload = () => {
      fileResult = reader.result as string;
    };
    // 转 失败
    reader.onerror = (error) => {
      reject(error);
    };
    // 转 结束
    reader.onloadend = () => {
      resolve(fileResult);
    };
  });
};


export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const handleApiError = (error: any) => {
  console.log('error', error)
  if (error.response.status === 401) {
    // 唤起登录框
    const authStore = useAuthStore()
    authStore.setLoginDialog(true)
  }
}

export const MJ_VIEW_LIST_OPTIONS = [
  {
    "value": "Wide view",
    "label": "宽视角"
  },
  {
    "value": "Aerial view",
    "label": "鸟瞰视角"
  },
  {
    "value": "Top view",
    "label": "顶视角"
  },
  {
    "value": "Upview",
    "label": "仰视角"
  },
  {
    "value": "Front view",
    "label": "正面视角"
  },
  {
    "value": "Headshot",
    "label": "头部特写"
  },
  {
    "value": "Ultrawideshot",
    "label": "超广角视角"
  },
  {
    "value": "Medium Shot(MS)",
    "label": "中景"
  },
  {
    "value": "Long Shot(LS)",
    "label": "远景"
  },
  {
    "value": "depth offield(dof)",
    "label": "景深"
  }
]

export const MJ_SHOT_LIST_OPTIONS = [
  {
    "value": "Face Shot (VCU)",
    "label": "脸部特写"
  },
  {
    "value": "Big Close-Up(BCU)",
    "label": "大特写"
  },
  {
    "value": "Close-Up(CU)",
    "label": "特写"
  },
  {
    "value": "Waist Shot(WS)",
    "label": "腰部以上"
  },
  {
    "value": "KneeShot(KS)",
    "label": "膝盖以上"
  },
  {
    "value": "Full Length Shot(FLS)",
    "label": "全身照"
  },
  {
    "value": "Extra Long Shot(ELS)",
    "label": "极远景"
  }
]

export const MJ_LIGHT_LIST_OPTIONS = [
  {
    "value": "Cold light",
    "label": "冷光"
  },
  {
    "value": "Warm light",
    "label": "暖光"
  },
  {
    "value": "hard lighting",
    "label": "硬光"
  },
  {
    "value": "Dramatic light",
    "label": "戏剧性光线"
  },
  {
    "value": "reflection light",
    "label": "反射光"
  },
  {
    "value": "Misty foggy",
    "label": "薄雾"
  },
  {
    "value": "Natural light",
    "label": "自然光"
  },
  {
    "value": "Sun light",
    "label": "阳光"
  },
  {
    "value": "moody",
    "label": "情绪化"
  }
]

export const parsePxNumer = (px: string) => {
  return Number(px.replace('px', ''))
}