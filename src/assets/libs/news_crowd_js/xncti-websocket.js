
///////////////////////////////////////////////////////////
///构造函数
///////////////////////////////////////////////////////////
function ClassXnCtiClient() {
    this.IP = null;
    this.Port = null;
    this.UserID = null;
    this.thisDN = null;
    this.UserPWD = null;
    this.UserExt = null;
    this.UserComp = null;
    this.UserGroup = null;
    this.IsConnect_CTI = 0;
    this.Status = 0;
    this.SeatStatus = 0;
    this.CallID = '';
    this.Caller = '';
    this.Called = '';
    this.ExtDirection = '';
    this.IsDebug = false;
    this.IsBusy = 0;
    this.IsNotDisturb = 0;
    this.dwFreq = 10;
    this.dwDuration = 5000;
    this.TelMessageSign = 0;
    this.LevelMessageSign = 0;
    this.websocket = null;

    this.msgheadend = '|';
    this.msgheadsplit = ":";
    this.msgbodyend = "&";
    this.msgbodysplit = "=";
    this.msgend = "@";






}



///////////////////////////////////////////////////////////
///检测cti连接
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CheckConnect = function () {
    if (this.IsConnect_CTI == 0) {
        // alert("请先连接CTI服务器!");
        return false;
    }
    return true;
}

///////////////////////////////////////////////////////////
///连接CTI服务器@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CtiConnect = function (IP, Port) {
    this.IP = IP;
    this.Port = Port;

    if (this.IP == null) {
        //  alert('服务器IP地址不能为空！');
        //return;
        return this.JsonResult(-101);
    }
    if (this.Port == null) {
        return this.JsonResult(-102);
    }
    if (this.websocket != null) {
        if (this.websocket.isConnected()) {
            return this.JsonResult(-103);
            //alert('CTI服务器已连接不可重复连接');
            //return;
        }
    }



    var xncti = this;
    if (ws.browserSupportsWebSockets()) {
        this.websocket = new ws.webSocketClient();

        //websocket.setReliabilityOptions(ws.RO_ON);
    } else {
        var lMsg = ws.MSG_WS_NOT_SUPPORTED;
        showMessage(lMsg);
    }
    var lURL = ws.getServerURL(ws_type, this.IP, this.Port, "/ws");
    //var lURL = ws.getServerURL("wss", this.IP, this.Port, "/websocket");
    var thisDN = this.thisDN;

    var data = { "request": "CtiConnect", "thisDN": thisDN };
    var lRes = this.websocket.logon(lURL, thisDN, JSON.stringify(data), {
        //onOpen callback
        OnOpen: function (aEvent) {
            xncti.websocket.startKeepAlive({ immediate: false, interval: 30000 });
            xncti.IsConnect_CTI = 1;
            xncti.CTIConnectedEvent();
        },
        //onMessage callback
        OnMessage: function (aEvent) {
            xncti.parseMessage(aEvent.data);
        },
        //onClose callback
        OnClose: function (aEvent) {
            xncti.websocket.stopKeepAlive();
            xncti.IsConnect_CTI = 0;
            xncti.CTIDisConnectedEvent();
        }
    });
    return this.JsonResult(1);
}
ClassXnCtiClient.prototype.send = function (data) {
   // console.info("Send CTI:  " + data);
    if (this.websocket) {

        this.websocket.sendToken(data);
    } else {
        showMessage("disconnect from cti server while send message");
    }
}

