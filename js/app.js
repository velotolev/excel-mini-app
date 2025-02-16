// Дожидаемся полной загрузки DOM перед выполнением кода
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, доступен ли объект Telegram WebApp
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('Telegram WebApp is not available');
        return;
    }

    try {
        // Сообщаем Telegram, что приложение готово к работе
        window.Telegram.WebApp.ready();

        // Получаем ссылки на элементы DOM
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');

        // Получаем ссылку на главную кнопку Telegram
        const mainButton = window.Telegram.WebApp.MainButton;

        // Проверяем, найдены ли все необходимые элементы
        if (!fileInput || !uploadBtn) {
            console.error('Required DOM elements not found');
            return;
        }

        // Настраиваем главную кнопку Telegram
        mainButton.setText('Process Excel');
        mainButton.hide(); // Скрываем кнопку, пока файл не выбран

        // Обработчик события выбора файла
        fileInput.addEventListener('change', (event) => {
            try {
                const files = event.target.files;

                if (files && files.length > 0) {
                    // Проверяем тип файла
                    const file = files[0];
                    const validTypes = [
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    ];

                    if (validTypes.includes(file.type)) {
                        mainButton.show();
                        // Обновляем текст кнопки загрузки
                        uploadBtn.textContent = file.name;
                    } else {
                        alert('Please select a valid Excel file');
                        fileInput.value = ''; // Очищаем input
                        mainButton.hide();
                    }
                } else {
                    mainButton.hide();
                }
            } catch (error) {
                console.error('Error handling file selection:', error);
                mainButton.hide();
            }
        });

        // Обработчик нажатия главной кнопки Telegram
        mainButton.onClick(() => {
            try {
                if (fileInput.files && fileInput.files[0]) {
                    console.log('Starting file processing...');
                    // TODO: Здесь будет логика обработки файла
                    // Можно добавить индикатор загрузки
                    mainButton.disable(); // Блокируем кнопку во время обработки
                }
            } catch (error) {
                console.error('Error processing file:', error);
                mainButton.enable(); // Разблокируем кнопку в случае ошибки
            }
        });

        // Обработчик нажатия кнопки загрузки
        uploadBtn.addEventListener('click', () => {
            fileInput.click(); // Имитируем клик по input[type="file"]
        });

    } catch (error) {
        console.error('Error initializing app:', error);
    }
});