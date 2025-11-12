// Основные элементы формы
const form = document.getElementById('form');
const inputs = form.querySelectorAll('.free__input');

// Конфигурация сообщений об ошибках
const errorConfig = {
  requiredMessage: 'Обязательное поле',
  namePatternMessage: 'Только буквы и пробелы',
  telPatternMessage: 'Только цифры и символы + - ( )',
  minLengthMessage: 'Минимальная длина 2 символа',
  maxLengthMessage: 'Максимальная длина 25 символов'
};

// Паттерны для валидации полей
const validationPatterns = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s]+$/, // Только буквы и пробелы
  tel: /^[0-9+\-()\s]*$/ // Цифры и телефонные символы
};

/**
 * Показывает сообщение об ошибке для указанного элемента ввода
 * @param {HTMLInputElement} inputElement - Элемент ввода с ошибкой
 * @param {string} message - Текст сообщения об ошибке
 */
function showErrorMessage(inputElement, message) {
  const inputGroup = inputElement.closest('.free__group');
  if (!inputGroup) {
    return;
  }

  // Добавление класса ошибки для стилизации
  inputGroup.classList.add('error');

  // Поиск или создание контейнера для сообщения
  let errorElement = inputGroup.querySelector('.free__error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'free__error';
    inputGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

/**
 * Скрывает сообщение об ошибке для указанного элемента ввода
 * @param {HTMLInputElement} inputElement - Элемент ввода для очистки ошибок
 */
function hideErrorMessage(inputElement) {
  const inputGroup = inputElement.closest('.free__group');
  if (!inputGroup) {
    return;
  }

  // Удаление класса ошибки и сообщения
  inputGroup.classList.remove('error');
  const errorElement = inputGroup.querySelector('.free__error');
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Выполняет валидацию отдельного поля ввода
 * @param {HTMLInputElement} inputElement - Проверяемый элемент ввода
 * @returns {boolean} Результат валидации
 */
function validateInput(inputElement) {
  const inputValue = inputElement.value.trim();
  let isValid = true;

  // Валидация обязательного поля
  if (inputElement.required && !inputValue) {
    showErrorMessage(inputElement, errorConfig.requiredMessage);
    return false;
  }

  // Проверка минимальной длины
  if (inputValue.length < inputElement.minLength) {
    showErrorMessage(inputElement, errorConfig.minLengthMessage);
    return false;
  }

  // Проверка максимальной длины
  if (inputValue.length > inputElement.maxLength) {
    showErrorMessage(inputElement, errorConfig.maxLengthMessage);
    return false;
  }

  // Специфическая валидация для разных типов полей
  if (inputValue) {
    switch(inputElement.id) {
      case 'name':
        // Проверка паттерна имени
        if (!validationPatterns.name.test(inputValue)) {
          showErrorMessage(inputElement, errorConfig.namePatternMessage);
          isValid = false;
        }
        break;

      case 'tel':
        // Проверка паттерна телефона
        if (!validationPatterns.tel.test(inputValue)) {
          showErrorMessage(inputElement, errorConfig.telPatternMessage);
          isValid = false;
        }
        break;
    }
  }

  // Очистка ошибок при успешной валидации
  if (isValid) {
    hideErrorMessage(inputElement);
  }
  return isValid;
}

/**
 * Выполняет валидацию всей формы
 * @returns {boolean} Общий результат валидации формы
 */
function validateForm() {
  let isFormValid = true;

  // Последовательная проверка всех полей
  inputs.forEach((input) => {
    if (!validateInput(input)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

// Обработчик отправки формы
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Запуск валидации и отправка при успехе
  if (validateForm()) {
    this.submit();
  }
});

// Обработчики событий для валидации при вводе
inputs.forEach((input) => {
  // Валидация при изменении значения
  input.addEventListener('input', () => {
    if (input.value.trim()) {
      validateInput(input);
    }
  });

  // Валидация при потере фокуса
  input.addEventListener('blur', () => validateInput(input));
});
