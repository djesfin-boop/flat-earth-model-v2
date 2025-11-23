/**
 * Магнитная гора в центре
 * Центр проекции и вращения
 */

const MagneticMountain = {
    mountain: null,
    
    create(scene) {
        const geometry = new THREE.ConeGeometry(
            GEOMETRY.MAGNETIC_MOUNTAIN_RADIUS,
            GEOMETRY.MAGNETIC_MOUNTAIN_HEIGHT,
            32
        );
        
        const material = new THREE.MeshStandardMaterial({
            color: VISUAL.MAGNETIC_MOUNTAIN.COLOR,
            roughness: VISUAL.MAGNETIC_MOUNTAIN.ROUGHNESS,
            metalness: VISUAL.MAGNETIC_MOUNTAIN.METALNESS,
            emissive: VISUAL.MAGNETIC_MOUNTAIN.EMISSIVE,
            emissiveIntensity: VISUAL.MAGNETIC_MOUNTAIN.EMISSIVE_INTENSITY
        });
        
        this.mountain = new THREE.Mesh(geometry, material);
        this.mountain.position.y = GEOMETRY.MAGNETIC_MOUNTAIN_HEIGHT / 2;
        scene.add(this.mountain);
    }
};