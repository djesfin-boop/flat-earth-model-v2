/**
 * Главный файл приложения
 * Запуск и инициализация всех модулей
 */

window.addEventListener('DOMContentLoaded', () => {
    // Инициализация Three.js сцены
    Scene.init();
    
    // Создание Земли и окружения
    Earth.createEarth(Scene.scene, Scene.renderer);
    Earth.createCoordinateSystem(Scene.scene);
    Earth.createDome(Scene.scene);
    Earth.createAtmosphere(Scene.scene);
    Earth.createShadowPlane(Scene.scene);
    
    // Создание небесных тел
    Celestial.createSun(Scene.scene);
    Celestial.createMoon(Scene.scene);
    
    // Настройка контролов
    Controls.init();
    
    // Обновление позиций светил
    Celestial.updatePositions(Controls.currentDate);
    
    // Запуск анимации
    Scene.animate();
});