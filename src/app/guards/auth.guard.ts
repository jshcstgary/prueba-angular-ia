import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const authService = inject(AuthService);
	const jwt = localStorage.getItem("jwt");

	if (!jwt) {
		router.navigate(["/auth"]);
		return false;
	}

	const user = authService.currentUser();
	if (!user) {
		// If JWT exists but user data is missing, we might need to fetch it or logout
		// For simplicity in this mock, we redirect to auth
		router.navigate(["/auth"]);
		return false;
	}

	const role = user.profile.name;
	const path = state.url;

	// Admin: Total access
	if (role === "Admin") {
		return true;
	}

	// Support: /tickets and /users
	if (role === "Support") {
		if (path.startsWith("/tickets") || path.startsWith("/users")) {
			return true;
		}
		router.navigate(["/tickets"]);
		return false;
	}

	// Cliente: /tickets only
	if (role === "Cliente") {
		if (path.startsWith("/tickets")) {
			return true;
		}
		router.navigate(["/tickets"]);
		return false;
	}

	return true;
};

export const publicGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const jwt = localStorage.getItem("jwt");

	if (!jwt) {
		return true;
	}

	router.navigate(["/tickets"]);
	return false;
};
