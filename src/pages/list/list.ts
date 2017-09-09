import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  /*icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['wifi', 'football', 'basketball', 'paper-plane', 'boat'];

    this.items = [];
    for(let i = 1; i < 5; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }*/      
  constructor(public alertCtrl: AlertController, public http: Http, private toast: ToastController,public navCtrl: NavController){}
   /*userValidation(username,password){
    var api= 'http://localhost:8081/serene/login?username='+ encodeURI(username)+'&password=' + encodeURI(password);
    this.http.get(api).subscribe(data => {
    console.log("Response is "+ data.json());
    var sendResponse = data.toString();
    return sendResponse;
    });
    
    this.http.get(api).subscribe(data => {
            console.log("response data: ", data.json());
    },
       error => {
            console.log(JSON.stringify(error.json()));
        });
}*/
      presentAlert() {
      console.log('serene:');
      var flag = true;
        
    let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          this.presentToastFail();
        }
      },
      {
        text: 'Login',
        handler: data => {    
        var api= 'http://localhost:8081/serene/login?username='+ encodeURI(data.username)+'&password=' + encodeURI(data.password);         
        this.http.get(api).subscribe(data => {
        console.log("Response is "+ data.json());
        var sendResponse = data.json();      
         console.log("sendResponse is "+ sendResponse);
                this.presentToast(sendResponse);
            });
          }}
        ]
    })
  alert.present();
  }
  presentToastFail() {
  let toast = this.toast.create({
    message: 'Canceled',
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
  presentToast(sendResponse) {
    console.log("in toast " + sendResponse);
    let toast = this.toast.create({
      message: sendResponse,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
 }