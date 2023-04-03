/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import { useDispatch } from 'react-redux';
import { setUser } from './context/user';
import useAuthListener from './hooks/use_auth_listener';
import PageHeader from './layouts/header';
import { PacmanLoader } from 'react-spinners';


const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const { user } = useAuthListener();
  const dispatch = useDispatch();
  useEffect(()=> {
    console.log(user);
    dispatch(setUser(user));
  },[user]);
  return (
    <Router>
    <div className="App">
      <PageHeader/>
      <div className='py-12'>

      </div>
        <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><PacmanLoader color='#36d7b7' speedMultiplier={2}/></div>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login/>} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp/>} />
            <Route path={ROUTES.PROFILE} element={<Profile/>} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard/>} />
            {/* <Route component={NotFound} /> */}
          </Routes>
        </Suspense>
    </div>
    </Router>
  );
}

export default App;
