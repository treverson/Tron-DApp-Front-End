import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import { FuseCopierService } from '@fuse/services/copier.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit {

  wallet_address : any;
  wallet_qr: string = '';
  tronscan_url: string;

  constructor(
    public snackBar: MatSnackBar,
    private copyService: FuseCopierService,
    private dialogRef: MatDialogRef<ReceiveComponent>,
    @Inject(MAT_DIALOG_DATA) dat
    ) { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('data'));
    this.wallet_address = data['wallet_address'];
    this.wallet_qr = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M%7C0&cht=qr&chl=${this.wallet_address}`;
    this.tronscan_url = 'https://tronscan.org/#/address/'+this.wallet_address;
  }
  
  copy() {
    this.snackBar.open('Address copied successfully!');
    return this.copyService.copyText(this.wallet_address);
  }

  close() {
    this.dialogRef.close();
  }
}
