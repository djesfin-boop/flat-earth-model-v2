/**
 * Механика проекции
 * Расчёт проекции источника света на купол
 */

const ProjectionPhysics = {
    /**
     * Расчёт проекции точечного источника на купол
     * @param {Object} sourcePos - Позиция источника {x, y, z}
     * @param {Number} sourceSize - Размер источника (км)
     * @param {Number} domeHeight - Высота купола (км)
     * @returns {Object} - Параметры проекции
     */
    calculateProjection(sourcePos, sourceSize, domeHeight) {
        // Вектор от источника к вершине купола
        const dx = 0 - sourcePos.x;
        const dy = domeHeight - sourcePos.y;
        const dz = 0 - sourcePos.z;
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Нормализованный вектор направления
        const dirX = dx / distance;
        const dirY = dy / distance;
        const dirZ = dz / distance;
        
        // Точка пересечения луча с куполом
        const t = this.raySphereIntersection(
            sourcePos,
            { x: dirX, y: dirY, z: dirZ },
            { x: 0, y: 0, z: 0 },
            domeHeight
        );
        
        if (t > 0) {
            const projX = sourcePos.x + dirX * t;
            const projY = sourcePos.y + dirY * t;
            const projZ = sourcePos.z + dirZ * t;
            
            // Размер проекции (зависит от расстояния)
            const projectionSize = (sourceSize / distance) * t;
            
            return {
                position: { x: projX, y: projY, z: projZ },
                size: projectionSize,
                intensity: 1.0 / (distance / 10000) // затухание с расстоянием
            };
        }
        
        return null;
    },
    
    /**
     * Пересечение луча со сферой (купол)
     */
    raySphereIntersection(rayOrigin, rayDir, sphereCenter, sphereRadius) {
        const dx = rayOrigin.x - sphereCenter.x;
        const dy = rayOrigin.y - sphereCenter.y;
        const dz = rayOrigin.z - sphereCenter.z;
        
        const a = rayDir.x * rayDir.x + rayDir.y * rayDir.y + rayDir.z * rayDir.z;
        const b = 2 * (dx * rayDir.x + dy * rayDir.y + dz * rayDir.z);
        const c = dx*dx + dy*dy + dz*dz - sphereRadius * sphereRadius;
        
        const discriminant = b*b - 4*a*c;
        
        if (discriminant < 0) return -1;
        
        const t1 = (-b - Math.sqrt(discriminant)) / (2*a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2*a);
        
        // Возвращаем ближайшее положительное пересечение
        if (t1 > 0) return t1;
        if (t2 > 0) return t2;
        return -1;
    }
};