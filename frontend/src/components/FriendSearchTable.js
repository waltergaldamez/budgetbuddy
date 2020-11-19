import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { buildPath } from '../functions/buildPath';

const FriendSearchTable = () => {
  var search = "";
  const [searchResults, setResult] = useState([]);

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


          if( res.error !== '')
          {
          }
          else
          {
              setResult(res.results);
          }
      }
      catch(e)
      {
          alert(e.toString() + "yess");
          return;
      }
  };

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
      <tbody >

        <tr>
        {searchResults.map((result) => {
          return (
            <div>
            <td className="first">1</td>
            <td className="second">{ result }</td>
            </div>
          );
        })
      }
        </tr>
      </tbody>
      </table>
  )
}

export default FriendSearchTable;
