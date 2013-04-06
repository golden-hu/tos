var getMarinePanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});
    var panels=[];	
	var items=[];	
	
	if(HR(M1_MARINE+MARINE_E_FCL)||HR(M1_MARINE+MARINE_E_LCL)||HR(M1_MARINE+MARINE_E_BULK)){
		var items=[];
		if(HR(M1_MARINE+MARINE_E_FCL))
			items[items.length]=FosMenu(panel,C_EXP_F,'G_CONS_E_M_FCL',function(){return new Fos.ConsignGrid('E','M','FCL');});
		if(HR(M1_MARINE+MARINE_E_LCL))
			items[items.length]=FosMenu(panel,C_EXP_L,'G_CONS_E_M_LCL',function(){return new Fos.ConsignGrid('E','M','LCL');});
		if(HR(M1_MARINE+MARINE_E_BULK))
			items[items.length]=FosMenu(panel,C_EXP_B,'G_CONS_E_M_BULK',function(){return new Fos.ConsignGrid('E','M','BULK');});
		//items[items.length] = {text:C_EXP,menu:menuExp};	
		
		var expPanel = new Ext.Panel({title:C_EXP,collapsible:true,layout:'fit',
			items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		panels[panels.length]=expPanel;
	}
	if(HR(M1_MARINE+MARINE_I_FCL)||HR(M1_MARINE+MARINE_I_LCL)||HR(M1_MARINE+MARINE_I_BULK)){
		items=[];
		if(HR(M1_MARINE+MARINE_I_FCL))
			items[items.length]=FosMenu(panel,C_IMP_F,'G_CONS_I_M_FCL',function(){return new Fos.ConsignGrid('I','M','FCL');});	
		
		if(HR(M1_MARINE+MARINE_I_LCL))
			items[items.length]=FosMenu(panel,C_IMP_L,'G_CONS_I_M_LCL',function(){return new Fos.ConsignGrid('I','M','LCL');});		
		
		if(HR(M1_MARINE+MARINE_I_BULK))
			items[items.length]=FosMenu(panel,C_IMP_B,'G_CONS_I_M_BULK',function(){return new Fos.ConsignGrid('I','M','BULK');});		
		//bottons[bottons.length] = {text:C_IMP,menu:menuImp};	
		var impPanel = new Ext.Panel({title:C_IMP,collapsible:true,layout:'fit',
			items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		panels[panels.length]=impPanel;
	}
	if(HR(M1_MARINE+M2_DOC)){
		items=[];
		items[items.length]=FosMenu(panel,C_DOC_ALL,'G_DOC_A',function(){return new Fos.DocGrid('A');});
		items[items.length]=FosMenu(panel,C_DOC_NOT_RETURN,'G_DOC_B',function(){return new Fos.DocGrid('B');});
		items[items.length]=FosMenu(panel,C_DOC_RETURN_NOT_BACK,'G_DOC_C',function(){return new Fos.DocGrid('C');});
		items[items.length]=FosMenu(panel,C_DOC_BACK,'G_DOC_D',function(){return new Fos.DocGrid('D');});
		//bottons[bottons.length] = {text:C_DOC,menu:menuDoc};
		var docPanel = new Ext.Panel({title:C_DOC,collapsible:true,layout:'fit',
			items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		panels[panels.length]=docPanel;
	}
	if(HR(M1_MARINE+MARINE_VOY)){
		items=[];
		items[items.length] = {text:C_SHIP_DATE,
				handler:function(){
					panel.setActiveTab(panel.add(new Fos.GVoyaGrid()));
							}
		};
		var shipDatePanel = new Ext.Panel({title:C_SHIP_DATE,collapsible:true,layout:'fit',
			items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		panels[panels.length]=shipDatePanel;
	}
	
	var menuPanel = new Ext.Panel({region:"west",width:"130",collapsible:true,collapseMode:'mini',split:true,
		layout:'accordion',title:C_SYSTEM_MENU,items:panels});
	
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]
		
	});
	
	return contPanel;
};
Fos.ConsignGrid = function(bizClass,bizType,shipType) {
	var queryParams=[];	
	queryParams[queryParams.length]=new QParam({key:'consBizClass',value:bizClass,op:1});
	queryParams[queryParams.length]=new QParam({key:'consBizType',value:bizType,op:1});
	if(shipType!='') 
		queryParams[queryParams.length]=new QParam({key:'consShipType',value:shipType,op:1});
	var bp={_mt:'xml',xml:HTUtil.QATX(queryParams)};
	var store = new Ext.data.GroupingStore({
   		url: SERVICE_URL + '?_A=CONS_X',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FConsign'}, FConsign),
    	remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});
			
	var sm=new Ext.grid.RowSelectionModel({singleSelect:true});
	var c1=new Ext.grid.RowNumberer();
	var c2={header:'',dataIndex:'consStatusLock',menuDisabled:true,fixed:true,width:25,renderer:function(v){
               if(v==1) return '<div class="locked"></div>'; else return '';
         }};
    var c3={header:C_M_CONS,width:30,hidden:shipType!=ST_L,dataIndex:"consMasterFlag",renderer:boolRender};
    var c4={header:C_STATUS,width:80,dataIndex:"consStatus",renderer:bizClass==BC_E?HTStore.getCOST:HTStore.getCIST};
    var c5={header:C_CONS_NO,width:120,dataIndex:"consNo"};
    var c6={header:C_BOOKER,width:200,dataIndex:"custName"};
    var c7={header:C_CONS_DATE,width:70,dataIndex:"consDate",renderer:formatDate};
    var c8={header:C_TTER,dataIndex:"tranCode",width:60};
    var c9={header:C_PATE,dataIndex:"pateCode",width:60};
    var c10={header:C_SHIP_TYPE,dataIndex:"consShipType",width:60};
    var c11={header:C_VESS,width:100,dataIndex:"vessName"};
    var c12={header:C_VOYA,width:80,dataIndex:"voyaName"};
    var c13={header:C_SAIL_DATE,dataIndex:"consEtd",renderer:formatDate};
    var c14={header:C_POL,dataIndex:"consPolEn"};
    var c15={header:C_POD,width:100,dataIndex:"consPodEn"};
    var c16={header:bizType==BT_A?'MAWB No.':C_MBL_NO,width:80,dataIndex:"consMblNo"};
    var c17={header:bizType==BT_A?'HAWB No.':C_HBL_NO,width:80,dataIndex:"consHblNo"};
    var c18={header:C_PACKAGES,width:80,dataIndex:"consTotalPackages",align:'right',css:'font-weight:bold;'};
    var c19={header:C_GROSS_WEIGHT,width:80,dataIndex:"consTotalGrossWeight",renderer:rateRender,align:'right',css:'font-weight:bold;'};
    var c20={header:C_CBM,width:80,dataIndex:"consTotalMeasurement",renderer:rateRender,align:'right',css:'font-weight:bold;'};
    
    var c21={header:C_CONT_INFO,width:80,dataIndex:"consContainersInfo"};
    var c22={header:C_CONT_NUM,width:80,dataIndex:"consTotalContainers",align:'right',renderer:function(v){return (v)?v:0;},css:'font-weight:bold;'};
    var c23={header:C_POT,dataIndex:"consPotEn"};
    var c24={header:C_CARRIER,dataIndex:"consCarrierName"};
    var c25={header:C_BOOK_AGENCY,dataIndex:"consBookingAgencyName"};
    var c26={header:C_M_CONS_NO,width:120,hidden:shipType!=ST_L,dataIndex:"consMasterNo"};
    var c27={header:C_REMARKS,dataIndex:"consRemarks"};
    var c28={header:C_CONTRACT_NO,dataIndex:"consContractNo"};
    var c29={header:C_CARGO_OWNER,width:200,dataIndex:"consCargoOwnerName"};
	
	var c30={header:C_BL_PACKAGES,width:80,dataIndex:"blCargoPackages",align:'right',css:'font-weight:bold;'};
    var c31={header:C_BL_GW,width:80,dataIndex:"blCargoGrossWeight",renderer:rateRender,align:'right',css:'font-weight:bold;'};
    var c32={header:C_BL_CBM,width:80,dataIndex:"blCargoMeasurement",renderer:rateRender,align:'right',css:'font-weight:bold;'};
	
    var c35={header:C_OPERATOR,width:80,dataIndex:"consOperatorName"};    
    var c36={header:C_ETA,dataIndex:"consEta",renderer:formatDate};
    
    var cm=new Ext.grid.ColumnModel({columns:
    	shipType==ST_B?[c1,c2,c3,c4,c5,c28,c35,c6,c29,c7,c8,c9,c10,c11,c12,c13,c36,c14,c15,c16,c17,c18,c19,c20,c30,c31,c32,c23,c24,c25,c26,c27]:
    	[c1,c2,c3,c4,c35,c5,c6,c7,c8,c9,c10,c11,c12,c13,c36,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28],
		defaults: {sortable: true}});
    var newConsign = function(bc,bt,st){
    	var c = new FConsign({uuid:HTUtil.UUID(32),
    		consNotifyParty:'SAME AS CONSIGNEE',
    		consShipType:st,consBizClass:bc,consBizType:bt,
    		consMasterFlag:st=='LCL'?1:0,
    		consSource:0,
    		consDate:new Date(),
    		tranCode:st=='LCL'?'CFS-CFS':'CY-CY',
    		consStatus:0,consStatusExp:0,consStatusAr:0,consStatusAp:0,
    		consStatusInvoR:0,consStatusInvoP:0,consStatusAud:0,consStatusLock:0,    				
    		consTransFlag:0,consPartialFlag:0,
    		consPol:bc==BC_E?HTStore.getCFG('BASE_PORT'):'',
    		consPolEn:bc==BC_E?HTStore.getCFGD('BASE_PORT'):'',
    		consPod:bc==BC_I?HTStore.getCFG('BASE_PORT'):'',
    		consPodEn:bc==BC_I?HTStore.getCFGD('BASE_PORT'):'',
    		deptId:HTStore.getCFG('DEFAULT_DEPT_'+bt),
    		consOperatorId:sessionStorage.getItem("USER_ID"),
    		consOperatorName:sessionStorage.getItem("USER_NAME"),
    		consFumigateFlag:0,consQuarantineFlag:0,consTransferringFlag:0,
    		consContainersInfo:shipType=='FCL'?'FCL':'',
    		consSendSingleAddress:HTStore.getCFG('COMPANY_ADDRESS_CN'),
    		version:0,rowAction:'N'});
    	return c;
    };
    
    this.showConsign = function(p){
    	createWindow('CONS_'+p.get("uuid"),p.get('rowAction')=='N'?C_ADD_CONSIGN:C_CONSIGN+'-'+p.get('consNo'),new Fos.ConsignTab(p),true);
    };
    
	this.consolidate = function(){
		var c=sm.getSelected();
		if(c.get('consMasterFlag')=='1'){
			var b=newConsign(bizClass,bizType,shipType);
			b.set('consMasterFlag','0');
			b.set('consMasterId',c.get('id'));
			b.set('consMasterNo',c.get('consNo'));
			b.set('vessName',c.get('vessName'));
			b.set('vessNameEn',c.get('vessNameEn'));
			b.set('voyaName',c.get('voyaName'));
			b.set('consPolEn',c.get('consPolEn'));
			b.set('consPodEn',c.get('consPodEn'));
			b.set('consPotEn',c.get('consPotEn'));
			b.set('consTranCountry',c.get('consTranCountry'));
			b.set('consTradeCountry',c.get('consTradeCountry'));
			b.set('consOverseaAgency',c.get('consOverseaAgency'));			
			b.set('consOverseaAgencyName',c.get('consOverseaAgencyName'));
			b.set('consHarbour',c.get('consHarbour'));
			b.set('consCfs',c.get('consCfs'));
			b.set('consCfsName',c.get('consCfsName'));
			b.set('consBookingAgency',c.get('consBookingAgency'));
			b.set('consBookingAgencyName',c.get('consBookingAgencyName'));
			b.set('consCarrier',c.get('consCarrier'));
			b.set('consCarrierName',c.get('consCarrierName'));
			this.showConsign(b);
		}
		else XMG.alert(SYS,M_SEL_M_CONS);
	};
	this.addConsign = function(){
		var c=newConsign(bizClass,bizType,shipType);
		this.showConsign(c);
	};
	this.editConsign = function(){
		var b=sm.getSelected();
		if(b) 
			this.showConsign(b); 
		else 
			XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.task = function(){
		var b=sm.getSelected();
		if(b){var w=new Fos.TaskWin(b);w.show();}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};	
	this.removeConsign = function(){
		var a =sm.getSelections();
       	if(a.length){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var b = false;
               	for(var i=0;i<a.length;i++){
               		if(a[i].get('consStatus')!=0&&a[i].get('consStatus')!=6){
               			b=true;
               			break;
               		}
               	}
               	if(b) 
               		XMG.alert(SYS,M_CONS_CONFIRMED);
               	else {
               		var xml = HTUtil.SMTX4R(sm,'FConsign');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'CONS_S'},
					success: function(){
               			sm.each(function(p){
               				store.remove(p);
               			});
               			XMG.alert(SYS,M_S);
               		},
					failure: function(r,o){
               			XMG.alert(SYS,M_F+r.responseText);
               		},
					xmlData:HTUtil.HTX(xml)});
               	}
           }});
		}
       	else XMG.alert(SYS,M_R_P);
    };
	this.search = function(){
		var w=new Fos.ConsLookupWin(bizClass,bizType,shipType,'CONS_X',store,queryParams);
		w.show();
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.fastSearch();
			}
		}
	});
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	a[a.length]=new QParam({key:'consBizClass',value:bizClass,op:EQ});
     	a[a.length]=new QParam({key:'consBizType',value:bizType,op:EQ});
     	if(shipType!='') 
     		a[a.length]=new QParam({key:'consShipType',value:shipType,op:EQ});
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
     	queryParams = a;
     	store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
     	store.reload({params:{start:0,limit:C_PS},callback:function(r){
     		if(r.length==0) 
     			XMG.alert(SYS,M_NOT_FOUND);
     		}
     	});
	};
	this.exp=function(){
		if(store.baseParams.xml)
			EXPC('CONS_LIST','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else
			EXPC('CONS_LIST','&sort=id&dir=ASC');
		
	};
  	var title=HTStore.getBT(bizType);
  	title+=HTStore.getBC(bizClass);
	if(bizClass==BC_I&&shipType=='LCL') 
		title+=C_SWITCH; 
	else 
		title+=HTStore.getSHTY(shipType);
	title+=C_CONS_LIST;
	
	var m=M3_CONS;
	
	var b1={text:C_ADD,disabled:false,iconCls:'add',scope:this,handler:this.addConsign};
	var b2={text:C_CONSOLIDATE,disabled:NR(m+F_M),iconCls:'add',scope:this,handler:this.consolidate};
	var b3={text:C_EDIT,disabled:NR(m+F_V),iconCls:'option',scope:this,handler:this.editConsign};
	var b4={text:C_REMOVE,disabled:NR(m+F_M),iconCls:'remove',scope:this,handler:this.removeConsign};
	var b5={text:C_SEARCH,iconCls:'search',scope:this,handler:this.search};	
	var b6={text:C_EXPORT,disabled:NR(m+F_M),iconCls:'print',scope:this,handler:this.exp};	
	var b8={text:C_FAST_SEARCH,iconCls:'search',scope:this,handler:this.fastSearch};
	var b10={text:C_TASK,iconCls:'task',scope:this,handler:this.task};	
	
    var tbs=[b1, '-',b3,'-',b4,'-',b5,'-',b6,'-',kw,b8,'-',b10,'-'];
    if(shipType==ST_B) 
    	tbs=[b1, '-',b3,'-',b4,'-',b5,'-',b6,'-',kw,b8,'-',b10,'-'];
    else if (bizType==BT_M&&bizClass==BC_E&&shipType==ST_L)  
    	tbs=[b1, '-',b2,'-',b3,'-',b4,'-',b5,'-',b6,'-',kw,b8,'-',b10,'-'];
    
	Fos.ConsignGrid.superclass.constructor.call(this, {
	    id:'G_CONS_'+bizClass+'_'+bizType+(shipType==''?'':'_'+shipType),iconCls:'grid',
	    store: store,title:title,header:false,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,ddGroup:'consGridDDGroup',
		enableDragDrop:shipType=='LCL'?true:false,view:new Ext.grid.GroupingView(groupViewCfg),
		listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var c=sm.getSelected();
				if(c){this.showConsign(c);
				}
			},
			render: function(g) {
				var target = g.getView().el.dom.childNodes[0].childNodes[1];
				var firstGridDropTarget = new Ext.dd.DropTarget(target, {
					ddGroup:'consGridDDGroup',
					copy:false,
					notifyDrop : function(ddSource, e, data){
						var rfrom = g.getStore().getById(data.selections[0].id);
						var t = Ext.lib.Event.getTarget(e);
						var rindex = g.getView().findRowIndex(t);
						var rto = g.getStore().getAt(rindex);
						if(rto.get('consMasterFlag')!='1'||rfrom.get('consMasterId')==rto.get('id')) return false;
						var t=new Ext.Template(M_LCL_TRANS);
						var msg=t.apply([rfrom.get('consNo'),rto.get('consNo')]);
						Ext.Msg.confirm(SYS,msg,function(btn){
	    					if (btn == 'yes'){
	        					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
									params:{A:'CONS_MNO_U',consMasterFlag:0,consMasterId:rto.get('id'),consMasterNo:rto.get('consNo'),id:rfrom.get('id')},
									success: function(r){store.reload(store.lastOptions);XMG.alert(SYS,M_S);return true;},
									failure: function(r){XMG.alert(SYS,M_F+r.responseText); return false;}
								});					
	    					}
	    					else return false;
						});					
					}
				}); 
			}
		},
		tbar:tbs,bbar:PTB(store,C_PS)});
	    store.load({params:{start:0,limit:C_PS}
    });
};
Ext.extend(Fos.ConsignGrid, Ext.grid.GridPanel);

