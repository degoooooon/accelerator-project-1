function handleVideoButtonClick() {
  const videoContainer = this.closest('.video__container');
  if (!videoContainer) {
    return;
  }

  const iframeElement = document.createElement('iframe');
  iframeElement.className = 'video__iframe';
  iframeElement.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
  iframeElement.setAttribute('allowfullscreen', '');
  iframeElement.src = 'https://www.youtube.com/embed/9TZXsZItgdw?si=_NYJ45L6W8nBjaUC';

  const posterElement = videoContainer.querySelector('.video__poster');
  const buttonElement = this;

  if (posterElement) {
    posterElement.remove();
  }
  buttonElement.remove();

  videoContainer.appendChild(iframeElement);
}

document.querySelector('.video__button').addEventListener('click', handleVideoButtonClick);
