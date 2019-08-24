import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetListComponent } from "./asset-list/asset-list.component";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";

const routes: Routes = [
  {
    path: 'asset/list',
    component: AssetListComponent
  },
  {
    path: 'asset/:asset_id',
    component: AssetDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
