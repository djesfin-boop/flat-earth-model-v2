/**
 * Информационная панель
 * Отображение данных о модели
 */

const InfoPanel = {
    init() {
        console.log('✓ Информационная панель инициализирована');
    },
    
    update(data) {
        const timeInfo = document.getElementById('time-info');
        const sunInfo = document.getElementById('sun-info');
        const moonInfo = document.getElementById('moon-info');
        const projectionInfo = document.getElementById('projection-info');
        
        if (timeInfo) {
            timeInfo.innerHTML = `
                <strong>Дата:</strong> ${Converters.formatDate(data.date)}<br>
                <strong>Время:</strong> ${Converters.formatTime(data.date)} MSK<br>
                <strong>День года:</strong> ${Converters.dateToDayOfYear(data.date)}
            `;
        }
        
        if (sunInfo && data.sunSource) {
            sunInfo.innerHTML = `
                <strong>Источник Солнца:</strong><br>
                Глубина: ${Math.abs(data.sunSource.y).toFixed(0)} км<br>
                Орбита: ${data.sunSource.orbitRadius.toFixed(0)} км<br>
                Деклинация: ${data.sunSource.declination.toFixed(2)}°
            `;
        }
        
        if (moonInfo && data.moonSource) {
            moonInfo.innerHTML = `
                <strong>Источник Луны:</strong><br>
                Глубина: ${Math.abs(data.moonSource.y).toFixed(0)} км<br>
                Орбита: ${data.moonSource.orbitRadius.toFixed(0)} км<br>
                Возраст: ${data.moonSource.moonAge.toFixed(1)} дней
            `;
        }
        
        if (projectionInfo && data.sunProjection && data.moonProjection) {
            projectionInfo.innerHTML = `
                <strong>Проекции на куполе:</strong><br>
                Солнце: высота ${data.sunProjection.position.y.toFixed(0)} км<br>
                Луна: высота ${data.moonProjection.position.y.toFixed(0)} км
            `;
        }
    }
};