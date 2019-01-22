define(["jquery","signOutModal","signInModal"],function($,signOutModal,signInModal){
	function Nav(){
		this.createNaver();
		this.sayHello();
		this.goodBye();
	}
	//给Nav构造函数的原型拓展方法
	//导航栏naver的字符模板
	Nav.template=`			
			  <div class="container-fluid">
			    <!-- Brand and toggle get grouped for better mobile display -->
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			      </button>
			      <a class="navbar-brand" href="">职位管理系统</a>
			    </div>
			
			    <!-- Collect the nav links, forms, and other content for toggling -->
			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul class="nav navbar-nav">
			        <li class="active "><a href="/index.html">首页 <span class="sr-only">(current)</span></a></li>
			        <li class="nav-manage"><a href="/html/employeeInfo.html">职位管理</a></li>
			      </ul>
			      <ul class="nav navbar-nav navbar-right wellcome">
			        <li><a href="#" data-toggle="modal" data-target="#myModal" id="signIn-btn">登录</a></li>
			        <li><a href="#" id="signOut-btn">注册</a></li>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->`;
	
	$.extend(Nav.prototype,{
		createNaver() {
			$(".navbar").html(Nav.template);
		},
		createModal(){
			new signOutModal();
			new signInModal();
		},
		sayHello(){
			var wellcomeInfo=sessionStorage.getItem("nameInfo");
			if(wellcomeInfo){
				wellcomeInfo=JSON.parse( sessionStorage.getItem("nameInfo"));
				console.log(wellcomeInfo);
				var helloTemplate=`			        
				<li><a>`+wellcomeInfo[0].name +`</a></li>
			    <li><a id="leaveBtn">注销</a></li>`;
				$(".wellcome").html(helloTemplate);
			}

		},
		goodBye(){
			$("#leaveBtn").on("click",function(){
				sessionStorage.removeItem("nameInfo");
				location="/";
			})
		}
	});
	return new Nav();
});