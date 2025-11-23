/**
 * Атмосферная физика
 * Рефракция, преломление, линзовый эффект
 */

const AtmospherePhysics = {
    atmosphereLayers: null,
    
    /**
     * Создание слоистой атмосферы
     */
    create(scene) {
        this.atmosphereLayers = new THREE.Group();
        
        const layerCount = GEOMETRY.ATMOSPHERE_DENSITY_LAYERS;
        const maxHeight = GEOMETRY.ATMOSPHERE_HEIGHT;
        const radius = GEOMETRY.EARTH_RADIUS;
        
        for (let i = 0; i < layerCount; i++) {
            const height = (i / layerCount) * maxHeight;
            const opacity = this.calculateDensity(height);
            const color = this.interpolateAtmosphereColor(height / maxHeight);
            
            const geometry = new THREE.RingGeometry(
                radius * 0.98,
                radius * 1.02,
                128
            );
            
            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: opacity * VISUAL.ATMOSPHERE.OPACITY,
                side: THREE.DoubleSide
            });
            
            const layer = new THREE.Mesh(geometry, material);
            layer.rotation.x = -Math.PI / 2;
            layer.position.y = height;
            
            this.atmosphereLayers.add(layer);
        }
        
        scene.add(this.atmosphereLayers);
    },
    
    /**
     * Расчёт плотности атмосферы на высоте
     */
    calculateDensity(height) {
        const scaleHeight = PHYSICAL_CONSTANTS.ATMOSPHERE_SCALE_HEIGHT;
        return Math.exp(-height / scaleHeight);
    },
    
    /**
     * Интерполяция цвета атмосферы
     */
    interpolateAtmosphereColor(t) {
        const colors = VISUAL.ATMOSPHERE.LAYERS_COLORS;
        const index = t * (colors.length - 1);
        const i1 = Math.floor(index);
        const i2 = Math.min(i1 + 1, colors.length - 1);
        const localT = index - i1;
        
        const c1 = new THREE.Color(colors[i1]);
        const c2 = new THREE.Color(colors[i2]);
        
        return c1.lerp(c2, localT);
    },
    
    /**
     * Расчёт рефракции света
     */
    calculateRefraction(altitude, zenithAngle) {
        const n0 = PHYSICAL_CONSTANTS.REFRACTION_INDEX_SURFACE;
        const scaleHeight = PHYSICAL_CONSTANTS.ATMOSPHERE_SCALE_HEIGHT;
        
        const n = 1 + (n0 - 1) * Math.exp(-altitude / scaleHeight);
        const refraction = (n0 - 1) * Math.tan(zenithAngle);
        
        return refraction;
    },
    
    /**
     * Видимый угловой размер с учётом атмосферы
     */
    apparentAngularSize(realAngle, observerAltitude) {
        const refraction = this.calculateRefraction(observerAltitude, Math.PI / 4);
        const magnification = 1 + refraction * 50;
        return realAngle * magnification;
    }
};