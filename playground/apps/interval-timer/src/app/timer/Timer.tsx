import {useCallback, useEffect, useRef, useState} from "react";
import {PlayButton} from "../common/components/PlayButton";
import {PauseButton} from "../common/components/PauseButton";

export const Timer = () => {
  const work = 5; // sec
  const [count, setCount] = useState(work);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinnished, setIsFinnished] = useState(false);
  const timerSubscription = useRef<NodeJS.Timer | null>();
  const onPlayClicked = () => {
    startTimer();
  };
  const onPauseClicked = () => {
    stopTimer();
  }
  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (timerSubscription.current) {
      clearInterval(timerSubscription.current);
      timerSubscription.current = null;
    }
  }, []);
  const finishTimer = useCallback(() => {
    stopTimer();
    setIsFinnished(true);
  }, [stopTimer]);
  const startTimer = useCallback(() => {
    console.log('start timer');
    setIsRunning(true);
    timerSubscription.current = setInterval(() => {
      setCount((state) => (state-1));
    }, 1000);
  }, []);
  useEffect(() => {
    console.log('count', count);
    if (count === 0) {
      finishTimer();
    }
  }, [count, finishTimer]);
  const wrapperClasses = [
    !isFinnished ? "bg-red-500" : "bg-cyan-500",
    "timer-bg"
  ].join(" ");

  return (
    <div className={wrapperClasses}>
      <div className="text-8xl">{count}</div>

      <div>State: {isRunning ? 'is running' : 'stopped'}</div>
      <div>
        {!isRunning && <PlayButton onClick={onPlayClicked}></PlayButton>}
        {isRunning && <PauseButton onClick={onPauseClicked}></PauseButton>}
      </div>
    </div>
  );
}
