'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:CoursedetailsCtrl
 * @description
 * # CoursedetailsCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('CoursedetailsCtrl', function($scope, $rootScope, $cookieStore, commonService, $timeout, $loading, $routeParams, $location) {
        //显示loading
        $loading.start('courseDetails');
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        $scope.token = commonService.AntiForgeryToken();
        $scope.showFav = true;
        var queryDetail = function() {
            var Id = $routeParams.Id;
            commonService.getData(ALL_PORT.CourseContent.url, 'POST', $.extend({}, ALL_PORT.CourseContent.data, { Id: Id }))
                .then(function(response) {
                    $loading.finish('courseDetails');
                    $scope.courseDetailsData = response.Data;
                });
        };
        queryDetail();


        $scope.favoriteAdd = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteAdd.data, options, token)
            commonService.getData(ALL_PORT.FavoriteAdd.url, 'POST', params)
                .then(function(response) {
                    if (response.Type == 1) {
                        $scope.courseDetailsData.CourseModel.FavoriteId = response.Value;
                        alert(response.Message);
                        // console.log(response.Value);
                    }
                });
        };
        $scope.favoriteDelete = function(options, token) {
            var params = $.extend({}, ALL_PORT.FavoriteDelete.data, options, token)
            commonService.getData(ALL_PORT.FavoriteDelete.url, 'POST', params)
                .then(function(response) {
                    if (response.Type == 1) {
                        $scope.courseDetailsData.CourseModel.FavoriteId = 0;
                        alert(response.Message);
                    }
                });
        };

        $scope.selectClass = function(checkValue) {
            var params = $.extend({}, ALL_PORT.AddStudyCourse.data, { checkValue: checkValue }, $scope.token)
            commonService.getData(ALL_PORT.AddStudyCourse.url, 'POST', params)
                .then(function(response) {
                    if (response.Type == 1) {
                        window.open('#/play/play/' + checkValue);
                        //$location.path('/play/play/'+checkValue);
                    }
                });
        };

        //参加测试
        $scope.havTest = function(Id) {
            var params = $.extend({}, ALL_PORT.Exam.data, $scope.token, { parameter1: Id })
            commonService.getData(ALL_PORT.Exam.url, 'POST', params)
                .then(function(response) {
                    $loading.finish('exam');
                    if (response.Type) {
                        //Type存在，意味着不能考试
                        alert(response.Message);
                    } else {
                        // $location.path("/exam/exam/" + Id);
                        window.open("#/exam/exam/" + Id);
                    }

                });
        };

    });
