import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { GroupsComponent } from "./groups/groups.component";
import { UsersComponent } from "./users/users.component";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "groups", component: GroupsComponent },
  { path: "users", component: UsersComponent },
  { path: "groupdetail/:id", component: GroupDetailComponent },
  { path: "userdetail/:username", component: UserDetailComponent },
  { path: "chat/:id", component: ChatComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
