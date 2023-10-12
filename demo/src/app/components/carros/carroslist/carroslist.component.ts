import { CarroService } from './../../../services/carro.service';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carro';

@Component({
  selector: 'app-carroslist',
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {

  lista: Carro[] = [];

  carroSelecionadoParaEdicao: Carro = new Carro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  CarroService = inject(CarroService);


  constructor(){
      this.listAll();
  }

  listAll(){
    this.CarroService.listAll().subscribe({
      next:lista =>{
        this.lista = lista;
      },
      error:erro =>{
        alert("Erro, veja no console");
        console.log(erro);

      }
    });
  }

  adicionar(modal : any){
    this.carroSelecionadoParaEdicao = new Carro();

    this.modalService.open(modal, {size: 'sm'});
  }

  editar(modal: any, carro: Carro, indice: number){
    this.carroSelecionadoParaEdicao = Object.assign({}, carro);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, { size:'sm' });
  }

  deletar(carro : Carro){
    this.CarroService.deletar(carro.id).subscribe(
      ()=>{
        this.listAll();
      }
    );
  }

  addOuEditarCarro(carro : Carro){
    this.listAll();
    this.modalService.dismissAll();
  }

}
