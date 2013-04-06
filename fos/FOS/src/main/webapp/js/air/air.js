var getAirPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});
	var panels = [];
	var menuImp=[];
	
	var getAddConsignMenu = function(bizClass){
		var p = new FConsign({uuid:HTUtil.UUID(32),
    		consNotifyParty:'SAME AS CONSIGNEE',
    		consShipType:'',
    		consBizClass:bizClass,
    		consBizType:BT_A,
    		consMasterFlag:0,
    		consSource:0,
    		consDate:new Date(),
    		tranCode:'CY-CY',
    		consStatus:0,
    		consStatusExp:0,
    		consStatusAr:0,
    		consStatusAp:0,
    		consStatusInvoR:0,
    		consStatusInvoP:0,
    		consStatusAud:0,
    		consStatusLock:0,    				
    		consTransFlag:0,
    		consPartialFlag:0,
    		consPol:bizClass==BC_E?HTStore.getCFG('BASE_PORT'):'',
    		consPolEn:bizClass==BC_E?HTStore.getCFGD('BASE_PORT'):'',
    		consPod:bizClass==BC_I?HTStore.getCFG('BASE_PORT'):'',
    		consPodEn:bizClass==BC_I?HTStore.getCFGD('BASE_PORT'):'',
    		grouId:HTStore.getCFG('DEFAULT_DEPT_'+BT_A),
    		grouName:HTStore.getCFGD('DEFAULT_DEPT_'+BT_A),
    		consOperatorId:sessionStorage.getItem("USER_ID"),
    		consOperatorName:sessionStorage.getItem("USER_NAME"),
    		consFumigateFlag:0,
    		consQuarantineFlag:0,
    		consTransferringFlag:0,
    		consShutoutFlag:0,
    		version:0,rowAction:'N'});
		if(bizClass=='I'){
			return {text:C_ADD+C_IMP+C_CONS,iconCls:'grid',disabled:!HR(M1_AIR+M2_I+F_M),scope:this,
				handler:function(){
					createWindow('CONS_'+p.get("uuid"),
							p.get('rowAction')=='N'?C_ADD_CONSIGN:C_CONSIGN+'-'+p.get('consNo'),
			    			new Fos.AirConsignTab(p),true,1000,600);
				}
	 		};			
		}
		else{
			return {text:C_ADD+C_EXP+C_CONS,iconCls:'grid',disabled:!HR(M1_AIR+M2_E+F_M),scope:this,
				handler:function(){
					createWindow('CONS_'+p.get("uuid"),
							p.get('rowAction')=='N'?C_ADD_CONSIGN:C_CONSIGN+'-'+p.get('consNo'),
			    			new Fos.AirConsignTab(p),true,1000,600);
				}
	 		};			
		}
    };
	menuImp[menuImp.length]= getAddConsignMenu('I');	
	menuImp[menuImp.length]=FosMenu(panel,C_IMP+C_CONS_LIST,'G_CONS_I_A',
		function(){return new Fos.AirConsignGrid('I');},!HR(M1_AIR+M2_I));
	var impPanel = new Ext.Panel({title:C_IMP,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:menuImp})});
	panels[panels.length]=impPanel;
	//bottons[bottons.length] = {text:C_IMP,menu:menuImp};
	
	var menuExp=[];
	menuExp[menuExp.length] = getAddConsignMenu('E');	
	menuExp[menuExp.length] = FosMenu(panel,C_EXP+C_CONS_LIST,'G_CONS_E_A',function(){return new Fos.AirConsignGrid('E');});
	var expPanel = new Ext.Panel({title:C_EXP,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:menuExp})});
	panels[panels.length]=expPanel;
	//bottons[bottons.length] = {text:C_EXP,menu:menuExp};
	
	if(HR(M1_AIR+M2_DOC)){
		var menuDoc=[];
		menuDoc[menuDoc.length]=FosMenu(panel,C_DOC_ALL,'G_DOC_A',function(){return new Fos.DocGrid('A');});
		menuDoc[menuDoc.length]=FosMenu(panel,C_DOC_NOT_RETURN,'G_DOC_B',function(){return new Fos.DocGrid('B');});
		menuDoc[menuDoc.length]=FosMenu(panel,C_DOC_RETURN_NOT_BACK,'G_DOC_C',function(){return new Fos.DocGrid('C');});
		menuDoc[menuDoc.length]=FosMenu(panel,C_DOC_BACK,'G_DOC_D',function(){return new Fos.DocGrid('D');});
		//bottons[bottons.length] = {text:C_DOC,menu:menuDoc};
		var docPanel = new Ext.Panel({title:C_DOC,collapsible:true,layout:'fit',
			items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:menuDoc})});
		panels[panels.length]=docPanel;
	}
	
	var menuPanel = new Ext.Panel({region:"west",width:"130",collapsible:true,collapseMode:'mini',split:true,
		layout:'accordion',title:C_SYSTEM_MENU,items:panels});
	
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	
	return contPanel;
};

