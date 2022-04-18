import React from "react";

const TwoFactor = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <form className="flex  justify-center">
        <input
          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white xl:w-2/5 sm:w-4/5"
          placeholder="..."
        />
        <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-orange-500 border-t border-b border-r">
          Verify
        </button>
      </form>
    </div>
  );
};
export default TwoFactor;
