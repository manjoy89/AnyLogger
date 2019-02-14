import { Component, OnInit,ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DialogbodyComponent } from '../dialogbody/dialogbody.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  
 

  @ViewChild('alert') alert: ElementRef;
  @ViewChild('alertfail') alertfail: ElementRef;
  @ViewChild('alertwarn') alertwarn: ElementRef;
  @ViewChild('alertnodir') alertnodir: ElementRef;
 

  Content:string;
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
  files:any;
  path:any;
  dir:any = [];
  uparr:any = [];
  myInterval:any;
  imgflag:boolean = false;
  logfile: String;
  concatpath:any;
  scrollflag:boolean = true;
  errmsg:any;
  enableerr:boolean = false;
  enablewarn:boolean = false;
  enablecust:boolean = false;

  constructor(private http: HttpClient,private dialog: MatDialog, public dialogRef: MatDialogRef<DialogbodyComponent>, public toastservice: ToastrService) { 
    
  }

  

  ngOnInit() {
    this.http.get("http://localhost:5001/").subscribe(data=>{
      this.files = data;
      this.path = data[0].Path;
      this.alert.nativeElement.classList.remove('show');
      this.alertfail.nativeElement.classList.remove('show');
      this.alertwarn.nativeElement.classList.remove('show');
      this.alertnodir.nativeElement.classList.remove('show');
    })
  }

  clearlog(){ 
   clearInterval(this.myInterval);
   this.Content = null;
   this.ErrCount = 0;
   this.WarnCount = 0;
   this.CustCount = 0;
   this.Custom = 'Custom'
   this.ErrFlag = false;
   this.WarnFlag = false;
   this.CustFlag = false;
}

selfol(data){
  clearInterval(this.myInterval);
  if ((data.IsDirectory) || (data.IsDirectory == undefined)){
    if(data.IsDirectory !== undefined){
    this.dir.push(data.Name)
    console.log(this.dir);
    var str = this.dir.join("/");
    this.http.get("http://localhost:5001/?path="+str+"").subscribe(data=>{
      console.log(str);
    this.files = data;
    if(data[0].Name == "empty"){
      this.files = [];
    }
    this.path = data[0].Path;
   
  })
}
  }
  else{
    var textarea = document.getElementById('exampleFormControlTextarea4');
    this.scrollflag = true;
    this.ErrCount = 0;
    this.WarnCount = 0;
    this.CustCount = 0;
    this.ErrFlag = false;
    this.WarnFlag = false;
    this.CustFlag = false;
    this.logfile = data.Name;
    //this.toastservice.info('AnyLogger','File added',{progressBar: true});
    this.alert.nativeElement.classList.add('show');
    setTimeout(()=>{
      this.closeAlert();
      }, 5000);
    clearInterval(this.myInterval);
    this.myInterval = setInterval(()=>{
      this.http.get("http://localhost:5000/?path="+data.Path+"/"+data.Name+"",{responseType:"text"})
      .subscribe(data=>{
        this.Content = data;
        if (this.enableerr){
          this.Content = this.Content.split(/Error|error|errors|Errors|ERROR|ERRORS/).join('<<<===========================###ERROR###===========================>>> ');
        }
        if (this.enablewarn){
          this.Content = this.Content.split(/Warning|warning|Warnings|warnings|WARNING|WARNINGS/).join('<<<===========================###WARNING###===========================>>> ');
        }
        if (this.enablecust){
          var cust = '<<<==========================='+'###'+this.Custinput+'###'+'===========================>>>';
          this.Content = this.Content.split(this.Custinput).join(cust);
        }
        setTimeout(()=>{
        if (this.scrollflag){
          textarea.scrollTop = textarea.scrollHeight;
          this.scrollflag = false;
        }
      },500);
      if (this.Content.indexOf('Error') >= 0){
        this.ErrFlag = true;
      }
      if (this.Content.indexOf('Warning') >= 0){
        this.WarnFlag = true;
      }
      if (this.Content.indexOf(this.Custinput) >= 0){
        this.CustFlag = true;
      }
      this.ErrCount = (this.Content.match(/Error|error|errors|Errors|ERROR|ERRORS/g) || []).length;
      this.WarnCount = (this.Content.match(/Warning|warning|Warnings|warnings|WARNING|WARNINGS/g) || []).length;
      var ci = new RegExp(this.Custinput,'g');
      this.CustCount = (this.Content.match(ci) || []).length;
     // this.Content = this.Content.split(/Error|error|errors|Errors/).join('<<<===========================###ERROR###===========================>>> ');
    })
    console.log(textarea.scrollTop)
    console.log(textarea.offsetHeight)
    console.log(textarea.scrollHeight)
    
    if(textarea.scrollHeight - textarea.scrollTop < 600){
       textarea.scrollTop = textarea.scrollHeight;
    }
    console.log("err flag"+this.ErrFlag)
  }, 500);
  setTimeout(()=>{
  if (this.ErrFlag){
    this.alertfail.nativeElement.classList.add('show');
    setTimeout(()=>{
      this.closeAlertfail();
      }, 5000);
  }if(this.WarnFlag){
    this.alertwarn.nativeElement.classList.add('show');
    setTimeout(()=>{
      this.closeAlertwarn();
      }, 5000);
  }
}, 600);
  this.ErrCount = 0;
  this.WarnCount = 0;
  this.CustCount = 0;
  this.ErrFlag = false;
  this.WarnFlag = false;
  this.CustFlag = false;
  }
  
}

up(){
  this.dir.splice(-1,1)
  console.log(this.dir);
  var str1 = this.dir.join("/");
  this.http.get("http://localhost:5001/?path="+str1+"")
  .subscribe(data=>{
  this.files = data;
  this.path = data[0].Path;
    
  })
}

closeAlert() {
  this.alert.nativeElement.classList.remove('show');
}

closeAlertfail() {
  this.alertfail.nativeElement.classList.remove('show');
}

closeAlertwarn() {
  this.alertwarn.nativeElement.classList.remove('show');
}

closeAlertnodir() {
  this.alertnodir.nativeElement.classList.remove('show');
}

onKeydown(event) {
  if (event.key === "Enter") {
    this.dir = [];
    this.http.get("http://localhost:5001/?init="+event.target.value).subscribe(data=>{
      if (data[0].Errormsg){
        this.errmsg = data[0].Errormsg;
        this.alertnodir.nativeElement.classList.add('show');
        setTimeout(()=>{
          this.closeAlertnodir();
          }, 7000);
        return;
      }
      this.files = data;
      this.path = data[0].Path;
  });
  }
}

cusfilfun(){
  const dialogRef = this.dialog.open(DialogbodyComponent, {
    width: '300px',
    height: '280px'
});

dialogRef.afterClosed().subscribe(result => {
  this.Custinput = result;
  this.Custom = result
  if (this.Custinput == undefined){
    this.Custinput = 'Manoj'
    this.Custom = 'Custom'
  }
});
}

select(){
  var url = document.getElementById("pathbox") as HTMLInputElement;
  url.select();
}



}
