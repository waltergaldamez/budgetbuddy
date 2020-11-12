import React from 'react';

const FriendsTable = () => {
  return (
    <div class="lower">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col" class="yellow">Friends</th>
              <th scope="col" class="pink">Find New Friends</th>
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
  )
}

export default FriendsTable;
