require(["require-config"],function(){
	require(["jquery","nav","swiper","bootstrap"],function($,nav){
		function HomePage(){
			this.init();
			this.modal();
		}
		HomePage.prototype.init=function(){
			nav.createModal();
		}
		HomePage.prototype.modal=function(){
			$("#signOut-btn").on("click",function(){
				$('#mySignOutModal').modal('toggle')				
			});
			$("#signIn-btn").on("click",function(){
				$('#mySignInModal').modal('toggle')				
			});

		}
		return new HomePage();
	})
})
