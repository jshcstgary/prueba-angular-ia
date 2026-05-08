import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard, publicGuard } from "./guards/auth.guard";

const routes: Routes = [
	{
		path: "modules",
		canActivate: [authGuard],
		loadChildren: () => import("./modules/module/module.module").then((m) => m.ModuleModule)
	},
	{
		path: "options",
		canActivate: [authGuard],
		loadChildren: () => import("./modules/option/option.module").then((m) => m.OptionModule)
	},
	{
		path: "profiles",
		canActivate: [authGuard],
		loadChildren: () => import("./modules/profile/profile.module").then((m) => m.ProfileModule)
	},
	{
		path: "auth",
		canActivate: [publicGuard],
		loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)
	},
	{
		path: "tickets",
		canActivate: [authGuard],
		loadChildren: () => import("./modules/ticket/ticket.module").then((m) => m.TicketModule)
	},
	{
		path: "",
		redirectTo: "tickets",
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
