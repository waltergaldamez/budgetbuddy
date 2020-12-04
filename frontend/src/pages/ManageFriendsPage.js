import { Container, Row, Col } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import TableFriendMaker from '../components/TableFriendMaker';
import CurrentRank from '../components/CurrentRank';
import Avatar from '../components/Avatar';

const ManageFriendsPage = () => {
  return (
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

          <Row className="blue">
            {/* <Col className="blue">
              <Avatar />
            </Col>
            <Col>
              <CurrentRank />
            </Col> */}
            <Col>
              <button className="btn btn-yellow-friends grow" onClick={() => window.location.href='/friends'}>
                <span class="material-icons md-34">
                  group
                </span>
                <div className="text-btn"> <b>Back</b></div>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <TableFriendMaker/>
    </div>
  )
}

export default ManageFriendsPage;