Fos.ConsignTab = function(p) {	
	
    this.save = function(){
    	if(this.find('name','custName')[0].getValue()==''){
			XMG.alert(SYS,M_CUST_REQUIRED,function(){
				this.find('name','custName')[0].focus();},this);return;};
		if(Ext.isEmpty(p.get('custId'))){
			XMG.alert(SYS,M_CUST_MUST_PREDEFINED);return;};
		if(Ext.isEmpty(p.get('grouId'))){
			XMG.alert(SYS,M_DEPT_REQUIRED,function(){
				this.find('name','grouName')[0].focus();},this);return;};	
		if(this.find('name','consSalesRepName')[0].getValue()==''){
			XMG.alert(SYS,M_SALES_REQUIRED,function(){
				this.find('name','consSalesRepName')[0].focus();},this);return;};
		if(this.find('name','consOperatorName')[0].getValue()==''){
			XMG.alert(SYS,M_OPERATOR_REQUIRED,function(){
				this.find('name','consOperatorName')[0].focus();},this);return;};
		if(this.find('name','consPolEn')[0].getValue()==''){
			XMG.alert(SYS,M_POD_REQUIRED,function(){
				this.find('name','consPodEn')[0].focus();},this);return;};
		if(this.find('name','consPodEn')[0].getValue()==''){
			XMG.alert(SYS,M_POD_REQUIRED,function(){
				this.find('name','consPodEn')[0].focus();},this);return;};
		
		if(p.get('consBizClass')==BC_E && this.find('name','consEtd')[0].getValue()==''){
			XMG.alert(SYS,M_SAIL_DATE_REQUIRED,function(){
				this.find('name','consEtd')[0].focus();},this);return;}; 
						
		if(p.get('consBizClass')==BC_I && this.find('name','consEta')[0].getValue()==''){
			XMG.alert(SYS,M_ETA_REQUIRED,function(){
				this.find('name','consEta')[0].focus();},this);return;}; 
				
		var f = FConsign.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
   	 	p.set('consCargoPackages',''+p.get('consTotalPackages')+p.get('packName'));
 		p.set('consCargoNetWeight',''+p.get('consTotalNetWeight')+(p.get('consShipType')==ST_B?'MT':'KGS'));
 		p.set('consCargoGrossWeight',''+p.get('consTotalGrossWeight')+(p.get('consShipType')==ST_B?'MT':'KGS'));
 		p.set('consCargoMeasurement',''+p.get('consTotalMeasurement')+'CBM');
   	 	var xml = HTUtil.RTX(p,'FConsign',FConsign);   	 	 	
   	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
   	 		params:{_A:p.get('wconId')?'WCON_S':'CONS_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
				var ra=p.get('rowAction');
				var f = FConsign.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};   				
				if(ra=='N'){
					var desktop = MyDesktop.getDesktop();
					var win = desktop.getWindow('CONS_'+ p.get('uuid'));
					win.setTitle(C_CONSIGN+'-'+p.get("consNo"));
					this.find('name','consNo')[0].setValue(p.get('consNo'));
					p.set('rowAction','M');
				}
				p.endEdit();
				this.updateToolBar();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    }; 
    
    //委托单位
    var cboCust={fieldLabel:C_BOOKER,itemCls:'required',tabIndex:1,
    		name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
       		xtype:'customerLookup',custType:'custBookerFlag',bizType:'M',
       		displayField:'custCode',valueField:'custCode',typeAhead:true,
       		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
       		triggerAction:'all',selectOnFocus:true,
       		anchor:'95%',
             	listeners:{scope:this,
	             	blur:function(f){
	             		if(f.getRawValue()==''){
	             			f.clearValue();p.set('custId','');p.set('custName','');
	             	}},
	             	select:function(c,r,i){
	             	this.find('name','custName')[0].setValue(r.get('custNameCn'));
					this.find('name','custContact')[0].setValue(r.get('custContact'));
					this.find('name','custTel')[0].setValue(r.get('custTel'));
					this.find('name','custFax')[0].setValue(r.get('custFax'));				
					p.set('custId',r.get('id'));
					p.set('custSname',r.get('custSnameCn'));
					this.find('name','consShipper')[0].setValue(r.get('custShipper'));
					this.find('name','consSalesRepName')[0].setValue(r.get('custSalesName'));
				    },
					keydown:{fn:function(f,e){
						loadCustomer(f,e,'custBookerFlag','M',1);
					},buffer:BF}}};
	//委托单位联系人
    var txtCustContact={fieldLabel:C_CONTACT,tabIndex:2,name:'custContact',value:p.get('custContact'),
    		xtype:'textfield',anchor:'95%'};
	//委托单位联系电话
    var txtCustTel={fieldLabel:C_PHONE,tabIndex:3,name:'custTel',value:p.get('custTel'),
    		xtype:'textfield',anchor:'95%'};
    //委托单位传真
    var txtCustFax = {xtype:'textfield',tabIndex:4,fieldLabel:C_FAX,name:'custFax',value:p.get('custFax'),anchor:'95%'};
    
	//业务号
    var txtConsNo={fieldLabel:C_CONS_NO,style:'{font-weight:bold;color:green;}',
			disabled:true,tabIndex:5,name:'consNo',value:p.get('consNo'),
			xtype:'textfield',anchor:'95%'};
    
	//揽货方式
	var cboCargoSource={fieldLabel:C_CARGO_SOURCE,tabIndex:13,name:'consSource',value:p.get('consSource'),
			store:HTStore.SOUR_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
			typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'};
	
	//运输条款
	var cboTranTerm={fieldLabel:C_TTER,itemCls:'needed',tabIndex:17,name:'tranCode',value:p.get('tranCode'),
			store:p.get('consShipType')==ST_B?HTStore.getTTB_S():HTStore.getTTC_S(),xtype:'combo',
					displayField:'tranCode',valueField:'tranCode',
					typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
	
	
    
    //委托日期
    var dateConsign = {fieldLabel:C_CONS_DATE,tabIndex:6,name:'consDate',value:p.get('consDate'),
    		xtype:'datefield',format:DATEF,anchor:'95%'};
       
    //货物种类
    var cboCargoClass={fieldLabel:C_CACL,tabIndex:14,name:'caclName',value:p.get('caclName'),
    		store:HTStore.getCACL_S(),xtype:'combo',
    		displayField:'caclNameCn',valueField:'caclNameCn',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',
    		selectOnFocus:true,anchor:'95%'};
    
    //航线
    var cboShippingLine = {fieldLabel:C_SHLI,itemCls:'needed',tabIndex:18,name:'shliCode',value:p.get('shliCode'),
    		store:HTStore.getSHLI_S(),xtype:'combo',displayField:'shliName',valueField:'shliName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    	listeners:{scope:this,
		blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('shliId','');}},
    	select:function(c,r,i){
			p.set('shliId',r.get('id'));
		}}};
    
    //拼箱方式
    var cboLclType={fieldLabel:C_LCL_TYPE,tabIndex:22,name:'consLclType',
    		value:p.get('consLclType'),disabled:p.get('consShipType')!='LCL',
    		store:HTStore.LCLT_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
    		typeAhead: true,mode:'local',triggerAction:'all',
    		selectOnFocus:true,anchor:'95%'};
    
    //部门
    var cboDepartment={fieldLabel:C_DEPT,itemCls:'required',tabIndex:7,name:'grouName',value:p.get('grouName'),
    		store:HTStore.getGROU_S(),
    		xtype:'combo',displayField:'grouName',valueField:'grouName',typeAhead: true,mode: 'remote',
    		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{
    			blur:function(f){
    				if(f.getRawValue()==''){
    					f.clearValue();
    					p.set('grouId','');
    				}
    			},
    			select:function(c,r,v){
    			p.set('grouId',r.get('id'));
    		}}};
    
    //客户业务号
    var txtRefNo = {fieldLabel:C_REF_NO,tabIndex:11,name:'consRefNo',
    		value:p.get('consRefNo'),xtype:'textfield',anchor:'95%'};
    
    //运费条款
    var cboPaymentTerm = {fieldLabel:C_PATE,itemCls:'needed',tabIndex:15,
    		name:'pateCode',value:p.get('pateCode'),
    		store:HTStore.getPATE_S(),
    		xtype:'combo',displayField:'pateName',valueField:'pateName',
    		typeAhead:true,mode:'remote',triggerAction: 'all',
    		selectOnFocus:true,anchor:'95%'};
    
    //运费备注
    var txtChargeRemark = {fieldLabel:C_CHARGE_REMARKS,tabIndex:16,name:'consChargeRemarks',
    		value:p.get('consChargeRemarks'),xtype:'textfield',anchor:'95%'};
    
    //主单号
    var txtMasterNo = {fieldLabel:C_M_CONS_NO,disabled:true,tabIndex:23,name:'consMasterNo',
    		value:p.get('consMasterNo'),xtype:'textfield',anchor:'95%'};
    
    //业务员
    var cboSales = {fieldLabel:C_SALES,itemCls:'required',tabIndex:8,name:'consSalesRepName',value:p.get('consSalesRepName'),
    		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',valueField:'userName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,
    			blur:function(f){
    				if(f.getRawValue()==''){
    					f.clearValue();
    					p.set('consSalesRepId','');
    					p.set('consSalesRepName','');
    				}
    			},
    	    	select:function(c,r,i){p.set('consSalesRepId',r.get('id'));}}};
    
    //操作员
    var cboOperator = {fieldLabel:C_OPERATOR,itemCls:'required',tabIndex:12,
    		name:'consOperatorName',value:p.get('consOperatorName'),
    		store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,
		blur:function(f){
    		if(f.getRawValue()==''){
    			f.clearValue();p.set('consOperatorId','');
    		}
    	},
    	select:function(c,r,i){p.set('consOperatorId',r.get('id'));}}};
    
    //付费地点
    var txtPaidAt = {fieldLabel:C_PAID_AT,tabIndex:16,name:'consPaidAt',value:p.get('consPaidAt'),
    		xtype:'textfield',anchor:'95%'};
	
	//交货日期
	var dateDelivery = {fieldLabel:C_DELIVERY_DATE,tabIndex:14,name:'consDeliveryDate',
			value:p.get('consDeliveryDate'),xtype:'datefield',format:DATEF,anchor:'95%'};
	//可否分批
	var chkPartialFlag={xtype:'checkbox',labelSeparator:'',boxLabel:C_PARTIAL_FLAG,tabIndex:19,
			name:'consPartialFlag',checked:p.get('consPartialFlag')=='1'};
	//可否转运
	var chkTransFlag={xtype:'checkbox',labelSeparator:'',boxLabel:C_TANS_FLAG,tabIndex:20,
			name:'consTransFlag',checked:p.get('consTransFlag')=='1'};
	//是否需要退核销单
	var chkVerificationFlag={xtype:'checkbox',labelSeparator:'',boxLabel:C_VERIFICATION_FLAG,tabIndex:20,
			name:'consVerificationFlag',checked:p.get('consVerificationFlag')=='1'};
	//是否外挂
	var chkExternalFlag={xtype:'checkbox',labelSeparator:'',boxLabel:C_EXTERNAL_FLAG,tabIndex:20,
			name:'consExternalFlag',checked:p.get('consExternalFlag')=='1'};
	
	var t11=[];var t12=[];var t13=[];var t14=[];
	if(p.get('consBizClass')==BC_I){
		t11=[txtConsNo,cboCust,cboCargoSource,cboTranTerm];
		t12=[cboDepartment,txtCustContact,dateConsign,dateDelivery];
		t13=[cboSales,txtCustTel,txtRefNo,cboPaymentTerm];
		t14=[cboOperator,txtCustFax,txtPaidAt,cboShippingLine];
	}
	else{
		t11=[txtConsNo,cboCust,cboCargoSource,cboTranTerm,chkExternalFlag];
		t12=[cboDepartment,txtCustContact,dateConsign,cboCargoClass,chkVerificationFlag];
		t13=[cboSales,txtCustTel,txtRefNo,cboPaymentTerm,chkPartialFlag];
		t14=[cboOperator,txtCustFax,txtPaidAt,cboShippingLine,chkTransFlag];
		if(p.get('consShipType')==ST_L){
			t12=[cboDepartment,txtCustContact,dateConsign,cboCargoClass,cboLclType];
			t13=[cboSales,txtCustTel,txtRefNo,cboPaymentTerm,txtChargeRemark,txtMasterNo];
		}
	};
	var t1={region:'north',height:p.get('consBizClass')==BC_I?160:200,layout:'column',title:C_CONS_INFO,collapsible:true,padding:5,frame:false,
    	items:[{columnWidth:.25,layout:'form',border:false,labelWidth:70,labelAlign:'right',items:t11},
          	{columnWidth:.25,layout:'form',labelWidth:70,border:false,labelAlign:'right',items:t12},
          	{columnWidth:.25,layout: 'form',labelWidth:80,border:false,labelAlign:'right',items:t13},
			{columnWidth:.25,layout: 'form',labelWidth:70,border:false,labelAlign:'right',items:t14}
		]};
    
	//船名
	var cboVessel = {fieldLabel:C_VESS,itemCls:'needed',tabIndex:34,name:'vessName',value:p.get('vessName'),
			store:HTStore.getVES(),enableKeyEvents:true,
			xtype:'vesselLookup',displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,
			mode:'remote',tpl:vessTpl,itemSelector:'div.list-item',listWidth:400,
			triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('vessNameCn',r.get('vessNameCn'));
					var vcn=this.find('name','vessNameCn')[0];
					if(vcn) vcn.setValue(r.get('vessNameCn'));
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('vessNameCn','');
					}
				},
				keydown:{fn:function(f,e){LV(f,e,'');},buffer:BF}}};
	
	//航次
	var txtVoyage = {fieldLabel:C_VOYA,itemCls:'needed',
			tabIndex:35,name:'voyaName',value:p.get('voyaName'),xtype:'textfield',anchor:'95%'};
	
	//承运人
	var cboCarrier = {fieldLabel:p.get('consBizType')==BT_A?C_FLIGHTER:C_CARRIER,itemClass:'needed',
			tabIndex:p.get('consBizClass')==BC_I?42:38,name:'consCarrierName',
			value:p.get('consCarrierName'),store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custCarrierFlag',bizType:'M',
			displayField:'custCode',valueField:'custCode',typeAhead: true,
			mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('consCarrier','');
						p.set('consCarrierName','');
					}
				},
				select:function(c,r,i){
					p.set('consCarrier',r.get('id'));
					this.find('name','consCarrierName')[0].setValue(r.get('custNameCn'));
				},
				keydown:{fn:function(f,e){
					loadCustomer(f,e,'custCarrierFlag','M',1);
				},buffer:BF}}};
	//海外代理
	var cboOverseaAgency={fieldLabel:C_OVERSEA_AGENCY,tabIndex:p.get('consBizClass')==BC_I?46:42,
			name:'consOverseaAgencyName',value:p.get('consOverseaAgencyName'),store:HTStore.getCS(),
			enableKeyEvents:true,tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custOverseaAgencyFlag',bizType:'M',
			displayField:'custCode',valueField:'custCode',typeAhead: true,
			mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('consOverseaAgency','');
						p.set('consOverseaAgencyName','');
					}
				},
				select:function(c,r,i){
	            	p.set('consOverseaAgency',r.get('id'));
	            	this.find('name','consNotifyParty2')[0].setValue(r.get('custAddress2'));
	            	this.find('name','consOverseaAgencyName')[0].setValue(r.get('custNameCn'));
	 			},
				keydown:{fn:function(f,e){
					loadCustomer(f,e,'custOverseaAgencyFlag','M',1);
				},buffer:BF}}};
	//贸易国
	var cboTradeCountry = {fieldLabel:p.get('consBizClass')==BC_E?C_COUNTRY_D:C_COUNTRY_L,tabIndex:46,
			disabled:true,name:'consTradeCountry',
			value:p.get('consTradeCountry'),store:HTStore.getCOUN_S(),xtype:'combo',
			displayField:'counNameEn',valueField:'counCode',typeAhead:true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
	
	//提单备注
	var txtBlRemarks = {fieldLabel:C_BL_REMARKS,tabIndex:50,name:'consBlRemarks',
			value:p.get('consBlRemarks'),xtype:'textfield',anchor:'95%'};
	
	//订舱编号
	var txtSoNo={fieldLabel:'S/O No.',name:'consSoNo',tabIndex:54,
			value:p.get('consSoNo'),xtype:'textfield',anchor:'95%'};
	
	//箱经营人
	var cboContainerCompany = {fieldLabel:C_CONTAINER,tabIndex:p.get('consBizClass')==BC_I?48:58,name:'consContainerCompanyName',
			value:p.get('consContainerCompanyName'),store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custContainerFlag',bizType:'M',
		displayField:'custCode',valueField:'custCode',typeAhead: true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
        	blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consContainerCompany','');
					p.set('consContainerCompanyName','');
				}
			},
        	select:function(c,r,i){
				p.set('consContainerCompany',r.get('id'));
				this.find('name','consContainerCompanyName')[0].setValue(r.get('custNameCn'));
			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custContainerFlag','M',1);
			},buffer:BF}}};
	
	//订舱代理
	var cboBookingAgency = {fieldLabel:C_BOOK_AGENCY,tabIndex:39,name:'consBookingAgencyName',
			value:p.get('consBookingAgencyName'),store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookingAgencyFlag',bizType:'M',
		displayField:'custCode',valueField:'custCode',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){if(f.getRawValue()==''){f.clearValue();
			p.set('consBookingAgency','');
			p.set('consBookingAgencyName','');}},
        	select:function(c,r,i){
				p.set('consBookingAgency',r.get('id'));
				this.find('name','consBookingAgencyName')[0].setValue(r.get('custNameCn'));
				p.set('consBookingAgencySname',r.get('custCode'));
			},
        	keydown:{fn:function(f,e){
        		loadCustomer(f,e,'custBookingAgencyFlag','M',1);
        	},buffer:BF}}};
	
	//装货港
    var cboPol = {fieldLabel:C_POL,itemCls:'required',tabIndex:p.get('consBizClass')==BC_I?39:43,
    		name:'consPolEn',value:p.get('consPolEn'),
    		store:HTStore.getPS(),xtype:'portLookup',displayField:'portNameEn',valueField:'portNameEn',
    		typeAhead: true,mode:'local',portType:0,
    		triggerAction:'all',selectOnFocus:true,anchor:'95%',
    		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
    		listeners:{scope:this,
            	select:function(c,r,i){
            	if(p.get('consBizClass')==BC_I&&this.find('name','consTradeCountry')[0]) 
            		this.find('name','consTradeCountry')[0].setValue(r.get('counCode'));
            	if(p.get('consBizClass')==BC_E&&this.find('name','consReceiptPlace')[0]) 
            		this.find('name','consReceiptPlace')[0].setValue(r.get('portNameEn'));},
             	keydown:{fn:LP,buffer:BF}}};
    //卸货港
	var cboPod = {fieldLabel:C_POD,itemCls:'required',tabIndex:p.get('consBizClass')==BC_I?40:47,name:'consPodEn',value:p.get('consPodEn'),
			store:HTStore.getPS(),xtype:'portLookup',displayField:'portNameEn',valueField:'portNameEn',
			typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,portType:0,
		listeners:{scope:this,
        	select:function(c,r,i){
            	if(p.get('consBizClass')==BC_E&&this.find('name','consTradeCountry')[0]) 
            		this.find('name','consTradeCountry')[0].setValue(r.get('counCode'));
            	if(this.find('name','consDeliveryPlace')[0]) 
            		this.find('name','consDeliveryPlace')[0].setValue(r.get('portNameEn'));
            	if(this.find('name','consDestination')[0]) 
            		this.find('name','consDestination')[0].setValue(r.get('portNameEn'));},
         	keydown:{fn:LP,buffer:BF}}};
	
	//中转港
    var cboPot = {fieldLabel:C_POT,tabIndex:p.get('consBizClass')==BC_I?41:51,
    		name:'consPotEn',value:p.get('consPotEn'),xtype:'textfield',anchor:'95%'};
    
    //订舱协议号
    var txtBookingContractNo = {fieldLabel:C_BOOKING_CONTRACT_NO,name:'consBookingContractNo',
    		tabIndex:55,value:p.get('consBookingContractNo'),xtype:'textfield',anchor:'95%'};
    
    //提箱单号
    var txtPackingListNo = {fieldLabel:C_PACKING_LIST_NO,tabIndex:59,name:'consPackingListNo',
    		value:p.get('consPackingListNo'),xtype:'textfield',anchor:'95%'};
    
    //MblNo
    var txtMblNo = {fieldLabel:p.get('consBizType')==BT_A?'MAWB No.':C_MBL_NO,tabIndex:36,
    		name:'consMblNo',value:p.get('consMblNo'),xtype:'textfield',anchor:'95%'};
    
    //装船日期
    var dateShipLoad={fieldLabel:C_SHIP_LOAD_DATE,tabIndex:40,name:'consShipDate',value:p.get('consShipDate'),
    		xtype:'datefield',format:DATEF,anchor:'95%'};
    
    //港区
    var cboHarbour = {fieldLabel:C_HARBOUR,tabIndex:p.get('consBizClass')==BC_I?43:44,name:'consHarbour',value:p.get('consHarbour'),
    		store:HTStore.getHARB_S(),xtype:'combo',displayField:'placName',valueField:'placName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,select:function(c,r,i){
    			p.set('consHarbourId',r.get('id'));
    		}}};
    //交货地
    var txtDeliveryPlace = {fieldLabel:C_DELIVERY_PLACE,tabIndex:48,name:'consDeliveryPlace',
    		value:p.get('consDeliveryPlace'),xtype:'textfield',anchor:'95%'};
    
    //签单方式
    var cboIssueType = {fieldLabel:C_ISTY,tabIndex:52,name:'istyId',value:p.get('istyId'),
    		store:HTStore.ISTY_S,xtype:'combo',
    		displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',
    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
    //订舱日期
    var dateBooking = {fieldLabel:C_BOOKING_DATE,tabIndex:56,name:'consBookingDate',
    		value:p.get('consBookingDate'),xtype:'datefield',format:DATEF,anchor:'95%'};
    
    //场站
    var cboCFS={fieldLabel:C_CFS,tabIndex:p.get('consBizClass')==BC_I?49:60,name:'consCfsName',
    		value:p.get('consCfsName'),store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custCfsFlag',bizType:'M',
		displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
    	listeners:{scope:this,
        	blur:function(f){
    			if(f.getRawValue()==''){
    				f.clearValue();p.set('consCfs','');
    				p.set('consCfsName','');
    			}
    		},
         	select:function(c,r,i){p.set('consCfs',r.get('id'));},
        	keydown:{fn:function(f,e){
        		loadCustomer(f,e,'custCfsFlag','M',1);
        	},buffer:BF}}};   
    
   //截关日期
    var dateExpiryDate={fieldLabel:C_CUSTOM_EXPIRY_DATE,tabIndex:41,name:'consExpiryDate',
    		value:p.get('consExpiryDate'),xtype:'datefield',format:DATEF,anchor:'95%'};
    
    //收货地
    var txtReceiptPlace = {fieldLabel:C_RECEIPT_PLACE,tabIndex:45,name:'consReceiptPlace',
    		value:p.get('consReceiptPlace'),xtype:'textfield',anchor:'95%'};
    //目的地
    var txtDestination = {fieldLabel:C_DESTINATION,tabIndex:49,name:'consDestination',
    	value:p.get('consDestination'),xtype:'textfield',anchor:'95%'};
    //前程运输
    var txtPrecarriage = {fieldLabel:C_PRECARRIAGE,tabIndex:53,name:'consPrecarriage',
    		value:p.get('consPrecarriage'),xtype:'textfield',anchor:'95%'};
    
    //正本提单份数
    var txtOriginalBlNum = {fieldLabel:C_BL_ORI_NUM,name:'consOriginalBlNum',tabIndex:64,
    		value:p.get('consOriginalBlNum'),xtype:'numberfield',anchor:'95%'};
    //换单代理
    var cboDoAgency = {fieldLabel:C_DO_AGENCY,name:'consDoAgencyName',tabIndex:47,value:p.get('consDoAgencyName'),
    		store:HTStore.getCS(),enableKeyEvents:true,
    		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
    		xtype:'customerLookup',custType:'custDoAgencyFlag',bizType:'M',
    		displayField:'custCode',valueField:'custNameCn',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
        	listeners:{scope:this,
            	blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('consDoAgency','');p.set('consDoAgencyName','');}},
             	select:function(c,r,i){p.set('consDoAgency',r.get('id'));},
            	keydown:{fn:function(f,e){
            		loadCustomer(f,e,'custDoAgencyFlag','M',1);
            	},buffer:BF}}};
    //HblNo
    var txtHblNo = {fieldLabel:p.get('consBizType')==BT_A?'HAWB No.':C_HBL_NO,
    		name:'consHblNo',tabIndex:37,value:p.get('consHblNo'),xtype:'textfield',anchor:'95%'};
    //ETA
    var dateEta = {fieldLabel:C_ETA,name:'consEta',itemCls:p.get('consBizClass')==BC_I?'required':'',
    		tabIndex:44,value:p.get('consEta'),xtype:'datefield',format:DATEF,anchor:'95%',
        listeners:{scope:this,
        	change:function(f,nv,ov){
        		if(p.get('consBizClass')==BC_I) 
        			p.set('consSailDate',nv);
        	}
        }
    };
    
    //开航日期
    var dateSailDate = {fieldLabel:p.get('consBizClass')==BC_E?C_SAIL_DATE:C_ETD,
    		itemCls:p.get('consBizClass')==BC_E?'required':'',tabIndex:37,
    		name:'consEtd',value:p.get('consEtd'),xtype:'datefield',format:DATEF,anchor:'95%',
        listeners:{scope:this,
        	change:function(f,nv,ov){
        		if(p.get('consBizClass')==BC_E) 
        			p.set('consSailDate',nv);
        		}
        }
    };
            
    //中文船名
    var txtVesselNameCn = {fieldLabel:C_VESS_NAME_CN,name:'vessNameCn',tabIndex:54,
    		value:p.get('vessNameCn'),xtype:'textfield',anchor:'95%'};
    
    //运输条款（承运人）
    var cboTranTermCarrier = {fieldLabel:C_TTER,itemCls:'required',tabIndex:58,name:'tranCodeCarrier',
    		value:p.get('tranCodeCarrier'),
    		store:p.get('consShipType')==ST_B?HTStore.getTTB_S():HTStore.getTTC_S(),
    				xtype:'combo',displayField:'tranCode',valueField:'tranCode',
    				typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
    //运费条款（承运人）
    var cboPaymentTermCarrier = {fieldLabel:C_PATE,itemCls:'required',tabIndex:59,name:'pateCodeCarrier',value:p.get('pateCodeCarrier'),
    		store:HTStore.getPATE_S(),xtype:'combo',displayField:'pateCode',valueField:'pateCode',typeAhead: true,mode: 'local',
    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
    //提单件数
    var txtBlPackages = {fieldLabel:C_BL_PACKAGES,name:'blCargoPackages',value:p.get('blCargoPackages'),
    	disabled:true,xtype:'numberfield',anchor:'95%'};
    
    //提单毛重
    var txtBlGrossWeight = {fieldLabel:C_BL_GW,name:'blCargoGrossWeight',value:p.get('blCargoGrossWeight'),
    		disabled:true,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'};
    
    //提单净重
	var txtBlNetWeight = {fieldLabel:C_BL_NW,name:'blCargoNetWeight',value:p.get('blCargoNetWeight'),
			disabled:true,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'};
	//提单体积
    var txtBlMeasurement = {fieldLabel:C_BL_CBM,name:'blCargoMeasurement',value:p.get('blCargoMeasurement'),
    		disabled:true,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'};
    //核销单号
    var txtVerificationNo={fieldLabel:C_VERIFICATION_NO,name:'consVerificationNo',
    		value:p.get('consVerificationNo'),xtype:'textfield',anchor:'95%'};
    //报关单号
    var txtCustomsDeclarationNo={fieldLabel:C_CUSTOMS_DECLARATION_NO,name:'consCustomsDeclarationNo',
    		value:p.get('consCustomsDeclarationNo'),xtype:'textfield',anchor:'95%'};
    //经营单位
    var txtConsCompany={fieldLabel:C_BIZ_COMPANY,name:'consCompany',
    		value:p.get('consCompany'),xtype:'textfield',anchor:'95%'};
    //报关日期
    var dateCustomsDeclar={fieldLabel:C_CUSTOMS_DECLEAR_DATE,name:'consCustomsDeclarDate',tabIndex:44,
    		value:p.get('consCustomsDeclarDate'),xtype:'datefield',format:DATEF,anchor:'95%'};
    //驳船船名
    var txtBVessel={fieldLabel:C_BVESSEL,tabIndex:18,name:'consBVessel',value:p.get('consBVessel'),
			xtype:'textfield',anchor:'95%'};
    //驳船航次
	var txtBVoyage={fieldLabel:C_BVOYAGE,tabIndex:19,name:'consBVoyage',value:p.get('consBVoyage'),
			xtype:'textfield',anchor:'95%'};
	//驳船中转港
	var txtBPod={fieldLabel:C_BPOT,tabIndex:20,name:'consBPodEn',value:p.get('consBPodEn'),
			xtype:'textfield',anchor:'95%'};
	
    var t21=[],t22=[],t23=[],t24=[];
    if(p.get('consBizClass')==BC_I){
		t21=[cboVessel,cboTradeCountry,cboCarrier,cboOverseaAgency,txtBVessel];
		t22=[txtVoyage,cboPol,cboHarbour,cboDoAgency,txtBVoyage,txtCustomsDeclarationNo];
		t23=[txtMblNo,cboPod,dateEta,cboContainerCompany,txtBPod,txtConsCompany];
		t24=[txtHblNo,cboPot,dateSailDate,cboCFS,dateCustomsDeclar];
		if(p.get('consShipType')==ST_B){
            t21=[cboVessel,cboTradeCountry,cboCarrier,cboOverseaAgency];
            t22=[txtVoyage,cboPol,cboHarbour,txtCustomsDeclarationNo];
            t23=[txtMblNo,cboPod,dateEta,cboContainerCompany,txtConsCompany];
            t24=[txtHblNo,cboPot,dateSailDate,dateCustomsDeclar];
        }
	}
	else{
		t21=[cboVessel,cboCarrier,cboOverseaAgency,cboTradeCountry,txtBlRemarks,txtSoNo,cboContainerCompany,txtVerificationNo];
		t22=[txtVoyage,cboBookingAgency,cboPol,cboPod,cboPot,txtBookingContractNo,txtPackingListNo,txtCustomsDeclarationNo];
		t23=[txtMblNo,dateShipLoad,cboHarbour,txtDeliveryPlace,cboIssueType,dateBooking,cboCFS,txtConsCompany];
		t24=[txtHblNo,dateSailDate,dateEta,txtReceiptPlace,txtDestination,txtPrecarriage,dateExpiryDate,txtOriginalBlNum,dateCustomsDeclar];
		if(p.get('consShipType')==ST_B){
			t21=[cboVessel,cboCarrier,cboOverseaAgency,cboTradeCountry,txtBlRemarks,txtVesselNameCn,cboTranTermCarrier,txtBlPackages,txtVerificationNo];
			t22=[txtVoyage,cboBookingAgency,cboPol,cboPod,cboPot,txtBookingContractNo,cboPaymentTermCarrier,txtBlGrossWeight,txtCustomsDeclarationNo];
			t23=[txtMblNo,dateShipLoad,cboHarbour,txtDeliveryPlace,cboIssueType,dateBooking,txtOriginalBlNum,txtBlNetWeight,txtConsCompany];
			t24=[txtHblNo,dateSailDate,dateEta,txtReceiptPlace,txtDestination,txtPrecarriage,dateExpiryDate,txtBlMeasurement,dateCustomsDeclar];
		}
	};
	
    var t2={layout:'column',title:C_BL_INFO,autoScroll:true,frame:false,padding:5,
          items:[{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:t21},
          	{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:t22},
          	{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:t23},
          	{columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:t24}
		]};

    //发货人
    var cboShipper = {fieldLabel:C_SHIPPER,tabIndex:65,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consShipper')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'S',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}};
    
    //发货人
    var txtShipper = {fieldLabel:'',tabIndex:65,name:'consShipper',value:p.get('consShipper'),xtype:'textarea',
	 		height:100,anchor:'99%'};
    
    //收货人
    var cboConsignee = {fieldLabel:C_CONSIGNEE,tabIndex:65,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consConsignee')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'C',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}};
	//收货人
    var txtConsignee = {fieldLabel:'',tabIndex:66,name:'consConsignee',value:p.get('consConsignee'),
        	xtype:'textarea',height:100,anchor:'99%'};
    	
    //通知人
    var cboNotifyParty = {fieldLabel:C_NOTIFIER,tabIndex:65,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consNotifyParty')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'N',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}};
    //通知人
    var txtNotifyParty =  {fieldLabel:'',tabIndex:66,name:'consNotifyParty',value:p.get('consNotifyParty'),
        	xtype:'textarea',height:100,anchor:'99%'};
    
	//第二通知人
    var cboNotifyParty2 = {fieldLabel:C_NOTIFIER2,tabIndex:65,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consNotifyParty2')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'O',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}};
    
	//第二通知人
    var txtNotifyParty2 =  {fieldLabel:'',tabIndex:66,name:'consNotifyParty2',value:p.get('consNotifyParty2'),
        	xtype:'textarea',height:100,anchor:'99%'};
    
    var t3={layout:'column',title:C_SHIPPER_INFO,autoScroll:true,frame:true,items:
			[{columnWidth:.5,layout:'form',border:false,labelWidth:90,labelAlign:'right',
				items:[cboShipper,txtShipper]},
			 {columnWidth:.5,layout:'form',border:false,labelWidth:90,labelAlign:'right',
				items:[cboConsignee, txtConsignee]},
             {columnWidth:.5,layout:'form',border:false,labelWidth:90,labelAlign:'right',
				items:[cboNotifyParty2, txtNotifyParty2]},
        	{columnWidth:.5,layout:'form',border:false,labelWidth:90,labelAlign:'right',
                   items:[cboNotifyParty,txtNotifyParty ]}			                            
		]};
    
	var g1={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,
			items:[{fieldLabel:C_MARKS,tabIndex:58,name:'consCargoMarks',
			value:p.get('consCargoMarks'),xtype:'textarea',height:80,anchor:'99%'}]};
    var g2={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,
    		items:[{fieldLabel:C_CARGO_DESC,tabIndex:61,name:'consCargoDesc',
    		value:p.get('consCargoDesc'),xtype:'textarea',height:80,anchor:'99%'}]};
    var g3={columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,
    		items:[{fieldLabel:C_NUM_PACK,tabIndex:61,name:'consTotalPackages',
    		value:p.get('consTotalPackages'),xtype:'numberfield',anchor:'99%',
		listeners:{scope:this,change:function(f,nv,ov){				
			p.set('consTotalPackages',nv);
			var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
			this.find('name','consTotalPackagesInWord')[0].setValue(pw);
			p.set('consTotalPackagesInWord',pw);}}}]};
	var g4={columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
	    {fieldLabel:C_PACK,tabIndex:61,name:'packName',value:p.get('packName'),xtype:'combo',
	    	store:HTStore.getPACK_S(),
	    	displayField:'packName',valueField:'packName',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,select:function(c,r,i){
			p.set('packName',r.get('packName'));
			var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
			this.find('name','consTotalPackagesInWord')[0].setValue(pw);
			p.set('consTotalPackagesInWord',pw);}}}]};
	var g5={columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
	 	{fieldLabel:C_GROSS_WEIGHT+(p.get('consShipType')==ST_B?C_UNIT_MT:C_KGS),tabIndex:61,name:'consTotalGrossWeight',
	 		value:p.get('consTotalGrossWeight'),xtype:'numberfield',decimalPrecision:4,anchor:'99%'}]};
	var g6={columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
		{fieldLabel:C_NET_WEIGHT+(p.get('consShipType')==ST_B?C_UNIT_MT:C_KGS),tabIndex:61,name:'consTotalNetWeight',
			value:p.get('consTotalNetWeight'),xtype:'numberfield',decimalPrecision:4,anchor:'99%'}]};
	var g7={columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[{fieldLabel:C_CBM,tabIndex:61,
		name:'consTotalMeasurement',value:p.get('consTotalMeasurement'),xtype:'numberfield',decimalPrecision:4,anchor:'99%'}]};
	var g8={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[{fieldLabel:C_PACKAGES_CAP,tabIndex:61,
		name:'consTotalPackagesInWord',value:p.get('consTotalPackagesInWord'),xtype:'textfield',anchor:'99%'}]};
	var g9={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[{fieldLabel:C_CARGO_NAME_CN,tabIndex:61,
		name:'consCargoNameCn',value:p.get('consCargoNameCn'),xtype:'textarea',height:80,anchor:'99%'}]};
	var g10={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[{fieldLabel:C_CARGO_NAME_EN,tabIndex:61,
		name:'consCargoNameEn',value:p.get('consCargoNameEn'),xtype:'textarea',height:80,anchor:'99%'}]};
	//箱信息
	var g11={columnWidth:.5,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[{fieldLabel:C_CONT_INFO,tabIndex:61,
		name:'consContainersInfo',value:p.get('consContainersInfo'),xtype:'textfield',anchor:'99%'}]};
	var t4={layout:'column',layoutConfig: {columns:5},labelWidth:90,labelAlign:'right',autoScroll:true,frame:true,
			title:C_CARGO_INFO,items:[g1,g2,g9,g10,g3,g4,g5,g6,g8,g7,g11]};
       		
	var r1={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_SERVICE_SPEC,tabIndex:1,
		name:'consServiceSpec',value:p.get('consServiceSpec'),xtype:'textarea',anchor:'99%'}]};
	
	var r2={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_REMARKS,tabIndex:2,
		name:'consRemarks',value:p.get('consRemarks'),xtype:'textarea',anchor:'99%'}]};
	
	var r3={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
		{fieldLabel:p.get('consBizClass')==BC_E?C_LOAD_ADDRESS:C_DELIVERY_ADDRESS,tabIndex:6,
				name:'consLoadAddress',value:p.get('consLoadAddress'),xtype:'textarea',anchor:'99%'}]};
	
	var r4={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_LOAD_REMARK,tabIndex:7,
		name:'consLoadRemarks',value:p.get('consLoadRemarks'),xtype:'textarea',anchor:'99%'}]};
	
	var r5={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
	    {fieldLabel:C_MOTORCADE,tabIndex:3,name:'consTrackVendorName',value:p.get('consTrackVendorName'),
	    	store:HTStore.getCS(),enableKeyEvents:true,
	    tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
	    xtype:'customerLookup',custType:'custTrackFlag',bizType:'M',
	    displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
	    triggerAction:'all',selectOnFocus:true,anchor:'99%',
	    listeners:{scope:this,
	    blur:function(f){
	    	if(f.getRawValue()==''){
	    		f.clearValue();
	    		p.set('consTrackVendor','');
	    		p.set('consTrackVendorName','');
	    	}
	    },
	    select:function(c,r,i){p.set('consTrackVendor',r.get('id'));},
	    keydown:{fn:function(f,e){
	    	loadCustomer(f,e,'custTrackFlag','M',1);
	    },buffer:BF}}}]};
	var r6={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
			items:[{fieldLabel:C_MOTORCADE_CONTACT,tabIndex:4,
		name:'consTrackContact',value:p.get('consTrackContact'),xtype:'textfield',anchor:'99%'}]};
	
	var r7={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_MOTORCADE_TEL,tabIndex:5,
		name:'consTrackTel',value:p.get('consTrackTel'),xtype:'textfield',anchor:'99%'}]};
	
	var r8={columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',items:[
	        {fieldLabel:p.get('consBizClass')==BC_E?C_LOAD_DATE:C_FETCH_DATE,
			tabIndex:8,name:'consLoadDate',value:p.get('consLoadDate'),
			xtype:'datefield',format:DATEF,anchor:'99%'}]};
	
	var r9={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
		{fieldLabel:C_WAREHOUSE,tabIndex:9,name:'consWarehouseName',value:p.get('consWarehouseName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custWarehouseFlag',bizType:'M',
			displayField:'custCode',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consWarehouse','');
					p.set('consWarehouseName','');
				}
			},
			select:function(c,r,i){
				this.find('name','consWarehouseContact')[0].setValue(r.get('custContact'));
				this.find('name','consWarehouseTel')[0].setValue(r.get('custTel'));
				this.find('name','consWarehouseAddress')[0].setValue(r.get('custAddress'));
				p.set('consWarehouse',r.get('id'));
				p.set('consWarehouseFax',r.get('custFax'));},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custWarehouseFlag','M',1);
			},buffer:BF}}}
		]};
	var r10={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_WARE_CONTACT,tabIndex:10,
		name:'consWarehouseContact',value:p.get('consWarehouseContact'),xtype:'textfield',anchor:'99%'}]};
	
	var r11={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_WARE_TEL,tabIndex:11,
		name:'consWarehouseTel',value:p.get('consWarehouseTel'),xtype:'textfield',anchor:'99%'}]};
	
	var r12={columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',items:[
		{fieldLabel:p.get('consShipType')==ST_B?C_WARE_DATE_IN:(p.get('consBizClass')==BC_E?C_WARE_LOAD_DATE:C_WARE_DIS_DATE),tabIndex:14,
		name:'consContainerLoadDate',value:p.get('consContainerLoadDate'),xtype:'datefield',format:DATEF,anchor:'99%'}]};
	
	var r13={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
		{fieldLabel:p.get('consShipType')==ST_B?C_WARE_REQUIREMENT:(p.get('consBizClass')==BC_E?C_CONT_LOAD_REQUIREMENT:C_CONT_DISCHARGE_REQUIREMENT),
		tabIndex:12,name:'consWarehouseRemarks',value:p.get('consWarehouseRemarks'),xtype:'textarea',anchor:'99%'}]};
	
	var r14={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
		{fieldLabel:C_WARE_ADDRESS,tabIndex:13,name:'consWarehouseAddress',
		value:p.get('consWarehouseAddress'),xtype:'textarea',anchor:'99%'}]};
	
	var r15={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_CUDE_TYPE,tabIndex:21,name:'consCudeType',
		value:p.get('consCudeType'),store:HTStore.CUTY_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'99%'}]};
	
	var r16={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
			items:[{fieldLabel:C_CUSTOM_AGENCY,tabIndex:16,name:'consCustomsVendorName',
			value:p.get('consCustomsVendorName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		xtype:'customerLookup',custType:'custCustomFlag',bizType:'M',
		displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
		triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();p.set('consCustomsVendor','');
					p.set('consCustomsVendorName','');
				}
			},
			select:function(c,r,i){
				p.set('consCustomsVendor',r.get('id'));
				this.find('name','consSendSingleAddress')[0].setValue(r.get('custAddress'));
			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custCustomFlag','M',1);
			},buffer:BF}}}]};
	var r17={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
	        {fieldLabel:C_SWITCH_REQUIREMENT,tabIndex:17,name:'swithId',
	        value:p.get('swithId'),store:HTStore.SWIT_S,xtype:'combo',
	        displayField:'NAME',valueField:'CODE',typeAhead: true,
	        mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'99%'}]};
	
	var r18={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
			items:[{fieldLabel:C_INSP_AGENCY,tabIndex:15,name:'consInspectionVendorName',
				value:p.get('consInspectionVendorName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custInspectionFlag',bizType:'M',
		displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
		triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consInspectionVendor','');
					p.set('consInspectionVendorName','');
				}
			},
			select:function(c,r,i){p.set('consInspectionVendor',r.get('id'));},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custInspectionFlag','M',1);
			},buffer:BF}}}]};
	
	var r19={columnWidth:.2,layout:'form',border:false,labelWidth:80,labelAlign:'right',
			items:[{fieldLabel:C_FUMIGATE_FLAG,tabIndex:18,name:'consFumigateFlag',
		checked:p.get('consFumigateFlag')=='1',xtype:'checkbox',anchor:'99%'}]};
	var r20={columnWidth:.2,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_QUARANTINE_FLAG,tabIndex:19,
		name:'consQuarantineFlag',checked:p.get('consQuarantineFlag')=='1',xtype:'checkbox',anchor:'99%'}]};
	var r21={columnWidth:.2,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_TRANSFERRING_FLAG,tabIndex:20,
		name:'consTransferringFlag',checked:p.get('consTransferringFlag')=='1',xtype:'checkbox',anchor:'99%'}]};
	
    var r22={columnWidth:.2,layout:'form',border:false,labelWidth:80,labelAlign:'right',
    	items:[{fieldLabel:C_INV_FLAG,xtype:'checkbox',tabIndex:22,
    	name:'consInvoiceFlag',checked:p.get('consInvoiceFlag')=='1',anchor:'99%'}]};
     var r23={columnWidth:.2,layout:'form',border:false,labelWidth:80,labelAlign:'right',
    	items:[{fieldLabel:C_INSP_FLAG,xtype:'checkbox',tabIndex:23,
    	name:'consInspectionFlag',checked:p.get('consInspectionFlag')=='1',anchor:'99%'}]};
   
    var r24={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
    	items:[{fieldLabel:C_F_SHIPPER,tabIndex:1,
    	name:'consCargoOwnerName',value:p.get('consCargoOwnerName'),store:HTStore.getCS(),enableKeyEvents:true,
    	tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
    	xtype:'customerLookup',custType:'custBookerFlag',bizType:'M',
    	displayField:'custCode',
    	valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction: 'all',
    	selectOnFocus:true,anchor:'99%',listWidth:200,pageSize:30,
		listeners:{scope:this,
			blur:function(f){
    			if(f.getRawValue()==''){
    				f.clearValue();
    				p.set('consCargoOwner','');
    				p.set('consCargoOwnerName','');
    			}
    		},
			select:function(c,r,i){p.set('consCargoOwner',r.get('id'));},
			keydown:function(f,e){
				loadCustomer(f,e,'custBookerFlag','M',1);
			}}}]};
	var r25={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_TRADE_CONTRACT_NO,tabIndex:2,
		name:'consContractNo',value:p.get('consContractNo'),xtype:'textfield',anchor:'99%'}]};
	var r26={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_CREDIT_NO,tabIndex:3,name:'consCreditNo',
		value:p.get('consCreditNo'),xtype:'textfield',anchor:'99%'}]};
	var r27={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_HBL_NO,tabIndex:7,name:'consHblNo',
		value:p.get('consHblNo'),xtype:'textfield',anchor:'99%'}]};	
   
	var txtLoadFactory={columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_LOAD_FACTORY,
		name:'consLoadFactory',value:p.get('consLoadFactory'),xtype:'textfield',anchor:'99%'}]};	
	
	var txtLoadContact={columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		items:[{fieldLabel:C_LOAD_CONTACT,
		name:'consLoadContact',value:p.get('consLoadContact'),xtype:'textfield',anchor:'99%'}]};
	
	var txtLoadTel={columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
		items:[{fieldLabel:C_LOAD_TEL,
		name:'consLoadTel',value:p.get('consLoadTel'),xtype:'textfield',anchor:'99%'}]};
	
	//寄单地址
	var sendSingleAddress = {columnWidth:.5,layout:'form',border:false,labelWidth:90,labelAlign:'right',
		items:[{fieldLabel:C_SEND_SINGLE_ADDRESS,
		name:'consSendSingleAddress',value:p.get('consSendSingleAddress'),xtype:'textfield',anchor:'99%'}]};
	//进仓编号
	var txtConsWarehouseNo = {columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
		items:[{fieldLabel:C_WAREHOUSE_NO,
		name:'consWarehouseNo',value:p.get('consWarehouseNo'),xtype:'textfield',anchor:'99%'}]};
	var t5={layout:'column',layoutConfig: {columns:5},labelWidth:80,labelAlign:'right',
    		title:C_OTHER_INFO,autoScroll:true,frame:true,
    		items:[r1,r2,r3,r4,
    		       txtLoadFactory,txtLoadContact,txtLoadTel,
    		       r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,
    		       r16,r17,r18,r19,r20,r21,r22,r23,r24,r25,r26,r27,sendSingleAddress,txtConsWarehouseNo]};
	    
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_U',id:p.get('id'),consStatus:s},
		success: function(r){
			p.set('consStatus',s);
			this.updateToolBar();
			XMG.alert(SYS,M_S);			
			var sc = new Ext.data.Store({url: SERVICE_URL+'?_A='+'CONS_Q',
					reader: new Ext.data.XmlReader({record:'FConsign'}, FConsign)});
			sc.load({params:{id:p.get('id')},callback:function(r,o,s){
				if(s&&r.length>0){
					var c=r[0];
					p.beginEdit();					
					p.set('version',c.get('version'));
					p.endEdit();
					XMG.alert(SYS,M_S);
				}    						
			},scope:this});
				
		},
		failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
    };
    this.unlock=function(){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_U',id:p.get('id'),consStatusLock:0},
		success: function(r){
			p.set('consStatusLock',0);
			this.updateToolBar();
			
			XMG.alert(SYS,M_S);
			var sc = new Ext.data.Store({url: SERVICE_URL+'?_A='+'CONS_Q',
					reader: new Ext.data.XmlReader({record:'FConsign'}, FConsign)});
			sc.load({params:{id:p.get('id')},callback:function(r,o,s){
				if(s&&r.length>0){
					var c=r[0];
					p.beginEdit();					
					p.set('version',c.get('version'));
					p.endEdit();
					XMG.alert(SYS,M_S);
				}    						
			},scope:this});				
		},
		failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
    };
    this.start=function(){this.updateStatus('1');};
    this.check=function(){this.updateStatus('2');};
    this.exit=function(){this.updateStatus('3');};
    this.renew=function(){this.updateStatus('4');};
    this.quit=function(){XMG.confirm(SYS,M_CONS_QUIT_C,function(btn){if(btn=='yes') this.updateStatus('5');},this);};
    this.rebook=function(){this.updateStatus('1');};
    this.cancel=function(){XMG.confirm(SYS,M_CONS_CANCEL_C,function(btn){if(btn=='yes') this.updateStatus('6');},this);};
    this.arrive=function(){XMG.confirm(SYS,M_CONS_ARRIVE_C,function(btn){if(btn=='yes') this.updateStatus('1');},this);};
    this.release=function(){XMG.confirm(SYS,M_CONS_RELEASE_C,function(btn){if(btn=='yes') this.updateStatus('2');},this);};
    this.releaseCargo=function(){XMG.confirm(SYS,M_CARGO_RELEASE_C,function(btn){if(btn=='yes') this.updateStatus('3');},this);};
    this.sendCargo=function(){XMG.confirm(SYS,M_CARGO_SEND_C,function(btn){if(btn=='yes') this.updateStatus('4');},this);};
    
    var copyConsign = function(p){
		var c = new FConsign({});		
		var f = FConsign.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {var fn = ''+f.keys[i];c.set(fn,p.get(fn));};
		c.set('consDate',new Date());
		c.set('consNo','');c.set('version',1);
		c.set('consStatus',0);		
		c.set('consStatusExp',0);c.set('consStatusAud',0);
		c.set('consStatusAr',0);c.set('consStatusAp',0);
		c.set('consStatusInvoR',0);c.set('consStatusInvoP',0);
		c.set('consStatusLock',0);c.set('rowAction','N');
		c.set('consMasterFlag','0');c.set('consMasterId','');	
		c.set('uuid',HTUtil.UUID(32));
		return c;
	};
    
    this.saveAs=function(){    	
    	var nc = copyConsign(p);
    	createWindow('CONS_'+nc.get("uuid"),C_ADD_CONSIGN,new Fos.ConsignTab(nc),true);
    };
    var locked=p.get('consStatusLock')==1;
    var disable=p.get('editable')==0;
    var m=M3_CONS;
    
	this.updateToolBar = function(){
		tb=this.getTopToolbar();
		var s = p.get('consStatus');
		locked=p.get('consStatusLock')==1;
		if(tb.getComponent('TB_SAVE')) 
			tb.getComponent('TB_SAVE').setDisabled(NR(m+F_M)||locked||disable);
		if(tb.getComponent('TB_INVALID')) 
    		tb.getComponent('TB_INVALID').setDisabled(NR(m+F_M)||locked||disable||s!=2); 
    	if(tb.getComponent('TB_SAVE_AS')) 
    		tb.getComponent('TB_SAVE_AS').setDisabled(NR(m+F_M)||locked||disable||s!=0);
    	if(tb.getComponent('TB_UNLOCK')) 
    		tb.getComponent('TB_UNLOCK').setDisabled(NR(m+F_UL)||locked!=1);
    	
    	if(tb.getComponent('TB_ACTION')) 
    		tb.getComponent('TB_ACTION').setDisabled(NR(m+F_M)||locked||p.get('rowAction')=='N');    	
    	if(tb.getComponent('TB_CARG')) 
    		tb.getComponent('TB_CARG').setDisabled(p.get('rowAction')=='N');
    	if(tb.getComponent('TB_EXPE')) 
    		tb.getComponent('TB_EXPE').setDisabled(p.get('rowAction')=='N');
    	if(tb.getComponent('TB_DOC')) 
    		tb.getComponent('TB_DOC').setDisabled(p.get('rowAction')=='N');
    	if(tb.getComponent('TB_BL')) 
    		tb.getComponent('TB_BL').setDisabled(p.get('rowAction')=='N');
    	if(tb.getComponent('TB_SERVICE')) 
    		tb.getComponent('TB_SERVICE').setDisabled(p.get('rowAction')=='N');
    	if(p.get('consBizClass')==BC_I){
    		menuArrived.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=0);    	
    		menuSwitchBl.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=1);
    		menuRelease.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=2);
    		menuSendCargo.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=2);
    	}
    	else{
    		menuBookStart.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=0);    	
        	menuBookConfirm.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=1);
        	menuBookExit.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=2);
        	menuBookReassign.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=2);
        	menuBookQuit.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')==5);
        	menuBookRenew.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')<2);
    	}    	
    	b20.setText(C_STATUS+'：'+(p.get('consBizClass')==BC_I?HTStore.getCIST(p.get('consStatus')):HTStore.getCOST(p.get('consStatus'))));
    };

    var btSave={text:C_SAVE,itemId:'TB_SAVE',iconCls:'save',
			disabled:NR(m+F_M)||locked||disable,
			scope:this,handler:this.save};	
	var btInvalid={text:C_INVALID,itemId:'TB_INVALID',iconCls:'cancel',
			disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=2||p.get('rowAction')=='N',
			scope:this,handler:this.cancel};
	var btSaveAs={text:C_COPY,itemId:'TB_SAVE_AS',iconCls:'copy',disabled:NR(m+F_M),scope:this,
			handler:this.saveAs};
	var btUnlock={text:C_UNLOCK,itemId:'TB_UNLOCK',iconCls:'unlock',
			disabled:NR(m+F_UL)||locked!=1||p.get('rowAction')=='N',
			scope:this,handler:this.unlock};
	
	var menuArrived=new Ext.menu.Item({text:C_ARRIVED,iconCls:'plane',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=0||p.get('rowAction')=='N',
		scope:this,handler:this.arrive});
	var menuSwitchBl=new Ext.menu.Item({text:C_SWITCH_BL,iconCls:'release',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=1||p.get('rowAction')=='N',
		scope:this,handler:this.release});	
	var menuRelease=new Ext.menu.Item({text:C_RELEASE,iconCls:'cart',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=2||p.get('rowAction')=='N',
		scope:this,handler:this.releaseCargo});
	var menuSendCargo=new Ext.menu.Item({text:C_SEND_CARGO,iconCls:'cart',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=3||p.get('rowAction')=='N',
		scope:this,handler:this.sendCargo});
	
	var menuBookStart=new Ext.menu.Item({text:C_BOOK_START,iconCls:'save',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=0||p.get('rowAction')=='N',
		scope:this,handler:this.start});
	var menuBookConfirm=new Ext.menu.Item({text:C_BOOK_CONFIRM,iconCls:'check',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=1||p.get('rowAction')=='N',
		scope:this,handler:this.check});
	var menuBookExit=new Ext.menu.Item({text:C_BOOK_EXIT,iconCls:'exit',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=2||p.get('rowAction')=='N',
		scope:this,handler:this.exit});
	var menuBookReassign=new Ext.menu.Item({text:C_BOOK_REASSIGN,iconCls:'redo',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=2||p.get('rowAction')=='N',
		scope:this,handler:this.renew});
	var menuBookQuit=new Ext.menu.Item({text:C_BOOK_QUIT,iconCls:'consCancel',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')==5||p.get('rowAction')=='N',
		scope:this,handler:this.quit});
	var menuBookRenew=new Ext.menu.Item({text:C_BOOK_RENEW,iconCls:'renew',
		disabled:NR(m+F_M)||locked||disable||p.get('consStatus')<2||p.get('rowAction')=='N',
		scope:this,handler:this.rebook});
	var btAction={text:C_STATUS_SET,itemId:'TB_ACTION',iconCls:'tag',
		disabled:NR(m+F_M)||locked||p.get('rowAction')=='N',scope:this,
		menu:{items:p.get('consBizClass')==BC_I?[menuArrived,menuSwitchBl,menuRelease,menuSendCargo]:
			[menuBookStart,menuBookConfirm,menuBookExit,menuBookReassign,menuBookQuit,menuBookRenew]}};	
		
    this.expExcel=function(c){
    	if(c=='BOOK_C')
    		EXPC(c,'&expeType=R&id='+p.get('id'));
    	else
    		EXPC(c,'&id='+p.get('id'));
    };
    
	var exp1={text:M_ARRIVE_ADVICE,scope:this,handler:function(){this.expExcel('ARAD');}};		
	var exp2={text:M_BOOK,scope:this,handler:function(){this.expExcel('CONS_B');}};
	var exp3={text:M_BOOK_CONFIRM,scope:this,handler:function(){this.expExcel('BOOK_C');}};
	var exp4={text:M_CONSIGN,scope:this,handler:function(){this.expExcel('CONS');}};
	var exp5={text:M_BL_ER,scope:this,handler:function(){this.expExcel('BLER');}};
	var exp6={text:M_BL_SEAWAY,scope:this,handler:function(){this.expExcel('SEAW');}};
	var exp7={text:M_LOAD_ADVICE,scope:this,handler:function(){this.expExcel('WARE_INFO');}};
	var exp8={text:M_SGS_ADVICE,scope:this,handler:function(){this.expExcel('SGS_INFO');}};
	var exp9={text:M_SHIP_ADVICE,scope:this,handler:function(){this.expExcel('SHIP_INFO');}};
	var exp10={text:C_WARE_NOTICE,scope:this,handler:function(){this.expExcel('CONS_NOTICE');}};
	var expM=[];
	if(p.get('consShipType')==ST_F||p.get('consShipType')==ST_L) 
		expM=p.get('consBizClass')==BC_I?[exp1]:[exp2,exp3,exp4,exp5,exp6,exp7,exp8,exp9,exp10];		
	else 
		expM=p.get('consBizClass')==BC_I?[exp1]:[exp2,exp3,exp5,exp6,exp7];
	var btExp={text:C_EXPORT,iconCls:'print',
		disabled:p.get('rowAction')=='N',
		scope:this,menu:{items:expM}};
	
	this.showCargo=function(){
		createWindow('CARG'+p.get("uuid"),p.get('consNo')+'-'+C_CARGO_LIST,
    			new Fos.CargoGrid(p),true);
	};
	var bCargo={text:C_CARG_DETAIL,itemId:'TB_CARG',iconCls:'cart',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showCargo};
	
	this.showExpense=function(){
		createWindow('EXPE_'+p.get("uuid"),p.get('consNo')+'-'+C_EXPE,		
    			new Fos.ExpenseTab(p),true);
	};
	var bExpe={text:C_EXPE,itemId:'TB_EXPE',iconCls:'dollar',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showExpense};
	
	this.showDoc=function(){
		createWindow('DOC'+p.get("uuid"),p.get('consNo')+'-'+C_DOC,
    			new Fos.ConsDocGrid(p),true);
	};
	var bDoc={text:C_DOC,itemId:'TB_DOC',iconCls:'doc',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showDoc};
	
	this.showBL=function(){
		createWindow('BL'+p.get("uuid"),p.get('consNo')+'-'+C_BL,
    			new Fos.BLTab(p),true);
	};
	var bBL={text:C_BL,itemId:'TB_BL',iconCls:'news',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showBL};
	
	this.showTran=function(){
		createWindow('TRAN'+p.get("uuid"),p.get('consNo')+'-'+C_TRAN,
    			new Fos.TransGrid(p),true);
	};
	bTran={text:C_TRAN,itemId:'TB_TRAN',iconCls:'car',
		disabled:p.get('rowAction')=='N',scope:this,handler:this.showTran};
	
	this.showWare=function(){
		createWindow('WARE'+p.get("uuid"),p.get('consNo')+'-'+C_WARE,
    			new Fos.WarehouseTab(p),true);
	};
	bWare={text:C_WARE,itemId:'TB_WARE',iconCls:'database',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showWare};
	
	this.showCont=function(){
		createWindow('CONT'+p.get("uuid"),p.get('consNo')+'-'+C_SHIP_CONT,
    			new Fos.ContainerTab(p),true);
	};
	bCont={text:C_SHIP_CONT,itemId:'TB_CONT',iconCls:'diskdown',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showCont};
	
	this.showCude=function(){
		createWindow('CUDE'+p.get("uuid"),p.get('consNo')+'-'+C_CUDE,
    			new Fos.CudeGrid(p),true);
	};
	bCude={text:C_CUDE,itemId:'TB_CUDE',iconCls:'cude',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showCude};
	
	this.showInsp=function(){
		createWindow('INSP'+p.get("uuid"),p.get('consNo')+'-'+C_INSP,
    			new Fos.InspGrid(p),true);
	};
	bInsp={text:C_INSP,itemId:'TB_INSP',iconCls:'insp',
		disabled:p.get('rowAction')=='N',
		scope:this,handler:this.showInsp};
	
	var serviceM=[bTran,bWare,bCude,bInsp];	
	if(p.get('consShipType')==ST_F||p.get('consShipType')==ST_L){
		serviceM=[bTran,bWare,bCont,bCude,bInsp];
	}
	var btService={text:C_SERVICE,iconCls:'compile',
		disabled:p.get('rowAction')=='N',
		scope:this,menu:{items:serviceM}};
	
		
	var b20=new Ext.Toolbar.TextItem({itemId:'TB_M',
		text:C_STATUS+'：'+(p.get('consBizClass')==BC_I?HTStore.getCIST(p.get('consStatus')):
			HTStore.getCOST(p.get('consStatus')))});
	var tbs=[btSave,'-',btAction,'-',btInvalid,'-',btSaveAs,'-',btUnlock,'-',btExp,'->',
		     bCargo,'-',bExpe,'-',bDoc,'-',bBL,'-',btService];
	
	Fos.ConsignTab.superclass.constructor.call(this, { 
		id:"T_CONS_" + p.get("uuid"),title:C_CONSIGN+'-'+p.get("consNo"),header:false,layout:'border',		
		items:[t1,{region:'center',xtype:'tabpanel',activeTab:0,items:[t2,t3,t4,t5]}],
		tbar:tbs,
		bbar:[{xtype:'tbtext',text:C_CREATE_BY_C+p.get('createBy')},'-',
 			{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
			{xtype:'tbtext',text:C_MODIFY_BY_C+p.get('modifyBy')},'-',
			{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))},'->',
			 b20,'-'
			]
	});
};
Ext.extend(Fos.ConsignTab,Ext.Panel);

