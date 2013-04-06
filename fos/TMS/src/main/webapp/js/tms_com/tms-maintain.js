//车辆运维
var getMaintainPanel=function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	var items=[];
	if(HR(M1_GEN+P_VECL))			//车辆类型
		items[items.length]=FosMenu(panel,C_VEHICLE_CLASS,'VEHT',function(){return new Fos.VehicleClassGrid();});
	if(HR(M1_GEN+P_VEHI))			//车辆管理
		items[items.length]=FosMenu(panel,C_VEHICLE_MAN,'VEHI',function(){return new Fos.VehicleGrid();});
	if(HR(M1_GEN+P_DRIV))			//驾驶员管理
		items[items.length]=FosMenu(panel,C_DRIVER_MAN,'DRIV',function(){return new Fos.DriverGrid();});
	if(HR(M1_MAINT+P_MAINT_RECORD))	//维修记录
		items[items.length]=FosMenu(panel,C_REPAIR_LOG,'RELO',function(){return new Fos.RepairLogGrid();});
	if(HR(M1_MAINT+P_MAINT_CHARGE))	//运维费用
		items[items.length]=FosMenu(panel,C_TMS_M_EXPRENSE,'TMS_M_E',function(){return new Fos.TmsMaintExpenseGrid();});
	if(HR(M1_GEN+P_ACTY))			//事故类型
		items[items.length]=FosMenu(panel,C_ACCIDENT_TYPE,'ACTY',function(){return new Fos.AccidentTypeGrid();});
	if(HR(M1_MAINT+P_ACCIDENT))		//事故记录
		items[items.length]=FosMenu(panel,C_ACCIDENT_LOG,'ACCI',function(){return new Fos.AccidentGrid();});
	if(HR(M1_GEN+P_OIST))			//加油站
		items[items.length]=FosMenu(panel,C_OIL_STATION,'OIST',function(){return new Fos.OilStationGrid();});
	if(HR(M1_GEN+P_OITY))			//油品类型
		items[items.length]=FosMenu(panel,C_OIL_TYPE,'OITY',function(){return new Fos.OilTypeGrid();});
	if(HR(M1_MAINT+P_OICA))			//加油卡
		items[items.length]=FosMenu(panel,C_OIL_CARD,'OIL_CARD',function(){return new Fos.OilCardPanel();});
	if(HR(M1_MAINT+P_OI_RECORD))	//加油记录
		items[items.length]=FosMenu(panel,C_OIL_LOG,'OILO',function(){return new Fos.OilLogGrid();});
	var genPanel = new Ext.Panel({title:'运维管理',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	var items=[];
	if(HR(M1_TRACK)) 				//GPS设备管理
		items[items.length]=FosMenu(panel,'设备管理','T_SIM_EQUI',function(){return new Fos.EquiGrid();});
	var simEquiPanel = new Ext.Panel({title:'跟踪管理',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,layout:'accordion',
		split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[genPanel,simEquiPanel]});
		
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	createWindow('TMAINT','运维管理',contPanel);//运维管理
};

//维修记录
Fos.RepairLogGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL,
		baseParams: {
			_A: 'RELO_Q',
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TRepairLog',
			id: 'id'
		},
		TRepairLog),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load({
		params: {
			start: 0,
			limit: C_PS
		}
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_REPAIR_NO),
			dataIndex: 'repairNo',
			width: 100
		},
		{
			header:boldFont(C_REPAIR_DATE),
			dataIndex: 'repairDate',
			renderer: formatDate,
			width: 100
		},
		{
			header:boldFont(C_VEHICLE_NO),
			dataIndex: 'vehicleNo',
			width: 100
		},
		{
			header:boldFont(C_DRIVER),
			dataIndex: 'driverName',
			width: 100
		},
		{
			header:boldFont(C_INVOICE_NO),
			dataIndex: 'invoiceNo',
			width: 100
		},
		{
			header:boldFont(C_INVOICE_AMOUNT),
			dataIndex: 'invoiceAmount',
			width: 100
		},
		{
			header:boldFont(C_ISPOINT_REPAIR),
			dataIndex: 'isPoint',
			width: 100,
			renderer:function(v){
				if(v==true){
					return '是';
				}else if(v==false){
					return '否';
				}
			}
		}],
		defaults: {
			sortable: true,
			width: 100
		}
	});
	this.showRepairLog = function(p) {
		var win = new Fos.RepairLogWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new TRepairLog({
			uuid: HTUtil.UUID(32),
			repairDate: new Date(),
			isPoint: 0,
			rowAction: 'N'
		});
		this.showRepairLog(p);
	};
	this.del = function() {
		var r = sm.getSelections();
		if(r.length>0){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
				if(btn == 'yes') {
					for(var i=0;i<r.length;i++){
						var xml = HTUtil.RTX4R(r[i],'TRepairLog');
		        		HTUtil.REQUEST('RELO_S', xml, function(){store.remove(r);});
					}
				}
			});
		}else{
			Ext.Msg.alert(SYS,M_R_P);
		}
		
		/*var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'TRepairLog');
					Ext.Ajax.request({
						url: SERVICE_URL,
						method: 'POST',
						params: {
							_A: 'RELO_R'
						},
						success: function() {
							sm.each(function(p) {
								store.remove(p);
							});
							Ext.Msg.alert(SYS, M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);*/
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showRepairLog(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	var kw = new Ext.form.TextField({
		listeners: {
			scope: this,
			specialkey: function(c, e) {
				if (e.getKey() == Ext.EventObject.ENTER)
				 this.search();
			}
		}
	});
	this.search = function() {
		var vehicleNo = kw.getValue();
		if (!vehicleNo) {
			XMG.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function(b) {
				kw.focus();
			});
			return;
		};
		store.baseParams = {
			_A: 'RELO_Q',
			_mt: 'json'
		};
		store.reload({
			params: {
				start: 0,
				limit: C_PS,
				vehicleNo: vehicleNo
			},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
	};
	Fos.RepairLogGrid.superclass.constructor.call(this, {
		title: C_REPAIR_LOG,
		header: false,
		id: 'TMAINT_RELO',
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		loadMask: true,
		iconCls:'gen',
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showRepairLog(p);
				}
			}
		},
		bbar:PTB(store, 100),
		tbar:[{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},'-',
		{
			text: C_EDIT,
			iconCls: 'option',
			scope: this,
			handler: this.edit
		},'-',
		{
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},'-', 
		{
			text: C_VEHICLE_NO,
			xtype: 'tbtext'
		},
		kw, {
			text:C_FAST_SEARCH,
			iconCls: 'search',
			handler: this.search
		},'-']
	});
};
Ext.extend(Fos.RepairLogGrid, Ext.grid.GridPanel);

