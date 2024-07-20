import React from "react";

export default function MessageOther() {
    var props = {name : "RandomUser", message : "Hello My Name is Rajat", timestamp: "today"}
  return (
    <div className="m-4 w-auto max-w-[70%]">
       <div className="flex flex-row">
            <p className="flex justify-center items-center text-uppercase bg-gray-300 text-white font-bold text-3xl h-12 w-12 p-1 rounded-full self-center m-[10px]">
                {props.name[0]}
            </p>
            <div className="flex flex-row bg-gray-300 p-4 rounded-[20px] m-4">
                <div className="flex flex-col">
                    <p className="font-bold text-gray-600 capitalize">
                        {props.name}
                    </p>
                    <p className="text-xs font-light italic text-gray-600">
                        {props.message}
                    </p>
                </div>
                
                <p className="text-xs text-gray-600 self-end w-[auto] ml-4">
                    {props.timestamp}
                </p>
            </div>
        </div>
    </div>
  );
}
