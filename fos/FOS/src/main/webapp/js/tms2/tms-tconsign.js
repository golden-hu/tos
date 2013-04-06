// 陆运单列表
Fos.TConsignGrid = function() {

	var store = new Ext.data.Store({
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
				remoteSort : true,// 远端排序
				sortInfo : {
					field : 'id',
					direction : 'DESC'
				}
			});

	// 加载数据
	store.load({
				params : {
					start : 0,
					limit : C_PS20
				}
			});

	// 货物跟踪store
	var store1 = new Ext.data.Store({
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

	this.changeBtnStatus = function(p) {
		var p = sm.getSelected();
		// 新增加一条
		if (p.get('status') == 0) {
			btnStorage.enable();
			btnSign.disable();
			btnEdit.enable();
			btnRemove.enable();
		}

		// 提货状态
		if (p.get('status') == 1) {
			btnStorage.disable();
			btnSign.disable();
			btnEdit.enable();
			btnRemove.enable();
		}

		// 派车状态
		if (p.get('status') == 2 || p.get('status') == 3) {
			btnStorage.disable();
			btnSign.disable();
			btnEdit.disable();
			btnRemove.disable();
		}

		if (p.get('status') == 4 || p.get('status') == 5
				|| p.get('status') == 6 || p.get('status') == 7) {
			btnStorage.disable();
			btnSign.enable();
			btnEdit.disable();
			btnRemove.disable();
		}

		// 签收状态
		if (p.get('status') >= 8) {
			btnStorage.disable();
			btnSign.disable();
			btnEdit.disable();
			btnRemove.disable();
		}
	};

	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true,
				listeners : {
					scope : this,
					rowselect : function(t, i, r) {
						this.changeBtnStatus(r);
					}
				}
			});

	// 列信息
	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : '运单状态',
							align : 'center',
							dataIndex : 'status',
							renderer : HTStore.loadStatusRender,
							width : 100
						}, {
							header : C_TRAN_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 150
						}, {
							header : '接单日期',
							align : 'center',
							dataIndex : 'consDate',
							renderer : formatDate
						}, {
							header : C_BOOKER,
							align : 'center',
							dataIndex : 'custName',
							width : 150
						}, {
							header : '业务员',
							align : 'center',
							dataIndex : 'salesRepName'
						}, {
							header : '发货点',
							align : 'center',
							dataIndex : 'startStation'
						}, {
							header : '收货点',
							align : 'center',
							dataIndex : 'endStation'
						}, {
							header : '是否签收',
							align : 'center',
							dataIndex : 'signInStatus',
							renderer : function(v) {
								if (v == false) {
									return "否";
								} else {
									return "是";
								}
							}
						}, {
							header : '收货地址',
							align : 'center',
							dataIndex : 'consigneeAddress',
							width : 260
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.showTConsign = function(p) {
		var tab = this.ownerCt;
		var c = 'TRAN_' + p.get("uuid");
		tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab
				.add(new Fos.TConsignTable(p, store)));
	};

	this.add = function() {

		var r = new TConsign({
					uuid : HTUtil.UUID(32),
					rowAction : 'N',
					consBizType : BT_T,
					consBizClass : 'O',
					consDate : new Date(),
					payMethod: HTStore.getCheckPay(4),
					salesRepId : sessionStorage.getItem("USER_ID"),
					salesRepName : sessionStorage.getItem("USER_NAME"),
					grouId:HTStore.getCFG('LOG_DEFAULT_DEMPARTMENT'),
					grouName:HTStore.getCFGD('LOG_DEFAULT_DEMPARTMENT'),
					status : '0'
				});

		this.showTConsign(r);
	};

	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			if (b.get('status') >= 1)
				Ext.Msg.alert(SYS, '该陆运单已提货，不可以删除!');
			else {
				Ext.Msg.confirm(SYS, M_R_C, function(btn) {
							if (btn == 'yes') {
								var xml = HTUtil.RTX4R(b, 'TConsign');
								HTUtil.REQUEST('TCON_S', xml, function() {
											store.remove(b);
										});
							}
						}, this);
			}
		} else
			Ext.Msg.alert(SYS, M_R_P);
	};

	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showTConsign(p);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	this.fastSearch = function() {
		var consNo = kw.getValue();
		if (!consNo) {
			XMG.alert(SYS, C_TRAN_NO_REQUIRED, function(b) {
						kw.focus();
					});
			return;
		} else {
			if (consNo == '请输入运单号...') {
				XMG.alert(SYS, C_TRAN_NO_REQUIRED, function(b) {
							kw.focus();
						});
				return;
			} else {
				var a = [];
				a[a.length] = new QParam({
							key : 'consNo',
							value : consNo,
							op : LI
						});
				store.baseParams = {
					_A : 'TCON_SEARCH',
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
			}
		};
	};

	this.search = function() {
		var w = new Fos.TConsignSearchWin('TCON_SEARCH', store);
		w.show();// 打开窗口
	};

	// 快速查询的文本框条件
	var kw = new Ext.form.TextField({
				value : '请输入陆运单号...',
				listeners : {
					scope : this,
					specialkey : function(c, e) {// 特殊键触发
						if (e.getKey() == Ext.EventObject.ENTER)
							this.fastSearch();
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

	// 输出陆运单列表
	this.expExcel = function() {
		var url = REPORT_URL;
		if (store.baseParams.typeKey == 1) { // 复杂查询-综合查询类型
			url += '&__report=reports/tms_TconsignPortContract.rptdesign&__format=xls&compCode='
					+ sessionStorage.getItem("COMP_CODE")
					+ '&xml='
					+ store.baseParams.xml;
		} else if (store.baseParams.typeKey == 2) {// 复杂查询-订单查询类型
			url += '&__report=reports/tms_TconsignPortContract.rptdesign&__format=xls&compCode='
					+ sessionStorage.getItem("COMP_CODE")
					+ '&orderNo='
					+ store.baseParams.orderNo;
		} else {
			url += '&__report=reports/tms_TconsignPortContract.rptdesign&__format=xls&compCode='
					+ sessionStorage.getItem("COMP_CODE");
		}
		window
				.open(
						url,
						'download',
						'height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};

	/*
	 * var exp = { text : '输出', scope : this, handler : this.expExcel, disabled :
	 * NR(M1_SET) };
	 */

	// 操作提货签收按钮功能的同时，记录货物跟踪状态
	this.addPevent = function(v) {
		var p = sm.getSelected();
		var r = new PEvent({
					uuid : HTUtil.UUID(32),
					bizType : 'T',
					status : '0',
					version : '0',
					rowAction : 'N',
					consignId : p.get('id'),
					typeName : v == 1 ? '已提货' : '全部签收',
					operatorName : p.get('consOperatorName'),
					trackDate : new Date()
				});
		store1.add(r);
		HTUtil.POST(store1, 'PEvent', PEvent, 'PEVENT_S');
	};

	this.btnCondition = function(s) {
		var ra = sm.getSelections();// 设置单选框多选，使按钮可批量操作
		var a = [];
		if (ra.length > 0) {
			if (s == 1) {
				for (var i = 0; i < ra.length; i++) {
					if (ra[i].get('status') == 0) {
						a[a.length] = ra[i];
					}
				}
			}
			if (s == 9) {
				for (var i = 0; i < ra.length; i++) {
					if (ra[i].get('status') != 0) {
						a[a.length] = ra[i];
					}
				}
			}
			if (a.length > 0) {
				var xml = HTUtil.ATX(a, 'TConsign', TConsign);
			} else {
				Ext.Msg.alert(SYS, '没有符合条件的陆运单，请先选择要提货完成的陆运单！');
			}
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TCONS_COS',
							status : s
						},
						success : function(r) {
							var c = HTUtil.XTRA(r.responseXML, 'TConsign',
									TConsign);
							HTUtil.RUA(store, c, TConsign);// 以服务器端返回的数据c更新前台store
							if (s == 1) {
								this.addPevent(1);
							}
							if (s == 9) {
								this.addPevent(9);
							}
							this.changeBtnStatus(a);
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, M_F);
						},
						// XML文档使用post
						xmlData : HTUtil.HTX(xml)
					});
		}
	};

	// 提货
	this.storage = function() {
		Ext.Msg.confirm(SYS, '请确定是否提货', function(btn) {
					if (btn == 'yes') {
						this.btnCondition(1);
					}
				}, this);
	};

	// 签收
	this.sign = function() {
		Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
					if (btn == 'yes') {
						this.btnCondition(9);
					}
				}, this);
	};

	// 单票货物跟踪状态
	this.event = function() {
		var p = sm.getSelected();
		if (p) {
			createWindow(new Fos.PEventConsWin(p), true);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	var m = M1_TMS + TMS_TCON;

	// 新增按钮
	var btnAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				hidden : NR(m + F_M),
				disabled : NR(m + F_M),
				scope : this,
				handler : this.add
			});

	// 编辑按钮
	var btnEdit = new Ext.Button({
				text : C_EDIT,
				iconCls : 'option',
				hidden : NR(m + F_V),
				disabled : NR(m + F_V),
				scope : this,
				handler : this.edit
			});

	// 删除按钮
	var btnRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				hidden : NR(m + F_R),
				disabled : NR(m + F_R),
				scope : this,
				handler : this.del
			});

	// 查询按钮
	var btnSearch = new Ext.Button({
				text : C_FAST_SEARCH,
				iconCls : 'search',
				hidden : NR(m + TMS_Q_QUERY),
				handler : this.fastSearch
			});

	// 复杂查询按钮
	var btnFSearch = new Ext.Button({
				text : '复杂查询',
				iconCls : 'search',
				scope : this,
				hidden : NR(m + TMS_C_QUERY),
				handler : this.search
			});

	// 输出报表按钮
	var btnExport = new Ext.Button({
		text : C_EXPORT,
		iconCls : 'print',
		scope : this,
		hidden : NR(m + TMS_EXPORT),
		handler : this.expExcel
			/*
			 * menu : { items : [exp] }
			 */
		});

	// 提货按钮
	var btnStorage = new Ext.Button({
				text : '提货',
				iconCls : 'check',
				scope : this,
				hidden : NR(m + TMS_DELIVERY),
				handler : this.storage
			});

	// 签收按钮
	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				scope : this,
				hidden : NR(m + TMS_SIGN),
				handler : this.sign
			});

	// 跟踪按钮
	var btnTracing = new Ext.Button({
				text : C_CARGO_TRACING,
				iconCls : 'add',
				hidden : NR(m + '04'),
				disabled : NR(m + '04'),
				scope : this,
				handler : this.event
			});

	// 构造函数调用
	Fos.TConsignGrid.superclass.constructor.call(this, {
				title : C_TRAN_LIST,
				id : 'G_TRAN',
				iconCls : 'grid',
				header : false,
				closable : true,
				store : store,
				sm : sm,
				cm : cm,
				loadMask : true,// 遮罩加载
				listeners : {
					scope : this,
					rowdblclick : function(grid, rowIndex, event) {
						var p = sm.getSelected();
						if (p && HR(m + F_V)) {
							this.showTConsign(p);
						}
					}
				},
				bbar : PTB(store, C_PS20),
				tbar : [btnAdd, '-', btnEdit, '-', btnRemove, '-', kw,
						btnSearch, '-', btnFSearch, '-', '->', btnStorage, '-',
						btnSign, '-', btnTracing]
			});
};
Ext.extend(Fos.TConsignGrid, Ext.grid.GridPanel);

