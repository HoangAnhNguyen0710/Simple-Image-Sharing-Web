import { useSelector } from 'react-redux';
import UserInfor from '../components/UserInfor';

export default function Sidebar() {
  const user = useSelector((state)=> state.user.value);
  return (
    <div className="block ">
        {user ? 
        <UserInfor displayName={user.displayName} email={user.email} image={user.images}/>
        : <></>} 
      
    </div>
  );
}
