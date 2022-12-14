import {ButtonHTMLAttributes} from "react";

type PlayButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PlayButton = ({...rest}: PlayButtonProps) => (
  <button {...rest}
          type="button"
          className="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-slate-700 h-10 w-10 focus:ring-2 focus:ring-offset-2">
    <div className="absolute -inset-3 md:hidden"></div>
    <svg aria-hidden="true" viewBox="0 0 36 36" className="fill-white group-active:fill-white/80 h-5 w-5">
      <path
        d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z"></path>
    </svg>
  </button>
);
