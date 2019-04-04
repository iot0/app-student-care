import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule", canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule", canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "register", loadChildren: "./register/register.module#RegisterPageModule" },
  { path: "welcome", loadChildren: "./welcome/welcome.module#WelcomePageModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
