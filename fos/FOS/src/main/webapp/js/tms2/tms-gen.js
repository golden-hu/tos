//车辆列表
Fos.VehicleGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VEHI_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0,limit:C_PS}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	new Ext.grid.RowNumberer(),sm,
	{header:C_VEHICLE_NO,dataIndex:'vehicleNo',align:'center',width:100},
	{header:C_VEHICLE_NAME,dataIndex:'vehicleName',align:'center',width:100},
	{header:C_MOTORCADE,dataIndex:'motorcadeName',align:'center',width:150},
	{header:C_VEHICLE_CLASS,dataIndex:'vehicleClassName',align:'center',width:100},
	{header:C_MAX_LOAD,dataIndex:'maxLoad',align:'center',width:100},
	{header:C_INSPECT_DATE_FROM,dataIndex:'inspectDateFrom',align:'center',renderer:formatDate,width:150},
	{header:C_INSPECT_DATE_TO,dataIndex:'inspectDateTo',align:'center',renderer:formatDate,width:150},
	{header:C_STATUS,dataIndex:'status',align:'center',renderer:HTStore.vehicleStatusRender,width:100}
	],defaults:{sortable:false,width:100}});
	
	this.showVehi = function(p){
    	var win = new Fos.VehicleWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new TVehicle({uuid:HTUtil.UUID(32),rowAction:'N'}); 
		this.showVehi(p);
	};
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TVehicle');
	        		HTUtil.REQUEST('VEHI_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showVehi(p);
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
				store.baseParams={_A:'VEHI_Q',_mt:'json'};
			 	store.reload({params:{start:0,limit:C_PS,vehicleNo:vehicleNo},callback:function(r){
			 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
			 	});
			}
		}
	};	
	
	var m = M1_TMS + TMS_VEHI;
	
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.add});
	var btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
		scope:this,handler:this.edit});
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
		scope:this,handler:this.del});
	var btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.VehicleGrid.superclass.constructor.call(this,{title:C_VEHICLE_MAN,header:false,
		id:'GEN_VEHI',closable:true,store:store,sm:sm,cm:cm,loadMask: true,
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showVehi(p);
				}
			}
		},
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove, '-',kw,btnSearch]
	    });
};
Ext.extend(Fos.VehicleGrid, Ext.grid.GridPanel);

