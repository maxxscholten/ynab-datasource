System.register(['./datasource', './query_ctrl'], function(exports_1) {
    var datasource_1, query_ctrl_1;
    var YNABAnnotationsQueryCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }],
        execute: function() {
            YNABAnnotationsQueryCtrl = (function () {
                function YNABAnnotationsQueryCtrl() {
                }
                YNABAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
                return YNABAnnotationsQueryCtrl;
            })();
            exports_1("Datasource", datasource_1.default);
            exports_1("QueryCtrl", query_ctrl_1.YNABQueryCtrl);
            exports_1("AnnotationsQueryCtrl", YNABAnnotationsQueryCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map