/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { QueryCtrl } from 'app/plugins/sdk';
export declare class YNABQueryCtrl extends QueryCtrl {
    private templateSrv;
    static templateUrl: string;
    budgets: any[];
    dataTypes: any[];
    formatTypes: any[];
    defaults: {};
    /** @ngInject **/
    constructor($scope: any, $injector: any, templateSrv: any);
    getOptions(query: any): any;
    getBudgets(query: any): any;
    onChangeInternal(): void;
}
