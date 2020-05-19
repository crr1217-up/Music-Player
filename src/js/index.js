; (function ($, player) { 
    function Index() { 
        this.index = 0;
        this.dataList = [];
    }
    Index.prototype = {
        init: function () { //初始化
            this.getData();
            this.renderPage();
        },
        getData: function () { //请求数据
            var self = this;
            $.ajax({
                url: "../mock/data.json",
                type: "GET",
                success: function (data) { 
                    self.dataList = data;
                    //  console.log(data);
                    self.renderPage(data);
                    // self.renderList(data);
                }
            })
        },
        renderPage: function () { //控制渲染页面
            player.renderObj.render(this.dataList[this.index].image);
            player.renderObj.info(this.dataList[this.index]);
            player.renderObj.playList(this.dataList);
            player.renderObj.liking(this.dataList[this.index].isLike);
        },
        // renderList: function (data) { 
            
        // }
    }
    
    var ind = new Index();
    ind.init();
    // console.log("111");
})(window.Zepto, window.player || (window.player = {}))