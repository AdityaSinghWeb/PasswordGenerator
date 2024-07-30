import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const passRef = useRef(null);

  const copyText = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1 className="text-white text-center my-4 text-4xl underline">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-orange-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            ref={passRef}
            className="outline-none w-full py-1 px-2"
            readOnly
          />
          <button
            className="bg-blue-600 outline-none text-white px-2 py-2 shrink-0"
            onClick={copyText}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 mt-6">
          <input
            type="range"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            min={10}
            max={51}
            className="cursor-pointer"
          />
          <label htmlFor="">Length:{length}</label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
              id="numberInput"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              id="characterInput"
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
