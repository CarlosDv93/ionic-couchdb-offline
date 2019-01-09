import { User } from './../../entity/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Geolocation
  ]
})
export class HomePage {

  public users: any;
  public usuario= new User();

  constructor(public navCtrl: NavController, 
    public usuarioService: UserProvider,
    public geolocation: Geolocation) {

  }

  ionViewDidLoad() {

    this.usuarioService.getUsers().then((data) => {
      this.users = data;
    });

  }

  public editar(usuario){
    this.usuario = usuario;
  }

  public deletar(usuario){
    this.usuarioService.removeUser(usuario);
  }

  public salvarUsuario() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.usuario.latitude = resp.coords.latitude;
      this.usuario.longitude = resp.coords.longitude;
      this.usuarioService.creteUser(this.usuario);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  };

  public editarUsuario(usuario){
    this.usuario = usuario;
  }

  public removerUsuario(usuario){
    this.usuarioService.removeUser(usuario);
  }
}

