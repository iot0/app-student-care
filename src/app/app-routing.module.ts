import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule", canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule", canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "register", loadChildren: "./register/register.module#RegisterPageModule" },
  { path: "welcome", loadChildren: "./welcome/welcome.module#WelcomePageModule" },
  { path: 'exam', loadChildren: './exam/exam.module#ExamPageModule' },
  { path: 'students', loadChildren: './students/students.module#StudentsPageModule' },
  { path: 'teachers', loadChildren: './teachers/teachers.module#TeachersPageModule' },
  { path: "student", redirectTo: "student/" },
  { path: 'student/:id', loadChildren: './student/student.module#StudentPageModule' },
  { path: "teacher", redirectTo: "teacher/" },
  { path: 'teacher/:id', loadChildren: './teacher/teacher.module#TeacherPageModule' },
  { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule', canActivate: [AuthGuard], canLoad: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
