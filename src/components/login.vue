<template>
<el-container class="bg" :style="defaultheight">
  <el-main>
	  <el-row :gutter="24">
		  <el-col :span="24">
			  <div class="login-form">
				<div class="top-login">
					<span><img src="../assets/group.png" alt=""/></span>
				</div>
				<h1>登录</h1>
			 </div>
		  </el-col>
		  
	  </el-row>

	  <el-row :gutter="24" type="flex">
		<el-col :span="8" :offset="8">	  
			<div>
				<el-input v-model="account" placeholder="Username"
				clearable size="medium" prefix-icon="iconfont icon-denglu">
				</el-input>
			</div>  
		</el-col>
	  </el-row>

	  <el-row :gutter="24" type="flex" class="password">
			<el-col :span="8" :offset="8">	  
			<div>
				<el-input v-model="password" placeholder="Password" 
				@keyup.enter.native="checkLogin"
				size="medium" prefix-icon="iconfont icon-suoding" show-password>
				</el-input>
			</div> 
			</el-col> 

		</el-row>

		<el-row :gutter="24" type="flex" style="font-size: 15px;margin-top: 1em">
		  <el-col :span="8" :offset="8">
				  <el-button type="primary" size="small" 
				  class="login-bn" @click="checkLogin"
				  >
				  <i class="iconfont icon-jurassic_next"></i>
				  登录
				  </el-button>
			 <!-- <input type="submit"  value="Login" >  -->
		  </el-col>
		</el-row>
		
		<el-row style="margin-top:1em">
		  <el-col :span="8" :offset="8">
			  <el-link type="info" style="white" @click="changeRegister"> 
				  Don't have a account...?
				  register here
			  </el-link>
		  </el-col>
		</el-row>
</el-main>
<el-footer>		
	  <p class="copy">© 2022 Ibooking Login Form. All rights reserved | Design by </p>
</el-footer>
</el-container>
    

</template>
<script>
export default {
  name: 'login',
  data () {
    return {
		account: '',
		password: '',
		defaultheight:{
			height: '',
		},	
		defaultwidth: {
			width: '',
		}    
    }
  },
  mounted(){
    this.getHeight();
	this.loadLoginInfoBySession();
  },
  updated(){
    this.getHeight();
	this.loadLoginInfoBySession();
  },
  methods:{
	getHeight(){
		  	// 计算获取得屏幕得长度和宽度
		  	this.defaultheight.height = window.innerHeight+ "px";
		 	this.defaultwidth.width = parseInt(window.innerWidth * 1/3 -35) + 'px';
  		},
	loadLoginInfoBySession(){
		let userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
		// this.account = userinfo.username;
		// this.password = userinfo.password;
	},
	checkLogin(){
		// 检测登录账号密码
		let userObject = {
						username: this.account,
					}
		if(this.account == 'admin' && this.password =='admin'){		
			userObject.username = 'Administrator'
			sessionStorage.setItem('token', 12345)
			sessionStorage.setItem('userInfo', JSON.stringify(userObject));
			this.$router.push({
				path: '/'
			})
		}else {
			this.$axios.post("/apis/login?"+
							"username=" + this.account +
							"&password=" + this.password
			).then(res=>{
				let data = res.data.should_login;
				if(data){
					// 登录成功
					// 本地存储
					userObject['schoolid'] = res.data.schoolid
					sessionStorage.setItem('token', 12345)
					sessionStorage.setItem('userInfo', JSON.stringify(userObject));
					this.$message({
						message: '登录成功！1s后前往主页面',
						type: 'success',
						duration: 1000,
						showClose: true,
						center: true,
               		 });
					setTimeout(() => {
							this.$router.push({
									path: '/'
							})
					}, 3000);			
				}else {
					this.$message({
						message: '登录失败!',
						type: 'warning'
               		 });
				}
			})
		}
	},
	changeRegister(){
		// 跳转到注册界面
		this.$router.push({
			path: '/register'
		})
	}
  }
}
</script>
<style scoped>
.bg{
  	font-family: 'Montserrat', sans-serif;
   	font-size: 100%;
   	background: url(../assets/bbb.jpg)no-repeat;
    background-size: auto;
	/* min-height: 465px; */
	height: 100%;
}
.login-form{
	
	padding: 10px 0px 0px 0px;

}
.login-form h1{
	font-size:1.5em;
	color:#fff;
	font-weight:500;
	text-transform:uppercase;
	text-align:center;
	margin-bottom:1.5em;
	margin-top: 1.5em;
/*-- w3layouts --*/
}
.top-login {
    width: 100px;
    height: 100px;
    display: block;
    -webkit-transform: rotate(45deg) translate3d(0, 0, 0);
    -moz-transform: rotate(45deg) translate3d(0, 0, 0);
    -ms-transform: rotate(45deg) translate3d(0, 0, 0);
    -o-transform: rotate(45deg) translate3d(0, 0, 0);
    transform: rotate(45deg) translate3d(0, 0, 0);
    margin: auto;
    background: #fff;
    position: relative;
}
.top-login span{
    border: 2px solid #F36;
    width: 76px;
    height: 76px;
    display: block;
    margin: auto;
    position: absolute;
    top: 11px;
    left: 11px;
}

.top-login span img{
	-webkit-transform: rotate(-45deg) translate3d(0, 0, 0);
	-moz-transform: rotate(-45deg) translate3d(0, 0, 0);
	-ms-transform: rotate(-45deg) translate3d(0, 0, 0);
	-o-transform: rotate(-45deg) translate3d(0, 0, 0); 
	transform: rotate(-45deg) translate3d(0, 0, 0);
    margin: 8px 8px 8px 8px;

}
.password {
	margin-top: 1em;
}
.info {
	margin-top: 0.5em;
	margin-bottom: 1em;
}
.login-bn{
	font-size: 20px;
	font-weight: 700;
	text-align: center;
	display: flex;
	width: 100%;
	justify-content: center;
}

</style>
