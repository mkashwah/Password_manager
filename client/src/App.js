import './App.css';
import {useState, useEffect} from "react"
import Axios from 'axios';





function App() {

  const [password, setPassword] = useState('');
  const [site, setSite] = useState('');
  const[passwordList, setPasswordList] = useState([]);

  const addPassword =()=>{
      Axios.post('http://localhost:3001/addpassword', {password: password,
    site: site})
  };

  useEffect(()=>{
    Axios.get('http://localhost:3001/showpasswords').then((response) => {
    // console.log(response.data);
    setPasswordList(response.data)

    });
    
  
  }, [])

  const decryptPassword = (encryption) =>{
    // console.log('before axios.post')
    Axios.post('http://localhost:3001/decryptpassword', {password: encryption.password, 
    iv: encryption.iv}).then((response) => {
      // console.log('from decryptPassword')
      console.log(response.data)
    })
  }


  return (
    <div className="App">
      <div className = 'AddingPassword'>
        <input type="text" placeholder="Ex. Password" onChange={(event) =>{setPassword(event.target.value)}}></input>
        <input type="text" placeholder="site name" onChange={(event) =>{setSite(event.target.value)}}></input>
        <button onClick={addPassword}>Add password</button>
      </div>

      <div className="Passwords">
        {passwordList.map((val, key) =>{
          return <div className="password" onClick={() => {decryptPassword({password: val.password, iv: val.iv})}}
          key={key}>
            <h3>{val.title}</h3>
          </div>
        }
        )}
      </div>
    </div>
  );
}

export default App;
