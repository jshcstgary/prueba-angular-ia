import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const jwt = localStorage.getItem("jwt");

	if (jwt) {
		return true;
	}

	router.navigate(["/auth"]);
	return false;
};

export const publicGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const jwt = localStorage.getItem("jwt");

	if (!jwt) {
		return true;
	}

	router.navigate(["/modules"]);
	return false;
};
