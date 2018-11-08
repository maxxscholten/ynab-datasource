/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export default class YNABDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    id: number;
    name: string;
    type: string;
    url: string;
    withCredentials: boolean;
    headers: {};
    /** @ngInject */
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): void;
    annotationQuery(options: any): void;
    metricFindQuery(query: string): void;
    testDatasource(): any;
    doRequest(options: any): any;
}
