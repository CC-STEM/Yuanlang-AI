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

export interface StyleTypeOption extends ImageTypeOption { }

export interface ArtistTypeOption extends ImageTypeOption { }

export interface ElementMagicTypeOption extends SimpleOptionResponse {
  selected: boolean;
}

export interface StyleDecorationTypeOption extends ElementMagicTypeOption { }

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

/**
 * AiArtworkCreateVo_request
 */
export interface AICreateRequest {
  /**
   * 加速前进的步数。
   * 默认0，每加1就是往队列前面多插1位，一次对应2积分（批量作画的积分消耗则还要算上对应作画数量）。
   */
  accelerate_times: number;
  /**
   * 艺术家，支持传入多个，优先于artist，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的艺术家（`artist`-`name`）字段。
   */
  artists?: string[];
  /**
   * 提示词相关性（CFG scale），取值范围[1-30]，默认值7。
   * 表示AI对描述参数的倾向程度，数值越大会越专注于提示词的内容，生成更加符合描述的图像。
   */
  cfg?: number;
  /**
   * 角色同人，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的角色（`character`-`key`）字段。
   */
  character?: string[];
  /**
   * 画面描述匹配度，取值范围 [1～12] (DD不支持)。
   * 描述画面的准确程度与数值大小成反比，数值越小表示对图像的控制度越高，最佳使用区间为1-2。
   */
  clip_skip?: number;
  /**
   * control image to image, 是否开启controlNet-img2img模式，可选值：true、false。
   * 注: 该参数只在controlNet模式下生效
   */
  control_img2_img?: boolean;
  /**
   * Control Mode(previously called Guess Mode)，可选值：0、1、2。
   * 使用该参数可以控制哪方面更加重要：
   * 0 - 平衡。
   * 1 - prompt作画描述更重要。
   * 2 - ControlNet更重要。
   * 注: 该参数只在controlNet模式下生效
   */
  control_mode?: number;
  /**
   * control模式权重，取值范围 [0~2]
   */
  control_weight?: number;
  /**
   * 图生图模式，默认0。
   * 0 - 自定义尺寸，需要自定义出图宽高、超分、精绘（width height superSizeMultiple prefineMultiple）。
   * 1 - 自动尺寸，需要指定底图宽高（initWidth
   * initHeight），系统会忽略上述自定义参数，根据底图自动计算出图宽高（如果底图长边小于2048,会保证出图长边为2048，短边则按底图比例求得；反之,则出图尺寸与底图相同）。
   * 两种模式下均可以不传prompt,此时会自动获取图片的tag作为prompt。
   */
  create_source?: number;
  /**
   * 创意度/二次元强度，默认50，取值范围为[0-100]。
   * 创意度越低，生成的图片越接近参考图。
   * 注：
   * 1. 使用底图（即`init_image_url`有值）时才会生效。
   * 2. 对应模型中的参数为去噪强度（denoising strength）。
   */
  creativity_degree?: number;
  /**
   * 元素魔法，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的元素魔法（`element_magic`-`key`）字段。
   */
  element_magic?: string[];
  /**
   * 是否完全控制负向描述词，可选值：true、false，默认：false。
   * true：仅客户上定义的负面描述词会生效。
   * false：使用官方模型定义的负向描述。
   */
  fully_custom_uc_prompt?: boolean;
  /**
   * 图片高度。限制参考width。
   */
  height?: number;
  /**
   * 精绘时的噪声强度。
   */
  hr_second_pass_strength?: number;
  /**
   * 画面类型，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的画面类型（`image_type`-`name`）字段。
   */
  image_type?: string[];
  /**
   * 底图高度。
   * 建议和输入底图的高度保持一致，不一致时平台按此值计算。
   * 注：使用ControlNet时或createSource=1时必填。
   */
  init_height?: number;
  /**
   * 图生图底图URL。
   * 注：
   * 1. 图片大小要限制在2M以内，强烈建议提前压缩，图片大小不影响出图效果。
   * 2. 若使用七牛云地址，支持psd、jpeg、png、gif、webp、tiff、bmp、avif、heif格式的图片。
   * 3.
   * 若为其他地址，仅支持jpg、png、webp、jpeg格式。外部链接的可用性和延迟需要客户自己保障，否则失败率会上升。如果是临时链接，建议有效期大于1个小时，以避免极端情况。
   * 4. 如果传了底图，但是prompt没传，会自动获取图片的tag填充为prompt来进行图生图。
   * 5. 使用ControlNet时必填，为保证作图质量，ControlNet所做图片会保证最长边分辨率最低为2048，短边等比调整。
   */
  init_image_url?: string;
  /**
   * 底图宽度。
   * 建议和输入底图的宽度保持一致，不一致时平台按此值计算。
   * 注：使用ControlNet或createSource=1时必填。
   */
  init_width?: number;
  /**
   * 模型code，可通过`获取作画模型列表(/ai/model_base_infos)`接口查询，获取对应列表接口返回的`model_code`字段。
   */
  model: number;
  /**
   * 模型融合，限制数量不超过5个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的的融合模型（`model_fusion`-`key`）字段。
   */
  model_fusion?: AiArtworkModelFusionVORequest[];
  /**
   * 模型特定参数，JSON格式，可选值：mask_image_url、mask_zone_image_url。
   * 使用场景：涂抹（model为4）：
   * 1. mask_image_url：涂抹底图。
   * 2. mask_zone_image_url：涂抹区域图。
   */
  model_param?: string;
  /**
   * multiDiffusion插件参数。
   * 该插件的原理简单地说是将原有的图片变成拼图的碎片，每块拼图分别加以高清化的绘制，最后拼成一张大图片。(object)
   */
  multi_diffusion?: MultiDiffusionVORequest;
  /**
   * 回调url
   * 回调重试规则：
   * 1. 支持5级重试时间: 5, 10, 30, 60, 120 (单位：秒)，也就是分别会在5s、10s、30s...时进行回调重试
   * 2. 当回调通知方返回"success"时，我们会认为您已经成功处理回调，并终止重试
   * 回调报文：
   * ```
   * {
   * "artwork_url": "https://cdn.wujiebantu.com/ai/530FFE6722D2A2B4A9504166221AAB40-01.jpg",
   * "audit_info": {
   * "check_fail": false,
   * "hit": false,
   * "data_id": "245959",
   * "total_suggestion": "PASS",
   * "scan_scene_d_t_o_s": [{
   * "rate": 0.9944,
   * "suggestion": "pass",
   * "label": "politics",
   * "label_desc": "涉政",
   * "scene": "TERRORISM"
   * },
   * {
   * "rate": 1,
   * "suggestion": "pass",
   * "label": "terrorism",
   * "label_desc": "暴恐",
   * "scene": "TERRORISM"
   * },
   * {
   * "rate": 0.9993,
   * "suggestion": "pass",
   * "label": "porn",
   * "label_desc": "色情",
   * "scene": "PORN"
   * },
   * {
   * "rate": 1,
   * "suggestion": "pass",
   * "label": "prohibition",
   * "label_desc": "违禁",
   * "scene": "TERRORISM"
   * },
   * {
   * "rate": 0.9986,
   * "suggestion": "pass",
   * "label": "sexy",
   * "label_desc": "性感",
   * "scene": "PORN"
   * }
   * ],
   * "url": "https://cdn.wujiebantu.com/ai/810F1750EFF2EC416ED6682DFFCFBF2C-01.jpg-v800"
   * },
   * "batch_task_key": "14DBBD0743C8715D92183756E3FB398C",
   * "code": 0,
   * "complete_time": 1681109462,
   * "integral_cost": 2,
   * "integral_cost_message": "积分已扣除",
   * "involve_yellow": 0,
   * "key": "EF8DF2DCF18D0D69F7F836A100C857AF",
   * "success": true
   * }
   * ```
   * 包含字段注释：
   * success - 作画是否成功
   * code - 作画是否成功code，0=成功 1=失败
   * key - 对应作画任务的key
   * artwork_url - 作画生成结果图url
   * complete_time - 作画完成时间
   * integral_cost - 积分花费
   * integral_cost_message - 积分花费说明
   */
  notify_url?: string;
  /**
   * 批量生成的数量，默认1张，上限100张。
   * 注：使用Midjourney模型创建的数量必须为4的倍数。
   */
  num: number;
  /**
   * 模型所支持的模式，可通过`获取作画模型的预设资源(/ai/default_resource)`接口查询，获取返回列表中的（`patterns`-`name`）字段。
   */
  pattern?: string;
  /**
   * 图片精绘倍数，默认不精绘，可传小数，取值范围为[1~2]。
   * 精绘是另一种将图片放大的方式，需要重新绘制一遍图片，会有较长的额外耗时，在细节刻画上表现更出色，也会消耗更多积分。
   * 注：目前也支持精绘+超分组合使用（仅支持先精绘后超分），但仅支持2倍超分。
   */
  prefine_multiple?: number;
  /**
   * 预处理方式，用来对预处理图片进行处理。
   * 1. INVERT_SCRIBBLE：反色。
   * 2. FAKE_SCRIBBLE：假涂鸦。
   * 3. SCRIBBLE：预处理。
   * 4. NONE：无预处理。
   */
  pretreatment_method?: string;
  /**
   * 作画描述，1000字符以内。
   * 可选平台资源接口预设的prompt来查看效果。
   * 注：
   * 1.若未传底图（即`init_image_url`为空）时，作画描述不能为空。
   * 2.若传了底图，且作画描述为空，会自动获取图片的tag填充为prompt来进行图生图。
   * Validate[max: 1500; ]
   */
  prompt?: string;
  /**
   * 采样模式（Sampler）是指扩散去噪算法的采样模式，如果设置正确，它们会发散并最终收敛。
   *
   * 不同model支持的采样模式不同，可通过`获取作画模型的预设资源(/ai/default_resource)`接口查询，获取返回信息列表中的采样模型（`sampler_models`-`sampler_index`）字段。
   */
  sampler_index?: number;
  /**
   * 随机种子，生成图片的seed，默认-1随机生成。
   * 通过随机种子确定扩散的初始状态，进而控制生成的样本的多样性。
   * 相同的种子值可以保持图像的一致性，若设置相同的种子编号、模型，可以重新生成类似的图像。
   * 注：目前不支持字母，传字母会导致作画超时或失败。
   */
  seed?: string;
  /**
   * 采样步数（sampling steps），默认20。
   * 注：
   * 1. 随着步数的增大，可得到更精确的图像，但步数对出图耗时影响较大，过高会影响图片生成速度并产生扭曲。
   * 2. 支持输入自定义步长，根据超出预设步长倍数额外收取积分,详见收费规则介绍。
   */
  steps?: number;
  /**
   * 风格，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的风格（`style`-`name`）字段。
   */
  style?: string[];
  /**
   * 风格选择参数，限制数量不超过10个。
   * 可通过`获取作画模型的预设资源(ai/default_resource)`接口查询，获取返回列表中的元素魔法（`style_decoration`-`key`）字段。
   * imageType，style，artist，elementMagic本质上也都属于styleDecoration。
   */
  style_decoration?: string[];
  /**
   * 风格模型，可通过`获取作画风格模型的预设资源(/ai/default_resource_style_model)`接口查询，获取对应列表返回的`key`字段。
   */
  style_model?: string;
  /**
   * 图片超分倍数，默认不超分，可传小数，取值范围为[1-4]。
   * 注：
   * 1. 宽高超分倍数一致，向下取整。例如宽高为512，超分1.9倍，出图宽高为972。
   * 2. 超分的额外耗时较短，效果仅是单纯提高图片分辨率，不会变更AI出图后的内容。
   * 3. ControlNet下该参数不需要指定，其超分由底图宽高决定（长边<=2048时，默认超分到2048，大于时，底图会被缩放到1024，再超分两倍）。
   */
  super_size_multiple?: number;
  /**
   * 作画负面描述，1000字符以内，可以补充不需要在图片里看到的内容。
   * 注：
   * 1. 无界AI的模型，基本都会预设一些默认的负面描述。
   * 2. 直接填内容即可，不需要再次否定。
   * Validate[max: 1000; ]
   */
  uc_prompt?: string;
  /**
   * 图片宽度。
   * <br/>注：
   * <ol>
   * <li>支持自定义尺寸，尺寸要求为64的倍数，最小尺寸为64，尺寸不为64的倍数的，会向64对齐， 例96对齐64， 97对齐到128。</li>
   * <li>默认尺寸最长边限制在1344以内。</li>
   * <li>若使用精绘，长边需限制在1024以内，分辨率限制在1024*576以内。</li>
   * <li>使用controlnet或者createSource=1时可不传，其余情况下必填。</li>
   * <li>使用cutdiffion单边范围为【1088，3072】,分辨率乘积不超过5017600。</li>
   * </ol>
   */
  width?: number;

}

