
var getCustomerPanel = function(){
	var panel=new Ext.TabPanel({region:"center",
		enableTabScroll:true,
		animScroll:true,
		plugins:new Ext.ux.TabCloseMenu(),
		activeTab:0,items:[]});
	var items=[];
	if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'委托单位','CUST_BOOK',function(){return new Fos.CustomerGrid('Booker');});
	if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'物流商','CUST_CARRIER',function(){return new Fos.CustomerGrid('Carrier');});
	if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'维修工厂','CUST_FACTORY',function(){return new Fos.CustomerGrid('Factory');});
	/*if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'加油站','CUST_OIL',function(){return new Fos.CustomerGrid('Oil');});*/
	if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'保险公司','CUST_INSURANCE',function(){return new Fos.CustomerGrid('Insu');});
	if(HR(M1_CUST))
		items[items.length]=FosMenu(panel,'车队','CUST_TRACK',function(){return new Fos.CustomerGrid('Track');});
	if(VERSION==5){
		if(HR(M1_CUST))
			items[items.length]=FosMenu(panel,'箱公司','CUST_CONT',function(){return new Fos.CustomerGrid('Container');});
		if(HR(M1_CUST))
			items[items.length]=FosMenu(panel,'报关行','CUST_CUSTOM',function(){return new Fos.CustomerGrid('Custom');});
	}
	var genPanel = new Ext.Panel({title:'客户管理',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,layout:'accordion',
		split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[genPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	
	createWindow('CUST','客户管理',contPanel);//客户管理
};

//客户供应商TabPanel
Fos.CustomerGrid = function(custClass,fn,scope) {
	var bp={_A:'CUST_X',_mt:'json'};
	
	if(custClass== "Booker")
	    bp = {_A:'CUST_X',_mt:'json',custBookerFlag:1};
	else if(custClass== "Carrier")
	 	bp = {_A:'CUST_X',_mt:'json',custCarrierFlag:1};
	else if(custClass== "Track")
	 	bp = {_A:'CUST_X',_mt:'json',custTrackFlag:1};
	else if(custClass== "Factory")
		bp = {_A:'CUST_X',_mt:'json',custFactoryFlag:1};
	else if(custClass== "Oil")
	 	bp = {_A:'CUST_X',_mt:'json',custOilFlag:1};
	else if(custClass== "Insu")
	 	bp = {_A:'CUST_X',_mt:'json',custInsuranceFlag:1};
	else if(custClass== "Container")
	 	bp = {_A:'CUST_X',_mt:'json',custContainerFlag:1};
	else if(custClass== "Custom")
	 	bp = {_A:'CUST_X',_mt:'json',custCustomFlag:1};
	
    var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomer',id:'id'},CCustomer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    store.load({params:{start:0,limit:C_PS30}});
    this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30}});
	};
	
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CODE,dataIndex:'custCode',width:100},
		//{header:C_SERVICE_TYPE,dataIndex:'',width:100},
		{header:C_CNAME,dataIndex:'custNameCn',width:150},
		{header:C_CSNAME,dataIndex:'custSnameCn'},
		{header:C_ENAME,dataIndex:'custNameEn'},
		{header:C_ESNAME,dataIndex:'custSnameEn'},
		//{header:C_CONTACT,dataIndex:'custContact'},
		//{header:C_TEL,dataIndex:'custTel'},
		//{header:C_FAX,dataIndex:'custFax'},
		{header:C_SALES,dataIndex:'custSalesName'},
		{header:C_INDUSTRY,dataIndex:'custIndustry',renderer:HTStore.getINDU},
		{header:C_CPTY,dataIndex:'custType',renderer:HTStore.getCOPR},
		C_CT,C_MT],
		defaults:{sortable:false,width:130}});
	var re={rowdblclick:function(g,r,e){
			/*if(custType) fn(sm.getSelected(),scope);
			else this.edit();*/
			this.edit();
		}
	};
    this.add = function(){
    	var p = new CCustomer({custCode:'',custClass:'',custNameCn:'',custSnameCn:'',custNameEn:'',custSnameEn:'',
    		custArFlag:1,custApFlag:1,custIndustry:'',cucaId:'',custType:'',counCode:'CN',custProvince:'',custCity:'',
    		custAddress:'',custZip:'',custContact:'',custTel:'',custFax:'',custEmail:'',custUrl:'',custBankCny:'',
    		custAccountCny:'',custBankUsd:'',custAccountUsd:'',custInvoiceHeader:'',custActive:'1',
    		custBookerFlag:custClass=='Booker'?1:0,custCarrierFlag:custClass=='Carrier'?1:0,
    		custShipperFlag:'',custTrackFlag:custClass=='Track'?1:0,custFactoryFlag:custClass=='Factory'?1:0,
    		custShipTo:'',custChargeTo:'',custOilFlag:custClass=='Oil'?1:0,custContainerFlag:custClass=='Container'?1:0,
    		custInsuranceFlag:custClass=='Insu'?1:0,custCustomFlag:custClass=='Custom'?1:0,
    		custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),
    		custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),custRemarks:'',
    		version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    		var win = new Fos.CustomerWin(p,store);
    		win.show();
    };
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){
    		var win = new Fos.CustomerWin(p,store);
    		win.show();
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	this.removeCust=function(){
		var b = sm.getSelected();
		if (b)
        	XMG.confirm(SYS,M_R_C,function(btn){
            	if(btn == 'yes') {
            		var xml=HTUtil.SMTX4R(sm,'CCustomer');
            		HTUtil.REQUEST('CUST_R', xml, function(){store.remove(b);});
            	}
        	},this);
        else XMG.alert(SYS,M_R_P);
	};
	//归并
	this.merge=function(){
		if (sm.getSelections().length > 0)
        	XMG.confirm(SYS,M_CUST_MERGE_CONFIRM,function(btn){
            	if(btn == 'yes') {
            		var w = new Fos.CustMergeWin();
        			w.addButton({text:C_OK,handler:function(){        				
        				custId = w.custId;
        				if(custId!=''){
	        				custIds='';
	        				var a=sm.getSelections();
	        				for(var i=0;i<a.length;i++){
	        					if(custIds=='') custIds=a[i].get('id');
	        					else custIds=custIds+','+a[i].get('id');
	        				}
	        				Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	        					params:{_A:'CUST_M',custIds:custIds,custId:custId},
	        					success: function(){
	        						sm.each(function(p){
	        							if(p.get('id')!=custId) 
	        								store.remove(p);
	        						});
	        						XMG.alert(SYS,M_S);
	        					},
	        					failure: function(r,o){
	        						XMG.alert(SYS,M_F+r.responseText);
	        					}});
        				}
        				w.close();
        			}},this);
        			w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
        			w.show();
            	}
        	});
        else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.search = function(){var w=new Fos.CustomerLW(store);w.show();};
	
    Fos.CustomerGrid.superclass.constructor.call(this, {id:'CUST_'+custClass,store:store,
    	iconCls:'gen',width:600,height:300,title:getTitleName(custClass),header:false,closable:true,
    	sm:sm,cm:cm,listeners:re,loadMask:true,stripeRows:true,
    	bbar:PTB(store,C_PS30),
		tbar:[{text:C_ADD,disabled:NR(M1_CUST+F_ADD),iconCls:'add',handler:this.add}, '-', 
			{text:C_EDIT,disabled:NR(M1_CUST+F_UP),iconCls:'option',handler:this.edit}, '-',
			{text:C_REMOVE,disabled:NR(M1_CUST+F_R),iconCls:'remove',handler:this.removeCust},'-',
			//{text:M_CUST_MERGE,disabled:NR(M1_CUST),disabled:true,iconCls:'merge',handler:this.merge},'-',		//客户供应商归并
			{text:C_SEARCH,iconCls:'search',handler:this.search},'-',
			{text:C_RESET,iconCls:'refresh',handler:this.reset},								//刷新
	        '-',
			'->',new Ext.PagingToolbar({pageSize:C_PS30,store:store})]
    });
};
Ext.extend(Fos.CustomerGrid,Ext.grid.GridPanel);
//客户归并
Fos.CustMergeWin = function() {
	this.custId='';
	var frm = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:M_CUST_MERGE_TO,name:'custName',value:'',store:HTStore.getCS(),enableKeyEvents:true,
       		xtype:'combo',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
       		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
             	listeners:{scope:this,
             	select:function(c,r,i){
				this.find('name','custSname')[0].setValue(r.get('custSnameCn'));
				this.custId=r.get('custId');
			},
			keydown:{fn:function(f,e){LC(f,e,'');},buffer:BF}}},
			{fieldLabel:C_CSNAME,name:'custSname',disabled:true,xtype:'textfield',anchor:'95%'}
			]
    });
    Fos.CustMergeWin.superclass.constructor.call(this, {title:M_SEL_MERGE_TO,modal:true,width:400,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm}); 
};
Ext.extend(Fos.CustMergeWin,Ext.Window);

