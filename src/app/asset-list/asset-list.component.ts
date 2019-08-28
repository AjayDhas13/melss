import { Component, OnInit } from '@angular/core';
import { PredictiveApiService } from "../predictive-api.service";
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  asset_list;
  constructor(private asset: PredictiveApiService) { }

  ngOnInit() {
    this.asset.getAssetList().subscribe(res => this.asset_list=res)
  }

}
