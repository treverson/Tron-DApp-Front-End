import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Send } from '../../../model/send.model';
import { Global } from '../../../service/global.service';
import { WalletService } from '../../../service/wallet.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatSpinner } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})

export class SendComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  wallet_address: any;
  transaction_url: string;
  isSuccess: boolean = false;
  loader: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sendModel: Send,
    private globalService: Global,
    public snackBar: MatSnackBar,
    private walletService: WalletService,
    private dialogRef: MatDialogRef<SendComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.wallet_address = data.address;
  }

  ngOnInit() {

    this.form = this.fb.group({
      address: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      note: ['', [Validators.required, Validators.pattern('^(?=.{2,300}$).*')]],
    });
  }

  get f() { return this.form.controls; }

  send() {

    this.submitted = true;
    this.loader = true;
    this.isSuccess = false;

    if (this.form.invalid) {
      this.loader = false;
      return;
    }
    else {

      this.transaction_url = 'https://tronscan.org/#/transaction/';
      this.sendModel.to = this.f.address.value;
      this.sendModel.from = this.wallet_address;
      this.sendModel.amount = this.f.amount.value;
      this.sendModel.note = this.f.note.value;

      let token = JSON.parse(localStorage.getItem('userToken'));

      this.walletService.send(this.sendModel, token)
        .subscribe(res => {
          if (res.code === 200) {
            this.isSuccess = true;
            this.loader = false;
            this.submitted = false;
            this.form.reset();
            this.transaction_url = this.transaction_url + res.data;
          }
          else {
            this.loader = false;
            this.snackBar.open(res.message);
          }
        }, error => {
          this.loader = false;
          this.snackBar.open(error.error.message);
          if (error.error.code == 401) {
            localStorage.clear();
            setTimeout(() => {
              this.globalService.state = "SIGNUP";
              this.router.navigate(['/login']);
            }, 1500);
          }
        });
    }

  }

  close() {
    this.dialogRef.close();
  }

}
