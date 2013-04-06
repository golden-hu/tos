//短信通知
Fos.SMSWin = function(mobile,content,consId,consNo,bizType,consNoHandler){
	var txtMobile = new Ext.form.TextField({
		fieldLabel:'手机号码',tabIndex:1,ref:'mobile',itemCls:'required',
		name:'mobile',value:mobile,xtype:'textfield',anchor:'95%'
	});
	var txtContent = new Ext.form.TextArea({
		fieldLabel:'通知内容',tabIndex:2,ref:'content',itemCls:'required',
		name:'content',value:content,xtype:'textarea',anchor:'95%'
	});
	var frm = new Ext.form.FormPanel({labelWidth:70,frame:false,padding:5,labelAlign:'right',items:[
			txtMobile,txtContent
	    ]});
	this.save = function(){
		if(!txtMobile.getValue()){
			Ext.Msg.alert(SYS,'填写手机号码',function(){txtMobile.focus();},this);
			return;
		};
		if(!txtContent.getValue()){
			Ext.Msg.alert(SYS,'填写通知内容',function(){txtContent.focus();},this);return;};
		var mobile=txtMobile.getValue();
		var content=txtContent.getValue();
		HTUtil.POST_SMS('SMS_S',smsUrl,smsUser,smsPassword,smsKey,mobile,content,consId,consNo,bizType,consNoHandler);
		this.close();
	};
	
	Fos.SMSWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:'短信通知',layout:'fit',
		width:400,height:170,modal:true,
	  	items:[frm],
	  	buttons:[{text:'发送',iconCls:'ok',disabled:true,scope:this,handler:this.save},
	  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.SMSWin, Ext.Window);