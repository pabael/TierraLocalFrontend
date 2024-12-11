import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";

@NgModule({
  declarations: [
    ErrorPageComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainMenuComponent
  ]
})

export class SharedModule{ }
