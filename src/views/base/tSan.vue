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
    initModal()
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

function initModal(){
    const geometry = new THREE.BufferGeometry();
    const verpoint = new Float32Array([
        -1.0,-1.0,0.0,
        1.0,-1.0,0.0,
        1.0,1.0,0.0,
        
        // 1,1,0,
        -1.0,1.0,0.0,
        // -1,-1,0,
    ])
    geometry.setAttribute('position',new THREE.BufferAttribute(verpoint,3))
    const indext = new Uint16Array([0,1,2,2,3,0])
    geometry.setIndex(new THREE.BufferAttribute(indext,1));

   


    const material = new THREE.MeshBasicMaterial({ color:0x00ff00 ,side:THREE.DoubleSide,wireframe:true});
    const material1 = new THREE.MeshBasicMaterial({ color:0x00ff00 ,});
     //设置顶点组   start 从第几个开始 num 几个点 material 什么材质的index
     geometry.addGroup(0,3,0)
     geometry.addGroup(3,3,1)
    const mesh = new THREE.Mesh(geometry,[material,material1]);
    const boxgeometry = new THREE.BoxGeometry(1,1,1);
    const material11 = new THREE.MeshBasicMaterial({ color:0x00ff00 ,});
    const mesh11 = new THREE.Mesh(boxgeometry,material11);
    mesh11.position.x = 10
    app.scene.add(mesh)
    app.scene.add(mesh11)
    
}
</script>