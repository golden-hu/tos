//事故列表
Fos.AccidentGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ACCI_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TAccident',id:'id'},TAccident),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	{header:C_ACCIDENT_DATE,dataIndex:'accidentDate',renderer:formatDate,width:100},
	{header:C_ACCIDENT_TYPE,dataIndex:'accidentTypeName',width:100},
	{header:C_VEHICLE_NO,dataIndex:'vehicleNo',width:100},
	{header:C_DRIVER,dataIndex:'driverName',width:100},
	{header:C_ACCIDENT_PLACE,dataIndex:'place',width:100},
	{header:C_LOSS_AMOUNT,dataIndex:'lossAmount',width:100},
	{header:C_COMPENSATE_AMOUNT,dataIndex:'compensateAmount',width:100},
	{header:C_INJURY_NUM,dataIndex:'injuryNum',width:100},
	{header:C_DEATH_NUM,dataIndex:'deathNum',width:100}
	],defaults:{sortable:false,width:100}});
	
	this.showAccident = function(p){
    	var win = new Fos.AccidentWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new TAccident({uuid:HTUtil.UUID(32),
			accidentDate:new Date(),lossAmount:0,compensateAmount:0,personAmount:0,
			injuryNum:0,deathNum:0,rowAction:'N'}); 
		this.showAccident(p);
	};
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TAccident');
	        		HTUtil.REQUEST('ACCI_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showAccident(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({value:'请输入车牌号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) 
					this.search();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	//查询
	this.search = function(){
		var vehicleNo=kw.getValue();
		if(!vehicleNo){
			XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(vehicleNo=='请输入车牌号...'){
				XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				store.baseParams={_A:'ACCI_Q',_mt:'json'};
			 	store.reload({params:{start:0,limit:C_PS,vehicleNo:vehicleNo},callback:function(r){
			 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
			 	});
			}
		}
	};	
	
	var m = M1_TMS + TMS_ACCI;
	btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.add});
	btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
		scope:this,handler:this.edit});
	btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
		scope:this,handler:this.del});
	btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.AccidentGrid.superclass.constructor.call(this,{title:C_ACCIDENT_LOG,header:false,
		id:'TMAINT_ACCI',closable:true,store:store,sm:sm,cm:cm,loadMask:true,
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showAccident(p);
				}
			}
	    },
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove, '-',kw,btnSearch]
    });
};
Ext.extend(Fos.AccidentGrid, Ext.grid.GridPanel);

