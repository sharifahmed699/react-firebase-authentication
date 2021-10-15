import {getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile    } from "firebase/auth";
import firebaseInitiatizaAuth from './Firebase/firebase.init';
import { useState } from 'react';

firebaseInitiatizaAuth()
const provider = new GoogleAuthProvider();
const auth = getAuth();


function App() {
  const [user, setUser] = useState({})
  const [email, SetEmail] = useState('')
  const [password, Setpassword]= useState('')
  const [error, setError] =useState('')
  const [isLogge, setIsLogge]= useState(false) 
  const [name,setName]= useState('')        

  const handleGoogleSignIn = ()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const { displayName, photoURL, email } = result.user;
      console.log(result.user);
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      }).catch((error) => {
        console.log(error);
      });
  }
  const handleRegister =(e)=>{
    e.preventDefault()
      if(password.length < 6){
        setError("Password should be at least 6 characters")
        return
      }
      if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
        setError('Password Must contain 2 upper case');
        return;
      }
      if (!/(?=.*[!@#$&*])/.test(password)) {
        setError('Password Must one special case letter');
        return;
      }
      isLogge ? LoginUser(email,password) : registerNewUser(email,password)
    // console.log(email,password)
  }
  const LoginUser = (email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setError('')
      console.log(user)
    })
    .catch(error =>{
      setError(error.message)
    })
  }
  const registerNewUser = (email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      setError('')
      verifyEmail()
      console.log(user)
      setUserName()
      
    })
    .catch(error =>{
      setError(error.message)
    })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => { })
  }
  const handleEmail = e=>{
   SetEmail(e.target.value)
  }
  const handlePassword = e=>{
    Setpassword(e.target.value)
  }
  const toggaleCheckBox = e =>{
    setIsLogge(e.target.checked)
  }

  const verifyEmail = ()=>{
    sendEmailVerification(auth.currentUser)
    .then(result => {
      console.log(result);
     })
  }
  const resetPassword = ()=>{
    sendPasswordResetEmail(auth, email)
    .then(result => { })
    }
    const handleName = (e)=>{
      setName(e.target.value);
    }
  return (
    <div className=" mx-auto w-50">

<form onSubmit={handleRegister}>
      <h2 className="text-center py-2">Please {isLogge ? "Login" : "Register"}</h2>
      {
        !isLogge &&  <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Your Name</label>
        <input type="text" onBlur={handleName} className="form-control"  required/>
       
        </div>
      }
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" onBlur={handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" onBlur={handlePassword} className="form-control" id="exampleInputPassword1" required/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" onChange={toggaleCheckBox} className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Already Registered ?</label>
        <button className="btn " onClick={resetPassword}>ReSet Password</button>
      </div>
    
      <div className="mb-3 text-danger">
              {error}
      </div>
      <button type="submit" className="btn btn-primary">{isLogge ? "Login" : "Register"}</button>
    </form>
      <br /><br />
      <div>--------OR--------</div>
      <br /><br />
      <button onClick={handleGoogleSignIn}>Google SignIn</button>
      <br />
     
    </div>
  );
}

export default App;
