import React from 'react';
import { buildPath } from '../functions/buildPath';

export default class FriendsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      global: []
    }
  }

  componentDidMount() {
    var objFriend = {userID:localStorage.getItem("userID")};
    var jsFriends = JSON.stringify(objFriend);
    Promise.all([
      fetch(buildPath('api/get-top-10'),
      {method:'POST', headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}}),
      fetch(buildPath('api/showFriends'),
        {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
    ]).then(([res1, res2]) => {
         return Promise.all([res1.json(), res2.json()])
      }).then(([res1, res2]) => {
      this.setState({
        global: res1.userArr,
        friends: res2.friendsArr
      })
    })
  }

  render() {
    const { global, friends } = this.state;

    return (
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="yellow">Friends</th>
                <th scope="col" class="pink-header">Global</th>
              </tr>
            </thead>
            <tbody >
              {
                global.map((user, i) => {
                  return (
                    <tr>
                      <td className="first">
                        <h4>
                          { i >= friends.length ? '' : friends[i].username }
                        </h4>
                      </td>

                      <td className="second">
                        <h4>{ user.username }</h4>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
            </table>
    )
  }
}
