require(["../require-config"],function(){
	require(["jquery","template","nav","bootstrap"],function($,template,nav){
		class Employee {
			constructor(){
				this.init();
			}
			init(){
				//调整导航栏的状态
				$(".nav-manage").addClass("active").prev().removeClass("active");
				//先给操作按钮添加事件
				$("#modifySpan").on("click",function(){
					$('#modifyModal').modal('toggle')
				});
				//请求数据
				this.loadByPage();
				this.pageLoad();
			}
			loadByPage(page=1){
				let _this=this;
				$.ajax({
					method:"get",
					url:"http://rap2api.taobao.org/app/mock/124733/api/positions/list.do?page="+page,
					success:function(res){
						if(res.res_code){
							var html=template("list-template",{list: res.res_body.data});
							$("tbody").html(html);
							
							$("#insertLi").prevUntil("#clearLi").remove();
							//自动添加分页a标签
							for(var i=1;i<=res.res_body.data.length;i++){
								var insert=	"<li><a class='paginationA' href='javascript:;'>"+i+"</a></li>";
								$(insert).insertBefore($("#insertLi" ));
							}
							
							//给分页标签添加点击事件
							$(".paginationA").on("click",(event)=>{
								_this.loadByPage($(this).html());
							})
							//上面的dom节点都是异步加载的，后续操作，应在回调函数中执行
							//修改按钮
								$(".modifySpan").on("click",function(e){
									e.preventDefault();
									alert(123);
									$("#modifyModal").modal();
								})
						}

						
					}
				})
			}
			pageLoad(){
				
			}

		}
		return new Employee();
	})
})