//车辆管理窗口
Fos.VehicleWin = function(p,listStore) {
	var vehicleClassStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VECL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicleClass',id:'id'},TVehicleClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
		
	var frm = new Ext.form.FormPanel({labelWidth:120,labelAlign:'right',padding:5,
		layout:'column',layoutConfig:{columns:2},items:[
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		{fieldLabel:C_VEHICLE_NO,name:'vehicleNo',value:p.get('vehicleNo'),tabIndex:1,
	    			ref:'../vehicleNo',itemCls:'required',xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_VEHICLE_CLASS,name:'vehicleClassName',value:p.get('vehicleClassName'),tabIndex:3,
	    				store:vehicleClassStore,xtype:'combo',
					displayField:'vehicleClassName',valueField:'vehicleClassName',typeAhead:true,mode:'remote',
					triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
							p.set('vehicleClassId',r.get('id'));
						}}
					},
				{fieldLabel:C_ENGINE_NO,name:'engineNo',value:p.get('engineNo'),tabIndex:5,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CUSTOMS_NO,name:'customsNo',value:p.get('customsNo'),tabIndex:7,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_INSPECT_DATE_FROM,name:'inspectDateFrom',value:p.get('inspectDateFrom'),tabIndex:9,xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_VEHICLE_LENGTH,name:'length',value:p.get('length'),tabIndex:11,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_VEHICLE_HEIGHT,name:'height',value:p.get('height'),tabIndex:13,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_MOTORCADE,tabIndex:15,
			    	 name:'motorcadeName',value:p.get('motorcadeName'),store:HTStore.getCS(),enableKeyEvents:true,
			    	 xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',typeAhead:true,custType:'custTrackFlag',
			    	 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
			    	 anchor:'95%',
			    	 listeners:{scope:this,
			    	 	blur:function(f){
			    	 		if(f.getRawValue()==''){
			    	 			f.clearValue();
			    	 			p.set('motorcadeId','');
			    	 		}},
			    	 	select:function(c,r,i){
			    	 		p.set('motorcadeId',r.get('id'));
			    	 	},
			    	 	keydown:{fn:function(f,e){LC(f,e,'custTrackFlag');},buffer:BF}}},
	    	 	{fieldLabel:'保单号',name:'premiumNumber',value:p.get('premiumNumber'),tabIndex:17,xtype:'textfield',anchor:'95%'},
	    	 	{fieldLabel:'保险日期(从)',name:'premiumDateFrom',value:p.get('premiumDateFrom'),tabIndex:19,xtype:'datefield',format:DATEF,anchor:'95%'},
	    	 	{fieldLabel:'加油卡',name:'oilNumber',value:p.get('oilNumber'),tabIndex:21,xtype:'textfield',anchor:'95%'}
	    	]},
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		{fieldLabel:C_VEHICLE_NAME,name:'vehicleName',value:p.get('vehicleName'),tabIndex:2,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_PALLET_NO,name:'palletNo',value:p.get('palletNo'),tabIndex:4,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_IC_NO,name:'icNo',value:p.get('icNo'),tabIndex:6,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_PALLET_TYPE,name:'palletType',value:p.get('palletType'),tabIndex:8,xtype:'textfield',anchor:'95%'},
	    		{fieldLabel:C_INSPECT_DATE_TO,name:'inspectDateTo',value:p.get('inspectDateFrom'),tabIndex:10,xtype:'datefield',format:DATEF,anchor:'95%'},
	    		{fieldLabel:C_VEHICLE_WIDTH,name:'width',value:p.get('width'),tabIndex:12,xtype:'numberfield',anchor:'95%'},
	    		{fieldLabel:C_MAX_LOAD,name:'maxLoad',value:p.get('maxLoad'),tabIndex:14,xtype:'numberfield',anchor:'95%'},
	    		{fieldLabel:C_STATUS,name:'status',value:p.get('status'),tabIndex:16,
	    			store:HTStore.vehicleStatusStore,xtype:'combo',
					displayField:'N',valueField:'C',typeAhead: true,mode:'local',triggerAction: 'all',
					selectOnFocus:true,anchor:'95%'},
				{fieldLabel:'保险公司',name:'premiumCompany',value:p.get('premiumCompany'),tabIndex:18,xtype:'textfield',anchor:'95%'},
				{fieldLabel:'保险日期(到)',name:'premiumDateTo',value:p.get('premiumDateTo'),tabIndex:20,xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:'加油卡金额',name:'oilNumberAmount',value:p.get('oilNumberAmount'),tabIndex:22,xtype:'numberfield',anchor:'95%'}
	    	]},
	    	{columnWidth:1,layout:'form',border:false,items:[
	    		{fieldLabel:C_REMARKS,name:'remark',value:p.get('remark'),tabIndex:23,xtype:'textarea',anchor:'98%'}    
	    	]}       
	    ]});
	                
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('vehicleNo'))){
			Ext.Msg.alert(SYS,C_VEHICLE_NO_REQUIRED,function(){frm.vehicleNo.focus();},this);return;};				
		p.endEdit();
		
		var newP = (p.get('rowAction')=='N');
		
		var xml = HTUtil.RTX(p,'TVehicle',TVehicle);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'VEHI_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'TVehicle',TVehicle);
			HTUtil.RU(c, p, TVehicle);
			if (newP) listStore.insert(0,p);
			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var m = M1_TMS + TMS_VEHI;
	btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	Fos.VehicleWin.superclass.constructor.call(this,{
		title:p.get('rowAction')=='N'?C_ADD_VEHICLE:C_VEHICLE+'-'+p.get('vehicleNo'),
		width:800,height:475,modal:true,buttonAlign:'right',
	  	items:[frm],
	  	buttons:[btnSave,
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.VehicleWin, Ext.Window);

//车辆类型
Fos.VehicleClassGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=VECL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicleClass',id:'id'},TVehicleClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();   
	
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[
     new Ext.grid.RowNumberer(),sm,
	{header:C_VEHICLE_CLASS_NAME,dataIndex:'vehicleClassName',align:'center',editor:new Ext.form.TextField()}
    ],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new TVehicleClass({uuid:HTUtil.UUID(32),vehicleClassName:'',version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'TVehicleClass',TVehicleClass,'VECL_S');
    };
    
    var m = M1_TMS + TMS_GEN + TMS_VEHT;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    		
    Fos.VehicleClassGrid.superclass.constructor.call(this,{id:'G_VEHT',iconCls:'gen',title:C_VEHICLE_CLASS,
	clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[btnAdd,'-',btnRemove, '-',btnSave]
    });
};
Ext.extend(Fos.VehicleClassGrid, Ext.grid.EditorGridPanel);

//事故类型
Fos.AccidentTypeGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=ACTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TAccidentType',id:'id'},TAccidentType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();   
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_ACCIDENT_TYPE_NAME,dataIndex:'accidentTypeName',align:'center',editor:new Ext.form.TextField()}
    ],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new TAccidentType({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'TAccidentType',TAccidentType,'ACTY_S');
    };
    
    var m = M1_TMS + TMS_GEN + TMS_ACTY;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    
    Fos.AccidentTypeGrid.superclass.constructor.call(this,{id:'G_ACTY',iconCls:'gen',
	    title:C_ACCIDENT_TYPE,
		clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
		tbar:[btnAdd,'-',btnRemove, '-',btnSave]
    });
};
Ext.extend(Fos.AccidentTypeGrid, Ext.grid.EditorGridPanel);

