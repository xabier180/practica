import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Uno } from '../model/uno';
import { GLOBAL } from '../global';


//const END_POINT = "http://192.168.0.42:3000";


@Injectable()
export class ServicioService {

  constructor(public http: HttpClient) { 
    console.log('ServicioService constructor');
  }

   /** 
   * Recuperamos todas las Tareas sin filtrar por usuario
  */
 getTodos(id):Observable<any>{



  
  let url = GLOBAL.endpoint + '/todos/?id=' +id;
  console.log(`ServiciosService getTodos ${url}`);
  return this.http.get(url);

}

/**
   * Eliminamos una Tarea por su id
   * @param id : number
   */
  delete(id:number){
    let url = GLOBAL.endpoint + '/todos/'+id;
    console.log(`ServicioService delete ${url}`);
    return this.http.delete(url);
  }

   /**
   * Creamos una nueva Tarea
   * @param todo : Todo
   */
  post(todo:Uno):Observable<any>{
    let url = GLOBAL.endpoint + '/todos/';
    console.log(`ServicioService put ${url}`);

    let body = {
                  // "id": todo.id,
                  "userId": todo.idUser,
                  "title": todo.title,
                  "completed": todo.completed    
                } 
              
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post( url, body , httpOptions );
  }

  /**
     * Modificamos el estado "completed" de una Tarea por su id
     * @param todo : Todo
     */
    patch(todo: Uno):Observable<any>{
      let url = GLOBAL.endpoint + `/todos/${todo.id}`;
      console.log(`ServicioService patch ${url}`);

      let body = {                    
                    "completed": !todo.completed    
                  } 
                
      
      return this.http.patch( url, body );
    }



}
