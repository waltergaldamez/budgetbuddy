import React from 'react';
import { buildPath } from '../functions/buildPath';

const ManageBudgetTable = () => {
    return (
      <div class="lower">
          <table class="budget-table">
            <thead>
              <tr>
                <th scope="col" class="yellow">Budget</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td class="first budget-header">Name</td>
              </tr>
              <tr>
                <td class="first budget-header">Goal</td>
              </tr>
              <tr>
                <td class="first budget-header">Progress</td>
              </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ManageBudgetTable;
