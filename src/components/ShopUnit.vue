<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 售货机管理
        <span class="c-gray en">&gt;</span> 机器列表
        <span class="c-gray en">&gt;</span> 货架管理
        <span class="c-gray en">&gt;</span> 层数管理
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" title="刷新" @click="renovate" ><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="Hui-article">
        <article class="cl pd-20">
          <div class="cl pd-5 bg-1 bk-gray">
            <span class="l">
              <a class="btn btn-primary radius" data-toggle="modal" data-target=".bs-example-modal-lg1"><i class="Hui-iconfont">&#xe600;</i> 增加层数</a>
            </span>
            <span class="r">此货架共有层数：<strong>{{num}}</strong> 层</span></div>
          <div class="page-container" v-for="(layer,index) in layers" >
            <table class="table table-border table-bordered table-bg">
              <thead>
              <tr class="text-c">
                <th colspan="20" scope="col">第{{layer.layernumber}}层</th>
              </tr>
              <tr class="text-c">
                <th width="100">起始槽位</th>
                <th width="100">槽位长度</th>
                <th width="500">商品名称</th>
                <th width="150">规格</th>
                <th width="150">价格</th>
                <th width="150">当前库存</th>
                <th width="100">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-c" v-for="(unit,index) in layer.shelf_units">
                <td>{{unit.offset}}</td>
                <td>{{unit.length}}</td>
                <td>{{unit.product.name}}</td>
                <td>{{unit.product.value}}</td>
                <td>{{unit.price}}</td>
                <td><span class="label label-success radius">{{unit.number}}</span></td>
                <td>
                  <a title="编辑" @click="carture3(unit, layer.id)" data-toggle="modal" data-target=".bs-example-modal-lg3"><i class="Hui-iconfont">&#xe647;</i></a>
                  <a title="删除" class="ml-5" @click="capture1(index, unit.id, layer.id)" data-toggle="modal" data-target=".bs-example-modal-sm1"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="cl pd-5 bg-1 bk-gray">
            <span class="r">
              <a class="btn btn-danger radius" @click="capture(index, layer.id, layer.layernumber)" data-toggle="modal" data-target=".bs-example-modal-sm2"><i class="Hui-iconfont">&#xe6e2;</i> 删除本层</a>
              <a class="btn btn-primary radius" @click="capture(index, layer.id, layer.layernumber)" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe600;</i> 上架新商品</a>
            </span>
              <span class="l">商品总数:<strong>{{layer.shelf_units.length}}</strong></span> </div>
          </div>
        </article>
        <!--添加货架开始-->
        <div class="modal fade bs-example-modal-lg1" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 800px;">
              <div class="layui-layer-title" style="cursor: move;">添加层数</div>
              <article class="page-container">
                <form class="form form-horizontal" >
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>新增层数编号：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="layernumber">
                    </div>
                  </div>
                </form>
              </article>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addlayer">确定</button>
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
              <a class="layui-layer-btn0" data-dismiss="modal" @click="deletelayer">确定</a>
              <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
            </div>
          </div>
        </div>
        <!--end-->
        <!--确认删除模态框-->
        <div class="modal fade bs-example-modal-sm1" tabindex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel">
          <div class="layui-layer layui-layer-dialog  layer-anim" style="z-index: 19891015; top: 188px; left: 698px;">
            <div class="layui-layer-title" style="cursor: move;">提示</div>
            <div class="layui-layer-content">确认移除此商品吗？</div>
            <span class="layui-layer-setwin">
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
        </span>
            <div class="layui-layer-btn">
              <a class="layui-layer-btn0" data-dismiss="modal" @click="deleteunit">确定</a>
              <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
            </div>
          </div>
        </div>
        <!--end-->
        <!--添加货架开始-->
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 800px;">
              <div class="layui-layer-title" style="cursor: move;">添加商品</div>
              <article class="page-container">
                <form class="form form-horizontal" >
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>当前层数：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="layernumber1" disabled>
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>开始槽位：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item.offset">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>结束槽位：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item.length">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>选择商品：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <select class="select" name="brandclass" size="1" style="height: 31px" v-model="item.product">
                        <option v-for="product in products" v-bind:value="product.id">{{product.name}}{{product.value}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>价格：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item.price">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>库存：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item.number">
                    </div>
                  </div>
                </form>
              </article>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addproduct">确定</button>
              </div>
              <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
            </div>
          </div>
        </div>
        <!--添加层数结束-->
        <!--编辑槽位开始-->
        <div class="modal fade bs-example-modal-lg3" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
          <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 800px;">
              <div class="layui-layer-title" style="cursor: move;">编辑槽位</div>
              <article class="page-container">
                <form class="form form-horizontal" >
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>开始槽位：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item2.offset">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>结束槽位：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item2.length">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>选择商品：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <select class="select" name="brandclass" size="1" style="height: 31px" v-model="item2.product">
                        <option v-for="product in products" v-bind:value="product">{{product.name}}{{product.value}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>价格：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item2.price">
                    </div>
                  </div>
                  <div class="row cl">
                    <label class="form-label col-xs-4 col-sm-3"><span class="c-red"></span>库存：</label>
                    <div class="formControls col-xs-8 col-sm-9">
                      <input type="text" class="input-text" v-model="item2.number">
                    </div>
                  </div>
                </form>
              </article>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="putunit()">确定</button>
              </div>
              <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
            </div>
          </div>
        </div>
        <!--添加层数结束-->
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'shopadd',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        id: this.$route.params.id,
        layers: {},
        num: '',
        index: '',
        layer: '',
        index1: '',
        unit: '',
        layerId: '',
        item: {},
        products: {},
        layernumber1: '',
        item2: {},
        layernumber: ''
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'products')
        .then(resp => {
          this.products = resp.body
        })
      this.$http.get(this.apiUrl + 'shelf/' + this.id )
        .then(resp => {
          let num = 0
          resp.body.forEach(layer => {
            num++
          })
          this.num = num
          this.layers = resp.body
        })
    },
    methods: {
      renovate() {
        window.location.reload()
      },
      capture(index, layer, number) {
        this.index = index
        this.layer = layer
        this.layernumber1 = number
      },
      deletelayer() {
        this.$http.delete(this.apiUrl + 'layer/' + this.layer)
          .then(resp => {
            this.layers.splice(this.index, 1)
          })
      },
      addlayer() {
        this.$http.post(this.apiUrl + 'layers/', {shelf: this.id, layernumber: this.layernumber})
          .then(resp => {
            let obj = {
              id: resp.body.id,
              layernumber: resp.body.layernumber,
              shelf_units: []
            }
            this.layers.push(obj)
            this.num++
            this.layernumber = ''
          })
      },
      capture1(index, unit , layerid) {
        this.index1 = index
        this.unit = unit
        this.layerId = layerid
      },
      deleteunit(){
        this.$http.delete(this.apiUrl + 'unit/' + this.unit)
          .then(resp => {
            this.layers.forEach(layer => {
              if(layer.id == this.layerId) {
                layer.shelf_units.splice(this.index1, 1)
              }
            })
            this.unit = ''
            this.index1 = ''
            this.num--
          })
      },
      addproduct() {
        this.$http.post(this.apiUrl + 'units/', {shop: this.$route.params.pid, price: this.item.price, offset: this.item.offset, length: this.item.length, layer: this.layer, product: this.item.product, number: this.item.number})
          .then(resp => {
            let obj = {
              id: resp.body.id,
              shop: this.$route.params.pid,
              price: this.item.price,
              offset: this.item.offset,
              length: this.item.length,
              layer: this.layer,
              product: resp.body.product,
              number: this.item.number
            }
            this.layers.forEach(layer => {
              if(layer.id == this.layer){
                layer.shelf_units.push(obj)
              }
            })
            this.item = {}
            this.layer = ''
          })
      },
      carture3(unit, layer) {
        let obj = {
          id: unit.id,
          offset: unit.offset,
          length: unit.length,
          product: unit.product,
          price: unit.price,
          number: unit.number,
          layer: layer
        }
        this.item2 = obj
      },
      putunit(){
        this.$http.put(this.apiUrl + 'unit/' + this.item2.id + '/', { shop: this.$route.params.pid, price: this.item2.price, offset: this.item2.offset, length: this.item2.length, layer: this.item2.layer, product: this.item2.product.id, number: this.item.number })
          .then(resp => {
            this.layers.forEach(layer => {
              layer.shelf_units.forEach(unit => {
                if(unit.id == this.item2.id) {
                  unit.offset = this.item2.offset
                  unit.length = this.item2.length
                  unit.product = this.item2.product
                  unit.price = this.item2.price
                  unit.number = this.item2.number
                }
              })
            })
            this.item2 = {}
          })
      }
    }

  }
</script>
