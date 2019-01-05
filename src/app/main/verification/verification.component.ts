import { Component, OnInit, Input } from '@angular/core';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { User } from '../../model/user.model';
import { Meta, Title } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import { Validation } from '../../validation/validation';
import { Router , ActivatedRoute} from '@angular/router';
import { MatSnackBar , MatSpinner} from '@angular/material';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {


  public tokenOfUser: any;
  public errorMessage: string ;
  public noError: boolean = false;
  public ValidationsClass: Validation;
  public resendLoader: boolean = false;
  public errorOccurred: boolean = false;
  public notVerified: boolean = false;
  verificationEmail : string ;

  constructor(
    private meta: Meta,
    private router: Router,
    private userModel: User,
    private titleService:Title,
    public snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private userService: UserService, 
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) { 
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        this.titleService.setTitle("Verification for Health Port");
        document.domain !='healthport.io'?this.meta.addTag({ name: 'robots', content: 'noindex' }):false;
        this.meta.addTags([
          { httpEquiv: 'Content-Type', content: 'text/html'},
          { charset: 'UTF-8'},
          { property: 'og:title', content: "Sign Up for Health Port"},
          { name: 'description', content: 'Join Health Port to create and manage your personalized, decentralized electronic health record (EHR) on the blockchain.' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'}
        ], true);

        this.ValidationsClass = new Validation();
  }

  ngOnInit() {
    
    let checkToken = JSON.parse(localStorage.getItem('userToken'));
    if (this.ValidationsClass.verifyNameInputs(checkToken)) {
      this.router.navigate(['/myaccount']);
    }
    let emailSent = JSON.parse(localStorage.getItem('verificationEmail'));
    if (this.ValidationsClass.verifyNameInputs(emailSent)) {
      this.verificationEmail = emailSent;
    }

    this.route.queryParams.subscribe(params => {
      this.tokenOfUser = params['token'];
    }); 

    if(this.ValidationsClass.verifyNameInputs(this.tokenOfUser)) {

      this.userService.VerifyEmail(this.tokenOfUser).subscribe(res => {
        
        if (res.code == 200) {
          this.noError = true;
          this.errorOccurred = false;
          this.notVerified = false;
          localStorage.removeItem('verificationToken');
          localStorage.removeItem('verificationEmail');
    
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
    
        } else {
          this.snackBar.open(res.message);
          this.notVerified = true;
    
        }
      }, err => {
          this.errorOccurred = true;
          this.notVerified = false;
          this.errorMessage = err.error.message;

          if(err.error.code == 400) {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
      })
    }
    else {
      this.notVerified = true; 
    }
  }

resendVerificationCode() {

    this.resendLoader = true;
    let verificationToken = JSON.parse(localStorage.getItem('verificationToken'));
    
    if(this.ValidationsClass.verifyNameInputs(verificationToken)) {

      this.userService.resendEmailToUser(verificationToken).subscribe(res => {

        if (res.code == 200) {
          this.noError = false;
          this.resendLoader = false;
          this.errorOccurred = false;
          this.notVerified = true;
          this.snackBar.open(res.message);
        }
      }, err => {

        this.noError = false;
        this.resendLoader = false;
        this.errorOccurred = false;
        this.snackBar.open(err.error.message);
  
      })

    }
    else {

      this.noError = false;
      this.resendLoader = false;
      this.errorOccurred = false;
      this.snackBar.open('Link does not exists');

    }
    
  } 

}
