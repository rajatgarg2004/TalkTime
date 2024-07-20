import React from "react";

export default function Groups({props}){
    return(
        <div className="flex flex-row m-4 bg-white rounded-[20px] shadow-lg">
            <p className="flex justify-center items-center text-uppercase bg-gray-300 text-white font-bold text-3xl h-12 w-12 p-1 rounded-full self-center m-[10px]">
                {props.name[0]}
            </p>
            <div className="flex flex-row items-center m-[10px] w-[70%]">
                <p className="font-bold text-gray-600 capitalize">
                    {props.name}
                </p>
            </div>
        </div>
    );
}