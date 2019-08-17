
import { aa} from "@/service/getData";
import fetch from '@/libs/fetch';
import qs from 'qs';
let jsonp = require('jsonp');

function param(data){
  let url='';
  for(let key in data){
    let item =data[key]!==undefined ? data[key] : '';
    url+=`&${key}=${encodeURIComponent(item)}`
  }
  return url ? url:'';
}

// let obj = {compid: '830058', agentid: '9999', telephone: '8300589999', telephonePassword: '00c351677029d3840898d241bc542fb9', wstype: 'ws', serverid: '', password: 'aa123456'};
/**
 * 登录
 */
let obj;
export const init = () => {
  // 判断是否有讯众的init参数
  if (!sessionStorage.getItem('XZ_INIT_DATA')) {
    return;
  } else {
    obj = JSON.parse(sessionStorage.getItem('XZ_INIT_DATA'));
  };
  let actionArray = ['getCtiServer', 'getRegServer']
  actionArray.forEach(item=>{
    let data = {action: item, ...obj}
    let url = 'http://api.salescomm.net:8200/Handler/agent.ashx'
    url+=(url.indexOf('?')<0 ? '?' : '&' )+ param(data);
    jsonp(url, {param: 'callbackparam'}, (err, res) => {
      if (!err) {
        let dataRes = res.data
        if(item === 'getCtiServer'){
          cti_server = dataRes.domain;
          cti_port = dataRes.port;
          cti_serverid = dataRes.serverid;
          cti.CtiConnect(dataRes.domain, dataRes.port);
          initStatus()
        } else {
          sip_server = dataRes.domain;
          sip_port = dataRes.port;
          sip_serverid = dataRes.serverid;
        }
      } else {
      }
    })
  })
  cti.CTIConnectedEvent = function () {//cti服务器连接成功事件
    cti.AgentLogin(obj.agentid, obj.telephonePassword, obj.telephone, obj.compid)
    console.log(sip_server, sip_port)
    sip_client.ConnentSocket(obj.telephone, obj.password, sip_server, sip_port);//连接sip软电话
    cti.CheckWSS ()
    console.log(cti.CheckWSS ())
  }
  sip_client.sipPhoneConnectedEvent=function(){
    console.log("## sip ConnectedEvent");
    if (sip_server===''&&sip_port==='') {
      console.log("## 获取注册服务器失败，重新签入");
      cti.AgentLogout();
      cti.CtiDisconnect();//断开cti连接
    }
    sip_client.loginMessage(obj.telephone, obj.password, sip_server + ':' + sip_port);
  }
  sip_client.extLoginEvent=function(extlogin){
    if (extlogin===0) {
      console.log("## 分机注册失败");
      cti.AgentLogout();
      cti.CtiDisconnect();//断开cti连接
    }
  }
}

//签出
export const loginOut = () => {
  cti.AgentLogout();
  cti.CtiDisconnect();//断开cti连接
  sip_client.logoutMessage(obj.telephone);//sip分机退出
}

//呼出
export const callOut = (phoneNumber) => {
  showmsg("【呼出】============================================================");
  showmsg("调用MakeCall()进行呼出。呼出请求发出后会进行EVENT_AgentStateChanged事件通知");
  console.log(Date.parse(new Date())+   '呼出')

  cti.MakeCall(phoneNumber, 3, '');
  handcall=1;//主动外呼
}


//接回
export const retriveCall = () => {
  showmsg("【接回】============================================================");
  showmsg("调用RetriveCall()执行接回(取消保持)。接回成功后会进行EVENT_AgentStateChanged事件通知");
  cti.RetriveCall();
  showmsg("=================================================================");
}

//挂断
export const hangUp = () => {
  console.log("【挂断】============================================================");
  console.log("调用Hangup()进行挂断电话。挂断成功后会进行EVENT_AgentStateChanged事件通知");
  return cti.Hangup();
}


