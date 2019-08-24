import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class PredictiveApiService {
  uri = 'https://7xxt8qsxxk.execute-api.us-east-1.amazonaws.com/asset';
  
  constructor(private http: HttpClient) { }
  
  getAssetList(){
    const data = {
      "action": "asset_list"
    }

    const headers = new HttpHeaders({
      "x-api-key": "i3vAKBMb539q7Euzc3VlO6erN3CZfUcK3GE73JBJ",
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.uri}/assetlist`, data, {headers});
  }

  getAssetDetail(asset_id){
    const data = {
      "action": "asset_data",
      "asset_id": asset_id
    }

    const headers = new HttpHeaders({
      "x-api-key": "i3vAKBMb539q7Euzc3VlO6erN3CZfUcK3GE73JBJ",
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.uri}/asset_data`, data, {headers});
  }

  getAssetRefreshData(asset_id){
    const data = {
      "action": "asset_data",
      "asset_id": asset_id,
      "refresh_data": 2
    }

    const headers = new HttpHeaders({
      "x-api-key": "i3vAKBMb539q7Euzc3VlO6erN3CZfUcK3GE73JBJ",
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.uri}/asset_data`, data, {headers});
  }
}
