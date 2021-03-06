'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:articleDetailCtrl
 * @description
 * # articleDetailCtrl
 * Controller of the luZhouApp
 */

angular.module('luZhouApp')
    .controller('articleDetailCtrl', function($scope, $http, $routeParams, $loading, commonService) {

        $loading.start('tmshowarticledetail');


        $scope.location = "文章内容";
        $scope.isNews = true;
        var Id = $routeParams.ID;

        //收藏
        $scope.favoriteAdd = function(options, token) {

            var params = $.extend({}, ALL_PORT.FavoriteAdd.data, options, token)
            var promise = commonService.getData(ALL_PORT.FavoriteAdd.url, 'POST', params);
            promise.then(function(response) {
                if (response.Type === 1) {
                    $scope.articleData.FavoriteId = response.Value;
                    alert(response.Message);
                    console.log(response.Value);
                } else if (response.Type === 0) {
                    alert(response.Message);
                }
            });
        };

        //取消收藏
        $scope.favoriteDelete = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteDelete.data, options, token)
            var promise = commonService.getData(ALL_PORT.FavoriteDelete.url, 'POST', params);
            promise.then(function(response) {
                if (response.Type === 1) {
                    $scope.articleData.FavoriteId = 0;
                    alert(response.Message);
                } else if (response.Type === 0) {
                    alert(response.Message);
                }
            });
        };

        var promise = commonService.getData(ALL_PORT.ArticleContent.url, 'POST', $.extend({}, ALL_PORT.ArticleContent.data, { Id: Id }));
        promise.then(function(response) {
            $loading.finish('tmshowarticledetail');
            $scope.articleData = response.Data;
            $scope.content = response.Data.Content;
            $scope.articleData.Type = 'Article';
            // console.log($scope.content);
            var str = $scope.content.split('font-size:');
            var reg = /^(?=.*\d.*\b)/;
            for (var i = 0; i < str.length; i++) {
                if (reg.test(str[i].split(';')[0])) {
                    $scope.fontSize = parseInt(str[i].split(';')[0]);
                }
            }
	        if(!$scope.fontSize){
		        $scope.fontSize = 14;
	        }
        });



        //缩小字体
        $scope.reduceFont = function() {
            angular.element('#setFont').find("span").css("fontSize", $scope.fontSize-- + "pt");
            angular.element('#setFont').find("p").css("fontSize", $scope.fontSize-- + "px");
        };
        //放大字体
        $scope.increaseFont = function() {
            angular.element('#setFont').find("span").css("fontSize", $scope.fontSize++ + "pt");
            angular.element('#setFont').find("p").css("fontSize", $scope.fontSize++ + "px");
        };

    });
