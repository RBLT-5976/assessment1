import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string = "";
  error: boolean = false;
  hidemessage: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.username = this.username.trim();
    this.password = this.password.trim();
    if (!this.username) {
      return;
    }
    this.userService.checkUser(this.username, this.password).subscribe(user => {
      // console.log(user);
      if (user != null) {
        sessionStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["/groups"]);
        console.log("return user:" + user);

        // if (user.ofGroupAdminsRole) {
        // } else {

        //   // this.router.navigate(["/userdetail", user.username]);
        // }
      }
    });
  }
}
