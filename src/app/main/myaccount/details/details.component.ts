import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  item: {
    date_time: "",
    note: "",
    trx_id: "",
    type: ""
  };

  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.item = data;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
