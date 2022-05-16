<template>
  <el-container>
    <el-main style="background-color: #f5f9fc !important;">
      <el-row style="height: 100vh!important;">
          <el-col :span="4" style="height: 100%">
              <div class="aside-bar-logo">
                <i class="iconfont icon-zixishi"> Ibooking</i>
              </div>
                 <el-menu
                  default-active="2"
                  style="height: 90%; font-weight: 700"
                  >
                  <el-menu-item index="2">
                    <i class="el-icon-location"></i>
                      <span>首页</span>
                  </el-menu-item>
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-tickets "></i>
                    <span slot="title">管理</span>
                    </template>
                    <el-menu-item index="1-1">新增自习室</el-menu-item>
                    <el-menu-item index="1-2">修改自习室</el-menu-item>
                    <el-menu-item index="1-2">删除自习室</el-menu-item>
                  
                  </el-submenu>
                  
                </el-menu>
              <!-- <div class="aside-bar">
                 <div class="aside-menu-item">
                   <i class="el-icon-menu">首页</i>
                 </div>
                 <div class="aside-menu-item">
                   <i class="el-icon-tickets">自习室管理</i>
                 </div>
              </div> -->
          </el-col>
          <el-col :span="20" style="background-color: #fff;">
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                style="display: flex; justify-content: flex-end; height: 40px;"
                active-text-color="#ffd04b">
                <el-menu-item index="1" style="height: 40px; line-height: 40px">
                  <i class="iconfont icon-sousuo"></i>
                </el-menu-item>
                <el-menu-item index="2" style="height: 40px; line-height: 40px; margin-right:10px">
                  <div class="display: flex">
                    <el-avatar shape="square" :size="30" fit="fit" :src="src"></el-avatar>
                      <span style="margin-left: 5px;">{{userInfo.username}}</span>
                  </div>
                </el-menu-item>
              </el-menu>
              
              <div class="nav-bottom">
                  <el-row type="flex" >
                    <el-col :span="12" style="display: flex; justify-content: flex-start">
                      <i class="iconfont icon-zhaoshou_swing" style="line-height: 20px;font-size: 25px; color: yellow;"></i>
                      <strong>Hi, {{userInfo.username}}!</strong>
                    </el-col>
                    <el-col :span="12" style="display: flex; justify-content: flex-end">
                      <el-button type="primary" size="small" @click="createStudyRoomVisible=true">
                        create</el-button>
                      <el-button type="danger" @click="deleteStudyRoomVisible=true" icon="el-icon-delete" size="small">
                        delete</el-button>
                      <el-button type="info" @click="editStudyRoomVisible=true" icon="el-icon-edit" size="small">
                        edit</el-button>  
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-menu default-active="1" background-color="#f5f9fc" mode="horizontal"
                    active-text-color="blue"
                    style="height: 30px; line-height: 30px;border-bottom-width: 1px !important;">
                      <el-menu-item index="1" @click="is_view_all=true;is_student=false;getStudyRoomDetail()">view all</el-menu-item>
                      <el-menu-item index="2" @click="is_view_all=true;is_student=true;getStuInfo()" v-if="userInfo.username=='Administrator'">students</el-menu-item>
                      <el-menu-item index="3" @click="is_view_all=false; getStudentRecord()" v-if="userInfo.username!='Administrator'">appointment</el-menu-item>
                    </el-menu>
                  </el-row>
                   <el-dialog
                      title="新增自习室"
                      :visible.sync="createStudyRoomVisible"
                      center
                      >
                        <el-form :model="studyRoom" status-icon :rules="studyRoomRule" ref="studyRoom" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="自习室名称" prop="studyroom_name">
                              <el-input v-model="studyRoom.studyroom_name" small></el-input>
                            </el-form-item>
                            <el-form-item label="座位数量" prop="seatnum">
                              <el-input v-model="studyRoom.seatnum" small></el-input>
                            </el-form-item>
                            <el-form-item label="起始时间" prop="begintime">
                                <el-input-number v-model="studyRoom.begintime" :min="0" :max="23" label="开始时间"></el-input-number>
                                <span style="margin-left: 20px;margin-right: 10px;">结束时间</span>
                                <el-input-number v-model="studyRoom.endtime" :min="1" :max="24" label="结束时间"></el-input-number>

                              <!-- <el-input v-model.number="studyRoom.begintime"></el-input> -->
                            </el-form-item>
                            <!-- <el-form-item label="结束时间" prop="endtime">
                              <el-input v-model.number="studyRoom.endtime"></el-input>
                            </el-form-item> -->
                          </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="createStudyRoomVisible = false">取 消</el-button>
                        <el-button type="primary" @click="createStudyRoom">确 定</el-button>
                      </span>
                  </el-dialog>
                   <el-dialog
                      title="修改自习室信息"
                      :visible.sync="editStudyRoomVisible"
                      center
                      >
                        <el-form :model="editStudyRoom" status-icon :rules="studyRoomRule" ref="studyRoom" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="自习室名称" prop="studyroom_name">
                              <el-input v-model="editStudyRoom.studyroom_name" small></el-input>
                            </el-form-item>
                            <el-form-item label="座位数量" prop="seatnum">
                              <el-input v-model="editStudyRoom.seatnum" small disabled></el-input>
                            </el-form-item>
                            <el-form-item label="起始时间" prop="begintime">
                                <el-input-number v-model="editStudyRoom.begintime" :min="0" :max="23" label="开始时间"></el-input-number>
                                <span style="margin-left: 20px;margin-right: 10px;">结束时间</span>
                                <el-input-number v-model="editStudyRoom.endtime" :min="1" :max="24" label="结束时间"></el-input-number>

                              <!-- <el-input v-model.number="studyRoom.begintime"></el-input> -->
                            </el-form-item>
                            <!-- <el-form-item label="结束时间" prop="endtime">
                              <el-input v-model.number="studyRoom.endtime"></el-input>
                            </el-form-item> -->
                          </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="editStudyRoomVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editStudyRoomMethod()">确 定</el-button>
                      </span>
                  </el-dialog>
                  <el-dialog
                      title="删除自习室"
                      :visible.sync="deleteStudyRoomVisible"
                      center
                      >
                        <el-form :model="editStudyRoom" status-icon :rules="studyRoomRule" ref="studyRoom" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="自习室名称" prop="studyroom_name">
                              <el-input v-model="editStudyRoom.studyroom_name" small></el-input>
                            </el-form-item>
                            <el-form-item label="座位数量" prop="seatnum">
                              <el-input v-model="editStudyRoom.seatnum" small disabled></el-input>
                            </el-form-item>
                            <el-form-item label="起始时间" prop="begintime">
                                <el-input-number disabled v-model="editStudyRoom.begintime" :min="0" :max="23" label="开始时间"></el-input-number>
                                <span style="margin-left: 20px;margin-right: 10px;">结束时间</span>
                                <el-input-number disabled v-model="editStudyRoom.endtime" :min="1" :max="24" label="结束时间"></el-input-number>

                              <!-- <el-input v-model.number="studyRoom.begintime"></el-input> -->
                            </el-form-item>
                            <!-- <el-form-item label="结束时间" prop="endtime">
                              <el-input v-model.number="studyRoom.endtime"></el-input>
                            </el-form-item> -->
                          </el-form>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="deleteStudyRoomVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteStudyRoomMethod">确 定</el-button>
                      </span>
                  </el-dialog>
              </div>
              
              <el-row :gutter="24" style="padding-left: 10px" v-if="is_view_all&&!is_student">
                <el-col v-for="(ins, index) in studyRoomName" :key="index" :span="6" style="margin-top:10px">
                  <el-card class="box-card" :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix card-header">
                    <!-- <span>卡片名称</span> -->
                      <span style="font-size: 15px; font-weight: 600; line-height: 15px">
                        {{ins.studyroom_name}}</span>
                    </div>
                    <el-image
                      :src="src"
                      style="height: 80px; width: 100%"
                      fit="fill"></el-image>
                   <div style="padding: 0px; margin-top: 10px;">
                      <!-- <span style="font-size: 15px; font-weight: 500; line-height: 20px">自习室{{o}}</span> -->
                      <div class="card-footer">
                        <div>座位数量:<strong>{{ins.seats_num}}</strong>,
                        开放时间:<strong>{{ins.begin_time +'-'+ ins.end_time}}</strong>
                        ...
                        </div>
                        <div class="card-bottom">
                            <!-- <span> 2021/4/24</span> -->
                            <i class="iconfont icon-xiugai card-icon" v-if="userInfo.username!='Administrator'"
                            @click="stuRoomDetailVisible=true;showStudyRoomDetail(ins.studyroom_name)"
                            style="background-color: #409eff;border-color: #409eff; color: white;"></i>
                            <i class="iconfont icon-shanchu card-icon"
                            @click="deleteStudyRoomVisible=true;editStudyRoom.studyroom_name=ins.studyroom_name"
                             style="background-color: #f56c6c;border-color: #f56c6c; color: white;"></i>
                          </div>
                          
                        </div>
                   </div>
                  </el-card>
                </el-col>
                <el-dialog
                      title="座位预约信息"
                      :visible.sync="stuRoomDetailVisible"
                      center
                      >
                      <div>
                            <el-table
                                :data="seatinfo"
                                style="width: 100%">
                                <el-table-column type="expand">
                                  <template slot-scope="props" >
                                    <el-table
                                        :data="props.row.available_time"
                                        style="width: 100%; padding: 0 30px"
                                        >
                                        <el-table-column
                                          prop="date"
                                          label="日期"
                                          width="180">
                                        </el-table-column>
                                       <el-table-column
                                          prop="detail"
                                          label="具体时间(小时)"
                                          width="180">
                                        </el-table-column>
                                         <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button
                                                  type="primary"
                                                  size="mini"
                                                  @click="appointmentStudyRoom(props.row.studyroom_name, scope.row, props.row.seat_id)">预约</el-button>
                                            </template>
                                          </el-table-column>
                                      </el-table>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="座位编号"
                                  prop="seat_id">
                                </el-table-column>
                               <el-table-column
                                  label="剩余预约时间段"
                                  width="120"
                                  prop="len_time">
                                </el-table-column>
                              </el-table>
                      </div>

                      <span slot="footer" class="dialog-footer">
                        <el-button @click="createStudyRoomVisible = false">取 消</el-button>
                        <el-button type="primary" @click="createStudyRoom">确 定</el-button>
                      </span>
                  </el-dialog>
              
              
              </el-row>

              <el-row :gutter="24" style="padding-left: 10px" v-if="!is_view_all">
                  <el-table
                      :data="curpageStuRecord"
                      style="width: 100%; padding: 0 1.5em;">
                      <el-table-column
                        label="日期"
                        >
                        <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                          <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="自习室"
                        prop="roomname"
                        >
                      </el-table-column>
                      <el-table-column
                        label="座位号"
                        prop="inroomid"
                        >
                      </el-table-column>
                      <el-table-column
                        label="签到状态"
                        >
                        <template slot-scope="scope">
                          
                          <span style="margin-left: 10px">{{ scope.row.status }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="签到">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="warning"
                            v-if="scope.row.status == 'todo'"
                            @click="signin(scope.row.record_id)">签到</el-button>
                          <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.status == 'done'"
                            disabled
                            >已签到</el-button>
                          <el-button
                            size="mini"
                            type="danger"
                            v-if="scope.row.status == 'break'"
                            @click="signin(scope.row.record_id)">已过期</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
              </el-row >

              <el-row :gutter="24" style="padding-left: 10px" v-if="is_view_all&&is_student">
                  <el-table
                      :data="curpageStuInfo"
                      style="width: 100%; padding: 0 1.5em;">
                      <el-table-column
                        label="学生编号"
                        prop="student_id"
                        >
                      </el-table-column>
                      <el-table-column
                        label="姓名"
                        prop="student_name"
                        >
                      </el-table-column>
                      <el-table-column
                        label="违约次数"
                        prop="break_times"
                        >
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="deleteStu(scope.row.student_id)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
              </el-row>

              <el-row>
                <el-pagination
                    background
                    v-if="total!=0"
                    :current-page.sync = "cur_page"
                    layout="prev, pager, next"
                    :page-count="total">
                  </el-pagination>
              </el-row>
          </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import qs from 'querystring';
export default {
  name: 'index',
  components: {
  },
  data () {
    let checkStudyroom_name = (rule, value, callback) => {
      if (!value){
          return callback(new Error('自习室名不能为空'));
      }
      if(this.deleteStudyRoomVisible){
          // 如果是删除自习室，那么只需要自习室名称，故查询其他信息
          
      }
      callback();
    };
    let checkSeatNum = (rule, value, callback) => {
      if (!value){
          return callback(new Error('座位数量不能为空'));
      }
      if(isNaN(value)){
        return callback(new Error("座位数量不能为非数字"))
      }
        callback();
    };
    let checkBeginTime = (rule, value, callback) => {
      if (!value){
          return callback(new Error('开始时间不能为空'));
      }
      callback()
    }; 

    return {
      src: require('../assets/bbb.jpg'),
      cur_page: 1,
      total: 0,
      userInfo: {'username': '11'},
      createStudyRoomVisible: false,
      editStudyRoomVisible: false,
      deleteStudyRoomVisible: false,
      stuRoomDetailVisible: false,
      studyRoomName: [],
      stuInfo: [],
      curpageStuInfo: [],
      totalStudyRoom: [],
      is_view_all: true,
      is_student: false,
      stuRecord: [],
      curpageStuRecord: [],
      seatinfo: [],
      studyRoom: {
          studyroom_name: '',
          seatnum: '',
          begintime: 0,
          endtime: 1
      },
      editStudyRoom: {
          studyroom_name: '',
          seatnum: '',
          begintime: 0,
          endtime: 1
      },
      studyRoomRule: {
          studyroom_name : [
            {validator: checkStudyroom_name, trigger: 'blur'}
          ],
          seatnum: [{
            validator: checkSeatNum, trigger: 'blur'
          }],
          begintime: [{
            validator: checkBeginTime, trigger: 'blur'
          }],
      }
    }
  },
  watch: {
    cur_page(new_val, old){
        let bg_index = 8 * (new_val-1)
        let end = bg_index + 8
        if(end > this.totalStudyRoom.length && this.is_view_all && !this.is_student){
          end = this.totalStudyRoom.length
        }
        if(end > this.stuRecord.length && !this.is_view_all ){
          end = this.stuRecord.length
        }
        if(end > this.stuInfo.length && this.is_view_all && this.is_student){
          end = this.stuInfo.length
        }
        this.studyRoomName = []
        this.curpageStuRecord = []
        this.curpageStuInfo = []
        for (; bg_index < end; bg_index++) {
          
          if(!this.is_view_all){
             this.curpageStuRecord.push(this.stuRecord[bg_index])  
          }
          if(this.is_view_all && this.is_student){
            this.curpageStuInfo.push(this.stuInfo[bg_index])
          }    
          if(this.is_view_all && !this.is_student){
              this.studyRoomName.push(this.totalStudyRoom[bg_index]) 
          }
        }
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      createStudyRoom(){
        // 增加自习室
        this.$axios.post("/apis/newstudyroom?"+
                        "studyroom_name="+ this.studyRoom.studyroom_name +
                        "&seatsnum=" + this.studyRoom.seatnum +
                        "&begintime=" + this.studyRoom.begintime +
                        "&endtime="+this.studyRoom.endtime
        ).then(res=>{
            if(res.data.newstudyroom_success){
              this.studyRoom.studyroom_name = '';
              this.studyRoom.seatnum = '';
              this.studyRoom.begintime = '';
              this.studyRoom.endtime = '';
              this.$message({
                message: '添加自习室成功',
                type: 'success',
                duration: 2000,
                showClose: true,
                center: true,
                      });
              this.createStudyRoomVisible = false;
              this.getStudyRoomDetail()
            }else{
              this.$message({
                message: '添加失败',
                type: 'success',
                duration: 2000,
                showClose: true,
                center: true,
                      });
            }    
        })
      },
      editStudyRoomMethod(){
        // 修改自习室信息
        this.$axios.post(
              "apis/changestudyroom?" +
              "studyroom_name=" + this.editStudyRoom.studyroom_name +
              "&new_begintime=" + this.editStudyRoom.begintime +
              "&new_endtime=" + this.editStudyRoom.endtime
        ).then(res=>{
              if(res.data.changestudyroom_success){
                  // 修改成功
                  this.editStudyRoom.studyroom_name = ''
                  this.editStudyRoom.begintime = 0
                  this.editStudyRoom.endtime = 1
                  this.$message({
                      message: '修改自习室成功',
                      type: 'success',
                      duration: 2000,
                      showClose: true,
                      center: true,
                  });
                  this.editStudyRoomVisible = false
                  this.getStudyRoomDetail()
              }else{
                  this.$message({
                      message: '修改自习室失败',
                      type: 'success',
                      duration: 2000,
                      showClose: true,
                      center: true,
                  });
              }
        })
      },
      deleteStudyRoomMethod(){
        this.$axios.post(
                "apis/deletestudyroom?"+
                "studyroom_name="+this.editStudyRoom.studyroom_name 
        ).then(res=>{
              if(res.data.deletestudyroom_success){
                    this.editStudyRoom.studyroom_name = ''
                    this.editStudyRoom.seatnum = ''
                    this.editStudyRoom.begintime = 0
                    this.editStudyRoom.endtime = 1
                    this.deleteStudyRoomVisible = true
                    this.$message({
                        message: '删除自习室成功',
                        type: 'success',
                        duration: 2000,
                        showClose: true,
                        center: true,
                        
                    });
                    this.getStudyRoomDetail()
              }else{
                  this.$message({
                        message: '删除自习室失败',
                        type: 'success',
                        duration: 2000,
                        showClose: true,
                        center: true,       
                    });
              }
        })
      },
      getStudyRoomDetail(){
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        console.log(this.userInfo)
        // 获取所有自习室信息
        this.$axios.get(
          "apis/getstudyroom"
        ).then(res=>{
            let data = res.headers;
            this.totalStudyRoom = []
            this.studyRoomName = []
            for (const key in data) {
                if(key.indexOf('studyroom')!=-1){
                    let dict_stu = JSON.parse(data[key])
                    this.totalStudyRoom.push(dict_stu)
                    if(this.studyRoomName.length < 8){
                      this.studyRoomName.push(dict_stu)
                    }       
                }
            }
            this.total = Math.ceil(this.totalStudyRoom.length / 8);
            console.log(this.total)
        })
      },
      showStudyRoomDetail(studyroom_name){
        this.$axios.get(
            "apis/getstudyroom/detail?"+"studyroom_name="+studyroom_name
        ).then(res=>{
            let data = res.headers;
            this.seatinfo = []
            for (const key in data) {
                if(key.indexOf('seat')!=-1){
                    let info = JSON.parse(data[key])
                    info['len_time'] = info["available_time"].length
                    let available_time = []
                    info['available_time'].forEach(element => {
                        let date = element.split("#")
                        available_time.push({'date': date[0], 'detail': date[1]+' - '+(parseInt(date[1])+1)})
                    });
                    // for (const key in info["available_time"]) {
                    //   console.log(key, info["available_time"])
                    //   available_time.push({"available_time": key})
                    // }
                    info["studyroom_name"] = studyroom_name
                    info["available_time"] = available_time
                    // console.log(info)
                    this.seatinfo.push(info)
                    // this.totalStudyRoom.push(dict_stu)
                    // if(this.studyRoomName.length < 8){
                    //   this.studyRoomName.push(dict_stu)
                    // }       
                }
            }
        })
      },
      appointmentStudyRoom(studyroom_name, date, seat_id){
        date = date.date +'#'+ date.detail[0]
        let appointment_times = JSON.stringify({"appointment_times": [date]})
        console.log(appointment_times)
        let data = {
          schoolid: JSON.parse(sessionStorage.getItem('userInfo')).schoolid,
          studyroom_name: studyroom_name,
          inroomid: seat_id,
          appointment_times: appointment_times
        }
        this.$axios.post(
            "apis/appointment?", qs.stringify(data)

        ).then(res=>{
            let status = res.headers.appointment_success
            if(status){
              this.$message({
                  message: '预约成功！',
                  type: 'success',
                  duration: 1000,
                  showClose: true,
                  center: true,
                        });
                this.showStudyRoomDetail()
                this.stuRoomDetailVisible = false; 
            }
        })
      },
      getStudentRecord(){
        // 获取学生的预约记录
        this.$axios.get(
            "apis/studentrecord?schoolid="+
            JSON.parse(sessionStorage.getItem("userInfo")).schoolid
        ).then(res=>{
            let data = res.headers;
            this.stuRecord = []
            this.curpageStuRecord = []
            for (const key in data) {
                if(key.indexOf('student_appointment_records')!=-1){
                    let dict_stu = JSON.parse(data[key])
                    
                    let date = dict_stu["date"].split("#")
                    dict_stu["date"]= date[0]+" "+date[1]+':00 - '+(parseInt(date[1])+1) +':00'
                    console.log(dict_stu)
                    this.stuRecord.push(dict_stu)
                    if(this.stuRecord.length < 8){
                      this.curpageStuRecord.push(dict_stu)
                    }       
                }
            }
            this.total = Math.ceil(this.stuRecord.length / 8);

        })
      },
      signin(record_id){
        console.log(record_id)
          this.$axios.post(
              "apis/signin?record_id=" + record_id
          ).then(res=>{
              let status = res.headers.signin_success
              if(status){
                  this.$message({
                    message: '签到成功！',
                    type: 'success',
                    duration: 3000,
                    showClose: true,
                    center: true,
                      });
                  this.getStudentRecord()
              }
          })
      },
      getStuInfo(){
        // 获取学生信息
        this.$axios.get(
            "apis/getstudentinfo"
        ).then(res=>{
            let data = res.headers;
            this.stuInfo = []
            this.curpageStuInfo = []
            for (const key in data) {
                if(key.indexOf('student')!=-1){
                    let dict_stu = JSON.parse(data[key])     
                    this.stuInfo.push(dict_stu)
                    if(this.stuRecord.length < 8){
                      this.curpageStuInfo.push(dict_stu)
                    }       
                }
            }
            this.total = Math.ceil(this.stuInfo.length/8)
        })
      },
      deleteStu(student_id){

          this.$axios.post(
              "apis/deletestudent?schoolid=" + student_id
          ).then(res=>{
              let status = res.headers.delete_success
              if(status){
                  this.$message({
                    message: '删除成功！',
                    type: 'success',
                    duration: 3000,
                    showClose: true,
                    center: true,
                      });
                  this.getStuInfo()
              }
          })
      }
    },
  mounted() {
      this.getStudyRoomDetail()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 0 20px;
  height: 42px !important;
}
.el-main {
  padding: 0 20px;
}
.el-card >>> .el-card__header{
  padding: 8px, 10px !important;
}
.card-header {
  margin:-18px -20px;
  padding:10px 20px; 
  background: rgb(212, 208, 208);
}
.card-footer {
  font-size: 13px;
  line-height:12px; 
  font-weight: 300; 
  color: #999;
  display: flex;
  flex-wrap: wrap;
}
.card-bottom {
  margin-top: 5px;
  display: flex;
  justify-content: end;
  /* padding: 10px; */
  background-color: rgb(212, 208, 208);
  width: 100%;
  height: 20px;
  padding: 3px;
}
.card-bottom span {
   line-height: 20px;
   margin-right: 12px;
   color: black;
   font-size: 12px;
}
.card-icon {
   line-height: 20px;
   margin-right: 10px;
   border-radius: 50%;
   height: 20px;
   width: 20px;
  }
.aside-bar-logo {
  height: 40px;
  background-color: black;
  line-height: 40px;
  color: aliceblue;
}
.aside-bar {
  margin-top: 5px;
}
.aside-menu-item {
  padding: 5px;
  font-size: 16px;

}
.nav-bottom {
  padding-top: 1.5rem;
  padding-left: 10px;
  padding-right: 0.5rem;
  background-color: #f5f9fc;
}
.nav-bottom .el-menu-item {
  height: 30px; line-height: 30px;
}
</style>
