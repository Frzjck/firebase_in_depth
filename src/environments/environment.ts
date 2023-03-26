// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	useEmulators: true,
	firebase: {
		apiKey: "AIzaSyCn0-GtIKAZLYF9-O5F9Fr-joPfBNbWDhs",
		authDomain: "fir-course-931b2.firebaseapp.com",
		projectId: "fir-course-931b2",
		storageBucket: "fir-course-931b2.appspot.com",
		messagingSenderId: "76524530665",
		appId: "1:76524530665:web:9ffba8519aefce81637978",
	},
	api: {
		createUser: "http://127.0.0.1:5001/fir-course-931b2/us-central1/createUser",
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/plugins/zone-error"; // Included with Angular CLI.
