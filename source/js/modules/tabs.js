// Данные для цен (camelCase)
const subscriptionPrices = {
  1: ['5000', '1700', '2700'],
  6: ['30000', '10200', '16200'],
  12: ['60000', '20400', '32400'],
};

// Обработчик клика (вынесен в отдельную функцию)
function handleTabClick() {
  const activeTab = document.querySelector('.tabs__control.tabs__control--active');
  activeTab.classList.remove('tabs__control--active');
  this.classList.add('tabs__control--active');

  const selectedPeriod = this.dataset.period;
  const priceCards = document.querySelectorAll('.tabs__item');

  priceCards.forEach((card, cardIndex) => {
    const priceElement = card.querySelector('.tabs__description');
    const backgroundPriceElement = card.querySelector('.tabs__price-bg');

    priceElement.textContent = subscriptionPrices[selectedPeriod][cardIndex];
    backgroundPriceElement.textContent = subscriptionPrices[selectedPeriod][cardIndex];
  });
}

// Инициализация
document.querySelectorAll('.tabs__control').forEach((tabElement) => {
  tabElement.addEventListener('click', handleTabClick);
});
