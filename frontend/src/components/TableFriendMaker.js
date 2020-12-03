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
    var objFriend = {userID:localStorage.getItem("userID")};
    var jsFriends = JSON.stringify(objFriend);
    fetch(buildPath('api/showFriends'),
        {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              friends: result.friendsArr,
            })
          }
        )
  }

render() {
  const {friends, results} = this.state;
  var search = "";

  const doSearch = async event =>
  {
    event.preventDefault();
    var obj = {searchUsername: search.value, username: localStorage.getItem("userName")};
    var js = JSON.stringify(obj);

    try
    {
        // API call
        const response = await fetch(buildPath('api/searchUsers'),
        {method:'POST', body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

        // Parse JSON response
        var res = JSON.parse(await response.text());


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
    if (event.currentTarget.dataset.id === null || event.currentTarget.dataset.id === undefined) {
      alert('id is null');
      return;
    }

    var obj = {userID: localStorage.getItem('userID'), friendID: event.currentTarget.dataset.id};
    var js = JSON.stringify(obj);
   try
    {
        // API call
        const response = await fetch(buildPath('api/addFriend'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

        // Parse JSON response
        var res = JSON.parse(await response.text());
        alert("friend added")

        if( res.error === '')
          this.setState({results: results});
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }
  }

  const removeFriend = async event => {
    event.preventDefault();
    if (event.currentTarget.dataset.id === null || event.currentTarget.dataset.id === undefined) {
      alert('id is null');
      return;
    }

    var obj = {userID: localStorage.getItem('userID'), friendID: event.currentTarget.dataset.id};
    var js = JSON.stringify(obj);
   try
    {
        // API call
        const response = await fetch(buildPath('api/removeFriend'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

        // Parse JSON response
        var res = JSON.parse(await response.text());
        alert("friend deleted");
    }
    catch(e)
    {
        alert(e.toString() + "yess");
        return;
    }
  }


  if (typeof friends !== 'undefined' && friends.length >= results.length) {
    return (
      <table class="table table-light">
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
              <td className="first grow"><h4>{ friend.username }</h4><Button type="danger" className="remove-button" data-id={friend.id} onClick={removeFriend}> <i class="fa fa-user-times fa-md"></i>  </Button></td>
              { i >= results.length ? <td className="second grow"></td> : <td className="second grow"><h4>{results[i].username}</h4><Button onClick={doAddFriend} type="submit" data-key={i} className="add-icon grow" data-id={results[i].id}><i class="fa fa-user-plus fa-2x user-add"></i></Button></td> }

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
            <td className="first grow">{  typeof friends === 'undefined' || i >= friends.length ? '' : <div><h4>{friends[i].username}</h4> <Button type="danger" data-id={friends[i].id} onClick={removeFriend} className="remove-button"><i class="fa fa-user-times fa-md"></i> </Button></div>}</td>
            <td className="second grow">
              <h4 className="user-add">{ result.username }</h4>
              <Button className="add-icon grow" onClick={doAddFriend} data-key={i} data-id={result.id}><i class="fa fa-user-plus fa-2x user-add"></i></Button>
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

export default TableFriendMaker;
