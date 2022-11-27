import {useAppDispatch, useAppSelector} from "../common/hooks";
import {decrement, increment, reset} from "../store/counter-slice";
import {PlayButton} from "../common/components/PlayButton";
import {useRef, useState} from "react";

const Counter = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalSubscription = useRef<NodeJS.Timer | null>();
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer | null>();
  const onMinusClicked = () => {
    dispatch(decrement());
  };
  const onPlusClicked = () => {
    dispatch(increment());
  }
  const onPlayClicked = () => {
    setIsPlaying(true);
    setIntervalRef(setInterval(() => {
      dispatch(increment());
    }, 1000));
  }
  const onStopClicked = () => {
    setIsPlaying(false);
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }
  }
  const onResetClicked = () => {
    dispatch(reset());
    setIsPlaying(false);
  }

  return (
    <div className="mt-10 text-center">
      <h1 className="font-bold">Counter</h1>

      <div className="flex justify-center">
        <button type="button" onClick={() => onMinusClicked()}>-</button>
        <div className="m-5 text-lg rounded-full">{count}</div>
        <button type="button" onClick={() => onPlusClicked()}>+</button>
      </div>

      <div className="flex justify-center">
        {!isPlaying && <PlayButton onClick={onPlayClicked}></PlayButton>}
        {isPlaying && <button type="button" onClick={onStopClicked}>STOP</button>}
      </div>

      <div className="flex justify-center">
        <button onClick={onResetClicked} type="button" disabled={isPlaying}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