// 新增陆运单
Fos.TConsignTable = function(p, listStore) {

	var store = new Ext.data.Store({
				url : SERVICE_URL + '?_A=TCON_CAR_Q',
				baseParams : {
					_mt : 'json'
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'TConsignCargo',
							id : 'id'
						}, TConsignCargo),
				remoteSort : false,
				sortInfo : {
					field : 'id',
					direction : 'DESC'
				}
			});

	if (p.get('rowAction') != 'N')
		store.load({
					params : {
						consId : p.get('id')
					}
				});

	// 费用管理
	var store2 = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'EXPE_Q',
					_mt : 'json',
					consBizType : p.get('consBizType')
				},
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'SExpense',
							id : 'id'
						}, SExpense),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'ASC'
				}
			});

	// 货物跟踪store
	var store1 = new Ext.data.Store({
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

	// 陆运单号
	var txtConsNo = new Ext.form.TextField({
				fieldLabel : '陆运单号',
				disabled : true,
				anchor : '95%',
				tabIndex : 1,
				name : 'consNo',
				value : p.get('consNo'),
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtConsDate.focus();
						}
					}
				}
			});

	// 接单日期
	var dtConsDate = new Ext.form.DateField({
				fieldLabel : '接单日期',
				anchor : '95%',
				itemCls : 'required',
				format : DATEF,
				tabIndex : 2,
				name : 'consDate',
				value : p.get('consDate'),
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboGrouName.focus();
						}
					}
				}
			});

	// 业务部门
	var cboGrouName = new Ext.form.ComboBox({
				fieldLabel : '业务部门',
				anchor : '95%',
				name : 'grouName',
				value : p.get('grouName'),
				itemCls : 'required',
				store : HTStore.getGROU_S(),
				displayField : 'grouName',
				valueField : 'grouName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				tabIndex : 3,
				listener : {
					select : function(c, r, v) {
						p.set('grouId', r.get('id'));
					},
					keydown : function() {
						if (e.getKey() == e.ENTER) {
							cboSalesRepName.focus();
						}
					}
				}
			});

	// 业务员
	var cboSalesRepName = new Ext.form.ComboBox({
				fieldLabel : '业务员',
				anchor : '95%',
				tabIndex : 4,
				itemCls : 'required',
				name : 'salesRepName',
				value : p.get('salesRepName'),
				store : HTStore.getSALE_S(),
				displayField : 'userName',
				valueField : 'userName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					select : function(c, r, v) {
						p.set('salesRepId', r.get('id'));
					},
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
				tabIndex : 5,
				typeAhead : true,
				name : 'consNoHandler',
				value : p.get('consNoHandler'),
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
				tabIndex : 6,
				itemCls : 'required',
				name : 'startStation',
				value : p.get('startStation'),
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
				tabIndex : 7,
				itemCls : 'required',
				name : 'endStation',
				value : p.get('endStation'),
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
							if (e.getKey() == e.ENTER) {
								txtRouteStation.focus();
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

	// 中转地
	var txtRouteStation = new Ext.form.TextField({
				anchor : '95%',
				fieldLabel : '中转点',
				tabIndex : 8,
				name : 'routeStation',
				value : p.get('routeStation'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
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
				tabIndex : 9,
				itemCls : 'required',
				anchor : '48.7%',
				name : 'custName',
				value : p.get('custName'),
				enableKeyEvents : true,
				displayField : 'custNameCn',
				valueField : 'custNameCn',
				store : HTStore.getCS(),
				custType : 'custBookerFlag',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				bizType : BT_T,
				tpl : custTpl,
				itemSelector : 'div.list-item',
				listWidth : C_LW,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							p.set('custId', '');
							p.set('custName', '');
						}
					},
					select : function(c, r, i) {
						p.set('custId', r.get('id'));
						p.set('custSname', r.get('custSname'));
						if (txtShipperName.getRawValue() == '') {
							txtShipperName.setValue(r.get('custNameCn'));
							cboShipperContact.setValue(r.get('custContact'));
							txtShipperMoblie.setValue(r.get('custTel'));
							txtLoadAddress.setValue(r.get('custAddress'));
							txtShipperTel.setValue(r.get('custFax'));
						}
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								txtShipperName.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 发货人- 发货单位
	var txtShipperName = new Fos.CustomerLookup({
				fieldLabel : '发货单位',
				tabIndex : 11,
				itemCls : 'required',
				anchor : '98%',
				name : 'shipperName',
				value : p.get('shipperName'),
				enableKeyEvents : true,
				displayField : 'custNameCn',
				valueField : 'custNameCn',
				store : HTStore.getCS(),
				custType : 'custBookerFlag',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				bizType : BT_T,
				tpl : custTpl,
				itemSelector : 'div.list-item',
				listWidth : C_LW,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							cboShipperContact.setValue('');
							txtShipperTel.setValue('');
							txtShipperMoblie.setValue('');
							txtLoadAddress.setValue('');
							p.set('shipperId', '');
						}
					},
					select : function(c, r, i) {
						p.set('shipperId', r.get('id'));
						cboShipperContact.setValue(r.get('custContact'));
						txtShipperMoblie.setValue(r.get('custTel'));
						txtLoadAddress.setValue(r.get('custAddress'));
						txtShipperTel.setValue(r.get('custFax'));
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								txtLoadAddress.focus();
							}
						}
					}
				}
			});

	// 发货人- 发货地址
	var txtLoadAddress = new Ext.form.TextField({
				fieldLabel : '发货地址',
				anchor : '98%',
				tabIndex : 12,
				name : 'shipperAddress',
				value : p.get('shipperAddress'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboShipperContact.focus();
						}
					}
				}
			});

	// 发货人- 联系人
	var cboShipperContact = new Ext.form.TextField({
				fieldLabel : '发货联系人',
				anchor : '95%',
				name : 'shipperContact',
				value : p.get('shipperContact'),
				tabIndex : 13,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtShipperMoblie.focus();
						}
					}
				}
			});

	// 发货人- 手机号码
	var txtShipperMoblie = new Ext.form.TextField({
				fieldLabel : '发货联系方式',
				anchor : '95.5%',
				name : 'shipperMobile',
				value : p.get('shipperMobile'),
				enableKeyEvents : true,
				tabIndex : 14,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtShipperTel.focus();
						}
					}
				}
			});

	// 发货人- 传真
	var txtShipperTel = new Ext.form.TextField({
				fieldLabel : '传真',
				anchor : '95%',
				name : 'shipperFax',
				value : p.get('shipperFax'),
				enableKeyEvents : true,
				tabIndex : 15,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboConsigneeName.focus();
						}
					}
				}
			});

	// 收货人- 收货单位
	var cboConsigneeName = new Ext.form.ComboBox({
				fieldLabel : '收货单位',
				anchor : '98%',
				tabIndex : 16,
				itemCls : 'required',
				name : 'consigneeName',
				value : p.get('consigneeName'),
				displayField : 'consigneeName',
				valueField : 'consigneeName',
				store : HTStore.getShipperStore('TMS_CONSIGNEE_Q'),
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('consigneeName'));
						txtConsigneeContact.setValue(r.get('consigneeContact'));
						txtConsigneeTel.setValue(r.get('consigneeFax'));
						txtConsigneeMobile.setValue(r.get('consigneeMobile'));
						txtDeliveryAddress.setValue(r.get('consigneeAddress'));
					},
					keyup : {
						fn : function(f, e) {
							listConsignee(f, e);
							if (e.getKey() == e.ENTER) {
								txtDeliveryAddress.focus();
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

	// 收货人- 收货地址
	var txtDeliveryAddress = new Ext.form.TextField({
				fieldLabel : '收货地址',
				anchor : '98%',
				tabIndex : 17,
				name : 'consigneeAddress',
				value : p.get('consigneeAddress'),
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

	// 收货人- 联系人
	var txtConsigneeContact = new Ext.form.TextField({
				fieldLabel : '收货联系人',
				anchor : '95%',
				tabIndex : 18,
				name : 'consigneeContact',
				value : p.get('consigneeContact'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtConsigneeMobile.focus();
						}
					}
				}
			});

	// 收货人- 手机号码
	var txtConsigneeMobile = new Ext.form.TextField({
				fieldLabel : '收货联系方式',
				anchor : '95.5%',
				tabIndex : 19,
				name : 'consigneeMobile',
				value : p.get('consigneeMobile'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtConsigneeTel.focus();
						}
					}
				}
			});

	// 收货人- 传真
	var txtConsigneeTel = new Ext.form.TextField({
				fieldLabel : '传真',
				anchor : '95%',
				tabIndex : 20,
				name : 'consigneeFax',
				value : p.get('consigneeFax'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDispatchPackages.focus();
						}
					}
				}
			});

	// 已派车件数
	var txtDispatchPackages = new Ext.form.NumberField({
				fieldLabel : '已派车件数',
				anchor : '95%',
				tabIndex : 21,
				name : 'dispatchPackages',
				value : p.get('dispatchPackages'),
				allowBlank : false,
				disabled : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDeparturePackages.focus();
						}
					}
				}
			});

	// 已发车件数
	var txtDeparturePackages = new Ext.form.NumberField({
				fieldLabel : '已发车件数',
				anchor : '95%',
				tabIndex : 22,
				name : 'departurePackages',
				value : p.get('departurePackages'),
				allowBlank : false,
				disabled : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtStationPackages.focus();
						}
					}
				}
			});

	// 已到站件数
	var txtStationPackages = new Ext.form.NumberField({
				fieldLabel : '已到站件数',
				anchor : '95%',
				tabIndex : 23,
				name : 'stationPackages',
				value : p.get('stationPackages'),
				allowBlank : false,
				disabled : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtSumPackages.focus();
						}
					}
				}
			});

	// 已签收件数
	var txtSignPackages = new Ext.form.NumberField({
				fieldLabel : '已签收件数',
				anchor : '95%',
				tabIndex : 24,
				name : 'signPackages',
				value : p.get('signPackages'),
				allowBlank : false,
				disabled : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cobDispatchStatus.focus();
						}
					}
				}
			});

	// 运单状态
	var cboStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '运单状态',
				tabIndex : 29,
				name : 'status',
				mode : 'local',
				value : p.get('status'),
				store : HTStore.loadStatus,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				triggerAction : 'all',
				disabled : true
			});

	// 提货日期
	var dtLoadDate = new Ext.form.DateField({
				anchor : '95%',
				fieldLabel : '提货日期',
				tabIndex : 30,
				format : DATEF,
				name : 'loadDate',
				value : p.get('loadDate'),
				disabled : true
			});

	// 回单日期
	var dtArNewDate = new Ext.form.DateField({
				anchor : '95%',
				fieldLabel : '回单日期',
				tabIndex : 31,
				format : DATEF,
				name : 'feedbackDate',
				value : p.get('feedbackDate')
			});

	// 签收日期
	var dtSignInDate = new Ext.form.DateField({
				anchor : '95%',
				fieldLabel : '签收日期',
				tabIndex : 32,
				format : DATEF,
				name : 'signInDate',
				value : p.get('signInDate'),
				disabled : true
			});

	// 回单类型
	var cboFeedbackWay = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '回单类型',
				tabIndex : 33,
				name : 'feedbackWay',
				value : p.get('feedbackWay'),
				store : HTStore.T_FEEDBACK_S,
				displayField : 'N',
				valueField : 'N',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboFeedbackNumber.focus();
						}
					}
				}
			});

	// 回单份数
	var cboFeedbackNumber = new Ext.form.TextField({
				anchor : '95%',
				fieldLabel : '回单份数',
				tabIndex : 34,
				name : 'feedbackNumber',
				value : p.get('feedbackNumber'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCargoStatus.focus();
						}
					}
				}
			});

	// 签收人
	var txtSignInContact = new Ext.form.TextField({
				anchor : '95%',
				fieldLabel : '签收人',
				tabIndex : 35,
				name : 'signInContact',
				value : p.get('signInContact'),
				disabled : true
			});

	// 是否签收
	var ckbSignInStatus = new Ext.form.Checkbox({
				anchor : '95%',
				fieldLabel : '是否签收',
				tabIndex : 36,
				name : 'signInStatus',
				value : p.get('signInStatus'),
				checked : p.get('signInStatus') == 1,
				disabled : true
			});

	// 货物状况
	var txtCargoStatus = new Ext.form.TextArea({
				anchor : '97.5%',
				fieldLabel : '货物状况',
				tabIndex : 37,
				name : 'cargoRemarks',
				value : p.get('cargoRemarks'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRemarks.focus();
						}
					}
				}
			});

	// 备注
	var txtRemarks = new Ext.form.TextArea({
				anchor : '97.5%',
				fieldLabel : '备注',
				tabIndex : 38,
				name : 'remarks',
				value : p.get('remarks'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboPateName.focus();
						}
					}
				}
			});

	// 付款方式
	var cboPateName = new Ext.form.ComboBox({
				fieldLabel : '付款方式',
				anchor : '95%',
				tabIndex : 10,
				name : 'payMethod',
				value : p.get('payMethod'),
				//disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				disabled:true,
				mode : 'local',
				displayField : 'NAME',
				valueField : 'CODE',
				store : HTStore.getPAY_S,
				triggerAction : 'all',// all表示把下拉框列表框的列表值全部显示出来
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						if (i == 0) {
							txtExpenseXff.enable();
							txtExpenseDff.enable();
							txtExpenseHdf.enable();
							txtExpenseYjf.enable();
							txtExpenseHkf.enable();
						}
						if (i == 1) {
							txtExpenseXff.enable();
							txtExpenseDff.disable();
							txtExpenseHdf.disable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if (i == 2) {
							txtExpenseXff.disable();
							txtExpenseDff.enable();
							txtExpenseHdf.disable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if (i == 3) {
							txtExpenseXff.disable();
							txtExpenseDff.disable();
							txtExpenseHdf.enable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if (i == 4) {
							txtExpenseXff.disable();
							txtExpenseDff.disable();
							txtExpenseHdf.disable();
							txtExpenseYjf.enable();
							txtExpenseHkf.disable();
						}
					},
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseTotal.focus();
						}
					}
				}
			});

	// 总费用
	var txtExpenseTotal = new Ext.form.NumberField({
				fieldLabel : '总费用',
				anchor : '95%',
				tabIndex : 39,
				disabled : true,
				name : 'expenseTotal',
				value : p.get('expenseTotal'),
				// emptyText : '0000.00',
				allowBlank : true,// 允许值的长度为0
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseXff.focus();
						}
					}
				}
			});

	// 现付费
	var txtExpenseXff = new Ext.form.NumberField({
				fieldLabel : '现付',
				anchor : '95%',
				tabIndex : 40,
				disabled:true,
				//disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseSpot',
				value : p.get('expenseSpot'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseDff.focus();
						}
					}
				}
			});

	// 到付费
	var txtExpenseDff = new Ext.form.NumberField({
				fieldLabel : '到付',
				anchor : '95%',
				tabIndex : 41,
				disabled:true,
				//disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseFreight',
				value : p.get('expenseFreight'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseHdf.focus();
						}
					}
				}
			});

	// 回单付费
	var txtExpenseHdf = new Ext.form.NumberField({
				fieldLabel : '回单付',
				anchor : '95%',
				itemCls : 'green-b',
				allowBlank : true,
				tabIndex : 42,
				disabled:true,
				//disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				name : 'expenseReceipt',
				value : p.get('expenseReceipt'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseYjf.focus();
						}
					}
				}
			});

	// 月结费
	var txtExpenseYjf = new Ext.form.NumberField({
				fieldLabel : '月结',
				anchor : '95%',
				itemCls : 'green-b',
				tabIndex : 43,
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				name : 'expenseMonth',
				value : p.get('expenseMonth'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
					}
				}
			});

	// 中转回扣费
	var txtExpenseHkf = new Ext.form.NumberField({
				fieldLabel : '中转回扣',
				anchor : '95%',
				itemCls : 'green-b',
				tabIndex : 44,
				disabled:true,
				//disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				name : 'expenseDiscount',
				value : p.get('expenseDiscount'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
					}
				}
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : '订单编号',
							align : 'center',
							dataIndex : 'orderNo',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.TextField()
						}, {
							header : '货物类别',
							align : 'center',
							dataIndex : 'cargoClassName',
							width : 100,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.ComboBox({
										name : 'cargoClassName',
										displayField : 'categoryName',
										valueField : 'categoryName',
										triggerAction : 'all',
										mode : 'remote',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : WHTStore.getCATEGORY_S()
									})
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.TextField()
						}, {
							header : '包装类型',
							align : 'center',
							dataIndex : 'packName',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.ComboBox({
										displayField : 'unitName',
										valueField : 'unitName',
										triggerAction : 'all',
										mode : 'remote',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : WHTStore.getUNIT_P()
									})
						}, {
							header : '件数',
							align : 'center',
							dataIndex : 'packages',
							width : 50,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '毛重(KGS)',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision :2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '体积(CBM)',
							align : 'center',
							dataIndex : 'volume',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已派车件数'),
							align : 'center',
							dataIndex : 'dispatchPackages',
							width : 80,
							css : 'background:#ffb3a7;',
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : HL('已派车毛重(KGS)'),
							align : 'center',
							dataIndex : 'dispatchGrossWeight',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已派车体积(CBM)'),
							align : 'center',
							dataIndex : 'dispatchVolume',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已发车件数'),
							align : 'center',
							dataIndex : 'departurePackages',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : HL('已发车毛重(KGS)'),
							align : 'center',
							dataIndex : 'departureGrossWeight',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已发车体积(CBM)'),
							align : 'center',
							dataIndex : 'departureVolume',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已到站件数'),
							align : 'center',
							dataIndex : 'stationPackages',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : HL('已到站毛重(KGS)'),
							align : 'center',
							dataIndex : 'stationGrossWeight',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision :2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已到站体积(CBM)'),
							align : 'center',
							dataIndex : 'stationVolume',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision :2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已签收件数'),
							align : 'center',
							dataIndex : 'signPackages',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : HL('已签收毛重(KGS)'),
							align : 'center',
							dataIndex : 'signGrossWeight',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('已签收体积(CBM)'),
							align : 'center',
							dataIndex : 'signVolume',
							width : 120,
							css : 'background:#ffb3a7;',
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '货物价值',
							align : 'center',
							dataIndex : 'premiumValue',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : C_REMARKS,
							align : 'center',
							dataIndex : 'remarks',
							width : 100,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.TextArea()
						}, {
							header : '货物状态',// 主表t_consign的状态赋值给从表t_consign_cargo
							dataIndex : 'cargoStatus',
							align : 'center',
							width : 80,
							editable : false,
							renderer : HTStore.loadStatusRender,// 选过后渲染
							editor : new Ext.form.ComboBox({
										displayField : 'N',
										valueField : 'C',
										triggerAction : 'all',
										mode : 'local',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										disabled : true,
										store : HTStore.loadStatus
									})
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.addConsignCargo = function() {
		var tc = new TConsignCargo({
					uuid : HTUtil.UUID(32),
					version : '0',
					rowAction : 'N'
				});
		grid.stopEditing();
		store.insert(0, tc);
		grid.startEditing(0, 2);
	};

	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};

	var btnAddConsignCargo = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				scope : this,
				disabled : p.get('status') > 1 && p.get('rowAction') != 'N',
				handler : this.addConsignCargo
			});

	var btnDele = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				disabled : p.get('status') > 1 && p.get('rowAction') != 'N',
				handler : this.del
			});

	var txtSumPackages = new Ext.form.TextField({
				fieldLabel : '件数合计',
				anchor : '95%',
				value : p.get('packages'),
				disabled : true
			});

	var txtSumGrossWeight = new Ext.form.TextField({
				fieldLabel : '毛重合计(KGS)',
				anchor : '95%',
				value : p.get('grossWeight'),
				disabled : true
			});

	var txtSumVolume = new Ext.form.TextField({
				fieldLabel : '体积合计(CBM)',
				anchor : '47.4%',
				value : p.get('volume'),
				disabled : true
			});

	this.reCalculate = function() {

		var a = store.getRange();
		var sumPackages = 0;
		var sumGrossWeight = 0;
		var sumVolume = 0;

		for (var i = 0; i < a.length; i++) {
			sumPackages += parseInt(a[i].get('packages'));
			if (a[i].get('grossWeight'))
				sumGrossWeight += parseFloat(a[i].get('grossWeight'));
			if (a[i].get('volume'))
				sumVolume += parseFloat(a[i].get('volume'));
		}
		p.set('packages', sumPackages);
		p.set('grossWeight', sumGrossWeight);
		p.set('volume', sumVolume);

		txtSumPackages.setValue(sumPackages);
		txtSumGrossWeight.setValue(HTUtil.round2(sumGrossWeight));
		txtSumVolume.setValue(HTUtil.round2(sumVolume));
	};

	var grid = new Ext.grid.EditorGridPanel({
				sm : sm,
				cm : cm,
				height : 220,
				clicksToEdit : 1,
				store : store,
				autoScroll : true,
				listeners : {
					scope : this,
					afteredit : function(e) {
						var f = e.field;
						var r = e.record;
						if (f == 'packages') {
							r.set('packages', e.value);
							this.reCalculate();
						} else if (f == 'grossWeight') {
							r.set('grossWeight', e.value);
							this.reCalculate();
						} else if (f == 'volume') {
							r.set('volume', e.value);
							this.reCalculate();
						}
					}
				},
				tbar : [btnAddConsignCargo, '-', btnDele, '-']
			});

	var frm = new Ext.form.FormPanel({
				layout : 'column',
				frame : true,
				autoHeight : true,
				region : 'north',
				padding : 5,
				labelAlign : 'right',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtConsNo, txtConsNoHandler]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtConsDate, txtStartStation]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboGrouName, txtEndStation]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboSalesRepName, txtRouteStation]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [cboCustName]
						}]
			});

	var shipFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '发货方信息',
				labelAlign : 'right',
				autoHeight : true,
				columnWidth : .5,
				padding : 5,
				frame : true,
				layout : 'column',
				items : [{
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtShipperName]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtLoadAddress]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [cboShipperContact, txtShipperTel]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtShipperMoblie]
						}]
			});

	var consFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '收货方信息',
				labelAlign : 'right',
				columnWidth : .5,
				padding : 5,
				autoHeight : true,
				frame : true,
				layout : 'column',
				items : [{
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [cboConsigneeName]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtDeliveryAddress]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtConsigneeContact, txtConsigneeTel]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtConsigneeMobile]
						}]
			});

	var souPan = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '其它信息',
				frame : true,
				autoHeight : true,
				padding : 5,
				labelAlign : 'right',
				layout : 'column',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboStatus, cboFeedbackWay]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [dtLoadDate, cboFeedbackNumber]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtSignInContact, dtArNewDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [ckbSignInStatus, dtSignInDate]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtCargoStatus]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtRemarks]
						}]
			});

	var expFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '费用信息',
				autoHeight : true,
				frame : true,
				labelAlign : 'right',
				padding : 20,
				columnWidth : .5,
				layout : 'column',
				items : [{
					columnWidth : 0.5,
					layout : 'form',
					border : false,
					items : [cboPateName, txtExpenseXff, txtExpenseDff ,
							txtExpenseHkf]
				}, {
					columnWidth : 0.5,
					layout : 'form',
					border : false,
					items : [txtExpenseTotal, txtExpenseYjf,txtExpenseHdf ]
				}]
			});

	var numFrm = new Ext.form.FormPanel({
				frame : true,
				padding : 5,
				autoHeight : true,
				labelAlign : 'right',
				layout : 'column',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtSumPackages]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtSumGrossWeight]
						}, {
							columnWidth : 0.5,
							layout : 'form',
							border : false,
							items : [txtSumVolume]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtDispatchPackages]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtDeparturePackages]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtStationPackages]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtSignPackages]
						}]
			});

	var sm1 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm1 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm1, {
					header : C_CHAR,
					align : 'center',
					dataIndex : 'charName',
					width : 200,
					editor : new Ext.form.ComboBox({
								displayField : 'charCode',
								valueField : 'charName',
								triggerAction : 'all',
								tpl : charTpl,
								itemSelector : 'div.list-item',
								listWidth : 300,
								allowBlank : false,
								emptyText : '',
								invalidText : '',
								mode : 'local',
								selectOnFocus : true,
								listClass : 'x-combo-list-small',
								store : HTStore.getCHAR_S(),
								enableKeyEvents : true,
								listeners : {
									scope : this,
									select : function(c, r, i) {
										var b = sm1.getSelected();
										b.set('charId', r.get('id'));
										b.set('chclId', r.get('chclId'));
										b.set('chclCode', r.get('chclCode'));
										b
												.set('charNameEn',
														r.get('charNameEn'));
										b.set('currCode', r.get('currCode'));
										b.set('unitId', r.get('unitId'));
										b.set('expeExRate', HTStore.getExRate(
														r.get('currCode'),
														'CNY'));
										b.set('charName', r.get('charName'));
									}
								}
							})
				}, {
					header : C_AMOUNT,
					align : 'center',
					dataIndex : 'expeTotalAmount',
					width : 120,
					renderer : function(v, m, r) {
						v = parseFloat(v);
						v = v.toFixed(3);
						if (v == 'NaN') {
							v = '0.000';
						};
						m.css = 'red-b';
						return v;
					},
					editor : new Ext.form.NumberField({
								allowBlank : false
							})
				}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.expAdd = function() {

		var e = new SExpense({
					uuid : HTUtil.UUID(32),
					consId : p.get('id'),
					consNo : p.get('consNo'),
					consDate : p.get('consDate'),
					consBizType : p.get('consBizType'),
					consBizClass : p.get('consBizClass'),
					consCustId : p.get('custId'),
					consCustName : p.get('custName'),
					custId : p.get('custId'),
					custName : p.get('custName'),
					custSname : p.get('custSname'),
					expeType : 'R',
					pateCode : 'P',
					unitName : 'EACH',
					currCode : 'CNY',
					expeExRate : '1.0000',
					expeDate : new Date(),
					expeAllocationFlag : 0,
					expeAllocatedFlag : 0,
					expeInvoiceAmount : 0,
					expeWriteOffAmount : 0,
					expeWriteOffRcAmount : 0,
					expeInnerAmount : 0,
					expeRcAmount : 0,
					expeCommission : 0,
					expeCommissionRate : 0,
					expeTotalAmount : 0,
					expeStatus : 0,
					expeBillStatus : 0,
					expeInvoiceStatus : 0,
					expeWriteOffStatus : 0,
					version : 0,
					rowAction : 'N'
				});
		store2.insert(0, e);
		sm1.selectFirstRow();
		e.set('rowAction', 'N');
	};

	this.expRem = function() {
		var r = sm1.getSelections();
		if (r.length) {
			for (var i = 0; i < r.length; i++) {
				if (r[i].get('expeInvoiceStatus') > 0)
					Ext.Msg.alert(SYS, M_REMOVE_EXP_INVOICED);
				else {
					r[i].set('rowAction', r[i].get('rowAction') == 'N'
									? 'D'
									: 'R');
					store2.remove(r[i]);
				}
			}
		} else
			Ext.Msg.alert(SYS, M_R_P);
	};

	this.expSave = function() {
		var a = store2.getModifiedRecords();
		if (a.length) {
			for (var i = 0; i < a.length; i++) {
				if (a[i].get('rowAction') != 'R'
						&& a[i].get('rowAction') != 'D') {
					if (a[i].get('custId') == '') {
						Ext.Msg.alert(SYS, M_SETTLE_OBJECT_REQUIRED);
						return;
					} else if (a[i].get('charId') == '') {
						Ext.Msg.alert(SYS, M_CHAR_REQUIRED);
						return;
					} else if (a[i].get('expeNum') == ''
							|| a[i].get('expeNum') == '0') {
						Ext.Msg.alert(SYS, C_CHARGE_QUANTITY_REQUIRED);
						return;
					} else if (a[i].get('expeUnitPrice') == ''
							|| a[i].get('expeUnitPrice') == '0') {
						Ext.Msg.alert(SYS, M_UNIT_PRICE_REQUIRED);
						return;
					} else if (a[i].get('currCode') == '') {
						Ext.Msg.alert(SYS, M_CURR_PRICE_REQUIRED);
						return;
					} else if (a[i].get('pateCode') == '') {
						Ext.Msg.alert(SYS, M_PPCC_REQUIRED);
						return;
					}
				}
			}
			var x = HTUtil.ATX(a, 'SExpense', SExpense);
			if (x != '') {
				btnSave.setDisabled(true);
				Ext.Ajax.request({
							scope : this,
							url : SERVICE_URL,
							method : 'POST',
							params : {
								_A : 'EXPE_S'
							},
							success : function(res) {
								var a = HTUtil.XTRA(res.responseXML,
										'SExpense', SExpense);
								for (var i = 0; i < a.length; i++) {
									if (a[i].get('rowAction') == 'N') {
										a[i].set('rowAction', 'M');
									}
								};
								HTUtil.RUA(store2, a, SExpense);
								Ext.Msg.alert(SYS, M_S);
								btnExpSave.setDisabled(false);
							},
							failure : function(res) {
								Ext.Msg.alert(SYS, M_F + res.responseText);
								btnExpSave.setDisabled(false);
							},
							xmlData : HTUtil.HTX(x)
						});
			}
		} else
			Ext.Msg.alert(SYS, M_NC);
	};

	var btnExpAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				scope : this,
				handler : this.expAdd
			});

	var btnExpRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.expRem
			});

	var btnExpSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				scope : this,
				handler : this.expSave
			});

	var expGrg = new Ext.grid.EditorGridPanel({
				columnWidth : .5,
				height : 192,
				autoScroll : true,
				sm : sm1,
				cm : cm1,
				store : store2,
				tbar : [btnExpAdd, '-', btnExpRemove, '-', btnExpSave, '-']
			});

	// 操作提货签收按钮功能的同时，记录货物跟踪状态
	this.addPevent = function(v) {
		var r = new PEvent({
					uuid : HTUtil.UUID(32),
					bizType : 'T',
					status : '0',
					version : '0',
					rowAction : 'N',
					consignId : p.get('id'),
					typeName : v == 1 ? '已提货' : '全部签收',
					operatorName : p.get('salesRepName'),
					trackDate : new Date()
				});
		store1.add(r);
		HTUtil.POST(store1, 'PEvent', PEvent, 'PEVENT_S');
	};

	// 设置按钮状态
	this.updateToolbar = function() {
		btnAddConsignCargo.setDisabled(p.get('status') > 1);
		btnDele.setDisabled(p.get('status') > 1);
		btnSave.setDisabled(NR(m + F_M));
		btnDelPanel.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') > 1);
		btnSendCarTask.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') > 1);
		btnExpenseSubmitRe.setDisabled(p.get('rowAction') == 'N'
				|| p.get('expeSubmitStatus') == 1 || p.get('status') < 9);
		btnExpense
				.setDisabled(p.get('rowAction') == 'N' || p.get('status') < 9);
		btnStorage.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') != 0);
		btnSign.setDisabled(p.get('rowAction') == 'N' || p.get('status') < 4
				|| p.get('status') > 6);
		bAttach.setDisabled(p.get('rowAction') == 'N');
		btnTracing.setDisabled(p.get('rowAction') == 'N');
	};

	this.removeTab = function(r, s) {
		var tab = s.ownerCt; // 得到当前对像所在的容器
		tab.remove(s);
	};

	// 提货签收按钮功能
	this.condition = function(s) {
		var xml = HTUtil.RTX(p, 'TConsign', TConsign);
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TCONS_COS',
						status : s
					},
					success : function(r) {
						var a = HTUtil.XTR(r.responseXML, 'TConsign', TConsign);
						HTUtil.RU(a, p, TConsign);
						if (s == 1) {
							dtLoadDate.setValue(p.get('loadDate'));
							this.addPevent(1);
						}
						if (s == 9) {
							ckbSignInStatus.setValue(p.get('signInStatus'));
							txtSignInContact.setValue(p.get('signInContact'));
							dtSignInDate.setValue(p.get('signInDate'));
							this.addPevent(9);
						}
						cboStatus.setValue(p.get('status'));
						if (listStore)
							listStore.reload();
						this.updateToolbar();
						Ext.Msg.alert(SYS, M_S);
					},
					failure : function(r) {
						Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
					},
					xmlData : HTUtil.HTX(xml)
				});
	};

	// 保存
	this.save = function() {

		if (!HTUtil.checkFieldNotNull(C_CONS_DATE, dtConsDate)) // 接单日期
			return;
		if (!HTUtil.checkFieldNotNull(C_BIZ_DEPARTMENT, cboGrouName)) // 业务部门
			return;
		if (!HTUtil.checkFieldNotNull(C_SALES, cboSalesRepName)) // 业务员
			return;
		if (!HTUtil.checkFieldNotNull('发货地', txtStartStation)) // 始发站
			return;
		if (!HTUtil.checkFieldNotNull('目的地', txtEndStation)) // 目的站
			return;
		if (!HTUtil.checkFieldNotNull('委托单位', cboCustName)) // 委托单位
			return;
		if (!HTUtil.checkFieldNotNull('发货单位', txtShipperName)) // 发货单位
			return;
		if (!HTUtil.checkFieldNotNull('收货单位', cboConsigneeName)) // 收货单位
			return;

		var xf = txtExpenseXff.getValue() != '' ? txtExpenseXff.getValue() : 0;
		var df = txtExpenseDff.getValue() != '' ? txtExpenseDff.getValue() : 0;
		var hdf = txtExpenseHdf.getValue() != '' ? txtExpenseHdf.getValue() : 0;
		var yjf = txtExpenseYjf.getValue() != '' ? txtExpenseYjf.getValue() : 0;
		var hkf = txtExpenseHkf.getValue() != '' ? txtExpenseHkf.getValue() : 0;

		var count = xf + df + hdf + yjf - hkf
		txtExpenseTotal.setValue(count);

		HTUtil.saveToRecord(this, p);

		var xml = HTUtil.RTX(p, 'TConsign', TConsign);
		var a = store.getModifiedRecords();
		xml += HTUtil.ATX(a, 'TConsignCargo', TConsignCargo);
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TCON_S'
					},
					success : function(r) {
						var rowAction = p.get('rowAction');
						var c = HTUtil.XTR(r.responseXML, 'TConsign', TConsign);
						HTUtil.RU(c, p, TConsign);
						var a = HTUtil.XTRA(r.responseXML, 'TConsignCargo',
								TConsignCargo);
						HTUtil.RUA(store, a, TConsignCargo);
						if (rowAction == 'N') {
							txtConsNo.setValue(p.get('consNo'));
							if (listStore) {
								listStore.insert(0, p);
							}
						} else {
							if (listStore) {
								listStore.reload();
							}
						}
						this.updateToolbar();
						Ext.Msg.alert(SYS, M_S);
					},
					failure : function(r) {
						Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
					},
					xmlData : HTUtil.HTX(xml)
				});
	};

	// 删除
	this.delPanel = function() {
		Ext.Msg.confirm(SYS, M_R_C, function(btn) {
					if (btn == 'yes') {
						if (p.get('status') == 0) {
							p.set('rowAction', p.get('rowAction') == 'N'
											? 'D'
											: 'R');
							var xml = HTUtil.RTX4R(p, 'TConsign');
							Ext.Ajax.request({
										scope : this,
										url : SERVICE_URL,
										method : 'POST',
										params : {
											_A : 'TCON_S'
										},
										success : function(res) {
											p.beginEdit();
											p.set('rowAction', 'R');
											p.endEdit();
											this.updateToolbar();
											if (listStore)
												listStore.remove(p);
											this.removeTab(res, this);
										},
										failure : function(res) {
											XMG.alert(SYS, M_F
															+ res.responseText);
										},
										xmlData : HTUtil.HTX(xml)
									});
						} else {
							XMG.alert(SYS, '该派车单不是新增状态，不能删除！');
						}
					}
				}, this);
	};

	// -----生成派车单的回调函数-----
	this.ensure = function(tTransTask, scope) {
		var xml = '';
		xml += HTUtil.RTX(tTransTask, 'TConsign', TConsign);

		var tcs = [];
		var a = store.getRange();
		for (var i = 0; i < a.length; i++) {
			if (a[i].get('cargoStatus') < 2) {
				var tc = new TConsignCargo({
							uuid : HTUtil.UUID(32),
							tconsId : a[i].get('consId'),
							consNo : a[i].get('consNo'),
							consCargoId : a[i].get('id'),
							cargoClassName : a[i].get('cargoClassName'),
							consigneeName : a[i].get('consigneeName'),
							consigneeContact : a[i].get('consigneeContact'),
							consigneeTel : a[i].get('consigneeTel'),
							deliveryPlaceId : a[i].get('deliveryPlaceId'),
							deliveryPlaceName : a[i].get('deliveryPlaceName'),
							deliveryCityId : a[i].get('deliveryCityId'),
							deliveryCity : a[i].get('deliveryCity'),
							deliveryAddress : a[i].get('deliveryAddress'),
							cargoName : a[i].get('cargoName'),
							packName : a[i].get('packName'),
							premiumValue : a[i].get('premiumValue'),
							premiumRate : a[i].get('premiumRate'),
							premiumExpense : a[i].get('premiumExpense'),
							packages : a[i].get('packages'),
							grossWeight : a[i].get('grossWeight'),
							volume : a[i].get('volume'),
							
							remarks : a[i].get('remarks'),
							consBizClass: 'T',
							rowAction : 'N'
						});
				tcs[tcs.length] = tc;
			}
		}
		xml += HTUtil.ATX(tcs, 'TConsignCargo', TConsignCargo);
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TTRT_S_T'
					},
					success : function(r) {
						cboStatus.setValue(p.get('status'));
						if (listStore) {
							listStore.reload();
						}
						btnDelPanel.disable();
						btnSendCarTask.disable();
						btnStorage.disable();
						// 增加货物跟踪记录
						var r = new PEvent({
									uuid : HTUtil.UUID(32),
									bizType : 'T',
									status : '0',
									version : '0',
									rowAction : 'N',
									consignId : p.get('id'),
									typeName : '全部派车',
									operatorName : p.get('salesRepName'),
									trackDate : new Date()
								});
						store1.add(r);
						HTUtil.POST(store1, 'PEvent', PEvent, 'PEVENT_S');
						Ext.Msg.alert(SYS, M_S);
					},
					failure : function(r) {
						Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
					},
					xmlData : HTUtil.HTX(xml)
				});
	};

	// 生成派车单
	this.sendCarTask = function() {
		var win = new Fos.SendCarTaskWin(this.ensure, this);
		win.show();
	};

	// 费用提交
	this.expenseSubmitRe = function() {
		if (p.get('status') != 9) {
			Ext.Msg.alert(SYS, '该单还全部签收！');
		} else {
			Ext.Msg.confirm(SYS, '请确定是否费用提交', function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX(p, 'TConsign', TConsign);
					Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TCONS_EXPE_R'
						},
						success : function(r) {
							var c = HTUtil.XTR(r.responseXML, 'TConsign',
									TConsign);
							HTUtil.RU(c, p, TConsign);
							btnExpenseSubmitRe
									.setDisabled(p.get('rowAction') == 'N'
											|| p.get('expeSubmitStatus') == '1');
							cboPateName.setDisabled(true);// 付款方式
							txtExpenseTotal.setDisabled(true);// 总运费（单票运费）
							txtExpenseXff.setDisabled(true);// 现付费
							txtExpenseDff.setDisabled(true);// 到付费
							txtExpenseYjf.setDisabled(true);// 月结费
							txtExpenseHdf.setDisabled(true);// 回单付费
							txtExpenseHkf.setDisabled(true);// 中转回扣费
							this.updateToolbar();
							listStore.reload();
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, '对不起，您提交失败！');
						},
						xmlData : HTUtil.HTX(xml)
					});
				}
			}, this)
		}
	};

	// 费用
	this.expense = function() {
		var tab = this.ownerCt;
		var c = 'W_EXPE_' + p.get("id");
		tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab
				.add(new Fos.TmsExpenseTab(p, 'TMS')));
	};

	// 提货
	this.storage = function() {
		Ext.Msg.confirm(SYS, '请确定是否提货', function(btn) {
					if (btn == 'yes') {
						this.condition(1);
					}
				}, this);
	};

	// 签收
	this.sign = function() {
		var a = store.getRange();
		if (a.length <= 1) {
			Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
						if (btn == 'yes') {
							this.condition(9);
						}
					}, this);

		} else {
			for (var i = 1; i <= a.length - 1; i++) {
				if (a[i].get('cargoStatus') == a[i + 1].get('cargoStatus')) {
					Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
								if (btn == 'yes') {
									this.condition(9);
								}
							}, this);
				} else {
					Ext.Msg.confirm(SYS, '该单货物信息状态不一致，请确定是否签收', function(btn) {
								if (btn == 'yes') {
									this.condition(9);
								}
							}, this);
				}
			}
		}
	};

	// 文件
	this.showAttach = function() {
		var win = new Fos.AttachWin('T', p.get('id'), p.get('consNo'));
		win.show();
	};

	// 跟踪状态
	this.showTracing = function() {
		var win = new Fos.PEventConsWin(p);
		win.show();
	};

	var m = M1_TMS + TMS_TCON;

	// 保存
	var btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				disabled : NR(m + F_M),
				scope : this,
				handler : this.save
			});

	// 删除
	var btnDelPanel = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				hidden : NR(m + F_R),
				disabled : p.get('rowAction') == 'N' || p.get('status') > 1,
				scope : this,
				handler : this.delPanel
			});

	// 生成派车单
	var btnSendCarTask = new Ext.Button({
				text : '生成派车单',
				iconCls : 'news',
				hidden : NR(m + TMS_SENDCAR_TASK),
				disabled : p.get('rowAction') == 'N' || p.get('status') >1,
				scope : this,
				handler : this.sendCarTask
			});

	// 费用提交
	var btnExpenseSubmitRe = new Ext.Button({
				text : '费用提交',
				iconCls : 'dollar',
				hidden : NR(m + TMS_COST_SUB),
				disabled : p.get('rowAction') == 'N'
						|| p.get('expeSubmitStatus') == '1'
						|| p.get('status') < 9,
				scope : this,
				handler : this.expenseSubmitRe
			});

	// 费用
	var btnExpense = new Ext.Button({
				text : C_EXPE,
				iconCls : 'dollar',
				hidden : NR(M1_TMS + '13'),
				disabled : p.get('rowAction') == 'N' || p.get('status') < 9,
				scope : this,
				handler : this.expense
			});

	// 提货
	var btnStorage = new Ext.Button({
				text : '提货',
				iconCls : 'check',
				hidden : NR(m + TMS_DELIVERY),
				disabled : p.get('rowAction') == 'N' || p.get('status') != 0,
				scope : this,
				handler : this.storage
			});

	// 签收
	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				hidden : NR(m + TMS_SIGN),
				disabled : p.get('rowAction') == 'N' || p.get('status') < 4
						|| p.get('status') > 6,
				scope : this,
				handler : this.sign
			});

	// 文件
	var bAttach = new Ext.Button({
				text : C_ATTACH,
				iconCls : 'news',
				hidden : NR(m + '06'),
				disabled : p.get('rowAction') == 'N',
				scope : this,
				handler : this.showAttach
			});

	// 货物跟踪
	var btnTracing = new Ext.Button({
				text : C_CARGO_TRACING,
				iconCls : 'add',
				hidden : NR(m + '04'),
				disabled : p.get('rowAction') == 'N',
				scope : this,
				handler : this.showTracing
			});

	Fos.TConsignTable.superclass.constructor.call(this, {
				id : 'TRAN_' + p.get("uuid"),
				modal : true,
				title : p.get('rowAction') == 'N' ? '新增陆运单' : '编辑/查看陆运单-'
						+ p.get('consNo'),
				closable : true,
				layout : 'form',
				autoScroll : true,
				tbar : [btnSave, '-', btnDelPanel, '-', btnSendCarTask, '-',
						btnExpenseSubmitRe, '-', btnExpense, '-', '->',
						btnStorage, '-', btnSign, '-', bAttach, '-', btnTracing],
				items : [{
							layout : 'form',
							autoHeight : true,
							items : [frm, {
										layout : 'column',
										autoHeight : true,
										items : [shipFrm, consFrm]
									}]
						}, {
							title : '货物信息',
							autoHeight : true,
							layout : 'form',
							items : [grid, numFrm, {
										layout : 'column',
										autoHeight : true,
										items : [expGrg, expFrm]
									}]

						}, souPan]
			});
};
Ext.extend(Fos.TConsignTable, Ext.Panel);

