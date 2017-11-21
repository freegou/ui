<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页<span class="c-gray en">&gt;</span> 商品管理<span class="c-gray en">&gt;</span> 分类管理
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" @click="renovate" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="Hui-article">
        <article class="cl pd-20">
          <div class="cl pd-5 bg-1 bk-gray">
            <span class="l">
              <a class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
              <a class="btn btn-primary radius" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe600;</i> 添加分类</a>
            </span>
            <span class="r">共有数据：<strong>{{num}}</strong> 条</span></div>
          <div class="mt-10">
            <table class="table table-border table-bordered table-bg table-sort">
              <thead>
              <tr class="text-c">
                <th width="25"><input type="checkbox"></th>
                <th width="300">ID</th>
                <th>名称</th>
                <th width="300">添加时间</th>
                <th width="70">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-c" v-for="(category, index) in categories">
                <td><input type="checkbox"></td>
                <td>{{category.id}}</td>
                <td>{{category.name}}</td>
                <td>{{category.createtime}}</td>
                <td class="f-14">
                  <a title="编辑" @click="capture(index, category)" style="text-decoration:none" data-target=".ss-example-modal-sm" data-toggle="modal"><i class="Hui-iconfont">&#xe6df;</i></a>
                  <a title="删除" @click="capture(index, category)" class="ml-5" style="text-decoration:none" data-toggle="modal" data-target=".bs-example-modal-sm"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
      <!--添加分类模态框-->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">添加分类</div>
            <article class="page-container">
              <form class="form form-horizontal">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>分类名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.name">
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--end-->
      <!--删除确认模态框-->
      <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog"
           aria-labelledby="mySmallModalLabel">
        <div class="layui-layer layui-layer-dialog  layer-anim" style="z-index: 19891015; top: 250px; left: 898px;">
          <div class="layui-layer-title" style="cursor: move;">提示</div>
          <div id="" class="layui-layer-content">确认要删除吗？</div>
          <span class="layui-layer-setwin">
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
        </span>
          <div class="layui-layer-btn">
            <a class="layui-layer-btn0" data-dismiss="modal" @click="deletecategory">确定</a>
            <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--修改模态框-->
      <div class="modal fade ss-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="margin-top: 10%">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">修改分类</div>
            <article class="page-container">
              <form class="form form-horizontal">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3">分类ID：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="category.id" disabled>
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3">新名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="name">
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save()">确定</button>
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
    name: 'category',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        categories: [],
        item: {},
        index: '',
        category: [],
        num: 0,
        name: ''
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'categories')
        .then(response => {
          this.categories = response.body
          let num = 0
          this.categories.forEach(category => {
            num++
          })
          this.num = num
        })
    },
    methods: {
      capture(index, category) {
        this.index = index
        this.category = category
        this.name = category.name
      },
      submit() {
        if(this.item.name !== null) {
          this.$http.post(this.apiUrl + 'categories', {name: this.item.name })
            .then(resp => {
              let obj = {
                id: resp.body.id,
                name: resp.body.name,
                createtime: resp.body.createtime
              }
              this.categories.push(obj)
              this.item = {}
              this.num++
            })
        }
      },
      deletecategory() {
        this.$http.delete(this.apiUrl + 'category/' + this.category.id + '/')
          .then(resp => {
            this.categories.splice(this.index, 1)
            this.num--
          })
      },
      save() {
        this.$http.put(this.apiUrl + 'category/' + this.category.id + '/', {name: this.name})
          .then(resp => {
            this.categories.forEach(category => {
              if(category.id == this.category.id) {
                category.name = this.name
              }
            })
            this.name = ''
          })
      },
      renovate() {
        window.location.reload()
      }
    }
  }
</script>
