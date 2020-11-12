import { Container, Row, Col } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FriendsPageHeader from '../components/FriendsPageHeader';

const ManageFriendsPage = () => {
  return (
    <div>
      <div className="upper">
        <Container fluid>
          <Row>
            <Col>
              <FriendsPageHeader />
            </Col>
          </Row>
        </Container>
      </div>
      <div class="lower">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col" class="yellow">My Friends</th>
              <th scope="col" class="pink-header">Find New Friends <input class="friends-search"></input> <i class="fa fa-search"></i></th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
            </tr>
          </tbody>
          </table>
        </div>
    </div>
  )
}
