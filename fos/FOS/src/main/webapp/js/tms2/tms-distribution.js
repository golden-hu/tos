Fos.TDistributionList = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'DISTR_Q',
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
					direction : 'desc'
				}
			});

	store.load({
				params : {
					start : 0,
					limit : C_PS
				}
			});

	this.changeBtnStatus = function(p) {
		var p = sm.getSelected();
		// 新增加一条
		if (p.get('status') < 1) {
			btnEdit.enable();
			btnRemove.enable();
		}

		// 签收状态
		if (p.get('status') == 9) {
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
							header : '配送单号',
							align : 'center',
							dataIndex : 'consNo',
							width : 150
						}, {
							header : '司机',
							align : 'center',
							dataIndex : 'driverName',
							width : 150
						}, {
							header : C_VEHICLE_NO,
							align : 'center',
							dataIndex : 'vehicleNo',
							width : 100
						}, {
							header : '司机电话',
							align : 'center',
							dataIndex : 'driverTel',
							width : 100
						}, {
							header : '件数合计',
							align : 'center',
							dataIndex : 'packages',
							width : 100
						}, {
							header : '毛重合计',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 100
						}, {
							header : '体积合计',
							align : 'center',
							dataIndex : 'volume',
							width : 100
						}, {
							header : '配送日期',
							align : 'center',
							dataIndex : 'consDate',
							renderer : formatDate,
							width : 100
						}, {
							header : '配送费',
							align : 'center',
							dataIndex : 'expenseTotal',
							width : 100
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.showDistr = function(p) {

		var tab = this.ownerCt;
		var c = 'DIS_ADD_' + p.get("uuid");
		tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab
				.add(new Fos.TDistributionTable(p, store)));
	};

	this.add = function() {
		var p = new TConsign({
					uuid : HTUtil.UUID(32),
					rowAction : 'N',
					consDate : new Date(),
					consBizType : BT_T,
					consBizClass : 'P',
					distrMethod : HTStore.getCheckDistr(2),
					grouId : HTStore.getCFG('DEFAULT_DEPT_T'),
					grouName : HTStore.getCFGD('DEFAULT_DEPT_T'),
					consOperatorId : sessionStorage.getItem("USER_ID"),
					consOperatorName : sessionStorage.getItem("USER_NAME")
				});

		this.showDistr(p);
	};

	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			if (b.get('status') < 5) {
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
			this.showDistr(p);
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	// 查询
	this.search = function() {
		var transTaskNo = kw.getValue();
		if (!transTaskNo) {
			XMG.alert(SYS, C_TRANS_TASK_NO_REQUIRED, function(b) {
						kw.focus();
					});
			return;
		} else {
			if (transTaskNo == '请输入派车单号...') {
				XMG.alert(SYS, C_TRANS_TASK_NO_REQUIRED, function(b) {
							kw.focus();
						});
				return;
			} else {
				var a = [];
				a[a.length] = {
					key : 'consNo',
					value : transTaskNo,
					op : LI
				};
				store.baseParams = {
					_A : 'TTRT_SEARCH',
					_mt : 'json',
					xml : Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))
				};
				store.reload({
							params : {
								start : 0,
								limit : C_PS
							},
							callback : function(r) {
								if (r.length == 0)
									XMG.alert(SYS, M_NOT_FOUND);
							}
						});
			}
		}
	};

	var kw = new Ext.form.TextField({
				value : '请输入配送单号...',
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

	var m = M1_TMS + TMS_DISTRIBUTION;

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

	Fos.TransTaskGrid.superclass.constructor.call(this, {
				title : C_DISTRIBUTION_LIST,
				id : 'DIS',
				iconCls : 'grid',
				autoScroll : true,
				sm : sm,
				cm : cm,
				store : store,
				closable : true,
				listeners : {
					scope : this,
					rowdblclick : function(grid, rowIndex, event) {
						var p = sm.getSelected();
						if (p) {
							this.showDistr(p);
						}
					}
				},
				tbar : [btnAdd, '-', btnEdit, '-', btnRemove, '-', kw,
						btnSearch],
				bbar : PTB(store, C_PS)
			});
};
Ext.extend(Fos.TDistributionList, Ext.grid.GridPanel);

Fos.TDistributionTable = function(p, listStore) {

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
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	if (p.get('rowAction') != 'N')
		store.load({
					params : {
						consId : p.get('id')
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

	// 配送单号
	var txtTaskNo = new Ext.form.TextField({
				fieldLabel : '配送单号',
				name : 'consNo',
				value : p.get('consNo'),
				disabled : true,
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

	// 司机
	var cboMotorcadeName = new Ext.form.ComboBox({
				fieldLabel : '司机',
				name : 'driverName',
				tabIndex : 13,
				store : HTStore.getDriverName('TTRT_DRIV_Q'),
				value : p.get('driverName'),
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
						txtDriverTel.setValue(r.get('driverTel'));
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
				value : p.get('vehicleNo'),
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
								txtDriverTel.focus();
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

	// 司机电话
	var txtDriverTel = new Ext.form.TextField({
				fieldLabel : C_DRIVER_TEL,
				name : 'driverTel',
				value : p.get('driverTel'),
				tabIndex : 4,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtDistrDate.focus();
						}
					}
				}
			});

	// 配送日期
	var dtDistrDate = new Ext.form.DateField({
				fieldLabel : '配送日期',
				name : 'consDate',
				value : p.get('consDate'),
				tabIndex : 5,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtPremiumDateTo.focus();
						}
					}
				}
			});

	// 配送方式
	var txtDistrStatus = new Ext.form.ComboBox({
				fieldLabel : ' 配送方式',
				tabIndex : 6,
				name : 'distrMethod',
				value : p.get('distrMethod'),
				mode : 'local',
				anchor : '95%',
				store : HTStore.getDISTR,
				displayField : 'NAME',
				valueField : 'CODE',
				typeAhead : true,
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							distrExpense.focus();
						}
					}
				}
			});

	// 配送费
	var distrExpense = new Ext.form.NumberField({
				fieldLabel : '配送费',
				anchor : '95%',
				itemCls : 'green-b',
				name : 'expenseTotal',
				value : p.get('expenseTotal'),
				tabIndex : 7
			});

	var upperFrm = new Ext.form.FormPanel({
				autoHeight : true,
				layout : 'column',
				frame : true,
				labelAlign : 'right',
				padding : 20,
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							labelWidth : 100,
							items : [txtTaskNo, dtDistrDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboMotorcadeName, txtDistrStatus]
						}, {
							columnWidth : .25,
							layout : 'form',
							labelWidth : 100,
							border : false,
							items : [cboVehicleNo, distrExpense]
						}, {
							columnWidth : .25,
							layout : 'form',
							labelWidth : 100,
							border : false,
							items : [txtDriverTel]
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [sm, {
							header : '陆运单号',
							align : 'center',
							dataIndex : 'consNo',
							editable : false,
							width : 120
						}, {
							header : '货物类别',
							align : 'center',
							dataIndex : 'cargoClassName',
							editable : false,
							width : 130
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							editable : false,
							width : 100
						}, {
							header : '件数',
							align : 'center',
							dataIndex : 'packages',
							width : 80,
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '毛重(KGS)',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 90,
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '体积(CBM)',
							align : 'center',
							dataIndex : 'volume',
							width : 90,
							editable : false,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '收货单位',
							align : 'center',
							dataIndex : 'consigneeName',
							editable : false,
							width : 150
						}, {
							header : '收货联系人',
							align : 'center',
							dataIndex : 'consigneeContact',
							editable : false,
							width : 100
						}, {
							header : '收货联系方式',
							align : 'center',
							dataIndex : 'consigneeTel',
							editable : false,
							width : 110
						}, {
							header : '收货地址',
							align : 'center',
							dataIndex : 'deliveryAddress',
							editable : false,
							width : 200
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	var txtPackages = new Ext.form.TextField({
				width : 80,
				value : p.get('packages'),
				disabled : true
			});
	var txtGrossWeight = new Ext.form.TextField({
				width : 80,
				value : p.get('grossWeight'),
				disabled : true
			});
	var txtVolume = new Ext.form.TextField({
				width : 80,
				value : p.get('volume'),
				disabled : true
			});

	var reCalculate = function() {
		var sumP = 0;
		var sumG = 0;
		var sumM = 0;
		var a = store.getRange();
		for (var i = 0; i < a.length; i++) {
			if (a[i].get('packages') > 0)
				sumP += parseInt(a[i].get('packages'));
			if (a[i].get('grossWeight') > 0)
				sumG += parseFloat(a[i].get('grossWeight'));
			if (a[i].get('volume') > 0)
				sumM += parseFloat(a[i].get('volume'));
		}
		p.set('packages', sumP);
		p.set('grossWeight', sumG);
		p.set('volume', sumM);
		txtPackages.setValue(sumP);
		txtGrossWeight.setValue(sumG);
		txtVolume.setValue(sumM);
	};

	var addCargos = function(a) {
		for (var i = 0; i < a.length; i++) {
			if (store.find('consCargoId', a[i].get('id')) == -1) {
				var t = new TConsignCargo({
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
							// 从TConsignCargo中取得剩余‘件毛体’
							packages : a[i].get('surplusPackages'),
							grossWeight : a[i].get('surplusGrossWeight'),
							volume : a[i].get('surplusVolume'),

							remarks : a[i].get('remarks'),
							consBizClass : 'T',
							rowAction : 'N'
						});
				store.add(t);
			}
		}
		reCalculate();
	};

	// 派车 增加货物
	this.addCargo = function() {
		var win = new Fos.TConsignLookup(addCargos);
		win.show();
	};

	this.del = function() {
		HTUtil.REMOVE_SM(sm, store);
	};

	var btnAddCargo = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				scope : this,
				disabled : p.get('status') >= 3 || p.get('rowAction') != 'N',
				handler : this.addCargo
			});

	var btnDele = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				disabled : p.get('status') >= 3 || p.get('rowAction') != 'N',
				handler : this.del
			});

	var grid = new Ext.grid.EditorGridPanel({
				title : '货物信息',
				iconCls : 'gen',
				height : 435,
				autoScroll : true,
				sm : sm,
				cm : cm,
				store : store,
				listeners : {
					scope : this,
					afteredit : function(e) {
						var f = e.field;
						if (f == 'packages' || f == 'grossWeight'
								|| f == 'volume') {
							reCalculate();
						}
					}
				},
				tbar : [btnAddCargo, '-', btnDele, '-', '->', {
							xtype : 'tbtext',
							text : '件数合计：'
						}, txtPackages, {
							xtype : 'tbtext',
							text : '毛重合计(KGS)：'
						}, txtGrossWeight, {
							xtype : 'tbtext',
							text : '体积合计(CBM)：'
						}, txtVolume]
			});

	// 更改按钮状态
	this.updateToolbar = function() {
		btnAddCargo.setDisabled(p.get('status') >= 3);
		btnDele.setDisabled(p.get('status') >= 3);
		btnSavPanel.setDisabled(p.get('status') >= 3);
		btnDelPanel.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') >= 3);
		btnComplete.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') >= 3);
	};

	// 保存
	this.savPanel = function() {
		if (!HTUtil.checkFieldNotNull('司机', cboMotorcadeName))
			return;
		if (!HTUtil.checkFieldNotNull(C_VEHICLE_NO, cboVehicleNo))
			return;

		HTUtil.saveToRecord(this, p);

		var xml = HTUtil.RTX(p, 'TConsign', TConsign);
		var a = store.getModifiedRecords();
		xml += HTUtil.ATX(a, 'TConsignCargo', TConsignCargo);
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TTRT_S_T'
					},
					success : function(r) {
						var rowAction = p.get('rowAction');
						var c = HTUtil.XTR(r.responseXML, 'TConsign', TConsign);
						HTUtil.RU(c, p, TConsign);
						var a = HTUtil.XTRA(r.responseXML, 'TConsignCargo',
								TConsignCargo);
						HTUtil.RUA(store, a, TConsignCargo);
						if (rowAction == 'N') {
							txtTaskNo.setValue(p.get('consNo'));
							if (listStore)
								listStore.insert(0, p);
						} else {
							if (listStore)
								listStore.reload();
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

	this.removeTab = function(r, s) {
		var tab = s.ownerCt;
		tab.remove(s);
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
							HTUtil.REQUEST('TTRT_S_T', xml, this.removeTab,
									this);
							this.updateToolbar();
							if (listStore)
								listStore.remove(p);
						} else {
							XMG.alert(SYS, '该派车单不是新增状态，不能删除！');
						}
					}
				}, this);
	};

	this.overDis = function(ttTrans, scope) {

		var xml = '';
		xml += HTUtil.RTX(ttTrans, 'TConsign', TConsign);

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
							consBizClass : 'T',
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
						if (listStore)
							listStore.reload();
						btnSavPanel.disable();
						btnDelPanel.disable();
						btnComplete.disable();
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
	this.complete = function() {
		var win = new Fos.SendCarWin(this.overDis, this);
		win.show();
	};

	var m = M1_TMS + TMS_DISTRIBUTION;

	// 保存按钮
	var btnSavPanel = new Ext.Button({
				text : '保存',
				iconCls : 'save',
				hidden : NR(m + F_M),
				disabled : p.get('status') >= 3,
				scope : this,
				handler : this.savPanel
			});

	// 删除按钮
	var btnDelPanel = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				hidden : NR(m + F_R),
				disabled : p.get('rowAction') == 'N' || p.get('status') > 1,
				scope : this,
				handler : this.delPanel
			});

	var btnComplete = new Ext.Button({
				text : '生成派车单',
				iconCls : 'news',
				scope : this,
				hidden : NR(m + TMS_SIGN),
				disabled : p.get('rowAction') == 'N' || p.get('status') > 1,
				handler : this.complete
			});

	Fos.TDistributionTable.superclass.constructor.call(this, {
				id : 'DIS_ADD_' + p.get("uuid"),
				title : p.get('rowAction') == 'N'
						? C_ADD_DISTRIBUTION
						: C_EDIT_DISTRBUTION + '-' + p.get('consNo'),
				layout : 'form',
				modal : true,
				autoScroll : true,
				closable : true,
				autoHeight : true,
				items : [upperFrm, grid],
				tbar : [btnSavPanel, '-', btnDelPanel, '-', btnComplete]
			});
};
Ext.extend(Fos.TDistributionTable, Ext.Panel);

