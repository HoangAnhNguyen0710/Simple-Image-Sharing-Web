import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseApp } from '../config/firebase' ;
// import "firebase/auth";
import * as ROUTES from '../constants/Routes';
import useAuthListener from '../hooks/use_auth_listener';

export default function Login() {
  const navigate = useNavigate();
//   const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const { user } = useAuthListener();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebaseApp.auth().signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Simple Image Sharing';
    if(user) {
      navigate(ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <div className="container flex flex-col lg:flex-row mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full py-6 uppercase font-medium">
            Simple Image Sharing
          </h1>

          {error && (
            <p data-testid="error" className="mb-4 text-xs text-red-primary">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} method="POST" data-testid="login">
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
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium" data-testid="sign-up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
