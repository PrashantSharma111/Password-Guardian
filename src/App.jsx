import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);

  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);

  const[password, setpassword] = useState("");

  // to take the reference of the password to copy
  const passwordRef = useRef(null);

  // Used for the memoisation , whenever there is change in the dependecies store then 
  // int cash {re-rendering}, here is the optimisation
  const generatepass = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberallow){
      str += "0123456789";
    }
    if(charallow) {
      str += "!@#$%^&*(){}"
    }

    for(let ind = 1; ind <= length; ind++) {
      let ch = Math.floor(Math.random()*str.length);
      pass += str.charAt(ch);
    }

    setpassword(pass);


  }, [length, numberallow, charallow, setpassword])

  const copypassword = useCallback(()=> {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password).then(()=> {
      alert("Password copied tp clipboard!");
    })
  }, [password])


  // Call the function again whenever there is change in something
  useEffect(()=>{
    generatepass();
  }, [length, numberallow, charallow, setpassword])

  return (
    <>

    <div className='container'>
      <div className='sub-container'>

      <h2 style={{textAlign:'center'}}>Password Generator</h2>

        <div className='row-first'>
          <input type="text" class="pass" placeholder='password' value={password} ref={passwordRef}/>
          <button class="copy" onClick={copypassword}>Copy</button>  
        </div>

        <div className='row-last'>
          <input 
          type="range" 
          min={6} 
          max={20} 
          value={length} 
          onChange={(e)=> setlength(e.target.value)}/>
          <label>Length: {length}</label>
          <pre></pre>
          
          <label>Number:</label>
          <input 
          type="checkbox" style={{marginTop:'9px'}}
          name="number" 
          id="check" 
          defaultValue={numberallow} 
          onChange={()=> {setnumberallow((prev)=> !prev)}}/>

          <label>Character:</label>
          <input 
          type="checkbox" style={{marginTop:'9px'}}
          name="number" 
          id="check" 
          defaultValue={charallow} 
          onChange={()=>setcharallow((prev)=>!prev)}/>
        </div>

      </div>
    </div>
      
    </>
  )
}

export default App
