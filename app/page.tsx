"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputVal, setInputVal] = useState<string>("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push(`/prediction/${inputVal}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl mb-4 text-center">Enter your name</h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <input
            type="text"
            placeholder="Type your name"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full p-2 text-black border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
             Submit
          </button>
        </form>
      </div>
    </div>
  );
}