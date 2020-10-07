import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as socketIo from "socket.io-client";
const SERVER_URL = "http://localhost:3000";
import { Message } from "./entity";

@Injectable({
  providedIn: "root"
})
export class SocketsService {
  private socket;
  constructor() {}
  initSocket() {
    this.socket = socketIo(SERVER_URL);
  }

  updatelist() {
    this.socket.emit("updatelist", "list please");
  }

  onNewlist() {
    let observable = new Observable(observer => {
      this.socket.on("newlist", data => observer.next(data));
    });
    return observable;
  }

  onMessage() {
    let observable = new Observable(observer => {
      this.socket.on("message", data => observer.next(data));
    });
    return observable;
  }
  chat(message: Message) {
    this.socket.emit("message", message);
  }
  prodcount() {
    this.socket.emit("prodcount", "count please");
  }
  onProdcount() {
    let observable = new Observable(observer => {
      this.socket.on("prodcount", data => observer.next(data));
    });
    return observable;
  }
}
