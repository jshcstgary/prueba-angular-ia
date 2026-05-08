import { Component } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	standalone: false
})
export class HeaderComponent {
	public userName = "Mauricio Castillo";
	public userRole = "Administrador del Sistema";
}
