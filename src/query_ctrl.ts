///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
import './css/query_editor.css!';

export class YNABQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  budgets: any [];
  dataTypes: any [];
  formatTypes: any [];

  defaults = {
  };

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);

    _.defaultsDeep(this.target, this.defaults);

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

  getOptions(query) {
    return this.datasource.metricFindQuery(query || '');
  }

  getBudgets(query) {
    return this.datasource.budgetFindQuery(query || '');
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}
