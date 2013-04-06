//客户供应商
var getCustPanel = function(){
	var panel=new Ext.TabPanel({region:"center",
		enableTabScroll:true ,
		animScroll:true,
		plugins:new Ext.ux.TabCloseMenu(),
		activeTab:0,items: []});
		
	var getAddCustMenu = function(custClass){
		var p = new CCustomer({counCode:'CN',custArFlag:1,custApFlag:1,custActive:'1',
		custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),custClass:custClass,
		custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),
		custBookerFlag:custClass=='Booker'?1:0,custCarrierFlag:custClass=='Carrier'?1:0,
		custCustomFlag:custClass=='Custom'?1:0,custOverseaAgencyFlag:custClass=='Oversea'?1:0,
		custBookingAgencyFlag:custClass=='BookerA'?1:0,custInspectionFlag:custClass=='Insp'?1:0,
		custDoAgencyFlag:custClass=='DoA'?1:0,custCfsFlag:custClass=='Cfs'?1:0,
		custWarehouseFlag:custClass=='Warehouse'?1:0,custAirFlag:custClass=='Air'?1:0,
		custTrackFlag:custClass=='Track'?1:0,custContainerFlag:custClass=='Cont'?1:0,
		custInsuranceFlag:custClass=='Insu'?1:0,custOilFlag:custClass=='Oil'?1:0,
		custFactoryFlag:custClass=='Factory'?1:0,custExpressFlag:custClass=='Expr'?1:0,
		version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
		return {text:C_ADD+getTitleName(custClass),iconCls:'grid',scope:this,
				handler:function(){
					createWindow('CUST_ADD_'+custClass+p.get('uuid'),
							p.get('rowAction')=='N'?C_ADD+getTitleName(custClass):C_CUSTOMER+'-'+p.get('custName'),
			    			new Fos.CustomerPanel(p,custClass),true,1000,550);
				}
	 	};
	};
	//委托单位
	var items=[];
	items[items.length] = FosMenu(panel,C_BOOKER ,'C_BOOKER',
	function(){return new Fos.CustomerGrid('Booker');});
	//承运人
	items[items.length] = FosMenu(panel,C_CARRIER ,'C_CARRIER',
	function(){return new Fos.CustomerGrid('Carrier');});
	//报关行
	items[items.length] = FosMenu(panel,C_CUSTOM_AGENCY ,'C_CUSTOM_AGENCY',
	function(){return new Fos.CustomerGrid('Custom');});
	//海外代理
	items[items.length] = FosMenu(panel,C_OVERSEA_AGENCY ,'C_OVERSEA_AGENCY',
	function(){return new Fos.CustomerGrid('Oversea');});
	//订舱代理
	items[items.length] = FosMenu(panel,C_BOOK_AGENCY ,'C_BOOK_AGENCY',
	function(){return new Fos.CustomerGrid('BookerA');});
	//报检单位
	items[items.length] = FosMenu(panel,C_INSP_AGENCY ,'C_INSP_AGENCY',
	function(){return new Fos.CustomerGrid('Insp');});
	//换单代理
	items[items.length] = FosMenu(panel,C_DO_AGENCY ,'C_DO_AGENCY',
	function(){return new Fos.CustomerGrid('DoA');});
	//场站
	items[items.length] = FosMenu(panel,C_CFS ,'C_CFS',
	function(){return new Fos.CustomerGrid('Cfs');});
	//仓库
	items[items.length] = FosMenu(panel,C_WARE ,'C_WARE',
	function(){return new Fos.CustomerGrid('Warehouse');});
	//航空公司
	items[items.length] = FosMenu(panel,C_FLIGHTER ,'C_COM_AIR',
	function(){return new Fos.CustomerGrid('Air');});
	//车队
	items[items.length] = FosMenu(panel,C_MOTORCADE ,'C_MOTORCADE',
	function(){return new Fos.CustomerGrid('Track');});
	//箱公司
	items[items.length] = FosMenu(panel,C_CONTAINER ,'C_CONTAINER',
	function(){return new Fos.CustomerGrid('Cont');});
	//保险公司
	items[items.length] = FosMenu(panel,C_INSURANCE ,'C_INSURANCE',
	function(){return new Fos.CustomerGrid('Insu');});
	//加油站
	items[items.length] = FosMenu(panel,C_OIL_STATION ,'C_OIL_STATION',
	function(){return new Fos.CustomerGrid('Oil');});
	//维修工厂
	items[items.length] = FosMenu(panel,C_REPAIR_FACTORY ,'C_REPAIR_FACTORY',
	function(){return new Fos.CustomerGrid('Factory');});
	//快件公司
	items[items.length] = FosMenu(panel,C_EXPRESS ,'C_EXPRESS',
	function(){return new Fos.CustomerGrid('Expr');});
	
	var custPanel=new Ext.Panel({title:'客户供应商',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		
	var menuPanel = new Ext.Panel({region:"west",width:130,collapsible:true,layout:'accordion',collapseMode:'mini',split:true,
		items:[custPanel]});
	var contPanel=new Ext.Panel({layout:"border",border:false,items:[menuPanel,panel]});
	return contPanel;
};
//客户供应商TabPanel
Fos.CustomerGrid = function(custClass,scope,custType) {
	var bp = {_A:'CUST_X',_mt:'json'};
	if(custClass== "Booker")
	    bp = {_A:'CUST_X',_mt:'json',custBookerFlag:1};
	else if(custClass== "Carrier")
	 	bp = {_A:'CUST_X',_mt:'json',custCarrierFlag:1};
	else if(custClass== "Custom")
		bp = {_A:'CUST_X',_mt:'json',custCustomFlag:1};
	else if(custClass== "Oversea")
		bp = {_A:'CUST_X',_mt:'json',custOverseaAgencyFlag:1};
	else if(custClass== "BookerA")
		bp = {_A:'CUST_X',_mt:'json',custBookingAgencyFlag:1};
	else if(custClass== "Insp")
		bp = {_A:'CUST_X',_mt:'json',custInspectionFlag:1};
	else if(custClass== "DoA")
		bp = {_A:'CUST_X',_mt:'json',custDoAgencyFlag:1};	
	else if(custClass== "Cfs")
		bp = {_A:'CUST_X',_mt:'json',custCfsFlag:1};
	else if(custClass== "Warehouse")
	 	bp = {_A:'CUST_X',_mt:'json',custWarehouseFlag:1};
	else if(custClass== "Air")
	 	bp = {_A:'CUST_X',_mt:'json',custAirFlag:1};
	else if(custClass== "Track")
	 	bp = {_A:'CUST_X',_mt:'json',custTrackFlag:1};
	else if(custClass== "Cont")
	 	bp = {_A:'CUST_X',_mt:'json',custContainerFlag:1};
	else if(custClass== "Insu")
	 	bp = {_A:'CUST_X',_mt:'json',custInsuranceFlag:1};
	else if(custClass== "Oil")
	 	bp = {_A:'CUST_X',_mt:'json',custOilFlag:1};
	else if(custClass== "Factory")
		bp = {_A:'CUST_X',_mt:'json',custFactoryFlag:1};
	else if(custClass== "Expr")
	 	bp = {_A:'CUST_X',_mt:'json',custExpressFlag:1};
    var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomer',id:'id'},CCustomer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CUST_CODE,dataIndex:'custCode',width:130},
		{header:C_CNAME,dataIndex:'custNameCn',width:130},
		{header:C_CSNAME,dataIndex:'custSnameCn',width:130},
		{header:C_ENAME,dataIndex:'custNameEn',width:130},
		{header:C_ESNAME,dataIndex:'custSnameEn',width:130},
		{header:C_CONTACT,dataIndex:'custContact',width:130},
		{header:C_TEL,dataIndex:'custTel',width:130},
		{header:C_FAX,dataIndex:'custFax',width:130},
		{header:C_SALES,dataIndex:'custSalesName',width:130},
		{header:C_INDUSTRY,dataIndex:'custIndustry',width:130,renderer:HTStore.getINDU},
		{header:C_CPTY,dataIndex:'custType',width:130,renderer:HTStore.getCOPR},
		{header:'上级公司',dataIndex:'parentId',width:130,renderer:HTStore.getCSNameById},//添加上级公司字段
		{header:C_COUN,dataIndex:'counCode',width:130},C_CT,C_MT],
		defaults:{sortable:false,width:100}});
	var re={rowdblclick:function(g,r,e){
		  this.edit();
		}
	};
	//新增客户供应商
    this.add = function(){
    	var p = new CCustomer({counCode:'CN',custArFlag:1,custApFlag:1,custActive:'1',
		custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),custClass:custClass,
		custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),
		custBookerFlag:custClass=='Booker'?1:0,custCarrierFlag:custClass=='Carrier'?1:0,
		custCustomFlag:custClass=='Custom'?1:0,custOverseaAgencyFlag:custClass=='Oversea'?1:0,
		custBookingAgencyFlag:custClass=='BookerA'?1:0,custInspectionFlag:custClass=='Insp'?1:0,
		custDoAgencyFlag:custClass=='DoA'?1:0,custCfsFlag:custClass=='Cfs'?1:0,
		custWarehouseFlag:custClass=='Warehouse'?1:0,custAirFlag:custClass=='Air'?1:0,
		custTrackFlag:custClass=='Track'?1:0,custContainerFlag:custClass=='Cont'?1:0,
		custInsuranceFlag:custClass=='Insu'?1:0,custOilFlag:custClass=='Oil'?1:0,
		custFactoryFlag:custClass=='Factory'?1:0,custExpressFlag:custClass=='Expr'?1:0,
		version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	createWindow('CUST_ADD_'+custClass+p.get('uuid'),C_ADD+getTitleName(custClass),
    		new Fos.CustomerPanel(p,store,custClass),true,1000,550);
    };
    //编辑客户供应商
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){
    		/*var tab = this.ownerCt;
    		var c = 'CUST_EDIT_'+custClass+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(Fos.CustomerPanel(p,custClass)));
    	*/
    		//createWindow('CUST_EDIT_'+custClass+p.get('uuid'),getTitleName(custClass)+"——"+p.get('custNameCn'),
    		//new Fos.CustomerPanel(p,custClass),true,1000,550);
    		
    		var win = new Fos.CustomerWin(p,store);    	
    		win.show();
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
    //删除客户供应商
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
	
    Fos.CustomerGrid.superclass.constructor.call(this, {
    id:'CUST_'+custClass,store:store,iconCls:'grid',width:600,height:300,title:getTitleName(custClass),header:false,closable:true,
    sm:sm,cm:cm,listeners:re,loadMask:true,
	bbar:PTB(store,C_PS20),
	tbar:[{text:C_ADD,disabled:NR(M1_CRM+F_M),iconCls:'add',handler:this.add}, '-', 
		{text:C_EDIT,disabled:NR(M1_CRM+F_M),iconCls:'option',handler:this.edit}, '-',
		{text:C_REMOVE,disabled:NR(M1_CRM+F_M),iconCls:'remove',handler:this.removeCust},'-',
		/*{text:M_CUST_MERGE,disabled:NR(M1_CRM+F_MERGE),disabled:true,iconCls:'merge',handler:this.merge},'-',*/
		{text:C_SEARCH,iconCls:'search',handler:this.search}
		//,'->',//	删除顶部工具栏 分页工具  REMOVE BY YongZhixiang 
		//new Ext.PagingToolbar({pageSize:C_PS20,store:store})
		]
    });
};
Ext.extend(Fos.CustomerGrid,Ext.grid.GridPanel);

