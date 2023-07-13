import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../services/candidatos.service';

@Component({
  selector: 'app-legacy-mode',
  templateUrl: './legacy-mode.component.html',
  styleUrls: ['./legacy-mode.component.sass'],
})
export class LegacyModeComponent implements OnInit {
  constructor(private candidatoService: CandidatoService) {}

  ngOnInit(): void {
    this.candidatoService.resetApi();
  }

  output: string = '';
  id: number = 0;
  nome: string = '';
  iniciarProcesso() {
    this.candidatoService.iniciarProcesso(this.nome).subscribe(
      (resposta) => {
        this.output = JSON.stringify(resposta);
      },
      (erro) => {
        this.output = erro['error']['message'];
      }
    );
  }
  listarAprovados() {
    this.candidatoService.obterAprovados().subscribe(
      (resposta) => {
        this.output = JSON.stringify(resposta);
      },
      (erro) => {
        this.output = erro['error']['message'];
      }
    );
  }

  marcarEntrevista() {
    this.candidatoService.marcarEntrevista(this.id).subscribe(
      (resposta) => {
        this.output = JSON.stringify(resposta);
      },
      (erro) => {
        this.output = erro['error']['message'];
      }
    );
  }

  aprovarCandidato() {
    this.candidatoService.aprovarCandidato(this.id).subscribe(
      (resposta) => {
        this.output = JSON.stringify(resposta);
      },
      (erro) => {
        this.output = erro['error']['message'];
      }
    );
  }
  desqualificarCandidato() {
    this.candidatoService.desqualificarCandidato(this.id).subscribe(
      (resposta) => {
        this.output = JSON.stringify(resposta);
      },
      (erro) => {
        this.output = erro['error']['message'];
      }
    );
  }
  statusCandidato() {
    this.candidatoService.statusCandidato(this.id).subscribe(
      (resposta) => {
        this.output = resposta;
      },
      (erro) => {
        this.output = JSON.parse(erro['error'])['message'];
      }
    );
  }
}
