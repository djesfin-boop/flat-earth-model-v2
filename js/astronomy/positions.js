/**
 * Расчёт позиций светил
 * Источники под Землёй вращаются вокруг центра
 */

const AstronomyPositions = {
    /**
     * Расчёт позиции источника Солнца
     */
    calculateSunSourcePosition(date) {
        // В этой модели источник вращается вокруг центра
        // Орбитальный радиус меняется в зависимости от сезона (деклинация)
        
        const dayOfYear = Converters.dateToDayOfYear(date);
        const declination = this.calculateSolarDeclination(date);
        
        // Орбитальный радиус зависит от деклинации
        const orbitRadius = Converters.latitudeToRadius(declination) * 0.3;
        
        // Угол вращения (полный оборот за 24 часа)
        const utcTime = date.getUTCHours() + date.getUTCMinutes() / 60;
        const angle = ((utcTime - 12) / 24) * Math.PI * 2 + GEOMETRY.GRID.PRIME_MERIDIAN_ANGLE;
        
        const x = orbitRadius * Math.cos(angle);
        const y = GEOMETRY.SUN_SOURCE.DEPTH;
        const z = orbitRadius * Math.sin(angle);
        
        return { x, y, z, declination, orbitRadius };
    },
    
    /**
     * Расчёт позиции источника Луны
     */
    calculateMoonSourcePosition(date) {
        const moonAge = this.calculateMoonAge(date);
        const declination = this.calculateMoonDeclination(date);
        
        // Орбитальный радиус
        const orbitRadius = Converters.latitudeToRadius(declination) * 0.3;
        
        // Угол (полный оборот за 27.3 дня)
        const daysSinceNewMoon = (date - PHYSICAL_CONSTANTS.REFERENCE_NEW_MOON) / (1000 * 60 * 60 * 24);
        const angle = (daysSinceNewMoon / PHYSICAL_CONSTANTS.SIDEREAL_MONTH) * Math.PI * 2 + GEOMETRY.GRID.PRIME_MERIDIAN_ANGLE;
        
        const x = orbitRadius * Math.cos(angle);
        const y = GEOMETRY.MOON_SOURCE.DEPTH;
        const z = orbitRadius * Math.sin(angle);
        
        return { x, y, z, declination, orbitRadius, moonAge };
    },
    
    /**
     * Расчёт солнечной деклинации
     */
    calculateSolarDeclination(date) {
        const daysSinceJ2000 = (date - PHYSICAL_CONSTANTS.J2000_EPOCH) / (1000 * 60 * 60 * 24);
        const meanAnomaly = (357.529 + 0.98560028 * daysSinceJ2000) * (Math.PI / 180);
        const eclipticLongitude = (280.459 + 0.98564736 * daysSinceJ2000) * (Math.PI / 180);
        const centerEquation = (1.915 * Math.sin(meanAnomaly) + 0.020 * Math.sin(2 * meanAnomaly)) * (Math.PI / 180);
        const trueLongitude = eclipticLongitude + centerEquation;
        const obliquity = 23.439 * (Math.PI / 180);
        const declination = Math.asin(Math.sin(obliquity) * Math.sin(trueLongitude));
        return declination * (180 / Math.PI);
    },
    
    /**
     * Расчёт лунной деклинации
     */
    calculateMoonDeclination(date) {
        const daysSinceJ2000 = (date - PHYSICAL_CONSTANTS.J2000_EPOCH) / (1000 * 60 * 60 * 24);
        const meanLongitude = (218.316 + 13.176396 * daysSinceJ2000) * (Math.PI / 180);
        const meanAnomaly = (134.963 + 13.064993 * daysSinceJ2000) * (Math.PI / 180);
        const latitude = (5.128 * Math.sin(meanAnomaly)) * (Math.PI / 180);
        const obliquity = 23.439 * (Math.PI / 180);
        const declination = Math.asin(Math.sin(latitude) * Math.cos(obliquity));
        return declination * (180 / Math.PI);
    },
    
    /**
     * Расчёт возраста Луны
     */
    calculateMoonAge(date) {
        const timeDiff = date - PHYSICAL_CONSTANTS.REFERENCE_NEW_MOON;
        const daysSinceNewMoon = timeDiff / (1000 * 60 * 60 * 24);
        const age = daysSinceNewMoon % PHYSICAL_CONSTANTS.SYNODIC_MONTH;
        return age < 0 ? age + PHYSICAL_CONSTANTS.SYNODIC_MONTH : age;
    }
};