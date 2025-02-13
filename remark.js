const materialOption = {
    wireframe:true , // 线框模式 true false 
} 


// 创建一个三角形
// const bufferGeomery = new THREE.BufferGeometry();
// // 创建顶点数据 有序的 逆时针为正面。 顺时针点为反面
// const verpont = new Float32Array([
//     -1,-1,0,
//     1,-1,0,
//     1,1,0,
//    1,-1,0,
//     1,1,0,
//     -1,1,0
// ])
// // 创建顶点属性 .3 表示三个为一组数据
// bufferGeomery.setAttribute("position",new THREE.BufferAttribute(verpont,3)) 
// // 创建材质 DobbleSide正反都能看到
// const material = new THREE.MeshPhongMaterial({color:0x000000,side:THREE.DobbleSide});
// // 创建mesh
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube)

// 正常画一个正方形会有重复两个顶点。这时使用索引绘制 避免重复
// 0,1,2 verpont前三个作为一个三角形。利用第二个 和第0个是重复点 逆时针使用第三个 构成第二个三角形
// 就是下面这样
// const verpont = new Float32Array([
//     -1,-1,0,
//     1,-1,0,
//     1,1,0,
//     -1,1,0
// ])
// const index = new Uint16Array(0,1,2,2,3,0)
// 创建索引属性
// 为什么是1 因为index索引三个为一组时产生了两个索引。 step为1
// bufferGeomery.setIndex(new THREE.BufferAttribute(index,1)) 