'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:SpecialtrainingcourseCtrl
 * @description
 * # SpecialtrainingcourseCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('SpecialtrainingcourseCtrl', function($scope, $location, $rootScope, $cookieStore, commonService, $timeout, $loading) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        $scope.showInput1 = true;
        $scope.showInput2 = false;
        $scope.showInput3 = false;
        //loading
        $loading.start('courseClassify');
        $loading.start('classMy');

        $scope.vm = {activeTab:1};

        //专题培训班分类
        commonService.getData(ALL_PORT.GetTrainingClassTypeList.url, 'POST',
                $.extend({}, ALL_PORT.GetTrainingClassTypeList.data))
            .then(function(response) {
                $loading.finish('courseClassify');
                $scope.courseClassify = response.Data;
            });

        //折叠面板控制
        $scope.repeatDone = function() {
            $('.courseClassify .panel-title a').click(function() {
                $(this).parents('.panel-heading').next().slideToggle();
                if ($(this).children('.category').html() == '+') {
                    $(this).children('.category').html('-');
                } else {
                    $(this).children('.category').html('+');
                }
            });
        };

        //分页
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100,
            itemsPerPage: 10, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50]
        };

        //我的班级
        commonService.getData(ALL_PORT.ClassMy.url, 'POST',
                $.extend({}, ALL_PORT.ClassMy.data))
            .then(function(response) {
                $loading.finish('classMy');
                $scope.classMyData = response.Data;
            });

        //培训班级列
        $scope.params=ALL_PORT.GetClassList.data;
        $scope.getClassList = function(options) {
            $loading.start('trainingCenter');
            $.extend($scope.params, options);
            commonService.getData( ALL_PORT.GetClassList.url, 'POST',
              $scope.params)
            .then(function(response) {
                $loading.finish('trainingCenter');
                if (response.Data.ListData.length === 0) {
                    $scope.paginationConf.totalItems = 0;
                } else {
                    $scope.paginationConf.totalItems = response.Data.ListData[0].Count;
                }

                    if ($scope.params.type == "just") {
                        $scope.justListData = response.Data;
                        // $scope.paginationConf.totalItems=response.Data.ListData[0].Count;
                    } else if ($scope.params.type == "immediately") {
                        $scope.immediatelyListData = response.Data;

                    } else if ($scope.params.type == "already") {
                        $scope.alreadyListData = response.Data;
                        // $scope.paginationConf.totalItems=response.Data.ListData[0].Count;
                    }
                });
        };

        $scope.getClassList();
        $scope.JudgeStatus = commonService.JudgeStatus;

        //查看用户权限
        $scope.checkUserClass = function(id) {
            commonService.getData(ALL_PORT.CheckUserClass.url, 'POST',
                $.extend({}, ALL_PORT.CheckUserClass.data, { trainingId: id }))

            .then(function(response) {
                if (response.Type === 0) {
                    alert("没有权限访问，请先加入培训班!");
                } else {
                    // $location.path('/specialTrainingCourse/classDetail/'+id);
                    window.open('#/specialTrainingCourse/classDetail/' + id);
                }
            });
        };


        $scope.addClass = function(id, type) {
            commonService.getData(ALL_PORT.ApplyClass.url, 'POST',
                    $.extend({}, ALL_PORT.ApplyClass.data, { trainingId: id }))
                .then(function(response) {
                    alert(response.Message);
                    $scope.getClassList({ type: type });
                });
        };



        // 通过$watch currentPage 当他们一变化的时候，重新获取数据条目
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据
            var pageOptions = {
                page: $scope.paginationConf.currentPage,
                title: $scope.searchTitle
            };
            if ($scope.vm.activeTab == 1) {
                pageOptions.type = 'just';
                $scope.getClassList(pageOptions);
            } else if ($scope.vm.activeTab == 2) {
                pageOptions.type = 'immediately';
                $scope.getClassList(pageOptions);
            } else if($scope.vm.activeTab == 3){
                pageOptions.type = 'already';
                $scope.getClassList(pageOptions);
            }

        });
      //站内搜索
      $scope.searchText = '';
      $scope.tipText = '';
      $scope.searchNow = function () {
        if($scope.searchText ==''){
          $scope.tipText = "输入不能为空";
        }else{
          $location.path('/search/' + $scope.searchText);
        }
      };
      $scope.hideTip = function () {
        $scope.tipText = "";
      }

    });
