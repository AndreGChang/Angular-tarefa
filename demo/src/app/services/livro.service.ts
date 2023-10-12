import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  API: string = 'http://localhost:8080/api/livro';
  http = inject(HttpClient);

  constructor() { }


  listAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API);
  }

  save(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  editarLivro(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.API}/editar/${livro.id}`, livro);
  }

  verify(livro: Livro): Observable<Livro> {
    if (livro.id) {
      return this.editarLivro(livro);
    }else{
      return this.save(livro);
    }
  }


  deletar(id:number){
    return this.http.delete<Livro>(`${this.API}/${id}`);
  }

}
