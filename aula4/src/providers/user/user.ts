import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-browser'

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

  }

}