ClassXnCtiClient.prototype.parseMessage = function (data) {
    //console.info("接收data：  " + data);
    var msttype, msg, msgbody;
    msttype = parseInt(GetMsgPara(data, "MSGTYPE", ':', '|', 0));
    msg = parseInt(GetMsgPara(data, "MSG", ':', '|', 0));
    msgbody = GetMsgPara(data, "MSGBODY", ':', '@', 0);

    if (msttype == "" || msg == "" || msgbody == "") {

        alert("ERROR MSG=" + data);

    } else {
        switch (msttype) {
            case MSGTYPE.EVENT:
                {
                    switch (msg) {
                        case EVENTCLASS.EVENT_ExtStateChanged:
                            {
                                var deviceid = GetBodyItem(data, "deviceid");
                                var devicestate = GetBodyItem(data, "devicestate");
                                var pbxid = GetBodyItem(data, "pbxid");
                                var laststate = GetBodyItem(data, "laststate");
                                var floatdata = GetBodyItem(data, "floatdata");
                                this.EVENT_ExtStateChanged(deviceid, devicestate, pbxid, laststate, floatdata);
                            }
                            break;
                        case EVENTCLASS.EVENT_AgentStateChanged:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                var agentstate = GetBodyItem(data, "agentstate");
                                var laststate = GetBodyItem(data, "laststate");
                                var compid = GetBodyItem(data, "compid");
                                this.SeatStatus = agentstate;
                                this.EVENT_AgentStateChanged(agentid, agentstate, laststate, compid);
                            }
                            break;
                        case EVENTCLASS.EVENT_AgentAnswered:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                var callid = GetBodyItem(data, "callId");
                                var calltype = GetBodyItem(data, "callType");
                                var compid = GetBodyItem(data, "compid");
                                var areacode = GetBodyItem(data, "areaCode");
                                var calleedevice = GetBodyItem(data, "calleeDevice");
                                var callerdevice = GetBodyItem(data, "callerDevice");
                                var taskid = GetBodyItem(data, "taskId");
                                var tasktype = GetBodyItem(data, "taskType");
                                var filename = GetBodyItem(data, "fileName");
                                var calldata = GetBodyItem(data, "callData");
                                this.EVENT_AgentAnswered(compid, agentid, callid, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, filename, calldata);
                            }
                            break;
                        case EVENTCLASS.EVENT_OtherRinging:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                var callid = GetBodyItem(data, "callId");
                                var calltype = GetBodyItem(data, "callType");
                                var compid = GetBodyItem(data, "compid");
                                var areacode = GetBodyItem(data, "areaCode");
                                var calleedevice = GetBodyItem(data, "calleeDevice");
                                var callerdevice = GetBodyItem(data, "callerDevice");
                                var taskid = GetBodyItem(data, "taskId");
                                var tasktype = GetBodyItem(data, "taskType");
                                var calldata = GetBodyItem(data, "callData");
                                this.EVENT_OtherRinging(compid, agentid, callid, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, calldata);
                            }
                            break;
                        case EVENTCLASS.EVENT_AgentRinging:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                var callid = GetBodyItem(data, "callId");
                                var calltype = GetBodyItem(data, "callType");
                                var compid = GetBodyItem(data, "compid");
                                var areacode = GetBodyItem(data, "areaCode");
                                var calleedevice = GetBodyItem(data, "calleeDevice");
                                var callerdevice = GetBodyItem(data, "callerDevice");
                                var taskid = GetBodyItem(data, "taskId");
                                var tasktype = GetBodyItem(data, "taskType");
                                var agentstate = GetBodyItem(data, "agentstate");
                                var laststate = GetBodyItem(data, "laststate");
                                var calldata = GetBodyItem(data, "callData");
                                this.EVENT_AgentRinging(compid, agentid, callid, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, agentstate, laststate, calldata);
                            }
                            break;
                        case EVENTCLASS.EVENT_HangupEvent:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                var callId = GetBodyItem(data, "callId");
                                var compid = GetBodyItem(data, "compid");
                                var calldata = GetBodyItem(data, "callData");
                                this.EVENT_HangupEvent(compid, agentid, callId, calldata);
                            }
                            break;
                        case EVENTCLASS.EVENT_ChannelStateChanged:
                            {
                                var channel = GetBodyItem(data, "channel");
                                var channelstate = GetBodyItem(data, "channelstate");
                                var pbxid = GetBodyItem(data, "pbxid");
                                var laststate = GetBodyItem(data, "laststate");
                                var floatdata = GetBodyItem(data, "floatdata");
                                var ext = GetBodyItem(data, "ext");
                                this.EVENT_ChannelStateChanged(channel, channelstate, pbxid, laststate, ext, floatdata);
                            }
                            break;
                        case EVENTCLASS.EVENT_AgentCallined:
                            {
                                var caller = GetBodyItem(data, "caller");
                                var callerchannel = GetBodyItem(data, "callerchannel");
                                var pbxid = GetBodyItem(data, "pbxid");
                                var fromqueue = GetBodyItem(data, "fromqueue");
                                var callid = GetBodyItem(data, "callid");
                                var agentid = GetBodyItem(data, "agentid");
                                var floatinfo = GetBodyItem(data, "floatinfo");
                                var context = GetBodyItem(data, "context");
                                var exten = GetBodyItem(data, "exten");
                                this.EVENT_AgentCallined(caller, pbxid, callerchannel, fromqueue, callid, agentid, context, exten, floatinfo);
                            }
                            break;
                        case EVENTCLASS.EVENT_MeEventHanpend:
                            {
                                var eventtype = GetBodyItem(data, "eventtype");
                                var me = GetBodyItem(data, "me");
                                var pbxid = GetBodyItem(data, "pbxid");
                                var member = GetBodyItem(data, "member");
                                var memidx = GetBodyItem(data, "memidx");
                                var activechannel = GetBodyItem(data, "activechannel");
                                var floatinfo = GetBodyItem(data, "floatinfo");
                                this.EVENT_MeEventHanpend(pbxid, eventtype, me, member, memidx, activechannel, floatinfo);
                            }
                            break;
                        case EVENTCLASS.EVENT_NewQueueEvent:
                            {
                                var queue = GetBodyItem(data, "queue");
                                var join = GetBodyItem(data, "join");
                                var joincaller = GetBodyItem(data, "joincaller");
                                var jcchannel = GetBodyItem(data, "jcchannel");
                                var callid = GetBodyItem(data, "callid");
                                var pbxid = GetBodyItem(data, "pbxid");
                                var floatinfo = GetBodyItem(data, "floatinfo");
                                this.EVENT_NewQueueEvent(queue, join, joincaller, jcchannel, callid, pbxid, floatinfo);
                            }
                            break;
                        case EVENTCLASS.EVENT_WXChatIn:
                            {
                                var agentid = GetBodyItem(data, "toagentid");
                                var content = GetBodyItem(data, "content");
                                var msgtype = GetBodyItem(data, "msgtype");
                                var fromwxuserid = GetBodyItem(data, "fromwxuserid");
                                var fromghid = GetBodyItem(data, "fromghid");


                                this.EVENT_WXChatIn(fromghid, fromwxuserid, agentid, content, msgtype);
                            }
                            break;
                        case EVENTCLASS.EVENT_TaskFinished:
                            {
                                var taskid = GetBodyItem(data, "taskid");
                                this.EVENT_TaskFinished(taskid);
                            }
                            break;

                        case EVENTCLASS.EVENT_TaskStart:
                            {
                                var taskid = GetBodyItem(data, "taskid");
                                var result = GetBodyItem(data, "result");
                                this.EVENT_TaskStart(taskid, result);
                            }
                            break;
                        case EVENTCLASS.EVENT_TaskStop:
                            {
                                var taskid = GetBodyItem(data, "taskid");
                                var result = GetBodyItem(data, "result");
                                this.EVENT_TaskStop(taskid, result);
                            }
                            break;
                        case EVENTCLASS.EVENT_TaskJoin:
                            {
                                var taskid = GetBodyItem(data, "taskid");
                                var result = GetBodyItem(data, "result");
                                var agentid = GetBodyItem(data, "agentid");
                                this.EVENT_TaskJoin(taskid, result, agentid);
                            }
                            break;
                        case EVENTCLASS.EVENT_TaskExit:
                            {
                                var taskid = GetBodyItem(data, "taskid");
                                var result = GetBodyItem(data, "result");
                                var agentid = GetBodyItem(data, "agentid");
                                this.EVENT_TaskExit(taskid, result, agentid);
                            }
                            break;
                        case EVENTCLASS.EVENT_ForceExit:
                            {
                                var agentid = GetBodyItem(data, "agentid");
                                this.EVENT_ForceExit(agentid);
                            }
                            break;
                        case EVENTCLASS.EVENT_JoinGroup:
                            {
                                var queueid = GetBodyItem(data, "queueid");
                                var sucagentid = GetBodyItem(data, "success_agentid");
                                var failagentid = GetBodyItem(data, "fail_agentid");
                                this.EVENT_JoinGroup(queueid, sucagentid, failagentid);
                            }
                            break;
                        case EVENTCLASS.EVENT_ExitGroup:
                            {
                                var queueid = GetBodyItem(data, "queueid");
                                var sucagentid = GetBodyItem(data, "success_agentid");
                                var failagentid = GetBodyItem(data, "fail_agentid");
                                this.EVENT_ExitGroup(queueid, sucagentid, failagentid);
                            }
                            break;
                    }
                }
                break;
            case MSGTYPE.CMD:
                break;
            case MSGTYPE.CMDRES:
                {
                    var rescode = GetBodyItem(data, "rescode");
                    var pbxrescode = GetBodyItem(data, "pbxrescode");
                    var res = GetBodyItem(data, "res");
                    var actionid = GetBodyItem(data, "actionid");
                    var taskid = GetBodyItem(data, "taskid");
                    var calldata = GetBodyItem(data, "callData");
                    if (actionid == MSGCLASS.CMD_AgentState) {
                        var agentstate = GetBodyItem(data, "agentstate");
                        this.SeatStatus = agentstate;
                    }
                    else {
                        this.EVENT_CMDRES(rescode, pbxrescode, res, actionid, taskid, calldata);
                    }
                }
                break;
        }
    }
}



