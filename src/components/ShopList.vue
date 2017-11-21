<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 售货机管理
        <span class="c-gray en">&gt;</span> 机器列表
        <a class="btn btn-success radius r" @click="renovate" style="line-height:1.6em;margin-top:3px" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="Hui-article">
        <article class="cl pd-20">
          <div class="text-c">
            <input type="text" class="input-text" style="width:250px" placeholder="输入查找设备编号">
            <button class="btn btn-success"><i class="Hui-iconfont">&#xe665;</i>搜设备</button>
          </div>
          <div class="cl pd-5 bg-1 bk-gray mt-20">
            <span class="l">
              <a class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            </span>
            <span class="r">共有设备：<strong>{{num}}</strong> 台</span>
          </div>
          <div class="mt-20">
            <table class="table table-border table-bordered table-hover table-bg">
              <thead>
              <tr class="text-c">
                <th width="25"><input type="checkbox"></th>
                <th>设备名称</th>
                <th width="400">设备编号</th>
                <th width="300">添加时间</th>
                <th width="150">通信状态</th>
                <th width="150">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-c" v-for="(shop, index) in shops">
                <td><input type="checkbox"></td>
                <td>{{shop.remarker}}</td>
                <td>{{shop.shopid}}</td>
                <td>{{shop.createtime}}</td>
                <td class="td-status"><span class="label label-success radius">正常</span></td>
                <td class="f-14">
                  <router-link :to="{name: 'shelf', params:{id: shop.id}}" title="库存编辑" style="text-decoration:none"><i class="Hui-iconfont">&#xe60c;</i></router-link>
                  <a title="编辑" @click="capture(index, shop)" class="ml-5" style="text-decoration:none" data-target="#exampleModal" data-toggle="modal"><i class="Hui-iconfont">&#xe6df;</i></a>
                  <router-link :to="{name: 'stock', params:{id: shop.id}}" title="库存查看" class="ml-5"><i class="Hui-iconfont">&#xe665;</i></router-link>
                  <a title="删除" @click="capture(index, shop)" class="ml-5" style="text-decoration:none" data-toggle="modal" data-target=".bs-example-modal-sm"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
        <!--删除确认模态框-->
        <div id="model1" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
          <div class="layui-layer layui-layer-dialog  layer-anim" style="z-index: 19891015; top: 188px; left: 698px;">
            <div class="layui-layer-title" style="cursor: move;">提示</div>
            <div id="" class="layui-layer-content">确认要移除此售货机吗？</div>
            <span class="layui-layer-setwin">
                  <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
                </span>
            <div class="layui-layer-btn">
              <a class="layui-layer-btn0" data-dismiss="modal" @click="deleteshop">确定</a>
              <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
            </div>
          </div>
        </div>
        <!--end-->
        <!--修改模态框-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             style="margin-top: 10%">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 800px;">
              <div class="layui-layer-title" style="cursor: move;">修改售货机</div>
              <article class="page-container">
                <form class="form form-horizontal">
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3">售货机ID：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="shop.id" disabled>
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3">设备编号：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="shop.shopid">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3">设备位置：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="shop.remarker">
                    </div>
                  </div>
                </form>
              </article>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save">确定</button>
              </div>
              <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
            </div>
          </div>
        </div>
        <!--end-->
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'product',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        shops: [],
        num: 0,
        shop: [],
        index: ''
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'shops')
        .then(resp => {
          this.shops = resp.body
          let num = 0
          this.shops.forEach(shop => {
            num++
          })
          this.num = num
        })
    },
    methods: {
      renovate() {
        window.location.reload()
      },
      capture(index, shop) {
        this.index = index
        let obj = {
          id: shop.id,
          name: shop.name,
          remarker: shop.remarker,
          shopid: shop.shopid,
          gps: shop.gps
        }
        this.shop = obj
      },
      save() {
        this.$http.put(this.apiUrl + 'shop/' + this.shop.id + '/', {id: this.shop.id, remarker: this.shop.remarker, shopid: this.shop.shopid, gps: this.shop.gps})
          .then(resp => {
            this.shops.forEach(shop => {
              if(shop.id == resp.body.id) {
                shop.name = this.shop.name
                shop.remarker = this.shop.remarker
                shop.shopid = this.shop.shopid
                shop.gps = this.shop.gps
              }
            })
          })
      },
      deleteshop() {
        this.$http.delete(this.apiUrl + 'shop/' + this.shop.id + '/')
          .then(resp => {
            this.shops.splice(this.index, 1)
            this.num--
          })
      }
    },

  }
</script>

