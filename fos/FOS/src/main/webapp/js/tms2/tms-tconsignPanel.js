Fos.TConsignTabl = function(p, listStore) {

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
					direction : 'desc'
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
				fieldLabel : '发货地',
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
				fieldLabel : '目的地',
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
				fieldLabel : '中转地',
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
				anchor : '97.3%',
				name : 'custName',
				value : p.get('custName'),
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
							txtShipperTel.setValue(r.get('custTel2'));
						}
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								cboPateName.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 付款方式
	var cboPateName = new Ext.form.ComboBox({
				fieldLabel : '付款方式',
				anchor : '47.47%',
				tabIndex : 10,
				itemCls : 'required',
				name : 'pateName',
				value : p.get('pateName'),
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				mode : 'local',
				displayField : 'NAME',
				valueField : 'CODE',
				store : HTStore.getPAY_S,
				triggerAction : 'all',// all表示把下拉框列表框的列表值全部显示出来
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtShipperName.focus();
						}
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
						txtShipperTel.setValue(r.get('custTel2'));
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
				name : 'loadAddress',
				value : p.get('loadAddress'),
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
	var cboShipperContact = new Ext.form.ComboBox({
				fieldLabel : '发货联系人',
				anchor : '95%',
				name : 'shipperContact',
				value : p.get('shipperContact'),
				tabIndex : 13,
				displayField : 'custContact',
				valueField : 'custContact',
				store : HTStore.getCUCOS(),
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,// 选中表单项所有存在文本
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						txtShipperMoblie.setValue(r.get('custTel'));
					},
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtShipperMoblie.focus();
						}
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

	// 发货人- 手机号码
	var txtShipperMoblie = new Ext.form.TextField({
				fieldLabel : '手机号码',
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
				name : 'shipperTel',
				value : p.get('shipperTel'),
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
				displayField : 'shipperName',
				valueField : 'shipperName',
				store : HTStore.getShipperStore('TMS_CONSIGNEE_Q'),
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('shipperName'));
						txtConsigneeContact.setValue(r.get('shipperContact'));
						txtConsigneeTel.setValue(r.get('shipperTel'));
						txtConsigneeMobile.setValue(r.get('shipperMobile'));
						txtDeliveryAddress.setValue(r.get('shipperAddress'));
					},
					keyup : {
						fn : function(f, e) {
							listConsignee(f, e);
							if (e.getKey() == e.ENTER) {
								txtDeliveryAddress.focus();
							}
						},
						buffer : 200
					}
				}
			});

	// 收货人- 收货地址
	var txtDeliveryAddress = new Ext.form.TextField({
				fieldLabel : '收货地址',
				anchor : '98%',
				tabIndex : 17,
				name : 'deliveryAddress',
				value : p.get('deliveryAddress'),
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
				fieldLabel : '手机号码',
				anchor : '95.5%',
				tabIndex : 19,
				name : 'consigneeTel',
				value : p.get('consigneeTel'),
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
				name : 'consigneeTel',
				value : p.get('consigneeTel'),
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

	// 派车状态
	var cobDispatchStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : ' 派车状态',
				tabIndex : 25,
				name : 'dispatchStatus',
				mode : 'local',
				value : p.get('dispatchStatus'),
				store : HTStore.loadDispatchStatus,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				editable : false,
				disabled : true,
				triggerAction : 'all',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cobDepartureStatus.focus();
						}
					}
				}
			});

	// 发车状态
	var cobDepartureStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '发车状态',
				tabIndex : 26,
				name : 'departureStatus',
				mode : 'local',
				value : p.get('departureStatus'),
				store : HTStore.loadDepartureStatus,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				editable : false,
				disabled : true,
				triggerAction : 'all',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cobStationStatus.focus();
						}
					}
				}
			});

	// 到站状态
	var cobStationStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '到站状态',
				tabIndex : 27,
				name : 'stationStatus',
				mode : 'local',
				value : p.get('stationStatus'),
				store : HTStore.loadStationStatus,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				editable : false,
				disabled : true,
				triggerAction : 'all',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cobSignStatus.focus();
						}
					}
				}
			});

	// 签收状态
	var cobSignStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '签收状态',
				tabIndex : 28,
				name : 'signStatus',
				mode : 'local',
				value : p.get('signStatus'),
				store : HTStore.loadSignStatus,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				editable : false,// 不能输入文本字段，只能做触发（这里可不要）
				disabled : true,
				triggerAction : 'all',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboStatus.focus();
						}
					}
				}
			});

	// 提货状态
	var cboStatus = new Ext.form.ComboBox({
				anchor : '95%',
				fieldLabel : '货物状态',
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

	// 到货日期
	var dtArNewDate = new Ext.form.DateField({
				anchor : '95%',
				fieldLabel : '到货日期',
				tabIndex : 31,
				format : DATEF,
				name : 'arNewDate',
				value : p.get('arNewDate'),
				disabled : true
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
				enableKeyEvents : true,
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
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
				name : 'cargoStatus',
				value : p.get('cargoStatus'),
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
							txtExpenseTotal2.focus();
						}
					}
				}
			});

	// 总费用
	var txtExpenseTotal2 = new Ext.form.NumberField({
				fieldLabel : '总费用',
				anchor : '95%',
				tabIndex : 39,
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseTotal2',
				value : p.get('expenseTotal2'),
				emptyText : '0000.00',
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				tabIndex : 40,
				itemCls : 'green-b',
				name : 'expenseXff',
				value : p.get('expenseXff'),
				enableKeyEvents : true,
				emptyText : '0000.00',
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				tabIndex : 41,
				itemCls : 'green-b',
				name : 'expenseDff',
				value : p.get('expenseDff'),
				enableKeyEvents : true,
				emptyText : '0000.00',
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				anchor : '95%',
				itemCls : 'green-b',
				emptyText : '0000.00',
				allowBlank : true,
				tabIndex : 42,
				name : 'expenseHdf',
				value : p.get('expenseHdf'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseCcf.focus();
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
				name : 'expenseYjf',
				value : p.get('expenseYjf'),
				enableKeyEvents : true,
				emptyText : '0000.00',
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				name : 'expenseHkf',
				value : p.get('expenseHkf'),
				enableKeyEvents : true,
				emptyText : '0000.00',
				allowBlank : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
					}
				}
			});

	// 仓储费
	var txtExpenseCcf = new Ext.form.NumberField({
				fieldLabel : '仓储费',
				anchor : '95%',
				name : 'expenseCcf',
				value : p.get('expenseCcf'),
				tabIndex : 45,
				itemCls : 'green-b',
				emptyText : '0000.00',
				allowBlank : true,
				enableKeyEvents : true,
				disabled : p.get('expeSubmitStatus') == '1',
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPremiumCcf.focus();
						}
					}
				}
			});

	// 保险费
	var txtPremiumCcf = new Ext.form.NumberField({
				fieldLabel : '保费',
				anchor : '95%',
				itemCls : 'green-b',
				emptyText : '0000.00',
				name : 'expenseBf',
				value : p.get('expenseBf'),
				disabled : p.get('expeSubmitStatus') == '1',
				enableKeyEvents : true,
				tabIndex : 46,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtExpenseDsf.focus();
						}
					}
				}
			});

	// 代收货款
	var txtExpenseDsf = new Ext.form.NumberField({
				fieldLabel : '代收货款',
				anchor : '95%',
				itemCls : 'green-b',
				emptyText : '0000.00',
				allowBlank : true,
				name : 'expenseDsf',
				value : p.get('expenseDsf'),
				disabled : p.get('expeSubmitStatus') == '1',
				tabIndex : 47
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
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
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '货物类别',
							align : 'center',
							dataIndex : 'cargoClassName',
							width : 100,
							editable : p.get('status') > 1 ? false : true,
							editor : new Ext.form.ComboBox({
										name : 'cargoClassName',
										displayField : 'caclNameCn',
										valueField : 'caclNameCn',
										triggerAction : 'all',
										mode : 'remote',
										selectOnFocus : true,
										listClass : 'x-combo-list-small',
										store : HTStore.getCACL_S()
									})
						}, {
							header : '货物价值',
							align : 'center',
							dataIndex : 'premiumValue',
							width : 80,
							editable : p.get('status') > 1 ? false : true,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
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
							dataIndex : 'status',
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
				anchor : '47.5%',
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
				height : 190,
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
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [cboCustName]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [cboPateName]
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

	var generFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '其它信息',
				height : 280,
				frame : true,
				padding : 5,
				labelAlign : 'right',
				layout : 'column',
				items : [{
					columnWidth : .25,
					layout : 'form',
					border : false,
					items : [txtDispatchPackages, cobDispatchStatus, cboStatus,
							cboFeedbackWay]
				}, {
					columnWidth : .25,
					layout : 'form',
					border : false,
					items : [txtDeparturePackages, cobDepartureStatus,
							dtLoadDate, cboFeedbackNumber]
				}, {
					columnWidth : .25,
					layout : 'form',
					border : false,
					items : [txtStationPackages, cobStationStatus, dtArNewDate,
							txtSignInContact]
				}, {
					columnWidth : .25,
					layout : 'form',
					border : false,
					items : [txtSignPackages, cobSignStatus, ckbSignInStatus,
							dtSignInDate]
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
				frame : true,
				labelAlign : 'right',
				padding : 5,
				height : 200,
				layout : 'column',
				items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtExpenseTotal2, txtExpenseDff,
									txtExpenseYjf]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtExpenseXff, txtExpenseHdf,
									txtExpenseHkf]
						}]
			});

	var numFrm = new Ext.form.FormPanel({
				frame : true,
				padding : 5,
				labelAlign : 'right',
				layout : 'column',
				items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtSumPackages, txtSumVolume]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtSumGrossWeight]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtSumVolume]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtDispatchPackages, txtStationPackages]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtDeparturePackages, txtSignPackages]
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
				columnWidth : .35,
				height : 320,
				sm : sm1,
				cm : cm1,
				store : store2,
				tbar : [btnExpAdd, '-', btnExpRemove, '-', btnExpSave, '-']
			});

	var expPan = new Ext.Panel({
				layout : 'column',
				items : [expGrg, {
							height : 320,
							columnWidth : .65,
							layout : 'form',
							items : [numFrm, expFrm]
						}]
			});

	var tab = new Ext.TabPanel({
				activeTab : 0,
				region : 'center',
				autoHeight : true,
				autoScroll : true,
				items : [{
							title : '基础信息',
							layout : 'form',
							autoHeight : true,
							items : [frm, {
										layout : 'column',
										autoHeight : true,
										items : [shipFrm, consFrm]
									}, generFrm]
						}, {
							title : '货物信息',
							autoHeight : true,
							layout : 'form',
							items : [grid, expPan]
						}]
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
					typeName : v == 1 ? '已提货' : '已签收',
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
				|| p.get('expeSubmitStatus') == '1' || p.get('status') < 5);
		btnExpense
				.setDisabled(p.get('rowAction') == 'N' || p.get('status') < 5);
		btnStorage.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') != 0);
		btnSign.setDisabled(p.get('rowAction') == 'N' || p.get('status') < 3
				|| p.get('status') > 4);
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
						if (s == 5) {
							ckbSignInStatus.setValue(p.get('signInStatus'));
							txtSignInContact.setValue(p.get('signInContact'));
							dtSignInDate.setValue(p.get('signInDate'));
							this.addPevent(5);
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
		if (!HTUtil.checkFieldNotNull('付款方式', cboPateName)) // 付款方式
			return;

		var total = txtExpenseTotal2.getValue() != '' ? txtExpenseTotal2
				.getValue() : 0;
		var xf = txtExpenseXff.getValue() != '' ? txtExpenseXff.getValue() : 0;
		var df = txtExpenseDff.getValue() != '' ? txtExpenseDff.getValue() : 0;
		var hdf = txtExpenseHdf.getValue() != '' ? txtExpenseHdf.getValue() : 0;
		var yjf = txtExpenseYjf.getValue() != '' ? txtExpenseYjf.getValue() : 0;
		var hkf = txtExpenseHkf.getValue() != '' ? txtExpenseHkf.getValue() : 0;

		var count = xf + df + hdf + yjf - hkf
		if (total != 0 && count != 0 && total != count) {
			Ext.Msg.confirm(SYS, "总运费!=现付+到付+回单付+月结-回扣." + "\r" + "是否继续保存？",
					function(btn) {
						if (btn == 'no') {
							return;
						} else {
							HTUtil.saveToRecord(this, p);
							var xml = HTUtil.RTX(p, 'TConsign', TConsign);
							var a = store.getModifiedRecords();
							xml += HTUtil
									.ATX(a, 'TConsignCargo', TConsignCargo);
							Ext.Ajax.request({
										scope : this,
										url : SERVICE_URL,
										method : 'POST',
										params : {
											_A : 'TCON_S'
										},
										success : function(r) {
											var rowAction = p.get('rowAction');
											var c = HTUtil.XTR(r.responseXML,
													'TConsign', TConsign);
											HTUtil.RU(c, p, TConsign);
											var a = HTUtil.XTRA(r.responseXML,
													'TConsignCargo',
													TConsignCargo);
											HTUtil.RUA(store, a, TConsignCargo);
											if (rowAction == 'N') {
												txtConsNo.setValue(p
														.get('consNo'));
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
											Ext.Msg
													.alert(
															SYS,
															HTUtil
																	.XTM(r.responseXML));
										},
										xmlData : HTUtil.HTX(xml)
									});
						}
					}, this)
		} else {
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
							var c = HTUtil.XTR(r.responseXML, 'TConsign',
									TConsign);
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
		}
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
		var xml = ''
		xml = xml + HTUtil.RTX(tTransTask, 'TTransTask', TTransTask);

		var tcs = [];
		var a = store.getRange();
		for (var i = 0; i < a.length; i++) {
			if (a[i].get('status') < 2) {
				var tc = new TCargo({
							uuid : HTUtil.UUID(32),
							consId : a[i].get('consId'),
							consNo : a[i].get('consNo'),
							consCargoId : a[i].get('id'),
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
							packages : a[i].get('packages'),
							grossWeight : a[i].get('grossWeight'),
							volume : a[i].get('volume'),
							cargoClassName : a[i].get('cargoClassName'),
							premiumValue : a[i].get('premiumValue'),
							premiumRate : a[i].get('premiumRate'),
							premiumExpense : a[i].get('premiumExpense'),
							remarks : a[i].get('remarks'),
							rowAction : 'N'
						});
				tcs[tcs.length] = tc;
			}
		}
		xml += HTUtil.ATX(tcs, 'TCargo', TCargo);
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TTRT_S'
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
									typeName : '已派车',
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
		if (p.get('status') != 5) {
			Ext.Msg.alert(SYS, '该单还未签收！');
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
							txtExpenseTotal2.setDisabled(true);// 总运费（单票运费）
							txtExpenseXff.setDisabled(true);// 现付费
							txtExpenseDff.setDisabled(true);// 到付费
							txtExpenseYjf.setDisabled(true);// 月结费
							txtExpenseHdf.setDisabled(true);// 回单付费
							txtExpenseHkf.setDisabled(true);// 中转回扣费
							txtExpenseCcf.setDisabled(true);// 仓储费
							txtPremiumCcf.setDisabled(true);// 保险费
							txtExpenseDsf.setDisabled(true);// 代收货款
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
		createWindow('EXPE_' + p.get("uuid"), C_EXPE + '-' + p.get('consNo'),
				new Fos.ExpenseTab(p), true);
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
							this.condition(5);
						}
					}, this);

		} else {
			for (var i = 1; i <= a.length - 1; i++) {
				if (a[i].get('status') == a[i + 1].get('status')) {
					Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
								if (btn == 'yes') {
									this.condition(5);
								}
							}, this);
				} else {
					Ext.Msg.confirm(SYS, '该单货物信息状态不一致，请确定是否签收', function(btn) {
								if (btn == 'yes') {
									this.condition(5);
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
				disabled : p.get('rowAction') == 'N' || p.get('status') > 1,
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
						|| p.get('status') < 5,
				scope : this,
				handler : this.expenseSubmitRe
			});

	// 费用
	var btnExpense = new Ext.Button({
				text : C_EXPE,
				iconCls : 'dollar',
				hidden : NR(M1_TMS + '13'),
				disabled : p.get('rowAction') == 'N' || p.get('status') < 5,
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
				disabled : p.get('rowAction') == 'N' || p.get('status') < 3
						|| p.get('status') > 4,
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

	Fos.TConsignTabl.superclass.constructor.call(this, {
				id : 'TRAN_' + p.get("uuid"),
				modal : true,
				title : p.get('rowAction') == 'N' ? '新增陆运单' : '编辑/查看陆运单-'
						+ p.get('consNo'),
				closable : true,
				layout : 'border',
				tbar : [btnSave, '-', btnDelPanel, '-', btnSendCarTask, '-',
						btnExpenseSubmitRe, '-', btnExpense, '-', '->',
						btnStorage, '-', btnSign, '-', bAttach, '-', btnTracing],
				items : [tab]
			});
};
Ext.extend(Fos.TConsignTabl, Ext.Panel);
