/**
 * Механика затмений
 * Расчёт затмений в точке проекции
 */

const EclipseMechanics = {
    /**
     * Проверка лунного затмения
     * Происходит когда источник Солнца, центр и источник Луны на одной линии
     */
    checkLunarEclipse(sunPos, moonPos) {
        // Вектор от Солнца к Луне через центр
        const sunToCenter = Math.sqrt(sunPos.x*sunPos.x + sunPos.z*sunPos.z);
        const moonToCenter = Math.sqrt(moonPos.x*moonPos.x + moonPos.z*moonPos.z);
        
        // Угол между векторами
        const dot = sunPos.x * moonPos.x + sunPos.z * moonPos.z;
        const angle = Math.acos(dot / (sunToCenter * moonToCenter));
        
        // Затмение если угол близок к π (180°)
        const isEclipse = Math.abs(angle - Math.PI) < 0.05;
        
        return {
            isEclipse,
            magnitude: isEclipse ? 1 - Math.abs(angle - Math.PI) / 0.05 : 0
        };
    },
    
    /**
     * Проверка солнечного затмения
     * (для наблюдателя на поверхности)
     */
    checkSolarEclipse(sunProjection, moonProjection, observerPos) {
        // Упрощённый расчёт
        const dx = sunProjection.position.x - moonProjection.position.x;
        const dz = sunProjection.position.z - moonProjection.position.z;
        const distance = Math.sqrt(dx*dx + dz*dz);
        
        const threshold = (GEOMETRY.SUN_PROJECTION.SIZE + GEOMETRY.MOON_PROJECTION.SIZE);
        
        return {
            isEclipse: distance < threshold,
            magnitude: distance < threshold ? 1 - distance / threshold : 0
        };
    }
};