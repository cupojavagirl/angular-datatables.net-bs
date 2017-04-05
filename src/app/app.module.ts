import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppComponent }     from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { DatatableModule }  from "./datatable/datatable.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        DatatableModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
