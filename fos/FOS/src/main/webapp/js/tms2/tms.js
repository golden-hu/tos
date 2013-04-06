
var getTmsPanel = function() {

	// 右侧需要显示的面板
	var panel = new Ext.TabPanel({
		region : "center",// 该面板的位置
		enableTabScroll : true,// 添加配置，当TABPANEL中tab较多时提供滚动功能，增强用户体验
		animScroll : true,// 动画标签滚动
		plugins : new Ext.ux.TabCloseMenu(),// 添加右键菜单配置，提高用户操作便捷性
		activeTab : 0,// 打开时显示第一个
		items : []
		});

	var items = [];

	// 陆运单新增
	if (HR(M1_TMS + TMS_TCON + F_M))
		items[items.length] = FosMenu(panel, C_ADD_TCONSIGN, 'TCONSIGN_ADD',
				function() {
					var p = new TConsign({
								uuid : HTUtil.UUID(32),
								rowAction : 'N',
								consBizType : BT_T,
								consBizClass : 'O',
								consDate : new Date(),
								payMethod: HTStore.getCheckPay(4),
								salesRepId : sessionStorage.getItem("USER_ID"),
								salesRepName : sessionStorage.getItem("USER_NAME"),
								grouId:HTStore.getCFG('LOG_DEFAULT_DEMPARTMENT'),
								grouName:HTStore.getCFGD('LOG_DEFAULT_DEMPARTMENT')
							});
					return new Fos.TConsignTable(p);
				});

	// 陆运单列表
	if (HR(M1_TMS + TMS_TCON))
		items[items.length] = FosMenu(panel, C_TRAN_LIST, 'TRAN', function() {
					return new Fos.TConsignGrid();
				});

	// 配送单新增
	if(HR(M1_TMS+TMS_DISTRIBUTION+F_M))
		items[items.length]	= FosMenu(panel,C_ADD_DISTRIBUTION,'DIS_ADD',function(){
					var p = new TTransTask({
								uuid : HTUtil.UUID(32),
								rowAction : 'N',
								consDate:new Date(),
								distrMethod:HTStore.getCheckDistr(2),
								consBizType : BT_T,
								consBizClass : 'P'
						});
					return new Fos.TDistributionTable(p);
		});
		
	//配送单列表
	if(HR(M1_TMS+TMS_DISTRIBUTION))
		items[items.length]= FosMenu(panel,C_DISTRIBUTION_LIST,'DIS',function(){
					return new Fos.TDistributionList();
		});
		
	// 派车单新增
	if (HR(M1_TMS + TMS_TTASK + F_M))
		items[items.length] = FosMenu(panel, C_ADD_TRANS_TASK,
				'TRANS_TASK_ADD', function() {
					var p = new TConsign({
								uuid : HTUtil.UUID(32),
								rowAction : 'N',
								consBizType : BT_T,
								consBizClass : 'T',
								consDate : new Date()
							});
					return new Fos.TransTaskTabl(p);
				});

	// 派车单列表
	if (HR(M1_TMS + TMS_TTASK))
		items[items.length] = FosMenu(panel, C_TRANS_TASK_LIST, 'TTRT',
				function() {
					return new Fos.TransTaskGrid();
				});

	// 回单管理
	if (HR(M1_TMS + TMS_RECEIPT_SETTING))
		items[items.length] = FosMenu(panel, C_RECEIPT_TRACING,
				'P_EVENTTYPERECEIPT', function() {
					return new Fos.PEventRecipteTab();
				});

	// 货物跟踪
	if (HR(M1_TMS + TMS_TRACING_SETTING))
		items[items.length] = FosMenu(panel, C_CARGO_TRACING, 'P_EVENTTYPE',
				function() {
					return new Fos.PEventTconsWin();
				});

	// 车辆跟踪
	if (HR(M1_TMS + TMS_TRANS_SETTING))
		items[items.length] = FosMenu(panel, C_TRANS_TRACING,
				'P_EVENTTYPETRANS', function() {
					return new Fos.PEventTTransTab();
				});

	// 货物日报表
	/*if (HR(M1_TMS + TMS_REPORT_SETTING))
		items[items.length] = FosMenu(panel, C_REPORT_TRACING, 'P_REPORT',
				function() {
					return new Fos.CargoReportTab();
				});*/
	
	//集装箱运输 Container transport
	/*if (HR(M1_TMS + TMS_CONTAINER_TRANS))
		items[items.length] = FosMenu(panel,C_CONTAINER_TRANS,'CONTAINER',
				function(){
					return new Fos.ContainerTransPanel();
				});*/
	
	//集装箱进口委托
	/*if(HR(M1_TMS + TMS_CONTAINER_IMPORT))
		items[items.length] = FosMenu(panel,C_CONTAINER_IMPORT,'IMPORT',
				function(){
					
					return new Fos.ImportContainerPanel();
				});*/
				
	//集装箱出口委托
	/*if(HR(M1_TMS + TMS_CONTAINER_IMPORT))
		items[items.length] = FosMenu(panel,C_CONTAINER_EXPORT,'EXPORT',
				function(){
					
					return new Fos.ExportContainerPanel();
				});	*/
				
	// 业务管理
	var bizPanel = new Ext.Panel({
				title : '业务管理',
				collapsible : true,
				layout : 'fit',
				items : new Ext.menu.Menu({
							floating : false,
							style : {
								border : '0px',
								background : 'transparent'
							},
							items : items
						}),
				iconCls : 'user'
			});
			
	items = [];
	
	// 陆运业务查询
	if (HR(M1_TMS + TMS_TCON_SETTING))
		items[items.length] = FosMenu(panel, C_TCON_TRACING, 'TCON',
				function() {
					return new Fos.TconReportTab();
				});

	// 派车业务查询
	if (HR(M1_TMS + TMS_TTRANS_SETTING))
		items[items.length] = FosMenu(panel, C_TTRANS_TRACING, 'TTRANS',
				function() {
					return new Fos.TtransReportTab();
				});
				
	//业务查询
	var reportPanel = new Ext.Panel({
				title : '业务查询',
				collapsible : true,
				layout : 'fit',
				items : new Ext.menu.Menu({
							floating : false,
							style : {
								border : '0px',
								background : 'transparent'
							},
							items : items
						}),
				iconCls : 'user'
			});		
			
	items = [];

	// 费用结算
	if (HR(M1_SET + S_COAU + '03')) {
		items[items.length] = FosMenu(panel,'陆运费用', 'TCOAU',
				function() {
					return new Fos.TConsignAuditGrid();
				});
		items[items.length] = FosMenu(panel,'派车费用', 'TCOAU',
				function() {
					return new Fos.TTransAuditGrid();
				});
	}

	// 运价管理
	if (HR(M1_TMS + TMS_PRICE))
		items[items.length] = FosMenu(panel, TRANS_PRICE_MANAGEMENT,
				'TRANS_PRICE_LIST', function() {
					return new Fos.TPriceTab();
				});

	// 商务结算
	var auditPanel = new Ext.Panel({
				title : '商务结算',
				collapsible : true,
				layout : 'fit',
				items : new Ext.menu.Menu({
							floating : false,
							style : {
								border : '0px',
								background : 'transparent'
							},
							items : items
						}),
				iconCls : 'user'
			});

	items = [];

	// 维修记录
	if (HR(M1_TMS + TMS_RELO))
		items[items.length] = FosMenu(panel, C_REPAIR_LOG, 'RELO', function() {
					return new Fos.RepairLogGrid();
				});

	// 加油记录
	if (HR(M1_TMS + TMS_OILO))
		items[items.length] = FosMenu(panel, C_OIL_LOG, 'OILO', function() {
					return new Fos.OilLogGrid();
				});

	// 事故记录
	if (HR(M1_TMS + TMS_ACCI))
		items[items.length] = FosMenu(panel, C_ACCIDENT_LOG, 'ACCI',
				function() {
					return new Fos.AccidentGrid();
				});

	// 加油卡
	if (HR(M1_TMS + TMS_OICA))
		items[items.length] = FosMenu(panel, C_OIL_CARD, 'OIL_CARD',
				function() {
					return new Fos.OilCardPanel();
				});

	// 安全车管
	var maintainPanel = new Ext.Panel({
				title : '安全车管',
				collapsible : true,
				layout : 'fit',
				items : new Ext.menu.Menu({
							floating : false,
							style : {
								border : '0px',
								background : 'transparent'
							},
							items : items
						}),
				iconCls : 'user'
			});

	items = [];

	// 车辆类型
	if (HR(M1_TMS + TMS_VEHT))
		items[items.length] = FosMenu(panel, C_VEHICLE_CLASS, 'VEHT',
				function() {
					return new Fos.VehicleClassGrid();
				});

	// 车辆管理
	if (HR(M1_TMS + TMS_VEHI))
		items[items.length] = FosMenu(panel, C_VEHICLE_MAN, 'VEHI', function() {
					return new Fos.VehicleGrid();
				});

	// 驾驶员
	if (HR(M1_TMS + TMS_DRIV))
		items[items.length] = FosMenu(panel, C_DRIVER_MAN, 'DRIV', function() {
					return new Fos.DriverGrid();
				});

	// 事故类型
	if (HR(M1_TMS + TMS_ACTY))
		items[items.length] = FosMenu(panel, C_ACCIDENT_TYPE, 'ACTY',
				function() {
					return new Fos.AccidentTypeGrid();
				});
	// 油品类型
	if (HR(M1_TMS + TMS_OITY))
		items[items.length] = FosMenu(panel, C_OIL_TYPE, 'OITY', function() {
					return new Fos.OilTypeGrid();
				});

	// 运输方式
	if (HR(M1_TMS + TMS_TRANT))
		items[items.length] = FosMenu(panel, C_TRAT, 'TRANS_TYPE', function() {
					return new Fos.TransTypeGrid();
				});

	// 加油站
	if (HR(M1_TMS + TMS_OIST))
		items[items.length] = FosMenu(panel, C_OIL_STATION, 'OIST', function() {
					return new Fos.OilStationGrid();
				});

	// 运输网点
	if (HR(M1_TMS + TMS_SITE))
		items[items.length] = FosMenu(panel, C_SITE_MANAG, 'SITE', function() {
					return new Fos.GSiteGrid();
				});

	var genPanel = new Ext.Panel({
				title : '基础设置',
				collapsible : true,
				layout : 'fit',
				items : new Ext.menu.Menu({
							floating : false,
							style : {
								border : '0px',
								background : 'transparent'
							},
							items : items
						}),
				iconCls : 'user'
			});

	// 菜单面板
	var menuPanel = new Ext.Panel({
				region : "west",
				width : 130,
				title:C_SYSTEM_MENU,
				collapsible : true,// 可折叠
				collapseMode:'mini',
				layout : 'accordion',
				split : true,// 分割
				items : [bizPanel, reportPanel,auditPanel, maintainPanel, genPanel]
			});

	// 左侧整个面板
	var contPanel = new Ext.Panel({
				layout : "border",
				border : false,
				items : [menuPanel, panel]
			});

	return contPanel;
};

