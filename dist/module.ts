import YNABDatasource from './datasource';
import {YNABQueryCtrl} from './query_ctrl';
import {YNABConfigCtrl} from './config_ctrl';

class YNABAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  YNABDatasource as Datasource,
  YNABQueryCtrl as QueryCtrl,
  YNABConfigCtrl as ConfigCtrl,
  YNABAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
