import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import BudgetPageHeader from '../components/BudgetPageHeader';
import LoggedInName from '../components/LoggedInName';
import Budgets from '../components/Budgets';

const BudgetsPage = () =>
{
    return(
      <Container fluid>
        <Row>
          <Col>
            <BudgetPageHeader />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Budgets />
          </Col>
          <Col>
            <LoggedInName />
          </Col>
        </Row>
      </Container>
    );
}

export default BudgetsPage;
