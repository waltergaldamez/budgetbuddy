import React from 'react';

import PageHeader from '../components/PageHeader';
import LoggedInName from '../components/LoggedInName';
import Budgets from '../components/Budgets';

const BudgetsPage = () =>
{
    return(
        <div>
            <PageHeader />
            <LoggedInName />
            <Budgets />
        </div>
    );
}

export default BudgetsPage;