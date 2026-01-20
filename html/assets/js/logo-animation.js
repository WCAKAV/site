// Three.js Logo Animation - 电子感动画
let scene, camera, renderer, animationId;

function initLogoAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 场景设置
    scene = new THREE.Scene();
    // 使用浅蓝色渐变背景颜色
    scene.background = new THREE.Color(0xe8f4f8);

    // 相机设置 - 放大 3 倍
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 180;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 渲染器设置
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 创建几何体
    createLogoGeometry();

    // 动画循环
    animate();

    // 响应窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

function createLogoGeometry() {
    // 创建多个立方体组成的 "E" 形状（电子感）
    const cubeSize = 0.9;  // 放大 3 倍：0.3 * 3
    const spacing = 1.05;  // 放大 3 倍：0.35 * 3
    const material = new THREE.MeshPhongMaterial({
        color: 0x4146E6,
        emissive: 0x4146E6,
        shininess: 100
    });

    const group = new THREE.Group();

    // 创建竖条
    for (let i = 0; i < 3; i++) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
            material
        );
        cube.position.y = (i - 1) * spacing;
        cube.position.x = -1;
        group.add(cube);
    }

    // 创建横条
    for (let i = 0; i < 3; i++) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
            material
        );
        cube.position.x = -1 + (i * spacing);
        cube.position.y = 1 * spacing;
        group.add(cube);

        const cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
            material
        );
        cube2.position.x = -1 + (i * spacing);
        cube2.position.y = -1 * spacing;
        group.add(cube2);
    }

    // 创建球体装饰
    const sphereGeometry = new THREE.SphereGeometry(0.45, 16, 16);  // 放大 3 倍：0.15 * 3
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 1.2;
    sphere.position.y = 0;
    group.add(sphere);

    scene.add(group);
    group.userData.isLogoGroup = true;
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // 旋转效果
    scene.children.forEach(child => {
        if (child.userData.isLogoGroup) {
            child.rotation.x += 0.003;
            child.rotation.z += 0.005;

            // 上下浮动效果
            child.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        }

        // 立方体闪烁效果
        if (child instanceof THREE.Group) {
            child.children.forEach((cube, index) => {
                if (cube instanceof THREE.Mesh) {
                    const opacity = 0.7 + 0.3 * Math.sin(Date.now() * 0.003 + index * 0.2);
                    cube.material.opacity = opacity;
                }
            });
        }
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = renderer.domElement.parentElement;
    if (!container) return;

    const width = container.clientWidth || 200;
    const height = container.clientHeight || 60;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// 销毁动画
function disposeLogoAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer && renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
    window.removeEventListener('resize', onWindowResize);
}
