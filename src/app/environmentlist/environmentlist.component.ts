import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MdbTableService } from 'angular-bootstrap-md';


@Component({
  selector: 'app-environmentlist',
  templateUrl: './environmentlist.component.html',
  styleUrls: ['./environmentlist.component.scss']
})
export class EnvironmentlistComponent implements OnInit {

  items:any = [];
  headElements = ['NAME', 'VERSION', 'RELEASE', 'INSTALLED']
  datat:any = [];

  private _jsonURL = 'assets/rpmjson.json';
  constructor(private http: HttpClient, private tableService: MdbTableService) {
    this.getJSON().subscribe(datas => {
      this.items.push(datas);   
     });
  
   }


   public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {
  }


}
