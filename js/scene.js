/**
 * Инициализация Three.js сцены
 * Камера, рендерер, контролы, освещение
 */

const Scene = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    
    /**
     * Инициализация сцены
     */
    init() {
        // Сцена
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(CONFIG.SCENE.BACKGROUND_COLOR);
        this.scene.fog = new THREE.Fog(
            CONFIG.SCENE.FOG_COLOR, 
            CONFIG.SCENE.FOG_NEAR, 
            CONFIG.SCENE.FOG_FAR
        );
        
        // Камера
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.CAMERA.FOV,
            window.innerWidth / window.innerHeight,
            CONFIG.CAMERA.NEAR,
            CONFIG.CAMERA.FAR
        );
        this.camera.position.set(
            CONFIG.CAMERA.INITIAL_POSITION.x,
            CONFIG.CAMERA.INITIAL_POSITION.y,
            CONFIG.CAMERA.INITIAL_POSITION.z
        );
        this.camera.lookAt(0, 0, 0);
        
        // Рендерер
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Контролы камеры
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = CONFIG.CAMERA.MAX_DISTANCE;
        this.controls.minDistance = CONFIG.CAMERA.MIN_DISTANCE;
        this.controls.maxPolarAngle = CONFIG.CAMERA.MAX_POLAR_ANGLE;
        
        // Освещение
        const ambientLight = new THREE.AmbientLight(0x404060, 0.4);
        this.scene.add(ambientLight);
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize(), false);
    },
    
    /**
     * Обработка изменения размера окна
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    
    /**
     * Цикл рендеринга
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (Controls.isAnimating) {
            const deltaTime = 120000 * Controls.animationSpeed;
            Controls.currentDate = new Date(Controls.currentDate.getTime() + deltaTime);
            
            Controls.updateDateTimeInputs();
            Celestial.updatePositions(Controls.currentDate);
            Controls.updateInfoPanel();
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
};