import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Group, User } from "../entity";
import { UserService } from "../user.service";
@Component({
  selector: "app-group-detail",
  templateUrl: "./group-detail.component.html",
  styleUrls: ["./group-detail.component.css"]
})
export class GroupDetailComponent implements OnInit {
  @Input() group: Group;

  users;
  // groupName: string;
  groupId: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    // this.groupName =
    this.groupId = this.route.snapshot.paramMap.get("id");
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  // add a user with username and email
  add(username: string, email: string): void {
    username = username.trim();
    email = email.trim();
    if (!username) {
      return;
    }
    if (!email) {
      return;
    }

    this.userService.addUser({ username, email } as User).subscribe(user => {
      this.users.push(user);
    });
  }

  edit(user) {
    this.router.navigate(["/userdetail/" + user.username]);
  }

  // updateUser(user: User): void {
  //   user.groupList.push(this.groupId);
  //   this.userService.updateUser(user).subscribe(user => {
  //     this.users.push(user);
  //   });
  // }

  delete(user: User): void {
    this.users = this.users.filter(g => g !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