//油品类型
Fos.OilTypeGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=OITY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilType',id:'id'},TOilType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_OIL_TYPE_NAME,dataIndex:'oilTypeName',align:'center',editor:new Ext.form.TextField()}
    ],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new TOilType({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'TOilType',TOilType,'OITY_S');
    };
    
    var m = M1_TMS + TMS_GEN + TMS_OITY;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    
    Fos.OilTypeGrid.superclass.constructor.call(this,{id:'G_OITY',iconCls:'gen',title:C_OIL_TYPE,
		clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
		tbar:[btnAdd,'-',btnRemove, '-',btnSave]
    });
};
Ext.extend(Fos.OilTypeGrid, Ext.grid.EditorGridPanel);

//加油站
Fos.OilStationGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=OIST_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilStation',id:'id'},TOilStation),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var isPoint=new Ext.grid.CheckColumn({header:C_IS_POINT,dataIndex:'isPoint',width:100});
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_OIL_STATION_NAME,dataIndex:'oilStationName',align:'center',editor:new Ext.form.TextField()},isPoint
    ],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new TOilStation({uuid:HTUtil.UUID(32),isPoint:0,version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'TOilStation',TOilStation,'OIST_S');
    };
    
    var m = M1_TMS + TMS_GEN + TMS_OIST;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    
    Fos.OilStationGrid.superclass.constructor.call(this,{id:'G_OIST',iconCls:'gen',title:C_OIL_STATION,
		clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,plugins:isPoint,
		tbar:[btnAdd,'-',btnRemove, '-',btnSave]
    });
};
Ext.extend(Fos.OilStationGrid, Ext.grid.EditorGridPanel);

//司机列表
Fos.DriverGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'DRIV_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[
	     new Ext.grid.RowNumberer(),sm,
      	{header:C_DRIVER_CODE,dataIndex:'driverCode',align:'center',width:100},
      	{header:C_DRIVER_NAME,dataIndex:'driverName',align:'center',width:100},
      	{header:C_MOTORCADE,dataIndex:'motorcadeName',align:'center',width:120},
      	{header:C_MOBILE,dataIndex:'mobile',align:'center',width:80},
      	{header:C_TEL,dataIndex:'homeTel',align:'center',width:80},
      	{header:C_LICENSE_NO,dataIndex:'licenseNo',align:'center',width:100},
      	{header:C_DEPOSIT,dateIndex:'deposit',align:'center',width:80},
      	{header:C_LICENSE_DATE,dataIndex:'licenseDate',align:'center',renderer:formatDate,width:100},
      	{header:C_EFFECTIVE_DATE_FROM,dataIndex:'effectiveDateFrom',align:'center',renderer:formatDate,width:100},
      	{header:C_EFFECTIVE_DATE_TO,dataIndex:'effectiveDateTo',align:'center',renderer:formatDate,width:100},
      	{header:C_INSPECT_DATE_FROM,dataIndex:'inspectDateFrom',align:'center',renderer:formatDate,width:100},
      	{header:C_INSPECT_DATE_TO,dataIndex:'inspectDateTo',align:'center',renderer:formatDate,width:100},
      	{header:C_JOIN_DATE,dataIndex:'joinDate',align:'center',renderer:formatDate,width:100},
      	{header:C_LEAVE_DATE,dataIndex:'leaveDate',align:'center',renderer:formatDate,width:100}
      	],defaults:{sortable:false,width:100}});
	
	this.showDriver = function(p){
    	var win = new Fos.DriverWin(p,store);
    	win.show();
    };
    
	this.add=function(){
		var p = new TDriver({uuid:HTUtil.UUID(32),rowAction:'N'}); 
		this.showDriver(p);
	};
	this.del=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TDriver');
	        		HTUtil.REQUEST('DRIV_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showDriver(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({value:'请输入驾驶员姓名...',
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
		var driverName=kw.getValue();
		if(!driverName){
			XMG.alert(SYS,C_DRIVER_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(driverName=='请输入驾驶员姓名...'){
				XMG.alert(SYS,C_DRIVER_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				store.baseParams={_A:'DRIV_Q',_mt:'json'};
			 	store.reload({params:{start:0,limit:C_PS,driverName:driverName},callback:function(r){
			 		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
			 	});
			}
		}
	};	
	
	var m = M1_TMS + TMS_DRIV;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
    	scope:this,handler:this.edit});
    btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
    
	Fos.DriverGrid.superclass.constructor.call(this,{title:C_DRIVER_MAN,header:false,
		id:'GEN_DRIV',closable:true,store:store,sm:sm,cm:cm,loadMask:true,
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showDriver(p);
				}
			}},
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove, '-', kw,btnSearch]
    });
};
Ext.extend(Fos.DriverGrid, Ext.grid.GridPanel);

