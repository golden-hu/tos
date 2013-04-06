Fos.TransLibrNotePanel = function(p, op) {
	var warehouseId1 = 0;
	var warehouseCode1 = '';
	var areaId1 = 0;
	var areaCode1 = '';
	var blockId1 = 0;
	var blockCode1 = '';
	var warehouseId2 = 0;
	var warehouseCode2 = '';
	var areaId2 = 0;
	var areaCode2 = '';
	var blockId2 = 0;
	var blockCode2 = '';

	// 移库单部分
	var opStatus = op;

	this.changToolBarButtonStatus = function(opin) {

		// 新增状态
		if (opin == 1) {
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(true);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
		}

		// 未提交
		if (opin == 2) {
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(false);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
		}

		// 已提交
		if (opin == 3) {
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(false);
			this.auditBtn.setDisabled(false);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
		}

		// 审核通过
		if (opin == 4) {
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(false);
			this.doTransBtn.setDisabled(false);
			this.printBtn.setDisabled(true);
		}

		// 审核未通过
		if (opin == 5) {
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(false);
			this.auditBtn.setDisabled(false);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
		}

		// 已执行
		if (opin == 6) {
			this.saveBtn.setDisabled(true);
			this.removeBtn.setDisabled(true);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(false);
		}
	};

	// 转移后的数据存储
	var afterStore = new Ext.data.Store({
				URL : SERVICE_URL,
				baseParams : {
					_mt : 'xml',
					_A : 'WTRANS_NOTE_LIST_Q'
				},
				pruneModifiedRecords : true,
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'WTransList',
							idProperty : 'id'
						}, WTransList),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	// 移库明细部分数据存储
	var store = new Ext.data.Store({
				url : SERVICE_URL + '?_A=WTRANS_NOTE_LIST_Q',
				baseParams : {
					_mt : 'xml'
				},
				pruneModifiedRecords : true,
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'WTransList',
							idProperty : 'id'
						}, WTransList),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	// 移库单号
	var txtTransNoteNo = new Ext.form.TextField({
				fieldLabel : C_TRANS_NOTE_NO,
				tabIndex : 1,
				readOnly : true,
				xtype : 'textfield',
				anchor : '95%',
				name : 'transNoteNo',
				ref : '../transNoteNo',
				value : p.get('transNoteNo')
			});

	// 审核日期
	var dtfCheckTime = new Ext.form.DateField({
				fieldLabel : C_AUDIT_TIME,
				tabIndex : 6,
				xtype : 'datefield',
				format : DATEF,
				altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
				anchor : '95%',
				name : 'checkTime',
				ref : '../checkTime',
				value : p.get('checkTime')
			});

	// 移库类型
	/*var cmbTransType = new Ext.form.ComboBox({
				fieldLabel : '操作类型',
				xtype : 'combo',
				tabIndex : 2,itemCls:'required',
				anchor : '95%',
				name : 'transType',
				ref : '../transType',
				value : p.get('transType'),
				store : WHTStore.TRANS_TYPE_S,
				displayField : 'NAME',
				valueField : 'CODE',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true
			});*/
	var cmbTransType= new Ext.form.ComboBox({fieldLabel:'操作类型',name:'transType',ref:'../transType',value:p.get('transType'),
    	   	store:WHTStore.TRANS_TYPE_S,displayField:'NAME',valueField:'CODE',tabIndex:2,itemCls:'required',
    		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});

	/*var cmbTransType= {fieldLabel:'操作类型',name:'transType',ref:'../transType',value:p.get('transType'),
    	   	xtype:'combo',store:WHTStore.TRANS_TYPE_S,displayField:'NAME',valueField:'CODE',tabIndex:2,
    		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};*/
	// 移库人
	var cmbTransBy = new Ext.form.ComboBox({
				fieldLabel : '操作人',
				xtype : 'combo',
				tabIndex : 3,
				anchor : '95%',
				name : 'transBy',
				ref : '../transBy',
				value : p.get('transBy'),
				store : HTStore.getUSER_S(),
				displayField : 'userName',
				valueField : 'userName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				listeners : {
					scope : this,
					select : function(c, r, i) {
					}
				}
			});

	// 移库日期
	var dtfTransDate = new Ext.form.DateField({
				fieldLabel : C_TRANS_DATE,
				tabIndex : 4,
				xtype : 'datefield',
				altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
				format : DATEF,
				anchor : '95%',itemCls:'required',
				name : 'transDate',
				ref : '../transDate',
				value : p.get('transDate')
			});

	// 审核人
	var cmbAuditBy = new Ext.form.ComboBox({
				fieldLabel : C_AUDIT_BY,
				tabIndex : 5,

				anchor : '95%',
				name : 'checkerName',
				ref : '../checkerName',
				value : p.get('checkerName'),
				store : HTStore.getUSER_S(),
				displayField : 'userName',
				valueField : 'userName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				listeners : {
					scope : this,
					blue : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							p.set('checkerId', '');
						}
					},
					select : function(c, r, i) {
						p.set('checkerId', r.get('id'));
					}
				}
			});

	// 状态
	var txtStatus = new Ext.form.TextField({
				fieldLabel : C_STATUS,
				tabIndex : 5,

				disabled : true,
				style : '{font-weight:bold;color:green;}',
				anchor : '95%',
				name : '',
				ref : '../status',
				value : HTStore.getTransNoteStatus(p.get('status'))
			});

	// 审核意见
	var txtAuditComments = new Ext.form.TextField({
				fieldLabel : C_AUDIT_COMMENTS,
				xtype : 'textfield',
				tabIndex : 7,
				anchor : '95%',
				value : p.get('checkComments'),
				name : 'checkComments',
				ref : '../checkComments'
			});

	var frm = new Ext.form.FormPanel({
				region : 'north',
				labelWidth : 90,
				frame : true,
				height : 80,
				layout : 'column',
				layoutConfig : {
					columns : 5
				},
				items : [{
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [txtTransNoteNo, cmbAuditBy]
						}, {
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [cmbTransType, dtfCheckTime]
						}, {
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [cmbTransBy]
						}, {
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [dtfTransDate]
						}, {
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [txtStatus]
						}, {
							columnWidth : .2,
							layout : 'form',
							border : false,
							items : [txtAuditComments]
						}]
			});

	/*
	 * 左边源仓库
	 */

	// 转移前数据记录
	var beforeStore = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : {
					_A : 'WPLACED_CARGO_X',
					_mt : 'xml'
				},
				reader : new Ext.data.XmlReader({
							totalProperty : 'rowCount',
							record : 'WPlacedCargo',
							idProperty : 'id'
						}, WPlacedCargo),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});

	// 查询方法
	this.search = function() {
		var a = [];
		b = wareHouse1.getValue();
		c = area1.getValue();
		d = block1.getValue();
		if (b) {
			a[a.length] = new QParam({
						key : 'warehouseName',
						value : b,
						op : 1
					});
		}
		if (c) {
			a[a.length] = new QParam({
						key : 'areaName',
						value : c,
						op : 1
					});
		}
		if (d) {
			a[a.length] = new QParam({
						key : 'blockName',
						value : d,
						op : 1
					});

		}
		if (a.length > 0) {
			beforeStore.baseParams = {
				_A : 'WPLACED_CARGO_X',
				_mt : 'xml',
				xml : HTUtil.QATX(a)
			};
		} else {
			beforeStore.baseParams = {
				_A : 'WPLACED_CARGO_X',
				_mt : 'xml'
			};
		}
		beforeStore.removeAll();
		beforeStore.load();
	};

	// 源仓库
	var wareHouse1 = new Ext.form.ComboBox({
				fieldLabel : '仓库',
				name : 'warehouseName',
				ref : '../warehouseName',
				store : WHTStore.getWarehouse(),
				xtype : 'combo',
				displayField : 'warehouseName',
				valueField : 'warehouseName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				tabIndex : 57,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							warehouseId1 = '';
							warehouseCode1 = '';
						}
					},
					select : function(c, r, i) {
						warehouseId1 = r.get('id');
						warehouseCode1 = r.get('warehouseCode');

						frm1.areaName.setValue('');
						frm1.areaName.store.removeAll();
						frm1.areaName.store.baseParams = {
							_mt : 'json',
							_A : 'AREA_Q',
							warehouseId : r.get('id')
						};
						frm1.areaName.store.reload();
					},
					afterrender : function(t) {
						frm1.areaName.store.baseParams = {
							_mt : 'json',
							_A : 'AREA_Q'
						};
						frm1.areaName.store.reload();
					}
				}
			});

	// 源库区
	var area1 = new Ext.form.ComboBox({
				fieldLabel : '库区',
				name : 'areaName',
				tabIndex : 2,
				ref : '../areaName',
				store : WHTStore.getArea(),
				displayField : 'areaName',
				valueField : 'areaName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				xtype : 'combo',
				anchor : '95%',
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue() == '') {
							f.clearValue();
							areaId1 = '';
							areaCode1 = '';
						}
					},
					select : function(c, r, i) {
						areaId1 = r.get('id');
						areaCode1 = r.get('areaCode');
					},
					afterrender : function(t) {

					}
				}
			});

	// 源库位
	var block1 = new Fos.BlockLookUp({
				fieldLabel : '库位',
				name : 'blockName',
				tabIndex : 11,
				store : WHTStore.getBlock(),
				enableKeyEvents : true,
				itemSelector : 'div.list-item',
				tpl : blockTpl,
				displayField : 'blockName',
				valueField : 'blockName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue == '') {
							f.clearValue();
							blockId1 = '';
							blockCode1 = '';
						}
					},
					select : function(c, r, i) {
						blockId1 = r.get('id');
						blockCode1 = r.get('blockCode');
						areaId1 = r.get('areaId');
						areaCode1 = r.get('areaCode');
						area1.setValue(r.get('areaName'));
						warehouseId1 = r.get('warehouseId');
						warehouseCode1 = r.get('warehouseCode');
						wareHouse1.setValue(r.get('warehouseName'));
					},
					keyup : {
						fn : function(f, e, t) {
							WBlockLC(f, e, 0, 0, '', '');
						},
						buffer : BF
					}
				}
			});

	// 查询按钮
	var searchButton = new Ext.Button({
				text : C_SEARCH,
				iconcls : 'search',
				handler : this.search
			});

	// 源仓库部分重置按钮
	var resetButton1 = new Ext.Button({
				text : '重置',
				handler : function() {
					wareHouse1.setValue('');
					area1.setValue('');
					block1.setValue('');

				}
			});

	var frm1 = new Ext.form.FormPanel({
				region : 'north',
				labelWidth : 35,
				frame : true,
				height : 45,
				layout : 'column',
				layoutConfig : {
					columns : 5
				},
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [wareHouse1]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [area1]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [block1]
						}, {
							columnWidth : .1,
							layout : 'form',
							border : false,
							items : [searchButton]
						}, {
							columnWidth : .1,
							layout : 'form',
							border : false,
							items : [resetButton1]
						}]
			});

	// 源仓库部分单选行
	var sm1 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});

	var planedQuantity1=new Ext.form.NumberField({minValue:0,name:'adjustQuantity'});
	// 源仓库部分各列
	var cn1 = new Ext.grid.ColumnModel({
				columns : [sm1, {
							header : 'SKU编号',width:80,align:'center',
							dataIndex : 'skuNo'
						}, {
							header : '货物名称',align:'center',
							dataIndex : 'cargoName'
						}, {
							header : '库存量',align:'center',width:70,
							dataIndex : 'quantity'
						}, {
							header : '计划数量',align:'center',width:70,
							dataIndex : 'adjustQuantity',
							editor : planedQuantity1
						},{
							header : '源库位',align:'center',
							dataIndex : 'blockName'
						},{
							header : '源库区',align:'center',
							dataIndex : 'areaName'
						},{
							header : '源仓库',align:'center',width:80,
							dataIndex : 'warehouseName'
						},{
							header : '已选择',align:'center',
							dataIndex : 'selectFlag'
						}],
				defaults : {
					sortable : true,
					width : 100
				}
			});

	var grid1 = new Ext.grid.EditorGridPanel({
				region : 'center',
				layout : 'fit',
				height : 200,
				store : beforeStore,
				sm : sm1,
				cm : cn1
			});

	// 源仓库面板
	var sourceWarehousePanel = new Ext.Panel({
				title : '源仓库',
				layout : 'border',
				region : 'west',
				width : 530,
				items : [frm1, grid1]
			});
	/*
	 * 右边目的仓库
	 */

	// 目的仓库
	var wareHouse2 = new Ext.form.ComboBox({
				fieldLabel : '仓库',
				name : 'warehouseName',
				ref : '../warehouseName',
				store : WHTStore.getWarehouse(),
				xtype : 'combo',
				displayField : 'warehouseName',
				valueField : 'warehouseName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				tabIndex : 57,
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue == '') {
							f.clearValue();
							warehouseId2 = '';
							warehouseCode2 = '';
						}
					},
					select : function(c, r, i) {
						warehouseId2 = r.get('id');
						warehouseCode2 = r.get('warehouseCode');
						frm2.areaName.setValue('');
						frm2.areaName.store.removeAll();
						frm2.areaName.store.baseParams = {
							_A : 'AREA_Q',
							_mt : 'json'
						};
						frm2.areaName.store.reload({
									params : {
										warehouseId : r.get('id')
									}
								});
					},
					afterrender : function(t) {
						frm2.areaName.store.baseParams = {
							_A : 'AREA_Q',
							_mt : 'json'
						};
						frm2.areaName.store.reload();
					}
				}
			});

	// 目的库区
	var area2 = new Ext.form.ComboBox({
				fieldLabel : '库区',
				name : 'areaName',
				tabIndex : 2,
				ref : '../areaName',
				store : WHTStore.getArea(),
				displayField : 'areaName',
				valueField : 'areaName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				xtype : 'combo',
				anchor : '95%',
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue == '') {
							f.clearValue();
							areaId2 = '';
							areaCode2 = '';
						}
					},
					select : function(c, r, i) {
						areaId2 = r.get('id');
						areaCode2 = r.get('areaCode');
					},
					afterrender : function(t) {
					}
				}
			});

	// 目的 库位
	var block2 = new Fos.BlockLookUp({
				fieldLabel : '库位',
				name : 'blockName',
				tabIndex : 11,
				store : WHTStore.getBlock(),
				enableKeyEvents : true,
				itemSelector : 'div.list-item',
				tpl : blockTpl,
				displayField : 'blockName',
				valueField : 'blockName',
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				anchor : '95%',
				listeners : {
					scope : this,
					blur : function(f) {
						if (f.getRawValue == '') {
							f.clearValue();
							blockId2 = '';
							blockCode2 = '';
						}
					},
					select : function(c, r, i) {
						blockId2 = r.get('id');
						blockCode2 = r.get('blockCode');
						areaId2 = r.get('areaId');
						areaCode2 = r.get('areaCode');
						warehouseId2 = r.get('warehouseId');
						warehouseCode2 = r.get('warehouseCode');
						area2.setValue(r.get('areaName'));
						wareHouse2.setValue(r.get('warehouseName'));
					},
					keyup : {
						fn : function(f, e, t) {
							WBlockLC(f, e, 1, 0, '', '');
						},
						buffer : BF
					}
				}
			});

	// 目的仓库重置按钮
	var resetButton2 = new Ext.Button({
				text : '重置',
				handler : function() {
					wareHouse2.setValue('');
					area2.setValue('');
					block2.setValue('');
				}
			});

	var frm2 = new Ext.form.FormPanel({
				region : 'north',
				labelWidth : 35,
				frame : true,
				height : 45,
				layout : 'column',
				layoutConfig : {
					columns : 4
				},
				items : [{
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [wareHouse2]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [area2]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [block2]
						}, {
							columnWidth : .25,
							layout : 'form',
							border : false,
							items : [resetButton2]
						}]
			});

	// 目的仓库单选行
	var sm2 = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});

	// 目的仓库各列
	var cn2 = new Ext.grid.ColumnModel({
				columns : [sm2, {
							header : 'SKU编号',width:80,align:'center',
							dataIndex : 'skuNo'
						}, {
							header : '货物名称',align:'center',
							dataIndex : 'cargoName'
						}, {
							header : '实际数量',align:'center',width:70,
							dataIndex : 'quantity'
						}, {
							header : '移库倒库数量',align:'center',
							dataIndex : 'transQuantity'
						},{
							header : '源库位',align:'center',width:70,
							dataIndex : 'fromBlockName'
						},{
							header : '源库区',width:80,
							dataIndex : 'fromAreaName'
						},{
							header : '源仓库',align:'center',width:70,
							dataIndex : 'fromWarehouseName'
						}],
				defaults : {
					sortable : true,
					width : 100
				}
			});

	var grid2 = new Ext.grid.GridPanel({
				height : 200,
				store : afterStore,
				sm : sm2,
				cm : cn2
			});

	// 目的仓库面板
	var purposeWarehousePanel = new Ext.Panel({
				title : '目的仓库',
				layout : 'border',
				items : [frm2, grid2]
			});

	// 转移按钮方法
	var down = function() {
		if (wareHouse1.getValue() == '' || area1.getValue() == ''
				|| block1.getValue() == '') {
			Ext.Msg.alert(SYS, '不能重复选择！');
		} else {
			
			var b = sm1.getSelections();
			if (b.length > 0) {
				if(!planedQuantity1.getValue()){
					Ext.Msg.alert(SYS, '请填写计划数量！',function (){planedQuantity1.focus();});
					return ;
				}
				if(!wareHouse2.getValue()){
					Ext.Msg.alert(SYS, '请填写目的仓库！',function (){wareHouse2.focus();});
					return ;
				}
				if(!area2.getValue()){
					Ext.Msg.alert(SYS, '请填写目的库区！',function (){area2.focus();});
					return ;
				}
				if(!block2.getValue()){
					Ext.Msg.alert(SYS, '请填写目的库位！',function (){block2.focus();});
					return ;
				}
				if(p.get('rowAction')=='N'){
					Ext.Msg.alert(SYS,C_SAVE_FIRST);
					return;
				}
				for (var i = 0; i < b.length; i++) {
					if (b[i].get('selectFlag') == 0) {
						var tnlRecord = new WTransList({
									uuid : p.get('uuid'),
									rowAction : 'N',
									version : 0
								});
						tnlRecord.set('transNoteId', p.get('id'));
						tnlRecord.set('placedCargoId', b[i].get('id'));
						tnlRecord.set('skuNo', b[i].get('skuNo'));
						tnlRecord.set('cargoId', b[i].get('cargoId'));
						tnlRecord.set('cargoName', b[i].get('cargoName'));
						tnlRecord.set('fromWarehouseId', b[i].get('warehouseId'));
						tnlRecord.set('fromWarehouseCode', b[i].get('warehouseCode'));
						tnlRecord.set('fromWarehouseName', b[i].get('warehouseName'));
						tnlRecord.set('fromAreaId', b[i].get('areaId'));
						tnlRecord.set('fromAreaCode', b[i].get('areaCode'));
						tnlRecord.set('fromAreaName', b[i].get('areaName'));
						tnlRecord.set('fromBlockId', b[i].get('blockId'));
						tnlRecord.set('fromBlockCode', b[i].get('blockCode'));
						tnlRecord.set('fromBlockName', b[i].get('blockName'));
						tnlRecord.set('toWarehouseName', wareHouse2.getValue());// 为目的仓库赋值
						tnlRecord.set('toAreaName', area2.getValue()); // 为目的库区赋值
						tnlRecord.set('toBlockName', block2.getValue()); // 为目的库位赋值
						tnlRecord.set('toBlockId', blockId2);
						tnlRecord.set('toAreaId', areaId2);
						tnlRecord.set('toWarehouseId', warehouseId2);
						tnlRecord.set('toBlockCode', blockCode2);
						tnlRecord.set('toAreaCode', areaCode2);
						tnlRecord.set('toWarehouseCode', warehouseCode2);
						tnlRecord.set('transQuantity', b[i].get('adjustQuantity'));
						tnlRecord.set('oldQuantity', HTUtil.round2(b[i].get('quantity'))
										- HTUtil.round2(b[i].get('pickedQuantity')));
						tnlRecord.set('status', 0);
						afterStore.add(tnlRecord);
						store.add(tnlRecord);
						
						var xml=HTUtil.RTX(tnlRecord,'WTransList',WTransList);
						Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
							params:{_A:'WTRANS_NOTE_LIST_S'},
							success: function(r){
								var c = HTUtil.XTRA(r.responseXML,'WTransList',WTransList);
								HTUtil.RUA(store,c,WTransList);
								XMG.alert(SYS,M_S);
							},
							failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
							xmlData:HTUtil.HTX(xml)
						});
						b[i].set('selectFlag', 1);
					} else {
						Ext.Msg.alert(SYS, b[i].get('cargoName')
												+ 'Have Down!');
					}
				}
			} else {
				Ext.Msg.alert(SYS, C_SEL_TRANS_DATA);
			}
		}
	};

	// 中间转移按钮
	var shiftButton = new Ext.Button({
				text : '->',
				anchor : '100%',
				scope : this,
				handler : down
			});

	// 按钮面板
	var cenButton = new Ext.Panel({
				buttonHeight : true,
				bodyStyle : "padding-top: 70px;padding-left:2px;",
				items : [shiftButton]
			});

	// 中间部分面板
	var cenPanel = new Ext.Panel({
				region : 'center',
				layout : 'column',
				height : 180,
				items : [{
							columnWidth : .5,
							layout : 'form',
							border : false,
							items : [frm1, grid1]
						}, {
							columnWidth : .05,
							layout : 'fit',
							border : false,
							bodyStyle : "padding-top: 100px;",
							items : [shiftButton]
						}, {
							columnWidth : .45,
							layout : 'form',
							border : false,
							items : [frm2, grid2]
						}]
			});

	/*
	 * 移库明细
	 */

	// 目的仓库单选行
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});

	// 目的仓库各列
	var cn = new Ext.grid.ColumnModel({
				columns : [sm, {
							header : 'SKU编号',align:'center',
							dataIndex : 'skuNo'
						}, {
							header : '货物名称',align:'center',width:150,
							dataIndex : 'cargoName'
						}, {
							header : '原来数量',align:'center',
							dataIndex : 'oldQuantity'
						}, {
							header : '移库数量',align:'center',
							dataIndex : 'transQuantity'
						}, {
							header : '目的仓库名称',align:'center',
							dataIndex : 'toWarehouseName'
						}, {
							header : '目的库区名称',align:'center',
							dataIndex : 'toAreaName'
						}, {
							header : '目的库位名称',align:'center',
							dataIndex : 'toBlockName'
						}, {
							header : '源仓库名称',align:'center',
							dataIndex : 'fromWarehouseName'
						}, {
							header : '源库区名称',align:'center',
							dataIndex : 'fromAreaName'
						}, {
							header : '源库位名称',align:'center',
							dataIndex : 'fromBlockName'
						}],
				defaults : {
					sortable : true,
					width : 100
				}
			});

	// 删除移库明细信息
	this.delTransDetail = function() {
		var b = sm.getSelections();
		if (b.length > 0) {
			Ext.Msg.confirm(SYS, M_R_C, function(btn) {
						if (btn == 'yes') {
							var xml = HTUtil.ATX4R(b, 'WTransList');
							HTUtil.REQUEST('WTRANS_NOTE_LIST_S', xml,
									function() {
										store.remove(b);
									});
						}
					}, this);
		} else
			Ext.Msg.alert(SYS, M_R_P);
	};

	var btnRemoveDetail = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				handler : this.delTransDetail
			});

	var grid = new Ext.grid.GridPanel({
				region : 'south',
				height : 200,
				layout : 'fit',
				store : store,
				sm : sm,
				cm : cn,
				tbar : [btnRemoveDetail]
			});

	/*
	 * 工具栏各个按钮
	 */

	// 保存移库单按钮要执行的方法
	this.save = function() {
		if(Ext.isEmpty(cmbTransType.getValue())){
			Ext.Msg.alert(SYS,'操作类型不能为空！');
			return ;
		}
		if(Ext.isEmpty(dtfTransDate.getValue())){
			Ext.Msg.alert(SYS,'移库日期不能为空！');
			return ;
		}
		grid.stopEditing();
		p.beginEdit();
		frm.getForm().updateRecord(p);
		p.endEdit();
		var xml = '';
		xml = xml + HTUtil.RTX(p, 'WTransNote', WTransNote);

		var re = store.getModifiedRecords();
		if (re.length > 0) {
			xml = xml + HTUtil.ATX(re, 'WTransList', WTransList);
		}
		if (xml != '') {
			Ext.Ajax.request({
						scope : this,
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'WTRANS_NOTE_CS'
						},
						success : function(res) {
							var a1 = HTUtil.XTR(res.responseXML, 'WTransNote',
									WTransNote);
							var ra = p.get('rowAction');
							var f = WTransNote.prototype.fields;
							p.beginEdit();
							for (var i = 0; i < f.keys.length; i++) {
								var fn = '' + f.keys[i];
								p.set(fn, a1.get(fn));
							}
							if (ra == 'N') {
								this.find('name', 'transNoteNo')[0].setValue(p
										.get('transNoteNo'));
								p.set('rowAction', 'M');
							}
							p.endEdit();

							var a2 = HTUtil.XTRA(res.responseXML, 'WTransList',
									WTransList);
							HTUtil.RUA(store, a2, WTransList);

							this.changToolBarButtonStatus(2);
							XMG.alert(SYS, M_S);
						},
						failure : function(res) {
							XMG.alert(SYS, M_F + res.responseText);
						},
						xmlData : HTUtil.HTX(xml)
					});
		} else {
			XMG.alert(SYS, 'NO XML!');
		}
	};

	// 删除移库单要执行的方法
	this.removeNote = function() {
		Ext.Msg.confirm(SYS, M_R_C, function(btn) {
					if (btn == 'yes') {
						var xml = HTUtil.RTX4R(p, 'WTransNote');
						HTUtil.REQUEST('WTRANS_NOTE_S', xml, this.removeTab,
								this);
					}
				}, this);
	};
	this.removeTab = function(r, s) {
		var tab = s.ownerCt; // 得到当前对像所在的容器
		tab.remove(s);
	};

	// 提交移库单要执行的方法
	this.submit = function() {
		this.updateStatus(1);
	};

	// 取消提交移库单要执行的方法
	this.unSubmit = function() {
		this.updateStatus(0);
	};

	// 取消审核移库单要执行的方法
	this.unAudit = function() {
		this.updateStatus(3);
	};

	// 审核移库单要执行的方法
	this.audit = function() {
		if (!frm.checkerName.getValue()) {
			p.set('checkerId', sessionStorage.getItem("USER_ID"));
			frm.checkerName.setValue(sessionStorage.getItem("USER_NAME"));
		}
		if (!frm.checkTime.getValue()) {
			var nowDate = new Date();
			frm.checkTime.setValue(nowDate);
		}
		this.updateStatus(2);
	};

	this.updateStatus = function(s) {
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : 'WTRANS_NOTE_U',
						id : p.get('id'),
						status : s,
						checkerName : frm.checkerName.getValue(),
						checkTime : frm.checkTime.getValue()
					},
					success : function(r) {
						p.beginEdit();
						p.set('status', s);
						p.set('verdion', parseInt(p.get('version')) + 1);
						p.endEdit();
						XMG.alert(SYS, M_S);
						frm.status.setValue(HTStore.getTransNoteStatus(s));
						this.changToolBarButtonStatus(s + 2);
					},
					failure : function(r) {
						XMG.alert(SYS, M_F + r.responseText);
					}
				});
	};

	// 执行移库单要做的方法
	this.doTrans = function() {
		// 请先添加好移库明细数据再进行执行操作
		if (store.getRange().length <= 0) {
			Ext.Msg.alert(SYS, C_NEED_TRANSLIST_DATA,

					this);
			return;
		}

		// 移库明细数据有变化，请先保存移库明细数据
		if (store.getModifiedRecords().length > 0) {
			Ext.Msg.alert(SYS, C_NEED_SAVE_TRANSLIST_FIRST,
					this);
			return;
		}

		Ext.Msg.confirm(SYS, '您确定要对这些数据进行移库操作吗？', function(btn) {
					if (btn == 'yes') {
						var a = store.getRange();
						if (a.length > 0) {
							var x = HTUtil.ATX(a, 'WTransList', WTransList);
							Ext.Ajax.request({
										url : SERVICE_URL,
										method : 'POST',
										scope : this,
										params : {
											_A : 'WTRANS_NOTE_LIST_E'
										},
										success : function(r) {
											var a = HTUtil.XTRA(r.responseXML,
													'WTransList', WTransList);
											HTUtil.RUA(store, a, WTransList);
											Ext.MessageBox.alert(SYS, M_S);
										},
										failure : function(r, o) {
											Ext.MessageBox
													.alert(
															SYS,
															HTUtil
																	.XTM(r.responseXML));
										},
										xmlData : HTUtil.HTX(x)
									});
						}
					}
				}, this);
	};

	// 执行输出要执行的方法
	this.exp = function() {
	};

	Fos.TransLibrNotePanel.superclass.constructor.call(this, {
		title : '移库倒库单',
		closable : true,
		layout : 'border',
		tbar : [{
					text : C_SAVE,
					iconCls : 'save',
					ref : '../saveBtn',
					disabled : p.get('status') != 0,
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_SAVE),
					scope : this,
					handler : this.save
				}, '-', {
					text : C_REMOVE,
					iconCls : 'remove',
					ref : '../removeBtn',
					disabled : (p.get('rowAction') == 'N' || p.get('status') != 0),
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_DEL),
					scope : this,
					handler : this.removeNote
				}, '-', {
					text : C_COMMIT,
					iconCls : 'check',
					ref : '../checkBtn',
					disabled : (p.get('rowAction') == 'N' || p.get('status') != 0),
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_COMMIT),
					scope : this,
					handler : this.submit
				}, '-', {
					text : C_COMMIT_CANCEL,
					iconCls : 'renew',
					ref : '../unCheckBtn',
					disabled : p.get('status') != 1,
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_CANCEL_COMMIT),
					scope : this,
					handler : this.unSubmit
				}, '-', {
					text : C_AUDIT,
					iconCls : 'check',
					scope : this,
					ref : '../auditBtn',
					disabled : (p.get('status') != 1),
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_COMMIT),
					handler : this.audit
				}, '-', {
					text : C_AUDIT_CANCEL,
					iconCls : 'renew',
					scope : this,
					ref : '../unAuditBtn',
					disabled : p.get('status') != 2,
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_CANCEL_COMMIT),
					handler : this.unAudit
				}, '-', {
					text : C_DO_TRANS,
					iconCls : 'check',
					scope : this,
					ref : '../doTransBtn',
					disabled : (p.get('status') != 2),
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_DO),
					handler : this.doTrans
				}, '-', {
					text : C_EXPORT,
					iconCls : 'print',
					scope : this,
					ref : '../printBtn',
					disabled : p.get('rowAction') == 'N',
					hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_EXPORT),
					menu : {
						items : [{
									text : C_CHECK_NOTE,
									scope : this,
									handler : this.exp
								}]
					}
				}],
		items : [frm, cenPanel, grid],
		listeners : {
			scope : this,
			afterrender : function(t) {
				this.changToolBarButtonStatus(opStatus);
			}
		}
	});
};
Ext.extend(Fos.TransLibrNotePanel, Ext.Panel);