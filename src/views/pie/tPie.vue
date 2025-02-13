<template>
    <div class="three" ref="threejs"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TWEEN from '@tweenjs/tween.js';

import BasicThree from '@/utils/basicThree';
import * as THREE from "three";
const threejs = ref();
let app = null;
onMounted(() => {
    app = new BasicThree(threejs.value, {});
    threejs.value.appendChild(app.renderer.domElement);
    app.initHelper();
    app.scene.add(app.axesHelper)
    app.initGuiHelper();
    initModel()
    // 开始循环渲染
    render();
})

function render() {
    requestAnimationFrame(render);
    app.camera.updateProjectionMatrix();
    // app.renderer.render( app.scene, app.camera ); 常规渲染
    app.finalComposer.render();
    app.resizeRendererToDisplaySize(app.renderer)
    // TWEEN更新
    TWEEN.update();
}


function initModel(){
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

    app.scene.add(cubes);
    const folder = app.guiHelper.addFolder("立方体位置")
    cubes.forEach((f,i)=>{
        folder.add(f.position,'x').step(1).name(`第${i+1}个`).onChange(e=>{
            console.log(e);
        }).onFinishChange()
        
    })
}
function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  app.guiHelper.add(material,"wireframe").name("线框")
  
  app.scene.add(cube);
  app.guiHelper.addColor(material,"color").name("颜色").onChange(val=>{
    cube.material.color = val
})
  cube.position.x = x;
 
  return cube;
}

</script>

<style lang="less">
.three {
    height: 100%;
}
</style>