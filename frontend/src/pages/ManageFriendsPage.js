import { Container, Row, Col } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import FriendSearchTable from '../components/FriendSearchTable';

const ManageFriendsPage = () => {
  return (
    <div>
      <div className="color-nav">
        <Container fluid>
          <Row>
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
      <FriendSearchTable />
    </div>
  )
}

export default ManageFriendsPage;
