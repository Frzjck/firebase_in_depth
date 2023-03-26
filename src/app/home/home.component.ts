import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { CoursesService } from "../services/courses.service";
import { inject } from "@angular/core/testing";
import { UserService } from '../services/user.service';

@Component({
	selector: "home",
	template: ` 
	
<div class="courses-panel">

<div class="header">

	<h2 class="title">All Courses</h2>

	<ng-container *ngIf="(user.roles$ | async) as roles">

		<ng-container *ngIf="roles.admin">

			<button mat-mini-fab color="accent" routerLink="/create-course">
				<mat-icon class="add-course-btn">add</mat-icon>
			</button>

		</ng-container>

	</ng-container>



</div>

<mat-tab-group>

	<mat-tab label="Beginners">

		<courses-card-list [courses]="beginnersCourses$ | async"
			(courseEdited)="reloadCourses()"
			(courseDeleted)="reloadCourses()">

		</courses-card-list>

	</mat-tab>

	<mat-tab label="Advanced">

		<courses-card-list [courses]="advancedCourses$ | async"
						   (courseEdited)="reloadCourses()"
						   (courseDeleted)="reloadCourses()">

		</courses-card-list>

	</mat-tab>

</mat-tab-group>

</div>

`,
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	courses$: Observable<Course[]>;

	beginnersCourses$: Observable<Course[]>;

	advancedCourses$: Observable<Course[]>;

	constructor(private router: Router, private coursesService: CoursesService, public user: UserService) {}

	ngOnInit() {
		this.reloadCourses();
	}

	reloadCourses() {
		this.beginnersCourses$ =
			this.coursesService.loadCoursesByCategory("BEGINNER");
		this.advancedCourses$ =
			this.coursesService.loadCoursesByCategory("ADVANCED");
	}
}


// <div class="courses-panel">
// 		<div class="header">
// 			<h2 class="title">All Courses</h2>

// 			<button mat-mini-fab color="accent" routerLink="/create-course">
// 				<mat-icon class="add-course-btn">add</mat-icon>
// 			</button>
// 		</div>

// 		<mat-tab-group>
// 			<mat-tab label="Beginners">
// 				<courses-card-list
// 					[courses]="beginnersCourses$ | async"
// 					(courseEdited)="reloadCourses()"
// 					(courseDeleted)="reloadCourses()"
// 				></courses-card-list>
// 			</mat-tab>

// 			<mat-tab label="Advanced">
// 				<courses-card-list
// 					[courses]="advancedCourses$ | async"
// 					(courseEdited)="reloadCourses()"
// 					(courseDeleted)="reloadCourses()"
// 				></courses-card-list>
// 			</mat-tab>
// 		</mat-tab-group>
// 	</div>
// 	--------------