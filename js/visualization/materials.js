/**
 * Библиотека материалов
 * Готовые материалы для различных объектов
 */

const Materials = {
    /**
     * Материал для источника света
     */
    createLightSourceMaterial(color, emissive, intensity) {
        return new THREE.MeshBasicMaterial({
            color: color,
            emissive: emissive,
            emissiveIntensity: intensity
        });
    },
    
    /**
     * Полупрозрачный материал для проекции
     */
    createProjectionMaterial(color, opacity) {
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
        });
    },
    
    /**
     * Материал для лучей
     */
    createRayMaterial(color, opacity) {
        return new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity
        });
    }
};