//维修记录窗口
Fos.RepairLogWin = function(p, listStore) {
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VEHI_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicle',
			id: 'id'
		},
		TVehicle),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	var driverStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=DRIV_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TDriver',
			id: 'id'
		},
		TDriver),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	var store = new Ext.data.Store({
		url: SERVICE_URL + '?_A=REIT_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TRepairItem',
			id: 'id'
		},
		TRepairItem),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	if (p.get('rowAction') != 'N')
	 store.load({
		params: {
			repairLogId: p.get('id')
		}
	});
	//维修记录保存
	this.save = function() {
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if (Ext.isEmpty(p.get('repairNo'))) {
			Ext.Msg.alert(SYS, C_REPAIR_NO + C_NOTNULL,
			function() {
				frm.repairNo.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('vehicleId'))) {
			Ext.Msg.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function() {
				frm.vehicleNo.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('driverId'))) {
			Ext.Msg.alert(SYS, C_DRIVER_REQUIRED,
			function() {
				frm.driverName.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('repairDate'))) {
			Ext.Msg.alert(SYS, C_REPAIR_DATE_REQUIRED,
			function() {
				frm.repairDate.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('factoryName'))) {
			Ext.Msg.alert(SYS, C_REPAIR_FACTORY + C_NOTNULL,
			function() {
				frm.factoryName.focus();
			},
			this);
			return;
		};
		p.endEdit();
		var newP = ('N' == p.get('rowAction'));
		var xml = HTUtil.RTX(p, 'TRepairLog', TRepairLog);
		var a = store.getModifiedRecords();
		xml += HTUtil.ATX(a, 'TRepairItem', TRepairItem);
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {
				_A: 'RELO_S'
			},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'TRepairLog', TRepairLog);
				HTUtil.RU(c, p, TRepairLog);
				if (newP) listStore.insert(0, p);
				var a = HTUtil.XTRA(r.responseXML, 'TRepairItem', TRepairItem);
				HTUtil.RUA(store, a, TRepairItem);
				listStore.reload();
				Ext.Msg.alert(SYS, M_S);
				//this.close();
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	var frm = new Ext.form.FormPanel({
		region: 'north',
		height: 130,
		layout: 'column',
		layoutConfig: {
			columns: 4
		},
		labelWidth:80,
		frame: false,
		bodyStyle:'padding:8px;',
		items: [{
			columnWidth: .25,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_REPAIR_NO,
				name: 'repairNo',
				value: p.get('repairNo'),
				tabIndex: 1,
				itemCls: 'required',
				ref: '../repairNo',
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_REPAIR_DATE,
				name: 'repairDate',
				value: p.get('repairDate'),
				tabIndex: 5,
				ref: '../repairDate',
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			}]
		},
		{
			columnWidth: .25,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_VEHICLE_NO,
				tabIndex: 2,
				ref: '../vehicleNo',
				itemCls: 'required',
				name: 'vehicleNo',
				value: p.get('vehicleNo'),
				store: vehicleStore,
				enableKeyEvents: true,
				xtype: 'combo',
				displayField: 'vehicleNo',
				valueField: 'vehicleNo',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('vehicleId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_INVOICE_NO,
				name: 'invoiceNo',
				value: p.get('invoiceNo'),
				tabIndex: 6,
				xtype: 'textfield',
				anchor: '95%'
			}]
		},
		{
			columnWidth: .25,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_DRIVER,
				tabIndex: 3,
				ref: '../driverName',
				itemCls: 'required',
				name: 'driverName',
				value: p.get('driverName'),
				store: driverStore,
				enableKeyEvents: true,
				xtype: 'combo',
				displayField: 'driverName',
				valueField: 'driverName',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('driverId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_INVOICE_AMOUNT,
				name: 'invoiceAmount',
				ref: '../invoiceAmount',
				value: p.get('invoiceAmount'),
				tabIndex: 7,
				xtype: 'textfield',
				disabled: true,
				anchor: '95%'
			}]
		},
		{
			columnWidth: .25,
			layout: 'form',
			border: false,
			labelWidth:80,
			items: [{
				fieldLabel: C_REPAIR_FACTORY,
				tabIndex: 4,
				itemCls: 'required',
				name: 'factoryName',
				value: p.get('factoryName'),
				store: HTStore.getCS(),
				enableKeyEvents: true,
				xtype: 'customerLookup',
				displayField: 'custCode',
				valueField: 'custNameCn',
				typeAhead: true,
				custType: 'custFactoryFlag',
				mode: 'remote',
				tpl: custTpl,
				itemSelector: 'div.list-item',
				listWidth: C_LW,
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				listeners: {
					scope: this,
					blur: function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							p.set('factoryId', '');
						}
					},
					select: function(c, r, i) {
						p.set('factoryId', r.get('id'));
					},
					keydown: {
						fn: function(f, e) {
							LC(f, e, 'custFactoryFlag');
						},
						buffer: BF
					}
				}
			},
			{
				fieldLabel: C_ISPOINT_REPAIR,
				name: 'isPoint',
				checked: p.get('isPoint') == 1,
				tabIndex: 8,
				xtype: 'checkbox',
				anchor: '95%'
			}]
		},
		{
			columnWidth: 1,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_REMARKS,
				name: 'remark',
				value: p.get('remark'),
				tabIndex: 9,
				xtype: 'textarea',
				anchor: '99%'
			}]
		}]
	});
	this.reCalculate = function() {
		var invoiceAmount = 0;
		var a = store.getRange();
		for (var i = 0; i < a.length; i++) {
			var partsFee = parseInt(a[i].get('partsNum')) * parseFloat(a[i].get('partsPrice'));
			var hoursFee = parseInt(a[i].get('hours')) * parseFloat(a[i].get('hoursPrice'));
			a[i].set('partsFee', partsFee);
			a[i].set('hoursFee', hoursFee);
			a[i].set('totalAmount', partsFee + hoursFee);
			invoiceAmount += parseFloat(a[i].get('totalAmount'));
		}
		frm.invoiceAmount.setValue(invoiceAmount);
	};
	this.addItem = function() {
		var t = new TRepairItem({
			uuid: HTUtil.UUID(32),
			repairLogId: p.get('id')
		});
		t.set('rowAction', 'N');
		store.insert(0, t);
		grid.startEditing(0, 1);
	};
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [sm, {
			header:boldFont(C_REPAIR_ITEM),
			dataIndex: 'itemName',
			width: 100,
			editor: new Ext.form.TextField({})
		},
		{
			header:boldFont(C_PARTS_NUM),
			dataIndex: 'partsNum',
			width: 100,
			editor: new Ext.form.NumberField({
				allowBlank: false
			})
		},
		{
			header:boldFont(C_PARTS_PRICE),
			dataIndex: 'partsPrice',
			width: 100,
			editor: new Ext.form.NumberField({
				decimalPrecision: 4,
				allowBlank: false
			})
		},
		{
			header:boldFont(C_PARTS_FEE),
			dataIndex: 'partsFee',
			width: 100,
			renderer: rateRender
		},
		{
			header:boldFont(C_HOURS),
			dataIndex: 'hours',
			width: 100,
			editor: new Ext.form.NumberField({
				allowBlank: false
			})
		},
		{
			header:boldFont(C_HOURS_PRICE),
			dataIndex: 'hoursPrice',
			width: 100,
			editor: new Ext.form.NumberField({
				decimalPrecision: 4,
				allowBlank: false
			})
		},
		{
			header:boldFont(C_HOURS_FEE),
			dataIndex: 'hoursFee',
			width: 100,
			renderer: rateRender
		},
		{
			header:boldFont(C_TOTAL_AMOUNT),
			dataIndex: 'totalAmount',
			width: 100,
			renderer: rateRender
		},
		{
			header:boldFont(C_REMARKS),
			dataIndex: 'trcaRemarks',
			width: 100,
			editor: new Ext.form.TextField()
		}],
		defaults: {
			sortable: true,
			width: 100
		}
	});
	var grid = new Ext.grid.EditorGridPanel({
		region: 'center',
		autoScroll: true,
		sm: sm,
		cm: cm,
		store: store,
		listeners: {
			scope: this,
			afteredit: function(e) {
				var f = e.field;
				if (f == 'partsNum' || f == 'partsPrice' || f == 'hours' || f == 'hoursPrice') {
					this.reCalculate();
				}
			}
		},
		tbar:[{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.addItem
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: function() {
				HTUtil.REMOVE_SM(sm, store);
			}
		},'-']
	});
	Fos.RepairLogWin.superclass.constructor.call(this, {
		buttonAlign: 'right',
		title: p.get('rowAction') == 'N' ? C_ADD_REPAIR_LOG: C_EDIT_REPAIR_LOG,
		width: 1000,
		height: 550,
		modal: true,
		layout: 'border',
		items: [frm, grid],
		buttons: [{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.RepairLogWin, Ext.Window);

//运维费用
Fos.TmsMaintExpenseGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL,
		baseParams: {
			_A: 'EXPE_Q',
			objectType: 1,
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'SExpense',
			id: 'id'
		},
		SExpense),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load({
		params: {
			start: 0,
			limit: C_PS
		}
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: true
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_TMS_M_EXP_DATE),
			dataIndex: 'expeDate',
			renderer: formatDate,
			width:100
		},
		{
			header:boldFont(C_TMS_M_EXP_VEHNO),
			dataIndex: 'objectName1',
			width:100
		},
		{
			header:boldFont(C_TMS_M_EXP_DRIVE),
			dataIndex: 'objectName2',
			width:100
		},
		{
			header:boldFont(C_TMS_M_EXP_SET_OBJECT),
			dataIndex: 'custName',
			width:120
		},
		{
			header:boldFont(C_TMS_M_EXP_AMOUNT),
			dataIndex: 'expeTotalAmount',
			width:100
		},
		{
			header:boldFont(C_TMS_M_EXP_INVNO),
			dataIndex: 'expeTaxInvoiceNo',
			width:100
		},
		{
			header:boldFont(C_TMS_M_EXP_REMARK),
			dataIndex: 'expeRemarks',
			width:150
		}],
		defaults: {
			sortable: true,
			width:100
		}
	});
	this.showSubWin = function(p) {
		var win = new Fos.TmsMaintExpenseWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new SExpense({
			uuid: HTUtil.UUID(32),
			rowAction: 'N',
			expeDate: new Date(),
			expeType: 'P',
			currCode: 'CNY',
			objectType: 1,
			consId: 0,
			consNo: '',
			charId: 1
		});
		this.showSubWin(p);
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p)
		 this.showSubWin(p);
		else
		 Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'SExpense');
					Ext.Ajax.request({
						url: SERVICE_URL,
						method: 'POST',
						params: {
							_A: 'EXPE_S'
						},
						success: function() {
							sm.each(function(p) {
								store.remove(p);
							});
							Ext.Msg.alert(SYS, M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	var kw = new Ext.form.TextField({
		listeners: {
			scope: this,
			specialkey: function(c, e) {
				if (e.getKey() == Ext.EventObject.ENTER)
				 this.search();
			}
		}
	});
	this.search = function() {
		var vehicleNo = kw.getValue();
		if (!vehicleNo) {
			XMG.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function(b) {
				kw.focus();
			});
			return;
		};
		store.baseParams = {
			_A: 'EXPE_Q',
			objectType: 1,
			_mt: 'json'
		};
		store.reload({
			params: {
				start: 0,
				limit: C_PS,
				objectName1: vehicleNo
			},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
	};
	Fos.TmsMaintExpenseGrid.superclass.constructor.call(this, {
		title: C_TMS_M_EXPRENSE,
		header: false,
		id: 'TMAINT_TMS_M_E',
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		loadMask: true,
		iconCls:'gen',
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				this.edit();
			}
		},
		bbar: PTB(store, 100),
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_EDIT,
			iconCls: 'option',
			scope: this,
			handler: this.edit
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},
		'-', {
			text: C_VEHICLE_NO,
			xtype: 'tbtext'
		},
		kw, {
			text:C_FAST_SEARCH,
			iconCls: 'search',
			handler: this.search
		},'-']
	});
};
Ext.extend(Fos.TmsMaintExpenseGrid, Ext.grid.GridPanel);

