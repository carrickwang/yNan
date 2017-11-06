'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExamCtrl
 * @description
 * # ExamCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('ExamCtrl', function($scope, $http, $rootScope, $cookieStore, commonService, $location, $loading, $routeParams, $interval) {
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();
        $scope.token = commonService.AntiForgeryToken();
        $loading.start('exam');
        var Id = $routeParams.Id;
        var Type = $routeParams.Type;
        var flag = (Type == 'mock') ? true :false;
        var data = [];
        $scope.sortArray = function (arr) {
          for(var i=0;i<arr.length;i++){
            arr[i].QuestionsItems.sort(function(){return 0.5 - Math.random()});
          }
          return arr;
        };
        var matchStyle = function (index) {
          return index==0?'A':(index==1?'B':(index==2?'C':'D'));
        };
        // console.log(Id,$scope.token);
        var params = $.extend({}, ALL_PORT.Exam.data, { parameter1: Id,IsTest:flag });
        commonService.getData(ALL_PORT.Exam.url, 'POST', params)
            .then(function(response) {
                $loading.finish('exam');
                if (response.Data.ExamEndTime != null) {
                    $scope.endTime = parseInt(response.Data.ExamEndTime.replace(/[^0-9-]/ig, ""));
                }
                // $scope.seconds = 5*1000;
                //考试题目数量
                $scope.examData = response.Data;
                $scope.checkingQuestions = response.Data.Type0Questions;
                $scope.sortQuestions1 = $scope.sortArray($scope.checkingQuestions);//乱序的判断题

                $scope.singleQuestions = response.Data.Type1Questions;
                $scope.sortQuestions2 = $scope.sortArray($scope.singleQuestions);//乱序的单选题

                $scope.multipleQuestions = response.Data.Type2Questions;
                $scope.sortQuestions3 = $scope.sortArray($scope.multipleQuestions);//乱序的多选题
                $scope.gapFilling = response.Data.Type3Questions;
                $scope.examAllScore1 = commonService.examAllScore;

                $.each($scope.sortQuestions1,function (index1,value1) {
                  $.each(value1.QuestionsItems,function (index11,value11) {
                    data.push([value1.Id,matchStyle(index11),value11.ItemFlag])
                  })
                });
                $.each($scope.sortQuestions2,function (index2,value2) {
                  $.each(value2.QuestionsItems,function (index22,value22) {
                    data.push([value2.Id,matchStyle(index22),value22.ItemFlag])
                  })
                });
                $.each($scope.sortQuestions3,function (index3,value3) {
                  $.each(value3.QuestionsItems,function (index33,value33) {
                    data.push([value3.Id,matchStyle(index33),value33.ItemFlag])
                  })
                });
            }).then(function () {
              commonService.getData(ALL_PORT.ExamForAnswer.url, 'POST', {data:data}).then(function (res) {

              })
            });
        //倒计时
        $interval(function() {
            $scope.newDate = new Date().getTime();
            $scope.seconds = $scope.endTime - $scope.newDate;
            if ($scope.seconds == 0) {
                alert('考试时间到,系统将自动提交！');
                $scope.submitForm();
            }
        }, 1000);
        $scope.submitForm = function() {
            var str0 = "判断题第";
            var str1 = "单选题第";
            var str2 = "多选题第";
            $("input:hidden[name^='questionid']").each(function(index) {
                if ($("input[name='radio" + this.value + "']").length > 0 && $("input[name='radio" + this.value + "']:checked").length === 0) {
                    $(this).parent('td').css({ "backgroundColor": "red", "color": "white" });
                    if ($(this).siblings('.tibg').children('span').attr("type") == "0") {
                        str0 += $(this).siblings('.tibg').children('span').html();
                        // console.log(str0)
                    }
                    if ($(this).siblings('.tibg').children('span').attr("type") == "1") {
                        str1 += $(this).siblings('.tibg').children('span').html();
                    }
                }
                if ($("input[name='checkbox" + this.value + "']").length > 0 && $("input[name='checkbox" + this.value + "']:checked").length === 0) {
                    $(this).parent('td').css({ "backgroundColor": "red", "color": "white" });
                    if ($(this).siblings('.tibg').children('span').attr("type") == "2") {
                        str2 += $(this).siblings('.tibg').children('span').html();
                    }
                }
            });
            str0 += "题、";
            str1 += "题、";
            str2 += "题、";
            if (str0 == "判断题第题、") { str0 = ""; }
            if (str1 == "单选题第题、") { str1 = ""; }
            if (str2 == "多选题第题、") { str2 = ""; }
            // confirm(str0 + str1 + str2 + "未答,是否提交?");
            // console.log($("#editForm").serialize());

            if (((str0 + str1 + str2) === "" || ((str0 + str1 + str2) !== "" && confirm(str0 + str1 + str2 + "未答,是否提交?")))) {
                var params = $("#editForm").serialize()+'&IsTest='+flag;
                console.log(params);
                $http({
                    method: 'POST',
                    url: ALL_PORT.PostExam.url,
                    data: params,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    }
                }).success(function(response) {
                    if (response.Type == 1) {
                        alert(response.Message);
                        $location.path('/exam/examReview/'+Type+'/' + Id + '/' + response.Value);
                    } else {
                        alert(response.Message)
                    }
                }).error(function(error, status) {
                    alert("提交失败！");
                    window.close();
                });

            }
        };
        /*var Id =$routeParams.Id;
        $scope.iframSrc = "../../oldPage/Exam.html?id="+Id;*/
    });
