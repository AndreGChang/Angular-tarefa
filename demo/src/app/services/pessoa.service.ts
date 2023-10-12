import { HttpClient } from '@angular/common/http';
import { Pessoa } from './../models/pessoa';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  API: string = 'http://localhost:8080/api/pessoa';
  http = inject(HttpClient);

  constructor() { }
  //return this.http.get<Pessoa[]>(this.API);

  listAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  editarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.API}/editar/${pessoa.id}`, pessoa)
    .pipe(
      catchError(error => {
        // Trate o erro aqui, por exemplo, lançando um erro personalizado ou logando-o
        console.error('Ocorreu um erro:', error);
        throw error; // Passe o erro adiante para que o código que chama a função também possa tratá-lo
      })
    )

  }

  exemploErro(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API + '/erro');
  }

  verify(pessoa: Pessoa) {
    if (pessoa.id) {
      return this.editarPessoa(pessoa);
    } else {
      return this.save(pessoa);
    }
  }

  deletar(id:number) {
    return this.http.delete<Pessoa>(`${this.API}/deletar/${id}`);
  }


  /*
  CASO PRECISE ENVIAR REQUEST PARAMS, BASTA DECLARAR ASSIM E INCLUIR NA REQUISIÇÃO HTTP

  let params = new HttpParams()
      .set('empresaId', empresaId.toString())

  return this.http.get<Pessoa[]>(this.API, { params: params});



  SE PRECISAR COLOCAR COISAS NO HEADER DA REQUISIÇÃO


      let headers = new HttpHeaders()
      .set("Content-Type", "application/json");


        return this.http.get<Pessoa[]>(this.API, { headers: headers});



  */


}
