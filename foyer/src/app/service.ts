import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userApiUrl = 'http://localhost:8099/gestion-users/users';
  private insEventApiUrl = 'http://localhost:8099/inscription-event/insEvents';
  private commentApiUrl = 'http://localhost:8099/microservice-forum/comment/retrieve-all-comments';
  private evenementApiUrl = 'http://localhost:8099/evenementproject/evenements';

  constructor(private http: HttpClient) {}

  // User Service Methods
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.userApiUrl}/${userId}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.userApiUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.userApiUrl}/${user.id}`, user);
  }

  // InsEvent Service Methods
  getAllInsEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.insEventApiUrl);
  }

  getInsEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.insEventApiUrl}/${id}`);
  }

  addInsEvent(insEvent: any): Observable<any> {
    return this.http.post<any>(this.insEventApiUrl, insEvent);
  }

  deleteInsEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.insEventApiUrl}/${id}`);
  }

  updateInsEvent(insEvent: any): Observable<any> {
    return this.http.put<any>(`${this.insEventApiUrl}/${insEvent.id}`, insEvent);
  }

  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.insEventApiUrl}/comments`);
  }

  getCommentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.insEventApiUrl}/comments/${id}`);
  }

  // Comment Service Methods
  getAllStandaloneComments(): Observable<any[]> {
    return this.http.get<any[]>(this.commentApiUrl);
  }

  getStandaloneCommentById(commentId: number): Observable<any> {
    return this.http.get<any>(`${this.commentApiUrl}/${commentId}`);
  }

  addStandaloneComment(comment: any): Observable<any> {
    return this.http.post<any>(this.commentApiUrl, comment);
  }

  deleteStandaloneComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.commentApiUrl}/${commentId}`);
  }

  updateStandaloneComment(comment: any): Observable<any> {
    return this.http.put<any>(`${this.commentApiUrl}/${comment.id}`, comment);
  }

  // Evenement Service Methods
  getAllEvenements(): Observable<any[]> {
    return this.http.get<any[]>(this.evenementApiUrl);
  }

  addEvenement(evenement: any): Observable<any> {
    return this.http.post<any>(this.evenementApiUrl, evenement);
  }

  updateEvenement(id: number, evenement: any): Observable<any> {
    return this.http.put<any>(`${this.evenementApiUrl}/${id}`, evenement);
  }

  deleteEvenement(id: number): Observable<string> {
    return this.http.delete<string>(`${this.evenementApiUrl}/${id}`);
  }
}
