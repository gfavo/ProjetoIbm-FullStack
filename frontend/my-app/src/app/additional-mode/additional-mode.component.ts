import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../services/candidatos.service';
import { Candidato } from 'src/models/candidato';
import { Status } from 'src/models/status';

@Component({
  selector: 'app-additional-mode',
  templateUrl: './additional-mode.component.html',
  styleUrls: ['./additional-mode.component.sass'],
})
export class AdditionalModeComponent implements OnInit {
  constructor(private candidatoService: CandidatoService) {}

  ngOnInit(): void {
    this.candidatoService.resetApi().subscribe();
  }

  id = 0;
  nome = '';
  title = 'my-app';

  candidatos: Candidato[] = [];
  aprovados: string[] = [];

  iniciarProcesso() {
    this.candidatoService.iniciarProcesso(this.nome).subscribe(
      (resposta) => {
        this.id = resposta;
        this.candidatos.push({
          nome: this.nome,
          status: Status.Recebido,
          codCandidato: this.id,
        });
        console.log(this.candidatos);
      },
      (erro) => {
        alert(erro['error']['message']);
        console.log(erro);
      }
    );
  }

  aprovado(status: Status | null): boolean {
    if (status == Status.Aprovado) return true;
    return false;
  }

  aprovadosExsitem(): boolean {
    if (this.aprovados.length > 0) {
      return true;
    }
    return false;
  }

  getAcaoCandidato(status: Status | null): string {
    switch (status) {
      case Status.Recebido:
        return 'Marcar Entrevista';
        break;
      case Status.Qualificado:
        return 'Aprovado';
        break;
      default:
        return '';
        break;
    }
  }

  acaoCandidato(status: Status | null, codCandidato: number | null) {
    let codigo: number = <number>codCandidato;
    switch (status) {
      case Status.Recebido:
        this.candidatoService.marcarEntrevista(codigo).subscribe(
          (resposta) => {
            this.candidatos.find((x) => {
              if (x.codCandidato == codigo) x.status = Status.Qualificado;
            });

            console.log(resposta);
          },
          (erro) => {
            alert(erro['error']['message']);
            console.log(erro);
          }
        );
        break;
      case Status.Qualificado:
        this.candidatoService.aprovarCandidato(codigo).subscribe(
          (resposta) => {
            this.candidatos.find((x) => {
              if (x.codCandidato == codigo) x.status = Status.Aprovado;
            });

            console.log(resposta);
          },
          (erro) => {
            alert(erro['error']['message']);
            console.log(erro);
          }
        );
        break;
      default:
        break;
    }
  }

  desqualificarCandidato(codCandidato: number | null) {
    let codigo: number = <number>codCandidato;
    this.candidatoService.desqualificarCandidato(codigo).subscribe(
      (resposta) => {
        this.candidatos.splice(
          this.candidatos.indexOf(
            this.candidatos.find((x) => x.codCandidato === codigo)!
          ),
          1
        );

        console.log(resposta);
      },
      (erro) => {
        alert(erro['error']['message']);
        console.log(erro);
      }
    );
  }

  listarAprovados() {
    this.candidatoService.obterAprovados().subscribe(
      (resposta) => {
        this.aprovados = resposta;

        console.log(resposta);
      },
      (erro) => {
        alert(erro['error']['message']);
        console.log(erro);
      }
    );
  }
}
