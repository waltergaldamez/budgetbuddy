import React from 'react';
import { buildPath } from '../functions/buildPath';
import { Button } from 'react-bootstrap';

class TableFriendMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      results: []
    }
  }

  componentDidMount() {
    localStorage.setItem("userID", "5fa37752a361aa0017e7ce6c");
    var objFriend = {userID:localStorage.getItem("userID")};
    var jsFriends = JSON.stringify(objFriend);
    fetch(buildPath('api/showFriends'),
        {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              friends: result.friendsArr
            })
          }
        )
  }
render() {
  const {friends, results} = this.state;
  var search = "";

  var objFriend = {userID:localStorage.getItem("userID")};
  var jsFriends = JSON.stringify(objFriend);


  const doSearch = async event =>
  {
      event.preventDefault();

      var obj = {searchUsername:search.value};
      var js = JSON.stringify(obj);
      try
      {
          // API call
          const response = await fetch(buildPath('api/searchUsers'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // Parse JSON response
          var res = JSON.parse(await response.text());


          if( res.error === '')
            this.setState({results: res.results});
      }
      catch(e)
      {
          alert(e.toString() + "yess");
          return;
      }
  };
  if (typeof friends !== 'undefined' && friends.length >= results.length) {
    return (
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col" class="yellow">My Friends</th>
            <th scope="col" class="pink-header">
              Find New Friends <input type="text" className="form-control friends-search"  ref={(c) => search = c}></input>
               <Button type="primary" className="friends-button"> <i class="fa fa-search fa-2x" onClick={doSearch}></i> </Button>
            </th>
          </tr>
        </thead>
        <tbody>
        {friends.map((friend, i) => {
          return (
            <tr>
              <td className="first">{ friend.username }</td>
              <td className="second">{ i >= this.props.results.length ? '' : results[i].username }</td>
            </tr>
          );
        })
      }
      </tbody>
        </table>

    );
  } else
    return (
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col" class="yellow">My Friends</th>
            <th scope="col" class="pink-header">
              Find New Friends <input type="text" className="form-control friends-search"  ref={(c) => search = c}></input>
               <Button type="primary" className="friends-button"> <i class="fa fa-search fa-2x" onClick={doSearch}></i> </Button>
            </th>
          </tr>
        </thead>
        <tbody>
        {results.map((result, i) => {
          return (
            <tr>
            <td className="first">{  typeof friends === 'undefined' || i >= friends.length ? '' : friends[i].username } </td>
            <td className="second">{ result.username }</td>
            </tr>
          );
        })
      }
      </tbody>
        </table>
    );
}
}




/*
const TableFriendMaker = ({ friends, results }) => {
  if (friends.length >= results.length) {
    return (
      <tbody>
      {friends.map((friend, i) => {
        return (
          <tr>
            <td className="first">{ friend.username }</td>
            <td className="second">{ i >= results.length ? '' : results[i].username }</td>
          </tr>
        );
      })
    }
    </tbody>
    );
  } else
    return (
      <tbody>
      {results.map((result, i) => {
        return (
          <tr>
          <td className="first">{  i >= friends.length ? '' : friends[i].username } }</td>
          <td className="second">{ result.username }</td>
          </tr>
        );
      })
    }
    </tbody>
    );
} */

export default TableFriendMaker;
