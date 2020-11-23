import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const ProgressBarHome = () => {
  return (
    <div>
    <br/>
    <ProgressBar variant="success" now={40} />
    <br/>
   <ProgressBar variant="info" now={20} />
   <br/>
   <ProgressBar variant="warning" now={60} />
   <br/>
   <ProgressBar variant="danger" now={80} />
   </div>
 );
}

export default ProgressBarHome;
