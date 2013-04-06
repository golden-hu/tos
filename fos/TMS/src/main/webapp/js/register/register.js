//TMS帐号注册
HT.Register = function() {
	var txtCompNameCn=new Ext.form.TextField({
		fieldLabel:'公司名称',allowBlank:false,name:'compNameCn',itemCls:'required',width:195
	});
	var txtCompContact=new Ext.form.TextField({
		fieldLabel:'联&nbsp;系&nbsp;&nbsp;人',allowBlank:false,name:'compContact',itemCls:'required',width:195
	});
	var txtCompTel=new Ext.form.TextField({
		fieldLabel:'联系电话',allowBlank:false,name:'compTel',itemCls:'required',width:195
	});
	var txtCompEmail=new Ext.form.TextField({
		fieldLabel:'E-mail',name:'compEmail',width:195
	});
	var txtCompContMsn=new Ext.form.TextField({
		fieldLabel:'MSN',name:'compContMsn',width:195
	});
	var txtCompContQq=new Ext.form.NumberField({
		fieldLabel:'QQ',name:'compContQq',width:195
	});
	var txtCompMyCode=new Ext.form.TextField({
		fieldLabel:'公司代码',allowBlank:false,name:'compMyCode',itemCls:'required',width:195
	});
	var txtCompLoginUser=new Ext.form.TextField({
		fieldLabel:'登&nbsp;录&nbsp;&nbsp;名',allowBlank:false,
		name:'compLoginUser',itemCls:'required',width:195
	});
	var txtCompLoginPsw=new Ext.form.TextField({
		fieldLabel:'登录密码',name:'compLoginPsw',allowBlank:false,inputType:'password',itemCls:'required',width:195
	});
	
	var frm = new Ext.form.FormPanel({
        frame:true,
        items:[
         {title:'注册基本信息',xtype:'fieldset',checkboxToggle:false,width:580,layout:'column',items:[
           {layout:'form',columnWidth:.6,border:false,labelWidth:80,items:[txtCompLoginUser]},
           {layout:'form',columnWidth:.4,border:false,items:[{xtype:'label',text:'系统登录名,支持英文、数字'}]},
           {layout:'form',columnWidth:1,border:false,labelWidth:80,items:[txtCompLoginPsw]},
           {layout:'form',columnWidth:1,border:false,labelWidth:80,items:[txtCompNameCn]},
           {layout:'form',columnWidth:.6,border:false,labelWidth:80,items:[txtCompMyCode]},
           {layout:'form',columnWidth:.4,border:false,items:[{xtype:'label',text:'公司名称的首字母缩写'}]},
           {layout:'form',columnWidth:1,border:false,labelWidth:80,items:[txtCompContact]},
           {layout:'form',columnWidth:.6,border:false,labelWidth:80,items:[txtCompTel]},
           {layout:'form',columnWidth:.4,border:false,items:[{xtype:'label',text:'手机或固话,固话请加区号'}]}
         ]},
         {title:'其他信息--请正确填写以便客服联系沟通',xtype:'fieldset',checkboxToggle:false,width:580,layout:'column',items:[
           {layout:'form',columnWidth:1,border:false,labelWidth:80,items:[txtCompEmail,txtCompContMsn,txtCompContQq]}
         ]}]
	});
	this.save = function() {
		if(!HTUtil.checkFieldNotNull('登录名',txtCompLoginUser))
			return;
		if(!HTUtil.checkFieldNotNull('登录密码',txtCompLoginPsw))
			return;
		if(!HTUtil.checkFieldNotNull('公司名称',txtCompNameCn))
			return;
		if(!HTUtil.checkFieldNotNull('公司代码',txtCompMyCode))
			return;
		if(!HTUtil.checkFieldNotNull('联系人',txtCompContact))
			return;
		if(!HTUtil.checkFieldNotNull('联系电话',txtCompTel))
			return;
	 	
	 	var p = new PCompany({uuid:HTUtil.UUID(32),rowAction:'N'});
	 	HTUtil.saveToRecord(frm,p);									//将一个容器内的字段的值更新到一条record对象中
	 	var xml = HTUtil.RTX(p,'PCompany',PCompany);
	 	Ext.Ajax.request({scope:this,
	 		url:SERVICE_URL,
	 		method:'POST',
	 		params:{_A:'JOIN_TMS'},
			success: function(r){
				//var c = HTUtil.XTR(r.responseXML,'PCompany',PCompany);
				//HTUtil.RU(c, p, PCompany);
				Ext.Msg.alert(SYS,C_REGISTER_SUCCESS);
				location.href=URL_TMS+'/tms.html';
			},
			failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
			xmlData:HTUtil.HTX(xml)});
	};
	HT.Register.superclass.constructor.call(this, {
		width:610,height:430,layout:'fit',
		title:'运输管理软件用户注册', 
		resizable:false,
		closable:false,
		items:[frm],
		buttons:[{xtype:'button',text:'注册',width:90,bodyStyle:'padding:20px',handler:this.save},
		         {xtype:'button',text:'退出',width:90,handler:function(){location.href=URL_TMS+'/tms.html';}}]
	});
};
Ext.extend(HT.Register, Ext.Window);

Ext.onReady(function(){
	//(new HT.Register()).show();
	var win = new HT.Register();
	win.show();
});