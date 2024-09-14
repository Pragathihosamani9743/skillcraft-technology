document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const startPauseButton = document.getElementById('startPause');
  const lapButton = document.getElementById('lap');
  const resetButton = document.getElementById('reset');
  const lapList = document.getElementById('lapList');

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let isRunning = false;
  let lapTimes = [];

  function formatTime(time) {
      const date = new Date(time);
      return date.toISOString().substr(11, 12);
  }

  function updateDisplay() {
      display.textContent = formatTime(elapsedTime);
  }

  function startPause() {
      if (isRunning) {
          clearInterval(timerInterval);
          startPauseButton.textContent = 'Start';
          lapButton.disabled = true;
      } else {
          startTime = Date.now() - elapsedTime;
          timerInterval = setInterval(() => {
              elapsedTime = Date.now() - startTime;
              updateDisplay();
          }, 10);
          startPauseButton.textContent = 'Pause';
          lapButton.disabled = false;
      }
      isRunning = !isRunning;
  }

  function lap() {
      if (isRunning) {
          lapTimes.push(elapsedTime);
          const li = document.createElement('li');
          li.textContent = `Lap ${lapTimes.length}: ${formatTime(elapsedTime)}`;
          lapList.appendChild(li);
      }
  }

  function reset() {
      clearInterval(timerInterval);
      elapsedTime = 0;
      updateDisplay();
      isRunning = false;
      startPauseButton.textContent = 'Start';
      lapButton.disabled = true;
      lapTimes = [];
      lapList.innerHTML = '';
  }

  startPauseButton.addEventListener('click', startPause);
  lapButton.addEventListener('click', lap);
  resetButton.addEventListener('click', reset);

  updateDisplay();
});
