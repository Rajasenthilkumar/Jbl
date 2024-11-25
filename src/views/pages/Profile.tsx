//import GuestProfileFeature from 'views/features/guestProfile/GuestProfileFeature';
import ProfileFeature from 'views/features/profile/ProfileFeature';

const Profile = () => {
  return (
    <>
      <div className="profile-content">
        <ProfileFeature />
      </div>
      {/*
      sprint 3 guest profile feature 
      <div className="profile-content guest-profile-content bg-white">
        <GuestProfileFeature />
      </div> */}
    </>
  );
};

export default Profile;
