'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ChangeuserinfoCtrl
 * @description
 * # changeUserInfoCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('changeUserInfoCtrl', function($scope, commonService, $loading) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        //退出
        $scope.loginOut = commonService.loginOut;
        $loading.start('changeUserInfo');

        //请求用户信息
        var loginLong = commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data);
        loginLong.then(function(response) {
            $scope.userMessage = response.Data;
        })

        //获取用户信息
        var getUserInfo = commonService.getData(ALL_PORT.GetUserInfo.url, 'POST', ALL_PORT.GetUserInfo.data);
        getUserInfo.then(function(data) {
            $loading.finish('changeUserInfo');
            $scope.userInfo = data.Data.Model;
            $scope.Tel = data.Data.Model.Tel;
            $scope.Email = data.Data.Model.Email;
            $scope.Mobile = data.Data.Model.Mobile;
        });

        var token = commonService.AntiForgeryToken();

        $scope.changeUser = function() {
            var options = { Email: $scope.Email, Mobile: $scope.Mobile, Tel: $scope.Tel };
            //正则表达式
            var reg = {
                mobile: /^1[3|4|5|7|8][0-9]\d{4,8}$/,
                email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
                tel: /^0\d{2,3}-?\d{7,8}$/
            }
            if (reg.mobile.test(options.Mobile) && reg.tel.test(options.Tel) && reg.email.test(options.Email)) {
                var updateUserInfo = commonService.getData(ALL_PORT.UpdateUserInfo.url, 'POST', $.extend({}, ALL_PORT.UpdateUserInfo.data, options, token));
                updateUserInfo.then(function(response) {
                    alert(response.Message);
                    window.reload();
                });
            } else if (!reg.mobile.test(options.Mobile)) {
                alert('请输入正确格式的手机号');
            } else if (!reg.tel.test(options.Tel)) {
                alert('请输入正确格式的电话');
            } else if (!reg.email.test(options.Email)) {
                alert('请输入正确格式的邮箱');
            }
        };


    });
