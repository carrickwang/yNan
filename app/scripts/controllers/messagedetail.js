'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:MessagedetailCtrl
 * @description
 * # MessagedetailCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('MessagedetailCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        $scope.token = commonService.AntiForgeryToken();
        /*//退出
        $scope.loginOut = commonService.loginOut;
        //请求用户信息
        $http({
          method:'POST',
          url:ALL_PORT.LoginLong.url,
          data:ALL_PORT.LoginLong.data,
          headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          }
        }).success(function(response){
          $scope.userMessage = response.Data;
        }).error(function (error, status) {
        });*/
        $loading.start('messageListDetail');
        var Id = $routeParams.Id;
        //留言板详情
        var params = $.extend({}, ALL_PORT.MessageDetail.data, { id: Id })
        commonService.getData(ALL_PORT.MessageDetail.url, 'POST',
            params).then(function(response) {
            $loading.finish('messageListDetail');
            $scope.messageDetailData = response.Data;
        });

    });