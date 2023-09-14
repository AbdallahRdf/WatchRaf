import { useEffect, useRef } from "react";
//* sound files
import pomoTimerSoundFile from "../audio/microwave-timer-sound.mp3";
import breakTimeSoundFile from "../audio/bicycle-bell.mp3";

export const Audios = ({ state, isPomodoro }) => {
    const pomoAudioRef = useRef();
    const breaksAudioRef = useRef();

    useEffect(() => {
        if(state.timeRemaining === 0){
            if(isPomodoro){
                pomoAudioRef.current.play();
            }else{
                breaksAudioRef.current.play();
            }
        }
    }, [state.timeRemaining]);

  return (
    <div>
          <audio ref={pomoAudioRef} className="d-hidden" src={pomoTimerSoundFile} preload="auto"></audio>
          <audio ref={breaksAudioRef} className="d-hidden" src={breakTimeSoundFile} preload="auto"></audio>
    </div>
  )
}