// 货物日报表
Fos.CargoReportTab = function() {

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
				id : 'fStatusId',
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

	var search = function(v) {

		var url = REPORT_URL;
		url += '&__report=reports/tms_TCargoReport.rptdesign&compCode='
				+ sessionStorage.getItem("COMP_CODE");

		var params = '';
		if (txtConsNo.getValue()) {
			params += '&consNo=' + txtConsNo.value;
		}
		if (txtConsNoHandler.getValue()) {
			params += '&consNoHandler=' + txtConsNoHandler.value;
		}
		if (dtConsDate.getValue()) {
			params += '&consDate=' + dtConsDate.getValue();
		}
		if (dtConsDate2.getValue()) {
			params += '&consDate2=' + dtConsDate2.getValue();
		}
		if (txtFeedbackStatus.getValue()) {
			params += '&receiptStatus=' + txtFeedbackStatus.getValue();
		}
		if (txtDemageStatus.getValue()) {
			params += '&demageFlag=' + txtDemageStatus.getValue();
		}
		if (dtFeedbackDate.getValue()) {
			params += '&receiptDate=' + dtFeedbackDate.getValue();
		}
		if (dtFeedbackDate2.getValue()) {
			params += '&receiptDate2=' + dtFeedbackDate2.getValue();
		}
		if (txtStartStation.getValue()) {
			params += '&startStation=' + txtStartStation.getValue();
		}
		if (txtEndStation.getValue()) {
			params += '&endStation=' + txtEndStation.getValue();
		}
		if (dtSignInDate.getValue()) {
			params += '&signatureDate=' + dtSignInDate.getValue();
		}
		if (dtSignInDate2.getValue()) {
			params += '&signatureDate2=' + dtSignInDate2.getValue();
		}

		url = url + params;
		if (v == 'S') {
			Ext.get('IF_AC').dom.src = url;
		} else {
			url += "&__format=xls";
			window
					.open(
							url,
							'download',
							'height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		}
	};

	var doc = new Ext.ux.IFrameComponent({
				id : 'AC',
				url : '',
				title : '明细',
				labeAction : 'right',
				padding : 5,
				height : 425,
				width : '100%'
			});

	var frm = new Ext.form.FormPanel({
				title : '查询条件',
				layout : 'column',
				height : 120,
				collapsible : true,
				padding : 5,
				labelWidth : 80,
				layoutConfig : {
					columns : 4
				},
				labelAlign : 'right',
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
						}]
			});

	var btnReset = new Ext.Button({
				text : '重置',
				scope : this,
				iconCls : 'renew',
				handler : function() {
					frm.getForm().reset();
					txtFeedbackStatus.clearValue();
					txtDemageStatus.clearValue();
				}
			});

	var btnExpExcel = new Ext.Button({
				text : "输出报表",
				iconCls : 'print',
				scope : this,
				handler : function() {
					search('E');
				}
			});

	var btnReport = new Ext.Button({
				text : "生成报表",
				iconCls : 'stats',
				scope : this,
				handler : function() {
					search('S');
				}
			});

	Fos.CargoReportTab.superclass.constructor.call(this, {
				id : 'P_REPORT',
				iconCls : 'stats',
				title : C_REPORT_TRACING,
				closable : true,
				layout : 'form',
				autoScroll : true,
				tbar : [btnReport, '-', btnExpExcel, '-', btnReset],
				items : [frm, doc]
			});
};
Ext.extend(Fos.CargoReportTab, Ext.Panel);

