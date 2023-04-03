import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import defaultAvatar from '../assets/images/avatars/default.png';
export default function UserInfor({ displayName, email, images }) {
    console.log(displayName, email, images);
  return !displayName || !email ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${displayName}`} className="flex items-center">
      <div className="flex items-center w-1/4">
        <img
          className="rounded-full w-12 h-12 flex border-2"
          // src={`/images/avatars/${displayName}.jpg`}
          src={
            // images.length > 0 ? images[0] : 
            defaultAvatar
          }
          alt=""
        />
      </div>
      <div className="w-3/4">
        <p className="font-bold text-sm">{displayName}</p>
        {/* <p className="text-sm">{email}</p> */}
      </div>
    </Link>
  );
}

UserInfor.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  images: PropTypes.string
};
