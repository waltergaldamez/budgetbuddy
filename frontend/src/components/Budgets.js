import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

const Budgets = () => {
    return(
      <Button variant="warning"type="submit" className="budget-btn-yellow" onClick={ () => window.location.href="/budget-manager"} >
        <b><span className="material-icons md-48">
          add_task
        </span>
        <div className="logout black-text"> Add a New Budget</div></b>
      </Button>
    );
}

export default Budgets;