// 陆运业务查询
Fos.TconReportTab = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TCONS_Q',
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

	// 接单日期从
	var dtConsiDate = new Ext.form.DateField({
				anchor : '95%',
				format : DATEF,
				name : 'consDate'
			});

	// 至接单日期
	var dtConsiDate2 = new Ext.form.DateField({
				anchor : '95%',
				format : DATEF,
				name : 'consDate2'
			});

	// 委托单位
	var cbooCustName = new Fos.CustomerLookup({
				anchor : '95%',
				name : 'custName',
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
				enableKeyEvents : true,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
						}
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
						},
						buffer : BF
					}
				}
			});

	this.search = function() {
		if (dtConsiDate.getValue() == '' && dtConsiDate2.getValue() == ''
				&& cbooCustName.getValue == '') {
			Ext.Msg.alert(SYS, '请输入查询条件！');
			store.baseParams = {
				_A : 'TCONS_Q',
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

			if (dtConsiDate.getValue() && dtConsiDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsiDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'consDate2',
							value : dtConsiDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (dtConsiDate.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate',
							value : dtConsiDate.getValue().format(DATEF),
							op : GE
						});
			} else if (dtConsiDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'consDate2',
							value : dtConsiDate2.getValue().format(DATEF),
							op : LE
						});
			}

			if (cbooCustName.getValue())
				a[a.length] = new QParam({
							key : 'custName',
							value : cbooCustName.getValue(),
							op : LI
						});

			store.baseParams = {
				_A : 'TCONS_Q',
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
							header : '应收总费用',
							align : 'center',
							dataIndex : 'expenseTotal',
							width : 90,
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '接单日期',
							align : 'center',
							dataIndex : 'consDate',
							width : 100,
							renderer : formatDate,
							editable : false,
							editor : new Ext.form.DateField({
										format : DATEF
									})
						}, {
							header : '发货单位',
							align : 'center',
							dataIndex : 'shipperName',
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
							header : '发货地址',
							align : 'center',
							dataIndex : 'shipperAddress',
							width : 150,
							editable : false,
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : ''
									})
						}, {
							header : '收货单位',
							align : 'center',
							dataIndex : 'consigneeName',
							width : 150,
							editable : false,
							editor : new Ext.form.ComboBox({
										displayField : 'shipperName',
										valueField : 'shipperName',
										triggerAction : 'all',
										mode : 'local',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : HTStore
												.getShipperStore('TMS_CONSIGNEE_Q')
									})
						}, {
							header : '收货地址',
							align : 'center',
							dataIndex : 'consigneeAddress',
							width : 150,
							editable : false,
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : ''
									})
						}, {
							header : '总件数',
							align : 'center',
							dataIndex : 'packages',
							width : 80,
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '总毛重(KGS)',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 100,
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '总体积(CBM)',
							align : 'center',
							dataIndex : 'volume',
							width : 100,
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}]
			});

	var btnSearch = new Ext.Button({
				text : '查询',
				iconCls : 'search',
				scope : this,
				handler : this.search
			});

	var btnReset = new Ext.Button({
				text : '重置',
				scope : this,
				iconCls : 'renew',
				handler : function() {
					dtConsiDate.reset();
					dtConsiDate2.reset();
					cbooCustName.clearValue();
				}
			});

	this.searchReport = function() {
		if (store.baseParams.xml) {
			EXPC('TCON_REPORT', '&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		} else {
			EXPC('TCON_REPORT', '&sort=id&dir=ASC');
		}
	};

	var btnExpExcel = new Ext.Button({
				text : "输出报表",
				iconCls : 'print',
				scope : this,
				handler : this.searchReport
			});

	Fos.TconReportTab.superclass.constructor.call(this, {
				id : 'TCON',
				iconCls : 'stats',
				title : C_TCON_TRACING,
				closable : true,
				autoScroll : true,
				store : store,
				sm : sm,
				cm : cm,
				loadMask : true,
				tbar : [{
							xtype : 'tbtext',
							text : '接单日期：'
						}, '-', dtConsiDate, '-', dtConsiDate2, '-', {
							xtype : 'tbtext',
							text : '委托单位：'
						}, '-', cbooCustName, '-', btnSearch, '-', btnReset,
						'-', btnExpExcel],
				bbar : PTB(store, C_PS20)
			});
};
Ext.extend(Fos.TconReportTab, Ext.grid.GridPanel);

