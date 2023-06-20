if(window.location.host=="www.4399.com" || window.location.host=="h.4399.com"  || window.location.host=="zuopin.4399.com" || window.location.host=="h.api.4399.com" || window.location.host=="zxwyouxi.com"){
    //屏蔽F12
    $(document).keydown(function(event){
        if(event.keyCode==123){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                window.event.returnValue == false;
            }
        }
    }); 
    //屏蔽ctrl+shift+i
    $(document).keydown(function(event){
    　　if(event.ctrlKey && event.shiftKey && event.keyCode==73){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                window.event.returnValue == false;
            }
    　　}
    });
    // 为右键添加自定义事件，可以禁用
    $(document).ready(function(){
        $(document).bind("contextmenu",function(e){
            return false;
        });
    });
}