// 生成派车单窗口
Fos.SendCarWin = function(fn, scope) {

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
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							tt.set('motorcadeId', '');
							tt.set('motorcadeName', '');
						}
					},
					select : function(c, r, i) {
						txtMotorcadeContact.setValue(r.get('custContact'));
						txtMotorcadeTel.setValue(r.get('custTel'));
						tt.set('motorcadeId', r.get('id'));
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custTrackFlag');
							if (e.getKey() == e.ENTER) {
								txtMotorcadeContact.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 车队联系人
	var txtMotorcadeContact = new Ext.form.TextField({
				fieldLabel : '承运商联系人',
				name : 'motorcadeContact',
				value : tt.get('motorcadeContact'),
				tabIndex : 2,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtMotorcadeTel.focus();
						}
					}
				}
			});

	// 车队联系电话
	var txtMotorcadeTel = new Ext.form.TextField({
				fieldLabel : '承运商联系方式',
				name : 'motorcadeTel',
				value : tt.get('motorcadeTel'),
				tabIndex : 3,
				anchor : '95%',
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
				tabIndex : 4,
				disabled : tt.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'payMethod',
				triggerAction : 'all',
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
				disabled : true,
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
		tt.set('motorcadeContact', txtMotorcadeContact.getValue());
		tt.set('motorcadeTel', txtMotorcadeTel.getValue());
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
				labelAlign : 'right',
				padding : 10,
				items : [{
					columnWidth : 1,
					layout : 'form',
					border : false,
					labelWidth : 110,
					items : [cboMotorcadeName, txtMotorcadeContact,
							txtMotorcadeTel]
				}]
			});

	var costFrm = new Ext.form.FormPanel({
				title : '费用信息',
				region : 'center',
				layout : 'column',
				labelAlign : 'right',
				padding : 10,
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
Ext.extend(Fos.SendCarWin, Ext.Window);
