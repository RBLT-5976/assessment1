import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Message } from "../entity";
import { SocketsService } from "../sockets.service";
import { Router } from "@angular/router";
import { ChannelService } from "../channel.service";
import { UserService } from "../user.service";
import { User } from "../entity";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  ioConnection: any;
  messagetext = "";
  channelId;
  channelName;
  users;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private socketservice: SocketsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.length == 0) {
      this.router.navigateByUrl("/login");
    }

    this.channelId = this.route.snapshot.paramMap.get("id");

    this.channelService.getChannel(this.channelId).subscribe(channel => {
      // console.log('channel::' + JSON.stringify(channel));
      this.channelName = channel[0].name;
    });

    // this.getUsers(this.channelId);
    this.getUsers();

    this.socketservice.initSocket();
    this.ioConnection = this.socketservice
      .onMessage()
      .subscribe((message: Message[]) => {
        this.messages = message;
        console.log(this.messages);
      });

    this.socketservice.chat(null);
  }

  // get all the users
  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  add(username: string): void {
    username = username.trim();
    const email = "example@me.com";
    if (!username) {
      return;
    }
    if (!email) {
      return;
    }

    this.userService.addUser({ username, email } as User).subscribe(user => {
      this.getUsers();
    });
  }

  // delete a user
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }

  chat() {
    if (this.messagetext) {
      const today = new Date();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.socketservice.chat(
        new Message(
          this.messagetext,
          time,
          JSON.parse(sessionStorage.getItem("user"))
        )
      );
      this.messagetext = null;
    } else {
      console.log("no message");
    }
  }
}