/**
 * AiArtworkModelFusionVO_request
 */
export interface AiArtworkModelFusionVORequest {
  /**
   * 融合模型key
   */
  key?: string;
  /**
   * 权重
   */
  weight?: number;

}

/**
 * multiDiffusion插件参数。
 * 该插件的原理简单地说是将原有的图片变成拼图的碎片，每块拼图分别加以高清化的绘制，最后拼成一张大图片。(object)
 *
 * MultiDiffusionVO_request
 */
export interface MultiDiffusionVORequest {
  /**
   * 平铺扩散(object)
   */
  tiled_diffusion?: TiledDiffusionVORequest;
  /**
   * 平铺VAE(object)
   */
  tiled_vae?: TiledVaeVORequest;

}

/**
 * 平铺扩散(object)
 *
 * TiledDiffusionVO_request
 */
export interface TiledDiffusionVORequest {
  /**
   * 分区控制状态。
   */
  bbox_control_states?: RegionPromptControlVORequest[];
  /**
   * 可选值：true、false，默认值：false。
   */
  causal_layers: boolean;
  /**
   * 尝试加载controlnet至cpu，可选值：true、false，默认值：false。
   * true：加载。
   * false：不加载。
   */
  control_tensor_cpu: boolean;
  /**
   * 是否绘制完整的画布背景，可选值：true、false，默认值：false。
   * true：是。
   * false：否。
   */
  draw_background: boolean;
  /**
   * 是否启用分区控制，可选值：true、false，默认值：false。
   * 注：启用该控制时Tiled_Diffusion必须启用。
   * true：是。
   * false：否。
   */
  enable_bbox_control: boolean;
  /**
   * 是否启用tiled_diffusion插件，可选值：true、false，默认值：true。
   * true：启用。
   * false：不启用。
   */
  enabled: boolean;
  /**
   * 图像高度，默认值：1024
   */
  image_height: number;
  /**
   * 图像宽度，默认值：1024
   */
  image_width: number;
  /**
   * 保持输入图像大小，可选值：true、false，默认值：false。
   * true：默认原图的尺寸比例进行放大。
   * false：按照缩放模式指定的长宽比进行放大。
   */
  keep_input_size: boolean;
  /**
   * 方案，可选值：MultiDiffusion、Mixture of Diffusers，默认值：MultiDiffusion。
   * MultiDiffusion：多重扩散。
   * Mixture of Diffusers：混合扩散。
   * Validate[regexp:   MultiDiffusion|Mixture of Diffusers; ]
   */
  method: string;
  /**
   * 是否启用噪声反转，可选值：true、false，默认值：false。
   * true：启用。
   * false：不启用。
   */
  noise_inverse: boolean;
  /**
   * 重铺噪声大小。
   * 取值范围：2~512，默认值：64。
   */
  noise_inverse_renoise_kernel: number;
  /**
   * 重铺噪声强度。
   * 取值范围：0.0~2.0，默认值：1.0。
   */
  noise_inverse_renoise_strength: number;
  /**
   * 修复程度。
   * 取值范围：1.0～100.0，默认值：1.0。
   */
  noise_inverse_retouch: number;
  /**
   * 反转步数。
   * 取值范围：1～200，默认值：10。
   */
  noise_inverse_steps: number;
  /**
   * 潜变量分块重叠：用来消除拼图碎片之间的接缝，数值越大，合并的速度越慢，但包含更少的接缝和更自然的结果。
   * 取值范围：0～256，默认值：48。
   */
  overlap: number;
  /**
   * 是否覆盖图像尺寸，指能够做出超出原有SD模型的限制，做出更大的图像。
   * 可选值：true、false，默认值：false。
   * true：是。
   * false：否。
   */
  overwrite_size: boolean;
  /**
   * 缩放比例，即按照原图像尺寸为基础按照该比例高清化。
   * 取值范围：1.0～8.0，默认值：2.0。
   */
  scale_factor: number;
  /**
   * 潜变量分块单批数量，以批处理的方式处理拼图碎片，能加快处理速度，但会消耗更多的显存。
   * 取值范围：1～8，默认值：4。
   */
  tile_batch_size: number;
  /**
   * 潜变量分块高度：之前的拼图碎片块的高度。
   * 取值范围：16～256，步长16，默认值：96。
   */
  tile_height: number;
  /**
   * 潜变量分块宽度：之前的拼图碎片块的宽度。
   * 取值范围：16～256，步长16，默认值：96。
   */
  tile_width: number;
  /**
   * 放大算法，默认值：'None'。
   * 可选值[10]：None、Lanczos、Nearest、ESRGAN_4x、LDSR、R-ESRGAN 4x+、R-ESRGAN 4x+ Anime6B、ScuNET
   * GAN、ScuNET PSNR、SwinIR 4x。
   * Validate[regexp:   None|Lanczos|Nearest|ESRGAN_4x|LDSR|R-ESRGAN 4x\\+|R-ESRGAN 4x\\+
   * Anime6B|ScuNET GAN|ScuNET PSNR|SwinIR 4x; ]
   */
  upscaler_name: string;

}

