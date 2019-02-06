/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class YNABDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    type: string;
    url: string;
    accessToken: string;
    headers: {};
    budgets: any[];
    q: any;
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    returnTableData(result: any, scopedVar: any): Promise<{
        data: {
            "columns": {
                "text": string;
                "type": string;
                "sort": boolean;
                "desc": boolean;
            }[];
            "rows": any[];
            "type": string;
        }[];
    }>;
    returnTimeseriesData(result: any, scopedVar: any): Promise<{
        data: any[];
    }>;
    annotationQuery(options: any): void;
    budgetFindQuery(query: string): any;
    metricFindQuery(query: string): any;
    mapToTextValue(result: any): {
        text: string;
        value: any;
    }[];
    testDatasource(): any;
    doRequest(options: any): any;
}
