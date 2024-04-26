import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [numBool, setNumBool] = useState(false);
  const [symBool, setSymBool] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let sym = "!@#$%^&*_";

    if (numBool) str += num;
    if (symBool) str += sym;

    for (let i = 1; i <= passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [passLength, numBool, symBool]);

  const passRef = useRef()

  const copyPass = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }, [password]);

  useEffect(()=>{
    passGenerator()
  }, [passLength, numBool, symBool, passGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-20 bg-gray-500">
        <h1 className="text-white text-center my-2">Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Password"
            className="outline-none w-full py-2 px-3"
            value={password}
            ref={passRef}
            readOnly
          />
          <button
           className="bg-blue-400 px-2 shrink-0"
           onClick={copyPass}
          >Copy!</button>
        </div>
        <div className="flex">
          <div className="flex text-sm gap-x-2 mx-2">
            <input
              type="range"
              value={passLength}
              min={6}
              max={30}
              id="inp"
              className="cursor-pointer"
              onChange={(e) => {
                setPassLength(e.target.value);
              }}
            />

            <label htmlFor="inp" className="text-white">
              Length: {passLength}
            </label>
          </div>
          <div className="flex gap-x-1 mx-2 text-sm">
            <input
              type="checkbox"
              id="numCheck"
              defaultChecked={setNumBool}
              onChange={() => {
                setNumBool((prev) => !prev);
              }}
            />

            <label htmlFor="numCheck" className="text-white">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-1 text-sm">
            <input
              type="checkbox"
              id="symCheck"
              defaultChecked={setSymBool}
              onChange={() => {
                setSymBool((prev) => !prev);
              }}
            />

            <label htmlFor="symCheck" className="text-white">
              Symbols
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