/**
 * RegionPromptControlVO_request
 */
export interface RegionPromptControlVORequest {
  /**
   * 区域类型，可选值：Background、Foreground，默认值：Background
   * Background：背景
   * Foreground：前景
   * Validate[regexp:   Background|Foreground; ]
   */
  blend_mode: string;
  /**
   * 启用区域，可选值：true、false，默认值：true。
   * true：启用。
   * false：不启用。
   */
  enabled: boolean;
  /**
   * 选择前景（即blend_mode=Foreground）时生效，默认值：0.2
   */
  feather_ratio: number;
  /**
   * 画布高度，默认值：0.2
   */
  h: number;
  /**
   * 反向描述词，默认值：''
   */
  neg_prompt: string;
  /**
   * 描述词，默认值：''
   */
  prompt: string;
  /**
   * 随机种子，默认值：-1
   */
  seed: number;
  /**
   * 画布宽度，默认值：0.2
   */
  w: number;
  /**
   * 画布x坐标，默认值：0.4
   */
  x: number;
  /**
   * 画布y坐标，默认值：0.4
   */
  y: number;

}

/**
 * 平铺VAE(object)
 *
 * TiledVaeVO_request
 */
export interface TiledVaeVORequest {
  /**
   * 快速编码器颜色修正,如果觉得放大之后的色彩出现问题，可以启用该选项修正。
   * 可选值：true、false，默认值：false。
   * true：启用。
   * false：不启用。
   */
  color_fix: boolean;
  /**
   * 解码器切片大小,该插件会根据硬件自动调整该数值，保持默认即可。
   * 取值范围：48~512，步长16，默认值：192。
   */
  decoder_tile_size: number;
  /**
   * 是否启用Tiled VAE，可选值：true、false，默认值：true。
   * true：启用。
   * false：不启用。
   */
  enabled: boolean;
  /**
   * 编码器切片大小,该插件会根据硬件自动调整该数值，保持默认即可。
   * 取值范围：256~4096，步长16，默认值：3072。
   */
  encoder_tile_size: number;
  /**
   * 快速解码器,可选值：true、false，默认值：true。
   * true：使用。
   * false：不使用。
   */
  fast_decoder: boolean;
  /**
   * 快速编码器,可选值：true、false，默认值：true。
   * true：启用。
   * false：不启用。
   */
  fast_encoder: boolean;
  /**
   * 尝试加载VAE到显存,可选值：true、false，默认值：true。
   * true：加载。
   * false：不加载。
   */
  vae_to_gpu: boolean;

}