Fos.CustSelWin = function() {
	this.custId='';
	this.custSname='';
	var frm = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:M_SEL_CUST,name:'custName',value:'',store:HTStore.getCS(),enableKeyEvents:true,
       		xtype:'combo',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
       		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
             	listeners:{scope:this,
             	select:function(c,r,i){
				this.custSname=r.get('custSnameCn');				
				this.custId=r.get('custId');
			},
			keydown:{fn:function(f,e){LC(f,e,'');},buffer:BF}}}
			]
    });
    Fos.CustSelWin.superclass.constructor.call(this, {title:SYS,modal:true,width:400,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm}); 
};
Ext.extend(Fos.CustSelWin,Ext.Window);

//客户供应商-新增-编辑
Fos.CustomerWin = function(p,store,wu){
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_FNAME,dataIndex:'cucoName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_MOBILE,dataIndex:'cucoMobile',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_OPHONE,dataIndex:'cucoTel',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_HPHONE,dataIndex:'cucoHomeTel',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_EMAIL,dataIndex:'cucoEmail',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_FAX,dataIndex:'cucoFax',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ADDRESS,dataIndex:'cucoAddress1',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_TITLE,dataIndex:'cucoTitle',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_MSN,dataIndex:'cucoMsn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_QQ,dataIndex:'cucoQq',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_BIRTHDAY,dataIndex:'cucoBirthday',renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_GENDER,dataIndex:'cucoGender',renderer:HTStore.getGEND,
		editor:new Ext.form.TextField({allowBlank:true,emptyField:'',invalidText:''})},
	{header:C_REMARKS,dataIndex:'cucoRemarks',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})}
	],defaults:{sortable:false,width:120}});
	//联系人信息-STORE
	this.contStore=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUCO_Q',_mt:'json',custId:'0'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomerContact',id:'id'},CCustomerContact),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	this.contStore.load({params:{custId:p.get('id')}});
	//联系人信息-GRID
	this.contGrid = new Ext.grid.EditorGridPanel({border:false,autoScroll:true,height:250,sm:sm,cm:cm,
		store:this.contStore,
		tbar:[{text:C_ADD,disabled:NR(M1_CUST+F_ADD),iconCls:'add',scope:this,handler:function(){
				var r = new CCustomerContact({custId:p.get('id'),
					cucoName:'',cucoMobile:'',cucoTel:'',cucoHomeTel:'',cucoEmail:'',cucoFax:'',cucoAddress1:'',cucoTitle:'',cucoMsn:'',
					cucoQq:'',cucoBirthday:'',cucoGender:'',cucoRemarks:'',
					version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
				this.contStore.insert(0,r);
				this.contGrid.startEditing(0,1);
			}},'-',
			{text:C_REMOVE,disabled:NR(M1_CUST+F_R),iconCls:'remove',scope:this,handler:function(){
				var r = this.contGrid.getSelectionModel().getSelections();
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					this.contStore.remove(r[i]);
				}
			}
		}]
	});
	this.save=function(){
		var bl=true;
		var a1=this.contStore.getRange();
		for(var i=0;i<a1.length;i++){
			if(a1[i].get('cucoName')==''){
				XMG.alert(SYS,'请填写完整联系人名称！');
				bl=false;
				break;
			}
		}
		if(!bl){
			return ;
		}
		
		if(frmCustomer.getForm().isValid()){
			p.beginEdit();
			var fs = p.fields;
	        fs.each(function(f){
	            var field = frmCustomer.getForm().findField(f.name);
	            if(field){
	                p.set(f.name, field.getValue());
	            }
	        }, this);
			p.endEdit();

   			var xml=HTUtil.RTX(p,'CCustomer',CCustomer);
   			var a =this.contStore.getModifiedRecords();
			if(a.length>0){
				xml = xml+HTUtil.ATX(a,'CCustomerContact',CCustomerContact);
			};
   			Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,params:{_A:wu?'WS_CUST_S':'CUST_S',wusrId:wu?wu.get('wusrId'):''},
				success: function(r,o){
					var c = HTUtil.XTR(r.responseXML,'CCustomer',CCustomer);
                    var ra=p.get('rowAction');
                    HTUtil.RU(c,p,CCustomer);
                    if(ra=='N'&&store)
                    	store.insert(0,p);
                    if(wu){
                    	wu.beginEdit();
                    	wu.set('version',
                    	wu.get('version')+1);
                    	wu.set('wusrStatus',1);
                    	wu.set('custId',p.get('id'));
                    	wu.endEdit();
                    }
					XMG.alert(SYS,M_S);
					this.close();},
				failure: function(r,o){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else{frmValidatePrompt();}
	};
	//客户信息-TOP部分
	var t1={layout:'column',frame:false,border:false,padding:5,labelAlign:'right',items:
		[{columnWidth:.5,layout:'form',border:false,defaultType:'textfield',labelWidth:80,
            items: [{fieldLabel:C_CNAME,id:'custNameCn',value:p.get('custNameCn'),allowBlank:false,anchor:'95%'},
            	{fieldLabel:C_CODE,id:'custCode',value:p.get('custCode'),allowBlank:false,anchor:'95%'},
	            {fieldLabel:C_CSNAME,id:'custSnameCn',value:p.get('custSnameCn'),anchor:'95%'}, 
	            {fieldLabel:C_INDUSTRY,id:'custIndustry',value:p.get('custIndustry'),xtype:'combo',
	            	store:HTStore.INDU_S,displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',
	            	triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false},
	            {fieldLabel:C_SALES,name:'custSalesName',value:p.get('custSalesName'),
	            	store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',editable:false,
	            	valueField:'userName',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
	            	listeners:{scope:this,select:function(c,r,i){
	            			p.set('custSalesId',r.get('id'));
	            		}
	            	}
	            }
            ]},
            {columnWidth:.5,layout:'form',border:false,defaultType: 'textfield',labelWidth:80,
            items:[
	            {fieldLabel:C_CUCA,id: 'cucaId',value:p.get('cucaId'),editable:false,
	            	xtype:'combo',store:HTStore.getCUCA_S(),displayField:'cucaName',valueField:'id',
	            	typeAhead: true,mode: 'remote',triggerAction:'all',
	            	selectOnFocus:true,anchor:'95%',editable:false},
	            {fieldLabel:C_ENAME,id:'custNameEn',value:p.get('custNameEn'),anchor:'95%'},
	            {fieldLabel:C_ESNAME,id:'custSnameEn',value:p.get('custSnameEn'),anchor:'95%'},
	            {fieldLabel:C_CPTY,id:'custType',value:p.get('custType'),xtype:'combo',
	            	store:HTStore.COPR_S,displayField:'NAME',valueField:'CODE',typeAhead:true,
	            	mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false}
            ]}
       ]};
	//联系信息
	var t2={title:'基本信息',layout:'column',iconCls:'list-items',labelAlign:'right',border:false,items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:80,
            items: [{fieldLabel:C_COUN,id:'custCountry',value:p.get('custCountry'),xtype:'combo',
            	store:HTStore.getCOUN_S(),displayField:'counNameCn',valueField:'counNameCn',typeAhead: true,
            	mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
                	//{fieldLabel:C_CITY,id:'custCity',value:p.get('custCity'),anchor:'95%'},
	            	{fieldLabel:C_CITY,name:'custCity',
		               	 value:p.get('custCity'),ref:'../custCity',
		               	 store:HTStore.getCITY_S(p.get('custProvinceId')),xtype:'combo',displayField:'placName',valueField:'placName',
		               	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		               	 listeners:{select:function(c,r,v){
		   	        	 	p.set('custCityId',r.get('id'));
		   	         }}},
                	{fieldLabel:C_TEL,id:'custTel',value:p.get('custTel'),anchor:'95%'},
                	{fieldLabel:C_CONTACT,id:'custContact',value:p.get('custContact'),anchor:'95%'}
          ]},
          {columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',
            items: [
                    //{fieldLabel:C_STATE,id:'custProvince',value:p.get('custProvince'),anchor:'95%'},
                    {fieldLabel:C_STATE,name:'custProvince',
		           	 value:p.get('custProvince'),
		           	 store:HTStore.getPROVINCE_S(),xtype:'combo',displayField:'placName',valueField:'placName',
		           	 typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		           	 listeners:{scope:this,select:function(c,r,v){
			        	 	p.set('custProvinceId',r.get('id'));
			        	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
			        	 	var city = frmCustomer.find('name','custCity')[0];
			        	 	if(city){
			        	 		city.store.baseParams= bp;
			        	 		city.store.reload();
			        	 	}
			         	}}},
                    {fieldLabel:C_ZIP,id:'custZip',value:p.get('custZip'),anchor:'95%'},
                    {fieldLabel:C_FAX,id:'custFax',value:p.get('custFax'),anchor:'95%'},
                    {fieldLabel:C_EMAIL,id:'custEmail',value:p.get('custEmail'),anchor:'95%'}
          ]},
          {columnWidth:.99,layout: 'form',border:false,defaultType:'textfield',
              items: [{fieldLabel:C_ADDRESS,id:'custAddress',value:p.get('custAddress'),anchor:'98.5%'},
                  	{fieldLabel:C_ADDRESS2,id:'custAddress2',value:p.get('custAddress2'),anchor:'98.5%'},
                	{fieldLabel:C_ADDRESS3,id:'custAddress3',value:p.get('custAddress3'),anchor:'98.5%'},
           			{fieldLabel:C_URL,id:'custUrl',value:p.get('custUrl'),anchor:'98.5%'}
            ]}
	]};
	//财务信息
	var t3={title:'财务信息',layout:'column',iconCls:'list-items',border:false,labelAlign:'right',items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,
            items: [{fieldLabel:C_ACCOUNT_AR,id:'custArFlag',checked:p.get('custArFlag')==1,xtype:'checkbox',anchor:'30%'},
                    {fieldLabel:C_CREDIT_DAY,id:'custCreditDay',value:p.get('custCreditDay'),anchor:'95%'},
    				{fieldLabel:C_BANK_CNY,id:'custBankCny',value:p.get('custBankCny'),anchor:'95%'},
                	{fieldLabel:C_BANK_ACCOUNT_CNY,id:'custAccountCny',value:p.get('custAccountCny'),anchor:'95%'}
          ]},
          {columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,
            items: [
                    {fieldLabel:C_ACCOUNT_AP,id:'custApFlag',checked:p.get('custApFlag')==1,xtype:'checkbox',anchor:'30%'},
                    {fieldLabel:C_CREDIT_AMT,id:'custCreditAmount',value:p.get('custCreditAmount'),anchor:'95%'},
           			{fieldLabel:C_BANK_USD,id:'custBankUsd',value:p.get('custBankUsd'),anchor:'95%'},
                	{fieldLabel:C_BANK_ACCOUNT_USD,id:'custAccountUsd',value:p.get('custAccountUsd'),anchor:'95%'}
          ]},
          {columnWidth:.99,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,
              items: [{fieldLabel:C_INVO_TITLE,id:'custInvoiceHeader',value:p.get('custInvoiceHeader'),anchor:'98%'},
                  	{fieldLabel:C_SHIP_TO,id:'custShipTo',value:p.get('custShipTo'),anchor:'98%'},
           			{fieldLabel:C_CHARGE_TO,id:'custChargeTo',value:p.get('custChargeTo'),anchor:'98%'}
            ]}
	]};	
	//扩展信息
	var t4={title:'扩展信息',layout:'column',iconCls:'list-items',border:false,items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,labelAlign:'top',
            items: [{fieldLabel:C_SHIPPER_DEFAULT,xtype:'textarea',id:'custShipper',value:p.get('custShipper'),anchor:'95%'},
            		{fieldLabel:C_REMARKS,xtype:'textarea',id:'custRemarks',value:p.get('custRemarks'),anchor:'95%'},
            		{fieldLabel:C_CUST_SPECIAL,xtype:'textarea',id:'attr9',value:p.get('attr9'),anchor:'95%'}
            		]},
          {columnWidth:.5,layout:'form',border:false,defaultType:'textfield',labelWidth:100,labelAlign:'top',
            items: [
                {fieldLabel:C_CUST_REQUIRE,xtype:'textarea',id:'attr10',value:p.get('attr10'),anchor:'95%'},
        		{fieldLabel:C_CUST_SA,xtype:'textarea',id:'attr8',value:p.get('attr8'),anchor:'95%'},
        		{fieldLabel:C_CUST_CUDE_CODE,xtype:'textarea',id:'attr1',value:p.get('attr1'),anchor:'95%'}
        		]}
	]};
	//联系人信息
    var t5={title:C_CONTACT_INFO,layout:'fit',deferredRender:false,iconCls:'list-items',items:[this.contGrid]};
    //服务类型
    var t6={layout:'column',layoutConfig:{columns:2},deferredRender:false,title:'服务类型',iconCls:'list-items',padding:5,
			items:[{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
    		{boxLabel:C_BOOKER,id:'custBookerFlag',checked:p.get('custBookerFlag')==1,xtype:'checkbox',anchor:'95%'},
    		{boxLabel:C_CONTAINER,id:'custContainerFlag',checked:p.get('custContainerFlag')==1,xtype:'checkbox',anchor:'95%'}
    		]},
    		{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
    		{boxLabel:C_CARRIER_UNIT,id:'custCarrierFlag',checked:p.get('custCarrierFlag')==1,xtype:'checkbox',anchor:'95%'},    
			{boxLabel:C_TRACKER,id:'custTrackFlag',checked:p.get('custTrackFlag')==1,xtype:'checkbox',anchor:'95%'}
        	]},
        	{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
   			{boxLabel:C_REPAIR_FACTORY,id:'custFactoryFlag',checked:p.get('custFactoryFlag')==1,xtype:'checkbox',anchor:'95%'},
   			{boxLabel:C_OIL_STATION,id:'custOilFlag',checked:p.get('custOilFlag')==1,xtype:'checkbox',anchor:'95%'}
   			]},
    		{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
   			{boxLabel:C_INSURANCE,id:'custInsuranceFlag',checked:p.get('custInsuranceFlag')==1,xtype:'checkbox',anchor:'95%'},
   			{boxLabel:C_CUSTOM_AGENCY,id:'custCustomFlag',checked:p.get('custCustomFlag')==1,xtype:'checkbox',anchor:'95%'}
   			]}
   			]
    	};
	var frmCustomer = new Ext.form.FormPanel({labelWidth:60,id:'F_CUST',frame:false,border:false,
    	items:[t1,
          	{xtype:'tabpanel',plain:true,activeTab:0,height:300,labelWidth:80,defaults:{bodyStyle:'padding:5px'},
            items:[t5,t6,t2,t3]}
    	],
    	bbar:[getMB(p),'->','-',
    			{text:C_SAVE,disabled:NR(M1_CUST+F_M),scope:this,iconCls:'ok',handler:this.save},'-',
				{text:C_CANCEL,scope:this,iconCls:'cancel',handler:function(){this.close();}},'-'
    		 ]
    });
    Fos.CustomerWin.superclass.constructor.call(this, {title:C_CUSTOMER_INFO,modal:true,width:900,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items: frmCustomer
        }); 
};
Ext.extend(Fos.CustomerWin, Ext.Window);