///////////////////////////////////////////////////////////
///断开与CTI服务器的连接@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CtiDisconnect = function () {
    if (this.websocket != null) {
        if (this.websocket.isConnected()) {
            this.websocket.stopKeepAlive();
            this.websocket.close();
            this.IsConnect_CTI = 0;
            this.CTIDisConnectedEvent();
        }
    }
    else return this.JsonResult(-1);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///检查连接状态@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CheckWS = function () {
    if (this.websocket != null) {
        if (!this.websocket.isConnected()) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}
///////////////////////////////////////////////////////////
///检查连接状态@@@
///////////////////////////////////////////////////////////

ClassXnCtiClient.prototype.CheckWSS = function () {
    if (this.websocket != null) {
        if (!this.websocket.isConnected()) {
            return this.JsonResult(0);
        }
        return this.JsonResult(1);
    }
    else {
        return this.JsonResult(0);
    }
}

ClassXnCtiClient.prototype.JsonResult = function (code) {

    switch (code) {
        case 1:
            msg = "OK";
            break;
        case 0:
            msg = "Fail";
            break;
        case -1:
            msg = "websocket未连接";
            break;
        case -101:
            msg = "服务器IP地址不能为空";
            break;
        case -102:
            msg = "端口不能为空";
        case -103:
            msg = "CTI服务器已连接不可重复连接";
            break;
        case -201:
            msg = "登录工号不能为空";
            break;
        case -202:
            msg = "登录密码不能为空";
            break;
        case -203:
            msg = "分机号码不能为空";
            break;
        case -204:
            msg = "企业代码不能为空";
            break;
        case -301:
            msg = "座席不能为空";
            break;
        case -302:
            msg = "设备type不能为空";
            break;
        case -303:
            msg = "设备id不能为空";
            break;
        case -401:
            msg = "任务id不能为空";
            break;
        default:
            msg = "";
            break;

    }

    return "{\"code\":" + code + ",\"msg\":\"" + msg + "\"}";

}