//事故编辑窗口
Fos.AccidentWin = function(p,listStore) {	
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var driverStore = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var accidentTypeStore = new Ext.data.Store({url:SERVICE_URL+'?_A=ACTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TAccidentType',id:'id'},TAccidentType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		
	//车牌号
	var cboVehicleNo = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,
		tabIndex:1,itemCls:'required',enableKeyEvents:true,
	   	name:'vehicleNo',value:p.get('vehicleNo'),store:vehicleStore,enableKeyEvents:true,
		displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDriverName.focus();
				} 
			}	
		}
	});
	//驾驶员
	var cboDriverName = new Ext.form.ComboBox({fieldLabel:C_DRIVER,tabIndex:2,
   		name:'driverName',value:p.get('driverName'),store:driverStore,
   		enableKeyEvents:true,itemCls:'required',
		displayField:'driverName',valueField:'driverName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('driverId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtAccidentDate.focus();
				} 
			}
		}
	});
	
	//事故日期
	var dtAccidentDate = new Ext.form.DateField({fieldLabel:C_ACCIDENT_DATE,
		name:'accidentDate',value:p.get('accidentDate'),tabIndex:3,itemCls:'required',
		format:DATEF,anchor:'95%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboAccidentTypeName.focus();
				} 
			}
		}
	});
	
	//事故类型
	var cboAccidentTypeName = new Ext.form.ComboBox({fieldLabel:C_ACCIDENT_TYPE,
		tabIndex:4,itemCls:'required',
	   	name:'accidentTypeName',value:p.get('accidentTypeName'),
	   	store:accidentTypeStore,enableKeyEvents:true,
		displayField:'accidentTypeName',valueField:'accidentTypeName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('accidentTypeId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPlace.focus();
				} 
			}
		}
	});	
	//事故地点
	var txtPlace = new Ext.form.TextField({fieldLabel:C_ACCIDENT_PLACE,
		name:'place',value:p.get('place'),tabIndex:5,anchor:'95%',enableKeyEvents:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtResponsible.focus();
				} 
			}
		}
	});
	
	//责任人
	var txtResponsible = new Ext.form.TextField({fieldLabel:C_RESPONSIBLE,enableKeyEvents:true,
		name:'responsible',value:p.get('responsible'),tabIndex:6,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtReportor.focus();
				} 
			}
		}
	});
	
	//申报人
	var txtReportor = new Ext.form.TextField({fieldLabel:C_REPORTOR,enableKeyEvents:true,
		name:'reportor',value:p.get('reportor'),tabIndex:7,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtReportTime.focus();
				} 
			}
		}
	});
	
	//申报时间
	var dtReportTime = new Ext.form.DateField({fieldLabel:C_REPORT_TIME,
		name:'reportTime',value:p.get('reportTime'),tabIndex:8,enableKeyEvents:true,
    	format:DATEF,anchor:'95%',
    	listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPoliceOffice.focus();
				} 
			}
		}
	});
	
	//交警队
	var txtPoliceOffice = new Ext.form.TextField({fieldLabel:C_POLICE_OFFICE,enableKeyEvents:true,
		name:'policeOffice',value:p.get('policeOffice'),tabIndex:9,xtype:'textfield',anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPoliceTel.focus();
				} 
			}
		}
	});
	
	//交警电话
	var txtPoliceTel = new Ext.form.TextField({fieldLabel:C_POLICE_TEL,enableKeyEvents:true,
		name:'policeTel',value:p.get('policeTel'),tabIndex:10,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtLossAmount.focus();
				} 
			}
		}
	});
	
	//损失金额
	var txtLossAmount = new Ext.form.NumberField({fieldLabel:C_LOSS_AMOUNT,enableKeyEvents:true,
		name:'lossAmount',value:p.get('lossAmount'),tabIndex:11,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCompensateAmount.focus();
				} 
			}
		}
	});
	
	//赔偿金额
	var txtCompensateAmount = new Ext.form.NumberField({fieldLabel:C_COMPENSATE_AMOUNT,
		name:'compensateAmount',value:p.get('compensateAmount'),enableKeyEvents:true,
    	tabIndex:12,anchor:'95%',
    	listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPersonAmount.focus();
				} 
			}
		}
	});
	
	//个人赔偿金额
	var txtPersonAmount = new Ext.form.NumberField({fieldLabel:C_PERSON_AMOUNT,enableKeyEvents:true,
		name:'personAmount',value:p.get('personAmount'),tabIndex:13,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtAccidentReason.focus();
				} 
			}
		}
	});
	
	//事故原因
	var txtAccidentReason = new Ext.form.TextField({fieldLabel:C_ACCIDENT_REASON,
		name:'accidentReason',value:p.get('accidentReason'),enableKeyEvents:true,
    	tabIndex:14,anchor:'95%',
    	listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtDeathNum.focus();
				} 
			}
		}
	});
	
	//死亡人数
	var txtDeathNum = new Ext.form.NumberField({fieldLabel:C_DEATH_NUM,enableKeyEvents:true,
		name:'deathNum',value:p.get('deathNum'),tabIndex:15,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtInjuryNum.focus();
				} 
			}
		}
	});
	
	//受伤人数
	var txtInjuryNum = new Ext.form.NumberField({fieldLabel:C_INJURY_NUM,enableKeyEvents:true,
		name:'injuryNum',value:p.get('injuryNum'),tabIndex:16,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtAuditor.focus();
				} 
			}
		}
	});
	
	//审核人
	var txtAuditor = new Ext.form.NumberField({fieldLabel:C_AUDIT_BY,enableKeyEvents:true,
		name:'auditor',value:p.get('auditor'),tabIndex:17,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtAuditDate.focus();
				} 
			}
		}
	});
	
	//审核日期
	var dtAuditDate = new Ext.form.DateField({fieldLabel:C_AUDIT_TIME,
		name:'auditDate',value:p.get('auditDate'),tabIndex:8,enableKeyEvents:true,
    	format:DATEF,anchor:'95%',
    	listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtAccidentDescription.focus();
				} 
			}
		}
	});
	
	//事故描述
	var txtAccidentDescription = new Ext.form.TextArea({fieldLabel:C_ACCIDENT_DESCRIPTION,enableKeyEvents:true,
		name:'accidentDescription',value:p.get('accidentDescription'),tabIndex:19,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtResult.focus();
				} 
			}
		}
	});
	
	//事故描述
	var txtResult = new Ext.form.TextArea({fieldLabel:C_RESULT,enableKeyEvents:true,
		name:'result',value:p.get('result'),tabIndex:20,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtAuditComments.focus();
				} 
			}
		}
	});
	
	//审核意见
	var txtAuditComments = new Ext.form.TextArea({fieldLabel:C_AUDIT_COMMENTS,enableKeyEvents:true,
		name:'auditComments',value:p.get('auditComments'),tabIndex:21,anchor:'95%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtRemark.focus();
				} 
			}
		}
	});
	
	//备注
	var txtRemark = new Ext.form.TextArea({fieldLabel:C_REMARKS,
		name:'remark',value:p.get('remark'),tabIndex:22,xtype:'textarea',anchor:'95%'});
	
	var frm = new Ext.form.FormPanel({labelWidth:90,labelAlign:'right',padding:5,border:false,
		layout:'column',layoutConfig:{columns:2},items:[
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		cboVehicleNo,dtAccidentDate,txtPlace,txtReportor,
	    		txtPoliceOffice,txtLossAmount,txtPersonAmount,txtDeathNum,
	    		txtAuditor,txtAccidentDescription,txtAuditComments				
	    	]},
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		cboDriverName,cboAccidentTypeName,txtResponsible,dtReportTime,
	    		txtPoliceTel,txtCompensateAmount,txtAccidentReason,txtInjuryNum,
	    		dtAuditDate,txtResult,txtRemark
	    	]}
	    ]});
              
	this.save = function(){
		if(!HTUtil.checkFieldNotNull(C_VEHICLE_NO,cboVehicleNo))
			return;
		if(!HTUtil.checkFieldNotNull(C_DRIVER,cboDriverName))
			return;
		if(!HTUtil.checkFieldNotNull(C_ACCIDENT_DATE,dtAccidentDate))
			return;
		if(!HTUtil.checkFieldNotNull(C_ACCIDENT_TYPE,cboAccidentTypeName))
			return;
		
		HTUtil.saveToRecord(frm,p);
				
		var xml = HTUtil.RTX(p,'TAccident',TAccident);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'ACCI_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'TAccident',TAccident);
			var rowAction = p.get('rowAction');
			HTUtil.RU(c, p, TAccident);			
			if (rowAction=='N') 
				listStore.insert(0,p);			
			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var m = M1_TMS + TMS_ACCI;
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	Fos.AccidentWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_ACCIDENT:C_EDIT_ACCIDENT,
		width:800,height:480,modal:true,
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.AccidentWin, Ext.Window);

