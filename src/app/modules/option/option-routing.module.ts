import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OptionComponent } from "./pages/option/option.component";

const routes: Routes = [
	{
		path: "",
		component: OptionComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OptionRoutingModule {}
