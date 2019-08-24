import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PredictiveApiService } from "../predictive-api.service";
import * as Highcharts from "highcharts";
import { Chart } from "angular-highcharts";

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {

  // Highcharts: typeof Highcharts = Highcharts; // required
  // chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = {
  //   series: [{
  //     data: [{x: 1566496781000, y: 3415.75},{x: 1566496781000, y: 3415.75}],
  //     type: 'line'
  //   }]
  // }; // required
  // // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  // updateFlag: boolean = false; // optional boolean
  // oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // runOutsideAngular: boolean = false; // optional boolean, defaults to false

  asset_id: string;
  result;
  chart: Chart;
  constructor(private route: ActivatedRoute, private assetDetail: PredictiveApiService) { 
    
  }

  ngOnInit() {
    this.asset_id = this.route.snapshot.paramMap.get('asset_id');
    this.assetDetail.getAssetDetail(this.asset_id).subscribe(
      res => this.init(res)
    );
    this.result = setInterval(() => {
      this.asset_id = this.route.snapshot.paramMap.get('asset_id');
      this.assetDetail.getAssetRefreshData(this.asset_id).subscribe(
        res => this.refreshChart(res)
      );
    }, 5000);
  }

  refreshChart(refresh_data){
    // console.log(Object.keys(refresh_data.data.attrbutes[0]).length);
    // console.log(refresh_data.data.attrbutes[0].data[Object.keys(refresh_data.data.attrbutes[0].data).length-1]);
    // var series = this.chart.series;
    var x = refresh_data.data.attrbutes[0].data[Object.keys(refresh_data.data.attrbutes[0].data).length-1].x,
        y = refresh_data.data.attrbutes[0].data[Object.keys(refresh_data.data.attrbutes[0].data).length-1].y;
        // console.log(x,y);
    this.chart.addPoint([x,y], 0, true, true);
    var x1 = refresh_data.data.attrbutes[1].data[Object.keys(refresh_data.data.attrbutes[0].data).length-1].x,
        y1 = refresh_data.data.attrbutes[1].data[Object.keys(refresh_data.data.attrbutes[0].data).length-1].y;
        // console.log(x1,y1);
    this.chart.addPoint([x1,y1], 1, true, true);
    // this.chart.addSeries([{
    //     name: series_data.data.attrbutes[0].attr_name,
    //     type: 'line',
    //     yAxis: 1,
    //     data: series_data.data.attrbutes[0].data,
    //     tooltip: {
    //         valueSuffix: series_data.data.attrbutes[0].uom
    //     }

    // }, {
    //     name: series_data.data.attrbutes[1].attr_name,
    //     type: 'line',
    //     data: series_data.data.attrbutes[1].data,
    //     tooltip: {
    //         valueSuffix: series_data.data.attrbutes[1].uom,
    //     }
    // }]);
  }

  init(series_data) {
    let chart = new Chart({
      chart: {
        zoomType: 'xy',
        // events: {
        //   load: function () {
        //       // set up the updating of the chart each second
        //       var series = this.series[0];
        //       setInterval(function () {
        //           var x = series_data.data.attrbutes[0].data,
        //               y = series_data.data.attrbutes[1].data;
                      
        //           series.addPoint([x, y], true, true);
        //       }, 2000);
        //   }
        // }
      },
      title: {
          text: series_data.data.asset_name
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
           day: '%d %b %Y'    //ex- 01 Jan 2016
        }
      },
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value} '+series_data.data.attrbutes[1].uom,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          title: {
              text: series_data.data.attrbutes[1].attr_name,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: series_data.data.attrbutes[0].attr_name,
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          labels: {
              format: '{value} '+series_data.data.attrbutes[0].uom,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: true
      }],
      tooltip: {
          shared: true
      },
      
      series: [{
          name: series_data.data.attrbutes[0].attr_name,
          type: 'line',
          yAxis: 1,
          data: series_data.data.attrbutes[0].data,
          tooltip: {
              valueSuffix: series_data.data.attrbutes[0].uom
          }

      }, {
          name: series_data.data.attrbutes[1].attr_name,
          type: 'line',
          data: series_data.data.attrbutes[1].data,
          tooltip: {
              valueSuffix: series_data.data.attrbutes[1].uom,
          }
      }]
    });
    this.chart = chart;
    chart.ref$.subscribe(console.log);
  }

}
