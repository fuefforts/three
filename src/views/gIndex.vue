<template>
    <div class="three_wrapper">
        <div class="top">
            <div v-for="item in ButtonList" :key="item.name" @click="changeButton(item)">{{ item.name }}</div>
        </div>
        <div class="content">
            <component :is="componentVal "></component>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */

// 饼图
import Pie from "./pie/tPie.vue";
import Tsan from "./base/tSan.vue";
import { reactive, ref, watch } from "vue";

const ComponetName = ref('')
const componentVal = ref('');
const ButtonList = reactive([{
    name:"饼图",
    componetName:Pie
},{
    name:"三角",
    componetName:Tsan
}])

const changeButton = (item)=>{
    ComponetName.value = item.name
}

watch(ComponetName,(pre)=>{
    componentVal.value = ButtonList.find(d=>d.name === pre).componetName;
})

</script>


<style lang="less">
    .three_wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .top{
            height: 40px;
        }
        .content{
            flex: 1;
        }
    }
</style>