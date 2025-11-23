/**
 * Панель управления
 * Обработка всех элементов управления
 */

const ControlsPanel = {
    currentDate: new Date(2025, 10, 23, 21, 0, 0),
    isAnimating: false,
    animationSpeed: 1,
    
    init() {
        this.setupDateTimeControls();
        this.setupSpeedControl();
        this.setupVisibilityControls();
        this.setupButtons();
        this.setupDraggable();
        this.setupCollapsible();
    },
    
    setupDateTimeControls() {
        document.getElementById('date-picker').addEventListener('change', (e) => {
            const [year, month, day] = e.target.value.split('-').map(Number);
            this.currentDate.setFullYear(year);
            this.currentDate.setMonth(month - 1);
            this.currentDate.setDate(day);
            updateCelestialPositions();
        });
        
        document.getElementById('time-picker').addEventListener('change', (e) => {
            const [hours, minutes] = e.target.value.split(':').map(Number);
            this.currentDate.setHours(hours);
            this.currentDate.setMinutes(minutes);
            updateCelestialPositions();
        });
    },
    
    setupSpeedControl() {
        document.getElementById('speed-slider').addEventListener('input', (e) => {
            this.animationSpeed = parseFloat(e.target.value);
            document.getElementById('speed-value').textContent = this.animationSpeed.toFixed(1) + 'x';
        });
    },
    
    setupVisibilityControls() {
        // Будет реализовано для каждого объекта
    },
    
    setupButtons() {
        document.getElementById('reset-camera').addEventListener('click', () => {
            CameraController.reset();
        });
        
        const toggleBtn = document.getElementById('toggle-animation');
        toggleBtn.addEventListener('click', () => {
            this.isAnimating = !this.isAnimating;
            toggleBtn.textContent = this.isAnimating ? 'Остановить анимацию' : 'Запустить анимацию';
        });
    },
    
    setupDraggable() {
        // Реализация перетаскивания панели
        const panel = document.getElementById('controls-panel');
        const handle = panel.querySelector('.drag-handle');
        let isDragging = false, currentX, currentY, initialX, initialY;
        
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
    
    setupCollapsible() {
        document.querySelectorAll('.panel-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const panelId = button.dataset.panel;
                const panel = document.getElementById(`${panelId}-panel`);
                panel.classList.toggle('collapsed');
                button.textContent = panel.classList.contains('collapsed') ? '+' : '−';
            });
        });
    },
    
    updateDateTimeInputs() {
        document.getElementById('date-picker').value = 
            `${this.currentDate.getFullYear()}-${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}-${this.currentDate.getDate().toString().padStart(2, '0')}`;
        document.getElementById('time-picker').value = 
            `${this.currentDate.getHours().toString().padStart(2, '0')}:${this.currentDate.getMinutes().toString().padStart(2, '0')}`;
    },
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-status');
        if (loadingScreen) loadingScreen.style.display = 'none';
        document.getElementById('info-panel').style.display = 'block';
        document.getElementById('controls-panel').style.display = 'block';
    }
};