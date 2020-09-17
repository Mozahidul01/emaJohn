import React, { useContext, useState } from 'react';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../utilities/firebase.config';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);

function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: '',
      error: '',
      success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleChange = (event) => {
    let isFieldValid;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length >=6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;      
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        user.email.value = '';
        user.password.value = '';
      })
      .catch(error => {
        const newUserInfo = {...user};
        console.log ('error.code');
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
      })
      .catch( error => {
        const newUserInfo = {...user};
        console.log ('error.code');
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      })
    };

    event.preventDefault();
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const FbProvider = new firebase.auth.FacebookAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(FbProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  const handleTwitterSignIn = () => {
    firebase.auth().signInWithPopup(twitterProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
    .catch(error => {
      console.log ('error.code');
      console.log ('error.message');
      console.log ('error.email');
      console.log ('error.credential');
    })
  }

  return (
    
    <div className="login-area">
      <Container className="login">

        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="email-login">
              <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
              <label htmlFor="newUser">New User Sign up</label>
              <form action="" method="get" onSubmit={handleSubmit}>
                {newUser && <input name="name" className="user-name" type="text" onBlur={handleChange} placeholder="Your name"/>}
                <br/>
                <input onBlur={handleChange} className="email" type="email" name="email" placeholder="Your Email" required/>
                <br/>
                <input onBlur={handleChange} className="password" type="password" name="password" placeholder="Your Password" required/>
                <Row>
                  <Col sm={8} className="forgot-password">Forgot Password?</Col>
                </Row>
                <Row>
                  <Col sm={6}><input className="login-btn" type="submit" value="Log In"/></Col>
                  <Col sm={6} className="remember">Remember Me</Col>
                </Row>
              </form>

                <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>log In Successful</p>}

            </div>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="google-login">
            {
              user.isSignedIn ? <button className="google-btn" onClick={handleSignOut}>Sign Out</button> 
              : <button className="google-btn" onClick={handleGoogleSignIn}><span className="google-icon"><FontAwesomeIcon icon={faGoogle}/></span> Sign In With Google</button>
            }

            {
              user.isSignedIn && 
              <div>
                <h2>Welcome, {user.name}</h2>
                <img src={user.photo} alt=""></img>
              </div>
            }
          </div>
        </Col>
        </Row>

        <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="fb-login">
            {
              user.isSignedIn ? <button className="fb-btn" onClick={handleSignOut}>Sign Out</button> 
              : <button className="fb-btn" onClick={handleFbSignIn}><span className="fb-icon"><FontAwesomeIcon icon={faFacebookF}/></span> Sign In With Facebook</button>
            }
          </div>
        </Col>
        </Row>

        <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="twitter-login">
            {
              user.isSignedIn ? <button className="twitter-btn" onClick={handleSignOut}>Sign Out</button> 
              : <button className="twitter-btn" onClick={handleTwitterSignIn}><span className="twitter-icon"><FontAwesomeIcon icon={faTwitter}/></span> Sign In With Twitter</button>
            }
          </div>
        </Col>
        </Row>
      
      </Container>

    </div>
  );
}

export default Login;
