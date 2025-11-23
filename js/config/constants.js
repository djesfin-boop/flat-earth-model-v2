/**
 * Физические константы модели
 * Все значения в километрах и стандартных единицах
 */

const PHYSICAL_CONSTANTS = {
    // Скорость света
    SPEED_OF_LIGHT: 299792.458, // км/с
    
    // Атмосферные константы
    REFRACTION_INDEX_SURFACE: 1.000293,
    REFRACTION_INDEX_VACUUM: 1.0,
    ATMOSPHERE_SCALE_HEIGHT: 8.5, // км
    
    // Гравитационные (для расчётов, если потребуется)
    G: 6.67430e-11, // м³/(кг·с²)
    
    // Магнитные (для магнитной горы)
    MAGNETIC_FIELD_STRENGTH: 1.0, // условные единицы
    
    // Временные константы
    SIDEREAL_DAY: 23.9344696, // часов
    SOLAR_DAY: 24.0, // часов
    SYNODIC_MONTH: 29.530588861, // дней
    SIDEREAL_MONTH: 27.321661, // дней
    TROPICAL_YEAR: 365.24219, // дней
    
    // Эпохи для расчётов
    J2000_EPOCH: new Date(Date.UTC(2000, 0, 1, 12, 0, 0)),
    REFERENCE_NEW_MOON: new Date(Date.UTC(2000, 0, 6, 18, 14, 0))
};