//置忙
export const makeBusy = () => {
  console.log("【置忙】============================================================");
  console.log("调用MakeBusy(1)进行置忙。置忙成功后会进行EVENT_AgentStateChanged事件通知");
  cti.MakeBusy(1);
}
//置闲
export const makeIdle = () => {
  console.log("【置忙】============================================================");
  console.log("调用MakeBusy(0)进行置忙。置闲成功后会进行EVENT_AgentStateChanged事件通知");
  cti.MakeBusy(0);
}

//保持
export const holdCall = () => {
  console.log("【保持】============================================================");
  console.log("调用HoldCall()执行保持(对方听音乐)。保持成功后会进行EVENT_AgentStateChanged事件通知");
  cti.HoldCall();
  console.log("=================================================================");
}

//咨询
export const refer = (phoneNumber) => {
  console.log("【咨询】============================================================");
  console.log("调用Refer()进行咨询。咨询成功后会进行EVENT_AgentStateChanged事件通知");
  cti.Refer(phoneNumber, 3);
}

//转移
export const tran = () => {
  console.log("【转移】============================================================");
  console.log("调用Tran()进行转移。 转移成功后会进行EVENT_AgentStateChanged事件通知");
  cti.Tran();
}


//会议
export const meeting = () => {
  console.log("【会议】============================================================");
  console.log("调用Meeting()进行三方会议。 会议成功后会进行EVENT_AgentStateChanged事件通知");
  cti.Meeting();
}


//强复位
export const reset = () => {
  console.log("【强复位】============================================================");
  console.log("调用Reset()进行强复位。强复位成功后会进行EVENT_AgentStateChanged事件通知");
  cti.Reset();
}


//强插
export const insertCall = (opagentid) => {
  console.log("【强插】============================================================");
  console.log("调用InsertCall()进行强插。");
  cti.InsertCall(opagentid, 1);
}

//强拆
export const forceHangup = (opagentid) => {
  console.log("【强拆】============================================================");
  console.log("ForceHangup()进行强拆。");
  cti.ForceHangup(opagentid, 1);
}

//监听
export const listenCall = (opagentid) => {
  console.log("【监听】============================================================");
  console.log("调用ListenCall()进行监听。");
  cti.ListenCall(opagentid, 1);
}


//拦截
export const pickupCall = (opagentid) => {
  console.log("【拦截】============================================================");
  console.log("PickupCall()进行拦截。");
  cti.PickupCall(opagentid, 1);
}


//获取座席状态
export const getAgentState = (opagentid) => {
  console.log("【获取座席状态】============================================================");
  console.log("调用GetAgentState()获取座席状态。");
  cti.GetAgentState();
}


//获取座席状态
export const checkWS = (opagentid) => {
  console.log("【检测cti连接状态】============================================================");
  console.log("调用CheckWSS()检测cti连接状态。");
  console.log('cti连接state：' + cti.CheckWS());
}

//获取座席状态
export const answerMessage = (opagentid) => {
  console.log("【应答】============================================================");
  sip_client.answerMessage(obj.telephone,sip_client.sip_callid);//手动应答

}

