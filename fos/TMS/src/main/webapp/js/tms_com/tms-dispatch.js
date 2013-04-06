//运输管理
var getTranTask = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	var items=[];
	if(VERSION!=5){
		if(true)
			items[items.length]=FosMenu(panel,'提货管理','T_PICKUP',function(){return new Fos.TSendCarGrid(0);});
		if(true)
			items[items.length]=FosMenu(panel,'送货管理','T_SENT',function(){return new Fos.TSendCarGrid(1);});
	}else{
		if(true)
			items[items.length]=FosMenu(panel,'调度单','T_CONS',function(){return new Fos.TSendCarGrid(2);});
	}
		
	var genPanel = new Ext.Panel({title:'运输管理',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",
		collapsible:true,layout:'accordion',split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[genPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	createWindow('TRANS','运输管理',contPanel);
};

//调度-派车-列表
Fos.TSendCarGrid = function(v) {
	var bp={_A:'TTRT_Q',_mt:'json',dispatchFlag:v};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransTask',id: 'id'},TTransTask),
		remoteSort: true,
		sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start:0,limit:C_PS30}});
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30}});
	};
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: true
	});
	var cm = new Ext.grid.ColumnModel({
		columns:[new Ext.grid.RowNumberer(), sm, 
		{header:boldFont('车辆状态'),dataIndex:'status',
			 renderer:function(v){
			 	var str;
			 	if(v==0){
			 		str='未派车';
			 	}else if(v==1){
			 		str='已发车';
			 	}else if(v==2){
			 		str='运输结束';
			 	}
			 	return str;
			 },
			 hidden:v==0?true:false
		},
		{header:boldFont('派车单号'),dataIndex: 'transTaskNo',width:150},
		//{header:boldFont('车队'),dataIndex: 'motorcadeName',width: 150},
		{header:boldFont('车牌号'),dataIndex: 'vehicleNo',width: 100},
		//{header:boldFont('车队联系人'),dataIndex: 'motorcadeContact',width:100},
		//{header:boldFont('车队电话'),dataIndex: 'motorcadeTel',width: 100},
		{header:boldFont('驾驶员'),dataIndex: 'driverName',width:100},
		{header:boldFont('司机电话'),dataIndex: 'driverTel',width:100},
		//{header:boldFont('发货地点'),dataIndex: 'placeFromName',width: 100},
		//{header:boldFont('交货地点'),dataIndex: 'placeToName',width: 100},
		//{header:boldFont('空载公里数'),dataIndex: 'emptyMiles',width: 100},
		//{header:boldFont('重载公里数'),dataIndex: 'heavyMiles',width: 100},
		{header:boldFont('件数合计'),dataIndex: 'packages',width: 100},
		{header:boldFont('毛重合计'),dataIndex: 'grossWeight',width: 100},
		{header:boldFont('体积合计'),dataIndex: 'measurement',width: 100},
		{header:boldFont('发车日期'),dataIndex: 'startDate',renderer: formatDate,width: 100},
		{header:boldFont('完成日期'),dataIndex: 'endDate',renderer: formatDate,width: 100}],
		defaults:{sortable:false,width:100}
	});
	//美金
	/*cm.setRenderer(1, function getColor(val) {
		if (val != "") {
			return '<font color=blue></font><span style="color:red;">' + Ext.util.Format.usMoney(val) + '</span>';
		}
	});*/
	

	this.showTask = function(p) {
		var win = '';
		if(v==0){		//提货
			win=new Fos.PickUpWin(p,store);
		}
		else if(v==1){	 //送货
			win=new Fos.TransTaskWin(p,store);
		}
		else if(v==2){	 //集装箱运输
			win=new Fos.PickUpWin(p,store);
		}
		win.show();
	};
	//新增
	this.add = function() {
		var p = new TTransTask({uuid: HTUtil.UUID(32),rowAction:'N',dispatchFlag:v});
		this.showTask(p);
	};
	//删除
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b, 'TTransTask');
					HTUtil.REQUEST('TTRT_R', xml,
					function() {
						store.remove(b);
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	//编辑
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showTask(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	//查询
	var a = [];
	this.search = function() {
		var transTaskNo = kw.getValue();
		var vehicleNo=txtVehicleNo.getValue();
		if(transTaskNo!=''){
			a[a.length] = {key: 'transTaskNo',value: transTaskNo,op: LI};
		}
		if(vehicleNo!=''){
			a[a.length] = {key: 'vehicleNo',value: vehicleNo,op: LI};
		}
		if(a.length<1){
			XMG.alert(SYS,'请输入查询条件！',
				function(b) {
					kw.focus();
				});
			return ;
		}
		//调度标志条件0：提货 1：送货
		a[a.length] = {key: 'dispatchFlag',value:v,op:EQ};
		store.baseParams = {_A: 'TTRT_SEARCH',_mt: 'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
		store.reload({
			params: {start: 0,limit: C_PS30},
			callback: function(r) {
				if (r.length == 0) XMG.alert(SYS, M_NOT_FOUND);
			}
		});
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
	var txtVehicleNo = new Ext.form.TextField({});
	var title='',id='';
	if(v==0){
		title='提货管理';
		id='T_PICKUP';
	}else if(v==1){
		title='送货管理';
		id='T_SENT';
	}else if(v==2){
		title='调度单';
		id='T_CONS';
	}
	
	this.pickListExpExcel=function(){
		if(store.baseParams.xml){
			var b = [];
			for(var i=0;i<a.length;i++){
				b[b.length]=new QParam(a[i]);
			}
			EXPC('TRANS_LIST','&sort=id&dir=DESC&xml='+HTUtil.HTX(HTUtil.QTX(b))+'&dispatchFlag='+v);
		}else{
			EXPC('TRANS_LIST','&sort=id&dir=DESC&dispatchFlag='+v);
		}
	};
	var pickListExp = '';
		if(v==0){
			pickListExp = {text:'提货列表',scope:this,iconCls:'right',handler:this.pickListExpExcel};
		}else if(v==1){
			pickListExp = {text:'送货列表',scope:this,iconCls:'right',handler:this.pickListExpExcel};
		}else if(v==2){
			pickListExp = {text:'调度单列表',scope:this,iconCls:'right',handler:this.pickListExpExcel};
		}
	
	Fos.TSendCarGrid.superclass.constructor.call(this, {title:title,id:id,
		stripeRows:true,autoScroll:true,iconCls:'gen',sm: sm,cm: cm,store:store,closable: true,
		listeners: {
			scope: this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showTask(p);
				}
			}
		},
		tbar:[{text: C_ADD,
			iconCls: 'add',
			scope: this,
			handler: this.add},'-',
			{text:C_EDIT,iconCls:'option',scope: this,handler: this.edit},'-',
			{text: C_REMOVE,iconCls: 'remove',scope: this,handler: this.del},'-',
			{text: '派车单号',xtype: 'tbtext'},kw,
			{text: '车牌号',xtype: 'tbtext'},txtVehicleNo,
			{text: C_SEARCH,iconCls: 'search',handler:this.search},'-',
			{text:C_EXPORT,iconCls:'print',scope:this,
							menu:{items:[pickListExp]}},'-',
			{text:C_RESET,iconCls:'refresh',handler:this.reset},
			'-'
		],
		bbar:PTB(store, C_PS30)
	});
};
Ext.extend(Fos.TSendCarGrid, Ext.grid.GridPanel);

//调度-派车-提货
Fos.PickUpWin = function(p, listStore) {
	var store = new Ext.data.Store({url: SERVICE_URL + '?_A=TTASK_CONS_Q',baseParams:{_mt: 'json'},
		reader: new Ext.data.JsonReader({totalProperty: 'rowCount',root:'TTaskConsign',id: 'id'},TTaskConsign),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	if (p.get('rowAction')!='N'){
		store.load({params:{transTaskId:p.get('id')}});
	}
	this.reset=function(){							//刷新
		if(p.get('rowAction')!='N'){
			store.load({params:{transTaskId:p.get('id')}});
		}
	};
		
	//派车单号
	var txtTaskNo = new Ext.form.TextField({
				fieldLabel: C_TRANS_TASK_NO,
				id: 'transTaskNo',
				name: 'transTaskNo',
				value: p.get('transTaskNo'),
				disabled: true,
				tabIndex: 1,
				xtype: 'textfield',
				anchor: '95%'
			});
	//车队
	var cboMotorcadeName = new Fos.CustomerLookup({
		fieldLabel: C_MOTORCADE,
		name: 'motorcadeName',
		value: p.get('motorcadeName'),
		itemCls: 'required',
		tabIndex: 2,
		store: HTStore.getCS(),
		enableKeyEvents: true,
		tpl: custTpl,
		//itemSelector: 'div.list-item',
		listWidth: C_LW,
		xtype: 'customerLookup',
		custType: 'custTrackFlag',
		displayField: 'custCode',
		valueField: 'custNameCn',
		typeAhead: true,
		mode: 'remote',
		triggerAction: 'all',
		selectOnFocus: true,
		anchor: '95%',
		bizType: BT_T,
		emptyText: '不能为空',
		listeners: {
			scope: this,
			blur: function(f) {
				if (f.getRawValue() == '') {
					f.clearValue();
					p.set('motorcadeId', '');
					p.set('motorcadeName', '');
				}
			},
			select: function(c, r, i) {
				frm.motorcadeContact.setValue(r.get('custContact'));
				frm.motorcadeTel.setValue(r.get('custTel'));
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
	//车牌号
	var cboVehicleNo = new Ext.form.ComboBox(
			{
				fieldLabel:'车牌号',
				name: 'vehicleNo',
				value: p.get('vehicleNo'),
				tabIndex: 5,
				store: HTStore.getVehiByStatus(),
				xtype: 'combo',
				itemCls: 'required',
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
			}
	);
	//驾驶员
	var cboDriverName = new Ext.form.ComboBox(
			{
				fieldLabel: C_DRIVER,
				name: 'driverName',
				tabIndex: 6,
				store: HTStore.getDrivByStatus(),
				xtype: 'combo',
				value: p.get('driverName'),
				itemCls: 'required',
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
						if(r.get('mobile')!=''){
							txtDriverTel.setValue(r.get('mobile'));
						}
					}
				}
			}
	);
	var txtplaceFromName=new Ext.form.TextField({
		fieldLabel: C_PLACE_FROM,
			name: 'placeFromName',
			value: p.get('placeFromName'),
			tabIndex: 9,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtCargoName=new Ext.form.TextField({
		fieldLabel: C_CARGO_NAME,
			name: 'cargoName',
			value: p.get('cargoName'),
			tabIndex: 13,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtPremiumNumber=new Ext.form.TextField(
		{fieldLabel: '保单号',
			name: 'premiumNumber',
			value: p.get('premiumNumber'),
			tabIndex: 17,
			xtype: 'textfield',
			anchor: '95%'
		}
	);
	//交货地点
	var txtPlaceToName = new Ext.form.TextField({
			fieldLabel: C_PLACE_TO,
			name: 'placeToName',
			value: p.get('placeToName'),
			tabIndex: 10,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtPackages = new Ext.form.NumberField({
			fieldLabel: C_SUM_PACK,
			name: 'packages',
			value: p.get('packages'),
			tabIndex: 14,
			ref: '../packages',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var txtPremiumCompan= new Ext.form.TextField({
			fieldLabel: '保险公司',
			name: 'premiumCompany',
			value: p.get('premiumCompany'),
			tabIndex: 18,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtMotorcadeContact=new Ext.form.TextField({
			fieldLabel: C_MOTORCADE_CONTACT,
			ref: '../motorcadeContact',
			name: 'motorcadeContact',
			value: p.get('motorcadeContact'),
			tabIndex: 3,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtDriverTel=new Ext.form.TextField({
			fieldLabel: C_DRIVER_TEL,
			name: 'driverTel',
			value: p.get('driverTel'),
			tabIndex: 7,
			xtype: 'textfield',
			anchor: '95%'
		});
	var numEmptyMiles=new Ext.form.NumberField({
			fieldLabel: C_EMPTY_MILES,
			name: 'emptyMiles',
			value: p.get('emptyMiles'),
			tabIndex: 11,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var numGrossWeight=new Ext.form.NumberField({
			fieldLabel: C_SUM_GW,
			name: 'grossWeight',
			value: p.get('grossWeight'),
			tabIndex: 15,
			ref: '../grossWeight',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var datePremiumDateFrom=new Ext.form.DateField({
			fieldLabel: '保险期(从)',
			name: 'premiumDateFrom',
			value: p.get('premiumDateFrom'),
			tabIndex: 19,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var txtMotorcadeTel=new Ext.form.TextField({
			fieldLabel:'车队电话',
			ref: '../motorcadeTel',
			name: 'motorcadeTel',
			value: p.get('motorcadeTel'),
			tabIndex: 4,
			xtype: 'textfield',
			anchor: '95%'
		});
	var cboPateName=new Ext.form.ComboBox({
			fieldLabel:'运费条款',
			tabIndex: 8,
			name: 'pateName',
			value: p.get('pateName'),
			store: HTStore.getPATE_S(),
			xtype: 'combo',
			displayField:'pateName',
			valueField: 'pateName',
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			editable:false
		});
	var numHeavyMiles=new Ext.form.NumberField({
			fieldLabel: C_HEAVY_MILES,
			name: 'heavyMiles',
			value: p.get('heavyMiles'),
			tabIndex: 12,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var numMeasurement=new Ext.form.NumberField({
			fieldLabel: C_SUM_CBM,
			name: 'measurement',
			value: p.get('measurement'),
			tabIndex: 16,
			ref: '../measurement',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var datePremiumDateTo=new Ext.form.DateField({
			fieldLabel: '保险期(到)',
			name: 'premiumDateTo',
			value: p.get('premiumDateTo'),
			tabIndex: 20,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var numPremiumExpense=new Ext.form.NumberField({
			fieldLabel: '保险费',
			name: 'premiumExpense',
			value: p.get('premiumExpense'),
			tabIndex: 21,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var dateStartDate=new Ext.form.DateField({
			fieldLabel:'发车日期',
			name: 'startDate',
			value: p.get('startDate'),
			tabIndex: 22,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateStartTime=new Ext.form.TimeField({
			fieldLabel:'发车时间',
			name: 'startTime',
			value: p.get('startTime'),
			tabIndex: 22,
			format: 'H:i:s',
			anchor: '95%'
		});
	var dateLoadDate=new Ext.form.DateField({
			fieldLabel:'提箱日期',
			name: 'loadDate',
			value: p.get('loadDate'),
			tabIndex: 23,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateLoadTime=new Ext.form.TimeField({
			fieldLabel:'提箱时间',
			name: 'loadTime',
			value: p.get('loadTime'),
			tabIndex: 22,
			format: 'H:i:s',
			anchor: '95%'
		});
	var dateArriveTime=new Ext.form.DateField({
			fieldLabel:'到货时间',
			name: 'arriveTime',
			value: p.get('arriveTime'),
			tabIndex: 23,
			xtype: 'datefield',
			format: 'Y-m-d H:i:s',
			anchor: '95%'
		});
	var dateExpiryDate=new Ext.form.DateField({
			fieldLabel:'进港日期',
			name: 'expiryDate',
			value: p.get('expiryDate'),
			tabIndex: 23,
			xtype: 'datefield',
			format: 'Y-m-d',
			anchor: '95%'
		});
	var dateExpiryTime=new Ext.form.TimeField({
			fieldLabel:'进港日期',
			name: 'expiryTime',
			value: p.get('expiryTime'),
			tabIndex: 23,
			format: 'H:i:s',
			anchor: '95%'
		});
	var dateLeaveTime=new Ext.form.DateField({
			fieldLabel:'进港日期',
			name: 'leaveTime',
			value: p.get('leaveTime'),
			tabIndex: 23,
			format: 'Y-m-d H:i:s',
			anchor: '95%'
		});
	var dateEndDate=new Ext.form.DateField({
			fieldLabel:'完成日期',
			name: 'endDate',
			value: p.get('endDate'),
			tabIndex: 23,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateEndTime=new Ext.form.TimeField({
			fieldLabel:'完成时间',
			name: 'endTime',
			value: p.get('endTime'),
			tabIndex: 23,
			format: 'H:i:s',
			anchor: '95%'
		});
	var txtRemarks=new Ext.form.TextField({
			fieldLabel: C_REMARKS,
			name: 'remarks',
			value: p.get('remarks'),
			tabIndex: 24,
			xtype: 'textfield',
			anchor: '95%'
		});
	this.save = function() {
		grid.stopEditing();
		p.beginEdit();
		/*if(!HTUtil.checkFieldNotNull('车队',cboMotorcadeName))							//车队
			return;*/
		if(!HTUtil.checkFieldNotNull('车牌号',cboVehicleNo))								//车牌号
			return;
		if(!HTUtil.checkFieldNotNull('驾驶员',cboDriverName))							//驾驶员
			return;
		p.endEdit();
		HTUtil.saveToRecord(frm,p);														//将一个容器内的字段的值更新到一条record对象中
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'TTransTask', TTransTask);								//将一条Ext.data.Record记录转换成ＸＭＬ文档
		var a = store.getModifiedRecords();												//派车装货货物STORE
		xml += HTUtil.ATX(a, 'TTaskConsign', TTaskConsign);							    //将一条Ext.data.Record记录转换成ＸＭＬ文档
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {_A: 'TTRT_S'},
			success: function(r, o) {
				var c = HTUtil.XTR(r.responseXML, 'TTransTask', TTransTask);			//将ＸＭＬ文档转换成一条Ext.data.Record记录，
				HTUtil.RU(c, p, TTransTask);											//将服务器端返回的对象更新到前台
				if (newP){
					txtTaskNo.setValue(c.get('transTaskNo'));
				}
				listStore.reload();
				var a = HTUtil.XTRA(r.responseXML, 'TTaskConsign', TTaskConsign);			//ＸＭＬ文档转换成一条Ext.data.Record记录的数组
				HTUtil.RUA(store, a, TTaskConsign);											//将服务器端返回的对象数组更新到前台
				Ext.Msg.alert(SYS, M_S);
				frm.getForm().loadRecord(p);
				//this.close();
			},
			failure: function(r, o) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	this.pickExpExcel=function(){
		EXPC('TRANS_CARGO','&sort=id&dir=DESC&transTaskId='+p.get('id')+'&dispatchFlag='+p.get('dispatchFlag'));
	};
	var pickExp = {text:'提货明细',scope:this,iconCls:'right',handler:this.pickExpExcel};
	
	var showSaveBt=new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,disabled:p.get('status')==1||p.get('status')==2,handler:this.save});
	var frm = '';
	if(p.get('dispatchFlag')==0){		//提货
		frm =new Ext.form.FormPanel({
			region:'north',height:120,layout:'column',layoutConfig:{columns:4},
			frame: false,padding:5,labelAlign:'right',
			items: [
				{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
					items: [txtTaskNo,txtPackages]
				},
				{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
					items: [cboVehicleNo,numGrossWeight]
				},
				{columnWidth:.25,layout: 'form',border: false,labelWidth:65,
					items: [cboDriverName,numMeasurement]
				},
				{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
					items: [txtDriverTel]
				},
				{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
					items: [dateStartDate]
				},
				{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
					items: [dateEndDate]
				},
				{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
					items: [txtRemarks]
				}],
				tbar: [showSaveBt,'-',
						{text:C_EXPORT,iconCls:'print',scope:this,
							menu:{items:[pickExp]}},'-'
						/*'->','-',
						{itemId: 'TB_M',xtype: 'tbtext',text: C_STATUS_C + HTStore.getTRST(p.get('status'))}*/
				]
		});
	}else if(p.get('dispatchFlag')==2){			//集装箱
		frm =new Ext.form.FormPanel({
			region:'north',height:120,layout:'column',layoutConfig:{columns:4},
			frame: false,padding:5,labelAlign:'right',
			items: [
					{columnWidth:.2,layout: 'form',border: false,labelWidth:70,
						items: [txtTaskNo,dateStartDate,dateExpiryDate]
					},
					{columnWidth:.2,layout: 'form',border: false,labelWidth:70,
						items: [cboVehicleNo,dateStartTime,dateExpiryTime]
					},
					{columnWidth:.2,layout: 'form',border: false,labelWidth:70,
						items: [cboDriverName,dateLoadDate,dateLeaveTime]
					},
					{columnWidth: .2,layout: 'form',border: false,labelWidth:80,
						items: [txtDriverTel,dateLoadTime,dateEndDate]
					},
					{columnWidth: .2,layout: 'form',border: false,labelWidth:80,
						items: [txtRemarks,dateArriveTime,dateEndTime]
					}
				],
				tbar: [showSaveBt,'-'
						/*{//输出
							text: C_EXPORT,iconCls: 'print',scope: this,
							menu: {
								items: [menu]
							}
						},*/
						/*'->','-',
						{itemId: 'TB_M',xtype: 'tbtext',text: C_STATUS_C + HTStore.getTRST(p.get('status'))}*/
				]
		});
	}
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = '';
	if(p.get('dispatchFlag')==0){			//调度提货
		 cm = new Ext.grid.ColumnModel({
			columns: [new Ext.grid.RowNumberer(),sm,
				{header:C_TRAN_NO,dataIndex:'consNo',width:120},
				{header:'手工单号',dataIndex:'consNoHandler',width:120},
				{header:'委托单位',dataIndex:'custName',width:130},
				{header:'委托人',dataIndex:'custContact',width:80},
				{header:'收货单位',dataIndex:'consigneeName',width:130},
				{header:'收货人',dataIndex:'consigneeContact',width:80},
				{header:'收货电话',dataIndex:'consigneeTel',width:120},
				{header:'收货地址',dataIndex:'deliveryAddress',width:120},
				{header:'件数',dataIndex:'packages',width:80},
				{header:'毛重(KGS)',dataIndex:'grossWeight',width:120,renderer:rateRender},
				{header:'体积(CBM)',dataIndex:'measurement',width:120,renderer:rateRender},
				{header:C_REMARKS,dataIndex:'remarks',width:100,
					editor: new Ext.form.TextField()
				}],
			defaults:{sortable:false,width:100}
		});
	}else if(p.get('dispatchFlag')==2){			//调度集装箱
		cm = new Ext.grid.ColumnModel({
			columns: [new Ext.grid.RowNumberer(),sm,
				{header:C_TRAN_NO,dataIndex:'consNo',width:120},
				{header:'手工单号',dataIndex:'consNoHandler',width:120,hidden:true},
				{header:'合同号',dataIndex:'contractNo',width:130},
				{header:'委托单位',dataIndex:'custName',width:130},
				{header:'委托人',dataIndex:'custContact',width:80},
				{header:'收货单位',dataIndex:'consigneeName',width:130},
				{header:'收货人',dataIndex:'consigneeContact',width:80},
				{header:'收货电话',dataIndex:'consigneeTel',width:120},
				{header:'收货地址',dataIndex:'deliveryAddress',width:120},
				{header:'M B/L No.',dataIndex: 'consMblNo',width: 120},
				{header:'H B/L No.',dataIndex: 'consHblNo',width: 120},
				{header:'订舱号',dataIndex: 'soNo',width: 80},
				{header:'箱型',dataIndex: 'contType',width:80},
				{header:'箱号',dataIndex:'contNo',width:120},
				{header:'封条号',dataIndex:'contSealNo',width:120},
				{header:C_REMARKS,dataIndex:'remarks',width:100,
					editor: new Ext.form.TextField()
				}],
			defaults:{sortable:false,width:100}
		});
	}
	var reCalculate = function() {
		var sumP = 0;
		var sumG = 0;
		var sumM = 0;
		var a = store.getRange();
		for (var i = 0; i < a.length; i++) {
			if (a[i].get('packages') > 0) sumP += parseInt(a[i].get('packages'));
			if (a[i].get('grossWeight') > 0) sumG += parseFloat(a[i].get('grossWeight'));
			if (a[i].get('measurement') > 0) sumM += parseFloat(a[i].get('measurement'));
		}
		p.set('packages', sumP);
		p.set('grossWeight', sumG);
		p.set('measurement', sumM);
		/*frm.packages.setValue(sumP);
		frm.grossWeight.setValue(sumG);
		frm.measurement.setValue(sumM);*/
	};
	var addCons = function(a) {
		for (var i = 0; i < a.length; i++) {
			if (store.find('consId', a[i].get('id')) == -1) {
				var t = new TTaskConsign({
					uuid: HTUtil.UUID(32),
					consId:a[i].get('id'),
					consNo: a[i].get('consNo'),
					consNoHandler:a[i].get('consNoHandler'),
					
					custId:a[i].get('custId'),
					custName:a[i].get('custName'),
					custContact:a[i].get('custContact'),
					
					consigneeId: a[i].get('consigneeId'),
					consigneeName: a[i].get('consigneeName'),
					consigneeContact: a[i].get('consigneeContact'),
					consigneeTel: a[i].get('consigneeTel'),
					
					deliveryPlaceId: a[i].get('deliveryPlaceId'),
					deliveryPlaceName: a[i].get('deliveryPlaceName'),
					deliveryCityId: a[i].get('deliveryCityId'),
					deliveryCity: a[i].get('deliveryCity'),
					deliveryAddress: a[i].get('deliveryAddress'),
					cargoName: a[i].get('cargoName'),
					packName: a[i].get('packName'),
					
					packages: a[i].get('packages'),
					grossWeight: a[i].get('grossWeight'),
					measurement: a[i].get('measurement'),
					
					consMblNo: a[i].get('consMblNo'),
					consHblNo: a[i].get('consHblNo'),
					soNo: a[i].get('soNo'),
					contType: a[i].get('contType'),
					contNo: a[i].get('contNo'),
					contSealNo: a[i].get('contSealNo'),
					
					remarks: a[i].get('remarks'),
					rowAction: 'N'
				});
				store.add(t);
			}
		}
		reCalculate();
	};
	this.addCargo = function() {
		var win = new Fos.TConsignLookup(addCons,p.get('dispatchFlag'));
		win.show();
	};
	this.delCargo = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.addCargoBt=new Ext.Button({text:C_ADD,iconCls:'add',scope:this,disabled:p.get('status')=='2',handler:this.addCargo});
	this.removeCargoBt=new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,disabled:p.get('status')=='2',handler: this.delCargo});
	this.cargoResetBt=new Ext.Button({
		text:C_RESET,iconCls:'refresh',disabled:p.get('status')=='2',handler:this.reset
	});
	//派车-提货清单
	var grid = new Ext.grid.EditorGridPanel({title:'提货清单',
		autoScroll: true,sm:sm,cm:cm,iconCls:'gen',store:store,region:'center',
		listeners: {
			scope: this,			
			afteredit: function(e) {
				var f = e.field;
				var r=e.record;
				if (f == 'packages' || f == 'grossWeight' || f == 'measurement') {
					if(r.get('packages')<r.get('consPackages')&&r.get('packages')>0){
						var grossWeight=r.get('grossWeight')/r.get('consPackages')*r.get('packages');
						r.set('grossWeight',grossWeight);
						var measurement=r.get('measurement')/r.get('consPackages')*r.get('packages');
						r.set('measurement',measurement);
					}else{
						r.set('packages',r.get('consPackages'));
						r.set('grossWeight',r.get('consGrossWeight'));
						r.set('measurement',r.get('consMeasurement'));
					}
					reCalculate();
				}
			}
		},
		tbar:[
			this.addCargoBt,'-',												//装货清单-新增
			this.removeCargoBt,'-',												//装货清单-删除
			this.cargoResetBt,'-'												//装货清单-刷新
		]
	});
	var title='';
	if(p.get('dispatchFlag')==0){
		if(p.get('rowAction') == 'N'){
			title='新增提货单';
		}else{
			title='编辑提货单';
		}
	}else if(p.get('dispatchFlag')==2){
		if(p.get('rowAction') == 'N'){
			title='新增调度单';
		}else{
			title='编辑调度单';
		}
	}
	Fos.PickUpWin.superclass.constructor.call(this, {
		title: title,
		modal: true,layout: 'border',width:1200,height:550,
		items: [frm,grid],
		bbar:[getMB(p)]
	});
};
Ext.extend(Fos.PickUpWin, Ext.Window);

//提货-集装箱-托运单
Fos.TConsignLookup = function(fn,dispatchFlag) {
	var b=[];
	b[b.length] = {key:'status',value:0,op:EQ};					//未提货
	b[b.length] = {key:'versionFlag',value:VERSION-1,op:EQ};	//业务版本
	
	var store = new Ext.data.GroupingStore({url:SERVICE_URL,
		baseParams:{_A:'TCON_Q',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(b)))},
		reader:new Ext.data.JsonReader({totalProperty: 'rowCount',root:'TConsign',id: 'id'},TConsign),
		sortInfo:{field:'consNo', direction:'DESC'},
		remoteSort:true,groupField:'consNo'
	});
	store.load({params:{start:0,limit:C_PS}});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = '';
	if(dispatchFlag==0){//提货
		 cm = new Ext.grid.ColumnModel({
			columns: [new Ext.grid.RowNumberer(), sm, 
			{header:'托运单ID',dataIndex:'consId',width:60,hidden:true},
			{header:'托运单号',dataIndex: 'consNo',width:120},
			{header:'手工单号',dataIndex:'consNoHandler',width:100},
			{header:'委托单位',dataIndex: 'custName',width:130},
			{header:'委托人',dataIndex: 'custContact',width: 80,hidden:true},
			{header:'委托人电话',dataIndex: 'custTel',width:120,hidden:true},
			{header:'委托人手机',dataIndex:'custMobile',width:120},
			
			{header:'收货单位',dataIndex: 'consigneeName',width:130},
			{header:'收货人',dataIndex: 'consigneeContact',width: 80,hidden:true},
			{header:'收货人电话',dataIndex: 'consigneeTel',width:120,hidden:true},
			{header:'收货人手机',dataIndex:'consigneeMobile',width:120},
			{header:'收货地址',dataIndex:'deliveryAddress',width:120},
			
			{header:'件数',dataIndex: 'packages',width:80},
			{header:'毛重(KGS)',dataIndex: 'grossWeight',width:80,renderer:rateRender},
			{header:'体积(CBM)',dataIndex: 'measurement',width:80,renderer:rateRender},
			
			{header:C_REMARKS,dataIndex: 'remarks',width: 100}],
			defaults:{sortable: true,width: 100}
		});
	}else if(dispatchFlag==2){//集装箱调度
		cm = new Ext.grid.ColumnModel({
			columns: [new Ext.grid.RowNumberer(), sm, 
			{header:'托运单ID',dataIndex:'consId',width:60,hidden:true},
			{header:'托运单号',dataIndex: 'consNo',width:120},
			{header:'手工单号',dataIndex:'consNoHandler',width:100,hidden:true},
			{header:'合同号',dataIndex:'contractNo',width:100},
			{header:'委托单位',dataIndex: 'custName',width:130},
			{header:'委托人',dataIndex: 'custContact',width: 80,hidden:true},
			{header:'委托人电话',dataIndex: 'custTel',width:120,hidden:true},
			{header:'委托人手机',dataIndex:'custMobile',width:120},
			
			{header:'收货单位',dataIndex: 'consigneeName',width:130},
			{header:'收货人',dataIndex: 'consigneeContact',width: 80},
			{header:'收货人电话',dataIndex: 'consigneeTel',width:120,hidden:true},
			{header:'收货人手机',dataIndex:'consigneeMobile',width:120},
			{header:'收货地址',dataIndex:'deliveryAddress',width:120},
			
			{header:'M B/L No.',dataIndex: 'consMblNo',width: 120},
			{header:'H B/L No.',dataIndex: 'consHblNo',width: 120},
			{header:'订舱号',dataIndex: 'soNo',width: 80},
			{header:'箱型',dataIndex: 'contType',width:80},
			{header:'箱号',dataIndex:'contNo',width:120},
			{header:'封条号',dataIndex:'contSealNo',width:120},
			
			
			{header:C_REMARKS,dataIndex: 'remarks',width: 100}],
			defaults:{sortable: true,width: 100}
		});
	}
	this.save = function() {
		var a = sm.getSelections();
		if (a.length>0) {
			fn(a);
			this.close();
		}else{
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
		}
	};
	this.search = function() {
		
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
	//列表分组
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]})',
		getRowClass: function(record, index) {}
	};
	var grid = new Ext.grid.GridPanel({header:false,store:store,sm:sm,cm:cm,
		view:new Ext.grid.GroupingView(vc),
		bbar:PTB(store,100)
	});
	Fos.TConsignLookup.superclass.constructor.call(this, {
		buttonAlign:'right',title:'运单列表',width:1000,height:550,modal: true,layout: 'fit',
		items:[grid],
		buttons:[
			{text: C_SAVE,iconCls: 'ok',scope: this,handler: this.save},
			{text:C_CANCEL,iconCls: 'cancel',scope: this,handler: this.close}
		]
	});
};
Ext.extend(Fos.TConsignLookup, Ext.Window);

//调度-派车-送货
Fos.TransTaskWin = function(p, listStore) {
	var store = new Ext.data.Store({url: SERVICE_URL + '?_A=TCAR_Q',baseParams:{_mt: 'json'},
		reader: new Ext.data.JsonReader({totalProperty: 'rowCount',root:'TCargo',id: 'id'},TCargo),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	if (p.get('rowAction')!='N'){
		store.load({params:{transTaskId:p.get('id')}});
	}
	this.reset=function(){							//刷新
		store.load({params:{transTaskId:p.get('id')}});
	};
	
	var bp2={_A:'RECE_SH',_mt:'xml'};
	var receiptStore = new Ext.data.Store({url:SERVICE_URL,baseParams:bp2,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TReceipt',id:'id'},TReceipt),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	if(p.get('rowAction')!='N'){
		receiptStore.load({params:{start:0,limit:C_PS30,transTaskId:p.get('id')},callback:function(){}});
	}
	
	this.reset2=function(){							//刷新
		receiptStore.baseParams=bp2;
		if(p.get('id')){
			receiptStore.reload({params:{transTaskId:p.get('id')}});
		}
	};
	
	//派车单号
	var txtTaskNo = new Ext.form.TextField({
				fieldLabel: C_TRANS_TASK_NO,
				id: 'transTaskNo',
				name: 'transTaskNo',
				value: p.get('transTaskNo'),
				disabled: true,
				tabIndex: 1,
				xtype: 'textfield',
				anchor: '95%'
			});
	//车队
	var cboMotorcadeName = new Fos.CustomerLookup({
		fieldLabel: C_MOTORCADE,
		name: 'motorcadeName',
		value: p.get('motorcadeName'),
		itemCls: 'required',
		tabIndex: 2,
		store: HTStore.getCS(),
		enableKeyEvents: true,
		tpl: custTpl,
		//itemSelector: 'div.list-item',
		listWidth: C_LW,
		xtype: 'customerLookup',
		custType: 'custTrackFlag',
		displayField: 'custCode',
		valueField: 'custNameCn',
		typeAhead: true,
		mode: 'remote',
		triggerAction: 'all',
		selectOnFocus: true,
		anchor: '95%',
		bizType: BT_T,
		emptyText: '不能为空',
		listeners: {
			scope: this,
			blur: function(f) {
				if (f.getRawValue() == '') {
					f.clearValue();
					p.set('motorcadeId', '');
					p.set('motorcadeName', '');
				}
			},
			select: function(c, r, i) {
				frm.motorcadeContact.setValue(r.get('custContact'));
				frm.motorcadeTel.setValue(r.get('custTel'));
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
	//车牌号
	var cboVehicleNo = new Ext.form.ComboBox(
			{
				fieldLabel:'车牌号',
				name: 'vehicleNo',
				value: p.get('vehicleNo'),
				tabIndex: 5,
				store: HTStore.getVehiByStatus(),
				xtype: 'combo',
				itemCls: 'required',
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
			}
	);
	//驾驶员
	var cboDriverName = new Ext.form.ComboBox(
			{
				fieldLabel: C_DRIVER,
				name: 'driverName',
				tabIndex: 6,
				store: HTStore.getDrivByStatus(),
				xtype: 'combo',
				value: p.get('driverName'),
				itemCls: 'required',
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
						if(r.get('mobile')!=''){
							txtDriverTel.setValue(r.get('mobile'));
						}
					}
				}
			}
	);
	var txtplaceFromName=new Ext.form.TextField({
		fieldLabel: C_PLACE_FROM,
			name: 'placeFromName',
			value: p.get('placeFromName'),
			tabIndex: 9,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtCargoName=new Ext.form.TextField({
		fieldLabel: C_CARGO_NAME,
			name: 'cargoName',
			value: p.get('cargoName'),
			tabIndex: 13,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtPremiumNumber=new Ext.form.TextField(
		{fieldLabel: '保单号',
			name: 'premiumNumber',
			value: p.get('premiumNumber'),
			tabIndex: 17,
			xtype: 'textfield',
			anchor: '95%'
		}
	);
	//交货地点
	var txtPlaceToName = new Ext.form.TextField({
			fieldLabel: C_PLACE_TO,
			name: 'placeToName',
			value: p.get('placeToName'),
			tabIndex: 10,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtPackages = new Ext.form.NumberField({
			fieldLabel: C_SUM_PACK,
			name: 'packages',
			value: p.get('packages'),
			tabIndex: 14,
			ref: '../packages',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var txtPremiumCompan= new Ext.form.TextField({
			fieldLabel: '保险公司',
			name: 'premiumCompany',
			value: p.get('premiumCompany'),
			tabIndex: 18,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtMotorcadeContact=new Ext.form.TextField({
			fieldLabel: C_MOTORCADE_CONTACT,
			ref: '../motorcadeContact',
			name: 'motorcadeContact',
			value: p.get('motorcadeContact'),
			tabIndex: 3,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtDriverTel=new Ext.form.TextField({
			fieldLabel: C_DRIVER_TEL,
			name: 'driverTel',
			value: p.get('driverTel'),
			tabIndex: 7,
			xtype: 'textfield',
			anchor: '95%'
		});
	var numEmptyMiles=new Ext.form.NumberField({
			fieldLabel: C_EMPTY_MILES,
			name: 'emptyMiles',
			value: p.get('emptyMiles'),
			tabIndex: 11,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var numGrossWeight=new Ext.form.NumberField({
			fieldLabel: C_SUM_GW,
			name: 'grossWeight',
			value: p.get('grossWeight'),
			tabIndex: 15,
			ref: '../grossWeight',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var datePremiumDateFrom=new Ext.form.DateField({
			fieldLabel: '保险期(从)',
			name: 'premiumDateFrom',
			value: p.get('premiumDateFrom'),
			tabIndex: 19,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var txtMotorcadeTel=new Ext.form.TextField({
			fieldLabel:'车队电话',
			ref: '../motorcadeTel',
			name: 'motorcadeTel',
			value: p.get('motorcadeTel'),
			tabIndex: 4,
			xtype: 'textfield',
			anchor: '95%'
		});
	var cboPateName=new Ext.form.ComboBox({
			fieldLabel:'运费条款',
			tabIndex: 8,
			name: 'pateName',
			value: p.get('pateName'),
			store: HTStore.getPATE_S(),
			xtype: 'combo',
			displayField:'pateName',
			valueField: 'pateName',
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			editable:false
		});
	var numHeavyMiles=new Ext.form.NumberField({
			fieldLabel: C_HEAVY_MILES,
			name: 'heavyMiles',
			value: p.get('heavyMiles'),
			tabIndex: 12,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var numMeasurement=new Ext.form.NumberField({
			fieldLabel: C_SUM_CBM,
			name: 'measurement',
			value: p.get('measurement'),
			tabIndex: 16,
			ref: '../measurement',
			xtype: 'numberfield',
			anchor: '95%'
		});
	var datePremiumDateTo=new Ext.form.DateField({
			fieldLabel: '保险期(到)',
			name: 'premiumDateTo',
			value: p.get('premiumDateTo'),
			tabIndex: 20,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var numPremiumExpense=new Ext.form.NumberField({
			fieldLabel: '保险费',
			name: 'premiumExpense',
			value: p.get('premiumExpense'),
			tabIndex: 21,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var dateStartDate=new Ext.form.DateField({
			fieldLabel:'发车日期',
			name: 'startDate',
			value: p.get('startDate'),
			tabIndex: 22,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var dateEndDate=new Ext.form.DateField({
			fieldLabel:'完成日期',
			name: 'endDate',
			value: p.get('endDate'),
			tabIndex: 23,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var txtRemarks=new Ext.form.TextField({
			fieldLabel: C_REMARKS,
			name: 'remarks',
			value: p.get('remarks'),
			tabIndex: 24,
			xtype: 'textfield',
			anchor: '95%'
		});
	//派车状态：已发车(已发运)‘1’，运输结束（已返场）‘2’
	this.tranStatus = function(s) {
		Ext.Ajax.request({scope: this,url: SERVICE_URL,method: 'POST',
			params: {_A: 'TTRT_U',id:p.get('id'),status:s},
			success: function(r) {
				if(s==1){
					showEndBt.setDisabled(false);
					showReceiptBt.setDisabled(false);
				}else if(s==2){
					this.removeCargoBt.setDisabled(true);
					this.cargoResetBt.setDisabled(true);
					this.addCargoBt.setDisabled(true);
					showEndBt.setDisabled(true);
					store.reload({params:{transTaskId: p.get('id')}});
				}
				showSaveBt.setDisabled(true);
				showStartBt.setDisabled(true);
				listStore.reload();
				store.reload({params:{transTaskId:p.get('id')}});
				Ext.Msg.alert(SYS, M_S);
			},
			failure: function(r) {
				Ext.Msg.alert(SYS, M_F + r.responseText);
			}
		});
	};
	//开始-发运‘1’
	this.start = function() {
		Ext.Msg.confirm(SYS, '您确认车辆已发运吗？',
		function(btn) {
			if (btn == 'yes') {
				this.tranStatus(1);
			}
		},
		this);
	};
	//完成-结束‘2’
	this.end = function() {
		Ext.Msg.confirm(SYS, '您确认车辆运输已结束吗？',
		function(btn) {
			if (btn == 'yes') {
				this.tranStatus(2);
			}
		},
		this);
	};
	var menu = CREATE_E_MENU(C_TRANS_BILL, this.expExcelTR, this.expEmailTR,
		function() {}
	);
	this.createReceipt = function(){
		Ext.Msg.confirm(SYS,'您确认生成回单吗？',
		function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({scope:this,
					url:SERVICE_URL,method:'POST',
					params: {_A:'TRANS_TASK_RECE_S',transTaskId:p.get('id'),transTaskNo:p.get('transTaskNo')},
					success: function(r, o) {
						showReceiptBt.setDisabled(true);
						receiptStore.reload({params:{transTaskId:p.get('id')}});
						listStore.reload();
						XMG.alert(SYS,'生成回单成功！');
					},
					failure: function(r, o) {
						Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
					}
				});
			}
		},
		this);
	};
	//保存（派车-装货）
	this.save = function() {
		grid.stopEditing();
		p.beginEdit();
		/*if(!HTUtil.checkFieldNotNull('车队',cboMotorcadeName))							//车队
			return;*/
		if(!HTUtil.checkFieldNotNull('车牌号',cboVehicleNo))								//车牌号
			return;
		if(!HTUtil.checkFieldNotNull('驾驶员',cboDriverName))							//驾驶员
			return;
		p.endEdit();
		HTUtil.saveToRecord(frm,p);														//将一个容器内的字段的值更新到一条record对象中
		var newP = (p.get('rowAction') == 'N');
		var xml = HTUtil.RTX(p, 'TTransTask', TTransTask);								//将一条Ext.data.Record记录转换成ＸＭＬ文档
		var a = store.getModifiedRecords();												//派车装货货物STORE
		xml += HTUtil.ATX(a, 'TCargo', TCargo);							    			//将一条Ext.data.Record记录转换成ＸＭＬ文档
		Ext.Ajax.request({
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {_A: 'TTRT_S'},
			success: function(r, o) {
				var c = HTUtil.XTR(r.responseXML, 'TTransTask', TTransTask);			//将ＸＭＬ文档转换成一条Ext.data.Record记录，
				HTUtil.RU(c, p, TTransTask);											//将服务器端返回的对象更新到前台
				if (newP){
					//listStore.insert(0, p);												//派车store插入一条数据
					txtTaskNo.setValue(c.get('transTaskNo'));
					this.cargoResetBt.setDisabled(false);
					showStartBt.setDisabled(false);
				}
				listStore.reload();
				var a = HTUtil.XTRA(r.responseXML, 'TCargo', TCargo);					//ＸＭＬ文档转换成一条Ext.data.Record记录的数组
				HTUtil.RUA(store, a, TCargo);											//将服务器端返回的对象数组更新到前台
				Ext.Msg.alert(SYS, M_S);
				frm.getForm().loadRecord(p);
				//this.close();
			},
			failure: function(r, o) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	var showReceiptBt=new Ext.Button({
		text:'生成回单',iconCls:'ok',disabled:p.get('rowAction')=='N'?true:false||p.get('receiptStatus')=='1',handler:this.createReceipt
	});
	var showStartBt=new Ext.Button({text:'已发车',itemId:'TB_D',iconCls:'check',disabled:p.get('status')!=0,scope:this,handler:this.start});
	var showEndBt=new Ext.Button({text:'运输结束',itemId:'TB_E',iconCls:'check',disabled:p.get('status')!=1,scope: this,handler: this.end});
	var showSaveBt=new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,disabled:p.get('status')==1||p.get('status')==2,handler:this.save});
	this.sendExpExcel=function(){
		EXPC('TRANS_SEND_CARGO','&sort=id&dir=DESC&transTaskId='+p.get('id')+'&dispatchFlag='+p.get('dispatchFlag'));
	};
	var sendExp = {text:'送货明细',scope:this,iconCls:'right',handler:this.sendExpExcel};
	var frm = new Ext.form.FormPanel({
		region:'north',height:150,layout:'column',layoutConfig:{columns:4},
		frame: false,padding:5,labelAlign:'right',
		items: [
			{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
				items: [txtTaskNo,txtPackages,numPremiumExpense]
			},
			{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
				items: [cboVehicleNo,numGrossWeight,txtPremiumCompan]
			},
			{columnWidth:.25,layout: 'form',border: false,labelWidth:65,
				items: [cboDriverName,numMeasurement,datePremiumDateFrom]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:65,
				items: [txtDriverTel,txtPremiumNumber,datePremiumDateTo]
			},
			/*{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
				items: []
			},*/
			{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
				items: [dateStartDate]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
				items: [dateEndDate]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:65,
				items: [txtRemarks]
			}],
			tbar: [showSaveBt,'-', 
				   showStartBt,'-',
				   showReceiptBt,'-',
				   showEndBt,'-',
					{text:C_EXPORT,iconCls:'print',scope:this,
							menu:{items:[sendExp]}},'-'
					/*'->','-',
					{itemId: 'TB_M',xtype: 'tbtext',text: C_STATUS_C + HTStore.getTRST(p.get('status'))}*/
			]
	});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	//派车-装货清单Grid
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(),sm,
			{header:'签收状态',dataIndex:'signInStatus',width:70,
				renderer:function(v){
					var str='';
					if(v==0){
						str='未签收';
					}else if(v==1){
						str='已签收';
					}
					return str;
				}
			},
			{header:C_TRAN_NO,dataIndex:'consNo',width:120},
			{header:'手工单号',dataIndex:'consNoHandler',width:120},
			{header:'收货单位',dataIndex:'consigneeName',width:130},
			{header:'联系人',dataIndex:'consigneeContact',width:80,hidden:true},
			{header:'联系电话',dataIndex:'consigneeTel',width:120,hidden:true},
			{header:'收货地址',dataIndex:'deliveryAddress',width:120},
			{header:'货名',dataIndex:'cargoName',width:100,editor: new Ext.form.TextField()},
			{header:'包装种类',dataIndex: 'packName',width: 100},
			{header:'委托件数',dataIndex:'consPackages',width:80},
			{header:'委托毛重(KGS)',dataIndex:'consGrossWeight',width:120,renderer:rateRender},
			{header:'委托体积(CBM)',dataIndex:'consMeasurement',width:120,renderer:rateRender},
			{header:'装车件数',dataIndex:'packages',width:80,css:ffaa66,
				editor:new Ext.form.NumberField({
					allowBlank:false
				})
			},
			{header:'装车毛重(KGS)',dataIndex:'grossWeight',width:120,css:ffaa66,renderer:rateRender},
			{header:'装车体积(CBM)',dataIndex:'measurement',width:120,css:ffaa66,renderer:rateRender},
			/*{header:'到货件数',dataIndex:'packageArrival',width:80,css:ffdd66,renderer:numRenderColor},
	  		{header:'到货毛重(KGS)',dataIndex:'grossWeightArrival',width:120,css:ffdd66,renderer:numRenderColor},
	  		{header:'到货体积(CBM)',dataIndex:'measurementArrival',width:120,css:ffdd66,renderer:numRenderColor},
	  		{header:'缺少件数',dataIndex:'packagesLack',width:80,css:ffaa88,renderer:numRenderColor},
	  		{header:'缺少毛重(KGS)',dataIndex:'grossWeightLack',width:120,css:ffaa88,renderer:numRenderColor},
	  		{header:'缺少体积(CBM)',dataIndex:'measurementLack',width:120,css:ffaa88,renderer:numRenderColor},*/
			/*{header:'毛重(KGS)承运人',dataIndex:'grossWeightProvider',width:130,renderer:rateRender,hidden:true},
			{header:'体积(CBM)承运人',dataIndex:'measurementProvider',width:130,renderer:rateRender,hidden:true},
			{header:'货物类别',dataIndex:'cargoClassName',width:120,hidden:true},
			{header:'货物价值',dataIndex:'premiumValue',width:80,renderer:rateRender,hidden:true},
			{header:'保险费率',dataIndex:'premiumRate',width:80,renderer:rateRender,hidden:true},
			{header:'保险费',dataIndex:'premiumExpense',width:80,renderer:rateRender,hidden:true},*/
			{header:C_REMARKS,dataIndex:'remarks',width:100,
				editor: new Ext.form.TextField()
			}],
		defaults:{sortable:false,width:100}
	});
	
	var reCalculate = function() {
		var sumP = 0;
		var sumG = 0;
		var sumM = 0;
		var a = store.getRange();														//store转数组
		for (var i = 0; i < a.length; i++) {
			if (a[i].get('packages') > 0) sumP += parseInt(a[i].get('packages'));
			if (a[i].get('grossWeight') > 0) sumG += parseFloat(a[i].get('grossWeight'));
			if (a[i].get('measurement') > 0) sumM += parseFloat(a[i].get('measurement'));
		}
		p.set('packages', sumP);
		p.set('grossWeight', sumG);
		p.set('measurement', sumM);
		frm.packages.setValue(sumP);
		frm.grossWeight.setValue(sumG);
		frm.measurement.setValue(sumM);
	};
	var addCargos = function(a) {
		for (var i = 0; i < a.length; i++) {
			if (store.find('consCargoId', a[i].get('id')) == -1) {
				var t = new TCargo({
					uuid: HTUtil.UUID(32),
					consCargoId:a[i].get('id'),
					consId:a[i].get('consId'),
					consNo: a[i].get('consNo'),
					consNoHandler:a[i].get('consNoHandler'),
					consigneeName: a[i].get('consigneeName'),
					consigneeContact: a[i].get('consigneeContact'),
					consigneeTel: a[i].get('consigneeTel'),
					deliveryPlaceId: a[i].get('deliveryPlaceId'),
					deliveryPlaceName: a[i].get('deliveryPlaceName'),
					deliveryCityId: a[i].get('deliveryCityId'),
					deliveryCity: a[i].get('deliveryCity'),
					deliveryAddress: a[i].get('deliveryAddress'),
					cargoName: a[i].get('cargoName'),
					packName: a[i].get('packName'),
					//从tconsignCargo中选择委托件毛体
					consPackages: a[i].get('packages'),
					consGrossWeight: a[i].get('grossWeight'),
					consMeasurement: a[i].get('measurement'),
					
					//从tconsignCargo中选择剩余件毛体
					packages: a[i].get('packagesRemainder'),
					grossWeight: a[i].get('grossWeightRemainder'),
					measurement: a[i].get('measurementRemainder'),
					
					grossWeightProvider: a[i].get('grossWeightProvider'),
					measurementProvider: a[i].get('measurementProvider'),
					cargoClassName: a[i].get('cargoClassName'),
					premiumValue: a[i].get('premiumValue'),
					premiumRate: a[i].get('premiumRate'),
					premiumExpense: a[i].get('premiumExpense'),
					remarks: a[i].get('remarks'),
					rowAction: 'N'
				});
				store.add(t);
			}
		}
		reCalculate();
	};
	this.addCargo = function() {
		var win = new Fos.TConsCargoLookup(addCargos);
		win.show();
	};
	this.delCargo = function() {
		HTUtil.REMOVE_SM(sm, store);
	};
	this.addCargoBt=new Ext.Button({text:C_ADD,iconCls:'add',scope:this,disabled:p.get('status')=='2',handler:this.addCargo});
	this.removeCargoBt=new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,disabled:p.get('status')=='2',handler: this.delCargo});
	this.cargoResetBt=new Ext.Button({
		text:C_RESET,iconCls:'refresh',disabled:p.get('rowAction')=='N'?true:false||p.get('status')=='2',handler:this.reset
	});
	//派车-装货清单
	var grid = new Ext.grid.EditorGridPanel({title:'送货清单',
		autoScroll: true,sm:sm,cm:cm,iconCls:'gen',store:store,
		listeners: {
			scope: this,
			beforeedit:function(e){
				e.cancel = e.record.get('signInStatus')==1;
			},
			afteredit: function(e) {
				var f = e.field;
				var r=e.record;
				if (f == 'packages' || f == 'grossWeight' || f == 'measurement') {
					if(r.get('packages')<r.get('consPackages')&&r.get('packages')>0){
						var grossWeight=r.get('grossWeight')/r.get('consPackages')*r.get('packages');
						r.set('grossWeight',grossWeight);
						var measurement=r.get('measurement')/r.get('consPackages')*r.get('packages');
						r.set('measurement',measurement);
					}else{
						r.set('packages',r.get('consPackages'));
						r.set('grossWeight',r.get('consGrossWeight'));
						r.set('measurement',r.get('consMeasurement'));
					}
					reCalculate();
				}
			}
		},
		tbar:[
			this.addCargoBt,'-',														//装货清单-新增
			this.removeCargoBt,'-',													//装货清单-删除
			this.cargoResetBt,'-'												//装货清单-刷新
		]
	});
	//回单管理
	var sm2 = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm2 = new Ext.grid.ColumnModel({
		columns: [
		new Ext.grid.RowNumberer(),
		sm,
		{header:boldFont('派车单号'),dataIndex: 'transTaskNo',width:120},
		{header:boldFont('托运单号'),dataIndex: 'consNo',width:120},
		{header:boldFont('手工单号'),dataIndex: 'consNoHandler',width:120},
		{header:boldFont('货物名称'),dataIndex: 'cargoName'},
		{header:boldFont('装车件数'),dataIndex: 'packages'},
		{header:boldFont('签收人'),dataIndex: 'signInContact'},
		{header:boldFont('签收日期'),dataIndex: 'signInDate',renderer:formatDate,width:120},
		{header:boldFont('签收件数'),dataIndex: 'packagesArrival'},
		{header:boldFont('异常件数'),dataIndex: 'packagesLack'},
		{header:boldFont('返单签收人'),dataIndex: 'returnSignInContact'},
		{header:boldFont('返单签收日期'),dataIndex: 'returnSignInDate',renderer:formatDate,width:120},
		{header:boldFont('备注'),dataIndex: 'remarks',width:200}
		],defaults:{sortable:false,width:100}
	});
	//回单-刷新
	var receiptResetBt=new Ext.Button({
		text:C_RESET,iconCls:'refresh',handler:this.reset2
	});
	//回单-编辑
	this.edit2=function(){
		var p =sm2.getSelected();
		if(p){
			var win = new Fos.ReceiptWin(p, receiptStore);
			win.show();
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.receiptPanel=new Ext.grid.GridPanel({title:'送货回单',autoScroll:true,sm:sm2,cm:cm2,
		store:receiptStore,closable:false,stripeRows:true,
		iconCls:'gen',
		tbar:[
			{text:C_EDIT,iconCls:'option',scope:this,handler:this.edit2},'-',
			receiptResetBt,'-'
		],
		listeners:{
			scope:this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm2.getSelected();
				if (p) {
					var win = new Fos.ReceiptWin(p, receiptStore);
					win.show();
				}
			}
		}});
	var cargoPanel=new Ext.TabPanel({activeTab:0,autoScroll:true,region:'center',items:[
		grid,this.receiptPanel
	]});
	
	Fos.TransTaskWin.superclass.constructor.call(this, {
		title: p.get('rowAction') == 'N' ? '新增送货单':'编辑送货单',
		modal: true,layout: 'border',width:1200,height:550,
		items: [frm,cargoPanel],
		bbar:[getMB(p)]
	});
};
Ext.extend(Fos.TransTaskWin, Ext.Window);

//送货对应的货物
Fos.TConsCargoLookup = function(fn) {
	var b=[];
	b[b.length] = {key:'packagesRemainder',value:1,op:GE};
	
	var store = new Ext.data.GroupingStore({url:SERVICE_URL,
		baseParams:{_A:'TCON_CAR_Q',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(b)))},
		reader:new Ext.data.JsonReader({totalProperty: 'rowCount',root:'TConsignCargo',id: 'id'},TConsignCargo),
		sortInfo:{field:'consNo', direction:'DESC'},
		remoteSort:true,groupField:'consNo'
	});
	store.load({params:{start:0,limit:C_PS}});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: false
	});
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(), sm, 
		{header:'托运单ID',dataIndex:'consId',width:60,hidden:true},
		{header:'托运单号',dataIndex: 'consNo',width:120},
		{header:'手工单号',dataIndex:'consNoHandler',width:100},
		{header:'收货单位',dataIndex: 'consigneeName',width:130},
		{header:'联系人',dataIndex: 'consigneeContact',width: 80,hidden:true},
		{header:'联系电话',dataIndex: 'consigneeTel',width:120,hidden:true},
		{header:'收货地址',dataIndex:'deliveryAddress',width:120},
		{header:'货名',dataIndex:'cargoName',width:80},
		{header:'包装种类',dataIndex: 'packName',width:80},
		
		{header:'件数',dataIndex: 'packages',width:80},
		{header:'毛重(KGS)',dataIndex: 'grossWeight',width:80,renderer:rateRender},
		{header:'体积(CBM)',dataIndex: 'measurement',width:80,renderer:rateRender},
		
		{header:'装车剩余件数',dataIndex: 'packagesRemainder',width:100,css:ffaa66},
		{header:'装车剩余毛重(KGS)',dataIndex: 'grossWeightRemainder',width:150,css:ffaa66,renderer:rateRender},
		{header:'装车剩余体积(CBM)',dataIndex: 'measurementRemainder',width:150,css:ffaa66,renderer:rateRender},
		
		/*{header:'毛重(KGS)承运人',dataIndex: 'grossWeightProvider',width: 100,renderer: rateRender,hidden:true},
		{header:'体积(CBM)承运人',dataIndex: 'measurementProvider',width: 100,renderer: rateRender,hidden:true},*/
		{header:'货物类别',dataIndex: 'cargoClassName',width: 120,hidden:true},
		{header:'货物价值',dataIndex: 'premiumValue',width: 80,renderer:rateRender,hidden:true},
		{header:'保险费率',dataIndex: 'premiumRate',width: 80,renderer:rateRender,hidden:true},
		{header:'保险费',dataIndex: 'premiumExpense',width: 80,renderer:rateRender,hidden:true},
		{header:C_REMARKS,dataIndex: 'remarks',width: 100}],
		defaults:{sortable: true,width: 100}
	});
	this.save = function() {
		var a = sm.getSelections();
		if (a.length>0) {
			fn(a);
			this.close();
		}else{
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
		}
	};
	this.search = function() {
		
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
	//列表分组
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]})',
		getRowClass: function(record, index) {}
	};
	var grid = new Ext.grid.GridPanel({header:false,store:store,sm:sm,cm:cm,
		view:new Ext.grid.GroupingView(vc),
		bbar:PTB(store,100)
	});
	Fos.TConsCargoLookup.superclass.constructor.call(this, {
		buttonAlign:'right',title:'货物列表',width:1000,height:550,modal: true,layout: 'fit',
		items:[grid],
		buttons:[
			{text: C_SAVE,iconCls: 'ok',scope: this,handler: this.save},
			{text:C_CANCEL,iconCls: 'cancel',scope: this,handler: this.close}
		]
	});
};
Ext.extend(Fos.TConsCargoLookup, Ext.Window);