ClassXnCtiClient.prototype.MsgHead = function (msgtype, msg, actionid) {
    var msghead = "MSGTYPE" + this.msgheadsplit + msgtype;
    msghead += this.msgheadend;
    msghead += "MSG" + this.msgheadsplit + msg;
    msghead += this.msgheadend;
    msghead += "MSGBODY" + this.msgheadsplit;
    msghead += "actionid";
    msghead += this.msgbodysplit;
    msghead += actionid;
    msghead += this.msgbodyend;

    return msghead;

}
ClassXnCtiClient.prototype.MsgBodyItem = function (key, value) {
    var msgbodyitem = key;

    msgbodyitem += this.msgbodysplit;
    msgbodyitem += value;
    msgbodyitem += this.msgbodyend;

    return msgbodyitem;

}
///////////////////////////////////////////////////////////
///座席登录@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.AgentLogin = function (UserID, UserPWD, UserExt, UserComp) {
    this.UserID = UserID;
    this.UserPWD = UserPWD;
    this.UserExt = UserExt;
    this.UserComp = UserComp;
    if (!this.CheckWS()) {
        return false;
    }
    if (this.UserID == null) {
        //alert('登录工号不能为空！');
        //return false;
        return this.JsonResult(-201);
    }
    if (this.UserPWD == null) {
        //alert('登录密码不能为空！');
        //return false;
        return this.JsonResult(-202);
    }
    if (this.UserExt == null) {
        //alert('分机号码不能为空！');
        //return false;
        return this.JsonResult(-203);
    }
    if (this.UserComp == null) {
        //alert('企业代码不能为空！');
        //return false;
        return this.JsonResult(-204);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Agentlogin, MSGCLASS.CMD_Agentlogin);
    cmd += this.MsgBodyItem("agentid", UserID);
    cmd += this.MsgBodyItem("agentpwd", UserPWD);
    cmd += this.MsgBodyItem("loginext", UserExt);
    cmd += this.MsgBodyItem("company", UserComp);
    cmd += this.msgend;

    this.send(cmd);
    return this.JsonResult(1);
}


