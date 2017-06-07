'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('PlayCtrl', function($scope, $http, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams) {
        $scope.Id = $routeParams.Id;
        $scope.iframSrc = "../../oldPage/play.html?id=" + $scope.Id;
/*
      //判断能否访问
      commonService.isVisit();
      //保持在线
      commonService.keepOnline();
      $scope.token = commonService.AntiForgeryToken();
      //星级评分
      var word = ['很差', '差', '一般', "好", "很好"];
      $scope.ratingText='';
      var level = $scope.drLevel;
      $scope.$watch('drLevel', function(newValue) {
        $scope.ratingText = word[$scope.drLevel-1];
      })
      //加载视频信息
      $scope.allPlayInfo;
      $scope.userId;
      $scope.loadPlayInfo=function () {
        $http({
          method: 'POST',
          url: ALL_PORT.Play.url,
          data: $.param($.extend({},ALL_PORT.Play.data,{id:$scope.Id})),
        }).success(function(response) {
          $scope.userId=response.Data.UserId;
          if (response.Data && response.Data.Content == null) {
            if ((response.Data.PortalId) && (response.Data.UserId) && (response.Data.CourseId)) {
              $scope.allPlayInfo = response.Data;
              $scope.options=response.Data.PlayPage;
              $scope.resultCourseDetail = response.Data.resultCourseDetail;
              $scope.resultCourseNote = response.Data.resultCourseNote;

              //refresh
              commonService.refresh($scope.allPlayInfo.PortalId,$scope.allPlayInfo.UserId,$scope.allPlayInfo.CourseId);
            }else {
              alert("数据无效，请检查api");
              window.close();
            }
          }else if (response.Data && response.Data.Content){
            alert('同时只能打开一门课程,请关闭之前页面,并于' + response.Data.Content + '秒后重试！');
            window.close();
          }

        });
      };
      commonService.beforeUnload($scope.userId);
      //获取评论信息
      $scope.getComment = function () {
        $http({
          method: 'POST',
          url: ALL_PORT.CourseComment.url,
          data: $.param($.extend({},ALL_PORT.CourseComment.data,{id:$scope.Id})),
        }).success(function(response) {
          $scope.resultComment = response.Data;
        });
      }
      $scope.getComment();

      $scope.loadPlayInfo();

      var playMp4 = function () {
        var params = $.extend({}, ALL_PORT.PlayJwplay.data, { courseid: $scope.allPlayInfo.CourseId })
        commonService.getData(ALL_PORT.PlayJwplay.url, 'POST', params)
          .then(function(response) {
            console.log(response)
          });
        var playOptions={
          controlBar: {
            muteToggle: false,
            CurrentTimeDisplay:true,
            DurationDisplay:true
          }
        };
        var myPlayer = videojs('my-video',playOptions);
        myPlayer.ready(function(){
          var myPlayer = this;
          myPlayer.play();
        });
        //当前播放进度  myPlayer.currentTime()；
        console.log(myPlayer.currentTime());
        /!*setInterval(function () {
         console.log(myPlayer.currentTime());

         },1000);*!/
      };
      //多拽滑块完成回调
      $scope.showPlay = false;
      $scope.dragReady=function () {
        document.getElementById("playBg").style.display = 'none';
        // console.log("logReady",$scope.options);
        $scope.showPlay = true;
        playMp4();
      };

      $scope.vm = {};

      //编辑笔记后提交请求
      $scope.editNote = function(options) {
        var editNoteParams = $.extend({}, ALL_PORT.AddNote.data, $scope.token, options);
        if (editNoteParams.Name.length < 2) {
          alert('笔记名称字数不能少于2个字！');
        } else if (editNoteParams.Content.length < 7) {
          alert('笔记内容字数不能少于7个字');
        } else if (editNoteParams.Content.length >= 249) {
          alert('笔记内容字数不能超过249个字');
        } else if (editNoteParams.Name.length >= 2 && editNoteParams.Content.length < 249) {
          $http({
            method: 'POST',
            url: ALL_PORT.AddNote.url,
            data: $.param(editNoteParams),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }
          }).success(function(response) {
            alert('添加完成！');
            $scope.noteName='';
            $scope.noteContent='';
            $scope.loadPlayInfo();
          }).error(function(error, status) {});
        }

      };

      //删除笔记
      $scope.delNote = function(id) {
        $http({
          method: 'POST',
          url: ALL_PORT.DelNote.url,
          data: $.param($.extend({}, ALL_PORT.DelNote.data, $scope.token, { Id: id })),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          }
        }).success(function(response) {
          if (response.Type == 1) {
            alert("删除成功！");
            $scope.loadPlayInfo();
          }else {
            alert(response.Message);
          }
        }).error(function(error, status) {});
      };

      //提交评论
      $scope.editComment = function(options) {
        var editCommentParams = $.extend({}, ALL_PORT.CourseCommentAdd.data, $scope.token, options);
        if (editCommentParams.content.length < 7) {
          alert('评论内容字数不能少于7个字！');
        } else if (editCommentParams.content.length >= 249) {
          alert('评论内容字数不能超过249个字！');
        }
        else if ($scope.resultCourseDetail.BrowseScore<100) {
          alert('课程为学完不可评论，请学完课程！');
        } else {
          $http({
            method: 'POST',
            url: ALL_PORT.CourseCommentAdd.url,
            data: $.param(editCommentParams),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }
          }).success(function(response) {
            if (response.Type==1){
              alert("评论成功，等待审核！");
              $scope.getComment();
            }else {
              alert(response.Message);
            }
          }).error(function(error, status) {});
        }

      };*/


    });