//加油记录列表
Fos.OilLogGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'OILO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilLog',id:'id'},TOilLog),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	{header:C_REFUEL_DATE,dataIndex:'refuelDate',renderer:formatDate,width:100},
	{header:C_VEHICLE_NO,dataIndex:'vehicleNo',width:100},
	{header:C_DRIVER,dataIndex:'driverName',width:100},
	{header:C_OIL_STATION,dataIndex:'oilStationName',width:100},
	{header:C_OIL_TYPE,dataIndex:'oilTypeName',width:100},
	{header:C_OIL_NUM,dataIndex:'num',width:100},
	{header:C_OIL_PRICE,dataIndex:'price',width:100},
	{header:C_OIL_AMOUNT,dataIndex:'amount',width:100}
	],defaults:{sortable:false,width:100}});
	
	this.showOilLog = function(p){
    	var win = new Fos.OilLogWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new TOilLog({uuid:HTUtil.UUID(32),refuelDate:new Date(),isPoint:0,
			rowAction:'N'}); 
		this.showOilLog(p);
	};
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TOilLog');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'OILO_S'},
               			success: function(){
               				sm.each(function(p){store.remove(p);});
               				Ext.Msg.alert(SYS,M_S);
               			},
               			failure: function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
               			xmlData:HTUtil.HTX(xml)});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showOilLog(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({value:'请输入车牌号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.search();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	
	this.search = function(){
		var vehicleNo=kw.getValue();
		if(!vehicleNo){
			XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(vehicleNo=='请输入车牌号...'){
				XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				store.baseParams={_A:'OILO_Q',_mt:'json'};
			 	store.reload({params:{start:0,limit:C_PS,vehicleNo:vehicleNo},callback:function(r){
			 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
			 	});
			}
		}
	 	
	};	
	
	var m = M1_TMS + TMS_OILO;
	btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.add});
	btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
		scope:this,handler:this.edit});
	btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
		scope:this,handler:this.del});
	btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.OilLogGrid.superclass.constructor.call(this,{title:C_OIL_LOG,header:false,
		id:'TMAINT_OILO',closable:true,store:store,sm:sm,cm:cm,loadMask: true,
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showOilLog(p);
				}
			}
	    },
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove, '-',kw,btnSearch]
    });
};
Ext.extend(Fos.OilLogGrid, Ext.grid.GridPanel);

//加油记录窗口
Fos.OilLogWin = function(p,listStore) {
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var driverStore = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var oilTypeStore = new Ext.data.Store({url:SERVICE_URL+'?_A=OITY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilType',id:'id'},TOilType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var oilStationStore = new Ext.data.Store({url:SERVICE_URL+'?_A=OIST_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilStation',id:'id'},TOilStation),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});		
	var cardStore = new Ext.data.Store({url:SERVICE_URL+'?_A=T_OIL_CARD_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilCard',id:'id'},TOilCard),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//车辆
	var cboVehicle = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,tabIndex:1,itemCls:'required',
   		name:'vehicleNo',value:p.get('vehicleNo'),store:vehicleStore,enableKeyEvents:true,
		displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
				cboOilCard.setValue(r.get('cardNumber'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDriver.focus();
				} 
			}
		}
	});
	
	//司机
	var cboDriver = new Ext.form.ComboBox({fieldLabel:C_DRIVER,tabIndex:2,itemCls:'required',
   	 	name:'driverName',value:p.get('driverName'),store:driverStore,enableKeyEvents:true,
   	 	displayField:'driverName',valueField:'driverName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('driverId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dateRefuel.focus();
				} 
			}
		}
	});
	
	//加油日期
	var dateRefuel = new Ext.form.DateField({fieldLabel:C_REFUEL_DATE,
		tabIndex:3,name:'refuelDate',enableKeyEvents:true,
		value:p.get('refuelDate'),tabIndex:3,format:DATEF,itemCls:'required',anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboOilType.focus();
				} 
			}
		}
	});
	
	//油品
	var cboOilType = new Ext.form.ComboBox({fieldLabel:C_OIL_TYPE,tabIndex:4,itemCls:'required',
		name:'oilTypeName',value:p.get('oilTypeName'),store:oilTypeStore,enableKeyEvents:true,
		displayField:'oilTypeName',valueField:'oilTypeName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('oilTypeId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPrice.focus();
				} 
			}
		}
	});	
	
		
	//油价
	var txtPrice = new Ext.form.NumberField({fieldLabel:C_OIL_PRICE,
		name:'price',value:p.get('price'),enableKeyEvents:true,
		tabIndex:5,itemCls:'required',anchor:'95%',
    	listeners:{scope:this,
			change:function(f,nv,ov){
				var price = parseFloat(nv);
				var num = parseFloat(txtNum.getValue());
				var amount = price*num;
				p.set('amount',amount);
				txtAmount.setValue(amount);
				txtCurrencyPaid.setValue(amount);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtNum.focus();
				} 
			}
    	}
	});
	
	//加油数量
	var txtNum = new Ext.form.NumberField({fieldLabel:C_OIL_NUM,
		name:'num',value:p.get('num'),tabIndex:6,anchor:'95%',enableKeyEvents:true,
		itemCls:'required',listeners:{scope:this,
			change:function(f,nv,ov){
				var price = parseFloat(txtPrice.getValue());
				var num = parseFloat(nv);
				var amount = price*num;
				p.set('amount',amount);
				txtAmount.setValue(amount);
				txtCurrencyPaid.setValue(amount);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtAmount.focus();
				} 
			}
		}
	});
	
	//合计金额
	var txtAmount = new Ext.form.NumberField({fieldLabel:'加油'+C_OIL_AMOUNT,
		tabIndex:7,name:'amount',enableKeyEvents:true,
		value:p.get('amount'),itemCls:'required',anchor:'95%',listeners:{scope:this,
			change:function(f,nv,ov){
				var amount = parseFloat(nv);
				p.set('amount',amount);
				txtCurrencyPaid.setValue(amount);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboOilCard.focus();
				} 
			}
		}
	});
	
	//加油卡
	var cboOilCard = new Ext.form.ComboBox({fieldLabel:C_OIL_CARD,tabIndex:8,
		name:'cardNumber',value:p.get('cardNumber'),store:cardStore,enableKeyEvents:true,
		displayField:'cardNumber',valueField:'cardNumber',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){				
				p.set('cardId',r.get('id'));
				var balance = r.get('balance');
				if(balance>0){
					p.set('startAmount',balance);
					txtStartAmount.setValue(balance);
					txtCardPaid.setDisabled(false);
					
					var amount = p.get('amount');
					if(amount<=balance){						
						txtCardPaid.setValue(amount);
						txtEndAmount.setValue(balance-amount);
						txtCurrencyPaid.setValue(0);
					}
					else{
						txtCardPaid.setValue(balance);
						txtEndAmount.setValue(0);
						currencyPaid = amount-balance;
						txtCurrencyPaid.setValue(currencyPaid);
					}
				}
				else{
					txtCardPaid.setDisabled(true);
				}
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtStartAmount.focus();
				} 
			}
		}
	});
	
	//加油原余额
	var txtStartAmount = new Ext.form.NumberField({fieldLabel:'油卡原余额',
		tabIndex:'9',name:'startAmount',enableKeyEvents:true,
    	value:p.get('startAmount'),disabled:true,anchor:'95%',
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboOilType.focus();
				} 
			}
		}
	});
	
	var txtCardPaid = new Ext.form.NumberField({fieldLabel:'油卡支付金额',
		tabIndex:'9',name:'cardPaid',enableKeyEvents:true,
    	value:p.get('cardPaid'),disabled:p.get('cardNumber')=='',anchor:'95%',
    	listeners:{scope:this,
			change:function(f,nv,ov){
				var amount = parseFloat(txtAmount.getValue());
				var cardPaid = parseFloat(nv);
				var endAmount = p.get('startAmount')-cardPaid;
				txtEndAmount.setValue(endAmount);
				p.set('cardPaid',cardPaid);
				var currencyPaid = amount - cardPaid;
				txtCurrencyPaid.setValue(currencyPaid);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtEndAmount.focus();
				} 
			}
    	}
	});
	
	//加油余额
	var txtEndAmount = new Ext.form.NumberField({fieldLabel:'油卡余额',
		tabIndex:'9',name:'startAmount',enableKeyEvents:true,
    	value:p.get('startAmount'),disabled:true,anchor:'95%',
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCurrencyPaid.focus();
				} 
			}
		}
	});
	
	var txtCurrencyPaid = new Ext.form.NumberField({fieldLabel:'现金支付金额',
		tabIndex:'9',name:'currencyPaid',enableKeyEvents:true,
    	value:p.get('currencyPaid'),anchor:'95%',
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboOilStation.focus();
				} 
			}
		}
	});
	
	//加油站
	var cboOilStation = new Ext.form.ComboBox({fieldLabel:C_OIL_STATION,tabIndex:10,
		name:'oilStationName',value:p.get('oilStationName'),
   	 	store:oilStationStore,enableKeyEvents:true,displayField:'oilStationName',
   	 	valueField:'oilStationName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('oilStationId',r.get('id'));
				p.set('isPoint',r.get('isPoint'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCurentMiles.focus();
				} 
			}
		}
	});
	
	//期初公里数
	var txtCurentMiles = new Ext.form.NumberField({fieldLabel:'期初公里数',
		tabIndex:'11',enableKeyEvents:true,
		name:'currentMiles',value:p.get('currentMiles'),anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtSigner.focus();
				} 
			}
		}
	});
	
	//签收人
	var txtSigner = new Ext.form.TextField({fieldLabel:'签收人',
		tabIndex:'12',enableKeyEvents:true,
		name:'signInContact',value:p.get('signInContact'),anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtRemark.focus();
				} 
			}
		}
	});
	
	//备注
	var txtRemark = new Ext.form.TextArea({fieldLabel:C_REMARKS,name:'remark',value:p.get('remark'),
		tabIndex:13,anchor:'95%'});
	
	var frm = new Ext.form.FormPanel({labelWidth:90,frame:false,padding:10,items:[
			cboVehicle,cboDriver,dateRefuel,				    		
			cboOilType,txtPrice,txtNum,txtAmount,
	        cboOilCard,txtStartAmount,txtCardPaid,txtEndAmount,txtCurrencyPaid,cboOilStation,
	        txtCurentMiles,txtSigner,txtRemark
	    ]});

	this.save = function(){		
		if(!HTUtil.checkFieldNotNull(C_VEHICLE_NO,cboVehicle))
			return;
		if(!HTUtil.checkFieldNotNull(C_DRIVER,cboDriver))
			return;
		if(!HTUtil.checkFieldNotNull(C_REFUEL_DATE,dateRefuel))
			return;
		if(!HTUtil.checkFieldNotNull(C_OIL_TYPE,cboOilType))
			return;
		if(!HTUtil.checkFieldNotNull(C_UNIT_PRICE,txtPrice))
			return;
		if(!HTUtil.checkFieldNotNull('加油数量',txtNum))
			return;
		if(!HTUtil.checkFieldNotNull('加油金额',txtAmount))
			return;
		
		HTUtil.saveToRecord(frm,p);
						
		var xml = HTUtil.RTX(p,'TOilLog',TOilLog);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'OILO_S'},
		success: function(r){
			var rowAction = p.get('rowAction');
			var c = HTUtil.XTR(r.responseXML,'TOilLog',TOilLog);
			HTUtil.RU(c, p, TOilLog);
			
			if (rowAction=='N') 
				listStore.insert(0,p);

			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};        
	var m = M1_TMS + TMS_OILO;
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	Fos.OilLogWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_OIL_LOG:C_EDIT_OIL_LOG,
		width:400,height:600,modal:true,
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.OilLogWin, Ext.Window);

