/**
 * Проекции светил на куполе
 * То, что мы видим на небе
 */

const CelestialProjections = {
    sunProjection: null,
    moonProjection: null,
    sunRays: null,
    moonRays: null,
    
    create(scene) {
        // Создание проекции Солнца
        const sunGeometry = new THREE.SphereGeometry(GEOMETRY.SUN_PROJECTION.SIZE, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.SUN_PROJECTION.COLOR,
            emissive: VISUAL.SUN_PROJECTION.EMISSIVE
        });
        this.sunProjection = new THREE.Mesh(sunGeometry, sunMaterial);
        
        // Свечение проекции Солнца
        const sunGlowGeometry = new THREE.SphereGeometry(GEOMETRY.SUN_PROJECTION.GLOW_SIZE, 32, 32);
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.SUN_PROJECTION.GLOW_COLOR,
            transparent: true,
            opacity: VISUAL.SUN_PROJECTION.GLOW_OPACITY
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        this.sunProjection.add(sunGlow);
        
        scene.add(this.sunProjection);
        
        // Создание проекции Луны
        const moonGeometry = new THREE.SphereGeometry(GEOMETRY.MOON_PROJECTION.SIZE, 32, 32);
        const moonMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.MOON_PROJECTION.COLOR,
            emissive: VISUAL.MOON_PROJECTION.EMISSIVE
        });
        this.moonProjection = new THREE.Mesh(moonGeometry, moonMaterial);
        
        // Свечение проекции Луны
        const moonGlowGeometry = new THREE.SphereGeometry(GEOMETRY.MOON_PROJECTION.GLOW_SIZE, 32, 32);
        const moonGlowMaterial = new THREE.MeshBasicMaterial({
            color: VISUAL.MOON_PROJECTION.GLOW_COLOR,
            transparent: true,
            opacity: VISUAL.MOON_PROJECTION.GLOW_OPACITY
        });
        const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
        this.moonProjection.add(moonGlow);
        
        scene.add(this.moonProjection);
        
        console.log('✓ Проекции светил созданы');
    },
    
    updateSunProjection(projection, sourcePos) {
        if (projection && this.sunProjection) {
            this.sunProjection.position.set(
                projection.position.x,
                projection.position.y,
                projection.position.z
            );
            
            // Обновить лучи проекции
            this.updateRays('sun', sourcePos, projection.position);
        }
    },
    
    updateMoonProjection(projection, sourcePos) {
        if (projection && this.moonProjection) {
            this.moonProjection.position.set(
                projection.position.x,
                projection.position.y,
                projection.position.z
            );
            
            // Обновить лучи проекции
            this.updateRays('moon', sourcePos, projection.position);
        }
    },
    
    updateRays(type, sourcePos, projectionPos) {
        const scene = SceneSetup.scene;
        
        if (type === 'sun') {
            if (this.sunRays) {
                scene.remove(this.sunRays);
            }
            this.sunRays = this.createRays(sourcePos, projectionPos, VISUAL.PROJECTION_RAYS.COLOR);
            scene.add(this.sunRays);
        } else {
            if (this.moonRays) {
                scene.remove(this.moonRays);
            }
            this.moonRays = this.createRays(sourcePos, projectionPos, VISUAL.PROJECTION_RAYS.COLOR);
            scene.add(this.moonRays);
        }
    },
    
    createRays(from, to, color) {
        const points = [
            new THREE.Vector3(from.x, from.y, from.z),
            new THREE.Vector3(to.x, to.y, to.z)
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: VISUAL.PROJECTION_RAYS.OPACITY
        });
        
        return new THREE.Line(geometry, material);
    }
};