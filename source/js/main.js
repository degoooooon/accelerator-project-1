import './modules/accordion.js';
import './modules/video.js';
import './modules/tabs.js';
import './modules/form.js';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const swiperCommonSettings = {
  modules: [Navigation],
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
};

new Swiper('.juri__swiper', {
  ...swiperCommonSettings,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
      simulateTouch: true,
      touchRatio: 0.6
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      simulateTouch: true,
      touchRatio: 0.5
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 40,
      simulateTouch: false,
      touchRatio: 0
    }
  }
});

new Swiper('.reviews__inner', {
  ...swiperCommonSettings,
  loop: false,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      simulateTouch: true,
      touchRatio: 0.8
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
      simulateTouch: false,
      touchRatio: 1
    },
    1366: {
      slidesPerView: 1,
      spaceBetween: 10,
      simulateTouch: false,
      touchRatio: 0
    }
  }
});
