///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';

export default class YNABDatasource {
  id: number;
  name: string;
  type: string;
  url: string;
  withCredentials: boolean;
  headers: {};

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;

    this.type = instanceSettings.type;
    this.url = 'https://api.youneedabudget.com/v1/budgets'; // instanceSettings.url;
    this.name = instanceSettings.name;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {'Content-Type': 'application/json'};
    this.headers['Authorization'] = 'Bearer 7e3e933020afc332d70d961e4cc241b4b282a919801012b8032306cf2909e941';
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      //instanceSettings.basicAuth;
    }
  }

  query(options) {
    throw new Error("Query Support not implemented yet.");
  }

  annotationQuery(options) {
    throw new Error("Annotation Support not implemented yet.");
  }

  metricFindQuery(query: string) {
    throw new Error("Template Variable Support not implemented yet.");
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
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;

    return this.backendSrv.datasourceRequest(options);
  }
}
