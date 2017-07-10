"user strict"
//请求后台数据入口
var API_URL = "/api";
//var API_URL = "http://122.225.101.117:81/api";
var API_URL_ADMIN = API_URL + "/admin";


var NAVISOBJ = false;
var IMPORT = {
    userimportfields: "用户导入模板.xls",
    courseimportfields: "课程导入模板.xls",
    examimportlist: "试题导入模板.xls",
    traininguserimportlist: "培训班用户导入模板.xls",
    groupimportfieldlist: "单位导入模板.xls",
    coursenodeimportlist: "课程节点导入模板.xls",
    pointfieldimport: "字段导入模版",
    a: "用户排行设置导入模板.xls"
};
var BROSWER = (function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
        return "IE";
    }//isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    return "Other";
})();

function dyniframesize(down) {
  var pTar = null;
  if (document.getElementById){
    pTar = document.getElementById(down);
  }
  else{
    eval('pTar = ' + down + ';');
  }
  if (pTar && !window.opera){
//begin resizing iframe
    pTar.style.display="block"
    if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){
//ns6 syntax
      pTar.height = pTar.contentDocument.body.offsetHeight +20;
      pTar.width = pTar.contentDocument.body.scrollWidth+20;
    }
    else if (pTar.Document && pTar.Document.body.scrollHeight){
//ie5+ syntax
      pTar.height = pTar.Document.body.scrollHeight;
      pTar.width = pTar.Document.body.scrollWidth;
    }
  }
}

//ueditor配置
var ueditorConfig = {
	//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
	toolbars: [
		['fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold',
			'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript',
			'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|',
			'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall',
			'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle',
			'paragraph', 'fontfamily', 'fontsize', '|', 'directionalityltr', 'directionalityrtl',
			'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
			'touppercase', 'tolowercase', '|', 'link', 'unlink', 'anchor', '|', 'imagenone',
			'imageleft', 'imageright', 'imagecenter', '|', 'simpleupload', 'insertimage',
			'pagebreak', '|', 'horizontal', 'date', 'time', 'spechars', '|',
			'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow',
			'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells',
			'splittorows', 'splittocols', 'charts', '|', 'preview', 'print', 'searchreplace', 'drafts',
			'insertcode', 'template', 'background'
		]
	],
	autoHeightEnabled: false,
	elementPathEnabled: false, //元素路径
	initialContent: '',
	focus: false,
	indentValue: '2em',
	initialFrameWidth: 1000, //初始化编辑器宽度,默认1000
	initialFrameHeight: 320, //初始化编辑器高度,默认320
	readonly: false, //编辑器初始化结束后,编辑区域是否是只读的，默认是false
	enableAutoSave: true, //启用自动保存
	saveInterval: 500, //自动保存间隔时间， 单位ms
	fullscreen: false, //是否开启初始化时即全屏，默认关闭
	imagePopup: true, //图片操作的浮层开关，默认打开
	allHtmlEnabled: false //提交到后台的数据是否包含整个html字符串
};


