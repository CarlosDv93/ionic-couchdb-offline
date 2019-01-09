import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind)

@Injectable()
export class UserProvider {

  public data : any;
  public db : any;
  public remote : any;

  constructor() {
    this.db = new PouchDB('users');
    this.remote = 'http://127.0.0.1:5984/aula4'

    let options = {
      live : true,
      retry: true,
      continuous: true,
    }

    this.db.sync(this.remote, options);
  }


  public creteUser(user:any){
    this.db.post(user);
  }

  public updateUser(user: any) {
    this.db.put(user).catch((err)=>{

    });
  }

  public removeUser(user:any){
    this.db.remove(user).catch((err)=>{

    })
  }

  public find(userName : string) {
    return this.db.find({
      selector: {'name': {$regex: userName}},
      fields: ['name', 'age']
    });
  }

  public getUsers(){
    if(this.data){
      return Promise.resolve(this.data)
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs : true
      }).then(result => {
        this.data = [];
        let docs = result.rows.map(row => {
          this.data.push(row.doc)
        });

        resolve(this.data);

        this.db.changes({live: 'true', since : 'now', include_docs: true}).on('change', (change)=>{
          this.handleChange(change);
        })
      })
    })
  }

  public handleChange(change : any){
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //Documento deletado
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    } else {
      if (changedDoc) {
        //Documento atualizado
        this.data[changedIndex] = change.doc;
      } else {
        //Documento adicionado
        this.data.push(change.doc);
      }
    }
  }

}
