import Chart from 'react-apexcharts'
import React from 'react';

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



       render() {
         return (


     <div id="chart">
 <Chart options={this.state.options} series={this.state.series} type="pie" width={600} />
</div>);}
}
