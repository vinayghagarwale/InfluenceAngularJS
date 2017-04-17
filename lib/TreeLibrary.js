var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
	$scope.JSONAPIPath = "http://10.145.11.105/Influence/Structure/Nodes";
	
    $http({
        method : "GET",
        url : $scope.JSONAPIPath
    }).then(function mySucces(response) {
		var stringified = JSON.stringify(response.data);
		stringified = stringified.replace(new RegExp("Name", 'g'), "text");
		stringified = stringified.replace(new RegExp("Children", 'g'), "children");
		stringified = stringified.replace(new RegExp("Path", 'g'), "id");		        
		$scope.myData = JSON.parse(stringified);		
  });

 
$(document).ready(function(){
$('#tree-data-container').jstree({
'plugins': ["wholerow", "search", "conditionalselect",  "types", "changed", "open_all" ],
"types" : {
      "default" : {
        "icon" : "glyphicon glyphicon-thumbs-up"
      },
      "demo" : {
        "icon" : "glyphicon glyphicon-chevron-right"
      }
     },
'core' : {
'data' : $scope.myData
},
'search': {
	'case_insensitive': true,
	'show_only_matches' : true
},
'conditionalselect' : function (node, event) {
	
  return true;
}
});

$(".search-input").keyup(function() {
	$scope.searchString = $(this).val();
	console.log($scope.searchString);
	$('#tree-data-container').jstree('search', $scope.searchString);
});

$('.btn').click(function() {
	$(".search-input").val('');
	$('#tree-data-container').jstree('search', "");
});

$("#tree-data-container").jstree("open_all");

$('#tree-data-container').on("changed.jstree", function (e, data) {
    var i, j, r = [];
    for(i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).id);
    }
	$scope.DetailPath = $scope.JSONAPIPath + "/"+ r.join(', ');
    $scope.selectedtreepath = data.instance.get_path(data.node,' > ');
	console.log('Selected: ' + $scope.selectedtreepath); 
    $http({
        method : "GET",
        url : $scope.DetailPath
    }).then(function mySucces(response) {
      $scope.myDataTable = response.data;
  });
});

$('[data-toggle="tooltip"]').tooltip();

});

});

app.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })
    .controller('MyCtrl',function(Excel,$timeout,$scope){
      $scope.exportToExcel=function(tableId, sheetname){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId, sheetname);
            $timeout(function(){location.href=exportHref;},100); // trigger download
        }
    });

