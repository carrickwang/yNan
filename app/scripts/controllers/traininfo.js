'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:TraininfoCtrl
 * @description
 * # TraininfoCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('TraininfoCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
    //判断能否访问
    commonService.isVisit();
    //保持在线
    commonService.keepOnline();
    //请求用户信息
    commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
      $scope.userMessage = response.Data;
    });
    //搜索下拉项
    $scope.selectText = [
      { name: '培训机构', id: '1' },
      { name: '职业技能资格', id: '2' },
      { name: '报名时间', id: '3' },
      { name:'培训时间',id:'4'}
    ];
    var searchOptins = {
      trainName:'',
      trainSkill:'',
      applyDate:'',
      trainDate:''
    };
    //各输入框显示与否
    $scope.showInput1 = true;
    $scope.showInput2 = false;
    $scope.showInput3 = false;
    $scope.showInput4 = false;
    //获取培训动态列表
    $scope.paginationConf = {
      currentPage: 1,
      totalItems: 10,
      itemsPerPage: 10, //每页显示的条数
      pagesLength: 6,
      perPageOptions: [10, 20, 30, 40, 50]
    };
    $scope.setOption = function () {
      searchOptins.trainName = $scope.searchTitle1;
      // console.log(searchOptins.trainName);
      // console.log($scope.searchTitle1);
      searchOptins.trainSkill = $scope.searchTitle2;
      searchOptins.applyDate = $scope.searchTitle3;
      searchOptins.trainDate = $scope.searchTitle4;
      //console.log(searchOptins);
      $scope.getTrainData(searchOptins);
    };
    $scope.judgement = function(id){
      if(id==1){
        $scope.showInput1 = true;
        $scope.showInput2 = false;
        $scope.showInput3 = false;
        $scope.showInput4 = false;
        $scope.searchTitle2 = '';
        $scope.searchTitle3 = '';
        $scope.searchTitle4 = '';
        if($scope.searchTitle1){
          $scope.setOption();
        }
      }else if(id==2){
        $scope.showInput1 = false;
        $scope.showInput2 = true;
        $scope.showInput3 = false;
        $scope.showInput4 = false;
        $scope.searchTitle1 = '';
        $scope.searchTitle3 = '';
        $scope.searchTitle4 = '';
        if($scope.searchTitle2){
          $scope.setOption();
        }
      }else if(id==3){
        $scope.showInput1 = false;
        $scope.showInput2 = false;
        $scope.showInput3 = true;
        $scope.showInput4 = false;
        $scope.searchTitle1 = '';
        $scope.searchTitle2 = '';
        $scope.searchTitle4 = '';
        if($scope.searchTitle3){
          $scope.setOption();
        }
      }else{
        $scope.showInput1 = false;
        $scope.showInput2 = false;
        $scope.showInput3 = false;
        $scope.showInput4 = true;
        $scope.searchTitle1 = '';
        $scope.searchTitle2 = '';
        $scope.searchTitle3 = '';
        if($scope.searchTitle4){
          $scope.setOption();
        }
      }
    };
    $scope.getTrainData = function (options) {
      commonService.getData(ALL_PORT.TrainingPlan.url, 'POST',
        $.extend({}, ALL_PORT.TrainingPlan.data,options))
        .then(function(response) {
          $scope.trainInfoList = response;
          $scope.paginationConf.totalItems = response.length;
        });
    };
    //数据初始化
    //$scope.getTrainData();
    $scope.$watch('paginationConf.currentPage', function() {
      // 发送给后台的请求文章列表
      var pageOptions = {
        page: $scope.paginationConf.currentPage
      };
      $scope.getTrainData(pageOptions);
    });
    //站内搜索
    commonService.searchAll();
  });
