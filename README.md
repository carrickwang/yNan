# lu-zhou

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
## 页面名称以及对应controller
### views &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controller
1. main.html(首页)      main.js
2. guideview.html(引导页) guideview.js
3. coursecenter.html(课程中心)  coursecenter.js
4. personalcenter.html(个人中心)  personalcenter.js
5. testcenter.html (考试中心)  testcenter.js
6. specialtrainingcourse.html (专题培训班)  specialtrainingcourse.js
7. cstrainingnews.html (公务员培训新闻) cstrainingnews.js
8. patptrainingnews.html (专业技术人员培训新闻) patptrainingnews.js
9. searchresult.html (搜索结果) searchresult.js
10. newsinfo.html (新闻信息) newsinfo.js
11. noticedetail.html (公告内容) noticedetail.js
12. articledetail.html (新闻内容) articledetail.js
13. studyplan.html (学习计划) studyplan.js
14. teststat.html (考试统计) teststat.js
15. myfavorite.html (我的收藏) myfavorite.js
16. studystat.html (学习统计) studystat.js
17. messagelist.html (留言板) messagelist.js
18. messagedetail.html (留言内容详情) messagedetail.js
19. exam.html (考试页面) exam.js
20. classdetail.html (专题培训班--班级详情) classdetail.js
21. classnotice.html (专题培训班--班级公告) classnotice.js
22. classcourse.html (专题培训班--班级课程) classcourse.js
23. classexam.html (专题培训班--班级考试) classexam.js
24. classtopiclist.html (专题培训班--班级话题) classtopiclist.js
25. classpaperlist.html (专题培训班--班级论文) classpaperlist.js
26. photoalbumlist.html (专题培训班--班级相册) photoalbumlist.js
27. classplan.html (专题培训班--教学计划) classplan.js
28. classarticledetail.html (专题培训班--班级文章内容) classarticledetail.js
29. classpaperadd.html (专题培训班--添加论文) classpaperadd.js
30. classtopicadd.html (专题培训班--添加话题) classtopicadd.js
31. photoalbumadd.html (专题培训班--添加相册) photoalbumadd.js
32. photopreview.html (专题培训班--班级照片) photopreview.js
33. classstudent.html (专题培训班--同学名录) classstudent.js
34. coursedetails.html (课程详情) coursedetails.js
35. examdetaillist.html (考试记录列表) examdetaillist.js
36. examreview.html (考试详情) examreview.js
37. changeuserinfo.html (修改用户信息) changeuserinfo.js
38. forgetpassword.html (忘记密码) forgetpassword.js
39. modifypassword.html (修改密码) modifypassword.js
40. personalearningarchives.html (个人学习档案) personalearningarchives.js
41. securitysetting.html (设置密保) securitysetting.js
42. unreadnotice.html (未读通知) unreadnotice.js
43. play.html (播放页) play.js

## directives(组件指令) => components(组件)

