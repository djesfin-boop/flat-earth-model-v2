/**
 * Визуальные настройки модели
 * Цвета, материалы, эффекты
 */

const VISUAL = {
    // Цвета сцены
    SCENE: {
        BACKGROUND_COLOR: 0x000a14,
        FOG_COLOR: 0x000a14,
        FOG_NEAR: 50000,
        FOG_FAR: 120000
    },
    
    // Земля
    EARTH: {
        COLOR: 0x2a4a6a,
        ROUGHNESS: 0.8,
        METALNESS: 0.1,
        EMISSIVE: 0x000000,
        MAP_URL: 'azimuthal_map.png'
    },
    
    // Купол
    DOME: {
        COLOR: 0x1a3d5a,
        OPACITY: 0.15,
        SHININESS: 100,
        SPECULAR: 0x6699cc,
        EMISSIVE: 0x001122,
        WIREFRAME: false
    },
    
    // Атмосфера
    ATMOSPHERE: {
        COLOR: 0x87ceeb,
        OPACITY: 0.1,
        LAYERS_COLORS: [
            0x87ceeb, // у поверхности
            0x6ba8d9,
            0x4f82c6,
            0x335cb3,
            0x1736a0  // на высоте
        ]
    },
    
    // Магнитная гора
    MAGNETIC_MOUNTAIN: {
        COLOR: 0x8b4513,
        ROUGHNESS: 0.9,
        METALNESS: 0.3,
        EMISSIVE: 0x331100,
        EMISSIVE_INTENSITY: 0.2
    },
    
    // Источник Солнца (под землёй)
    SUN_SOURCE: {
        COLOR: 0xffff00,
        EMISSIVE: 0xffff00,
        INTENSITY: 2.5,
        GLOW_COLOR: 0xffaa00,
        GLOW_OPACITY: 0.6
    },
    
    // Источник Луны (под землёй)
    MOON_SOURCE: {
        COLOR: 0xcccccc,
        EMISSIVE: 0xaaaaaa,
        INTENSITY: 0.8,
        GLOW_COLOR: 0xdddddd,
        GLOW_OPACITY: 0.3
    },
    
    // Проекция Солнца (на куполе)
    SUN_PROJECTION: {
        COLOR: 0xffff00,
        EMISSIVE: 0xffff00,
        INTENSITY: 3.0,
        GLOW_COLOR: 0xffaa00,
        GLOW_OPACITY: 0.8
    },
    
    // Проекция Луны (на куполе)
    MOON_PROJECTION: {
        COLOR: 0xffffff,
        EMISSIVE: 0xcccccc,
        INTENSITY: 1.2,
        GLOW_COLOR: 0xdddddd,
        GLOW_OPACITY: 0.5
    },
    
    // Лучи проекции
    PROJECTION_RAYS: {
        COLOR: 0xffff88,
        OPACITY: 0.15,
        SEGMENTS: 32
    },
    
    // Координатная сетка
    GRID: {
        MERIDIAN_COLOR: 0x888888,
        MERIDIAN_OPACITY: 0.3,
        PRIME_MERIDIAN_COLOR: 0xff0000,
        PRIME_MERIDIAN_OPACITY: 0.5,
        PARALLEL_COLOR: 0x666666,
        PARALLEL_OPACITY: 0.25,
        TROPIC_CANCER_COLOR: 0xff6b6b,
        TROPIC_CAPRICORN_COLOR: 0x6bb6ff,
        TROPIC_OPACITY: 0.3
    },
    
    // Освещение сцены
    LIGHTING: {
        AMBIENT_COLOR: 0x404860,
        AMBIENT_INTENSITY: 0.3,
        HEMISPHERE_SKY: 0x87ceeb,
        HEMISPHERE_GROUND: 0x1a2f4a,
        HEMISPHERE_INTENSITY: 0.4
    },
    
    // Эффекты
    EFFECTS: {
        SHADOW_MAP_SIZE: 2048,
        SHADOW_OPACITY: 0.5,
        REFRACTION_VISIBLE: true,
        ECLIPSE_SHADOW_COLOR: 0x000000,
        ECLIPSE_SHADOW_OPACITY: 0.7
    }
};