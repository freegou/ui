<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 售货机管理
        <span class="c-gray en">&gt;</span> 机器列表
        <span class="c-gray en">&gt;</span> 库存查看
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px"  title="刷新"><i class="Hui-iconfont">&#xe68f;</i></a>
      </nav>
      <div class="page-container">
        <table class="table table-border table-bordered table-hover table-bg">
          <thead>
          <tr>
            <th scope="col" colspan="6">在售商品列表及库存</th>
          </tr>
          <tr class="text-c">
            <th width="80">分类</th>
            <th>商品名称</th>
            <th width="400">规格</th>
            <th width="300">价格</th>
            <th width="150">当前总库存</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-c" v-for="(stock, index) in stocks">
            <td>{{stock.category}}</td>
            <td>{{stock.name}}</td>
            <td>{{stock.value}}</td>
            <td>{{stock.price}}</td>
            <td class="td-status"><span class="label label-success radius">{{stock.stock.stock}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'stock',
    data () {
      return {
        id: this.$route.params.id,
        apiUrl: 'http://cyapi.freegou.io/',
        stocks: {}
      }
    },
    created() {
      this.$http.get(this.apiUrl+'shopstock/'+this.id)
        .then(resp => {
          this.stocks = resp.body;
        })
    }
  }
</script>
