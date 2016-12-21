angular.module("stockApp.services", [])

.factory("encodeURIService", function () {
    var encodeURI = function (URL) {
        return encodeURIComponent(URL).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!*()]/g, escape);
    };
    return {
        encodeURI: encodeURI
    };
})

//.factory("dataService", function () {
//        var encodeURI = function (URL) {
//            return encodeURIComponent(URL).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!*()]/g, escape);
//        };
//        return {
//            encodeURI: encodeURI
//        };
//    })
    .factory("stockDataService", function ($q, $http, encodeURIService) {

        var getDetailedData = function (ticker) {
            var deferred = $q.defer(),
                query = 'select * from yahoo.finance.quotes where symbol IN ("' + ticker + '")',
                url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encodeURI(query) + '&format=json&env=http://datatables.org/alltables.env';

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
