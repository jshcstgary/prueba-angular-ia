import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ModuleRoutingModule } from "./module-routing.module";
import { ModuleComponent } from "./pages/module/module.component";
import { ModuleModalComponent } from "./components/module-modal/module-modal.component";

@NgModule({
	declarations: [ModuleComponent, ModuleModalComponent],
	imports: [CommonModule, ModuleRoutingModule, ReactiveFormsModule]
})
export class ModuleModule {}
