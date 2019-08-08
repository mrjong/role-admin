function ClassSipClient(){

this.sipWs = null;
this.sipConnectIntervalId = null;
this.sipExtIntervalId = null; 
this.extloginsuccess = 0;//软电话是否注册成功
this.sip_callid = '';
this.sipconnected=0;//软电话是否连接成功 0：否 1：是

this.protocolStr = document.location.protocol;  //http or  https
this.sipurl = "ws://127.0.0.1:60000"; 

//连接信息 
this.agentext='';
this.extpwd='';
this.sipip='';//注册服务器IP
this.sport=''; //注册服务器port

}
function showmsg(str){
    console.log(str)
}
ClassSipClient.prototype.ConnentSocket=function(_agentext,_extpwd,_sipip,_sport) {
    try {
        this.initSocket();
    } catch (e) {
        console.info(e);
    }
    showmsg("## cti.IsConnect_CTI:"+cti.IsConnect_CTI);
    this.agentext=_agentext;
    this.extpwd=_extpwd;
    this.sipip=_sipip;
    this.sport=_sport;
    this.sipWsEvent();
}

ClassSipClient.prototype.initSocket=function() {
    var cls_sip=this; 
    clearInterval(this.sipConnectIntervalId);
    this.sipConnectIntervalId=null;
    if ("WebSocket" in window) {
        try {
            showmsg(new Date());
            this.sipWs = new WebSocket(this.sipurl);
        } catch (e) {
            showmsg(e);
            showmsg("无法连接Sip服务,请确认是否已安装");
            return;
        }
    } else if ("MozWebSocket" in window) {
        try {
            this.sipWs = new MozWebSocket(this.sipurl);
        } catch (e) {
            showmsg("无法连接Sip服务,请确认是否已安装");
            return;
        }
    } else
        showmsg("浏览器版本过低，请升级您的浏览器。\r\n浏览器要求：IE10 + /Chrome14+/FireFox7 +/Opera11+");

    setTimeout(function () {
       cls_sip.CheckSocket();
    }, 5000);
    this.sipWsEvent();
}

ClassSipClient.prototype.sipWsEvent=function() {
    var cls_sip=this;
    this.sipWs.onopen = function () {
        showmsg('## sip socket success');           
    };
    this.sipWs.onmessage = function (receiveMsg) {
        showmsg("sipsoft message:" + receiveMsg.data);
        cls_sip.parseMessage(receiveMsg.data);
    };

    this.sipWs.onclose = function (receiveMsg) {
        showmsg('sip socket close：');
        showmsg('close message:' + receiveMsg.toString());  
    };
    this.sipWs.onerror = function (receiveMsg) {
        showmsg('onerror message:' + receiveMsg.toString());
    };

}

ClassSipClient.prototype.CheckSocket=function () {
    var cls_sip=this;
    
    cls_sip.sipConnectIntervalId = setInterval(function () {
        if (cls_sip.sipWs&&cls_sip.sipWs.readyState == 1) {
        //TODO           

        } else {
            cls_sip.extloginsuccess = 0; 
            showmsg('sip软电话连接失败');
            if (cti.IsConnect_CTI==1) {//如果CTI连接，软电话退出则重新连接
                cls_sip.initSocket();
            }
        }
    }, 10000);//10s检测一次
}

ClassSipClient.prototype.checkExtLogin=function () {
    if (this.extloginsuccess == 0 && this.sipWs.readyState == 1) {
        this.loginMessage(agentext, extpwd, sip_ip + ':' + sport);
    }
}  
/*begin */

ClassSipClient.prototype.parseMessage=function (data) {
    var jsonMsg = JSON.parse(data);
    switch (jsonMsg.msgId) {
        case "900"://连接响应
            showmsg('连接:' + 900);
            if (jsonMsg.code=="200") {
            this.sipPhoneConnectedEvent();//连接成功
            this.sipconnected=1;     
            }            
            break;
        case "801"://注册响应
            showmsg('注册:' + 801);            
            this.extloginsuccess = jsonMsg.code == '200'||jsonMsg.code == '410' ? 1 : 0; 
            this.extLoginEvent(this.extloginsuccess);
            break;
        case "802"://应答响应
            showmsg('应答:' + 802);
            //setbuttonEnable('btn_call', false, 5);
            break;
        case "803"://挂断响应
            showmsg('挂断:' + 803);
            //setbuttonEnable('btn_call', true, 5);
            break;
        case "804"://注销响应
            showmsg('注销:' + 804);
            if (jsonMsg.code=="200"){ //如果注销成功，则关闭sip
                showmsg('注销成功');
                this.sipPhoneDisConnect();
            }else
             showmsg('注销失败');
            break;
        case "901"://振铃
            showmsg('振铃:' + 901);
            this.sip_callid = jsonMsg.callId;  
            //setbuttonEnable('btn_call', false, 5);
            break;
        case "902"://接通
            showmsg('接通:' + 902);
            //setbuttonEnable('btn_call', false, 5);
            break;
        case "903"://挂断
            showmsg('挂断:' + 903);
            //setbuttonEnable('btn_call', true, 5);
            break;
    }
}


ClassSipClient.prototype.loginMessage=function(_extName, _pwd, _domainName) {
    var msgObj = {
        msgId: "701",
        showName: _extName,
        name: _extName,
        password: _pwd,
        authUser: _extName,
        domainName: _domainName,
        expireTime: "",
        domainProxy: ""
    }; 
    try {
        this.sipWs.send(JSON.stringify(msgObj));
        showmsg("发送：" + JSON.stringify(msgObj));
    } catch (e) {
        showmsg("debug loginMessage" + e);
    }

}

ClassSipClient.prototype.answerMessage=function(_extName, _callid) {
    var msgObj = {
        msgId: "702",
        name: _extName,
        callId: _callid
    };
    try {
        this.sipWs.send(JSON.stringify(msgObj));
        showmsg("发送：" + JSON.stringify(msgObj));
    } catch (e) {

        showmsg("debug answerMessage" + e);
    }
}

ClassSipClient.prototype.hangupMessage=function(_extName, _callid) {
    var msgObj = {
        msgId: "703",
        name: _extName,
        callId: _callid
    };
    try {
        this.sipWs.send(JSON.stringify(msgObj));
        showmsg("发送：" + JSON.stringify(msgObj));
    } catch (e) {

        showmsg("debug hangupMessage" + e);
    }
}

ClassSipClient.prototype.logoutMessage=function(_extName) {
    var msgObj = {
        msgId: "704",
        name: _extName
    };
    try {
        this.sipWs.send(JSON.stringify(msgObj));
        showmsg("发送：" + JSON.stringify(msgObj));
    } catch (e) {

        showmsg("debug logoutMessage" + e);
    }

}

ClassSipClient.prototype.sipPhoneDisConnect=function(){
    clearInterval(this.sipConnectIntervalId);
    if (this.sipWs!=null) {
        this.sipWs.close(); 
    }
    this.sipWs=null;
}

ClassSipClient.prototype.sipPhoneConnectedEvent=function(){

}
/*分机注册结果*/
ClassSipClient.prototype.extLoginEvent=function(extlogin){

}
/*end*/




