import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
	declarations: [SidebarComponent, HeaderComponent],
	imports: [CommonModule, RouterModule],
	exports: [SidebarComponent, HeaderComponent]
})
export class SharedModule {}
