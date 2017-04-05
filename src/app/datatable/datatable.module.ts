import { NgModule } from '@angular/core';

import { DatatableComponent } from './datatable.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ DatatableComponent ],
    declarations: [ DatatableComponent ],
    providers: [],
})
export class DatatableModule { }
