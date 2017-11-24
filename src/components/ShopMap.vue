<template>
  <div>
    <section class="Hui-article-box">
      <nav class="breadcrumb">
        <i class="Hui-iconfont">&#xe67f;</i> 首页
        <span class="c-gray en">&gt;</span> 售货机管理
        <span class="c-gray en">&gt;</span> 位置管理
        <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" title="刷新" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="Hui-iconfont">&#xe600;</i></a>
      </nav>
      <div class="page-container">
        <div id="container" style="height: 900px"></div>
      </div>
      <!--添加开始-->
      <div  class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" style="margin-top: 10%">
        <div id="modelContent" class="modal-dialog" role="document">
          <div class="modal-content" style="width: 800px;">
            <div class="layui-layer-title" style="cursor: move;" move="ok">添加售货机</div>
            <article class="page-container">
              <form class="form form-horizontal" id="form-admin-add">
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>设备编号：</label>
                  <div class="formControls col-xs-8 col-sm-9"><input type="text" class="input-text" v-model="shop.shopid"></div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>地理位置：</label>
                  <div class="formControls col-xs-8 col-sm-9"><input type="text" class="input-text" v-model="shop.remarker"></div>
                </div>
                <div class="row cl">
                  <label class="form-label col-xs-4 col-sm-3"><span class="c-red">*</span>区域选择：</label>
                  <div class="formControls col-xs-8 col-sm-9">
                  <span class="select-box">
                    省：<select id='province' @change="search($event)" style="width: 18%"></select>
                    市：<select id="city" @change="search($event)" style="width: 18%"></select>
                    区：<select id='district' @change="search($event)" style="width: 18%"></select>
                    街道：<select id='street' @change="setCenter($event)" style="width: 18%"></select>
                  </span>
                  </div>
                </div>
              </form>
            </article>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">离开</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="Sure">确定</button>
            </div>
            <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" data-dismiss="modal"></a>
          </span>
          </div>
        </div>
      </div>
      <!--添加结束-->
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Add',
    data() {
      return {
        apiUrl: 'http://cyapi.freegou.io/',
        shops: null,
        map: null,
        getData: null,
        polygons: null,
        district: null,
        show: false,
        shop: [],
        createMarker: null,
        pointer: null
      }
    },
    created() {
      this.$http.get(this.apiUrl + 'shops')
        .then(resp => {
          this.shops = resp.body
        })
      let me = this
      setTimeout(() => {
        let polygons = []
        let citySelect = document.getElementById('city')
        let districtSelect = document.getElementById('district')
        let areaSelect = document.getElementById('street')
        let map = new AMap.Map('container', {
          resizeEnable: true,
          center: [120.195461, 30.240014],
          zoom: 11
        })
        let createMarker = function(name, position, draggable, color, id, shopid) {
          AMapUI.loadUI(['overlay/SimpleMarker'], (Marker) => {
            var marker = new Marker({
              iconLabel: {
                style: {
                  color: '#fff',
                  fontSize: '120%',
                  marginTop: '2px'
                },
                innerHTML: 'O'
              },
              iconStyle: color,
              map: map,
              position: position,
              draggable: draggable
            })
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
              let infoWindow = new SimpleInfoWindow({
                myCustomHeader: '我的header',
                myCustomFooter: '我的footer',
                infoTitle: '<strong>' + '设备编号#' + shopid + '</strong>',
                infoBody:
                '<p style=\'margin5px 0 \'>' + name + '<p>' +
                '<a style=\'padding-left: 10px;color: green\'>' + '<i id="move" class=\'Hui-iconfont\'>&#xe605;</i></a>' +
                '<a style=\'padding-left: 22px;color: blue\'><i id="check" class=\'Hui-iconfont\'>&#xe60e;</i></a>',
                offset: new AMap.Pixel(0, -31)
              })
              infoWindow.get$InfoBody().on('click', '.trashThis', (event) => {
                event.stopPropagation()
                me.$http.delete('http://127.0.0.1:8000/shop/' + id +'/')
                  .then( resp => { map.remove(marker) })
                infoWindow.close(map, marker.getPosition())
              })
              infoWindow.get$InfoBody().on('click', '#move', (event) => {
                event.stopPropagation()
                marker.setIconStyle('green')
                marker.setDraggable(true)
                infoWindow.close(map, marker.getPosition())
              })
              infoWindow.get$InfoBody().on('click', '#check', (event) => {
                event.stopPropagation()
                marker.setIconStyle('blue')
                marker.setDraggable(false)
                var thisPosition = [marker.getPosition().lng, marker.getPosition().lat]
                me.$http.put('http://127.0.0.1:8000/shop/' + id + '/', {remarker: name, gps: JSON.stringify(thisPosition), shopid: shopid})
              })
              infoWindow.get$InfoBody().on('click', '.glyphicon-circle-arrow-right', (event) => {
                event.stopPropagation()
                window.location.assign('http://localhost:8090/#/nav/devices/' + id)
              })
              function openInfoWin() {
                infoWindow.open(map, marker.getPosition())
              }

              marker.clicked = AMap.event.addListener(marker, 'click', () => {
                openInfoWin()
              })

            })
            return marker
          })
        }
        this.createMarker = createMarker

        this.shops.forEach(shop => {
          createMarker(shop.remarker, JSON.parse(shop.gps), false, 'blue', shop.id, shop.shopid)
        })
        var district = new AMap.DistrictSearch({
          subdistrict: 1,
          showbiz: false
        })
        district.search('中国', (status, result) => {
          if (status == 'complete') {
            getData(result.districtList[0])
          }
        })
        let getData = (data, level) => {
          let bounds = data.boundaries
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              let polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                strokeColor: '#CC66CC',
                fillColor: '#CCF3FF',
                fillOpacity: 0.5,
                path: bounds[i]
              })
              polygons.push(polygon)
            }
            map.setFitView()
          }
          if (level === 'province') {
            citySelect.innerHTML = ''
            districtSelect.innerHTML = ''
            areaSelect.innerHTML = ''
          } else if (level === 'city') {
            districtSelect.innerHTML = ''
            areaSelect.innerHTML = ''
          } else if (level === 'district') {
            areaSelect.innerHTML = ''
          }

          let subList = data.districtList
          if (subList) {
            let contentSub = new Option('--请选择--')
            let curlevel = subList[0].level
            let curList = document.querySelector('#' + curlevel)
            curList.add(contentSub)
            for (let i = 0, l = subList.length; i < l; i++) {
              let name = subList[i].name
              let levelSub = subList[i].level
              let cityCode = subList[i].citycode
              contentSub = new Option(name)
              contentSub.setAttribute('value', levelSub)
              contentSub.center = subList[i].center
              contentSub.adcode = subList[i].adcode
              curList.add(contentSub)
            }
          }
        }
        this.map = map
        this.district = district
        this.polygons = polygons
        this.getData = getData
      }, 800)
    },
    methods: {
      search(e) {
        let obj = e.target
        let option = obj[obj.options.selectedIndex]
        let adcode = option.adcode
        this.district.setLevel(option.value)
        this.district.setExtensions('all')
        this.district.search(adcode, (status, result) => {
          if (status === 'complete') {
            this.getData(result.districtList[0], obj.id)
          }
        })
      },
      setCenter(e) {
        let obj = e.target
        this.map.setCenter(obj[obj.options.selectedIndex].center)
        let point = obj[obj.options.selectedIndex].center
        this.pointer = point
        for (let i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null)
        }
        this.map.setZoom(12)
        this.zoom = 3
      },
      Sure() {
        let position = [this.pointer.lng, this.pointer.lat]
        this.$http.post(this.apiUrl + 'shops/', {remarker: this.shop.remarker, shopid: this.shop.shopid, gps: JSON.stringify(position)})
          .then( resp => {
            let id = resp.body.id
            this.createMarker(this.shop.remarker, position, true, 'green', id)
          })
      }
    }
  }
</script>


