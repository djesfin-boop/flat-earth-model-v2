/**
 * Физика отражения света от купола
 * Закон отражения, коэффициент отражения
 */

const ReflectionPhysics = {
    /**
     * Расчёт отражённого луча
     * @param {Object} incident - Вектор падающего луча {x, y, z}
     * @param {Object} normal - Нормаль поверхности {x, y, z}
     * @returns {Object} - Вектор отражённого луча
     */
    calculateReflection(incident, normal) {
        // R = I - 2(I·N)N
        const dot = incident.x * normal.x + incident.y * normal.y + incident.z * normal.z;
        
        return {
            x: incident.x - 2 * dot * normal.x,
            y: incident.y - 2 * dot * normal.y,
            z: incident.z - 2 * dot * normal.z
        };
    },
    
    /**
     * Коэффициент отражения (Френель)
     */
    fresnelReflectance(cosTheta, n1, n2) {
        const r0 = Math.pow((n1 - n2) / (n1 + n2), 2);
        return r0 + (1 - r0) * Math.pow(1 - cosTheta, 5);
    }
};