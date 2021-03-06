import { Container, Row, Col } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import AddAllowance from '../components/AddAllowance';

const AddAllowancePage = () => {
  return(
    <div>
      <div >
        <Container fluid>
          <Row className="color-nav">
            <Col></Col>
            <Col className="col-6">
              <PageNav home={"fa fa-home fa-2x circle-icon"}
              budget={"material-icons md-48 circle-icon"}
              leaderboard={"fa fa-trophy fa-2x circle-icon-selected"}/>
            </Col>
            <Col>
              <LogOutButton />
            </Col>
          </Row>
        </Container>
      </div>
      <AddAllowance />
    </div>
  )
}

export default AddAllowancePage;