import React from 'react';
import { Button } from 'react-bootstrap';

const EditProfile = () => {
  return (
    <Button variant="warning edit-btn-yellow" type="submit">
      <span className="material-icons md-34">
        person
      </span>
      <b><div className="edit-profile-text">
        Edit Profile
      </div></b>
    </Button>
  )
}

export default EditProfile;
