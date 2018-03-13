import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../providers/servicio.service';
import { Uno } from '../model/uno';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {

  nombre : string;
  id: string;
  todos : Uno[];
  nuevaTarea : string;

  constructor(public todosService:ServicioService) { 
    this.nombre = "Eskalante";

    console.log('UnoComponent constructor');
      this.todos = [];
  }

  ngOnInit() {
    console.log('UnoComponent ngOnInit');
   // this.cargarTareas();
  }

  cargarTareas(){
    console.log('UnoComponent cargarTareas');
    this.todos = [];
    this.todosService.getTodos(this.id).subscribe(
      resultado => {
        console.debug('peticion correcta %o', resultado);
        this.mapeo(resultado);
      },
      error=>{
        console.warn('peticion incorrecta %o', error);
      }
    );//subscribe
  }

  /**
   * Mapea los Datos en formato Json a Todo que proviene del Servicio Rest
   * @param resultado : any 
   */
  mapeo( result : any ){

    let todo:Uno;
    result.forEach(el => {
        todo = new Uno( el.title );
        todo.id = el.id;
        todo.idUser = el.userId;
        todo.completed = el.completed;

        this.todos.push(todo);
    });

  }

  change(todo:Uno){
    console.log('UnoComponent change %o', todo );
    this.todosService.patch(todo).subscribe(     
        result=>{
          console.log('Tarea modificada con exito %o', result);
          this.cargarTareas();
        },
        error=>{
          alert('No se pudo Modificar la Tarea');
        }      
    );
  }

  delete(todo:Uno){
    console.log('UnoComponent delete %o', todo );

    this.todosService.delete(todo.id).subscribe(
      result=>{
        this.cargarTareas();
      },
      error=>{
        alert('No se pudo elimiar Tarea');
      }
    );
    /*
    this.todos.forEach( (t, index) =>{
      if ( t.id === todo.id ){
        this.todos.splice(index,1);
        return false; //break        
      }
    });*/

  }

  new(){
    console.log('UnoComponent new ');
    let todo = new Uno(this.nuevaTarea);
    /*
    let todo = new Todo(this.nuevaTarea);
    this.todos.unshift(todo);
    this.nuevaTarea = "";
    */
    this.todosService.post(todo).subscribe(
      result=>{
        console.log('UnoComponent new %o', result);
        this.cargarTareas();
      },
      error=>{
        alert('No se pudo Crear Nueva Tarea');
        console.error(error);
      }
    );
  }

}
