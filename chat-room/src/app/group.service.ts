import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Group } from "./entity";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class GroupService {
  private groupsUrl = "http://localhost:3000/api/groups"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET groups from the server */
  getGroups(): Observable<Group[]> {
    // console.log("getGroups");
    return this.http.get<Group[]>(this.groupsUrl);
  }

  /** GET hero by id. Will 404 if id not found */
  getGroup(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url);
  }

  /** POST: add a new hero to the server */
  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group, this.httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deleteGroup(group: Group | number): Observable<Group> {
    const id = typeof group === "number" ? group : group.id;
    const url = `${this.groupsUrl}/${id}`;

    return this.http.delete<Group>(url, this.httpOptions);
  }

  /** PUT: update the hero on the server */
  updateGroup(group: Group): Observable<any> {
    return this.http.put(this.groupsUrl, group, this.httpOptions);
  }

  /** Log a GroupService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GroupService: ${message}`);
  }
}