// 生成派车单窗口
Fos.SendCarTaskWin = function(fn, scope) {

	var tt = new TConsign({
				uuid : HTUtil.UUID(32),
				rowAction : 'N',
				consBizType : BT_T,
				consBizClass : 'T',
				consDate : new Date()
			});

	// 车队
	var cboMotorcadeName = new Fos.CustomerLookup({
				fieldLabel : '承运商',
				name : 'motorcadeName',
				value : tt.get('motorcadeName'),
				itemCls : 'required',
				tabIndex : 1,
				store : HTStore.getCS(),
				enableKeyEvents : true,
				tpl : custTpl,
				itemSelector : 'div.list-item',
				listWidth : C_LW,
				custType : 'custTrackFlag',
				displayField : 'custCode',
				valueField : 'custNameCn',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				bizType : BT_T,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						tt.set('motorcadeId', r.get('id'));
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custTrackFlag');
							if (e.getKey() == e.ENTER) {
								cboVehicleNo.focus();
							}
						},
						buffer : BF
					}
				}
			});

			// 驾驶员
	var cboDriverName = new Ext.form.ComboBox({
				fieldLabel : '司机',
				name : 'driverName',
				tabIndex : 2,
				store : HTStore.getDriverName('TTRT_DRIV_Q'),
				value : tt.get('driverName'),
				itemCls : 'required',
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
						cboVehicleNo.setValue(r.get('vehicleNo'));
					},
					keyup : {
						fn : function(f, e) {
							listDriverName(f, e);
							if (e.getKey() == e.ENTER) {
								cboPateName.focus();
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
				value : tt.get('vehicleNo'),
				tabIndex : 3,
				store : HTStore.getVehicleNo('TTRT_VEHI_Q'),
				itemCls : 'required',
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
								cboDriverName.focus();
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

	// 付款方式
	var cboPateName = new Ext.form.ComboBox({
				fieldLabel : '付款方式',
				anchor : '95%',
				tabIndex : 4,
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'payMethod',
				triggerAction : 'all',// all表示把下拉框列表框的列表值全部显示出来
				enableKeyEvents : true,
				store : HTStore.getPAY_S,
				mode : 'local',
				displayField : 'NAME',
				valueField : 'CODE',
				value : tt.get('payMethod'),
				triggerAction : 'all',
				selectOnFocus : true,
				listeners : {
					scope : this,
					select: function(c, r, i){
						if(i==0){
							txtExpenseXff.enable();
							txtExpenseDff.enable();
							txtExpenseHdf.enable();
							txtExpenseYjf.enable();
							txtExpenseHkf.enable();
						}
						if(i==1){
							txtExpenseXff.enable();
							txtExpenseDff.disable();
							txtExpenseHdf.disable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if(i==2){
							txtExpenseXff.disable();
							txtExpenseDff.enable();
							txtExpenseHdf.disable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if(i==3){
							txtExpenseXff.disable();
							txtExpenseDff.disable();
							txtExpenseHdf.enable();
							txtExpenseYjf.disable();
							txtExpenseHkf.disable();
						}
						if(i==4){
							txtExpenseXff.disable();
							txtExpenseDff.disable();
							txtExpenseHdf.disable();
							txtExpenseYjf.enable();
							txtExpenseHkf.disable();
						}
					},
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							motorcadeExpense.focus();
						}
					}
				}
			});

	// 物流运费
	var motorcadeExpense = new Ext.form.NumberField({
				fieldLabel : '物流运费',
				anchor : '95%',
				tabIndex : 5,
				disabled : true ,
				itemCls : 'green-b',
				allowBlank : true,
				name : 'expenseTotal',
				value : tt.get('expenseTotal'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseXff.focus();
						}
					}
				}
			});

	// 现付费
	var txtExpenseXff = new Ext.form.NumberField({
				fieldLabel : '现付',
				anchor : '95%',
				tabIndex : 6,
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseSpot',
				value : tt.get('expenseSpot'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseDff.focus();
						}
					}
				}
			});

	// 到付费
	var txtExpenseDff = new Ext.form.NumberField({
				fieldLabel : '到付',
				anchor : '95%',
				tabIndex : 7,
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseFreight',
				value : tt.get('expenseFreight'),
				enableKeyEvents : true,
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseHdf.focus();
						}
					}
				}
			});

	// 回单付费
	var txtExpenseHdf = new Ext.form.NumberField({
				fieldLabel : '回单付',
				anchor : '95%',
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				allowBlank : true,
				tabIndex : 8,
				name : 'expenseReceipt',
				value : tt.get('expenseReceipt'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseYjf.focus();
						}
					}
				}
			});

	// 月结费
	var txtExpenseYjf = new Ext.form.NumberField({
				fieldLabel : '月结',
				anchor : '95%',
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				allowBlank : true,
				tabIndex : 9,
				name : 'expenseMonth',
				value : tt.get('expenseMonth'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseHkf.focus();
						}
					}
				}
			});

	// 中转回扣费
	var txtExpenseHkf = new Ext.form.NumberField({
				fieldLabel : '中转回扣',
				anchor : '95%',
				tabIndex : 10,
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseDiscount',
				value : tt.get('expenseDiscount'),
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPremiumExpense.focus();
						}
					}
				}
			});

	// 保险费
	var txtPremiumExpense = new Ext.form.NumberField({
				fieldLabel : '保费',
				itemCls : 'green-b',
				disabled : tt.get('expeSubmitStatus') == '1',
				name : 'premiumExpense',
				value : tt.get('premiumExpense'),
				tabIndex : 11,
				anchor : '95%'
			});

	this.save = function() {
		if (Ext.isEmpty(cboMotorcadeName.getValue())) {
			Ext.Msg.alert(SYS, "承运商不能为空！");
			return;
		}
		if (Ext.isEmpty(cboDriverName.getValue())) {
			Ext.Msg.alert(SYS, "司机不能为空！");
			return;
		}
		if (Ext.isEmpty(cboVehicleNo.getValue())) {
			Ext.Msg.alert(SYS, "车牌号不能为空！");
			return;
		}
		
		var total = motorcadeExpense.getValue() != '' ? motorcadeExpense
				.getValue() : 0;
		var xf = txtExpenseXff.getValue() != '' ? txtExpenseXff.getValue() : 0;
		var df = txtExpenseDff.getValue() != '' ? txtExpenseDff.getValue() : 0;
		var hdf = txtExpenseHdf.getValue() != '' ? txtExpenseHdf.getValue() : 0;
		var yjf = txtExpenseYjf.getValue() != '' ? txtExpenseYjf.getValue() : 0;
		var hkf = txtExpenseHkf.getValue() != '' ? txtExpenseHkf.getValue() : 0;

		var count = xf + df + hdf + yjf - hkf
		motorcadeExpense.setValue(count);
		tt.set('motorcadeName', cboMotorcadeName.getValue());
		tt.set('vehicleNo', cboVehicleNo.getValue());
		tt.set('driverName', cboDriverName.getValue());
		tt.set('payMethod', cboPateName.getValue());
		tt.set('expenseTotal', motorcadeExpense.getValue());
		tt.set('expenseSpot', txtExpenseXff.getValue());
		tt.set('expenseFreight', txtExpenseDff.getValue());
		tt.set('expenseReceipt', txtExpenseHdf.getValue());
		tt.set('expenseMonth', txtExpenseYjf.getValue());
		tt.set('expenseDiscount', txtExpenseHkf.getValue());
		tt.set('premiumExpense', txtPremiumExpense.getValue());
		fn(tt, scope);
		this.close();
	};

	var frm = new Ext.form.FormPanel({
				region : 'north',
				height : 120,
				layout : 'column',
				// frame : true,
				labelAlign : 'right',
				padding : 10,
				items : [{
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [cboMotorcadeName,cboDriverName ,
									cboVehicleNo]
						}]
			});

	var costFrm = new Ext.form.FormPanel({
				title : '费用信息',
				region : 'center',
				// bodyStyle:'padding-top:40px',
				// frame : true,
				padding : 10,
				labelAlign : 'right',
				layout : 'column',
				items : [{
					columnWidth : .5,
					layout : 'form',
					border : false,
					items : [cboPateName, txtExpenseXff, txtExpenseHdf,
							txtExpenseHkf]
				}, {
					columnWidth : .5,
					layout : 'form',
					border : false,
					items : [motorcadeExpense, txtExpenseDff, txtExpenseYjf,
							txtPremiumExpense]
				}]
			});

	Fos.SendCarTaskWin.superclass.constructor.call(this, {
				title : '生成派车单',
				height : 350,
				width : 500,
				modal : true,
				layout : 'border',
				items : [frm, costFrm],
				buttons : [{
							text : C_OK,
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
Ext.extend(Fos.SendCarTaskWin, Ext.Window);
