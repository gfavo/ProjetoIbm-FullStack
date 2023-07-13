package com.example.projetoIbm.models;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Candidato {

    private String nome;
    private Status status;
    private int codCandidato;


    public Candidato() {}
    public Candidato(String nome) {
        this.nome = nome;
        this.status = Status.Recebido;
    }


}