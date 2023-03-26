import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { LoginComponent } from "./login/login.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import {
	AngularFireAuthGuard,
	hasCustomClaim,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from "@angular/fire/compat/auth-guard";
import { CreateUserComponent } from "./create-user/create-user.component";
import { CourseResolver } from "./services/course.resolver";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const adminOnly = () => hasCustomClaim("admin");

const redirectLoggedInToHome = () => redirectLoggedInTo([""]);

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: redirectUnauthorizedToLogin,
		},
	},
	{
		path: "create-course",
		component: CreateCourseComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: adminOnly,
		},
	},
	{
		path: "create-user",
		component: CreateUserComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: adminOnly,
		},
	},
	{
		path: "about",
		component: AboutComponent,
	},
	{
		path: "login",
		component: LoginComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: redirectLoggedInToHome,
		},
	},

	{
		path: "courses/:courseUrl",
		component: CourseComponent,
		resolve: {
			course: CourseResolver,
		},
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: redirectUnauthorizedToLogin,
		},
	},
	{
		path: "**",
		redirectTo: "/",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}