/**
 * ResultAiArtworkKeysVo_response
 */
export interface AICreateResponse extends BaseRes {

  /**
   * 返回数据(object)
   */
  data?: AiArtworkKeysVoResponse;
}

/**
 * 返回数据(object)
 *
 * AiArtworkKeysVo_response
 */
export interface AiArtworkKeysVoResponse {
  /**
   * 预计总消耗积分数
   */
  expected_integral_cost?: number;
  /**
   * 作画结果Key列表
   */
  keys?: string[];
  /**
   * 作画结果result列表
   */
  results?: CrAiArtworkCreateResultResponse[];

}

/**
 * CrAiArtworkCreateResult_response
 */
export interface CrAiArtworkCreateResultResponse {
  /**
   * 批量任务id，同一次作画请求生成的不同作画拥有相同的batchTaskKey
   */
  batch_task_key?: string;
  /**
   * 预计作画时间expectedSecond
   */
  expected_second?: number;
  /**
   * 作画结果key
   */
  key?: string;

}

export interface GetAiArtWorkHistoryResponse extends BaseRes {
  data: PageResponseAiArtworkHistoryVoResponse
}

/**
 * 返回数据(object)
 *
 * PageResponseAiArtworkHistoryVo_response
 */
export interface PageResponseAiArtworkHistoryVoResponse {
  /**
   * 结果集
   */
  list?: AiArtworkHistoryVoResponse[];
  /**
   * 分页
   */
  page_num?: number;
  /**
   * 分页大小
   */
  page_size?: number;
  /**
   * 分页总数
   */
  total?: number;

}

