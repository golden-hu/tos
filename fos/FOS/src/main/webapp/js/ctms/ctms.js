Fos.ImportContainerPanel = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'T_CONT_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TContainer',
							id : 'id'
						}, TContainer),
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

	// 业务类型
	var cboCustomsFun = new Ext.form.ComboBox({
				fieldLabel : '业务类型',
				anchor : '95%',
				tabIndex : 1,
				name : 'customsBrokerFun',
				store : HTStore.getCUST,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustNo.focus();
						}
					}
				}
			});

	// 客户编码
	var txtCustNo = new Ext.form.TextField({
				fieldLabel : '客户编码',
				anchor : '95%',
				tabIndex : 2,
				name : 'custNo',
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
				tabIndex : 3,
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
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								txtCustContact.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 联系人
	var txtCustContact = new Ext.form.TextField({
				fieldLabel : '联系人',
				anchor : '95%',
				tabIndex : 4,
				name : 'custContact',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustMobile.focus();
						}
					}
				}
			});

	// 联系电话
	var txtCustMobile = new Ext.form.TextField({
				fieldLabel : '联系电话',
				anchor : '95%',
				tabIndex : 5,
				name : 'custMobile',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustFax.focus();
						}
					}
				}
			});

	// 传真
	var txtCustFax = new Ext.form.TextField({
				fieldLabel : '传真',
				anchor : '95%',
				tabIndex : 6,
				name : 'custFax',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustAddress.focus();
						}
					}
				}
			});

	// 联系地址
	var txtCustAddress = new Ext.form.TextField({
				fieldLabel : '联系地址',
				anchor : '95%',
				tabIndex : 7,
				name : 'custAddress',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVessel.focus();
						}
					}
				}
			});

	// 船名
	var txtVessel = new Ext.form.TextField({
				fieldLabel : '船名',
				anchor : '100%',
				tabIndex : 8,
				name : 'vessel',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVoyage.focus();
						}
					}
				}
			});

	// 航次
	var txtVoyage = new Ext.form.TextField({
				fieldLabel : '航次',
				anchor : '90%',
				tabIndex : 9,
				name : 'voyage',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtLoadNumber.focus();
						}
					}
				}
			});

	// 提单号
	var txtLoadNumber = new Ext.form.TextField({
				fieldLabel : '提单号',
				anchor : '95%',
				tabIndex : 10,
				name : 'loadNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDeparturePort.focus();
						}
					}
				}
			});

	// 始发港
	var txtDeparturePort = new Ext.form.TextField({
				fieldLabel : '始发港',
				anchor : '95%',
				tabIndex : 11,
				name : 'departurePort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtTransshipmentPort.focus();
						}
					}
				}
			});

	// 中转港
	var txtTransshipmentPort = new Ext.form.TextField({
				fieldLabel : '中转港',
				anchor : '95%',
				tabIndex : 12,
				name : 'transshipmentPort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDestinationPort.focus();
						}
					}
				}
			});

	// 目的港
	var txtDestinationPort = new Ext.form.TextField({
				fieldLabel : '目的港',
				anchor : '95%',
				tabIndex : 13,
				name : 'destinationPort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtArrivedDate.focus();
						}
					}
				}
			});

	// 到港日期
	var dtArrivedDate = new Ext.form.DateField({
				fieldLabel : '到港日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 14,
				name : 'arrivedDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtAlsoBoxesDate.focus();
						}
					}
				}
			});

	// 还箱日期
	var dtAlsoContainerDate = new Ext.form.DateField({
				fieldLabel : '还箱日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 15,
				name : 'alsoCabineDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFreeDate.focus();
						}
					}
				}
			});

	// 免费时间
	var dtFreeDate = new Ext.form.DateField({
				fieldLabel : '免费时间',
				anchor : '100%',
				format : DATEF,
				tabIndex : 16,
				name : 'freeDate1',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFreeDate1.focus();
						}
					}
				}
			});

	// 免费时间
	var dtFreeDate1 = new Ext.form.DateField({
				fieldLabel : '至',
				anchor : '90%',
				format : DATEF,
				tabIndex : 17,
				name : 'freeDate2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtBoxCompany.focus();
						}
					}
				}
			});

	// 放箱公司
	var txtContainerCompany = new Ext.form.TextField({
				fieldLabel : '放箱公司 ',
				anchor : '45.7%',
				tabIndex : 18,
				name : 'containerCompany',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtCabinetDate.focus();
						}
					}
				}
			});

	// 委托时间
	var dtCabinetDate = new Ext.form.DateField({
				fieldLabel : '委托时间',
				anchor : '92%',
				format : DATEF,
				tabIndex : 19,
				name : 'custDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboContainerType.focus();
						}
					}
				}
			});

	// 箱型
	var cboContainerType = new Ext.form.ComboBox({
				fieldLabel : '箱型',
				anchor : '95%',
				tabIndex : 20,
				name : 'containerType',
				store : HTStore.getCOTY_S(),
				displayField : 'cotyCode',
				valueField : 'cotyCode',
				mode : 'local',
				typeAhead : true,
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtContainerNumber.focus();
						}
					}
				}
			});

	// 箱量
	var txtContainerNumber = new Ext.form.TextField({
				fieldLabel : '箱量 ',
				anchor : '90%',
				tabIndex : 21,
				name : 'containerNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRemarks.focus();
						}
					}
				}
			});

	// 备注
	var txtRemarks = new Ext.form.TextArea({
				anchor : '95%',
				fieldLabel : '备注',
				tabIndex : 22,
				name : 'consignRemarks'
			});

	var frm = new Ext.Panel({
		layout : 'column',
		frame : true,
		padding : 5,
		items : [{
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [cboCustomsFun, txtCustContact, txtCustAddress,
					txtDeparturePort, dtArrivedDate]
		}, {
			columnWidth : .35,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [txtCustNo, txtCustMobile, {
						layout : 'column',
						items : [{
									columnWidth : 0.5,
									layout : 'form',
									labelWidth : 99,
									items : [txtVessel]
								}, {
									columnWidth : 0.5,
									layout : 'form',
									labelWidth : 50,
									items : [txtVoyage]
								}]
					}, txtTransshipmentPort, dtAlsoContainerDate]
		}, {
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [cboCustName, txtCustFax, txtLoadNumber,
					txtDestinationPort, {
						layout : 'column',
						items : [{
									columnWidth : 0.6,
									layout : 'form',
									labelWidth : 99,
									items : [dtFreeDate]
								}, {
									columnWidth : 0.4,
									layout : 'form',
									labelWidth : 30,
									items : [dtFreeDate1]
								}]
					}]
		}, {
			columnWidth : .675,
			layout : 'column',
			border : false,
			items : [{
						columnWidth : 1,
						layout : 'form',
						labelAlign : 'right',
						items : [txtContainerCompany]
					}, {
						columnWidth : 1,
						layout : 'column',
						items : [{
									columnWidth : .5,
									layout : 'form',
									border : false,
									labelAlign : 'right',
									items : [dtCabinetDate]
								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
										layout : 'column',
										items : [{
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 81,
													labelAlign : 'right',
													items : [cboContainerType]
												}, {
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 50,
													labelAlign : 'right',
													items : [txtContainerNumber]
												}]
									}]
								}]
					}]
		}, {
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [txtRemarks]
		}]
	});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : '箱号',
							align : 'center',
							dataIndex : 'bookingNumber',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '箱型',
							align : 'center',
							dataIndex : 'containerType',
							width : 70,
							renderer : HTStore.getCOTY,
							editor : new Ext.form.ComboBox({
										store : HTStore.getCOTY_S(),
										displayField : 'cotyCode',
										valueField : 'cotyCode',
										mode : 'local',
										typeAhead : true,
										triggerAction : 'all',
										selectOnFocus : true
									})
						}, {
							header : '箱量',
							align : 'center',
							dataIndex : 'containerNumber',
							width : 70,
							editor : new Ext.form.TextField({})
						}, {
							header : '运费',
							align : 'center',
							dataIndex : 'rExpenseTotal',
							width : 70,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '封号',
							align : 'center',
							dataIndex : 'sealNumber',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱时间',
							align : 'center',
							dataIndex : 'cabinetDate',
							renderer : formatDate,
							width : 100,
							editor : new Ext.form.DateField({
										format : DATEF
									})
						}, {
							header : '提箱点',
							align : 'center',
							dataIndex : 'mentionCounterLocation',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱门点',
							align : 'center',
							dataIndex : 'cabinetPoint',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱地点',
							align : 'center',
							dataIndex : 'cabinetLocations',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱联系人',
							align : 'center',
							dataIndex : 'cabinetContact',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱联系电话',
							align : 'center',
							dataIndex : 'cabinetTel',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '还箱点',
							align : 'center',
							dataIndex : 'alseCounterLocation',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '件数',
							align : 'center',
							dataIndex : 'packages',
							width : 70,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '毛重(KGS)',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 100,
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
							width : 100,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.addGrid = function() {
	};

	this.delGrid = function() {
	};

	var btnAddGrid = new Ext.Button({
				text : '新增',
				iconCls : 'add',
				scope : this,
				handler : this.addGrid
			});

	var btnDelGrid = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delGrid
			});

	var grid = new Ext.grid.EditorGridPanel({
				title : '做箱信息',
				sm : sm,
				cm : cm,
				store : store,
				height : 318,
				autoScroll : true,
				listeners : {
					scope : this
				},
				tbar : [btnAddGrid, '-', btnDelGrid]
			});

	this.savePanel = function() {
	};

	this.delPanel = function() {
	};

	var btnSavePanel = new Ext.Button({
				text : '保存',
				iconCls : 'save',
				scope : this,
				handler : this.savePanel
			});

	var btnDelPanel = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delPanel
			});

	Fos.ImportContainerPanel.superclass.constructor.call(this, {
				id : 'IMPORT',
				modal : true,
				title : C_CONTAINER_IMPORT,
				autoScroll : true,
				closable : true,
				layout : 'form',
				tbar : [btnSavePanel, btnDelPanel],
				items : [frm, grid]
			});
};
Ext.extend(Fos.ImportContainerPanel, Ext.Panel);