Fos.CustomerPanel = function(p,listStore,custClass,wu){
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
	{header:C_MSN,dataIndex:'cucoMsn',ditor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_QQ,dataIndex:'cucoQq',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_BIRTHDAY,dataIndex:'cucoBirthday',renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_GENDER,dataIndex:'cucoGender',renderer:HTStore.getGEND,editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.GEND_S})},
	{header:C_REMARKS,dataIndex:'cucoRemarks',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})}
	],defaults:{sortable:true,width:120}});
	this.contStore=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUCO_Q',_mt:'json',custId:'0'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomerContact',id:'id'},CCustomerContact),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.contStore.load({params:{custId:p.get('id')}});
	this.contGrid = new Ext.grid.EditorGridPanel({border:false,autoScroll:true,height:250,sm:sm,cm:cm,
		store:this.contStore,clicksToEdit:1,
		tbar:[{text:C_ADD,disabled:NR(M1_CRM),iconCls:'add',scope:this,handler:function(){
				var r = new CCustomerContact({custId:p.get('id'),
					cucoName:'',cucoMobile:'',cucoTel:'',cucoHomeTel:'',cucoEmail:'',cucoFax:'',cucoAddress1:'',cucoTitle:'',cucoMsn:'',
					cucoQq:'',cucoBirthday:'',cucoGender:'',cucoRemarks:'',
					version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
				this.contStore.insert(0,r);
				this.contGrid.startEditing(0,1);
			}},'-',
			{text:C_REMOVE,disabled:NR(M1_CRM),iconCls:'remove',scope:this,handler:function(){
				var r = this.contGrid.getSelectionModel().getSelections();
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					this.contStore.remove(r[i]);
				}
			}
		}]
	});
	//保存
	this.save=function(){
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
			Ext.getCmp('TB_A').setDisabled(true);
   			Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,params:{_A:wu?'WS_CUST_S':'CUST_S',wusrId:wu?wu.get('wusrId'):''},
				success: function(r,o){
					var c = HTUtil.XTR(r.responseXML,'CCustomer',CCustomer);
                    var ra=p.get('rowAction');
                    HTUtil.RU(c,p,CCustomer);
                    if(ra=='N'&&listStore)
                    	listStore.insert(0,p);
                   else if(wu){
                    	wu.beginEdit();
                    	wu.set('version',
                    	wu.get('version')+1);
                    	wu.set('wusrStatus',1);
                    	wu.set('custId',p.get('id'));
                    	wu.endEdit();
                    }
					XMG.alert(SYS,M_S);
					Ext.getCmp('TB_A').setDisabled(false);
					},
				failure: function(r,o){XMG.alert(SYS,M_F+r.responseText);Ext.getCmp('TB_A').setDisabled(false);},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else{frmValidatePrompt();}
	};
	//客户信息-TOP部分
	var t1={layout:'column',border:false,items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:80,
            items: [{fieldLabel:C_CODE,id:'custCode',value:p.get('custCode'),allowBlank:false,anchor:'95%'},
            {fieldLabel:C_CNAME,id:'custNameCn',value:p.get('custNameCn'),allowBlank:false,anchor:'95%'},
            {fieldLabel:C_CSNAME,id:'custSnameCn',value:p.get('custSnameCn'),anchor:'95%'}, 
            {fieldLabel:C_INDUSTRY,id:'custIndustry',value:p.get('custIndustry'),xtype:'combo',store:HTStore.INDU_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
            {fieldLabel:C_SALES,name:'custSalesName',value:p.get('custSalesName'),
            	store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',
            	valueField:'userName',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
            	listeners:{scope:this,select:function(c,r,i){
            		p.set('custSalesId',r.get('id'));}}}]},
            {columnWidth:.5,layout:'form',border:false,defaultType: 'textfield',labelWidth:80,
            items:[
            {fieldLabel:C_CUCA,id: 'cucaId',value:p.get('cucaId'),xtype:'combo',store:HTStore.getCUCA_S(),displayField:'cucaName',valueField:'id',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
            {fieldLabel:C_ENAME,id:'custNameEn',value:p.get('custNameEn'),anchor:'95%'},
            {fieldLabel:C_ESNAME,id:'custSnameEn',value:p.get('custSnameEn'),anchor:'95%'},
            {fieldLabel:C_CPTY,id:'custType',value:p.get('custType'),xtype:'combo',store:HTStore.COPR_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
            //添加上级公司 ADD BY YongZhixiang 2012-07-02  HTStore.getCSNameById(p.get('parentId'),'','','','',store)
            {fieldLabel:'上级公司',id:'parentId',xtype:'combo',store:HTStore.getCS(),displayField:'custNameCn',valueField:'id',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',listeners:{
            	afterrender:function(comb){
            		var store=comb.getStore();
        			store.load({callback:function(){
        				var index=store.find('id',p.get('parentId'));
            			if(index!=-1){
            				comb.setValue(p.get('parentId'));
            			}
        			}});
            	}
            }}
            ]}
         ]};
	//联系信息
	var t2={title:C_CONTINF,layout:'column',border:false,items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:80,
            items:[{fieldLabel:C_COUN,id:'custCountry',value:p.get('custCountry'),
            		xtype:'combo',
            		tpl: counTpl,
            		itemSelector:'div.list-item',
            		store:HTStore.getCOUN_S(),
            		displayField:'counCode',
            		valueField:'counNameCn',
            		typeAhead:true,
            		mode:'local',
            		triggerAction:'all',
            		selectOnFocus:true,
            		anchor:'95%'},
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
		           	 typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'96%',
		           	 listeners:{scope:this,select:function(c,r,v){
			        	 	p.set('custProvinceId',r.get('id'));
			        	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
			        	 	var city = frmCustomer.find('name','custCity')[0];
			        	 	if(city){
			        	 		city.store.baseParams= bp;
			        	 		city.store.reload();
			        	 	}
			         	}}},
                    {fieldLabel:C_ZIP,id:'custZip',value:p.get('custZip'),anchor:'96%'},
                    {fieldLabel:C_FAX,id:'custFax',value:p.get('custFax'),anchor:'96%'},
                    {fieldLabel:C_EMAIL,id:'custEmail',value:p.get('custEmail'),anchor:'96%'}
          ]},
          {columnWidth:.99,layout: 'form',border:false,defaultType:'textfield',
              items: [{fieldLabel:C_ADDRESS,id:'custAddress',value:p.get('custAddress'),anchor:'99%'},
                  	{fieldLabel:C_ADDRESS2,id:'custAddress2',value:p.get('custAddress2'),anchor:'99%'},
                	{fieldLabel:C_ADDRESS3,id:'custAddress3',value:p.get('custAddress3'),anchor:'99%'},
           			{fieldLabel:C_URL,id:'custUrl',value:p.get('custUrl'),anchor:'99%'}
            ]}
	]};
	//财务信息
	var t3={title:C_FININF,layout:'column',border:false,items:
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
              items: [{fieldLabel:C_INVO_TITLE,id:'custInvoiceHeader',value:p.get('custInvoiceHeader'),anchor:'95%'},
                  	{fieldLabel:C_SHIP_TO,id:'custShipTo',value:p.get('custShipTo'),anchor:'95%'},
           			{fieldLabel:C_CHARGE_TO,id:'custChargeTo',value:p.get('custChargeTo'),anchor:'95%'}
            ]}
	]};
	//扩展信息
	var t4={title:C_EXT_INFO,layout:'column',border:false,items:
		[{columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,labelAlign:'top',
            items: [{fieldLabel:C_SHIPPER_DEFAULT,xtype:'textarea',id:'custShipper',value:p.get('custShipper'),anchor:'95%'},
            		{fieldLabel:C_REMARKS,xtype:'textarea',id:'custRemarks',value:p.get('custRemarks'),anchor:'95%'},
            		{fieldLabel:C_CUST_SPECIAL,xtype:'textarea',id:'attr9',value:p.get('attr9'),anchor:'95%'}
            		]},
          {columnWidth:.5,layout: 'form',border:false,defaultType:'textfield',labelWidth:100,labelAlign:'top',
            items: [
                {fieldLabel:C_CUST_REQUIRE,xtype:'textarea',id:'attr10',value:p.get('attr10'),anchor:'95%'},
        		{fieldLabel:C_CUST_SA,xtype:'textarea',id:'attr8',value:p.get('attr8'),anchor:'95%'},
        		{fieldLabel:C_CUST_CUDE_CODE,xtype:'textarea',id:'attr1',value:p.get('attr1'),anchor:'95%'}
        		]}
	]};
	//联系人信息
    var t5={title:C_CONTACT_INFO,layout:'fit',deferredRender:false,collapsible:true,bodyStyle:'padding:0px',items:[this.contGrid]};
    //服务类型-业务类型
    var t6={layout:'column',layoutConfig:{columns:2},deferredRender:false,title:'业务类型',region:'north',height:100,
			items:[{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
			{boxLabel:'海运',id:'marineFlag',checked:p.get('marineFlag')==1,xtype:'checkbox',anchor:'95%'},
			{boxLabel:'仓储',id:'wmsFlag',checked:p.get('wmsFlag')==1,xtype:'checkbox',anchor:'95%'}
			]},
			{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
			{boxLabel:'空运',id:'airFlag',checked:p.get('airFlag')==1,xtype:'checkbox',anchor:'95%'},
			{boxLabel:'陆运',id:'tmsFlag',checked:p.get('tmsFlag')==1,xtype:'checkbox',anchor:'95%'}
	    	]},
	    	{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
	    	{boxLabel:'快递',id:'expressFlag',checked:p.get('expressFlag')==1,xtype:'checkbox',anchor:'95%'}
			]},
			{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
			{boxLabel:'关务',id:'customsFlag',checked:p.get('customsFlag')==1,xtype:'checkbox',anchor:'95%'}
			]}
			]
		};
	var frmCustomer = new Ext.form.FormPanel({labelWidth:60,id:'F_CUST',bodyStyle:'padding:5px',
    	items:[t1,
          	{xtype:'tabpanel',plain:true,activeTab:2,height:300,labelWidth:80,defaults:{bodyStyle:'padding:10px'},
            items:[t5,
            {layout:'border',title:C_SERVICE_TYPE,height:600,
    			items:[
    			{layout:'column',layoutConfig:{columns:2},border:false,region:'center',deferredRender:false,title:C_CUST_TYPE,
    				items:[{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
		        		{boxLabel:C_BOOKER,id:'custBookerFlag',checked:p.get('custBookerFlag')==1,xtype:'checkbox',anchor:'95%'}
		        		/*{boxLabel:C_SHIPPER,id:'custShipperFlag',checked:p.get('custShipperFlag')==1,xtype:'checkbox',anchor:'95%'},
		        		{boxLabel:C_CONSIGNEE,id:'custConsigneeFlag',checked:p.get('custConsigneeFlag')==1,xtype:'checkbox',anchor:'95%'},
		        		{boxLabel:C_NOTIFIER,id:'custNotifyFlag',checked:p.get('custNotifyFlag')==1,xtype:'checkbox',anchor:'95%'}*/
		        		]},
		        		{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
		        		{boxLabel:C_CARRIER,id:'custCarrierFlag',checked:p.get('custCarrierFlag')==1,xtype:'checkbox',anchor:'95%'},
		            	{boxLabel:C_BOOK_AGENCY,id:'custBookingAgencyFlag',checked:p.get('custBookingAgencyFlag')==1,xtype:'checkbox',anchor:'95%'},
		            	{boxLabel:C_CFS,id:'custCfsFlag',checked:p.get('custCfsFlag')==1,xtype:'checkbox',anchor:'95%'},
						{boxLabel:C_TRACKER,id:'custTrackFlag',checked:p.get('custTrackFlag')==1,xtype:'checkbox',anchor:'95%'},
		            	{boxLabel:C_OIL_STATION,id:'custOilFlag',checked:p.get('custOilFlag')==1,xtype:'checkbox',anchor:'95%'}
		            	]},
		            	{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
		            	{boxLabel:C_CUSTOM_AGENCY,id:'custCustomFlag',checked:p.get('custCustomFlag')==1,xtype:'checkbox',anchor:'95%'},
		            	{boxLabel:C_INSP_AGENCY,id:'custInspectionFlag',checked:p.get('custInspectionFlag')==1,xtype:'checkbox',anchor:'95%'},
		       			{boxLabel:C_WAREHOUSE,id:'custWarehouseFlag',checked:p.get('custWarehouseFlag')==1,xtype:'checkbox',anchor:'95%'},
		       			{boxLabel:C_CONTAINER,id:'custContainerFlag',checked:p.get('custContainerFlag')==1,xtype:'checkbox',anchor:'95%'},
		       			{boxLabel:C_REPAIR_FACTORY,id:'custFactoryFlag',checked:p.get('custFactoryFlag')==1,xtype:'checkbox',anchor:'95%'}
		       			]},
		        		{columnWidth:.25,layout:'form',border:false,labelSeparator:'',hideLabels:true,items:[
		       			{boxLabel:C_OVERSEA_AGENCY,id:'custOverseaAgencyFlag',checked:p.get('custOverseaAgencyFlag')==1,xtype:'checkbox',anchor:'95%'},
						{boxLabel:C_DO_AGENCY,id:'custDoAgencyFlag',checked:p.get('custDoAgencyFlag')==1,xtype:'checkbox',anchor:'95%'},
						{boxLabel:C_FLIGHTER,id:'custAirFlag',checked:p.get('custAirFlag')==1,xtype:'checkbox',anchor:'95%'},
		       			{boxLabel:C_INSURANCE,id:'custInsuranceFlag',checked:p.get('custInsuranceFlag')==1,xtype:'checkbox',anchor:'95%'},
		       			{boxLabel:C_EXPRESS,id:'custExpressFlag',checked:p.get('custExpressFlag')==1,xtype:'checkbox',anchor:'95%'}
		       			]}
           		 ]},t6]
        	},t2,t4,t3]
        }]
    });
    Fos.CustomerPanel.superclass.constructor.call(this, {title:C_CUSTOMER_INFO,modal:true,
        autoScroll:true,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items: frmCustomer,
        buttons:[{id:'TB_A',text:C_OK,disabled:NR(M1_CRM+F_M),scope:this,handler:this.save},
				{text:C_CANCEL,scope:this,handler:function(){
					this.ownerCt.close();
				}}]
        }); 
};
Ext.extend(Fos.CustomerPanel, Ext.Panel);

Fos.CustomerWin = function(p,store) {
	var panel = new Fos.CustomerPanel(p,store);
	Fos.CustomerWin.superclass.constructor.call(this, {modal:true,width:1000,
        height:600,layout:'fit',plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:panel});
};
Ext.extend(Fos.CustomerWin,Ext.Window);