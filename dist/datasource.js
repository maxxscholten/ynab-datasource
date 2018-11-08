///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var YNABDatasource;
    return {
        setters:[],
        execute: function() {
            YNABDatasource = (function () {
                /** @ngInject */
                function YNABDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.type = instanceSettings.type;
                    this.url = 'https://api.youneedabudget.com/v1/budgets'; // instanceSettings.url;
                    this.name = instanceSettings.name;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.withCredentials = instanceSettings.withCredentials;
                    this.headers = { 'Content-Type': 'application/json' };
                    this.headers['Authorization'] = 'Bearer 7e3e933020afc332d70d961e4cc241b4b282a919801012b8032306cf2909e941';
                    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
                    }
                }
                YNABDatasource.prototype.query = function (options) {
                    throw new Error("Query Support not implemented yet.");
                };
                YNABDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                YNABDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Template Variable Support not implemented yet.");
                };
                YNABDatasource.prototype.testDatasource = function () {
                    return this.doRequest({
                        url: this.url,
                        method: 'GET',
                    }).then(function (response) {
                        if (response.status === 200) {
                            return {
                                status: 'success',
                                message: 'Connected succesfully to YNAB.',
                                title: 'Success'
                            };
                        }
                        else {
                            return {
                                status: 'error',
                                message: 'Error in connecting to YNAB.',
                                title: 'Error'
                            };
                        }
                    });
                };
                YNABDatasource.prototype.doRequest = function (options) {
                    options.withCredentials = this.withCredentials;
                    options.headers = this.headers;
                    return this.backendSrv.datasourceRequest(options);
                };
                return YNABDatasource;
            })();
            exports_1("default", YNABDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map