Fos.ExportContainerPanel = function() {

	var store = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'T_CONT_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TContainer',
							id : 'id'
						}, TContainer),
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

	// 业务类型
	var cboCustomsFun = new Ext.form.ComboBox({
				fieldLabel : '业务类型',
				anchor : '95%',
				tabIndex : 1,
				name : 'customsBrokerFun',
				store : HTStore.getCUST,
				displayField : 'N',
				valueField : 'C',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustNo.focus();
						}
					}
				}
			});

	// 客户编码
	var txtCustNo = new Ext.form.TextField({
				fieldLabel : '客户编码',
				anchor : '95%',
				tabIndex : 2,
				name : 'custNo',
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
				tabIndex : 3,
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
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custBookerFlag');
							if (e.getKey() == e.ENTER) {
								txtCustContact.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 联系人
	var txtCustContact = new Ext.form.TextField({
				fieldLabel : '联系人',
				anchor : '95%',
				tabIndex : 4,
				name : 'custContact',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustMobile.focus();
						}
					}
				}
			});

	// 联系电话
	var txtCustMobile = new Ext.form.TextField({
				fieldLabel : '联系电话',
				anchor : '95%',
				tabIndex : 5,
				name : 'custMobile',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustFax.focus();
						}
					}
				}
			});

	// 传真
	var txtCustFax = new Ext.form.TextField({
				fieldLabel : '传真',
				anchor : '95%',
				tabIndex : 6,
				name : 'custFax',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustAddress.focus();
						}
					}
				}
			});

	// 联系地址
	var txtCustAddress = new Ext.form.TextField({
				fieldLabel : '联系地址',
				anchor : '95%',
				tabIndex : 7,
				name : 'custAddress',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVessel.focus();
						}
					}
				}
			});

	// 船名
	var txtVessel = new Ext.form.TextField({
				fieldLabel : '船名',
				anchor : '100%',
				tabIndex : 8,
				name : 'vessel',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVoyage.focus();
						}
					}
				}
			});

	// 航次
	var txtVoyage = new Ext.form.TextField({
				fieldLabel : '航次',
				anchor : '90%',
				tabIndex : 9,
				name : 'voyage',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtLoadNumber.focus();
						}
					}
				}
			});

	// 提单号
	var txtLoadNumber = new Ext.form.TextField({
				fieldLabel : '提单号',
				anchor : '95%',
				tabIndex : 10,
				name : 'loadNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDeparturePort.focus();
						}
					}
				}
			});

	// 始发港
	var txtDeparturePort = new Ext.form.TextField({
				fieldLabel : '始发港',
				anchor : '95%',
				tabIndex : 11,
				name : 'departurePort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtTransshipmentPort.focus();
						}
					}
				}
			});

	// 中转港
	var txtTransshipmentPort = new Ext.form.TextField({
				fieldLabel : '中转港',
				anchor : '95%',
				tabIndex : 12,
				name : 'transshipmentPort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDestinationPort.focus();
						}
					}
				}
			});

	// 目的港
	var txtDestinationPort = new Ext.form.TextField({
				fieldLabel : '目的港',
				anchor : '95%',
				tabIndex : 13,
				name : 'destinationPort',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtArrivedDate.focus();
						}
					}
				}
			});

	// 开航日期
	var dtArrivedDate = new Ext.form.DateField({
				fieldLabel : '开航日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 14,
				name : 'saillingDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtAlsoBoxesDate.focus();
						}
					}
				}
			});

	// 闭港日期
	var dtAlsoContainerDate = new Ext.form.DateField({
				fieldLabel : '闭港日期',
				anchor : '95%',
				format : DATEF,
				tabIndex : 15,
				name : 'closingDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFreeDate.focus();
						}
					}
				}
			});

	// 免费时间
	var dtFreeDate = new Ext.form.DateField({
				fieldLabel : '免费时间',
				anchor : '100%',
				format : DATEF,
				tabIndex : 16,
				name : 'freeDate1',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFreeDate1.focus();
						}
					}
				}
			});

	// 免费时间
	var dtFreeDate1 = new Ext.form.DateField({
				fieldLabel : '至',
				anchor : '90%',
				format : DATEF,
				tabIndex : 17,
				name : 'freeDate2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtBoxCompany.focus();
						}
					}
				}
			});

	// 放箱公司
	var txtContainerCompany = new Ext.form.TextField({
				fieldLabel : '放箱公司 ',
				anchor : '45.7%',
				tabIndex : 18,
				name : 'containerCompany',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtCabinetDate.focus();
						}
					}
				}
			});

	// 委托时间
	var dtCabinetDate = new Ext.form.DateField({
				fieldLabel : '委托时间',
				anchor : '92%',
				format : DATEF,
				tabIndex : 19,
				name : 'custDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboContainerType.focus();
						}
					}
				}
			});

	// 箱型
	var cboContainerType = new Ext.form.ComboBox({
				fieldLabel : '箱型',
				anchor : '95%',
				tabIndex : 20,
				name : 'containerType',
				store : HTStore.getCOTY_S(),
				displayField : 'cotyCode',
				valueField : 'cotyCode',
				mode : 'local',
				typeAhead : true,
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtContainerNumber.focus();
						}
					}
				}
			});

	// 箱量
	var txtContainerNumber = new Ext.form.TextField({
				fieldLabel : '箱量 ',
				anchor : '90%',
				tabIndex : 21,
				name : 'containerNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRemarks.focus();
						}
					}
				}
			});

	// 备注
	var txtRemarks = new Ext.form.TextArea({
				anchor : '95%',
				fieldLabel : '备注',
				tabIndex : 22,
				name : 'consignRemarks'
			});

	var frm = new Ext.Panel({
		layout : 'column',
		frame : true,
		padding : 5,
		items : [{
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [cboCustomsFun, txtCustContact, txtCustAddress,
					txtDeparturePort, dtArrivedDate]
		}, {
			columnWidth : .35,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [txtCustNo, txtCustMobile, {
						layout : 'column',
						items : [{
									columnWidth : 0.5,
									layout : 'form',
									labelWidth : 99,
									items : [txtVessel]
								}, {
									columnWidth : 0.5,
									layout : 'form',
									labelWidth : 50,
									items : [txtVoyage]
								}]
					}, txtTransshipmentPort, dtAlsoContainerDate]
		}, {
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [cboCustName, txtCustFax, txtLoadNumber,
					txtDestinationPort, {
						layout : 'column',
						items : [{
									columnWidth : 0.6,
									layout : 'form',
									labelWidth : 99,
									items : [dtFreeDate]
								}, {
									columnWidth : 0.4,
									layout : 'form',
									labelWidth : 30,
									items : [dtFreeDate1]
								}]
					}]
		}, {
			columnWidth : .675,
			layout : 'column',
			border : false,
			items : [{
						columnWidth : 1,
						layout : 'form',
						labelAlign : 'right',
						items : [txtContainerCompany]
					}, {
						columnWidth : 1,
						layout : 'column',
						items : [{
									columnWidth : .5,
									layout : 'form',
									border : false,
									labelAlign : 'right',
									items : [dtCabinetDate]
								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									items : [{
										layout : 'column',
										items : [{
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 81,
													labelAlign : 'right',
													items : [cboContainerType]
												}, {
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 50,
													labelAlign : 'right',
													items : [txtContainerNumber]
												}]
									}]
								}]
					}]
		}, {
			columnWidth : .325,
			layout : 'form',
			border : false,
			labelAlign : 'right',
			items : [txtRemarks]
		}]
	});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm, {
							header : '箱号',
							align : 'center',
							dataIndex : 'bookingNumber',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '箱型',
							align : 'center',
							dataIndex : 'containerType',
							width : 70,
							renderer : HTStore.getCOTY,
							editor : new Ext.form.ComboBox({
										store : HTStore.getCOTY_S(),
										displayField : 'cotyCode',
										valueField : 'cotyCode',
										mode : 'local',
										typeAhead : true,
										triggerAction : 'all',
										selectOnFocus : true
									})
						}, {
							header : '箱量',
							align : 'center',
							dataIndex : 'containerNumber',
							width : 70,
							editor : new Ext.form.TextField({})
						}, {
							header : '运费',
							align : 'center',
							dataIndex : 'rExpenseTotal',
							width : 70,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}, {
							header : '封号',
							align : 'center',
							dataIndex : 'sealNumber',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱时间',
							align : 'center',
							dataIndex : 'cabinetDate',
							renderer : formatDate,
							width : 100,
							editor : new Ext.form.DateField({
										format : DATEF
									})
						}, {
							header : '提箱点',
							align : 'center',
							dataIndex : 'mentionCounterLocation',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱门点',
							align : 'center',
							dataIndex : 'cabinetPoint',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱地点',
							align : 'center',
							dataIndex : 'cabinetLocations',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱联系人',
							align : 'center',
							dataIndex : 'cabinetContact',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '做箱联系电话',
							align : 'center',
							dataIndex : 'cabinetTel',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '还箱点',
							align : 'center',
							dataIndex : 'alseCounterLocation',
							width : 80,
							editor : new Ext.form.TextField({})
						}, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							width : 100,
							editor : new Ext.form.TextField({})
						}, {
							header : '件数',
							align : 'center',
							dataIndex : 'packages',
							width : 70,
							editor : new Ext.form.NumberField({
										allowBlank : false
									})
						}, {
							header : '毛重(KGS)',
							align : 'center',
							dataIndex : 'grossWeight',
							width : 100,
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
							width : 100,
							renderer : rateRender,
							editor : new Ext.form.NumberField({
										decimalPrecision : 4,
										allowBlank : false,
										emptyText : '',
										invalidText : ''
									})
						}],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	this.addGrid = function() {
	};

	this.delGrid = function() {
	};

	var btnAddGrid = new Ext.Button({
				text : '新增',
				iconCls : 'add',
				scope : this,
				handler : this.addGrid
			});

	var btnDelGrid = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delGrid
			});

	var grid = new Ext.grid.EditorGridPanel({
				title : '做箱信息',
				sm : sm,
				cm : cm,
				store : store,
				height : 318,
				autoScroll : true,
				listeners : {
					scope : this
				},
				tbar : [btnAddGrid, '-', btnDelGrid]
			});

	this.savePanel = function() {
	};

	this.delPanel = function() {
	};

	var btnSavePanel = new Ext.Button({
				text : '保存',
				iconCls : 'save',
				scope : this,
				handler : this.savePanel
			});

	var btnDelPanel = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delPanel
			});

	Fos.ExportContainerPanel.superclass.constructor.call(this, {
				id : 'EXPORT',
				modal : true,
				title : C_CONTAINER_EXPORT,
				autoScroll : true,
				closable : true,
				layout : 'form',
				tbar : [btnSavePanel, btnDelPanel],
				items : [frm, grid]
			});
};
Ext.extend(Fos.ExportContainerPanel, Ext.Panel);