//维修费用窗口
Fos.TmsMaintExpenseWin = function(p, listStore) {
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL,
		baseParams: {
			_A: 'VEHI_Q',
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicle',
			id: 'id'
		},
		TVehicle),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	var driverStore = new Ext.data.Store({
		url: SERVICE_URL,
		baseParams: {
			_A: 'DRIV_Q',
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TDriver',
			id: 'id'
		},
		TDriver),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	this.save = function() {
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if (Ext.isEmpty(p.get('expeDate'))) {
			Ext.Msg.alert(SYS, C_REFUEL_DATE_REQUIRED,
			function() {
				frm.expeDate.focus();
			},
			this);
			return;
		}
		if (Ext.isEmpty(p.get('objectId1'))) {
			Ext.Msg.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function() {
				frm.ObjectName1.focus();
			},
			this);
			return;
		}
		if (Ext.isEmpty(p.get('objectId2'))) {
			Ext.Msg.alert(SYS, C_DRIVER_REQUIRED,
			function() {
				frm.ObjectName2.focus();
			},
			this);
			return;
		}
		if (Ext.isEmpty(p.get('custId'))) {
			Ext.Msg.alert(SYS, C_TMS_M_EXP_SET_OBJECT_REQUIRED,
			function() {
				frm.custName.focus();
			},
			this);
			return;
		}
		p.endEdit();
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'SExpense', SExpense);
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {
				_A: 'EXPE_S'
			},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'SExpense', SExpense);
				HTUtil.RU(c, p, SExpense);
				if (newP) listStore.insert(0, p);
				Ext.Msg.alert(SYS, M_S);
				this.close();
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	var frm = new Ext.form.FormPanel({
		labelWidth:65,
		frame: false,
		bodyStyle:'padding:8px;',
		items: [{
			fieldLabel: C_TMS_M_EXP_DATE,
			name: 'expeDate',
			value: (p.get('expeDate') ? p.get('expeDate') : (new Date())),
			tabIndex: 1,
			itemCls: 'required',
			ref: '../refuelDate',
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		},
		{
			fieldLabel: C_TMS_M_EXP_VEHNO,
			tabIndex: 2,
			ref: '../vehicleNo',
			name: 'ObjectName1',
			value: p.get('objectName1'),
			itemCls: 'required',
			store: vehicleStore,
			enableKeyEvents: true,
			xtype: 'combo',
			displayField: 'vehicleNo',
			valueField: 'vehicleNo',
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			editable:false,
			listeners: {
				scope: this,
				select: function(c, r, i) {
					p.set('objectId1', r.get('id'));
					p.set('objectName1', r.get('vehicleNo'));
				}
			}
		},
		{
			fieldLabel: C_TMS_M_EXP_DRIVE,
			tabIndex: 3,
			ref: '../driverName',
			name: 'ObjectName2',
			value: p.get('objectName2'),
			store: driverStore,
			enableKeyEvents: true,
			xtype: 'combo',
			displayField: 'driverName',
			valueField: 'driverName',
			typeAhead: true,
			itemCls: 'required',
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			editable:false,
			listeners: {
				scope: this,
				select: function(c, r, i) {
					p.set('objectId2', r.get('id'));
					p.set('objectName2', r.get('driverName'));
				}
			}
		},
		{
			fieldLabel: C_TMS_M_EXP_SET_OBJECT,
			itemCls: 'required',
			tabIndex: 4,
			ref: '../../custName',
			name: 'custName',
			value: p.get('custName'),
			store: HTStore.getCS(),
			enableKeyEvents: true,
			xtype: 'customerLookup',
			displayField: 'custCode',
			valueField: 'custNameCn',
			typeAhead: true,
			custType: 'custBookerFlag',
			mode: 'remote',
			tpl: custTpl,
			itemSelector: 'div.list-item',
			listWidth: C_LW,
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			listeners: {
				scope: this,
				blur: function(f) {
					if (f.getRawValue() == '') {
						f.clearValue();
						p.set('custId', '');
						p.set('custName', '');
						p.set('custSname', '');
					}
				},
				select: function(c, r, i) {
					p.set('custId', r.get('id'));
					p.set('custName', r.get('custName'));
					p.set('custSname', r.get('custSname'));
				},
				keydown: {
					fn: function(f, e) {
						LC(f, e, 'custBookerFlag');
					},
					buffer: BF
				}
			}
		},
		{
			fieldLabel: C_TMS_M_EXP_AMOUNT,
			name: 'expeTotalAmount',
			value: p.get('expeTotalAmount'),
			tabIndex: 5,
			itemCls: 'required',
			xtype: 'numberfield',
			anchor: '95%'
		},
		{
			fieldLabel: C_TMS_M_EXP_INVNO,
			name: 'expeTaxInvoiceNo',
			value: p.get('expeTaxInvoiceNo'),
			tabIndex: 6,
			xtype: 'textfield',
			anchor: '95%'
		},
		{
			fieldLabel: C_TMS_M_EXP_REMARK,
			name: 'expeRemarks',
			value: p.get('expeRemarks'),
			tabIndex: 7,
			xtype: 'textarea',
			anchor: '95%'
		}]
	});
	Fos.TmsMaintExpenseWin.superclass.constructor.call(this, {
		buttonAlign: 'right',
		title: p.get('rowAction') == 'N' ? C_TMS_M_EXPRENSE_ADD: C_TMS_M_EXPRENSE_UPD,
		width: 400,
		height: 305,
		modal: true,
		items: [frm],
		layout:'fit',
		buttons: [{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.TmsMaintExpenseWin, Ext.Window);

//事故类型
Fos.AccidentTypeGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL + '?_A=ACTY_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TAccidentType',
			id: 'id'
		},
		TAccidentType),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load();
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_ACCIDENT_TYPE_NAME),
			dataIndex: 'accidentTypeName',
			editor: new Ext.form.TextField()
		}],
		defaults: {
			sortable: true,
			width: 150
		}
	});
	this.add = function() {
		var p = new TAccidentType({
			uuid: HTUtil.UUID(32),
			accidentTypeName: '',
			version: '0',
			rowAction: 'N'
		});
		this.stopEditing();
		store.insert(0, p);
		this.startEditing(0, 1);
	};
	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.save = function() {
		HTUtil.POST(store, 'TAccidentType', TAccidentType, 'ACTY_S');
	};
	Fos.AccidentTypeGrid.superclass.constructor.call(this, {
		id: 'G_ACTY',
		iconCls: 'gen',
		title: C_ACCIDENT_TYPE,
		clicksToEdit: 1,
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},'-',
		{
			text: C_SAVE,
			iconCls: 'save',
			scope: this,
			handler: this.save
		}, '-'
		]
	});
};
Ext.extend(Fos.AccidentTypeGrid, Ext.grid.EditorGridPanel);

