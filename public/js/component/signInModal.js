define(["jquery"],function(){
	function SignInModal(){
		this.signInModal();
		this.addEventListener();
//		this.showSignIn();
	}
	//在需要注册模态框的地方使用此模块
	SignInModal.modal=`
		<!-- Modal -->
		<div class="modal fade" id="mySignInModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">登录</h4>
		      </div>
		      <div class="modal-body">
		      <form id="signInForm">
				  <div class="form-group">
					    <label for="signIn-username">用户名</label>
					    <input type="text" class="form-control" id="signIn-username" placeholder="请输入用户名">
					  </div>
					  <div class="form-group">
					    <label for="signIn-password">密码</label>
					    <input type="password" class="form-control" id="signIn-password" placeholder="请输入密码">
					  </div>
			</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal" data-toggle="modal" id="toSignIn">登录</button>
		        <button type="button" data-toggle="modal" class="btn btn-primary">忘记密码?</button>
		      </div>
		    </div>
		  </div>
		</div>
		</div>
	`;
	$.extend(SignInModal.prototype,{
		signInModal(){
			$("body").append(SignInModal.modal);
		},
		showSignIn(){
			$("#mySignInModal").modal('show');
		},
		addEventListener(){
			let _this=this;
			$("#toSignIn").on("click",function(e){
				e.preventDefault();
				_this.toSignIn();
			})
		},
		toSignIn(){
			//将用户信息存在session中
				let obj={},
					arr=[];
				obj.name=$("#signIn-username").val();
					arr.push(obj);
				console.log(obj,arr);
				$.post("http://rap2api.taobao.org/app/mock/124733/api/users/login.do",obj,
					function(res){
						console.log(res);
						if(res.res_code===0){
							alert("好像出错了");
						}else{
							sessionStorage.setItem("nameInfo",JSON.stringify(arr));
							location.reload();
						}
					},"json");	


		}
	});
	return SignInModal;
})