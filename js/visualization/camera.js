/**
 * Контроллер камеры
 * Управление камерой и OrbitControls
 */

const CameraController = {
    camera: null,
    controls: null,
    
    init(scene, renderer) {
        const cam = GEOMETRY.CAMERA;
        
        this.camera = new THREE.PerspectiveCamera(
            cam.FOV,
            window.innerWidth / window.innerHeight,
            cam.NEAR,
            cam.FAR
        );
        
        this.camera.position.set(
            cam.INITIAL_POSITION.x,
            cam.INITIAL_POSITION.y,
            cam.INITIAL_POSITION.z
        );
        
        this.camera.lookAt(0, 0, 0);
        
        this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = cam.MAX_DISTANCE;
        this.controls.minDistance = cam.MIN_DISTANCE;
        this.controls.maxPolarAngle = cam.MAX_POLAR_ANGLE;
        
        console.log('✓ Камера настроена');
    },
    
    update() {
        if (this.controls) {
            this.controls.update();
        }
    },
    
    reset() {
        const cam = GEOMETRY.CAMERA;
        this.camera.position.set(
            cam.INITIAL_POSITION.x,
            cam.INITIAL_POSITION.y,
            cam.INITIAL_POSITION.z
        );
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
};