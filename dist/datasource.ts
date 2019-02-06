///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import moment from 'moment';

export default class YNABDatasource {
  id: number;
  name: string;
  type: string;
  url: string;
  accessToken: string;
  headers: {};
  budgets: any [];
  q: any;

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.q = $q;
    this.type = instanceSettings.type;
    this.url = 'https://api.youneedabudget.com/v1';
    this.name = instanceSettings.name;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.accessToken = instanceSettings.jsonData.acessToken;
    this.headers = {'Content-Type': 'application/json'};
    this.budgets = [];
    this.headers['Authorization'] = `Bearer ${this.accessToken}`;
  }

  query(options) {
    console.log(options);
    const urlsMap = {
      "budgets": `${this.url}/budgets/`,
      "accounts": `${this.url}/budgets/${options.targets[0].budget.id}/accounts`,
      "transactions": `${this.url}/budgets/${options.targets[0].budget.id}/transactions`//?since_date=2018-10-14`,
    };

    return this.doRequest({
      url: urlsMap[options.targets[0].dataType],
      method: 'GET'
    }).then(result => {
      let returnData;
      if (options.targets[0].formatType === 'timeserie') {
        returnData = this.returnTimeseriesData(result, options.scopedVar);
      } else {
        returnData = this.returnTableData(result, options.scopedVar);
      }
      return returnData;
    });
  }

  returnTableData(result, scopedVar) {
    let returnArr = {data: [
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
    ]};

    result.data.data.accounts.forEach(account => {
      returnArr.data[0].rows.push([account.name, account.balance/1000]);
    });

    return Promise.resolve(returnArr);
  }

  returnTimeseriesData(result, scopedVar) {
    let returnArr = { data: [] };

    result.data.data.transactions.forEach(transaction => {
      // Group by category_name
      if (transaction.category_name !== null) {

        // Place transaction into target group
        let targetGroup = returnArr.data.filter(o => {
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
        targetGroup.datapoints.push([transaction.amount/1000, moment(transaction.date).unix()*1000]);
      }
    });


    let groupedResults;
    returnArr.data.forEach(target => {

      // Group data points by similar date
      groupedResults = _.groupBy(target.datapoints, item => {
          return item[1];
      });
      target.datapoints = [];
      Object.keys(groupedResults).forEach(timestamp => {
        let sum = 0;
        groupedResults[timestamp].forEach(record => {
          console.log(record[0]);
          sum += record[0];
        });
        target.datapoints.push([sum, parseInt(timestamp)]);
      });
    });

    console.log(returnArr);



    return Promise.resolve(returnArr);
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  budgetFindQuery(query: string) {
    const interpolated = {
      target: this.templateSrv.replace(query, null, 'regex')
    };

    return this.doRequest({
      url: `${this.url}/budgets`,
      data: interpolated,
      method: 'GET',
    }).then(result => {
      const dataObj = result.data.data.budgets[0];
     return result.data.data.budgets.map(budget => {
       return {text: budget.name, value: budget.id };
     });
    });
  }

  metricFindQuery(query: string) {
    const interpolated = {
      target: this.templateSrv.replace(query, null, 'regex')
    };

    return this.doRequest({
      url: this.url,
      data: interpolated,
      method: 'GET',
    }).then(this.mapToTextValue);
  }

  mapToTextValue(result) {
    const dataObj = result.data.data.budgets[0];

    return Object.keys(dataObj).map(function(key, index) {
      return { text: key, value: dataObj[key] };
   });
  }

  testDatasource() {
    return this.doRequest({
      url: this.url,
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Connected succesfully to YNAB.',
          title: 'Success'
        };
      } else {
        return {
          status: 'error',
          message: 'Error in connecting to YNAB.',
          title: 'Error'
        };
      }
    });
  }

  doRequest(options) {
    options.headers = this.headers;

    return this.backendSrv.datasourceRequest(options);
  }
}