export const  initStatus =() => {

  ///////////////////////////////////////////////////////////
  ///注册事件：座席状态 变化
  ///////////////////////////////////////////////////////////
  cti.EVENT_AgentStateChanged = function (_agentid, agentstate, laststate, _compid) {
    showmsg("## EVENT_AgentStateChanged: " + "agentid= " + _agentid + ", agentstate = " + agentstate + ", laststate = " + laststate + ", compid = " + _compid);
    if (_agentid === agentid) {//过滤当前座席的状态
      switch (agentstate) {
        case "0": //退出
        {
          console.log('退出')
        }
          break;
        case "1": //空闲
        {
          console.log('退出')
        }
          break;
        case "2": //示忙
        {
          console.log('示忙')
        }
          break;
        case "4": //后处理
        {
          console.log('后处理')
        }
          break;
        case "7": //振铃
        case "5": {
          if (handcall===1) {//主动外呼
            sip_client.answerMessage(obj.telephone, sip_client.sip_callid);
          }else{
            console.log('## 呼入操作')
          }
        }
          break;
        case "8": //通话成功
        {
          console.log('## 通话成功')
        }
          break;
        case "9": //三方会议
        {
          console.log('## 三方会议')
        }
          break;
        case "11": //咨询状态
        {
          console.log('咨询')
        }
          break;
        case "12": //咨询挂断
        {
          console.log('挂断')
        }
          break;
        case "13": //保持
        {
          console.log('保持')
        }
          break;
        case "15": //初始化
        {
        }
          break;
      }
    }

  }
  ///注册事件：操作结果事件
  cti.EVENT_CMDRES = function (rescode, pbxrescode, res, actionid, taskid, calldata) {
    console.log("@ 操作结果EVENT_CMDRES事件通知。");
    console.log("## EVENT_CMDRES:rescode=" + rescode + ",pbxrescode=" + pbxrescode + ",res=" + res + ",actionid=" +         actionid + ",taskid=" + taskid + ",calldata=" + calldata);
  }
  ///注册事件：座席通话或录音通知事件
  ///////////////////////////////////////////////////////////
  cti.EVENT_AgentAnswered = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, filename, calldata) {
    console.log("@ 座席成功通话或有录音进行EVENT_AgentAnswered通知。");
    console.log("## EVENT_AgentAnswered:compid=" + compid + ",agentid=" + agentid + ",callId=" + callId + ",calltype=" + calltype + ",calleedevice=" + calleedevice + ",callerdevice=" + callerdevice + ",areacode=" + areacode + ",taskid=" + taskid + ",tasktype=" + tasktype + ",filename=" + filename + ",calldata=" + calldata);
  }


  ///注册事件：座席振铃通知事件
  ///////////////////////////////////////////////////////////
  cti.EVENT_AgentRinging = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, agentstate, laststate, calldata) {
    console.log("@ 座席振铃进行EVENT_AgentRinging通知。可在此事件中处理弹屏相关操作。");
    //可在此进行弹屏处理
    console.log("## EVENT_AgentRinging:compid=" + compid + ",agentid=" + agentid + ",callId=" + callId + ",calltype=" + calltype + ",calleedevice=" + calleedevice + ",callerdevice=" + callerdevice + ",areacode=" + areacode + ",taskid=" + taskid + ",tasktype=" + tasktype + ",agentstate=" + agentstate + ",laststate=" + laststate + ",calldata=" + calldata);
  }


  ///注册事件：对方振铃通知事件
  ///////////////////////////////////////////////////////////
  cti.EVENT_OtherRinging = function (compid, agentid, callId, calltype, calleedevice, callerdevice, areacode, taskid, tasktype, calldata) {
    console.log(Date.parse(new Date())+ '对方振铃')
    console.log("@ 对方振铃进行EVENT_OtherRinging通知。可在此事件中处理弹屏相关操作。");
    console.log("## EVENT_OtherRinging:compid=" + compid + ",agentid=" + agentid + ",callId=" + callId + ",calltype=" + calltype + ",calleedevice=" + calleedevice + ",callerdevice=" + callerdevice + ",areacode=" + areacode + ",taskid=" + taskid + ",tasktype=" + tasktype + ",calldata=" + calldata);
    //可在此进行弹屏处理
//            window.open("Popup.htm?caller=" + calleedevice, "_blank", "left = 200,top=200,width = 500,height = 350,scrollbars=yes,toolbar=yes,menubar=yes,location=yes,resizable=no,status=yes");
  }

  ///注册事件：挂断通知事件
  ///////////////////////////////////////////////////////////
  cti.EVENT_HangupEvent = function (compid, agentid, callId, calldata) {
    console.log("@ 挂断进行EVENT_HangupEvent通知。");
    let data = {compid: '830058', dates: '2019-08', callid: callId, anytype: '1'}
    // fetch({
    //   url: '/api/callcenter/GetSingleCdrAnyCallRecord',
    //   method: 'POST',
    //   data: data,
    // });
    handcall=0;
    console.log("## EVENT_HangupEvent:compid=" + compid + ",agentid=" + agentid + ",callId=" + callId + ",calldata=" + calldata);
  }
}
