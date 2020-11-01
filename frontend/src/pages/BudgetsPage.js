import React from 'react';

import BudgetPageHeader from '../components/BudgetPageHeader';
import LoggedInName from '../components/LoggedInName';
import Budgets from '../components/Budgets';

const BudgetsPage = () =>
{
    return(
        <div>
            <BudgetPageHeader />
            <LoggedInName />
            <Budgets />
        </div>
    );
}

export default BudgetsPage;