//bizClass类型参数是'I'还是'E'来判断进口,出口
Fos.AirConsignGrid = function(bizClass) {
	var a=[];
	a[a.length]=new QParam({key:'consBizClass',value:bizClass,op:1});
	a[a.length]=new QParam({key:'consBizType',value:BT_A,op:1});//因与海运用的是同一张表,所以需要根据它们的业务类型consBizType来判断是否是空运
	var bp={_A:'CONS_X',_mt:'xml',xml:HTUtil.QATX(a)};
	var store = new Ext.data.GroupingStore({
   		url: SERVICE_URL,baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FConsign',idProperty:'id'}, FConsign),
    	remoteSort:true,sortInfo:{field:'consDate', direction:'DESC'}});
	store.load({params:{start:0,limit:C_PS20}});		
    	
	var sm=new Ext.grid.RowSelectionModel({singleSelect:true});
	var c1=new Ext.grid.RowNumberer();
    var cm=new Ext.grid.ColumnModel({columns:
    	[c1,
    	 {header:'',dataIndex:'consStatusLock',menuDisabled:true,fixed:true,width:25,renderer:function(v){
    		 if(v==1) return '<div class="locked"></div>'; else return '';
    	 }},
    	 {header:C_STATUS,width:60,dataIndex:"consStatus",renderer:bizClass==BC_E?HTStore.getCOST:HTStore.getCIST},
    	 {header:C_CONS_NO,width:120,dataIndex:"consNo"},
    	 {header:C_BOOKER,width:200,dataIndex:"custName"},
    	 {header:C_CONS_DATE,width:90,dataIndex:"consDate",renderer:formatDate},
    	 {header:C_TTER,dataIndex:"tranCode",width:80},
    	 {header:C_PATE,dataIndex:"pateCode",width:80},
    	 {header:C_FLIGHT,width:80,dataIndex:"voyaName"},
    	 {header:C_DEPARTURE_DATE,dataIndex:"consSailDate",renderer:formatDate},
    	 {header:C_POL,dataIndex:"consPolEn"},
    	 {header:C_POD,width:100,dataIndex:"consPodEn"},
    	 {header:'MAWB No.',width:80,dataIndex:"consMblNo"},
    	 {header:'HAWB No.',width:80,dataIndex:"consHblNo"},
    	 {header:C_PACKAGES,width:80,dataIndex:"consTotalPackages",align:'right',css:'font-weight:bold;'},
    	 {header:C_GW_S,width:80,dataIndex:"consTotalGrossWeight",
    		 renderer:rateRender,align:'right',css:'font-weight:bold;'},
    	 {header:C_CBM,width:80,dataIndex:"consTotalMeasurement",renderer:rateRender,align:'right',css:'font-weight:bold;'},
    	 {header:C_CARRIER,dataIndex:"consCarrierName"},
    	 {header:C_BOOK_AGENCY,dataIndex:"consBookingAgencyName"},
    	 {header:C_REMARKS,dataIndex:"consRemarks"},
    	 {header:C_CONTRACT_NO,dataIndex:"consContractNo"},
    	 {header:C_CARGO_OWNER,width:200,dataIndex:"consCargoOwnerName"},
    	 {header:C_OPERATOR,width:80,dataIndex:"consOperatorName"},
    	 {header:C_ETA,dataIndex:"consEta",renderer:formatDate}
    	 ],
		defaults: {sortable: true}});
    var newConsign = function(){
    	var c = new FConsign({uuid:HTUtil.UUID(32),
    		consNotifyParty:'SAME AS CONSIGNEE',
    		consShipType:'',
    		consBizClass:bizClass,
    		consBizType:BT_A,
    		consMasterFlag:0,
    		consSource:0,
    		consDate:new Date(),
    		tranCode:'CY-CY',
    		consStatus:0,
    		consStatusExp:0,
    		consStatusAr:0,
    		consStatusAp:0,
    		consStatusInvoR:0,
    		consStatusInvoP:0,
    		consStatusAud:0,
    		consStatusLock:0,    				
    		consTransFlag:0,
    		consPartialFlag:0,
    		consPol:bizClass==BC_E?HTStore.getCFG('BASE_PORT'):'',
    		consPolEn:bizClass==BC_E?HTStore.getCFGD('BASE_PORT'):'',
    		consPod:bizClass==BC_I?HTStore.getCFG('BASE_PORT'):'',
    		consPodEn:bizClass==BC_I?HTStore.getCFGD('BASE_PORT'):'',
    		grouId:HTStore.getCFG('DEFAULT_DEPT_'+BT_A),
    		grouName:HTStore.getCFGD('DEFAULT_DEPT_'+BT_A),
    		consOperatorId:sessionStorage.getItem("USER_ID"),
    		consOperatorName:sessionStorage.getItem("USER_NAME"),
    		consFumigateFlag:0,
    		consQuarantineFlag:0,
    		consTransferringFlag:0,
    		consShutoutFlag:0,
    		consCustomsDeclarTime:'8:00 AM',
    		version:0,rowAction:'N'});
    	return c;
    };
    
    this.showConsign = function(p){
    	createWindow('CONS_'+p.get("uuid"),p.get('rowAction')=='N'?C_ADD_CONSIGN:C_CONSIGN+'-'
    			+p.get('consNo'),
    			new Fos.AirConsignTab(p,store),true,1000,600);
    };    
	
	this.addConsign = function(){
		var c=newConsign();
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
               		if(a[i].get('consStatus')!='0'){
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
		var w=new Fos.ConsLookupWin(bizClass,BT_A,'','CONS_X',store);
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
     	a[a.length]=new QParam({key:'consBizType',value:BT_A,op:EQ});
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
		else{
			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'CONS_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
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
	
  	var title=HTStore.getBT(BT_A);
  	title+=HTStore.getBC(bizClass);	
	title+=C_CONS_LIST;	
	var m=M3_CONS;  
    
	Fos.AirConsignGrid.superclass.constructor.call(this, {
	    id:'G_CONS_'+bizClass+'_A',iconCls:'grid',
	    store: store,title:title,header:false,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		view:new Ext.grid.GroupingView(groupViewCfg),
		listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
					var c=sm.getSelected();
					if(c){this.showConsign(c);
				}
			}
		},
		tbar:[
		      {text:C_ADD,disabled:false,iconCls:'add',scope:this,handler:this.addConsign},'-',
		      {text:C_EDIT,disabled:NR(m+F_V),iconCls:'option',scope:this,handler:this.editConsign},'-',
		      {text:C_REMOVE,disabled:NR(m+F_M),iconCls:'remove',scope:this,handler:this.removeConsign},'-',
		      {text:C_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
		      {text:C_EXPORT,disabled:NR(m+F_M),iconCls:'print',scope:this,handler:this.exp},'-',kw,'-',
		      {text:C_FAST_SEARCH,iconCls:'search',scope:this,handler:this.fastSearch},'-',
		      {text:C_TASK,iconCls:'task',scope:this,handler:this.task}
		 	],
		bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.AirConsignGrid, Ext.grid.GridPanel);

Fos.AirConsignTab = function(p,listStore) {	
	var cargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=CARG_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FCargo',id:'id'},FCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	if(p.get('rowAction')!='N')
		cargoStore.load({params:{consId:p.get('id')}});
	
	var copyConsign = function(p){
		var c = new FConsign({});		
		var f = FConsign.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
			var fn = ''+f.keys[i];
			c.set(fn,p.get(fn));
		};
		c.set('consDate',new Date());
		c.set('consNo','');
		c.set('version',1);
		c.set('consStatus',0);
		c.set('consStatusExp',0);
		c.set('consStatusAud',0);
		c.set('consStatusAr',0);
		c.set('consStatusAp',0);
		c.set('consStatusInvoR',0);
		c.set('consStatusInvoP',0);
		c.set('consStatusLock',0);
		c.set('rowAction','N');
		c.set('consMasterFlag','0');
		c.set('consMasterId','');
		c.set('consBizType',BT_A);
		c.set('uuid',HTUtil.UUID(32));
		return c;
	};
    this.save = function(){
    	if(!HTUtil.checkFieldNotNull(C_BOOKER,cboCustName))
			return;
    	if(!HTUtil.checkFieldNotNull(C_BIZ_DEPARTMENT,cboGrouName))
			return;
    	if(!HTUtil.checkFieldNotNull(C_SALES,cboConsSalesRepName))
			return;
    	if(!HTUtil.checkFieldNotNull(C_OPERATOR,cboConsOperatorName))
			return;
    	if(!HTUtil.checkFieldNotNull(C_POL,cboConsPol))
			return;
    	if(!HTUtil.checkFieldNotNull(C_POD,cboConsPod))
			return;
		
    	HTUtil.saveToRecord(this,p);
   	 	
   	 	var xml = HTUtil.RTX(p,'FConsign',FConsign); 
   	 	var cargos = cargoStore.getModifiedRecords();
		if(cargos.length>0){
			var x = HTUtil.ATX(cargos,'FCargo',FCargo);
			xml=xml+x;
		};
		
   	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
   	 		params:{_A:'CONS_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
				var rowAction  = p.get('rowAction');
				
				var f = FConsign.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};   				
				if(rowAction == 'N'){					
					txtConsNo.setValue(p.get('consNo'));
					txtConsHblNo.setValue(p.get('consNo'));
					txtConsWarehouseNo.setValue(p.get('consNo'));
					p.set('rowAction','M');
					this.updateToolBar(p.get('consStatus'));
					if(listStore)
						listStore.insert(0,p);
				}
				p.endEdit();
				
				var a = HTUtil.XTRA(res.responseXML,'FCargo',FCargo);
				HTUtil.RUA(cargoStore,a,FCargo);
				
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    }; 
		
	//业务号
    var txtConsNo = new Ext.form.TextField({fieldLabel:C_CONS_NO,tabIndex:1,
    	style:'{font-weight:bold;color:green;}',disabled:true,enableKeyEvents:true,
		tabIndex:5,name:'consNo',value:p.get('consNo'),anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboGrouName.focus();
				} 
			}
		}
	});
    
  //部门
    var cboGrouName = new Ext.form.ComboBox({fieldLabel:C_DEPT,itemCls:'required',tabIndex:2,
    	name:'grouName',value:p.get('grouName'),enableKeyEvents:true,
		store:HTStore.getGROU_S(),
		displayField:'grouName',valueField:'grouName',typeAhead: true,mode: 'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('grouId','');
				}
			},
			select:function(c,r,v){
				p.set('grouId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsSalesRepName.focus();
				} 
			}
		}
   	});
    
	//业务员
    var cboConsSalesRepName = new Ext.form.ComboBox({fieldLabel:C_SALES,itemCls:'required',tabIndex:3,
    	name:'consSalesRepName',value:p.get('consSalesRepName'),enableKeyEvents:true,
		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consSalesRepId','');
					p.set('consSalesRepName','');
				}
			},
	    	select:function(c,r,i){
	    		p.set('consSalesRepId',r.get('id'));
	    	},
	    	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsOperatorName.focus();
				} 
			}
		}
    });
    
  //操作员
    var cboConsOperatorName = new Ext.form.ComboBox({fieldLabel:C_OPERATOR,itemCls:'required',tabIndex:4,
		name:'consOperatorName',value:p.get('consOperatorName'),enableKeyEvents:true,
		store:HTStore.getOP_S(),displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consOperatorId','');
				}
			},
			select:function(c,r,i){
				p.set('consOperatorId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboCustName.focus();
				} 
			}
		}
    });
    
    //委托单位
    var cboCustName = new Fos.CustomerLookup({fieldLabel:C_BOOKER,itemCls:'required',tabIndex:5,
   		name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
  		custType:'custBookerFlag',bizType:'A',displayField:'custCode',
  		valueField:'custCode',typeAhead:true,
  		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
  		triggerAction:'all',selectOnFocus:true,
  		anchor:'99%',
        listeners:{scope:this,
        	blur:function(f){
        		if(f.getRawValue()==''){
        			f.clearValue();
        			p.set('custId','');
        			p.set('custSname','');
     				p.set('consSalesRepName','');
        		}
        	},
        	select:function(c,r,i){
        		txtCustContact.setValue(r.get('custContact'));
        		txtCustTel.setValue(r.get('custTel'));
        		txtCustFax.setValue(r.get('custFax'));
        		cboConsSalesRepName.setValue(r.get('custSalesName'));
        		this.find('name','custName')[0].setValue(r.get('custNameCn'));
				p.set('custId',r.get('id'));
				p.set('custSname',r.get('custCode'));
			},
			keydown:{fn:function(f,e){
					loadCustomer(f,e,'custBookerFlag','A',1);
					if(e.getKey()==e.ENTER){
						txtCustContact.focus();
					} 
				},buffer:BF
			}
		}
	});
    
    //联系人
    var txtCustContact  = new Ext.form.TextField({fieldLabel:C_CONTACT,tabIndex:6,
    	name:'custContact',value:p.get('custContact'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			scope:this,
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustTel.focus();
				} 
			}
		}
	});
    
    //联系电话
    var txtCustTel = new Ext.form.TextField({fieldLabel:C_PHONE,tabIndex:7,
    	name:'custTel',value:p.get('custTel'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustFax.focus();
				} 
			}
		}
	});
    
	//传真
    var txtCustFax = new Ext.form.TextField({fieldLabel:C_FAX,tabIndex:8,
    	name:'custFax',value:p.get('custFax'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsRefNo.focus();
				} 
			}
		}
	});
    
  //客户业务号
    var txtConsRefNo = new Ext.form.TextField({fieldLabel:C_REF_NO,tabIndex:9,
    	name:'consRefNo',value:p.get('consRefNo'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsSource.focus();
				} 
			}
		}
	});
    
  //揽货方式
    var txtConsSource  = new Ext.form.ComboBox({fieldLabel:C_CARGO_SOURCE,tabIndex:10,
    	name:'consSource',value:p.get('consSource'),enableKeyEvents:true,
		store:HTStore.SOUR_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,
   		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtConsDate.focus();
				} 
			}
		}
	});
    
	//委托日期
    var dtConsDate = new Ext.form.DateField({fieldLabel:C_CONS_DATE,tabIndex:11,
    	name:'consDate',value:p.get('consDate'),format:DATEF,anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtConsDeliveryDate.focus();
				} 
			}
		}
	});    
    
    
    //交货日期
    var dtConsDeliveryDate = new Ext.form.DateField({fieldLabel:C_DELIVERY_DATE,tabIndex:12,
    	name:'consDeliveryDate',value:p.get('consDeliveryDate'),
    	format:DATEF,anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboTranCodeCarrier.focus();
				} 
			}
		}
	});	
    		
	//运输条款(M)
    var cboTranCodeCarrier = new Ext.form.ComboBox({fieldLabel:C_TTER+'(M)',tabIndex:13,
    	name:'tranCodeCarrier',value:p.get('tranCodeCarrier'),enableKeyEvents:true,
		store:HTStore.getTTA_S(),displayField:'tranCode',valueField:'tranCode',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboTranCode.focus();
				} 
			}
		}
	});
    
	//运输条款(M)
    var cboTranCode = new Ext.form.ComboBox({fieldLabel:C_TTER+'(H)',tabIndex:14,
    	name:'tranCode',value:p.get('tranCode'),enableKeyEvents:true,
		store:HTStore.getTTA_S(),displayField:'tranCode',valueField:'tranCode',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboPateCodeCarrier.focus();
				} 
			}
		}
	});
    
	//运费条款(M)
    var cboPateCodeCarrier = new Ext.form.ComboBox({fieldLabel:C_PATE+'(M)',tabIndex:15,
		name:'pateCodeCarrier',value:p.get('pateCodeCarrier'),enableKeyEvents:true,
		store:HTStore.getPATE_S(),
		displayField:'pateName',valueField:'pateName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',
		selectOnFocus:true,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboPateCode.focus();
				} 
			}
		}
	});
    		
  //运费条款(H)
    var cboPateCode = new Ext.form.ComboBox({fieldLabel:C_PATE+'(H)',tabIndex:16,
		name:'pateCode',value:p.get('pateCode'),enableKeyEvents:true,
		store:HTStore.getPATE_S(),
		displayField:'pateName',valueField:'pateName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',
		selectOnFocus:true,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsCarrierName.focus();
				} 
			}
		}
	});
    		
    
	//航空公司
	var cboConsCarrierName = new Fos.CustomerLookup({fieldLabel:C_FLIGHTER,itemClass:'needed',tabIndex:17,
		name:'consCarrierName',value:p.get('consCarrierName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custAirFlag',bizType:'A',
		displayField:'custNameCn',valueField:'custNameCn',typeAhead: true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consCarrier','');
					p.set('consCarrierCode','');
					p.set('consCarrierName','');
				}
			},
			select:function(c,r,i){
				p.set('consCarrier',r.get('id'));
				p.set('consCarrierCode',r.get('custCode'));
			},
			keydown:{fn:function(f,e){
					loadCustomer(f,e,'custAirFlag','A',1);
					if(e.getKey()==e.ENTER){
						txtVoyaName.focus();
					} 
				},buffer:BF
			}
		}
	});
	
	//航班
	var txtVoyaName = new Ext.form.TextField({fieldLabel:C_FLIGHT,itemCls:'needed',tabIndex:18,
		name:'voyaName',value:p.get('voyaName'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsMblNo.focus();
				} 
			}
		}
	});
	
	//MAWB No
	var txtConsMblNo = new Ext.form.TextField({fieldLabel:'MAWB No.',tabIndex:19,
		name:'consMblNo',value:p.get('consMblNo'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsHblNo.focus();
				} 
			}
		}
	});
	
	//HAWB No
	var txtConsHblNo = new Ext.form.TextField({fieldLabel:'HAWB No.',tabIndex:20,
		name:'consHblNo',value:p.get('consHblNo'),
    	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsBookingAgencyName.focus();
				} 
			}
		}
	});
	
	//订舱代理
	var cboConsBookingAgencyName = new Fos.CustomerLookup({fieldLabel:C_BOOK_AGENCY,tabIndex:21,
		name:'consBookingAgencyName',value:p.get('consBookingAgencyName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custBookingAgencyFlag',bizType:'A',
		displayField:'custCode',valueField:'custNameCn',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consBookingAgency','');
					p.set('consBookingAgencyName','');
				}
			},
        	select:function(c,r,i){
				p.set('consBookingAgency',r.get('id'));'\r\n'
				p.set('consBookingAgencySname',r.get('custCode'));
				txtConsBookingAgencyContact.setValue(r.get('custContact'));
				txtConsbookingAgencyTel.setValue(r.get('custTel'));
			},
        	keydown:{fn:function(f,e){        		
					loadCustomer(f,e,'custBookingAgencyFlag','A',1);
					if(e.getKey()==e.ENTER){
						txtConsBookingAgencyContact.focus();
					} 
				},buffer:BF
			}
		}
	});
	
	//订舱代理联系人
	var txtConsBookingAgencyContact = new Ext.form.TextField({fieldLabel:C_BOOK_AGENCY_CONTACT,tabIndex:22,
		name:'consBookingAgencyContact',value:p.get('consBookingAgencyContact'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsbookingAgencyTel.focus();
				} 
			}
		}
	});  
	
	//订舱代理电话
	var txtConsbookingAgencyTel = new Ext.form.TextField({fieldLabel:C_BOOK_AGENCY_TEL,tabIndex:23,
		name:'consBookingAgencyTel',value:p.get('consBookingAgencyTel'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtConsSailDate.focus();
				} 
			}
		}
	});
	
	//起飞日期
	var dtConsSailDate = new Ext.form.DateField({fieldLabel:C_DEPARTURE_DATE,tabIndex:24,
		name:'consSailDate',value:p.get('consSailDate'),itemCls:'needed',
		format:DATEF,anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsPol.focus();
				} 
			}
		}
	});	
	
	//装货港
    var cboConsPol = new Fos.PortLookup({fieldLabel:C_POL,itemCls:'required',tabIndex:25,
		name:'consPolEn',value:p.get('consPolEn'),portType:1,
		store:HTStore.getAirPortStore(),
		displayField:'portNameEn',valueField:'portNameEn',
		typeAhead: true,mode:'remote',
		triggerAction:'all',selectOnFocus:true,anchor:'99%',
		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
		listeners:{scope:this,
        	select:function(c,r,i){
            	if(p.get('consBizClass')==BC_I) 
            		cboConsTradeCountry.setValue(r.get('counCode'));
            	p.set('consPolCode',r.get('portCode'));
        	},
         	keydown:{fn:function(f,e){
         			LAP(f,e);
         			if(e.getKey()==e.ENTER){
         				cboConsPod.focus();
    				}
         		},buffer:BF
         	}
        }
    });
    
  //运抵国
    var cboConsTradeCountry = new Ext.form.ComboBox({
    		fieldLabel:p.get('consBizClass')==BC_E?C_COUNTRY_D:C_COUNTRY_L,tabIndex:26,
			disabled:true,name:'consTradeCountry',
			value:p.get('consTradeCountry'),store:HTStore.getCOUN_S(),xtype:'combo',
			displayField:'counNameEn',valueField:'counCode',typeAhead:true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'99%'
		});
		
		//中转港
    var cboConsPot = new Fos.PortLookup({fieldLabel:C_POT,tabIndex:28,
    	name:'consPotEn',value:p.get('consPotEn'),portType:1,
    	store:HTStore.getAirPortStore(),xtype:'portLookup',
    	displayField:'portNameEn',valueField:'portNameEn',
		typeAhead: true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
		listeners:{scope:this,
        	select:function(c,r,i){            	
            	p.set('consPotCode',r.get('portCode'));
            },
            keydown:{fn:function(f,e){
	     			LAP(f,e);
	     			if(e.getKey()==e.ENTER){
	     				cboConsOverseaAgency.focus();
					}
	     		},buffer:BF
            }
    	}
    });    
    
    //卸货港
    var cboConsPod = new Fos.PortLookup({fieldLabel:C_POD,itemCls:'required',tabIndex:27,
		name:'consPodEn',value:p.get('consPodEn'),portType:1,
		store:HTStore.getAirPortStore(),
		displayField:'portNameEn',valueField:'portNameEn',
		typeAhead: true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
		listeners:{scope:this,
        	select:function(c,r,i){
        		if(p.get('consBizClass')==BC_E) {
            		cboConsTradeCountry.setValue(r.get('counCode'));            
 					cboConsPot.setValue(r.get('portNameEn'));
            		p.set('consPodCode',r.get('portCode'));
            		p.set('consPotCode',r.get('portCode'));
        		}
            },
            keydown:{fn:function(f,e){
     			LAP(f,e);
     			if(e.getKey()==e.ENTER){
     				cboConsPot.focus();
				}
     		},buffer:BF
     	}
    	}
    });    
    
    
    //海外代理
    var cboConsOverseaAgency = new Fos.CustomerLookup({fieldLabel:C_OVERSEA_AGENCY,tabIndex:29,
		name:'consOverseaAgencyName',value:p.get('consOverseaAgencyName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custOverseaAgencyFlag',bizType:'A',
		displayField:'custCode',valueField:'custNameCn',typeAhead: true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
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
            	txtConsignee.setValue(r.get('custNameEn')+'\r\n'+r.get('custContact')+'\r\n'+r.get('custTel')+'\r\n'+r.get('custAddress2'));
 			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custOverseaAgencyFlag','A',1);
				if(e.getKey()==e.ENTER){
					cboDoAgency.focus();
				}
			},buffer:BF}
 		}
    });
    
    //换单代理
    var cboDoAgency = new Fos.CustomerLookup({fieldLabel:C_DO_AGENCY,tabIndex:30,
		name:'consDoAgencyName',value:p.get('consDoAgencyName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custDoAgencyFlag',bizType:'A',
		displayField:'custCode',valueField:'custNameCn',typeAhead: true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consDoAgency','');
					p.set('consDoAgencyName','');
				}
			},
			select:function(c,r,i){
            	p.set('consDoAgency',r.get('id'));
 			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custDoAgencyFlag','A',1);
				if(e.getKey()==e.ENTER){
					dtChangeDate.focus();
				}
			},buffer:BF}
 		}
    });
    
  //换单日期
    var dtChangeDate = new Ext.form.DateField({fieldLabel:C_CHANGE_DATE,tabIndex:31,
    	name:'consChangeDate',value:p.get('consChangeDate'),enableKeyEvents:true,
    	format:DATEF,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtConsEta.focus();
				} 
			}
		}
	});
    
  //到达日期
    var dtConsEta = new Ext.form.DateField({fieldLabel:C_ARRIVE_DATE,tabIndex:32,
    	name:'consEta',value:p.get('consEta'),enableKeyEvents:true,
    	format:DATEF,anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboShipper.focus();
				} 
			}
		}
	}); 
    
		
	//发货人(选择框）
	var cboShipper = new Ext.form.ComboBox({fieldLabel:C_SHIPPER,tabIndex:41,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtShipper.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'S',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtShipper.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//发货人
	var txtShipper = new Ext.form.TextArea({fieldLabel:'',tabIndex:42,
		name:'consShipper',value:p.get('consShipper'),
		height:80,anchor:'99%'
	}); 
	var synShipperConsignee = new Ext.Button({text:SYNCHRONOUS,padding:'padding-left:100px',
		listeners:{
			scope:this,
			click:function(b,e){
				txtActualShipper.setValue(txtShipper.getValue());
				txtActualConsignee.setValue(txtConsignee.getValue());
			}
		}
	});
	
	//收货人(选择框）
	var cboConsignee = new Ext.form.ComboBox({fieldLabel:C_CONSIGNEE,tabIndex:43,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtConsignee.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'C',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtConsignee.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//收货人
	var txtConsignee = new Ext.form.TextArea({fieldLabel:'',tabIndex:44,
		name:'consConsignee',value:p.get('consConsignee'),
		height:80,anchor:'99%'
	});
	
	
	//实际发货人(选择框）
	var cboActualShipper = new Ext.form.ComboBox({fieldLabel:C_F_SHIPPER,tabIndex:41,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtActualShipper.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'S',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtActualShipper.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//实际发货人
	var txtActualShipper = new Ext.form.TextArea({fieldLabel:'',tabIndex:42,
		name:'consFShipper',value:p.get('consFShipper'),
		height:80,anchor:'99%'
	}); 
	
	//实际收货人(选择框）
	var cboActualConsignee = new Ext.form.ComboBox({fieldLabel:C_F_CONSIGNEE,tabIndex:43,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtActualConsignee.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'C',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtActualConsignee.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//实际收货人
	var txtActualConsignee = new Ext.form.TextArea({fieldLabel:'',tabIndex:44,
		name:'consFConsignee',value:p.get('consFConsignee'),
		height:80,anchor:'99%'
	});
	
	//通知人(选择框）
	var cboNotifier = new Ext.form.ComboBox({fieldLabel:C_NOTIFIER,tabIndex:45,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtNotifyParty.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'N',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtNotifyParty.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//通知人
	var txtNotifyParty = new Ext.form.TextArea({fieldLabel:'',tabIndex:46,
		name:'consNotifyParty',value:p.get('consNotifyParty'),
		height:80,anchor:'99%'
	});
	
	//第二通知人(选择框）
	var cboNotifier2 = new Ext.form.ComboBox({fieldLabel:C_NOTIFIER2,tabIndex:47,
    	store:HTStore.getShipperStore('FMS_QSHIPPER'),xtype:'combo',
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtNotifyParty2.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'O',bizType:'A',_A:'FMS_QSHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtNotifyParty2.focus();
				} 
         	},buffer:BF}
        }
	});
	
	//第二通知人
	var txtNotifyParty2 = new Ext.form.TextArea({fieldLabel:'',tabIndex:48,
		name:'consNotifyParty2',value:p.get('consNotifyParty2'),
		height:80,anchor:'99%'
	});
	
	//订舱要求
    var txtConsServiceSpec = new Ext.form.TextArea({fieldLabel:C_BOOKING_REQUIREMENT,tabIndex:49,
		name:'consServiceSpec',value:p.get('consServiceSpec'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsRemarks.focus();
				} 
			}
		}
	});
    
    //备注
    var txtConsRemarks = new Ext.form.TextArea({fieldLabel:C_REMARKS,tabIndex:50,
		name:'consRemarks',value:p.get('consRemarks'),xtype:'textarea',anchor:'99%'
	});
    
	
	
	
    //毛重(承运人）
	var txtTotalGrossWeight = new Ext.form.NumberField({fieldLabel:C_GW_S+C_KGS,tabIndex:1,
		name:'consTotalGrossWeight',value:p.get('consTotalGrossWeight'),
 		decimalPrecision:4,anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Carrier');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtTotalMeasurement.focus();
				} 
			}
		}
	});
	
	//体积(承运人）
	var txtTotalMeasurement=new Ext.form.NumberField({fieldLabel:C_CBM,tabIndex:2,
		name:'consTotalMeasurement',value:p.get('consTotalMeasurement'),
		decimalPrecision:4,anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Carrier');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtBulkyCarrier.focus();
				} 
			}
		}
	});
	
	//分泡%(承运人)
	var txtBulkyCarrier=new Ext.form.NumberField({fieldLabel:C_BULKY+'('+C_CARRIER+')',tabIndex:3,
		name:'consBulkyCarrier',value:p.get('consBulkyCarrier'),anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Carrier');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtChargeWeightCarrier.focus();
				}
			}
		}
	});
	
	//计费重量(承运人)
	var txtChargeWeightCarrier = new Ext.form.NumberField({fieldLabel:C_CHARGE_WEIGHT+'('+C_CARRIER+')',tabIndex:4,
		name:'consChargeWeightCarrier',value:p.get('consChargeWeightCarrier'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtTotalGrossWeightK.focus();
				} 
			}
		}
	});
	
	
	//毛重(客户）
	var txtTotalGrossWeightK=new Ext.form.NumberField({fieldLabel:C_GW_S+'K'+C_KGS,tabIndex:5,
		name:'consTotalGrossWeightCustomer',value:p.get('consTotalGrossWeightCustomer'),
	    decimalPrecision:4,anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Customer');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtTotalMeasurementK.focus();
				}
			}
		}
	});
	
	
	
	//体积(客户）
	var txtTotalMeasurementK=new Ext.form.NumberField({fieldLabel:C_CBMK,tabIndex:6,
		name:'consTotalMeasurementCustomer',value:p.get('consTotalMeasurementCustomer'),
		decimalPrecision:4,anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Customer');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtBulkyCustomer.focus();
				}
			}
		}
	});
	
	
	
	//分泡%(客户)
	var txtBulkyCustomer = new Ext.form.NumberField({fieldLabel:C_BULKY+'('+C_CUSTOMER+')',tabIndex:7,
		name:'consBulkyCustomer',value:p.get('consBulkyCustomer'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				recalculateChargeWeight('Customer');
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtChargeWeightCustomer.focus();
				}
			}
		}
	});
	
	
	
	//计费重量(客户)
	var txtChargeWeightCustomer=new Ext.form.NumberField({fieldLabel:C_CHARGE_WEIGHT+'('+C_CUSTOMER+')',tabIndex:8,
		name:'consChargeWeightCustomer',value:p.get('consChargeWeightCustomer'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsTotalPackages.focus();
				} 
			}
		}
	});
	
	//件数
    var txtConsTotalPackages = new Ext.form.TextField({fieldLabel:C_NUM_PACK,tabIndex:9,
    	name:'consTotalPackages',value:p.get('consTotalPackages'),
    	anchor:'99%',enableKeyEvents:true,
		listeners:{scope:this,
			change:function(f,nv,ov){				
				p.set('consTotalPackages',nv);
				var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
				txtConsTotalPackagesInWord.setValue(pw);
				p.set('consTotalPackagesInWord',pw);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPackName.focus();
				}
			}
    	}
    });
    
    //包装种类
    var txtPackName = new Ext.form.TextField({fieldLabel:C_PACK,tabIndex:10,
    	name:'packName',value:p.get('packName'),anchor:'99%',enableKeyEvents:true,
    	listeners:{scope:this,
    		change:function(f,nv,ov){
				p.set('packName',nv);
				var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
				txtConsTotalPackagesInWord.setValue(pw);
				p.set('consTotalPackagesInWord',pw);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsTotalPackagesInWord.focus();
				}
			}
    	}
	});
    
  //大写件数
	var txtConsTotalPackagesInWord = new Ext.form.TextField({fieldLabel:C_PACKAGES_CAP,tabIndex:11,
		name:'consTotalPackagesInWord',value:p.get('consTotalPackagesInWord'),
	   	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCargoNameEn.focus();
				} 
			}
		}
	});
	
	//英文品名
	var txtConsCargoNameEn = new Ext.form.TextField({fieldLabel:C_CARGO_NAME_EN,tabIndex:12,
		name:'consCargoNameEn',value:p.get('consCargoNameEn'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCargoNameCn.focus();
				} 
			}
		}
	});
	
	//中文品名
	var txtConsCargoNameCn = new Ext.form.TextField({fieldLabel:C_CARGO_NAME_CN,tabIndex:13,
		name:'consCargoNameCn',value:p.get('consCargoNameCn'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCargoMarks.focus();
				} 
			}
		}
	});
	
	//唛头
	var txtConsCargoMarks = new Ext.form.TextArea({fieldLabel:C_MARKS,tabIndex:58,
		name:'consCargoMarks',value:p.get('consCargoMarks'),height:80,
		anchor:'99%'
	});
	
	//货物描述
	var txtConsCargoDesc = new Ext.form.TextArea({fieldLabel:C_CARGO_DESC,tabIndex:61,
		name:'consCargoDesc',value:p.get('consCargoDesc'),
		height:80,anchor:'99%'
	});    
    
    
    
    //车队
    var cboTrackVendorName = new Fos.CustomerLookup({fieldLabel:C_MOTORCADE,tabIndex:1,
    	name:'consTrackVendorName',value:p.get('consTrackVendorName'),
	    store:HTStore.getCS(),enableKeyEvents:true,
	    tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
	    xtype:'customerLookup',custType:'custTrackFlag',bizType:'A',
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
		    select:function(c,r,i){
		    	p.set('consTrackVendor',r.get('id'));
		    },
		    keydown:{fn:function(f,e){
		    	loadCustomer(f,e,'custTrackFlag','A',1);
		    	if(e.getKey()==e.ENTER){
		    		txtConsTrackContact.focus();
				} 
		    },buffer:BF}
	    }
    });
	
    //车队联系人
    var txtConsTrackContact = new Ext.form.TextField({fieldLabel:C_MOTORCADE_CONTACT,tabIndex:2,
		name:'consTrackContact',value:p.get('consTrackContact'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsTrackTel.focus();
				} 
			}
		}
	});
	
    //车队电话
    var txtConsTrackTel = new Ext.form.TextField({fieldLabel:C_MOTORCADE_TEL,tabIndex:3,
		name:'consTrackTel',value:p.get('consTrackTel'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtLoadDate.focus();
				} 
			}
		}
	});
    
    //装货日期
    var dtLoadDate = new Ext.form.DateField({fieldLabel:p.get('consBizClass')==BC_E?C_LOAD_DATE:C_FETCH_DATE,
		tabIndex:4,name:'consLoadDate',value:p.get('consLoadDate'),
		format:DATEF,anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsLoadFactory.focus();
				} 
			}
		}
	});
    
	//装货工厂
	var txtConsLoadFactory = new Ext.form.TextField({fieldLabel:C_LOAD_FACTORY,tabIndex:5,
		name:'consLoadFactory',value:p.get('consLoadFactory'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsLoadContact.focus();
				} 
			}
		}
	});
	
	//装货联系人
	var txtConsLoadContact = new Ext.form.TextField({fieldLabel:C_LOAD_CONTACT,tabIndex:6,
		name:'consLoadContact',value:p.get('consLoadContact'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsLoadTel.focus();
				} 
			}
		}
	});
	
	//装货联系电话
	var txtConsLoadTel = new Ext.form.TextField({fieldLabel:C_LOAD_TEL,tabIndex:7,
		name:'consLoadTel',value:p.get('consLoadTel'),anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsLoadAddress.focus();
				} 
			}
		}
	});
	
	//装货地址
    var txtConsLoadAddress = new Ext.form.TextArea({fieldLabel:p.get('consBizClass')==BC_E?C_LOAD_ADDRESS:C_DELIVERY_ADDRESS,tabIndex:8,
		name:'consLoadAddress',value:p.get('consLoadAddress'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsLoadRemarks.focus();
				} 
			}
		}
	});
    
	//装货要求
    var txtConsLoadRemarks = new Ext.form.TextArea({fieldLabel:C_LOAD_REMARK,tabIndex:9,
		name:'consLoadRemarks',value:p.get('consLoadRemarks'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboWarehouseName.focus();
				} 
			}
		}
	});
    
    //仓库
    var cboWarehouseName = new Fos.CustomerLookup({fieldLabel:C_WAREHOUSE,tabIndex:10,
    	name:'consWarehouseName',value:p.get('consWarehouseName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custWarehouseFlag',bizType:'A',
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
				p.set('consWarehouse',r.get('id'));
				p.set('consWarehouseFax',r.get('custFax'));},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custWarehouseFlag','A',1);
				if(e.getKey()==e.ENTER){
					txtWarehouseContact.focus();
				} 
			},buffer:BF}
		}
    });
	
    //仓库联系人
    var txtWarehouseContact = new Ext.form.TextField({fieldLabel:C_WARE_CONTACT,tabIndex:11,
		name:'consWarehouseContact',value:p.get('consWarehouseContact'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtWarehouseTel.focus();
				} 
			}
		}
	});
    
    //仓库电话
    var txtWarehouseTel = new Ext.form.TextField({fieldLabel:C_WARE_TEL,tabIndex:12,
		name:'consWarehouseTel',value:p.get('consWarehouseTel'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtContainerLoadDate.focus();
				} 
			}
		}
	});
    
    //装箱日期
    var dtContainerLoadDate = new Ext.form.DateField({fieldLabel:p.get('consBizClass')==BC_E?C_WARE_LOAD_DATE:C_WARE_DIS_DATE,tabIndex:13,
		name:'consContainerLoadDate',value:p.get('consContainerLoadDate'),format:DATEF,
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsWarehouseAddress.focus();
				} 
			}
		}
	});
     
    
    //仓库地址
    var txtConsWarehouseAddress = new Ext.form.TextArea({fieldLabel:C_WARE_ADDRESS,tabIndex:14,
		name:'consWarehouseAddress',value:p.get('consWarehouseAddress'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsWarehouseRemarks.focus();
				} 
			}
		}
	});
    
  //仓储要求
    var txtConsWarehouseRemarks = new Ext.form.TextArea({fieldLabel:C_WARE_REQUIREMENT,tabIndex:15,
		name:'consWarehouseRemarks',value:p.get('consWarehouseRemarks'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboGrouName.focus();
				} 
			}
		}
	});
    
    //报关行
    var cboConsCustomsVendorName = new Fos.CustomerLookup({fieldLabel:C_CUSTOM_AGENCY,tabIndex:16,
    	name:'consCustomsVendorName',value:p.get('consCustomsVendorName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		custType:'custCustomFlag',bizType:'A',
		displayField:'custCode',valueField:'custNameCn',typeAhead:true,
		mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();p.set('consCustomsVendor','');
					p.set('consCustomsVendorName','');
				}
			},
			select:function(c,r,i){
				p.set('consCustomsVendor',r.get('id'));
			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custCustomFlag','A',1);
				if(e.getKey()==e.ENTER){
					dtCustomsDeclar.focus();
				}
			},buffer:BF}
		}
    });
    
	//报关日期
    var dtCustomsDeclar = new Ext.form.DateField({fieldLabel:C_CUSTOMS_DECLEAR_DATE,tabIndex:17,
    	name:'consCustomsDeclarDate',value:p.get('consCustomsDeclarDate'),
    	format:DATEF,anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsInspectionVendorName.focus();
				} 
			}
		}
	});
	//报关时间
    var dtCustomsDeclarTime = new Ext.form.TimeField({fieldLabel:C_CUSTOMS_DECLEAR_TIME,tabIndex:17,
    	name:'consCustomsDeclarTime',value:p.get('consCustomsDeclarTime'),
    	anchor:'99%',enableKeyEvents:true,increment:30,minValue: '8:00 AM',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsInspectionVendorName.focus();
				} 
			}
		}
	});
    
    //是否转关
	var chkConsTransferringFlag = new Ext.form.Checkbox({fieldLabel:C_TRANSFERRING_FLAG,tabIndex:18,
		name:'consTransferringFlag',checked:p.get('consTransferringFlag')=='1',anchor:'99%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsInspectionVendorName.focus();
				} 
			}
		}
	});
	
	//报检单位
	var cboConsInspectionVendorName = new Fos.CustomerLookup({fieldLabel:C_INSP_AGENCY,tabIndex:19,
		name:'consInspectionVendorName',value:p.get('consInspectionVendorName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custInspectionFlag',bizType:'A',
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
				loadCustomer(f,e,'custInspectionFlag','A',1);
				if(e.getKey()==e.ENTER){
					txtCustomsDeclarationNo.focus();
				} 
			},buffer:BF}
		}
	});
	
	//报关单号
    var txtCustomsDeclarationNo = new Ext.form.TextField({fieldLabel:C_CUSTOMS_DECLARATION_NO,tabIndex:20,
    	name:'consCustomsDeclarationNo',value:p.get('consCustomsDeclarationNo'),
    	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCompany.focus();
				} 
			}
		}
	});
    
	//是否植检
	var chkConsQuarantineFlag = new Ext.form.Checkbox({fieldLabel:C_QUARANTINE_FLAG,tabIndex:21,
		name:'consQuarantineFlag',checked:p.get('consQuarantineFlag')=='1',
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCompany.focus();
				} 
			}
		}
	});
	
	//经营单位
    var txtConsCompany = new Ext.form.TextField({fieldLabel:C_BIZ_COMPANY,tabIndex:22,
    	name:'consCompany',value:p.get('consCompany'),
    	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtVerificationNo.focus();
				} 
			}
		}
	});
    
	//核销单号
	var txtVerificationNo = new Ext.form.TextField({fieldLabel:C_VERIFICATION_NO,tabIndex:23,
		name:'consVerificationNo',value:p.get('consVerificationNo'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsCargoOwnerName.focus();
				} 
			}
		}
	});
	
	//是否商检
	var chkConsInspectionFlag = new Ext.form.Checkbox({fieldLabel:C_INSP_FLAG,tabIndex:24,
    	name:'consInspectionFlag',checked:p.get('consInspectionFlag')=='1',
    	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsCargoOwnerName.focus();
				} 
			}
		}
	});
   
	//贸易合同号
	var txtConsTradeContractNo = new Ext.form.TextField({fieldLabel:C_TRADE_CONTRACT_NO,tabIndex:26,
		name:'consTradeContractNo',value:p.get('consTradeContractNo'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboSwith.focus();
				} 
			}
		}
	});
	
	//是否熏蒸
	var chkConsFumigateFlag = new Ext.form.Checkbox({fieldLabel:C_FUMIGATE_FLAG,tabIndex:27,
		name:'consFumigateFlag',checked:p.get('consFumigateFlag')=='1',
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboSwith.focus();
				} 
			}
		}
	});
	
	//换单要求
	var cboSwith = new Ext.form.ComboBox({fieldLabel:C_SWITCH_REQUIREMENT,tabIndex:28,
		name:'swithId',value:p.get('swithId'),store:HTStore.SWIT_S,
        displayField:'NAME',valueField:'CODE',typeAhead: true,
        mode: 'local',triggerAction: 'all',selectOnFocus:true,
        anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsCudeType.focus();
				} 
			}
		}
	});
	
	//报关类型
    var cboConsCudeType = new Ext.form.ComboBox({fieldLabel:C_CUDE_TYPE,tabIndex:29,
    	name:'consCudeType',value:p.get('consCudeType'),store:HTStore.CUTY_S,
		displayField:'NAME',valueField:'CODE',
		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCreditNo.focus();
				} 
			}
		}
	});
    
	 //信用证号
	var txtConsCreditNo = new Ext.form.TextField({fieldLabel:C_CREDIT_NO,tabIndex:30,
		name:'consCreditNo',value:p.get('consCreditNo'),
		anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					sendSingleAddress.focus();
				} 
			}
		}
	});
	
	//是否箱单发票
	var chkConsInvoiceFlag = new Ext.form.Checkbox({fieldLabel:C_INV_FLAG,tabIndex:31,
    	name:'consInvoiceFlag',checked:p.get('consInvoiceFlag')=='1',
    	anchor:'99%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					chkConsShutoutFlag.focus();
				} 
			}
		}
	});
	
	//是否退关
	var chkConsShutoutFlag = new Ext.form.Checkbox({fieldLabel:C_SHUTOUT_FLAG,tabIndex:33,
		name:'consShutoutFlag',checked:p.get('consShutoutFlag')=='1',anchor:'99%'
	});
    
	/*//寄单地址(选择选择)
	var cboSendSingleAddress = new Ext.form.ComboBox({fieldLabel:C_SEND_SINGLE_ADDRESS,
	    store:HTStore.getShipperStore('FMS_QSHIPPER'),
	    displayField:'shipperAddress',valueField:'shipperAddress',typeAhead: true,
	    mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
	  	enableKeyEvents:true,
		listeners:{
			scope:this,
			blur:function(f){
				f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consSendSingleAddress')[0].setValue(r.get('shipperAddress'));
			},
			keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'S',_A:'FMS_QSHIPPER',_mt:'xml'});
		 		if(e.getKey == e.ENTER){
					sendSingleAddress.focus();
				}
		 	}
		}}});*/
	//寄单地址
	var sendSingleAddress = new Ext.form.TextArea({fieldLabel:C_SEND_SINGLE_ADDRESS,
	    name:'consSendSingleAddress',value:p.get('consSendSingleAddress'),anchor:'99%',
	  	enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
		 		if(e.getKey == e.ENTER){
					txtConsWarehouseNo.focus();
				}
		 	}
		}});
	//进仓编号
	var txtConsWarehouseNo = new Ext.form.TextField({fieldLabel:C_WAREHOUSE_NO,name:'consWarehouseNo',
		value:p.get('consWarehouseNo'),anchor:'99%',enableKeyEcents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey == e.ENTER){
					chkConsShutoutFlag.focus();
				}
			}
		}
	});
    var panelConsign = new Ext.Panel({title:C_CONS_INFO,collapsible:true,
    	frame:false,padding:5,height:150,layout:'column',    		
    	items:[
    	    {columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
    	    	items:[txtConsNo,cboCustName,txtConsRefNo,cboTranCodeCarrier]},
    	    	
          	{columnWidth:.25,layout:'form',labelWidth:90,border:false,labelAlign:'right',
    	    	items:[cboGrouName,txtCustContact,txtConsSource,cboTranCode]},
    	    	
          	{columnWidth:.25,layout: 'form',labelWidth:90,border:false,labelAlign:'right',
	    	    items:[cboConsSalesRepName,txtCustTel,dtConsDate,cboPateCodeCarrier]},
	    	    
			{columnWidth:.25,layout: 'form',labelWidth:90,border:false,labelAlign:'right',
	    	    items:[cboConsOperatorName,txtCustFax,dtConsDeliveryDate,cboPateCode]}
		]});
    
    var panelBooking = new Ext.Panel({layout:'column',title:C_BOOKING_INFO,
    	frame:false,padding:5,collapsible:true,autoScroll:true,
        items:[
			{columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
				items:[cboConsCarrierName,cboConsBookingAgencyName,cboConsPol,cboConsOverseaAgency]
			},
			{columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
				items:[txtVoyaName,txtConsBookingAgencyContact,cboConsTradeCountry,cboDoAgency]
			},
			{columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
				items:[txtConsMblNo,txtConsbookingAgencyTel,cboConsPod,dtChangeDate]
			},
			{columnWidth:.25,layout:'form',border:false,labelWidth:80,labelAlign:'right',
				items:[txtConsHblNo,dtConsSailDate,cboConsPot,dtConsEta]
			}
  		]});
    
    var panelShipperInfo = new Ext.Panel({layout:'column',title:'收/发货人信息',
    	frame:false,padding:5,collapsible:true,
        items:[
       		{columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
        		items:[cboShipper,txtShipper,cboNotifier,txtNotifyParty,txtConsServiceSpec,txtActualShipper]
        	},
			{columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
        		items:[cboConsignee,txtConsignee,cboNotifier2,txtNotifyParty2,txtConsRemarks]
        	}
  		]});
    
    var panelCargoList = new Fos.AirCargoGrid(p,cargoStore,this);
    var panelCargoSum = new Ext.Panel({region:'center',height:300,layout:'column',
    	title:'货物小计',border:false,
    	frame:false,padding:5,autoScroll:true,
            items:[
        		{columnWidth:.5,layout:'form',border:false,labelWidth:100,labelAlign:'right',
      				items:[
      					{layout:'column',border:false,items:[
      				       {columnWidth:.5,layout:'form',border:false,items:
      				    	   [txtTotalGrossWeight,txtTotalGrossWeightK,txtConsTotalPackages]
      				       },
      				       {columnWidth:.5,layout:'form',border:false,items:
    				    	   [txtTotalMeasurement,txtTotalMeasurementK,txtPackName]
    				       }
      					]},
      				       txtConsCargoNameEn,txtConsCargoMarks,cboActualShipper,txtActualShipper,synShipperConsignee
      			]},
				{columnWidth:.5,layout:'form',border:false,labelWidth:100,labelAlign:'right',
      				items:[
      				       {layout:'column',border:false,items:[
        				       {columnWidth:.5,layout:'form',border:false,items:
        				    	   [txtBulkyCarrier,txtBulkyCustomer]
        				       },
        				       {columnWidth:.5,layout:'form',border:false,labelWidth:120,items:
      				    	   [txtChargeWeightCarrier,txtChargeWeightCustomer]
      				       }
        				   ]},
        				   txtConsTotalPackagesInWord,txtConsCargoNameCn,txtConsCargoDesc,cboActualConsignee,
        				   txtActualConsignee]}
               ]
    });    
    
    
    
	var panelServiceRequirement={title:'服务要求',height:470,layout:'column',layoutConfig: {columns:5},
			labelWidth:80,frame:false,padding:5,border:false,
    		items:[
				{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[cboTrackVendorName]},
				{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsTrackContact]},
				{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsTrackTel]},
				{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[dtLoadDate]},

				{columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsLoadFactory]},
	    		{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsLoadContact]},
	    		{columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsLoadTel]},
	    		       
    		    {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsLoadAddress]},
    		    {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsLoadRemarks]},    		       
    		       
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[cboWarehouseName]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtWarehouseContact]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtWarehouseTel]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[dtContainerLoadDate]},
		       
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsWarehouseAddress]},
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsWarehouseRemarks]},
    		       
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[cboConsCustomsVendorName]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[dtCustomsDeclar]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[dtCustomsDeclarTime]},		       
		       
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[cboConsInspectionVendorName]},		       
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtCustomsDeclarationNo]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[chkConsQuarantineFlag]},
    		       
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[txtConsCompany]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtVerificationNo]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[chkConsInspectionFlag]},
		       
		       {columnWidth:.5,layout:'form',labelAlign:'right',border:false,items:[sendSingleAddress]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsTradeContractNo]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[chkConsFumigateFlag]},
		       
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[cboSwith]},    		       
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[cboConsCudeType]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsCreditNo]},
		       {columnWidth:.2,layout:'form',labelAlign:'right',border:false,items:[chkConsInvoiceFlag]},    		 
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[txtConsWarehouseNo]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[chkConsTransferringFlag]},
		       {columnWidth:.25,layout:'form',labelAlign:'right',border:false,items:[chkConsShutoutFlag]}]};
	    		
	function recalculateChargeWeight(t){
		var w = 0;
		var v = 0;
		var b = 0;
		var wc=0;
		var vc=0;
		
		if(t=='Carrier'){
			w = txtTotalGrossWeight.getValue();
			v = txtTotalMeasurement.getValue();
			wc = txtTotalGrossWeightK.getValue();
			vc = txtTotalMeasurementK.getValue();
			b = txtBulkyCarrier.getValue();
		}
		else{
			w = txtTotalGrossWeightK.getValue();
			v = txtTotalMeasurementK.getValue();
			wc = txtTotalGrossWeightK.getValue();
			vc = txtTotalMeasurementK.getValue();
			b = txtBulkyCustomer.getValue();
		}
		
		if(w) 
			w = parseFloat(w);
		if(v) 
			v = parseFloat(v);
		if(wc) 
			wc = parseFloat(wc);
		if(vc) 
			vc = parseFloat(vc);
		if(b) 
			b = parseFloat(b);
		
		var weightC = v/0.006;
		if(w>weightC)
			weightC = w;
		else{
			weightC = w+ (weightC-w)*b/100;
		}
		if(t=='Carrier')
			txtChargeWeightCarrier.setValue(weightC.toFixed(0));
		else
			txtChargeWeightCustomer.setValue(weightC.toFixed(0));
	}
	
	this.reCalculate = function(){
		var pkg=0;
		var gw=0;
		var nw=0;
		var m=0;
		var cgw=0;
		var gwc=0;
		var mc=0;
		
		var a=cargoStore.getRange();
		
		var mark = '';
		var ename = '';
		var cname = '';
		var pkgs = '';
		var ecname = '';
		
		for(var i=0;i<a.length;i++){
			pkg += parseFloat(a[i].get('cargPackageNum'));
			gw +=  parseFloat(a[i].get('cargGrossWeight'));
			gwc += parseFloat(a[i].get('cargGrossWeightCustomer'))
			nw +=  parseFloat(a[i].get('cargNetWeight'));
			m +=   parseFloat(a[i].get('cargMeasurement'));
			mc += parseFloat(a[i].get('cargMeasurementCustomer'));
			cgw += parseFloat(a[i].get('cargMeasurement')*167);
			
			if(mark=='') 
				mark = a[i].get('cargMarks');
			else{
				if(a[i].get('cargMarks')!=mark){
					mark += '\r\n';
					mark += a[i].get('cargMarks');
				}
			}			
			if(ename!='') 
				ename += ',';
			ename = ename + a[i].get('cargNameEn');
			
			if(cname!='') 
				cname += ',';
			cname = cname + a[i].get('cargNameCn');
			
			if(ecname!='') 
				ecname += '\r\n';
			ecname = ecname + a[i].get('cargNameEn') + a[i].get('cargNameCn');
			
			if(pkgs==''){
				pkgs = a[i].get('packName');
			}
			else if(pkgs!=a[i].get('packName')){				
				pkgs = 'PKGS';
			}
		}
		txtPackName.setValue(pkgs);
		txtConsTotalPackages.setValue(pkg);
		txtTotalGrossWeight.setValue(gw);
		txtTotalGrossWeightK.setValue(gwc);
		//txtTotalNetWeight.setValue(nw);
		txtTotalMeasurement.setValue(m);	
		txtTotalMeasurementK.setValue(mc);
		txtChargeWeightCarrier.setValue(gw>cgw?gw.toFixed(0):cgw.toFixed(0));		
		txtConsCargoMarks.setValue(mark);
		txtConsCargoNameCn.setValue(cname);
		txtConsCargoNameEn.setValue(ename);
		txtConsCargoDesc.setValue(ecname);
		var pw='SAY '+HTUtil.N2EW(pkg)+' '+pkgs+' ONLY';
		txtConsTotalPackagesInWord.setValue(pw);
	};	
	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_U',id:p.get('id'),consStatus:s},
		success: function(res){
			var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
			var f = FConsign.prototype.fields;
			p.beginEdit();
			for (var i = 0; i < f.keys.length; i++) {
				var fn = ''+f.keys[i];
				p.set(fn,c.get(fn));
			};
			p.endEdit();
			this.updateToolBar(p.get('consStatus'));			
			XMG.alert(SYS,M_S);
		},
		failure: function(res){XMG.alert(SYS,M_F+res.responseText);}});
    };
    this.unlock=function(){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_UNLOCK',id:p.get('id')},
		success: function(res){
			var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
			var f = FConsign.prototype.fields;
			p.beginEdit();
			for (var i = 0; i < f.keys.length; i++) {
				var fn = ''+f.keys[i];
				p.set(fn,c.get(fn));
			};
			p.endEdit();
			this.updateToolBar(p.get('consStatus'));			
			XMG.alert(SYS,M_S);
		},
		failure: function(res){XMG.alert(SYS,M_F+res.responseText);}});
    };
    this.start=function(){this.updateStatus('1');};
    this.check=function(){this.updateStatus('2');};
    this.exit=function(){this.updateStatus('3');};
    this.renew=function(){this.updateStatus('4');};
    this.quit=function(){
    	XMG.confirm(SYS,M_CONS_QUIT_C,function(btn){if(btn=='yes') this.updateStatus('5');},this);
    };
    this.rebook=function(){this.updateStatus('1');};
    this.cancel=function(){
    	XMG.confirm(SYS,M_CONS_CANCEL_C,function(btn){if(btn=='yes') this.updateStatus('6');},this);
    };
    this.arrive=function(){
    	XMG.confirm(SYS,M_CONS_ARRIVE_C,function(btn){if(btn=='yes') this.updateStatus('1');},this);
    };
    this.release=function(){
    	XMG.confirm(SYS,M_CONS_RELEASE_C,function(btn){if(btn=='yes') this.updateStatus('2');},this);
    };
    this.releaseCargo=function(){
    	XMG.confirm(SYS,M_CARGO_RELEASE_C,function(btn){if(btn=='yes') this.updateStatus('3');},this);
    };
    this.sendCargo=function(){
    	XMG.confirm(SYS,M_CARGO_SEND_C,function(btn){if(btn=='yes') this.updateStatus('4');},this);
    };
    this.saveAs = function(){
    	var c = copyConsign(p);    	
    	createWindow('CONS_'+c.get("uuid"),C_ADD_CONSIGN,new Fos.AirConsignTab(c),true,1000,600);
    };
    
    var locked=p.get('consStatusLock')==1;
    var disable=p.get('editable')==0;
    var m=M3_CONS;
    
	this.updateToolBar = function(s){
		tb=this.getTopToolbar();
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
    	if(tb.getComponent('TB_EXPO')) 
    		tb.getComponent('TB_EXPO').setDisabled(p.get('rowAction')=='N');
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
    		menuSendCargo.setDisabled(NR(m+F_M)||locked||disable||p.get('consStatus')!=3);
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
			disabled:NR(m+F_M)||locked||disable,scope:this,handler:this.save};	
	var btInvalid={text:C_INVALID,itemId:'TB_INVALID',iconCls:'cancel',
			disabled:NR(m+F_M)||locked||disable||p.get('consStatus')!=2||p.get('rowAction')=='N',scope:this,handler:this.cancel};
	var btSaveAs={text:C_COPY,itemId:'TB_SAVE_AS',iconCls:'copy',
			disabled:NR(m+F_M)||p.get('rowAction')=='N',scope:this,
			handler:this.saveAs};
	var btUnlock={text:C_UNLOCK,itemId:'TB_UNLOCK',iconCls:'unlock',
			disabled:NR(m+F_UL)||locked!=1||p.get('rowAction')=='N',scope:this,handler:this.unlock};
	
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
	var btAction={text:C_STATUS_SET,itemId:'TB_ACTION',iconCls:'tag',disabled:NR(m+F_M)||locked||p.get('rowAction')=='N',scope:this,
			menu:{items:p.get('consBizClass')==BC_I?[menuArrived,menuSwitchBl,menuRelease,menuSendCargo]:
				[menuBookStart,menuBookConfirm,menuBookExit,menuBookReassign,menuBookQuit,menuBookRenew]}};	
		
    this.expExcel=function(c){
    	EXPC(c,'&expeType=R&consBizType=A&id='+p.get('id'));
    };
    this.noticeExcel=function(n){
    	EXPC(n,'&id='+p.get('id'));
    };
	var exp1={text:M_ARRIVE_ADVICE,scope:this,handler:function(){this.expExcel('ARAD');}};
	var exp2={text:M_BOOKAIR,scope:this,handler:function(){this.expExcel('CONS_B');}};
	var exp3={text:M_BOOK_CONFIRM,scope:this,handler:function(){this.expExcel('BOOK_C');}};
	var exp4={text:C_WARE_NOTICE,scope:this,handler:function(){this.noticeExcel('CONS_NOTICE');}};
	var expM=p.get('consBizClass')==BC_I?[exp1]:[exp2,exp3,exp4];
	var btExp={text:C_EXPORT,iconCls:'print',itemId:'TB_EXPO',
			disabled:p.get('rowAction')=='N'||locked||disable,scope:this,menu:{items:expM}};
		
	this.showExpense=function(){
		createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('consNo'),
    			new Fos.ExpenseTab(p),true);
	};
	var bExpe={text:C_EXPE,itemId:'TB_EXPE',iconCls:'dollar',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showExpense};
	
	this.showDoc=function(){
		createWindow('DOC'+p.get("uuid"),C_CONSIGN+C_DOC+'-'+p.get('consNo'),
    			new Fos.ConsDocGrid(p),true);
	};
	var bDoc={text:C_DOC,itemId:'TB_DOC',iconCls:'doc',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showDoc};
	
	this.showBL=function(){
		createWindow('BL'+p.get("uuid"),C_CONSIGN+C_BL+'-'+p.get('consNo'),
    			new Fos.BLTab(p),true);
	};
	var bBL={text:C_BL,itemId:'TB_BL',iconCls:'news',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showBL};
	
	this.showAttach=function(){		
    	var win = new Fos.AttachWin('A',p.get('id'),p.get('consNo'));
    	win.show();
    };
    var bAttach={text:C_ATTACH,itemId:'TB_ATTACH',iconCls:'news',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showAttach};
	this.showTran=function(){
		createWindow('TRAN'+p.get("uuid"),C_CONSIGN+C_TRAN+'-'+p.get('consNo'),
    			new Fos.TransGrid(p),true);
	};
	bTran={text:C_TRAN,itemId:'TB_TRAN',iconCls:'car',scope:this,handler:this.showTran};
	
	this.showWare=function(){
		createWindow('WARE'+p.get("uuid"),C_CONSIGN+C_WARE+'-'+p.get('consNo'),
    			new Fos.WarehouseTab(p),true);
	};
	bWare={text:C_WARE,itemId:'TB_WARE',iconCls:'database',scope:this,handler:this.showWare};
	
	this.showCont=function(){
		createWindow('CONT'+p.get("uuid"),C_CONSIGN+C_SHIP_CONT+'-'+p.get('consNo'),
    			new Fos.ContainerTab(p),true);
	};
	bCont={text:C_SHIP_CONT,itemId:'TB_CONT',iconCls:'diskdown',scope:this,handler:this.showCont};
	
	this.showCude=function(){
		createWindow('CUDE'+p.get("uuid"),C_CONSIGN+C_CUDE+'-'+p.get('consNo'),
    			new Fos.CudeGrid(p),true);
	};
	bCude={text:C_CUDE,itemId:'TB_CUDE',iconCls:'cude',scope:this,handler:this.showCude};
	
	this.showInsp=function(){
		createWindow('INSP'+p.get("uuid"),C_CONSIGN+C_INSP+'-'+p.get('consNo'),
    			new Fos.InspGrid(p),true);
	};
	bInsp={text:C_INSP,itemId:'TB_INSP',iconCls:'insp',scope:this,handler:this.showInsp};
	
	var serviceM=[bTran,bWare,bCude,bInsp];	
	var btService={text:C_SERVICE,itemId:'TB_SERVICE',iconCls:'compile',
			disabled:p.get('rowAction')=='N',scope:this,menu:{items:serviceM}};	
		
	var b20=new Ext.Toolbar.TextItem({text:C_STATUS+'：'+(p.get('consBizClass')==BC_I?HTStore.getCIST(p.get('consStatus')):HTStore.getCOST(p.get('consStatus')))});
	var tbs=[btSave,'-',btAction,'-',btInvalid,'-',btSaveAs,'-',btUnlock,'-',btExp,'->',
	         bExpe,'-',bDoc,'-',bBL,'-',bAttach,'-',btService];
	
	var title=HTStore.getBT(BT_A)+HTStore.getBC(p.get('consBizClass'));		
	if(p.get('rowAction')=='N')
		title = C_ADD+title+C_CONS;
	else
		title += '-'+p.get("consNo");
	
	Fos.AirConsignTab.superclass.constructor.call(this, { 
		id:"T_CONS_" + p.get("uuid"),title:title,header:false,autoScroll:true,
		items:[
			{xtype:'tabpanel',activeTab:0,items:[
				{title:'单票信息',autoScroll:true,items:[panelConsign,panelBooking,panelShipperInfo]},
				{title:'货物信息',layout:'border',border:false,height:600,items:[panelCargoList,panelCargoSum]},
				panelServiceRequirement
			]
			}
		],
		tbar:tbs,
		bbar:[{xtype:'tbtext',text:C_CREATE_BY_C+p.get('createBy')},'-',
 			{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
			{xtype:'tbtext',text:C_MODIFY_BY_C+p.get('modifyBy')},'-',
			{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))},'->',
			 b20,'-'
		]
	});
};
Ext.extend(Fos.AirConsignTab,Ext.Panel);

