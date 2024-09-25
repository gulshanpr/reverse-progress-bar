"use client"
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>('');

  const handlePostTweetButton = async() => {
    try {
      const response = await fetch('/api/tweet', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tweet: message})
      })

      if(!response.ok){
        throw new Error("Error in response");
      }

      const data: any = await response.json();
      console.log(data);
      setMessage(data);
      
    } catch (error) {
      console.error("Error in making a post request",error);
      throw new Error("Error in making post request");
    }
  }

  const handleInput = (event: any) =>{
    setMessage(event.target.value);
  }
  return (
    <div className="flex justify-center">
      <input type="text" onChange={handleInput} value={message}/>
      <button onClick={handlePostTweetButton}>Make the tweet</button>
      <p>{message}</p>
    </div>
  );
}
