import { RecordRTCPromisesHandler, StereoAudioRecorder, invokeSaveAsDialog } from 'recordrtc'
import type { CreateRecRes, GetRecTaskDetailRes } from '../types'
export interface RecoderOptions {
  onData?: (blob: Blob) => void
}
export function useAudioRecorder(options?: RecoderOptions) {
  let recorder: RecordRTCPromisesHandler | undefined
  const result = ref<Blob>()
  const startTime = ref<Date>()
  const duration = ref<number>(0)
  let timer: any
  const { stream, start: streamStart, stop: streamStop, enabled: recording } = useUserMedia({
    constraints: {
      audio: {
        echoCancellation: true,
      },
    },
  })

  onUnmounted(() => {
    stop(true)
  })

  async function start(maxDuration = 1000 * 60) {
    if (recording.value) {
      return
    }
    try {
      await streamStart()
    }
    catch (e) {
      // 用户拒绝
      console.error(e)
      // dialog.toast({ message: '请允许访问麦克风', type: DIALOG.WARNING })
      ElMessage.error('请允许访问麦克风')
      recorder = undefined
      throw e
    }
    if (!stream.value) {
      return
    }
    recorder = new RecordRTCPromisesHandler(stream.value, {
      type: 'audio',
      recorderType: StereoAudioRecorder,
      mimeType: 'audio/wav',
      // sampleRate: 16000, // 不能选这个
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
    })
    startTime.value = new Date()
    await recorder.startRecording()
    timer = setTimeout(() => {
      stop()
    }, maxDuration)
    return recorder
  }

  async function stop(cancel = false) {
    clearTimeout(timer)
    if (recorder && stream.value) {
      await recorder.stopRecording()
      streamStop()
      if (!cancel) {
        result.value = await recorder.getBlob()
        duration.value = new Date().getTime() - startTime.value!.getTime()
        if (options?.onData) {
          options.onData(result.value!)
        }
        return result.value
      }
    }
  }

  return {
    start,
    stop,
    result,
    recording,
    duration,
    stream,
  }
}


export const createRecTask = async (base64: string) => {
  const runtimeConfig = useRuntimeConfig();
  return await $fetch<CreateRecRes>(`/api/asr/createRecTask`, {
    method: 'POST',
    body: {
      data: base64
    },
    baseURL: runtimeConfig.public.apiBase,
  })
}

export const getRecTaskStatus = async (taskId: number) => {
  const runtimeConfig = useRuntimeConfig();
  return await $fetch<GetRecTaskDetailRes>(`/api/asr/getRecTaskStatus`, {
    method: 'POST',
    body: {
      TaskId: taskId
    },
    baseURL: runtimeConfig.public.apiBase,
  })
}