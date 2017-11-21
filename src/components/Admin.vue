<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i>首页
        <span class="c-gray en">&gt;</span>管理员管理
        <span class="c-gray en">&gt;</span>管理员列表
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" title="刷新" @click="renovate"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="page-container">
        <div class="text-c">
          <input type="text" class="input-text" style="width:250px" placeholder="输入管理员名称">
          <button type="submit" class="btn btn-success" name=""><i class="Hui-iconfont">&#xe665;</i> 搜用户</button>
        </div>
        <div class="cl pd-5 bg-1 bk-gray mt-20">
        <span class="l">
          <a class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
          <a class="btn btn-primary radius" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe600;</i> 添加管理员</a></span>
          <span class="r">共有管理员：<strong></strong> 位</span> </div>
        <table class="table table-border table-bordered table-bg">
          <thead>
          <tr>
            <th scope="col" colspan="10">员工列表</th>
          </tr>
          <tr class="text-c">
            <th width="25"><input type="checkbox" name="" value=""></th>
            <th width="100">ID</th>
            <th>名称</th>
            <th>手机号</th>
            <th width="150">登录名</th>
            <th width="150">邮箱</th>
            <th>角色</th>
            <th width="300">加入时间</th>
            <th width="100">操作</th>
          </tr>
          </thead>
          <tbody v-for="(user, index) in users">
          <tr class="text-c">
            <td><input type="checkbox" value="1" name=""></td>
            <td>{{index}}</td>
            <td>{{user.user.first_name}}</td>
            <td>{{user.phone}}</td>
            <td>{{user.user.username}}</td>
            <td>{{user.user.email}}</td>
            <td>{{user.role}}</td>
            <td>{{user.createtime}}</td>
            <td class="td-manage">
              <a title="编辑用户信息" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
              <a title="删除用户" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
              <a style="text-decoration:none" class="ml-5" title="修改密码"><i class="Hui-iconfont">&#xe63f;</i></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--添加管理员-->
      <div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 7%">
        <div id="modelContent" class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;" move="ok">添加管理员</div>
            <article class="page-container">
              <form class="form form-horizontal">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>管理员名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.name" placeholder="姓名">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>账户名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" autocomplete="off" placeholder="登录账户" v-model="item.username">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>手机号码：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" autocomplete="off" v-model="item.phone">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>初始密码：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="password" class="input-text" autocomplete="off" placeholder="密码" v-model="item.password">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>确认密码：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="password" class="input-text" autocomplete="off" placeholder="确认新密码" v-model="item.password2">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>邮箱：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" autocomplete="off" v-model="item.email">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>角色：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                  <span class="select-box" style="width:150px;">
                    <select class="select" size="1" v-model="item.role">
                      <option value="运营人员">运营人员</option>
                      <option value="补货人员">补货员</option>
                      <option value="客服人员">客服人员人员</option>
                    </select>
                  </span>
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="submit">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--end-->
    </section>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        users: '',
        item: []
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'users/')
        .then(response => {
          this.users = response.body;
          console.log(this.users)
        })
    },
    methods: {
      submit() {
        if (this.item.passwod = this.item.password2) {
          this.$http.post(this.apiUrl + 'register/', {username: this.item.username, password: this.item.password, email:this.item.email, first_name:this.item.name, is_staff: 1})
            .then(response => {
              this.$http.post(this.apiUrl + 'users/', {company: this.users[0].company.id, role:this.item.role, phone: this.item.phone, user:response.body.id})
                .then(resp => {
                  let obj = {
                    id: resp.body.id,
                    createtime: resp.body.createtime,
                    phone: resp.body.phone,
                    role: resp.body.role,
                    user: {
                      email: this.item.email,
                      first_name: this.item.name,
                      username: this.item.username
                    }
                  }
                  this.users.push(obj)
                  this.item = []
                })
            })
        }
      },
      renovate() {
        window.location.reload()
      }
    }
  }
</script>