//司机管理窗口
Fos.DriverWin = function(p,listStore) {
	var vehicleStore = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		
	//驾驶员代码
	var txtDriverCode = new Ext.form.TextField({fieldLabel:C_DRIVER_CODE,
		name:'driverCode',value:p.get('driverCode'),tabIndex:1,
		itemCls:'required',anchor:'95%'});
	//驾驶员姓名
	var txtDriverName = new Ext.form.TextField({fieldLabel:C_DRIVER_NAME,
		name:'driverName',value:p.get('driverName'),itemCls:'required',
		tabIndex:2,anchor:'95%'});
	
	
	//车队
	var cboMotorcadeName = new Fos.CustomerLookup({fieldLabel:C_MOTORCADE,tabIndex:3,
	   	 name:'motorcadeName',value:p.get('motorcadeName'),
	   	 store:HTStore.getCS(),enableKeyEvents:true,
		 xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',
		 typeAhead:true,custType:'custTrackFlag',
		 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',
		 listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
		 listeners:{scope:this,
		 	blur:function(f){
		 		if(f.getRawValue()==''){
		 			f.clearValue();
		 			p.set('motorcadeId','');
		 		}
		 	},
		 	select:function(c,r,i){
		 		p.set('motorcadeId',r.get('id'));
		 	},
		 	keydown:{fn:function(f,e){LC(f,e,'custTrackFlag');},buffer:BF}
		 }
	});
	//车牌号
	var cboVehicleNo = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,tabIndex:4,
	   	name:'vehicleNo',value:p.get('vehicleNo'),store:vehicleStore,enableKeyEvents:true,
		displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
			}
		}
	});
	
	//手机
	var txtMobile = new Ext.form.TextField({fieldLabel:C_MOBILE,
		name:'mobile',value:p.get('mobile'),tabIndex:5,anchor:'95%'});
	//电话
	var txtTel = new Ext.form.TextField({fieldLabel:C_TEL,
		name:'homeTel',value:p.get('homeTel'),tabIndex:6,anchor:'95%'});
	
	//身份证号码
	var txtIdNo = new Ext.form.TextField({fieldLabel:C_ID_NO,
		name:'idNo',value:p.get('idNo'),tabIndex:7,anchor:'95%'});
	var cboGender = new Ext.form.ComboBox({fieldLabel:C_GENDER,
			name:'gender',value:p.get('gender'),tabIndex:8,
			displayField:'NAME',valueField:'CODE',triggerAction: 'all',
	        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
	        store:HTStore.GEND_S,anchor:'95%'});
	
	//驾驶证号
	var txtLicenseNo = new Ext.form.TextField({fieldLabel:C_LICENSE_NO,
		name:'licenseNo',value:p.get('licenseNo'),tabIndex:7,anchor:'95%'});
	//驾驶证日期
	var dtLicenseDate = new Ext.form.TextField({fieldLabel:C_LICENSE_DATE,
		name:'licenseDate',value:p.get('licenseDate'),tabIndex:10,
    	format:DATEF,anchor:'95%'});
	
	//有效期（从）
	var dtEffectiveDateFrom = new Ext.form.DateField({fieldLabel:C_EFFECTIVE_DATE_FROM,
		name:'effectiveDateFrom',value:p.get('effectiveDateFrom'),tabIndex:9,
		format:DATEF,anchor:'95%'});
	//有效期（到）
	var dtEffectiveDateTo = new Ext.form.DateField({fieldLabel:C_EFFECTIVE_DATE_TO,
		name:'effectiveDateTo',value:p.get('effectiveDateTo'),tabIndex:12,
		format:DATEF,anchor:'95%'});
	
	//年检日期（从）:
	var dtInspectDateFrom = new Ext.form.DateField({fieldLabel:C_INSPECT_DATE_FROM,
		name:'inspectDateFrom',value:p.get('inspectDateFrom'),tabIndex:11,
		format:DATEF,anchor:'95%'});
	//年检日期（到）:
	var dtInspectDateTo = new Ext.form.DateField({fieldLabel:C_INSPECT_DATE_TO,
		name:'inspectDateTo',value:p.get('inspectDateTo'),tabIndex:14,
    	format:DATEF,anchor:'95%'});
	
	//入职日期
	var dtJoinDate = new Ext.form.DateField({fieldLabel:C_JOIN_DATE,
		name:'joinDate',value:p.get('joinDate'),tabIndex:13,
		format:DATEF,anchor:'95%'});
	//离职日期
	var dtLeaveDate = new Ext.form.DateField({fieldLabel:C_LEAVE_DATE,
		name:'leaveDate',value:p.get('leaveDate'),tabIndex:16,
		format:DATEF,anchor:'95%'});
	
	//押金
	var txtDeposit = new Ext.form.NumberField({fieldLabel:C_DEPOSIT,
		name:'deposit',value:p.get('deposit'),tabIndex:14,anchor:'95%'});
	//备注
	var txtRemark = new Ext.form.NumberField({fieldLabel:C_REMARKS,
		name:'remark',value:p.get('remark'),tabIndex:18,anchor:'95%'});
	
	var frm = new Ext.form.FormPanel({labelWidth:120,labelAlign:'right',frame:false,padding:5,
		layout:'column',layoutConfig:{columns:2},items:[
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		txtDriverCode,cboMotorcadeName,txtMobile,txtIdNo,
	    		txtLicenseNo,dtEffectiveDateFrom,dtInspectDateFrom,dtJoinDate,txtDeposit
	    	]},
	    	{columnWidth:.5,layout:'form',border:false,items:[
	    		txtDriverName,cboVehicleNo,txtTel,cboGender,dtLicenseDate,
	    		dtEffectiveDateTo,dtInspectDateTo,dtLeaveDate,txtRemark	    		
	    	]}
	    ]});
	            
	this.save = function(){
		if(!HTUtil.checkFieldNotNull(C_DRIVER_CODE,txtDriverCode))
			return;
		if(!HTUtil.checkFieldNotNull(C_DRIVER_NAME,txtDriverName))
			return;
		HTUtil.saveToRecord(frm,p);		
		
		var xml = HTUtil.RTX(p,'TDriver',TDriver);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'DRIV_S'},
		success: function(r){
			var rowAction = p.get('rowAction');
			
			var c = HTUtil.XTR(r.responseXML,'TDriver',TDriver);
			HTUtil.RU(c, p, TDriver);
			
			if (rowAction=='N') 
				listStore.insert(0,p);

			Ext.Msg.alert(SYS,M_S);
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var m = M1_TMS + TMS_DRIV;
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	Fos.DriverWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_DRIVER:C_EDIT_DRIVER,
		width:600,height:340,modal:true,
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});            		
};
Ext.extend(Fos.DriverWin, Ext.Window);

