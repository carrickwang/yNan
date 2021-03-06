'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmCourseSupermarket
 * @description
 * # tmCourseSupermarket
 */
angular.module('luZhouApp')
    .directive('tmCourseSupermarket', function() {
        return {
            templateUrl: 'components/tmCourseSupermarket.html',
            restrict: 'EA',
            transclude: {
                'pagation': 'tm-pagation'
            },
            link: function(scope, element, attrs) {
		        //排序方式
                //console.log($('.title_bar a').children('span').html());
                $('.title_bar a').click(function(){
                    if ($(this).children('span').html()=='▼'){
                        $(this).children('span').html('▲');
                         $(this).parent('span').siblings('span').children().children('span').html('▼');
                    }else if ($(this).children('span').html()=='▲'){
                        $(this).children('span').html('▼');
                        //$(this).parent('span').siblings('span').children().children('span').html('▲');
                    }
                });

            }
        };
    });
