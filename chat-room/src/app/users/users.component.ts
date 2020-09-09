import { Component, OnInit } from '@angular/core';
import { User } from '../entity';
import { UserService } from '../user.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  
  constructor(private userService: UserService, private router: Router) { }

  session;
  ngOnInit() {
    if (sessionStorage.length == 0){
      this.router.navigateByUrl('/login');
    }
    else {
      this.session = sessionStorage.getItem("user");
      if (JSON.parse(this.session).ofGroupAdminsRole){
        this.getUsers();
      }
    }
  }

  root(): void {
    this.router.navigateByUrl('');
  }

  search(): void {
    this.router.navigateByUrl('/search');
  }

  // get all the users
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  // add a user with username and email
  add(username: string, email:string): void {
    username = username.trim();
    email = email.trim();
    if (!username) { return;}
    if(!email) {return;}

    this.userService.addUser({ username, email } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
  
  // delete a user
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