//事故列表
Fos.AccidentGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL,
		baseParams: {
			_A: 'ACCI_Q',
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TAccident',
			id: 'id'
		},
		TAccident),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load({
		params: {
			start: 0,
			limit: C_PS
		}
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: true
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_ACCIDENT_DATE),
			dataIndex: 'accidentDate',
			renderer: formatDate,
			width: 100
		},
		{
			header:boldFont(C_ACCIDENT_TYPE),
			dataIndex: 'accidentTypeName',
			width: 100
		},
		{
			header:boldFont(C_VEHICLE_NO),
			dataIndex: 'vehicleNo',
			width: 100
		},
		{
			header:boldFont(C_DRIVER),
			dataIndex: 'driverName',
			width: 100
		},
		{
			header:boldFont(C_ACCIDENT_PLACE),
			dataIndex: 'place',
			width: 100
		},
		{
			header:boldFont(C_LOSS_AMOUNT),
			dataIndex: 'lossAmount',
			width: 100
		},
		{
			header:boldFont(C_COMPENSATE_AMOUNT),
			dataIndex: 'compensateAmount',
			width: 100
		},
		{
			header:boldFont(C_INJURY_NUM),
			dataIndex: 'injuryNum',
			width: 100
		},
		{
			header:boldFont(C_DEATH_NUM),
			dataIndex: 'deathNum',
			width: 100
		}],
		defaults: {
			sortable: true,
			width: 100
		}
	});
	this.showAccident = function(p) {
		var win = new Fos.AccidentWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new TAccident({
			uuid: HTUtil.UUID(32),
			accidentDate: new Date(),
			lossAmount: 0,
			compensateAmount: 0,
			personAmount: 0,
			injuryNum: 0,
			deathNum: 0,
			rowAction: 'N'
		});
		this.showAccident(p);
	};
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'TAccident');
					HTUtil.REQUEST('ACCI_S', xml,
					function() {
						store.remove(b);
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showAccident(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	var kw = new Ext.form.TextField({
		listeners: {
			scope: this,
			specialkey: function(c, e) {
				if (e.getKey() == Ext.EventObject.ENTER)
				 this.search();
			}
		}
	});
	this.search = function() {
		var vehicleNo = kw.getValue();
		if (!vehicleNo) {
			XMG.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function(b) {
				kw.focus();
			});
			return;
		};
		store.baseParams = {
			_A: 'ACCI_Q',
			_mt: 'json'
		};
		store.reload({
			params: {
				start: 0,
				limit: C_PS,
				vehicleNo: vehicleNo
			},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
	};
	Fos.AccidentGrid.superclass.constructor.call(this, {
		title: C_ACCIDENT_LOG,
		header: false,
		id: 'TMAINT_ACCI',
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		loadMask: true,
		iconCls:'gen',
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showAccident(p);
				}
			}
		},
		bbar: PTB(store, 100),
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_EDIT,
			iconCls: 'option',
			scope: this,
			handler: this.edit
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},
		'-', {
			text: C_VEHICLE_NO,
			xtype: 'tbtext'
		},
		kw, {
			text:C_FAST_SEARCH,
			iconCls: 'search',
			handler: this.search
		},'-']
	});
};
Ext.extend(Fos.AccidentGrid, Ext.grid.GridPanel);

//事故编辑窗口
Fos.AccidentWin = function(p, listStore) {
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VEHI_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicle',
			id: 'id'
		},
		TVehicle),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	var driverStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=DRIV_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TDriver',
			id: 'id'
		},
		TDriver),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	var accidentTypeStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=ACTY_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TAccidentType',
			id: 'id'
		},
		TAccidentType),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	this.save = function() {
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if (Ext.isEmpty(p.get('vehicleId'))) {
			Ext.Msg.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function() {
				frm.vehicleNo.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('driverId'))) {
			Ext.Msg.alert(SYS, C_DRIVER_REQUIRED,
			function() {
				frm.driverName.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('accidentDate'))) {
			Ext.Msg.alert(SYS, C_ACCIDENT_DATE_REQUIRED,
			function() {
				frm.accidentDate.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('accidentTypeName'))) {
			Ext.Msg.alert(SYS, C_ACCIDENT_TYPE_REQUIRED,
			function() {
				frm.accidentTypeName.focus();
			},
			this);
			return;
		};
		p.endEdit();
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'TAccident', TAccident);
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {
				_A: 'ACCI_S'
			},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'TAccident', TAccident);
				HTUtil.RU(c, p, TAccident);
				if (newP) listStore.insert(0, p);
				Ext.Msg.alert(SYS, M_S);
				this.close();
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	var frm = new Ext.form.FormPanel({
		frame: false,
		layout: 'column',
		layoutConfig: {
			columns: 2
		},
		items: [{
			columnWidth: .5,
			layout: 'form',
			border: false,
			labelAlign:'right',
			labelWidth:78,
			bodyStyle:'padding-top:8px;',
			items: [{
				fieldLabel: C_VEHICLE_NO,
				tabIndex: 1,
				itemCls: 'required',
				ref: '../vehicleNo',
				name: 'vehicleNo',
				value: p.get('vehicleNo'),
				store: vehicleStore,
				enableKeyEvents: true,
				xtype: 'combo',
				displayField: 'vehicleNo',
				valueField: 'vehicleNo',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				editable:false,
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('vehicleId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_ACCIDENT_DATE,
				name: 'accidentDate',
				value: p.get('accidentDate'),
				tabIndex: 3,
				itemCls: 'required',
				ref: '../accidentDate',
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_ACCIDENT_PLACE,
				name: 'place',
				value: p.get('place'),
				tabIndex: 5,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_REPORTOR,
				name: 'reportor',
				value: p.get('reportor'),
				tabIndex: 7,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_POLICE_OFFICE,
				name: 'policeOffice',
				value: p.get('policeOffice'),
				tabIndex: 9,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_LOSS_AMOUNT,
				name: 'lossAmount',
				value: p.get('lossAmount'),
				tabIndex: 11,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_PERSON_AMOUNT,
				name: 'personAmount',
				value: p.get('personAmount'),
				tabIndex: 13,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_DEATH_NUM,
				name: 'deathNum',
				value: p.get('deathNum'),
				tabIndex: 15,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_AUDIT_BY,
				name: 'auditor',
				value: p.get('auditor'),
				tabIndex: 17,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_ACCIDENT_DESCRIPTION,
				name: 'accidentDescription',
				value: p.get('accidentDescription'),
				tabIndex: 19,
				xtype: 'textarea',
				anchor: '95%'
			},
			{
				fieldLabel: C_AUDIT_COMMENTS,
				name: 'auditComments',
				value: p.get('auditComments'),
				tabIndex: 21,
				xtype: 'textarea',
				anchor: '95%'
			}]
		},
		{
			columnWidth: .5,
			layout: 'form',
			border: false,
			labelAlign:'right',
			labelWidth:65,
			bodyStyle:'padding-top:8px;',
			items: [{
				fieldLabel: C_DRIVER,
				tabIndex: 2,
				ref: '../driverName',
				name: 'driverName',
				value: p.get('driverName'),
				store: driverStore,
				enableKeyEvents: true,
				itemCls: 'required',
				xtype: 'combo',
				displayField: 'driverName',
				valueField: 'driverName',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				editable:false,
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('driverId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_ACCIDENT_TYPE,
				tabIndex: 4,
				itemCls: 'required',
				ref: '../accidentTypeName',
				name: 'accidentTypeName',
				value: p.get('accidentTypeName'),
				store: accidentTypeStore,
				enableKeyEvents: true,
				xtype: 'combo',
				displayField: 'accidentTypeName',
				valueField: 'accidentTypeName',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				editable:false,
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('accidentTypeId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_RESPONSIBLE,
				name: 'responsible',
				value: p.get('responsible'),
				tabIndex: 6,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_REPORT_TIME,
				name: 'reportTime',
				value: p.get('reportTime'),
				tabIndex: 8,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_POLICE_TEL,
				name: 'policeTel',
				value: p.get('policeTel'),
				tabIndex: 10,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_COMPENSATE_AMOUNT,
				name: 'compensateAmount',
				value: p.get('compensateAmount'),
				tabIndex: 12,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_ACCIDENT_REASON,
				name: 'accidentReason',
				value: p.get('accidentReason'),
				tabIndex: 14,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_INJURY_NUM,
				name: 'injuryNum',
				value: p.get('injuryNum'),
				tabIndex: 16,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_AUDIT_TIME,
				name: 'auditDate',
				value: p.get('auditDate'),
				tabIndex: 8,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_RESULT,
				name: 'result',
				value: p.get('result'),
				tabIndex: 20,
				xtype: 'textarea',
				anchor: '95%'
			},
			{
				fieldLabel: C_REMARKS,
				name: 'remark',
				value: p.get('remark'),
				tabIndex: 22,
				xtype: 'textarea',
				anchor: '95%'
			}]
		}]
	});
	Fos.AccidentWin.superclass.constructor.call(this, {
		buttonAlign: 'right',
		title: p.get('rowAction') == 'N' ? C_ADD_ACCIDENT: C_EDIT_ACCIDENT,
		width: 600,
		height: 450,
		modal: true,
		items: [frm],
		layout:'fit',
		buttons: [{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.AccidentWin, Ext.Window);


//加油站
Fos.OilStationGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL + '?_A=OIST_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TOilStation',
			id: 'id'
		},
		TOilStation),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load();
	var isPoint = new Ext.grid.CheckColumn({
		header:boldFont(C_IS_POINT),
		dataIndex: 'isPoint',
		width:120
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_OIL_STATION_NAME),
			dataIndex: 'oilStationName',
			editor: new Ext.form.TextField()
		},
		isPoint],
		defaults: {
			sortable: true,
			width:150
		}
	});
	this.add = function() {
		var p = new TOilStation({
			uuid: HTUtil.UUID(32),
			oilStationName: '',
			isPoint: 0,
			version: '0',
			rowAction: 'N'
		});
		this.stopEditing();
		store.insert(0, p);
		this.startEditing(0, 1);
	};
	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.save = function() {
		HTUtil.POST(store, 'TOilStation', TOilStation, 'OIST_S');
	};
	Fos.OilStationGrid.superclass.constructor.call(this, {
		id: 'G_OIST',
		iconCls: 'gen',
		title: C_OIL_STATION,
		clicksToEdit: 1,
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		plugins: isPoint,
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},'-',
		{
			text: C_SAVE,
			iconCls: 'save',
			scope: this,
			handler: this.save
		}, '-'
		]
	});
};
Ext.extend(Fos.OilStationGrid, Ext.grid.EditorGridPanel);

