// components/lottery/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    title: String,
    eventId: Number,
    deadline: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    clock: '',
    total_micro_second: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.triggerEvent("buttonTapped")
    },
    countdown(that) {
        // 渲染倒计时时钟
        that.setData({
          clock : this.dateformat(that.data.total_micro_second)
        });
      
        if (that.data.total_micro_second <= 0) {
          that.setData({
            clock:"已经截止"
          });
          // timeout则跳出递归
          return ;
        }  
        setTimeout(function(){
          // 放在最后--
          that.data.total_micro_second -= 1/60;
          that.countdown(that);
        }
        ,10)
   },


      dateformat(second) {
        // 天位
        // 小时位
        var day = Math.floor(second/(3600*24));
        second = second % (3600*24);
        var hr = Math.floor((second/3600));
        second = second % 3600;
        var min = Math.floor(second/60);
        // 分钟位
        // var sec = Math.floor((micro_second - hr * 3600) / 60);
        if (day > 0){
          return day + "天" + hr + "小时" + min + "分钟"  ;
        }
        else{
          return hr + "小时" + min + "分钟"  ;
        }
      }
  },
  lifetimes:{
    attached(){
      var time = new Date().getTime();
      this.setData({
        total_micro_second: this.properties.deadline - time
      })
      this.countdown(this)
    }
   }
})

