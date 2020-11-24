import ReactApexChart from 'react-apexcharts';
import React from 'react';

export default class ApexProgressChart extends React.Component {
       constructor(props) {
         super(props);

         this.state = {

           series: [70],
           options: {
             chart: {
               height: 350,
               type: 'radialBar',
             },
             plotOptions: {
               radialBar: {
                 hollow: {
                   size: '70%',
                 }
               },
             },
             labels: ['Cricket'],
           },


         };
       }



       render() {
         return (


     <div id="chart">
 <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={225} />
</div>


         );
       }
     }
