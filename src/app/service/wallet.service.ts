import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Send } from '../model/send.model';

interface responseData {
  code: any;
  message: string,
  data: Object,
  token:any;
}

@Injectable({
  providedIn: 'root'
})

export class WalletService {

  constructor(private httpClient: HttpClient) { }

  send(sendModel: Send , token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    headers= headers.set('authorization', token);
    let data = { to:sendModel.to, from: sendModel.from, amount: sendModel.amount, note: sendModel.note};

    return this.httpClient.post<responseData>(environment.serviceUrl + "user/sendtoken", data, { headers: headers });
  }
  
  getBalance(address , token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    headers= headers.set('authorization', token);
    let data = {address: address};

    return this.httpClient.post<responseData>(environment.serviceUrl + "user/getbalance", data, { headers: headers });
  }

  getTransactionsHistory (address, pNum, token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    headers= headers.set('authorization', token);
    let data = {address: address, pageNumber:pNum};

    return this.httpClient.post<responseData>(environment.serviceUrl + "user/getTransectionsByAddress", data, { headers: headers });
  }

}
