import { HttpClient } from '@angular/common/http';
import { Pessoa } from './../models/pessoa';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  API: string = 'http://localhost:8080/api/pessoa';
  //http = inject(HttpClient);

  constructor(private http: HttpClient) { }
  //return this.http.get<Pessoa[]>(this.API);

  listAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  save(pessoa: Partial<Pessoa>) {
    return this.http.post<Pessoa>(this.API, pessoa);
  }

  editarPessoa(pessoa: Partial<Pessoa>) {
    return this.http.put<Pessoa>(`${this.API}/editar/${pessoa.id}`, pessoa)
  }

  exemploErro(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API + '/erro');
  }

  verify(pessoa: Partial<Pessoa>) {
    if (pessoa.id) {
      return this.editarPessoa(pessoa);
    } else {
      return this.save(pessoa);
    }
  }

  deletar(id:number) {
    return this.http.delete<Pessoa>(`${this.API}/deletar/${id}`);
  }

  // editar(pessoa: Pessoa, id: number):Observable<Pessoa>{
  //   let URL = this.API + pessoa.id.toString();
  //   return this.http.put<Pessoa>(URL, pessoa)
  // }




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