Fos.TConsignSearchWin = function(action, store) {

	// 综合查询面板
	var panel = new Ext.form.FormPanel({
				height : 340,
				layout : 'column',
				title : '综合查询',
				id : 'T_CONS_LOOK_1',
				padding : 5,
				labelAlign : 'right',// 设置文本对齐格式
				items : [{
							columnWidth : .33,
							layout : 'form',
							border : false,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										fieldLabel : '陆运单号',
										name : 'consNo',
										xtype : 'textfield',
										anchor : '95%'
									}, {
										fieldLabel : '提货状态',
										name : 'status',
										tabIndex : 30,
										store : HTStore.loadStatus,
										xtype : 'combo',
										displayField : 'N',
										valueField : 'C',
										typeAhead : true,
										mode : 'local',
										triggerAction : 'all',
										anchor : '95%'
									}, {
										fieldLabel : '合同号',
										name : 'contractNo',
										anchor : '95%',
										xtype : 'textfield'
									}, {
										fieldLabel : '收货单位',
										name : 'consigneeName',
										anchor : '95%',
										xtype : 'textfield'
									}, {
										fieldLabel : '收货联系人',
										name : 'consigneeContact',
										anchor : '95%',
										xtype : 'textfield'
									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										fieldLabel : '委托单位',
										name : 'custName',
										store : HTStore.getCS(),
										enableKeyEvents : true,
										xtype : 'customerLookup',
										custType : 'custBookerFlag',
										bizType : BT_T,
										displayField : 'custNameCn',
										valueField : 'custNameCn',
										typeAhead : true,
										mode : 'local',
										tpl : custTpl,
										itemSelector : 'div.list-item',
										listWidth : C_LW,
										triggerAction : 'all',
										selectOnFocus : true,
										anchor : '95%',
										listeners : {
											scope : this,
											keydown : {
												fn : function(f, e) {
													LC(f, e, 'custBookerFlag');
												},
												buffer : 500
											}
										}
									}, {
										fieldLabel : '接单日期',
										name : 'consDate',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '合同时效',
										name : 'contractDate',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '提货日期',
										name : 'loadDate',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}]
						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										fieldLabel : '业务员',
										name : 'custContact',
										xtype : 'textfield',
										anchor : '95%'
									}, {
										fieldLabel : '日期' + C_TO,
										name : 'consDate2',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '日期' + C_TO,
										name : 'contractDate2',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '日期' + C_TO,
										name : 'loadDate2',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}]
						}]
			});

	// 以订单号查询的面板
	var panel2 = new Ext.form.FormPanel({
				plain : true,
				height : 340,
				layout : 'column',
				title : '订单编号查询',
				defaults : {
					bodyStyle : 'padding:10px'
				},
				id : 'T_CONS_LOOK_2',
				items : [{
							columnWidth : .33,
							layout : 'form',
							border : false,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										fieldLabel : '订单编号',
										name : 'orderNo',
										xtype : 'textfield',
										anchor : '95%'
									}]
						}]
			});

	this.reload = function() {
		var a = [];
		var op = 1;
		var at = tp.getActiveTab();
		if (at.getId() == 'T_CONS_LOOK_1') {
			var consNo = panel.find('name', 'consNo')[0].getValue();
			if (consNo)
				a[a.length] = new QParam({
							key : 'consNo',
							value : consNo,
							op : LI
						});

			var custName = panel.find('name', 'custName')[0].getValue();
			if (custName != '')
				a[a.length] = new QParam({
							key : 'custName',
							value : custName,
							op : op
						});

			var custContact = panel.find('name', 'custContact')[0].getValue();
			if (custContact)
				a[a.length] = new QParam({
							key : 'custContact',
							value : custContact,
							op : op
						});

			var status = panel.find('name', 'status')[0].getValue();
			if (status >= 0 && status != '') {
				a[a.length] = new QParam({
							key : 'status',
							value : status,
							op : op
						});
			}

			var consDate = panel.find('name', 'consDate')[0].getValue();
			var consDate2 = panel.find('name', 'consDate2')[0].getValue();
			if (consDate && consDate2) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : consDate.format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'consDate',
							value : consDate2.format(DATEF),
							op : LE
						});
			} else if (consDate) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : consDate.format(DATEF),
							op : GE
						});
			} else if (consDate2) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : consDate2.format(DATEF),
							op : LE
						});
			}

			var contractNo = panel.find('name', 'contractNo')[0].getValue();
			if (contractNo)
				a[a.length] = new QParam({
							key : 'contractNo',
							value : contractNo,
							op : LE
						});

			var contractDate = panel.find('name', 'contractDate')[0].getValue();
			var contractDate2 = panel.find('name', 'contractDate2')[0]
					.getValue();
			if (contractDate && contractDate2) {
				a[a.length] = new QParam({
							key : 'contractDate',
							value : contractDate.format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'contractDate',
							value : contractDate2.format(DATEF),
							op : LE
						});
			} else if (contractDate) {
				a[a.length] = new QParam({
							key : 'contractDate',
							value : contractDate.format(DATEF),
							op : GE
						});
			} else if (contractDate2) {
				a[a.length] = new QParam({
							key : 'contractDate',
							value : contractDate2.format(DATEF),
							op : LE
						});
			}

			var loadDate = panel.find('name', 'loadDate')[0].getValue();
			var loadDate2 = panel.find('name', 'loadDate2')[0].getValue();
			if (loadDate && loadDate2) {
				a[a.length] = new QParam({
							key : 'loadDate',
							value : loadDate.format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'loadDate',
							value : loadDate2.format(DATEF),
							op : LE
						});
			} else if (loadDate) {
				a[a.length] = new QParam({
							key : 'loadDate',
							value : loadDate.format(DATEF),
							op : GE
						});
			} else if (loadDate2) {
				a[a.length] = new QParam({
							key : 'loadDate',
							value : loadDate2.format(DATEF),
							op : LE
						});
			}

			var consigneeName = panel.find('name', 'consigneeName')[0]
					.getValue();
			if (consigneeName)
				a[a.length] = new QParam({
							key : 'consigneeName',
							value : consigneeName,
							op : LI
						});

			var consigneeContact = panel.find('name', 'consigneeContact')[0]
					.getValue();
			if (consigneeContact)
				a[a.length] = new QParam({
							key : 'consigneeContact',
							value : consigneeContact,
							op : LI
						});

			store.baseParams = {
				_A : action,
				_mt : 'xml',
				xml : HTUtil.HTX(HTUtil.QTX(a)),
				typeKey : '1'
			};

			store.reload({
						params : {
							start : 0,
							limit : C_PS20
						},
						callback : function(r) {
							if (r.length == 0)
								XMG.alert(SYS, M_NOT_FOUND);
						}
					});

		} else if (at.getId() == 'T_CONS_LOOK_2') {
			var orderNo = panel2.find('name', 'orderNo')[0].getValue();
			if (orderNo != '') {
				a[a.length] = new QParam({
							key : 'orderNo',
							value : orderNo,
							op : LI
						});

				store.baseParams = {
					_A : action,
					_mt : 'xml',
					xml : HTUtil.HTX(HTUtil.QTX(a)),
					orderNo : orderNo,
					typeKey : '2'
				};

				store.reload({
							params : {
								start : 0,
								limit : C_PS20
							},
							callback : function(r) {
								if (r.length == 0)
									XMG.alert(SYS, M_NOT_FOUND);
							}
						});
			} else
				Ext.Msg.alert(SYS, '请输入订单编号！');
		}
		this.close();
	};

	var tp = new Ext.TabPanel({
				id : 'T_CONS_LOOK',
				xtype : 'tabpanel',
				plain : true,
				activeTab : 1,
				defaults : {
					bodyStyle : 'padding:10px'
				},
				items : [panel2, panel]
			});

	Fos.TConsignSearchWin.superclass.constructor.call(this, {
				title : '陆运单票查询',
				iconCls : 'search',
				modal : true,
				width : 800,
				height : 320,
				buttonAlign : 'right',
				items : tp,
				buttons : [{
							text : C_OK,
							scope : this,
							handler : this.reload
						}, {
							text : C_CANCEL,
							scope : this,
							handler : this.close
						}]
			});
};
Ext.extend(Fos.TConsignSearchWin, Ext.Window);

