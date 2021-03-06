'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:PhotoalbumlistCtrl
 * @description
 * # photoAlbumListCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('photoAlbumListCtrl', function($scope, $location, $loading, $routeParams, commonService) {
        $scope.Id = $routeParams.Id;

        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();

        //loading
        $loading.start('personalLearningInfo');
        $loading.start('classMy');
        $loading.start('photoAlbumList');

        //个人学习信息
        commonService.getData(ALL_PORT.ClassInformation.url, 'POST',
                $.extend({}, ALL_PORT.ClassInformation.data, { Id: $scope.Id }))
            .then(function(response) {
                $loading.finish('personalLearningInfo');
                $scope.classInfoData = response.Data;
            });


        //我的班级
        commonService.getData(ALL_PORT.ClassMy.url, 'POST',
                $.extend({}, ALL_PORT.ClassMy.data))
            .then(function(response) {
                $loading.finish('classMy');
                $scope.classMyData = response.Data;
            });

        //分页
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 100,
            itemsPerPage: 9, //每页显示的条数
            pagesLength: 6,
            perPageOptions: [10, 20, 30, 40, 50],
        };


        //班级相册
        $scope.queryPhotoAlbumList = function(pageOptions) {
            commonService.getData(ALL_PORT.PhotoAlbumList.url, 'POST',
                    $.extend({}, ALL_PORT.PhotoAlbumList.data, { Id: $scope.Id }, pageOptions))
                .then(function(response) {
                    $loading.finish('photoAlbumList');
                    $scope.Data = response.Data;
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.ImgSrc = response.Data.ImagePath;
                });
        };


        //添加相册
        $scope.getPhotoAlbumAdd = function() {
            $scope.hidValueImage = $('#hidValueImage').val();
            console.log($scope.hidValueImage);
            commonService.getData(ALL_PORT.GetPhotoAlbumAdd.url, 'POST',
                    $.extend({}, ALL_PORT.GetPhotoAlbumAdd.data, { Name: $scope.name, Description: $scope.description, ImgUrl: $scope.hidValueImage, TrainingId: $scope.Id }))
                .then(function(response) {
                    alert(response.Message);
                    if (response.Type > 0) {
                        $('.modal').modal('hide');
                        window.location.reload();
                    }

                });
        };


        // 通过$watch currentPage 当他们一变化的时候，重新获取数据条目
        $scope.$watch('paginationConf.currentPage', function() {
            // 发送给后台的请求数据
            var pageOptions = {
                page: $scope.paginationConf.currentPage,
            };

            $scope.queryPhotoAlbumList(pageOptions);

        });
    });