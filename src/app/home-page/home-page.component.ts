import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  Content:String;
  Staging:String;
  file:any;
  ErrFlag:boolean = false;
  WarnFlag:boolean = false;
  CustFlag:boolean = false;
  ErrCount:number = 0;
  WarnCount:number = 0;
  CustCount:number = 0;
  show:boolean = false;
  Custinput:string = 'Manoj';
  Custom:String = 'Custom';
  

  constructor(private http: HttpClient, private router: Router) { 
  
  }

  ngOnInit() {
    this.http.get("http://localhost:5000/",{responseType:"text"}).subscribe(data=>{
      this.Content = data;
    })
  }

  
  /*
  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.Staging = fileReader.result as string;
      if (self.Staging.indexOf('Error') >= 0){
        self.ErrFlag = true;
      }
      if (self.Staging.indexOf('Warning') >= 0){
        self.WarnFlag = true;
      }
      if (self.Staging.indexOf(self.Custinput) >= 0){
        self.CustFlag = true;
      }
      self.ErrCount = (self.Staging.match(/Error/g) || []).length;
      self.WarnCount = (self.Staging.match(/Warning/g) || []).length;
      var ci = new RegExp(self.Custinput,'g');
      self.CustCount = (self.Staging.match(ci) || []).length;
      self.Content = self.Staging.split('Error').join('<=============================Error==========================>');
    }
    self.ErrCount = 0;
    self.WarnCount = 0;
    self.CustCount = 0;
    var myInterval = setInterval(function() {
    fileReader.readAsText(file);
    self.ErrFlag = false;
    self.WarnFlag = false;
    self.CustFlag = false;
    var textarea = document.getElementById('textarea_id');
   // textarea.scrollTop = textarea.scrollHeight;
  }, 1000);
  }  

  */

  clearlog(){ 
    location.reload();
   
}


}
