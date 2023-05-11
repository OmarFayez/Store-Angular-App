import { NgModule } from "@angular/core";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";

@NgModule({
  imports: [
    NgProgressModule.withConfig({
      color: "#2196f3",
      trickleSpeed: 999,
      spinner: false,
    }),
    NgProgressHttpModule,
  ],
  exports: [NgProgressModule, NgProgressHttpModule],
})
export class NgxProgressBarModule {}