//运输类型管理窗口
Fos.TransTypeGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=T_TRANS_TYPE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransType',id:'id'},TTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_TRAT,dataIndex:'transTypeName',align:'center',editor:new Ext.form.TextField()}
    ],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new TTransType({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'TTransType',TTransType,'T_TRANS_TYPE_S');
    };
    
    var m = M1_TMS + TMS_GEN + TMS_TRANT;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'option',disabled:NR(m+F_V),
    	scope:this,handler:this.save});
    btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
    
    Fos.TransTypeGrid.superclass.constructor.call(this,{id:'G_TRANS_TYPE',iconCls:'gen',
    	title:C_TRAT,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
		tbar:[btnAdd,'-',btnRemove, '-',btnSave]
    });
};
Ext.extend(Fos.TransTypeGrid, Ext.grid.EditorGridPanel);
//加油卡
Fos.OilCardPanel = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=T_OIL_CARD_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilCard',id:'id'},TOilCard),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();  
    
    this.sel =-1000;
    var re = {scope:this,
		rowselect:function(sm,row,record){
			if(this.sel!=record.get('id')){
				this.sel=record.get('id');
				if(record.get('rowAction')!='N')
					tstore.load({params:{cardId:record.get('id')}});
			}
		},
		rowdeselect:function(sm,row,record){
			this.sel =-1000;
		}
	};    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re}); 
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:'卡号',dataIndex:'cardNumber',align:'center',editor:new Ext.form.TextField()},
	{header:'名称',dataIndex:'cardType',align:'center',editor:new Ext.form.TextField()},
	{header:'余额',dataIndex:'balance',align:'center'}
    ],defaults:{sortable:false,width:100}});
        
    var cardGrid = new Ext.grid.EditorGridPanel({region:'west',width:350,
    	title:'加油卡列表',clicksToEdit:1,store:store,sm:sm,cm:cm
    });
    
    var tstore = new Ext.data.Store({url:SERVICE_URL+'?_A=T_OIL_CARD_TRANSACTION_Q',
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TOilCardTransaction'},TOilCardTransaction),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
     
    var cm2=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
	{header:'卡号',dataIndex:'cardNumber',align:'center'},
	{header:'日期',dataIndex:'transactionDate',align:'center',renderer:formatDate},
	{header:'交易类型',dataIndex:'transactionType',align:'center',renderer:function(v){if(v==0) return '充值';else return '消费';}},
	{header:'金额',dataIndex:'amount',align:'center'},
	{header:'车辆',dataIndex:'vehicleNo',align:'center'},	
	{header:'驾驶员',dataIndex:'driverName',align:'center'}
    ],defaults:{sortable:false,width:100}});
    var transactionGrid = new Ext.grid.GridPanel({region:'center',
    	title:'加油卡交易记录',store:tstore,cm:cm2
    });
    
    this.addCard = function(){
    	var p = new TOilCard({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
    	cardGrid.stopEditing();
        store.insert(0,p);
        cardGrid.startEditing(0,1);
    };
    this.del = function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save = function(){
    	HTUtil.POST(store,'TOilCard',TOilCard,'T_OIL_CARD_S');
    };
    
    this.addMoney=function(){
    	var p = sm.getSelected();
    	if(p){
    		var win = new Fos.AddMoneyWin(p,tstore);
    		win.show();
    	}
    };
    
    var m = M1_TMS + TMS_OICA;
    var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.addCard});
    var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    var btnAddMoney = new Ext.Button({text:'充值',iconCls:'dollar',disabled:NR(m+'04'),
    	scope:this,handler:this.addMoney});
    
    Fos.OilCardPanel.superclass.constructor.call(this,{id:'OIL_CARD',iconCls:'gen',
    	title:'加油卡管理',layout:'border',closable:true,
    	items:[cardGrid,transactionGrid],
		tbar:[btnAdd,'-',btnRemove, '-', btnSave,'-',btnAddMoney]
    });
};
Ext.extend(Fos.OilCardPanel, Ext.Panel);

