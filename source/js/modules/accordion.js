// ========== Общие переменные ==========
const faqButtons = document.querySelectorAll('.faq__button');
const faqLists = document.querySelectorAll('.faq__list');
const detailsElements = document.querySelectorAll('details');
let resizeTimer;

// ========== Логика обновления высоты аккордеонов ==========
const updateAccordionHeights = () => {
  detailsElements.forEach((details) => {
    if (details.open) {
      const summary = details.querySelector('summary');
      const content = summary?.nextElementSibling;
      if (content) {
        requestAnimationFrame(() => {
          content.style.maxHeight = `${content.scrollHeight}px`;
        });
      }
    }
  });
};

// ========== Логика вкладок ==========
const handleTabClick = (event) => {
  const tab = event.currentTarget;
  const targetTab = tab.dataset.tab;

  // Обновление активной вкладки
  faqButtons.forEach((currentTab) => {
    currentTab.classList.remove('faq__button--dark');
  });
  tab.classList.add('faq__button--dark');

  // Переключение контента вкладок
  faqLists.forEach((content) => {
    content.style.display = content.id === targetTab ? 'block' : 'none';
  });

  // Обновление высоты после изменения видимости
  setTimeout(updateAccordionHeights, 10);
};

faqButtons.forEach((tab) => {
  tab.addEventListener('click', handleTabClick);
});

// ========== Логика аккордеона ==========
const debounce = (callback, delay = 100) => (...args) => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => callback(...args), delay);
};

const initAccordion = (details) => {
  const summary = details.querySelector('summary');
  const content = summary?.nextElementSibling;
  if (!content) {
    return;
  }

  // Инициализация состояний
  details.isAnimating = false;
  content.style.transition = 'max-height 0.4s ease-in-out';
  content.style.overflow = 'hidden';
  content.style.maxHeight = details.open ? `${content.scrollHeight}px` : '0';
  summary.setAttribute('aria-expanded', details.open.toString());

  // Обработчик клика
  const handleClick = (event) => {
    event.preventDefault();
    if (details.isAnimating) {
      return;
    }

    details.isAnimating = true;
    const wasOpen = details.open;

    if (!wasOpen) {
      details.open = true;
      requestAnimationFrame(() => {
        content.style.maxHeight = `${content.scrollHeight}px`;
      });
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.maxHeight = '0';
      });
    }

    const handleTransitionEnd = () => {
      content.style.maxHeight = wasOpen ? '0' : `${content.scrollHeight}px`;
      summary.setAttribute('aria-expanded', (!wasOpen).toString());
      details.open = !wasOpen;
      details.isAnimating = false;
      content.removeEventListener('transitionend', handleTransitionEnd);
    };

    content.addEventListener('transitionend', handleTransitionEnd);
  };

  // Обработчик ресайза
  const handleResize = debounce(() => {
    if (details.open) {
      requestAnimationFrame(() => {
        content.style.maxHeight = `${content.scrollHeight}px`;
      });
    }
  });

  summary.addEventListener('click', handleClick);
  window.addEventListener('resize', handleResize);
};

// Инициализация всех аккордеонов
detailsElements.forEach(initAccordion);
