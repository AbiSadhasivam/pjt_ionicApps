angular.module('stockApp.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('mystocksCtrl', ["$scope", function ($scope) {
    $scope.stockList = [
        {
            ticker: "AAPL"
        },
        {
            ticker: "GPRO"
        },
        {
            ticker: "FB"
        },
        {
            ticker: "TSLA"
        },
        {
            ticker: "GE"
        }
    ];
}])

.controller('stocksCtrl', ["$scope", "$stateParams", "$http", "stockDataService", "dateService", function ($scope, $stateParams, $http, stockDataService, dateService) {
    $scope.ticker = $stateParams.stockTicker;
    $scope.chartCounter = 1;

    $scope.$on("$ionicView.afterEnter", function () {
        getPriceData();
        getDetailedData();
    });

    function getPriceData() {
        var promise = stockDataService.getPriceData($scope.ticker);

        promise.then(function (data) {
            $scope.stockPriceData = data;
        });
    }

    function getDetailedData() {
        var promise = stockDataService.getDetailedData($scope.ticker);

        promise.then(function (data) {
            $scope.stockDetailedData = data;
        });
    }

    $scope.chartViewFunc = function (counter) {
        $scope.chartCounter = counter;
    };
}]);
