import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import LoggedInName from '../components/LoggedInName';
import Budgets from '../components/Budgets';
import BudgetDisplays from '../components/BudgetDisplays';

const BudgetsPage = () =>
{
    return(
      <Container fluid>
        <div className="color-nav">
          <Row>
            <Col></Col>
            <Col className="col-6">
              <PageNav home={"fa fa-home fa-2x circle-icon"}
              budget={"material-icons md-50 circle-icon-selected"}
              leaderboard={"fa fa-trophy fa-2x circle-icon"}/>
            </Col>
            <Col>
              <LogOutButton />
            </Col>
          </Row>
        </div>

        <Row>
          <Col></Col>
          <Col className="col-6">
            <Budgets />
          </Col>
          <Col>
          </Col>
        </Row>

        <Row>
          <Col>
            <BudgetDisplays />
          </Col>
        </Row>

      </Container>
    );
}

export default BudgetsPage;
