/**
 * Проекции светил на куполе
 * То, что мы видим на небе
 */

const CelestialProjections = {
    sunProjection: null,
    moonProjection: null,
    
    create(scene) {
        // Создание проекции Солнца
        const sunGeometry = new THREE.SphereGeometry(GEOMETRY.SUN_PROJECTION.SIZE, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.SUN_PROJECTION.COLOR,
            emissive: VISUAL.SUN_PROJECTION.EMISSIVE
        });
        this.sunProjection = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(this.sunProjection);
        
        // Создание проекции Луны
        const moonGeometry = new THREE.SphereGeometry(GEOMETRY.MOON_PROJECTION.SIZE, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.MOON_PROJECTION.COLOR,
            emissive: VISUAL.MOON_PROJECTION.EMISSIVE
        });
        this.moonProjection = new THREE.Mesh(moonGeometry, moonMaterial);
        scene.add(this.moonProjection);
    },
    
    updateSunProjection(projection) {
        if (projection && this.sunProjection) {
            this.sunProjection.position.set(
                projection.position.x,
                projection.position.y,
                projection.position.z
            );
        }
    },
    
    updateMoonProjection(projection) {
        if (projection && this.moonProjection) {
            this.moonProjection.position.set(
                projection.position.x,
                projection.position.y,
                projection.position.z
            );
        }
    }
};