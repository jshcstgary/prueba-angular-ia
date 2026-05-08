import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "modules",
		loadChildren: () => import("./modules/module/module.module").then((m) => m.ModuleModule)
	},
	{
		path: "options",
		loadChildren: () => import("./modules/option/option.module").then((m) => m.OptionModule)
	},
	{
		path: "profiles",
		loadChildren: () => import("./modules/profile/profile.module").then((m) => m.ProfileModule)
	},
	{
		path: "",
		redirectTo: "modules",
		pathMatch: "full"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