///////////////////////////////////////////////////////////
///管理员登录
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.AdminLogin = function (company, username, userpwd) {
    if (!this.CheckWS()) {
        return false;
    }
    if (company == null) {
        alert('企业号不能为空！');
        return false;
    }
    if (username == null) {
        alert('用户名不能为空！');
        return false;
    }
    if (userpwd == null) {
        alert('登录密码不能为空！');
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Adminlogin, MSGCLASS.CMD_Adminlogin);
    cmd += this.MsgBodyItem("company", company);
    cmd += this.MsgBodyItem("username", username);
    cmd += this.MsgBodyItem("userpwd", userpwd);
    cmd += this.msgend;

    this.send(cmd);
}

///////////////////////////////////////////////////////////
///管理员退出@@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.AdminLogout = function (company, username) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Adminloginoff, MSGCLASS.CMD_Adminloginoff);
    cmd += this.MsgBodyItem("company", company);
    cmd += this.MsgBodyItem("username", username);
    cmd += this.msgend;
    this.send(cmd);
}


///////////////////////////////////////////////////////////
///座席退出@@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.AgentLogout = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Agentloginoff, MSGCLASS.CMD_Agentloginoff);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
///发起呼叫@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.MakeCall = function (deviceid, type, calldata) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (type == null || type == '') {
        return this.JsonResult(-302);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_MakeCall, MSGCLASS.CMD_MakeCall);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", type);
    cmd += this.MsgBodyItem("callData", calldata);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///保持，让对方听音乐@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.HoldCall = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Hold, MSGCLASS.CMD_Hold);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("ifhold", 1);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}


///////////////////////////////////////////////////////////
///恢复呼叫@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.RetriveCall = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Hold, MSGCLASS.CMD_Hold);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("ifhold", 0);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
///座席置忙/置闲 @@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.MakeBusy = function (ifbusy) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Makebusy, MSGCLASS.CMD_Makebusy);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("ifbusy", ifbusy);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
///挂断@@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.Hangup = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Hangup, MSGCLASS.CMD_Hangup);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", "");
    cmd += this.MsgBodyItem("type", 0);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///强拆@@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.ForceHangup = function (deviceid) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Hangup, MSGCLASS.CMD_Hangup);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", 1);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
//拦截@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.PickupCall = function (deviceid, type) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (type == null || type == '') {
        return this.JsonResult(-302);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_PickupCall, MSGCLASS.CMD_PickupCall);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", type);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
///强插@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.InsertCall = function (deviceid, type) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (type == null || type == '') {
        return this.JsonResult(-302);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Insert, MSGCLASS.CMD_Insert);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", type);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}


///////////////////////////////////////////////////////////
///监听@@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.ListenCall = function (deviceid, type) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (type == null || type == '') {
        return this.JsonResult(-302);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }

    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Monitor, MSGCLASS.CMD_Monitor);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", type);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}

///////////////////////////////////////////////////////////
///转接@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.Tran = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_TranCall, MSGCLASS.CMD_TranCall);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///会议@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.Meeting = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Meeting, MSGCLASS.CMD_Meeting);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///强复位@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.Reset = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_ReSet, MSGCLASS.CMD_ReSet);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///咨询@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.Refer = function (deviceid, type) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (type == null || type == '') {
        return this.JsonResult(-302);
    }
    if (deviceid == null || deviceid == '') {
        return this.JsonResult(-303);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_Refer, MSGCLASS.CMD_Refer);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("deviceid", deviceid);
    cmd += this.MsgBodyItem("type", type);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///查询座席状态@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.GetAgentState = function () {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_AgentState, MSGCLASS.CMD_AgentState);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);
}
///////////////////////////////////////////////////////////
///座席加入外呼任务@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.JoinTask = function (taskid) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (taskid == null || taskid == '') {
        return this.JsonResult(-401);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_JoinTask, MSGCLASS.CMD_JoinTask);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("taskid", taskid);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);

}
///////////////////////////////////////////////////////////
///座席退出外呼任务@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.ExitTask = function (taskid) {
    if (!this.CheckWS()) {
        return this.JsonResult(-1);
    }
    if (this.UserID == null) {
        return this.JsonResult(-301);
    }
    if (taskid == null || taskid == '') {
        return this.JsonResult(-401);
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_ExitTask, MSGCLASS.CMD_ExitTask);
    cmd += this.MsgBodyItem("agentid", this.UserID);
    cmd += this.MsgBodyItem("taskid", taskid);
    cmd += this.msgend;
    this.send(cmd);
    return this.JsonResult(1);

}
///////////////////////////////////////////////////////////
///开启外呼任务@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.StartTask = function (username, taskid) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_StartTask, MSGCLASS.CMD_StartTask);
    cmd += this.MsgBodyItem("username", username);
    cmd += this.MsgBodyItem("taskid", taskid);
    cmd += this.msgend;
    this.send(cmd);

}
///////////////////////////////////////////////////////////
///停止外呼任务@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.StopTask = function (username, taskid) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_StopTask, MSGCLASS.CMD_StopTask);
    cmd += this.MsgBodyItem("username", username);
    cmd += this.MsgBodyItem("taskid", taskid);
    cmd += this.msgend;
    this.send(cmd);

}

