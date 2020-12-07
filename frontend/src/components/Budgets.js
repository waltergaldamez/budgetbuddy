import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

const Budgets = () => {
    return(
      <div>
        <Button variant="" type="submit" onClick={ () => window.location.href="/budget-manager"} className="budget-btn">
          <span className="material-icons md-48">
            add_task
          </span>
          <b><div className="button-txt"> Add a New Budget</div></b>
        </Button>
        <Button variant="" type="submit" onClick={ () => window.location.href="/add-allowance"} className="budget-btn">
        <span className="material-icons md-48">
          add_task
        </span>
        <b><div className="button-txt"> Add Allowance</div></b>
      </Button>
    </div>
    );
}

export default Budgets;
