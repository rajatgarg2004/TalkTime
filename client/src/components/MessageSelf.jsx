import React from "react";

export default function MessageSelf() {
  // console.log("Message self Prop : ", props);
  var props = {name:"you" , message : "This is a sample message"};
  return (
    <div className="flex self-end m-4 max-w-[60%]">
      <div className="bg-green-400 p-4 rounded-[20px]">
        <p >{props.message}</p>
        <p className=" text-right">12:00am</p>
      </div>
    </div>
  );
}