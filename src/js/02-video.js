import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  const parsedTime = JSON.parse(savedTime);
  player.setCurrentTime(parsedTime.seconds);
}
