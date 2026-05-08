import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProfileModalComponent } from "./components/profile-modal/profile-modal.component";

@NgModule({
	declarations: [ProfileComponent, ProfileModalComponent],
	imports: [CommonModule, ProfileRoutingModule, ReactiveFormsModule]
})
export class ProfileModule {}
