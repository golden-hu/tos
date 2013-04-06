// 派车单列表
Fos.TransTaskGrid = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TTRT_Q_T',
					_mt : 'json'
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'TConsign',
							id : 'id'
						}, TConsign),
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
				}
			});

	// 货物、车辆跟踪store
	var store1 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'PEVENT_TQ',
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

	// 根据状态改变工具栏按钮状态
	this.changeBtnStatus = function(p) {
		var p = sm.getSelected();
		// 新增加一条
		if (p.get('status') <= 1) {
			btnDeparture.enable();
			btnStation.disable();
			btnSign.disable();
			btnEdit.enable();
			btnRemove.enable();
		}
		// 发车状态
		if (p.get('status') == 5) {
			btnDeparture.disable();
			btnStation.enable();
			btnSign.enable();
			btnEdit.disable();
			btnRemove.disable();
		}
		// 到站状态
		if (p.get('status') ==7) {
			btnStation.disable();
			btnDeparture.disable();
			btnSign.enable();
			btnEdit.disable();
			btnRemove.disable();
		}

		// 签收状态
		if (p.get('status') == 9) {
			btnSign.disable();
			btnDeparture.disable();
			btnStation.disable();
			btnEdit.disable();
			btnRemove.disable();
		}
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true,
				listeners : {
					scope : this,
					rowselect : function(t, i, r) {
						this.changeBtnStatus(r);
					}
				}
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : '运单状态',
							align : 'center',
							dataIndex : 'status',
							renderer : HTStore.loadStatusRender,
							width : 80
						}, {
							header : C_TRANS_TASK_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 120
						}, {
							header : '承运商',
							align : 'center',
							dataIndex : 'motorcadeName',
							width : 100
						}, {
							header : '承运商联系人',
							align : 'center',
							dataIndex : 'motorcadeContact',
							width : 100
						}, {
							header : '承运商联系方式',
							align : 'center',
							dataIndex : 'motorcadeTel',
							width : 110
						}, {
							header : '发货地址',
							align : 'center',
							dataIndex : 'shipperAddress',
							width : 120
						}, {
							header : '交货地址',
							align : 'center',
							dataIndex : 'consigneeAddress',
							width : 120
						}, {
							header : '空载公里数',
							align : 'center',
							dataIndex : 'emptyMiles',
							width : 90
						}, {
							header : '重载公里数',
							align : 'center',
							dataIndex : 'heavyMiles',
							width : 90
						}, {
							header : '件数合计',
							align : 'center',
							dataIndex : 'packages',
							width : 70
						}, {
							header : '毛重合计',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 70
						}, {
							header : '体积合计',
							align : 'center',
							dataIndex : 'volume',
							width : 70
						}, {
							header : '发车日期',
							align : 'center',
							dataIndex : 'startDate',
							renderer : formatDate,
							width : 100
						}, {
							header : '到站日期',
							align : 'center',
							dataIndex : 'endDate',
							renderer : formatDate,
							width : 100
						},{
							header : C_VEHICLE_NO,
							align : 'center',
							dataIndex : 'vehicleNo',
							hidden:true,
							width : 100
						}, {
							header : '司机',
							align : 'center',
							dataIndex : 'driverName',
							hidden:true,
							width : 100
						}, {
							header : '司机电话',
							align : 'center',
							dataIndex : 'driverTel',
							hidden:true,
							width : 100
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.showTask = function(p) {

		var tab = this.ownerCt;
		var c = 'TRANS_' + p.get("uuid");
		tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab
				.add(new Fos.TransTaskTabl(p, store)));
	};

	this.add = function() {
		var p = new TConsign({
				uuid : HTUtil.UUID(32),
				rowAction : 'N',
				consBizType : BT_T,
				consBizClass : 'T',
				consDate : new Date(),
				grouId : HTStore.getCFG('DEFAULT_DEPT_T'),
				grouName : HTStore.getCFGD('DEFAULT_DEPT_T'),
				consOperatorId : sessionStorage
						.getItem("USER_ID"),
				consOperatorName : sessionStorage
						.getItem("USER_NAME")
			});
				
		this.showTask(p);
	};

	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			if (b.get('status')  == 0) {
			Ext.Msg.confirm(SYS, M_R_C, function(btn) {
						if (btn == 'yes') {
							var xml = HTUtil.RTX4R(b, 'TConsign');
							HTUtil.REQUEST('TTRT_S_T', xml, function() {
										store.remove(b);
									});
						}
					}, this);
			} else
				Ext.Msg.alert(SYS, M_R_P);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showTask(p);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	// 查询
	this.search = function() {
		var consNo = kw.getValue();
		if (!consNo) {
			XMG.alert(SYS, C_TRANS_TASK_NO_REQUIRED, function(b) {
						kw.focus();
					});
			return;
		} else {
			if (consNo == '请输入派车单号...') {
				XMG.alert(SYS, C_TRANS_TASK_NO_REQUIRED, function(b) {
							kw.focus();
						});
				return;
			} else {
				var a = [];
				a[a.length] = {
					key : 'consNo',
					value : consNo,
					op : LI
				};
				store.baseParams = {
					_A : 'TTRANS_SEARCH',
					_mt : 'json',
					xml : Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))
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
	};

	var kw = new Ext.form.TextField({
				value : '请输入派车单号...',
				listeners : {
					scope : this,
					specialkey : function(c, e) {
						if (e.getKey() == Ext.EventObject.ENTER)
							this.search();
					},
					focus : function(f) {
						f.setValue('');
					},
					blur : function(f) {
						if (f.getValue() == '')
							f.reset();
					}
				}
			});

	this.transport = function() {
		var p = sm.getSelected();
		if (p) {
			var url = REPORT_URL;
			if (p.get('id')) {
				url += '&__report=reports/tms_TransPortContract.rptdesign&__format=xls&compCode='
						+ sessionStorage.getItem("COMP_CODE")
						+ '&id='
						+ p.get('id');
			}
			window
					.open(
							url,
							'download',
							'height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');

		} else {
			Ext.Msg.alert(SYS, "请选择行记录！");
		}
	};

	this.varyStatus = function(s) {
		var a = sm.getSelected();
		if (a) {
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TTrans-Task-US',
							id : a.get('id'),
							status : s
						},
						success : function(r) {
							var p = HTUtil.XTRA(r.responseXML, 'TConsign',
									TConsign);
							HTUtil.RUA(store, p, TConsign);
							this.changeBtnStatus(a);
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, M_F + r.responseText);
						}
					});
		}
	};

	// 发车
	this.departure = function() {
		Ext.Msg.confirm(SYS, '请确定是否发车', function(btn) {
					if (btn == 'yes') {
						this.varyStatus(5);
					}
				}, this);
	};

	// 到站
	this.station = function() {
		Ext.Msg.confirm(SYS, '请确定是否到站', function(btn) {
					if (btn == 'yes') {
						this.varyStatus(7);
					}
				}, this);
	};

	// 签收
	this.sign = function() {
		Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
					if (btn == 'yes') {
						this.varyStatus(9);
					}
				}, this);
	};

	// 单票车辆跟踪状态
	this.showTracing = function() {
		var p = sm.getSelected();
		if (p) {
			createWindow(new Fos.PEventTransWin(p), true);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	var m = M1_TMS + TMS_TTASK;

	var btnAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				hidden : NR(m + F_M),
				disabled : NR(m + F_M),
				scope : this,
				handler : this.add
			});

	var btnEdit = new Ext.Button({
				text : C_EDIT,
				iconCls : 'option',
				hidden : NR(m + F_V),
				disabled : NR(m + F_V),
				scope : this,
				handler : this.edit
			});

	var btnRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				hidden : NR(m + F_R),
				disabled : NR(m + F_R),
				scope : this,
				handler : this.del
			});

	var btnSearch = new Ext.Button({
				text : C_SEARCH,
				iconCls : 'search',
				hidden : NR(m + TMS_Q_QUERY),
				handler : this.search
			});

	var btnTransport = new Ext.Button({
				iconCls : 'print',
				text : '生成运输合同',
				scope : this,
				hidden : NR(m + TMS_EXPORT),
				handler : this.transport
			});

	var btnDeparture = new Ext.Button({
				text : '发车',
				iconCls : 'save',
				scope : this,
				hidden : NR(m + TMS_DEPARTURE),
				handler : this.departure
			});

	var btnStation = new Ext.Button({
				text : '到站',
				iconCls : 'check',
				scope : this,
				hidden : NR(m + TMS_STATION),
				handler : this.station
			});

	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				scope : this,
				hidden : NR(m + TMS_SIGN),
				handler : this.sign
			});

	var btnTracing = new Ext.Button({
				text : C_TRANS_TRACING,
				iconCls : 'add',
				hidden : NR(m + '16'),
				scope : this,
				handler : this.showTracing
			});

	Fos.TransTaskGrid.superclass.constructor.call(this, {
				title : C_TRANS_TASK_LIST,
				id : 'TTRT',
				iconCls : 'grid',
				autoScroll : true,
				sm : sm,
				cm : cm,
				store : store,
				closable : true,
				loadMask : true,
				listeners : {
					scope : this,
					rowdblclick : function(grid, rowIndex, event) {
						var p = sm.getSelected();
						if (p) {
							this.showTask(p);
						}
					}
				},
				tbar : [btnAdd, '-', btnEdit, '-', btnRemove, '-', kw,
						btnSearch, '-', btnTransport, '-', '->', btnDeparture,
						'-', btnStation, '-', btnSign, '-', btnTracing],
				bbar : PTB(store, C_PS20)
			});
};
Ext.extend(Fos.TransTaskGrid, Ext.grid.GridPanel);

