import React from 'react';

import FriendsPageHeader from '../components/FriendsPageHeader';
import FriendSearchBar from '../components/FriendSearchBar';
import LoggedInName from '../components/LoggedInName';
import CurrentRank from '../components/CurrentRank';
import Avatar from '../components/Avatar';
import FriendsTable from '../components/FriendsTable';

import { Container, Row, Col } from 'react-bootstrap';
//import FindUser from '../components/FindUser';
//import AddFriend from '../components/AddFriend';

const FriendsPage = () =>
{
    return(
      <div>
      <div className="upper">
        <Container fluid>
          <Row>
            <Col>
              <FriendsPageHeader />
            </Col>
          </Row>
          <Row>
            <Col>
              <Avatar />
            </Col>
            <Col>
              <CurrentRank />
            </Col>
            <Col>
              <button className="btn btn-lg btn-block btn-yellow" onClick={() => window.href.location='/manage-friends'}>
                <span class="material-icons">
                  group
                </span>
                <div className="text-btn"> <b>Manage Friends</b></div>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <FriendsTable />
    </div>
    );
};

export default FriendsPage;
