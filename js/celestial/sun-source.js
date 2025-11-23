/**
 * Источник света Солнца
 * Находится под землёй
 */

const SunSource = {
    source: null,
    light: null,
    
    create(scene) {
        const geometry = new THREE.SphereGeometry(GEOMETRY.SUN_SOURCE.SIZE, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: VISUAL.SUN_SOURCE.COLOR,
            emissive: VISUAL.SUN_SOURCE.EMISSIVE
        });
        
        this.source = new THREE.Mesh(geometry, material);
        this.source.position.y = GEOMETRY.SUN_SOURCE.DEPTH;
        
        // Свет от источника
        this.light = new THREE.PointLight(
            VISUAL.SUN_SOURCE.COLOR,
            VISUAL.SUN_SOURCE.INTENSITY,
            60000
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