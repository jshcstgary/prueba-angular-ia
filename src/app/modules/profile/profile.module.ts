import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./pages/profile/profile.component";

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, ProfileRoutingModule]
})
export class ProfileModule {}
