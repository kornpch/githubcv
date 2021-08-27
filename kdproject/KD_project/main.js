angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);
document.body.addEventListener( 'load', startMyAwesomeApp, false );


function mainCtrl($scope, $http){
	$scope.project = function(){
		$scope.myDisplayMessage = ("Choose from a list of All-Stars");
		$scope.mySparqlQuery, $scope.mySparqlQuery2, $scope.mySparqlQuery3, $scope.mySparqlQuery4, $scope.mySparqlQuery5, $scope.mySparqlQuery6 = "empty query";
        $scope.mySparqlEndpoint = "http://dbpedia.org/sparql";
        $scope.mySparqlEndpoint2 = "http://192.168.1.70:7200/repositories/final";
        var selected_player, selected_player2 = '';
        var myDynamicData, myDynamicData2 = [];

        $scope.Player = function(player) {
			$scope.mySparqlQuery = encodeURI("PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX dbr: <http://dbpedia.org/resource/> PREFIX dbp:  <http://dbpedia.org/property/> PREFIX dbc: <http://dbpedia.org/resource/Category:>PREFIX dct: <http://purl.org/dc/terms/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT DISTINCT ?player ?points ?assists ?rebounds ?height ?bd ?college ?weight where { ?player  dct:subject  dbc:National_Basketball_Association_All-Stars . ?player dbp:stat1value ?points . ?player dbp:stat2value ?rebounds. ?player dbo:birthDate ?bd. ?player dbo:college ?college. ?player dbo:weight ?weight. ?player dbo:height ?height. ?player dbp:stat3value ?assists. filter((?player) = dbr:" + player + ") } LIMIT(1)").replace(/#/, '%23');
			$scope.mySparqlQuery3 = encodeURI("PREFIX ex: <http://example/base/> SELECT DISTINCT ?playedYears ?draftedIn ?draftPick WHERE { ?player ex:playedYears ?playedYears. ?player ex:draftedIn ?draftedIn. ?player ex:draftPick ?draftPick. FILTER((?player) = ex:" + player.replace('_', '%20') + ") }").replace(/#/, '%23');
//			$scope.mySparqlQuery5 = encodeURI("PREFIX ex: <http://www.example.org/vukcg450/assignment4#> PREFIX bg: <http://www.semanticweb.org/aimee/ontologies/2020/9/untitled-ontology-21#> SELECT DISTINCT ?rings WHERE {<http://www.semanticweb.org/aimee/ontologies/2020/9/untitled-ontology-21#Kareem_Abdul-Jabbar> <http://www.example.org/vukcg450/assignment4#hasRings> ?rings}").replace(/#/, '%23');
			selected_player = player;
        }

        $scope.Player2 = function(player) {
			$scope.mySparqlQuery2 = encodeURI("PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX dbr: <http://dbpedia.org/resource/> PREFIX dbp:  <http://dbpedia.org/property/> PREFIX dbc: <http://dbpedia.org/resource/Category:>PREFIX dct: <http://purl.org/dc/terms/> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT DISTINCT ?player ?points ?assists ?rebounds ?height ?bd ?college ?weight where { ?player  dct:subject  dbc:National_Basketball_Association_All-Stars . ?player dbp:stat1value ?points . ?player dbp:stat2value ?rebounds. ?player dbo:birthDate ?bd. ?player dbo:college ?college. ?player dbo:weight ?weight. ?player dbo:height ?height. ?player dbp:stat3value ?assists. filter((?player) = dbr:" + player + ") } LIMIT(1)").replace(/#/, '%23');
			$scope.mySparqlQuery4 = encodeURI("PREFIX ex: <http://example/base/> SELECT DISTINCT ?playedYears ?draftedIn ?draftPick WHERE { ?player ex:playedYears ?playedYears. ?player ex:draftedIn ?draftedIn. ?player ex:draftPick ?draftPick. FILTER((?player) = ex:" + player.replace('_', '%20') + ") }").replace(/#/, '%23');
			console.log(player);
//			$scope.mySparqlQuery6 = encodeURI("PREFIX ex: <http://www.example.org/vukcg450/assignment4#> PREFIX bg: <http://www.semanticweb.org/aimee/ontologies/2020/9/untitled-ontology-21#> SELECT DISTINCT ?player2 WHERE { ?player ex:playsWith ?player2. FILTER((?player) = bg:" + player + ") }").replace(/#/, '%23');
			selected_player2 = player;
        }

        $scope.startQuery = function(){

            if (selected_player == selected_player2) {
				throw "Error: Same two players selected from both dropdown menus"
			}

			$scope.myDisplayMessage = (selected_player.replace('_', ' ') + " vs " + selected_player2.replace('_', ' '));

            // get request for mySparqlQuery
			$http( {
				method: "GET",
				url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status ) {
				$scope.myDynamicData = [];
	            $scope.myChart = [];
				$scope.myDynamicLabels = ['points ' + selected_player.replace('_', ' '), 'points ' + selected_player2.replace('_', ' '), 'assists ' + selected_player.replace('_', ' '), 'assists ' + selected_player2.replace('_', ' '), 'rebounds ' + selected_player.replace('_', ' '), 'rebounds ' + selected_player2.replace('_', ' ')];

				// now iterate on the results
				angular.forEach(data.results.bindings, function(val) {
					$scope.myDynamicData = [val.points.value, val.assists.value, val.rebounds.value, val.height.value, val.weight.value, val.bd.value, val.college.value];
				    $scope.myChart = [val.points.value, val.assists.value, val.rebounds.value];
				});

                document.getElementById("player").innerHTML = selected_player.replace('_', ' ');
				document.getElementById("points").innerHTML = $scope.myDynamicData[0];
				document.getElementById("assists").innerHTML = $scope.myDynamicData[1];
				document.getElementById("rebounds").innerHTML = $scope.myDynamicData[2];
				document.getElementById("height").innerHTML = Math.round($scope.myDynamicData[3] * 100) / 100 + ' m';
                document.getElementById("weight").innerHTML = Math.round($scope.myDynamicData[4] / 10) / 100 + ' kg';
				document.getElementById("birthday").innerHTML = $scope.myDynamicData[5];
                college = $scope.myDynamicData[6].toString().split('/');
				document.getElementById("college").innerHTML = college[college.length - 1 ];

			})
			.error(function(error ){
				console.log('Error running the input query!'+error);
			});

			// get request for mySparqlQuery2
			$http( {
				method: "GET",
				url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery2,
				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status ) {
				$scope.myDynamicData2 = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function(val) {
					$scope.myDynamicData2 = [val.points.value, val.assists.value, val.rebounds.value, val.height.value, val.weight.value, val.bd.value, val.college.value];
				    $scope.myChart.splice(1, 0, val.points.value);
				    $scope.myChart.splice(3, 0, val.assists.value);
				    $scope.myChart.push(val.rebounds.value);
				});

                document.getElementById("player2").innerHTML = selected_player2.replace('_', ' ');
				document.getElementById("points2").innerHTML = $scope.myDynamicData2[0];
				document.getElementById("assists2").innerHTML = $scope.myDynamicData2[1];
				document.getElementById("rebounds2").innerHTML = $scope.myDynamicData2[2];
				document.getElementById("height2").innerHTML = Math.round($scope.myDynamicData2[3] * 100) / 100 + ' m';
                document.getElementById("weight2").innerHTML = Math.round($scope.myDynamicData2[4] / 10) / 100 + ' kg';
				document.getElementById("birthday2").innerHTML = $scope.myDynamicData2[5];
                college = $scope.myDynamicData2[6].toString().split('/');
				document.getElementById("college2").innerHTML = college[college.length - 1];


                //compare tables
                //points comparison
				if (parseInt($scope.myDynamicData[0],10) > parseInt($scope.myDynamicData2[0],10)){
					document.getElementById("points2").innerHTML = $scope.myDynamicData2[0].fontcolor("red");
					document.getElementById("points").innerHTML = $scope.myDynamicData[0].fontcolor("green");
				} else {
					document.getElementById("points").innerHTML = $scope.myDynamicData[0].fontcolor("red");
					document.getElementById("points2").innerHTML = $scope.myDynamicData2[0].fontcolor("green");
					}

				//assists comparison
				if (parseInt($scope.myDynamicData[1],10) > parseInt($scope.myDynamicData2[1],10)){
					document.getElementById("assists2").innerHTML = $scope.myDynamicData2[1].fontcolor("red");
					document.getElementById("assists").innerHTML = $scope.myDynamicData[1].fontcolor("green");
				} else {
					document.getElementById("assists").innerHTML = $scope.myDynamicData[1].fontcolor("red");
					document.getElementById("assists2").innerHTML = $scope.myDynamicData2[1].fontcolor("green");
					}

				//rebounds comparison
				if (parseInt($scope.myDynamicData[2],10) > parseInt($scope.myDynamicData2[2],10)){
					document.getElementById("rebounds2").innerHTML = $scope.myDynamicData2[2].fontcolor("red");
					document.getElementById("rebounds").innerHTML = $scope.myDynamicData[2].fontcolor("green");
				} else {
					document.getElementById("rebounds").innerHTML = $scope.myDynamicData[2].fontcolor("red");
					document.getElementById("rebounds2").innerHTML = $scope.myDynamicData2[2].fontcolor("green");
					}


			})
			.error(function(error ){
				console.log('Error running the input query!'+error);
			});


			//query graph db repository for mySparqlQuery3
			$http( {
				method: "GET",
				url : $scope.mySparqlEndpoint2 + "?query=" + $scope.mySparqlQuery3,
				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status) {
				$scope.myDynamicData3 = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function(val) {
					$scope.myDynamicData3 = [val.playedYears.value, val.draftedIn.value, val.draftPick.value];
				});

				document.getElementById("playedYears").innerHTML = $scope.myDynamicData3[0];
				document.getElementById("draftedIn").innerHTML = $scope.myDynamicData3[1];
				document.getElementById("draftPick").innerHTML = $scope.myDynamicData3[2];

			})
			.error(function(error ){
				console.log('Error running the input query!'+error);
			});


            //query graph db repository for mySparqlQuery4
			$http( {
				method: "GET",
				url : $scope.mySparqlEndpoint2 + "?query=" + $scope.mySparqlQuery4,
				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
			} )
			.success(function(data, status) {
				$scope.myDynamicData4 = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function(val) {
					$scope.myDynamicData4 = [val.playedYears.value, val.draftedIn.value, val.draftPick.value];
				});

				document.getElementById("playedYears2").innerHTML = $scope.myDynamicData4[0];
				document.getElementById("draftedIn2").innerHTML = $scope.myDynamicData4[1];
				document.getElementById("draftPick2").innerHTML = $scope.myDynamicData4[2];

			})
			.error(function(error ){
				console.log('Error running the input query!'+error);
			});


			//query graph db repository for ySparqlQuery5
//			$http( {
//				method: "GET",
//				url : $scope.mySparqlEndpoint2 + "?query=" + $scope.mySparqlQuery5,
//				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
//			} )
//			.success(function(data, status) {
//				$scope.myDynamicData5 = [];
//
//				// now iterate on the results
//				angular.forEach(data.results.bindings, function(val) {
//				    console.log(data.results.bindings);
//					$scope.myDynamicData5 = [val.rings.value];
//				});
//
//				document.getElementById("playedWith").innerHTML = $scope.myDynamicData5[0];
//
//			})
//			.error(function(error ){
//				console.log('Error running the input query!'+error);
//			});


			//query graph db repository for ySparqlQuery6
//			$http( {
//				method: "GET",
//				url : $scope.mySparqlEndpoint2 + "?query=" + $scope.mySparqlQuery6,
//				headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
//			} )
//			.success(function(data, status) {
//				$scope.myDynamicData6 = [];
//
//				// now iterate on the results
//				angular.forEach(data.results.bindings, function(val) {
//					$scope.myDynamicData6 = [val.player2.value];
//				});
//
//				document.getElementById("playedWith2").innerHTML = $scope.myDynamicData6[0];
//
//			})
//			.error(function(error ){
//				console.log('Error running the input query!'+error);
//			});
        }
    }
}




