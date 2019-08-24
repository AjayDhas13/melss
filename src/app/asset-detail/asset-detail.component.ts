import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PredictiveApiService } from "../predictive-api.service";
import * as Highcharts from "highcharts";
import { Chart } from "angular-highcharts";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {

  asset_id: string;
  result;
  chart: Chart;
  prediction;
  closeResult: string;
  constructor(private route: ActivatedRoute, private assetDetail: PredictiveApiService, private modalService: NgbModal) { 
    
  }

  ngOnInit() {
    //Initial chart draw
    this.asset_id = this.route.snapshot.paramMap.get('asset_id');
    this.assetDetail.getAssetDetail(this.asset_id).subscribe(
      res => this.init(res)
    );
    //Refresh chart every 5 seconds
    setInterval(() => {
      this.asset_id = this.route.snapshot.paramMap.get('asset_id');
      this.assetDetail.getAssetRefreshData(this.asset_id).subscribe(
        res => this.refreshChart(res)
      );
    }, 30000);
    // Getting prediction data
    setInterval(() => {
      this.asset_id = this.route.snapshot.paramMap.get('asset_id');
      this.assetDetail.getPredictionData(this.asset_id).subscribe(
        res => this.prediction(res)
      );
    }, 10000);
    // console.log(this.result);

    // setInterval(() => {
    //   this.prediction = "Vibration high detected";
    // }, 5000);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'exampleModalCenterTitle'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
    // chart.ref$.subscribe(console.log);
  }

}
