// components/lottery/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    title: String,
    eventId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    clock: '',
    total_micro_second : 36000,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          that.data.total_micro_second -= 1;
          that.countdown(that);
        }
        ,10)
   },


  dateformat(micro_second) {
    // 天位
    // 小时位
    var day = Math.floor(micro_second/(3600*24))
    var hr = Math.floor((micro_second-day*24*3600)/24)
    var min = Math.floor((micro_second-day*24*3600-hr*3600*24*24)/60);
    // 分钟位
    // var sec = Math.floor((micro_second - hr * 3600) / 60);

   return day + "天" + hr + "小时" + min + "分钟"  ;
  }
},


  lifetimes:{
    attached(){
      this.countdown(this)
    }
  }
})

