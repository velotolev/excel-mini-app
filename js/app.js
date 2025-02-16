// Дожидаемся загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Инициализация Telegram WebApp
  window.Telegram.WebApp.ready();

  // Получаем элементы
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const mainButton = window.Telegram.WebApp.MainButton;

  // Настраиваем главную кнопку
  mainButton.setText("Process Excel");
  mainButton.hide();

  // Обработчик выбора файла
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      mainButton.show();
      uploadBtn.textContent = e.target.files[0].name;
    } else {
      mainButton.hide();
    }
  });

  // Обработчик кнопки загрузки
  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Обработчик главной кнопки
  mainButton.onClick(() => {
    console.log("Processing file...");
    // Здесь будет логика обработки файла
  });
});
