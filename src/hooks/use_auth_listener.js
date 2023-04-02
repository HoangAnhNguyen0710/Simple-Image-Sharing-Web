import { useState, useEffect } from 'react';
import { firebaseApp } from '../config/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('image_sharing_user')));

  useEffect(() => {
    const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // we have a user...therefore we can store the user in localstorage
        localStorage.setItem('image_sharing_user', JSON.stringify(authUser.providerData[0]));
        setUser(authUser.providerData[0]);
      } else {
        // we don't have an authUser, therefore clear the localstorage
        localStorage.removeItem('image_sharing_user');
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user }  ;
}
