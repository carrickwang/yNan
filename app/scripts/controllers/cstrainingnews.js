'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:NewscenterCtrl
 * @description
 * # NewscenterCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('csTrainingNewsCtrl', function($scope, commonService, $location, $loading) {

        $loading.start('tmnewsphoto');
        $loading.start('tmpolicyandnotify');

        // $scope.searchNewsField = '请输入关键字';
        $scope.isNews=true;

        $scope.newsData = {
            photoNews: {
                data: [],
                ID: null
            },
            policies: {
                data: [],
                ID: null
            },
            notifies: {
                data: [],
                ID: null
            }
        };
        $scope.newsData.newsCenterTitle = ['政策法规', '公告通知'];
        $scope.findNews = function() {
            $location.path('/search/' + 33 + '/' + $scope.searchNewsField);
        };
        $scope.goThere = function(id) {
            document.getElementById(id).scrollIntoView(true);
            // commonService.anchorScroll().toView('#'+id,true);
        };



        //图片新闻
        commonService.getData(ALL_PORT.ArticleList.url, 'POST',
                $.extend({}, ALL_PORT.ArticleList.data, { page: 1, rows: 7, categoryId: 75 }))
            .then(function(response) {
                $loading.finish('tmnewsphoto');
                if (response.Data.ListData.length !== 0) {
                    $scope.ImgSrc = response.Data.Path + '/' + response.Data.ListData[0].Img;
                }
                $scope.newsData.photoNews.data = response.Data.ListData;
                $scope.newsData.photoNews.ID = response.Data.CategoryId;


            });

        //政策法规
        commonService.getData(ALL_PORT.ArticleList.url, 'POST',
                $.extend({}, ALL_PORT.ArticleList.data, { page: 1, rows: 7, categoryId: 76 }))
            .then(function(response) {
                $loading.finish('tmpolicyandnotify');
                $scope.newsData.policies.data = response.Data.ListData;
                $scope.newsData.policies.ID = response.Data.CategoryId;

            });

        //公告通知
        commonService.getData(ALL_PORT.ArticleList.url, 'POST',
                $.extend({}, ALL_PORT.ArticleList.data, { page: 1, rows: 7, categoryId: 77 }))
            .then(function(response) {
                $loading.finish('tmpolicyandnotify');
                $scope.newsData.notifies.data = response.Data.ListData;
                $scope.newsData.notifies.ID = response.Data.CategoryId;

            });


    });
