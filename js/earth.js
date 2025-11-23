/**
 * Создание плоской Земли
 * Текстура, координатная сетка, тропики, купол
 */

const Earth = {
    earth: null,
    coordinateSystem: null,
    dome: null,
    atmosphere: null,
    shadowPlane: null,
    
    /**
     * Создание плоской Земли с текстурой
     */
    createEarth(scene, renderer) {
        const geometry = new THREE.CircleGeometry(CONFIG.EARTH_RADIUS, 256);
        const tempMaterial = new THREE.MeshStandardMaterial({
            color: 0x4a7ba7,
            roughness: 0.7,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        
        this.earth = new THREE.Mesh(geometry, tempMaterial);
        this.earth.rotation.x = -Math.PI / 2;
        this.earth.receiveShadow = true;
        scene.add(this.earth);
        
        // Загрузка текстуры
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            CONFIG.TEXTURE.MAP_URL,
            (texture) => {
                console.log('✓ Карта успешно загружена');
                texture.center.set(0.5, 0.5);
                texture.rotation = CONFIG.GREENWICH_OFFSET;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                this.earth.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: 0.7,
                    metalness: 0.1,
                    side: THREE.DoubleSide
                });
                
                Controls.hideLoadingScreen();
            },
            (progress) => {
                console.log('Загрузка:', (progress.loaded / progress.total * 100).toFixed(0) + '%');
            },
            (error) => {
                console.error('✗ Ошибка загрузки карты:', error);
                Controls.hideLoadingScreen();
            }
        );
        
        this.addTropics(scene);
    },
    
    /**
     * Добавление тропиков
     */
    addTropics(scene) {
        // Тропик Рака
        const cancerRadius = Astronomy.latitudeToRadius(23.5);
        const cancerGeometry = new THREE.RingGeometry(cancerRadius - 30, cancerRadius + 30, 256);
        const cancerMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff6b6b, 
            side: THREE.DoubleSide, 
            transparent: true, 
            opacity: 0.25
        });
        const cancerRing = new THREE.Mesh(cancerGeometry, cancerMaterial);
        cancerRing.rotation.x = -Math.PI / 2;
        cancerRing.position.y = 5;
        scene.add(cancerRing);
        
        // Тропик Козерога
        const capricornRadius = Astronomy.latitudeToRadius(-23.5);
        const capricornGeometry = new THREE.RingGeometry(capricornRadius - 30, capricornRadius + 30, 256);
        const capricornMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x6bb6ff, 
            side: THREE.DoubleSide, 
            transparent: true, 
            opacity: 0.25
        });
        const capricornRing = new THREE.Mesh(capricornGeometry, capricornMaterial);
        capricornRing.rotation.x = -Math.PI / 2;
        capricornRing.position.y = 5;
        scene.add(capricornRing);
    },
    
    /**
     * Создание координатной системы
     */
    createCoordinateSystem(scene) {
        this.coordinateSystem = new THREE.Group();
        
        const meridianMaterial = new THREE.LineBasicMaterial({ 
            color: 0x888888, transparent: true, opacity: 0.3 
        });
        const primeMeridianMaterial = new THREE.LineBasicMaterial({ 
            color: 0xff0000, transparent: true, opacity: 0.5, linewidth: 2
        });
        const parallelMaterial = new THREE.LineBasicMaterial({ 
            color: 0x666666, transparent: true, opacity: 0.25 
        });
        
        // Меридианы
        for (let lon = 0; lon < 360; lon += 15) {
            const points = [];
            const angleRad = ((lon * Math.PI) / 180) + CONFIG.GREENWICH_OFFSET;
            
            for (let r = 0; r <= CONFIG.EARTH_RADIUS; r += 500) {
                const x = r * Math.cos(angleRad);
                const z = r * Math.sin(angleRad);
                points.push(new THREE.Vector3(x, 10, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(
                geometry, 
                lon === 0 ? primeMeridianMaterial : meridianMaterial
            );
            this.coordinateSystem.add(line);
            
            if (lon % 30 === 0) {
                this.createTextLabel(`${lon}°`, CONFIG.EARTH_RADIUS + 300, angleRad);
            }
        }
        
        // Параллели
        const latitudes = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50, -60, -70, -80];
        latitudes.forEach(lat => {
            const radius = Astronomy.latitudeToRadius(lat);
            if (radius > 0 && radius < CONFIG.EARTH_RADIUS) {
                const geometry = new THREE.RingGeometry(radius - 5, radius + 5, 128);
                const ring = new THREE.Mesh(geometry, parallelMaterial);
                ring.rotation.x = -Math.PI / 2;
                ring.position.y = 10;
                this.coordinateSystem.add(ring);
                
                if (lat % 10 === 0 && lat !== 90) {
                    this.createLatitudeLabel(`${lat}°`, radius);
                }
            }
        });
        
        scene.add(this.coordinateSystem);
    },
    
    createTextLabel(text, radius, angle) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.font = 'Bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ 
            map: texture, transparent: true, opacity: 0.7
        }));
        
        sprite.position.set(
            radius * Math.cos(angle), 
            10, 
            radius * Math.sin(angle)
        );
        sprite.scale.set(400, 200, 1);
        this.coordinateSystem.add(sprite);
    },
    
    createLatitudeLabel(text, radius) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        context.fillStyle = 'rgba(200, 200, 200, 0.8)';
        context.font = 'Bold 40px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ 
            map: texture, transparent: true, opacity: 0.6
        }));
        
        const angle = CONFIG.GREENWICH_OFFSET;
        sprite.position.set(
            radius * Math.cos(angle), 
            10, 
            radius * Math.sin(angle)
        );
        sprite.scale.set(350, 175, 1);
        this.coordinateSystem.add(sprite);
    },
    
    /**
     * Создание купола
     */
    createDome(scene) {
        const geometry = new THREE.SphereGeometry(
            CONFIG.DOME_RADIUS, 128, 128, 0, Math.PI * 2, 0, Math.PI / 2
        );
        const material = new THREE.MeshPhongMaterial({
            color: 0x1a4d7a,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide,
            shininess: 80
        });
        this.dome = new THREE.Mesh(geometry, material);
        scene.add(this.dome);
    },
    
    /**
     * Создание атмосферы
     */
    createAtmosphere(scene) {
        const geometry = new THREE.SphereGeometry(
            CONFIG.DOME_RADIUS - 500, 128, 128, 0, Math.PI * 2, 0, Math.PI / 2
        );
        const material = new THREE.MeshPhongMaterial({
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        });
        this.atmosphere = new THREE.Mesh(geometry, material);
        scene.add(this.atmosphere);
    },
    
    /**
     * Создание плоскости для теней
     */
    createShadowPlane(scene) {
        const geometry = new THREE.CircleGeometry(CONFIG.EARTH_RADIUS * 1.05, 256);
        const material = new THREE.ShadowMaterial({ opacity: 0.4 });
        this.shadowPlane = new THREE.Mesh(geometry, material);
        this.shadowPlane.rotation.x = -Math.PI / 2;
        this.shadowPlane.position.y = 8;
        this.shadowPlane.receiveShadow = true;
        scene.add(this.shadowPlane);
    }
};