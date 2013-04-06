//statistics
var getStatPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items:[]});
	var items=[];
	
	items=[];
	if(HR(M1_STAT+T_CUEX)) 				//应收费用统计表
		items[items.length]=FosMenu(panel,C_STAT_AR,'T_CUEX',function(){return new Fos.StatArTab('CUEX');});
	if(HR(M1_STAT+T_VEEX)) 				//应付费用统计表
		items[items.length]=FosMenu(panel,C_STAT_AP,'T_VEEX',function(){return new Fos.StatApTab();});
	if(HR(M1_STAT+T_WROF)){ 				//核销明细统计表
		items[items.length]=FosMenu(panel,C_STAT_WRITEOFF,'T_WROF',function(){return new Fos.StatWOTab();});
	}
	if(HR(M1_STAT+T_ACAR)||HR(M1_STAT+T_ACAP)){
		items[items.length]='-';
	}
	if(HR(M1_STAT+T_ACAR)) 				//应收账款账龄分析表
		items[items.length]=FosMenu(panel,C_STAT_AR_AC,'T_ACAR',function(){return new Fos.StatACTab('AR');});
	if(HR(M1_STAT+T_ACAP)) 				//应付账款账龄分析表
		items[items.length]=FosMenu(panel,C_STAT_AP_AC,'T_ACAP',function(){return new Fos.StatACTab('AP');});
		
	var accountPanel = new Ext.Panel({title:'账款统计',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
		
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,
		layout:'accordion',split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[accountPanel]});
	
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	createWindow('STAT',C_STAT,contPanel);//C_STAT
};

//应收费用统计 settlement_expense.rptdesign
Fos.StatArTab = function(T){
	var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STAT_NO_GROUP],
		      ['1',C_BOOKER],
		      ['7',C_GROU],
		      ['6',C_SALES],
		      ['3',C_CONS_NO]
		]});
	var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE]
		]});
	
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
    var t4=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
    var doc=new Ext.ux.IFrameComponent({id:T, url:''});
 	var check=function(){
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);
			return;
		}
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);
			return;
		}
	};
	
	this.getUrl=function(fmt){
		var charName=this.find('name','charName')[0].getValue();
		var custId=this.find('name','custId')[0].getValue();		
		var consSalesRepId=this.find('name','consSalesRepId')[0].getValue();		
		var expeBillStatus=this.find('name','expeBillStatus')[0].getValue();
		var expeInvoiceStatus=this.find('name','expeInvoiceStatus')[0].getValue();
		var expeWriteoffStatus=this.find('name','expeWriteoffStatus')[0].getValue();
		
		var url = REPORT_URL;
		
		if(T=='CUEX'){
			url = url+'&__report=reports/cust_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value+'&g='+t1.value;
		}
		else{
			url = url+'&__report=reports/settlement_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value;		
		}
			
		if(charName) url+='&charName='+charName;
		if(custId) url+='&custId='+custId;
		if(consSalesRepId) url+='&consSalesRepId='+consSalesRepId;
		if(expeBillStatus) url+='&expeBillStatus='+expeBillStatus;
		if(expeInvoiceStatus) url+='&expeInvoiceStatus='+expeInvoiceStatus;
		if(expeWriteoffStatus) url+='&expeWriteoffStatus='+expeWriteoffStatus;
		return url;
	};
	
	this.report=function(){
		check();
		Ext.get('IF_'+T).dom.src=this.getUrl();
	};
	this.clear=function(){
		this.find('name','sf')[0].getForm().reset();
	};
	this.expExcel=function(){
		check();
		OWW(this.getUrl()+'&__format=xls');
	};
	
	var b1={text:C_GEN_REPORT,disabled:NR(M1_STAT+T_CUEX),iconCls:'stats',scope:this,handler:this.report};
	var b2={text:C_EXPORT,disabled:NR(M1_STAT+T_CUEX),iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}};
	var b3={text:C_CLEAR_FILTER,iconCls:'rotate',scope:this,handler:this.clear};
	var tg={xtype:'tbtext',text:C_GROUP_TYPE};
	var tf={xtype:'tbtext',text:C_FROM};
	var tt={xtype:'tbtext',text:C_TO};
	Fos.StatArTab.superclass.constructor.call(this, {layout:'border',
		id:T=='CUEX'?'T_CUEX':'T_SEEX',
    	title:T=='CUEX'?C_STAT_AR:C_STAT_ARC,iconCls:'stats',closable:true,autoScroll:true,
     tbar:T=='CUEX'?[tg,t1,'-',t4,tf,t2,tt,t3,'-',b1,'-',b2,'->','-',b3]:[t4,tf,t2,tt,t3,'-',b1,'-',b2,'->','-',b3],
		items:[
			{region:'north',title:C_FILTER_MORE,name:'sf',xtype:'form',layout:'column',layoutConfig:{columns:4},
				height:92,frame:false,deferredRender:false,collapsible:true,collapsed:true,padding:5,items:[
	        	{columnWidth:.4,layout:'form',tabIndex:1,labelWidth:80,labelAlign:'right',border:false,items:[
	            	{fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),
		        		xtype:'combo',displayField:'custCode',valueField:'custId',
		        		typeAhead:true,enableKeyEvents:true,
		        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		        		triggerAction:'all',selectOnFocus:true,anchor:'95%',
		              	listeners:{scope:this,
		              		keydown:{fn:function(f,e){
		              			LC(f,e,'custBookerFlag');
		              			},buffer:500}
		              	}
	            	},     				
     				{fieldLabel:'对账状态',name:'expeBillStatus',xtype:'combo',editable:false,
	            		store:HTStore.BILL_STATUS_S,displayField:'NAME',valueField:'CODE',
	            		typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
     				]},
	        	{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
					{fieldLabel:C_CHAR,tabIndex:4,name:'charName',store:HTStore.getCHAR_S(),
						xtype:'combo',displayField:'charName',valueField:'charName',editable:false,
						typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:'账单状态',name:'expeInvoiceStatus',xtype:'combo',store:HTStore.INST_S,
	            		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',editable:false,
	            		triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]},
    			{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[	            	
	           		{fieldLabel:C_SALES,tabIndex:6,name:'consSalesRepId',
            			value:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1)?sessionStorage.getItem("USER_ID"):'',
    	    	        readOnly:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1),
	            		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userLoginName',
	            		valueField:'userId',typeAhead: true,mode: 'remote',triggerAction:'all',editable:false,
	            		selectOnFocus:true,anchor:'95%'},
	           		{fieldLabel:'核销状态',name:'expeWriteoffStatus',xtype:'combo',
	            		store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',editable:false,
	            		triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]}
	    	]},
	    	{layout:'fit',region:'center',items:[doc]}]});
};
Ext.extend(Fos.StatArTab, Ext.Panel);

