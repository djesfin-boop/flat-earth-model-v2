/**
 * Освещение сцены
 * Ambient, hemisphere lights
 */

const SceneLighting = {
    init(scene) {
        // Ambient light
        const ambient = new THREE.AmbientLight(
            VISUAL.LIGHTING.AMBIENT_COLOR,
            VISUAL.LIGHTING.AMBIENT_INTENSITY
        );
        scene.add(ambient);
        
        // Hemisphere light
        const hemisphere = new THREE.HemisphereLight(
            VISUAL.LIGHTING.HEMISPHERE_SKY,
            VISUAL.LIGHTING.HEMISPHERE_GROUND,
            VISUAL.LIGHTING.HEMISPHERE_INTENSITY
        );
        scene.add(hemisphere);
        
        console.log('✓ Освещение настроено');
    }
};