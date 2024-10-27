<template>
    <div
        class="w-full h-[69px] flex justify-between items-center backdrop-blur-[1px] bg-gradient-to-t from-black to-transparent">
        <div class="flex items-center">
            <img class="ml-[17px] w-[35px] h-[35px] rounded-full" src="~/assets/head.jpeg">
            <span class="userName ml-[10px]">黄静远</span>
        </div>
        <div class="flex items-center">
            <img class="w-[17px] h-[14px] mr-[6px]" src="~/assets/love.png" alt="">
            <span class="loveNum mr-[27px]">1.5w</span>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
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