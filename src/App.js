
import './App.css';
import { getAuth, signInWithPopup, updateProfile, sendEmailVerification, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import initialieAuthentication from './firebaseConfig/firebase.initalize';
import { useState } from 'react';


initialieAuthentication();
const googleProvider = new GoogleAuthProvider();
function App() {

 const[name,setName]=useState('')
  const [email, seteEmail] = useState('')
  const [password, setePassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setLogin] = useState(false)




  // const handleGoogleSignIn=()=>{
  //       const auth=getAuth();
  //       signInWithPopup(auth,googleProvider)
  //       .then(result=>{
  //         const {displayName,email,photoURL}=result.user;
  //         const loggedInUser={
  //           name:displayName,
  //           email:email,
  //           photo:photoURL
  //         }
  //        setUser(loggedInUser);
  //       })

  //       .catch(error=>{
  //         console.log(error.message)
  //       })
  // }


  const handleNameChange=e=>{
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    seteEmail(e.target.value)
  }

  const handleRegistration = (e) => {
    e.preventDefault()
    const auth = getAuth();
    console.log(email, password)

    if (password.length < 6) {
      setError('Password Should Be minimum character')
    }

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password Should Be at least 2 Uppercase')
      return
    }
    isLogin ? processLogin(email, password) : createNewUser(email, password);

  }

  const processLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
      })

      .catch(error => {
        setError(error.message)
      })
  }


  const toggleLogIn = e => {
    setLogin(e.target.checked)
  }

  const handlePasswordChange = e => {
    setePassword(e.target.value)
  }


  const setUserName=()=>{
    const auth = getAuth();
            updateProfile(auth.currentUser,{displayName:name})
            .then(result=>{})
  }

  const createNewUser = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
        verifyEmail();
        setUserName();
      })

      .catch(error => {
        setError(error.message)
      })
  }


  const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }
  return (
    <div className="mx-5">

      <form onSubmit={handleRegistration}>
        <div className="row mb-3">
          <h3 className='text-primary'>Please {isLogin ? 'Login' : 'Register'}</h3>
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="htmlform-control" id="inputPassword3" />
          </div>
        </div>

     {!isLogin &&    <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Name</label>
          <input type="text" onBlur={handleNameChange } className="form-control" id="inputName" placeholder="Your Name" />
        </div>}

        <br/>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="htmlform-check">
              <input onChange={toggleLogIn} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3 text-danger">{error}</div>

        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'} </button>
      </form>
      <br />


    </div>
  );
}

export default App;
