import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EnvironmentlistComponent } from './environmentlist/environmentlist.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'EnvironmentList', component: EnvironmentlistComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
