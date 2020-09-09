import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService }  from '../user.service';
import { User } from '../entity';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
  }

  checkClicked(val){
    this.user.ofGroupAdminsRole = !val;       
  }
}
