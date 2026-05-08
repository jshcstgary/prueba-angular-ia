import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OptionRoutingModule } from "./option-routing.module";
import { OptionComponent } from "./pages/option/option.component";

@NgModule({
	declarations: [OptionComponent],
	imports: [CommonModule, OptionRoutingModule]
})
export class OptionModule {}
