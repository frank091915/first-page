define(["jquery","signInModal"],function($,signinModal){
	function SignOutModal(){
		this.signOutModal();
		this.check();
		this.toSignOut();
	}
	//在需要注册模态框的地方使用此模块
	SignOutModal.modal=`
		<!-- Modal -->
		<div class="modal fade" id="mySignOutModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
		      </div>
		      <div class="modal-body">
		      <div class="alert alert-info hidden signOut-error" role="alert">注册失败</div>
		      <form id="signOutForm">
				  <div class="form-group">
					    <label for="signUp-username">用户名</label>
					    <input type="text" name="name" class="form-control" id="signUp-username" placeholder="请输入用户名">
					    <div class="errorInfo" >请输入正确格式的用户名</div>
					  </div>
					  <div class="form-group">
					    <label for="signUp-email">邮箱地址</label>
					    <input type="text" name="email" class="form-control" id="signUp-email" placeholder="请输入邮箱">
					    <div class="errorInfo" >邮箱格式不对呀</div>
					  </div>
					  <div class="form-group">
					    <label for="signUp-password-first">密码</label>
					    <input type="password" name="password" class="form-control" id="signUp-password-first" placeholder="请输入密码">
					    <div class="errorInfo" >密码格式不对呀</div>
					  </div>
					  <div class="form-group">
					    <label for="signUp-password-second">确认密码</label>
					    <input type="password" class="form-control" id="signUp-password-second" placeholder="请再次输入密码">
					    <div class="errorInfo" >请再次确认密码</div>
					  </div>
			</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default"  id="signOutBtn">注册</button>
		        <button type="button" data-toggle="modal" class="btn btn-primary">已注册，去登录</button>
		      </div>
		    </div>
		  </div>
		</div>
		</div>
	`;
	$.extend(SignOutModal.prototype,{
		signOutModal(){
			$("body").append(SignOutModal.modal);
		},
		check(){
			 this.flag=true;
			$("form input").on("change",function(){
				var value=$(this).val();
				var nameReg = /^[a-zA-Z0-9_-]{4,16}$/,
					passwordReg= /^[a-zA-Z]\w{5,17}$/,
					emailReg= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					//根据不同input来进行正则验证，前三个可以用在一个正则里面判断，确认密码可以单独判断
				switch($(this).prop("id")){
					case "signUp-username" :
					 	if(!nameReg.test(value)){
					 		$(this).next().addClass("errorInfoActive");
					 		flag=false;
					 	}
					 	break;
					 case "signUp-email" :
					 	if(!emailReg.test(value)){
					 		$(this).next().addClass("errorInfoActive");
					 		flag=false;
					 	}
					 	break;					
					 	case "signUp-password-first" :
					 	if(!passwordReg.test(value)){
					 		$(this).next().addClass("errorInfoActive");
					 		flag=false;
					 	}
					 	break;
					 	case "signUp-password-second" :
					 	if(!($("#signUp-password-second").val()===$("#signUp-password-first").val())){       
							//两大串表达式的运算结果，用（）将其包裹起来
					 		$(this).next().addClass("errorInfoActive");
					 		flag=false;
					 	}
					 	break;	 	
				}	
			});
			//隐藏警告框
			$("form input").on("focus",function(){
				$(this).val("");
				$(this).next().removeClass("errorInfoActive");
			});
		},
		toSignOut(){
			var _this=this;
			$("#signOutBtn").on("click",function(e){
				let data=$("#signOutForm").serialize();
				e.preventDefault();
				if(_this.flag){
					$.post("http://rap2api.taobao.org/app/mock/124852/signOut",data,
						function(res){
							console.log(res);
							if(res.res_code===0){
								$(".signOut-error").removeClass("hidden");
							}else{//如果注册成功，隐藏模态框
								$('#mySignOutModal').modal('toggle');
								//提示注册成功，提示去登录
								if(confirm("注册成功，去登录")){
									signinModal.prototype.showSignIn();
								};

							}
						},"json");
					}

			});

		},
	});
	return SignOutModal;
})