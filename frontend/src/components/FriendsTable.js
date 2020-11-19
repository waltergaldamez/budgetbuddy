import React from 'react';

const FriendsTable = () => {
  return (
    <div class="lower">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="yellow">Friends</th>
              <th scope="col" class="pink-header">Global</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td className="first">1</td>
              <td className="second">Mark</td>
            </tr>
            <tr>
              <td className="first">2</td>
              <td className="second">Jacob</td>
            </tr>
            <tr>
              <td className="first">3</td>
              <td className="second">Larry</td>
            </tr>
          </tbody>
          </table>
      </div>
  )
}

export default FriendsTable;