//加油卡充值窗口
Fos.AddMoneyWin = function(p,store) {
	
	//卡号
	var txtCardNumber = new Ext.form.TextField({fieldLabel:'卡号',
		name:'cardNumber',value:p.get('cardNumber'),tabIndex:1,
		readOnly:true,anchor:'95%'});
	//充值金额
	var txtAmount = new Ext.form.NumberField({fieldLabel:'充值金额',
		name:'amount',value:p.get('amount'),
		tabIndex:2,anchor:'95%'});
	//充值金额
	var dtTransactionDate = new Ext.form.DateField({fieldLabel:'充值日期',
		name:'transactionDate',value:new Date(),
		tabIndex:3,format:DATEF,anchor:'95%'});
	
	var frm = new Ext.form.FormPanel({labelWidth:120,labelAlign:'right',padding:5,
		items:[txtCardNumber,txtAmount,dtTransactionDate]
	});
	               
	this.save = function(){
		if(!HTUtil.checkFieldNotNull('充值金额',txtAmount))
			return;
		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	 		params:{_A:'T_OIL_CARD_ADD_MONEY',cardId:p.get('id'),amount:txtAmount.getValue()},
			success: function(r){
				var c = HTUtil.XTR(r.responseXML,'TOilCard',TOilCard);
				HTUtil.RU(c, p, TOilCard);	
				
				store.load({params:{cardId:p.get('id')}});
				this.close();
			},
			failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}
		});
	};
	
	var m = M1_TMS + TMS_OICA;
	
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:NR(m+'04'),
		scope:this,handler:this.save});
	
	Fos.AddMoneyWin.superclass.constructor.call(this,{
		title:'加油卡充值',width:300,height:170,modal:true,buttonAlign:'right',
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.AddMoneyWin, Ext.Window);

//运输网点
Fos.GSiteGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=GSITE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GSite',id:'id'},GSite),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var placeStore=HTStore.getCITY_S();
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
          {header:C_NAME,dataIndex:'siteName',align:'center',editor:new Ext.form.TextField()},
          {header:C_CONTACT,dataIndex:'siteContact',align:'center',editor:new Ext.form.TextField()},
          {header:C_TEL,dataIndex:'siteTel',align:'center',editor:new Ext.form.TextField(),width:150},
          {header:C_FAX,dataIndex:'siteFax',align:'center',editor:new Ext.form.TextField(),width:150},
          {header:C_ADDRESS,dataIndex:'siteAddress',align:'center',editor:new Ext.form.TextField(),width:200},
          {header:C_SITE_TYPE,dataIndex:'siteType',align:'center',renderer:HTStore.getSITE_TYPE,
    			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
    			mode:'local',selectOnFocus:true,
    			store:HTStore.SITE_TYPE_S})},
          {header:C_PROVINCE,dataIndex:'provinceName',align:'center',
  			editor:new Ext.form.ComboBox({displayField:'placName',
  				valueField:'placName',triggerAction: 'all',
	  			mode:'remote',selectOnFocus:true,
	  			store:HTStore.getPROVINCE_S(),
	  			listeners:{select:function(c,r,v){
	  				var p = sm.getSelected();
	  				p.beginEdit();
	  				p.set('provinceId',r.get("id"));
	  				p.endEdit();
	  			}}
  			})},
  			{header:C_CITY,dataIndex:'cityName',align:'center',
  	  			editor:new Ext.form.ComboBox({displayField:'placName',valueField:'placName',triggerAction: 'all',
  	  			mode:'local',selectOnFocus:true,
  	  			//store:HTStore.getCITY_S(),
  	  			store:placeStore,
  	  			listeners:{select:function(c,r,v){
  	  				var p = sm.getSelected();
  	  				p.beginEdit();
  	  				p.set('cityId',r.get("id"));
  	  				p.endEdit();
  	  			}
  	  			}})}
		],defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var p = new GSite({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GSite',GSite,'GSITE_S');
	};
	
	var m = M1_TMS + TMS_SITE;
    var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.add});
    var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    
	Fos.GSiteGrid.superclass.constructor.call(this,{
	    id:'G_SITE',iconCls:'gen',title:C_SITE_MANAG,header:false,clicksToEdit:1,closable:true,
	    store: store,sm:sm,cm:cm,loadMask:true,
	    tbar:[btnAdd, '-',btnRemove,'-',btnSave],
	    listeners:{
	    	scope:this,
	    	afteredit:function(e){
	    		var record=e.record;
	    		var field=e.field;
	    		var provinceName=record.get('provinceName');
	    		if(field=='provinceName'){
	    			placeStore.load({params:{placProvinceName:provinceName},callback:function(){
	    				if(placeStore.getTotalCount()>0){
		    				var r=placeStore.getAt(0);
			    			record.set('cityName',r.get('placName'));
		    			}
	    			}});
	    		}
	    	},
	    	beforeedit:function(e){
	    		var record=e.record;
	    		var field=e.field;
	    		var provinceName=record.get('provinceName');
	    		if(field=="cityName"){
	    			placeStore.load({params:{placProvinceName:provinceName}});
	    		}
	    	}
	    }
    });
};
Ext.extend(Fos.GSiteGrid, Ext.grid.EditorGridPanel);
