import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-environmentlist',
  templateUrl: './environmentlist.component.html',
  styleUrls: ['./environmentlist.component.scss']
})
export class EnvironmentlistComponent implements OnInit {

  items:any = [];

  private _jsonURL = 'assets/rpmjson.json';
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(datas => {
      this.items.push(datas);
      console.log(this.items[0].CIQ2)
     });
   }

   public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {
  }

}
