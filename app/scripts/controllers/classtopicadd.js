'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ClasstopicaddCtrl
 * @description
 * # classTopicAddCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('classTopicAddCtrl', function($scope, $routeParams, commonService, $location) {
        $scope.Id = $routeParams.Id;
        $scope.location = '发表话题';
        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();

        var token = commonService.AntiForgeryToken();

        commonService.getData(ALL_PORT.ClassTopicAdd.url, 'POST', $.extend({}, ALL_PORT.ClassTopicAdd.data, { Id: $scope.Id }))
            .then(function(response) {
                $scope.data = response.Data.ViewBag;
            });

        //获取话题分类
        commonService.getData(ALL_PORT.GetTrainingArticleCategory.url, 'POST', $.extend({}, ALL_PORT.GetTrainingArticleCategory.data, { trainingId: $scope.Id, Type: 'Topic' }))
            .then(function(response) {
                $scope.topicCategoryData = response;
            });

        $scope.config = ueditorConfig;


        //发布话题
        $scope.publishTopic = function() {
            // $scope.content=$scope.ueditorGetContent('container');
            if ($scope.title.length < 2) {
                alert('输入标题字数请大于两个字符');
            } else if ($scope.categoryId === null) {
                alert('请选择话题分类');
            } else {
                commonService.getData(ALL_PORT.ClassPublishArticle.url, 'POST', $.extend({}, ALL_PORT.ClassPublishArticle.data, {
                        Type: 'Topic',
                        TrainingId: $scope.Id,
                        Name: $scope.title,
                        CategoryId: $scope.categoryId,
                        Content: $scope.content
                    }, token))
                    .then(function(response) {
                        if (response.Type === 1) {
                            alert(response.Message);
                            $location.path('/specialTrainingCourse/classDetail/' + $scope.Id);
                        } else {
                            alert(response.Message);
                        }

                    });
            }
        };

    });