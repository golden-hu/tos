//customs declaration
Fos.CudeGrid = function(bizClass,consign) {	
	var store = new Ext.data.GroupingStore({url:SERVICE_URL+'?_A=CUDE_X',baseParams:{_mt:'xml',consBizClass:bizClass},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FCustomsDeclaration',idProperty:'id'},FCustomsDeclaration),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}
	});		
	if(Ext.isEmpty(consign))
		store.load({params:{start:0,limit:C_PS}});
	else
		store.load({params:{oriConsId:consign.get('id')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_STATUS,dataIndex:'cudeStatus',renderer:HTStore.getCDST,width:50},
	{header:C_CONS_NO,dataIndex:'consNo',width:100},
	{header:C_DATE,dataIndex:'consDate',renderer:formatDate,width:100},
	{header:C_BOOKER,dataIndex:'custName',width:100},
	{header:C_CUSTOM_AGENCY,dataIndex:'cudeVendorName'},
	{header:C_CONVEYANCE_S,dataIndex:'cudeConveyance'},
	{header:C_TRAFFIC_NO,dataIndex:'cudeBlNo'},
	{header:C_DECLARE_DATE,dataIndex:'cudeDeclarDate',renderer:formatDate,width:150},
	{header:C_PRE_NO,dataIndex:'cudePreNo'},
	{header:C_RECORD_NO,dataIndex:'cudeRecordNo'}
	],defaults:{sortable:true,width:100}});
	
	this.showCude = function(p){
    	createWindow('CUDE_'+p.get("uuid"),
			p.get('rowAction')=='N'?C_ADD_CUDE_CONS:C_CUDE_CONS+'-'+p.get('consNo'),
			new Fos.CudeTab(p),true);
    };
    
	this.add=function(){
		var r = new FCustomsDeclaration({uuid:HTUtil.UUID(32),rowAction:'N',
			consBizClass:bizClass,consBizType:BT_I,
			cudeDeclarDate:new Date(),consDate:new Date()}); 
		this.showCude(r);
	};
	this.addByConsign = function(){
		var r = new FCustomsDeclaration({oriConsId:consign.get('id'),
			oriConsNo:consign.get('consNo'),
			consDate:consign.get('consDate'),
			consBizType:BT_I,
			consBizClass:consign.get('consBizClass'),
			custId:consign.get('custId'),
			custName:consign.get('custName'),
			custSName:consign.get('custSName'),
			custContact:consign.get('custContact'),
			custTel:consign.get('custTel'),
			custFax:consign.get('custFax'),
			grouId:consign.get('grouId'),
			grouName:consign.get('grouName'),
			salesRepId:consign.get('salesRepId'),
			salesRepName:consign.get('salesRepName'),				
			cudeEntryDate:consign.get('consLoadDate'),
			cudeDeclarDate:new Date(),
			consContractNo:consign.get('consContractNo'),
			cudePortDomestic:consign.get('consBizClass')==BC_E?consign.get('consPolEn'):consign.get('consPodEn'),
			cudeGrossWeight:consign.get('consShipType')==ST_B?consign.get('consTotalGrossWeight')*1000:consign.get('consTotalGrossWeight'),
			cudeNetWeight:consign.get('consShipType')==ST_B?consign.get('consTotalNetWeight')*1000:consign.get('consTotalNetWeight'),
			cudePlace:consign.get('consPolEn'),
			packCode:consign.get('packName'),
			cudePackageNum:consign.get('consTotalPackages'),
			cudeConveyance:consign.get('vessName')+' '+consign.get('voyaName'),
			cudeBlNo:consign.get('consMblNo'),
			cudeContractNo:consign.get('consTradeContractNo'),
			cudeCountry:consign.get('consTradeCountry'),
			cudePortForeign:consign.get('consBizClass')==BC_E?consign.get('consPodEn'):consign.get('consPolEn'),
			cudeContainerNo:consign.get('consContainerNo'),
			cudeStatus:0,				
			rowAction:'N',
			version:'0',uuid:HTUtil.UUID(32)});  
		this.showCude(r);
	};
	
	this.del=function(){
		var b =sm.getSelected();
		if(b){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'FCustomsDeclaration');
	        		HTUtil.REQUEST('CUDE_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showCude(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.search();
			}
		}
	});
	
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,C_CONS_NO_REQUIRED,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'consNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'consNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'consNo',value:ra[1],op:LE});
		}
		else
 			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
     		store.baseParams={_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
     		store.reload({params:{start:0,limit:C_PS},callback:function(r){
     		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
     	});
	};
	this.search = function(){
		var w=new Fos.CudeLookupWin(store);
		w.show();
	};
	
	var bAdd = {text:C_ADD,iconCls:'add',scope:this,handler:this.addByConsign};
	if(Ext.isEmpty(consign))		
		bAdd = {text:C_ADD,iconCls:'add',scope:this,handler:this.add};
	
	Fos.CudeGrid.superclass.constructor.call(this,{ 
    id:'G_CUDE_'+bizClass,iconCls:'grid',title:(bizClass=='I'?C_IMP:C_EXP)+C_CUDE_LIST,header:false,closable:true,	
    store:store,sm:sm,cm:cm,loadMask: true,
    listeners:{scope:this,
		rowdblclick: function(grid, rowIndex, event){
			var p=sm.getSelected();
			if(p){
				this.showCude(p);
			}
		}},
	bbar:PTB(store,C_PS),
	tbar:[bAdd,'-',
		{text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SEARCH,iconCls:'search',handler:this.search}, '-', 
        {text:C_CONS_NO,xtype:'tbtext'},
        kw,{text:C_SEARCH,iconCls:'search',handler:this.fastSearch}]
    });
};
Ext.extend(Fos.CudeGrid, Ext.grid.GridPanel);