//加油记录列表
Fos.OilLogGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'OILO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilLog',id:'id'},TOilLog),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	{header:boldFont(C_REFUEL_DATE),dataIndex:'refuelDate',renderer:formatDate,width:100},
	{header:boldFont(C_VEHICLE_NO),dataIndex:'vehicleNo',width:100},
	{header:boldFont(C_DRIVER),dataIndex:'driverName',width:100},
	{header:boldFont(C_OIL_STATION),dataIndex:'oilStationName',width:100},
	{header:boldFont(C_OIL_TYPE),dataIndex:'oilTypeName',width:100},
	{header:boldFont(C_OIL_NUM),dataIndex:'num',width:100},
	{header:boldFont(C_OIL_PRICE),dataIndex:'price',width:100},
	{header:boldFont(C_OIL_AMOUNT),dataIndex:'amount',width:100}
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
	
	btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:false,
		scope:this,handler:this.add});
	btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:false,
		scope:this,handler:this.edit});
	btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:false,
		scope:this,handler:this.del});
	btnSearch = new Ext.Button({text:C_FAST_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.OilLogGrid.superclass.constructor.call(this,{title:C_OIL_LOG,header:false,
		id:'TMAINT_OILO',closable:true,store:store,sm:sm,cm:cm,loadMask:true,iconCls:'gen',
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showOilLog(p);
				}
			}
	    },
		bbar:PTB(store,100),
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove,'-',kw,btnSearch,'-']
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
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false,
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
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false,
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
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false,
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
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false,itemCls:'required',
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
		triggerAction:'all',selectOnFocus:true,anchor:'95%',editable:false,
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
		tabIndex:'11',enableKeyEvents:true,editable:false,
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
		if(!HTUtil.checkFieldNotNull('加油卡',cboOilCard))
			return;
		if(txtAmount.getValue()>txtStartAmount.getValue()){
			XMG.alert(SYS,'加油卡金额不足！',function(){txtStartAmount.focus();});;
			return;
		}
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
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:false,
		scope:this,handler:this.save});
	
	Fos.OilLogWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_OIL_LOG:C_EDIT_OIL_LOG,
		width:400,height:550,modal:true,layout:'fit',
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.OilLogWin, Ext.Window);

//加油卡
Fos.OilCardPanel = function() {
	var bp={_A:'T_OIL_CARD_Q',_mt:'json'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TOilCard',id:'id'},TOilCard),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload();
	};
	
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
	{header:boldFont('卡号'),dataIndex:'cardNumber',editor:new Ext.form.TextField()},
	{header:boldFont('名称'),dataIndex:'cardType',editor:new Ext.form.TextField()},
	{header:boldFont('余额'),dataIndex:'balance'}
    ],defaults:{sortable:false,width:100}});
        
    var cardGrid = new Ext.grid.EditorGridPanel({region:'west',width:350,
    	title:'加油卡列表',clicksToEdit:1,store:store,sm:sm,cm:cm
    });
    
    var tstore = new Ext.data.Store({url:SERVICE_URL+'?_A=T_OIL_CARD_TRANSACTION_Q',
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TOilCardTransaction'},TOilCardTransaction),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
     
    var cm2=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
	{header:boldFont('卡号'),dataIndex:'cardNumber'},
	{header:boldFont('日期'),dataIndex:'transactionDate',renderer:formatDate},
	{header:boldFont('交易类型'),dataIndex:'transactionType',renderer:function(v){if(v==0) return '充值';else return '消费';}},
	{header:boldFont('金额'),dataIndex:'amount'},
	{header:boldFont('车辆'),dataIndex:'vehicleNo'},	
	{header:boldFont('驾驶员'),dataIndex:'driverName'}
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
    
    var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:false,
    	scope:this,handler:this.addCard});
    var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:false,
    	scope:this,handler:this.del});
    var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:false,
    	scope:this,handler:this.save});
    var btnAddMoney = new Ext.Button({text:'充值',iconCls:'dollar',disabled:false,
    	scope:this,handler:this.addMoney});
    var btnReSet = new Ext.Button({text:'刷新',iconCls:'refresh',disabled:false,
    	scope:this,handler:this.reset});
    	
    Fos.OilCardPanel.superclass.constructor.call(this,{id:'OIL_CARD',iconCls:'gen',
    	title:'加油卡管理',layout:'border',closable:true,
    	items:[cardGrid,transactionGrid],
		tbar:[btnAdd,'-',btnRemove, '-', btnSave,'-',btnAddMoney,'-',btnReSet,'-']
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
	
	var frm = new Ext.form.FormPanel({labelWidth:65,labelAlign:'right',padding:5,
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
	
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'ok',disabled:false,
		scope:this,handler:this.save});
	
	Fos.AddMoneyWin.superclass.constructor.call(this,{
		title:'加油卡充值',width:300,height:170,modal:true,buttonAlign:'right',layout:'fit',
	  	items:[frm],
	  	buttons:[btnSave,{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.AddMoneyWin, Ext.Window);

Fos.DriverPosition = function(vehicleNo) {
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VEHI_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicle',
			id: 'id'
		},
		TVehicle),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	Ext.Ajax.request({
		url: SERVICE_URL,
		method: 'POST',
		params: {
			_A: 'DRIV_Q',
			vehicleNo: vehicleNo
		},
		success: function(r) {
			var A = HTUtil.XTRA(r.responseXML, 'TDriver', TDriver);
			c = A[0];
			if (c != null) {
				frm.getForm().loadRecord(c);
			}
		},
		failure: function(r, o) {
			Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
		}
	});
	var frm = new Ext.form.FormPanel({
		labelWidth: 100,
		frame: true,
		layout: 'column',
		layoutConfig: {
			columns: 2
		},
		items: [{
			columnWidth: .5,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_DRIVER_CODE,
				name: 'driverCode',
				tabIndex: 1,
				ref: '../driverCode',
				itemCls: 'required',
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_MOTORCADE,
				tabIndex: 3,
				name: 'motorcadeName',
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_MOBILE,
				name: 'mobile',
				tabIndex: 5,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_ID_NO,
				name: 'idNo',
				tabIndex: 7,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_LICENSE_NO,
				name: 'licenseNo',
				tabIndex: 7,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_EFFECTIVE_DATE_FROM,
				name: 'effectiveDateFrom',
				tabIndex: 9,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_INSPECT_DATE_FROM,
				name: 'inspectDateFrom',
				tabIndex: 11,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_JOIN_DATE,
				name: 'joinDate',
				tabIndex: 13,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_DEPOSIT,
				name: 'deposit',
				tabIndex: 14,
				xtype: 'numberfield',
				anchor: '95%'
			}]
		},
		{
			columnWidth: .5,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_DRIVER_NAME,
				name: 'driverName',
				itemCls: 'required',
				ref: '../driverName',
				tabIndex: 2,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_VEHICLE_NO,
				tabIndex: 4,
				itemCls: 'required',
				name: 'vehicleNo',
				store: vehicleStore,
				enableKeyEvents: true,
				xtype: 'combo',
				displayField: 'vehicleNo',
				valueField: 'vehicleNo',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('vehicleId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_TEL,
				name: 'homeTel',
				tabIndex: 6,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_GENDER,
				name: 'gender',
				tabIndex: 8,
				displayField: 'NAME',
				valueField: 'CODE',
				triggerAction: 'all',
				mode: 'local',
				selectOnFocus: true,
				listClass: 'x-combo-list-small',
				store: HTStore.GEND_S,
				anchor: '95%'
			},
			{
				fieldLabel: C_LICENSE_DATE,
				name: 'licenseDate',
				tabIndex: 10,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_EFFECTIVE_DATE_TO,
				name: 'effectiveDateTo',
				tabIndex: 12,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_INSPECT_DATE_TO,
				name: 'inspectDateTo',
				tabIndex: 14,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_LEAVE_DATE,
				name: 'leaveDate',
				tabIndex: 16,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_REMARKS,
				name: 'remark',
				tabIndex: 18,
				xtype: 'textarea',
				anchor: '95%'
			}]
		}]
	});
	Fos.DriverPosition.superclass.constructor.call(this, {
		buttonAlign: 'right',
		width: 600,
		height: 340,
		modal: true,
		items: [frm]
	});
};
Ext.extend(Fos.DriverPosition, Ext.Window);

