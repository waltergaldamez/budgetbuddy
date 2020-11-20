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
          alert(e.toString());
          return;
      }
  };

  const doAddFriend = async event => {
    event.preventDefault();
    alert(event.target.getAttribute("data-id"));
    if (event.target.getAttribute("data-id") === null || event.target.getAttribute("data-id") === undefined) {
      alert('something went wrong');
      return;
    }

    var obj = {userID: localStorage.getItem('userID'), friendID: event.target.getAttribute("data-id")};
    var js = JSON.stringify(obj);
   try
    {
        // API call
        const response = await fetch(buildPath('api/addFriend'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        // Parse JSON response
        var res = JSON.parse(await response.text());


        if( res.error === '')
          this.setState({results: results});
    }
    catch(e)
    {
        alert(e.toString() + "yess");
        return;
    }
  }

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
              <td className="first grow"><h4>{ friend.username }</h4></td>
              { i >= results.length ? <td className="second grow"></td> : <td className="second grow"><h4>{results[i].username}</h4><div onClick={doAddFriend} className="add-icon grow" data-id={results[i].id}><i class="fa fa-user-plus fa-2x user-add"></i></div></td> }

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
            <td className="first grow"><h4>{  typeof friends === 'undefined' || i >= friends.length ? '' : friends[i].username }</h4></td>
            <td className="second grow">
              <h4 className="user-add">{ result.username }</h4>
              <div className="add-icon grow" onClick={doAddFriend} data-id={result.id}><i class="fa fa-user-plus fa-2x user-add"></i></div>
            </td>
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
