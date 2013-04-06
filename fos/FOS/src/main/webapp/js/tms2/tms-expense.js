Fos.TmsExpenseTab = function(p, parent) {
	PCny = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	PUsd = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	PLoc = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	PRc = new Ext.form.TextField({
				width : 80,
				disabled : true
			});

	this.parent = parent;

	var pR = new Fos.TmsExGrid(p, 'R', this);
	var pP = new Fos.TmsExGrid(p, 'P', this);

	this.reCalculate = function() {
		PCny.setValue(HTUtil.round2(pR.sumCny - pP.sumCny));
		PUsd.setValue(HTUtil.round2(pR.sumUsd - pP.sumUsd));
		PLoc.setValue(HTUtil.round2(pR.sumLoc - pP.sumLoc));
		PRc.setValue(HTUtil.round2(pR.sumRc - pP.sumRc));
	};

	this.updateStatus = function(s) {
		var action = "CONS_U";
		if (p.get('consBizType') == BT_T) {
			if (p.get('consBizClass') == 'O') {
				action = "TCON_C_U";
			}
			if (p.get('consBizClass') == 'S') {
				action = "TCON_C_T";
			}
		}
		if (p.get('consBizType') == BT_W)
			action = "WCON_C_U";
		if (p.get('consBizType') == BT_E)
			action = "ECON_C_U";

		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL,
					method : 'POST',
					params : {
						_A : action,
						id : p.get('id'),
						consStatusExp : s
					},
					success : function(r) {
						p.beginEdit();
						p.set('consStatusExp', s);
						p.endEdit();
						this.updateToolBar();
						Ext.Msg.alert(SYS, M_S);
					},
					failure : function(r) {
						Ext.Msg.alert(SYS, M_F + r.responseText);
					}
				});
	};

	var m = getRM(p.get('consBizClass'), p.get('consBizType'), p
					.get('consShipType'));
	if (p.get('consBizType') == 'T')
		m = M1_TMS;
	if (parent == 'SET')
		m = M1_SET + S_EXPE + '04';
	else
		m = m + M3_EXPE + '04';

	// 业务确认 1
	this.check = function() {
		this.updateStatus('1');
	};
	// 取消确认 0
	this.unCheck = function() {
		this.updateStatus('0');
	};

	var btnCheck = new Ext.Button({
				text : C_EXPE_AUDIT,
				disabled : NR(m) || p.get('consStatusExp') == 1
						|| p.get('consBizType') == BT_W,
				iconCls : 'check',
				scope : this,
				handler : this.check
			});
	var btnUnCheck = new Ext.Button({
				text : C_EXPE_UNCHECK,
				disabled : NR(m) || p.get('consStatusExp') == 0
						|| p.get('consBizType') == BT_W,
				iconCls : 'renew',
				scope : this,
				handler : this.unCheck
			});

	this.updateToolBar = function() {
		btnCheck.setDisabled(NR(m) || p.get('consStatusExp') == 1);
		btnUnCheck.setDisabled(NR(m) || p.get('consStatusExp') == 0);
		pR.updateToolBar();
		pP.updateToolBar();
	};

	var pBiz;
	var tab ;
		
	if (p.get('consBizType') == BT_T) {
		if (p.get('consBizClass') == 'O') {
			pBiz = new Fos.TmsExpenseBizPanel(p);
			tab = new Ext.TabPanel({
						activeTab : 0,
						region : 'center',
						items : [pR, pP]
					});
		}
		if (p.get('consBizClass') == 'S') {
			pBiz = new Fos.TmsTransExpenseBizPanel(p);
			tab = new Ext.TabPanel({
						activeTab : 1,
						region : 'center',
						items : [pR, pP]
					});
		}
	}

	Fos.TmsExpenseTab.superclass.constructor.call(this, {
				title : '费用登记',
				id : 'TMS' + p.get('id'),
				autoScroll : false,
				layout : 'border',
				closable : true,
				items : [pBiz,tab],
				tbar : [btnCheck, '-', btnUnCheck, '->', {
							xtype : 'tbtext',
							text : C_PROFIT_LOC
						}, PLoc, '-', {
							xtype : 'tbtext',
							text : C_PROFIT_RC
						}, PRc]
			});
};
Ext.extend(Fos.TmsExpenseTab, Ext.Panel);

