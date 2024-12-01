export interface BaseRes {
  /**
   * 响应code
   */
  code?: string;
  /**
   * 失败信息
   */
  message?: string;
}

/**
 * ResultListModelBaseInfo_response
 */
export interface GetModelInfoRes extends BaseRes {
  /**
   * 返回数据
   */
  data?: ModelBaseInfoResponse[];
}

/**
 * ModelBaseInfo_response
 */
export interface ModelBaseInfoResponse {
  /**
   * 模型对controlnet的支持情况
   */
  controlnet_support?: string;
  /**
   * 模型编号
   */
  model_code?: number;
  /**
   * 模型描述
   */
  model_desc?: string;
  /**
   * 模型版本
   */
  model_version?: string;
  /**
   * 是否支持4k
   */
  support_cutdiffusion?: boolean;
  /**
   * 支持的作画模式
   */
  support_patterns?: ModelBaseInfoPatternInfoResponse[];
  /**
   * 模型分类（1-通用模型，3-漫画模型，7-MJ模型）
   */
  type?: number;
}

/**
 * ModelBaseInfoPatternInfo_response
 */
export interface ModelBaseInfoPatternInfoResponse {
  /**
   * 透明图支持的模式，仅透明图模式会返回
   */
  layer_diffusion_pattern_methods?: LayerDiffusionMethodVOResponse[];
  /**
   * 作画模式 code
   * 0 - 通用作画
   * 5 - 边缘检测
   * 6 - 姿态识别
   * 7 - 深度检测
   * 8 - 边缘提取
   * 9 - 线段识别
   * 10 - 模型识别
   * 11 - 线稿生成图
   * 12 - 语义分割识别
   * 14 - 透明图
   * 其他controlNet pattern是否支持由{@link #controlnetSupport}决定
   */
  pattern_code?: number;
}

/**
 * LayerDiffusionMethodVO_response
 */
export interface LayerDiffusionMethodVOResponse {
  /**
   * 模式code
   */
  method_code?: number;
  /**
   * 模式
   */
  name?: string;
}

export interface GetModuleResourceInfoRes extends BaseRes {
  data: AiArtworkDefaultResourceVoResponse;
}

/**
 * 返回数据(object)
 *
 * AiArtworkDefaultResourceVo_response
 */
export interface AiArtworkDefaultResourceVoResponse {
  /**
   * (object)
   */
  create_option_menu?: AiArtworkCreateOptionMenuVoResponse;
}

/**
 * (object)
 *
 * AiArtworkCreateOptionMenuVo_response
 */
export interface AiArtworkCreateOptionMenuVoResponse {
  /**
   * 艺术家
   */
  artist?: CreateOptionWithPicResponse[];
  /**
   * 角色同人
   */
  character?: CreateOptionWithDecorationResponse[];
  /**
   * 元素魔法
   */
  element_magic?: SimpleOptionResponse[];
  /**
   * 画面类型
   */
  image_type?: CreateOptionWithPicResponse[];
  /**
   * 融合模型
   */
  model_fusion?: CreateOptionWithDecorationResponse[];
  /**
   * 模型支持的模式
   */
  patterns?: AiArtworkCreateOptionMenuVoPatternParamResponse[];
  /**
   * 无界AI提供的描述提示词列表，仅供参考
   */
  prompt_tips?: GeneralCreateOptionResponse[];
  /**
   * 分辨率 过期，请不要使用
   */
  resolution?: CreateOptionOnResolutionResponse[];
  /**
   * 新的分辨率信息，该信息反映的是无界AI创作页面的模型对应的分辨率信息（基础尺寸，超分、精绘倍数）
   * 用户可参考该信息，往往可以得到比较好的生成效果。(object)
   */
  resolution_new?: CreateResolutionVoResponse;
  /**
   * 采样模型
   */
  sampler_models?: SamplerModelInfoOptionResponse[];
  /**
   * 风格
   */
  style?: CreateOptionWithPicResponse[];
  /**
   * 风格，艺术家，元素魔法的集合（还包括其他所有风格选项参数）
   */
  style_decoration?: SimpleOptionResponse[];
}

/**
 * CreateOptionWithPic_response
 */
export interface CreateOptionWithPicResponse {
  /**
   * 分组
   */
  category?: string;
  /**
   * key（唯一标识）
   */
  key?: string;
  /**
   * 展示名称
   */
  name?: string;
  /**
   * 暂无值，可忽略
   */
  url?: string;
}

/**
 * CreateOptionWithDecoration_response
 */
export interface CreateOptionWithDecorationResponse {
  /**
   * category（分组）
   */
  category: string;
  /**
   * key（唯一标识）
   */
  key: string;
  /**
   * name（展示名称）
   */
  name: string;
  /**
   * 推荐权重，浮点型，范围是-1.0~2.0
   */
  recommended_weight: number;
  /**
   * 支持的模型版本。只能用于对应支持的版本的模型
   */
  support_model_versions?: string[];
}

/**
 * SimpleOption_response
 */
