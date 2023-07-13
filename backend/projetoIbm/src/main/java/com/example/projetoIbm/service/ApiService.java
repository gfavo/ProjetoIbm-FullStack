package com.example.projetoIbm.service;

import com.example.projetoIbm.models.Status;
import com.example.projetoIbm.models.Candidato;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApiService {


   // private static ApiService uniqueInstance = new ApiService();

    private ApiService(){}

//    public static ApiService getInstance(){
//        return uniqueInstance;
//    }

    private int currentId = 0;
    public Map<Integer, Candidato> candidatos = new HashMap<Integer, Candidato>();

    public List<String> nomesCandidatosPresentes = new ArrayList<String>();

    public boolean candidatoPresente(String nomeCandidato) {
        boolean presente = false;
        if (!nomesCandidatosPresentes.isEmpty()) {
            for (int i = 0; i < nomesCandidatosPresentes.size(); i++) {
                if (nomesCandidatosPresentes.get(i).equals(nomeCandidato)) {
                    presente = true;
                }
            }
        }
        return presente;
    }

    public int iniciarProcesso(String nome) {
        if (nome.matches("[a-zA-Z ]*") && nome.length() > 0) {
            if (candidatoPresente(nome) == true) {
                throw new RuntimeException("Candidato já presente no processo!");
            } else {
                Candidato novoCandidato = new Candidato(nome);
                candidatos.put(++currentId, novoCandidato);
                nomesCandidatosPresentes.add(nome);
                return currentId;
            }
        } else {
            throw new RuntimeException("Nome inválido!");
        }
    }

    public void marcarEntrevista(int codCandidato) {
        if (candidatos.get(codCandidato) != null) {
            if (candidatos.get(codCandidato).getStatus() == Status.Recebido) {
                candidatos.get(codCandidato).setStatus(Status.Qualificado);
            } else if (candidatos.get(codCandidato).getStatus() == Status.Qualificado) {
                throw new RuntimeException("Candidato ja tem entrevista marcada!");
            } else {
                throw new RuntimeException("Candidato ja foi aprovado!");
            }
        } else {
            throw new RuntimeException("Candidato não existe!");
        }
    }

    public void desqualificarCandidato(int codCandidato) {
        if (candidatos.get(codCandidato) != null) {
            String nome = candidatos.get(codCandidato).getNome();
            candidatos.remove(codCandidato);
            nomesCandidatosPresentes.remove(nome);
        } else {
            throw new RuntimeException("Candidato não existe!");
        }
    }

    public String verificarStatusCandidato(int codCandidato) {
        if (candidatos.get(codCandidato) != null) {
            return candidatos.get(codCandidato).getStatus().name();
        } else {
            throw new RuntimeException("Candidato não existe!");
        }
    }

    public void aprovarCandidato(int codCandidato) {
        if (candidatos.get(codCandidato) != null) {
            if (candidatos.get(codCandidato).getStatus() == Status.Qualificado) {
                candidatos.get(codCandidato).setStatus(Status.Aprovado);
            } else if (candidatos.get(codCandidato).getStatus() == Status.Aprovado) {
                throw new RuntimeException("Candidato já foi aprovado!");
            } else {
                throw new RuntimeException("Candidato ainda não está qualificado!");
            }
        } else {
            throw new RuntimeException("Candidato não existe!");
        }
    }

    public List<String> obterAprovados() {
        List<String> aprovados = new ArrayList<String>();

        candidatos.forEach((key, value) -> {
            if (value.getStatus() == Status.Aprovado) {
                aprovados.add(value.getNome());
            }
        });

        if (aprovados.isEmpty()) {
            aprovados.add("Nenhum candidato foi aprovado ainda!");
        }
        return aprovados;
    }

    public void resetarApi(){
        candidatos.clear();
        nomesCandidatosPresentes.clear();
        currentId = 0;
    }



}
