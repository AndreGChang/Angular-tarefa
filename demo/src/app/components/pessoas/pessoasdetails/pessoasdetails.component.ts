import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoasdetails',
  templateUrl: './pessoasdetails.component.html',
  styleUrls: ['./pessoasdetails.component.scss']
})
export class PessoasdetailsComponent {

  @Input() pessoa: Pessoa = new Pessoa();
  @Output() retorno = new EventEmitter<Pessoa>();

  pessoaService = inject(PessoaService);


  constructor() {

  }


  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ
    this.pessoaService.save(this.pessoa).subscribe({
      next: pessoa => { // QUANDO DÁ CERTO
        this.retorno.emit(pessoa);
        console.log("dentro de salvar");

      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  editar(){
    this.pessoaService.verify(this.pessoa).subscribe({
      next: pessoa =>{
        this.retorno.emit(pessoa); 
        console.log("dentro de editar");
      },
      error: error =>{
        alert("Errro, olhar no console");
        console.log(error)
      }
    });
  }




}
