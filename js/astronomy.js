/**
 * Астрономические расчёты
 * Расчёт позиций Солнца и Луны, деклинаций, фаз Луны
 */

const Astronomy = {
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
     * Расчёт солнечной деклинации
     */
    calculateSolarDeclination(date) {
        const daysSinceJ2000 = (date - CONFIG.J2000_EPOCH) / (1000 * 60 * 60 * 24);
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
        const daysSinceJ2000 = (date - CONFIG.J2000_EPOCH) / (1000 * 60 * 60 * 24);
        const meanLongitude = (218.316 + 13.176396 * daysSinceJ2000) * (Math.PI / 180);
        const meanAnomaly = (134.963 + 13.064993 * daysSinceJ2000) * (Math.PI / 180);
        const meanElongation = (297.850 + 12.190749 * daysSinceJ2000) * (Math.PI / 180);
        const argumentOfLatitude = (93.272 + 13.229350 * daysSinceJ2000) * (Math.PI / 180);
        
        const longitude = meanLongitude + 
                         (6.289 * Math.sin(meanAnomaly)) * (Math.PI / 180) +
                         (1.274 * Math.sin(2 * meanElongation - meanAnomaly)) * (Math.PI / 180) +
                         (0.658 * Math.sin(2 * meanElongation)) * (Math.PI / 180);
        
        const latitude = (5.128 * Math.sin(argumentOfLatitude)) * (Math.PI / 180) +
                        (0.280 * Math.sin(meanAnomaly + argumentOfLatitude)) * (Math.PI / 180);
        
        const obliquity = 23.439 * (Math.PI / 180);
        const declination = Math.asin(
            Math.sin(latitude) * Math.cos(obliquity) +
            Math.cos(latitude) * Math.sin(obliquity) * Math.sin(longitude)
        );
        
        return declination * (180 / Math.PI);
    },
    
    /**
     * Расчёт уравнения времени
     */
    calculateEquationOfTime(date) {
        const daysSinceJ2000 = (date - CONFIG.J2000_EPOCH) / (1000 * 60 * 60 * 24);
        const meanAnomaly = (357.529 + 0.98560028 * daysSinceJ2000) * (Math.PI / 180);
        const eclipticLongitude = (280.459 + 0.98564736 * daysSinceJ2000) * (Math.PI / 180);
        
        const eot = 229.18 * (0.000075 + 
                              0.001868 * Math.cos(eclipticLongitude) - 
                              0.032077 * Math.sin(eclipticLongitude) - 
                              0.014615 * Math.cos(2 * eclipticLongitude) - 
                              0.040849 * Math.sin(2 * eclipticLongitude));
        return eot;
    },
    
    /**
     * Расчёт возраста Луны (фаза)
     */
    calculateMoonAge(date) {
        const timeDiff = date - CONFIG.REFERENCE_NEW_MOON;
        const daysSinceNewMoon = timeDiff / (1000 * 60 * 60 * 24);
        const age = daysSinceNewMoon % CONFIG.SYNODIC_MONTH;
        return age < 0 ? age + CONFIG.SYNODIC_MONTH : age;
    },
    
    /**
     * Название фазы Луны
     */
    getMoonPhaseName(age) {
        if (age < 1.84566) return 'Новолуние';
        if (age < 7.38264) return 'Растущий серп';
        if (age < 9.22830) return 'Первая четверть';
        if (age < 14.76528) return 'Растущая луна';
        if (age < 16.61094) return 'Полнолуние';
        if (age < 22.14792) return 'Убывающая луна';
        if (age < 23.99358) return 'Последняя четверть';
        if (age < 29.53059) return 'Убывающий серп';
        return 'Новолуние';
    },
    
    /**
     * Конвертация широты в радиус на плоскости
     */
    latitudeToRadius(latitude) {
        const normalizedLat = (90 - latitude) / 90;
        return CONFIG.EARTH_RADIUS * normalizedLat * 0.5;
    },
    
    /**
     * Расчёт позиции Солнца
     */
    calculateSunPosition(date) {
        const declination = this.calculateSolarDeclination(date);
        const radius = this.latitudeToRadius(declination);
        
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const utcSeconds = date.getUTCSeconds();
        const utcTime = utcHours + utcMinutes / 60 + utcSeconds / 3600;
        
        const eot = this.calculateEquationOfTime(date);
        const trueSolarTime = utcTime + (eot / 60);
        const hourAngle = ((trueSolarTime - 12.0) / 24.0) * Math.PI * 2;
        const angle = hourAngle + CONFIG.GREENWICH_OFFSET;
        
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = CONFIG.SUN_HEIGHT;
        
        return { x, y, z, declination, radius };
    },
    
    /**
     * Расчёт позиции Луны
     */
    calculateMoonPosition(date) {
        const declination = this.calculateMoonDeclination(date);
        const radius = this.latitudeToRadius(declination);
        
        const daysSinceNewMoon = (date - CONFIG.REFERENCE_NEW_MOON) / (1000 * 60 * 60 * 24);
        const orbitalAngle = (daysSinceNewMoon / CONFIG.SIDEREAL_MONTH) * Math.PI * 2;
        const angle = orbitalAngle + CONFIG.GREENWICH_OFFSET;
        
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = CONFIG.MOON_HEIGHT;
        
        return { x, y, z, declination, radius };
    }
};