//维修记录列表
Fos.RepairLogGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'RELO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TRepairLog',id:'id'},TRepairLog),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load();
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	{header:C_REPAIR_NO,dataIndex:'repairNo',width:100},
	{header:C_REPAIR_DATE,dataIndex:'repairDate',renderer:formatDate,width:100},
	{header:C_VEHICLE_NO,dataIndex:'vehicleNo',width:100},
	{header:C_DRIVER,dataIndex:'driverName',width:100},
	{header:C_INVOICE_NO,dataIndex:'invoiceNo',width:100},
	{header:C_INVOICE_AMOUNT,dataIndex:'invoiceAmount',width:100},
	{header:C_ISPOINT_REPAIR,dataIndex:'isPoint',width:100}
	],defaults:{sortable:false,width:100}});
	
	this.showRepairLog = function(p){
    	var win = new Fos.RepairLogWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new TRepairLog({uuid:HTUtil.UUID(32),repairDate:new Date(),isPoint:0,rowAction:'N'}); 
		this.showRepairLog(p);
	};
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TRepairLog');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'RELO_R'},
               			success: function(){
               				sm.each(function(p){store.remove(p);});
               				Ext.Msg.alert(SYS,M_S);
               			},
               			failure: function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
               			xmlData:HTUtil.HTX(xml)});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showRepairLog(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({value:'请输入车牌号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) 
					this.search();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	//查询
	this.search = function(){
		var vehicleNo=kw.getValue();
		if(!vehicleNo){
			XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(vehicleNo=='请输入车牌号...'){
				XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				store.baseParams={_A:'RELO_Q',_mt:'json'};
			 	store.reload({params:{start:0,limit:C_PS,vehicleNo:vehicleNo},callback:function(r){
			 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
			 	});
			}
			
		};
	};	
 	
	var m = M1_TMS + TMS_RELO;
	btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.add});
	btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
		scope:this,handler:this.edit});
	btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
		scope:this,handler:this.del});
	btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.RepairLogGrid.superclass.constructor.call(this,{title:C_REPAIR_LOG,header:false,
		id:'TMAINT_RELO',closable:true,store:store,sm:sm,cm:cm,loadMask:true,
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showRepairLog(p);
				}
			}
	    },
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove, '-',kw,btnSearch]
    });
};
Ext.extend(Fos.RepairLogGrid, Ext.grid.GridPanel);