// 派车单装载货物：选择货物
Fos.TConsignLookup = function(fn) {

	var store = new Ext.data.Store({
				url : SERVICE_URL + '?_A=TCON_CARGO_QCBS',
				baseParams : {
					_mt : 'json'
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'TConsignCargo',
							id : 'id'
						}, TConsignCargo),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	store.load({
				params : {
					start : 0,
					limit : C_PS
				}
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : C_TRAN_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 120
						}, {
							header : '货物类别',
							align : 'center',
							dataIndex : 'cargoClassName',
							width : 100
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							width : 80
						}, {
							header : C_PACK,
							align : 'center',
							dataIndex : 'packName',
							width : 80
						}, {
							header : HL('未派车件数'),
							align : 'center',
							dataIndex : 'surplusPackages',
							css : 'background:#ffb3a7;',
							width : 90
						}, {
							header : HL('未派车毛重(KGS)'),
							align : 'center',
							dataIndex : 'surplusGrossWeight',
							css : 'background:#ffb3a7;',
							width : 120,
							renderer : rateRender
						}, {
							header : HL('未派车体积(CBM)'),
							align : 'center',
							dataIndex : 'surplusVolume',
							css : 'background:#ffb3a7;',
							width : 120,
							renderer : rateRender
						}, {
							header : '货物价值',
							align : 'center',
							dataIndex : 'premiumValue',
							width : 80,
							renderer : rateRender
						}, {
							header : '收货单位',
							align : 'center',
							dataIndex : 'consigneeName',
							width : 80
						}, {
							header : '收货联系人',
							align : 'center',
							dataIndex : 'consigneeContact',
							width : 80
						}, {
							header : '收货联系方式',
							align : 'center',
							dataIndex : 'consigneeTel',
							width : 90
						}, {
							header : ' 收货地址',
							align : 'center',
							dataIndex : 'deliveryAddress',
							width : 80
						}, {
							header : C_REMARKS,
							align : 'center',
							dataIndex : 'remarks',
							width : 100
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.save = function() {
		var ra = sm.getSelections();
		if (ra) {
			fn(ra);
			this.close();
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	var grid = new Ext.grid.GridPanel({
				header : false,
				store : store,
				sm : sm,
				cm : cm,
				bbar : PTB(store, 100)
			});

	Fos.TConsignLookup.superclass.constructor.call(this, {
				buttonAlign : 'right',
				title : '装货清单',
				width : 1000,
				height : 500,
				modal : true,
				layout : 'fit',
				items : [grid],
				buttons : [{
							text : C_SAVE,
							iconCls : 'ok',
							scope : this,
							handler : this.save
						}, {
							text : C_CANCEL,
							iconCls : 'cancel',
							scope : this,
							handler : this.close
						}]
			});
};
Ext.extend(Fos.TConsignLookup, Ext.Window);

// 单件货物状态跟踪窗口
Fos.PEventConsWin = function(p) {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'PEVENT_Q',
					_mt : 'json'
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'PEvent',
							id : 'id'
						}, PEvent),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'ASC'
				}
			});

	store.load({
				params : {
					consignId : p.get('id')
				},
				scope : this
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	
	var cm = new Ext.grid.ColumnModel({
				columns : [sm, {
							header : '状态信息',
							align : 'center',
							width : 200,
							dataIndex : "typeName",
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '日期',
							align : 'center',
							dataIndex : 'trackDate',
							width : 100,
							renderer : formatDate,
							editor : new Ext.form.DateField({
										formate : DATEF
									})
						}, {
							header : '时间',
							align : 'center',
							dataIndex : 'trackTime',
							width : 100,
							editor : new Ext.form.TimeField({
										// increment:30,
										// minValue: '8:00 AM'
										format : 'H:i'
									})
						}, {
							header : '操作人',
							align : 'center',
							dataIndex : 'operatorName',
							width : 100,
							editor : new Ext.form.ComboBox({
										displayField : 'userName',
										valueField : 'userName',
										triggerAction : 'all',
										mode : 'remote',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : HTStore.getUSER_S()
									})
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.changeBu = function() {
		btnAdd.disable();
		btnRemove.disable();
		btnSave.disable();
	};

	this.addEvent = function() {
		if (p.get('status') == 7) {
			Ext.Msg.alert(SYS, '该单已到站，不能添加跟踪信息');
			this.changeBu();
		} else if (p.get('status') == 9) {
			Ext.Msg.alert(SYS, '该单已签收，不能添加跟踪信息');
			this.changeBu();
		} else {
			var r = new PEvent({
						uuid : HTUtil.UUID(32),
						bizType : 'T',
						status : '0',
						version : '0',
						rowAction : 'N',
						consignId : p.get('id'),
						operatorName : p.get('consOperatorName'),
						trackDate : new Date()
					});
			grid.stopEditing();
			store.insert(0, r);
			grid.startEditing(store.getRange().length - 1, 1);
		}
	};

	this.save = function() {
		grid.stopEditing();
		HTUtil.POST(store, 'PEvent', PEvent, 'PEVENT_TS');
	};

	this.del = function() {
		if (p.get('status') >= 7) {
			Ext.Msg.alert(SYS, '该单的跟踪信息不能被删除！');
			this.changeBu();
		} else {
			HTUtil.REMOVE_SM(sm, store);
			HTUtil.POST(store, 'PEvent', PEvent, 'PEVENT_TS');
		}
	};

	var m = M1_TMS + TMS_VEHT;

	btnAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				disabled : NR(m + F_M),
				scope : this,
				handler : this.addEvent
			});

	btnRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				disabled : NR(m + F_R),
				scope : this,
				handler : this.del
			});

	btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				disabled : NR(m + F_M),
				scope : this,
				handler : this.save
			});

	var grid = new Ext.grid.EditorGridPanel({
				id : 'G_EVENT',
				border : true,
				height : 400,
				autoScroll : true,
				clicksToEdit : 1,
				// plugins : [ff],
				stripeRows : true,
				store : store,
				sm : sm,
				cm : cm,
				tbar : [btnAdd, '-', btnRemove, '-', btnSave]
			});

	Fos.PEventConsWin.superclass.constructor.call(this, {
				iconCls : 'PEvent',
				title : '跟踪状态' + '-' + p.get('consNo'),
				modal : true,
				width : 600,
				height : 400,
				items : grid
			});
};
Ext.extend(Fos.PEventConsWin, Ext.Window);

