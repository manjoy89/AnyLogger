import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogbody',
  templateUrl: './dialogbody.component.html',
  styleUrls: ['./dialogbody.component.scss']
})
export class DialogbodyComponent  {

  input1:any;

  constructor(public dialogRef: MatDialogRef<DialogbodyComponent>){}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
