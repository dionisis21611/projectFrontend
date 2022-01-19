import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pet} from './pet';
import { environment } from 'src/environments/environment';
import {User} from './user';
import {Role} from './role';

@Injectable({providedIn: 'root'})
export class PetService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPet(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiServerUrl}/pet/all`);
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiServerUrl}/pet/add`, pet);
  }

  public updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiServerUrl}/pet/update`, pet);
  }

  public deletePet(petId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/pet/delete/${petId}`);
  }
  public findUserByUsernameAndPassword(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/User/byUsernamePassword`, user);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/User/add`, user);
  }
  public getRolesByUserId(userId: string): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}/User/RoleByUserId/${userId}`);
  }
}
