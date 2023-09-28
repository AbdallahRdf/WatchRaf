let startTime = 0;
let timerType;
let timeReached;
let timerStyle;
let currentTimerStyle;

self.addEventListener("message", (e) => {
  if (e.data.message === "start") {
    startTime = Date.now();
    timeReached = e.data.state.timeRemaining;
    timerType = e.data.state.isPomodor;
    timerStyle = e.data.timerStyle;
    isRunning = true;
    switch(timerType){
      case timerStyle.pomodoro.title: currentTimerStyle = timerStyle.pomodoro; break;
      case timerStyle.shortBreak.title: currentTimerStyle = timerStyle.shortBreak; break;
      case timerStyle.longBreak.title: currentTimerStyle = timerStyle.longBreak; break;
    }
    checkIfTimerIsUp();
  } else if (e.data.message === "stop") {
    const elapsedTime = Date.now() - startTime;
    self.postMessage(elapsedTime);
  }
});

const checkIfTimerIsUp = () => {
  if(timeReached + (Date.now() - startTime) === currentTimerStyle.time){
    self.postMessage('timer is up');
  }else{
    setTimeout(checkIfTimerIsUp, 1000);
  }
}
