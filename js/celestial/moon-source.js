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
        
        // Слабый свет от источника
        this.light = new THREE.PointLight(
            VISUAL.MOON_SOURCE.COLOR,
            VISUAL.MOON_SOURCE.INTENSITY,
            40000
        );
        this.source.add(this.light);
        
        scene.add(this.source);
    },
    
    updatePosition(pos) {
        if (this.source) {
            this.source.position.set(pos.x, pos.y, pos.z);
        }
    }
};