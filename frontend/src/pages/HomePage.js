import React from 'react';

import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import LoggedInName from '../components/LoggedInName';
import EditProfile from '../components/EditProfile';
import ApexChart from '../components/ApexChart';

import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () =>
{
    return(
      <Container fluid>
      <div class="color-nav">
        <Row>
          <Col></Col>
          <Col className="col-6">
            <PageNav home={"fa fa-home fa-2x circle-icon-selected"}
            budget={"material-icons md-50 circle-icon"}
            leaderboard={"fa fa-trophy fa-2x circle-icon"}/>
          </Col>
          <Col>
            <LogOutButton />
          </Col>
        </Row>
      </div>

        <Row>
          <Col>
            <EditProfile />
          </Col>
          <Col>
            <LoggedInName />
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>
            <div className="budget-breakdown grow">
              <h2>Budget Breakdown</h2>
              <br/>
              <div className="budget-graphics">
                <ApexChart />
              </div>
              <h4 className="num-budgets">Current Budgets:</h4>
            </div>
          </Col>
          <Col>
            <div className="budget-breakdown">
              <h2>Progress Breakdown</h2>
              <br/>
              <div className="budget-graphics">
              </div>
              <h4 className="num-budgets">Average daily progress:</h4>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default HomePage;
