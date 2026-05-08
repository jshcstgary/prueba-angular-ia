import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToastComponent } from "./components/toast/toast.component";

@NgModule({
	declarations: [SidebarComponent, HeaderComponent, ToastComponent],
	imports: [CommonModule, RouterModule],
	exports: [SidebarComponent, HeaderComponent, ToastComponent]
})
export class SharedModule {}
