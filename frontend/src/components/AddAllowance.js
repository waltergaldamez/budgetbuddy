import React from 'react';
import { buildPath } from '../functions/buildPath';
import { Button, Modal } from 'react-bootstrap';
import { RangeSlider } from 'react-bootstrap-range-slider';

export default class AddAllowance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rerender: false
        }
      }

  componentDidMount() {
      var obj = {email: localStorage.getItem("email")};
      var js = JSON.stringify(obj);
      fetch(buildPath('api/getAllowance'),
        {method:'POST', body: js, headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(
            (result) => {
                this.setState({
                    allowance: result.allowance,
                    message: "",
                    rerender: false
                })
            }
        )
  }
render () {
  var money = 0;
  var { message, allowance } = this.state;
  var current = allowance;


  const addAllowance = async event => {
    event.preventDefault();
          var userEmail = localStorage.getItem("email");
          var obj = {email:userEmail,funds: money.value};
          var js = JSON.stringify(obj);

          try
          {
              // Call to API

              const response = await fetch(buildPath('api/addAllowance'),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

              // Parsing response
              var txt = await response.text();
              var res = JSON.parse(txt);

              if( res.error.length > 0 )
              {
                  alert( "API Error:" + res.error );
              }
              else
              {
                  window.location.href = "/add-allowance"
              }
          }
          catch(e)
          {
              
          }
  };

    return (
      <Modal show={true} className="budget-card-display-modal">
        <h2>{parseInt(money) + allowance}</h2>
        <label><h3>Budget Name</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => money = c} defaultValue={0}></input><br/>


        <Button className="modal-success" variant="success" onClick={addAllowance} >
          <i class="fa fa-plus fa-2x"></i>
          <span className="add"> Add Funds</span>
        </Button>
        <Button className="modal-success2" variant="danger" onClick={() => window.location.href='/budget'}>
        <i class="fa fa-window-close fa-2x"></i>
          <span className="add"> Cancel</span>
        </Button>
      </Modal>
    ) }
}
