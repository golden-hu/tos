
//TMS系统控制台登录
HT.LoginWindow=function(){
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
	
	this.formPanel = new Ext.form.FormPanel({labelWidth:60,height:70,padding:5,
		items:[txtLoginName,txtPassword]
	});
	this.login=function(){
		/*var n=this.formPanel.findById('userLoginName').getValue();
		var p=this.formPanel.findById('userPassword').getValue();*/
		if(!txtLoginName.getValue()){
			XMG.alert(SYS,C_USER_NAME+C_NOTNULL,function(){txtLoginName.focus();},this);return;};
		if(!txtPassword.getValue()){
			XMG.alert(SYS,C_PASSWORD+C_NOTNULL,function(){txtPassword.focus();},this);return;};
		var n=txtLoginName.getValue();
		var p=txtPassword.getValue();
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'CONSOLE_LG',_mt:'json',userLoginName:n,userPassword:p},scope:this,
    		success:function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			if(res.code!="fw.success") alert(res.msg);
    			else{
        			sessionStorage.setItem('ADMIN_ID',1);
        			this.close();
        			(new HT.ConsoleWindow()).show();
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
	HT.LoginWindow.superclass.constructor.call(this,{title:'',modal:true,
		width:737,height:394,closable:false,plain:false,buttonAlign:'right',layout:'absolute',
	    bodyStyle:'background-image:url(/TMS/images/login_bg-2.png);',
		items:[txtLoginName,txtPassword,btLogin],
		defaultButton:btLogin
	});
};
Ext.extend(HT.LoginWindow, Ext.Window);

//帐户有效日期设置
EndDateWindow = function(p) {
	this.formPanel = new Ext.form.FormPanel({
		labelWidth:90,
		height:70,
		bodyStyle:'padding:5px',
		items:[
		   {fieldLabel:'有效结束日期',id:'compEndDate',
		   name:'compEndDate',value:(new Date()),
		   itemCls:'required',
		   ref:'../refuelDate',
		   xtype:'datefield',
		   format:DATEF,anchor:'95%'}
		]
	});
	
	this.okClick = function() {
		p.beginEdit();
		this.formPanel.getForm().updateRecord(p);
		
		if(Ext.isEmpty(p.get('compEndDate'))){
			Ext.Msg.alert(SYS,C_REFUEL_DATE_REQUIRED,function(){this.formPanel.expeDate.focus();},this);
			return;
		}
		
		p.endEdit();
		
		var xml = HTUtil.RTX(p,'PCompany',PCompany);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONSOLE_DT'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'PCompany',PCompany);
			HTUtil.RU(c, p, PCompany);
			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	this.cancelClick = function() {
		this.close();
	};
	
	EndDateWindow.superclass.constructor.call(this, 
			{title: ('帐户\''+p.get('compLoginUser')+'\'有效日期设置'),
				modal:true,
				width:260,
				height:135,
				closable:false,
				plain:false,
				bodyStyle:'padding:0px;',
				buttonAlign:'right',
				items:this.formPanel,
				buttons:[
				   {text:"确定",scope:this,handler:this.okClick},
				   {text:"取消",scope:this,handler:this.cancelClick}
				]
			});
};
Ext.extend(EndDateWindow, Ext.Window);

//Hi-TMS 软件管理控制台
HT.ConsoleWindow=function(){
	var bp={_A:'CONSOLE_Q',_mt:'json'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompany',id:'id'},PCompany),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS100}});
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS100}});
	};
	var cb = new Ext.form.ComboBox({
		  id:'comboCata',
		  store:new Ext.data.SimpleStore({ 
			  fields: ['key', 'value'], 
			  data : [['0','(全部)'],['1','未激活'],['2','已激活'],['-1','已停用']] 
		  }),
		  displayField:'value',
		  typeAhead:true,
		  mode: 'local',
		  forceSelection:true,
		  triggerAction:'all',
		  emptyText:'(全部)',
		  selectOnFocus:true,
		  width:80
	});
	
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.search();
			}
		}
	});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	new Ext.grid.RowNumberer(),sm,
		{header:'状态',width:70,dataIndex:'compActive', sortable:false,
	    	renderer:function(v,m,r){
	    		if(v==0){
	    			return '未激活';
	    		}else if(v==1){
	    			m.css='green-b';
	    			return '已激活';
	    		}else if(v==-1){
	    			m.css='red-b';
	    			return '已停用';
	    		}
	    	}
	    },
		{header:'登录名',dataIndex:'compLoginUser'},
		{header:'公司代码',dataIndex:'compMyCode'},	            
	    {header:'公司名称',dataIndex:'compNameCn',width:120},
	    {header:'联系人',dataIndex:'compContact'},
	    {header:'联系电话',width:120,dataIndex:'compTel'},
	    {header:'MSN',dataIndex:'compContMsn'},
	    {header:'QQ',dataIndex:'compContQq'},
	    {header:'用户数',width:60,dataIndex:'compLicenseNumber',align:'center',
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return v;
	    	}
	    },
	    {header:'注册时间',width:150,dataIndex:'createTime',renderer:formatDateTime},
	    {header:'开始日期',width:120,dataIndex:'compStartDate',renderer:formatDate},
	    {header:'结束日期',width:120,dataIndex:'compEndDate',renderer:formatDate}
	],defaults:{sortable:false,width:100}});
	
	this.search = function() {
		var cm=kw.getValue();
		if(!cm){
			XMG.alert(SYS,'请输入公司名称',function(b){kw.focus();});
			return;
		}
		var a=[];
		var cata = Ext.get('comboCata').dom.value;
		if (cata=='未激活') 
			a[a.length]={key:'compActive',value:0,op:EQ};
		else if (cata=='已激活') 
			a[a.length]={key:'compActive',value:1,op:EQ};
		else if (cata=='已停用') 
			a[a.length]={key:'compActive',value:-1,op:EQ};
			
		a[a.length]={key:'compNameCn',value:cm,op:LI};
		
		store.baseParams={_A:'CONSOLE_X',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
 		store.reload({params:{start:0,limit:C_PS100},
 			callback:function(r){
 				if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	//激活
	this.active=function(){
		var p=sm.getSelected();
		if (!p) {
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
			return;
		}
		if (p.get("compActive") != 0) {
			XMG.alert(SYS,'该用户已激活!');
			return;
		}
		Ext.Msg.confirm(SYS,'您确定激活该用户吗？',function(btn){
				if(btn == 'yes') {
					var xml = HTUtil.RTX(p,'PCompany',PCompany);
				 	Ext.Ajax.request({scope:this,
				 	url:SERVICE_URL,
				 	method:'POST',
				 	params:{_A:'CONSOLE_AU'},
					success: function(r){
						var c = HTUtil.XTR(r.responseXML,'PCompany',PCompany);
						HTUtil.RU(c, p, PCompany);
						Ext.Msg.alert(SYS,M_S);
					},
					failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
					xmlData:HTUtil.HTX(xml)});
				}
			});
	};
	//付款
	this.pay=function(){
		var p =sm.getSelected();
		if (!p) {
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
			return;
		}
		if (p.get("compActive") == 0) {
			alert("请您先激活该用户!");
			return;
		}
		(new EndDateWindow(p)).show();
	};
	var logout={text:'安全退出',iconCls:'key',scope:this,
				handler:function(){
					Ext.Msg.confirm(SYS,M_EXIT_CONFIRM,function(btn){
						if(btn=='yes') {
							Ext.Ajax.request({url:SERVICE_URL,
        						params:{_A:'MANAGE_LOGOUT',_mt:'json'},scope:this,
        			    		success:function(){
        							sessionStorage.setItem('USER_ID','');
        							sessionStorage.setItem('USER_PERM','');
        							sessionStorage.setItem('USER_NAME','');
        							sessionStorage.setItem('USER_IS_OPERATOR','');
        							sessionStorage.setItem('USER_IS_SALES','');
        							sessionStorage.setItem('USER_ALL_VIEW_FLAG','');
        							sessionStorage.setItem('USER_PASS_CHANGE_DATE','');
        							sessionStorage.setItem('COMP_CODE','');
        							sessionStorage.setItem('ROLE_ID','');
        							sessionStorage.setItem('ADMIN_ID',0);
						    	 	(new HT.LoginWindow()).show();
        			    		},
        			    		failure:function(){
        			    			alert('退出失败！');
        			    			sessionStorage.setItem('USER_ID','');
        							sessionStorage.setItem('USER_PERM','');
        							sessionStorage.setItem('USER_NAME','');
        							sessionStorage.setItem('USER_IS_OPERATOR','');
        							sessionStorage.setItem('USER_IS_SALES','');
        							sessionStorage.setItem('USER_ALL_VIEW_FLAG','');
        							sessionStorage.setItem('USER_PASS_CHANGE_DATE','');
        							sessionStorage.setItem('COMP_CODE','');
        							sessionStorage.setItem('ROLE_ID','');
        							sessionStorage.setItem('ADMIN_ID',0);
        			    		}
        					});
						}
					});
				}
			};
	var consoleGrid = new Ext.grid.GridPanel({
		store:store,
	    width:1000,
	    height:550,
	    frame:true,
	    sm:sm,
	    stripeRows:true,
	    autoScroll:true,
	    cm:cm,
	    tbar:[
	          {text:'激活状态',xtype:'tbtext'},cb,
	          {text:'公司名称',xtype:'tbtext'},kw,
	          {text:'快速查询',iconCls:'search',handler:this.search},'-',
	          {text:'激活',iconCls:'add',handler:this.active},'-',
	          {text:'结束日期设置',iconCls:'option',handler:this.pay},'-',
	          {text:'刷新',iconCls:'refresh',handler:this.reset},'-',
	          '->','-',logout,'-'
	    ],
	    bbar:PTB(store,C_PS100)
	});
	HT.ConsoleWindow.superclass.constructor.call(this,{
		title:"Hi-TMS 软件管理控制台",
		resizable:false,
		closable:false,
		maximized:true,
		maximizable:false,
		constrainHeader:true,
		layout:'fit',
		plain:true,
		items:[consoleGrid]
	});
};
Ext.extend(HT.ConsoleWindow, Ext.Window);

Ext.onReady(function(){
	if(sessionStorage.getItem('ADMIN_ID')==1){
		(new HT.ConsoleWindow()).show();
	}else{
		(new HT.LoginWindow()).show();
	}
});