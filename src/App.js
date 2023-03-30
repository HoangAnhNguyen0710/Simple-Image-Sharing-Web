import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/Routes';


const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login/>} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp/>} />
            <Route path={ROUTES.PROFILE} element={<Profile/>} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard/>} />
            {/* <Route component={NotFound} /> */}
          </Routes>
        </Suspense>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
