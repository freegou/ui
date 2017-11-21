<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 商品管理
        <span class="c-gray en">&gt;</span> 商品列表
        <a class="btn btn-success radius r" @click="renovate" style="line-height:1.6em;margin-top:3px" title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="Hui-article">
        <article class="cl pd-20">
          <div class="text-c">
            <input type="text" class="input-text" style="width:250px" placeholder="输入查找商品名称">
            <button class="btn btn-success"><i class="Hui-iconfont">&#xe665;</i>搜产品</button>
          </div>
          <div class="cl pd-5 bg-1 bk-gray mt-20">
            <span class="l">
              <a class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
              <a class="btn btn-primary radius" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe600;</i> 添加商品</a>
            </span>
            <span class="r">共有商品：<strong>{{num}}</strong> 件</span>
          </div>
          <div class="mt-20">
            <table class="table table-border table-bordered table-bg table-hover table-sort">
              <thead>
              <tr class="text-c">
                <th width="25"><input type="checkbox"></th>
                <th>商品名称</th>
                <th width="400">规格</th>
                <th width="300">添加时间</th>
                <th width="70">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="text-c" v-for="(product, index) in products">
                <td><input type="checkbox"></td>
                <td>{{product.name}}</td>
                <td>{{product.value}}</td>
                <td>{{product.createtime}}</td>
                <td class="f-14">
                  <a title="编辑" @click="capture(index, product)" style="text-decoration:none" data-toggle="modal" data-target=".bs-example-modal-lg1" ><i class="Hui-iconfont">&#xe6df;</i></a>
                  <a title="删除" @click="capture(index, product)" class="ml-5" style="text-decoration:none" data-toggle="modal" data-target=".bs-example-modal-sm"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
      <!--添加商品模态框-->
      <div class="modal fade bs-example-modal-lg mt-40" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" >
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">添加商品</div>
            <article class="page-container">
              <form class="form form-horizontal" id="form-admin-add">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>商品分类：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                  <span class="select-box">
                    <select class="select" v-model="item.category">
                      <option v-for="category in categories" v-bind:value="category">{{category.name}}</option>
                    </select>
                  </span>
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>商品名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.name" >
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>商品规格：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.value">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>条形码：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.code" >
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>价格：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="item.price">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品描述：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <textarea name="abstract" cols="" rows="" class="textarea" v-model="item.description"  placeholder="说点什么..." ></textarea>
                    <p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">搜索标签：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" placeholder="语音搜索标签..." v-model="item.search">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品图片：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <div v-for="img in item.images">
                      <img v-bind:src=img style="width: 150px">
                    </div>
                    <div>
                      <a class="btn btn-primary radius upload-btn" id="upload" v-on:click="uploadGood"><i class="Hui-iconfont"></i> 点击添加图片</a>
                    </div>
                    <input style="display: none;" id="upload2"  type="file" @change="previewFilesSku" multiple>
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="leave">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--end-->
      <!--确认删除模态框-->
      <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="layui-layer layui-layer-dialog  layer-anim" id="layui-layer1"
             style="z-index: 19891015; top: 250px; left: 898px;">
          <div class="layui-layer-title" style="cursor: move;">提示</div>
          <div id="" class="layui-layer-content">确认要删除吗？</div>
          <span class="layui-layer-setwin">
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
        </span>
          <div class="layui-layer-btn">
            <a class="layui-layer-btn0" data-dismiss="modal" @click="deleteProduct">确定</a>
            <a class="layui-layer-btn1" data-dismiss="modal">取消</a>
          </div>
        </div>
      </div>
      <!--end-->
      <!--edit product-->
      <div  class="modal fade bs-example-modal-lg1" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" >
        <div  class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;">修改商品</div>
            <article class="page-container">
              <form class="form form-horizontal">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品ID：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="product.id" disabled >
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品分类：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                  <span class="select-box">
                    <select class="select" v-model="product.category">
                      <option v-for="category in categories" v-bind:value="category">{{category.name}}</option>
                    </select>
                  </span>
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品名称：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="product.name" >
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品规格：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="product.value">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">条形码：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="product.code" >
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">价格：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" v-model="product.price">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品描述：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <textarea name="abstract" cols="" rows="" class="textarea" v-model="product.description"></textarea>
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">搜索标签：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <input type="text" class="input-text" placeholder="语音搜索标签..." v-model="product.search">
                  </div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-2">商品图片：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                    <div>
                      <img title="点击更换图片" :src="product.images" data-holder-rendered="true" style="width: 140px; height: 140px;"  @click="uploadimage">
                    </div>
                    <input style="display: none;" id="upload1" type="file" @change="previewFiles" multiple>
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editsave">确定</button>
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
  import Vue from 'vue'
  export default {
    name: 'product',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        products: [],
        product: '',
        categories: [],
        num: 0,
        item: [],
        index: ''
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'products')
        .then(resp => {
          this.products = resp.body
          let num = 0
          this.products.forEach(product => {
            num++
          })
          this.num = num
        })
      this.$http.get(this.apiUrl + 'categories')
        .then(resp => {
          this.categories = resp.body
        })
    },
    methods: {
      uploadGood() {
        document.querySelector('#upload2').click()
      },
      uploadimage() {
        document.querySelector('#upload1').click()
      },
      previewFilesSku() {
        let files = document.querySelector('#upload2').files;
        let formData = new FormData()
        Vue.set(this.item, 'images', [])
        this.item.images = []
        formData.append('file', files[0])
        this.$http.post('http://file.freegou.io', formData)
          .then(resp => {
            this.item.images.splice(0, 1, 'http://file.freegou.io' + resp.body)
          })
      },
      previewFiles() {
        let files = document.querySelector('#upload1').files
        let formData = new FormData()
        formData.append('file', files[0])
        this.$http.post('http://file.freegou.io', formData)
          .then(resp => {
            this.product.images = 'http://file.freegou.io' + resp.body
          })
      },
      submit() {
        this.$http.post(this.apiUrl + 'products', {name: this.item.name, code: this.item.code, description: this.item.description, price: this.item.price, search: this.item.search, value: this.item.value, category: this.item.category.id, images: this.item.images[0]})
          .then(resp => {
            let obj = {
              id: resp.body.id,
              name: this.item.name,
              code: this.item.code,
              description: this.item.description,
              price: this.item.price,
              search: this.item.search,
              value: this.item.value,
              category: this.item.category,
              images: this.item.images,
              createtime: resp.body.createtime
            }
            this.products.push(obj)
            this.item.images.splice(0, 1)
            this.item.name = ''
            this.item.code = ''
            this.item.description = ''
            this.item.price = ''
            this.item.search = ''
            this.item.value = ''
            this.item.category = ''
            this.num++
          })
      },
      capture(index, product) {
        this.index = index
        let obj = {
          id: product.id,
          owner: product.owner,
          name: product.name,
          code: product.code,
          description: product.description,
          price: product.price,
          search: product.search,
          value: product.value,
          category: product.category,
          images: product.images
        }
        this.product = obj
      },
      deleteProduct() {
        this.$http.delete(this.apiUrl + 'product/' + this.product.id)
          .then(resp => {
            this.products.splice(this.index, 1)
            this.num--
          })
      },
      renovate() {
        window.location.reload()
      },
      editsave() {
        this.$http.put(this.apiUrl + 'product/' + this.product.id + '/', {owner: this.product.owner, name: this.product.name, code: this.product.code, description: this.product.description, price: this.product.price, search: this.product.search, value: this.product.value, category: this.product.category.id, images: this.product.images})
          .then(resp => {
            let cache = resp.body
            this.products.forEach(product => {
              if(product.id == resp.body.id) {
                product.name = cache.name
                product.category = cache.category
                product.code = cache.code
                product.price = cache.price
                product.search = cache.search
                product.description = cache.description
                product.value = cache.value
                product.images = cache.images
              }
            })
            this.product = {}
          })
      },
      leave() {
        this.item = []
      }
    }
  }
</script>
