import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';

function Profile() {
  const { user } = useContext(UserContext);

  console.log('user', user);

  return (
    <div>
      <p>Your Profile</p>
    </div>
  );
}

export default Profile;
