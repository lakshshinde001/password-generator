import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numAllowed) str += '1234567890';
    if(charAllowed) str += '!@#$%^&*()_+';

    for(let i=0; i<length; i++){
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  },[length, numAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  const passwordRef = useRef(null);


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          
        />
        <button onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div
       className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=''
            id=''
          />
           <label htmlFor='length' > 
            length:{length}
           </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id = ''
            defaultChecked = {numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='number'>
            Numbers 
          </label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id = ''
            defaultChecked = {charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor='charInput'>
            characters
          </label>

        </div>

      </div>
      
    </div>
  )
}

export default App