// 批量货物状态查询跟踪窗口
 Fos.PEventTconsWin = function() {

	var store1 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TCON_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TConsign',
							id : 'id'
						}, TConsign),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	store1.load({
				params : {
					start : 0,
					limit : C_PS20
				},
				callback : function(r) {
					if (r.length == 0)
						XMG.alert(SYS, M_NOT_FOUND);
				}
			});

	var store2 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'PEVENT_Q',
					_mt : 'json'
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'PEvent',
							id : 'id'
						}, PEvent),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	// 陆运单号
	var txtConsNo = new Ext.form.TextField({
				fieldLabel : '陆运单号',
				anchor : '95%',
				tabIndex : 1,
				name : 'consNo',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboCustName.focus();
						}
					}
				}
			});

	// 委托单位
	var cboCustName = new Fos.CustomerLookup({
				fieldLabel : '委托单位',
				tabIndex : 2,
				id : 'comboCust',
				anchor : '95%',
				name : 'custName',
				enableKeyEvents : true,
				displayField : 'custNameCn',
				valueField : 'custNameCn',
				store : HTStore.getCS(),
				custType : 'custBookerFlag',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				bizType : BT_T,
				tpl : custTpl,
				itemSelector : 'div.list-item',
				listWidth : C_LW,
				listeners : {
					scope : this,
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								dtConsDate.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 接单日期从
	var dtConsDate = new Ext.form.DateField({
				fieldLabel : '接单日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 3,
				name : 'consDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtConsDate2.focus();
						}
					}
				}
			});

	// 至接单日期
	var dtConsDate2 = new Ext.form.DateField({
				fieldLabel : C_TO,
				anchor : '95%',
				format : DATEF,
				tabIndex : 4,
				name : 'consDate2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboShipperContact.focus();
						}
					}
				}
			});

	// 发货人
	var cboShipperContact = new Ext.form.TextField({
				fieldLabel : '发货联系人',
				anchor : '95%',
				name : 'shipperContact',
				tabIndex : 5,
				displayField : 'custContact',
				valueField : 'custContact',
				store : HTStore.getCUCOS(),
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtConsigneeContact.focus();
						}
					}
				}
			});

	// 收货人
	var txtConsigneeContact = new Ext.form.TextField({
				fieldLabel : '收货联系人',
				anchor : '95%',
				tabIndex : 6,
				name : 'consigneeContact',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtStartStation.focus();
						}
					}
				}
			});

	// 发货地
	var txtStartStation = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '发货点',
				tabIndex : 7,
				name : 'startStation',
				displayField : 'startStation',
				valueField : 'startStation',
				store : HTStore.getStation('TMS_STARTSTATION_Q'),
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('startStation'));
					},
					keyup : {
						fn : function(f, e) {
							listStartStation(f, e);
							if (e.getKey() == e.ENTER) {
								txtEndStation.focus();
							}
						},
						buffer : BF
					},
					afterrender : function(combo) {
						combo.getStore().load({
									callback : function() {
										combo.getStore().removeAll();
									}
								});
					}
				}
			});

	// 目的地
	var txtEndStation = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '收货点',
				tabIndex : 8,
				name : 'endStation',
				store : HTStore.getStation('TMS_ENDSTATION_Q'),
				displayField : 'endStation',
				valueField : 'endStation',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('endStation'));
					},
					keyup : {
						fn : function(f, e) {
							listEndStation(f, e);
						},
						buffer : BF
					},
					afterrender : function(combo) {
						combo.getStore().load({
									callback : function() {
										combo.getStore().removeAll();
									}
								});
					}
				}
			});

	/*
	 * var nullLabel = new Ext.form.Label({ fieldLabel : '&nbsp', labelSeparator :
	 * '', name : 'nullLabel', anchor : '95%' });
	 */

	this.search = function() {
		if (txtConsNo.getValue() == ''
				&& Ext.getCmp("comboCust").getRawValue() == ''
				&& dtConsDate.getValue() == '' && dtConsDate2.getValue() == ''
				&& cboShipperContact.getValue() == ''
				&& txtConsigneeContact.getValue() == ''
				&& txtStartStation.getValue() == ''
				&& txtEndStation.getValue() == '') {

			Ext.Msg.alert(SYS, '请输入查询条件！');

			store1.baseParams = {
				_A : 'TRANK_SEARCH',
				_mt : 'xml'
			};

			store1.reload({
						params : {
							start : 0,
							limit : C_PS20
						},
						callback : function(r) {
							if (r.length == 0)
								XMG.alert(SYS, M_NOT_FOUND);
						}
					});

		} else {
			var a = [];
			var op = 1;

			if (txtConsNo.getValue())
				a[a.length] = new QParam({
							key : 'consNo',
							value : txtConsNo.getValue(),
							op : LI
						});

			if (Ext.getCmp("comboCust").getRawValue() != '')
				a[a.length] = new QParam({
							key : 'custName',
							value : Ext.getCmp("comboCust").getRawValue(),
							op : op
						});

			if (dtConsDate.getValue() && dtConsDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (dtConsDate.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtConsDate2.getValue())
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate2.getValue().format(DATEF),
							op : LE
						});

			if (cboShipperContact.getValue())
				a[a.length] = new QParam({
							key : 'shipperContact',
							value : cboShipperContact.getValue(),
							op : LI
						});

			if (txtConsigneeContact.getValue())
				a[a.length] = new QParam({
							key : 'consigneeContact',
							value : txtConsigneeContact.getValue(),
							op : LI
						});

			if (txtStartStation.getValue())
				a[a.length] = new QParam({
							key : 'startStation',
							value : txtStartStation.getValue(),
							op : op
						});

			if (txtEndStation.getValue())
				a[a.length] = new QParam({
							key : 'endStation',
							value : txtEndStation.getValue(),
							op : op
						});

			store1.baseParams = {
				_A : 'TRANK_SEARCH',
				_mt : 'xml',
				xml : HTUtil.HTX(HTUtil.QTX(a))
			};

			store1.reload({
						params : {
							start : 0,
							limit : C_PS20
						},
						callback : function(r) {
							if (r.length == 0)
								XMG.alert(SYS, M_NOT_FOUND);
						}
					});
		}
	};

	var search = new Ext.Button({
				text : '查询',
				anchor : '45%',
				scope : this,
				handler : this.search
			});

	var reset = new Ext.Button({
				text : '取消',
				anchor : '45%',
				scope : this,
				handler : function() {
					txtConsNo.setValue('');
					cboCustName.setValue('');
					dtConsDate.setValue('');
					dtConsDate2.setValue('');
					cboShipperContact.setValue('');
					txtConsigneeContact.setValue('');
					txtStartStation.setValue('');
					txtEndStation.setValue('');
				}
			});

	var upFrm = new Ext.form.FormPanel({
				title : '查询条件',
				region : 'north',
				layout : 'column',
				height : 130,
				padding : 5,
				collapsible : true,
				labelWidth : 80,
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtConsNo, cboShipperContact]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboCustName, txtConsigneeContact]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtConsDate, txtStartStation]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtConsDate2, txtEndStation]
						}],
				buttons : [search, reset]
			});

	// 根据陆运单状态判断跟踪信息按钮
	this.changeButton = function(p) {
		var p = sm1.getSelected();

		if (p.get('status') <= 5) {
			btnAdd.enable();
			btnRemove.enable();
			btnSave.enable();
			btnStation.enable();
			btnSign.enable();
		}

		if (p.get('status') == 6) {
			btnAdd.disable();
			btnRemove.disable();
			btnSave.disable();
			btnStation.enable();
			btnSign.enable();
		}
		
		if (p.get('status') == 7) {
			btnAdd.disable();
			btnRemove.disable();
			btnSave.disable();
			btnStation.disable();
			btnSign.enable();
		}

		if (p.get('status') == 8) {
			btnAdd.disable();
			btnRemove.disable();
			btnSave.disable();
			btnStation.disable();
			btnSign.enable();
		}
		
		if (p.get('status')== 9) {
			btnAdd.disable();
			btnRemove.disable();
			btnSave.disable();
			btnStation.disable();
			btnSign.disable();
		}
	};

	var sm1 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true,
				listeners : {
					scope : this,
					rowselect : function(t, i, r) {
						if (r) {
							btnAdd.enable();
							btnRemove.enable();
							btnSave.enable();
							btnStation.enable();
							btnSign.enable();
							store2.removeAll();
							store2.reload({
										scope : this,
										params : {
											consignId : r.get('id')
										}
									});
						}
					}
				}
			});

	var cm1 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm1, {
							header : C_STATUS,
							align : 'center',
							dataIndex : 'status',
							renderer : HTStore.loadStatusRender,
							width : 80
						}, {
							header : C_TRAN_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 150
						}, {
							header : '接单日期',
							align : 'center',
							dataIndex : 'consDate',
							renderer : formatDate,
							width : 100
						}, {
							header : C_BOOKER,
							align : 'center',
							dataIndex : 'custName',
							width : 150
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	var westGrid = new Ext.grid.GridPanel({
				title : '陆运单列表',
				closable : true,
				region : 'west',
				store : store1,
				sm : sm1,
				cm : cm1,
				loadMask : true,
				height : 400,
				width : 600,
				autoScroll : true,
				bbar : PTB(store1, C_PS20)
			});

	var sm2 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});

	var cm2 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm2, {
							header : '状态信息',
							align : 'center',
							dataIndex : 'typeName',
							width : 200,
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : ''
									})
						}, {
							header : '日期',
							align : 'center',
							dataIndex : 'trackDate',
							width : 100,
							renderer : formatDate,
							editor : new Ext.form.DateField({
										formate : DATEF
									})
						}, {
							header : '时间',
							align : 'center',
							dataIndex : 'trackTime',
							width : 100,
							editor : new Ext.form.TimeField({
										format : 'H:i'
									})
						}, {
							header : '操作人',
							align : 'center',
							dataIndex : 'operatorName',
							width : 100,
							editor : new Ext.form.ComboBox({
										displayField : 'userName',
										valueField : 'userName',
										triggerAction : 'all',
										mode : 'remote',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : HTStore.getUSER_S()
									})
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.btnCondition = function(s) {
		var a = sm1.getSelected();
		if (a) {
			var xml = HTUtil.RTX(a, 'TConsign', TConsign);
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TCONS_COS',
							status : s
						},
						success : function(r) {
							var c = HTUtil.XTR(r.responseXML, 'TConsign',
									TConsign);
							HTUtil.RU(c, a, TConsign);
							this.changeButton(a);
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, M_F);
						},
						xmlData : HTUtil.HTX(xml)
					});
		}
	};

	var addFun = function() {
		var p = sm1.getSelected();
		if (p.get('status') == 7) {
			Ext.Msg.confirm(SYS, '该单已到站，不需添加跟踪信息！', function(btn) {
						if (btn == 'yes') {
							this.changeButton(7);
						}
					}, this);
		} else if (p.get('status') ==9) {
			Ext.Msg.confirm(SYS, '该单已签收，不需添加跟踪信息！', function(btn) {
						if (btn == 'yes') {
							this.changeButton(9);
						}
					}, this);
		} else {
			var r = new PEvent({
						uuid : HTUtil.UUID(32),
						bizType : 'T',
						status : '0',
						version : '0',
						rowAction : 'N',
						consignId : p.get('id'),
						operatorName : sessionStorage.getItem("USER_NAME"),
						trackDate : new Date()
					});

			store2.insert(0, r);
			sm2.selectFirstRow();
			centerGrid.startEditing(0, 1);
		}
	};

	var btnAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				disabled : true,
				scope : this,
				handler : addFun
			});

	var removeFun = function() {
		var p = sm2.getSelected();
		var p1 = sm1.getSelected();
		if (p) {
			if (p1.get('status') >= 6) {
				Ext.Msg.confirm(SYS, '该单的跟踪信息不能被删除！', function(btn) {
							if (btn == 'yes') {
								this.changeButton(p1.get('status'));

							}
						}, this);
			} else {
				Ext.Msg.confirm(SYS, '是否确定删除该单的这条跟踪信息？', function(btn) {
							if (btn == 'yes') {
								HTUtil.REMOVE_SM(sm2, store2);
								HTUtil.POST(store2, 'PEvent', PEvent,
										'PEVENT_TS');
							}
						}, this);
			}
		} else {
			Ext.Msg.alert(SYS, '请选择一条数据！');
		}
	};

	var btnRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				disabled : true,
				scope : this,
				handler : removeFun
			});

	var saveFun = function() {
		centerGrid.stopEditing();
		HTUtil.POST(store2, 'PEvent', PEvent, 'PEVENT_TS');
	};

	var btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				disabled : true,
				scope : this,
				handler : saveFun
			});

	var stationFun = function() {
		var p1 = sm1.getSelected();
		if (p1.get('status') < 4) {
			Ext.Msg.alert(SYS, '该单还不能进行此项操作！');
			btnStation.disable();
			btnSign.disable();
		}
		if (p1.get('status') > 4 && p1.get('status')<7) {
			Ext.Msg.confirm(SYS, '请确定是否添加"全部到站"状态跟踪？', function(btn) {
						if (btn == 'yes') {
							this.btnCondition(7);
							var p = sm1.getSelected();
							var r = new PEvent({
										uuid : HTUtil.UUID(32),
										bizType : 'T',
										status : '0',
										version : '0',
										rowAction : 'N',
										consignId : p.get('id'),
										typeName : '全部到站',
										operatorName : p
												.get('consOperatorName'),
										trackDate : new Date()
									});
							centerGrid.stopEditing(); // 停止EditorGridPanel编辑
							store2.add(r);
							centerGrid.startEditing(store2.getRange().length
											- 1, 1);// 光标在的行列
							HTUtil.POST(store2, 'PEvent', PEvent, 'PEVENT_TS');
						}
					}, this);
		}
		if (p1.get('status') == 7) {
			Ext.Msg.alert(SYS, '该单已全部到站，不能添加跟踪信息');
			this.changeButton(7);
		}
		if (p1.get('status') == 8) {
			Ext.Msg.alert(SYS, '该单已部分签收，不能添加跟踪信息');
			this.changeButton(8);
		}
		if (p1.get('status') == 9) {
			Ext.Msg.alert(SYS, '该单已全部签收，不能添加跟踪信息');
			this.changeBut(9);
		}
	};

	var btnStation = new Ext.Button({
				text : '到站',
				iconCls : 'check',
				disabled : true,
				scope : this,
				handler : stationFun
			});

	var signFun = function() {
		var p1 = sm1.getSelected();
		if (p1.get('status') <=6 ) {
			Ext.Msg.alert(SYS, '该单还不能进行此项操作');
			btnSign.disable();
		}
		if (p1.get('status') == 7||p1.get('status') ==8) {
			Ext.Msg.confirm(SYS, '请确定是否添加"全部签收"状态跟踪？', function(btn) {
						if (btn == 'yes') {
							this.btnCondition(5);
							var p = sm1.getSelected();
							var r = new PEvent({
										uuid : HTUtil.UUID(32),
										bizType : 'T',
										status : '0',
										version : '0',
										rowAction : 'N',
										consignId : p.get('id'),
										typeName : '已签收',
										operatorName : p
												.get('consOperatorName'),
										trackDate : new Date()
									});
							centerGrid.stopEditing();
							store2.add(r);
							centerGrid.startEditing(store2.getRange().length
											- 1, 1);
							HTUtil.POST(store2, 'PEvent', PEvent, 'PEVENT_TS');
						}
					}, this);
		}
		if (p1.get('status') == 9) {
			Ext.Msg.alert(SYS, '该单已全部签收，不能添加跟踪信息');
			this.changeButton(5);
		}
	};

	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				disabled : true,
				scope : this,
				handler : signFun
			});

	var centerGrid = new Ext.grid.EditorGridPanel({
				title : '跟踪记录',
				closable : true,
				region : 'center',
				store : store2,
				sm : sm2,
				cm : cm2,
				height : 400,
				clicksToEdit : 1,
				stripeRows : true,
				autoScroll : true,
				tbar : [btnAdd, '-', btnRemove, '-', btnSave, '-', btnStation,
						'-', btnSign]
			});

	Fos.PEventTconsWin.superclass.constructor.call(this, {
				id : 'P_EVENTTYPE',
				title : C_CARGO_TRACING,
				closable : true,
				modal : true,
				layout : 'border',
				items : [upFrm, westGrid, centerGrid]
			});
};
Ext.extend(Fos.PEventTconsWin, Ext.Panel);