Fos.ConsLookupWin = function(bizClass,bizType,shipType,action,store){
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
    	items:[{columnWidth:.33,layout:'form',border:false,labelWidth:90,labelAlign:"right",
	    	items:[{fieldLabel:C_BOOKER,name:'custName',store:HTStore.getCS(),
	    			xtype:'customerLookup',custType:'custBookerFlag',bizType:'A',
	        		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,enableKeyEvents:true,
	        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        		triggerAction:'all',selectOnFocus:true,anchor:'90%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){
	              		loadCustomer(f,e,'custBookerFlag','A',1);
	              	},buffer:500}}},
				{fieldLabel:C_BIZ_TYPE,tabIndex:7,name:'consBizType',
              		store:HTStore.BT_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
              		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_POL,name:'consPol',store:HTStore.getPS(),xtype:'combo',
						displayField:'portNameEn',valueField:'portId',typeAhead: true,
						mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},	             		
	        	{fieldLabel:C_DEPT,name:'grouId',store:HTStore.getGROU_S(),xtype:'combo',
	        		displayField:'grouName',valueField:'id',typeAhead: true,mode: 'remote',
	        		triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_OPERATOR,name:'consOperatorId',store:HTStore.getOP_S(),xtype:'combo',
	        			displayField:'userLoginName',valueField:'id',typeAhead: true,
	        			mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_TRADE_CONTRACT_NO,name:'consTradeContractNo',xtype:'textfield',anchor:'90%'},
	        	{fieldLabel:C_SHIP_TYPE,name:'consShipType',value:shipType,
	        		store:HTStore.SHTY_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
	        		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:'S/O No.',name:'consSoNo',xtype:'textfield',anchor:'90%'},
	         	{fieldLabel:C_CONS_AUDIT_STATUS,name:'consStatusAud',xtype:'combo',
	         		store:HTStore.AUST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:C_WRITEOFF_STATUS_R,name:'consStatusAr',xtype:'combo',
	         			store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
	      	{columnWidth:.33,layout:'form',border:false,labelWidth:90,labelAlign:"right",
	   		items:[{fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_SAIL_DATE,name:'consSailDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_ETA,name:'consEta',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_POD,tabIndex:47,name:'consPod',store:HTStore.getPS(),xtype:'combo',
	        		displayField:'portNameEn',valueField:'portId',typeAhead: true,mode:'remote',
	        		triggerAction:'all',selectOnFocus:true,anchor:'90%',
              		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,listeners:{scope:this,
              			keydown:{fn:LP,buffer:BF}}},
	        	{fieldLabel:C_SALES,name:'consSalesRepName',store:HTStore.getSALE_S(),xtype:'combo',
              				displayField:'userLoginName',valueField:'userName',typeAhead: true,
              				mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	        	{fieldLabel:C_CONTRACT_NO,name:'consContractNo',xtype:'textfield',anchor:'90%'},
	        	{fieldLabel:C_CARRIER,name:'consCarrier',store:HTStore.getCS(),enableKeyEvents:true,
	        		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        		xtype:'customerLookup',custType:'custCarrierFlag',bizType:'A',
	        		displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',
	        		triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        		listeners:{scope:this,keydown:{fn:function(f,e){
	        			LC(f,e,'custCarrierFlag');},buffer:500}}},
	        	{fieldLabel:C_OVERSEA_AGENCY,name:'consOverseaAgency',store:HTStore.getCS(),enableKeyEvents:true,
	        	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        	xtype:'customerLookup',custType:'custOverseaAgencyFlag',bizType:'A',
	        	displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',
	        	triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custOverseaAgencyFlag');},buffer:500}}},
				{fieldLabel:C_INVO_STATUS_R,name:'consStatusInvoR',xtype:'combo',store:HTStore.INST_S,
	        		displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
	        		triggerAction:'all',selectOnFocus:true,anchor:'90%'},
				{fieldLabel:C_WRITEOFF_STATUS_P,name:'consStatusAp',xtype:'combo',
	        		store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}]},
			{columnWidth:.34,layout:'form',border:false,labelWidth:90,labelAlign:"right",
			items:[{fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_TO,name:'consSailDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_TO,name:'consEta2',xtype:'datefield',format:DATEF,anchor:'90%'},
	        	{fieldLabel:C_CARGO_SOURCE,name:'consSource',store:HTStore.SOUR_S,xtype:'combo',
	        		displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
	        		triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	         	{fieldLabel:C_REF_NO,name:'consRefNo',xtype:'textfield',anchor:'90%'},	        	
	        	{fieldLabel:C_BOOK_AGENCY,name:'consBookingAgency',store:HTStore.getCS(),
              		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
              		displayField:'custCode',valueField:'custId',
              		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
              		anchor:'90%',enableKeyEvents:true,
              		listeners:{scope:this,
	         			keydown:{fn:function(f,e){
	         				loadCustomer(f,e,'custBookingAgencyFlag','A',1);
	         			},buffer:500}}},
	       		{fieldLabel:C_CONTAINER,name:'consContainerCompany',store:HTStore.getCS(),enableKeyEvents:true,
	       			tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	       			xtype:'customerLookup',custType:'custContainerFlag',bizType:'A',
	       			displayField:'custCode',valueField:'custId',typeAhead: true,
	       			mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	       				listeners:{scope:this,keydown:{fn:function(f,e){
	         				loadCustomer(f,e,'custContainerFlag','A',1);
	         			},buffer:500}}},
				{fieldLabel:C_EXPE_CONFIRM_STATUS,name:'consStatusExp',xtype:'combo',store:HTStore.EXPC_S,
	       			displayField:'NAME',valueField:'CODE',typeAhead: true,
	       			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
				{fieldLabel:C_INVO_STATUS_P,name:'consStatusInvoP',xtype:'combo',store:HTStore.INST_S,
	       			displayField:'NAME',valueField:'CODE',typeAhead: true,
	       			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}
			]}
		]};
    
	var tabs=[t1,t2,t3,t4,t5];
	if(action=='CONS_X'){
		tabs=(bizClass==BC_E)?[t1,t6,t2,t3,t4,t5]:[t1,t2,t3,t4,t5];
	}
	
	this.reload=function(){
     	var a=[];
     	var op=1;
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
     		if(vessName) a[a.length]=new QParam({key:'vessName',value:vessName,op:LI});
     		if(voyaId) a[a.length]=new QParam({key:'voyaName',value:voyaId,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_5'){
     		var custId=at.find('name','custName')[0].getValue();
     		if(custId) a[a.length]=new QParam({key:'custName',value:custId,op:op});
     		var consBizType=at.find('name','consBizType')[0].getValue();        		
     		if(consBizType) a[a.length]=new QParam({key:'consBizType',value:consBizType,op:op});
     		var consPol=at.find('name','consPol')[0].getValue();        		
     		if(consPol) a[a.length]=new QParam({key:'consPol',value:consPol,op:op});
     		
     		var grouId=at.find('name','grouId')[0].getValue();        		
     		if(grouId) a[a.length]=new QParam({key:'grouId',value:grouId,op:op});
     		var consSalesRepName=at.find('name','consSalesRepName')[0].getValue();        		
     		if(consSalesRepName) a[a.length]=new QParam({key:'consSalesRepName',value:consSalesRepName,op:op});
     		var consTradeContractNo=at.find('name','consTradeContractNo')[0].getValue();        		
     		if(consTradeContractNo) a[a.length]=new QParam({key:'consTradeContractNo',value:consTradeContractNo,op:op});
     		
     		var consStatusAud=at.find('name','consStatusAud')[0].getValue();        		
     		if(consStatusAud) a[a.length]=new QParam({key:'consStatusAud',value:consStatusAud,op:op});
     		var consStatusAr=at.find('name','consStatusAr')[0].getValue();        		
     		if(consStatusAr) a[a.length]=new QParam({key:'consStatusAr',value:consStatusAr,op:op});
     		var consStatusAp=at.find('name','consStatusAp')[0].getValue();        		
     		if(consStatusAp) a[a.length]=new QParam({key:'consStatusAp',value:consStatusAp,op:op});
     		var consStatusInvoR=at.find('name','consStatusInvoR')[0].getValue();        		
     		if(consStatusInvoR) a[a.length]=new QParam({key:'consStatusInvoR',value:consStatusInvoR,op:op});
     		var consStatusInvoP=at.find('name','consStatusInvoP')[0].getValue();        		
     		if(consStatusInvoP) a[a.length]=new QParam({key:'consStatusInvoP',value:consStatusInvoP,op:op});
     		var consStatusExp=at.find('name','consStatusExp')[0].getValue();        		
     		if(consStatusExp) a[a.length]=new QParam({key:'consStatusExp',value:consStatusExp,op:op});
     		
     		var consDate=at.find('name','consDate')[0].getValue();
     		var consDate2=at.find('name','consDate2')[0].getValue();
     		if(consDate && consDate2){
     			a[a.length]=new QParam({key:'consDate',value:consDate.format(DATEF),op:5});
     			a[a.length]=new QParam({key:'consDate',value:consDate2.format(DATEF),op:3});
     		}
     		else if(consDate) a[a.length]={key:'consDate',value:consDate,op:op};
     		var consSailDate=at.find('name','consSailDate')[0].getValue();
     		var consSailDate2=at.find('name','consSailDate2')[0].getValue();
     		if(consSailDate && consSailDate2){
     			a[a.length]=new QParam({key:'consSailDate',value:consSailDate.format(DATEF),op:5});
     			a[a.length]=new QParam({key:'consSailDate2',value:consSailDate2.format(DATEF),op:3});
     		}
     		else if(consSailDate) a[a.length]=new QParam({key:'consSailDate',value:consSailDate,op:op});
     		
     		var consEta=at.find('name','consEta')[0].getValue();
     		var consEta2=at.find('name','consEta2')[0].getValue();
     		if(consEta && consEta2){
     			a[a.length]=new QParam({key:'consEta',value:consEta.format(DATEF),op:5});
     			a[a.length]=new QParam({key:'consEta',value:consEta2.format(DATEF),op:3});
     		}
     		else if(consEta) a[a.length]=new QParam({key:'consEta',value:consEta,op:op}); 
     		
     		var consOperatorId=at.find('name','consOperatorId')[0].getValue();        		
     		if(consOperatorId) a[a.length]=new QParam({key:'consOperatorId',value:consOperatorId,op:op});
     		var consContractNo=at.find('name','consContractNo')[0].getValue();        		
     		if(consContractNo) a[a.length]=new QParam({key:'consContractNo',value:consContractNo,op:op});
     		var consPod=at.find('name','consPod')[0].getValue();        		
     		if(consPod) a[a.length]=new QParam({key:'consPod',value:consPod,op:op});
     		var consSource=at.find('name','consSource')[0].getValue();        		
     		if(consSource) a[a.length]=new QParam({key:'consSource',value:consSource,op:op});
     		var consRefNo=at.find('name','consRefNo')[0].getValue();        		
     		if(consRefNo) a[a.length]=new QParam({key:'consRefNo',value:consRefNo,op:op});
     		var consSoNo=at.find('name','consSoNo')[0].getValue();
     		if(consSoNo) a[a.length]=new QParam({key:'consSoNo',value:consSoNo,op:op});
     		var consCarrier=at.find('name','consCarrier')[0].getValue();        		
     		if(consCarrier) a[a.length]=new QParam({key:'consCarrier',value:consCarrier,op:op});
     		var consOverseaAgency=at.find('name','consOverseaAgency')[0].getValue();        		
     		if(consOverseaAgency) a[a.length]=new QParam({key:'consOverseaAgency',value:consOverseaAgency,op:op});
     		var consBookingAgency=at.find('name','consBookingAgency')[0].getValue();        		
     		if(consBookingAgency) a[a.length]=new QParam({key:'consBookingAgency',value:consBookingAgency,op:op});
     		var consContainerCompany=at.find('name','consContainerCompany')[0].getValue();        		
     		if(consContainerCompany) a[a.length]=new QParam({key:'consContainerCompany',value:consContainerCompany,op:op});
     	}
     	else if(at.getId()=='T_CONS_LOOK_6'){
     		var consMblNo=at.find('name','contNo')[0].getValue();
     		var consMblNoM=at.find('name','contNoM')[0].getValue();
     		if(consMblNoM) op=7;action='CONS_CONTNO_X';
     		a[a.length]=new QParam({key:'contNo',value:consMblNo,op:op});
     	}
     	store.baseParams={_A:action,_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
     	store.reload({params:{start:0,limit:C_PS20},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};	
	var t = new Ext.TabPanel({id:'T_CONS_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:340,
		defaults:{bodyStyle:'padding:10px'},items:tabs});
    Fos.ConsLookupWin.superclass.constructor.call(this, {title:C_CONS_QUERY,iconCls:'search',modal:true,width:800,height:400,minWidth:400,
        minHeight:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:t,
		buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.ConsLookupWin, Ext.Window);

Fos.AirBlWin = function(p,b,store) {
	var fbeStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'FBE_Q',consMblNo:b.get('blMBlNo'),consId:b.get('consId'),_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FBlExpense',id:'id'},FBlExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
		if(b.get('rowAction')!='N')
		fbeStore.load();
	this.copyFrom=function(){		
		XMG.prompt(SYS,C_BL_NO,function(btn,v){
			if(btn=='ok'){
				var sc = new Ext.data.Store({url: SERVICE_URL+'?_A='+'BL_Q',
					reader: new Ext.data.XmlReader({record:'FBl'}, FBl)});
				sc.load({params:{blNo:v},callback:function(r,o,s){
					if(s&&r.length>0){
						var c=r[0];
						b.beginEdit();
						var f = FBl.prototype.fields;
						for (var i = 0; i < f.keys.length; i++) {
							var fn = ''+f.keys[i];
							if(fn=='id'||fn=='blNo'||fn=='consId'||fn=='consNo'||fn=='version'
								||fn=='consBizClass'||fn=='consBizType'||fn=='consShipType'
								||fn=='consTradeContractNo'||fn=='consChargeRemarks'||fn=='custId'
								||fn=='custName'||fn=='blStatus'||fn=='removed'){}
							else b.set(fn,c.get(fn));
						};
						b.endEdit();
						this.getForm().loadRecord(b);
					}    						
				},scope:this});
			}
		},this);
    };
	this.save = function(){
		if(b.get('blType')=='HB/L'){
			if(this.find('name','blNo')[0].getValue()==''){
				XMG.alert(SYS,H_BL_REQUIRED_AIR,function(){this.find('name','blNo')[0].focus();},this);
				return;
			};
		}else if(b.get('blType')=='MB/L'){
			if(this.find('name','blMBlNo')[0].getValue()==''){
				XMG.alert(SYS,M_BL_REQUIRED_AIR,function(){this.find('name','blMblNo')[0].focus();},this);
				return;
			};
		}
		var f = FBl.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		b.set(fn,fc[0].getValue());
        	}
   	 	}
		
		var xml = HTUtil.RTX(b,'FBl',FBl);		
		var fbe = fbeStore.getModifiedRecords();
		if(fbe.length>0){
			var x = HTUtil.ATX(fbe,'FBlExpense',FBlExpense);
			xml=xml+x;
		};
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BL_S'},
			success: function(res){				
				var c = HTUtil.XTR(res.responseXML,'FBl',FBl);
				var f = FBl.prototype.fields;
				var ac = b.get('rowAction');
				b.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					b.set(fn,c.get(fn));
   				};   				
				b.set('rowAction','M');
				b.endEdit();
				if(ac=='N'){
					store.add(b);
				}
				var a = HTUtil.XTRA(res.responseXML,'FBlExpense',FBlExpense);
				HTUtil.RUA(fbeStore,a,FBlExpense);
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)});
	};
	this.check = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'2',blType:b.get('blType')},
		success: function(r){
			b.set('blStatus','2');
			XMG.alert(SYS,M_S);
		},
		failure: function(r){
			XMG.alert(SYS,M_F+r.responseText);
		}		
		});
	};
	this.uncheck = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'1',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','1');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}});
	};
	this.printOffical = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'3',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','3');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	this.release = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'5',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','5');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};	
	this.expExcel=function(){
		EXPC('BL','&id='+b.get('id'));
	};
	this.expEmail=function(){
		var to='',cc='',sub='',msg='';
		EXPM(to,cc,sub,msg,'BL','id='+b.get('id'));
	};		
	
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CHAR,dataIndex:'consExpenseName',editor: new Ext.form.TextField({})},
		{header:C_QUANTITY,dataIndex:'consExpenseNum',editor: new Ext.form.TextField({})},
		{header:C_PRICE,dataIndex:'consExpensePrice',editor: new Ext.form.TextField({})},
		{header:C_AMOUNT,dataIndex:'consExpenseTotal',editor: new Ext.form.TextField({})}],
		defaults:{sortable:true,width:100}});
	this.reCalculate=function(){
		var sumT=0;
		var a=fbeStore.getRange();
		var record=sm.getSelected();
		record.set('consExpenseTotal',record.get('consExpenseNum')*record.get('consExpensePrice'));
		for(var i=0;i<a.length;i++){
			if(a[i].get('consExpenseTotal')>0) sumT+=parseInt(a[i].get('consExpenseTotal'));
		}
		if(this.find('name','blValuePayment')[0].getValue()=="PP"){
			this.find('name','blOtherDcPp')[0].setValue(sumT);
			this.find('name','blOtherDcCc')[0].setValue('');
		}else{
			this.find('name','blOtherDcCc')[0].setValue(sumT);
			this.find('name','blOtherDcPp')[0].setValue('');
		}
	};
	this.addRecord = function(){
		var r = new FBlExpense({uuid:HTUtil.UUID(32),consId:b.get('consId'),consMblNo:b.get('blMBlNo')});
		fbeStore.insert(0,r);r.set('rowAction','N');
		this.grid.getSelectionModel().selectFirstRow();
	};
	this.removeRecord = function(){
		var b =this.grid.getSelectionModel().getSelected();
		if(b){b.set('rowAction',b.get('rowAction')=='N'?'D':'R');fbeStore.remove(b);}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.grid = new Ext.grid.EditorGridPanel({title:C_EXPR_ADD_CHARGE,region:'center',autoScroll:false,height:180,width:400,
		store:fbeStore,sm:sm,cm:cm,clicksToEdit:'auto',tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addRecord},'-',
		{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeRecord}],
		listeners:{
			scope:this,
			afteredit:function(e){
				this.reCalculate();
			}
		}});
	//发货人(选择)
	var cboShipper = new Ext.form.ComboBox({fieldLabel:"Shipper's Name and Address",
    	store:HTStore.getShipperStore('BL_SHIPPER'),
    	displayField:'shipperName',valueField:'shipperName',typeAhead: true,
    	mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtShipper.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'S',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			cboConsignee.focus();
				} 
         	},buffer:BF}
        }
	});
	//发货人
	var txtShipper = new Ext.form.TextArea({name:'blShipper',hideLabel:true,
					  value:b.get('blShipper'),tabIndex:1,height:100,anchor:'99%'});
	//收货人(选择)
	var cboConsignee = new Ext.form.ComboBox({fieldLabel:"Consignee's Name and Address",
	    store:HTStore.getShipperStore('BL_SHIPPER'),displayField:'shipperName',valueField:'shipperName',
	    typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		enableKeyEvents:true,
		listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtConsignee.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'C',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			cboCarrier.focus();
				} 
         	},buffer:BF}
        }
	});
	//收货人
	var txtConsignee = new Ext.form.TextArea({
	    name:'blConsignee',value:b.get('blConsignee'),hideLabel:true,
		tabIndex:2,xtype:'textarea',height:100,anchor:'99%'
	});
	//承运人(选择)
	var cboCarrier = new Ext.form.ComboBox({fieldLabel:"Issuing Carrier's Agent Name",
	    store:HTStore.getShipperStore('BL_SHIPPER'),displayField:'shipperName',valueField:'shipperName',
	    typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
	    enableKeyEvents:true,
	    listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
        	select:function(c,r,i){				        		
        		txtCarrier.setValue(r.get('shipperAddress'));
        	},
         	keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'O',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			cboNotify.focus();
				} 
         	},buffer:BF}
	    }
	});
	//承运人
	var txtCarrier = new Ext.form.TextArea({
		name:'blCarrierName',value:b.get('blCarrierName'),hideLabel:true,
		tabIndex:3,height:100,anchor:'99%'
	});
	//通知人(选择)
	var cboNotify = new Ext.form.ComboBox({fieldLabel:"Also Notify",
	    store:HTStore.getShipperStore('BL_SHIPPER'),displayField:'shipperName',valueField:'shipperName',
	    typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
	    enableKeyEvents:true,
	    listeners:{scope:this,
	        blue:function(f){
	        	f.clearValue();
	        },
	        select:function(c,r,i){
	        	txtNotify.setValue(r.get('shipperAddress'));
	        },
	        keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'N',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			cboBlAccountingInfo.focus();
				} 
         	},buffer:BF}
	    }
	});
	//通知人
	var txtNotify = new Ext.form.TextArea({
		name:'blNotifyParty',value:b.get('blNotifyParty'),hideLabel:true,
        tabIndex:5,height:100,anchor:'99%'
	});
	
	//通知人(选择)
	var cboBlAccountingInfo = new Ext.form.ComboBox({fieldLabel:"Accounting Information",
	    store:HTStore.getShipperStore('BL_SHIPPER'),displayField:'shipperName',valueField:'shipperName',
	    typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
	    enableKeyEvents:true,
	    listeners:{scope:this,
	        blue:function(f){
	        	f.clearValue();
	        },
	        select:function(c,r,i){
	        	txtBlAccountingInfo.setValue(r.get('shipperAddress'));
	        },
	        keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'A',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			cboBlHandlingInfo.focus();
				} 
         	},buffer:BF}
	    }
	});
	//通知人
	var txtBlAccountingInfo = new Ext.form.TextArea({
		name:'blAccountingInfo',value:b.get('blAccountingInfo'),hideLabel:true,
        tabIndex:5,height:100,anchor:'99%'
	});
		//海外代理(选择)
	var cboBlHandlingInfo = new Ext.form.ComboBox({fieldLabel:"Handling information and Others",
	    store:HTStore.getShipperStore('BL_SHIPPER'),displayField:'shipperName',valueField:'shipperName',
	    typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
	    enableKeyEvents:true,
	    listeners:{scope:this,
	        blue:function(f){
	        	f.clearValue();
	        },
	        select:function(c,r,i){
	        	txtBlHandlingInfo.setValue(r.get('shipperAddress'));
	        },
	        keydown:{fn:function(f,e){
         		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
         			shipperType:'H',bizType:'A',_A:'BL_SHIPPER',_mt:'xml'});
         		if(e.getKey()==e.ENTER){
         			txtBlHandlingInfo.focus();
				} 
         	},buffer:BF}
	    }
	});
	//海外代理
	var txtBlHandlingInfo = new Ext.form.TextArea({
		name:'blHandlingInfo',value:b.get('blHandlingInfo'),hideLabel:true,
        tabIndex:5,height:100,anchor:'99%'
	});
	var t4={layout:'column',title:C_BL_INFO,height:726,collapsible:true,layoutConfig: {columns:4},
			padding:5,autoScroll:true,border:false,
			items: [
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',items: [
				cboShipper,txtShipper,cboCarrier,txtCarrier,cboBlAccountingInfo,txtBlAccountingInfo
				
			]},
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',items: [        
                cboConsignee,txtConsignee,cboNotify,txtNotify,cboBlHandlingInfo,txtBlHandlingInfo
                
            ]},
            {columnWidth:.25,layout:'form',border : false,labelAlign:'top',items:[
            	{fieldLabel:'AWB MblNo.',name:'blMBlNo',value:b.get('blMBlNo'),
            		tabIndex:6,xtype:'textfield',anchor:'99%'},
            	{fieldLabel:'Declared Value for Carriage',name:'blDvCarriage',value:b.get('blDvCarriage'),
            		tabIndex:10,xtype:'textfield',anchor:'99%'}
	        ]},
            {columnWidth:.25,layout:'form',border : false,labelAlign:'top',items:[
				{fieldLabel:'AWB HblNo.',name:'blNo',value:b.get('blNo'),enableKeyEvents:true,
					tabIndex:6,xtype:'textfield',anchor:'99%',
					listeners:{
						scope:this,
						keyup:function(f,e){
							this.find('name','blNo')[0].setValue(this.find('name','blNo')[0].getValue().toUpperCase());
						}
					}
					},
            	{fieldLabel:'Account No.',name:'blAccountNo',value:b.get('blAccountNo'),
            		tabIndex:9,xtype:'textfield',anchor:'99%'}            	
            ]},
            {columnWidth:.25,layout:'form',border : false,labelAlign:'top',items:[
				{fieldLabel:"Agent IATA Code",name:'blAgentIataCode',value:b.get('blAgentIataCode'),
					tabIndex:8,xtype:'textfield',anchor:'99%'},
				{fieldLabel:'Declared Value for Customs',name:'blDvCustoms',value:b.get('blDvCustoms'),
            		tabIndex:11,xtype:'textfield',anchor:'99%'}
             ]},
            {columnWidth:.25,layout:'form',border : false,labelAlign:'top',items:[
				{fieldLabel:'Air Port of Departure',name:'blPol',value:b.get('blPol'),
					tabIndex:7,xtype:'textfield',anchor:'99%'}                                                                    
            ]},
             {columnWidth:.1,layout:'form',border:false,labelAlign:'top',items:[
             {fieldLabel:'To',name:'blToFirst',value:b.get('blToFirst'),
             	tabIndex:12,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'By First Carrier',name:'blByFirst',value:b.get('blByFirst'),
             	tabIndex:13,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'To',name:'blToSecond',value:b.get('blToSecond'),
             	tabIndex:14,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'By',name:'blBySecond',value:b.get('blBySecond'),
             	tabIndex:15,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'To',name:'blToThird',value:b.get('blToThird'),
             	tabIndex:16,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'By',name:'blByThird',value:b.get('blByThird'),
             	tabIndex:17,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Currency',name:'currCode',value:b.get('currCode'),
             	tabIndex:18,
             	store:HTStore.getCURR_S(),xtype:'combo',displayField:'currCode',
             	valueField:'currCode',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%'}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Weight/VAL',name:'blValuePayment',value:b.get('blValuePayment'),
                store:HTStore.PAYTYPE_S,displayField:'NAME',valueField:'NAME',typeAhead:true,
                triggerAction:'all',selectOnfocus:true,mode:'local',
             	tabIndex:19,xtype:'combo',anchor:'99%',
             	listeners:{
             		scope:this,
             		select:function(c,r,i){
             			if(r.get('NAME')=="PP"){
             				this.find('name','blRemarks')[0].setValue('AS ARRANGED');
             				this.find('name','blTotalCc')[0].setValue('');
             			}
             			else{
             				this.find('name','blTotalPp')[0].setValue('');
             				this.find('name','blRemarks')[0].setValue('');
             			}
             		}
             	}
             	}
             ]},
             {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Other',name:'blOtherPayment',value:b.get('blOtherPayment'),
                store:HTStore.PAYTYPE_S,displayField:'NAME',valueField:'NAME',typeAhead:true,
                triggerAction:'all',selectOnfocus:true,mode:'local',
             	tabIndex:20,xtype:'combo',anchor:'80%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Air Port of Destination',name:'blPod',value:b.get('blPod'),
             	tabIndex:21,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Flight',name:'blVoyage',value:b.get('blVoyage'),
             	tabIndex:22,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Date',name:'blEtd',value:b.get('blEtd'),
             	tabIndex:23,xtype:'datefield',format:DATEF,anchor:'99%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'Amount of Insurance',name:'blAmountInsurance',value:b.get('blAmountInsurance'),
             	tabIndex:24,xtype:'textfield',anchor:'99%'}
             ]},
             {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
             {fieldLabel:'T/S Remarks',name:'blTsRemarks',value:b.get('blTsRemarks'),
             	tabIndex:25,xtype:'textfield',anchor:'99%'}              
             ]}
         ]};
   //货物信息
    var t5={layout:'column',title:C_CARGO_INFO,padding:5,layoutConfig: {columns:4},collapsible:true,
    		autoScroll:true,height:215,
			items: [
			 {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'No of Packages',name:'blCargoPackages',value:b.get('blCargoPackages'),
            	tabIndex:27,xtype:'numberfield',anchor:'99%'}
            ]},
            {columnWidth:.15,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Gross Weight',name:'blCargoGrossWeight',value:b.get('blCargoGrossWeight'),
            	tabIndex:28,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'99%'}
            ]},  
            {columnWidth:.15,layout:'form',border : false,labelAlign:'top',items:[
	         {fieldLabel:'Measurement',name:'blCargoMeasurement',value:b.get('blCargoMeasurement'),
	         	tabIndex:28,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'99%'}
	         ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Rate Class',name:'blRateClass',value:b.get('blRateClass'),
            	tabIndex:29,xtype:'textfield',anchor:'99%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Chargeable Weight',name:'blChargeWeight',value:b.get('blChargeWeight'),
            	tabIndex:30,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'99%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Rate',name:'blChargeRate',value:b.get('blChargeRate'),
            	tabIndex:31,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'99%',
            	listeners:{
            		scope:this,
            		change:function(f,n,o){
            			var r = this.find('name','blChargeWeight')[0].getValue();
            			var t = this.find('name','blTotalCharge')[0];
            			var ct = this.find('name','blTotalCc')[0];
            			var p = this.find('name','blValuePayment')[0].getValue();
            			var c = this.find('name','blOtherPayment')[0].getValue();
            			t.setValue(r*n);
            			if(p=="CC")
            				ct.setValue(r*n);
            		}
            	}
            	}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Total',name:'blTotalCharge',value:b.get('blTotalCharge'),
            	tabIndex:32,xtype:'numberfield',anchor:'99%'}
            ]},
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:"Description of Goods",name:'blCargoDesc',value:b.get('blCargoDesc'),
                	tabIndex:33,xtype:'textarea',height:100,anchor:'99%'}]},
            {columnWidth:.5,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:"Mark",name:'blCargoMarks',value:b.get('blCargoMarks'),
                	tabIndex:33,xtype:'textarea',height:100,anchor:'99%'}]}
			]};
	var t6={layout:'column',title:C_EXPE_INFO,padding:5,layoutConfig: {columns:2},
			collapsible:true,autoScroll:true,height:215,
			items: [
			{columnWidth:.6,layout:'column',layoutConfig: {columns:2},labelWidth:220,border:false,items:[ 
			    {columnWidth:.4,layout:'form',border:false,items:[]},
			    {columnWidth:.3,layout:'form',border:false,items:[]},
			    {columnWidth:.3,layout:'form',border:false,items:[]},
            	{columnWidth:.7,layout:'form',border:false,items:[
            		{hideLabels:true,text:'Prepaid',xtype:'label',anchor:'99%',style:'padding-left:226px;'},
            		{fieldLabel:'Weight Charge',name:'blWeightChargePp',value:b.get('blWeightChargePp'),
            			tabIndex:34,xtype:'numberfield',anchor:'99%'},
            		{fieldLabel:'Valuation Charge',name:'blValuationChargePp',value:b.get('blValuationChargePp'),
            			tabIndex:36,xtype:'numberfield',anchor:'99%'},
            		{fieldLabel:'Tax',name:'blTaxPp',value:b.get('blTaxPp'),tabIndex:38,xtype:'numberfield',anchor:'99%'},
            		{fieldLabel:'Total Other Charges Due Agent',name:'blOtherDaPp',value:b.get('blOtherDaPp'),
            			tabIndex:40,xtype:'numberfield',anchor:'99%'},
            		{fieldLabel:'Total Other Charges Due Carrier',name:'blOtherDcPp',value:b.get('blOtherDcPp'),
            			tabIndex:42,xtype:'numberfield',anchor:'99%'},
            		{fieldLabel:'Total',name:'blTotalPp',value:b.get('blTotalPp'),
            			tabIndex:44,xtype:'textfield',anchor:'99%'}]},
            	{columnWidth:.3,layout:'form',border:false,hideLabels:true,items:[
            		{text:'Collect:',xtype:'label',anchor:'99%'},
            		{name:'blWeightChargeCc',value:b.get('blWeightChargeCc'),
            			tabIndex:35,xtype:'numberfield',anchor:'99%'},
            		{name:'blValuationChargeCc',value:b.get('blValuationChargeCc'),
            			tabIndex:37,xtype:'numberfield',anchor:'99%'},
            		{name:'blTaxCc',value:b.get('blTaxCc'),tabIndex:39,xtype:'numberfield',anchor:'99%'},
            		{name:'blOtherDaCc',value:b.get('blOtherDaCc'),
            			tabIndex:41,xtype:'numberfield',anchor:'99%'},
            		{name:'blOtherDcCc',value:b.get('blOtherDcCc'),
            			tabIndex:43,xtype:'numberfield',anchor:'99%'},
            		{name:'blTotalCc',value:b.get('blTotalCc'),
            			tabIndex:45,xtype:'numberfield',anchor:'99%'}]}            		
            ]},           
			{columnWidth:.4,layout:'form',border:false,
                items: [this.grid]}
			]};
	//签发信息
	var t3={layout:'column',title:C_ISSUE_INFO,height:200,collapsible:true,layoutConfig: {columns:4},
			padding:5,autoScroll:true,border:false,labelWidth:90,
			items: [
			{columnWidth:.25,layout:'form',border:false,items:[
				{fieldLabel:C_ISTY,name:'istyId',value:b.get('istyId'),
					store:HTStore.ISTY_S,tabIndex:50,xtype:'combo',displayField:'NAME',
					valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',
					selectOnFocus:true,anchor:'99%'}, 
				{fieldLabel:C_CLEAN_FLAG,name:'blCleanFlag',value:b.get('blCleanFlag'),
					xtype:'checkbox',labelSeparator:'',anchor:'99%'},
				{fieldLabel:C_ISSUE_PLACE,name:'blIssuePlace',value:b.get('blIssuePlace'),
					tabIndex:52,xtype:'textfield',anchor:'99%'}
			]},
			{columnWidth:.25,layout:'form',border:false,items:[
				{fieldLabel:C_ISSUE_DATE,name:'blIssueDate',value:b.get('blIssueDate'),
					tabIndex:53,xtype:'datefield',format:DATEF,anchor:'99%'},  
				{fieldLabel:C_THIRD_PLACE,name:'blThirdPlaceFlag',value:b.get('blThirdPlaceFlag'),
					xtype:'checkbox',labelSeparator:'',anchor:'99%'},
				{fieldLabel:C_REMARKS,name:'blRemarks',value:b.get('blRemarks'),
					tabIndex:55,xtype:'textarea',anchor:'99%'}
			]},
			{columnWidth:.25,layout:'form',border:false,items:[
				{fieldLabel:C_DOC_ORI_NUM,name:'blOriginalNum',value:b.get('blOriginalNum'),
					tabIndex:54,xtype:'textfield',anchor:'99%'},    
				{fieldLabel:C_ADVANCED_FLAG,name:'blAdvancedFlag',value:b.get('blAdvancedFlag'),
					xtype:'checkbox',labelSeparator:'',anchor:'99%'}
			]},
			{columnWidth:.25,layout:'form',border:false,items:[
				{fieldLabel:C_ISSUE_BY,name:'blIssueBy',value:b.get('blIssueBy'),
					tabIndex:51,xtype:'textfield',anchor:'99%'},   
				{fieldLabel:C_BL_BACK_FLAG,name:'blBackFlag',value:b.get('blBackFlag'),
					xtype:'checkbox',labelSeparator:'',anchor:'99%'}
			]}
	]};			
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_BL;
	
	this.frm = new Ext.form.FormPanel({labelWidth:80,
            items:{xtype:'form',plain:true,height:456,autoScroll:true,
            	items:[t4,t5,t6,t3]}
    });
    Fos.AirBlWin.superclass.constructor.call(this, {modal:true,title:b.get('rowAction')=='N'?C_NEW_BL:(C_BL+'-'+(b.get('blType')=='MB/L'?b.get('blMBlNo'):b.get('blNo'))),
    	width:1000,height:C_DEFAULT_WH,maximizable:true,layout:'fit',
        plain:false,items:this.frm,
        tbar:[
  			{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save},'-',
  			{text:C_CONFIRM,iconCls:'check',disabled:NR(m+F_M),scope:this,handler:this.check},'-',
  			{text:C_CANCEL_CONFIRM,iconCls:'renew',disabled:NR(m+F_M),scope:this,handler:this.uncheck},'-',
  			{text:C_PRINT_OFFICIAL,disabled:NR(m+F_M),iconCls:'star',scope:this,handler:this.printOffical},'-',
  			{text:C_BL_RELEASE,iconCls:'release',scope:this,handler:this.release},'-',
  			{text:C_COPY_FROM,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.copyFrom},'-',			
  			{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,
  				menu: {items: [
  		   		{text:C_BL_CONFIRM,menu:{items:[
  		   			{text:'Excel',scope:this,handler:this.expExcel},
  		   			{text:C_EMAIL,scope:this,handler:this.expEmail}
  		   			]}}
  		   		]}},'->'
  		   	]});
};
Ext.extend(Fos.AirBlWin, Ext.Window);

