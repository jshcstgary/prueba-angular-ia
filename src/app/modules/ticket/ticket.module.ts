import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TicketRoutingModule } from "./ticket-routing.module";
import { TicketComponent } from "./pages/ticket/ticket.component";
import { TicketModalComponent } from "./components/ticket-modal/ticket-modal.component";

@NgModule({
	declarations: [TicketComponent, TicketModalComponent],
	imports: [CommonModule, TicketRoutingModule, ReactiveFormsModule]
})
export class TicketModule {}
