///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'moment'], function(exports_1) {
    var lodash_1, moment_1;
    var YNABDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            YNABDatasource = (function () {
                /** @ngInject */
                function YNABDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    this.name = instanceSettings.name;
                    this.id = instanceSettings.id;
                    this.q = $q;
                    this.type = instanceSettings.type;
                    this.url = 'https://api.youneedabudget.com/v1';
                    this.name = instanceSettings.name;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.accessToken = instanceSettings.jsonData.acessToken;
                    this.headers = { 'Content-Type': 'application/json' };
                    this.budgets = [];
                    this.headers['Authorization'] = "Bearer " + this.accessToken;
                }
                YNABDatasource.prototype.query = function (options) {
                    var _this = this;
                    console.log(options);
                    var urlsMap = {
                        "budgets": this.url + "/budgets/",
                        "accounts": this.url + "/budgets/" + options.targets[0].budget.id + "/accounts",
                        "transactions": this.url + "/budgets/" + options.targets[0].budget.id + "/transactions" //?since_date=2018-10-14`,
                    };
                    return this.doRequest({
                        url: urlsMap[options.targets[0].dataType],
                        method: 'GET'
                    }).then(function (result) {
                        var returnData;
                        if (options.targets[0].formatType === 'timeserie') {
                            returnData = _this.returnTimeseriesData(result, options.scopedVar);
                        }
                        else {
                            returnData = _this.returnTableData(result, options.scopedVar);
                        }
                        return returnData;
                    });
                };
                YNABDatasource.prototype.returnTableData = function (result, scopedVar) {
                    var returnArr = { data: [
                            {
                                "columns": [
                                    {
                                        "text": "Name",
                                        "type": "string",
                                        "sort": true,
                                        "desc": true,
                                    }, {
                                        "text": "Balance",
                                        "type": "number",
                                        "sort": true,
                                        "desc": true,
                                    },
                                ],
                                "rows": [],
                                "type": "table"
                            }
                        ] };
                    result.data.data.accounts.forEach(function (account) {
                        returnArr.data[0].rows.push([account.name, account.balance / 1000]);
                    });
                    return Promise.resolve(returnArr);
                };
                YNABDatasource.prototype.returnTimeseriesData = function (result, scopedVar) {
                    var returnArr = { data: [] };
                    result.data.data.transactions.forEach(function (transaction) {
                        // Group by category_name
                        if (transaction.category_name !== null) {
                            // Place transaction into target group
                            var targetGroup = returnArr.data.filter(function (o) {
                                return o.target === transaction.category_name;
                            })[0];
                            // Create the target group if it doesn't exist
                            if (targetGroup === undefined) {
                                targetGroup = {
                                    "target": transaction.category_name,
                                    "datapoints": []
                                };
                                returnArr.data.push(targetGroup);
                            }
                            // Create datapoints for target group
                            targetGroup.datapoints.push([transaction.amount / 1000, moment_1.default(transaction.date).unix() * 1000]);
                        }
                    });
                    var groupedResults;
                    returnArr.data.forEach(function (target) {
                        // Group data points by similar date
                        groupedResults = lodash_1.default.groupBy(target.datapoints, function (item) {
                            return item[1];
                        });
                        target.datapoints = [];
                        Object.keys(groupedResults).forEach(function (timestamp) {
                            var sum = 0;
                            groupedResults[timestamp].forEach(function (record) {
                                console.log(record[0]);
                                sum += record[0];
                            });
                            target.datapoints.push([sum, parseInt(timestamp)]);
                        });
                    });
                    console.log(returnArr);
                    return Promise.resolve(returnArr);
                };
                YNABDatasource.prototype.annotationQuery = function (options) {
                    throw new Error("Annotation Support not implemented yet.");
                };
                YNABDatasource.prototype.budgetFindQuery = function (query) {
                    var interpolated = {
                        target: this.templateSrv.replace(query, null, 'regex')
                    };
                    return this.doRequest({
                        url: this.url + "/budgets",
                        data: interpolated,
                        method: 'GET',
                    }).then(function (result) {
                        var dataObj = result.data.data.budgets[0];
                        return result.data.data.budgets.map(function (budget) {
                            return { text: budget.name, value: budget.id };
                        });
                    });
                };
                YNABDatasource.prototype.metricFindQuery = function (query) {
                    var interpolated = {
                        target: this.templateSrv.replace(query, null, 'regex')
                    };
                    return this.doRequest({
                        url: this.url,
                        data: interpolated,
                        method: 'GET',
                    }).then(this.mapToTextValue);
                };
                YNABDatasource.prototype.mapToTextValue = function (result) {
                    var dataObj = result.data.data.budgets[0];
                    return Object.keys(dataObj).map(function (key, index) {
                        return { text: key, value: dataObj[key] };
                    });
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