// threejs基础参数，配置场景、相机、渲染器、动画、灯光等
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// 引入gui 控制器调试
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min"
export default class BasicThree {
  constructor(el, option) {
    this.el = el;
    this.option = option;
    // 页面 | 组件 宽高
    this.width = this.el.offsetWidth;
    this.height = this.el.offsetHeight;

    // 场景
    this.scene = null;
    // 相机
    this.camera = null;
    // 渲染器
    this.renderer = null;
    // 辉光
    this.composer = null;
    // 渲染器通道
    this.renderPass = null;

    // 最终合成器
    this.finalComposer = null;

    // 相机轨道控制
    this.controls = null;

    //灯光
    this.ambientLight = null;
    this.directionalLight = null;

    // 世界坐标辅助器
    this.axesHelper = null;

    // GUI控制器
    this.guiHelper = null;

    this.initScene(); // 初始化场景
    this.initCamera(); // 初始化相机
    this.initRender(); // 初始化渲染器
    this.initComposer(); // 初始化辉光
    this.initRenderPass(); // 初始化渲染器通道
    this.initFinalComposer(); // 最终渲染

    this.initOrbitControls(); // 初始化相机轨道控制器
    this.initLight(); // 初始化灯光

    // this.initHelper(); // 初始化世界坐标辅助器

    // 使用被动事件监听提升性能
    window.addEventListener("resize", () => this._handleResize(), {
      passive: true,
    });
    // document.addEventListener("keydown", this._handleKeyDown, {
    //   passive: true,
    // });

    // 使用 ResizeObserver 监听元素大小变化
    const resizeObserver = new ResizeObserver(() => this._handleResize());
    resizeObserver.observe(this.el);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2("#000", 0.0025);
    this.scene.background = new THREE.Color("#000000");
  }
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      30, // 视角
      this.width / this.height, // 宽高比
      1, // 近平面
      10000 // 远平面
    );
    this.camera.position.set(0, 300, 100);
    this.camera.lookAt(0, 0, 0);
  }
  initRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
    this.renderer.setSize(this.width, this.height);
  }
  initComposer() {
    this.composer = new EffectComposer(this.renderer); // 辉光
    this.composer.renderToScreen = false;
  }
  initRenderPass() {
    this.renderPass = new RenderPass(this.scene, this.camera); // 创建一个渲染器通道，场景和相机作为参数
    this.composer.addPass(this.renderPass); // 设置renderPass通道
  }
  initFinalComposer() {
    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(this.renderPass);
  }

  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.dampingFactor = 0.3; // 阻尼系数
    this.controls.enableDamping = true; // 阻尼开启
    // this.controls.minPolarAngle = -Math.PI;    // 控制相机最小旋转角度
    // this.controls.maxPolarAngle = Math.PI / 2.5; // 控制相机最大旋转角度
  }
  initLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.directionalLight.position.set(200, 100, 200);
    this.scene.add(this.directionalLight);
  }

  initHelper(){
    this.axesHelper = new THREE.AxesHelper(5);
  }

  initGuiHelper(){
    this.guiHelper = new GUI();
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  _handleResize () {
    const width = this.el.offsetWidth;
    const height = this.el.offsetHeight;
    // cnavas画布宽高度重新设置
    this.renderer.setSize(width, height);
    // this.css3DRenderer.setSize(width, height);
    // this.css2DRenderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
}
}