//所有接口
var ALL_PORT = {
  //判断能否访问页面接口
  Authorization:{
    url:API_URL+"/Page/Authorization",
    data:{}
  },
  //保持在线
  KeepOnline:{
    url:API_URL+"/Page/KeepOnline"
  },
  //新闻
  ArticleList:{
    url:API_URL+"/Page/ArticleList",
    data:{sort:'Sort',order:'desc',wordLimt:'20',search:''}
  },
  //新闻内容
  ArticleContent:{
    url:API_URL+"/Page/ArticleContent",
    data:{}
  },

  //通知公告
  noticeAnnouncement:{
    url:API_URL+"/Page/LeftNotice",
    data:{page:'1',rows:'4',sort:'Sort',order:'desc',wordLimt:'15'}
  },
  //通知内容
  noticeContent:{
    url:API_URL+"/Page/NoticeContent",
    data:{Id:'',titleNav:'通知内容'}
  },
  //友情链接
  Blogroll:{
    url:API_URL+"/Page/Blogroll",
    data:{}
  },
  //培训课程
  TrainingClass:{
    url:API_URL+"/Page/TrainingClass",
    data:{sort:'Id',order:'desc'}
  },
  //请求用户信息
  LoginShort:{
    url:API_URL+"/Page/LoginShort",
    data:{}
  },
  //防伪造请求
  AntiForgeryToken:{
    url:API_URL+"/Page/AntiForgeryToken",
    data:{}
  },
  //用户退出
  LoginOut:{
    url:API_URL+"/Page/LoginOut",
    data:{}
  },
  //踢出其他地方登录账号
  KickOut:{
    url:API_URL+"/Page/KickOut",
    data:{}
  },
  //点击登陆（没有记住密码）
  LoginMe:{
    url:API_URL+"/Page/LoginMe",
    data:{}
  },
  //点击登陆（记住密码）
  LoginCode:{
    url:API_URL+"/Page/LoginCode",
    data:{}
  },
  //记住密码
  GetLoginName:{
    url:API_URL+"/Page/GetLoginName",
    data:{}
  },
  //单位排行
  LeftGroupRank:{
    url:API_URL+"/Page/LeftGroupRank",
    data:{page:1,rows:10,sort:"AvgCredit",order:"desc",titleNav:'单位排行',wordLimt:9}
  },
  //实时数据
  LeftRealTimeData:{
    url:API_URL+"/Page/LeftRealTimeData",
    data:{}
  },
  //课程分类
  CourseCategory:{
    url:API_URL+"/Page/CourseCategory",
    data:{titleNav:"课程分类",sort:'Sort',order:'-Desc'}
  },
  //课程列表
  CourseList:{
    url:API_URL+"/Page/CourseList",
    data:{page:'1',rows:'4',sort:'Sort',order:'desc',title:'',courseType:'All',channelId:'',wordLimt:15}
  },
  //课程点击排行
  CourseClickRank:{
    url:API_URL+"/Page/CourseClickRank",
    data:{page:1,rows:19,sort:'ClickCount',order:'desc',courseType:'All',flag:'All',titleNav:'课程排行',wordLimt:35}
  },
  //批量选课
  AddStudyCourse:{
    url:API_URL+"/Page/AddStudyCourse",
    data:{checkValue:''}
  },
  //个人中心个人信息
  LoginLong:{
    url:API_URL+"/Page/LoginLong",
    data:{}
  },
  //学员学时排行
  LeftUserRank:{
    url:API_URL+"/Page/LeftUserRank",
    data:{page:1,rows:10,sort:'TotalCredit',order:'desc',titleNav:"学员学时排行",wordLimt:6}
  },
  //个人中心课程
  MyCenter:{
    url:API_URL+"/Page/MyCenter",
    data:{page:1,rows:10,sort:'BrowseScore',order:'desc',titleNav:"个人中心",courseType:"Unfinish",title:""}
  },
  //考试中心列表
  ExamList:{
    url:API_URL+"/Page/ExamList",
    data:{page:1,rows:5,sort:'Id',order:'desc',titleNav:"考试中心",examType:"All",title:""}
  },
  //专题培训班分类
  GetTrainingClassTypeList:{
    url:API_URL+"/Page/GetTrainingClassTypeList",
    data:{titleNav:"培训班分类",sort:'Sort',order:'Desc'}
  },
  //我的班级
  ClassMy:{
    url:API_URL+"/Page/ClassMy",
    data:{page:1,rows:7,sort:'Id',order:'desc',titleNav:"我的班级",title:""}
  },
  //获取培训列表
  GetClassList:{
    url:API_URL+"/Page/GetClassList",
    data:{page:1,rows:10,sort:'Id',order:'desc',title:"",type:"just",categoryId:0}
  },
  //课程详情
  CourseContent:{
    url:API_URL+"/Page/CourseContent",
    data:{Id:'',titleNav:'课程详情'}
  },
  //学习统计
  MyStudyStat:{
    url:API_URL+"/Page/MyStudyStat",
    data:{page:1,rows:10,sort:'Id',order:'desc',StartData:'',EndData:'',titleNav:'学习统计'}
  },
  //考试统计
  MyExamStat:{
    url:API_URL+"/Page/MyExamStat",
    data:{page:1,rows:10,sort:'Id',order:'desc',StartData:'',EndData:'',titleNav:'考试统计'}
  },
  //我的收藏
  MyFavorite:{
    url:API_URL+"/Page/MyFavorite",
    data:{page:1,rows:10,sort:'Id',order:'desc',StartData:'',EndData:'',titleNav:'我的收藏'}
  },
  //收藏
  FavoriteAdd:{
    url:API_URL+"/Page/FavoriteAdd",
    data:{mainId:'',type:'',title:'',remark:''}
  },
  //取消收藏
  FavoriteDelete:{
    url:API_URL+"/Page/FavoriteDelete",
    data:{id:''}
  },
  //学习计划
  MyStudyPlan:{
    url:API_URL+"/Page/MyStudyPlan",
    data:{page:1,rows:10,sort:'Id',order:'desc',titleNav:'学习计划'}
  },
  //获取笔记
  NoteAdd:{
    url:API_URL+"/Home/NoteAdd",
    data:{courseId:''}
  },
  //添加笔记
  AddNote:{
    url:API_URL+"/Page/AddNote",
    data:{Name:'',Content:'',CourseId:''}
  },
  //笔记列表
  CourseNoteList:{
    url:API_URL+"/Page/CourseNoteList",
    data:{CourseId:''}
  },
  //编辑笔记
  NoteUpdate:{
    url:API_URL+"/Page/NoteUpdate",
    data:{}
  },
  //删除笔记
  DelNote:{
    url:API_URL+"/Page/DelNote",
    data:{Id:''}
  },

  //添加计划
  StudyPlanAdd:{
    url:API_URL+"/Home/StudyPlanAdd",
    data:{courseId:''}
  },
  //添加计划提交
  AddStudyPlan:{
    url:API_URL+"/Page/StudyPlanAdd",
    data:{PlanFinishDate:'',RemindDate:'',RemindCycle:'',Remark:'',CourseId:''}
  },
  //查看计划
  StudyPlanUpdate:{
    url:API_URL+"/Home/StudyPlanUpdate",
    data:{courseId:''}
  },
  //提交修改计划
  EditStudyPlanUpdate:{
    url:API_URL+"/Page/StudyPlanUpdate",
    data:{PlanFinishDate:'',RemindDate:'',RemindCycle:'',Remark:'',CourseId:'',Id:''}
  },
  //删除课程
  DelUserCourseReg:{
    url:API_URL+"/Page/DelUserCourseReg",
    data:{courseId:''}
  },
  //考试查看
  CourseExamList:{
    url:API_URL+"/Page/CourseExamList",
    data:{courseId:''}
  },
  //删除学习计划
  DelStudyPlan:{
    url:API_URL+"/Page/DelStudyPlan",
    data:{id:''}
  },
  //留言板
  MessageList:{
    url:API_URL+"/Page/MessageList",
    data:{page:1,rows:13,sort:'CreateDate',order:'desc',titleNav:'留言板',wordLimt:'35'}
  },
  //留言信息详情
  MessageDetail:{
    url:API_URL+"/Page/MessageDetail",
    data:{id:'',titleNav:'留言详情'}
  },
  //提交添加留言
  GetMessageAdd:{
    url:API_URL+"/Page/GetMessageAdd",
    data:{Name:'',Class:'',Content:''}
  },
  //考试题
  Exam:{
    url:API_URL+"/Exam/Exam",
    data:{parameter1:''}
  },
  //个人学习档案
  StudyStatistics:{
    url:API_URL+"/Page/StudyStatistics",
    data:{page:1,rows:5, sort:'Id', order:'desc',type:'',startDate:'',endDate:'',wordLimt:24,titleNav:'个人学习档案'}
  },
  //考试详情
  ExamDetailListItem:{
    url:API_URL+"/Exam/ExamDetailListItem",
    data:{page:1,rows:10, sort:'Id', order:'desc',examid:''}
  },
  //考试记录详情
  ExamReview:{
    url:API_URL+"/Exam/ExamReview",
    data:{parameter1:'',parameter2:''}
  },
  //报名培训班
  ApplyClass: {
    url: API_URL + "/Page/ApplyClass",
    data: {trainingId: ''}
  },
  //未读通知
  UnReadNotice:{
    url:API_URL+"/Page/NoticeUnReadList",
    data:{page:1,rows:7,sort:'Id',order:'desc',titleNav:'未读通告',wordLimt:30}
  },
  //修改密码
  UpdatePwd:{
    url:API_URL+"/Page/UpdatePwd",
    data:{}
  },
  //设置密保--密码验证
  SetPasswordQuestion:{
    url:API_URL+"/Page/SetPasswordQuestion",
    data:{}
  },
  //设置密保--添加密保问题
  AddPasswordQuestion:{
    url:API_URL+"/Page/AddPasswordQuestion",
    data:{pwd:''}
  },
  //修改信息--获取用户详细信息
  GetUserInfo:{
    url:API_URL+"/Page/GetUserInfo",
    data:{titleNav:'修改信息'}
  },
  //修改用户信息
  UpdateUserInfo:{
    url:API_URL+"/Page/UpdateUserInfo",
    data:{}
  },
  //专题培训班--个人学习信息
  ClassInformation:{
    url:API_URL+"/Page/ClassInformation",
    data:{titleNav:'个人学习信息',Id:''}
  },
  //专题培训班--班级详情
  ClassDetail:{
    url:API_URL+"/Page/ClassDetail",
    data:{titleNav:'培训班详情',page:1,rows:9,sort:'Id',order:'desc'}
  },
  //专题培训班--教学计划
  ClassPlan:{
    url:API_URL+"/Page/ClassPlan",
    data:{titleNav:'教学计划'}
  },
  //专题培训班--同学名录
  ClassStudent:{
    url:API_URL+"/Page/ClassStudent",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'同学名录'}
  },
  //专题培训班--我的论文
  ClassPaperList:{
    url:API_URL+"/Page/ClassPaperList",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'班级论文',wordLimt:30}
  },
  //专题培训班--班级相册
  PhotoAlbumList:{
    url:API_URL+"/Page/PhotoAlbumList",
    data:{page:1,rows:9,sort:'Id',order:'desc',titleNav:'班级相册'}
  },
  //专题培训班--班级话题
  ClassTopicList:{
    url:API_URL+"/Page/ClassTopicList",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'班级话题',wordLimt:30}
  },
  //专题培训班--班级课程
  ClassCourse:{
    url:API_URL+"/Page/ClassCourse",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'班级课程',wordLimt:30}
  },
  //专题培训班--班级公告
    ClassNoticeList:{
    url:API_URL+"/Page/ClassNoticeList",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'班级公告',wordLimt:30}
  },
  //专题培训班--班级考试
  ClassExam:{
    url:API_URL+"/Page/ClassExam",
    data:{page:1,rows:12,sort:'Id',order:'desc',titleNav:'班级考试',wordLimt:30}
  },
  //专题培训班--班级文章内容
  ClassArticleDetail:{
    url:API_URL+"/Page/ClassArticleDetail",
    data:{}
  },
  //专题培训班--查看用户权限
  CheckUserClass:{
    url:API_URL+"/Page/CheckUserClass",
    data:{}
  },
  //专题培训班--添加相册
  GetPhotoAlbumAdd:{
    url:API_URL+"/Page/GetPhotoAlbumAdd",
    data:{}
  },
  //专题培训班--添加相册
  PhotoAlbumAdd:{
    url:API_URL+"/Page/PhotoAlbumAdd",
    data:{titleNav:'添加相册'}
  },
  //专题培训班--班级照片
  PhotoPreview:{
    url:API_URL+"/Page/PhotoPreview",
    data:{titleNav:'班级图片',page:1,rows:9,sort:'Id',order:'desc'}
  },
  //专题培训班--班级照片
  GetPhotoUpFile:{
    url:API_URL+"/Page/GetPhotoUpFile",
    data:{}
  },
  //专题培训班--添加话题
  ClassTopicAdd:{
    url:API_URL+"/Page/ClassTopicAdd",
    data:{page:1,rows:9,sort:'Id',order:'desc'}
  },
  //专题培训班--添加论文
  ClassPaperAdd:{
    url:API_URL+"/Page/ClassPaperAdd",
    data:{page:1,rows:9,sort:'Id',order:'desc'}
  },
  //专题培训班--获取分类
  GetTrainingArticleCategory:{
    url:API_URL+"/Page/GetTrainingArticleCategory",
    data:{}
  },
  //专题培训班--发布文章
  ClassPublishArticle:{
    url:API_URL+"/Page/ClassPublishArticle",
    data:{}
  },
  //考试中心--提交考试
  PostExam:{
    url:API_URL+"/Exam/PostExam",
    data:{}
  },
  //邮箱找回密码
  GetPasswordEmail:{
    url:API_URL+"/Page/GetPasswordEmail",
    data:{}
  },
  //获取密保
  GetQuestion:{
    url:API_URL+"/Page/GetQuestion",
    data:{account:''}
  },
  //提交问题
  GetPasswordByQuestion:{
    url:API_URL+"/Page/GetPasswordByQuestion",
    data:{account:'',question:'',answer:''}
  },
  //提示未读通知
  UnReadNotice2:{
    url:API_URL+"/Page/UnReadNotice",
    data:{}
  },
  //播放信息
  Play:{
    url:API_URL+"/Home/Play",
    data:{id:''}
  },
  //刷新播放进度
  Refresh:{
    url:API_URL+"/CourseProcess/Refresh",
    data:{PortalId:'',userId:'',courseid:''}
  },
  //添加评论
  CourseCommentAdd:{
    url:API_URL+"/Page/CourseCommentAdd",
    data:{mainId:'',parentId:'0',content:'',rate:''}
  },
  //获取评论
  CourseComment:{
    url:API_URL+"/Page/CourseComment",
    data:{id:'',page:'1',rows:'100',sort:'Id',order:'Desc'}
  },
  //获取评论
  Refresh:{
    url:API_URL+"/CourseProcess/Refresh",
    data:{PortalId:'', userId: '', courseid: '' }
  },
  //播放前调用
  ClearPlayingCourse:{
    url:API_URL+"/Page/ClearPlayingCourse",
    data:{userid:''}
  },
  //播放plYjwplay
  PlayJwplay:{
    url:API_URL+"/Home/PlayJwplay",
    data:{courseid:''}
  },
  //文章分类
  ArticleCategory:{
    url:API_URL+"/Page/ArticleCategory",
    data:{titleNav:'文章分类',sort:'Sort',order:'desc'}
  },
  //站内搜索
  SearchAll:{
    url:API_URL+"/Page/SearchAll",
    data:{}
  },
  //成绩打印
  ExamGrade:{
    url:API_URL+"/Page/ExamGrade",
    data:{}
  }
};
