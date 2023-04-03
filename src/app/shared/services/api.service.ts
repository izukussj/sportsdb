import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../../shared/interfaces/match';
  
@Injectable({
  providedIn: 'root'
})
export class APIService {
  private url = 'https://matchs.free.beeceptor.com/matchs';
   
  constructor(private httpClient: HttpClient) { }
  
  getLatestMatches(): Observable<Match[]> {
    return this.httpClient.get<Match[]>(this.url);
  }
}