//车辆管理
Fos.VehicleGrid = function() {
	var bp={_A: 'VEHI_Q',_mt: 'json'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty: 'rowCount',root: 'TVehicle',id: 'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start:0,limit:C_PS}});
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS}});
	};
	
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		columns:[new Ext.grid.RowNumberer(),sm,{
			header:boldFont(C_VEHICLE_NO),
			dataIndex: 'vehicleNo'
		},
		{
			header:boldFont(C_VEHICLE_NAME),
			dataIndex: 'vehicleName'
		},
		{
			header:boldFont(C_MOTORCADE),
			dataIndex: 'motorcadeName',
			width: 150
		},
		{
			header:boldFont(C_VEHICLE_CLASS),
			dataIndex: 'vehicleClassName'
		},
		{
			header:boldFont(C_MAX_LOAD),
			dataIndex: 'maxLoad'
		},
		{
			header:boldFont(C_INSPECT_DATE_FROM),
			dataIndex: 'inspectDateFrom',
			renderer: formatDate
		},
		{
			header:boldFont(C_INSPECT_DATE_TO),
			dataIndex: 'inspectDateTo',
			renderer: formatDate
		},
		{
			header:boldFont(C_STATUS),
			dataIndex: 'status',
			renderer: HTStore.vehicleStatusRender
		}],
		defaults: {
			sortable: true,
			width:120
		}
	});
	this.showVehi = function(p) {
		var win = new Fos.VehicleWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new TVehicle({
			uuid: HTUtil.UUID(32),
			rowAction: 'N'
		});
		this.showVehi(p);
	};
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'TVehicle');
					HTUtil.REQUEST('VEHI_S', xml,
					function() {
						store.remove(b);
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showVehi(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	var kw = new Ext.form.TextField({
		listeners: {
			scope: this,
			specialkey: function(c, e) {
				if (e.getKey() == Ext.EventObject.ENTER)
				 this.search();
			}
		}
	});
	this.search = function() {
		var vehicleNo = kw.getValue();
		if (!vehicleNo) {
			XMG.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function(b) {
				kw.focus();
			});
			return;
		};
		store.baseParams = {
			_A: 'VEHI_Q',
			_mt: 'json'
		};
		store.reload({
			params: {
				start: 0,
				limit: C_PS,
				vehicleNo: vehicleNo
			},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
	};
	Fos.VehicleGrid.superclass.constructor.call(this, {
		title: C_VEHICLE_MAN,
		header: false,
		id: 'GEN_VEHI',
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		iconCls:'gen',
		loadMask: true,
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showVehi(p);
				}
			}
		},
		bbar: PTB(store, 100),
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_EDIT,
			iconCls: 'option',
			scope: this,
			handler: this.edit
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},
		'-', {
			text: C_VEHICLE_NO,
			xtype: 'tbtext'
		},
		kw,{text: C_SEARCH,iconCls: 'search',handler: this.search}, '-',
		{text:C_RESET,iconCls:'refresh',handler:this.reset},'-'								//刷新
		]
	});
};
Ext.extend(Fos.VehicleGrid, Ext.grid.GridPanel);

//车辆管理窗口
Fos.VehicleWin = function(p, listStore,mapStatus) {
	var vehicleClassStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VECL_Q',baseParams: {_mt: 'json'},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicleClass',
			id: 'id'
		},
		TVehicleClass),
		remoteSort: true,
		sortInfo: {field: 'id',direction: 'desc'}
	});
	this.save = function() {
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if (Ext.isEmpty(p.get('vehicleNo'))) {
			Ext.Msg.alert(SYS, C_VEHICLE_NO_REQUIRED,
			function() {
				frm.vehicleNo.focus();
			},
			this);
			return;
		};
		p.endEdit();
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'TVehicle', TVehicle);
		Ext.Ajax.request({scope: this,
			url: SERVICE_URL,method: 'POST',
			params: {_A: 'VEHI_S'},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'TVehicle', TVehicle);
				HTUtil.RU(c, p, TVehicle);
				//if (newP) listStore.insert(0, p);
				listStore.reload();
				Ext.Msg.alert(SYS, M_S);
				this.close();
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, M_F + r.responseText);
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	var frm = new Ext.form.FormPanel({
		labelWidth:78,
		frame: false,
		layout: 'column',
		layoutConfig: {columns:2},
		labelAlign:'right',
		bodyStyle:'padding-top:8px;',
		items: [{
			columnWidth: .5,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_VEHICLE_NO,
				name: 'vehicleNo',
				value: p.get('vehicleNo'),
				tabIndex: 1,
				ref: '../vehicleNo',
				itemCls: 'required',
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_VEHICLE_CLASS,
				name: 'vehicleClassName',
				value: p.get('vehicleClassName'),
				tabIndex: 3,
				store: vehicleClassStore,
				xtype: 'combo',
				displayField: 'vehicleClassName',
				valueField: 'vehicleClassName',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				editable:false,
				listeners: {
					scope: this,
					select: function(c, r, i) {
						p.set('vehicleClassId', r.get('id'));
					}
				}
			},
			{
				fieldLabel: C_ENGINE_NO,
				name: 'engineNo',
				value: p.get('engineNo'),
				tabIndex: 5,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_CUSTOMS_NO,
				name: 'customsNo',
				value: p.get('customsNo'),
				tabIndex: 7,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_INSPECT_DATE_FROM,
				name: 'inspectDateFrom',
				value: p.get('inspectDateFrom'),
				tabIndex: 9,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_VEHICLE_LENGTH,
				name: 'length',
				value: p.get('length'),
				tabIndex: 11,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_VEHICLE_HEIGHT,
				name: 'height',
				value: p.get('height'),
				tabIndex: 13,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_MOTORCADE,
				tabIndex: 15,
				name: 'motorcadeName',
				value: p.get('motorcadeName'),
				store: HTStore.getCS(),
				enableKeyEvents: true,
				xtype: 'customerLookup',
				displayField: 'custCode',
				valueField: 'custNameCn',
				typeAhead: true,
				custType: 'custTrackFlag',
				mode: 'remote',
				tpl: custTpl,
				itemSelector: 'div.list-item',
				listWidth: C_LW,
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%',
				listeners: {
					scope: this,
					blur: function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							p.set('motorcadeId', '');
						}
					},
					select: function(c, r, i) {
						p.set('motorcadeId', r.get('id'));
					},
					keydown: {
						fn: function(f, e) {
							LC(f, e, 'custTrackFlag');
						},
						buffer: BF
					}
				}
			},
			{
				fieldLabel: '保单号',
				name: 'premiumNumber',
				value: p.get('premiumNumber'),
				tabIndex: 17,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: '保险期(从)',
				name: 'premiumDateFrom',
				value: p.get('premiumDateFrom'),
				tabIndex: 19,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: '加油卡',
				name: 'oilNumber',
				value: p.get('oilNumber'),
				tabIndex: 21,
				xtype: 'textfield',
				anchor: '95%'
			}]
		},
		{
			columnWidth: .5,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_VEHICLE_NAME,
				name: 'vehicleName',
				value: p.get('vehicleName'),
				tabIndex: 2,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_PALLET_NO,
				name: 'palletNo',
				value: p.get('palletNo'),
				tabIndex: 4,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_IC_NO,
				name: 'icNo',
				value: p.get('icNo'),
				tabIndex: 6,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_PALLET_TYPE,
				name: 'palletType',
				value: p.get('palletType'),
				tabIndex: 8,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_INSPECT_DATE_TO,
				name: 'inspectDateTo',
				value: p.get('inspectDateFrom'),
				tabIndex: 10,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: C_VEHICLE_WIDTH,
				name: 'width',
				value: p.get('width'),
				tabIndex: 12,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: C_MAX_LOAD,
				name: 'maxLoad',
				value: p.get('maxLoad'),
				tabIndex: 14,
				xtype: 'numberfield',
				anchor: '95%'
			},
			{
				fieldLabel: '车辆状态',
				name: 'status',
				value: p.get('status'),
				tabIndex: 16,
				store: HTStore.vehicleStatusStore,
				xtype: 'combo',
				displayField: 'N',
				valueField: 'C',
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				selectOnFocus: true,
				anchor: '95%'
			},
			{
				fieldLabel: '保险公司',
				name: 'premiumCompany',
				value: p.get('premiumCompany'),
				tabIndex: 18,
				xtype: 'textfield',
				anchor: '95%'
			},
			{
				fieldLabel: '保险期(到)',
				name: 'premiumDateTo',
				value: p.get('premiumDateTo'),
				tabIndex: 20,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			},
			{
				fieldLabel: '加油卡金额',
				name: 'oilNumberAmount',
				value: p.get('oilNumberAmount'),
				tabIndex: 22,
				xtype: 'numberfield',
				anchor: '95%'
			}]
		},
		{
			columnWidth: 1,
			layout: 'form',
			border: false,
			items: [{
				fieldLabel: C_REMARKS,
				name: 'remark',
				value: p.get('remark'),
				tabIndex: 23,
				xtype: 'textarea',
				anchor: '98%'
			}]
		}]
	});
	if(mapStatus){
		mapStatus=true;
	}else{
		mapStatus=false;
	}
	Fos.VehicleWin.superclass.constructor.call(this, {
		buttonAlign: 'right',
		title: p.get('rowAction') == 'N' ? C_ADD_VEHICLE: C_VEHICLE + '-' + p.get('vehicleNo'),
		width: 600,
		height: 430,
		modal: true,
		items: [frm],
		layout:'fit',
		buttons: [{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save,
			hidden:mapStatus
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.VehicleWin, Ext.Window);

//车辆类型
Fos.VehicleClassGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VECL_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicleClass',
			id: 'id'
		},
		TVehicleClass),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load();
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_VEHICLE_CLASS_NAME),
			dataIndex: 'vehicleClassName',
			editor: new Ext.form.TextField()
		}],
		defaults: {
			sortable: true,
			width:250
		}
	});
	this.add = function() {
		var p = new TVehicleClass({
			uuid: HTUtil.UUID(32),
			vehicleClassName: '',
			version: '0',
			rowAction: 'N'
		});
		this.stopEditing();
		store.insert(0, p);
		this.startEditing(0, 1);
	};
	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.save = function() {
		HTUtil.POST(store, 'TVehicleClass', TVehicleClass, 'VECL_S');
	};
	Fos.VehicleClassGrid.superclass.constructor.call(this, {
		id: 'G_VEHT',
		iconCls: 'gen',
		title: C_VEHICLE_CLASS,
		clicksToEdit: 1,
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},'-',
		{
			text: C_SAVE,
			iconCls: 'save',
			scope: this,
			handler: this.save
		}, '-'
		]
	});
};
Ext.extend(Fos.VehicleClassGrid, Ext.grid.EditorGridPanel);

