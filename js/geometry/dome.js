/**
 * Геометрия купола
 * Создание отражающего купола
 */

const DomeGeometry = {
    dome: null,
    
    create(scene) {
        const geometry = new THREE.SphereGeometry(
            GEOMETRY.DOME_RADIUS,
            128,
            128,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        );
        
        const material = new THREE.MeshPhongMaterial({
            color: VISUAL.DOME.COLOR,
            transparent: true,
            opacity: VISUAL.DOME.OPACITY,
            side: THREE.DoubleSide,
            shininess: VISUAL.DOME.SHININESS,
            specular: VISUAL.DOME.SPECULAR,
            emissive: VISUAL.DOME.EMISSIVE
        });
        
        this.dome = new THREE.Mesh(geometry, material);
        this.dome.position.y = 0;
        scene.add(this.dome);
        
        console.log('✓ Купол создан');
    }
};