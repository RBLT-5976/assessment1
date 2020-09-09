import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-room';

  showLogout = false;
  constructor(private router: Router) { }

  ngOnInit() {
    if(sessionStorage.length != 0)
    {
      this.showLogout = true;
    }
  }

  itemClicked(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    this.showLogout = false;

  }

}
