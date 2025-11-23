/**
 * Физика источников света
 * Излучение, затухание, распространение
 */

const LightSourcePhysics = {
    /**
     * Затухание света с расстоянием
     */
    calculateAttenuation(distance, maxDistance) {
        return 1.0 / (1.0 + (distance / maxDistance) * (distance / maxDistance));
    },
    
    /**
     * Интенсивность света на поверхности
     */
    calculateSurfaceIntensity(sourceIntensity, distance, angle) {
        const attenuation = this.calculateAttenuation(distance, 50000);
        const cosAngle = Math.max(0, Math.cos(angle));
        return sourceIntensity * attenuation * cosAngle;
    }
};