///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk', './css/query_editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var YNABQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {}],
        execute: function() {
            YNABQueryCtrl = (function (_super) {
                __extends(YNABQueryCtrl, _super);
                /** @ngInject **/
                function YNABQueryCtrl($scope, $injector, templateSrv) {
                    _super.call(this, $scope, $injector);
                    this.templateSrv = templateSrv;
                    this.defaults = {};
                    lodash_1.default.defaultsDeep(this.target, this.defaults);
                    this.target.budget = this.target.budget || { id: 'Select budget account' };
                    this.target.formatType = this.target.formatType || 'timeserie';
                    this.target.dataType = this.target.dataType || 'transactions';
                    this.dataTypes = [
                        { text: 'Budgets', value: 'budgets' },
                        { text: 'Accounts', value: 'accounts' },
                        { text: 'Transactions', value: 'transactions' },
                    ];
                    this.formatTypes = [
                        { text: 'TimeSerie', value: 'timeserie' },
                        { text: 'Table', value: 'table' },
                    ];
                    this.budgets = [];
                }
                YNABQueryCtrl.prototype.getOptions = function (query) {
                    return this.datasource.metricFindQuery(query || '');
                };
                YNABQueryCtrl.prototype.getBudgets = function (query) {
                    return this.datasource.budgetFindQuery(query || '');
                };
                YNABQueryCtrl.prototype.onChangeInternal = function () {
                    this.panelCtrl.refresh(); // Asks the panel to refresh data.
                };
                YNABQueryCtrl.templateUrl = 'partials/query.editor.html';
                return YNABQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("YNABQueryCtrl", YNABQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map