Fos.TransTaskTabl = function(p, listStore) {

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

	// 货物、车辆跟踪store
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

	// 承运商
	var cboMotorcadeName = new Fos.CustomerLookup({
				fieldLabel : '承运商',
				name : 'motorcadeName',
				value : p.get('motorcadeName'),
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
				anchor : '97.5%',
				bizType : BT_T,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							p.set('motorcadeId', '');
							p.set('motorcadeName', '');
						}
					},
					select : function(c, r, i) {
						txtMotorcadeContact.setValue(r.get('custContact'));
						txtMotorcadeTel.setValue(r.get('custTel'));
						p.set('motorcadeId', r.get('id'));
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
				value : p.get('motorcadeContact'),
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
				value : p.get('motorcadeTel'),
				tabIndex : 3,
				anchor : '95%',
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
				fieldLabel : '发货点',
				tabIndex : 4,
				anchor : '97.5%',
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
								txtPlaceFrom.focus();
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

	// 发货地点
	var txtPlaceFrom = new Ext.form.TextField({
				fieldLabel : '发货地址',
				name : 'shipperAddress',
				value : p.get('shipperAddress'),
				tabIndex : 5,
				anchor : '97.5%',
				enableKeyEvents : true,
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
				anchor : '97.5%',
				tabIndex : 6,
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
						txtConsigneeMobile.setValue(r.get('consigneeMobile'));
						txtPlaceTo.setValue(r.get('consigneeAddress'));
					},
					keyup : {
						fn : function(f, e) {
							listConsignee(f, e);
							if (e.getKey() == e.ENTER) {
								txtConsigneeContact.focus();
							}
						},
						buffer : 200
					}
				}
			});

	// 收货人- 联系人
	var txtConsigneeContact = new Ext.form.TextField({
				fieldLabel : '收货联系人',
				anchor : '95%',
				tabIndex : 7,
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
				anchor : '95%',
				tabIndex : 8,
				name : 'consigneeMobile',
				value : p.get('consigneeMobile'),
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtEndStation.focus();
						}
					}
				}
			});

	// 目的地
	var txtEndStation = new Ext.form.ComboBox({
				anchor : '97.5%',
				fieldLabel : '收货点',
				tabIndex : 9,
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
								txtPlaceTo.focus();
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

	// 交货地点
	var txtPlaceTo = new Ext.form.TextField({
				fieldLabel : '交货地址',
				name : 'consigneeAddress',
				value : p.get('consigneeAddress'),
				tabIndex : 10,
				anchor : '97.5%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtTaskNo.focus();
						}
					}
				}
			});

	// 派车单号
	var txtTaskNo = new Ext.form.TextField({
				fieldLabel : C_TRANS_TASK_NO,
				name : 'consNo',
				value : p.get('consNo'),
				disabled : true,
				tabIndex : 11,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboDriverName.focus();
						}
					}
				}
			});

	

	// 驾驶员
	var cboDriverName = new Ext.form.ComboBox({
				fieldLabel : '司机',
				name : 'driverName',
				tabIndex : 12,
				store : HTStore.getDriverName('TTRT_DRIV_Q'),
				value : p.get('driverName'),
				//itemCls : 'required',
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
				tabIndex : 13,
				store : HTStore.getVehicleNo('TTRT_VEHI_Q'),
				//itemCls : 'required',
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
				tabIndex : 14,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtStartDate.focus();
						}
					}
				}
			});

	// 发车日期
	var dtStartDate = new Ext.form.DateField({
				fieldLabel : C_TRAN_START_DATE,
				name : 'startDate',
				value : p.get('startDate'),
				tabIndex : 15,
				disabled : true,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtExpeArrivalDate.focus();
						}
					}
				}
			});

	// 预计到站日期
	var dtExpeArrivalDate = new Ext.form.DateField({
				fieldLabel : '预计到站日期',
				name : 'expcArrivalDate',
				value : p.get('expcArrivalDate'),
				tabIndex : 16,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtRequArrivalDate.focus();
						}
					}
				}
			});

	// 要求到站日期
	var dtRequArrivalDate = new Ext.form.DateField({
				fieldLabel : '要求到站日期',
				name : 'requArrivalDate',
				value : p.get('requArrivalDate'),
				tabIndex : 17,
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

	// 到站日期
	var dtEndDate = new Ext.form.DateField({
				fieldLabel : '到站日期',
				name : 'endDate',
				value : p.get('endDate'),
				tabIndex : 18,
				disabled : true,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPremiumNumber.focus();
						}
					}
				}
			});

	// 保单号
	var txtPremiumNumber = new Ext.form.TextField({
				fieldLabel : '保单号',
				name : 'premiumNumber',
				value : p.get('premiumNumber'),
				tabIndex : 19,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPremiumCompany.focus();
						}
					}
				}
			});

	// 保险公司
	var txtPremiumCompany = new Fos.CustomerLookup({
				fieldLabel : '保险公司',
				name : 'premiumCompany',
				value : p.get('premiumCompany'),
				enableKeyEvents : true,
				tabIndex : 20,
				store : HTStore.getCS(),
				tpl : custTpl,
				itemSelector : 'div.list-item',
				listWidth : C_LW,
				displayField : 'custCode',
				valueField : 'custNameCn',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				custType : 'custInsuranceFlag',
				bizType : BT_T,
				anchor : '95%',
				listeners : {
					scope : this,
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custInsuranceFlag');
							if (e.getKey() == e.ENTER) {
								dtPremiumDateFrom.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 保险日期(从)
	var dtPremiumDateFrom = new Ext.form.DateField({
				fieldLabel : '保险日期(从)',
				name : 'premiumDateFrom',
				value : p.get('premiumDateFrom'),
				tabIndex : 21,
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

	// 保险日期(到)
	var dtPremiumDateTo = new Ext.form.DateField({
				fieldLabel : '保险日期(到)',
				name : 'premiumDateTo',
				value : p.get('premiumDateTo'),
				tabIndex : 22,
				format : DATEF,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtEmptyMiles.focus();
						}
					}
				}
			});

	// 空载公里数
	var txtEmptyMiles = new Ext.form.NumberField({
				fieldLabel : C_EMPTY_MILES,
				name : 'emptyMiles',
				value : p.get('emptyMiles'),
				tabIndex : 23,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtHeavyMiles.focus();
						}
					}
				}
			});

	// 重载公里数
	var txtHeavyMiles = new Ext.form.NumberField({
				fieldLabel : C_HEAVY_MILES,
				name : 'heavyMiles',
				value : p.get('heavyMiles'),
				tabIndex : 24,
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
				tabIndex : 25,
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				name : 'payMethod',
				triggerAction : 'all',// all表示把下拉框列表框的列表值全部显示出来
				enableKeyEvents : true,
				store : HTStore.getPAY_S,
				mode : 'local',
				displayField : 'NAME',
				valueField : 'CODE',
				value : p.get('payMethod'),
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
				anchor : '31.6%',
				disabled : true ,
				allowBlank : true,
				tabIndex : 26,
				name : 'expenseTotal',
				value : p.get('expenseTotal'),
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
				tabIndex : 27,
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
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
				tabIndex : 28,
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				allowBlank : true,
				tabIndex : 29,
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				allowBlank : true,
				tabIndex : 30,
				name : 'expenseMonth',
				value : p.get('expenseMonth'),
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
				disabled : p.get('expeSubmitStatus') == '1' ? true : false,
				itemCls : 'green-b',
				name : 'expenseDiscount',
				tabIndex : 31,
				value : p.get('expenseDiscount'),
				enableKeyEvents : true,
				allowBlank : true,
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
				disabled : p.get('expeSubmitStatus') == '1',
				name : 'premiumExpense',
				value : p.get('premiumExpense'),
				tabIndex : 32,
				anchor : '95%'
			});

	var motorFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '承运商信息',
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
							items : [cboMotorcadeName]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtMotorcadeContact]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							labelWidth:110,
							items : [txtMotorcadeTel]
						}, {
							columnWidth :1,
							layout : 'form',
							border : false,
							items : [txtStartStation]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtPlaceFrom]
						}]
			});

	var consiFrm = new Ext.form.FormPanel({
				iconCls : 'gen',
				title : '收货方信息',
				labelAlign : 'right',
				columnWidth : .5,
				padding : 5,
				frame : true,
				layout : 'column',
				items : [{
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [cboConsigneeName]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtConsigneeContact]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtConsigneeMobile]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtEndStation]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtPlaceTo]
						}]
			});

	var upperFrm = new Ext.form.FormPanel({
				autoHeight : true,
				layout : 'column',
				layoutConfig : {
					columns : 4
				},
				frame : true,
				labelAlign : 'right',
				padding : 2,
				items : [{
					columnWidth : .25,
					layout : 'form',
					border : false,
					labelWidth : 100,
					items : [txtTaskNo, dtStartDate, txtPremiumNumber,
							txtEmptyMiles]
				}, {
					columnWidth : .25,
					layout : 'form',
					border : false,
					items : [cboDriverName, dtExpeArrivalDate,
							txtPremiumCompany, txtHeavyMiles]
				}, {
					columnWidth : .25,
					layout : 'form',
					labelWidth : 100,
					border : false,
					items : [cboVehicleNo, dtRequArrivalDate,
							dtPremiumDateFrom]
				}, {
					columnWidth : .25,
					layout : 'form',
					labelWidth : 100,
					border : false,
					items : [txtDriverTel, dtEndDate, dtPremiumDateTo]
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
							header : '收货单位',
							align : 'center',
							dataIndex : 'consigneeName',
							editable : false,
							width : 120
						},{
							header : '货物类别',
							align : 'center',
							dataIndex : 'cargoClassName',
							editable : false,
							width : 100
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							editable : false,
							width : 80,
							editor : new Ext.form.TextField()
						}, {
							header : '包装类型',
							align : 'center',
							dataIndex : 'packName',
							editable : false,
							width : 80,
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
							header : HL('派车件数'),
							// '<font color=red>'+''+'</font>'
							align : 'center',
							dataIndex : 'packages',
							width :80,
							editable : p.get('status') >= 3 ? false : true,
							css : 'background:#ffb3a7;',
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : HL('派车毛重(KGS)'),
							align : 'center',
							dataIndex : 'grossWeight',
							width : 120,
							editable : p.get('status') >= 3 ? false : true,
							css : 'background:#ffb3a7;',
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : HL('派车体积(CBM)'),
							align : 'center',
							dataIndex : 'volume',
							width : 120,
							editable : p.get('status') >= 3 ? false : true,
							css : 'background:#ffb3a7;',
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 2,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						},  {
							header : '货物价值',
							align : 'center',
							dataIndex : 'premiumValue',
							editable : false,
							width : 100,
							renderer : rateRender
						}, {
							header : '收货联系人',
							align : 'center',
							dataIndex : 'consigneeContact',
							editable : false,
							width : 80
						}, {
							header : '收货联系方式',
							align : 'center',
							dataIndex : 'consigneeTel',
							editable : false,
							width : 100
						}, {
							header : '收货地址',
							align : 'center',
							dataIndex : 'deliveryAddress',
							editable : false,
							width : 120
						}, {
							header : C_REMARKS,
							align : 'center',
							dataIndex : 'remarks',
							editable : false,
							width : 80,
							editor : new Ext.form.TextArea()
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
							cargoClassName : a[i].get('cargoClassName'),
							premiumValue : a[i].get('premiumValue'),
							premiumRate : a[i].get('premiumRate'),
							premiumExpense : a[i].get('premiumExpense'),
							// 从TConsignCargo中取得剩余‘件毛体’
							packages : a[i].get('surplusPackages'),
							grossWeight : a[i].get('surplusGrossWeight'),
							volume : a[i].get('surplusVolume'),

							remarks : a[i].get('remarks'),
							consBizClass: 'T',
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
				disabled : p.get('status') > 3 && p.get('rowAction') != 'N',
				handler : this.addCargo
			});

	var btnDele = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				disabled : p.get('status') > 3 && p.get('rowAction') != 'N',
				handler : this.del
			});

	// 派车 装货清单
	var grid = new Ext.grid.EditorGridPanel({
				title : '装货清单',
				iconCls : 'gen',
				height : 220,
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

	var bottomFrm = new Ext.form.FormPanel({
				height : 160,
				iconCls : 'gen',
				title : '费用支付',
				frame : true,
				padding : 5,
				layout : 'column',
				labelAlign : 'right',
				layoutConfig : {
					columns : 4
				},
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboPateName]
						}, {
							columnWidth : .75,
							layout : 'form',
							border : false,
							items : [motorcadeExpense]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtExpenseXff, txtExpenseHkf]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtExpenseDff, txtPremiumExpense]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtExpenseHdf]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtExpenseYjf]
						}]
			});

	// 更改按钮状态
	this.updateToolbar = function() {
		btnAddCargo.setDisabled(p.get('status') > 3);
		btnDele.setDisabled(p.get('status') > 3);
		btnSave.setDisabled(NR(m + F_M));
		btnDelPanel.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') > 1);
		btnExpenseSubmitPa.setDisabled(p.get('rowAction') == 'N'
				|| p.get('expeSubmitStatus') == '1' || p.get('status') != 9);
		btnExpense.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') != 9);
		btnDeparture.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') > 1);
		btnReceipt.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') != 5)
				|| p.get('receiptStatus') == 1;
		btnStation.setDisabled(p.get('rowAction') == 'N'
				|| p.get('status') != 5);
		btnSign.setDisabled(p.get('rowAction') == 'N' || p.get('status') != 7);
		btnExport.setDisabled(p.get('rowAction') == 'N');
		btnTracing.setDisabled(p.get('rowAction') == 'N');
	};

	this.removeTab = function(r, s) {
		var tab = s.ownerCt; // 得到当前对像所在的容器
		tab.remove(s);
	};

	// 修改状态
	this.updateStatus = function(s) {
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'TTrans-Task-US',
						id : p.get('id'),
						status : s
					},
					success : function(r) {
						if (listStore)
							listStore.reload();
						p.set('status', s);
						if (s == 5)
							p.set('startDate', new Date());
						if (s == 7)
							p.set('endDate', new Date());
						this.updateToolbar();
						Ext.Msg.alert(SYS, M_S);
					},
					failure : function(r) {
						Ext.Msg.alert(SYS, M_F + r.responseText);
					}
				});
	};

	// 保存
	this.save = function() {
		if (!HTUtil.checkFieldNotNull(C_MOTORCADE, cboMotorcadeName))
			return;
		//if (!HTUtil.checkFieldNotNull(C_VEHICLE_NO, cboVehicleNo))
		//	return;
		//if (!HTUtil.checkFieldNotNull(C_DRIVER, cboDriverName))
		//	return;

		var xf = txtExpenseXff.getValue() != '' ? txtExpenseXff.getValue() : 0;
		var df = txtExpenseDff.getValue() != '' ? txtExpenseDff.getValue() : 0;
		var hdf = txtExpenseHdf.getValue() != '' ? txtExpenseHdf.getValue() : 0;
		var yjf = txtExpenseYjf.getValue() != '' ? txtExpenseYjf.getValue() : 0;
		var hkf = txtExpenseHkf.getValue() != '' ? txtExpenseHkf.getValue() : 0;

		var count = xf + df + hdf + yjf - hkf
		motorcadeExpense.setValue(count);

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
				var a = HTUtil.XTRA(r.responseXML, 'TConsignCargo', TConsignCargo);
				HTUtil.RUA(store, a, TConsignCargo);
				if (rowAction == 'N') {
					txtTaskNo.setValue(p.get('consNo'));
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
							HTUtil.REQUEST('TTRT_S_T', xml, this.removeTab, this);
							this.updateToolbar();
							if (listStore)
								listStore.remove(p);
						} else {
							XMG.alert(SYS, '该派车单不是新增状态，不能删除！');
						}
					}
				}, this);
	};

	// 费用提交
	this.expenseSubmitPa = function() {
		if (p.get('status') != 9) {
			Ext.Msg.alert(SYS, '该单还未全部签收！');
		} else {
			Ext.Msg.confirm(SYS, '请确定是否费用提交', function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX(p, 'TTransTask', TTransTask);
					Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TTRT_EXPE_P'
						},
						success : function(r) {
							var c = HTUtil.XTR(r.responseXML, 'TTransTask',
									TTransTask);
							HTUtil.RU(c, p, TConsign);
							btnExpenseSubmitPa
									.setDisabled(p.get('rowAction') == 'N'
											|| p.get('expeSubmitStatus') == '1');
							cboPateName.setDisabled(true);// 付款方式
							motorcadeExpense.setDisabled(true);// 物流运费
							txtExpenseXff.setDisabled(true);// 现付费
							txtExpenseDff.setDisabled(true);// 到付费
							txtExpenseYjf.setDisabled(true);// 月结费
							txtExpenseHdf.setDisabled(true);// 回单付费
							txtExpenseHkf.setDisabled(true);// 中转回扣费
							txtPremiumExpense.setDisabled(true);// 保险费
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
		var c = 'W_EXPE_'+p.get("id");
		tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab.add(new Fos.TmsExpenseTab(p,'TMS')));
	};

	// 发车
	this.departure = function() {
		Ext.Msg.confirm(SYS, '请确定是否发车', function(btn) {
					if (btn == 'yes') {
						this.updateStatus(5);
					}
				}, this);
	};

	// 到站
	this.station = function() {
		Ext.Msg.confirm(SYS, '请确定是否到站', function(btn) {
					if (btn == 'yes') {
						this.updateStatus(7);
					}
				}, this);
	};

	// 签收
	this.sign = function() {
		Ext.Msg.confirm(SYS, '请确定是否签收', function(btn) {
					if (btn == 'yes') {
						this.updateStatus(9);
					}
				}, this);
	};

	this.expExcelTR = function() {
		EXPC('TRANS_PORT', '&sort=id&dir=ASC&id=' + p.get('id'));
	};

	/*
	 * var menu = CREATE_E_MENU(C_TRANS_TASK, this.expExcelTR, this.expEmailTR,
	 * function() { }, this);
	 */

	// 跟踪状态
	this.showTracing = function() {
		var win = new Fos.PEventTransWin(p);
		win.show();
	};

	// 生成回单
	this.receipt = function() {
		if (p.get('receiptStatus') == 1) {
			Ext.Msg.alert(SYS, '该单已生成回单！');
			btnReceipt.disable();
		} else {
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TRECEIPT_G',
							ttid : p.get('id')
						},
						success : function(r) {
							if (listStore)
								listStore.reload();
							this.updateToolbar();
							btnReceipt.disable();
							Ext.Msg.alert(SYS, M_S);
						},
						failure : function(r) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						}
					});
		}
	};

	var m = M1_TMS + TMS_TTASK;

	// 保存按钮
	var btnSave = new Ext.Button({
				text : '保存',
				iconCls : 'save',
				hidden : NR(m + F_M),
				disabled : NR(m + F_M),
				scope : this,
				handler : this.save
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

	// 费用提交
	var btnExpenseSubmitPa = new Ext.Button({
				text : '费用提交',
				iconCls : 'dollar',
				hidden : NR(m + TMS_COST_SUB),
				disabled : p.get('rowAction') == 'N'
						|| p.get('expeSubmitStatus') == '1'
						|| p.get('status') != 9,
				scope : this,
				handler : this.expenseSubmitPa
			});

	// 费用按钮
	var btnExpense = new Ext.Button({
				text : C_EXPE,
				iconCls : 'dollar',
				hidden : NR(M1_TMS + '13'),
				disabled : p.get('rowAction') == 'N' || p.get('status') != 9,
				scope : this,
				handler : this.expense
			});

	// 发车按钮
	var btnDeparture = new Ext.Button({
				text : '发车',
				iconCls : 'save',
				hidden : NR(m + '12'),
				disabled : p.get('rowAction') == 'N' || p.get('status') > 1,
				scope : this,
				handler : this.departure
			});

	// 生成回单
	var btnReceipt = new Ext.Button({
				text : '生成回单',
				iconCls : 'news',
				hidden : NR(m + '17'),
				disabled : p.get('rowAction') == 'N' || p.get('status') != 5
						|| p.get('receiptStatus') == 1,
				scope : this,
				handler : this.receipt
			});

	// 到站按钮
	var btnStation = new Ext.Button({
				text : '到站',
				iconCls : 'check',
				hidden : NR(m + '13'),
				disabled : p.get('rowAction') == 'N' || p.get('status') != 5,
				scope : this,
				handler : this.station
			});

	// 签收按钮
	var btnSign = new Ext.Button({
				text : '签收',
				iconCls : 'check',
				hidden : NR(m + '14'),
				disabled : p.get('rowAction') == 'N' || p.get('status') !=7,
				scope : this,
				handler : this.sign
			});

	// 输出按钮
	var btnExport = new Ext.Button({
				text : '输出',
				hidden : NR(m + TMS_EXPORT),
				disabled : p.get('rowAction') == 'N',
				iconCls : 'print',
				scope : this,
				menu : {
					items : [{
								text : C_TRANS_TASK + 'Excel',
								handler : this.expExcelTR
							}]
				}
			});

	// 车辆跟踪
	var btnTracing = new Ext.Button({
				text : C_TRANS_TRACING,
				iconCls : 'add',
				hidden : NR(m + '16'),
				disabled : p.get('rowAction') == 'N',
				scope : this,
				handler : this.showTracing
			});

	Fos.TransTaskTabl.superclass.constructor.call(this, {
				id : 'TRANS_' + p.get("uuid"),
				title : p.get('rowAction') == 'N' ? '新增派车单' : '编辑/查看派车单-'
						+ p.get('consNo'),
				layout : 'form',
				modal : true,
				autoScroll : true,
				closable : true,
				items : [{
							layout : 'form',
							autoHeight : true,
							items : [{
										layout : 'column',
										autoHeight : true,
										items : [motorFrm, consiFrm]
									}, upperFrm]
						}, grid, bottomFrm],
				tbar : [btnSave, '-', btnDelPanel, '-', btnExpenseSubmitPa,
						'-', btnExpense, '-', btnExport, '-', '->',
						btnDeparture, '-', btnReceipt, '-', btnStation, '-',
						btnSign, '-', btnTracing]
			});
};
Ext.extend(Fos.TransTaskTabl, Ext.Panel);

//派车业务查询
Fos.TtransReportTab=function(){

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'TTRANS_Q',
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

	// 发车日期
	var startDate = new Ext.form.DateField({
				name : 'startDate',
				format : DATEF,
				anchor : '95%'
			});
			
	var startDate2 = new Ext.form.DateField({
				name : 'startDate2',
				format : DATEF,
				anchor : '95%'
			});

	var cboMotorcadeName = new Fos.CustomerLookup({
				name : 'motorcadeName',
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
						}
					},
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custTrackFlag');
						},
						buffer : BF
					}
				}
			});

	this.search = function() {
		if (startDate.getValue() == '' && startDate2.getValue() == ''
				&& cboMotorcadeName.getValue == '') {
			Ext.Msg.alert(SYS, '请输入查询条件！');
			store.baseParams = {
				_A : 'TTRANS_Q',
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

			if (startDate.getValue() && startDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'startDate',
							value : startDate.getValue().format(DATEF),
							op : GE
						});
				a[a.length] = new QParam({
							key : 'startDate2',
							value : startDate2.getValue().format(DATEF),
							op : LE
						});
			} else if (startDate.getValue()) {
				a[a.length] = new QParam({
							key : 'startDate',
							value : startDate.getValue().format(DATEF),
							op : GE
						});
			} else if (startDate2.getValue()) {
				a[a.length] = new QParam({
							key : 'startDate2',
							value : startDate2.getValue().format(DATEF),
							op : LE
						});
			}

			if (cboMotorcadeName.getValue())
				a[a.length] = new QParam({
							key : 'motorcadeName',
							value : cboMotorcadeName.getValue(),
							op : LI
						});
						
			store.baseParams = {
				_A : 'TTRANS_Q',
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
							header : C_TRANS_TASK_NO,
							align : 'center',
							dataIndex : 'consNo',
							width : 120,
							editable : false,
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : ''
									})
						}, {
							header : '承运商',
							align : 'center',
							dataIndex : 'motorcadeName',
							width : 150,
							editable : false,
							editor : new Ext.form.ComboBox({
										displayField : 'custCode',
										valueField : 'custNameCn',
										triggerAction : 'all',
										mode : 'remote',
										custType : 'custTrackFlag',
										bizType : BT_T,
										selectOnFocus : true,
										itemSelector : 'div.list-item',
										listClass : 'x-combo-list-small',
										store : HTStore.getCS()
									})
						}, {
							header : '应付总费用',
							align : 'center',
							dataIndex : 'expenseTotal',
							width : 90,
							editable : false,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '发车日期',
							align : 'center',
							dataIndex : 'startDate',
							width : 100,
							renderer : formatDate,
							editable : false,
							editor : new Ext.form.DateField({
										format : DATEF
									})
						}, {
							header : '司机',
							align : 'center',
							dataIndex : 'driverName',
							width : 80,
							editable : false,
							editor : new Ext.form.TextField({
										allowBlank : false,
										emptyText : ''
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
					startDate.reset();
					startDate2.reset();
					cboMotorcadeName.clearValue();
				}
			});

	this.searchReport=function(){
		if (store.baseParams.xml) {
			EXPC('TTRAN_REPORT', '&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		} else {
			EXPC('TTRAN_REPORT', '&sort=id&dir=ASC');
		}
	};
			
	var btnExpExcel = new Ext.Button({
				text : "输出报表",
				iconCls : 'print',
				scope : this,
				handler : this.searchReport
			});

	Fos.TtransReportTab.superclass.constructor.call(this, {
				id : 'TTRANS',
				iconCls : 'stats',
				title : C_TTRANS_TRACING,
				closable : true,
				autoScroll : true,
				store : store,
				sm : sm,
				cm : cm,
				loadMask : true,
				tbar : [{
							xtype : 'tbtext',
							text : '发车日期：'
						}, '-', startDate, '-', startDate2, '-', {
							xtype : 'tbtext',
							text : '承运商：'
						}, '-', cboMotorcadeName, '-',btnSearch,'-', btnReset, '-', btnExpExcel],
				bbar : PTB(store, C_PS20)
			});
};
Ext.extend(Fos.TtransReportTab,Ext.grid.GridPanel);