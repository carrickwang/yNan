'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:PhotoalbumaddCtrl
 * @description
 * # photoAlbumAddCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('photoAlbumAddCtrl', function($scope, $location, $loading, $routeParams, commonService) {
        $scope.Id = $routeParams.Id;
        $scope.location = '添加相册';

        //判断能否访问
        commonService.isVisit();
        //保持在线
        commonService.keepOnline();

        commonService.getData(ALL_PORT.PhotoAlbumAdd.url, 'POST',
            $.extend({}, ALL_PORT.PhotoAlbumAdd.data, { TrainingId: $scope.Id }))

        .then(function(response) {
            $scope.data = response.Data;
        });


        //添加相册
        $scope.getPhotoAlbumAdd = function() {
            $scope.hidValueImage = $('#hidValueImage').val();
            console.log($scope.hidValueImage);
            commonService.getData(ALL_PORT.GetPhotoAlbumAdd.url, 'POST',
                    $.extend({}, ALL_PORT.GetPhotoAlbumAdd.data, { Name: $scope.name, Description: $scope.description, ImgUrl: $scope.hidValueImage, TrainingId: $scope.Id }))
                .then(function(response) {
                    alert(response.Message);
                    if (response.Type > 0) {
                        $location.path('/specialTrainingCourse/photoAlbumList/' + $scope.Id);
                    }

                });
        };
    });