//维修记录窗口
Fos.RepairLogWin = function(p,listStore) {
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var driverStore = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=REIT_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TRepairItem',id:'id'},TRepairItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		store.load({params:{repairLogId:p.get('id')}});
	
	var txtRepairNo = new Ext.form.TextField({fieldLabel:C_REPAIR_NO,
		name:'repairNo',value:p.get('repairNo'),tabIndex:1,
    	itemCls:'required',anchor:'95%',enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtRepairDate.focus();
				} 
			}
		}
	});
	
	var dtRepairDate = new Ext.form.DateField({fieldLabel:C_REPAIR_DATE,
		name:'repairDate',value:p.get('repairDate'),tabIndex:5,enableKeyEvents:true,
    	format:DATEF,anchor:'95%',
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboVehicleNo.focus();
				} 
			}
		}
	});
	
	var cboVehicleNo = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,
		tabIndex:2,itemCls:'required',
   	 	name:'vehicleNo',value:p.get('vehicleNo'),store:vehicleStore,enableKeyEvents:true,
   	 	displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtInvoiceNo.focus();
				} 
			}
		}
	});
	
	var txtInvoiceNo = new Ext.form.TextField({fieldLabel:C_INVOICE_NO,
		name:'invoiceNo',value:p.get('invoiceNo'),
		tabIndex:6,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDriver.focus();
				} 
			}
		}
	});
	
	var cboDriver = new Ext.form.ComboBox({fieldLabel:C_DRIVER,
		tabIndex:3,itemCls:'required',
		name:'driverName',value:p.get('driverName'),store:driverStore,enableKeyEvents:true,
		displayField:'driverName',valueField:'driverName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('driverId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboFactoryName.focus();
				} 
			}
		}
	});
	
	var cboFactoryName = new Fos.CustomerLookup({fieldLabel:C_REPAIR_FACTORY,
		tabIndex:4,itemCls:'required',
   	 	name:'factoryName',value:p.get('factoryName'),
   	 	store:HTStore.getCS(),enableKeyEvents:true,
   	 	displayField:'custCode',valueField:'custNameCn',
   	 	typeAhead:true,custType:'custFactoryFlag',
   	 	mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',
   	 	selectOnFocus:true,
   	 	anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
		 		if(f.getRawValue()==''){
		 			f.clearValue();
		 			p.set('factoryId','');
		 		}
		 	},
		 	select:function(c,r,i){
		 		p.set('factoryId',r.get('id'));
		 	},
		 	keydown:{fn:function(f,e){
		 		LC(f,e,'custFactoryFlag');
		 		if(e.getKey()==e.ENTER){
		 			txtInvoiceAmount.focus();
				}
		 	},buffer:BF}
		 }
	});
	
	var txtInvoiceAmount = new Ext.form.TextField({fieldLabel:C_INVOICE_AMOUNT,
		name:'invoiceAmount',value:p.get('invoiceAmount'),
		tabIndex:7,disabled:true,anchor:'95%'});
	
	var chkIsPoint = new Ext.form.Checkbox({fieldLabel:C_ISPOINT_REPAIR,
		name:'isPoint',checked:p.get('isPoint')==1,
		tabIndex:8,anchor:'95%'});
	
			
	var frm = new Ext.form.FormPanel({region:'north',height:150,layout:'column',layoutConfig:{columns:4},
		labelWidth:80,labelAlign:'right',frame:false,padding:10,items:[
            {columnWidth:.25,layout:'form',border:false,items:[txtRepairNo,dtRepairDate]},
			{columnWidth:.25,layout:'form',border:false,items:[cboVehicleNo,txtInvoiceNo]},
			{columnWidth:.25,layout:'form',border:false,items:[cboDriver,txtInvoiceAmount]},
            {columnWidth:.25,layout:'form',border:false,labelWidth:90,items:[cboFactoryName,chkIsPoint]},
			{columnWidth:1,layout:'form',border:false,items:[
	        {fieldLabel:C_REMARKS,name:'remark',value:p.get('remark'),tabIndex:9,xtype:'textarea',anchor:'99%'}
	        ]}
	    ]});
		
	this.reCalculate=function(){
		var invoiceAmount=0;
		var a=store.getRange();
		for(var i=0;i<a.length;i++){
			var partsFee = parseInt(a[i].get('partsNum'))*parseFloat(a[i].get('partsPrice'));
			var hoursFee = parseInt(a[i].get('hours'))*parseFloat(a[i].get('hoursPrice'));
			a[i].set('partsFee',partsFee);
			a[i].set('hoursFee',hoursFee);
			a[i].set('totalAmount',partsFee+hoursFee);
			invoiceAmount+=parseFloat(a[i].get('totalAmount'));
		}
		frm.invoiceAmount.setValue(invoiceAmount);
	};
	
	this.addItem = function(){
		var t = new TRepairItem({uuid:HTUtil.UUID(32),repairLogId:p.get('id')});
		t.set('rowAction','N');
		store.insert(0,t);
		grid.startEditing(0,1);
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
  		{header:C_REPAIR_ITEM,dataIndex:'itemName',width:100,editor:new Ext.form.TextField({})},
  		{header:C_PARTS_NUM,dataIndex:'partsNum',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
  		{header:C_PARTS_PRICE,dataIndex:'partsPrice',width:100,
  			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false})},
  		{header:C_PARTS_FEE,dataIndex:'partsFee',width:100,renderer:rateRender},
  		{header:C_HOURS,dataIndex:'hours',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
  		{header:C_HOURS_PRICE,dataIndex:'hoursPrice',width:100,
  			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false})},
  		{header:C_HOURS_FEE,dataIndex:'hoursFee',width:100,renderer:rateRender},
  		{header:C_TOTAL_AMOUNT,dataIndex:'totalAmount',width:100,renderer:rateRender},
  		{header:C_REMARKS,dataIndex:'trcaRemarks',width:100,editor:new Ext.form.TextField()}
  		],defaults:{sortable:false,width:100}});
	var grid = new Ext.grid.EditorGridPanel({region:'center',autoScroll:true,sm:sm,cm:cm,store:store,
		listeners:{scope:this,afteredit:function(e){var f=e.field;
    		if(f=='partsNum'||f=='partsPrice'||f=='hours'||f=='hoursPrice'){this.reCalculate();}
    	}}
	});
	
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('repairNo'))){
			Ext.Msg.alert(SYS,C_REPAIR_NO+C_NOTNULL,function(){frm.repairNo.focus();},this);return;};
		if(Ext.isEmpty(p.get('vehicleId'))){
			Ext.Msg.alert(SYS,C_VEHICLE_NO_REQUIRED,function(){frm.vehicleNo.focus();},this);return;};
		if(Ext.isEmpty(p.get('driverId'))){
			Ext.Msg.alert(SYS,C_DRIVER_REQUIRED,function(){frm.driverName.focus();},this);return;};
		if(Ext.isEmpty(p.get('repairDate'))){
			Ext.Msg.alert(SYS,C_REPAIR_DATE_REQUIRED,function(){frm.repairDate.focus();},this);return;};		
		if(Ext.isEmpty(p.get('factoryName'))){
			Ext.Msg.alert(SYS,C_REPAIR_FACTORY+C_NOTNULL,function(){frm.factoryName.focus();},this);return;};		
		p.endEdit();
		
		var newP = ('N' == p.get('rowAction'));
		
		var xml = HTUtil.RTX(p,'TRepairLog',TRepairLog);
		var a = store.getModifiedRecords();
		xml+=HTUtil.ATX(a,'TRepairItem',TRepairItem);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'RELO_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'TRepairLog',TRepairLog);
			HTUtil.RU(c, p, TRepairLog);
			
			if(newP) listStore.insert(0,p);
			
			var a = HTUtil.XTRA(r.responseXML,'TRepairItem',TRepairItem);
			HTUtil.RUA(store, a, TRepairItem);
			Ext.Msg.alert(SYS,M_S);
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var m = M1_TMS + TMS_RELO;
	var btnAddItem = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.addItem});
	var btnRemoveItem = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),
		scope:this,handler:function(){
			HTUtil.REMOVE_SM(sm,store);
		}
	});
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	Fos.RepairLogWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_REPAIR_LOG:C_EDIT_REPAIR_LOG,
		width:900,height:500,modal:true,layout:'border',
	  	items:[frm,grid],
	  	buttons:[btnAddItem,'-',btnRemoveItem,'-',btnSave,
	  	    {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.RepairLogWin, Ext.Window);

//维修费用
Fos.TmsMaintExpenseGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',objectType:1,_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	{header:C_TMS_M_EXP_DATE,dataIndex:'expeDate',renderer:formatDate,width:80},
	{header:C_TMS_M_EXP_VEHNO,dataIndex:'objectName1',width:90},
	{header:C_TMS_M_EXP_DRIVE,dataIndex:'objectName2',width:90},
	{header:C_TMS_M_EXP_SET_OBJECT,dataIndex:'custName',width:120},
	{header:C_TMS_M_EXP_AMOUNT,dataIndex:'expeTotalAmount',width:80},
	{header:C_TMS_M_EXP_INVNO,dataIndex:'expeTaxInvoiceNo',width:100},
	{header:C_TMS_M_EXP_REMARK,dataIndex:'expeRemarks',width:200}
	],defaults:{sortable:false,width:100}});
	
	this.showSubWin = function(p){
    	var win = new Fos.TmsMaintExpenseWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new SExpense({uuid:HTUtil.UUID(32),rowAction:'N',expeDate:new Date(),expeType:'P',currCode:'CNY',objectType:1,consId:0,consNo:'',charId:1}); 
		this.showSubWin(p);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p)
			this.showSubWin(p);
		else 
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'SExpense');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
               			success: function(){
               				sm.each(function(p){store.remove(p);});
               				Ext.Msg.alert(SYS,M_S);
               			},
               			failure: function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
               			xmlData:HTUtil.HTX(xml)});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.search();
			}
		}
	});
	
	this.search = function(){
		var vehicleNo=kw.getValue();
		if(!vehicleNo){
			XMG.alert(SYS,C_VEHICLE_NO_REQUIRED,function(b){kw.focus();});
			return;
		};
		
	 	store.baseParams={_A:'EXPE_Q',objectType:1,_mt:'json'};
	 	store.reload({params:{start:0,limit:C_PS,objectName1:vehicleNo},callback:function(r){
	 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
	 	});
	};
 	
	Fos.TmsMaintExpenseGrid.superclass.constructor.call(this,{title:C_TMS_M_EXPRENSE,header:false,
		id:'TMAINT_TMS_M_E',closable:true,store:store,sm:sm,cm:cm,loadMask:true,
		listeners:{scope:this, rowdblclick: function(grid, rowIndex, event){this.edit();}},
		bbar:PTB(store,100),
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.add},'-',
		      {text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
		      {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}, '-', 
		      {text:C_VEHICLE_NO,xtype:'tbtext'},kw,
		      {text:C_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.TmsMaintExpenseGrid, Ext.grid.GridPanel);

//维修费用窗口
Fos.TmsMaintExpenseWin = function(p,listStore) {
	
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VEHI_Q', _mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var driverStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'DRIV_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		
		if(Ext.isEmpty(p.get('expeDate'))){
			Ext.Msg.alert(SYS,C_REFUEL_DATE_REQUIRED,function(){frm.expeDate.focus();},this);
			return;
		}
		
		if(Ext.isEmpty(p.get('objectId1'))){
			Ext.Msg.alert(SYS,C_VEHICLE_NO_REQUIRED,function(){frm.ObjectName1.focus();},this);
			return;
		}
		
		if(Ext.isEmpty(p.get('objectId2'))){
			Ext.Msg.alert(SYS,C_DRIVER_REQUIRED,function(){frm.ObjectName2.focus();},this);
			return;
		}
		
		if(Ext.isEmpty(p.get('custId'))){
			Ext.Msg.alert(SYS,C_TMS_M_EXP_SET_OBJECT_REQUIRED,function(){frm.custName.focus();},this);
			return;
		}
		p.endEdit();
		
		var newP = (p.get('rowAction')=='N');
		
		var xml = HTUtil.RTX(p,'SExpense',SExpense);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'SExpense',SExpense);
			HTUtil.RU(c, p, SExpense);
			
			if (newP) listStore.insert(0,p);
			
			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,items:[
	        {fieldLabel:C_TMS_M_EXP_DATE,name:'expeDate',value:(p.get('expeDate') ? p.get('expeDate') : (new Date())),tabIndex:1,itemCls:'required',ref:'../refuelDate',xtype:'datefield',format:DATEF,anchor:'95%'},                                                          
			{fieldLabel:C_TMS_M_EXP_VEHNO,tabIndex:2,ref:'../vehicleNo',
		    	 name:'ObjectName1',value:p.get('objectName1'),itemCls:'required',store:vehicleStore,enableKeyEvents:true,
		    	 xtype:'combo',displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
					triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
							p.set('objectId1',r.get('id'));
							p.set('objectName1',r.get('vehicleNo'));
						}}
					},
			{fieldLabel:C_TMS_M_EXP_DRIVE,tabIndex:3,ref:'../driverName',
		    	 name:'ObjectName2',value:p.get('objectName2'),store:driverStore,enableKeyEvents:true,
		    	 xtype:'combo',displayField:'driverName',valueField:'driverName',typeAhead: true,itemCls:'required',mode:'remote',
					triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
							p.set('objectId2',r.get('id'));
							p.set('objectName2',r.get('driverName'));
						}}
					},	
			{fieldLabel:C_TMS_M_EXP_SET_OBJECT,itemCls:'required',tabIndex:4,ref:'../../custName',
				    name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
				    xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',typeAhead:true,custType:'custBookerFlag',
				    mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
				    anchor:'95%',
				    listeners:{scope:this,
				    	 blur:function(f){
				    	 		if(f.getRawValue()==''){
				    	 			f.clearValue();
				    	 			p.set('custId','');
				    	 			p.set('custName','');
				    	 			p.set('custSname','');
				    	 		}},
				    	 select:function(c,r,i) {
				    	 		p.set('custId',r.get('id'));
				    	 		p.set('custName',r.get('custName'));
				    	 		p.set('custSname',r.get('custSname'));
				    	 	},
				    	 keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},
				    buffer:BF}}},
	        {fieldLabel:C_TMS_M_EXP_AMOUNT,name:'expeTotalAmount',value:p.get('expeTotalAmount'),tabIndex:5,itemCls:'required',xtype:'numberfield',anchor:'95%'},
	        {fieldLabel:C_TMS_M_EXP_INVNO,name:'expeTaxInvoiceNo',value:p.get('expeTaxInvoiceNo'),tabIndex:6,xtype:'textfield',anchor:'95%'},
	        {fieldLabel:C_TMS_M_EXP_REMARK,name:'expeRemarks',value:p.get('expeRemarks'),tabIndex:7,xtype:'textarea',anchor:'95%'}
	    ]});
	
	Fos.TmsMaintExpenseWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_TMS_M_EXPRENSE_ADD:C_TMS_M_EXPRENSE_UPD,
		width:400,height:305,modal:true,
	  	items:[frm],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
	  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.TmsMaintExpenseWin, Ext.Window);


