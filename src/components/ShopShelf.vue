<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 售货机管理
        <span class="c-gray en">&gt;</span> 机器列表
        <span class="c-gray en">&gt;</span> 货架管理
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" @click="renovate" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="Hui-article">
        <article class="cl pd-20">
          <div class="cl pd-5 bg-1 bk-gray">
            <span class="l">
              <a class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
              <a class="btn btn-primary radius" data-toggle="modal" data-target=".bs-example-modal-lg2"><i class="Hui-iconfont">&#xe600;</i> 添加货架</a>
            </span>
            <span class="r">共有货架：<strong>{{num}}</strong> 个</span></div>
          <div class="mt-10">
            <table class="table table-border table-bordered table-hover table-bg">
              <thead>
              <tr>
                <th scope="col" colspan="6">货架管理</th>
              </tr>
              <tr class="text-c">
                <th width="25"><input type="checkbox"></th>
                <th>货架编号</th>
                <th width="300">货架层数</th>
                <th width="100">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-c" v-for="(stock,index) in this.stocks">
                <td><input type="checkbox"></td>
                <td>{{stock.shelfnumber}}号货架</td>
                <td>{{stock.shelf_layers.length}}</td>
                <td class="f-14">
                  <router-link :to="{name: 'unit', params:{id: stock.id, pid:stock.owner.id}}" title="查看货架在售商品" style="text-decoration:none"><i class="Hui-iconfont">&#xe665;</i></router-link>
                  <a title="编辑" class="ml-5" @click="capture1(stock.shelfnumber, stock.id)" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe6df;</i></a>
                  <a title="删除" class="ml-5" @click="capture(index, stock.id)" style="text-decoration:none" data-toggle="modal" data-target=".bs-example-modal-sm2"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
      <!--添加货架开始-->
      <div class="modal fade bs-example-modal-lg2" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">添加货架</div>
            <article class="page-container">
              <form class="form form-horizontal" >
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>已拥有货架编号：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" disabled v-model="shelf">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>新增货架编号：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" placeholder="请输入数字" v-model="shelfnumber">
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addshelf">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--添加层数结束-->
      <!--确认删除模态框-->
      <div class="modal fade bs-example-modal-sm2" tabindex="-1" role="dialog"
           aria-labelledby="mySmallModalLabel">
        <div class="layui-layer layui-layer-dialog  layer-anim" style="z-index: 19891015; top: 188px; left: 698px;">
          <div class="layui-layer-title" style="cursor: move;">提示</div>
          <div class="layui-layer-content">移除此货架将移除所有层数和此货架在售商品,确认删除吗？</div>
          <span class="layui-layer-setwin">
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
        </span>
          <div class="layui-layer-btn">
            <a class="layui-layer-btn0" data-dismiss="modal" @click="deleteshelf">确定</a>
            <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--修改货架开始-->
      <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">修改货架</div>
            <article class="page-container">
              <form class="form form-horizontal" >
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>修改货架编号：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" placeholder="请输入数字" v-model="shelfnumber1">
                  </div>
                </div>

              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editshelf">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--添加层数结束-->
    </section>
  </div>
</template>


<script>
  export default {
    name: 'shopproducts',
    data () {
      return {
        id: this.$route.params.id,
        apiUrl: 'http://cyapi.freegou.io/',
        stocks: {},
        num: '',
        shelf: [],
        shelfnumber: '',
        shelfnumber1: '',
        shelfId: '',
        deleteshelfId: '',
        index: ''
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'stock/' + this.id)
        .then(resp => {
          let num = 0
          resp.body.forEach(shelf => {
            num++
            this.shelf.push(shelf.shelfnumber + '号')
          })
          this.num = num
          this.stocks = resp.body
          this.shop = this.stocks[0].owner
        })
    },
    methods: {
      addshelf() {
        this.$http.post(this.apiUrl + 'shelfs/', {owner: this.id, shelfnumber: this.shelfnumber})
          .then(resp => {
            let cache = resp.body
            cache.shelf_layers = []
            this.stocks.push(resp.body)
            this.shelf.push(this.shelfnumber + '号')
            this.shelfnumber = ''
            this.num++
          })
      },
      capture(index, id) {
        this.index = index
        this.deleteshelfId = id
      },
      capture1(shelfnumber, id) {
        this.shelfnumber1 = shelfnumber
        this.shelfId = id
      },
      editshelf() {
        this.$http.put(this.apiUrl + 'shelf/' + this.shelfId+'/', {shelfnumber: this.shelfnumber1})
          .then(resp => {
            this.stocks.forEach(stock => {
              if(stock.id == this.shelfId) {
                stock.shelfnumber = this.shelfnumber1
              }
            })
          })
      },
      deleteshelf() {
        this.$http.delete(this.apiUrl + 'shelf/' + this.deleteshelfId + '/')
          .then(resp => {
            this.stocks.splice(this.index, 1)
            this.num--
          })
      },
      renovate() {
        window.location.reload()
      },
    }
  }
</script>


