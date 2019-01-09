import { User } from './../../entity/user';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Geolocation,
    Camera,
    Dialogs
  ]
})
export class HomePage {

  public users: any;
  public usuario= new User();
  public options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public navCtrl: NavController, 
    public usuarioService: UserProvider,
    public geolocation: Geolocation,
    private camera: Camera,
    private dialogs: Dialogs) {

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
      this.dialogs.alert('Usuário Salvo com sucesso')
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

  public uploadImage(){
    this.camera.getPicture(this.options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.usuario.foto = base64Image;
     this.dialogs.alert('Upload feito com sucesso')
     .then(() => console.log('Dialog dismissed'))
     .catch(e => console.log('Error displaying dialog', e));

    }, (err) => {
     // Handle error
     console.log(err);
    });
  }
}

