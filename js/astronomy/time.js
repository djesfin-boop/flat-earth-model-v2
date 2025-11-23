/**
 * Временные расчёты
 * День года, время суток, сезоны
 */

const TimeCalculations = {
    /**
     * Високосный год?
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },
    
    /**
     * Количество дней в году
     */
    daysInYear(year) {
        return this.isLeapYear(year) ? 366 : 365;
    },
    
    /**
     * Сезон года
     */
    getSeason(dayOfYear, hemisphere = 'north') {
        if (hemisphere === 'north') {
            if (dayOfYear < 80 || dayOfYear >= 355) return 'winter';
            if (dayOfYear >= 80 && dayOfYear < 172) return 'spring';
            if (dayOfYear >= 172 && dayOfYear < 266) return 'summer';
            return 'autumn';
        } else {
            if (dayOfYear < 80 || dayOfYear >= 355) return 'summer';
            if (dayOfYear >= 80 && dayOfYear < 172) return 'autumn';
            if (dayOfYear >= 172 && dayOfYear < 266) return 'winter';
            return 'spring';
        }
    }
};