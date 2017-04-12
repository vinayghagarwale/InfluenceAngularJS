var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
	$scope.JSONAPIPath = "http://124.124.79.181/Influence/Structure/Nodes";
    $http({
        method : "GET",
        url : $scope.JSONAPIPath
    }).then(function mySucces(response) {
		var stringified = JSON.stringify(response.data);
		stringified = stringified.replace(new RegExp("Name", 'g'), "text");
		stringified = stringified.replace(new RegExp("Children", 'g'), "children");
		stringified = stringified.replace(new RegExp("Path", 'g'), "icon");		        
		$scope.myData = JSON.parse(stringified);		
  });

$(document).ready(function(){
$('#tree-data-container').jstree({
'plugins': ["wholerow", "search", "conditionalselect",  "types", "changed" ],
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
$("ClearSearch").Click(function() {
	$('#tree-data-container').jstree('search', "");
});
$('#tree-data-container').on("changed.jstree", function (e, data) {
    var i, j, r = [];
    for(i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).icon);
    }
	$scope.mytableData = $scope.JSONAPIPath + "/"+ r.join(', ');
	
    $http({
        method : "GET",
        url : $scope.mytableData
    }).then(function mySucces(response) {
      $scope.myDataTable = response.data;
  });
  
  
});

$('[data-toggle="tooltip"]').tooltip();
});

});

