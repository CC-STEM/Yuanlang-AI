import fs from "fs";
import archiver from "archiver";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in", // 默认值
    },
  },
  css: ["~/assets/css/index.css", "~/assets/css/main.css"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    // "vue-drag-resize",
  ],
  routeRules: {
    "/create": {
      ssr: false,
    },
    "/realCreate": {
      ssr: false
    },
    "/detail": {
      ssr: false
    },
    "/home": {
      ssr: false
    }
    // "/": {
    //   redirect: "/explore",
    // },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-px-to-viewport-8-plugin": {
        // 需要转换的单位，默认为"px"
        unitToConvert: "px",

        // 设计稿的视口宽度
        viewportWidth: 1920,

        // 单位转换后保留的精度
        unitPrecision: 5,

        // 能转化为vw的属性列表
        propList: ["*"],

        // 希望使用的视口单位
        viewportUnit: "vw",

        // 字体使用的视口单位
        fontViewportUnit: "vw",

        // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        selectorBlackList: [".ignore", ".hairlines"],

        // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        minPixelValue: 1,

        // 媒体查询里的单位是否需要转换单位
        mediaQuery: false,

        //  是否直接更换属性值，而不添加备用属性
        replace: true,

        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        exclude: [/node_modules/, /dist/, /.output/, /.nuxt/, /.vscode/],

        // 如果设置了include，那将只有匹配到的文件才会被转换
        include: ["app.vue", /pages/, /assets\/styles\/*/],

        // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        landscape: false,

        //   // 横屏时使用的单位
        //   landscapeUnit: "vw",

        //   // 横屏时使用的视口宽度
        //   landscapeWidth: 1338,
      },
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://yuanlang-test.jkcspace.com/api",
        changeOrigin: true,
        prependPath: true,

        //nitro 没有重写路径
      },
    },
    logLevel: "info",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "",
    },
  },
  hooks: {
    close: async () => {
      console.log("产物构建完成后压缩");

      const output = fs.createWriteStream(".output.zip");
      const archive = archiver("zip", {
        zlib: { level: 9 }, // 设置压缩级别
      });

      output.on("close", function () {
        console.log(`压缩完成，总共 ${archive.pointer()} 字节`);
      });

      archive.on("error", function (err: any) {
        throw err;
      });

      archive.pipe(output);

      // 将 .output 目录中的文件添加到压缩包
      archive.directory(".output/", false);

      await archive.finalize();
    },
  },
  // build: {
  //   transpile: [
  //     '@vueuse/integrations/useQRCode'
  //   ]
  // },
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       external: [
  //         'qrcode'
  //       ]
  //     }
  //   }
  // },
});
