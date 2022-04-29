<template>
    <el-container class="bg" :style="defaultheight">
        <el-header>
        </el-header>
        <el-main>
            <el-row :gutter="24">
                <el-col :span="8" :offset="8">
                    <el-card class="box-card register">
                        <!-- <div slot="header" class="clearfix" center>
                            <i class="iconfont icon-zhucedenglu"></i>
                        </div> -->
                        <el-row class="login-icon">
                            <el-col>
                                    <i class="iconfont icon-huiyuanzhucedengluguanli login-icon-i"></i>
                            </el-col>
                        </el-row>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px">
                            <el-form-item prop="userName" class="register-input">
                                <el-input v-model="ruleForm.userName" placeholder="Username"
                                    size="medium" prefix-icon="iconfont icon-denglu" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="schoolid" class="register-input">
                                <el-input v-model="ruleForm.schoolid" placeholder="Student number"
                                    size="medium" prefix-icon="iconfont icon-denglu" clearable>
                                </el-input>
                            </el-form-item> 
                            <el-form-item prop="pass" class="register-input">
                                <el-input v-model="ruleForm.pass" placeholder="Password"
                                    size="medium" prefix-icon="iconfont icon-suoding" show-password>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="checkPass" class="register-input">
                                <el-input v-model="ruleForm.checkPass" placeholder="Password again"
                                    size="medium" prefix-icon="iconfont icon-suoding" show-password>
                                </el-input>
                            </el-form-item>
                            
                        </el-form>
                        
                        <el-row>
                            <el-button round size="small" style="color: #004643; font-weight:600;" @click="register">
                                Sign up
                            </el-button>
                        </el-row>
                        
                        <el-row>
                            <p class="already">Already have an account <a href="/login">Sign In</a></p>
                        </el-row>
                        <!-- <el-row>
                            <el-col class="register-input" >
                                <el-input v-model="ruleForm.pass" placeholder="Username" :rules="rules"
                                    size="medium" prefix-icon="iconfont icon-denglu" clearable>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="register-input">
                                <el-input v-model="password" placeholder="Password"
                                    size="medium" prefix-icon="iconfont icon-suoding" show-password>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="register-input">
                                <el-input v-model="password_again" placeholder="Password again"
                                    size="medium" prefix-icon="iconfont icon-suoding" show-password>
                                </el-input>
                            </el-col>
                        </el-row> -->
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            	  <p class="copy">© 2022 Ibooking Register Form. All rights reserved | Design by </p>
        </el-footer>
    </el-container>
</template>
<script>

export default ({
    name: 'register',
    data(){
        var checkuserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (value.length < 4 || value.length > 10) {
            callback(new Error('用户名长度必须大于3小于11'));
          } 
        else {
              callback();
            }
        }, 1000);
         };
        var checkSchoolid = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            }
            setTimeout(() => {
            if (isNaN(value) || value.length != 11) {
                callback(new Error('学号必须为11位数字'));
            } 
            else {
                callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
        };
        return{
            defaultheight:{
                height: '',
            },	 
            ruleForm: {
                pass: '',
                checkPass: '',
                userName: '',
                schoolid: '',
            },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            userName: [
                { validator: checkuserName, trigger: 'blur' }
            ],
            schoolid : [
                {validator: checkSchoolid, trigger: 'blur'}
            ]
            }
            }
    },
    mounted(){
    this.getHeight();
  },
  updated(){
    this.getHeight();
  },
  methods:{
	getHeight(){
		  	// 计算获取得屏幕得长度和宽度
		  	this.defaultheight.height = window.innerHeight+ "px";
  		},
    sleep(ms) {
        return new Promise(resolve=>setTimeout(resolve, ms))
        },
    
    register() {
        // 注册
        this.$axios.post("/apis/register?"+
            'username='+ this.ruleForm.userName+
            '&password='+ this.ruleForm.pass+
            '&schoolid='+ this.ruleForm.schoolid
        ).then(res=>{
            if (res.data.register_success){
                // 登录成功
                console.log('success')
                // 本地存储
                let userObject = {
                    username: this.ruleForm.userName,
                    password: this.ruleForm.pass,
                    schoolid: this.ruleForm.schoolid 
                }
                sessionStorage.setItem("userInfo", JSON.stringify(userObject))
                this.$message({
                    message: '注册成功！3s后前往登录页面',
                    type: 'success',
                    duration: 3000,
                    showClose: true,
                    center: true,
                });
                // 路由跳转
                setTimeout(() => {
                    this.$router.push({'path': '/login'})
                }, 3000);
                
            }else{
                 this.$message({
                    message: '注册失败！',
                    type: 'warning'
                 });
            }
        })
    }
  }
})
</script>
<style scoped>
.bg {
    font-family: 'Montserrat', sans-serif;
   	font-size: 100%;
   	background: url(../assets/bg.jpg) no-repeat bottom;
    background-size: cover;
	/* min-height: 465px; */
	height: 100%;
}
.register{
   /* color: rgba(0, 0, 0, 0.1); */
   background-color: #004643;
   /* color: #3b3663; */
}
.login-icon {
    background: #028882;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: block;
    margin: auto;
}
.login-icon-i{
    color: #fff;
    font-size: 20px;
    line-height: 30px;
}
/* .register-btn{
    font-size: 8px;
	font-weight: 600;
	text-align: center;
    background-color: transparent!important;
} */
/* .register-btn button{
    height: 40px;
    width: auto;
} */
.register-input >>> .el-input__inner {
    border: 0;
    background-color: transparent !important;
    border-bottom: 0.5px solid gray;
    font-size: 10px;
}
.register-input >>> .el-input__inner:focus{
    border-bottom: 0.9px solid white;
}
.register-input >>> input::-webkit-input-placeholder{
    color: #028882;
    font-size: 10px;
}
.register-input {
    margin-top: 0.75em;
}
.already{
    color: #fff;
    opacity: 0.8;
    margin-top: 15px;
    font-size: 10px !important;
}
.already a{
    color: #ffb100;
}
.already a:hover{
    color: #ffb100;
    text-decoration:underline;
    transition: 0.3s ease;
    -webkit-transition: 0.3s ease;
    -o-transition: 0.3s ease;
    -moz-transition: 0.3s ease;
    -ms-transition: 0.3s ease;
}
.copy{
    color: #fff;
    opacity: 0.8;
    /* margin-top: 15px; */
    font-size: 15px !important;
}
</style>
