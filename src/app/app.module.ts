import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CounterModule } from 'ngx-counter';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { DialogbodyComponent } from './dialogbody/dialogbody.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
    DialogbodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    CounterModule.forRoot(),
    FormsModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{
    provide: MatDialogRef,
    useValue: {
      close: (dialogResult: any) => { }
    }
  }],
  bootstrap: [AppComponent],
  entryComponents: [DialogbodyComponent]
})
export class AppModule { }
