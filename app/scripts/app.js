'use strict';

/**
 * @ngdoc overview
 * @name luZhouApp
 * @description
 * # luZhouApp
 *
 * Main module of the application.
 */
angular
  .module('luZhouApp', [
    'ng',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'darthwade.dwLoading',
    'ng.ueditor'
  ])
  .config(function ($routeProvider,$httpProvider/*$locationProvider*/) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/courseCenter', {
        templateUrl: 'views/coursecenter.html',
        controller: 'CoursecenterCtrl',
        controllerAs: 'courseCenter'
      })
      .when('/courseCenter/:channelId', {
        templateUrl: 'views/coursecenter.html',
        controller: 'CoursecenterCtrl',
        controllerAs: 'courseCenter'
      })
      .when('/personalCenter', {
        templateUrl: 'views/personalcenter.html',
        controller: 'PersonalcenterCtrl',
        controllerAs: 'personalCenter'
      })
      .when('/testCenter', {
        templateUrl: 'views/testcenter.html',
        controller: 'TestcenterCtrl',
        controllerAs: 'testCenter'
      })
      .when('/specialTrainingCourse', {
        templateUrl: 'views/specialtrainingcourse.html',
        controller: 'SpecialtrainingcourseCtrl',
        controllerAs: 'specialTrainingCourse'
      })
      .when('/csTrainingNews',{
          templateUrl: 'views/news/cstrainingnews.html',
          controller: 'csTrainingNewsCtrl',
          controllerAs: 'csTrainingNews'
      })
      .when('/patpTrainingNews',{
          templateUrl: 'views/news/patptrainingnews.html',
          controller: 'patpTrainingNewsCtrl',
          controllerAs: 'patpTrainingNews'
      })
      .when('/articleDetail/:ID',{
          templateUrl: 'views/news/articledetail.html',
          controller: 'articleDetailCtrl',
          controllerAs: 'articleDetail'
      })
       .when('/newsinfo/:ID',{
            templateUrl: 'views/news/newsinfo.html',
            controller: 'newsInfoCtrl',
            controllerAs: 'NewsInfo'
        })
        .when('/noticeDetail/:ID',{
            templateUrl: 'views/news/articledetail.html',
            controller: 'noticeDetailCtrl',
            controllerAs: 'noticeDetail'
        })
      .when('/search/:ID/:text',{
          templateUrl:'views/news/searchresult.html',
          controller:'searchResultCtrl',
          controllerAs:'searchResult'
      })
      .when('/search/:text',{
        templateUrl:'views/news/searchresult.html',
        controller:'searchResultCtrl',
        controllerAs:'searchResult'
      })
      .when('/courseCenter/courseDetails/:Id', {
        templateUrl: 'views/courseCenter/coursedetails.html',
        controller: 'CoursedetailsCtrl',
        controllerAs: 'courseDetails'
      })
      .when('/personalCenter/studyStat', {
        templateUrl: 'views/personalCenter/studystat.html',
        controller: 'StudystatCtrl',
        controllerAs: 'studyStat'
      })
      .when('/personalCenter/testStat', {
        templateUrl: 'views/personalCenter/teststat.html',
        controller: 'TeststatCtrl',
        controllerAs: 'testStat'
      })
      .when('/personalCenter/myFavorite', {
        templateUrl: 'views/personalCenter/myfavorite.html',
        controller: 'MyfavoriteCtrl',
        controllerAs: 'myFavorite'
      })
      .when('/personalCenter/studyPlan', {
        templateUrl: 'views/personalCenter/studyplan.html',
        controller: 'StudyplanCtrl',
        controllerAs: 'studyPlan'
      })
      .when('/personalCenter/unReadNotice', {
        templateUrl: 'views/personalCenter/unreadnotice.html',
        controller: 'unReadNoticeCtrl',
        controllerAs: 'unReadNotice'
      })
      .when('/personalCenter/modifyPassword', {
        templateUrl: 'views/personalCenter/modifyPassword.html',
        controller: 'modifyPasswordCtrl',
        controllerAs: 'modifyPassword'
      })
      .when('/personalCenter/securitySetting', {
        templateUrl: 'views/personalCenter/securitysetting.html',
        controller: 'securitySettingCtrl',
        controllerAs: 'securitySetting'
      })
      .when('/personalCenter/changeUser', {
        templateUrl: 'views/personalCenter/changeuserinfo.html',
        controller: 'changeUserInfoCtrl',
        controllerAs: 'changeUserInfo'
      })
      .when('/specialTrainingCourse/classDetail/:Id', {
        templateUrl: 'views/specialTrainingCourse/classdetail.html',
        controller: 'classDetailCtrl',
        controllerAs: 'classDetail'
      })
      .when('/specialTrainingCourse/classPlan/:Id', {
        templateUrl: 'views/specialTrainingCourse/classplan.html',
        controller: 'classPlanCtrl',
        controllerAs: 'classPlan'
      })
      .when('/specialTrainingCourse/classStudent/:Id', {
        templateUrl: 'views/specialTrainingCourse/classstudent.html',
        controller: 'classStudentCtrl',
        controllerAs: 'classStudent'
      })
      .when('/specialTrainingCourse/classPaperList/:Id', {
        templateUrl: 'views/specialTrainingCourse/classpaperlist.html',
        controller: 'classPaperListCtrl',
        controllerAs: 'classPaperList'
      })
      .when('/specialTrainingCourse/photoAlbumList/:Id', {
        templateUrl: 'views/specialTrainingCourse/photoalbumlist.html',
        controller: 'photoAlbumListCtrl',
        controllerAs: 'photoAlbumList'
      })
      .when('/specialTrainingCourse/classTopicList/:Id', {
        templateUrl: 'views/specialTrainingCourse/classtopiclist.html',
        controller: 'classTopicListCtrl',
        controllerAs: 'classTopicList'
      })
      .when('/specialTrainingCourse/classCourse/:Id/:Type', {
        templateUrl: 'views/specialTrainingCourse/classcourse.html',
        controller: 'classCourseCtrl',
        controllerAs: 'classCourse'
      })
      .when('/specialTrainingCourse/classNotice/:Id', {
        templateUrl: 'views/specialTrainingCourse/classnotice.html',
        controller: 'classNoticeCtrl',
        controllerAs: 'classNotice'
      })
      .when('/specialTrainingCourse/classExam/:Id', {
        templateUrl: 'views/specialTrainingCourse/classexam.html',
        controller: 'classExamCtrl',
        controllerAs: 'classExam'
      })
      .when('/specialTrainingCourse/classArticleDetail/:Id', {
          templateUrl: 'views/specialTrainingCourse/classarticledetail.html',
          controller: 'classArticleDetailCtrl',
          controllerAs: 'classArticleDetail'
      })
      .when('/specialTrainingCourse/classTopicAdd/:Id', {
          templateUrl: 'views/specialTrainingCourse/classtopicadd.html',
          controller: 'classTopicAddCtrl',
          controllerAs: 'classTopicAdd'
      })
      .when('/specialTrainingCourse/classPaperAdd/:Id', {
          templateUrl: 'views/specialTrainingCourse/classpaperadd.html',
          controller: 'classPaperAddCtrl',
          controllerAs: 'classPaperAdd'
      })
      .when('/specialTrainingCourse/photoAlbumAdd/:Id', {
          templateUrl: 'views/specialTrainingCourse/photoalbumadd.html',
          controller: 'photoAlbumAddCtrl',
          controllerAs: 'photoAlbumAdd'
      })
      .when('/specialTrainingCourse/photoPreview/:AlbumId/:TrainingId', {
          templateUrl: 'views/specialTrainingCourse/photopreview.html',
          controller: 'photoPreviewCtrl',
          controllerAs: 'photoPreview'
      })
      .when('/personalCenter/messageList', {
        templateUrl: 'views/personalCenter/messagelist.html',
        controller: 'MessagelistCtrl',
        controllerAs: 'messageList'
      })
      .when('/personalCenter/messageList/messageDetail/:Id', {
        templateUrl: 'views/personalCenter/messagedetail.html',
        controller: 'MessagedetailCtrl',
        controllerAs: 'messageDetail'
      })
      .when('/exam/exam/:Id', {
        templateUrl: 'views/exam/exam.html',
        controller: 'ExamCtrl',
        controllerAs: 'exam'
      })
      .when('/personalCenter/personaLearningArchives', {
        templateUrl: 'views/personalCenter/personalearningarchives.html',
        controller: 'PersonalearningarchivesCtrl',
        controllerAs: 'personaLearningArchives'
      })
      .when('/exam/examDetailList/:Id', {
        templateUrl: 'views/exam/examdetaillist.html',
        controller: 'ExamdetaillistCtrl',
        controllerAs: 'examDetailList'
      })
      .when('/exam/examReview/:examId/:recordId', {
        templateUrl: 'views/exam/examreview.html',
        controller: 'ExamreviewCtrl',
        controllerAs: 'examReview'
      })
      .when('/play/play/:Id', {
        templateUrl: 'views/play/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'play'
      })
      .when('/personalCenter/forgetPassword', {
        templateUrl: 'views/personalCenter/forgetpassword.html',
        controller: 'ForgetpasswordCtrl',
        controllerAs: 'forgetPassword'
      })
      .when('/articleList/:categoryId', {
        templateUrl: 'views/news/articlelist.html',
        controller: 'articleListCtrl',
        controllerAs: 'articleList'
      })
      .when('/rankingdetail/:rankingType', {
        templateUrl: 'views/rankingdetail/rankingdetail.html',
        controller: 'rankingDetailCtrl',
        controllerAs: 'rankingDetail'
      })
      .when('/noticelist', {
        templateUrl: 'views/news/noticelist.html',
        controller: 'noticeListCtrl',
        controllerAs: 'noticeList'
      })
      .when('/examgrade/:ExamID', {
        templateUrl: 'views/exam/examgrade.html',
        controller: 'examGradeCtrl',
        controllerAs: 'examGrade'
      })
      .otherwise({
        redirectTo: '/main'
      });
   /* $locationProvider.html5Mode(true);//启用html5模式*/
    $httpProvider.defaults.headers.post = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    };
    $httpProvider.defaults.withCredentials = true;
  });
