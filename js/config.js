/**
 * Конфигурация модели плоской Земли
 * Все константы и настройки
 */

const CONFIG = {
    // Размеры модели (в условных единицах, масштаб 1:1000)
    EARTH_RADIUS: 20000,        // Радиус плоской Земли (20000 км)
    DOME_RADIUS: 20000,         // Радиус купола
    DOME_HEIGHT: 8000,          // Высота купола (8000 км)
    SUN_HEIGHT: 4500,           // Высота Солнца (4500 км)
    MOON_HEIGHT: 4200,          // Высота Луны (4200 км)
    ATMOSPHERE_THICKNESS: 1000, // Толщина атмосферы
    
    // Смещение для выравнивания нулевого меридиана с Гринвичем
    GREENWICH_OFFSET: Math.PI,  // 180°
    
    // Астрономические константы
    J2000_EPOCH: new Date(Date.UTC(2000, 0, 1, 12, 0, 0)),
    REFERENCE_NEW_MOON: new Date(Date.UTC(2000, 0, 6, 18, 14, 0)),
    SYNODIC_MONTH: 29.530588861,  // Синодический месяц (дни)
    SIDEREAL_MONTH: 27.321661,    // Сидерический месяц (дни)
    
    // Настройки камеры
    CAMERA: {
        FOV: 60,
        NEAR: 100,
        FAR: 150000,
        INITIAL_POSITION: { x: 0, y: 35000, z: 35000 },
        MAX_DISTANCE: 80000,
        MIN_DISTANCE: 5000,
        MAX_POLAR_ANGLE: Math.PI / 2.1
    },
    
    // Настройки сцены
    SCENE: {
        BACKGROUND_COLOR: 0x000814,
        FOG_COLOR: 0x000814,
        FOG_NEAR: 50000,
        FOG_FAR: 100000
    },
    
    // Настройки текстуры
    TEXTURE: {
        MAP_URL: 'azimuthal_map.png'
    }
};