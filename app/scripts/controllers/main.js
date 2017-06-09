    'use strict';

    /**
     * @ngdoc function
     * @name luZhouApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the luZhouApp
     */
    angular.module('luZhouApp')
        .controller('MainCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $loading, $location, $routeParams,$cookies,$http) {
            //loading 显示
            $loading.start('specialTraining');
            $loading.start('rankingList');
            $loading.start('realTimeList');
            //保持在线
            commonService.keepOnline();
            //登录
            $scope.showLogin = true;
            $scope.login = {
                Account: '',
                PassWord: '',
                RememberMe: false
            };
            $scope.showError = false;
            $scope.userMessage;
            $scope.clickLogin;
            //请求用户信息
            commonService.getData(ALL_PORT.LoginShort.url, 'POST', ALL_PORT.LoginShort.data)
                .then(function(response) {
                    $scope.userMessage = response.Data.Model;
                    $scope.userAllMessage = response.Data;
                    if ($scope.userMessage.Name) {
                        $scope.showLogin = false;

                    } else {
                        $scope.showLogin = true;
                        if ($scope.userMessage.RememberMe) {
                            $scope.login.RememberMe = true;
                            rememberPW();
                        }else {
                          $scope.login = {
                            Account: '',
                            PassWord: ''
                          };
                        }
                    }
                });
          //课程点击排行
          $loading.start('courseRankingList');
          commonService.getData(ALL_PORT.CourseClickRank.url, 'POST', ALL_PORT.CourseClickRank.data)
            .then(function(response) {
              $loading.finish('courseRankingList');
              $scope.courseRankingList = response.Data;
            });

          //学习动态 工作动态
          $scope.study_work = function (options) {
            commonService.getData(ALL_PORT.ArticleList.url, 'POST',
              $.extend({}, ALL_PORT.ArticleList.data, { page: '1', rows: '5'},options))
              .then(function(response) {
                  $scope.studyData = response.Data;
              });
          };
          //政策法规 综合动态 常见问题 考试信息
          $scope.three_tab = function (options) {
            commonService.getData(ALL_PORT.ArticleList.url, 'POST',
              $.extend({}, ALL_PORT.ArticleList.data, { page: '1', rows: '6'},options))
              .then(function(response) {
                  $scope.policyData = response.Data;
              });
          };
          //学习动态
          $scope.study_work({CategoryId: 781336});
          //工作动态
          //$scope.study_work({CategoryId: 781337});
          //政策法规
          $scope.three_tab({CategoryId: 25640});
          //综合动态
          //$scope.three_tab({CategoryId: 25653});
          //常见问题
          //$scope.three_tab({CategoryId: 41570});

          //考试信息
          commonService.getData(ALL_PORT.ArticleList.url, 'POST',
            $.extend({}, ALL_PORT.ArticleList.data, { page: '1', rows: '6',CategoryId: 25651}))
            .then(function(response) {
                $scope.examData = response.Data;
            });
          //工作动态 学习动态图片轮播
          $scope.timer ='';
          $scope.picSlide = function () {
            //console.log("repeat结束");
            $(function () {
              //console.log($('.newsBoxTab .newsPic a').length);
              clearInterval($scope.timer);
              var index = 1;
              //console.log(index);
              var slideFn = function(){
                $('.newsBoxTab .newsPic li').eq(index).show().siblings('.newsBoxTab .newsPic li').hide();
                index++;
                if(index > 4){
                  index = 0;
                }
              };
              $scope.timer = setInterval(slideFn,3000);
              $(".newsBoxTab .newsPic li").mouseover(function () {
                clearInterval($scope.timer);
              });
              $(".newsBoxTab .newsPic li").mouseout(function () {
                //timer;
                $scope.timer = setInterval(slideFn,3000);
              })


            });
          };



          //通知公告
          commonService.getData(ALL_PORT.noticeAnnouncement.url, 'POST',
            ALL_PORT.noticeAnnouncement.data)
            .then(function(response) {
              $loading.finish('noticeAnnouncement');
              $scope.noticeData = response.Data;
            });

          //表单输入变化
            $scope.inputChange = function() {
                //$scope.userMessage.RememberMe = false;
            };

            //focus
            $scope.inputFocus = function() {
                    $scope.showError = false;
                }
                //防伪造请求
            var token = commonService.AntiForgeryToken();

            /*$scope.login=$.extend({},$scope.login,token);
            console.log($scope.login);*/
            //退出
            $scope.loginOut = commonService.loginOut;

            //踢出其他地方登录账号
            function kickOut(kickUserId) {
                //踢出操作
                //console.log(AddAntiForgeryToken({ kickUserId: kickUserId }));
                var tokenKick = AddAntiForgeryToken({ kickUserId: kickUserId });
                commonService.getData(API_URL + "/Page/KickOut", 'POST',
                        $.extend({}, ALL_PORT.LoginOut.data, tokenKick))
                    .then(function(response) {
                        if (response.Type == 1) {
                            //重新登录
                            //console.log(response.Type);
                            //window.location.reload();
                            $scope.clickLogin($scope.userMessage.RememberMe);
                        }
                    });
            }

            //点击登陆
            var encryptUserName;
            var encryptPassWorld;
            $scope.clickLogin = function(rememberMe) {
                    encryptUserName = $scope.login.Account.rsaEnscrypt();
                    encryptPassWorld = $scope.login.PassWord.rsaEnscrypt();

                    var urlShort = rememberMe ? "LoginMe" : "LoginCode";
                    if ($scope.login.Account && $scope.login.PassWord) {
                        $loading.start('userLogin');
                        commonService.getData(API_URL + "/Page/" + urlShort, 'POST', $.extend({}, $scope.login, token))
                            .then(function(data) {
                                $loading.finish('userLogin');
                                if (data.Type == 0) {
                                    /*$scope.login.Account = '';
                                     $scope.login.PassWord = '';*/
                                    $scope.showError = true;
                                } else if (data.Type == 1) {
                                    $scope.showLogin = false;
                                    window.location.reload();
                                    /*if (window.location.search) {
                                     var returnurl = window.location.search.substring(1);
                                     window.location = returnurl;
                                     }
                                     else {
                                     window.location = "/";
                                     }*/
                                } else if (data.Type == 2) {
                                    commonService.alertMs("首次登录，请修改密码！");
                                    $location.path('/personalCenter/modifyPassword');
                                } else if (data.Type == 3) {
                                    if (window.confirm("帐号在别的地方登录，是否踢出？")) {
                                        kickOut(data.Message);
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else if (data.Type == 4) {
                                    commonService.alertMs("此电脑已经有用户登录，您不能用其他帐号再次登录！");
                                } else if (data.Type == 5) {
                                    commonService.alertMs("平台当前在线人数到达上限，请稍后再试！");
                                } else if (data.Type == 6) {
                                    commonService.alertMs(data.Message);
                                } else if (data.Type == 7) {} else if (data.Type == 10) {
                                    commonService.alertMs("您还不是本平台成员，将为您转向您所在的平台：" + data.Message, 2);
                                    return;
                                } else if (data.Type == 11) {
                                    commonService.alertMs(data.Message);
                                } else if (data.Type == 12 || data.Type == 13) {
                                    commonService.alertMs(data.Message);
                                } else {

                                }
                            }, function(data) {
                                alert("重新登陆！");
                                window.location.reload();
                            });
                    } else {
                        alert("用户名或密码不能为空！");
                    }

                    /*$scope.login.Account = '';
                    $scope.login.PassWord = '';*/
                }
                //记住密码
            function rememberPW() {
                var userid = commonService.getCookie2('rememberMe', "userid");
                var pwd = commonService.getCookie2('rememberMe', 'pwd');
                // var rememberMe = $cookieStore.get("rememberMe");
                // console.log(userid, pwd);
                commonService.getData(API_URL + "/Page/GetLoginName", 'POST', { name: userid })
                    .then(function(response) {
                        if (response.Type == 1) {
                            //console.log(response.Message);
                            $scope.login.Account = response.Message;
                            $scope.login.PassWord = pwd;
                        }
                    });
            }
            //专题培训轮播新闻
            commonService.getData(ALL_PORT.TrainingClass.url, 'POST',
                    ALL_PORT.TrainingClass.data)
                .then(function(response) {
                    $loading.finish('specialTraining');
                    $scope.activeData = response.Data.ListData[0];
                    var specialTraining = response.Data.ListData;
                    specialTraining.shift();
                    $scope.specialTraining = specialTraining;
                });

            //单位排行
            commonService.getData(ALL_PORT.LeftGroupRank.url, 'POST',
                    ALL_PORT.LeftGroupRank.data)
                .then(function(response) {
                    $loading.finish('rankingList');
                    $scope.govermentRanking = response.Data;
                });

            //实时数据
            commonService.getData(ALL_PORT.LeftRealTimeData.url, 'POST',
                    ALL_PORT.LeftRealTimeData.data)
                .then(function(response) {
                    $loading.finish('realTimeList');
                    $scope.realTimeData = response.Data;
                });
          //更换单位排行和课件点击排行前三的序号背景、字体颜色
          $scope.changeBg = function () {
            $(function(){
              $(".rankingList li:eq(0) .list1 span").removeClass("list1_bg").addClass("list1_bg_pic1").html("");
              $(".rankingList li:eq(1) .list1 span").removeClass("list1_bg").addClass("list1_bg_pic2").html("");
              $(".rankingList li:eq(2) .list1 span").removeClass("list1_bg").addClass("list1_bg_pic3").html("");
             /* $(".rankingList li:eq(0)").addClass("textYellow");
              $(".rankingList li:eq(1)").addClass("textGray");
              $(".rankingList li:eq(2)").addClass("textBrown");*/

            })
          };

          //培训列表
          //引导性培训
            commonService.getData(ALL_PORT.CourseList.url, 'POST',
              $.extend({}, ALL_PORT.CourseList.data,{channelId:2}))
              .then(function(response) {
                  $scope.guideCourseData = response.Data;
                  //console.log(response.Data);
              });
          //技能培训
            commonService.getData(ALL_PORT.CourseList.url, 'POST',
              $.extend({}, ALL_PORT.CourseList.data,{channelId:16}))
              .then(function(response) {
                $scope.skillCourseData = response.Data;
                //console.log(response.Data);
              });
          //其他培训
          commonService.getData(ALL_PORT.CourseList.url, 'POST',
            $.extend({}, ALL_PORT.CourseList.data,{channelId:17}))
            .then(function(response) {
              $scope.otherCourseData = response.Data;
              //console.log(response.Data);
            });

          /*$http({
            method:'POST',
            url:ALL_PORT.CourseList.url,
            data:$.param(ALL_PORT.CourseList.data)
          }).success(function(response){
            $scope.guideCourseData = response.Data;
            console.log(response.Data)
          }).error(function (error, status) {

          });*/

          //引导性培训
          //$scope.CourseList({channelId:249});
          //技能培训
          //$scope.CourseList({channelId:250});
          //其他培训
         //$scope.CourseList({channelId:251});
            //课程中心
           /* //课程分类
            commonService.getData(ALL_PORT.CourseCategory.url, 'POST',
                    $.extend({}, ALL_PORT.CourseCategory.data, { page: '1', rows: '5' }))
                .then(function(response) {
                    $scope.courselassification = response.Data.ListData;
                    $scope.courselassificationList0 = response.Data.ListData[0];
                    $scope.courselassification.shift();
                });*/
           /* //课程列表
            var params = {
                page: '1',
                rows: '6',
                sort: 'Sort',
                order: 'desc',
                flag: 'All',
                courseType: 'All',
                wordLimt: '35',
                channelId: '',
                title: ''
            };
            $scope.searchCourseList = function(id, Sort, flag, title) {
                $loading.start('courseList');
                params.channelId = id || '';
                params.Sort = Sort || 'Sort';
                params.flag = flag || 'All';
                params.title = title || '';
                commonService.getData(ALL_PORT.CourseList.url, 'POST', params)
                    .then(function(response) {
                        $loading.finish('courseList');
                        $scope.courseCenterData = response.Data;
                        $scope.imageCourse = response.Data.ImageCourse;
                        //console.log($scope.imageCourse);
                    });
            };
            $scope.searchCourseList();*/

          /*  $scope.renderFinish = function() {
                $('.courselLink>.btn').on('click', function() {
                    $(this).addClass('active').siblings('a').removeClass('active');
                });

            };*/

            //进入培训班 用户权限
            $scope.checkUserClass = function(id) {
                commonService.getData(ALL_PORT.CheckUserClass.url, 'POST', $.extend({}, ALL_PORT.CheckUserClass.data, { trainingId: id }))
                    .then(function(response) {
                        if (response.Type === 0) {
                            alert("没有权限访问，请先加入培训班!");
                        } else {
                            window.open('#/specialTrainingCourse/classDetail/' + id);
                            // $location.path('/specialTrainingCourse/classDetail/'+id);
                        }
                    });

            };

            //未读通知小提示
            $scope.showTip = false;
            commonService.getData(ALL_PORT.UnReadNotice2.url, 'POST', $.extend({}, ALL_PORT.UnReadNotice2.data))
                .then(function(response) {
                    $scope.unReadNoticeList = response.Data;
                    if (response.Data.length > 0) {
                        $scope.showTip = true;
                    }
                });
            //关闭小提示
            $scope.closeTip = function() {
                $scope.showTip = false;
            };
          //站内搜索
          commonService.searchAll();

        });