Fos.ConsLookupWin = function(bizClass,bizType,shipType,action,store,queryParams){
	var t1={id:'T_CONS_LOOK_1',title:C_LOOK_BY_NO,layout:'form',labelWidth:70,labelAlign:"right",
		items:[{fieldLabel:C_CONS_NO,name:'consNo',xtype:'textarea',anchor:'90%'},
    		{boxLabel:C_LOOK_SMART,name:'consNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};
	var t6={id:'T_CONS_LOOK_6',title:C_LOOK_BY_CONT_NO,layout:'form',labelWidth:70,labelAlign:"right",
		items: [{fieldLabel:C_CONT_NO,name:'contNo',xtype:'textarea',anchor:'90%'},
			{boxLabel:C_LOOK_SMART,name:'contNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};	
	var t2={id:'T_CONS_LOOK_2',title:C_LOOK_BY_MBL,layout:'form',labelWidth:70,labelAlign:"right",
		items: [{fieldLabel:'M/BL No.',name:'consMblNo',xtype:'textarea',anchor:'90%'},
			{boxLabel:C_LOOK_SMART,name:'consMblNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};
	var t3={id:'T_CONS_LOOK_3',title:C_LOOK_BY_HBL,layout:'form',labelWidth:70,labelAlign:"right",
		items: [{fieldLabel:'H/BL No.',name:'consHblNo',xtype:'textarea',anchor:'90%'},
			{boxLabel:C_LOOK_SMART,name:'consHblNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};
	var t4={id:'T_CONS_LOOK_4',title:C_LOOK_BY_VOYA,layout:'form',labelWidth:70,labelAlign:"right",
		items:[{fieldLabel:HL(C_VESS),tabIndex:5,name:'vessName',store:HTStore.getVES(),
          		xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,enableKeyEvents:true,
          		mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'50%',
              		listeners:{scope:this,keydown:{fn:function(f,e){LV(f,e);},buffer:500}}},
        	{fieldLabel:C_VOYA,tabIndex:10,name:'voyaName',xtype:'textfield',anchor:'50%'}]};
    var t5={id:'T_CONS_LOOK_5',title:C_LOOK_COMPLEX,layout:'column',
    	items:[{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	    	items:[{fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),
	    			xtype:'customerLookup',custType:'custBookerFlag',bizType:'M',
	        		displayField:'custCode',valueField:'custId',typeAhead:true,enableKeyEvents:true,
	        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'90%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){
	              		loadCustomer(f,e,'custBookerFlag','M',1);
	              	},buffer:500}}},
					{fieldLabel:C_BIZ_TYPE,tabIndex:7,name:'consBizType',store:HTStore.BT_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_POL,name:'consPol',store:HTStore.getPS(),xtype:'combo',
						displayField:'portNameEn',valueField:'portId',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},	             		
	        	{fieldLabel:C_DEPT,name:'grouId',store:HTStore.getGROU_S(),xtype:'combo',
	        		displayField:'grouName',valueField:'grouId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_OPERATOR,name:'consOperatorId',store:HTStore.getOP_S(),xtype:'combo',
	        			displayField:'userLoginName',valueField:'userId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_TRADE_CONTRACT_NO,name:'consTradeContractNo',xtype:'textfield',anchor:'90%'},
	        	{fieldLabel:C_SHIP_TYPE,name:'consShipType',value:shipType,
	        		store:HTStore.SHTY_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:'S/O No.',name:'consSoNo',xtype:'textfield',anchor:'90%'},
	         	{fieldLabel:C_CONS_AUDIT_STATUS,name:'consStatusAud',xtype:'combo',
	         		store:HTStore.AUST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:C_WRITEOFF_STATUS_R,name:'consStatusAr',xtype:'combo',
	         			store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
	      	{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	   		items:[{fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_SAIL_DATE,name:'consEtd',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_ETA,name:'consEta',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_POD,tabIndex:47,name:'consPod',store:HTStore.getPS(),xtype:'combo',
	        		displayField:'portNameEn',valueField:'portId',typeAhead: true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'90%',
              		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,listeners:{scope:this,
              			keydown:{fn:LP,buffer:BF}}},
	        	{fieldLabel:C_SALES,name:'consSalesRepId',store:HTStore.getSALE_S(),xtype:'combo',
              				displayField:'userLoginName',valueField:'userId',typeAhead: true,
              				mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_CONTRACT_NO,name:'consContractNo',xtype:'textfield',anchor:'90%'},
	        	{fieldLabel:C_CARRIER,name:'consCarrier',store:HTStore.getCS(),enableKeyEvents:true,
	        		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        		xtype:'customerLookup',custType:'custCarrierFlag',bizType:'M',
	        		displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        		listeners:{scope:this,keydown:{fn:function(f,e){
	        			LC(f,e,'custCarrierFlag');},buffer:500}}},
	        	{fieldLabel:C_OVERSEA_AGENCY,name:'consOverseaAgency',store:HTStore.getCS(),enableKeyEvents:true,
	        	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        	xtype:'customerLookup',custType:'custOverseaAgencyFlag',bizType:'M',
	        	displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custOverseaAgencyFlag');},buffer:500}}},
				{fieldLabel:C_INVO_STATUS_R,name:'consStatusInvoR',xtype:'combo',store:HTStore.INST_S,
	        		displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
				{fieldLabel:C_WRITEOFF_STATUS_P,name:'consStatusAp',xtype:'combo',store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
			{columnWidth:.34,layout:'form',border:false,labelWidth:80,labelAlign:"right",
			items:[{fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_TO,name:'consEtd2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_TO,name:'consEta2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_CARGO_SOURCE,name:'consSource',store:HTStore.SOUR_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:C_REF_NO,name:'consRefNo',xtype:'textfield',anchor:'90%'},	        	
	        	{fieldLabel:C_BOOK_AGENCY,name:'consBookingAgency',store:HTStore.getCS(),
              		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
              		displayField:'custCode',valueField:'custId',
              		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
              		anchor:'90%',enableKeyEvents:true,
              		listeners:{scope:this,
	         			keydown:{fn:function(f,e){
	         				loadCustomer(f,e,'custBookingAgencyFlag','M',1);
	         			},buffer:500}}},
	       		{fieldLabel:C_CONTAINER,name:'consContainerCompany',store:HTStore.getCS(),enableKeyEvents:true,
	       			tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	       			xtype:'customerLookup',custType:'custContainerFlag',bizType:'M',
	       			displayField:'custCode',valueField:'custId',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	       				listeners:{scope:this,keydown:{fn:function(f,e){
	         				LC(f,e,'custContainerFlag');},buffer:500}}},
				{fieldLabel:C_EXPE_CONFIRM_STATUS,name:'consStatusExp',xtype:'combo',store:HTStore.EXPC_S,
	       					displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
				{fieldLabel:C_INVO_STATUS_P,name:'consStatusInvoP',xtype:'combo',store:HTStore.INST_S,
	       						displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}
			]}
		]};
	var tabs;
	if(action=='CONS_X'){
		tabs=(bizClass==BC_E)?[t1,t6,t2,t3,t4,t5]:[t1,t2,t3,t4,t5];
	}
	else if(action=='CONS_CHECK_X'){
		tabs=[t1,t2,t3,t4,t5];
	}
	this.reload=function(){
     	var a=[];var op=1;
     	if(bizClass!='')
     		a[a.length]=new QParam({key:'consBizClass',value:bizClass,op:1});
     	if(bizType!='')
     		a[a.length]=new QParam({key:'consBizType',value:bizType,op:1});
     	if(shipType!='')
     		a[a.length]=new QParam({key:'consShipType',value:shipType,op:1});
     	var at = t.getActiveTab();
     	if(at.getId()=='T_CONS_LOOK_1'){
     		var consNo=at.find('name','consNo')[0].getValue();
     		var consNoM=at.find('name','consNoM')[0].getValue();
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
    		else if(consNoM){
     			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
    		}
     	}     	
     	else if(at.getId()=='T_CONS_LOOK_2'){
     		var consMblNo=at.find('name','consMblNo')[0].getValue();
     		var consMblNoM=at.find('name','consMblNoM')[0].getValue();
     		if(consMblNoM) op=7;
     		a[a.length]=new QParam({key:'consMblNo',value:consMblNo,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_3'){
     		var consHblNo=at.find('name','consHblNo')[0].getValue();
     		var consHblNoM=at.find('name','consHblNoM')[0].getValue();
     		if(consHblNoM) op=7;
     		a[a.length]=new QParam({key:'consHblNo',value:consHblNo,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_4'){
     		var vessName=at.find('name','vessName')[0].getValue();
     		var voyaId=at.find('name','voyaName')[0].getValue();
     		if(vessName) 
     			a[a.length]=new QParam({key:'vessName',value:vessName,op:LI});
     		if(voyaId) 
     			a[a.length]=new QParam({key:'voyaName',value:voyaId,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_5'){
     		var custId=at.find('name','custId')[0].getValue();
     		if(custId) 
     			a[a.length]=new QParam({key:'custId',value:custId,op:op});
     		var consBizType=at.find('name','consBizType')[0].getValue();        		
     		if(consBizType) 
     			a[a.length]=new QParam({key:'consBizType',value:consBizType,op:op});
     		var consPol=at.find('name','consPol')[0].getValue();        		
     		if(consPol) 
     			a[a.length]=new QParam({key:'consPol',value:consPol,op:op});
     		
     		var grouId=at.find('name','grouId')[0].getValue();        		
     		if(grouId) 
     			a[a.length]=new QParam({key:'grouId',value:grouId,op:op});
     		var consSalesRepId=at.find('name','consSalesRepId')[0].getValue();        		
     		if(consSalesRepId) 
     			a[a.length]=new QParam({key:'consSalesRepId',value:consSalesRepId,op:op});
     		var consTradeContractNo=at.find('name','consTradeContractNo')[0].getValue();        		
     		if(consTradeContractNo) 
     			a[a.length]=new QParam({key:'consTradeContractNo',value:consTradeContractNo,op:op});
     		
     		var consStatusAud=at.find('name','consStatusAud')[0].getValue();        		
     		if(consStatusAud) 
     			a[a.length]=new QParam({key:'consStatusAud',value:consStatusAud,op:op});
     		var consStatusAr=at.find('name','consStatusAr')[0].getValue();        		
     		if(consStatusAr) 
     			a[a.length]=new QParam({key:'consStatusAr',value:consStatusAr,op:op});
     		var consStatusAp=at.find('name','consStatusAp')[0].getValue();        		
     		if(consStatusAp) 
     			a[a.length]=new QParam({key:'consStatusAp',value:consStatusAp,op:op});
     		var consStatusInvoR=at.find('name','consStatusInvoR')[0].getValue();        		
     		if(consStatusInvoR) 
     			a[a.length]=new QParam({key:'consStatusInvoR',value:consStatusInvoR,op:op});
     		var consStatusInvoP=at.find('name','consStatusInvoP')[0].getValue();        		
     		if(consStatusInvoP) 
     			a[a.length]=QParam({key:'consStatusInvoP',value:consStatusInvoP,op:op});
     		var consStatusExp=at.find('name','consStatusExp')[0].getValue();        		
     		if(consStatusExp) 
     			a[a.length]=QParam({key:'consStatusExp',value:consStatusExp,op:op});
     		
     		var consDate=at.find('name','consDate')[0].getValue();
     		var consDate2=at.find('name','consDate2')[0].getValue();
     		if(consDate && consDate2){
     			a[a.length]=QParam({key:'consDate',value:consDate.format(DATEF),op:5});
     			a[a.length]=QParam({key:'consDate',value:consDate2.format(DATEF),op:3});
     		}
     		else if(consDate) 
     			a[a.length]=QParam({key:'consDate',value:consDate,op:op});
     		var consEtd=at.find('name','consEtd')[0].getValue();
     		var consEtd2=at.find('name','consEtd2')[0].getValue();
     		if(consEtd && consEtd2){
     			a[a.length]=QParam({key:'consEtd',value:consEtd.format(DATEF),op:5});
     			a[a.length]=QParam({key:'consEtd',value:consEtd2.format(DATEF),op:3});
     		}
     		else if(consEtd) 
     			a[a.length]=QParam({key:'consEtd',value:consEtd,op:op});
     		
     		var consEta=at.find('name','consEta')[0].getValue();
     		var consEta2=at.find('name','consEta2')[0].getValue();
     		if(consEta && consEta2){
     			a[a.length]=QParam({key:'consEta',value:consEta.format(DATEF),op:5});
     			a[a.length]=QParam({key:'consEta',value:consEta2.format(DATEF),op:3});
     		}
     		else if(consEta) 
     			a[a.length]=QParam({key:'consEta',value:consEta,op:op}); 
     		
     		var consOperatorId=at.find('name','consOperatorId')[0].getValue();        		
     		if(consOperatorId) 
     			a[a.length]=QParam({key:'consOperatorId',value:consOperatorId,op:op});
     		var consContractNo=at.find('name','consContractNo')[0].getValue();        		
     		if(consContractNo) 
     			a[a.length]=QParam({key:'consContractNo',value:consContractNo,op:op});
     		var consPod=at.find('name','consPod')[0].getValue();        		
     		if(consPod) 
     			a[a.length]=QParam({key:'consPod',value:consPod,op:op});
     		var consSource=at.find('name','consSource')[0].getValue();        		
     		if(consSource) 
     			a[a.length]=QParam({key:'consSource',value:consSource,op:op});
     		var consRefNo=at.find('name','consRefNo')[0].getValue();        		
     		if(consRefNo) 
     			a[a.length]=QParam({key:'consRefNo',value:consRefNo,op:op});
     		var consSoNo=at.find('name','consSoNo')[0].getValue();
     		if(consSoNo) 
     			a[a.length]=QParam({key:'consSoNo',value:consSoNo,op:op});
     		var consCarrier=at.find('name','consCarrier')[0].getValue();        		
     		if(consCarrier) 
     			a[a.length]=QParam({key:'consCarrier',value:consCarrier,op:op});
     		var consOverseaAgency=at.find('name','consOverseaAgency')[0].getValue();        		
     		if(consOverseaAgency) 
     			a[a.length]=QParam({key:'consOverseaAgency',value:consOverseaAgency,op:op});
     		var consBookingAgency=at.find('name','consBookingAgency')[0].getValue();        		
     		if(consBookingAgency) 
     			a[a.length]=QParam({key:'consBookingAgency',value:consBookingAgency,op:op});
     		var consContainerCompany=at.find('name','consContainerCompany')[0].getValue();        		
     		if(consContainerCompany) 
     			a[a.length]=QParam({key:'consContainerCompany',value:consContainerCompany,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_6'){
     		var contNo=at.find('name','contNo')[0].getValue();
     		if(contNo) 
     			action='CONS_CONTNO_X';
     		a[a.length]=QParam({key:'contNo',value:contNo,op:7});
     	}
     	queryParams = a;
     	store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
     	store.reload({params:{start:0,limit:C_PS},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};	
	var t = new Ext.TabPanel({id:'T_CONS_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:340,
		defaults:{bodyStyle:'padding:10px'},items:tabs});
    Fos.ConsLookupWin.superclass.constructor.call(this, {title:C_CONS_QUERY,iconCls:'search',modal:true,width:800,height:360,minWidth:400,
        minHeight:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:t,
		buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.ConsLookupWin, Ext.Window);

Fos.CargoLookupWin = function(a,consId) {    
	var store = new Ext.data.GroupingStore({url:SERVICE_URL+'?_A='+a,
 		reader: new Ext.data.XmlReader({record:'FCargo'}, FCargo),groupField:'consNo',sortInfo:{field:'cargId', direction:'ASC'}});
    if(a=='CARG_MID_Q')
    	store.load({params:{consMasterId:consId}});
    else
    	store.load({params:{consId:consId}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel([sm,
	{header:C_CONS_NO,dataIndex:'consNo',width:80},
	{header:C_MARKS,dataIndex:'cargMarks',width:80},
	{header:C_CARGO_NAME_EN,dataIndex:'cargNameEn',width:80},
	{header:C_PACKAGES,dataIndex:'cargPackageNum',width:60},
	{header:C_PACK,dataIndex:'packId',width:80,renderer:getPACK},	
	{header:C_NET_WEIGHT,dataIndex:'cargNetWeight',width:60},
	{header:C_GROSS_WEIGHT,dataIndex:'cargGrossWeight',width:60},	
	{header:C_CBM,dataIndex:'cargMeasurement',width:60},
	{header:C_MBL_NO,dataIndex:'consMblNo',width:80},
	{header:C_HBL_NO,dataIndex:'consHblNo',width:80},
	{header:C_BOOKER,dataIndex:'custName',width:80},
	{header:C_MANU_NO,dataIndex:'cargManuNo',width:80},
	{header:C_SPEC,dataIndex:'cargSpec',width:80},	
	{header:C_CARGO_NAME_CN,dataIndex:'cargNameCn',width:80},
	{header:C_HS_CODE,dataIndex:'cargNo',width:100},
	{header:C_UNIT,dataIndex:'cargUnit',width:100}]);
	cm.defaultSortable = true;
    var g = new Ext.grid.GridPanel({ 
    id:'G_CARG_LOOKUP',iconCls:'gen',header:false,height:300,width:600,store:store,sm:sm,cm:cm,loadMask: true});	
    Fos.CargoLookupWin.superclass.constructor.call(this,{title:C_CARGO_SEL,modal:true,layout:'fit',width:600,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:[{layout:'fit',border:false,
        items: [g]}]}); 
};
Ext.extend(Fos.CargoLookupWin,Ext.Window);