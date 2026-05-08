import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModuleRoutingModule } from "./module-routing.module";
import { ModuleComponent } from "./pages/module/module.component";

@NgModule({
	declarations: [ModuleComponent],
	imports: [CommonModule, ModuleRoutingModule]
})
export class ModuleModule {}