/**
 * AiArtworkHistoryVo_response
 */
export interface AiArtworkHistoryVoResponse {
  /**
   * 作画key
   */
  key?: string;

}

/**
 * AiArtworkHistoryPageReq_request
 */
export interface GetArtworkHistoryListRequest {
  /**
   * 作画类型
   * PICTURE-普通版作画、PRO_PICTURE-专业版作画、TEXT2VIDEO-文生视频、IMG2VIDEO-图生视频、
   * VIDEO2VIDEO-视频生视频、AVATAR-化身训练、CAMERA_ADVANCED-高级版相机、CAMERA_SPEED-极速版相机
   */
  ai_artwork_type: string;
  /**
   * 分页
   */
  page_num: number;
  /**
   * 分页大小
   * Validate[max: 100; ]
   */
  page_size: number;
}


/**
 * ResultAiArtworksGeneratingInfoVo_response
 */
export interface GetArtworkHistoryDetailListRes extends BaseRes {
  /**
   * 返回数据(object)
   */
  data?: AiArtworksGeneratingInfoVoResponse;
}

/**
 * 返回数据(object)
 *
 * AiArtworksGeneratingInfoVo_response
 */
export interface AiArtworksGeneratingInfoVoResponse {
  /**
   * 作画结果列表
   */
  list?: AiArtworkGenerateingInfoVoResponse[];

}

