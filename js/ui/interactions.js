/**
 * Пользовательские взаимодействия
 * Мышь, клавиатура, тачскрин
 */

const UserInteractions = {
    init() {
        this.setupKeyboardControls();
        this.setupMouseControls();
    },
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    document.getElementById('toggle-animation').click();
                    break;
                case 'r':
                case 'R':
                    CameraController.reset();
                    break;
            }
        });
    },
    
    setupMouseControls() {
        // Дополнительные контролы мыши если нужны
    }
};