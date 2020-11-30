import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

const Budgets = () => {
    return(
      <Button variant="btn btn-yellow grow" type="submit" onClick={ () => window.location.href="/budget-manager"} >
        <span className="material-icons md-34">
          add_task
        </span>
        <b><div className="button-text"> Add a New Budget</div></b>
      </Button>
    );
}

export default Budgets;
