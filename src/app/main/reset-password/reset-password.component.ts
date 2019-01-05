import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { User } from '../../model/user.model';
import { MatSnackBar, MatSpinner} from '@angular/material';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Meta, Title } from '@angular/platform-browser';
import { Validation } from '../../validation/validation';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from '../../directive/compare-validator.directive';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  rpForm: FormGroup;
  submitted = false;

  token: string = "";
  loader: boolean = false;
  public captchaKey: any = null;
  public ValidationsClass: Validation;
  
  @ViewChild(RecaptchaComponent) reCaptcha: RecaptchaComponent;
  
  /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
  constructor(
    private meta: Meta,
    private router: Router,
    private userModel: User,
    private fb: FormBuilder,
    private titleService:Title,
    private route:ActivatedRoute,
    public snackBar: MatSnackBar,
    private userService: UserService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService
  ) {
      this._fuseTranslationLoaderService.loadTranslations(english, turkish);

      this.titleService.setTitle("Login to Health Port");
      document.domain !='healthport.io'?this.meta.addTag({ name: 'robots', content: 'noindex' }):false;
      this.meta.addTags([
        { httpEquiv: 'Content-Type', content: 'text/html'},
        { charset: 'UTF-8'},
        { property: 'og:title', content: "Login to Health Port"},
        { name: 'description', content: 'Login to manage your Health Port account.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'}
      ], true);

      this.ValidationsClass = new Validation();
   }

  ngOnInit() {
    let checkToken = JSON.parse(localStorage.getItem('userToken'));
      if (this.ValidationsClass.verifyNameInputs(checkToken)) {
        this.router.navigate(['/myaccount']);
      }

      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
      });
      
      this.rpForm = this.fb.group({
        password: ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,30})')]],
        confirmpassword: ['', [Validators.required,  Validators.pattern('((?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,30})'), compareValidator('password')]]
      });
  }

  get f() { return this.rpForm.controls; }
  
  validation() {
    
    this.submitted = true;
    this.loader = true;  

    if (this.rpForm.invalid) {
      this.loader = false;
      return;
    } else if (!this.ValidationsClass.verifyNameInputs(this.token)) {
      this.loader = false;
      this.snackBar.open('Authentication token is not provided');
    } 
    else {
      this.reCaptcha.execute();
    }

  }
  
  submitCaptcha(event) {

    this.captchaKey = event;
    if (this.captchaKey == null || this.captchaKey == undefined) {
      this.loader = false;
      this.snackBar.open('Captcha undefined or null');
    } else {
      this.updatePassword();
    }

  }

  updatePassword() {

    this.userModel.password = this.f.password.value;
    this.userService.updatePassword(this.userModel,this.token, this.captchaKey).subscribe(
      res => {
        if (res.code === 200) {
          this.loader = false;
          this.snackBar.open(res.message);
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 3000);
        }
        else {
          this.loader = false;
          this.snackBar.open(res.message);
        }
      }, error => {
        this.loader = false;
        this.snackBar.open(error.error.message);
      }
      );
  }

}
