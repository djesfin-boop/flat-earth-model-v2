/**
 * Пользовательские взаимодействия
 * Мышь, клавиатура
 */

const UserInteractions = {
    init() {
        this.setupKeyboardControls();
        console.log('✓ Взаимодействия настроены');
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
    }
};