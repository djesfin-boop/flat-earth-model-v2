/**
 * Геометрия плоскости Земли
 * Создание плоской Земли с текстурой
 */

const EarthPlane = {
    earth: null,
    
    create(scene, renderer) {
        const geometry = new THREE.CircleGeometry(GEOMETRY.EARTH_RADIUS, 256);
        
        const tempMaterial = new THREE.MeshStandardMaterial({
            color: VISUAL.EARTH.COLOR,
            roughness: VISUAL.EARTH.ROUGHNESS,
            metalness: VISUAL.EARTH.METALNESS,
            side: THREE.DoubleSide
        });
        
        this.earth = new THREE.Mesh(geometry, tempMaterial);
        this.earth.rotation.x = -Math.PI / 2;
        this.earth.receiveShadow = true;
        scene.add(this.earth);
        
        // Загрузка текстуры
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            VISUAL.EARTH.MAP_URL,
            (texture) => {
                texture.center.set(0.5, 0.5);
                texture.rotation = GEOMETRY.GRID.PRIME_MERIDIAN_ANGLE;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                
                this.earth.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: VISUAL.EARTH.ROUGHNESS,
                    metalness: VISUAL.EARTH.METALNESS,
                    side: THREE.DoubleSide
                });
                
                ControlsPanel.hideLoadingScreen();
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки карты:', error);
                ControlsPanel.hideLoadingScreen();
            }
        );
    }
};