//油品类型
Fos.OilTypeGrid = function() {
	var store = new Ext.data.Store({
		url: SERVICE_URL + '?_A=OITY_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TOilType',
			id: 'id'
		},
		TOilType),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	store.load();
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, {
			header:boldFont(C_OIL_TYPE_NAME),
			dataIndex: 'oilTypeName',
			editor: new Ext.form.TextField()
		}],
		defaults: {
			sortable: true,
			width: 150
		}
	});
	this.add = function() {
		var p = new TOilType({
			uuid: HTUtil.UUID(32),
			oilTypeName: '',
			version: '0',
			rowAction: 'N'
		});
		this.stopEditing();
		store.insert(0, p);
		this.startEditing(0, 1);
	};
	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.save = function() {
		HTUtil.POST(store, 'TOilType', TOilType, 'OITY_S');
	};
	Fos.OilTypeGrid.superclass.constructor.call(this, {
		id: 'G_OITY',
		iconCls: 'gen',
		title: C_OIL_TYPE,
		clicksToEdit: 1,
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		tbar: [{
			text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add
		},
		'-', {
			text: C_REMOVE,
			iconCls: 'remove',
			scope: this,
			handler: this.del
		},'-',
		{
			text: C_SAVE,
			iconCls: 'save',
			scope: this,
			handler: this.save
		}, '-'
		]
	});
};
Ext.extend(Fos.OilTypeGrid, Ext.grid.EditorGridPanel);