// 派车审核复杂查询
Fos.TTransComplexSearchWin = function(action, store) {

	var tp = new Ext.form.FormPanel({
				region : 'center',
				layout : 'column',
				defaults : {
					bodyStyle : 'padding:20px'
				},
				labelAlign : 'right',
				items : [{
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '派车单号',
										name : 'consNo',
										xtype : 'textfield',
										anchor : '95%'
									}, {
										fieldLabel : '提货状态',
										name : 'status',
										store : HTStore.loadStatus,
										xtype : 'combo',
										displayField : 'N',
										valueField : 'C',
										typeAhead : true,
										mode : 'local',
										triggerAction : 'all',
										selectOnFocus : true,
										anchor : '95%'
									}, {
										fieldLabel : '车牌号',
										name : 'vehicleNo',
										anchor : '95%',
										xtype : 'textfield'
									}]
						}, {
							columnWidth : .33,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '车队',
										name : 'motorcadeName',
										store : HTStore.getCS(),
										enableKeyEvents : true,
										xtype : 'customerLookup',
										custType : 'custTrackFlag',
										bizType : BT_T,
										displayField : 'custCode',
										valueField : 'custNameCn',
										typeAhead : true,
										mode : 'remote',
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
													LC(f, e, 'custTrackFlag');
												},
												buffer : 500
											}
										}
									}, {
										fieldLabel : '发车日期',
										name : 'startDate',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '保险日期(从)',
										name : 'premiumDateFrom',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}]
						}, {
							columnWidth : .34,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '驾驶员',
										name : 'driverName',
										xtype : 'textfield',
										anchor : '95%'
									}, {
										fieldLabel : '完成日期',
										name : 'endDate',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}, {
										fieldLabel : '保险日期(到)',
										name : 'premiumDateTo',
										xtype : 'datefield',
										format : DATEF,
										anchor : '95%'
									}]
						}]
			});

	this.reload = function() {
		var a = [];
		var op = 1;// util.js判断类型----->后台HtQuery

		var transTaskNo = tp.find('name', 'transTaskNo')[0].getValue();
		if (transTaskNo)
			a[a.length] = new QParam({
						key : 'transTaskNo',
						value : transTaskNo,
						op : LI
					});

		var motorcadeName = tp.find('name', 'motorcadeName')[0].getValue();
		if (motorcadeName)
			a[a.length] = new QParam({
						key : 'motorcadeName',
						value : motorcadeName,
						op : op
					});

		var driverName = tp.find('name', 'driverName')[0].getValue();
		if (driverName != '')
			a[a.length] = new QParam({
						key : 'driverName',
						value : driverName,
						op : op
					});

		var status = tp.find('name', 'status')[0].getValue();
		if (status >= 0 && status != '') {
			a[a.length] = new QParam({
						key : 'status',
						value : status,
						op : op
					});
		}

		var startDate = tp.find('name', 'startDate')[0].getValue();
		var endDate = tp.find('name', 'endDate')[0].getValue();
		if (startDate && endDate) {
			a[a.length] = new QParam({
						key : 'startDate',
						value : startDate.format(DATEF),
						op : GE
					});
			a[a.length] = new QParam({
						key : 'endDate',
						value : endDate.format(DATEF),
						op : LE
					});
		} else if (startDate) {
			a[a.length] = new QParam({
						key : 'startDate',
						value : startDate.format(DATEF),
						op : GE
					});
		} else if (endDate) {
			a[a.length] = new QParam({
						key : 'endDate',
						value : endDate.format(DATEF),
						op : LE
					});
		}

		var vehicleNo = tp.find('name', 'vehicleNo')[0].getValue();
		if (vehicleNo)
			a[a.length] = new QParam({
						key : 'vehicleNo',
						value : vehicleNo,
						op : LI
					});

		var premiumDateFrom = tp.find('name', 'premiumDateFrom')[0].getValue();
		var premiumDateTo = tp.find('name', 'premiumDateTo')[0].getValue();
		if (premiumDateFrom && premiumDateTo) {
			a[a.length] = new QParam({
						key : 'premiumDateFrom',
						value : premiumDateFrom.format(DATEF),
						op : GE
					});
			a[a.length] = new QParam({
						key : 'premiumDateTo',
						value : premiumDateTo.format(DATEF),
						op : LE
					});
		} else if (premiumDateFrom) {
			a[a.length] = new QParam({
						key : 'premiumDateFrom',
						value : premiumDateFrom.format(DATEF),
						op : GE
					});
		} else if (premiumDateTo) {
			a[a.length] = new QParam({
						key : 'premiumDateTo',
						value : premiumDateTo.format(DATEF),
						op : LE
					});
		}

		store.baseParams = {
			_A : action,
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
		this.close();
	};

	Fos.TTransComplexSearchWin.superclass.constructor.call(this, {
				title : '派车单票查询',
				iconCls : 'search',
				modal : true,
				layout : 'border',
				width : 800,
				height : 320,
				buttonAlign : 'right',
				items : [tp],
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
Ext.extend(Fos.TTransComplexSearchWin, Ext.Window);

// 车辆跟踪
Fos.PEventTransWin = function(p) {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'PEVENT_TQ',
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
					transId : p.get('id')

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
							width : 150,
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
										format : 'H:i'
									})
						}, {
							header : '操作人',
							align : 'center',
							dataIndex : 'operatorName',
							width : 150,
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

	this.changeBut = function() {
		btnAdd.disable();
		btnRemove.disable();
		btnSave.disable();
	};

	this.addEvent = function() {
		if (p.get('status') == 7) {
			Ext.Msg.alert(SYS, '该单已到站，不能添加跟踪信息');
			this.changeBut();
		} else if (p.get('status') == 9) {
			Ext.Msg.alert(SYS, '该单已签收，不能添加跟踪信息');
			this.changeBut();
		} else {
			var tr = new PEvent({
						uuid : HTUtil.UUID(32),
						bizType : 'T',
						status : '0',
						version : '0',
						rowAction : 'N',
						transId : p.get('id'),
						operatorName : sessionStorage.getItem("USER_NAME"),
						trackDate : new Date()
					});

			grid.stopEditing();
			store.insert(0, tr);
			grid.startEditing(store.getRange().length - 1, 1);
		}
	};

	this.save = function() {
		grid.stopEditing();
		HTUtil.POST(store, 'PEvent', PEvent, 'PEVENT_S');
	};
	
	this.del = function() {
		if (p.get('status') >= 7) {
			Ext.Msg.alert(SYS, '该单的跟踪信息不能被删除！');
			this.changeBut();
		} else {
			HTUtil.REMOVE_SM(sm, store);
			HTUtil.POST(store, 'PEvent', PEvent, 'PEVENT_S');
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
				stripeRows : true,
				store : store,
				sm : sm,
				cm : cm,
				tbar : [btnAdd, '-', btnRemove, '-', btnSave]
			});

	Fos.PEventTransWin.superclass.constructor.call(this, {
				iconCls : 'PEvent',
				title : '跟踪状态' + '-' + p.get('transTaskNo'),
				modal : true,
				width : 600,
				height : 400,
				items : grid
			});
};
Ext.extend(Fos.PEventTransWin, Ext.Window);

// 批量车辆跟踪状态查询窗口
Fos.PEventTTransTab = function() {

	var store1 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TTRT_Q_T',
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

	var store2 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'PEVENT_TQ',
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

	// 派车单号
	var txtTaskNo = new Ext.form.TextField({
				fieldLabel : C_TRANS_TASK_NO,
				name : 'consNo',
				tabIndex : 1,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboMotorcadeName.focus();
						}
					}
				}
			});

	// 车队
	var cboMotorcadeName = new Fos.CustomerLookup({
				fieldLabel : '车队',
				id : 'combol',
				name : 'motorcadeName',
				store : HTStore.getCS(),
				enableKeyEvents : true,
				custType : 'custTrackFlag',
				bizType : BT_T,
				displayField : 'custCode',
				valueField : 'custNameCn',
				typeAhead : true,
				mode : 'remote',
				tabIndex : 2,
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
							LC(f, e, 'custTrackFlag');
						},
						buffer : BF
					}
				}
			});

	// 驾驶员
	var cboDriverName = new Ext.form.ComboBox({
				fieldLabel : C_DRIVER,
				name : 'driverName',
				tabIndex : 3,
				store : HTStore.getDriverName('TTRT_DRIV_Q'),
				displayField : 'driverName',
				valueField : 'driverName',
				typeAhead : true,
				mode : 'remote',
				enableKeyEvents : true,
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('driverName'));
					},
					keyup : {
						fn : function(f, e) {
							listDriverName(f, e);
							if (e.getKey() == e.ENTER) {
								cboVehicleNo.focus();
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

	// 车牌号
	var cboVehicleNo = new Ext.form.ComboBox({
				fieldLabel : C_VEHICLE_NO,
				name : 'vehicleNo',
				tabIndex : 4,
				store : HTStore.getVehicleNo('TTRT_VEHI_Q'),
				displayField : 'vehicleNo',
				valueField : 'vehicleNo',
				typeAhead : true,
				mode : 'local',
				enableKeyEvents : true,
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('vehicleNo'));
					},
					keyup : {
						fn : function(f, e) {
							listVehicleNo(f, e);
							if (e.getKey() == e.ENTER) {
								dtStartDate.focus();
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

	// 发车日期
	var dtStartDate = new Ext.form.DateField({
				fieldLabel : C_TRAN_START_DATE,
				name : 'startDate',
				tabIndex : 5,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtEndDate.focus();
						}
					}
				}
			});

	// 完成日期
	var dtEndDate = new Ext.form.DateField({
				fieldLabel : C_TRAN_END_DATE,
				name : 'endDate',
				tabIndex : 6,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPlaceFrom.focus();
						}
					}
				}
			});

	// 发货地点
	var txtPlaceFrom = new Ext.form.TextField({
				fieldLabel : '发货地址',
				name : 'shipperAddress',
				tabIndex : 7,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPlaceTo.focus();
						}
					}
				}
			});

	// 交货地点
	var txtPlaceTo = new Ext.form.TextField({
				fieldLabel : '交货地址',
				name : 'consigneeAddress',
				tabIndex : 8,
				anchor : '95%'
			});

	this.search = function() {
		if (txtTaskNo.getValue() == ''
				&& Ext.getCmp("combol").getRawValue() == ''
				&& dtStartDate.getValue() == '' && dtEndDate.getValue() == ''
				&& cboDriverName.getValue() == ''
				&& cboVehicleNo.getValue() == ''
				&& txtPlaceFrom.getValue() == '' && txtPlaceTo.getValue() == '') {
			Ext.Msg.alert(SYS, '请输入查询条件！');

			store1.baseParams = {
				_A : 'TTRANS_SEARCH',
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

			if (txtTaskNo.getValue())
				a[a.length] = new QParam({
							key : 'consNo',
							value : txtTaskNo.getValue(),
							op : LI
						});

			if (Ext.getCmp("combol").getRawValue() != '')
				a[a.length] = new QParam({
							key : 'motorcadeName',
							value : Ext.getCmp("combol").getRawValue(),
							op : op
						});

			if (dtStartDate.getValue() && dtEndDate.getValue()) {
				a[a.length] = new QParam({
							key : 'startDate',
							value : dtStartDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'endDate',
							value : dtEndDate.getValue().format(DATEF),
							op : LE
						});
			} else if (dtStartDate.getValue()) {
				a[a.length] = new QParam({
							key : 'startDate',
							value : dtStartDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtEndDate.getValue()) {
				a[a.length] = new QParam({
							key : 'endDate',
							value : dtEndDate.getValue().format(DATEF),
							op : LE
						});
			}

			if (cboDriverName.getValue())
				a[a.length] = new QParam({
							key : 'driverName',
							value : cboDriverName.getValue(),
							op : LI
						});

			if (cboVehicleNo.getValue())
				a[a.length] = new QParam({
							key : 'vehicleNo',
							value : cboVehicleNo.getValue(),
							op : LI
						});

			if (txtPlaceFrom.getValue())
				a[a.length] = new QParam({
							key : 'shipperAddress',
							value : txtPlaceFrom.getValue(),
							op : op
						});

			if (txtPlaceTo.getValue())
				a[a.length] = new QParam({
							key : 'consigneeAddress',
							value : txtPlaceTo.getValue(),
							op : op
						});

			store1.baseParams = {
				_A : 'TTRANS_SEARCH',
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
					txtTaskNo.setValue('');
					cboMotorcadeName.setValue('');
					cboDriverName.setValue('');
					cboVehicleNo.setValue('');
					dtStartDate.setValue('');
					dtEndDate.setValue('');
					txtPlaceFrom.setValue('');
					txtPlaceTo.setValue('');
				}
			});

	var upPanel = new Ext.form.FormPanel({
				title : '查询条件',
				region : 'north',
				layout : 'column',
				height : 130,
				collapsible:true,
				padding : 5,
				labelWidth : 80,
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtTaskNo, dtStartDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboMotorcadeName, dtEndDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboDriverName, txtPlaceFrom]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboVehicleNo, txtPlaceTo]
						}],
				buttons : [search, reset]
			});

	// 根据陆运单状态判断跟踪信息按钮
	this.changeBut = function(p) {
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
										params : {
											transId : r.get('id')
										},
										scope : this
									});
						}
					}
				}
			});

	var cm1 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm1, {
							header : '状态',
							align : 'center',
							dataIndex : 'status',
							renderer : HTStore.loadStatusRender,
							width : 100
						}, {
							header : C_TRANS_TASK_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 120
						}, {
							header : '接单日期',
							align : 'center',
							dataIndex : 'consDate',
							renderer : formatDate,
							width : 100
						}, {
							header : C_MOTORCADE,
							align : 'center',
							dataIndex : 'motorcadeName',
							width : 80
						}, {
							header : '车牌号',
							align : 'center',
							dataIndex : 'vehicleNo',
							width : 80
						}, {
							header : '驾驶员',
							align : 'center',
							dataIndex : 'driverName',
							width : 80
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	var westGrid = new Ext.grid.GridPanel({
				title : '派车单列表',
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
							width : 150,
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
							width : 150,
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
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TTrans-Task-US',
							id : a.get('id'),
							status : s
						},
						success : function(r) {
							var p = HTUtil.XTRA(r.responseXML, 'TConsign',
									TConsign);
							HTUtil.RUA(store1, p, TConsign);
							this.changeBut(a);
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, M_F + r.responseText);
						}
					});
		}
	};

	var add = function() {
		var p = sm1.getSelected();
		if (p.get('status') == 7) {
			Ext.Msg.confirm(SYS, '该单已全部到站，不需添加跟踪信息！', function(btn) {
						if (btn == 'yes') {
							this.changeBut(7);
						}
					}, this);
		} else if (p.get('status') == 9) {
			Ext.Msg.confirm(SYS, '该单已全部签收，不需添加跟踪信息！', function(btn) {
						if (btn == 'yes') {
							this.changeBut(9);
						}
					}, this);
		} else {
			var r = new PEvent({
						uuid : HTUtil.UUID(32),
						bizType : 'T',
						status : '0',
						version : '0',
						rowAction : 'N',
						transId : p.get('id'),
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
				handler : add
			});

	var remove = function() {
		var p = sm2.getSelected();
		var p1 = sm1.getSelected();
		if (p) {
			if (p1.get('status') >= 6) {
				Ext.Msg.confirm(SYS, '该单的跟踪信息不能被删除！', function(btn) {
							if (btn == 'yes') {
								this.changeBut(p1.get('status'));
							}
						}, this);
			} else {
				Ext.Msg.confirm(SYS, '是否确定删除该单的这条跟踪信息？', function(btn) {
							if (btn == 'yes') {
								HTUtil.REMOVE_SM(sm2, store2);
								HTUtil.POST(store2, 'PEvent', PEvent,
										'PEVENT_S');
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
				handler : remove
			});

	var save = function() {
		centerGrid.stopEditing();
		HTUtil.POST(store2, 'PEvent', PEvent, 'PEVENT_S');
	};

	var btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				disabled : true,
				scope : this,
				handler : save
			});

	var station = function() {
		var p1 = sm1.getSelected();
		if (p1.get('status') <4) {
			Ext.Msg.alert(SYS, '该单还不能进行此项操作！');
			btnStation.disable();
			btnSign.disable();
		}
		if (p1.get('status') > 4 && p1.get('status')<7) {
			Ext.Msg.confirm(SYS, '请确定是否添加"全部到站"状态跟踪？', function(btn) {
						if (btn == 'yes') {
							this.btnCondition(7);
						}
					}, this);
		}
		if (p1.get('status') == 7) {
			Ext.Msg.alert(SYS, '该单已全部到站，不能添加跟踪信息');
			this.changeBut(7);
		}
		if (p1.get('status') == 8) {
			Ext.Msg.alert(SYS, '该单已部分签收，不能添加跟踪信息');
			this.changeBut(8);
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
				handler : station
			});

	var sign = function() {
		var p1 = sm1.getSelected();
		if (p1.get('status') <= 6) {
			Ext.Msg.alert(SYS, '该单还不能进行此项操作');
			btnSign.disable();
		}
		if (p1.get('status') == 7||p1.get('status') ==8) {
			Ext.Msg.confirm(SYS, '请确定是否添加"全部签收"状态跟踪？', function(btn) {
						if (btn == 'yes') {
							this.btnCondition(9);
						}
					}, this);
		}
		if (p1.get('status') == 9) {
			Ext.Msg.alert(SYS, '该单已全部签收，不能添加跟踪信息');
			this.changeBut(9);
		}
	};

	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				disabled : true,
				scope : this,
				handler : sign
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

	Fos.PEventTTransTab.superclass.constructor.call(this, {
				id : 'P_EVENTTYPETRANS',
				title : C_TRANS_TRACING,
				closable : true,
				modal : true,
				layout : 'border',
				items : [upPanel, westGrid, centerGrid]
			});
};
Ext.extend(Fos.PEventTTransTab, Ext.Panel);
