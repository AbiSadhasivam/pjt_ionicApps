angular.module("stockApp.services", []).factory("stockDataService", function ($q, $http) {

    var getDetailedData = function (ticker) {
        var deferred = $q.defer(),
            url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22" + ticker + "%22)&format=json&env=http://datatables.org/alltables.env";

        $http.get(url).success(function (jsonData) {
            deferred.resolve(jsonData.query.results.quote);
        }).error(function () {
            console.log("Error in retrieving the detailed data for", ticker);
            deferred.reject("Error");
        });
        return deferred.promise;
    };

    var getPriceData = function (ticker) {
        var deferred = $q.defer(),
            url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json&view=detail";

        $http.get(url).success(function (jsonData) {
            deferred.resolve(jsonData.list.resources[0].resource.fields);
        }).error(function () {
            console.log("Error in retrieving the data for", ticker);
            deferred.reject("error");
        });
        return deferred.promise;
    };


    return {
        getPriceData: getPriceData,
        getDetailedData: getDetailedData
    };
});
