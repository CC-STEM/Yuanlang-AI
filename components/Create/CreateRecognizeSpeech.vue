<template>
  <el-button @click="toggleSpeechRecognition">{{ isSpeaking ? '停止' : '开始' }}录音</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
//测试语音识别
const prompt = ref('')
const isSpeaking = ref(false);
let recognition: any = null;
let finalResult = ''; // 保存最终结果的变量
let interimResult = ''; // 保存中间结果的变量
const toggleSpeechRecognition = () => {
  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    // recognition.grammars = speechRecognitionList;
    console.log('recognition:', recognition)
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-CN';
    recognition.maxAlternatives = 1;

    recognition.onresult = event => {
      console.log('regonize result:', event)
      interimResult = ''; // 清空中间结果
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalResult += event.results[i][0].transcript;
        } else {
          interimResult += event.results[i][0].transcript;
        }
      }
      prompt.value = finalResult + interimResult;
    };
  }
  if (isSpeaking.value) {
    finalResult = '';
    recognition.stop();
  } else {
    recognition.start();
  }
  isSpeaking.value = !isSpeaking.value;
};

watch(prompt, (newVal) => {
  console.log('newSpeechRecognition', newVal);
}, {
  deep: true,
  immediate: true
})
</script>

<style></style>