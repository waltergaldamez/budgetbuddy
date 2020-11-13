import React from 'react';
import { Button } from 'react-bootstrap';

const LogOutButton = () => {
  return (
    <Button variant="danger" type="submit" className="pink">
      <span class="material-icons black-text">
        exit_to_app
      </span>
      <div class="logout black-text">Logout</div>
    </Button>
  );
}

export default LogOutButton;
