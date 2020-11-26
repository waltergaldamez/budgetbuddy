import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Recover from '../components/Recover';


const RecoverPasswordPage = () => {
  return (
    <div className="outer">
        <div className="inner-recover">
          <Recover />
        </div>
      </div>
  )
}

export default RecoverPasswordPage;