//应付费用统计 vendor_expense.rptdesign
Fos.StatApTab = function(){
	var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STAT_NO_GROUP],
		      ['1',C_VENDOR],
		      ['7',C_GROU],
		      ['6',C_SALES],
		      ['3',C_CONS_NO]
		]});
	var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE]
		]});	
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
    var t4=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
    var doc=new Ext.ux.IFrameComponent({id:'VEEX', url:''});
   	var check=function(){
		if(!t2.getValue()){XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
	};
	this.getUrl=function(){
		var charName=this.find('name','charName')[0].getValue();		
		var custId=this.find('name','custId')[0].getValue();		
		var consSalesRepId=this.find('name','consSalesRepId')[0].getValue();
		var consNo=this.find('name','consNo')[0].getValue();
		var expeBillStatus=this.find('name','expeBillStatus')[0].getValue();
		var expeInvoiceStatus=this.find('name','expeInvoiceStatus')[0].getValue();
		var expeWriteoffStatus=this.find('name','expeWriteoffStatus')[0].getValue();
		
		var url = REPORT_URL+'&__report=reports/vendor_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value;
		
		if(charName) url+='&charName='+charName;
		if(custId) url+='&custId='+custId;		
		if(consSalesRepId) url+='&consSalesRepId='+consSalesRepId;
		if(consNo) url+='&consNo='+consNo;
		if(expeBillStatus) url+='&expeBillStatus='+expeBillStatus;
		if(expeInvoiceStatus) url+='&expeInvoiceStatus='+expeInvoiceStatus;
		if(expeWriteoffStatus) url+='&expeWriteoffStatus='+expeWriteoffStatus;
		return url;
	};
	this.report=function(){
		check();
		Ext.get('IF_VEEX').dom.src=this.getUrl();
	};
	this.clear=function(){
		this.find('name','sf')[0].getForm().reset();
	};
	this.expExcel=function(){
		check();
		OWW(this.getUrl()+'&__format=xls');
	};
	
	Fos.StatApTab.superclass.constructor.call(this, {    
    id:'T_VEEN',title:C_STAT_AP,iconCls:'stats',closable:true,autoScroll:true,layout:'border',
     tbar:[
		{xtype:'tbtext',text:C_GROUP_TYPE},t1,'-',
		t4,{xtype:'tbtext',text:C_FROM},t2,{xtype:'tbtext',text:C_TO},t3,'-',
		{text:C_GEN_REPORT,disabled:NR(M1_STAT+T_VEEX),iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,disabled:NR(M1_STAT+T_VEEX),iconCls:'print',scope:this,
			menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}},'->','-',
		{text:C_CLEAR_FILTER,iconCls:'rotate',scope:this,handler:this.clear}],
		items:[
			{region:'north',title:C_FILTER_MORE,layout:'column',name:'sf',xtype:'form',layoutConfig:{columns:4},
				height:120,frame:false,deferredRender:false,collapsible:true,collapsed:true,padding:5,items:[
	        	{columnWidth:.4,layout:'form',labelWidth:80,labelAlign:'right',border:false,items:[
	            	{fieldLabel:C_VENDOR,name:'custId',tabIndex:1,store:HTStore.getCS(),
		        		xtype:'combo',displayField:'custCode',valueField:'custId',typeAhead:true,enableKeyEvents:true,
		        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'95%',
		              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custApFlag');},buffer:500}}},
					{fieldLabel:'对账状态',name:'expeBillStatus',xtype:'combo',
						store:HTStore.BILL_STATUS_S,displayField:'NAME',valueField:'CODE',editable:false,
						typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
     			]},
	        	{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
					{fieldLabel:C_CHAR,tabIndex:4,name:'charName',store:HTStore.getCHAR_S(),
						xtype:'combo',displayField:'charName',valueField:'charName',editable:false,
						typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:'开票状态',name:'expeInvoiceStatus',xtype:'combo',
	            		store:HTStore.INST_S,displayField:'NAME',valueField:'CODE',typeAhead:true,editable:false,
	            		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}	            	
	            ]},
    			{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
	           		{fieldLabel:C_SALES,tabIndex:6,name:'consSalesRepId',
            			value:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1)?sessionStorage.getItem("USER_ID"):'',
    	    	        readOnly:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1),
	            		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userLoginName',editable:false,
	            		valueField:'userId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	           		{fieldLabel:'业务号',name:'consNo',tabIndex:12,xtype:'textfield',anchor:'95%'},
	           		{fieldLabel:'核销状态',name:'expeWriteoffStatus',xtype:'combo',
	           			store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,editable:false,
	           			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]}]},
	    	{region:'center',layout:'fit',deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatApTab, Ext.Panel);

//核销明细统计表 write_off.rptdesign
Fos.StatWOTab = function(t){
    var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
    	data:[['0',C_STAT_NO_GROUP],
    	      ['1',C_SETTLE_OBJECT],
    	      ['2',C_CONS_NO],
    	      ['4',C_WRITEOFF_DATE]
    	]});
	var T_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_WRITEOFF_R],
		      ['1',C_WRITEOFF_P]
		]});
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:T_S});
    var t3=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t4=new Ext.form.DateField({value:new Date(),format:DATEF});
    var doc=new Ext.ux.IFrameComponent({id:'STWO', url:''});
 	this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_SEL_WRITEOFF_DATE,function(){t3.focus();},this);
			return;
		};
		var url = REPORT_URL+'&__report=reports/write_off.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		Ext.get('IF_STWO').dom.src=url+'&g='+t1.value+'&dt='+t2.value+'&F='+t3.value+'&T='+t4.value;
	};
	this.exp=function(){
		var url = REPORT_URL+'&__report=reports/write_off.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		OWW(url+'&__format=xls&g='+t1.value+'&dt='+t2.value+'&F='+t3.value+'&T='+t4.value);
	};
	
	Fos.StatWOTab.superclass.constructor.call(this, {    
    id:'T_WROF',title:C_STAT_WRITEOFF,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    tbar:[{xtype:'tbtext',text:C_GROUP_TYPE},t1,'-',
		{xtype:'tbtext',text:C_WRITEOFF_TYPE},t2,'-',
		{xtype:'tbtext',text:C_WRITEOFF_DATE+C_FROM},t3,'-',
		{xtype:'tbtext',text:C_TO},t4,'-',
		{text:C_GEN_REPORT,iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.exp}]}}],
		items:[{layout:'fit',height:600,deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatWOTab, Ext.Panel);

//账款帐龄分析表t:AR应收 AP应付
Fos.StatACTab = function(t){
    var t1=new Ext.form.DateField({value:new Date(),format:DATEF});
    var doc=new Ext.ux.IFrameComponent({id:'AC'+t, url:''});
 	
    this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t2.focus();},this);
			return;
		};
		var url = REPORT_URL;
		if(t=='AR')
			url += '&__report=reports/account_age_r.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		else
			url += '&__report=reports/account_age_p.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
				
		Ext.get('IF_AC'+t).dom.src=url+'&cd=30&d='+t1.value;
	};
	
	this.expExcel=function(){
		var url = REPORT_URL;
		if(t=='AR')
			url += '&__report=reports/account_age_r.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
		else
			url += '&__report=reports/account_age_p.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	Fos.StatACTab.superclass.constructor.call(this, {
    	id:'T_AC'+t,title:t=='AR'?C_STAT_AR_AC:C_STAT_AP_AC,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
     	tbar:[{xtype:'tbtext',text:C_STAT_END_DATE},t1,'-',
		{text:C_GEN_REPORT,iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}}],
		items:[{layout:'fit',height:600,deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatACTab, Ext.Panel);
