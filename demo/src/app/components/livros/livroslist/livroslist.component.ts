import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livroslist',
  templateUrl: './livroslist.component.html',
  styleUrls: ['./livroslist.component.scss']
})
export class LivroslistComponent {
  lista: Livro[] = [];

  livroSelecionadoParaEdicao: Livro = new Livro();
  indiciSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  LivroService = inject(LivroService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.LivroService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        console.log(erro);
      }
    })
  }

  adicionar(modal: any) {
    this.livroSelecionadoParaEdicao = new Livro();

    this.modalService.open(modal, { size: "sm" });
  }

  editar(modal: any, livro: Livro, indice: number) {
    this.livroSelecionadoParaEdicao = Object.assign({}, livro);
    this.indiciSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: "sm" });
  }

  deletar(livro: Livro) {
    this.LivroService.deletar(livro.id).subscribe(
      () => {
        this.listAll();
      }
    )
  }

  addOuEditarLivro(Livro: Livro) {
    this.listAll();
    this.modalService.dismissAll();
  }

}
