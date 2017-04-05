import { Component, OnInit } from '@angular/core';
import {HeroService} from "./hero.service";
import {Hero} from "./hero";

@Component({
    selector: 'example',
    templateUrl: 'example.component.html',
    providers:  [ HeroService ]
})
export class ExampleComponent implements OnInit {
    heroes: Hero[];
    DTOptions:any = {
        "pageLength": 5,
        "lengthMenu": [ 5, 10, 25, 50, 75, 100 ]
    }

    constructor(service: HeroService) {
        service.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() { }

}