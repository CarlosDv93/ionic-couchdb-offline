import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public users : any;

  constructor(public navCtrl: NavController, public userService: UserProvider) {
    this.userService.getUsers().then((data) => {
      this.users = data;
    })

  }

}
