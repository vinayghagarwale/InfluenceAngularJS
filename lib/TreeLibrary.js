var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http({
        method : "GET",
        url : "customers.php"
    }).then(function mySucces(response) {
      $scope.myData = response.data;
  });
    $http.get("customertable.php").then(function (response) {
      $scope.myDataTable = response.data;
  });
});

$(document).ready(function(){
$('#tree-data-container').jstree({
'plugins': ["wholerow","checkbox", "search"],
'core' : {
'data' : {
"url" : "customers - Copy.json",
"dataType" : "json"
}
},
'search': {
	'case_insensitive': true,
	'show_only_matches' : true
},
});

$(".search-input").keyup(function() {

	var searchString = $(this).val();
	console.log(searchString);
	$('#tree-data-container').jstree('search', searchString);
});

$('#tree-data-container').on("changed.jstree", function (e, data) {
    var i, j, r = [];
    for(i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_path(data.selected[i]).text);
    }
    console.log(data.instance.get_path(data.selected[i]).text);
});
});