/**
 * AiArtworkGenerateingInfoVo_response
 */
export interface AiArtworkGenerateingInfoVoResponse {
  /**
   * 作画结果图的审核结果(v1.1.9新增字段，2023年2月23号之后的作画结果会有值。)
   * <p>
   * 旧：{"vendor": 1, "result": "对应厂商的审核结果json"}
   * </p>
   * <ul>
   * <li>1对应结果，<a
   * href="https://help.aliyun.com/document_detail/70292.html?spm=a2c4g.70292.0.0.4ffd342b6TC42l">参考</a></li>
   * <li>2对应结果，<a
   * href="https://support.dun.163.com/documents/588434277524447232?docId=791822473634779136">参考</a></li>
   * </ul>
   * <p></p>
   * 结果中需关注字段解释：
   * <ul>
   * <li>check_fail：检测是否成功，正常都会成功，安全起见——如果失败建议也拦截</li>
   *
   * <li>total_suggestion：总体建议，级别有——PASS(通过)->REVIEW(需要人工审核)->BLOCK(不通过)。scan_scene_d_t_o_s中的suggestion都是PASS总体才会是PASS，只要有一个是BLOCK就会是BLOCK，没有BLOCK存在REVIEW就会是REVIEW</li>
   * <li>scan_scene_d_t_o_s：各场景检测结果列表。
   * <ul>
   * <li>suggestion：枚举参考外层的total_suggestion</li>
   * <li>lable：场景下的标签，有label_desc进行描述。目前porn返回suggestion是review的话会比较性感低俗可以考虑拦截</li>
   * <li>scene：场景，TERRORISM——暴恐涉政违禁、PORN——鉴黄</li>
   * </ul>
   * </li>
   * </ul>
   */
  audit_info?: string;
  /**
   * 完成百分比
   */
  complete_percent?: number;
  /**
   * 实际完成时间戳
   */
  complete_time?: number;
  /**
   * 预计完成还需要多少秒
   */
  expected_seconds?: number;
  /**
   * 作画失败原因(object)
   */
  fail_message?: FailMessageVoResponse;
  /**
   * 消耗积分数，包括生成、加速、精绘等
   */
  integral_cost?: number;
  /**
   * 积分消耗提示词
   * 1. 积分已扣除
   * 2. 积分已退还
   * 3. 积分不足, 部分扣款失败
   * 4. 积分扣除中，请稍后查询
   * 5. 不需要积分
   */
  integral_cost_message?: string;
  /**
   * 图片是否违规 (0：未违规，1：违规)
   * 注：
   * 1. 图片状态仍为生成成功，返回图片url并不做脱敏
   * 2. 该标识与无界产品审核条件一致，若需要对审核结果自定义处理，建议使用audit_info内审核信息。
   */
  involve_yellow?: number;
  /**
   * 作品key
   */
  key?: string;
  model_prompt?: string;
  /**
   * 结果图片信息
   */
  picture_url?: string;
  /**
   * 在此作品之前有多少任务排队
   */
  queue_before_num?: number;
  /**
   * 每前进一步减少的时间
   */
  reduce_time?: number;
  /**
   * 开始生成的时间戳（仍在排队返回0）
   */
  start_gen_time?: number;
  /**
   * 状态(0-已提交 1-排队中 2-生成中 3-生成失败 4-生成成功  -1 - 已撤销)
   */
  status?: number;

}

/**
 * 作画失败原因(object)
 *
 * FailMessageVo_response
 */
export interface FailMessageVoResponse {
  /**
   * 失败码
   */
  fail_code?: number;
  /**
   * 失败原因描述
   */
  fail_message?: string;

}