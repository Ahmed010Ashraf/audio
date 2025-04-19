import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http:HttpClient) { }

  uploadAudio(formData:FormData):Observable<any>{
    return this.http.post(`https://audioretrievalapi.runasp.net/api/audio`,formData)
  }

  getAllAudio():Observable<any>{
    return this.http.get("https://audioretrievalapi.runasp.net/api/audio")
  }


  search(params : HttpParams):Observable<any>{
    return this.http.get("https://audioretrievalapi.runasp.net/api/audio/search" , {params})
  }
}