Fos.TransTaskPosition = function(vehicleNo) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCAR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TCargo',id:'id'},TCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'TTRT_Q',vehicleNo:vehicleNo,status:1},
			success: function(r){
				var A = HTUtil.XTRA(r.responseXML,'TTransTask',TTransTask);
				var c = A[0];
				if(c==null){
					Ext.Msg.alert(SYS,'目前没有派车单');
				}else{
					frm.getForm().loadRecord(c);
					store.load({params:{transTaskId:c.get('id')}});
				}
			},
			failure: function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));}});
	
	var frm = new Ext.form.FormPanel({region:'north',height:150,layout:'column',layoutConfig:{columns:4},
		labelWidth:80,frame:true,items:[
        {columnWidth:.25,layout:'form',border:false,labelWidth:60,items:[
		 {fieldLabel:C_TRANS_TASK_NO,id:'ttransTask.transTaskNo',name:'transTaskNo',disabled:true,
		 	 tabIndex:1,xtype:'textfield',anchor:'95%'},
	 	{fieldLabel:C_VEHICLE_NO,name:'vehicleNo',tabIndex:5,xtype:'textfield',anchor:'95%'},
		{fieldLabel:C_PLACE_FROM,name:'placeFromName',tabIndex:9,xtype:'textfield',anchor:'95%'},
		{fieldLabel:C_CARGO_NAME,name:'cargoName',
			tabIndex:13,xtype:'textfield',anchor:'95%'}
		]},
		{columnWidth:.25,layout:'form',border:false,items:[
		    {fieldLabel:C_MOTORCADE,name:'motorcadeName',xtype:'textfield',anchor:'95%'},
		    {fieldLabel:C_DRIVER,name:'driverName',xtype:'textfield',anchor:'95%'},
        	{fieldLabel:C_PLACE_TO,name:'placeToName',
				tabIndex:10,xtype:'textfield',anchor:'95%'},
		    {fieldLabel:C_SUM_PACK,name:'packages',
            	tabIndex:14,xtype:'numberfield',anchor:'95%'}
		 ]},
		 {columnWidth:.25,layout:'form',border:false,items:[
			{fieldLabel:C_MOTORCADE_CONTACT,ref:'../motorcadeContact',name:'motorcadeContact',
        		tabIndex:3,xtype:'textfield',anchor:'95%'},
        	{fieldLabel:C_DRIVER_TEL,name:'driverTel',
    			tabIndex:7,xtype:'textfield',anchor:'95%'},
            {fieldLabel:C_EMPTY_MILES,name:'emptyMiles',
                	tabIndex:11,xtype:'numberfield',anchor:'95%'},
		    {fieldLabel:C_SUM_GW,name:'grossWeight',
            		tabIndex:15,ref:'../grossWeight',xtype:'numberfield',anchor:'95%'}
		]},
		{columnWidth:.25,layout:'form',border:false,items:[
		    
			{fieldLabel:C_MOTORCADE_TEL,ref:'../motorcadeTel',name:'motorcadeTel',
			   	tabIndex:4,xtype:'textfield',anchor:'95%'},
			   	{fieldLabel:C_PATE,tabIndex:8,name:'pateName',xtype:'textfield',anchor:'95%'},
	    	{fieldLabel:C_HEAVY_MILES,name:'heavyMiles',
            	tabIndex:12,xtype:'numberfield',anchor:'95%'},
            {fieldLabel:C_SUM_CBM,name:'measurement',
    			tabIndex:16,ref:'../measurement',xtype:'numberfield',anchor:'95%'}
    	]},
		{columnWidth:.25,layout:'form',border:false,labelWidth:60,items:[
		    {fieldLabel:C_TRAN_START_DATE,name:'startDate',
		    	tabIndex:17,xtype:'datefield',format:DATEF,anchor:'95%'}
		]},
		{columnWidth:.25,layout:'form',border:false,items:[
			{fieldLabel:C_TRAN_END_DATE,name:'endDate',
				tabIndex:18,xtype:'datefield',format:DATEF,anchor:'95%'}                   		
		]},
		{columnWidth:.5,layout:'form',border:false,items:[
		    {fieldLabel:C_REMARKS,name:'remarks',tabIndex:19,xtype:'textarea',anchor:'98%'}                           		
		]}
	    ]});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_TRAN_NO,dataIndex:'consNo',width:80},
	{header:C_LOAD_PLACE,dataIndex:'loadPlaceName',width:80},
	{header:C_LOAD_ADDRESS,dataIndex:'loadAddress',width:80},
	{header:C_PLACE_TO,dataIndex:'deliveryPlaceName',width:80},
	{header:C_DELIVERY_ADDRESS,dataIndex:'deliveryAddress',width:80},
	{header:C_CATY,dataIndex:'cargoName',width:80},
	{header:C_PACK,dataIndex:'packName',width:80},
	{header:C_PACKAGES,dataIndex:'packages',width:60},
	{header:C_GROSS_WEIGHT,dataIndex:'grossWeight',width:60,renderer:rateRender},	
	{header:C_SIZE,dataIndex:'measurement',width:60,renderer:rateRender},
	{header:C_REMARKS,dataIndex:'remarks',width:100}
	],defaults:{sortable:false,width:100}});
	var grid = new Ext.grid.GridPanel({title:C_TRAN_CARGO_LIST,
		region:'center',autoScroll:true,sm:sm,cm:cm,store:store
	});
	
	Fos.TransTaskPosition.superclass.constructor.call(this,{title:C_ADD_TRANS_TASK,
		modal:true,layout:'border',width:900,height:500,items:[frm,grid]
	}); 
};
Ext.extend(Fos.TransTaskPosition,Ext.Window);