/*
 * 费用编辑窗口 p 委托对象 t 费用类型，R：应收 P：应付 frm 上级窗口
 */
Fos.TmsExGrid = function(p, t, frm) {
	var store = new Ext.data.Store({
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

	store.load({
				params : {
					expeType : t,
					consId : p.get('id')
				},
				callback : function() {
					this.reCalculate();
				},
				scope : this
			});
	var txtSumCny = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	var txtSumUsd = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	var txtSumLoc = new Ext.form.TextField({
				width : 80,
				disabled : true
			});
	var txtSumRc = new Ext.form.TextField({
				width : 80,
				disabled : true
			});

	this.sumCny = 0;
	this.sumUsd = 0;
	this.sumLoc = 0;
	this.sumRc = 0;

	this.reCalculate = function() {
		var d = store.getRange();
		this.sumCny = 0;
		this.sumUsd = 0;
		this.sumLoc = 0;
		this.sumRc = 0;
		for (var i = 0; i < d.length; i++) {
			if (d[i].get('currCode') == 'CNY')
				this.sumCny += parseFloat(d[i].get('expeTotalAmount'));
			else if (d[i].get('currCode') == 'USD')
				this.sumUsd += parseFloat(d[i].get('expeTotalAmount'));
			this.sumLoc += parseFloat(d[i].get('expeTotalAmount')
					* d[i].get('expeExRate'));
			this.sumRc += parseFloat(d[i].get('expeWriteOffRcAmount'));
		}
		txtSumCny.setValue(HTUtil.round2(this.sumCny));
		txtSumUsd.setValue(HTUtil.round2(this.sumUsd));
		txtSumLoc.setValue(HTUtil.round2(this.sumLoc));
		txtSumRc.setValue(HTUtil.round2(this.sumRc));
		frm.reCalculate();
	};

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	// 结算单位
	var t1 = {
		header : C_SETTLE_OBJECT,
		width : 200,
		dataIndex : "custName",
		align : 'left',
		editor : new Fos.CustomerLookup({
			displayField : 'custCode',
			valueField : 'custCode',
			store : HTStore.getCS(),
			mode : 'local',
			tpl : custTpl,
			itemSelector : 'div.list-item',
			listWidth : C_LW,
			typeAhead : true,
			triggerAction : 'all',
			selectOnFocus : true,
			lazyRender : true,
			custType : t == 'R' ? 'custArFlag' : 'custApFlag',
			bizType : p.get('consBizType'),
			listClass : 'x-combo-list-small',
			enableKeyEvents : true,
			listeners : {
				scope : this,
				keydown : {
					fn : function(f, e) {
						loadCustomer(f, e, t == 'R'
										? 'custArFlag'
										: 'custApFlag', p.get('consBizType'), 1);
					},
					buffer : 400
				},
				select : function(c, r, i) {
					var b = sm.getSelected();
					b.set('custId', r.get('id'));
					b.set('custName', r.get('custNameCn'));
					b.set('custSName', r.get('custSNameCn'));
				}
			}
		})
	};

	var charBp = {
		_A : 'CHAR_Q',
		_mt : 'json',
		tmsFlag : 1
	};

	var charStore = new Ext.data.Store({
				url : SERVICE_URL,
				baseParams : charBp,
				reader : new Ext.data.JsonReader({
							totalProperty : 'rowCount',
							root : 'GCharge',
							id : 'id'
						}, GCharge),
				remoteSort : true,
				sortInfo : {
					field : 'id',
					direction : 'desc'
				}
			});
	// 费用名称
	var t2 = {
		header : C_CHAR,
		width : 100,
		dataIndex : "charName",
		align : 'center',
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
							var b = sm.getSelected();
							b.set('charId', r.get('id'));
							b.set('chclId', r.get('chclId'));
							b.set('chclCode', r.get('chclCode'));
							b.set('charNameEn', r.get('charNameEn'));
							b.set('currCode', r.get('currCode'));
							b.set('unitId', r.get('unitId'));
							b.set('expeExRate', HTStore.getExRate(r
													.get('currCode'), 'CNY'));
							b.set('charName', r.get('charName'));
							this.reCalculate();
						}
					}
				})
	};
	// 计量单位
	var t3 = {
		header : C_UNIT,
		width : 80,
		dataIndex : "unitName",
		align : 'center',
		editor : new Ext.form.ComboBox({
					displayField : 'unitCode',
					valueField : 'unitCode',
					triggerAction : 'all',
					mode : 'remote',
					selectOnFocus : true,
					listClass : 'x-combo-list-small',
					store : HTStore.getUNIT_C()
				})
	};
	// 计费数量
	var t4 = {
		header : C_CHARGE_QUANTITY,
		width : 80,
		dataIndex : "expeNum",
		renderer : function(v, m, r) {
			v = parseFloat(v);
			v = v.toFixed(4);
			if (v == 'NaN') {
				v = '0.0000';
			};
			m.css = 'red-b';
			return v;
		},
		editor : new Ext.form.NumberField({
					decimalPrecision : 4,
					allowBlank : false,
					emptyText : '',
					invalidText : ''
				})
	};
	// 单价
	var t5 = {
		header : C_UNIT_PRICE,
		width : 80,
		dataIndex : "expeUnitPrice",
		renderer : function(v, m, r) {
			v = parseFloat(v);
			v = v.toFixed(4);
			if (v == 'NaN') {
				v = '0.0000';
			};
			m.css = 'red-b';
			return v;
		},
		editor : new Ext.form.NumberField({
					decimalPrecision : 4,
					allowBlank : false,
					emptyText : '',
					invalidText : ''
				})
	};
	// 币种
	var t6 = {
		header : C_CURR,
		dataIndex : 'currCode',
		width : 50,
		align : 'center',
		editor : new Ext.form.ComboBox({
					displayField : 'currCode',
					valueField : 'currCode',
					triggerAction : 'all',
					allowBlank : false,
					emptyText : '',
					invalidText : '',
					mode : 'remote',
					selectOnFocus : true,
					listClass : 'x-combo-list-small',
					store : HTStore.getCURR_S()
				})
	};
	// 汇率
	var t7 = {
		header : C_EX_RATE,
		width : 60,
		dataIndex : "expeExRate",
		renderer : rateRender
	};
	// 金额
	var t8 = {
		header : C_AMOUNT,
		width : 80,
		dataIndex : "expeTotalAmount",
		renderer : function(v, m, r) {
			v = parseFloat(v);
			v = v.toFixed(3);
			if (v == 'NaN') {
				v = '0.000';
			};
			m.css = 'red-b';
			return v;
		}
	};
	// P/L
	var t11 = {
		header : C_PPCC,
		dataIndex : 'pateCode',
		width : 40,
		align : 'center',
		editor : new Ext.form.ComboBox({
					displayField : 'pateCode',
					valueField : 'pateCode',
					triggerAction : 'all',
					mode : 'local',
					selectOnFocus : true,
					listClass : 'x-combo-list-small',
					store : HTStore.getPATE_S(),
					listeners : {
						scope : this,
						select : function(c, r, i) {
							sm.getSelected().set('pateId', r.get('id'));
						}
					}
				})
	};
	// 账单号
	var t12 = {
		header : C_INVO_NO,
		align : 'center',
		dataIndex : "expeInvoiceNo"
	};
	// 税务发票号
	var t13 = {
		header : C_TAX_NO,
		align : 'center',
		dataIndex : "expeTaxInvoiceNo"
	};
	// C_INVOICED_AMOUNT
	var t14 = {
		header : C_INVOICED_AMOUNT,
		renderer : rateRender,
		dataIndex : "expeInvoiceAmount"
	};
	// 已核销金额
	var t15 = {
		header : C_WRITEOFFED_AMOUNT,
		renderer : rateRender,
		dataIndex : "expeWriteOffAmount"
	};
	// 备注
	var t16 = {
		header : C_REMARKS,
		width : 100,
		dataIndex : "expeRemarks",
		editor : new Ext.form.TextField({
					enableKeyEvents : true,
					listeners : {
						scope : this,
						keydown : function(c, e) {
							k = e.getKey();
							if (k == e.ENTER)
								this.add();
						}
					}
				})
	};
	// 账单日期
	var t17 = {
		header : C_INVO_DATE,
		width : 100,
		renderer : formatDate,
		dataIndex : "expeInvoiceDate"
	};
	// 核销日期
	var t18 = {
		header : C_WRITEOFF_DATE,
		renderer : formatDate,
		dataIndex : "expeWriteOffDate"
	};
	// 创建时间
	var t19 = {
		header : C_CREATE_TIME,
		renderer : formatDateTime,
		dataIndex : "createTime"
	};
	// 修改时间
	var t20 = {
		header : C_MODIFY_TIME,
		renderer : formatDateTime,
		dataIndex : "modifyTime"
	};
	// 佣金%
	var t21 = {
		header : C_COMMISION_RATE,
		width : 80,
		dataIndex : "expeCommissionRate",
		renderer : rateRender,
		editor : new Ext.form.NumberField({
					decimalPrecision : 4,
					allowBlank : false,
					emptyText : '',
					invalidText : ''
				})
	};
	// 佣金
	var t22 = {
		header : C_COMMISION,
		width : 60,
		dataIndex : "expeCommission",
		renderer : numRender,
		editor : new Ext.form.NumberField({
					decimalPrecision : 2,
					allowBlank : false,
					emptyText : '',
					invalidText : ''
				})
	};
	// 创建人
	var t23 = {
		header : C_CREATE_BY,
		dataIndex : "createBy"
	};
	// 修改人
	var t24 = {
		header : C_MODIFY_BY,
		dataIndex : "expeUpdateBy"
	};
	// 制单人
	var t25 = {
		header : C_BILL_BY,
		dataIndex : "expeInvoiceBy"
	};
	// 核销人
	var t26 = {
		header : C_VOUC_BY,
		dataIndex : "expeWriteOffBy"
	};
	// 实际数量
	var t27 = {
		header : C_ACT_QUANTITY,
		width : 80,
		dataIndex : "expeNum2",
		renderer : function(v, m, r) {
			v = parseFloat(v);
			v = v.toFixed(4);
			if (v == 'NaN') {
				v = '0.0000';
			};
			m.css = 'green-b';
			return v;
		},
		editor : new Ext.form.NumberField({
					decimalPrecision : 4,
					allowBlank : false,
					emptyText : '',
					invalidText : ''
				})
	};

	var cols = [sm, t1, t2, t3, t4, t5, t8, t16, t12, t13, t14, t15, t17, t18,
			t23, t19, t24, t20, t25, t26];
	var cm = new Ext.grid.ColumnModel({
				columns : cols,
				defaults : {
					sortable : false,
					width : 100,
					align : 'right'
				}
			});
	cm.defaultSortable = true;
	cm.defaultWidth = 100;

	// 新增
	this.add = function() {
		function custIdFunction() {
			var cnId = '';
			if (t == 'R') {
				cnId = p.get('custId'); // 委托单位
			} else if (t == 'P') {
				if (p.get('consBizType') == 'T') {
					cnId = p.get('motorcadeId'); // 陆运-承运人
				}
			}
			return cnId;
		};
		function custNameFunction() {
			var cn = '';
			if (t == 'R') {
				cn = p.get('custName'); // 委托单位
			} else if (t == 'P') {
				if (p.get('consBizType') == 'T') {
					cn = p.get('motorcadeName'); // 陆运-承运人
				}
			}
			return cn;
		};
		var e = new SExpense({
					uuid : HTUtil.UUID(32),
					consId : p.get('id'),
					consNo : p.get('consNo'),
					consDate : p.get('consDate'),
					consMblNo : p.get('consMblNo'),
					consHblNo : p.get('consHblNo'),
					vessName : p.get('vessName'),
					voyaName : p.get('voyaName'),
					consSailDate : p.get('consSailDate'),
					consBizType : p.get('consBizType'),
					consBizClass : p.get('consBizClass'),
					consShipType : p.get('consShipType'),
					consCustId : p.get('custId'),
					consCustName : p.get('custName'),
					shliId : p.get('shliId'),
					custId : custIdFunction(),
					custName : custNameFunction(),
					custSname : t == 'R' ? p.get('custSname') : '',
					expeType : t == 'R' ? 'R' : 'P',
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
		this.stopEditing();
		store.insert(0, e);
		sm.selectFirstRow();
		e.set('rowAction', 'N');
		this.startEditing(0, 1);
	};

	// 删除
	this.removeExp = function() {
		var r = sm.getSelections();
		if (r.length) {
			for (var i = 0; i < r.length; i++) {
				if (r[i].get('expeInvoiceStatus') > 0)
					Ext.Msg.alert(SYS, M_REMOVE_EXP_INVOICED);
				else {
					r[i].set('rowAction', r[i].get('rowAction') == 'N'
									? 'D'
									: 'R');
					store.remove(r[i]);
					this.reCalculate();
				}
			}
		} else
			Ext.Msg.alert(SYS, M_R_P);
	};

	// 保存
	this.save = function() {
		var a = store.getModifiedRecords();
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
								HTUtil.RUA(store, a, SExpense);
								Ext.Msg.alert(SYS, M_S);
								btnSave.setDisabled(false);
							},
							failure : function(res) {
								Ext.Msg.alert(SYS, M_F + res.responseText);
								btnSave.setDisabled(false);
							},
							xmlData : HTUtil.HTX(x)
						});
			}
		} else
			Ext.Msg.alert(SYS, M_NC);
	};

	// 复制
	this.cp = function() {
		var p = sm.getSelected();
		if (p) {
			var e = new SExpense({});
			var f = SExpense.prototype.fields;
			for (var i = 0; i < f.keys.length; i++) {
				var fn = '' + f.keys[i];
				e.set(fn, p.get(fn));
			}
			e.set('expeDate', new Date());
			e.set('id', '');
			e.set('version', '1');
			e.set('expeInvoiceNo', '');
			e.set('expeInvoiceDate', '');
			e.set('expeUnitPrice', '');
			e.set('expeNum', 1);
			e.set('expeTotalAmount', '');
			e.set('expeCommission', '');
			e.set('expeCommissionRate', '');
			e.set('expeRcAmount', 0);
			e.set('expeWriteOffDate', '');
			e.set('expeInvoiceAmount', 0);
			e.set('expeWriteOffAmount', 0);
			e.set('expeWriteOffRcAmount', 0);
			e.set('expeStatus', 0);
			e.set('expeBillStatus', 0);
			e.set('expeInvoiceStatus', 0);
			e.set('expeWriteoffStatus', 0);
			e.set('expeAllocationFlag', 0);
			e.set('expeAllocatedFlag', 0);
			e.set('consIdM', '');
			e.set('consNoM', '');
			e.set('uuid', HTUtil.UUID(32));
			this.stopEditing();
			store.insert(0, e);
			e.set('rowAction', 'N');
			this.startEditing(0, 1);
			this.reCalculate();
		} else
			Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};

	var addExpenseByTemplate = function(tempId) {
		var action = 'GET_EXPE_BY_TEMPLATE_M';

		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL + '?_A=' + action + '&exteId=' + tempId
							+ '&consId=' + p.get('id'),
					method : 'POST',
					success : function(res) {
						var ra = HTUtil.XTRA(res.responseXML, 'SExpense',
								SExpense);
						if (ra.length == 0) {
							XMG.alert(SYS, '费用模板没有配置收费项目！');
						} else {
							store.add(ra);
						}
					},
					failure : function(r) {
						XMG.alert(SYS, M_F + r.responseText);
					}
				});
	};

	// 从模版导入数据
	this.getExpenseByTemplate = function() {
		Ext.Ajax.request({
					scope : this,
					url : SERVICE_URL + '?_A=EXPE_TEMPLATE_Q&consBizType='
							+ p.get('consBizType'),
					method : 'POST',
					success : function(res) {
						var ra = HTUtil.XTRA(res.responseXML,
								'SExpenseTemplate', SExpenseTemplate);
						if (ra.length == 0) {
							XMG.alert(SYS, '没有找到费用模板，请先维护费用模板！');
						} else if (ra.length == 1) {
							var tempId = ra[0].get('id');
							addExpenseByTemplate(tempId);
						} else {
							var tempStore = new Ext.data.Store({
										reader : new Ext.data.XmlReader({
													totalProperty : 'rowCount',
													record : 'SExpenseTemplate'
												}, SExpenseTemplate)
									});
							tempStore.loadData(res.responseXML, false);

							var frmTemplate = new Ext.form.FormPanel({
										labelWidth : 80,
										padding : 5,
										items : [{
													fieldLabel : C_TEMP_SEL_P,
													id : 'tempId',
													allowBlank : false,
													store : tempStore,
													xtype : 'combo',
													displayField : 'exteName',
													valueField : 'id',
													typeAhead : true,
													mode : 'local',
													triggerAction : 'all',
													selectOnFocus : true,
													anchor : '95%'
												}]
									});

							var w = new Ext.Window({
										title : C_TEMP_SEL_P,
										modal : true,
										width : 400,
										Height : 300,
										buttonAlign : 'right',
										items : frmTemplate
									});

							w.addButton({
										text : C_OK,
										handler : function() {
											var tempId = w.findById('tempId')
													.getValue();
											if (tempId) {
												addExpenseByTemplate(tempId);
											}
											w.close();
										}
									}, this);
							w.addButton({
										text : C_CANCEL,
										handler : function() {
											w.close();
										}
									}, this);
							w.show();
						}
					},
					failure : function(r) {
						XMG.alert(SYS, M_F + r.responseText);
					}
				});
	};

	var locked = p.get('consBizType') != BT_W
			? (p.get('consStatusExp') == 1 || p.get('consStatusAud') != 0)
			: false;

	// 费用确认单
	this.expConfirm = function() {
		var a = sm.getSelections();
		var expeIds = '';
		if (a.length) {
			for (var i = 0; i < a.length; i++) {
				expeIds += a[i].get('id');
				if (i < a.length - 1) {
					expeIds += ',';
				}
			}
			EXPC('EXPE_CONFIRM', '&aggressive=1&consBizType='
							+ p.get('consBizType') + '&expeType=' + t
							+ '&expeIds=' + expeIds + '&consignId='
							+ p.get('id'));
		} else {
			EXPC('EXPE_CONFIRM', '&aggressive=1&consBizType='
							+ p.get('consBizType') + '&expeType=' + t
							+ '&consignId=' + p.get('id'));
		}
	};

	// 费用结算单
	this.expSettlement = function() {
		EXPC('EXPE_SETTLEMENT', '&aggressive=1&consBizType='
						+ p.get('consBizType') + '&sort=' + t + '&id='
						+ p.get('id'));
	};

	// 退单申请
	this.expChargeBack = function() {
		EXPC('EXPE_CHARGEBACK', '&aggressive=1&consBizType='
						+ p.get('consBizType') + '&id=' + p.get('id'));
	};
	var expMenu = [{
				text : C_EXPE_CONFIRM,
				scope : this,
				handler : this.expConfirm
			}];
	if (t == 'R') {
		expMenu[expMenu.length] = new Ext.menu.Item({
					text : C_EXPE_SETTLEMENT,
					scope : this,
					handler : this.expSettlement
				});
		expMenu[expMenu.length] = new Ext.menu.Item({
					text : M_CHARGEBACK,
					scope : this,
					handler : this.expChargeBack
				});
	}

	var m = getRM(p.get('consBizClass'), p.get('consBizType'), p
					.get('consShipType'));
	var x = S_AR;
	if (t == 'P')
		x = S_AP;
	else if (t == 'R')
		x = S_AR;
	else
		x = S_AC;
	if (frm.parent == 'SET')
		m = M1_SET + S_EXPE + x;
	else
		m = m + M3_EXPE + x;

	var btnAdd = new Ext.Button({
				text : C_ADD,
				iconCls : 'add',
				scope : this,
				disabled : NR(m + F_M) || locked,
				handler : this.add
			});
	var btnRemove = new Ext.Button({
				text : C_REMOVE,
				iconCls : 'remove',
				scope : this,
				disabled : NR(m + F_R) || locked,
				handler : this.removeExp
			});
	var btnSave = new Ext.Button({
				text : C_SAVE,
				iconCls : 'save',
				scope : this,
				disabled : NR(m + F_M) || locked,
				handler : this.save
			});
	var btnCopy = new Ext.Button({
				text : C_COPY_FROM,
				iconCls : 'copy',
				scope : this,
				disabled : NR(m + F_M) || locked,
				handler : this.cp
			});
	var btnExport = new Ext.Button({
				text : C_EXPORT,
				iconCls : 'print',
				disabled : NR(m + F_E) || locked,
				scope : this,
				menu : {
					items : expMenu
				}
			});

	var btnAddByTemplate = new Ext.Button({
				text : '从模板导入费用',
				iconCls : 'copy',
				scope : this,
				disabled : NR(m + F_M) || locked,
				handler : this.getExpenseByTemplate
			});

	this.updateToolBar = function() {
		tb = this.getTopToolbar();
		locked = p.get('consBizType') != BT_W ? p.get('consStatusExp') == 1
				|| p.get('consStatusAud') != 0 : false;

		btnAdd.setDisabled(NR(F_M) || locked);
		btnRemove.setDisabled(NR(F_M) || locked);
		btnSave.setDisabled(NR(F_M) || locked);
		btnCopy.setDisabled(NR(F_M) || locked);
		btnAddByTemplate.setDisabled(NR(F_M) || locked);
	};

	Fos.TmsExGrid.superclass.constructor.call(this, {
		title : t == 'R' ? C_EXPE_R : C_EXPE_P,
		// split:t=='R',collapsible:t=='R',region:t=='R'?'center':'south',
		autoScroll : true,
		clicksToEdit : 1,
		height : 180,
		stripeRows : false,
		store : store,
		sm : sm,
		cm : cm,
		listeners : {
			scope : this,
			beforeedit : function(e) {
				e.cancel = e.record.get('expeStatus') > 0
						|| e.record.get('expeInvoiceStatus') > 0
						|| e.record.get('expeWriteOffStatus') > 0;
			},
			afteredit : function(e) {
				var f = e.field;
				var r = e.record;
				if (f == 'expeNum') {
					r.beginEdit();
					r.set('expeNum', e.value);
					r.set('expeTotalAmount', HTUtil.round2(e.value
									* r.get('expeUnitPrice')
									- r.get('expeCommission')));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				}
				if (f == 'unitName') {
					r.beginEdit();
					r.set('expeTotalAmount', HTUtil.round2(r.get('expeNum')
									* r.get('expeUnitPrice')
									- r.get('expeCommission')));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				} else if (f == 'expeUnitPrice') {
					r.beginEdit();
					r.set('expeTotalAmount', HTUtil.round2(e.value
									* r.get('expeNum')
									- r.get('expeCommission')));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				} else if (f == 'currCode') {
					r.beginEdit();
					r.set('expeExRate', HTStore.getExRate(e.value, 'CNY'));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				} else if (f == 'expeCommission') {
					r.beginEdit();
					r.set('expeTotalAmount', HTUtil.round2(r
									.get('expeUnitPrice')
									* r.get('expeNum') - e.value));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				} else if (f == 'expeCommissionRate') {
					r.beginEdit();
					r.set('expeCommission', HTUtil.round2(r
									.get('expeTotalAmount')
									* e.value / 100));
					r.set('expeTotalAmount', HTUtil.round2(r
									.get('expeUnitPrice')
									* r.get('expeNum')
									- r.get('expeCommission')));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				} else if (f == 'charName') {
					r.beginEdit();
					var charNameValue = r.get('charName');
					if (charNameValue == '保费' || charNameValue == 'BF') {
						r.set('expeNum', 1);
						r.set('expeNum2', 0);
						if (t == 'R') {
							if (p.get('consBizType') == 'T') {
								r.set('expeUnitPrice', p.get('premiumExpense'));
							}
						} else if (t == 'P') {
							if (p.get('consBizType') == 'T') {
								r.set('expeUnitPrice', p
												.get('premiumExpenseProvider'));
							}
						}
					} else if (charNameValue == '运费' || charNameValue == 'YF') {
						r.set('expeNum', 0);
						r.set('expeUnitPrice', 0);
						if (t == 'R') {
							if (p.get('consBizType') == 'E') {
								r.set('expeNum2', p.get('exprTotalWeight'));
							}
						} else if (t == 'P') {
							if (p.get('consBizType') == 'E') {
								r.set('expeNum2', p.get('exprTotalAWeight'));
							}
						}
					}
					r.set('expeTotalAmount', HTUtil.round2(r.get('expeNum')
									* r.get('expeUnitPrice')
									- r.get('expeCommission')));
					r.set('expeRcAmount', HTUtil.round2(r
									.get('expeTotalAmount')
									* r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();
				}
			}
		},
		tbar : [btnAdd, '-', btnRemove, '-', btnSave, '-', btnCopy, '-',
				btnAddByTemplate, '-',
				p.get('consBizType') != 'T' ? btnExport : '', '->', {
					xtype : 'tbtext',
					text : '费用合计'
				}, txtSumLoc, '-', {
					xtype : 'tbtext',
					text : C_SUM_RC
				}, txtSumRc]
	});
};
Ext.extend(Fos.TmsExGrid, Ext.grid.EditorGridPanel);