import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livro';
import { CarroService } from 'src/app/services/carro.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livrosdetails',
  templateUrl: './livrosdetails.component.html',
  styleUrls: ['./livrosdetails.component.scss']
})
export class LivrosdetailsComponent {

  @Input() livro: Livro = new Livro();
  @Output() retorno = new EventEmitter<Livro>();

  livroService = inject(LivroService);
  modalService = inject(NgbModal);


  salvar(){
   this.livroService.verify(this.livro).subscribe({
    next: livro =>{
      this.retorno.emit(livro);
    },
    error: erro =>{
      console.log(erro);
    }
   });

  }




}
