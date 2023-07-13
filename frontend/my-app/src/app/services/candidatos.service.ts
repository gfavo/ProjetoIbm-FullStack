import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Candidato } from "src/models/candidato";

@Injectable({
    providedIn: 'root'
})
export class CandidatoService {
    constructor(private http:HttpClient){};

    private HTTPOptions:Object = {
        responseType: 'text'
     }
    
    private url = 'http://localhost:8080/api/v1/hiring';

    public iniciarProcesso(nome:string): Observable<any>{
        const corpo:Candidato = new Candidato();
        corpo.nome = nome;

        return this.http.post<any>(this.url+"/start", corpo);
    }

    public marcarEntrevista(cod:number): Observable<any>{
        const corpo:Candidato = new Candidato();
        corpo.codCandidato = cod;
        return this.http.post<any>(this.url+"/schedule", corpo);
    }

    public aprovarCandidato(cod:number): Observable<any>{
        const corpo:Candidato = new Candidato();
        corpo.codCandidato = cod;
        return this.http.post<any>(this.url+"/approve", corpo);
    }

    public desqualificarCandidato(cod:number): Observable<any>{
        const corpo:Candidato = new Candidato();
        corpo.codCandidato = cod;
        return this.http.post<any>(this.url+"/disqualify", corpo);
    }

    public obterAprovados(): Observable<string[]>{
        return this.http.get<any>(this.url+"/approved");
    }
    
    public statusCandidato(cod:number): Observable<string>{
        return this.http.get<any>(this.url+"/status/candidate/"+cod, this.HTTPOptions);
    }

    public resetApi(): Observable<any>{
        return this.http.delete(this.url+"/reset");
    }
}