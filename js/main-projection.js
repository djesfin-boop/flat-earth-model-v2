/**
 * Главный файл модели проекции
 * Инициализация и запуск всех модулей
 */

console.log('🌍 Загрузка модели проекции плоской Земли v3.0...');

window.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('📋 Инициализация модулей...');
        
        // 1. Инициализация Three.js сцены
        console.log('  → Создание сцены...');
        SceneSetup.init();
        
        // 2. Настройка камеры
        console.log('  → Настройка камеры...');
        CameraController.init(SceneSetup.scene, SceneSetup.renderer);
        
        // 3. Настройка освещения
        console.log('  → Настройка освещения...');
        SceneLighting.init(SceneSetup.scene);
        
        // 4. Создание геометрии
        console.log('  → Создание геометрии Земли...');
        EarthPlane.create(SceneSetup.scene, SceneSetup.renderer);
        
        console.log('  → Создание купола...');
        DomeGeometry.create(SceneSetup.scene);
        
        console.log('  → Создание атмосферы...');
        AtmospherePhysics.create(SceneSetup.scene);
        
        console.log('  → Создание магнитной горы...');
        MagneticMountain.create(SceneSetup.scene);
        
        // 5. Создание источников света (под землёй)
        console.log('  → Создание источников света...');
        SunSource.create(SceneSetup.scene);
        MoonSource.create(SceneSetup.scene);
        
        // 6. Создание проекций на куполе
        console.log('  → Создание проекций...');
        CelestialProjections.create(SceneSetup.scene);
        
        // 7. Инициализация UI
        console.log('  → Инициализация интерфейса...');
        ControlsPanel.init();
        InfoPanel.init();
        UserInteractions.init();
        
        // 8. Обновление начальных позиций
        console.log('  → Расчёт начальных позиций...');
        updateCelestialPositions();
        
        // 9. Запуск анимации
        console.log('  → Запуск анимации...');
        SceneSetup.animate();
        
        console.log('✅ Модель успешно загружена!');
        
    } catch (error) {
        console.error('❌ Ошибка инициализации:', error);
        alert('Произошла ошибка при загрузке модели. См. консоль для деталей.');
    }
});

/**
 * Обновление позиций небесных тел
 */
function updateCelestialPositions() {
    const currentDate = ControlsPanel.currentDate;
    
    // Рассчитать позиции источников под землёй
    const sunSourcePos = AstronomyPositions.calculateSunSourcePosition(currentDate);
    const moonSourcePos = AstronomyPositions.calculateMoonSourcePosition(currentDate);
    
    // Обновить источники
    SunSource.updatePosition(sunSourcePos);
    MoonSource.updatePosition(moonSourcePos);
    
    // Рассчитать проекции на купол
    const sunProjection = ProjectionPhysics.calculateProjection(
        sunSourcePos, GEOMETRY.SUN_SOURCE.SIZE, GEOMETRY.DOME_HEIGHT
    );
    const moonProjection = ProjectionPhysics.calculateProjection(
        moonSourcePos, GEOMETRY.MOON_SOURCE.SIZE, GEOMETRY.DOME_HEIGHT
    );
    
    // Обновить проекции
    CelestialProjections.updateSunProjection(sunProjection);
    CelestialProjections.updateMoonProjection(moonProjection);
    
    // Обновить информационную панель
    InfoPanel.update({
        date: currentDate,
        sunSource: sunSourcePos,
        moonSource: moonSourcePos,
        sunProjection: sunProjection,
        moonProjection: moonProjection
    });
}