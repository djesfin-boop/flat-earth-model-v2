/**
 * Конвертеры единиц измерения
 * Координаты, время, углы
 */

const Converters = {
    /**
     * Широта в радиус на плоскости (азимутальная проекция)
     */
    latitudeToRadius(latitude) {
        const normalizedLat = (90 - latitude) / 90;
        return GEOMETRY.EARTH_RADIUS * normalizedLat * 0.5;
    },
    
    /**
     * Радиус на плоскости в широту
     */
    radiusToLatitude(radius) {
        const normalizedLat = radius / (GEOMETRY.EARTH_RADIUS * 0.5);
        return 90 - normalizedLat * 90;
    },
    
    /**
     * Преобразование даты в день года
     */
    dateToDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },
    
    /**
     * Преобразование времени в десятичные часы
     */
    timeToDecimal(hours, minutes, seconds = 0) {
        return hours + minutes / 60 + seconds / 3600;
    },
    
    /**
     * Декартовы координаты в сферические (для купола)
     */
    cartesianToSpherical(x, y, z) {
        const r = Math.sqrt(x*x + y*y + z*z);
        const theta = Math.acos(z / r); // полярный угол
        const phi = Math.atan2(y, x); // азимутальный угол
        return { r, theta, phi };
    },
    
    /**
     * Сферические координаты в декартовы
     */
    sphericalToCartesian(r, theta, phi) {
        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);
        return { x, y, z };
    },
    
    /**
     * Форматирование даты
     */
    formatDate(date) {
        const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                       'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },
    
    /**
     * Форматирование времени
     */
    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
};