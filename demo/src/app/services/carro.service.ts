import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  API: string = 'http://localhost:8080/api/carro';
  http = inject(HttpClient);


  listAll():Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API);
  }


  save(carro : Carro):Observable<Carro>{
    return this.http.post<Carro>(this.API,carro);
  }


  editarCarro(carro: Carro):Observable<Carro>{
    return this.http.put<Carro>(`${this.API}/editar/${carro.id}`,carro);
  }


  verify(carro: Carro):Observable<Carro>{
    if(carro.id){
      return this.editarCarro(carro);
    }else{
      return this.save(carro);
    }
  }


  deletar(id:number){
    return this.http.delete<Carro>(`${this.API}/${id}`)
  }
  constructor() { }
}
