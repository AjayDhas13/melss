import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { PredictiveApiService } from "./predictive-api.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';

import { ChartModule } from "angular-highcharts";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AssetListComponent,
    AssetDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    NgbModule
  ],
  providers: [
    PredictiveApiService
  ],
  bootstrap: [
    AppComponent, 
    AssetDetailComponent
  ]
})
export class AppModule { }
