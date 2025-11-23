/**
 * Настройка Three.js сцены
 * Базовая инициализация renderer и scene
 */

const SceneSetup = {
    scene: null,
    renderer: null,
    
    init() {
        // Создание сцены
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(VISUAL.SCENE.BACKGROUND_COLOR);
        this.scene.fog = new THREE.Fog(
            VISUAL.SCENE.FOG_COLOR,
            VISUAL.SCENE.FOG_NEAR,
            VISUAL.SCENE.FOG_FAR
        );
        
        // Создание renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize(), false);
    },
    
    onWindowResize() {
        CameraController.camera.aspect = window.innerWidth / window.innerHeight;
        CameraController.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Обновление анимации если включена
        if (ControlsPanel.isAnimating) {
            const deltaTime = 120000 * ControlsPanel.animationSpeed;
            ControlsPanel.currentDate = new Date(ControlsPanel.currentDate.getTime() + deltaTime);
            ControlsPanel.updateDateTimeInputs();
            updateCelestialPositions();
        }
        
        CameraController.update();
        this.renderer.render(this.scene, CameraController.camera);
    }
};