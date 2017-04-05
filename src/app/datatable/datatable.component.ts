import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

// import * as $ from "jquery";
// import {extend} from "jquery";
// declare var $:any;

// import '../../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css';
import '../../../../datatables.net-bs/css/dataTables.bootstrap.css';

import 'jquery';
import 'datatables.net-bs/js/dataTables.bootstrap';
declare var $:any;

@Component({
    selector: 'datatable',
    template: `
    <div *ngIf="show">
        <table style="visibility:hidden" class="table table-striped table-bordered table-hover datatable">
            <ng-content #content></ng-content>
            
            <tbody>
                <tr *ngFor="let item of data">
                    <td *ngFor="let v of order">{{item[v]}}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
    <div id="loading" [hidden]="loaded">
        <div class="page-spinner-bar">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div> 
    </div>
    `
})
export class DatatableComponent implements OnInit, AfterViewInit {

    _selector:any;
    @Input() options:any;
    order:Array<any>= [];

    @Output('loading') loading:EventEmitter<boolean> = new EventEmitter();
    loaded:boolean = false;

    @ViewChild('content') content:ElementRef;
    _show:boolean = true;
    private _data:Array<any>;

    get selector() {
        this._selector = $(this.el.nativeElement).find('table.datatable');
        return this._selector;
    }

    get show() { return this._show }
    set show(v:boolean) {
        if(v === false) $(this.selector).DataTable().destroy();
        this._show = v;
    }

    get data() { return this._data; }
    @Input() set data(v:Array<any>) {
        this._data = v;

        this.reload();
        // setTimeout(() => this.reload());
    }

    constructor(public el: ElementRef) { }

    ngOnInit() {
        this.options = this.config(this.options);

    }
    ngAfterViewInit() {
        this.checkOrder();
    }

    checkOrder() {
        let $th = $(this.selector).find('thead th[for]');
        if($th.length > 0) this.order = [];
        $th.each((i:number, el:any) => {
            let k = $(el).attr('for');
            this.order.push(k);
        });
    }

    reload() {
        this.DTReload()
        .subscribe(
            show => this.show = show,
            error => console.error('✖', error.message || error),
            () => {
                $(this.selector).css('visibility', 'visible');
            }
        )
    }

    DTReload():Observable<boolean> {

        let ob = new Observable((observer:any) => {
            let $blockHeight = $(this.el.nativeElement);

            let oHeight = 'auto';
            try { oHeight = $blockHeight[0].style.height; } catch(e){}
            if(oHeight === '') oHeight = 'auto';

            $blockHeight.css({
                height: $blockHeight.height()
            });

            observer.next(false);
            this.loading.emit(true);
            this.loaded = false;

            this.show = false;
            setTimeout(() => {
                observer.next(true);
                this.show = true;
                setTimeout(() => {
                    $(this.selector).DataTable(this.options);
                    $blockHeight.css({
                        height: oHeight
                    });

                    this.loading.emit(false);
                    this.loaded = true;
                    observer.complete();
                }, 100)
            }, 100)
        });

        return ob;
    }

    config(options:any={}) {
        let opt = {
            // "language": {
            //     "sEmptyTable": "Nenhum registro encontrado",
            //     "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            //     "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            //     "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            //     "sInfoPostFix": "",
            //     "sInfoThousands": ".",
            //     "sLengthMenu": "_MENU_ resultados por página",
            //     "sLoadingRecords": "Carregando...",
            //     "sProcessing": "Processando...",
            //     "sZeroRecords": "Nenhum registro encontrado",
            //     "sSearch": "Pesquisar",
            //     "oPaginate": {
            //         "sNext": "Próximo",
            //         "sPrevious": "Anterior",
            //         "sFirst": "Primeiro",
            //         "sLast": "Último"
            //     },
            //     "oAria": {
            //         "sSortAscending": ": Ordenar colunas de forma ascendente",
            //         "sSortDescending": ": Ordenar colunas de forma descendente"
            //     }
            // }
        }

        try {$.fn.dataTableExt.sErrMode = 'console'} catch(e){}

        return Object.assign(opt, options);
    }

}