Fos.DriverPosition = function(vehicleNo) {
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'DRIV_Q',vehicleNo:vehicleNo},
		success: function(r){
			var A = HTUtil.XTRA(r.responseXML,'TDriver',TDriver);
			c=A[0];
			if(c!=null){
				frm.getForm().loadRecord(c);
			}
		},
		failure: function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));}});
		
	var frm = new Ext.form.FormPanel({labelWidth:100,frame:true,
		layout:'column',layoutConfig:{columns:2},items:[
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		{fieldLabel:C_DRIVER_CODE,name:'driverCode',tabIndex:1,
	    			ref:'../driverCode',itemCls:'required',xtype:'textfield',anchor:'95%'},
    			{fieldLabel:C_MOTORCADE,tabIndex:3,
			    	 name:'motorcadeName',xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_MOBILE,name:'mobile',tabIndex:5,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_ID_NO,name:'idNo',tabIndex:7,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_LICENSE_NO,name:'licenseNo',tabIndex:7,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_EFFECTIVE_DATE_FROM,name:'effectiveDateFrom',tabIndex:9,
					xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_INSPECT_DATE_FROM,name:'inspectDateFrom',tabIndex:11,
					xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_JOIN_DATE,name:'joinDate',tabIndex:13,
					xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_DEPOSIT,name:'deposit',tabIndex:14,xtype:'numberfield',anchor:'95%'}				
	    	]},
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		{fieldLabel:C_DRIVER_NAME,name:'driverName',itemCls:'required',ref:'../driverName',
	    			tabIndex:2,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_VEHICLE_NO,tabIndex:4,itemCls:'required',
				    	 name:'vehicleNo',store:vehicleStore,enableKeyEvents:true,
				    	 xtype:'combo',displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
							triggerAction: 'all',selectOnFocus:true,anchor:'95%',
							listeners:{scope:this,
								select:function(c,r,i){
									p.set('vehicleId',r.get('id'));
								}}
							},
	    		{fieldLabel:C_TEL,name:'homeTel',tabIndex:6,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_GENDER,name:'gender',tabIndex:8,
	    			displayField:'NAME',valueField:'CODE',triggerAction: 'all',
	                mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
	                store:HTStore.GEND_S,anchor:'95%'},
	            {fieldLabel:C_LICENSE_DATE,name:'licenseDate',tabIndex:10,
	                	xtype:'datefield',format:DATEF,anchor:'95%'},
	            {fieldLabel:C_EFFECTIVE_DATE_TO,name:'effectiveDateTo',tabIndex:12,
	    				xtype:'datefield',format:DATEF,anchor:'95%'},
	    		{fieldLabel:C_INSPECT_DATE_TO,name:'inspectDateTo',tabIndex:14,
	                	xtype:'datefield',format:DATEF,anchor:'95%'},
	            {fieldLabel:C_LEAVE_DATE,name:'leaveDate',tabIndex:16,
	    				xtype:'datefield',format:DATEF,anchor:'95%'},
	    		{fieldLabel:C_REMARKS,name:'remark',tabIndex:18,xtype:'textarea',anchor:'95%'}
	    	]}
	    ]});                                		                                                                
	Fos.DriverPosition.superclass.constructor.call(this,{buttonAlign:'right',
		width:600,height:340,modal:true,items:[frm]
	});
};
Ext.extend(Fos.DriverPosition, Ext.Window);