//客户供应商查询
Fos.CustomerLW = function(store) {
	var t1={id:'TCL_1',title:C_LOOK_BY_CUST_CODE,layout:'form',items:[
		{fieldLabel:C_CUST_CODE,name:'custCode',xtype:'textfield',anchor:'95%'},
    	{boxLabel:C_LOOK_SMART,name:'custCodeM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}
		]};
	var t2={id:'TCL_2',title:C_LOOK_BY_CNAME,layout:'form',items:[
		{fieldLabel:C_CNAME,name:'custNameCn',xtype:'textfield',anchor:'95%'},
		{boxLabel:C_LOOK_SMART,name:'custNameCnM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}
		]};
	var t3={id:'TCL_3',title:C_LOOK_BY_ENAME,layout:'form',items:[
		{fieldLabel:C_ENAME,name:'custNameEn',xtype:'textfield',anchor:'95%'},
		{boxLabel:C_LOOK_SMART,name:'custNameEnM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}]};
	var t4={id:'TCL_4',title:C_LOOK_COMPLEX,layout:'column',items:[
    	{columnWidth:.33,layout:'form',labelWidth:70,border:false,items:[	             	
	    	{fieldLabel:C_CSNAME,tabIndex:1,name:'custSNameCn',xtype:'textfield',anchor:'95%'},
        	{fieldLabel:C_INDUSTRY,name:'custIndustry',xtype:'combo',store:HTStore.INDU_S,
	    		displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',
	    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
        	{fieldLabel:C_CONTACT,name:'custContact',xtype:'textfield',anchor:'95%'}]},
	    {columnWidth:.33,layout:'form',labelWidth:70,border:false,items:[
	    	{fieldLabel:C_ESNAME,tabIndex:2,name:'custSNameEn',xtype:'textfield',anchor:'95%'},
	    	{fieldLabel:C_CPTY,name:'custType',xtype:'combo',store:HTStore.COPR_S,
	    		displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',
	    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
	     	]},
		{columnWidth:.34,layout:'form',labelWidth:70,border:false,items:[
			{fieldLabel:C_CUCA,tabIndex:3,name: 'cucaId',xtype:'combo',store:HTStore.getCUCA_S(),
				displayField:'cucaName',valueField:'cucaId',typeAhead: true,mode: 'local',
				triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	     	{fieldLabel:C_COUN,name:'counCode',xtype:'combo',store:HTStore.getCOUN_S(),
				displayField:'counNameCn',valueField:'counCode',typeAhead: true,
				mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
	    ]}]};
	var t5={id:'TCL_5',title:C_LOOK_BY_SERVICE,layout:'column',items:[
		{columnWidth:.33,layout:'form',border:false,items:[	
			{boxLabel:C_BOOKER,xtype: 'checkbox',name:'custBookerFlag',hideLabel:true},
			{boxLabel:C_NOTIFIER,xtype: 'checkbox',name:'custNotifyFlag',hideLabel:true,hidden:true},				//隐藏
			{boxLabel:C_CARRIER_UNIT,xtype: 'checkbox',name:'custCarrierFlag',hideLabel:true},
			{boxLabel:C_BOOK_AGENCY,xtype: 'checkbox',name:'custBookingAgencyFlag',hideLabel:true,hidden:true},		//隐藏
			{boxLabel:C_OVERSEA_AGENCY,xtype: 'checkbox',name:'custOverseaAgencyFlag',hideLabel:true,hidden:true},	//隐藏
			{boxLabel:C_CFS,xtype: 'checkbox',name:'custCfsFlag',hideLabel:true,hidden:true}						//隐藏
		]},
		{columnWidth:.33,layout:'form',border:false,items:[
			{boxLabel:C_SHIPPER,xtype: 'checkbox',name:'custShipperFlag',hideLabel:true,hidden:true},				//隐藏
			{boxLabel:C_TRACKER,xtype: 'checkbox',name:'custTrackFlag',hideLabel:true},
			{boxLabel:C_CUSTOM_AGENCY,xtype: 'checkbox',name:'custCustomFlag',hideLabel:true},			
			{boxLabel:C_INSP_AGENCY,xtype: 'checkbox',name:'custInspectionFlag',hideLabel:true,hidden:true},		//隐藏
			{boxLabel:C_FLIGHTER,xtype: 'checkbox',name:'custAirFlag',hideLabel:true,hidden:true},					//隐藏
			{boxLabel:C_DO_AGENCY,xtype: 'checkbox',name:'custDoAgencyFlag',hideLabel:true,hidden:true}				//隐藏
		]},
		{columnWidth:.33,layout:'form',border:false,items:[
			{boxLabel:C_CONSIGNEE,xtype: 'checkbox',name:'custConsigneeFlag',hideLabel:true,hidden:true},			//隐藏
			{boxLabel:C_WAREHOUSE,xtype: 'checkbox',name:'custWarehouseFlag',hideLabel:true,hidden:true},			//隐藏
			{boxLabel:C_CONTAINER,xtype: 'checkbox',name:'custContainerFlag',hideLabel:true},			
			{boxLabel:C_EXPRESS,xtype: 'checkbox',name:'custExpressFlag',hideLabel:true,hidden:true},				//隐藏
			{boxLabel:C_INSURANCE,xtype: 'checkbox',name:'custInsuranceFlag',hideLabel:true}
		]}
	]};

    var tab = new Ext.TabPanel({xtype:'tabpanel',plain:true,activeTab:0,height:200,defaults:{bodyStyle:'padding:10px'},
            items:[t1, t2,t3,t5,t4]});		
    this.reload=function(){
     	var at = tab.getActiveTab();
     	var a=[];var op=1;
     	if(at.getId()=='TCL_1'){
     		var consNo=at.find('name','custCode')[0].getValue();
     		var consNoM=at.find('name','custCodeM')[0].getValue();
     		if(consNoM) op=7;
     		a[a.length]={key:'custCode',value:consNo,op:op};
     	}     	
     	else if(at.getId()=='TCL_2'){
     		var consMblNo=at.find('name','custNameCn')[0].getValue();
     		var consMblNoM=at.find('name','custNameCnM')[0].getValue();
     		if(consMblNoM) op=7;
     		a[a.length]={key:'custNameCn',value:consMblNo,op:op};
     	}
     	else if(at.getId()=='TCL_3'){
     		var consHblNo=at.find('name','custNameEn')[0].getValue();
     		var consHblNoM=at.find('name','custNameEnM')[0].getValue();
     		if(consHblNoM) op=7;
     		a[a.length]={key:'custNameEn',value:consHblNo,op:op};
     	}
     	else if(at.getId()=='TCL_4'){
     		var custSNameCn=at.find('name','custSNameCn')[0].getValue();
     		var custIndustry=at.find('name','custIndustry')[0].getValue();
     		var custContact=at.find('name','custContact')[0].getValue();
     		var custSNameEn=at.find('name','custSNameEn')[0].getValue();
     		var custType=at.find('name','custType')[0].getValue();
     		var cucaId=at.find('name','cucaId')[0].getValue();
     		var counCode=at.find('name','counCode')[0].getValue();
     		
     		if(custSNameCn) a[a.length]={key:'custSNameCn',value:custSNameCn,op:op};
     		if(custIndustry) a[a.length]={key:'custIndustry',value:custIndustry,op:op};
     		if(custContact) a[a.length]={key:'custContact',value:custContact,op:op};
     		if(custSNameEn) a[a.length]={key:'custSNameEn',value:custSNameEn,op:op};
     		if(custType) a[a.length]={key:'custType',value:custType,op:op};
     		if(cucaId) a[a.length]={key:'cucaId',value:cucaId,op:op};
     		if(counCode) a[a.length]={key:'counCode',value:counCode,op:op};
     	}
     	else if(at.getId()=='TCL_5'){
     		var custCarrierFlag=at.find('name','custCarrierFlag')[0].getValue();
     		var custBookingAgencyFlag=at.find('name','custBookingAgencyFlag')[0].getValue();
     		var custCfsFlag=at.find('name','custCfsFlag')[0].getValue();
     		var custTrackFlag=at.find('name','custTrackFlag')[0].getValue();
     		var custCustomFlag=at.find('name','custCustomFlag')[0].getValue();
     		var custInspectionFlag=at.find('name','custInspectionFlag')[0].getValue();
     		var custWarehouseFlag=at.find('name','custWarehouseFlag')[0].getValue();
     		var custContainerFlag=at.find('name','custContainerFlag')[0].getValue();
     		var custOverseaAgencyFlag=at.find('name','custOverseaAgencyFlag')[0].getValue();
     		var custDoAgencyFlag=at.find('name','custDoAgencyFlag')[0].getValue();
     		var custInsuranceFlag=at.find('name','custInsuranceFlag')[0].getValue();
     		var custBookerFlag=at.find('name','custBookerFlag')[0].getValue();
     		var custShipperFlag=at.find('name','custShipperFlag')[0].getValue();
     		var custNotifyFlag=at.find('name','custNotifyFlag')[0].getValue();
     		var custConsigneeFlag=at.find('name','custConsigneeFlag')[0].getValue();
     		var custAirFlag=at.find('name','custAirFlag')[0].getValue();
     		var custExpressFlag=at.find('name','custExpressFlag')[0].getValue();
     		
     		if(custCarrierFlag) a[a.length]={key:'custCarrierFlag',value:1,op:op};
     		if(custBookingAgencyFlag) a[a.length]={key:'custBookingAgencyFlag',value:1,op:op};
     		if(custCfsFlag) a[a.length]={key:'custCfsFlag',value:1,op:op};
     		if(custTrackFlag) a[a.length]={key:'custTrackFlag',value:1,op:op};
     		if(custCustomFlag) a[a.length]={key:'custCustomFlag',value:1,op:op};
     		if(custInspectionFlag) a[a.length]={key:'custInspectionFlag',value:1,op:op};
     		if(custWarehouseFlag) a[a.length]={key:'custWarehouseFlag',value:1,op:op};
     		if(custContainerFlag) a[a.length]={key:'custContainerFlag',value:1,op:op};
     		if(custOverseaAgencyFlag) a[a.length]={key:'custOverseaAgencyFlag',value:1,op:op};
     		if(custDoAgencyFlag) a[a.length]={key:'custDoAgencyFlag',value:1,op:op};
     		if(custInsuranceFlag) a[a.length]={key:'custInsuranceFlag',value:1,op:op};     		
     		if(custBookerFlag) a[a.length]={key:'custBookerFlag',value:1,op:op};
     		if(custShipperFlag) a[a.length]={key:'custShipperFlag',value:1,op:op};
     		if(custNotifyFlag) a[a.length]={key:'custNotifyFlag',value:1,op:op};
     		if(custConsigneeFlag) a[a.length]={key:'custConsigneeFlag',value:1,op:op};
     		if(custAirFlag) a[a.length]={key:'custAirFlag',value:1,op:op};
     		if(custExpressFlag) a[a.length]={key:'custExpressFlag',value:1,op:op};
     	}
     	store.baseParams=a.length>0?{_A:'CUST_X',_mt:'json',xml:HTUtil.QATJ(a)}:{_A:'CUST_X',_mt:'json'};
     	store.reload({params:{start:0,limit:25},
     		callback:function(r){
     			if(r.length==0){
     				XMG.alert(SYS,M_NOT_FOUND);
     			}
     		}
     	});
     	this.close();
	};	
    Fos.CustomerLW.superclass.constructor.call(this, {title:C_LOOK_CUST,iconCls:'search',modal:true,width:600,
        buttonAlign:'right',items:tab,
        buttons:[{text:C_OK,scope:this,iconCls:'ok',handler:this.reload},
                 {text:C_CANCEL,scope:this,iconCls:'cancel',handler:this.close}]
        }); 
};
Ext.extend(Fos.CustomerLW, Ext.Window);

//请选择开航日期
Fos.DateWin = function() {
	var frmDate = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:C_SAIL_DATE,id:'voyaSailDate',value:new Date(),allowBlank:false,xtype:'datefield',anchor:'95%'}]
    });
    Fos.DateWin.superclass.constructor.call(this, {title:C_SAIL_DATE_P,modal:true,width:200,
        Height:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmDate});
};
Ext.extend(Fos.DateWin, Ext.Window);

//请选择模板文件
Fos.TemplateChooseWin = function(t){
	var frmTemplate = new Ext.form.FormPanel({labelWidth:80,bodyStyle:'padding:5px',
    	items: [{fieldLabel:C_TEMP_SEL_P,id:'tempId',allowBlank:false,
    		store:HTStore.getTemplates(t),xtype:'combo',displayField:'tempName',valueField:'id',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}]
    });
    Fos.TemplateChooseWin.superclass.constructor.call(this,{title:C_TEMP_SEL_P,modal:true,width:400,
        Height:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmTemplate}); 
};
Ext.extend(Fos.TemplateChooseWin, Ext.Window);

//邮箱
Fos.MailWin = function(m,t,mt) {
	var form = new Ext.form.FormPanel({labelWidth:60,id:'F_MAIL',bodyStyle:'padding:5px 5px 0',frame:true,width:800,height:400,
		items: [{layout:'column',layoutConfig:{columns:1},deferredRender:false,items:[
			{columnWidth:1,layout:'form',border:false,items:[
				{fieldLabel:'To',id:'to',value:m.get('messTo'),xtype:'textfield',allowBlank:false,anchor:'95%'},
	            {fieldLabel:'Cc',id:'cc',value:m.get('messCc'),xtype:'textfield',anchor:'95%'},
	            {fieldLabel:'Subject',id:'sub',value:m.get('messSubject'),xtype:'textfield',anchor:'95%'},
	            {fieldLabel:C_TEMP_FILE,disabled:t=='',id:'tempId',store:HTStore.getTemplates(t),xtype:'combo',displayField:'tempName',valueField:'id',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
	            	listeners:{scope:this,
	        		render:function(cbx){
	        			if(cbx.store.getCount()){
	        				var r=cbx.store.getAt(0);
	        				cbx.setValue(r.get('id'));
	        			}
	            }}},
	            {layout:'fit',items:[{id:'body',value:m.get('messBody'),xtype:'htmleditor',anchor:'95%'}]}]
	         }]}]
    });
    Fos.MailWin.superclass.constructor.call(this, {title:mt==1?C_SEND_MAIL:C_SEND_FAX,modal:true,plain:true,layout:'fit',width:800,height:400,
    border:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:form}); 
};
Ext.extend(Fos.MailWin, Ext.Window);

//选择客户-弹出客户供应商版面
Fos.CustomerLookup = Ext.extend(Ext.form.ComboBox, {
	triggerClass:'x-form-search-trigger',
	custType:'',
	bizType:'',
	constructor:function(config){
		this.custType = config['custType'];
		this.bizType = config['bizType'];
		Fos.CustomerLookup.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.CustomerLookup.superclass.initComponent.call(this);        
	},
	selectCust:function(cust,scope){
		scope.setValue(cust.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, cust, 0);
	},
	onTriggerClick:function(event){
		var win = new Fos.CustomerLookWin(this.custType,this.bizType,this.selectCust,this);
		win.show();
	}
});
Ext.reg('customerLookup', Fos.CustomerLookup);

//选择客户供应商
Fos.CustomerLookWin = function(custType,bizType,fn,scope) {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CUST_X&_mt=json',baseParams:{},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomer',id:'id'},CCustomer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.baseParams = {};
    
    //委托单位
    if(custType=='custBookerFlag')
    	store.baseParams.custBookerFlag=1;
    //承运单位
    else if(custType=='custCarrierFlag')
    	store.baseParams.custCarrierFlag=1;
    //仓库
    else if(custType=='custWarehouseFlag')
    	store.baseParams.custWarehouseFlag=1;
    //车队
    else if(custType=='custTrackFlag')
    	store.baseParams.custTrackFlag=1;
    //保险公司
    else if(custType=='custInsuranceFlag')
    	store.baseParams.custInsuranceFlag=1;
    //加油站
    else if(custType=='custOilFlag')
    	store.baseParams.custOilFlag=1;
    //维修工厂
    else if(custType=='custFactoryFlag')
    	store.baseParams.custFactoryFlag=1;
    //快件公司
    else if(custType=='custExpressFlag')
    	store.baseParams.custExpressFlag=1;
    //集装箱公司
    else if(custType=='custContainerFlag')
    	store.baseParams.custContainerFlag=1;
    //报关行
    else if(custType=='custCustomFlag')
    	store.baseParams.custCustomFlag=1;
   if(bizType=='T')
    	store.baseParams.tmsFlag=1;
      
    store.load({params:{start:0,limit:C_PS30}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:C_CUST_CODE,dataIndex:'custCode',width:80},
		{header:C_CNAME,dataIndex:'custNameCn',width:150},
		{header:C_CSNAME,dataIndex:'custSnameCn',width:100},
		{header:C_ENAME,dataIndex:'custNameEn',width:100},
		{header:C_ESNAME,dataIndex:'custSnameEn',width:80},
		{header:C_CONTACT,dataIndex:'custContact',width:100},
		{header:C_TEL,dataIndex:'custTel',width:100},
		//{header:C_FAX,dataIndex:'custFax',width:100},
		C_CT
		//C_MT
		],
		defaults:{sortable:false,width:100}
	});
    var t = custType;
    this.addCustomer = function(){
    	var p = new CCustomer({custCode:'',custClass:'',custNameCn:'',custSnameCn:'',custNameEn:'',custSnameEn:'',
		custArFlag:1,custApFlag:1,custIndustry:'',cucaId:'',custType:'',counCode:'CN',custProvince:'',custCity:'',
		custAddress:'',custZip:'',custContact:'',custTel:'',custFax:'',custEmail:'',custUrl:'',custBankCny:'',
		custAccountCny:'',custBankUsd:'',custAccountUsd:'',custInvoiceHeader:'',custActive:1,
		custBookerFlag:t=='custBookerFlag'?1:'',custShipperFlag:t=='custShipperFlag'?1:'',
		custCarrierFlag:t=='custCarrierFlag'?1:'',custContainerFlag:t=='custContainerFlag'?1:'',
		custShipTo:'',custChargeTo:'',custCreditDay:'',custCustomFlag:t=='custCustomFlag'?1:0,
		custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),
		custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),custRemarks:'',
		version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	var win = new Fos.CustomerWin(p,store);
		win.show();
    };
	this.search = function(){
		var w=new Fos.CustomerLW(store);
		w.show();
	};
	this.sel = function(){
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,
		listeners:{scope:this,rowdblclick:function(g,r,e){
				this.sel;
			}
		},
		bbar:PTB(store,C_PS30),
		tbar:[{text:C_ADD,disabled:NR(M1_CUST+F_ADD),iconCls:'add',handler:this.addCustomer}, '-', 
			{text:C_SEARCH,iconCls:'search',handler:this.search},'-']
	});
    Fos.CustomerLookWin.superclass.constructor.call(this,{
    	title:C_CUST_SEL,width:910,height:500,layout:'fit',modal:true,items:grid,
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
   	}); 
};
Ext.extend(Fos.CustomerLookWin,Ext.Window);

//客户供应商TITLE
var getTitleName = function(custClass){
	var titleName = "";
	if(custClass== "Booker")
	    titleName = C_BOOKER;
	else if(custClass== "Carrier")
	 titleName = C_CARRIER_UNIT;
	else if(custClass== "Custom")
	 titleName = C_CUSTOM_AGENCY;
	else if(custClass== "Oversea")
	 titleName = C_OVERSEA_AGENCY;
	else if(custClass== "BookerA")
	 titleName = C_BOOK_AGENCY;
	else if(custClass== "Insp")
	 titleName = C_INSP_AGENCY;
	else if(custClass== "DoA")
	 titleName = C_DO_AGENCY;
	else if(custClass== "Cfs")
	 titleName = C_CFS;
	else if(custClass== "Warehouse")
	 titleName = C_WARE;
	else if(custClass== "Air")
	 titleName = C_FLIGHTER;
	else if(custClass== "Track")
	 titleName = C_TRACKER;
	else if(custClass== "Cont")
	 titleName = C_CONTAINER;
	else if(custClass== "Insu")
	 titleName = C_INSURANCE;
	else if(custClass== "Oil")
	 titleName = C_OIL_STATION;
	else if(custClass== "Factory")
	 titleName = C_REPAIR_FACTORY;
	else if(custClass== "Expr")
	 titleName = C_EXPRESS;
	else if(custClass== "Container")
	 titleName = C_CONTAINER;
	return titleName;
};