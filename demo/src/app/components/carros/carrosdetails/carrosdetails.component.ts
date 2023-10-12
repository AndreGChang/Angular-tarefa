import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carro';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-carrosdetails',
  templateUrl: './carrosdetails.component.html',
  styleUrls: ['./carrosdetails.component.scss']
})
export class CarrosdetailsComponent {

  @Input() carro: Carro = new Carro();
  @Output() retorno = new EventEmitter<Carro>();

  carroService = inject(CarroService);
  modalService = inject(NgbModal);

  constructor(){

  }

  salvar(){
    this.carroService.save(this.carro).subscribe({
      next: carro =>{
        this.retorno.emit(carro);

      },
      error:erro =>{
        alert("Erro, ver no console");
        console.log(erro);

      }
    });

  }

  editar(){
    this.carroService.verify(this.carro).subscribe({
      next: carro =>{
        this.retorno.emit(carro);
        console.log(carro);
      },
      error: erro =>{

      }
    });
  }

  adicionar(modal : any){
    //this.carroSelecionadoParaEdicao = new Carro();
    //esse e um exemplo de como posso adicionar varias coisas em um unico objeto
    //atraves de modal
    this.modalService.open(modal, {size: 'sm'});
  }
}
