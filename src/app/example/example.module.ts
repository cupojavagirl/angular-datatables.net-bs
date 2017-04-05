import { NgModule } from '@angular/core';
import {ExampleComponent} from "./example.component";
import {CommonModule} from "@angular/common";
import {ExampleRoutingModule} from "./example-routing.module";
import {DatatableModule} from "../datatable/datatable.module";


@NgModule({
    imports: [
        CommonModule,
        ExampleRoutingModule,
        DatatableModule
    ],
    exports: [],
    declarations: [
        ExampleComponent
    ],
    providers: [],
})
export class ExampleModule { }