1.  tmheader.js = > tmHeader.html (页面头部)
2.  tmfooter.js = > tmFooter.html (页面底部)
3.  tmnavbars.js = > tmNavbars.html (导航条)
4.  tmspecialtraining.js = > tmSpecialTraining.html (专题培训，轮播)
5.  tmuserlogin.js = > tmUserLogin.html (用户登录)
6.  tmcoursecenter.js = > tmCourseCenter.html (课程中心)
7.  tmgovernmentranking.js = > tmGovernmentRanking.html (单位排行)
8.  tmrealtimedata.js = > tmRealTimeData.html (实时数据)
9.  tmimportantnotice.js = >tmImportantNotice.html (重要通知)
10. tmnewsinformation.js = > tmNewsInformation.html (新闻资讯)
11. tmguideentry.js = > tmGuideEntry.html (入口模块)
12. tmnoticeannouncement.js = > tmNoticeAnnouncement.html (通知公告短)
13. tmcivilservicetraininglink.js =>tmCivilServiceTrainingLink.html(公务员培训新闻)
14. tmtechniciantraininglink.js =>tmtechniciantraininglink.html(专业技术人员培训新闻短)
15. tmfriendlylink.js =>tmfriendlylink.html(友情链接短)
16. tmcourseclassify.js =>tmcourseclassify.html(课程分类)
17. tmCourseSupermarket.js =>tmCourseSupermarket.html(课程超市)
18. tmCourseRankingList.js =>tmCourseRankingList.html(课程排行)
19. tmlocation.js =>tmLocation.html(页面位置)
20. tmnewsphoto.js =>tmNewsPhoto.html(图片新闻)
21. tmpolicyandnotify.js =>tmPolicyAndNotify.html(政策法规与公告通知)
22. tmuserinformation.js =>tmUserInformation.html (个人信息)
23. tmstudentshourranking.js =>tmstudentshourranking.html (学员学时排行)
24. tmMyCenter.js =>tmMyCenter.html (个人中心列表)
25. tmExamList.js =>tmExamList.html (考试中心列表)
26. tmtrainingcenter.js =>tmTrainingTenter.html (专题培训班列表)
27. tmstudystat.js =>tmStudyStat.html (个人中心学习统计)
28. tmteststat.js =>tmeststat.html (个人中心考试统计)
29. tmnewswithphoto.js =>tmNewsWithPhoto.html (新闻信息中的图片新闻)
30. tmnewswithoutphoto.js =>tmNewsWithoutPhoto.html (新闻信息中的文字新闻)
31. tmshowarticledatail.js =>tmShowArticleDetail.html (显示内容)
32. tmmyfavorite.js.js =>tmMyfavorite.html (我的收藏)
33. tmstudyplan.js =>tmStudyPlan.html (学习计划)
34. tmmessagelist.js =>tmessagelist.html (留言板)
35. tmexam.js =>tmExam.html (考试测试)
36. tmclassdetail.js =>tmClassDetail.html (班级详情)
37. tmclasscourse.js =>tmClassCourse.html (班级课程)
38. tmclassexam.js =>tmClassExam.html (班级考试)
39. tmclassnotice.js =>tmClassNotice.html (班级公告)
40. tmclasspaperlist.js =>tmClassPaperList.html (班级论文)
41. tmclassplan.js =>tmClassPlan.html (教学计划)
42. tmclassstudent.js =>tmClassStudent.html (同学名录)
43. tmclasstopiclist.js =>tmClassTopicList.html (班级话题)
44. tmphotoalbumadd.js =>tmPhotoAlbumAdd.html (添加相册)
45. tmphotoalbumlist.js =>tmPhotoAlbumList.html (班级相册)
46. tmphotopreview.js =>tmPhotoPreview.html (相册照片)
47. tmpublish.js =>tmPublish.html (发布)
48. tmchangeuserinfo.js =>tmChangeUserInfo.html(更改用户信息)
49. tmclassmy.js =>tmClassMy.html(我的班级)
50. tmclassnavigation.js =>tmClassNavigation.html(班级导航)
51. tmcoursedetails.js =>tmCourseDetails.html(课程详情)
52. tmexamdetail.js =>tmExamDetail.html(考试详细记录)
53. tmexamlist.js =>tmExamList.html(考试中心-考试记录)
54. tmexamreview.js =>tmExamReview.html(考试中心-考试答题明细)
55. tmforgetpassword.js =>tmForgetPassword.html(忘记密码)
56. tmmessagedetail.js =>tmMessageDetail.html(留言板详情)
57. tmmessagelist.js =>tmMessageList.html(留言板)
58. tmmodifypassword.js =>tmModifyPassword.html(修改密码)
59. tmmyfavorite.js =>tmMyFavorite.html(我的收藏)
60. tmpersonalarchives.js =>tmPersonalArchives.html(个人学习档案)
61. tmpersonalcenternav.js =>tmPersonalCenterNav.html(个人中心导航)
62. tmpersonallearningnfo.js =>tmPersonalLearningInfo.html(个人学习信息)
63. tmsearchresult.js =>tmSearchResult.html(搜索结果)
64. tmsecuritysetting.js =>tmSecuritySetting.html(设置密保)
65. tmteststat.js =>tmTestStat.html(考试统计)
66. tmtip.js =>tmTip.html(未读通知小提示)
67. tmtrainingcenter.js =>tmTrainingCenter.html(专题培训班)
68. tmunreadnotice.js =>tmUnReadNotice.html(未读通知)


## directives(非组件指令)

1. errsrc.js （图片路径找不到替换error图片）
1. repeatfinish.js （ng-repeat 渲染完成后执行的操作）

## filters
1. datafilter.js (日期过滤) 用法：time| dateFilter | date:'yyyy-MM-dd'
2. trusthtml.js (DOM字符串过滤) 用法: DOMStr| trustHtml

## services
1. commonservice.js

## styles
1. 960_24_col.css （布局）
2. main.css （页面通用的样式）
