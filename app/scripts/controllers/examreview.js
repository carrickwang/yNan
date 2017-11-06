'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExamreviewCtrl
 * @description
 * # ExamreviewCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('ExamreviewCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;
        $scope.token = commonService.AntiForgeryToken();
        //请求用户信息
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data)
            .then(function(response) {
                $scope.userMessage = response.Data;
            });

        var parameter1 = $routeParams.examId;
        var parameter2 = $routeParams.recordId;
        var type = $routeParams.Type;
        $scope.SumCount = '';
        $loading.start('examReview');
        commonService.getData(ALL_PORT.ExamReview.url, 'POST',
                $.extend({}, ALL_PORT.ExamReview.data, { parameter1: parameter1, parameter2: parameter2 }))
            .then(function(response) {
                $loading.finish('examReview');
                $scope.examReviewData = response.Data;
                if(type=='mock'){
                  $scope.SumCount = response.Data.SumCount;
                }else{
                  $scope.SumCount = response.Data.UserExamDetail.Score;
                }
                $scope.checkingQuestions = response.Data.Type0Questions;
                $scope.singleQuestions = response.Data.Type1Questions;
                $scope.multipleQuestions = response.Data.Type2Questions;
                $scope.gapFilling = response.Data.Type3Questions;

                $scope.examAllScore = commonService.examAllScore2;
                $scope.countIf = commonService.countIf;
                $scope.rightScore = commonService.rightScore;
            });
    });