//驾驶员管理
Fos.DriverGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'DRIV_Q',_mt:'json'},
		reader: new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort: true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start: 0,limit: C_PS}});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: true
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(),sm,
		{header:boldFont(C_DRIVER_CODE),dataIndex: 'driverCode'},
		{header:boldFont(C_DRIVER_NAME),dataIndex: 'driverName'},
		{header:boldFont(C_MOTORCADE),dataIndex: 'motorcadeName'},
		{header:boldFont(C_MOBILE),dataIndex:'mobile'},
		{header:boldFont(C_TEL),dataIndex:'homeTel'},
		{header:boldFont(C_LICENSE_NO),dataIndex:'licenseNo'},
		//{header:boldFont(C_DEPOSIT),dateIndex:'deposit'},
		{header:boldFont(C_LICENSE_DATE),dataIndex:'licenseDate',renderer: formatDate},
		{header:boldFont(C_EFFECTIVE_DATE_FROM),dataIndex:'effectiveDateFrom',renderer:formatDate},
		{header:boldFont(C_EFFECTIVE_DATE_TO),dataIndex:'effectiveDateTo',renderer: formatDate},
		{header:boldFont(C_INSPECT_DATE_FROM),dataIndex:'inspectDateFrom',renderer: formatDate},
		{header:boldFont(C_INSPECT_DATE_TO),dataIndex:'inspectDateTo',renderer: formatDate},
		{header:boldFont(C_JOIN_DATE),dataIndex:'joinDate',renderer: formatDate},
		{header:boldFont(C_LEAVE_DATE),dataIndex:'leaveDate',renderer: formatDate}],
		defaults: {sortable:true,width:100}
	});
	this.showDriver = function(p) {
		var win = new Fos.DriverWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new TDriver({
			uuid: HTUtil.UUID(32),
			rowAction: 'N'
		});
		this.showDriver(p);
	};
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'TDriver');
					HTUtil.REQUEST('DRIV_S', xml,
					function() {
						store.remove(b);
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showDriver(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	var kw = new Ext.form.TextField({
		listeners: {
			scope: this,
			specialkey: function(c, e) {
				if (e.getKey() == Ext.EventObject.ENTER)
				 this.search();
			}
		}
	});
	this.search = function() {
		var driverName = kw.getValue();
		if (!driverName) {
			XMG.alert(SYS, C_DRIVER_REQUIRED,
			function(b) {
				kw.focus();
			});
			return;
		};
		store.baseParams = {
			_A: 'DRIV_Q',
			_mt: 'json'
		};
		store.reload({
			params: {
				start: 0,
				limit: C_PS,
				driverName: driverName
			},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
	};
	Fos.DriverGrid.superclass.constructor.call(this, {
		title: C_DRIVER_MAN,
		header: false,
		id: 'GEN_DRIV',
		closable: true,
		store: store,
		sm: sm,
		cm: cm,
		loadMask: true,
		iconCls:'gen',
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showDriver(p);
				}
			}
		},
		bbar:PTB(store, 100),
		tbar:[{text: C_ADD,iconCls: 'add',scope: this,handler: this.add},'-', 
			{text: C_EDIT,iconCls: 'option',scope: this,handler:this.edit},'-',
			{text: C_REMOVE,iconCls: 'remove',scope: this,handler:this.del},'-',
			kw,{text: C_SEARCH,iconCls: 'search',handler: this.search},'-']
	});
};
Ext.extend(Fos.DriverGrid, Ext.grid.GridPanel);

//司机管理窗口
Fos.DriverWin = function(p, listStore) {
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VEHI_Q',
		baseParams: {
			_mt: 'json'
		},
		reader: new Ext.data.JsonReader({
			totalProperty: 'rowCount',
			root: 'TVehicle',
			id: 'id'
		},
		TVehicle),
		remoteSort: true,
		sortInfo: {
			field: 'id',
			direction: 'desc'
		}
	});
	this.save = function() {
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if (Ext.isEmpty(p.get('driverCode'))) {
			Ext.Msg.alert(SYS, C_DRIVER_CODE_REQUIRED,
			function() {
				frm.driverCode.focus();
			},
			this);
			return;
		};
		if (Ext.isEmpty(p.get('driverName'))) {
			Ext.Msg.alert(SYS, C_DRIVER_NAME_REQUIRED,
			function() {
				frm.driverName.focus();
			},
			this);
			return;
		};
		p.endEdit();
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'TDriver', TDriver);
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {
				_A: 'DRIV_S'
			},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'TDriver', TDriver);
				HTUtil.RU(c, p, TDriver);
				if (newP) listStore.insert(0, p);
				Ext.Msg.alert(SYS, M_S);
				this.close();
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	
	var txtDriverCode= new Ext.form.TextField({
		fieldLabel:C_DRIVER_CODE,
		name: 'driverCode',
		value: p.get('driverCode'),
		tabIndex: 1,
		itemCls: 'required',
		anchor: '95%'
	});
	var cobMotorcadeName=new Fos.CustomerLookup({
			fieldLabel: C_MOTORCADE,
			tabIndex: 3,
			name: 'motorcadeName',
			value: p.get('motorcadeName'),
			store: HTStore.getCS(),
			enableKeyEvents: true,
			xtype: 'customerLookup',
			displayField: 'custCode',
			valueField: 'custNameCn',
			typeAhead: true,
			custType: 'custTrackFlag',
			mode: 'remote',
			tpl: custTpl,
			itemSelector: 'div.list-item',
			listWidth: C_LW,
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			listeners: {
				scope: this,
				blur: function(f) {
					if (f.getRawValue() == '') {
						f.clearValue();
						p.set('motorcadeId', '');
					}
				},
				select: function(c, r, i) {
					p.set('motorcadeId', r.get('id'));
				},
				keydown: {
					fn: function(f, e) {
						LC(f, e, 'custTrackFlag');
					},
					buffer: BF
				}
			}
	});
	var txtMobile=new Ext.form.TextField({
			fieldLabel: C_MOBILE,
			name:'mobile',
			value:p.get('mobile'),
			tabIndex:5,
			anchor:'95%'
		});
		
	var txtIdNo=new Ext.form.Field({
			fieldLabel: C_ID_NO,
			name:'idNo',
			value:p.get('idNo'),
			tabIndex: 7,
			xtype:'textfield',
			anchor:'95%'
		});
	var txtLicenseNo=new Ext.form.TextField({
			fieldLabel: C_LICENSE_NO,
			name:'licenseNo',
			value:p.get('licenseNo'),
			tabIndex:7,
			xtype:'textfield',
			anchor:'95%'
		});
	var dateEffectiveDateFrom=new Ext.form.DateField({
			fieldLabel:C_EFFECTIVE_DATE_FROM,
			name:'effectiveDateFrom',
			value:p.get('effectiveDateFrom'),
			tabIndex:9,
			xtype:'datefield',
			format:DATEF,
			anchor:'95%'
	});
	var dataInspectDateFrom=new Ext.form.DateField({
			fieldLabel: C_INSPECT_DATE_FROM,
			name:'inspectDateFrom',
			value:p.get('inspectDateFrom'),
			tabIndex:11,
			xtype:'datefield',
			format:DATEF,
			anchor:'95%'
		});
	var dataJoinDate=new Ext.form.DateField({
			fieldLabel: C_JOIN_DATE,
			name:'joinDate',
			value:p.get('joinDate'),
			tabIndex:13,
			xtype:'datefield',
			format:DATEF,
			anchor:'95%'
		});
	var numDeposit=new Ext.form.NumberField({
			fieldLabel:C_DEPOSIT,
			name:'deposit',
			value:p.get('deposit'),
			tabIndex:14,
			xtype:'numberfield',
			anchor:'95%'
		});
	var txtDriverName=new Ext.form.TextField({
			fieldLabel: C_DRIVER_NAME,
			name: 'driverName',
			value: p.get('driverName'),
			itemCls: 'required',
			ref: '../driverName',
			tabIndex: 2,
			xtype: 'textfield',
			anchor: '95%'
		});
	var cboVehicleNo=new Ext.form.ComboBox({
			fieldLabel: C_VEHICLE_NO,
			tabIndex: 4,
			name: 'vehicleNo',
			value: p.get('vehicleNo'),
			store: vehicleStore,
			enableKeyEvents: true,
			xtype: 'combo',
			displayField: 'vehicleNo',
			valueField: 'vehicleNo',
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			editable:false,
			listeners: {
				scope: this,
				select: function(c, r, i) {
					p.set('vehicleId', r.get('id'));
				}
			}
		});
	var txtHomeTel=new Ext.form.TextField({
			fieldLabel: C_TEL,
			name: 'homeTel',
			value: p.get('homeTel'),
			tabIndex: 6,
			xtype: 'textfield',
			anchor: '95%'
		});
	var cboGender=new Ext.form.ComboBox({
			fieldLabel: C_GENDER,
			name: 'gender',
			value: p.get('gender'),
			xtype:'combo',
			tabIndex: 8,
			displayField: 'NAME',
			valueField: 'CODE',
			triggerAction: 'all',
			mode: 'local',
			selectOnFocus: true,
			listClass: 'x-combo-list-small',
			store: HTStore.GEND_S,
			anchor: '95%'
		});
	var dateLicenseDate=new Ext.form.DateField({
			fieldLabel: C_LICENSE_DATE,
			name: 'licenseDate',
			value: p.get('licenseDate'),
			tabIndex: 10,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateeffectiveDateTo=new Ext.form.DateField({
			fieldLabel: C_EFFECTIVE_DATE_TO,
			name: 'effectiveDateTo',
			value: p.get('effectiveDateTo'),
			tabIndex: 12,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateInspectDateTo=new Ext.form.DateField({
			fieldLabel: C_INSPECT_DATE_TO,
			name: 'inspectDateTo',
			value: p.get('inspectDateFrom'),
			tabIndex: 14,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateLeaveDate=new Ext.form.DateField({
			fieldLabel: C_LEAVE_DATE,
			name: 'leaveDate',
			value: p.get('leaveDate'),
			tabIndex: 16,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var txtRemark=new Ext.form.TextField({
			fieldLabel: C_REMARKS,
			name: 'remark',
			value: p.get('remark'),
			tabIndex: 18,
			xtype: 'textarea',
			anchor: '95%'
		});
	
	var frm = new Ext.form.FormPanel({labelWidth:78,frame:false,layout:'column',
		layoutConfig:{columns:2},bodyStyle:'padding-top:8px;',labelAlign:'right',
		items:[{
			columnWidth:.5,layout:'form',border:false,
			items:[txtDriverCode,cobMotorcadeName,txtMobile,txtIdNo,txtLicenseNo,
			dateEffectiveDateFrom,dataInspectDateFrom,dataJoinDate,numDeposit]
		},
		{
			columnWidth: .5,layout:'form',border:false,
			items: [txtDriverName,cboVehicleNo,txtHomeTel,cboGender,dateLicenseDate,
			dateeffectiveDateTo,dateInspectDateTo,dateLeaveDate,txtRemark]
		}]
	});
	
	Fos.DriverWin.superclass.constructor.call(this, {
		buttonAlign: 'right',
		title: p.get('rowAction') == 'N' ? C_ADD_DRIVER: C_EDIT_DRIVER,
		width: 720,
		height: 330,
		modal: true,
		layout:'fit',
		items: [frm],
		buttons: [{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.DriverWin, Ext.Window);

//跟踪类型设置
Fos.PEventTypeTab = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PEVENTTYPE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PEventType',id:'id'},PEventType),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	store.load();
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var active = new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',sortable:false,width:55});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_NAME,dataIndex:'typeName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		active],defaults:{sortable:false,width:100}});
	
	this.save = function(){
		this.stopEditing();
		HTUtil.POST(store,'PEventType',PEventType,'PEVENTTYPE_S');
	};
	this.add=function(){
		var p = new PEventType({uuid:HTUtil.UUID(32),status:'0',version:'0',rowAction:'N'});
  	this.stopEditing();
  	store.add(p);
  	this.startEditing(store.getRange().length-1,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	
  var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_CONS),
  	scope:this,handler:this.add});
  var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_CONS),
  	scope:this,handler:this.del});
  var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_CONS),
  	scope:this,handler:this.save});
  
	Fos.PEventTypeTab.superclass.constructor.call(this,{id:'P_EVENTTYPE',title:'跟踪设置',closable:true,	
		plugins:[active],clicksToEdit:1,store:store,sm:sm,cm:cm,
		tbar:[btnAdd, '-',btnRemove,'-',btnSave]
	});
};
Ext.extend(Fos.PEventTypeTab, Ext.grid.EditorGridPanel);

//运输网点
Fos.GSiteGrid = function() {
  var store = new Ext.data.Store({url:SERVICE_URL+'?_A=GSITE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GSite',id:'id'},GSite),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  store.load();
  var placeStore=HTStore.getCITY_S();
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
        {header:boldFont(C_NAME),dataIndex:'siteName',editor:new Ext.form.TextField()},
        {header:boldFont(C_CONTACT),dataIndex:'siteContact',editor:new Ext.form.TextField()},
        {header:boldFont(C_TEL),dataIndex:'siteTel',editor:new Ext.form.TextField(),width:150},
        {header:boldFont(C_FAX),dataIndex:'siteFax',editor:new Ext.form.TextField(),width:150},
        {header:boldFont(C_ADDRESS),dataIndex:'siteAddress',editor:new Ext.form.TextField(),width:200},
        {header:boldFont(C_SITE_TYPE),dataIndex:'siteType',renderer:HTStore.getSITE_TYPE,
  			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
  			mode:'local',selectOnFocus:true,
  			store:HTStore.SITE_TYPE_S})},
        {header:boldFont(C_PROVINCE),dataIndex:'provinceName',
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
			{header:boldFont(C_CITY),dataIndex:'cityName',
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
	
  var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_GEN),
  	scope:this,handler:this.add});
  var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_GEN),
  	scope:this,handler:this.del});
  var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_GEN),
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
