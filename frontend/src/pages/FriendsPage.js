import React from 'react';

import PageNav from '../components/PageNav';
import FriendSearchBar from '../components/FriendSearchBar';
import LoggedInName from '../components/LoggedInName';
import CurrentRank from '../components/CurrentRank';
import Avatar from '../components/Avatar';
import FriendsTable from '../components/FriendsTable';
import LogOutButton from '../components/LogOutButton';

import { Container, Row, Col } from 'react-bootstrap';
//import FindUser from '../components/FindUser';
//import AddFriend from '../components/AddFriend';

const FriendsPage = () =>
{
    return(
      <div>
        <Container fluid>
        <div className="color-nav">
          <Row>
            <Col></Col>
            <Col className="col-6">
              <PageNav home={"fa fa-home fa-2x circle-icon"}
              budget={"material-icons md-50 circle-icon"}
              leaderboard={"fa fa-trophy fa-2x circle-icon-selected"}/>
            </Col>
            <Col>
              <LogOutButton />
            </Col>
          </Row>
        </div>
          <Row>
            <Col>
              <Avatar />
            </Col>
            <Col>
              <CurrentRank />
            </Col>
            <Col>
              <button className="btn btn-lg btn-block btn-yellow" onClick={() => window.location.href='/manage-friends'}>
                <span class="material-icons">
                  group
                </span>
                <div className="text-btn"> <b>Manage Friends</b></div>
              </button>
            </Col>
          </Row>

        </Container>
      <FriendsTable />
    </div>
    );
};

export default FriendsPage;