// 回单跟踪
Fos.PEventRecipteTab = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TRECEIPT_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TReceipt',
							id : 'id'
						}, TReceipt),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'DESC'
				}
			});

	store.load({
				params : {
					start : 0,
					limit : C_PS20
				},
				callback : function(r) {
					if (r.length == 0)
						XMG.alert(SYS, M_NOT_FOUND);
				}
			});

	// 陆运单号
	var txtConsNo = new Ext.form.TextField({
				fieldLabel : '陆运单号',
				anchor : '95%',
				tabIndex : 1,
				name : 'consNo',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtConsNoHandler.focus();
						}
					}
				}
			});

	// 手工单号
	var txtConsNoHandler = new Ext.form.TextField({
				anchor : '95%',
				fieldLabel : '手工单号',
				tabIndex : 2,
				typeAhead : true,
				name : 'consNoHandler',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtConsDate.focus();
						}
					}
				}
			});

	// 接单日期从
	var dtConsDate = new Ext.form.DateField({
				fieldLabel : '接单日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 3,
				name : 'consDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtConsDate2.focus();
						}
					}
				}
			});

	// 至接单日期
	var dtConsDate2 = new Ext.form.DateField({
				fieldLabel : C_TO,
				anchor : '95%',
				format : DATEF,
				tabIndex : 4,
				name : 'consDate2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtFeedbackStatus.focus();
						}
					}
				}
			});

	// 回单状态
	var txtFeedbackStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '回单状态',
				tabIndex : 5,
				id : 'statusId',
				name : 'receiptStatus',
				mode : 'local',
				store : HTStore.loadReceiptStatus,
				displayField : 'N',
				valueField : 'C',
				enableKeyEvents : true,
				typeAhead : true,
				triggerAction : 'all',
				selectOnFocus : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDemageStatus.focus();
						}
					}
				}
			});

	// 是否破损
	var txtDemageStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '是否破损',
				tabIndex : 6,
				name : 'demageFlag',
				mode : 'local',
				store : HTStore.getDEMAGE_S,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFeedbackDate.focus();
						}
					}
				}
			});

	// 回单日期从
	var dtFeedbackDate = new Ext.form.DateField({
				fieldLabel : '回单日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 7,
				name : 'receiptDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFeedbackDate2.focus();
						}
					}
				}
			});

	// 至回单日期
	var dtFeedbackDate2 = new Ext.form.DateField({
				fieldLabel : C_TO,
				anchor : '95%',
				format : DATEF,
				tabIndex : 8,
				name : 'receiptDate2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtStartStation.focus();
						}
					}
				}
			});

	// 发货地
	var txtStartStation = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '发货点',
				tabIndex : 9,
				name : 'startStation',
				displayField : 'startStation',
				valueField : 'startStation',
				store : HTStore.getStation('TMS_STARTSTATION_Q'),
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('startStation'));
					},
					keyup : {
						fn : function(f, e) {
							listStartStation(f, e);
							if (e.getKey() == e.ENTER) {
								txtEndStation.focus();
							}
						},
						buffer : BF
					},
					afterrender : function(combo) {
						combo.getStore().load({
									callback : function() {
										combo.getStore().removeAll();
									}
								});
					}
				}
			});

	// 目的地
	var txtEndStation = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '收货点',
				tabIndex : 10,
				name : 'endStation',
				store : HTStore.getStation('TMS_ENDSTATION_Q'),
				displayField : 'endStation',
				valueField : 'endStation',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('endStation'));
					},
					keyup : {
						fn : function(f, e) {
							listEndStation(f, e);
						},
						buffer : BF
					},
					afterrender : function(combo) {
						combo.getStore().load({
									callback : function() {
										combo.getStore().removeAll();
									}
								});
					}
				}
			});

	// 签收日期从
	var dtSignInDate = new Ext.form.DateField({
				fieldLabel : '签收日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 11,
				name : 'signatureDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtConsDate2.focus();
						}
					}
				}
			});

	// 至签收日期
	var dtSignInDate2 = new Ext.form.DateField({
				fieldLabel : C_TO,
				anchor : '95%',
				format : DATEF,
				tabIndex : 12,
				name : 'signatureDate2'
			});

	this.search = function() {

		if (txtConsNo.getValue() == '' && txtConsNoHandler.getValue() == ''
				&& dtConsDate.getValue() == '' && dtConsDate2.getValue() == ''
				&& Ext.getCmp("statusId").getRawValue() == ''
				&& txtDemageStatus.getValue() == ''
				&& dtFeedbackDate.getValue() == ''
				&& dtFeedbackDate2.getValue() == ''
				&& txtStartStation.getValue() == ''
				&& txtEndStation.getValue() == ''
				&& dtSignInDate.getValue() == ''
				&& dtSignInDate2.getValue() == '') {
			Ext.Msg.alert(SYS, '请输入查询条件！');

			store.baseParams = {
				_A : 'TRECEIPT_Q',
				_mt : 'xml'
			};

			store.reload({
						params : {
							start : 0,
							limit : C_PS20
						},
						callback : function(r) {
							if (r.length == 0)
								XMG.alert(SYS, M_NOT_FOUND);
						}
					});

		} else {

			var a = [];
			var op = 1;

			if (txtConsNo.getValue())
				a[a.length] = new QParam({
							key : 'consNo',
							value : txtConsNo.getValue(),
							op : LI
						});

			if (txtConsNoHandler.getValue())
				a[a.length] = new QParam({
							key : 'consNoHandler',
							value : txtConsNoHandler.getValue(),
							op : LI
						});

			if (dtConsDate.getValue() && dtConsDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'consDate2',
							value : dtConsDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (dtConsDate.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtConsDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate2',
							value : dtConsDate2.getValue().format(DATEF),
							op : LE
						});
			}

			if (Ext.getCmp("statusId").getRawValue() != '')
				a[a.length] = new QParam({
							key : 'receiptStatus',
							value : txtFeedbackStatus.getValue(),
							op : op
						});

			if (txtDemageStatus.getValue())
				a[a.length] = new QParam({
							key : 'demageFlag',
							value : txtDemageStatus.getValue(),
							op : op
						});
			if (dtFeedbackDate.getValue() && dtFeedbackDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'receiptDate',
							value : dtFeedbackDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'receiptDate2',
							value : dtFeedbackDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (dtFeedbackDate.getValue()) {
				a[a.length] = new QParam({
							key : 'receiptDate',
							value : dtFeedbackDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtFeedbackDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'receiptDate2',
							value : dtFeedbackDate2.getValue().format(DATEF),
							op : LE
						});
			}

			if (txtStartStation.getValue())
				a[a.length] = new QParam({
							key : 'startStation',
							value : txtStartStation.getValue(),
							op : op
						});

			if (txtEndStation.getValue())
				a[a.length] = new QParam({
							key : 'endStation',
							value : txtEndStation.getValue(),
							op : op
						});

			if (dtSignInDate.getValue() && dtSignInDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'signatureDate',
							value : dtSignInDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'signatureDate2',
							value : dtSignInDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (dtSignInDate.getValue()) {
				a[a.length] = new QParam({
							key : 'signatureDate',
							value : dtSignInDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtSignInDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'signatureDate2',
							value : dtSignInDate2.getValue().format(DATEF),
							op : LE
						});
			}

			store.baseParams = {
				_A : 'TRECEIPT_Q',
				_mt : 'xml',
				xml : HTUtil.HTX(HTUtil.QTX(a))
			};

			store.reload({
						params : {
							start : 0,
							limit : C_PS20
						},
						callback : function(r) {
							if (r.length == 0)
								XMG.alert(SYS, M_NOT_FOUND);
						}
					});
		}
	};

	var search = new Ext.Button({
				text : '查询',
				scope : this,
				handler : this.search
			});

	var reset = new Ext.Button({
				text : '取消',
				scope : this,
				/*
				 * minWidth : 100, style : { marginTop : '10px', marginBottom :
				 * '10px', marginLeft : '2px' ,marginRight:'10px' }, 设置按钮样式
				 */
				handler : function() {
					upFrm.getForm().reset();
					txtFeedbackStatus.clearValue();
					txtDemageStatus.clearValue();
				}
			});

	var upFrm = new Ext.form.FormPanel({
				title : '查询条件',
				region : 'north',
				layout : 'column',
				height : 160,
				collapsible : true,
				padding : 5,
				labelWidth : 80,
				layoutConfig : {
					columns : 4
				},
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtConsNo, txtFeedbackStatus,
									txtStartStation]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtConsNoHandler, txtDemageStatus,
									txtEndStation]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtConsDate, dtFeedbackDate, dtSignInDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtConsDate2, dtFeedbackDate2,
									dtSignInDate2]
						}],
				buttons : [search, reset]
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), sm, {
					header : C_TRAN_NO,
					align : 'center',
					dataIndex : 'consNo',
					width : 120,
					editable : false,
					editor : new Ext.form.TextField({
								allowBlank : false,
								emptyText : ''
							})
				}, {
					header : C_TRANS_TASK_NO,
					align : 'center',
					dataIndex : 'transTaskNo',
					width : 120,
					editable : false,
					editor : new Ext.form.TextField({
								allowBlank : false,
								emptyText : ''
							})
				}, {
					header : C_BOOKER,
					align : 'center',
					dataIndex : 'custName',
					width : 150,
					editable : false,
					editor : new Ext.form.ComboBox({
								displayField : 'custNameCn',
								valueField : 'custNameCn',
								triggerAction : 'all',
								mode : 'local',
								selectOnFocus : true,
								listClass : 'x-combo-list-small',
								store : HTStore.getCS()
							})
				}, {
					header : '接单日期',
					align : 'center',
					dataIndex : 'consDate',
					width : 100,
					editable : false,
					editor : new Ext.form.DateField({
								format : DATEF
							})
				}, {
					header : '提货日期',
					align : 'center',
					dataIndex : 'loadDate',
					renderer : formatDate,
					width : 100,
					editor : new Ext.form.DateField({
								format : DATEF
							})
				}, {
					header : '到站日期',
					align : 'center',
					dataIndex : 'delivebyDate',
					renderer : formatDate,
					width : 100,
					editor : new Ext.form.DateField({
								format : DATEF
							})
				}, {
					header : '签收日期',
					align : 'center',
					dataIndex : 'signatureDate',
					renderer : formatDate,
					width : 100,
					editor : new Ext.form.DateField({
								format : DATEF
							})
				}, {
					header : '签收人',
					align : 'center',
					dataIndex : 'signatureBy',
					width : 80,
					editor : new Ext.form.TextField({
								allowBlank : false,
								emptyText : '',
								listeners : {
									scope : this,
									change : function(t, n, o) {
										if (n) {
											var p = sm.getSelected();
											if (p.get('receiptStatus') < 1) {
												p.set('receiptStatus', 1);
												p.set('signatureDate',
														new Date());
											}
										}
									}
								}
							})
				}, {
					header : '回单返回日期',
					align : 'center',
					dataIndex : 'receiptDate',
					renderer : formatDate,
					width : 100,
					editor : new Ext.form.DateField({
						format : DATEF,
						listeners : {
							scope : this,
							select : function(t, d) {
								if (d) {
									var p = sm.getSelected();
									if (p.get('signatureBy') == ''
											|| p.get('signatureDate') == ''
											|| p.get('receiptStatus') < 1) {
										Ext.Msg.confirm(SYS, '该单还不能进行此项操作，请取消',
												function(btn) {
													if (btn == 'yes'
															|| btn == 'no') {
														p
																.set(
																		'receiptDate',
																		'');
													}
												}, this);
									} else if (p.get('receiptStatus') == 1) {
										p.set('receiptStatus', 2);
									}
								}
							}
						}
					})
				}, {
					header : '回单状态',
					align : 'center',
					dataIndex : 'receiptStatus',
					width : 80,
					editable : false,
					renderer : HTStore.loadReceiptStatusRender,
					editor : new Ext.form.ComboBox({
								displayField : 'N',
								valueField : 'C',
								triggerAction : 'all',
								selectOnFocus : true,
								listClass : 'x-combo-list-small',
								mode : 'local',
								store : HTStore.loadReceiptStatus
							})
				}, {
					header : '是否破损、异常',
					align : 'center',
					dataIndex : 'demageStatus',
					width : 120,
					renderer : HTStore.getCheckDemage,
					editor : new Ext.form.ComboBox({
								mode : 'local',
								displayField : 'N',
								valueField : 'C',
								triggerAction : 'all',
								selectOnFocus : true,
								listClass : 'x-combo-list-small',
								store : HTStore.getDEMAGE_S
							})
				}, {
					header : '异常描述',
					align : 'center',
					dataIndex : 'demageRemarks',
					width : 120,
					editor : new Ext.form.TextArea({
								allowBlank : false,
								emptyText : ''
							})
				}],
		defaults : {
			sortable : false,
			width : 100
		}
	});

	this.save = function() {
		var ra = sm.getSelections();
		var a = [];
		if (ra.length > 0) {
			for (var i = 0; i < ra.length; i++) {
				a[a.length] = ra[i];
			}
			if (a.length > 0) {
				var xml = HTUtil.ATX(a, 'TReceipt', TReceipt);
			}
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TRECEIPT_S'
						},
						success : function(r) {
							var c = HTUtil.XTRA(r.responseXML, 'TReceipt',
									TReceipt);
							HTUtil.RUA(store, c, TReceipt);
							store.reload({
										params : {
											start : 0,
											limit : C_PS20
										}
									});
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, M_F);
						},
						xmlData : HTUtil.HTX(xml)
					});
		}
	};

	this.exp = function() {
		if (store.baseParams.xml) {
			EXPC('TC_RECEIPT', '&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		} else {
			EXPC('TC_RECEIPT', '&sort=id&dir=ASC');
		}
	};

	// var menu = CREATE_EP_MENU('回单', this.exp, this.pdp,function() { }, this);

	var btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				scope : this,
				handler : this.save
			});

	var btnCancel = new Ext.Button({
				text : '取消',
				iconCls : 'renew',
				scope : this,
				handler : function() {
					cenPanel.store.reload();
				}
			});

	// 回单报表输出
	var btnExp = new Ext.Button({
				text : '输出回单',
				iconCls : 'print',
				scope : this,
				//menu : { items : [menu] }
				handler : this.exp
			});

	var cenPanel = new Ext.grid.EditorGridPanel({
				title : '',
				region : 'center',
				store : store,
				sm : sm,
				cm : cm,
				clicksToEdit : 1,
				closable : true,
				loadMask : true,
				stripeRows : true,
				autoScroll : true,
				tbar : [btnSave, '-', btnCancel, '-', btnExp],
				bbar : PTB(store, C_PS20)
			});

	Fos.PEventRecipteTab.superclass.constructor.call(this, {
				id : 'P_EVENTTYPERECEIPT',
				title : C_RECEIPT_TRACING,
				closable : true,
				modal : true,
				layout : 'border',
				items : [upFrm, cenPanel]
			});
};
Ext.extend(Fos.PEventRecipteTab, Ext.Panel);
