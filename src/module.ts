import YNABDatasource from './datasource';
import {YNABQueryCtrl} from './query_ctrl';

class YNABAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  YNABDatasource as Datasource,
  YNABQueryCtrl as QueryCtrl,
  YNABAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
