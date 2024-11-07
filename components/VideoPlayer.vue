<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css';
import PlayPNG from '@/assets/play.png';
import PausePNG from '@/assets/pause.png';
import FullScreenPNG from '@/assets/fullScreen.png';
import ExitFullScreenPNG from '@/assets/exitFullScreen.png';
import { ElMessage } from 'element-plus';

interface Props {
  videoUrl: string;
  lessonName: string;
  lessonId: number;
}

const props = defineProps<Props>();

const playerRef = ref(null);

const myPlayer = ref<Player | null>(null);

const isPlay = ref(false);

const isFullScreen = ref(false);

const curVideoUrl = ref<string>(props.videoUrl);

watch(
  () => props.videoUrl,
  (newVal) => {
    console.log('videoUrl', newVal);
    curVideoUrl.value = newVal;
    if (myPlayer.value) {
      if (!curVideoUrl.value) {
        ElMessage({
          type: 'error',
          message: '当前视频资源异常，请联系管理员检查'
        });
      }
      myPlayer.value.src(curVideoUrl.value);
      myPlayer.value.reset();
    }
  }
);

onMounted(() => {
  videojs.hook('error', function (player: Player, err: any) {
    console.log(
      `player ${player.id()} has errored out with code ${err.code} ${err.message
      }`
    );
  });
  if (playerRef.value) {

    myPlayer.value = videojs(
      playerRef.value,
      {
        // poster: PlayerPosterImg,
        controls: true,
        sources: [
          {
            src: curVideoUrl.value,
            type: 'video/mp4'
          }
        ],
        controlBar: {
          children: [
            'playToggle',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'volumePanel',
            'fullscreenToggle'
          ],
          remainingTimeDisplay: {
            displayNegative: false
          },
          volumePanel: {
            inline: false,
            vertical: true
          }
        },
        playbackRates: [0.5, 1, 1.5, 2]
        // aspectRatio: '16:9' //视频的宽高比
        // fluid: true // 自适应尺寸
      },
      () => {
        myPlayer.value!.log('play.....');
      }
    );

    if (myPlayer.value) {
      // 设置播放器监听器
      myPlayer.value.on('play', () => {
        console.log('play');
        isPlay.value = true;
      });

      myPlayer.value.on('pause', async () => {
        console.log('pause');
        console.log('myPlayer.value', myPlayer.value);
        const totalDuration = myPlayer.value!.duration();
        console.log('totalDuration', totalDuration);
        const currentTime = myPlayer.value!.currentTime();
        console.log('currentTime', currentTime);

        isPlay.value = false;
        // 暂停时获取播放进度并上报
      });

      myPlayer.value.on('enterFullWindow', () => {
        console.log('enterFullWindow');
      });

      myPlayer.value.on('exitFullWindow', () => {
        console.log('exitFullWindow');
      });

      myPlayer.value.on('fullscreenchange', () => {
        console.log(document.fullscreenElement);
        isFullScreen.value = Boolean(document.fullscreenElement);
      });
    }
  }
});

// 页面突然关闭需要记录当前播放进度并上报
// if (window.addEventListener) {
//   window.addEventListener('beforeunload', countTime, false);
// } else {
//   window.attachEvent('onbeforeunload', countTime);
// }

const playIcon = computed(
  () =>
    'no-repeat center center ' +
    (isPlay.value ? `url(${PausePNG})` : `url(${PlayPNG})`)
);

const fullScreenBackGround = computed(
  () =>
    'no-repeat center center ' +
    (isFullScreen.value ? `url(${ExitFullScreenPNG})` : `url(${FullScreenPNG})`)
);

onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose();
  }
});
</script>

<template>
  <div class="videoContainer">
    <div class="videoTitle">
      {{ props.lessonName }}
    </div>
    <video ref="playerRef" class="video-js vjs-big-play-centered myVideo" style="margin: auto auto"></video>
  </div>
</template>
<style>
.videoContainer {
  width: 100%;
  height: 100%;

  .videoTitle {
    width: 100%;
    height: 9.8%;
    font-size: 1.25vw;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    padding-top: 1.875vw;
    padding-bottom: 1.3vw;
    display: flex;
    align-items: center;
  }

  .myVideo {
    width: 100%;
    height: calc(100% - 37px)
  }

  .pagePtn {
    width: 100%;
    height: 7.5%;
  }

  .vjs-big-play-centered .vjs-big-play-button {
    margin-top: -1.5em;
  }

  .vjs-poster {
    background-size: cover;
  }

  /* .video-js .vjs-icon-placeholder:before {
    height: 3em !important;
    line-height: 1.5em;
    font-size: 2em;
  } */

  .video-js .vjs-big-play-button {
    font-size: 2.5em !important;
    line-height: 2.3em !important;
    height: 2.5em !important;
    width: 2.5em !important;
    -webkit-border-radius: 2.5em !important;
    -moz-border-radius: 2.5em !important;
    border-radius: 2.5em !important;
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5) !important;
    border-width: 0.15em !important;
    margin-top: -1.25em !important;
    margin-left: -1.75em !important;
  }

  .vjs-big-play-button .vjs-icon-placeholder {
    font-size: 1.63em !important;
  }

  .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block !important;
  }

  .video-js .vjs-time-control {
    display: block !important;
  }

  .video-js .vjs-remaining-time {
    display: none !important;
  }

  .vjs-control-bar {
    height: 1.56vw;
  }

  .vjs-control-bar .vjs-play-control .vjs-icon-placeholder:before {
    content: '';
    background: v-bind(playIcon);
    border: none !important;
    box-shadow: none !important;
    width: 1.56vw;
    height: 1.56vw;
    background-size: 100% 100%;
  }

  .vjs-control-bar .vjs-mute-control .vjs-icon-placeholder:before {
    content: '';
    background: no-repeat url('@/assets/voice.png') center center;
    border: none !important;
    box-shadow: none !important;
    width: 1.56vw;
    height: 1.56vw;
    background-size: 100% 100%;
  }

  .vjs-control-bar .vjs-fullscreen-control .vjs-icon-placeholder:before {
    content: '';
    background: v-bind(fullScreenBackGround);
    border: none !important;
    box-shadow: none !important;
    width: 1.56vw;
    height: 1.56vw;
    background-size: 100% 100%;
  }

  .vjs-control-bar .vjs-progress-control .vjs-play-progress {
    background-color: #fce200;
  }

  .vjs-control-bar .vjs-progress-control .vjs-play-progress:before {
    content: '';
    background-image: url('@/assets/progressLogo.png');
    border: none !important;
    box-shadow: none !important;
    background-size: 100% 100%;
    width: 2vw;
    height: 2vw;
    position: absolute;
    right: -1vw;
    top: -1vw;
  }

  .video-js .vjs-volume-level {
    background-color: #fce200;
  }
}
</style>
