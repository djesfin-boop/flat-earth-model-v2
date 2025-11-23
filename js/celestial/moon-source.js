/**
 * Источник света Луны
 * Находится под землёй
 */

const MoonSource = {
    source: null,
    light: null,
    
    create(scene) {
        const geometry = new THREE.SphereGeometry(GEOMETRY.MOON_SOURCE.SIZE, 64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: VISUAL.MOON_SOURCE.COLOR,
            emissive: VISUAL.MOON_SOURCE.EMISSIVE
        });
        
        this.source = new THREE.Mesh(geometry, material);
        this.source.position.y = GEOMETRY.MOON_SOURCE.DEPTH;
        
        // Свечение
        const glowGeometry = new THREE.SphereGeometry(GEOMETRY.MOON_SOURCE.SIZE * 1.3, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.MOON_SOURCE.GLOW_COLOR,
            transparent: true,
            opacity: VISUAL.MOON_SOURCE.GLOW_OPACITY
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.source.add(glow);
        
        // Слабый свет от источника
        this.light = new THREE.PointLight(
            VISUAL.MOON_SOURCE.COLOR,
            VISUAL.MOON_SOURCE.INTENSITY,
            40000
        );
        this.source.add(this.light);
        
        scene.add(this.source);
        console.log('✓ Источник Луны создан');
    },
    
    updatePosition(pos) {
        if (this.source) {
            this.source.position.set(pos.x, pos.y, pos.z);
        }
    }
};