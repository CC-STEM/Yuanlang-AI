<template>
    <div
        class="w-full h-[69px] flex justify-between items-center backdrop-blur-[1px] bg-gradient-to-t from-black to-transparent">
        <div class="flex items-center">
            <img class="ml-[17px] w-[35px] h-[35px] rounded-full" :src="props.head ? props.head : DefaultHead">
            <span class="userName ml-[10px]">{{ props.name }}</span>
        </div>
        <div class="flex items-center">
            <img class="w-[34px] h-[37px] mr-[6px]" src="~/assets/love.png" alt="">
            <span class="loveNum mr-[27px]">{{ props.liked }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import DefaultHead from '../../assets/cclogo.png'
interface Props {
    name: string;
    head: string;
    liked: number;
}
const props = defineProps<Props>() 
</script>
<style scopde lang="scss">
.userName {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
}

.loveNum {
    font-family: DIN;
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
}
</style>