import React from 'react';
import { Button } from 'react-bootstrap';

const EditProfile = () => {
  return (
    <Button variant="btn btn-yellow grow" type="submit" onClick={() => window.location.href = "/edit-account"}>
      <span className="material-icons md-34">
        person
      </span>
      <b><div className="button-text"> Edit Profile</div></b>
    </Button>
  )
}

export default EditProfile;
