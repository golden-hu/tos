/*//系统登录
Fos.LoginWin = function(){
	var txtLoginName = new Ext.form.TextField({fieldLabel:C_USER_NAME,
		id:'userLoginName',anchor:'95%',enableKeyEvents:true,
		listeners:{
			scope:this,
			keydown:{fn:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPassword.focus();
				}
			},
			blur:{fn:function(){txtPassword.focus();}}
		}}
	});
	var txtPassword = new Ext.form.TextField({fieldLabel:C_PASSWORD,id:'userPassword',
		inputType:'password',anchor:'95%',enableKeyEvents:true,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){this.login();}}
		}}
	});
	
	this.frm = new Ext.form.FormPanel({labelWidth:60,padding:5,items:[
		txtLoginName,txtPassword]});
	
	this.login=function(){
		var n=this.frm.findById('userLoginName');
		var p=this.frm.findById('userPassword');
		if(!n.getValue()){
			XMG.alert(SYS,C_USER_NAME+C_NOTNULL,function(){n.focus();},this);return;};
		if(!p.getValue()){
			XMG.alert(SYS,C_PASSWORD+C_NOTNULL,function(){p.focus();},this);return;};
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'LOGIN',_mt:'json',userLoginName:n.getValue(),userPassword:p.getValue()},scope:this,
    		success:function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			if(res.code!="fw.success") alert(res.msg);
    			else{
    				sessionStorage.setItem("USER_PERM",res.PUser.funcCode);
        			sessionStorage.setItem("USER_ID",res.PUser.id);
        			sessionStorage.setItem("USER_NAME",res.PUser.userName);
        			sessionStorage.setItem("USER_IS_OPERATOR",res.PUser.userOperatorFlag);
        			sessionStorage.setItem("USER_IS_SALES",res.PUser.userSalesFlag);
        			sessionStorage.setItem("USER_ALL_VIEW_FLAG",res.PUser.userAllViewFlag);
        			sessionStorage.setItem("USER_PASS_CHANGE_DATE",res.PUser.userPasswordModifyDate);
        			sessionStorage.setItem("ROLE_ID",res.PUser.roleId);
        			sessionStorage.setItem("COMP_CODE",res.PUser.compCode);
        			this.close();
        			MyDesktop.initApp();
        			iniShortcuts();
    			}
    		},
    		failure:function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			alert(res.msg);
    		}
		});
	};
	//登陆框
    Fos.LoginWin.superclass.constructor.call(this, {title:C_LOGIN,modal:true,width:250,closable:false,
        height:132,plain:false,buttonAlign:'right',items:this.frm,layout:'fit',
        buttons:[{text:C_LOGON,scope:this,handler:this.login}]
	});
};
Ext.extend(Fos.LoginWin,Ext.Window);*/

//系统登录
Fos.LoginWin = function(){
	var txtLoginName = new Ext.form.TextField({fieldLabel:C_USER_NAME,
		id:'userLoginName',enableKeyEvents:true,
		width:200,x:310,y:220,
		listeners:{
			scope:this,
			keydown:{fn:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPassword.focus();
				}
			},
			blur:{fn:function(){txtPassword.focus();}}
		}}
	});
	var txtPassword = new Ext.form.TextField({fieldLabel:C_PASSWORD,id:'userPassword',
		inputType:'password',enableKeyEvents:true,
		width:200,x:310,y:255,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){this.login();}}
		}}
	});
	
	this.frm = new Ext.form.FormPanel({labelWidth:60,padding:5,items:[
		txtLoginName,txtPassword]});
	
	this.login=function(){
		if(!txtLoginName.getValue()){
			XMG.alert(SYS,C_USER_NAME+C_NOTNULL,function(){txtLoginName.focus();},this);return;};
		if(!txtPassword.getValue()){
			XMG.alert(SYS,C_PASSWORD+C_NOTNULL,function(){txtPassword.focus();},this);return;};
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'LOGIN',_mt:'json',
			userLoginName:txtLoginName.getValue(),userPassword:txtPassword.getValue()},
    		success:function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			if(res.code!="fw.success") alert(res.msg);
    			else{
    				sessionStorage.setItem("USER_PERM",res.PUser.funcCode);
        			sessionStorage.setItem("USER_ID",res.PUser.id);
        			sessionStorage.setItem("USER_NAME",res.PUser.userName);
        			sessionStorage.setItem("USER_IS_OPERATOR",res.PUser.userOperatorFlag);
        			sessionStorage.setItem("USER_IS_SALES",res.PUser.userSalesFlag);
        			sessionStorage.setItem("USER_ALL_VIEW_FLAG",res.PUser.userAllViewFlag);
        			sessionStorage.setItem("USER_PASS_CHANGE_DATE",res.PUser.userPasswordModifyDate);
        			sessionStorage.setItem("ROLE_ID",res.PUser.roleId);
        			sessionStorage.setItem("COMP_CODE",res.PUser.compCode);
        			sessionStorage.setItem("USER_TYPE_FLAG",res.PUser.userTypeFlag);
        			sessionStorage.setItem("CUST_NAME_CN",res.PUser.custNameCn);
        			this.close();
        			MyDesktop.initApp();
        			iniShortcuts();
    			}
    		},
    		failure:function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			alert(res.msg);
    		}
		});
	};
	var btLogin = new Ext.Button({text:C_LOGON,scope:this,width:80,x:350,y:290,
		handler:this.login});
    Fos.LoginWin.superclass.constructor.call(this, {title:'',modal:true,closable:false,
        width:737,height:394,plain:false,buttonAlign:'right',layout:'absolute',
        bodyStyle:'background-image:url(/TMS/images/login_bg.png);',
        items:[txtLoginName,txtPassword,btLogin],
        defaultButton:btLogin
	});
};
Ext.extend(Fos.LoginWin,Ext.Window);