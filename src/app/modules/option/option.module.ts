import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OptionRoutingModule } from "./option-routing.module";
import { OptionComponent } from "./pages/option/option.component";
import { OptionModalComponent } from "./components/option-modal/option-modal.component";

@NgModule({
	declarations: [OptionComponent, OptionModalComponent],
	imports: [CommonModule, OptionRoutingModule, ReactiveFormsModule]
})
export class OptionModule {}
