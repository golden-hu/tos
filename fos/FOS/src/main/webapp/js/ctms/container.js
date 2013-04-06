Fos.ContainerTransPanel = function() {

	var contStore = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'T_CONT_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TContainer',
							id : 'id'
						},TContainer),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	contStore.load({
				params : {
					start : 0,
					limit : C_PS
				}
			});

	var cargoStore = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'T_CONT_CARGO_Q',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'TContainerCargo',
							id : 'id'
						}, TContainerCargo),
				remoteSort : false,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	var sm1 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true,
				scope : this,
				listeners : {
					scope : this,
					rowselect : function(sm, row, record) {
						if (this.sel != record.get('id')) {
							this.sel = record.get('id');
							p = record;
							centerPanel.getForm().loadRecord(record);
						}
					},
					rowdeselect : function(sm, row, record) {
						if (centerPanel.getForm().isDirty()) {
							record.beginEdit();
							centerPanel.getForm().updateRecord(record);
							record.endEdit();
						}
					}
				}
			});

	var cm1 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), 
				sm1, 
				{header : '柜型',
							align : 'center',
							dataIndex : 'containerType',
							width : 130	}						
						],
				defaults : {
					sortable : false,
					width : 100
				}
			});

	// 柜列表
	var westPanel = new Ext.grid.GridPanel({
				region : 'west',
				title : '柜列表',
				sm : sm1,
				cm : cm1,
				store : contStore,
				width : 200,
				split : true,
				autoScroll : true,
				bbar : PTB(contStore, C_PS20)
			});

	// 陆运单号
	var txtConsNo = new Ext.form.TextField({
				fieldLabel : '陆运单号',
				disabled : true,
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
								cboCustNo.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 委托单位编号
	var cboCustNo = new Ext.form.TextField({
				fieldLabel : '委托编号',
				anchor : '95%',
				tabIndex : 3,
				name : 'custNo',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboCustContact.focus();
						}
					}
				}
			});

	// 委托派单员
	var cboCustContact = new Ext.form.TextField({
				fieldLabel : '委托派单员',
				anchor : '95%',
				tabIndex : 4,
				name : 'custContact',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtFactoryName.focus();
						}
					}
				}
			});

	// 工厂名称
	var txtFactoryName = new Ext.form.TextField({
				fieldLabel : '工厂名称',
				anchor : '95%',
				tabIndex : 5,
				name : 'factoryName',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtFactoryContact.focus();
						}
					}
				}
			});

	// 联系人
	var txtFactoryContact = new Ext.form.TextField({
				fieldLabel : '联系人',
				anchor : '95%',
				tabIndex : 6,
				name : 'factoryContact',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtFactoryTel.focus();
						}
					}
				}
			});

	// 联系电话
	var txtFactoryTel = new Ext.form.TextField({
				fieldLabel : '联系电话',
				anchor : '95%',
				tabIndex : 7,
				name : 'factoryTel',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtStuffing.focus();
						}
					}
				}
			});

	// 装货地点
	var txtStuffing = new Ext.form.TextField({
				fieldLabel : '装货地点',
				anchor : '95%',
				tabIndex : 8,
				name : 'stuffing',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtLoadPlaceName.focus();
						}
					}
				}
			});

	// 装货地址
	var txtLoadPlaceName = new Ext.form.TextField({
				fieldLabel : '装货地址',
				anchor : '97.5%',
				tabIndex : 9,
				name : 'loadPlace',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtCustomsBroker.focus();
						}
					}
				}
			});

	// 报关行
	var txtCustomsBroker = new Ext.form.TextField({
				fieldLabel : '报关行',
				anchor : '95%',
				tabIndex : 10,
				name : 'customsBrokerName',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboCustomsFun.focus();
						}
					}
				}
			});

	// 报关方式
	var cboCustomsFun = new Ext.form.ComboBox({
				fieldLabel : '报关方式',
				anchor : '95%',
				tabIndex : 11,
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
							cboShippingCompanies.focus();
						}
					}
				}
			});

	// 船公司
	var cboShippingCompanies = new Fos.CustomerLookup({
				fieldLabel : '船公司',
				tabIndex : 12,
				// itemCls : 'required',
				anchor : '95%',
				name : 'shippingCompanies',
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
				anchor : '95%',
				tabIndex : 13,
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
				anchor : '95%',
				tabIndex : 14,
				name : 'voyage',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDepartureOffice.focus();
						}
					}
				}
			});

	// 起运地海关
	var txtDepartureOffice = new Ext.form.TextField({
				fieldLabel : '起运地海关 ',
				anchor : '95%',
				tabIndex : 15,
				name : 'departureOffice',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtCabinetDate.focus();
						}
					}
				}
			});

	// 做柜时间
	var dtCabinetDate = new Ext.form.DateField({
				fieldLabel : '做柜时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 16,
				name : 'cabinetDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtFeedingDate.focus();
						}
					}
				}
			});

	// 补料时间
	var dtFeedingDate = new Ext.form.DateField({
				fieldLabel : '补料时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 17,
				name : 'feedingDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtCutDate.focus();
						}
					}
				}
			});

	// 截关时间
	var dtCutDate = new Ext.form.DateField({
				fieldLabel : '截关时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 18,
				name : 'cutDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtArriveOffice.focus();
						}
					}
				}
			});

	// 指运地海关
	var txtArriveOffice = new Ext.form.TextField({
				fieldLabel : '指运地海关 ',
				anchor : '95%',
				tabIndex : 19,
				name : 'arriveOffice',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboContainerType.focus();
						}
					}
				}
			});

	// 柜型
	var cboContainerType = new Ext.form.ComboBox({
				fieldLabel : '柜型',
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
							txtBookingNumber.focus();
						}
					}
				}
			});

	// 订舱号
	var txtBookingNumber = new Ext.form.TextField({
				fieldLabel : '订舱号 ',
				anchor : '95%',
				tabIndex : 21,
				name : 'bookingNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtContainerNumber.focus();
						}
					}
				}
			});

	// 柜号
	var txtContainerNumber = new Ext.form.TextField({
				fieldLabel : '柜号 ',
				anchor : '95%',
				tabIndex : 22,
				name : 'containerNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtSealNumber.focus();
						}
					}
				}
			});

	// 封条号
	var txtSealNumber = new Ext.form.TextField({
				fieldLabel : '封条号',
				anchor : '95%',
				tabIndex : 23,
				name : 'sealNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							ckbDualTorr.focus();
						}
					}
				}
			});

	// 是否双托
	var ckbDualTorr = new Ext.form.Checkbox({
				anchor : '95%',
				fieldLabel : '是否双托',
				tabIndex : 24,
				name : 'dualTorr',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							ckbPierQuery.focus();
						}
					}
				}
			});

	// 码头查询
	var ckbPierQuery = new Ext.form.Checkbox({
				anchor : '95%',
				fieldLabel : '码头查询',
				tabIndex : 25,
				name : 'pierQuery',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtBookingNumber2.focus();
						}
					}
				}
			});

	// 订舱号2
	var txtBookingNumber2 = new Ext.form.TextField({
				fieldLabel : '订舱号2 ',
				anchor : '95%',
				tabIndex : 26,
				name : 'bookingNumber2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtContainerNumber2.focus();
						}
					}
				}
			});

	// 柜号2
	var txtContainerNumber2 = new Ext.form.TextField({
				fieldLabel : '柜号2 ',
				anchor : '95%',
				tabIndex : 27,
				name : 'containerNumber2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtSealNumber2.focus();
						}
					}
				}
			});

	// 封条号 2
	var txtSealNumber2 = new Ext.form.TextField({
				fieldLabel : '封条号2',
				anchor : '95%',
				tabIndex : 28,
				name : 'sealNumber2',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtMentionCounterYard.focus();
						}
					}
				}
			});

	// 提柜堆场
	var txtMentionCounterYard = new Ext.form.TextField({
				fieldLabel : '提柜堆场',
				anchor : '95%',
				tabIndex : 29,
				name : 'mentionCounterYear',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtMentionCounterLocation.focus();
						}
					}
				}
			});

	// 提柜地点
	var txtMentionCounterLocation = new Ext.form.TextField({
				fieldLabel : '提柜地点',
				anchor : '95%',
				tabIndex : 30,
				name : 'mentionCounterLocation',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtAlsoCounterYard.focus();
						}
					}
				}
			});

	// 还柜堆场
	var txtAlsoCounterYard = new Ext.form.TextField({
				fieldLabel : '还柜堆场',
				anchor : '95%',
				tabIndex : 31,
				name : 'alsoCounterYear',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtAlsoCounterLocation.focus();
						}
					}
				}
			});

	// 还柜地点
	var txtAlsoCounterLocation = new Ext.form.TextField({
				fieldLabel : '还柜地点',
				anchor : '95%',
				tabIndex : 32,
				name : 'alseCounterLocation',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							cboVehicleNo.focus();
						}
					}
				}
			});

	// 车牌号
	var cboVehicleNo = new Ext.form.ComboBox({
				fieldLabel : C_VEHICLE_NO,
				name : 'vehicleNo',
				tabIndex : 33,
				anchor : '95%',
				itemCls : 'required',
				store : HTStore.getVehicleNo('TTRT_VEHI_Q'),
				displayField : 'vehicleNo',
				valueField : 'vehicleNo',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				enableKeyEvents : true,
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

	// 驾驶员
	var cboDriverName = new Ext.form.ComboBox({
				fieldLabel : '司机',
				name : 'driverName',
				anchor : '95%',
				tabIndex : 34,
				store : HTStore.getDriverName('TTRT_DRIV_Q'),
				displayField : 'driverName',
				valueField : 'driverName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				itemCls : 'required',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
						c.setValue(r.get('driverName'));
					},
					keyup : {
						fn : function(f, e) {
							listDriverName(f, e);
							if (e.getKey() == e.ENTER) {
								cboMotorcadeName.focus();
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

	// 车队
	var cboMotorcadeName = new Fos.CustomerLookup({
				fieldLabel : '车队',
				name : 'motorcadeName',
				tabIndex : 35,
				anchor : '95%',
				itemCls : 'required',
				store : HTStore.getCS(),
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
				bizType : BT_T,
				blankText : '不能为空',
				enableKeyEvents : true,
				listeners : {
					scope : this,
					keydown : {
						fn : function(f, e) {
							LC(f, e, 'custTrackFlag');
							if (e.getKey() == e.ENTER) {
								txtBayNumber.focus();
							}
						},
						buffer : BF
					}
				}
			});

	// 托架号
	var txtBayNumber = new Ext.form.TextField({
				fieldLabel : '托架号',
				anchor : '95%',
				tabIndex : 36,
				name : 'bayNumber',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDriverTel.focus();
						}
					}
				}
			});

	// 司机电话
	var txtDriverTel = new Ext.form.TextField({
				fieldLabel : C_DRIVER_TEL,
				name : 'driverTel',
				tabIndex : 37,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtMiles.focus();
						}
					}
				}
			});

	// 公里数
	var txtMiles = new Ext.form.NumberField({
				fieldLabel : '公里数',
				name : 'miles',
				tabIndex : 38,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtActualFuelConsumption.focus();
						}
					}
				}
			});

	// 实际油耗
	var txtActualFuelConsumption = new Ext.form.TextField({
				fieldLabel : '实际油耗',
				name : 'actualFuelConsumption',
				tabIndex : 39,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtReleaseDate.focus();
						}
					}
				}
			});

	// 放行时间
	var dtReleaseDate = new Ext.form.DateField({
				fieldLabel : '放行时间',
				name : 'releaseDate',
				tabIndex : 40,
				anchor : '95%',
				format : DATEF,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtAlsoCabinetDate.focus();
						}
					}
				}
			});

	// 还柜时间
	var dtAlsoCabinetDate = new Ext.form.DateField({
				fieldLabel : '还柜时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 41,
				name : 'alsoCabineDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtSceneDate.focus();
						}
					}
				}
			});

	// 到厂时间
	var dtSceneDate = new Ext.form.DateField({
				fieldLabel : '到厂时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 42,
				name : 'sceneDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							dtDepartureDate.focus();
						}
					}
				}
			});

	// 离厂时间
	var dtDepartureDate = new Ext.form.DateField({
				fieldLabel : '离厂时间',
				anchor : '95%',
				format : DATEF,
				tabIndex : 43,
				name : 'departureDate',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtDepartments.focus();
						}
					}
				}
			});

	// 所属部门
	var txtDepartments = new Ext.form.TextField({
				fieldLabel : '所属部门',
				name : 'deparTments',
				tabIndex : 44,
				anchor : '95%',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtConsignRemarks.focus();
						}
					}
				}
			});

	// 托运单备注
	var txtConsignRemarks = new Ext.form.TextArea({
				anchor : '97.5%',
				fieldLabel : '陆运单备注',
				tabIndex : 45,
				name : 'consignRemarks',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtMerchanRemarks.focus();
						}
					}
				}
			});

	// 跟单备注
	var txtMerchanRemarks = new Ext.form.TextArea({
				anchor : '97.5%',
				fieldLabel : '跟单备注',
				tabIndex : 46,
				name : 'merchanRemarks',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRFreight.focus();
						}
					}
				}
			});

	// 应收运费
	var txtRFreight = new Ext.form.NumberField({
				fieldLabel : '运费',
				anchor : '95%',
				tabIndex : 47,
				itemCls : 'green-b',
				name : 'rFreight',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRPressureFare.focus();
						}
					}
				}
			});

	// 应收压车费
	var txtRPressureFare = new Ext.form.NumberField({
				fieldLabel : '压车费',
				anchor : '95%',
				tabIndex : 48,
				itemCls : 'green-b',
				name : 'rPressureFare',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRDeclarationCharges.focus();
						}
					}
				}
			});

	// 应收报关费
	var txtRDeclarationCharges = new Ext.form.NumberField({
				fieldLabel : '报关费',
				anchor : '95%',
				tabIndex : 49,
				itemCls : 'green-b',
				name : 'rDeclarationCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRPortConstructionFee.focus();
						}
					}
				}
			});

	// 应收港建费
	var txtRPortConstructionFee = new Ext.form.NumberField({
				fieldLabel : '港建费  ',
				anchor : '95%',
				tabIndex : 50,
				itemCls : 'green-b',
				name : 'rPortConstructionFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRSecurityCharge.focus();
						}
					}
				}
			});

	// 应收 保安费
	var txtRSecurityCharge = new Ext.form.NumberField({
				fieldLabel : ' 保安费',
				anchor : '95%',
				tabIndex : 51,
				itemCls : 'green-b',
				name : 'rSecurityCharge',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRSingleCharge.focus();
						}
					}
				}
			});

	// 应收 打单费
	var txtRSingleCharge = new Ext.form.NumberField({
				fieldLabel : '打单费',
				anchor : '95%',
				tabIndex : 52,
				itemCls : 'green-b',
				name : 'rSingleCharge',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRWarehousingFee.focus();
						}
					}
				}
			});

	// 应收 入仓费
	var txtRWarehousingFee = new Ext.form.NumberField({
				fieldLabel : '入仓费',
				anchor : '95%',
				tabIndex : 53,
				itemCls : 'green-b',
				name : 'rWarehousingFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtROverweightCharges.focus();
						}
					}
				}
			});

	// 应收 超重费
	var txtROverweightCharges = new Ext.form.NumberField({
				fieldLabel : '超重费',
				anchor : '95%',
				tabIndex : 54,
				itemCls : 'green-b',
				name : 'rOverweightCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRMentionFees.focus();
						}
					}
				}
			});

	// 应收异提费
	var txtRMentionFees = new Ext.form.NumberField({
				fieldLabel : '异提费',
				anchor : '95%',
				tabIndex : 55,
				itemCls : 'green-b',
				name : 'rMentionFees',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRFedCharges.focus();
						}
					}
				}
			});

	// 应收补料费
	var txtRFedCharges = new Ext.form.NumberField({
				fieldLabel : '补料费',
				anchor : '95%',
				tabIndex : 56,
				itemCls : 'green-b',
				name : 'rFedCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRPressureFare2.focus();
						}
					}
				}
			});

	// 应收压车费
	var txtRPressureFare2 = new Ext.form.NumberField({
				fieldLabel : '压车费2',
				anchor : '95%',
				tabIndex : 57,
				itemCls : 'green-b',
				name : 'rPressureFare2',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtROtherCharges.focus();
						}
					}
				}
			});

	// 应收其它费
	var txtROtherCharges = new Ext.form.NumberField({
				fieldLabel : '其它费',
				anchor : '95%',
				tabIndex : 58,
				itemCls : 'green-b',
				name : 'rOtherCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRRemarks.focus();
						}
					}
				}
			});

	// 应收备注
	var txtRRemarks = new Ext.form.TextField({
				anchor : '99%',
				fieldLabel : '应收备注',
				tabIndex : 59,
				name : 'rRemarks',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPFreight.focus();
						}
					}
				}
			});

	// 应付运费
	var txtPFreight = new Ext.form.NumberField({
				fieldLabel : '运费',
				anchor : '95%',
				tabIndex : 60,
				itemCls : 'green-b',
				name : 'pFreight',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPPressureFare.focus();
						}
					}
				}
			});

	// 应付 压车费
	var txtPPressureFare = new Ext.form.NumberField({
				fieldLabel : '压车费',
				anchor : '95%',
				tabIndex : 61,
				itemCls : 'green-b',
				name : 'pPressureFare',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPDeclarationCharges.focus();
						}
					}
				}
			});

	// 应付 报关费
	var txtPDeclarationCharges = new Ext.form.NumberField({
				fieldLabel : '报关费 ',
				anchor : '95%',
				tabIndex : 62,
				itemCls : 'green-b',
				name : 'pDeclarationCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPPortConstructionFee.focus();
						}
					}
				}
			});

	// 应付 港建费
	var txtPPortConstructionFee = new Ext.form.NumberField({
				fieldLabel : '港建费 ',
				anchor : '95%',
				tabIndex : 63,
				itemCls : 'green-b',
				name : 'pPortConstructonFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPSecurityCharge.focus();
						}
					}
				}
			});

	// 应付 保安费
	var txtPSecurityCharge = new Ext.form.NumberField({
				fieldLabel : '保安费',
				anchor : '95%',
				tabIndex : 64,
				itemCls : 'green-b',
				name : 'pSecurityCharge',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPSingleCharge.focus();
						}
					}
				}
			});

	// 应付打单费
	var txtPSingleCharge = new Ext.form.NumberField({
				fieldLabel : '打单费',
				anchor : '95%',
				tabIndex : 65,
				itemCls : 'green-b',
				name : 'pSingleCharge',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPFedCharges.focus();
						}
					}
				}
			});

	// 应付 补料费
	var txtPFedCharges = new Ext.form.NumberField({
				fieldLabel : '补料费',
				anchor : '95%',
				tabIndex : 66,
				itemCls : 'green-b',
				name : 'pFedCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPOverweightCharges.focus();
						}
					}
				}
			});

	// 应付超重费
	var txtPOverweightCharges = new Ext.form.NumberField({
				fieldLabel : '超重费',
				anchor : '95%',
				tabIndex : 67,
				itemCls : 'green-b',
				name : 'pOverweightCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPHighFees.focus();
						}
					}
				}
			});

	// 应付高速费
	var txtPHighFees = new Ext.form.NumberField({
				fieldLabel : '高速费',
				anchor : '95%',
				tabIndex : 68,
				itemCls : 'green-b',
				name : 'pHighFees',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPRoadToll.focus();
						}
					}
				}
			});

	// 应付 路桥费
	var txtPRoadToll = new Ext.form.NumberField({
				fieldLabel : '路桥费',
				anchor : '95%',
				tabIndex : 69,
				itemCls : 'green-b',
				name : 'pRoadToll',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPBoxFee.focus();
						}
					}
				}
			});

	// 应付 坏/污箱费
	var txtPBoxFee = new Ext.form.NumberField({
				fieldLabel : '坏污箱费',
				anchor : '95%',
				tabIndex : 70,
				itemCls : 'green-b',
				name : 'pBoxFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPOtherCharges.focus();
						}
					}
				}
			});

	// 应付 其它费
	var txtPOtherCharges = new Ext.form.NumberField({
				fieldLabel : '其它费',
				anchor : '95%',
				tabIndex : 71,
				itemCls : 'green-b',
				name : 'pOtherCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPRemarks.focus();
						}
					}
				}
			});

	// 应付备注
	var txtPRemarks = new Ext.form.TextField({
				anchor : '99%',
				fieldLabel : '应付备注',
				tabIndex : 72,
				name : 'pRemarks',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVFare.focus();
						}
					}
				}
			});

	// 车辆出车费
	var txtVFare = new Ext.form.NumberField({
				fieldLabel : '出车费',
				anchor : '95%',
				tabIndex : 73,
				itemCls : 'green-b',
				name : 'vFare',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVSuitcaseFee.focus();
						}
					}
				}
			});

	// 车辆提箱费
	var txtVSuitcaseFee = new Ext.form.NumberField({
				fieldLabel : '提箱费',
				anchor : '95%',
				tabIndex : 74,
				itemCls : 'green-b',
				name : 'vSuitcaseFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVDeduct.focus();
						}
					}
				}
			});

	// 车辆提成
	var txtVDeduct = new Ext.form.NumberField({
				fieldLabel : '提成',
				anchor : '95%',
				tabIndex : 75,
				itemCls : 'green-b',
				name : 'vDeduct',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVRoadToll.focus();
						}
					}
				}
			});

	// 车辆路桥费
	var txtVRoadToll = new Ext.form.NumberField({
				fieldLabel : '路桥费',
				anchor : '95%',
				tabIndex : 76,
				itemCls : 'green-b',
				name : 'vRoadToll',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVFuelCosts.focus();
						}
					}
				}
			});

	// 车辆油费
	var txtVFuelCosts = new Ext.form.NumberField({
				fieldLabel : '油费',
				anchor : '95%',
				tabIndex : 77,
				itemCls : 'green-b',
				name : 'vFuelCosts',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVPendingCharges.focus();
						}
					}
				}
			});

	// 车辆待时费
	var txtVPendingCharges = new Ext.form.NumberField({
				fieldLabel : '待时费',
				anchor : '95%',
				tabIndex : 78,
				itemCls : 'green-b',
				name : 'vPendingCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVTireFee.focus();
						}
					}
				}
			});

	// 车辆轮胎费
	var txtVTireFee = new Ext.form.NumberField({
				fieldLabel : '轮胎费',
				anchor : '95%',
				tabIndex : 79,
				itemCls : 'green-b',
				name : 'vtireFee',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVRepairs.focus();
						}
					}
				}
			});

	// 车辆修理费
	var txtVRepairs = new Ext.form.NumberField({
				fieldLabel : '修理费',
				anchor : '95%',
				tabIndex : 80,
				itemCls : 'green-b',
				name : 'vRepairs',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVOtherCharges.focus();
						}
					}
				}
			});

	// 车辆其它费
	var txtVOtherCharges = new Ext.form.NumberField({
				fieldLabel : '其它费',
				anchor : '95%',
				tabIndex : 81,
				itemCls : 'green-b',
				name : 'vOtherCharges',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVDriverValue.focus();
						}
					}
				}
			});

	// 车辆司机产值
	var txtVDriverValue = new Ext.form.NumberField({
				fieldLabel : '司机产值',
				anchor : '95%',
				tabIndex : 82,
				itemCls : 'green-b',
				name : 'vDriverValue',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVRemarks.focus();
						}
					}
				}
			});

	// 车辆备注
	var txtVRemarks = new Ext.form.TextField({
				anchor : '99%',
				fieldLabel : '车辆备注',
				tabIndex : 83,
				name : 'vRemarks',
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtRExpenseTotal.focus();
						}
					}
				}
			});

	// 应收总费用
	var txtRExpenseTotal = new Ext.form.NumberField({
				fieldLabel : '应收总费用',
				anchor : '95%',
				tabIndex : 84,
				itemCls : 'green-b',
				name : 'rExpenseTotal',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtPExpenseTotal.focus();
						}
					}
				}
			});

	// 应付总费用
	var txtPExpenseTotal = new Ext.form.NumberField({
				fieldLabel : '应付总费用',
				anchor : '95%',
				tabIndex : 85,
				itemCls : 'green-b',
				name : 'pExpenseTotal',
				allowBlank : true,
				enableKeyEvents : true,
				listeners : {
					keydown : function(f, e) {
						if (e.getKey() == e.ENTER) {
							txtVExpenseTotal.focus();
						}
					}
				}
			});

	// 车辆总费用
	var txtVExpenseTotal = new Ext.form.NumberField({
				fieldLabel : '车辆总费用',
				anchor : '95%',
				tabIndex : 86,
				itemCls : 'green-b',
				name : 'vExpenseTotal',
				allowBlank : true
			});

	var frm = new Ext.Panel({
				title : '',
				layout : 'column',
				frame : true,
				height : 400,
				padding : 5,
				labelAlign : 'right',
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtConsNo, txtFactoryName]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboCustName, txtFactoryContact]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboCustNo, txtFactoryTel]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboCustContact, txtStuffing]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtLoadPlaceName]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtCustomsBroker]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboCustomsFun]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [cboShippingCompanies, dtCabinetDate,
									cboContainerType, {
										layout : 'column',
										items : [{
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 70,
													items : [ckbDualTorr]
												}, {
													columnWidth : 0.5,
													layout : 'form',
													labelWidth : 70,
													items : [ckbPierQuery]
												}]
									}, txtMentionCounterYard, cboVehicleNo,
									txtDriverTel, dtAlsoCabinetDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtVessel, dtFeedingDate,
									txtBookingNumber, txtBookingNumber2,
									txtMentionCounterLocation, cboDriverName,
									txtMiles, dtSceneDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtVoyage, dtCutDate, txtContainerNumber,
									txtContainerNumber2, txtAlsoCounterYard,
									cboMotorcadeName, txtActualFuelConsumption,
									dtDepartureDate]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [txtDepartureOffice, txtArriveOffice,
									txtSealNumber, txtSealNumber2,
									txtAlsoCounterLocation, txtBayNumber,
									dtReleaseDate, txtDepartments]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtConsignRemarks]
						}, {
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [txtMerchanRemarks]
						}]
			});

	var rFrm = new Ext.Panel({
				title : '应收费用',
				layout : 'column',
				frame : true,
				height : 130,
				padding : 5,
				labelAlign : 'right',
				labelWidth : 70,
				items : [{
							columnWidth : .17,
							layout : 'form',
							border : false,

							items : [txtRFreight, txtRWarehousingFee]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtRPressureFare, txtROverweightCharges]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtRDeclarationCharges, txtRMentionFees]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtRPortConstructionFee, txtRFedCharges]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtRSecurityCharge, txtRPressureFare2]
						}, {
							columnWidth : .15,
							layout : 'form',
							border : false,
							items : [txtRSingleCharge, txtROtherCharges]
						}, {
							columnWidth : 1,
							labelWidth : 70,
							layout : 'form',
							border : false,
							items : [txtRRemarks]
						}]

			});

	var pFrm = new Ext.Panel({
				title : '应付费用',
				layout : 'column',
				frame : true,
				height : 130,
				padding : 5,
				labelAlign : 'right',
				labelWidth : 70,
				items : [{
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtPFreight, txtPFedCharges]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtPPressureFare, txtPOverweightCharges]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtPDeclarationCharges, txtPHighFees]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtPPortConstructionFee, txtPRoadToll]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtPSecurityCharge, txtPBoxFee]
						}, {
							columnWidth : .15,
							layout : 'form',
							border : false,
							items : [txtPSingleCharge, txtPOtherCharges]
						}, {
							columnWidth : 1,
							labelWidth : 70,
							layout : 'form',
							border : false,
							items : [txtPRemarks]
						}]

			});

	var motorFrm = new Ext.Panel({
				title : '车辆费用',
				layout : 'column',
				frame : true,
				height : 130,
				padding : 5,
				labelAlign : 'right',
				labelWidth : 70,
				items : [{
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtVFare, txtVTireFee]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtVSuitcaseFee, txtVRepairs]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtVDeduct, txtVOtherCharges]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtVRoadToll, txtVDriverValue]
						}, {
							columnWidth : .17,
							layout : 'form',
							border : false,
							items : [txtVFuelCosts]
						}, {
							columnWidth : .15,
							layout : 'form',
							border : false,
							items : [txtVPendingCharges]
						}, {
							columnWidth : 1,
							labelWidth : 70,
							layout : 'form',
							border : false,
							items : [txtVRemarks]
						}]

			});

	var sm2 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});

	var cm2 = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(), sm2, {
							header : '货物名称',
							align : 'center',
							dataIndex : 'cargoName',
							width : 120,
							// editable : false,
							editor : new Ext.form.TextField({})
						}, {
							header : '件数',
							align : 'center',
							dataIndex : 'packages',
							width : 100,
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

	var txtSumPackages = new Ext.form.TextField({
				fieldLabel : '件数合计',
				width : 50,
				name : 'packages',
				disabled : true
			});

	var txtSumGrossWeight = new Ext.form.TextField({
				fieldLabel : '毛重合计(KGS)',
				width : 50,
				name : 'grossWeight',
				disabled : true
			});

	var txtSumVolume = new Ext.form.TextField({
				fieldLabel : '体积合计(CBM)',
				width : 50,
				name : 'volume',
				disabled : true
			});

	this.reCalculate = function() {

		var a = cargoStore.getRange();
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
	
		txtSumPackages.setValue(sumPackages);
		txtSumGrossWeight.setValue(HTUtil.round2(sumGrossWeight));
		txtSumVolume.setValue(HTUtil.round2(sumVolume));
	};

	this.addCargo = function() {
		var tc = new TContainerCargo({
					uuid : HTUtil.UUID(32),
					version : '0',
					rowAction : 'N'
				});
		cargoGrid.stopEditing();
		cargoStore.insert(0, tc);
		cargoGrid.startEditing(0, 2);
	};

	this.delCargo = function() {
		HTUtil.REMOVE_SM(sm2, cargoStore);
	};

	var btnAddCargo = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				scope : this,
				handler : this.addCargo
			});

	var btnDeleCargo = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delCargo
			});

	var cargoGrid = new Ext.grid.EditorGridPanel({
				sm : sm2,
				cm : cm2,
				store : cargoStore,
				height : 150,
				columnWidth : .65,
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
				tbar : [btnAddCargo, '-', btnDeleCargo, '-', '->', {
							xtype : 'tbtext',
							text : '件数合计：'
						}, txtSumPackages, {
							xtype : 'tbtext',
							text : '毛重合计(KGS)：'
						}, txtSumGrossWeight, {
							xtype : 'tbtext',
							text : '体积合计(CBM)：'
						}, txtSumVolume]

			});

	var eFrm = new Ext.Panel({
				height : 150,
				columnWidth : 0.35,
				layout : 'column',
				frame : true,
				padding : 20,
				labelAlign : 'right',
				items : [{
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtRExpenseTotal]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtPExpenseTotal]
						}, {
							columnWidth : 1,
							layout : 'form',
							border : false,
							items : [txtVExpenseTotal]
						}]
			});

	var centerPanel = new Ext.form.FormPanel({
		region : 'center',
		autoScroll : true,
		items : [frm, {
					layout : 'column',
					height : 150,
					items : [cargoGrid, eFrm]
				}, rFrm, pFrm, motorFrm],
		tbar : [{
					text : C_ADD,
					iconCls : 'add',
					scope : this,
					handler : function() {
						var b = new TContainer({
									uuid : HTUtil.UUID(32),
									rowAction : 'N',
									version : 0,
									cabinetDate : new Date()
								});
						contStore.insert(0, b);
						sm1.selectFirstRow();
						centerPanel.getForm().reset();
						centerPanel.getForm().loadRecord(b);
					}
				}, '-', {
					text : '保存',
					iconCls : 'save',
					scope : this,
					handler : function() {
						var r = westPanel.getSelectionModel().getSelected();
						if (r) {
							r.beginEdit();
							centerPanel.getForm().updateRecord(r);
							r.endEdit();
						}

						var xml = '';
						xml += HTUtil.RTX(r, 'TContainer', TContainer);
						var a = cargoStore.getModifiedRecords();
						xml += HTUtil.ATX(a, 'TContainerCargo', TContainerCargo);
						Ext.Ajax.request({
									scope : this,
									url : SERVICE_URL,
									method : 'POST',
									params : {
										_A : 'T_CONT_S'
									},
									success : function(res) {
										var c = HTUtil.XTRA(res.responseXML,
												'TContainer', TContainer);
										HTUtil.RUA(contStore, c, TContainer);
										var cr = HTUtil.XTRA(res.responseXML,
												'TContainerCargo',
												TContainerCargo);
										HTUtil.RUA(cargoStore, cr,
												TContainerCargo);
										if (c.length > 0)
											txtConsNo.setValue(c[0]
													.get('consNo'));
										XMG.alert(SYS, M_S);
									},
									failure : function(r) {
										XMG.alert(SYS, M_F + r.responseText);
									},
									xmlData : HTUtil.HTX(xml)
								});
					}
				}, '-', {
					text : C_REMOVE,
					scope : this,
					iconCls : 'remove',
					handler : function() {
						var r = sm1.getSelected();
						if (r) {
							for(var i=0;i<r.length;i++) {
							  r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
								westPanel.getStore().remove(r[i]); 
							}
							
							/*r.set('rowAction', r.get('rowAction') == 'N'
											? 'D'
											: 'R');*/
							var xml = HTUtil.RTX4R(r, 'TContainer', TContainer);
							if (xml) {
								Ext.Ajax.request({
											scope : this,
											url : SERVICE_URL,
											method : 'POST',
											params : {
												_A : 'T_CONT_S'
											},
											success : function(res) {
												contStore.remove(r);
												centerPanel.getForm().reset();
												XMG.alert(SYS, M_S);
											},
											failure : function(r) {
												XMG.alert(SYS,
														M_F + r.responseText);
											},
											xmlData : HTUtil.HTX(xml)
										});
							}
						} else
							XMG.alert(SYS, M_NO_DATA_SELECTED);
					}
				}]

	});

	Fos.ContainerTransPanel.superclass.constructor.call(this, {
				id : 'CONTAINER',
				modal : true,
				title : C_CONTAINER_TRANS,
				autoScroll : true,
				closable : true,
				layout : 'border',
				items : [westPanel, centerPanel]
			});
};
Ext.extend(Fos.ContainerTransPanel, Ext.Panel);
