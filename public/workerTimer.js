let startTime = 0;
let timeReached;
let timerStyle;
let currentTimerStyle;
let timerId;
let elapsedTime = 0;

self.addEventListener("message", (e) => {
  if (e.data.message === "start") {
    startTime = new Date();
    console.log("start time: ", startTime);
    timeReached = e.data.state.timeRemaining;
    timerStyle = e.data.timerStyle;
    switch (e.data.state.isPomodoro) {
      case timerStyle.pomodoro.title:
        currentTimerStyle = timerStyle.pomodoro;
        break;
      case timerStyle.shortBreak.title:
        currentTimerStyle = timerStyle.shortBreak;
        break;
      case timerStyle.longBreak.title:
        currentTimerStyle = timerStyle.longBreak;
        break;
    }
    checkIfTimerIsUp();
  } else if (e.data === "stop") {
    clearInterval(timerId);
    console.log(e.data);
    console.log(elapsedTime);
    self.postMessage(elapsedTime);
  }
});

const checkIfTimerIsUp = () => {
  timerId = setInterval(() => {
    elapsedTime = parseInt((new Date() - startTime) / 1000);
    console.log("elpased time: ", elapsedTime);
    if (elapsedTime >= timeReached) {
      self.postMessage("time's up");
      clearInterval(timerId);
    }
  }, 1000);
};
