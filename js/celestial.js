/**
 * Небесные тела
 * Создание Солнца и Луны
 */

const Celestial = {
    sun: null,
    moon: null,
    
    /**
     * Создание Солнца
     */
    createSun(scene) {
        const geometry = new THREE.SphereGeometry(500, 64, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.sun = new THREE.Mesh(geometry, material);
        
        // Свет от Солнца
        const sunLight = new THREE.PointLight(0xffffff, 2.0, 60000);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        this.sun.add(sunLight);
        
        // Свечение
        const glowGeometry = new THREE.SphereGeometry(900, 64, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.35
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sun.add(glow);
        
        scene.add(this.sun);
    },
    
    /**
     * Создание Луны
     */
    createMoon(scene) {
        const geometry = new THREE.SphereGeometry(350, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            roughness: 0.9,
            metalness: 0.05
        });
        this.moon = new THREE.Mesh(geometry, material);
        this.moon.castShadow = true;
        
        // Слабый свет от Луны
        const moonLight = new THREE.PointLight(0xaaaaaa, 0.3, 30000);
        this.moon.add(moonLight);
        
        scene.add(this.moon);
    },
    
    /**
     * Обновление позиций Солнца и Луны
     */
    updatePositions(date) {
        const sunPos = Astronomy.calculateSunPosition(date);
        this.sun.position.set(sunPos.x, sunPos.y, sunPos.z);
        
        const moonPos = Astronomy.calculateMoonPosition(date);
        this.moon.position.set(moonPos.x, moonPos.y, moonPos.z);
    }
};