///////////////////////////////////////////////////////////
///运营管理员定制要显示状态的座席@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.ShowAgentIds = function (company, agentids) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_ShowAgentIds, MSGCLASS.CMD_ShowAgentIds);
    cmd += this.MsgBodyItem("company", company);
    cmd += this.MsgBodyItem("agentids", agentids);
    cmd += this.msgend;
    this.send(cmd);

}

///////////////////////////////////////////////////////////
///运营管理员取消定制座席@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.NoShowAgentIds = function (company, agentids) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_NoShowAgentIds, MSGCLASS.CMD_NoShowAgentIds);
    cmd += this.MsgBodyItem("company", company);
    cmd += this.MsgBodyItem("agentids", agentids);
    cmd += this.msgend;
    this.send(cmd);
}

///////////////////////////////////////////////////////////
///强退座席退出登录@@@
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.ForceExit = function (company, agentids) {
    if (!this.CheckWS()) {
        return false;
    }
    var cmd = this.MsgHead(MSGTYPE.CMD, MSGCLASS.CMD_ForceExit, MSGCLASS.CMD_ForceExit);
    cmd += this.MsgBodyItem("company", company);
    cmd += this.MsgBodyItem("agentids", agentids);
    cmd += this.msgend;
    this.send(cmd);

}

///////////////////////////////////////////////////////////
///CTI 连接成功
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CTIConnectedEvent = function () {

}

///////////////////////////////////////////////////////////
/// CTI 断开成功
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.CTIDisConnectedEvent = function () {

}
///////////////////////////////////////////////////////////
///注册事件：座席状态 变化 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_AgentStateChanged = function (agentid, agentstate, laststate, compid) {
}

///////////////////////////////////////////////////////////
///注册事件：座席通话或录音通知事件 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_AgentAnswered = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, filename, calldata) {
}

///////////////////////////////////////////////////////////
///注册事件：对方振铃通知事件 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_OtherRinging = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, calldata) {
}

///////////////////////////////////////////////////////////
///注册事件：座席振铃通知事件 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_AgentRinging = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, agentstate, laststate, calldata) {
}
///////////////////////////////////////////////////////////
///注册事件：挂断通知事件 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_HangupEvent = function (compid, agentid, callId, calldata) {

}

///////////////////////////////////////////////////////////
///注册事件：操作结果事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_CMDRES = function (rescode, pbxrescode, res, actionid, taskid, calldata) {

}
///////////////////////////////////////////////////////////
///注册事件：外呼任务完成通知事件 
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_TaskFinished = function (taskid) {

}
///////////////////////////////////////////////////////////
///注册事件：开启外呼任务结果通知事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_TaskStart = function (taskid, result) {

}
///////////////////////////////////////////////////////////
///注册事件：停止外呼任务结果通知事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_TaskStop = function (taskid, result) {

}
///////////////////////////////////////////////////////////
///注册事件：座席加入外呼任务结果通知事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_TaskJoin = function (taskid, result, agentid) {

}
///////////////////////////////////////////////////////////
///注册事件：座席退出外呼任务结果通知事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_TaskExit = function (taskid, result, agentid) {

}
///////////////////////////////////////////////////////////
///注册事件：强制座席退出通知事件
///////////////////////////////////////////////////////////
ClassXnCtiClient.prototype.EVENT_ForceExit = function (agentid) {

}


