Fos.CudeTab = function(p) {
	var entryStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUEN_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FCustomsEntry',id:'id'},FCustomsEntry),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		entryStore.load({params:{consId:p.get('id')}});
	this.save = function(){
		p.beginEdit();
		//this.getForm().updateRecord(p);
		var f = FCustomsDeclaration.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		p.endEdit();
		
		if(Ext.isEmpty(p.get('custId'))){
			Ext.Msg.alert(SYS,M_CUST_REQUIRED,function(){
				this.find('name','custName')[0].focus();
			},this);
			return;
		};
		if(Ext.isEmpty(p.get('consDate'))){
			Ext.Msg.alert(SYS,C_CONS_DATE_REQUIRED,function(){
				this.find('name','consDate')[0].focus();},this);return;};
		if(Ext.isEmpty(p.get('grouId'))){
			Ext.Msg.alert(SYS,M_DEPT_REQUIRED,function(){
				this.find('name','grouName')[0].focus();
			},this);return;};	
		if(Ext.isEmpty(p.get('salesRepId'))){
			Ext.Msg.alert(SYS,M_SALES_REQUIRED,function(){
				this.find('name','salesRepName')[0].focus();
			},this);return;};
				
		if(Ext.isEmpty(p.get('cudeVendorId'))){
			XMG.alert(SYS,M_CUDE_VENDOR_REQUIRED);return;
		}
		
		var xml = HTUtil.RTX(p,'FCustomsDeclaration',FCustomsDeclaration);
		var a = entryStore.getModifiedRecords();
		xml+=HTUtil.ATX(a,'FCustomsEntry',FCustomsEntry);		
				
		HTUtil.REQUEST('CUDE_S', xml, function(r){
			var c = HTUtil.XTR(r.responseXML,'FCustomsDeclaration',FCustomsDeclaration);
			HTUtil.RU(c, p, FCustomsDeclaration);
			
			var a = HTUtil.XTRA(r.responseXML,'FCustomsEntry',FCustomsEntry);
			HTUtil.RUA(entryStore, a, FCustomsEntry);
		});
	};
	this.expExcel=function(){
		if(p.dirty){			
			XMG.alert(SYS,M_DIRTY_PROMPT);
			return;
		}
		else 
			EXPC('CUDE','&id='+p.get('id'));
	};
	this.expEmail=function(){	
		p.beginEdit();
		this.getForm().updateRecord(p);
		p.endEdit();
		if(p.dirty){			
			XMG.alert(SYS,M_DIRTY_PROMPT);return;
		}
		else{
			var to='',cc='',sub='';
			var msg='';
			EXPM(to,cc,sub,msg,'CUDE','id='+p.get('id'));
		}
	};	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CUDE_U',id:p.get('id'),cudeStatus:s},
			success: function(r){
				p.set('cudeStatus',s);
				this.updateToolBar();
				XMG.alert(SYS,M_S);
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});
	};
	var m=M3_CUDE;
    this.updateToolBar=function(){
    	var s=p.get('cudeStatus');
    	var tb= this.getTopToolbar();		
		tb.getComponent('TB_D').setDisabled(NR(m+F_M)||s!=0);
		tb.getComponent('TB_E').setDisabled(NR(m+F_M)||s!=1);
		tb.getComponent('TB_F').setDisabled(NR(m+F_M)||s!=2);
		tb.getComponent('TB_M').setText(C_STATUS_C+HTStore.getCDST(p.get('cudeStatus')));
    };    
	var menu=CREATE_E_MENU(C_TRANS_BILL,this.expExcelTR,this.expEmailTR,function(){},this);	
	
	this.showExp = function(){
    	createWindow('EXPE_'+p.get("uuid"),C_EXPE+'-'+p.get('consNo'),
    			new Fos.ExpenseTab(p),true);
    };
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_ITEM_NO,dataIndex:'cuenNo',width:50,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_MANU_NO,dataIndex:'cuenManuNo',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CARGO_NO,dataIndex:'cuenCargoNo',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_GOODS_NAME,dataIndex:'cuenCargoNameCn',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CARGO_NAME_EN,dataIndex:'cuenCargoNameEn',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_SPEC,dataIndex:'cuenCargoSpec',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_QUANTITY,dataIndex:'cuenCargoNum',width:80,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_UNIT,dataIndex:'cuenCargoUnit',width:80,editor:new Ext.form.ComboBox({displayField:'unitCode',valueField:'unitCode',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S()})},
	{header:C_COUNTRY_DESTINATION,dataIndex:'cuenCountry',
			editor:new Ext.form.ComboBox({displayField:'counNameCn',valueField:'counCode',triggerAction: 'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})},
	{header:C_UNIT_PRICE,dataIndex:'cuenUnitPrice',width:80,align:'right',renderer:rateRender,editor:new Ext.form.NumberField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_TOTAL_PRICE,dataIndex:'cuenTotalPrice',width:80,align:'right',renderer:rateRender,editor:new Ext.form.NumberField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CURRENCY,dataIndex:'currCode',width:60,editor:new Ext.form.TextField()},
	{header:C_LEVY,dataIndex:'cuenLevyType',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_VERSION,dataIndex:'cuenVersion',width:80,editor:new Ext.form.TextField()}
	],defaults:{sortable:true,width:100}});
	this.entryGrid = new Ext.grid.EditorGridPanel({title:C_CUDE_CARGO_LIST,clicksToEdit:1,
		autoScroll:true,sm:sm,cm:cm,region:'center',
		store:entryStore,
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:function(){
				var t = new FCustomsEntry({cuenNo:'',consId:p.get('consId'),
					cuenCargoNo:'',cuenManuNo:'',cuenCargoNameEn:'',cuenCargoNameCn:'',cuenCargoSpec:'',
					cuenCargoNum:'',cuenCargoUnit:'',cuenCountry:'',cuenUnitPrice:'',cuenVersion:1,
					cuenTotalPrice:'',currCode:'USD',cuenLevyType:'',cuenRemarks:'',version:0,uuid:HTUtil.UUID(32)});
				entryStore.insert(0,t);
				t.set('rowAction','N');
				this.entryGrid.startEditing(0,1);
			}},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:function(){
				var r = sm.getSelections();
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');				
					entryStore.remove(r[i]);
				}
			}
		}]
	});	
	var tab = new Ext.TabPanel({height:600,plain:true,activeTab:0,
		listeners:{scope:this,tabchange:function(m,a){a.doLayout();}},
		items:[{title:C_CONS_INFO,layout:'column',frame:true,items:[
		       {columnWidth:.25,layout:'form',labelWidth:100,labelAlign:'right',border:false,items:[
				{fieldLabel:C_BOOKER,itemCls:'required',tabIndex:1,
					 name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custBookerFlag',
					 displayField:'custCode',valueField:'custNameCn',typeAhead:true,
					 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
					 listeners:{scope:this,
					 	blur:function(f){
					 		if(f.getRawValue()==''){
					 			p.set('custId','');
					 			p.set('custName','');
					 		}},
					 	select:function(c,r,i){
					 		this.find('name','custContact')[0].setValue(r.get('custContact'));
					 		this.find('name','custTel')[0].setValue(r.get('custTel'));
					 		this.find('name','custFax')[0].setValue(r.get('custFax'));
					 		p.set('custId',r.get('id'));
					 		p.set('custSname',r.get('custSname'));
					 	},
					 	keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}},
				{fieldLabel:C_CONS_DATE,itemCls:'required',name:'consDate',value:p.get('consDate'),
					value:p.get('consDate'),tabIndex:5,xtype:'datefield',format:DATEF,anchor:'95%'},
		        {fieldLabel:C_CUSTOM_AGENCY,itemCls:'required',name:'cudeVendorName',value:p.get('cudeVendorName'),tabIndex:9,
						store:HTStore.getCS(),enableKeyEvents:true,
		        	   tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		        	   xtype:'customerLookup',custType:'custCustomFlag',
                       displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
                       triggerAction:'all',selectOnFocus:true,anchor:'95%',
                       listeners:{scope:this,
                          blur:function(f){
							if(f.getRawValue()==''){f.clearValue();p.set('cudeVendorId','');p.set('cudeVendorName','');}},
                          select:function(c,r,i){
                            this.find('name','cudeVendorContact')[0].setValue(r.get('custContact'));
                           	this.find('name','cudeVendorTel')[0].setValue(r.get('custTel'));
                           	this.find('name','cudeVendorFax')[0].setValue(r.get('custFax'));
                           	p.set('cudeVendorId',r.get('id'));
                           	},
                           	keydown:{fn:function(f,e){LC(f,e,'custCustomFlag');},buffer:BF}}},
        		{fieldLabel:C_CUST_CUSTOMS_CODE,name:'custCustomsCode',value:p.get('custCustomsCode'),
                      tabIndex:13,xtype:'textfield',anchor:'95%'}
                ]},
                {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[
                    {fieldLabel:C_CONTACT,tabIndex:2,name:'custContact',
                    	value:p.get('custContact'),xtype:'textfield',anchor:'95%'},
                    {fieldLabel:C_DEPT,itemCls:'required',tabIndex:6,name:'grouName',
           	        	 value:p.get('grouName'),store:HTStore.getGROU_S(),
           	        	 xtype:'combo',displayField:'grouName',valueField:'grouName',typeAhead: true,mode: 'remote',
           	        	 triggerAction: 'all',selectOnFocus:true,anchor:'95%',
           	        	 listeners:{select:function(c,r,v){
           	        	 	p.set('grouId',r.get('id'));
           	         	}}},		          
                    {fieldLabel:C_CONTACT,tabIndex:10,name:'cudeVendorContact',
           	         		value:p.get('cudeVendorContact'),xtype:'textfield',anchor:'95%'},
					{fieldLabel:C_CUDE_TYPE,tabIndex:14,name:'cudeType',
                    	value:p.get('cudeType'),xtype:'combo',
						store:HTStore.CUTY_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
						mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
                ]},
                {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[
                    {fieldLabel:C_PHONE,tabIndex:3,name:'custTel',
                    	value:p.get('custTel'),xtype:'textfield',anchor:'95%'},
                    {fieldLabel:C_SALES,itemCls:'required',tabIndex:7,name:'salesRepName',value:p.get('salesRepName'),
                       	 store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',valueField:'userName',
                       	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
                       	 listeners:{select:function(c,r,v){
           	        	 	p.set('salesRepId',r.get('id'));
           	         	}}},		  
                    {fieldLabel:C_PHONE,tabIndex:11,name:'cudeVendorTel',value:p.get('cudeVendorTel'),xtype:'textfield',anchor:'95%'},
                    {fieldLabel:C_CARGO_NAME,tabIndex:15,name:'cargoName',value:p.get('cargoName'),xtype:'textfield',anchor:'95%'}
                ]},
                {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[
                     {fieldLabel:C_FAX,tabIndex:4,name:'custFax',
                    	 value:p.get('custFax'),xtype:'textfield',anchor:'95%'},
                     {fieldLabel:C_OPERATOR,itemCls:'required',tabIndex:8,name:'operatorName',
                           	 value:p.get('operatorName'),
                           	 store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
                           	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
                           	 listeners:{select:function(c,r,v){
               	        	 	p.set('operatorId',r.get('id'));
               	         	}}},		  
                     {fieldLabel:C_FAX,tabIndex:12,name:'cudeVendorFax',value:p.get('cudeVendorFax'),xtype:'textfield',anchor:'95%'}, 
                     {fieldLabel:'HS code',tabIndex:16,name:'hsCode',value:p.get('hsCode'),xtype:'textfield',anchor:'95%'}                        
                 ]},
                 {columnWidth:.75,layout:'form',border:false,items:[
                  	{fieldLabel:C_CUDE_REQUIREMENT,tabIndex:17,name:'cudeRequirement',value:p.get('cudeRequirement'),
                  		xtype:'textarea',height:150,anchor:'99%'},
                    {fieldLabel:C_REMARKS,tabIndex:18,name:'remarks',value:p.get('remarks'),
                  		xtype:'textarea',height:150,anchor:'99%'}                                             
                  ]},
                 {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',frame:true,items:[
                     {fieldLabel:C_DOC_RECEIVED_DATE,tabIndex:19,name:'docReceivedDate',value:p.get('docReceivedDate'),
                    	 xtype:'datefield',format:DATEF,anchor:'95%'},                         
                     {xtype:'checkbox',labelSeparator:'',boxLabel:C_CONTRACT,tabIndex:20,
                    	 name:'contractReceived',checked:p.get('contractReceived')=='1'},
                     {xtype:'checkbox',labelSeparator:'',boxLabel:C_INVOICE,tabIndex:21,
                      	name:'invoiceReceived',checked:p.get('invoiceReceived')=='1'},
                  	{xtype:'checkbox',labelSeparator:'',boxLabel:C_CONTAINER_PACKING_LIST,tabIndex:22,
                      	name:'packingListReceived',checked:p.get('packingListReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_TRAFFIC_BILL,tabIndex:23,
                        name:'blReceived',checked:p.get('blReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_MANUAL,tabIndex:24,
                        name:'manualReceived',checked:p.get('manualReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_CERTIFICATE_DOC,tabIndex:25,
                        name:'licenceReceived',checked:p.get('licenceReceived')=='1'}
                 ]}
			]
		},
		{layout:'border',title:C_CUST_INFO,items:[
			{region:'north',height:320,frame:true,items:[
			{layout:'column',border:false,items:[
               {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
                {fieldLabel:C_PRE_NO,name:'cudePreNo',tabIndex:1,
                	value:p.get('cudePreNo'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_PORT_EX:C_PORT_IM,tabIndex:5,
					itemCls:'required',name:'cudePortDomestic',value:p.get('cudePortDomestic'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_BIZ_COMPANY,name:'cudeCustomer',value:p.get('cudeCustomer'),tabIndex:9,
						itemCls:'required',xtype:'textfield',anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_SHIPPER_COMPANY:C_CONSIGN_COMPANY,tabIndex:13,
					name:'cudeShipper',value:p.get('cudeShipper'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CERTIFICATE_NO,name:'cudeCertificateNo',value:p.get('cudeCertificateNo'),
						tabIndex:17,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_APPROVAL_NO,name:'cudeApprovalNo',value:p.get('cudeApprovalNo'),
					tabIndex:21,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CONTRACT_NO_A,name:'consContractNo',value:p.get('consContractNo'),tabIndex:25,
					itemCls:'needed',xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
                {fieldLabel:C_CUSTOMS_NO,name:'cudeCustomsNo',value:p.get('cudeCustomsNo'),
                	tabIndex:2,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_RECORD_NO,name:'cudeRecordNo',value:p.get('cudeRecordNo'),
                	tabIndex:6,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_TRAT,itemCls:'required',name:'tratCode',value:p.get('tratCode'),
                	tabIndex:10,store:HTStore.getTRAT_S(),
					xtype:'combo',displayField:'tratName',valueField:'tratName',typeAhead:true,
					mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:C_TRTY,itemCls:'required',name:'trtyCode',value:p.get('trtyCode'),
					tabIndex:14,store:HTStore.getTRTY_S(),
					xtype:'combo',displayField:'trtyName',valueField:'trtyName',typeAhead:true,
					mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_COD_A:C_COL_A,itemCls:'required',
					tabIndex:18,name:'cudeCountry',value:p.get('cudeCountry'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CUDE_TRTE,name:'trteCode',value:p.get('trteCode'),itemCls:'required',
					tabIndex:22,store:HTStore.getTRTE_S(),xtype:'combo',displayField:'trteName',
					valueField:'trteName',typeAhead:true,mode:'remote',triggerAction:'all',
					selectOnFocus:true,anchor:'95%'},
				{fieldLabel:C_PACKAGES,name:'cudePackageNum',value:p.get('cudePackageNum'),
					tabIndex:26,itemCls:'required',xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border : false,items:[					
				{fieldLabel:p.get('consBizClass')==BC_E?C_EX_DATE:C_IM_DATE,name:'cudeEntryDate',value:p.get('cudeEntryDate'),
					tabIndex:3,xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_CONVEYANCE_NAME,name:'cudeConveyance',value:p.get('cudeConveyance'),
					tabIndex:7,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_LETY,name:'letyCode',value:p.get('letyCode'),
					tabIndex:11,store:HTStore.getLETY_S(),xtype:'combo',
					displayField:'letyName',valueField:'letyName',typeAhead:true,
					mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_POD_A:C_POL,itemCls:'required',
					tabIndex:15,name:'cudePortForeign',value:p.get('cudePortForeign'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_FREIGHT,name:'cudeFreight',value:p.get('cudeFreight'),
					tabIndex:19,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CHARGE,name:'cudeCharge',value:p.get('cudeCharge'),
					tabIndex:23,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_PACK,name:'packCode',value:p.get('packCode'),
					tabIndex:27,itemCls:'required',xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border : false,items:[					
				{fieldLabel:C_DECLARE_DATE,name:'cudeDeclarDate',value:p.get('cudeDeclarDate'),
					tabIndex:4,xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_TRAFFIC_NO,name:'cudeBlNo',value:p.get('cudeBlNo'),
					tabIndex:8,xtype:'textfield',anchor:'95%'},
				p.get('consBizClass')==BC_E?{fieldLabel:C_EXSE,itemCls:'required',name:'exseCode',value:p.get('exseCode'),
					tabIndex:12,store:HTStore.getEXSE_S(),xtype:'combo',displayField:'exseName',
					valueField:'exseName',typeAhead:true,mode:'remote',triggerAction:'all',
					selectOnFocus:true,anchor:'95%'}:
				{fieldLabel:C_LEVY_PERCENT,name:'cudeLevyPercent',value:p.get('cudeLevyPercent'),
					tabIndex:12,xtype:'textfield',anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_ORI_PLACE_D:C_DES_PLACE_D,itemCls:'required',
					tabIndex:16,name:'cudePlace',value:p.get('cudePlace'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_INSURANCE_FEE,name:'cudeInsurance',value:p.get('cudePlace'),
					tabIndex:20,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_GW_S+C_KGS,name:'cudeGrossWeight',value:p.get('cudePlace'),
					tabIndex:24,itemCls:'required',xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_MW_S+C_KGS,name:'cudeNetWeight',value:p.get('cudePlace'),
					tabIndex:28,itemCls:'required',xtype:'textfield',anchor:'95%'}]}
			]},				
			{layout:'column',border:false,items:[
			{columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
                {fieldLabel:C_ATTACHED_DOCS,name:'cudeAttachedDocs',value:p.get('cudeAttachedDocs'),
                	tabIndex:29,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CONTAINER_NO,name:'cudeContainerNo',value:p.get('cudeContainerNo'),
                	tabIndex:31,xtype:'textarea',anchor:'95%'}]},
			{columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[					
				p.get('consBizClass')=='E'?{fieldLabel:C_MANUFACTURE,name:'cudeManu',value:p.get('cudeManu'),
					tabIndex:30,xtype:'textfield',anchor:'95%'}:
					{fieldLabel:'用途',name:'usagCode',value:p.get('usagCode'),store:HTStore.getUSAG_S(),xtype:'combo',
					tabIndex:30,displayField:'usagCode',valueField:'usagCode',typeAhead:true,mode:'remote',
					triggerAction:'all',selectOnFocus:true,anchor:'95%'},
			{fieldLabel:C_MARKS_REMARKS,name:'cudeMarks',value:p.get('cudeMarks'),
					tabIndex:31,xtype:'textarea',anchor:'95%'}]}]}			
			]},
			this.entryGrid
		]},			
		{title:C_CUDE_RECORD,layout:'column',layoutConfig:{columns:4},frame:true,items: [
			{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
			{fieldLabel:C_DOC_SEND_DATE,name:'cudeDocSendDate',value:p.get('cudeDocSendDate'),
				tabIndex:1,xtype:'datefield',format:DATEF,anchor:'95%'},
			{fieldLabel:C_DOC_BACK_DATE,name:'cudeDocRecvDate',value:p.get('cudeDocRecvDate'),
				tabIndex:5,xtype:'datefield',format:DATEF,anchor:'95%'},
		    {fieldLabel:C_TRANSITED_FLAG,name:'cudeTransitedFlag',checked:p.get('cudeTransitedFlag')==1,
				tabIndex:9,xtype:'checkbox',anchor:'95%'}]},
		    {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
		        {fieldLabel:C_CUDE_DOC_NUN,name:'cudeDocNum',value:p.get('cudeDocNum'),
		        	tabIndex:2,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_REFUNC_DATE,name:'cudeRefuncDate',value:p.get('cudeRefuncDate'),
		        	tabIndex:6,xtype:'datefield',format:DATEF,anchor:'95%'},
		        {fieldLabel:C_REFUND_FLAG,name:'cudeRefundFlag',checked:p.get('cudeRefuncDate')==1,
		        	tabIndex:10,xtype:'checkbox',anchor:'95%'}]},
		     {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
				{fieldLabel:C_CUDE_DOC_COLOR,name:'cudeDocColor',value:p.get('cudeDocColor'),xtype:'combo',
					tabIndex:3,store:HTStore.DC_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
					mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:C_CUDE_RELEASE_DATE,name:'cudeReleaseDate',value:p.get('cudeReleaseDate'),
					tabIndex:7,xtype:'datefield',format:DATEF,anchor:'95%'},
		        {fieldLabel:C_INSPECTION_FLAG,name:'cudeInspectionFlag',checked:p.get('cudeInspectionFlag')==1,
					tabIndex:11,xtype:'checkbox',anchor:'95%'}]},
		     {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
		        {fieldLabel:C_REFUND_DOC_NUN,name:'cudeRefundDocNum',value:p.get('cudeRefundDocNum'),
		        	tabIndex:4,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_SHUTOUT_DATE,name:'cudeShutoutDate',value:p.get('cudeShutoutDate'),
		        	tabIndex:8,xtype:'datefield',format:DATEF,anchor:'95%'},
		        {fieldLabel:C_CUDE_OPEN_FLAG,name:'cudeOpenFlag',value:p.get('cudeOpenFlag'),
		        	tabIndex:12,xtype:'checkbox',anchor:'95%'}]},
		     {columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
		        {fieldLabel:C_CUDE_TAX_LEVY,name:'cudeTaxLevy',value:p.get('cudeTaxLevy'),
		        	tabIndex:13,xtype:'textarea',anchor:'95%'}]},
			 {columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
			    {fieldLabel:C_REMARKS,name:'cudeRemarks',value:p.get('cudeRemarks'),
			    	tabIndex:14,xtype:'textarea',anchor:'95%'}]},
			 {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
			    {fieldLabel:C_DECLARENT,name:'cudeDeclarent',value:p.get('cudeDeclarent'),
			    	tabIndex:15,xtype:'textfield',anchor:'95%'}]}
			]}
		]});
	
	Fos.CudeTab.superclass.constructor.call(this,{labelWidth:80,
		tbar:[
		      {text:C_SAVE,itemId:'TB_C',disabled:NR(m+F_M),iconCls:'save',scope:this,handler:this.save},'-',
		      {text:C_APPLY,itemId:'TB_D',disabled:NR(m+F_M),iconCls:'docpass',scope:this,handler:function(){this.updateStatus('1');}},'-',
		      {text:C_CUSTOMS_PASSED,itemId:'TB_E',disabled:NR(m+F_M),iconCls:'pass',scope:this,handler:function(){this.updateStatus('2');}},'-',
		      {text:C_CUSTOMS_EXIT,itemId:'TB_F',disabled:NR(m+F_M),iconCls:'exit',scope:this,handler:function(){this.updateStatus('3');}},'-',
		      {text:C_EXPORT,disabled:NR(m+F_M),iconCls:'print',scope:this,
			menu: {items: [
	   		{text:C_CUST_BILL,menu:{items:[
	   			{text:'Excel',scope:this,handler:this.expExcel},
	   			{text:C_EMAIL,scope:this,handler:this.expEmail},
	   			{text:C_FAX,scope:this,handler:function(){}}]}}
	   		]}},'-',
	   		{text:C_EXPE,iconCls:'dollar',scope:this,handler:this.showExp},'-',
			'->',
			{itemId:'TB_M',xtype:'tbtext',text:C_STATUS_C+HTStore.getCDST(p.get('cudeStatus'))}
	   		],
		items:[tab]
	});
};
Ext.extend(Fos.CudeTab, Ext.form.FormPanel);

Fos.CudeLookupWin = function(store){    
	this.reload=function(){
     	var a=[];var op=1;     	
 		var custId=panel.find('name','custId')[0].getValue();
 		if(custId) a[a.length]=new QParam({key:'custId',value:custId,op:op}); 
 		var consCompany=panel.find('name','consCompany')[0].getValue();        		
 		if(consCompany) a[a.length]=new QParam({key:'consCompany',value:consCompany,op:op});
 		var consSalesRepId=panel.find('name','consSalesRepId')[0].getValue();        		
 		if(consSalesRepId) a[a.length]=new QParam({key:'consSalesRepId',value:consSalesRepId,op:op});
 		var consOperatorId=panel.find('name','consOperatorId')[0].getValue();        		
 		if(consOperatorId) a[a.length]=new QParam({key:'consOperatorId',value:consOperatorId,op:op});
 		
 		var consDate=panel.find('name','consDate')[0].getValue();
 		var consDate2=panel.find('name','consDate2')[0].getValue();
 		if(consDate && consDate2){
 			a[a.length]=new QParam({key:'consDate',value:consDate.format(DATEF),op:5});
 			a[a.length]=new QParam({key:'consDate',value:consDate2.format(DATEF),op:3});
 		}
 		else if(consDate) a[a.length]=new QParam({key:'consDate',value:consDate.format(DATEF),op:op});
 		
 		var consCloseDate=panel.find('name','consCloseDate')[0].getValue();
 		var consCloseDate2=panel.find('name','consCloseDate2')[0].getValue();
 		if(consDate && consCloseDate2){
 			a[a.length]=new QParam({key:'consCloseDate',value:consCloseDate.format(DATEF),op:5});
 			a[a.length]=new QParam({key:'consCloseDate',value:consDate2.format(DATEF),op:3});
 		}
 		else if(consCloseDate) a[a.length]=new QParam({key:'consCloseDate',value:consCloseDate.format(DATEF),op:op});
 		
 		var consCustomsDeclearDate=panel.find('name','consCustomsDeclearDate')[0].getValue();
 		var consCustomsDeclearDate2=panel.find('name','consCustomsDeclearDate2')[0].getValue();
 		if(consCustomsDeclearDate && consCustomsDeclearDate2){
 			a[a.length]=new QParam({key:'consCustomsDeclearDate',value:consCustomsDeclearDate.format(DATEF),op:5});
 			a[a.length]=new QParam({key:'consCustomsDeclearDate',value:consCustomsDeclearDate2.format(DATEF),op:3});
 		}
 		else if(consCustomsDeclearDate) 
 			a[a.length]=new QParam({key:'consCustomsDeclearDate',value:consCustomsDeclearDate.format(DATEF),op:op});
 		
 		var consVerificationNo=panel.find('name','consVerificationNo')[0].getValue();        		
 		if(consVerificationNo) a[a.length]=new QParam({key:'consVerificationNo',value:consVerificationNo,op:op});
 		
 		var consRefNo=panel.find('name','consRefNo')[0].getValue();        		
 		if(consRefNo) a[a.length]=new QParam({key:'consRefNo',value:consRefNo,op:op});
 		
 		var consStatusAud=panel.find('name','consStatusAud')[0].getValue();        		
 		if(consStatusAud) a[a.length]=new QParam({key:'consStatusAud',value:consStatusAud,op:op});
 		var consStatusAr=panel.find('name','consStatusAr')[0].getValue();        		
 		if(consStatusAr) a[a.length]=new QParam({key:'consStatusAr',value:consStatusAr,op:op});
 		var consStatusAp=panel.find('name','consStatusAp')[0].getValue();        		
 		if(consStatusAp) a[a.length]=new QParam({key:'consStatusAp',value:consStatusAp,op:op});
 		var consStatusInvoR=panel.find('name','consStatusInvoR')[0].getValue();        		
 		if(consStatusInvoR) a[a.length]=new QParam({key:'consStatusInvoR',value:consStatusInvoR,op:op});
 		var consStatusInvoP=panel.find('name','consStatusInvoP')[0].getValue();        		
 		if(consStatusInvoP) a[a.length]=new QParam({key:'consStatusInvoP',value:consStatusInvoP,op:op});
 		var consStatusExp=panel.find('name','consStatusExp')[0].getValue();        		
 		if(consStatusExp) a[a.length]=new QParam({key:'consStatusExp',value:consStatusExp,op:op});
     	
     	store.baseParams={_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
     	store.reload({params:{start:0,limit:C_PS},
     		callback:function(r){
     			if(r.length==0) 
     				XMG.alert(SYS,M_NOT_FOUND);
     			}
     	});
     	this.close();
	};		
		
	var panel = new Ext.Panel({plain:true,height:340,layout:'column',
		defaults:{bodyStyle:'padding:10px'},items:
			[{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	    	items:[{fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),enableKeyEvents:true,
				 xtype:'customerLookup',custType:'custBookerFlag',
				 displayField:'custCode',valueField:'custNameCn',typeAhead:true,
				 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
				 anchor:'95%',
              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:500}}},			
			{fieldLabel:C_BIZ_COMPANY,name:'consCompany',xtype:'textfield',anchor:'90%'},			
        	{fieldLabel:C_OPERATOR,name:'consOperatorId',store:HTStore.getOP_S(),xtype:'combo',
              	displayField:'userLoginName',valueField:'userId',typeAhead: true,
              	mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
        	{fieldLabel:C_SALES,name:'consSalesRepId',store:HTStore.getSALE_S(),xtype:'combo',
              	displayField:'userLoginName',valueField:'userId',typeAhead: true,
              	mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
         	{fieldLabel:C_CONS_AUDIT_STATUS,name:'consStatusAud',xtype:'combo',
              	store:HTStore.AUST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
              	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
         	{fieldLabel:C_WRITEOFF_STATUS_R,name:'consStatusAr',xtype:'combo',
              	store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
              	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
      	{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
   		items:[{fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'90%'},
        	{fieldLabel:C_CONS_CLOSE_DATE,name:'consCloseDate',xtype:'datefield',format:DATEF,anchor:'90%'},
        	{fieldLabel:C_CUSTOMS_DECLEAR_DATE,name:'consCustomsDeclearDate',xtype:'datefield',format:DATEF,anchor:'90%'},
        	{fieldLabel:C_VERIFICATION_NO,name:'consVerificationNo',xtype:'textfield',anchor:'90%'},
			{fieldLabel:C_INVO_STATUS_R,name:'consStatusInvoR',xtype:'combo',
        		store:HTStore.INST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
        		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
			{fieldLabel:C_WRITEOFF_STATUS_P,name:'consStatusAp',xtype:'combo',
        		store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
        		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
		{columnWidth:.34,layout:'form',border:false,labelWidth:80,labelAlign:"right",
		items:[{fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
        	{fieldLabel:C_TO,name:'consCloseDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
        	{fieldLabel:C_TO,name:'consCustomsDeclearDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
         	{fieldLabel:C_REF_NO,name:'consRefNo',xtype:'textfield',anchor:'90%'},
			{fieldLabel:C_EXPE_CONFIRM_STATUS,name:'consStatusExp',xtype:'combo',
         		store:HTStore.EXPC_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
         		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
			{fieldLabel:C_INVO_STATUS_P,name:'consStatusInvoP',xtype:'combo',
         		store:HTStore.INST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
         		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}
		]}
	]});
    Fos.CudeLookupWin.superclass.constructor.call(this, {title:C_CONS_QUERY,iconCls:'search',modal:true,
    	width:800,height:260,buttonAlign:'right',items:panel,
		buttons:[{text:C_OK,scope:this,handler:this.reload},
		         {text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.CudeLookupWin, Ext.Window);