import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./entity";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersUrl = "http://localhost:3000/api/users"; // URL to web api
  private loginUrl = "http://localhost:3000/api/login";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  checkUser(username: string, password: string): Observable<User> {
    const url = `${this.loginUrl}`;
    const user = {
      username: username,
      password: password
    };
    return this.http.post<User>(url, user, this.httpOptions);
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    // console.log("test111");
    return this.http.get<User[]>(this.usersUrl);
  }

  /** GET hero by id. Will 404 if id not found */
  getUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;
    // console.log(username);
    return this.http.get<User>(url);
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.username}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.username}`;
    return this.http.put(url, user, this.httpOptions);
  }

  /** Log a GroupService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GroupService: ${message}`);
  }
}
