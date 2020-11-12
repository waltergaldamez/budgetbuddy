import React from 'react';

import FriendsPageHeader from '../components/FriendsPageHeader';
import FriendSearchBar from '../components/FriendSearchBar';
import LoggedInName from '../components/LoggedInName';

import { Container, Row, Col } from 'react-bootstrap';
//import FindUser from '../components/FindUser';
//import AddFriend from '../components/AddFriend';

const FriendsPage = () =>
{
    return(
      <Container fluid>
        <Row>
          <Col>
            <FriendsPageHeader />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <FriendSearchBar />
          </Col>
          <Col>
            <button className="btn btn-lg btn-block btn-yellow" onClick={() => window.href.location='/friends'}>
              <span class="material-icons">
                group
              </span>
              <div className="text-btn"> <b>Manage Friends</b></div>
            </button>
          </Col>
        </Row>
      </Container>
    );
};

export default FriendsPage;