//货物列表
Fos.AirCargoGrid = function(p,cargoStore,container) {
	var quitFlag=new Ext.grid.CheckColumn({header:C_CARG_QUIT,dataIndex:'cargQuitFlag',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	
	var c1={header:C_MARKS,dataIndex:'cargMarks',editor:new Ext.form.TextField({})};
	var c2={header:C_CARGO_NAME_EN,dataIndex:'cargNameEn',editor:new Ext.form.TextField({})};
	var c3={header:C_CARGO_NAME_CN,dataIndex:'cargNameCn',editor:new Ext.form.TextField({})};
	var c4={header:C_PACKAGES,dataIndex:'cargPackageNum',
		editor:new Ext.form.NumberField({allowBlank:false})
	};
	var c5={header:C_PACK,dataIndex:'packName',
		editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})
	};
	
	var c6={header:C_GROSS_WEIGHT+(p.get('consShipType')==ST_B?C_MT:C_KGS),
		dataIndex:'cargGrossWeight',renderer:rateRender,
		editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})
	};
	
	var c7={header:C_NET_WEIGHT+(p.get('consShipType')==ST_B?C_MT:C_KGS),dataIndex:'cargNetWeight',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,invalidText:''})};
	var c8={header:C_UNIT,dataIndex:'unitName',
			editor:new Ext.form.ComboBox({displayField:'unitName',valueField:'unitName',triggerAction:'all',
		        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S()})};
	var c9={header:C_CBM,dataIndex:'cargMeasurement',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})};
	var c10={header:C_MANU_NO,dataIndex:'cargManuNo',editor:new Ext.form.TextField()};
	var c11={header:C_SPEC,dataIndex:'cargSpec',editor:new Ext.form.TextField()};
	var c12={header:C_HS_CODE,dataIndex:'cargNo',editor:new Ext.form.TextField()};
	var c13={header:C_CBMK,dataIndex:'cargMeasurementCustomer',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})};
	var c14={header:C_CGROSS_WEIGHT+(p.get('consShipType')==ST_B?C_MT:C_KGS),
		dataIndex:'cargGrossWeightCustomer',renderer:rateRender,
		editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})};
	var cm=new Ext.grid.ColumnModel({columns:[sm,quitFlag,c1,c2,c3,c4,c5,c6,c9,c14,c13,c8,c10,c11,c12],
		defaults:{sortable:true,width:80}});
	
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',scope:this,
		handler:function(){
			var c = new FCargo({
			consId:p.get('id'),
			consNo:p.get('consNo'),
			consMasterId:p.get('consMasterId'),
			consMasterNo:p.get('consMasterNo'),	
			cargPackageNum:0,
			cargMarks:'',cargSpec:'',
			cargNameCn:'',
			cargNameEn:'',
			packName:'CTNS',
			cargGrossWeight:'',
			cargNetWeight:'',
			cargMeasurement:'',
			cargUnit:'',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			cargoStore.insert(0,c);
        	this.startEditing(0,2);
        }
	});
	
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',iconCls:'remove',scope:this,
		handler:function(){
			var r = sm.getSelections();
			if(r){
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					cargoStore.remove(r[i]);
				}
			}
			container.reCalculate();
		}
	});
	
	
	Fos.AirCargoGrid.superclass.constructor.call(this,{region:'north',height:200,
		header:false,border:false,autoScroll:true,plugins:[quitFlag],
		clicksToEdit:1,store:cargoStore,sm:sm,cm:cm,
	    tbar:[btnAdd,'-',btnRemove],
	    listeners:{scope:this,afteredit:function(e){			
	    	var f=e.field;
	    	if(f=='cargPackageNum'||
	    			f=='cargNetWeight'||
	    			f=='cargGrossWeight'||
	    			f=='cargMeasurement'||
	    			f=='cargGrossWeightCustomer'||
	    			f=='cargMeasurementCustomer'||
	    			f=='packName'||
	    			f=='cargMarks'||
	    			f=='cargNameEn'||
	    			f=='cargNameCn'||
	    			f=='packId')
	    	{
	    		container.reCalculate();
	    	}
	    }}
	});
};
Ext.extend(Fos.AirCargoGrid, Ext.grid.EditorGridPanel);
