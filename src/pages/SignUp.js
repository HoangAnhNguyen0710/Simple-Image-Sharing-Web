import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseApp } from '../config/firebase' ;
// import "firebase/auth";
import * as ROUTES from '../constants/Routes';
import useAuthListener from '../hooks/use_auth_listener';
// import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const navigate = useNavigate();
  // const { firebase } = useContext(FirebaseContext); 
  const { user } = useAuthListener();
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    // const usernameExists = await doesUsernameExist(username);
    // if (!usernameExists.length) {
      try {
        const createdUserResult = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        // firebase user collection (create a document)
        await firebaseApp
          .firestore()
          .collection('users')
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            emailAddress: emailAddress.toLowerCase(),
            images: [],
            // following: [],
            dateCreated: Date.now()
          });

        return navigate.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    // } 
    // else {
    //   setUsername('');
    //   setFullName('');
    //   setEmailAddress('');
    //   setPassword('');
    //   setError('That username is already taken, please try another.');
    // }
  };

  useEffect(() => {
    document.title = 'Sign Up - Simple Image Sharing';
    if(user) {
      navigate(ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      {/* <div className="hidden lg:flex w-full lg:w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
          className="object-scale-down"
        />
      </div> */}
      <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full py-6 uppercase font-medium">
            {/* <img src="/images/logo.png" alt="Instagram" className="mt-2 mb-4" /> */}
            Simple Image Sharing
          </h1>

          {error && (
            <p data-testid="error" className="mb-4 text-xs text-red-300">
              {error}
            </p>
          )}

          <form onSubmit={handleSignUp} method="POST" data-testid="sign-up">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium" data-testid="login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
