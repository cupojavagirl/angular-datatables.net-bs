import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExampleModule} from "./example/example.module";
import {AppComponent} from "./app.component";

const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: '', redirectTo: 'example', pathMatch: 'full' },
    {
        path: 'example',
        children: [
            // { path: 'heroes', loadChildren : () => HeroesModule },
            { path: '', loadChildren : () => ExampleModule },
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
