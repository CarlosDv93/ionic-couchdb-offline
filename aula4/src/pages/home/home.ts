import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: any;
  public usuario= {name:"",age:""};

  constructor(public navCtrl: NavController, public usuarioService: UserProvider) {

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
    this.usuarioService.removeUsuario(usuario);
  }

  public salvarUsuario() {
      this.usuarioService.creteUser(this.usuario);
  };

}

