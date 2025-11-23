/**
 * Геометрические параметры модели проекции
 * Новая концепция: источники света под землёй, проекция на купол
 */

const GEOMETRY = {
    // Размеры Земли (плоскость)
    EARTH_RADIUS: 20000, // км
    EARTH_THICKNESS: 100, // км (толщина плоскости)
    
    // Купол (отражающая поверхность)
    DOME_RADIUS: 20000, // км (совпадает с радиусом Земли)
    DOME_HEIGHT: 5500, // км (НОВОЕ ЗНАЧЕНИЕ! Уменьшено для лучшей оптики)
    DOME_THICKNESS: 50, // км
    DOME_REFLECTIVITY: 0.85, // коэффициент отражения
    
    // Атмосфера (линза)
    ATMOSPHERE_HEIGHT: 100, // км
    ATMOSPHERE_DENSITY_LAYERS: 20, // количество слоёв для визуализации
    
    // Магнитная гора (центр проекции)
    MAGNETIC_MOUNTAIN_HEIGHT: 500, // км над поверхностью
    MAGNETIC_MOUNTAIN_RADIUS: 100, // км у основания
    
    // Источники света (под землёй!)
    SUN_SOURCE: {
        DEPTH: -3000, // км ниже поверхности
        SIZE: 250, // км (диаметр реального источника)
        ORBIT_RADIUS: 0, // км (источник в центре, орбита меняется по высоте)
        INTENSITY: 1.0 // относительная яркость
    },
    
    MOON_SOURCE: {
        DEPTH: -2800, // км ниже поверхности
        SIZE: 200, // км (диаметр реального источника)
        ORBIT_RADIUS: 0, // км
        INTENSITY: 0.3 // относительная яркость
    },
    
    // Проекции на куполе
    SUN_PROJECTION: {
        SIZE: 32, // км (размер проекции на куполе)
        GLOW_SIZE: 64, // км (размер свечения)
        ANGULAR_SIZE: 0.5 // градусов (наблюдаемый угловой размер)
    },
    
    MOON_PROJECTION: {
        SIZE: 30, // км
        GLOW_SIZE: 45, // км
        ANGULAR_SIZE: 0.5 // градусов
    },
    
    // Координатная система
    GRID: {
        MERIDIANS_COUNT: 24, // каждые 15°
        PARALLELS_COUNT: 18,
        PRIME_MERIDIAN_ANGLE: Math.PI, // 180° (Гринвич)
        TROPICS: {
            CANCER: 23.5, // °N
            CAPRICORN: -23.5 // °S
        }
    },
    
    // Камера
    CAMERA: {
        FOV: 60,
        NEAR: 100,
        FAR: 150000,
        INITIAL_POSITION: { x: 0, y: 40000, z: 40000 },
        MAX_DISTANCE: 100000,
        MIN_DISTANCE: 5000,
        MAX_POLAR_ANGLE: Math.PI / 2.1
    }
};