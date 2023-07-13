package com.example.projetoIbm.controller;

import com.example.projetoIbm.models.Candidato;
import com.example.projetoIbm.service.ApiService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/api/v1/hiring", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiController {

    @Autowired
    private ApiService apiService;

    @GetMapping("/info")
    public String infoServidor() {
        return "Servidor funcionando";
    }

    @PostMapping("/start")
    @ResponseBody
    public ResponseEntity<Integer> iniciarProcesso(@RequestBody Candidato candidato) {
        try {
            int codigo = apiService.iniciarProcesso(candidato.getNome());
            return new ResponseEntity<Integer>(codigo, HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
                                                          
    }

    @PostMapping("/schedule")
    @ResponseBody
    public ResponseEntity<Map<String, String>> marcarEntrevista(@RequestBody Candidato candidato) {
        try {
            apiService.marcarEntrevista(candidato.getCodCandidato());
            Map<String, String> body = new HashMap<>();
            body.put("message", "Candidato teve sua entrevista marcada com sucesso!");
            return new ResponseEntity(body, HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @PostMapping("/disqualify")
    @ResponseBody
    public ResponseEntity<Map<String, String>> desqualificarCandidato(@RequestBody Candidato candidato) {
        try {
            apiService.desqualificarCandidato(candidato.getCodCandidato());
            Map<String, String> body = new HashMap<>();
            body.put("message", "Candidato desqualificado com sucesso");
            return new ResponseEntity(body, HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @PostMapping("/approve")
    @ResponseBody
    public ResponseEntity<Map<String, String>> aprovarCandidato(@RequestBody Candidato candidato) {
        try {
            apiService.aprovarCandidato(candidato.getCodCandidato());
            Map<String, String> body = new HashMap<>();
            body.put("message", "Candidato aprovado com sucesso");
            return new ResponseEntity(body, HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @GetMapping("/approved")
    @ResponseBody
    public ResponseEntity<List<String>> aprovados() {
        try {
            List<String> aprovados = apiService.obterAprovados();
            return new ResponseEntity<List<String>>(aprovados,HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

    }

    @GetMapping("status/candidate/{id}")
    public ResponseEntity<String> statusCandidato(@PathVariable Integer id) {
        try {
            return new ResponseEntity<String>(apiService.verificarStatusCandidato(id), HttpStatus.OK);
        }  catch (RuntimeException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/reset")
    public ResponseEntity resetApi() {
        try {
            apiService.resetarApi();
            return new ResponseEntity(HttpStatus.OK);
        }  catch (RuntimeException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

}
