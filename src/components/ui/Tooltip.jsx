/* eslint-disable react/prop-types */
export default function ToolTip({ message, children, className }) {
  return (
    <div
      className={`group relative flex  flex-col items-center justify-center w-full
      }`}
    >
      {children}
      <div
        className={`absolute left-1/2 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 text-xs transition-all duration-500 group-hover:scale-100 ${className}`}
      >
        <div className="flex max-w-xs flex-col-reverse items-center">
          <div className="rounded bg-black p-2 text-left text-base text-white">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
