import Chart from 'react-apexcharts'
import React from 'react';
import { buildPath } from '../functions/buildPath';

export default class ApexChart extends React.Component {
       constructor(props) {
         super(props);

         this.state = {

           series: [44, 55, 13, 43, 22],
           options: {
             chart: {
               width: 380,
               type: 'pie',
             },
             labels: ['Budget 1', 'Budget 2', 'Budget 3', 'Budget 4', 'Budget 5'],
             responsive: [{
               breakpoint: 480,
               options: {
                 chart: {
                   width: 200
                 },
                 legend: {
                   position: 'bottom'
                 }
               }
             }]
           },


         };
       }

       componentDidMount() {
         var obj = {email: localStorage.getItem("email")};
         var js = JSON.stringify(obj);
         fetch(buildPath('api/showAllBudgets'),
           {method:'POST', body: js, headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
           .then(res => res.json())
           .then(
             (result) => {
               var seriesLocal = [];
               var labelsLocal = [];
               for (var i = 0; i < result.results.length; i++) {
                 seriesLocal.push(result.results[i].BudgetGoal);
                 labelsLocal.push(result.results[i].BudgetName);
               }
               this.setState({
                 budgets: result.results,
                 series: seriesLocal,
                 options: {
                   chart: {
                     width: 380,
                     type: 'pie',
                   },
                   labels: labelsLocal,
                   responsive: [{
                     breakpoint: 480,
                     options: {
                       chart: {
                         width: 200
                       },
                       legend: {
                         position: 'bottom'
                       }
                     }
                   }]
                 },
               })
             }
           )
       }



       render() {
         return (


     <div id="chart">
 <Chart options={this.state.options} series={this.state.series} type="pie" width={600} />
</div>);}
}
