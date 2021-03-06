'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:NoticedetailCtrl
 * @description
 * # noticeDetailCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('noticeDetailCtrl', function($scope, commonService, $routeParams, $loading) {
        $scope.location = '通知内容';
        $scope.isNotice = true;
        $scope.Id = $routeParams.ID;
        $loading.start('tmshowarticledetail');

        commonService.getData(ALL_PORT.noticeContent.url, 'POST',
                $.extend({}, ALL_PORT.noticeContent.data, { Id: $scope.Id }))
            .then(function(response) {
                $loading.finish('tmshowarticledetail');
                $scope.articleData = response.Data.Model;
                $scope.articleData.Type = 'Notice';
                console.log($scope.articleData);
                $scope.content = response.Data.Model.Content;
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

        //收藏
        $scope.favoriteAdd = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteAdd.data, options, token)
            commonService.getData(ALL_PORT.FavoriteAdd.url, 'POST',
                    params)
                .then(function(response) {
                    if (response.Type == 1) {
                        $scope.articleData.FavoriteId = response.Value;
                        alert(response.Message);
                        console.log(response.Value);
                    }
                });
        };

        //取消收藏
        $scope.favoriteDelete = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteDelete.data, options, token)
            commonService.getData(ALL_PORT.FavoriteDelete.url, 'POST',
                    params)
                .then(function(response) {
                    if (response.Type == 1) {
                        $scope.articleData.FavoriteId = 0;
                        alert(response.Message);
                    }
                });
        };

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
