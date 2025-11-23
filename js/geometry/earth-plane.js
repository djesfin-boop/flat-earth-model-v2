/**
 * Геометрия плоскости Земли
 * Создание плоской Земли с текстурой
 */

const EarthPlane = {
    earth: null,
    coordinateGrid: null,
    
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
                console.log('✓ Карта Земли загружена');
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
                console.error('✗ Ошибка загрузки карты:', error);
                ControlsPanel.hideLoadingScreen();
            }
        );
        
        this.createCoordinateGrid(scene);
        console.log('✓ Земля создана');
    },
    
    createCoordinateGrid(scene) {
        this.coordinateGrid = new THREE.Group();
        
        const meridianMaterial = new THREE.LineBasicMaterial({ 
            color: VISUAL.GRID.MERIDIAN_COLOR, 
            transparent: true, 
            opacity: VISUAL.GRID.MERIDIAN_OPACITY 
        });
        
        const primeMeridianMaterial = new THREE.LineBasicMaterial({ 
            color: VISUAL.GRID.PRIME_MERIDIAN_COLOR, 
            transparent: true, 
            opacity: VISUAL.GRID.PRIME_MERIDIAN_OPACITY 
        });
        
        // Меридианы
        for (let lon = 0; lon < 360; lon += 15) {
            const points = [];
            const angleRad = (lon * Math.PI / 180) + GEOMETRY.GRID.PRIME_MERIDIAN_ANGLE;
            
            for (let r = 0; r <= GEOMETRY.EARTH_RADIUS; r += 500) {
                const x = r * Math.cos(angleRad);
                const z = r * Math.sin(angleRad);
                points.push(new THREE.Vector3(x, 10, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(
                geometry, 
                lon === 0 ? primeMeridianMaterial : meridianMaterial
            );
            this.coordinateGrid.add(line);
        }
        
        // Параллели
        const parallelMaterial = new THREE.LineBasicMaterial({ 
            color: VISUAL.GRID.PARALLEL_COLOR, 
            transparent: true, 
            opacity: VISUAL.GRID.PARALLEL_OPACITY 
        });
        
        const latitudes = [80, 70, 60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50, -60, -70, -80];
        latitudes.forEach(lat => {
            const radius = Converters.latitudeToRadius(lat);
            if (radius > 0 && radius < GEOMETRY.EARTH_RADIUS) {
                const geometry = new THREE.RingGeometry(radius - 5, radius + 5, 128);
                const ring = new THREE.Mesh(geometry, parallelMaterial);
                ring.rotation.x = -Math.PI / 2;
                ring.position.y = 10;
                this.coordinateGrid.add(ring);
            }
        });
        
        scene.add(this.coordinateGrid);
    }
};