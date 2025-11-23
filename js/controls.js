/**
 * Управление UI
 * Обработка событий, перемещение панелей, обновление информации
 */

const Controls = {
    currentDate: new Date(2025, 10, 22, 21, 0, 0),
    isAnimating: false,
    animationSpeed: 1,
    
    /**
     * Инициализация контролов
     */
    init() {
        this.setupDateTimeControls();
        this.setupSpeedControl();
        this.setupVisibilityControls();
        this.setupButtons();
        this.setupDraggablePanels();
        this.setupCollapsiblePanels();
        this.updateInfoPanel();
    },
    
    /**
     * Настройка контролов даты и времени
     */
    setupDateTimeControls() {
        document.getElementById('date-picker').addEventListener('change', (e) => {
            const [year, month, day] = e.target.value.split('-').map(Number);
            this.currentDate.setFullYear(year);
            this.currentDate.setMonth(month - 1);
            this.currentDate.setDate(day);
            Celestial.updatePositions(this.currentDate);
            this.updateInfoPanel();
        });
        
        document.getElementById('time-picker').addEventListener('change', (e) => {
            const [hours, minutes] = e.target.value.split(':').map(Number);
            this.currentDate.setHours(hours);
            this.currentDate.setMinutes(minutes);
            Celestial.updatePositions(this.currentDate);
            this.updateInfoPanel();
        });
    },
    
    /**
     * Настройка скорости анимации
     */
    setupSpeedControl() {
        document.getElementById('speed-slider').addEventListener('input', (e) => {
            this.animationSpeed = parseFloat(e.target.value);
            document.getElementById('speed-value').textContent = this.animationSpeed.toFixed(1) + 'x';
        });
    },
    
    /**
     * Настройка чекбоксов видимости
     */
    setupVisibilityControls() {
        document.getElementById('show-earth').addEventListener('change', (e) => {
            Earth.earth.visible = e.target.checked;
        });
        document.getElementById('show-sun').addEventListener('change', (e) => {
            Celestial.sun.visible = e.target.checked;
        });
        document.getElementById('show-moon').addEventListener('change', (e) => {
            Celestial.moon.visible = e.target.checked;
        });
        document.getElementById('show-dome').addEventListener('change', (e) => {
            Earth.dome.visible = e.target.checked;
        });
        document.getElementById('show-atmosphere').addEventListener('change', (e) => {
            Earth.atmosphere.visible = e.target.checked;
        });
        document.getElementById('show-grid').addEventListener('change', (e) => {
            Earth.coordinateSystem.visible = e.target.checked;
        });
    },
    
    /**
     * Настройка кнопок
     */
    setupButtons() {
        document.getElementById('reset-camera').addEventListener('click', () => {
            Scene.camera.position.set(
                CONFIG.CAMERA.INITIAL_POSITION.x,
                CONFIG.CAMERA.INITIAL_POSITION.y,
                CONFIG.CAMERA.INITIAL_POSITION.z
            );
            Scene.camera.lookAt(0, 0, 0);
            Scene.controls.target.set(0, 0, 0);
            Scene.controls.update();
        });
        
        const toggleBtn = document.getElementById('toggle-animation');
        toggleBtn.addEventListener('click', () => {
            this.isAnimating = !this.isAnimating;
            toggleBtn.textContent = this.isAnimating ? 'Остановить анимацию' : 'Запустить анимацию';
        });
    },
    
    /**
     * Перемещение панелей
     */
    setupDraggablePanels() {
        const panel = document.getElementById('controls-panel');
        const handle = panel.querySelector('.drag-handle');
        
        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            panel.classList.add('dragging');
            initialX = e.clientX - panel.offsetLeft;
            initialY = e.clientY - panel.offsetTop;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                panel.style.left = currentX + 'px';
                panel.style.top = currentY + 'px';
                panel.style.right = 'auto';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            panel.classList.remove('dragging');
        });
    },
    
    /**
     * Сворачивание панелей
     */
    setupCollapsiblePanels() {
        document.querySelectorAll('.panel-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const panelId = button.dataset.panel;
                const panel = document.getElementById(`${panelId}-panel`);
                panel.classList.toggle('collapsed');
                button.textContent = panel.classList.contains('collapsed') ? '+' : '−';
            });
        });
    },
    
    /**
     * Обновление информационной панели
     */
    updateInfoPanel() {
        const sunPos = Astronomy.calculateSunPosition(this.currentDate);
        const moonPos = Astronomy.calculateMoonPosition(this.currentDate);
        const moonAge = Astronomy.calculateMoonAge(this.currentDate);
        const moonPhase = Astronomy.getMoonPhaseName(moonAge);
        const dayOfYear = Astronomy.dateToDayOfYear(this.currentDate);
        
        const dx = sunPos.x - moonPos.x;
        const dy = sunPos.y - moonPos.y;
        const dz = sunPos.z - moonPos.z;
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const dateStr = `${this.currentDate.getDate()} ${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        document.getElementById('info-content').innerHTML = `
            <strong>Дата:</strong> ${dateStr} (день ${dayOfYear})<br>
            <strong>Время:</strong> ${this.currentDate.getHours().toString().padStart(2, '0')}:${this.currentDate.getMinutes().toString().padStart(2, '0')} MSK<br>
            <strong>UTC:</strong> ${this.currentDate.getUTCHours().toString().padStart(2, '0')}:${this.currentDate.getUTCMinutes().toString().padStart(2, '0')}<br>
            <strong>Деклинация Солнца:</strong> ${sunPos.declination.toFixed(2)}°<br>
            <strong>Радиус орбиты Солнца:</strong> ${sunPos.radius.toFixed(0)} км<br>
            <strong>Деклинация Луны:</strong> ${moonPos.declination.toFixed(2)}°<br>
            <strong>Радиус орбиты Луны:</strong> ${moonPos.radius.toFixed(0)} км<br>
            <strong>Возраст Луны:</strong> ${moonAge.toFixed(1)} дней<br>
            <strong>Фаза Луны:</strong> ${moonPhase}<br>
            <strong>Расстояние С-Л:</strong> ${distance.toFixed(0)} км
        `;
    },
    
    /**
     * Обновление полей даты/времени
     */
    updateDateTimeInputs() {
        document.getElementById('date-picker').value = 
            `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}-${this.currentDate.getDate().toString().padStart(2, '0')}`;
        
        document.getElementById('time-picker').value = 
            `${this.currentDate.getHours().toString().padStart(2, '0')}:${this.currentDate.getMinutes().toString().padStart(2, '0')}`;
    },
    
    /**
     * Скрытие экрана загрузки
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-status');
        if (loadingScreen) loadingScreen.style.display = 'none';
        document.getElementById('info-panel').style.display = 'block';
        document.getElementById('controls-panel').style.display = 'block';
    }
};