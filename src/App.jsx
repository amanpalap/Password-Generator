import { useState, useCallback, useEffect, useref, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [charallowed, setCharallowed] = useState(false)
  const [numallowed, setNumallowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(charallowed) str+="~!@#$%^&*()_+></?"
    if(numallowed) str+="0123456789"

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length, charallowed, numallowed, setPassword])

  const ref = useRef(null)

  const copy = ()=>{
    ref.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{
    passwordGenerator()
  },[length, charallowed, numallowed, setPassword])

  return (
    <div className='w-full max-w-3xl bg-slate-700 rounded-lg mx-auto p-4 text-center text-2xl text-orange-500 mt-20'>
      <h1 className='text-3xl'>Password Generator</h1>
      <div className='flex mx-4 my-4 rounded-xl overflow-hidden'>
          <input 
          type="text"
          placeholder='Password'
          value={password}
          readOnly
          className='w-full outline-none px-4'
          ref={ref}
          />
          <button 
          onClick={copy}
          className='bg-blue-700 px-4 py-2 shrink-0 hover:text-slate-400'>
            Copy
          </button>
      </div>
      <div className='flex overflow-hidden mx-4 py-2 justify-evenly text-xl'>
        <div>
        <input 
        type='range'
        min={8}
        max={20}
        value={length}
        className=''
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label className='mx-2'>length: {length}</label>
        </div>


        <div>
          <input 
          type="checkbox" 
          defaultChecked={numallowed}
          id='Number'
          onChange={()=>{
            setNumallowed((prev)=>!prev)
          }}
          />
          <label className='mx-2' htmlFor="Number">Number</label>
        </div>

        <div>
          <input 
          type="checkbox" 
          defaultChecked={charallowed}
          id='Character'
          onChange={()=>{
            setCharallowed((prev)=>!prev)
          }}
          />
          <label className='mx-2' htmlFor="Character">Character</label>
        </div>

      </div>  
    </div>
  )
}

export default App
