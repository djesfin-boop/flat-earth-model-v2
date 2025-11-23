/**
 * Математические утилиты
 * Векторы, углы, преобразования координат
 */

const MathUtils = {
    /**
     * Конвертация градусов в радианы
     */
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    },
    
    /**
     * Конвертация радиан в градусы
     */
    radToDeg(radians) {
        return radians * 180 / Math.PI;
    },
    
    /**
     * Нормализация угла в диапазон [0, 2π]
     */
    normalizeAngle(angle) {
        while (angle < 0) angle += 2 * Math.PI;
        while (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
        return angle;
    },
    
    /**
     * Расстояние между двумя точками в 3D
     */
    distance3D(x1, y1, z1, x2, y2, z2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    },
    
    /**
     * Линейная интерполяция
     */
    lerp(a, b, t) {
        return a + (b - a) * t;
    },
    
    /**
     * Ограничение значения в диапазоне
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    
    /**
     * Карт��рование значения из одного диапазона в другой
     */
    map(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
};