export interface SimpleOptionResponse {
  /**
   * 相同的key无法复选
   */
  choice_key?: string;
  /**
   * key（唯一标识）
   */
  key?: string;
  /**
   * 展示名称
   */
  name?: string;
}

/**
 * AiArtworkCreateOptionMenuVoPatternParam_response
 */
export interface AiArtworkCreateOptionMenuVoPatternParamResponse {
  /**
   * 透明图。支持才返回。返回多个说明支持多个模式
   */
  layer_diffusion_params?: LayerDiffusionMethodVOResponse[];
  /**
   * 模式名
   * CANNY：边缘检测
   * OPENPOSE：姿态识别
   * DEPTH：深度检测
   * HED：边缘提取
   * MLSD：线段识别
   * NORMAL：模型识别
   * SCRIBBLE：线稿生成图
   * SEG：语义分割识别
   */
  name?: string;
}

/**
 * LayerDiffusionMethodVO_response
 */
export interface LayerDiffusionMethodVOResponse {
  /**
   * 模式code
   */
  method_code?: number;
  /**
   * 模式
   */
  name?: string;
}

/**
 * GeneralCreateOption_response
 */
export interface GeneralCreateOptionResponse {
  /**
   * 展示短句，注意实际的提示词是由无界AI配置，并不是短句本身
   */
  name?: string;
}

/**
 * CreateOptionOnResolution_response
 */
export interface CreateOptionOnResolutionResponse {
  /**
   * 高
   */
  height?: number;
  /**
   * 支持精绘详情信息
   */
  prefine_details?: AiArtworkSupersizeDetailVoResponse[];
  /**
   * 支持的精绘倍数列表
   */
  prefine_multiples?: string[];
  /**
   * 比例
   */
  size_ratio?: string;
  /**
   * 支持的超分辨详情信息
   */
  super_size_details?: AiArtworkSupersizeDetailVoResponse[];
  /**
   * 支持的超分辨率倍数
   */
  super_size_multiple?: number;
  /**
   * 支持的超分辨率倍数列表
   */
  super_size_multiples?: string[];
  /**
   * 无界AI官网底图，有变更的可能，仅供参考
   */
  url?: string;
  /**
   * 宽
   */
  width?: number;
}

/**
 * AiArtworkSupersizeDetailVo_response
 */
export interface AiArtworkSupersizeDetailVoResponse {
  /**
   * （已废弃，相关请参考文档-收费规则介绍）积分消耗
   */
  integral_price?: number;
  /**
   * 超分辨倍数
   */
  multiple?: number;
}

/**
 * 新的分辨率信息，该信息反映的是无界AI创作页面的模型对应的分辨率信息（基础尺寸，超分、精绘倍数）
 * 用户可参考该信息，往往可以得到比较好的生成效果。(object)
 *
 * CreateResolutionVo_response
 */
export interface CreateResolutionVoResponse {
  /**
   * 分辨率的key，对应一整套尺寸,可见该链接：https://alidocs.dingtalk.com/i/p/Za0gX1EQk1BXeJnq9JOGOdlxLNv9jz4Q
   */
  resolution_key?: string;
  /**
   * 尺寸分辨率信息
   */
  resolution_list?: CreateOptionResolutionResponse[];
}

/**
 * CreateOptionResolution_response
 */
export interface CreateOptionResolutionResponse {
  /**
   * 无界ai展示的尺寸
   */
  display_resolution?: string;
  /**
   * 高
   */
  height?: number;
  /**
   * 支持的精绘倍数列表
   */
  prefine_multiples?: number;
  /**
   * 比例
   */
  size_ratio?: string;
  /**
   * 支持的超分辨率倍数
   */
  super_size_multiple?: number;
  /**
   * 无界AI官网底图，有变更的可能，仅供参考
   */
  url?: string;
  /**
   * 宽
   */
  width?: number;
}

/**
 * SamplerModelInfoOption_response
 */
export interface SamplerModelInfoOptionResponse {
  /**
   * 采样模型映射
   */
  sampler_index?: number;
  /**
   * 采样模型名称
   */
  sampler_model_name?: string;
}

//

export interface ImageTypeOption extends CreateOptionWithPicResponse {
  selected: boolean;
}

export interface StyleTypeOption extends ImageTypeOption {}

export interface ArtistTypeOption extends ImageTypeOption {}

export interface ElementMagicTypeOption extends SimpleOptionResponse {
  selected: boolean;
}

export interface StyleDecorationTypeOption extends ElementMagicTypeOption {}

export interface CharacterTypeOption
  extends CreateOptionWithDecorationResponse {
  selected: boolean;
}

export interface ModelFusionTypeOption extends CharacterTypeOption {
  weight: number;
}

export type ResourceOption =
  | ImageTypeOption
  | StyleTypeOption
  | ArtistTypeOption
  | ElementMagicTypeOption
  | StyleDecorationTypeOption
  | CharacterTypeOption
  | ModelFusionTypeOption;
