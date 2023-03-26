import * as functions from "firebase-functions";
import { auth } from "./init";
import * as admin from "firebase-admin";

interface authRequest extends functions.Request {
	uid: string; // or any other type,
	admin: string;
}

export function getUserCredentialsMiddleware(
	req: authRequest,
	res: functions.Response,
	next: any
) {
	functions.logger.debug(
		`Attempting to extract user credentials from request.`
	);

	const jwt = req.headers.authorization;

	if (jwt) {
		auth
			.verifyIdToken(jwt)
			.then((jwtPayload: admin.auth.DecodedIdToken) => {
				req["uid"] = jwtPayload.uid;
				req["admin"] = jwtPayload.admin;

				functions.logger.debug(
					`Credentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`
				);

				next();
			})
			.catch((err: Error) => {
				console.log("Error ocurred while validating JWT", err);
				next();
			});
	} else {
		next();
	}
}
