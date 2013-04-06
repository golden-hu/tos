//expense settle
var getSetPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	var items=[];
	if(HR(M1_SET+S_COAU)){
		items[items.length]=FosMenu(panel,'单票审核','TCOAU',function(){return new Fos.TConsignAuditGrid();});
		items[items.length]='-';
	}
	items[items.length]=settleRTree(panel);
	items[items.length]=settlePTree(panel);
	if(HR(M1_SET+S_INNO)){
		items[items.length]='-';
		items[items.length]=FosMenu(panel,'发票号码管理','INNO',function(){return new Fos.InvoNoGrid();});
	}
	if(HR(M1_SET+S_BALA))
		items[items.length]=FosMenu(panel,'客户账户余额','BALA',function(){return new Fos.BalaGrid();});
	/*if(HR(M1_SET+S_EXRA))
		items[items.length]=FosMenu(panel,'汇率','EXRA',function(){return new Fos.RateTab();});
	if(HR(M1_SET+S_INRA))
		items[items.length]=FosMenu(panel,'利率','INRA',function(){return new Fos.InraGrid();});*/
	
	var setPanel = new Ext.Panel({title:'费用结算',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,layout:'accordion',
		split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[setPanel]});
	
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	
	createWindow('SET',S_SETTLE,contPanel);//S_SETTLE
};

//应收结算
var settleRTree=function(panel){
	var root= new Ext.tree.TreeNode({text:'应收结算',leaf:false,expanded:true});
	
	if(HR(M1_SET+S_BILL_R)){
		var treeNode1 = CreateNode('应收对账单','BILL_R',panel,'class',function(){return new Fos.BillGrid('R');});
		root.appendChild(treeNode1);
	}
	if(HR(M1_SET+S_INVO_R)){
		var treeNode2 = CreateNode('应收账单','INVO_R',panel,'class',function(){return new Fos.InvoiceGrid('R');});
		root.appendChild(treeNode2);
	}
	if(HR(M1_SET+S_VOUC_R)){
		var treeNode3 = CreateNode('收款核销','VOUC_R',panel,'class',function(){return new Fos.VoucherGrid('R');});
		root.appendChild(treeNode3);
	}
	
	var tree = new Ext.tree.TreePanel({title:'',rootVisible:true,height:75,frame:false,border:false,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true,root:root
	});
	return tree;
};
//应付结算
var settlePTree=function(panel){
	var root= new Ext.tree.TreeNode({text:'应付结算',leaf:false,expanded:true});
	
	if(HR(M1_SET+S_BILL_P)){
		var treeNode1 = CreateNode('应付对账单','BILL_P',panel,'class',function(){return new Fos.BillGrid('P');});
		root.appendChild(treeNode1);
	}
	if(HR(M1_SET+S_INVO_P)){
		var treeNode2 = CreateNode('应付账单','INVO_P',panel,'class',function(){return new Fos.InvoiceGrid('P');});
		root.appendChild(treeNode2);
	}
	if(HR(M1_SET+S_PR_P)){
		var treeNode3 = CreateNode('付款申请','PR_P',panel,'class',function(){return new Fos.PrGrid('P');});
		root.appendChild(treeNode3);
	}
	if(HR(M1_SET+S_VOUC_P)){
		var treeNode3 = CreateNode('付款核销','VOUC_P',panel,'class',function(){return new Fos.VoucherGrid('P');});
		root.appendChild(treeNode3);
	}
	
	var tree = new Ext.tree.TreePanel({title:'',rootVisible:true,height:92,frame:false,border:false,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true,root:root
	});
	return tree;
}

/*
  * 费用编辑窗口
  * p 委托对象
  * t 费用类型，R：应收  P：应付
  * frm 上级窗口
  */
Fos.ExGrid = function(p,t,frm) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',_mt:'json',consBizType:p.get('consBizType')},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});	
	store.load({params:{expeType:t,consId:p.get('id')},scope:this,
			callback:function(){
				this.reCalculate();
			}
	});
	var txtSumCny = new Ext.form.TextField({width:100,disabled:true});
	var txtSumLoc = new Ext.form.TextField({width:100,disabled:true});
	var txtSumRc  = new Ext.form.TextField({width:100,disabled:true});
	
	this.sumCny=0;
	this.sumLoc=0;
	this.sumRc=0;
	
	this.reCalculate = function(){
		var d=store.getRange();
		this.sumCny=0;
		this.sumLoc=0;
		this.sumRc=0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('currCode')=='CNY')
				this.sumCny+=parseFloat(d[i].get('expeTotalAmount'));
			this.sumLoc+=parseFloat(d[i].get('expeTotalAmount')*d[i].get('expeExRate'));
			this.sumRc+=parseFloat(d[i].get('expeWriteOffAmount'));
		}
		txtSumCny.setValue(HTUtil.round2(this.sumCny));
		txtSumLoc.setValue(HTUtil.round2(this.sumLoc));
		txtSumRc.setValue(HTUtil.round2(this.sumRc));	
		frm.reCalculate();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	//结算单位
	var t1={header:C_SETTLE_OBJECT,width:200,dataIndex:"custName",align:'left',
			editor:new Fos.CustomerLookup({displayField:'custCode',valueField:'custName',triggerAction:'all',
            mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
            custType:t=='R'?'custArFlag':'custApFlag',
            allowBlank:false,emptyText:'',invalidText:'',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getCS(),enableKeyEvents:true,
            listeners:{scope:this,
            	select:function(c,r,i){
					var b =this.getSelectionModel().getSelected();
					b.set('custId',r.get('id'));
					b.set('custName',r.get('custNameCn'));
					b.set('custSName',r.get('custSNameCn'));
				},
           		keydown:{fn:function(f,e){
					LC(f,e,t=='R'?'custArFlag':'custApFlag',1);
					},buffer:500}
			}})};
	
	charBp = {_A:'CHAR_Q',_mt:'json',tmsFlag:1};
	
	var charStore = new Ext.data.Store({url:SERVICE_URL,baseParams:charBp,
				reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCharge',id:'id'},GCharge),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var custNameBelong={header:'单位归属',dataIndex:'custNameFlag',align:'center',renderer:HTStore.custNameBelongRender,
	   		editor:new Ext.form.ComboBox({displayField:'N',valueField:'C',
		   		triggerAction:'all',mode:'local',selectOnFocus:true,allowBlank:false,
		   		store:HTStore.custNameBelong,enableKeyEvents:true,editable:false,
		   		listeners:{scope:this,select:function(c,r,i){
		   				var b=sm.getSelected();
		   				b.set('custNameFlag',r.get('C'));
		   			}
		   		}
		   	})
	    };
	//费用名称
    var t2={header:C_CHAR,width:100,dataIndex:"charName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'charCode',valueField:'charName',triggerAction:'all',
            tpl:charTpl,itemSelector:'div.list-item',listWidth:300,allowBlank:false,
            emptyText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getCHAR_S(),enableKeyEvents:true,editable:false,
            listeners:{scope:this,select:function(c,r,i){
            	var b =sm.getSelected();
            	b.set('charId',r.get('id'));
            	b.set('chclId',r.get('chclId'));
            	b.set('chclCode',r.get('chclCode'));
            	b.set('charNameEn',r.get('charNameEn'));
            	b.set('currCode',r.get('currCode'));
            	b.set('unitId',r.get('unitId'));
            	b.set('expeExRate',HTStore.getExRate(r.get('currCode'),'CNY'));
            	this.reCalculate();}}})};
     /*//付款方式
     var payWay={
     	header:'付款方式',width:100,dataIndex:"charName",align:'center',editor:new Ext.form.TextField({enableKeyEvents:true})
     };*/
    //计量单位
    var t3={header:C_UNIT,width:80,dataIndex:"unitName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'unitCode',valueField:'unitCode',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),editable:false})};
    //计费数量
    var t4={header:C_CHARGE_QUANTITY,width:80,dataIndex:"expeNum",
    		renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(2);
		    	if(v=='NaN'){
		    		v='0.00';
		    	};
		    	m.css='green-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
    //单价
	var t5={header:C_UNIT_PRICE,width:100,dataIndex:"expeUnitPrice",
			renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(2);
		    	if(v=='NaN'){
		    		v='0.00';
		    	};
		    	m.css='green-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
	//币种
	var t6={header:C_CURR,dataIndex:'currCode',width:50,align:'center',
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
            allowBlank:false,emptyText:'',invalidText:'',mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getCURR_S()}),hidden:true};
	//汇率
	var t7={header:C_EX_RATE,width:60,dataIndex:"expeExRate",renderer:rateRender};
	//金额
	var t8={header:C_AMOUNT,width:80,dataIndex:"expeTotalAmount",
				renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(2);
			    	if(v=='NaN'){
			    		v='0.00';
			    	};
			    	m.css='green-b';
			    	return v;
			    }
			};
	
	//P/C(预付/到付)
	var t11={header:C_PPCC,dataIndex:'pateCode',width:40,align:'center',
			editor:new Ext.form.ComboBox({displayField:'pateCode',valueField:'pateCode',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPATE_S(),
            listeners:{scope:this,
				select:function(c,r,i){
					sm.getSelected().set('pateId',r.get('id'));
				}
			}})};
	//账单号
    var t12={header:C_INVO_NO,align:'center',dataIndex:"expeInvoiceNo",width:130};
    //税务发票号
    var t13={header:C_TAX_NO,align:'center',dataIndex:"expeTaxInvoiceNo",width:130};
    //C_INVOICED_AMOUNT
    var t14={header:C_INVOICED_AMOUNT,renderer:rateRender,dataIndex:"expeInvoiceAmount"};
    //已核销金额
    var t15={header:C_WRITEOFFED_AMOUNT,renderer:rateRender,dataIndex:"expeWriteOffAmount",width:120};
    //备注
    var t16={header:C_REMARKS,width:100,dataIndex:"expeRemarks",editor:new Ext.form.TextField({enableKeyEvents:true,
    	listeners:{scope:this,keydown:function(c,e){k = e.getKey();if(k == e.ENTER) this.add();}}})};
    //账单日期
    var t17={header:C_INVO_DATE,width:100,renderer:formatDate,dataIndex:"expeInvoiceDate"};
    //核销日期
    var t18={header:C_WRITEOFF_DATE,renderer:formatDate,dataIndex:"expeWriteOffDate"};
    //创建时间
    var t19={header:C_CREATE_TIME,renderer:formatDateTime,dataIndex:"createTime",width:150};
    //修改时间
    var t20={header:C_MODIFY_TIME,renderer:formatDateTime,dataIndex:"modifyTime",width:150};
    //佣金%
    var t21={header:C_COMMISION_RATE,width:80,dataIndex:"expeCommissionRate",renderer:rateRender,
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true};
    //佣金
	var t22={header:C_COMMISION,width:60,dataIndex:"expeCommission",renderer:numRender,
			editor:new Ext.form.NumberField({decimalPrecision:2,allowBlank:false,emptyText:'',invalidText:''}),hidden:true};
	//创建人
	 var t23={header:C_CREATE_BY,dataIndex:"createBy",width:80};
	 //修改人
	 var t24={header:C_MODIFY_BY,dataIndex:"expeUpdateBy"};
	 //制单人
	 var t25={header:C_BILL_BY,dataIndex:"expeInvoiceBy"};
	 //核销人
	 var t26={header:C_VOUC_BY,dataIndex:"expeWriteOffBy"};
	 
	var cols=[sm,t1,custNameBelong,t2,t3,t4,t5,t6,t21,t22,t8,t16,t12,t13,t14,t15,t17,t18,t23,t19,t24,t20,t25,t26];	
	var cm=new Ext.grid.ColumnModel({columns:cols,defaults:{sortable:false,width:100,align:'right'}});
	cm.defaultSortable=true;cm.defaultWidth=100;			
	
	this.add=function(){
		function custIdFunction(){
			var cnId='';
			if(t=='R'){
				cnId=p.get('custId');					//委托单位
			}else if(t=='P'){
				if(p.get('consBizType')=='T'){
					cnId=p.get('motorcadeId');			//陆运-承运人
				}
			}
			return cnId;
		};
		function custNameFunction(){
			var cn='';
			if(t=='R'){
				cn=p.get('custName');					//委托单位
			}else if(t=='P'){
				if(p.get('consBizType')=='T'){
					cn=p.get('motorcadeName');			//陆运-承运人
				}
			}
			return cn;
		};
		var e = new SExpense({uuid:HTUtil.UUID(32),
			consId:p.get('id'),
			consNo:p.get('consNo'),
			consNoHandler:p.get('consNoHandler'),
			consDate:p.get('consDate'),
			consMblNo:p.get('consMblNo'),
			consHblNo:p.get('consHblNo'),
			vessName:p.get('vessName'),
			voyaName:p.get('voyaName'),
			consSailDate:p.get('consSailDate'),
    		consBizType:p.get('consBizType'),
    		consBizClass:p.get('consBizClass'),
    		consShipType:p.get('consShipType'),
    		consCustId:p.get('custId'),
    		consCustName:p.get('custName'),
    		shliId:p.get('shliId'),    		
    		custId:custIdFunction(),
    		custName:custNameFunction(),
    		custSname:t=='R'?p.get('custSname'):'',
    		expeType:t=='R'?'R':'P',
    		pateCode:'P',
    		unitName:'EACH',
    		currCode:'CNY',
    		expeNum:1,
    		expeExRate:'1.0000',
    		expeDate:new Date(),
    		expeAllocationFlag:0,
    		expeAllocatedFlag:0,
    		expeInvoiceAmount:0,
    		expeWriteOffAmount:0,
    		expeWriteOffRcAmount:0,
    		expeInnerAmount:0,
    		expeRcAmount:0,
    		expeCommission:0,
    		expeCommissionRate:0,
    		expeTotalAmount:0,    		
    		expeStatus:0,
    		expeBillStatus:0,
    		expeInvoiceStatus:0,
    		expeWriteOffStatus:0,
    		version:0,
    		rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,e);
    	sm.selectFirstRow();
    	e.set('rowAction','N');
    	this.startEditing(0, 1);
	};
	//删除
	this.removeExp=function(){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				if(r[i].get('expeInvoiceStatus')>0) 
					Ext.Msg.alert(SYS,M_REMOVE_EXP_INVOICED);
				else{
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
					this.reCalculate();
				}
			}
		}
		else XMG.alert(SYS,M_R_P);
	};
	
	//保存
	this.save=function(){
		var bl=true;
		var a1=store.getRange();
		for(var i=0;i<a1.length;i++){
			if(!a1[i].get('custName')){
				XMG.alert(SYS,'请选择结算单位！');
				bl=false;
				break;
			}else if(!a1[i].get('custNameFlag')){
				XMG.alert(SYS,'请选择单位归属！');
				bl=false;
				break;
			}else if(!a1[i].get('charName')){
				XMG.alert(SYS,'请选择费用名称！');
				bl=false;
				break;
			}else if(!a1[i].get('unitName')){
				XMG.alert(SYS,'请填写计量单位！');
				bl=false;
				break;
			}
		}
		if(bl){
			var a = store.getModifiedRecords();
			if(a.length){
				for(var i=0;i<a.length;i++){
					if(a[i].get('rowAction')!='R'&&a[i].get('rowAction')!='D'){
						if(a[i].get('custId')==''){XMG.alert(SYS,M_SETTLE_OBJECT_REQUIRED);return;}
						else if(a[i].get('charId')==''){XMG.alert(SYS,M_CHAR_REQUIRED);return;}
						else if(a[i].get('expeNum')==''){XMG.alert(SYS,M_QUANTITY_REQUIRED);return;}
						else if(a[i].get('expeUnitPrice')==''){a[i].set('expeUnitPrice','0');}
						else if(a[i].get('currCode')==''){XMG.alert(SYS,M_CURR_PRICE_REQUIRED);return;}
						else if(a[i].get('pateCode')==''){XMG.alert(SYS,M_PPCC_REQUIRED);return;}
					}
				}
				var x = HTUtil.ATX(a,'SExpense',SExpense);
				if(x!=''){
					tb=this.getTopToolbar();
					tb.getComponent('TB_C').setDisabled(true);
					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
						success: function(res){
							var a = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
							HTUtil.RUA(store,a,SExpense);
							Ext.Msg.alert(SYS,M_S);
							tb.getComponent('TB_C').setDisabled(false);
							},
						failure: function(res){
								Ext.Msg.alert(SYS,M_F+res.responseText);
							tb.getComponent('TB_C').setDisabled(false);
						},
						xmlData:HTUtil.HTX(x)
					});
				}
			}else{
				XMG.alert(SYS,M_NC);
			}
		}
	};
	//复制
	this.cp=function(){
		var p = sm.getSelected();
		if(p){
			var e = new SExpense({});
			var f = SExpense.prototype.fields;
			for (var i=0;i<f.keys.length;i++){
			var fn=''+f.keys[i];
			e.set(fn,p.get(fn));}
			e.set('expeDate',new Date());
			e.set('id','');
			e.set('version','1');
			e.set('expeInvoiceNo','');
			e.set('expeInvoiceDate','');
			e.set('expeUnitPrice','');
			e.set('expeNum',1);
			e.set('expeTotalAmount','');
			e.set('expeCommission','');
			e.set('expeCommissionRate','');
			e.set('expeRcAmount',0);
			e.set('expeWriteOffDate','');
			e.set('expeInvoiceAmount',0);
			e.set('expeWriteOffAmount',0);
			e.set('expeWriteOffRcAmount',0);
			e.set('expeStatus',0);e.set('expeBillStatus',0);
			e.set('expeInvoiceStatus',0);
			e.set('expeWriteoffStatus',0);
			e.set('expeAllocationFlag',0);
			e.set('expeAllocatedFlag',0);
			e.set('consIdM','');
			e.set('consNoM','');
			e.set('uuid',HTUtil.UUID(32));
			this.stopEditing();
			store.insert(0,e);
			e.set('rowAction','N');
			this.startEditing(0,1);
			this.reCalculate();
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var locked=false; //p.get('consStatusExp')==1||p.get('consStatusAud')!=0;
	
	//费用确认单
	this.expConfirm=function(){
		EXPC('T_EXPE_CONFIRM','&aggressive=1&consBizType='+p.get('consBizType')+'&expeType='+t+'&id='+p.get('id'));
	};
	//费用结算单
	this.expSettlement = function(){
		EXPC('EXPE_SETTLEMENT','&sort=expeType&aggressive=1&consBizType='+p.get('consBizType')+'&id='+p.get('id'));
	};
	//退单申请
	this.expChargeBack=function(){
	    EXPC('EXPE_CHARGEBACK','&aggressive=1&consBizType='+p.get('consBizType')+'&id='+p.get('id'));
	};
	var expMenu = [{text:C_EXPE_CONFIRM,scope:this,iconCls:'right',handler:this.expConfirm}];
	/*if(t=='R'){
		expMenu[expMenu.length]={text:C_EXPE_SETTLEMENT,scope:this,handler:this.expSettlement};
		expMenu[expMenu.length]={text:M_CHARGEBACK,scope:this,handler:this.expChargeBack};
	}*/
	//新增
	var b1={itemId:'TB_A',text:C_ADD,iconCls:'add',scope:this,disabled:p.get('consStatusExp')==1,handler:this.add};
	//删除
	var b2={itemId:'TB_B',text:C_REMOVE,iconCls:'remove',scope:this,disabled:p.get('consStatusExp')==1,handler:this.removeExp};
	//保存
	var b3={itemId:'TB_C',text:C_SAVE,iconCls:'save',scope:this,disabled:p.get('consStatusExp')==1,handler:this.save};
	//复制
	var b4={itemId:'TB_D',text:C_COPY_FROM,iconCls:'copy',scope:this,disabled:p.get('consStatusExp')==1,handler:this.cp};
    //输出
	var b5={text:C_EXPORT,iconCls:'print',scope:this,menu:{items:expMenu}};
   
    this.updateTB=function(){
		tb=this.getTopToolbar();
		var locked=p.get('consStatusExp')==1||p.get('consStatusAud')!=0;
		if(tb.getComponent('TB_A')) tb.getComponent('TB_A').setDisabled(NR(M1_SET+S_EXPE)||locked);
    	if(tb.getComponent('TB_B')) tb.getComponent('TB_B').setDisabled(NR(M1_SET+S_EXPE)||locked);
    	if(tb.getComponent('TB_C')) tb.getComponent('TB_C').setDisabled(NR(M1_SET+S_EXPE)||locked);
    	if(tb.getComponent('TB_D')) tb.getComponent('TB_D').setDisabled(NR(M1_SET+S_EXPE)||locked);
	};
	
	Fos.ExGrid.superclass.constructor.call(this,{title:t=='R'?'应收费用':'应付费用',
		split:t=='R',collapsible:t=='R',iconCls:'gen',region:t=='R'?'center':'south',
		autoScroll:true,clicksToEdit:1,hight:t=='R'?'':'150',
	    stripeRows:true,store:store,sm:sm,cm:cm,listeners:{scope:this,
			beforeedit:function(e){
				e.cancel = e.record.get('expeStatus')>0||e.record.get('expeInvoiceStatus')>0||e.record.get('expeWriteOffStatus')>0;},
	    	afteredit:function(e){
				var f=e.field;
				var r=e.record;
		    	if(f=='expeNum'){
		    		r.beginEdit();
		    		r.set('expeNum',e.value);
		    		r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeUnitPrice')-r.get('expeCommission')));    		
		    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
		    		r.endEdit();
		    		this.reCalculate();}
		    	if(f=='unitName'){
		    		r.beginEdit();
		            r.set('expeTotalAmount',HTUtil.round2(r.get('expeNum')*r.get('expeUnitPrice')-r.get('expeCommission')));    		
		    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
		    		r.endEdit();
		    		this.reCalculate();}
				else if(f=='expeUnitPrice'){
					r.beginEdit();
					r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeNum')-r.get('expeCommission')));			
					r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();}		
				else if(f=='currCode'){
					r.beginEdit();
					r.set('expeExRate',getExRate(e.value,'CNY'));
					r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();}
				else if(f=='expeCommission'){
					r.beginEdit();
					r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-e.value));
					r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();}
				else if(f=='expeCommissionRate'){
					r.beginEdit();
					r.set('expeCommission',HTUtil.round2(r.get('expeTotalAmount')*e.value/100));
					r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-r.get('expeCommission')));
					r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
					r.endEdit();
					this.reCalculate();}
				}
		},
	    tbar:[b1, '-',b2,'-',b3,'-',b4,'-',b5,'-'],
	    bbar:[{xtype:'tbtext',text:'人民币合计'},txtSumCny,'-',
		      {xtype:'tbtext',text:'本币合计'},txtSumLoc,'-',
		      {xtype:'tbtext',text:'销帐本币合计'},txtSumRc]});
};
Ext.extend(Fos.ExGrid, Ext.grid.EditorGridPanel);

//费用
Fos.ExpenseTab = function(p){
	PCny = new Ext.form.TextField({width:80,disabled:true});			//CNY利润
	PUsd = new Ext.form.TextField({width:80,disabled:true});			//USD利润
	PLoc = new Ext.form.TextField({width:80,disabled:true});			//本币利润
	PRc  = new Ext.form.TextField({width:80,disabled:true});			//销账利润
	
	var pR=new Fos.ExGrid(p,'R',this);
	var pP=new Fos.ExGrid(p,'P',this);
	//重新计算
	this.reCalculate = function(){
		PCny.setValue(HTUtil.round2(pR.sumCny-pP.sumCny));
		PLoc.setValue(HTUtil.round2(pR.sumLoc-pP.sumLoc));
		PRc.setValue(HTUtil.round2(pR.sumRc-pP.sumRc));
	};
		
	this.updateStatus=function(s){
		var action = "TCON_C_U";
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:action,id:p.get('id'),consStatusExp:s},
			success: function(r){
				p.beginEdit();
				p.set('consStatusExp',s);
				p.endEdit();
				this.updateTB();
				XMG.alert(SYS,M_S);
			},
			failure:function(r){
				XMG.alert(SYS,M_F+r.responseText);
				}
		});
	};
	//业务确认 1
	this.check=function(){this.updateStatus('1');};
	//取消确认 0
	this.unCheck=function(){this.updateStatus('0');};
	this.updateTB=function(){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_A')) 
			tb.getComponent('TB_A').setDisabled(NR(M1_SET+S_EXPE+F_S_OK)||p.get('consStatusExp')==1);
    	if(tb.getComponent('TB_B'))
    		tb.getComponent('TB_B').setDisabled(NR(M1_SET+S_EXPE+F_S_CAN)||p.get('consStatusExp')==0);
    	pR.updateTB();
    	pP.updateTB();
	};
	//业务确认
	var tb1={itemId:'TB_A',text:C_EXPE_AUDIT,disabled:NR(M1_SET+S_EXPE+F_S_OK)||p.get('consStatusExp')==1,iconCls:'check',scope:this,handler:this.check};
	//取消业务确认
	var tb2={itemId:'TB_B',text:C_EXPE_UNCHECK,disabled:NR(M1_SET+S_EXPE+F_S_CAN)||p.get('consStatusExp')==0,iconCls:'renew',scope:this,handler:this.unCheck};
	
	var pBiz = new Fos.TmsExpenseBizPanel(p);
	
	/*var sheet=new Ext.form.FormPanel({region:'center',
		items:[pR,pP]
	});
	var bPanel=new Ext.Panel({activeTab:0,layout:'border',
		items:[sheet,pBiz]});*/
	
	Fos.ExpenseTab.superclass.constructor.call(this,{autoScroll:true,layout:'border',
	items:[pBiz,pR,pP],
		tbar:[tb1,'-',tb2,'-',
		      {xtype:'tbtext',text:C_PROFIT_CNY},PCny,'-',
		      //{xtype:'tbtext',text:C_PROFIT_USD},PUsd,'-',
		      {xtype:'tbtext',text:C_PROFIT_LOC},PLoc,'-',
		      {xtype:'tbtext',text:C_PROFIT_RC},PRc]
	});
};
Ext.extend(Fos.ExpenseTab, Ext.Panel);

//费用界面业务信息（陆运）
Fos.TmsExpenseBizPanel = function(p){
	var txtCustName = new Ext.form.TextField({fieldLabel:C_BOOKER,
		name:'custName',value:p.get('custName'),anchor:'95%'});
	
	var txtMotorcadeName = new Ext.form.TextField({fieldLabel:'承运商',
		name:'motorcadeName',value:p.get('motorcadeName'),anchor:'95%'});
	
	var txtStartStation = new Ext.form.TextField({fieldLabel:'始发站',
		name:'startStation',value:p.get('startStation'),anchor:'95%'
	});
	
	var cboStartSite = new Ext.form.ComboBox({fieldLabel:'发运网点',
		name:'startSite',value:p.get('startSite'),anchor:'95%'
	});
	
	var txtEndStation = new Ext.form.TextField({fieldLabel:'目的站',
		name:'endStation',value:p.get('endStation'),anchor:'95%'
	});
		
	var txtRouteStation = new Ext.form.TextField({fieldLabel:'路由站',
		name:'routeStation',value:p.get('routeStation'),anchor:'95%'
	});
	
    var txtShipperName = new Ext.form.TextField({fieldLabel:'发货单位',
    	name:'shipperName',value:p.get('shipperName'),anchor:'95%'
    });
    
	var cboConsigneeName = new Ext.form.TextField({fieldLabel:'收货单位',
		name:'consigneeName',value:p.get('consigneeName'),anchor:'95%'
	});
	
	var dtLoadDate = new Ext.form.DateField({fieldLabel:'提货日期',
  	name:'loadDate',value:p.get('loadDate'),format:DATEF,anchor:'95%'
	});
	
	var dtArNewDate = new Ext.form.DateField({fieldLabel:'到达日期',
  	name:'arNewDate',value:p.get('arNewDate'),format:DATEF,anchor:'95%'});
	
	var dtSignInDate = new Ext.form.DateField({fieldLabel:'签收日期',
  	name:'signInDate',value:p.get('signInDate'),format:DATEF,anchor:'95%'});
	
	var txtSumPackages = new Ext.form.TextField({fieldLabel:'件数合计',
		value:p.get('packages'),anchor:'95%',itemCls:'required'});
	
	var txtSumGrossWeight = new Ext.form.TextField({fieldLabel:'毛重合计',
		value:p.get('grossWeight'),anchor:'95%',itemCls:'required'});
	
	var txtSumMeasurement = new Ext.form.TextField({fieldLabel:'体积合计',
		value:p.get('measurement'),anchor:'95%',itemCls:'required'});
	
	var txtSumCargoValue = new Ext.form.TextField({fieldLabel:'货物价值',
		value:p.get('premiumValue'),anchor:'95%'});
	
	var txtSumPremiumExpense = new Ext.form.TextField({fieldLabel:'保险费',
		value:p.get('premiumExpense'),anchor:'95%'});
	
	var txtSumGrossWeightP = new Ext.form.TextField({fieldLabel:'毛重(承运人)',
		value:p.get('grossWeightProvider'),anchor:'95%'});
	
	var txtSumMeasurementP = new Ext.form.TextField({fieldLabel:'体积(承运人)',
		value:p.get('measurementProvider'),anchor:'95%'});	
	
	var txtSumCargoValueP = new Ext.form.TextField({fieldLabel:'货物价值(承运人)',
		value:p.get('premiumValueProvider'),anchor:'95%'});
	
	var txtSumPremiumExpenseP = new Ext.form.TextField({fieldLabel:'保费(承运人)',
		value:p.get('premiumExpenseProvider'),anchor:'95%'});

  var txtPremiumCompany = new Ext.form.TextField({fieldLabel:'保险公司',
  	name:'premiumCompany',value:p.get('premiumCompany'),anchor:'95%'});

  Fos.TmsExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:130,padding:5,frame:true,
		layout:'column',title:'业务信息',iconCls:'gen',layoutConfig:{columns:4},
		deferredRender:true,collapsible:false,items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:100,labelAlign:'right',
          items:[txtCustName,txtStartStation,txtSumPackages]},
	    {columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
	          items:[txtShipperName,txtEndStation,txtSumGrossWeight]},
	    {columnWidth:.25,layout: 'form',border:false,labelWidth:120,labelAlign:'right',
	          items: [cboConsigneeName,dtSignInDate,txtSumMeasurement
	    ]},
	    {columnWidth:.25,layout: 'form',border:false,labelWidth:120,labelAlign:'right',
		 items:[txtMotorcadeName,dtLoadDate,dtArNewDate
	     ]}
		]}
	);
};
Ext.extend(Fos.TmsExpenseBizPanel, Ext.Panel);

//陆运单票审核
Fos.TConsignAuditGrid = function() {
	var bp={_A:'T_CONS_CHECK_X',_mt:'xml',versionFlag:VERSION-1};
	var store = new Ext.data.GroupingStore({
    	url: SERVICE_URL,baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign'}, TConsign),
    	sortInfo:{field:'consDate', direction:'DESC'},remoteSort:true,groupField:'consDate'
	});
	store.load({params:{start:0,limit:C_PS30}});
	this.reset=function(){											//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30}});
	};
	this.search = function(){
		var win = new Fos.TConsignSearchWin('TCON_SEARCH',store);
		win.show();
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,
		listeners:{scope:this,rowselect:function(s,row,r){this.updateTB(r);}}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:'托运单号',dataIndex:"consNo",width:120},
		{header:'手工单号',dataIndex:'consNoHandler',width:120},
		{header:C_BOOKER,width:200,dataIndex:"custName"},
		{header:C_CSNAME,width:200,dataIndex:"custSname",hidden:true},
		{header:C_CONS_DATE,dataIndex:"consDate",renderer:formatDate},	
		{header:'应收合计',dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:'应付合计',dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:'利润',dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:'利润率(%)',dataIndex:"grossProfitRate",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:'中转回扣',dataIndex:"sumHk",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:'件数',width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:'毛重(KGS)',dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:'体积(CBM)',dataIndex:"measurement",align:'right',css:'font-weight:bold;'},
		{header:'单票运费',dataIndex:"expenseTotal2",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:'物流运费',dataIndex:"motorcadeExpense2",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_CNY,dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;',hidden:true},
		{header:C_AP_CNY,dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;',hidden:true},
		{header:C_AR_CNY_INVOICED,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender,hidden:true},
		{header:C_AR_CNY_WRITEOFFED,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender,hidden:true},		
		{header:C_AP_CNY_INVOICED,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender,hidden:true},
		{header:C_AP_CNY_WRITEOFFED,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender,hidden:true},
		{header:C_REMARKS,dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'T_CONS_U',id:p.get('id'),consStatusAud:s},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateTB(p);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	//显示费用
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.ExpenseTab(p));
			}
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({
		emptyText:'请输入手工单号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();
			}
		}
	});
    //快速查询
	this.fastSearch=function(){
        var consNoHandler=kw.getValue();
        if(!consNoHandler){XMG.alert(SYS,'请输入手工单号！',function(b){kw.focus();});return;};
        var a=[];
        var c=consNoHandler.indexOf(',');
        var b=consNoHandler.indexOf('..');
        if(c>=0){
            a[a.length]=new QParam({key:'consNoHandler',value:consNoHandler,op:IN});
        }
        else if(b>=0){
            var ra=consNoHandler.split('..');
            a[a.length]=new QParam({key:'consNoHandler',value:ra[0],op:GE});
            a[a.length]=new QParam({key:'consNoHandler',value:ra[1],op:LE});
        }
        a[a.length]=new QParam({key:'consNoHandler',value:consNoHandler,op:LI});
        store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
        store.reload({params:{start:0,limit:C_PS30},
        	callback:function(r){
        		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);
        	}
        });
    };
    
	this.updateTB=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_FA)||r.get('consStatusAud')!=0);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_FA)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_FA)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_FA)||r.get('consStatusAud')!=2);
	};
	//费用按钮
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense};
	//财务审核
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_FA),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	//经理审核
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_MA),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	//复杂查询
	var b4={itemId:'TB_4',text:C_COMPLAX_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',				//输出
			handler:function(){EXP('C','CONS_AUDIT','');}
		};
	//取消财务审核
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_FA),scope:this,handler:function(){this.updateStatus('0');}};
	//取消经理审核
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_MA),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch};
	var b9={text:C_RESET,iconCls:'refresh',															//刷新
			handler:this.reset
			};
	//列表分组
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');
			else c=record.get('grossProfitRate');
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
    
	Fos.TConsignAuditGrid.superclass.constructor.call(this, {
	    id:'T_G_COAU',iconCls:'gen',store: store,title:'单票审核',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{
			rowdblclick:function(g,r,e){this.showExpense();}
		},
		view:new Ext.grid.GroupingView(vc),
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',kw,b8,'-',b4,'-',b9,'-'],
		bbar:PTB(store,C_PS30)});
};
Ext.extend(Fos.TConsignAuditGrid, Ext.grid.GridPanel);

/*
 * 对账单列表
 * t 对账单类型，R：应收  P：应付
 */
Fos.BillGrid = function(t) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=BILL_X',
		baseParams:{_mt:'xml',billType:t},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SBill'},SBill),
		remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});	
    store.load({params:{start:0,limit:C_PS30}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_STATUS,dataIndex:"billStatus",renderer:HTStore.getBIST},
		{header:C_BILL_NO,width:120,dataIndex:"billNo"},
		{header:C_BILL_OBJECT,width:200,dataIndex:"custName"},	
		//{header:C_SUM_LOC,align:'right',renderer:numRender,dataIndex:"billAmount"},	
		//{header:C_SUM_USD,align:'right',renderer:numRender,dataIndex:"billAmountUsd"},	
		{header:C_SUM_CNY,align:'right',renderer:numRender,dataIndex:"billAmountCny"},
		{header:C_BILL_DATE,dataIndex:"billDate",renderer:formatDate},
		{header:C_BILL_BY,dataIndex:"billIssuer"},
		{header:C_AUDIT_BY,dataIndex:"billChecker",hidden:true},
		{header:C_REMARKS,dataIndex:"billRemarks"}
		],defaults:{sortable:false,width:100}});
	
	var kw = new Ext.form.TextField({
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) 
					this.fastSearch();
				}
		}
	});
	
    var fastSearch=function(){
        var billNo=kw.getValue();
        if(!billNo){
        	Ext.Msg.alert(SYS,M_INPUT_BILL_NO,function(b){kw.focus();});
        	return;
        };
        var a=[];        
        var c=billNo.indexOf(',');
        var b=billNo.indexOf('..');
        if(c>=0){
            a[a.length]=new QParam({key:'billNo',value:billNo,op:IN});
        }
        else if(b>=0){
            var ra=billNo.split('..');
            a[a.length]=new QParam({key:'billNo',value:ra[0],op:GE});
            a[a.length]=new QParam({key:'billNo',value:ra[1],op:LE});
        }
        else
        	a[a.length]={key:'billNo',value:billNo,op:LI};
        
        store.baseParams={_mt:'xml',billType:t,xml:HTUtil.QATX(a)};
        store.reload({params:{start:0,limit:C_PS30},
        	callback:function(r){
        		if(r.length==0) 
        			Ext.Msg.alert(SYS,M_NOT_FOUND);
        		}
        });
    };
    
    var reset=function(){
    	store.baseParams = {_mt:'xml',billType:t};
    	store.reload({params:{start:0,limit:C_PS30}});
    };
    
    this.showBill = function(p){
		var tab = this.ownerCt.getComponent("T_BILL_" + p.get("id"));
		if(tab){
			this.ownerCt.setActiveTab(tab);
		}
		else {
			tab = this.ownerCt.add(new Fos.BillTab(p));
			this.ownerCt.setActiveTab(tab);
			tab.doLayout();
		}
	};
	
	this.addBill = function(){
		var r = new SBill({billNo:'',uuid:HTUtil.UUID(32),
			billType:t,billDate:new Date(),currCode:'CNY',billStatus:'0',version:'0',rowAction:'N'});
		var tab = this.ownerCt.add(new Fos.BillTab(r));
		this.ownerCt.setActiveTab(tab);
    };
    
    this.editBill = function(){
    	var p=sm.getSelected();
    	if(p){
    		 this.showBill(p);
    	}else{
    		Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
    	}
    };
    
    var removeBill = function(){
    	var a =sm.getSelections();
       	if(a.length>0){
       		Ext.Msg.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var b = false;
               	for(var i=0;i<a.length;i++){
               		if(a[i].get('billStatus')!='0') {
               			b=true;
               			break;
               		}
               	}
               	if(b){
               		Ext.Msg.alert(SYS,M_NO_REMOVE_COMMITED_BILL);
               	}else{
               		var xml = HTUtil.SMTX4R(sm,'SBill','billId');
               		Ext.Ajax.request({url:SERVICE_URL+'_A=BILL_S',method:'POST',
               			success: function(){
               				sm.each(function(p){store.remove(p);});
               				Ext.Msg.alert(SYS,M_S);
               			},
               			failure: function(r,o){
               				Ext.Msg.alert(SYS,M_F+r.responseText);
               			},
               			xmlData:HTUtil.HTX(xml)
               		});
               	}
           }});
		}
       	else Ext.Msg.alert(SYS,M_R_P);
    };
	
	var searchBill = function(){
		var w=new Fos.BillLookupWin(store,t);
		w.show();
	};
	
    var btnFastSearch = {text:C_FAST_SEARCH,iconCls:'search',handler:fastSearch}; 
    var btnReset = {text:C_RESET,iconCls:'refresh',handler:reset};
        
	Fos.BillGrid.superclass.constructor.call(this, {
	    id:'G_BILL_'+t,iconCls:'gen',store: store,
	    title:t=='R'?C_BILL_R_LIST:C_BILL_P_LIST,autoScroll:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{scope:this,
			rowdblclick:function(grid, rowIndex, event){
				var c= grid.getSelectionModel().getSelected();
				if(c){this.showBill(c);}
			}
		},
		tbar:[{text:C_ADD,iconCls:'add',disabled:NR(M1_SET+t=='R'?S_BILL_R:S_BILL_P+F_ADD),scope:this,handler:this.addBill},'-',
			{text:C_EDIT,iconCls:'option',disabled:NR(M1_SET+t=='R'?S_BILL_R:S_BILL_P+F_UP),scope:this,handler:this.editBill},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(M1_SET+t=='R'?S_BILL_R:S_BILL_P+F_R),handler:removeBill},'-',
			{text:C_SEARCH,iconCls:'search',handler:searchBill},'-',
			kw,btnFastSearch,'-',btnReset,'-'],
		bbar:PTB(store,C_PS30)
	});
};
Ext.extend(Fos.BillGrid,Ext.grid.GridPanel);
//对账单-新增-编辑
Fos.BillTab = function(p){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=BIIT_Q',
		baseParams:{_mt:'xml',billId:p.get('id')},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SBillItem'},SBillItem),
		remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});
	if(p.get('rowAction')!='N') 
		store.load();
    
	this.recalculate=function(){
    	var sum=0;
    	var cny=0;
    	var usd=0;
		var d=store.getRange();
		for(var i=0;i<d.length;i++){
			if(d[i].get('currCode')=='CNY'){
				cny=cny+parseFloat(d[i].get('expeTotalAmount'));
			}else if(d[i].get('currCode')=='USD'){
				usd=usd+parseFloat(d[i].get('expeTotalAmount'));
			}
			sum=sum+parseFloat(d[i].get('expeTotalAmount')*d[i].get('expeExRate'));
		};
		txtBillAmount.setValue(sum);
		//txtBillAmountUsd.setValue(usd);
		txtBillAmountCny.setValue(cny);
    };
    //对账单-费用明细
    var addExp=function(){
    	var custId = p.get('custId');
    	if(custId){
    		var win = new Fos.ExSearchWin(custId,p.get('billType'));
			win.addButton({text:C_OK,scope:this,iconCls:'ok',handler:function(){
				var g = win.grid;
				var r = g.getSelectionModel().getSelections();
				if(r.length>0){
					var rn = store.getCount();
					for(var i=0;i<r.length;i++){
						if(rn==0 || store.findBy(function(rec,id){return rec.get('expeId')==r[i].get('id');})==-1){	
							var it = new SBillItem({
							billId:p.get('id'),expeId:r[i].get('id'),
							custId:r[i].get('custId'),custName:r[i].get('custName'),
							custSname:r[i].get('custSname'),
							charId:r[i].get('charId'),charName:r[i].get('charName'),
							unitId:r[i].get('unitId'),unitName:r[i].get('unitName'),
							currCode:r[i].get('currCode'),expeType:r[i].get('expeType'),
							expePaymentType:r[i].get('pateId'),
							expeDate:r[i].get('expeDate'),expeUnitPrice:r[i].get('expeUnitPrice'),
							expeCommission:r[i].get('expeCommission'),expeCommissionRate:r[i].get('expeCommissionRate'),
							expeNum:r[i].get('expeNum'),expeTotalAmount:r[i].get('expeTotalAmount'),
							expeExRate:r[i].get('expeExRate'),expeStatus:r[i].get('expeExStatus'),
							expeRemarks:r[i].get('expeRemarks'),expeForwardFlag:r[i].get('expeForwardFlag'),
							consNo:r[i].get('consNo'),consNoHandler:r[i].get('consNoHandler'),
							consVessel:r[i].get('consVessel'),consVoyage:r[i].get('consVoyage'),
							consMblNo:r[i].get('consMblNo'),consHblNo:r[i].get('consHblNo'),version:'0',rowAction:'N'});
							store.insert(0,it);
						}
					};
					this.recalculate();
					win.close();
				}else{
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
				}
			}},this);
			win.addButton({text:C_CANCEL,iconCls:'cancel',
				handler:function(){
					win.close();
				}},this);
			win.show();
		}
		else{
			Ext.Msg.alert(SYS,M_SEL_BILL_OBJ);
			cboSettleObject.focus();
		}
    };
    
    var removeExp = function(){
    	var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				store.remove(r[i]);
			}
			this.recalculate();
		}
		else 
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
    };
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_SETTLE_OBJECT,dataIndex:'custName',width:150},
		{header:C_CHAR,dataIndex:'charName'},
		{header:C_UNIT,hidden:true,width:80,dataIndex:'unitName'},	
		{header:C_UNIT_PRICE,width:80,align:'right',renderer:numRender,dataIndex:'expeUnitPrice'},
		{header:C_QUANTITY,width:80,align:'right',dataIndex:'expeNum'},
		{header:C_AMOUNT,width:80,align:'right',renderer:numRender,dataIndex:'expeTotalAmount'},
		//{header:C_CURR,width:80,dataIndex:'currCode'},
		//{header:C_EX_RATE,width:80,dataIndex:'expeExRate'},
		{header:C_CONS_NO,width:120,dataIndex:"consNo"},
		{header:'手工单号',width:120,dataIndex:"consNoHandler",renderer:consRender},
		{header:C_REMARKS,width:120,dataIndex:'expeRemarks'}
		],defaults:{sortable:false}});
	cm.defaultSortable = true;
	cm.defaultWidth=120;
    
	var btnAddExp = new Ext.Button({text:C_ADD,iconCls:'add',
		disabled:p.get('billStatus')!='0',scope:this,handler:addExp
	});
	
	var btnRemoveExp = new Ext.Button({text:C_REMOVE,iconCls:'remove',
		disabled:p.get('billStatus')!='0',scope:this,handler:removeExp});
	//对账单-费用明细
	this.grid = new Ext.grid.EditorGridPanel({title:C_EXPE_LINE,autoScroll:true,clicksToEdit:1,
		store:store,sm:sm,cm:cm,height:500,region:'center',layout:'fit',
    	tbar:[btnAddExp, '-', btnRemoveExp,'-']
    });
    
    var saveBill = function(){
		if(!HTUtil.checkFieldNotNull(C_BILL_OBJECT,cboSettleObject))
			return;
		
		HTUtil.saveToRecord(this,p);
		
   	 	var xml = HTUtil.RTX(p,'SBill',SBill);
   	 	var a = this.grid.getStore().getModifiedRecords();
		if(a.length>0){
			var x = HTUtil.ATX(a,'SBillItem',SBillItem);
			xml=xml+x;
		}
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'BILL_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'SBill',SBill);
				var rowAction = p.get('rowAction');
				var f = SBill.prototype.fields;
				if(c){
					p.beginEdit();
	   				for (var i = 0; i < f.keys.length; i++) {
	   					var fn = ''+f.keys[i];
	   					p.set(fn,c.get(fn));
	   				}
					if(rowAction == 'N'){						
						this.setTitle((p.get('billType')=='R'?C_BILL_R:C_BILL_P)+'-'+p.get("billNo"));						
						txtBillNo.setValue(p.get('billNo'));
						p.set('rowAction','M');
					}
					p.endEdit();
				}
				var sa = this.grid.getStore();
				var a = HTUtil.XTRA(res.responseXML,'SBill',SBill);
				HTUtil.RUA(sa,a,SBill);
				Ext.Msg.alert(SYS,M_S);
			},
			failure: function(res){
				Ext.Msg.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    };
    var removeBill = function(){
    	p.set('rowAction','R');
		var xml = HTUtil.RTX(p,'SBill',SBill); 
   	 	var a = this.grid.getStore().getRange();
		if(a.length){
			for(var i=0;i<a.length;i++){
				a[i].set('rowAction','R');
			}
			var x = HTUtil.ATX(a,'SBillItem',SBillItem);
			xml=xml+x;
		}
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BILL_S'},
			success: function(r){
				Ext.Msg.alert(SYS,M_S,function(){T_MAIN.remove('T_BILL_' + p.get('id'));});
			},
			failure: function(r){
				Ext.Msg.alert(SYS,M_F+r.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    };
        
    this.genInvoice=function(){
    	var a = store.getRange();
    	if(a.length>0){
    		var currCode=a[0].get('currCode');
    		for(var i=0;i<a.lenth;i++){
    			if(a[i].get('currCode')!=currCode){
    				currCode = a[i].get('currCode');
    				break;
    			}
    		}
    		if(currCode != a[0].get('currCode')){
    			var w=new Fos.CurrencyWin();
        		w.addButton({text:C_OK,scope:this,handler:function(){
        			currCode = w.findById('currCode').getValue();
        			w.close();
        			var e = new SInvoice({
        				custId:p.get('custId'),custName:p.get('custName'),
        				custSname:p.get('custSname'),invoTitle:p.get('custName'),
        				currCode:currCode,invoType:p.get('billType'),
        				invoDate:new Date(),
        				invoExRate:HTStore.getExRate(currCode,'CNY'),invoWriteOffStatus:'0',
        				invoPrFlag:'0',invoUploadFlag:'0',invoStatus:'0',version:'0',rowAction:'N'});
        			        			
        			var tab = this.ownerCt.add(new Fos.InvoiceTab(e));
        			this.ownerCt.setActiveTab(tab);
        			
        		}},this);
        		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
        		w.show();
    		}
    		else{
    			var e = new SInvoice({
    				custId:p.get('custId'),custName:p.get('custName'),
    				custSname:p.get('custSname'),invoTitle:p.get('custName'),
    				currCode:currCode,invoType:p.get('billType'),
    				invoDate:new Date(),invoExRate:HTStore.getExRate(currCode,'CNY'),
    				invoWriteOffStatus:'0',
    				invoPrFlag:'0',invoUploadFlag:'0',invoStatus:'0',version:'0',rowAction:'N'});
    			var tab = this.ownerCt.add(new Fos.InvoiceTab(e));
    			this.ownerCt.setActiveTab(tab);
    		}
    	}
    };
    
    //结算单位
	var cboSettleObject = new Fos.CustomerLookup({fieldLabel:HL(C_BILL_OBJECT),tabIndex:1,
		name:'custName',value:p.get('custName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		allowBlank:false,xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		listeners:{scope:this,
			select:function(c,r,i){
				p.beginEdit();
				p.set('custId',r.get('id'));
				p.set('custSname',r.get('custCode'));
				p.set('custName',r.get('custNameCn'));
				p.endEdit();
			},
			keydown:{fn:function(f,e){
				LC(f,e,p.get('billType')=='R'?'custArFlag':'custApFlag');
			},buffer:BF}
		}
	});
    
	//制单日期
	var dtBillDate = new Ext.form.DateField({fieldLabel:HL(C_BILL_DATE),tabIndex:3,
		name:'billDate',value:p.get('billDate'),format:DATEF,anchor:'95%'});
    
	//对账单号
	var txtBillNo = new Ext.form.TextField({fieldLabel:C_BILL_NO,tabIndex:4,name:'billNo',disabled:true,
    	value:p.get('billNo'),anchor:'95%'});
	
	//备注
	var txtBillRemarks = new Ext.form.TextField({fieldLabel:C_REMARKS,tabIndex:23,name:'billRemarks',
    	value:p.get('billRemarks'),anchor:'95%'});
			
	//美元合计
	var txtBillAmountUsd = new Ext.form.TextField({fieldLabel:C_SUM_USD,tabIndex:11,name:'billAmountUsd',
    	value:p.get('billAmountUsd'),disabled:true,anchor:'95%'});
			
	//本位币合计
	var txtBillAmount = new Ext.form.TextField({fieldLabel:C_SUM_LOC,tabIndex:11,name:'billAmount',
    	value:p.get('billAmount'),disabled:true,anchor:'95%'});
	
	//人民币合计
	var txtBillAmountCny = new Ext.form.TextField({fieldLabel:C_SUM_CNY,tabIndex:11,name:'billAmountCny',
    	value:p.get('billAmountCny'),disabled:true,anchor:'95%'});
			
    var title = (p.get('billType')=='R'?C_BILL_R:C_BILL_P);
    if(p.get('rowAction')=='N'){
    	title = C_ADD + title;
    }else{
    	title = C_EDIT + title;
    }
    
    this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'BILL_U',billId:p.get('id'),billStatus:s},
			success: function(r){
				p.set('billStatus',s);
				this.updateToolBar(s);
				Ext.Msg.alert(SYS,M_S);},
			failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}
		});
	};
	
	this.updateToolBar = function(s){		
		btnAddExp.setDisabled(p.get('billStatus')!='0');
		btnRemoveExp.setDisabled(p.get('billStatus')!='0');
		
		btnSave.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_M)||s!='0');
		btnRemove.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_R)||s!='0');
		btnCheck.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_BILL)||s!='0');
		btnUnCheck.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_BILL)||s!='1');
		btnInvalid.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_I)||s!='1');
		btnGenInvoice.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_INVO_R:S_INVO_P)+F_I)||s!='1');
		btnExport.setDisabled(NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_M));
		btnStatus.setText(C_STATUS_C+HTStore.getBIST(p.get('billStatus')));
    };
    this.check=function(){this.updateStatus('1');};
    this.renew=function(){this.updateStatus('0');};
    this.cancel=function(){this.updateStatus('2');};
    this.expBillExcel=function(){EXPC('BILL','&aggressive=1&billId='+p.get('id'));};
    this.expBillExEmail=function(){EXPM('','','','','BILL','&aggressive=1&billId='+p.get('billId'));};
    
    var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_M)||p.get('billStatus')!='0',
    	scope:this,handler:saveBill});
    var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_R)||p.get('billStatus')!='0',
    	scope:this,handler:removeBill});
    var btnCheck = new Ext.Button({text:C_BILL_CHECK,iconCls:'check',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_BILL)||p.get('billStatus')!='0',
    	scope:this,handler:this.check});
    var btnUnCheck = new Ext.Button({text:C_BILL_CHECK_CANCEL,iconCls:'renew',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_BILL)||p.get('billStatus')!='1',
    	scope:this,handler:this.renew});
    var btnInvalid = new Ext.Button({text:C_INVALID+'(F)',iconCls:'cancel',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_I)||p.get('billStatus')!='1',
    	scope:this,handler:this.cancel});
    var btnGenInvoice = new Ext.Button({text:C_GEN_INVOICE,iconCls:'save',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('billStatus')!='1',
    	scope:this,handler:this.genInvoice});
    var btnExport = new Ext.Button({text:C_EXPORT,iconCls:'print',
    	disabled:NR(M1_SET+(p.get('billType')=='R'?S_BILL_R:S_BILL_P)+F_M),
    	scope:this,
    	menu:{
    		items:[{text:C_BILL,menu:{
    			items:[{text:'Excel',scope:this,handler:this.expBillExcel}	   //对账单输出
    	               //{text:C_EMAIL,scope:this,handler:this.expBillExEmail} //对账单电子邮件
	   		          ]
    		    }
    		}
	   	]}
    });
    var btnStatus = new Ext.Button({disabled:true,text:C_STATUS_C+HTStore.getBIST(p.get('billStatus'))});
    
	Fos.BillTab.superclass.constructor.call(this, {
		id:'T_BILL_'+p.get('billType')+ p.get('id'),title:title,layout:'border',iconCls:'gen',
		autoScroll:true,labelAlign:'right',closable:true,labelWidth:90,border:false,frame:false,
		items: [{region:'north',height:65,layout:'column',layoutConfig:{columns:4},padding:5,
	    	items:[
	    	    {columnWidth:.25,layout:'form',border:false,items:[cboSettleObject,dtBillDate]},
	        	{columnWidth:.25,layout:'form',border:false,items: [txtBillNo,txtBillRemarks]},
	            {columnWidth:.25,layout:'form',border:false,items:[txtBillAmount]},
	            {columnWidth:.25,layout: 'form',border:false,items: [txtBillAmountCny]}
	            ]
	       	},
	       	this.grid
		],
		tbar:[btnSave,'-',btnRemove,'-',btnCheck,'-',btnUnCheck,'-',btnInvalid,'-',btnGenInvoice,'-',
		      btnExport,'->','-',btnStatus,'-'],
		bbar:[{xtype:'tbtext',text:C_CREATE_BY_C+p.get('createBy')},'-',
			{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
			{xtype:'tbtext',text:C_MODIFY_BY_C+p.get('modifyBy')},'-',
			{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))},'-',
			{xtype:'tbtext',text:C_AUDIT_BY_C+p.get('invoChecker')},'-',
			{xtype:'tbtext',text:C_AUDIT_TIME_C+formatDate(p.get('invoCheckDate'))},'-'
		]
	});
};
Ext.extend(Fos.BillTab, Ext.FormPanel);

/*
 * 应收账单列表
 * t 账单类型，R：应收  P：应付
 */
Fos.InvoiceGrid = function(t) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=INVO_X',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoice',id:'id'},SInvoice),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var a=[];
	a[0]={key:'invoType',value:t,op:EQ};
	a[1]={key:'invoStatus',value:2,op:NE};
	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
    store.load({params:{start:0,limit:C_PS30}});
   
    this.showInvoice= function(p){
    	var tab = this.ownerCt.getComponent("T_INVO_" + p.get("id"));
    	if(tab){
    		this.ownerCt.setActiveTab(tab);
    	}else{
    		tab = this.ownerCt.add(new Fos.InvoiceTab(p));
    		this.ownerCt.setActiveTab(tab);
    		tab.doLayout();
    	}
    };
    
    this.reset=function(){
    	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
    	store.reload({params:{start:0,limit:C_PS30}});};
    //发票查询
	this.search = function(){
    	var win = new Fos.InvoLookupWin(t);
		win.addButton({text:C_OK,handler:function(){
        	var tab = Fos.InvoLookupWin.superclass.findById.call(win,'T_INVO_LOOK');
        	var at = tab.getActiveTab();
        	var a=[];var op=EQ;
        	a[0]={key:'invoType',value:t,op:EQ};
        	if(at.getId()=='T_INVO_LOOK_1'){
        		a[a.length]={key:'invoStatus',value:2,op:NE};
        		var invoNo=at.find('name','invoNo')[0].getValue();
        		var invoNoM=at.find('name','invoNoM')[0].getValue();        		
        		var c=invoNo.indexOf(',');
        		var b=invoNo.indexOf('..');
        		if(c>=0){
        			a[1]={key:'invoNo',value:invoNo,op:IN};
        		}
        		else if(b>=0){
        			var ra=invoNo.split('..');
        			a[1]={key:'invoNo',value:ra[0],op:GE};
        			a[2]={key:'invoNo',value:ra[1],op:LE};
        		}
        		else if(invoNoM){a[1]={key:'invoNo',value:invoNo,op:LI};}
        	}
        	else if(at.getId()=='T_INVO_LOOK_2'){
        		a[a.length]={key:'invoStatus',value:2,op:NE};
        		var invoTaxNo=at.find('name','invoTaxNo')[0].getValue();
        		var invoTaxNoM=at.find('name','invoTaxNoM')[0].getValue();
        		var c=invoTaxNo.indexOf(',');
        		var b=invoTaxNo.indexOf('..');
        		if(c>=0){a[1]={key:'invoTaxNo',value:invoTaxNo,op:IN};}
        		else if(b>=0){
        			var ra=invoTaxNo.split('..');
        			a[1]={key:'invoTaxNo',value:ra[0],op:GE};
        			a[2]={key:'invoTaxNo',value:ra[1],op:LE};
        		}
        		else if(invoTaxNoM){a[1]={key:'invoTaxNo',value:invoTaxNo,op:LI};}
        	}
        	else if(at.getId()=='T_INVO_LOOK_3'){
        		var custId=at.find('name','custName')[0].getValue();
        		if(custId) a[a.length]={key:'custName',value:custId,op:EQ};
        		var currCode=at.find('name','currCode')[0].getValue();        		
        		if(currCode) a[a.length]={key:'currCode',value:currCode,op:EQ};
        		var invoStatus=at.find('name','invoStatus')[0].getValue();        		
        		if(invoStatus) a[a.length]={key:'invoStatus',value:invoStatus,op:EQ};
        		else a[a.length]={key:'invoStatus',value:2,op:NE};
        		var invoWriteOffStatus=at.find('name','invoWriteOffStatus')[0].getValue();        
        		if(invoWriteOffStatus) a[a.length]={key:'invoWriteOffStatus',value:invoWriteOffStatus,op:EQ};
        		var consNo=at.find('name','consNo')[0].getValue();        		
        		if(consNo) a[a.length]={key:'consNo',value:consNo,op:EQ};
        		var consMblNo=at.find('name','consMblNo')[0].getValue();        		
        		if(consMblNo) a[a.length]={key:'consMblNo',value:consMblNo,op:EQ};
        		var vessName=at.find('name','vessName')[0].getValue();        		
        		if(vessName) a[a.length]={key:'vessName',value:vessName,op:EQ};
        		var voyaName=at.find('name','voyaName')[0].getValue();        		
        		if(voyaName) a[a.length]={key:'voyaName',value:voyaName,op:EQ};        		
        		var invoDate=at.find('name','invoDate')[0].getValue();
        		var invoDate2=at.find('name','invoDate2')[0].getValue();
        		if(invoDate && invoDate2){
        			a[a.length]={key:'invoDate',value:invoDate.format('Y-m-d H:i:s'),op:GE};
        			a[a.length]={key:'invoDate',value:invoDate2.format('Y-m-d H:i:s'),op:LE};
        		}
        		else if(invoDate) a[a.length]={key:'invoDate',value:invoDate,op:EQ};
        		var invoDueDate=at.find('name','invoDueDate')[0].getValue();
        		var invoDueDate2=at.find('name','invoDueDate2')[0].getValue();
        		if(invoDueDate && invoDueDate2){
        			a[a.length]={key:'invoDueDate',value:invoDueDate.format('Y-m-d H:i:s'),op:GE};
        			a[a.length]={key:'invoDueDate',value:invoDueDate2.format('Y-m-d H:i:s'),op:LE};
        		}
        		else if(invoDueDate) a[a.length]={key:'invoDueDate',value:invoDueDate,op:EQ};
        		var consSailDate=at.find('name','consSailDate')[0].getValue();
        		var consSailDate2=at.find('name','consSailDate2')[0].getValue();
        		if(consSailDate && consSailDate2){
        			a[a.length]={key:'consSailDate',value:consSailDate.format('Y-m-d H:i:s'),op:GE};
        			a[a.length]={key:'consSailDate',value:consSailDate2.format('Y-m-d H:i:s'),op:LE};
        		}
        		else if(consSailDate) a[a.length]={key:'consSailDate',value:consSailDate,op:EQ};
        		var invoAmount=at.find('name','invoAmount')[0].getValue();
        		var invoAmount2=at.find('name','invoAmount2')[0].getValue();
        		if(invoAmount && invoAmount2){
        			a[a.length]={key:'invoAmount',value:invoAmount,op:GE};
        			a[a.length]={key:'invoAmount',value:invoAmount2,op:LE};
        		}
        		else if(invoAmount) a[a.length]={key:'invoAmount',value:invoAmount,op:EQ};
        	}
        	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
     		store.reload({params:{start:0,limit:C_PS30},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});win.close();
		}},this);
		win.addButton({text:C_CANCEL,handler : function(){win.close();}},this);
		win.show();
    };
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"invoStatus",renderer:HTStore.getIVST},					//审核状态
		{header:C_WRITEOFF_STATUS,width:80,dataIndex:"invoWriteOffStatus",renderer:HTStore.getWRST},		//核销状态
		{header:C_INVO_NO,width:120,dataIndex:"invoNo"},													//账单号
		{header:C_TAX_NO,width:120,dataIndex:"invoTaxNo"},													//税务发票号
		{header:C_SETTLE_OBJECT,width:150,dataIndex:"custName"},											//结算单位
		{header:C_INVO_DATE,dataIndex:"invoDate",renderer:formatDate},										//账单日期
		{header:C_INVO_AMOUNT,align:'right',renderer:numRender,dataIndex:"invoAmount"},						//账单金额
		//{header:C_DUE_DATE,dataIndex:"invoDueDate",renderer:formatDate},									//付费期限
		//{header:C_SEWA,dataIndex:"invoPaymentType",renderer:HTStore.getSEWA},								//结算方式
		{header:C_WRITEOFFED_AMOUNT,align:'right',renderer:numRender,dataIndex:"invoAmountWriteOff",width:120},	//已核销金额
		{header:C_BANK,width:120,dataIndex:"invoBank"},														//银行
		{header:C_BANK_ACCOUNT,width:180,dataIndex:"invoAccount"},											//银行帐号
		{header:'业务性质',dataIndex:"invoBizClass",renderer:HTStore.getBC,hidden:true},						//业务性质
		{header:'业务类型',dataIndex:"consBizType",renderer:HTStore.getBT,hidden:true},						//业务类型
		/*{header:C_CONS_NO,dataIndex:"invoConsNo"},														//业务号
		{header:C_BL_NO,dataIndex:"invoBlNo"},																//提单号
		{header:C_BILL_BY,dataIndex:"invoIssuer",renderer:HTStore.getUSER},									//制单人
		{header:C_AUDIT_BY,dataIndex:"invoChecker",renderer:HTStore.getUSER},								//审核人
		{header:C_SIGNER,dataIndex:"invoSigner",renderer:HTStore.getUSER},									//签收人
		{header:C_SIGN_DATE,dataIndex:"invoSignDate",renderer:formatDate},									//签收日期*/
		{header:C_REMARKS,dataIndex:"invoRemarks"}															//备注
		],defaults:{sortable:false,width:100}});
	//新增应收应付账单
	this.add=function(){
    	var currCode='CNY';
    	/*var w=new Fos.CurrencyWin();													//选择币种
		w.addButton({text:C_OK,scope:this,handler:function(){
			currCode = w.findById('currCode').getValue();
			w.close();
			var id = getNextId();
			var e = new SInvoice({invoNo:'N'+id,currCode:currCode,
				invoType:t,invoDate:new Date(),invoExRate:HTStore.getExRate(currCode,'CNY'),
				invoWriteOffStatus:'0',
				invoPrFlag:'0',invoUploadFlag:'0',invoStatus:'0',invoDueDate:'',
				version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			var tab = this.ownerCt.add(new Fos.InvoiceTab(e,store));					//新增账单
			this.ownerCt.setActiveTab(tab);												//账单面板在原Panel显示
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();*/
    	var id = getNextId();
		var e = new SInvoice({invoNo:'N'+id,currCode:currCode,
			invoType:t,invoDate:new Date(),
			invoExRate:HTStore.getExRate(currCode,'CNY'),
			invoWriteOffStatus:'0',
			invoPrFlag:'0',invoUploadFlag:'0',
			invoStatus:'0',invoDueDate:'',
			consBizType:BT_T,
			invoDebitnoteFlag:'0',
			version:'0',rowAction:'N',
			uuid:HTUtil.UUID(32)});
		var tab = this.ownerCt.add(new Fos.InvoiceTab(e,store));					//新增账单
		this.ownerCt.setActiveTab(tab);												//账单面板在原Panel显示
    };
    
	this.edit=function(){
		var p=sm.getSelected();
		if(p){
			this.showInvoice(p);
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	
    this.removeInvo=function(){
    	var a =sm.getSelections();
       	if(a.length>0){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var b = false;
               	for(var i=0;i<a.length;i++){if(a[i].get('invoStatus')!='0') b=true;}
               	if(b)
               		XMG.alert(SYS,M_INVO_CONFIRMED);
               	else {
               		var xml = HTUtil.SMTX4R(sm,'SInvoice');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'INVO_S'},
					success: function(){
               			sm.each(function(p){store.remove(p);});
               			XMG.alert(SYS,M_S);
               		},
					failure: function(r,o){
               			XMG.alert(SYS,M_F+r.responseText);
               		},
					xmlData:HTUtil.HTX(xml)});
               	}
           }});
		}
       	else XMG.alert(SYS,M_R_P);
    };
    
	var kw = new Ext.form.TextField({
		emptyText:'请输入税务发票号...',
		listeners:{scope:this,
			specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();
			}
		}
	});
    this.fastSearch=function(){
        var invoTaxNo=kw.getValue();
        if(!invoTaxNo){XMG.alert(SYS,M_INPUT_TAX_NO,function(b){kw.focus();});return;};
        var a=[];        
        var c=invoTaxNo.indexOf(',');
        var b=invoTaxNo.indexOf('..');
        if(c>=0){
            a[a.length]={key:'invoTaxNo',value:invoTaxNo,op:IN};
        }
        else if(b>=0){
            var ra=invoTaxNo.split('..');
            a[a.length]={key:'invoTaxNo',value:ra[0],op:GE};
            a[a.length]={key:'invoTaxNo',value:ra[1],op:LE};
        }
        a[a.length]={key:'invoTaxNo',value:invoTaxNo,op:LI};
        a[a.length]={key:'invoType',value:t,op:EQ};
        a[a.length]={key:'invoStatus',value:2,op:NE};
        store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
        store.reload({params:{start:0,limit:C_PS30},callback:function(r){
        	if(r.length==0) 
        		XMG.alert(SYS,M_NOT_FOUND);
        	}
        });
    };
    var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch}; 
    var b9={text:C_RESET,iconCls:'refresh',handler:this.reset};
    
	Fos.InvoiceGrid.superclass.constructor.call(this, {
	    id:'G_INVO_'+t,iconCls:'gen',store: store,
	    title:t=='R'?'应收账单':'应付账单',header:false,autoScroll:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick:
			function(grid, rowIndex, event){
				var c= grid.getSelectionModel().getSelected();
				if(c){
					this.showInvoice(c);
				}
			}
		},
		tbar:[{text:C_ADD,disabled:NR(M1_SET+(t=='R'?S_INVO_R:S_INVO_P)+F_ADD),iconCls:'add',scope:this,handler:this.add},'-',
			{text:C_EDIT,disabled:NR(M1_SET+(t=='R'?S_INVO_R:S_INVO_P)+F_UP),iconCls:'option',scope:this,handler:this.edit},'-',
			{text:C_REMOVE,disabled:NR(M1_SET+(t=='R'?S_INVO_R:S_INVO_P)+F_R),iconCls:'remove',handler:this.removeInvo},'-',
			{text:C_COMPLAX_SEARCH,iconCls:'search',handler:this.search},'-',
			/*{text:C_EXPORT,disabled:NR(M1_SET+(t=='R'?S_INVO_R:S_INVO_P)+F_M),iconCls:'print',					//输出
				handler:function(){
					EXP('C','INVO_LIST','&mt=JSON&xml='+Ext.util.JSON.encode(store.baseParams.xml));
				}
			},'-',*/
	        kw,b8,'-',b9,'-'],
		bbar:PTB(store,C_PS30)}
	);
};
Ext.extend(Fos.InvoiceGrid, Ext.grid.GridPanel);

//发票-根据结算单位选择费用
Fos.ExpenseLookupWin = function(c,t) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_INV_Q',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SExpense'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{custId:c,expeType:t,pateCode:'P',expeAllocatedFlag:0}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	    {header:C_COM_BTYPE,width:80,dataIndex:'consBizType',renderer:getBizType,hidden:true},
	    {header:C_CONS_NO,width:130,dataIndex:"consNo",width:130},
	    {header:'手工单号',dataIndex:'consNoHandler',width:130},
		{header:C_SETTLE_OBJECT,width:150,dataIndex:"custName"},
		{header:C_CHAR,width:80,dataIndex:"charName"},
		{header:C_UNIT,width:80,dataIndex:"unitName"},
		{header:C_QUANTITY,width:60,renderer:rateRender,dataIndex:"expeNum"},
		{header:C_UNIT_PRICE,width:100,renderer:rateRender,dataIndex:"expeUnitPrice"},		
		{header:C_CURR,dataIndex:'currCode',width:60},
		{header:C_EX_RATE,width:80,renderer:rateRender,dataIndex:"expeExRate"},
		{header:C_TOTAL_AMOUNT,width:80,renderer:numRender,dataIndex:"expeTotalAmount"},
		{header:C_INVOICED_AMOUNT,width:100,renderer:numRender,dataIndex:"expeInvoiceAmount"},
		{header:C_WRITEOFFED_AMOUNT,width:120,renderer:numRender,dataIndex:"expeWriteOffAmount"},
		{header:C_INVO_NO,width:100,dataIndex:"expeInvoiceNo"},
		/*{header:C_MBL_NO,width:80,dataIndex:"consMblNo"},
		{header:C_HBL_NO,width:80,dataIndex:"consHblNo"},
		{header:C_VESS,width:80,dataIndex:"consVessel"},
		{header:C_VOYA,width:80,dataIndex:"consVoyage"},*/
		{header:C_REMARKS,width:100,dataIndex:"expeRemarks"}
		],defaults:{sortable:false,width:100}});
	var filters = new Ext.grid.GridFilters({
		  filters:[{type: 'string',  dataIndex: 'consNo'},
		    {type: 'string',  dataIndex: 'charName'},
		    {type: 'string',  dataIndex: 'currCode'},
		    {type: 'numeric', dataIndex: 'expeTotalAmount'}]});
    var g = new Ext.grid.GridPanel({
    	id:'G_EXPE_LOOKUP',header:false,height:400,width:800,store:store,sm:sm,cm:cm,plugins:filters,loadMask:true});	
    Fos.ExpenseLookupWin.superclass.constructor.call(this,{
    	title:C_ADD_EXPE,modal:true,layout:'fit',width:800,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'center',items:[{layout:'fit',border:false,
        items:[g]}]
    });
};
Ext.extend(Fos.ExpenseLookupWin,Ext.Window);

//发票-费用明细
Fos.InvoItemGrid = function(p,frm){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'INIT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoiceItem',id:'id'},SInvoiceItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	if(p.get('rowAction')!='N') store.load({params:{invoId:p.get('id')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	    {header:C_COM_BTYPE,width:80,dataIndex:'consBizType',renderer:getBizType,hidden:true},
	    {header:C_CONS_NO,width:150,dataIndex:"consNo"},
	    {header:'手工单号',dataIndex:'consNoHandler',width:150},
		{header:C_CHAR,width:80,dataIndex:'charName'},
		{header:C_UNIT,hidden:true,dataIndex:'unitName'},
		{header:C_UNIT_PRICE,align:'right',renderer:rateRender,dataIndex:'expeUnitPrice',width:100},
		{header:C_QUANTITY,renderer:rateRender,dataIndex:'expeNum',width:80},
		{header:C_CURR_BASE,dataIndex:'expeCurrCode',width:80},
		{header:C_ORI_AMOUNT,align:'right',renderer:numRender,dataIndex:'expeTotalAmount',width:80},
		{header:C_INVOICED_AMOUNT,align:'right',renderer:numRender,dataIndex:'expeInvoiceAmount',width:100},
		{header:C_INVOICE_AMOUNT_ORI,align:'right',renderer:numRender,dataIndex:'initInvoiceAmountOri',
			css:'background:#ffaa66;',editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''}),width:120},		
		//{header:C_INVO_EX_RATE,dataIndex:'initExRate',renderer:rateRender,css:'background:#f4f090;',editor:new Ext.form.NumberField({decimalPrecision:4,emptyText:'',invalidText:''}),width:80},
		{header:C_EX_AMOUNT,align:'right',renderer:numRender,dataIndex:'initInvoiceAmount',
			css:'background: #ffaa66;',editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''}),width:80},
		{header:C_WRITEOFFED_AMOUNT,align:'right',renderer:numRender,dataIndex:'initInvoiceAmountOriW',width:120},
		/*{header:C_VESS,width:80,dataIndex:"consVessel"},
		{header:C_VOYA,width:80,dataIndex:"consVoyage"},
		{header:C_MBL_NO,width:80,dataIndex:"consMblNo"},
		{header:C_HBL_NO,width:80,dataIndex:"consHblNo"},*/
		{header:C_REMARKS,width:130,dataIndex:'expeRemarks'}
		],defaults:{sortable:false,width:80}});
	this.reCalculate = function(){
		var sum=0;var d=store.getRange();
		for(var i=0;i<d.length;i++){sum = HTUtil.round2(sum + parseFloat(d[i].get('initInvoiceAmount')));}
		p.set('invoAmount',sum);frm.find('name','invoAmount')[0].setValue(sum);
	};
	this.add=function(){
		if(p.get('custId')){
    		var win = new Fos.ExpenseLookupWin(p.get('custId'),p.get('invoType'));					//添加费用
			win.addButton({text:C_OK,scope:this,iconCls:'ok',
			handler:function(){
				var g = win.findById('G_EXPE_LOOKUP');
				var r = g.getSelectionModel().getSelections();
				if(r.length==0){
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
					return ;
				}
				if(r){
					var rn = store.getCount();
					for(var i=0;i<r.length;i++){
						if(store.findBy(function(rec,id){return rec.get('expeId')==r[i].get('id');})==-1){
							var ex=r[i].get('currCode')==p.get('currCode')?p.get('invoExRate'):HTStore.getExRate(r[i].get('currCode'),'CNY');
							var invoAmountOri = HTUtil.round2(r[i].get('expeTotalAmount')-r[i].get('expeInvoiceAmount'));
							var invoAmount = HTUtil.round2(invoAmountOri*ex/p.get('invoExRate'));
							
							var it = new SInvoiceItem({
								invoId:p.get('id'),
								invoDate:p.get('invoDate'),expeId:r[i].get('id'),expeType:r[i].get('expeType'),
								consId:r[i].get('consId'),consNo:r[i].get('consNo'),consNoHandler:r[i].get('consNoHandler'),
								custId:r[i].get('custId'),custName:r[i].get('custName'),
								custSname:r[i].get('custSname'),
								consVessel:r[i].get('consVessel'),
								consVoyage:r[i].get('consVoyage'),
								consSailDate:r[i].get('consSailDate'),
								consMblNo:r[i].get('consMblNo'),
								consHblNo:r[i].get('consHblNo'),
								charName:r[i].get('charName'),
								charNameEn:r[i].get('charNameEn'),
								unitName:r[i].get('unitName'),
								expeCurrCode:r[i].get('currCode'),
								expeUnitPrice:r[i].get('expeUnitPrice'),
								expeNum:r[i].get('expeNum'),
								expeExRate:r[i].get('expeExRate'),
								expeCommission:r[i].get('expeCommission'),
								expeCommissionRate:r[i].get('expeCommissionRate'),
								expeTotalAmount:r[i].get('expeTotalAmount'),
								expeInvoiceAmount:r[i].get('expeInvoiceAmount'),
								expeRemarks:r[i].get('expeRemarks'),
								initInvoiceAmountOri:invoAmountOri,
								initInvoiceAmount:invoAmount,
								initInvoiceAmountOriW:'0',
								initInvoiceAmountW:'0',
								initCancelFlag:'0',
								consBizType:r[i].get('consBizType'),
								initWriteOffStatus:'0',
								invoCurrCode:p.get('currCode'),
								initExRate:ex,invoExRate:p.get('invoExRate'),
								rowAction:'',
								version:'0',
								uuid:HTUtil.UUID(32)});
							store.insert(0,it);
							it.set('rowAction','N');
						}
					};
					this.reCalculate();
					win.close();
				}else{
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
				}
			}},this);
			win.addButton({text:C_CANCEL,iconCls:'cancel',handler:function(){win.close();}},this);
			win.show();
		}else{
			XMG.alert(SYS,M_SEL_SETTLE_OBJ);
			t.find('name','custName')[0].focus();
		}
	};
	this.removeInit=function(){
		var r = sm.getSelections();
		if(r){
			for(var i=0;i<r.length;i++){r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');store.remove(r[i]);}
			this.reCalculate();
		}
	};
	Fos.InvoItemGrid.superclass.constructor.call(this, {
		id:'G_INVO_I'+p.get('uuid'),border:true,autoScroll:true,
			clicksToEdit:1,header:false,height:270,stripeRows:true,
	    store:store,sm:sm,cm:cm,listeners:{scope:this,afteredit:function(e){
	    	var f=e.field;var r=e.record;
	    	if(f=='initInvoiceAmountOri'){
				if(e.value>r.get('expeTotalAmount')-r.get('expeInvoiceAmount')){
					XMG.alert(SYS,M_INVO_OVER,function(){
						r.set('initInvoiceAmountOri',e.originalValue);
						e.grid.stopEditing();e.grid.startEditing(e.row,e.column);
					});
				}
				else{
					r.set('initInvoiceAmount',HTUtil.round2(e.value*r.get('initExRate')/p.get('invoExRate')));
					this.reCalculate();
				}
	    	}
	    	else if(f=='initInvoiceAmount'){
				var iv = HTUtil.round2(e.value*p.get('invoExRate')/r.get('initExRate'));
				if(iv>r.get('expeTotalAmount')-r.get('expeInvoiceAmount')){
					XMG.alert(SYS,M_INVO_OVER,function(){
					r.set('initInvoiceAmount',e.originalValue);
					e.grid.stopEditing();e.grid.startEditing(e.row,e.column);
					});				
				}
				else{r.set('initInvoiceAmountOri',iv);this.reCalculate();}
	    	}
	    	else if(f=='initExRate'){			
				r.set('initInvoiceAmount',HTUtil.round2(e.value*r.get('initInvoiceAmountOri')/p.get('invoExRate')));
				this.reCalculate();
	    	}
	    }},
	    tbar:[{itemId:'TB_A',text:C_ADD,iconCls:'add',disabled:p.get('invoStatus')!='0',scope:this,handler:this.add},'-', 		
			{itemId:'TB_B',text:C_REMOVE,iconCls:'remove',disabled:p.get('invoStatus')!='0',scope:this,handler:this.removeInit},'-']
	});
};    
Ext.extend(Fos.InvoItemGrid, Ext.grid.EditorGridPanel);

//发票-发票明细
Fos.InvoEntryGrid = function(p,frm) {
	this.calculateSum = function(){
		var sumInv=0;
		var d=store.getRange();
		for(var i=0;i<d.length;i++){sumInv = sumInv + parseFloat(d[i].get('inenInvoiceAmount'));}			
		sumEn.setValue(HTUtil.round2(sumInv));
		sumCap.setValue(getCURR(p.get('currCode'))+HTUtil.N2W(sumInv,2));
		sumCapEn.setValue(p.get('currCode')+' '+N2D(sumInv));
		p.set('invoAmountEntry',sumInv);
		p.set('invoAmountCapital',getCURR(p.get('currCode'))+HTUtil.N2W(sumInv,2));
		p.set('invoAmountCapitalEn',p.get('currCode')+' '+N2D(sumInv));
	};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'INEN_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoiceEntry',id:'id'},SInvoiceEntry),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	if(p.get('rowAction')!='N') store.load({params:{invoId:p.get('id')}});
	var sumEn = new Ext.form.NumberField({value:p.get('invoAmount'),disabled:true,width:60});
	var sumCap = new Ext.form.TextField({value:p.get('invoAmountCapital'),width:250});
	var sumCapEn = new Ext.form.TextField({value:p.get('invoAmountCapitalEn'),width:400});	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CHAR,dataIndex:"charName",editor:new Ext.form.TextField({allowBlank:false,emptyText:''})},
		{header:C_QUANTITY,dataIndex:"inenNum",editor:new Ext.form.NumberField({decimalPrecision:4})},
		{header:C_UNIT,hidden:true,dataIndex:"unitName",editor:new Ext.form.TextField()},		
		{header:C_UNIT_PRICE,dataIndex:"inenUnitPrice",align:'right',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
		{header:C_CURR_BASE,dataIndex:'currCode',width:100,
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()})},		
		{header:C_ORI_AMOUNT,dataIndex:"inenTotalAmount",align:'right',renderer:numRender,editor:new Ext.form.NumberField()},
		//{header:C_EX_RATE,dataIndex:"inenExRate",renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
		{header:C_INVO_AMOUNT,dataIndex:"inenInvoiceAmount",align:'right',renderer:numRender,editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''})},
		{header:C_ENAME,dataIndex:"charNameEn",editor:new Ext.form.TextField({allowBlank:false,emptyText:''})}
		],defaults:{sortable:false,width:100}});
	//发票明细-新增
	this.add=function(){
		var e = new SInvoiceEntry({charName:'',unitName:'',inenNum:'',inenUnitPrice:'',inenTotalPrice:'',
			inenTotalAmount:'',currCode:'',inenExRate:'',inenInvoiceAmount:'',consBizType:p.get('consBizType'),
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
		this.stopEditing();
		store.insert(0,e);
		this.startEditing(0, 1);
	};
	this.removeInen=function(){HTUtil.REMOVE_SM(sm,store);this.calculateSum();};
	this.merge=function(){
		var r = sm.getSelections();
		if(r.length>1){
			var c = r[0].get('currCode');var b = false;
			for(var i=0;i<r.length;i++){if(c!=r[i].get('currCode')){b=true;break;}};
			if(b){
				XMG.confirm(SYS,M_DIFF_CURR,function(btn){
    				if(btn=='yes'){
    					for(var i=1;i<r.length;i++){
							r[0].set('currCode',p.get('currCode'));
							r[0].set('inenExRate',1);
							r[0].set('inenNum',1);
							r[0].set('inenInvoiceAmount',HTUtil.round2(r[0].get('inenInvoiceAmount'))+HTUtil.round2(r[i].get('inenInvoiceAmount')));
							r[0].set('inenTotalAmount',r[0].get('inenInvoiceAmount'));
							r[0].set('inenUnitPrice',r[0].get('inenInvoiceAmount'));
							r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
							store.remove(r[i]);
						}
    				}
    			});
			}
			else{
				for(var i=1;i<r.length;i++){
					r[0].set('inenNum',1);
					r[0].set('inenInvoiceAmount',HTUtil.round2(r[0].get('inenInvoiceAmount'))+HTUtil.round2(r[i].get('inenInvoiceAmount')));
					r[0].set('inenTotalAmount',r[0].get('inenInvoiceAmount'));
					r[0].set('inenUnitPrice',r[0].get('inenInvoiceAmount'));
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
				}
			}
		}
	};
	//发票明细-刷新
	this.refresh=function(){
		var a=store.getRange();
		for(var i=0;i<a.length;i++){
			a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
			store.remove(a[i]);
		};
		var g=frm.findById('G_INVO_I'+p.get('uuid'));
		var total = 0;
		var s = g.getStore();
		var d=s.getRange();
		if(d.length==0){
			XMG.alert(SYS,'费用明细没有数据！');
			return ;
		}
		for(var i=0;i<d.length;i++){
			var e = new SInvoiceEntry({invoId:d[i].get('invoId'),
				charName:d[i].get('charName'),charNameEn:d[i].get('charNameEn'),
				unitName:d[i].get('unitName'),
				inenNum:d[i].get('expeNum'),inenUnitPrice:d[i].get('expeUnitPrice'),
				currCode:d[i].get('expeCurrCode'),
				inenExRate:d[i].get('initExRate'),
				expeCommission:d[i].get('expeCommission'),
				expeCommissionRate:d[i].get('expeCommissionRate'),
				inenTotalAmount:d[i].get('expeTotalAmount'),
				inenInvoiceAmount:d[i].get('initInvoiceAmount'),version:'0',uuid:HTUtil.UUID(32)
			});
			store.insert(0,e);
			e.set('rowAction','N');
			total = total + HTUtil.round2(d[i].get('initInvoiceAmount'));
		}
		sumEn.setValue(total); 
		sumCap.setValue(p.get('currCode')+HTUtil.N2W(total,2));
		sumCapEn.setValue(p.get('currCode')+' '+HTUtil.N2D(total));
		p.set('invoAmountEntry',total);
		p.set('invoAmountCapital',p.get('currCode')+HTUtil.N2W(total,2));
		p.set('invoAmountCapitalEn',p.get('currCode')+' '+HTUtil.N2D(total));
	};
	
	Fos.InvoEntryGrid.superclass.constructor.call(this, {
	id:'G_INVO_E'+p.get('id'),border:true,autoScroll:true,clicksToEdit:1,header:false,height:270,stripeRows:true,
    store: store,sm:sm,cm:cm,
    listeners:{scope:this,afteredit:function(e){
    	var f=e.field;var r=e.record;
    	if(f=='inenNum'){
			r.set('inenTotalAmount',e.value*r.get('inenUnitPrice'));
			r.set('inenInvoiceAmount',r.get('inenTotalAmount')*r.get('inenExRate'));
			this.calculateSum();
    	}
		else if(f=='inenUnitPrice'){
			r.set('inenTotalAmount',e.value*r.get('inenNum'));
			r.set('inenInvoiceAmount',r.get('inenTotalAmount')*r.get('inenExRate'));
			this.calculateSum();
		}
		else if(f=='currCode'){
			r.set('inenExRate',HTStore.getExRate(e.value,p.get('currCode')));
			r.set('inenInvoiceAmount',r.get('inenTotalAmount')*r.get('inenExRate'));
			this.calculateSum();
		}
		else if(f=='inenInvoiceAmount'){
			this.calculateSum();
		}
    }},
    bbar:[{xtype:'tbtext',text:C_TOTAL_AMOUNT_C},'-',sumEn,'-',{xtype:'tbtext',text:C_CAP_AMOUNT_C},'-',sumCap,'-',{xtype:'tbtext',text:C_CAP_AMOUNT_E},'-',sumCapEn],
    tbar:[{itemId:'TB_A',text:C_ADD,iconCls:'add',disabled:p.get('invoStatus')!='0',scope:this,handler:this.add}, '-',
		{itemId:'TB_B',text:C_REMOVE,iconCls:'remove',disabled:p.get('invoStatus')!='0',scope:this,handler:this.removeInen},
		{itemId:'TB_C',text:C_MERGE,iconCls:'save',disabled:p.get('invoStatus')!='0',scope:this,handler:this.merge},
		{itemId:'TB_D',text:C_REFRESH,iconCls:'refresh',disabled:p.get('invoStatus')!='0',scope:this,handler:this.refresh}]});
};
Ext.extend(Fos.InvoEntryGrid, Ext.grid.EditorGridPanel);

//应收账单-新增、编辑框
Fos.InvoiceTab = function(p,listStore) {
    this.itemGrid=new Fos.InvoItemGrid(p,this);												//费用明细
    this.entryGrid=new Fos.InvoEntryGrid(p,this);  											//发票明细  
    this.editTax=function(){
    	var tn=this.find('name','invoTaxNo')[0];
    	tn.enable();
    	tn.focus();
    };
    this.save=function(){
    	if(p.get('invoType')=='R' && this.find('name','invoTitle')[0].getValue()==''){
			XMG.alert(SYS,M_INVO_TITLE_REQUIRED);
			this.find('name','invoTitle')[0].focus();
			return;
		};
		p.beginEdit();
		this.getForm().updateRecord(p);
		p.endEdit();
   	 	var xml = HTUtil.RTX(p,'SInvoice',SInvoice);
   	 	var a = this.itemGrid.getStore().getModifiedRecords();
		if(a.length>0){
			var x = HTUtil.ATX(a,'SInvoiceItem',SInvoiceItem);
			xml=xml+x;
		};
		if(p.get('invoType')=='R'){
			var e = this.entryGrid.getStore().getModifiedRecords();
			if(e.length>0){
				var x = HTUtil.ATX(e,'SInvoiceEntry',SInvoiceEntry);
				xml=xml+x;
			};
		}
		tb=this.getTopToolbar();
		tb.getComponent('TB_A').setDisabled(true);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'INVO_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'SInvoice',SInvoice);
				var ra=p.get('rowAction');
				var f = SInvoice.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				this.find('name','invoNo')[0].setValue(p.get('invoNo'));
				this.find('name','invoTaxNo')[0].setValue(p.get('invoTaxNo'));
				this.find('name','invoConsNo')[0].setValue(p.get('invoConsNo'));
				if(ra=='N'){
					this.setTitle((p.get('invoType')=='R'?C_AR:C_AP)+C_INVO);
					p.set('rowAction','M');
					listStore.insert(0,p);
				}
				p.endEdit();
				var sa = this.itemGrid.getStore();
				var a = HTUtil.XTRA(res.responseXML,'SInvoiceItem',SInvoiceItem);
				HTUtil.RUA(sa,a,SInvoiceItem);
				if(p.get('invoType')=='R'){
					var sc = this.entryGrid.getStore();
					var b = HTUtil.XTRA(res.responseXML,'SInvoiceEntry',SInvoiceEntry);
					HTUtil.RUA(sc,b,SInvoiceEntry);
				}
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				tb.getComponent('TB_A').setDisabled(false);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				tb.getComponent('TB_A').setDisabled(false);
			},
			xmlData:HTUtil.HTX(xml)
		});
    };
    this.removeInvo=function(){
    	p.set('rowAction','R');
		var xml = HTUtil.RTX(p,'SInvoice',SInvoice);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'INVO_S'},
			success: function(r){XMG.alert(SYS,M_S,function(){
				this.ownerCt.remove('T_INVO_'+p.get('id'));});},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    };
    this.addInvoice=function(){
    	var currCode='CNY';
    	/*var w=new Fos.CurrencyWin();
		w.addButton({text:C_OK,scope:this,handler:function(){
			currCode = w.findById('currCode').getValue();
			w.close();
			var e = new SInvoice({invoNo:'N'+id,currCode:currCode,invoDueDate:p.get('invoDueDate'),invoTitle:p.get('invoTitle'),
				invoType:p.get('invoType'),custId:p.get('custId'),custName:p.get('custName'),custSname:p.get('custSname'),
				invoDate:new Date(),invoExRate:HTStore.getExRate(currCode,'CNY'),invoWriteOffStatus:'0',
				invoPrFlag:'0',invoUploadFlag:'0',invoStatus:'0',
				version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			var tab = this.ownerCt.add(new Fos.InvoiceTab(e));
			this.ownerCt.setActiveTab(tab);
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();*/
    	var id = getNextId();
		var e = new SInvoice({invoNo:'N'+id,currCode:currCode,
			invoDueDate:p.get('invoDueDate'),invoTitle:p.get('invoTitle'),
			invoType:p.get('invoType'),custId:p.get('custId'),
			custName:p.get('custName'),custSname:p.get('custSname'),
			invoDate:new Date(),invoExRate:HTStore.getExRate(currCode,'CNY'),
			invoWriteOffStatus:'0',
			invoPrFlag:'0',invoUploadFlag:'0',invoStatus:'0',
			consBizType:p.get('consBizType'),
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)
		});
		var tab = this.ownerCt.add(new Fos.InvoiceTab(e));
		this.ownerCt.setActiveTab(tab);
    };
    this.updateStatus=function(a,s){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:a,invoId:p.get('id'),invoStatus:s},
			success: function(r){p.set('invoStatus',s);this.updateToolBar();XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});	
    };
    this.check=function(){this.updateStatus('INVO_U','1');};
    this.renew=function(){this.updateStatus('INVO_U','0');};
    this.cancel=function(){this.updateStatus('INVO_C','2');};
	this.updateToolBar = function(){
		tb=this.getTopToolbar();
		tb.getComponent('TB_A').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0');
    	tb.getComponent('TB_B').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0'||p.get('rowAction')=='N');
    	tb.getComponent('TB_C').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0'||p.get('rowAction')=='N');
    	tb.getComponent('TB_D').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='1'||p.get('invoWriteOffStatus')!='0');
    	tb.getComponent('TB_E').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='1'||p.get('invoWriteOffStatus')!='0');
    	if(p.get('invoType')=='R') tb.getComponent('TB_F').setDisabled(NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0'||p.get('rowAction')=='N');
    	tb.getComponent('TB_M').setText(C_STATUS_C+HTStore.getIVST(p.get('invoStatus'))+'/'+HTStore.getWRST(p.get('invoWriteOffStatus')));
    };
    this.expInvo=function(){EXPC('INVO','&invoId='+p.get('id'));};
   
    var b1={itemId:'TB_A',text:C_SAVE,iconCls:'save',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0',scope:this,handler:this.save};
    var b2={itemId:'TB_B',text:C_REMOVE,iconCls:'remove',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0'||p.get('rowAction')=='N',scope:this,handler:this.removeInvo};
    var b3={itemId:'TB_C',text:C_AUDIT,iconCls:'check',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('rowAction')=='N',scope:this,handler:this.check};
    var b4={itemId:'TB_D',text:C_CANCEL_AUDIT,iconCls:'renew',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='1',scope:this,handler:this.renew};
    var b5={itemId:'TB_E',text:C_INVALID,iconCls:'cancel',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='1'||p.get('invoWriteOffStatus')!='0',scope:this,handler:this.cancel};
    var b6={itemId:'TB_F',text:C_MODIFY_INVO_NO,iconCls:'option',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoStatus')!='0'||p.get('invoWriteOffStatus')!='0'||p.get('rowAction')=='N',scope:this,handler:this.editTax};
    var b7={text:C_EXPORT,iconCls:'print',disabled:NR(M1_SET+(p.get('invoType')=='R'?S_INVO_R:S_INVO_P)+F_M)||p.get('invoWriteOffStatus')!='0',scope:this,menu: {items: [{text:C_INVO_TAX,scope:this,handler:this.expInvo}]}};
	var b8={itemId:'TB_M',disabled:true,text:C_STATUS_C+HTStore.getIVST(p.get('invoStatus'))+'/'+HTStore.getWRST(p.get('invoWriteOffStatus'))};
	//var b9={itemId:'TB_G',text:C_ADD,iconCls:'add',scope:this,handler:this.addInvoice};
	
	var c1={fieldLabel:C_SETTLE_OBJECT,itemCls:'required',tabIndex:1,ref:'../../custName',
   	 name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
	 xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
	 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
	 anchor:'95%',
	 listeners:{scope:this,
   		 select:function(c,r,i){
			if(p.get('invoType')=='R'){
				var invTitle=r.get('custInvoiceHeader');
				if(!invTitle) invTitle=r.get('custNameCn');
				this.find('name','invoTitle')[0].setValue(invTitle);
				var dd=r.get('custCreditDay');
				if(!dd) dd=HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS');
				if(dd) this.find('name','invoDueDate')[0].setValue(new Date().add(Date.DAY,parseInt(dd)));
			}
			else{
				p.set('invoTitle',r.get('custNameCn'));
			}
			p.set('custId',r.get('id'));
			p.set('custName',r.get('custNameCn'));
		},
		keydown:{fn:function(f,e){LC(f,e,'custArFlag');},buffer:500}}};
	
	var c2={fieldLabel:HL(C_INVO_TITLE),tabIndex:2,name:'invoTitle',allowBlank:false,value:p.get('invoTitle'),
			xtype:'textfield',anchor:'95%'};
	var c3={fieldLabel:C_INVO_NO,tabIndex:3,name:'invoNo',disabled:true,value:p.get('invoNo'),
			xtype:'textfield',anchor:'90%'};
	var c4={fieldLabel:C_CURR,tabIndex:4,name:'currCode',allowBlank:false,value:p.get('currCode'),
			disabled:true,xtype:'textfield',anchor:'90%'};
	var c5={fieldLabel:C_BANK,tabIndex:5,name:'invoBank',value:p.get('invoBank'),store:HTStore.getCOBA_S(),
			xtype:'combo',displayField:'cobaBank',valueField:'cobaBank',typeAhead: true,
			mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',editable:false,
        	listeners:{scope:this,
        		select:function(c,r,i){
					this.find('name','invoAccount')[0].setValue(r.get('cobaAccount'));
				},
				render:function(cbx){
					cbx.store.filterBy(function(rec,id){return rec.get('currCode')==p.get('currCode');});
				}
			}};
	var c6={fieldLabel:HL(C_INVO_DATE),tabIndex:6,name:'invoDate',value:p.get('invoDate'),
			xtype:'datefield',format:DATEF,anchor:'90%'};
	var c7={fieldLabel:C_EX_RATE,tabIndex:7,name:'invoExRate',value:p.get('invoExRate'),
			disabled:p.get('currCode')=='CNY',xtype:'numberfield',decimalPrecision:4,anchor:'90%',
            listeners:{scope:this,change:function(f,nv,ov){
			var a = this.itemGrid.getStore().getRange();
			if(a.length>0){
				for(var i=0;i<a.length;i++) if(a[i].get('currCode')==p.get('currCode')){a[i].set('initExRate',nv);}
		}}}};
	var c8={fieldLabel:C_BANK_ACCOUNT,tabIndex:8,name:'invoAccount',value:p.get('invoAccount'),
			xtype:'textfield',anchor:'90%'};
	var c9={fieldLabel:C_TAX_NO,disabled:p.get('invoType')=='R'?true:false,tabIndex:9,
			name:'invoTaxNo',value:p.get('invoTaxNo'),xtype:'textfield',anchor:'90%'};
	var c10={fieldLabel:C_INVO_AMOUNT,tabIndex:10,name:'invoAmount',value:p.get('invoAmount'),
			disabled:true,xtype:'textfield',anchor:'90%'};
	var c11={fieldLabel:C_DUE_DATE,tabIndex:11,name:'invoDueDate',value:p.get('invoDueDate'),
			xtype:'datefield',format:DATEF,anchor:'90%'};
	var c12={fieldLabel:C_WRITEOFFED_AMOUNT,tabIndex:12,name:'invoAmountWriteOff',
			value:p.get('invoAmountWriteOff'),disabled:true,xtype:'textfield',anchor:'90%'};
	var c13={fieldLabel:C_REMARKS,tabIndex:13,name:'invoRemarks',value:p.get('invoRemarks'),
			xtype:'textarea',anchor:'98%'};
	var c14={fieldLabel:C_CONS_NO,tabIndex:14,name:'invoConsNo',value:p.get('invoConsNo'),
			xtype:'textfield',anchor:'90%'};
	//借记通知单-水单
	var c15={fieldLabel:C_DEBIT_NOTE,tabIndex:15,name:'invoDebitnoteFlag',
			checked:p.get('invoDebitnoteFlag')=='1',xtype:'checkbox',anchor:'90%'};

	Fos.InvoiceTab.superclass.constructor.call(this, {
		id:'T_INVO_'+p.get('uuid'),iconCls:'gen',
		title:(p.get('rowAction')=='N'?'新增':'编辑')+(p.get('invoType')=='R'?C_AR:C_AP)+C_INVO,
		layout:'border',labelAlign:'right',closable:true,
		labelWidth:70,width:800,iconCls:'gen',
		tbar:p.get('invoType')=='R'?[b1,'-',b2,'-',b3,'-',b4,'-',b5,'-',b6,'-',b7,'-',//b9,
		                             '->','-',b8,'-']:
		                             [b1,'-',b2,'-',b3,'-',b4,'-',b5,'-',//b9,
		                             '->','-',b8,'-'],
		bbar:[{xtype:'tbtext',text:C_CREATE_BY_C+HTStore.getUSER(p.get('createBy'))},'-',
				{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
				{xtype:'tbtext',text:C_MODIFY_BY_C+HTStore.getUSER(p.get('modifyBy'))},'-',
				{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))},'-',
				{xtype:'tbtext',text:C_AUDIT_BY_C+HTStore.getUSER(p.get('invoChecker'))},'-',
				{xtype:'tbtext',text:C_AUDIT_TIME_C+formatDate(p.get('invoCheckDate'))}],
		items:[{region:'north',layout:'column',height:200,layoutConfig:{columns:4},
				title:C_HEAD_INFO,frame:false,collapsible:true,padding:5,
		    	items:p.get('invoType')=='R'?[
		    		{columnWidth:.5,layout:'form',border:false,items:[c1]},
		        	{columnWidth:.5,labelWidth:80,layout:'form',border:false,items:[c2]},
		        	{columnWidth:.25,layout:'form',border:false,items:[c3,c4,c5]},
		            {columnWidth:.25,layout:'form',border:false,items:[c6,c7,c8]},
		            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[c9,c10,c14]},
		            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[c11,c12]},
		            {columnWidth:.99,layout:'form',border:false,items:[c13]}
		            ]:[
		            {columnWidth:.5,layout:'form',border:false,items:[c1]},
					{columnWidth:.25,layout:'form',border:false,items:[c3]},
					{columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[c9]},
		            {columnWidth:.25,layout:'form',border:false,items:[c4,c5]},
		            {columnWidth:.25,layout:'form',border:false,items:[c7,c8]},
		            {columnWidth:.25,layout:'form',border:false,items:[c10,c14]},
		            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[c12]},
		            {columnWidth:.99,layout:'form',border:false,items:[c13]}
		        ]},
				  {id:'T_INV_T_'+p.get('id'),xtype:'tabpanel',plain:true,region:'center',activeTab:0,
		            items:p.get('invoType')=='R'?[
		            {id:'T_INV_EN_'+p.get('id'),layout:'fit',title:C_EXPE_LINE,items:[this.itemGrid]},				//费用明细
		            {id:'T_INV_LI_'+p.get('id'),layout:'fit',title:C_INVO_LINE,items:[this.entryGrid]}]:			//发票明细
		            [{layout:'fit',title:C_EXPE_LINE,items:[this.itemGrid]}]
		          }
	        ]
	});
};
Ext.extend(Fos.InvoiceTab, Ext.FormPanel);

/**
 * 收款核销-付款核销列表
 * t:R/P
 */
Fos.VoucherGrid = function(t){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VOUC_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SVoucher',id:'id'},SVoucher),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var a=[];var op=1;a[0]={key:'voucType',value:t,op:1};
	var bp={_A:'VOUC_X',_mt:'json',xml:HTUtil.QATJ(a)};
	store.baseParams=bp;
    store.load({params:{start:0,limit:C_PS30}});
    this.reset=function(){store.baseParams=bp;store.reload({params:{start:0,limit:C_PS30}});};
	this.showVoucher= function(p){
		var tab = this.ownerCt.getComponent("T_VOUC_" + p.get("id"));
    	if(tab) {this.ownerCt.setActiveTab(tab);}
    	else {
    		tab = this.ownerCt.add(new Fos.VoucherTab(p,'',store));
    		this.ownerCt.setActiveTab(tab);
    		tab.doLayout();
    	}
	};
	this.add = function(){
		var currCode='CNY';
		/*var w=new Fos.CurrencyWin();
		w.addButton({text:C_OK,scope:this,handler:function(){
			currCode = w.findById('currCode').getValue();								//获取币种
			w.close();
			var id = getNextId();
			var e = new SVoucher({voucNo:'N'+id,currCode:currCode,
			voucType:t,voucDate:new Date(),voucExRate:HTStore.getExRate(currCode,'CNY'),voucFixAmount:0,
			voucUploadFlag:'0',voucStatus:'0',voucWriteOffStatus:'0',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			tab = this.ownerCt.add(new Fos.VoucherTab(e));
    		this.ownerCt.setActiveTab(tab);
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();*/
		var id = getNextId();
		var e = new SVoucher({voucNo:'N'+id,currCode:currCode,
			voucType:t,voucDate:new Date(),
			voucExRate:HTStore.getExRate(currCode,'CNY'),voucFixAmount:0,
			voucUploadFlag:'0',voucStatus:'0',voucWriteOffStatus:'0',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32),
			consBizType:BT_T
		});
		tab = this.ownerCt.add(new Fos.VoucherTab(e,'',store));
		this.ownerCt.setActiveTab(tab);
	};
	this.edit = function(){
		var p=sm.getSelected();
		if(p){
			this.showVoucher(p);
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.removeVouc = function(){
		var a =sm.getSelections();
       	if(a.length>0) {XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){var b = false;
               	for(var i=0;i<a.length;i++){if(a[i].get('voucStatus')!='0') b=true;}
               	if(b) XMG.alert(SYS,M_WRITEOFF_MEMOVE_DENY);
               	else {
               		var xml =HTUtil.SMTX4R(sm,'SVoucher');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'VOUC_S'},
					success: function(){
               			sm.each(function(p){store.remove(p);});
               			XMG.alert(SYS,M_S);},
					failure: function(r,o){
               			XMG.alert(SYS,M_F+r.responseText);
               		},
					xmlData:HTUtil.HTX(xml)});
               	}
           }});}
       else XMG.alert(SYS,M_R_P);
    };
	this.search = function(){
    	var win = new Fos.VoucLookupWin(t);
		win.addButton({text:C_OK,handler:function(){
			var xml = '';
        	var tab = Fos.VoucLookupWin.superclass.findById.call(win,'T_VOUC_LOOK');
        	var at = tab.getActiveTab();
        	var a=[];var op=1;a[0]={key:'voucType',value:t,op:1};
        	if(at.getId()=='T_VOUC_LOOK_1'){
        		var voucNo=at.find('name','voucNo')[0].getValue();
        		var voucNoM=at.find('name','voucNoM')[0].getValue();
        		var c=voucNo.indexOf(',');
        		var b=voucNo.indexOf('..');
        		if(c>=0){a[1]={key:'voucNo',value:voucNo,op:IN};}
        		else if(b>=0){
        			var ra=voucNo.split('..');
        			a[1]={key:'voucNo',value:ra[0],op:GE};
        			a[2]={key:'voucNo',value:ra[1],op:LE};
        		}
        		else if(voucNoM){a[1]={key:'voucNo',value:voucNo,op:LI};}
        	}
        	else if(at.getId()=='T_VOUC_LOOK_2'){
        		var invoNo=at.find('name','invoNo')[0].getValue();
        		var invoNoM=at.find('name','invoNoM')[0].getValue();
        		var c=invoNo.indexOf(',');
        		var b=invoNo.indexOf('..');
        		if(c>=0){a[1]={key:'invoNo',value:invoNo,op:IN};}
        		else if(b>=0){
        			var ra=invoNo.split('..');
        			a[1]={key:'invoNo',value:ra[0],op:GE};
        			a[2]={key:'invoNo',value:ra[1],op:LE};
        		}
        		else if(invoNoM){a[1]={key:'invoNo',value:invoNo,op:LI};}
        	}
        	else if(at.getId()=='T_VOUC_LOOK_3'){
        		var invoTaxNo=at.find('name','invoTaxNo')[0].getValue();
        		var invoTaxNoM=at.find('name','invoTaxNoM')[0].getValue();
        		var c=invoTaxNo.indexOf(',');
        		var b=invoTaxNo.indexOf('..');
        		if(c>=0){a[1]={key:'invoTaxNo',value:invoTaxNo,op:IN};}
        		else if(b>=0){
        			var ra=invoTaxNo.split('..');
        			a[1]={key:'invoTaxNo',value:ra[0],op:GE};
        			a[2]={key:'invoTaxNo',value:ra[1],op:LE};
        		}
        		else if(invoTaxNoM){a[1]={key:'invoTaxNo',value:invoTaxNo,op:LI};}
        	}
        	else if(at.getId()=='T_VOUC_LOOK_4'){
        		var custId=at.find('name','custName')[0].getValue();
        		if(custId) a[a.length]={key:'custName',value:custId,op:op};
        		var currCode=at.find('name','currCode')[0].getValue();        		
        		if(currCode) a[a.length]={key:'currCode',value:currCode,op:op};
        		var voucStatus=at.find('name','voucStatus')[0].getValue();        		
        		if(voucStatus) a[a.length]={key:'voucStatus',value:voucStatus,op:op};
        		var voucCheckNo=at.find('name','voucCheckNo')[0].getValue();        		
        		if(voucCheckNo) a[a.length]={key:'voucCheckNo',value:voucCheckNo,op:op};
        		var voucBankReciptNo=at.find('name','voucBankReciptNo')[0].getValue();
        		if(voucBankReciptNo) a[a.length]={key:'voucBankReciptNo',value:voucCheckNo,op:op};
        		var voucWriteOffNo=at.find('name','voucWriteOffNo')[0].getValue();
        		if(voucWriteOffNo) a[a.length]={key:'voucWriteOffNo',value:voucWriteOffNo,op:op};
        		var voucDate=at.find('name','voucDate')[0].getValue();
        		var voucDate2=at.find('name','voucDate2')[0].getValue();
        		if(voucDate && voucDate2){
        			a[a.length]={key:'voucDate',value:voucDate.format('Y-m-d H:i:s'),op:5};
        			a[a.length]={key:'voucDate',value:voucDate2.format('Y-m-d H:i:s'),op:3};
        		}
        		else if(voucDate) a[a.length]={key:'voucDate',value:voucDate,op:op};        		
        		var voucAmount=at.find('name','voucAmount')[0].getValue();
        		var voucAmount2=at.find('name','voucAmount2')[0].getValue();
        		if(voucAmount && voucAmount2){
        			a[a.length]={key:'voucAmount',value:voucAmount,op:5};
        			a[a.length]={key:'voucAmount',value:voucAmount2,op:3};
        		}
        		else if(voucAmount) a[a.length]={key:'voucAmount',value:voucAmount,op:op};
        		var voucWriteOffAmount=at.find('name','voucWriteOffAmount')[0].getValue();
        		var voucWriteOffAmount2=at.find('name','voucWriteOffAmount2')[0].getValue();
        		if(voucWriteOffAmount && voucWriteOffAmount2){
        			a[a.length]={key:'voucWriteOffAmount',value:voucWriteOffAmount,op:5};
        			a[a.length]={key:'voucWriteOffAmount',value:voucWriteOffAmount2,op:3};
        		}
        		else if(voucWriteOffAmount) a[a.length]={key:'voucWriteOffAmount',value:voucWriteOffAmount,op:op};
        	}
        	store.baseParams={_A:'VOUC_X',_mt:'json',xml:HTUtil.QATJ(a)};
     		store.reload({params:{start:0,limit:C_PS30},callback:function(r){
     			if(r.length==0) 
     				XMG.alert(SYS,M_NOT_FOUND);
     			}
     		});
     		win.close();
		}},this);
		win.addButton({text:C_CANCEL,handler:function(){win.close();}},this);
		win.show();
    };
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"voucStatus",renderer:HTStore.getVOST},							//审核状态
		{header:C_WRITEOFF_STATUS,width:80,dataIndex:"voucWriteOffStatus",renderer:HTStore.getWRST},				//核销状态
		{header:t=='R'?C_VOUC_NO_R:C_VOUC_NO_P,width:130,dataIndex:"voucNo"},		
		{header:C_SETTLE_OBJECT,width:150,dataIndex:"custName"},													//结算单位
		{header:t=='R'?C_VOUC_R_AMOUNT:C_VOUC_P_AMOUNT,width:80,align:'right',renderer:numRender,dataIndex:"voucAmount"},//收款金额
		{header:C_WRITEOFFED_AMOUNT,width:100,align:'right',renderer:numRender,dataIndex:"voucWriteOffAmount"},		//已核销金额
		{header:C_CURR,width:60,dataIndex:"currCode"},																//币种
		{header:C_DATE,width:100,dataIndex:"voucDate",renderer:formatDate},											//核销日期
		{header:C_WRITEOFF_NO,width:100,dataIndex:"voucWriteOffNo"},												//核销号
		{header:C_BANK,width:120,dataIndex:"voucBank"},																//银行
		{header:C_BANK_ACCOUNT,width:120,align:'right',dataIndex:"voucAccount"},									//银行账户
		{header:C_SEWA,width:80,dataIndex:"voucPaymentType",renderer:HTStore.getSEWA},								//结算方式
		{header:C_FIX_AMOUNT,width:80,align:'right',renderer:numRender,dataIndex:"voucFixAmount"},					//处理金额
		{header:C_BILL_BY,dataIndex:"createBy",renderer:HTStore.getUSER},											//制单人
		{header:C_BILL_DATE,dataIndex:"createTime",renderer:formatDate,width:120},									//制单日期
		{header:C_AUDIT_BY,dataIndex:"voucChecker",renderer:HTStore.getUSER},										//审核人
		{header:C_AUDIT_TIME,dataIndex:"voucCheckDate",renderer:formatDate,width:120},								//审核日期
		{header:C_INVO_NO,dataIndex:"voucInvoiceNo"},																//账单号
		//{header:C_TAX_NO,dataIndex:"voucTaxInvoiceNo"},																//税务发票号
		{header:C_REMARKS,dataIndex:"voucRemarks"}																	//备注
		],defaults:{sortable:false,width:130}});
	var rowCtxEvents={
			rowdblclick:function(grid, rowIndex, event){
				var c= grid.getSelectionModel().getSelected();if(c){this.showVoucher(c);}
			}
	};
	var kw = new Ext.form.TextField({
		emptyText:'请输入收款单号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();
				}
		}
	});
    this.fastSearch=function(){
         var voucNo=kw.getValue();
        if(!voucNo){XMG.alert(SYS,t=='R'?M_INPUT_VOUC_R_NO:M_INPUT_VOUC_P_NO,function(b){kw.focus();});return;};
        var a=[];
        var c=voucNo.indexOf(',');
        var b=voucNo.indexOf('..');
        if(c>=0){
            a[a.length]={key:'voucNo',value:voucNo,op:IN};
        }
        else if(b>=0){
            var ra=voucNo.split('..');
            a[a.length]={key:'voucNo',value:ra[0],op:GE};
            a[a.length]={key:'voucNo',value:ra[1],op:LE};
        }
        a[a.length]={key:'voucNo',value:voucNo,op:LI};
        store.baseParams={_A:'VOUC_X',_mt:'json',xml:HTUtil.QATJ(a)};
        store.reload({params:{start:0,limit:C_PS30},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});
    };
    var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch}; 
    var b9={text:C_RESET,iconCls:'refresh',handler:this.reset};
    
	Fos.VoucherGrid.superclass.constructor.call(this, {
	    id:'G_VOUC_'+t,iconCls:'gen',store:store,
	    title:t=='R'?'收款核销':'付款核销',
	    header:false,autoScroll:true,height:300,
		sm:sm,cm:cm,stripeRows:true,closable:true,listeners:rowCtxEvents,
		tbar:[{text:C_ADD,iconCls:'add',disabled:NR(M1_SET+(t=='R'?S_VOUC_R:S_VOUC_P)+F_ADD),scope:this,handler:this.add}, '-', 
			{text:C_EDIT,iconCls:'option',disabled:NR(M1_SET+(t=='R'?S_VOUC_R:S_VOUC_P)+F_UP),scope:this,handler:this.edit},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(M1_SET+(t=='R'?S_VOUC_R:S_VOUC_P)+F_R),scope:this,handler:this.removeVouc},'-',
			{text:C_COMPLAX_SEARCH,iconCls:'search',handler:this.search},'-',
			kw,b8,'-',b9,'-'],
		bbar:PTB(store,C_PS30)
	});
};
Ext.extend(Fos.VoucherGrid, Ext.grid.GridPanel);

//收款核销-付款核销-账单弹出框
Fos.InitLookupWin = function(c,t) {
	/*var store = new Ext.data.GroupingStore({url:SERVICE_URL,baseParams:{_A:'INIT_X',_mt:'xml'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoiceItem',id:id},SInvoiceItem),groupField:'invoNo'});*/
	/*var a=[];
	var op=1
	a[0]={key:'custId',value:c,op:1};
	a[1]={key:'initCancelFlag',value:0,op:EQ};
	a[2]={key:'initWriteOffStatus',value:2,op:NE};*/
	
	var store = new Ext.data.GroupingStore({url:SERVICE_URL,baseParams:{_A:'INIT_X',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SInvoiceItem',id:'id'},SInvoiceItem),groupField:'invoNo'});
	var a=[];
	a[0]=new QParam({key:'custId',value:c,op:EQ});
	a[1]=new QParam({key:'initCancelFlag',value:0,op:EQ});
	a[2]=new QParam({key:'initWriteOffStatus',value:2,op:NE});
	var xml = HTUtil.QTX(a);
	
	store.baseParams={_A:'INIT_X',_mt:'xml',xml:HTUtil.HTX(xml)};
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var gv = new Ext.grid.GroupingView({
		forceFit:false,
		getRowClass:function(row,idx) {
			if(row.data.expeType!=t){
				return 'red-row';
			}
		},
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
		{header:C_EXPE_TYPE,width:80,dataIndex:"expeType",renderer:function(v){return v=='R'?C_AR:C_AP;}},
		{header:C_INVO_NO,width:120,dataIndex:"invoNo"},
		{header:C_TAX_NO,width:130,dataIndex:"invoTaxNo"},
		{header:C_SETTLE_OBJECT,dataIndex:"custName",width:120},
		{header:C_CONS_NO,width:120,dataIndex:"consNo"},
		{header:C_CHAR,width:80,dataIndex:"charName"},
		{header:C_CURR_BASE,dataIndex:'expeCurrCode',width:60},	
		{header:C_ORI_AMOUNT,width:80,dataIndex:"expeTotalAmount"},
		{header:C_INVO_EX_RATE,dataIndex:'initExRate',width:80},
		{header:C_INVO_AMOUNT,dataIndex:"initInvoiceAmount"},
		{header:C_WRITEOFFED_AMOUNT,dataIndex:"initInvoiceAmountW",width:100},
		{header:C_WRITEOFF_STATUS,dataIndex:"initWriteOffStatus"},
		{header:C_WRITEOFF_NO,dataIndex:"initWriteOffNo"},
		{header:C_UNIT,width:80,dataIndex:"unitName"},
		{header:C_QUANTITY,width:80,dataIndex:"expeNum"},
		{header:C_UNIT_PRICE,width:80,dataIndex:"expeUnitPrice"},		
		{header:C_INVOICE_AMOUNT_ORI_C,dataIndex:"initInvoiceAmountOri"},
		{header:C_WRITEOFFED_AMOUNT_ORI,dataIndex:"initInvoiceAmountOriW",width:120}],
		defaults:{sortable:false,width:100}});
    var g = new Ext.grid.GridPanel({
    	id:'G_INIT_LOOKUP',iconCls:'gen',view:gv,header:false,height:400,width:900,store:store,sm:sm,cm:cm,loadMask:true
    });
    Fos.InitLookupWin.superclass.constructor.call(this,{title:'添加账单',modal:true,layout:'fit',width:900,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:[{layout:'fit',border:false,
        items: [g]}]});
};
Ext.extend(Fos.InitLookupWin,Ext.Window);

//核销-核销明细
Fos.VoucItemGrid = function(p,store){
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
		{header:C_EXPE_TYPE,width:80,dataIndex:"expeType",renderer:function(v){return v=='R'?C_AR:C_AP;}},
		{header:C_INVO_NO,width:80,dataIndex:'invoNo',width:120},
		{header:C_TAX_NO,width:80,dataIndex:'invoTaxNo',width:130},
		{header:C_CHAR,width:80,dataIndex:'charName'},
		{header:C_CURR_BASE,width:70,dataIndex:'expeCurrCode'},
		{header:C_ORI_AMOUNT,width:80,align:'right',renderer:numRender,dataIndex:'expeTotalAmount'},	
		//{header:C_INVO_CURR,width:80,dataIndex:'invoCurrCode'},
		{header:C_INVO_EX_RATE,width:80,align:'right',renderer:rateRender,dataIndex:'initExRate'},	
		{header:C_INVO_AMOUNT,width:80,align:'right',renderer:numRender,dataIndex:'initInvoiceAmount'},
		{header:C_WRITEOFFED_AMOUNT,width:100,align:'right',renderer:numRender,dataIndex:'initInvoiceAmountW'},
		{header:C_WRITEOFFED_AMOUNT_C,width:120,align:'right',renderer:numRender,dataIndex:'voitAmountW',
			editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''})
		},
		{header:C_VOUC_EX_RATE,width:100,align:'right',renderer:rateRender,dataIndex:'voitExRate',
			editor:new Ext.form.NumberField({decimalPrecision:4,emptyText:'',invalidText:''}),
			hidden:true
		},
		{header:C_EX_AMOUNT,width:100,align:'right',renderer:numRender,dataIndex:'voitAmountVoucW',hidden:true},
		{header:C_EX_AMOUNT_ORI,width:120,align:'right',renderer:numRender,dataIndex:'voitAmountOriW',hidden:true},
		{header:C_UNIT,hidden:true,width:60,dataIndex:'unitName'},
		{header:C_UNIT_PRICE,width:100,align:'right',renderer:rateRender,dataIndex:'expeUnitPrice'},
		{header:C_QUANTITY,width:70,dataIndex:'expeNum'},
		{header:C_CONS_NO,width:130,dataIndex:"consNo"},
		{header:C_REMARKS,width:120,dataIndex:'expeRemarks'}
		],defaults:{sortable:false,width:100}});
	var gv = new Ext.grid.GridView({getRowClass:function(row,idx) {
		if(row.data.expeType!=p.get('voucType'))
			return 'red-row';
		}});
	this.reCalculate = function(){
		var sum=0;
		var d=store.getRange();
		for(var i=0;i<d.length;i++){
			if(d[i].get('expeType')==p.get('voucType')){
				sum = HTUtil.round2(sum + parseFloat(d[i].get('voitAmountVoucW')));
			}else{
				sum = HTUtil.round2(sum - parseFloat(d[i].get('voitAmountVoucW')));
			}
		}
		p.set('voucWriteOffAmount',sum);
		p.set('voucAmount',sum);
		var T = Ext.getCmp('T_VOUC_'+p.get('uuid'));
		T.find('name','voucWriteOffAmount')[0].setValue(sum);
		T.find('name','voucAmount')[0].setValue(sum);
	};
	this.add=function(){
		if(p.get('custId')){
    		var win = new Fos.InitLookupWin(p.get('custId'),p.get('voucType'));
			win.addButton({text:C_OK,scope:this,iconCls:'ok',
			handler:function(){
				var g = win.findById('G_INIT_LOOKUP');
				var r = g.getSelectionModel().getSelections();
				if(r.length==0){
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
					return ;
				}
				if(r){
					var rn = store.getCount();
					for(var i=0;i<r.length;i++){
						if(store.findBy(function(rec,id){return rec.get('invoId')==r[i].get('id');})==-1){
							var ex=r[i].get('invoCurrCode')==p.get('currCode')?p.get('voucExRate'):HTStore.getExRate(r[i].get('invoCurrCode'),'CNY');
							var voitAmountW = HTUtil.round2(r[i].get('initInvoiceAmount')-r[i].get('initInvoiceAmountW'));
							var voitAmountOriW = HTUtil.round2(voitAmountW*r[i].get('invoExRate')/r[i].get('initExRate'));
							var voitAmountVoucW = HTUtil.round2(voitAmountW*r[i].get('invoExRate')/p.get('voucExRate'));
							var it = new SVoucherItem({
								initId:r[i].get('id'),
								invoId:r[i].get('invoId'),
								invoNo:r[i].get('invoNo'),
								invoTaxNo:r[i].get('invoTaxNo'),
								expeId:r[i].get('expeId'),expeType:r[i].get('expeType'),
								consId:r[i].get('consId'),consNo:r[i].get('consNo'),custId:r[i].get('custId'),custName:r[i].get('custName'),custSname:r[i].get('custSname'),
								consVessel:r[i].get('consVessel'),consVoyage:r[i].get('consVoyage'),consSailDate:r[i].get('consSailDate'),
								consMblNo:r[i].get('consMblNo'),consHblNo:r[i].get('consHblNo'),
								charName:r[i].get('charName'),unitName:r[i].get('unitName'),expeCurrCode:r[i].get('expeCurrCode'),
								expeUnitPrice:r[i].get('expeUnitPrice'),expeNum:r[i].get('expeNum'),expeExRate:r[i].get('expeExRate'),
								expeCommission:r[i].get('expeCommission'),expeCommissionRate:r[i].get('expeCommissionRate'),
								expeTotalAmount:r[i].get('expeTotalAmount'),initInvoiceAmount:r[i].get('initInvoiceAmount'),initInvoiceAmountOri:r[i].get('initInvoiceAmountOri'),
								initInvoiceAmountW:r[i].get('initInvoiceAmountW'),initInvoiceAmountOriW:r[i].get('initInvoiceAmountOriW'),
								invoCurrCode:r[i].get('invoCurrCode'),
								initExRate:r[i].get('initExRate'),invoExRate:r[i].get('invoExRate'),
								voitExRate:ex,voucExRate:p.get('voucExRate'),
								consBizType:r[i].get('consBizType'),
								voitWriteOffNo:p.get('voucWriteOffNo'),voucId:p.get('voucId'),voucNo:p.get('voucNo'),voucDate:p.get('voucDate'),
								voitAmountW:voitAmountW,voitAmountOriW:voitAmountOriW,voitAmountVoucW:voitAmountVoucW,voucCurrCode:p.get('currCode'),
								voitRemarks:'',	voitWriteOffStatus:'2',voitCancelFlag:'0',
								rowAction:'',version:'0',uuid:HTUtil.UUID(32)
							});
							if(it.get('voitExRate')==''||it.get('voitExRate')==0){
								it.set('voitExRate',1);
							}
							store.insert(0,it);
							it.set('rowAction','N');
						}
					}
					this.reCalculate();
					win.close();
				}else{
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
				}
			}},this);
			win.addButton({text:C_CANCEL,iconCls:'cancel',handler:function(){win.close();}},this);
			win.show();
		}
		else{XMG.alert(SYS,M_SEL_SETTLE_OBJ);}
	};
	this.removeVoit=function(){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				store.remove(r[i]);
			}
			this.reCalculate();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	Fos.VoucItemGrid.superclass.constructor.call(this, {
		id:'G_VOUC_I'+p.get('id'),border:false,autoScroll:true,view:gv,clicksToEdit:1,store:store,sm:sm,cm:cm,height:260,
	    listeners:{scope:this,afteredit:function(e){//核销明细监听
	    	var f=e.field;
	    	var r=e.record;
	    	if(f=='voitAmountW'){
				if(e.value>r.get('initInvoiceAmount')-r.get('initInvoiceAmountW')){
					XMG.alert(SYS,M_VOUC_OVER,function(){
						r.set('voitAmountW',e.originalValue);
						e.grid.stopEditing();
						e.grid.startEditing(e.row,e.column);
					});
				}else{
					r.set('voitAmountOriW',HTUtil.round2(e.value*r.get('invoExRate')/r.get('initExRate')));
					r.set('voitAmountVoucW',HTUtil.round2(e.value*r.get('voitExRate')/r.get('voucExRate')));
					this.reCalculate();
				}
	    	}else if(f=='voitExRate'){
	    		r.set('voitAmountOriW',HTUtil.round2(r.get('voitAmountW')*r.get('invoExRate')/e.value));
				r.set('voitAmountVoucW',HTUtil.round2(e.value*r.get('voitAmountW')/r.get('voucExRate')));
				this.reCalculate();
	    	}
	    }},
	    tbar:[{text:C_ADD,iconCls:'add',disabled:p.get('voucStatus')!='0',scope:this,handler:this.add}, '-', 		
			{text:C_REMOVE,iconCls:'remove',disabled:p.get('voucStatus')!='0',scope:this,handler:this.removeVoit
		}]}
	);
};    
Ext.extend(Fos.VoucItemGrid,Ext.grid.EditorGridPanel);

//收款核销-付款核销-新增-编辑弹出框
Fos.VoucherTab = function(p,prId,listStore) {
    var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VOIT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SVoucherItem',id:'id'},SVoucherItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    if(prId){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'INIT_PR_X',prId:prId},scope:this,
			success: function(res,o){
				var r = XTRA(res.responseXML,'SInvoiceItem',SInvoiceItem);
				var sum=0;
				for(var i=0;i<r.length;i++){
					var ex=r[i].get('invoCurrCode')==p.get('currCode')?p.get('voucExRate'):HTStore.getExRate(r[i].get('invoCurrCode'),'CNY');
					var voitAmountW = HTUtil.round2(r[i].get('initInvoiceAmount')-r[i].get('initInvoiceAmountW'));
					var voitAmountOriW = HTUtil.round2(voitAmountW*r[i].get('invoExRate')/r[i].get('initExRate'));
					var voitAmountVoucW = HTUtil.round2(voitAmountW*r[i].get('invoExRate')/p.get('voucExRate'));
					var it = new SVoucherItem({
						initId:r[i].get('initId'),invoId:r[i].get('invoId'),invoNo:r[i].get('invoNo'),invoTaxNo:r[i].get('invoTaxNo'),
						expeId:r[i].get('expeId'),expeType:r[i].get('expeType'),
						consId:r[i].get('consId'),consNo:r[i].get('consNo'),custId:r[i].get('custId'),custName:r[i].get('custName'),custSname:r[i].get('custSname'),
						consVessel:r[i].get('consVessel'),consVoyage:r[i].get('consVoyage'),consMblNo:r[i].get('consMblNo'),consHblNo:r[i].get('consHblNo'),
						charName:r[i].get('charName'),unitName:r[i].get('unitName'),expeCurrCode:r[i].get('expeCurrCode'),
						expeUnitPrice:r[i].get('expeUnitPrice'),expeNum:r[i].get('expeNum'),expeExRate:r[i].get('expeExRate'),
						expeTotalAmount:r[i].get('expeTotalAmount'),initInvoiceAmount:r[i].get('initInvoiceAmount'),initInvoiceAmountOri:r[i].get('initInvoiceAmountOri'),
						initInvoiceAmountW:r[i].get('initInvoiceAmountW'),initInvoiceAmountOriW:r[i].get('initInvoiceAmountOriW'),
						invoCurrCode:r[i].get('invoCurrCode'),initExRate:r[i].get('initExRate'),invoExRate:r[i].get('invoExRate'),
						voitExRate:ex,voucExRate:p.get('voucExRate'),
						voitWriteOffNo:p.get('voucWriteOffNo'),voucId:p.get('voucId'),voucNo:p.get('voucNo'),voucDate:p.get('voucDate'),
						voitAmountW:voitAmountW,voitAmountOriW:voitAmountOriW,voitAmountVoucW:voitAmountVoucW,voitRemarks:'',							
						voitWriteOffStatus:'2',voitCancelFlag:0,rowAction:'',version:0,uuid:HTUtil.UUID(32)});
					store.insert(0,it);
					it.set('rowAction','N');
					sum = sum + voitAmountVoucW;
				};
				this.find('name','voucWriteOffAmount')[0].setValue(sum);
			}});
	}
	else if(p.get('rowAction')!='N') store.load({params:{voucId:p.get('id')}});
    this.grid=new Fos.VoucItemGrid(p,store);
    this.save=function(){
    	
    	p.beginEdit();
    	this.getForm().updateRecord(p);
    	p.endEdit();
    	var title=p.get('voucType')=='R'?C_VOUC_R_AMOUNT:C_VOUC_P_AMOUNT;
    	if(!p.get('custId')){
    		XMG.alert(SYS,M_SEL_SETTLE_OBJ,function(){this.find('name','custId')[0].focus();},this);
    		return;
    	};
    	
    	if(!this.find('name','voucPaymentType')[0].getValue()){
    		XMG.alert(SYS,C_SEWA_REQUIRED,function(){this.find('name','voucPaymentType')[0].focus();},this);
    		return;
    	};
    	
		if(p.get('voucWriteOffAmount')+p.get('voucFixAmount')>p.get('voucAmount')+0.5){
			XMG.alert(SYS,M_VOUC_AMOUNT_NOT_GREAT+title,function(){this.find('name','voucWriteOffAmount')[0].focus();},this);
			return;
		};
		var rem=this.find('name','voucWriteOffAmountR')[0].getValue();
		if(rem>=-0.5&&rem<=0.5) 
			p.set('voucWriteOffStatus','2');
		else if(rem==p.get('voucAmount')) 
			p.set('voucWriteOffStatus','0');
		else 
			p.set('voucWriteOffStatus','1');
		var a = store.getRange();
		if(a.length>0){
			p.set('voucConsNo',a[0].get('consNo'));
			p.set('voucInvoiceNo',a[0].get('invoNo'));
			p.set('voucInvoiceTaxNo',a[0].get('invoTaxNo'));
			p.set('voucVessel',a[0].get('consVessel'));
			p.set('voucVoyage',a[0].get('consVoyage'));
			p.set('voucMblNo',a[0].get('consMblNo'));
			p.set('voucHblNo',a[0].get('consHblNo'));
		}
   	 	var xml = HTUtil.RTX(p,'SVoucher',SVoucher);   	 	
   	 	var a = this.grid.getStore().getModifiedRecords();
		if(a.length>0){
			var x = HTUtil.ATX(a,'SVoucherItem',SVoucherItem);
			xml=xml+x;
		};		
		var tb=this.getTopToolbar();
		tb.getComponent('TB_A').setDisabled(true);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'VOUC_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'SVoucher',SVoucher);
				var ra=p.get('rowAction');
				var f = SVoucher.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){
					this.setTitle((p.get('voucType')=='R'?C_WRITEOFF_R:C_WRITEOFF_P)+'-'+p.get("voucNo"));
					this.find('name','voucNo')[0].setValue(p.get('voucNo'));
					p.set('rowAction','M');
					listStore.insert(0,p);
				}
				p.endEdit();
				var sa = this.grid.getStore();
				var a = HTUtil.XTRA(res.responseXML,'SVoucherItem',SVoucherItem);
				HTUtil.RUA(sa,a,SVoucherItem);
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				tb.getComponent('TB_A').setDisabled(false);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				tb.getComponent('TB_A').setDisabled(false);
			},
			xmlData:HTUtil.HTX(xml)
		});
    };
    this.removeVouc=function(){
    	p.set('rowAction','R');
		var xml = HTUtil.RTX(p,'SVoucher',SVoucher);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'VOUC_S'},
			success: function(r){XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(xml)}
		);
    };
    this.updateStatus=function(a,s){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:a,id:p.get('id'),voucStatus:s},
			success: function(r){
    			p.beginEdit();
    			p.set('voucStatus',s);
    			p.set('version',p.get('version')+1);
    			p.endEdit();
    			this.updateToolBar();
    			XMG.alert(SYS,M_S);
    		},
			failure: function(r){
    				XMG.alert(SYS,M_F+r.responseText);
    		}
    	});
    };
    this.check=function(){this.updateStatus('VOUC_U','1');};
    this.renew=function(){this.updateStatus('VOUC_U','0');};
    this.cancel=function(){this.updateStatus('VOUC_U','2');};
    this.updateToolBar = function(){
		var tb=this.getTopToolbar();
		tb.getComponent('TB_A').setDisabled(NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='0');
    	tb.getComponent('TB_B').setDisabled(NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_R)+F_M)||p.get('invoStatus')!='0'||p.get('rowAction')=='N');
    	tb.getComponent('TB_C').setDisabled(NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='0'||p.get('rowAction')=='N');
    	tb.getComponent('TB_D').setDisabled(NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='1');
    	tb.getComponent('TB_E').setDisabled(NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='1');
    	tb.getComponent('TB_M').setText(C_STATUS_C+HTStore.getVOST(p.get('voucStatus'))+'/'+HTStore.getWRST(p.get('voucWriteOffStatus')));
    };
    
    Fos.VoucherTab.superclass.constructor.call(this, {id:'T_VOUC_'+p.get('uuid'),layout:'border',
    	title:(p.get('rowAction')=='N'?'新增':'编辑')+(p.get('voucType')=='R'?C_WRITEOFF_R:C_WRITEOFF_P),
		autoScroll:true,labelAlign:'right',closable:true,labelWidth:80,bodyStyle:'padding:0px 0px 20px 0px',border:false,width:800,iconCls:'gen',
		tbar:[
			{itemId:'TB_A',text:C_SAVE,iconCls:'save',disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='0',scope:this,handler:this.save},'-',
			{itemId:'TB_B',text:C_REMOVE,iconCls:'remove',disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_R)+F_M)||p.get('voucStatus')!='0'||p.get('rowAction')=='N',scope:this,handler:this.removeVouc},'-',
			{itemId:'TB_C',text:C_AUDIT,iconCls:'check',disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='0'||p.get('rowAction')=='N',scope:this,handler:this.check},'-',
			{itemId:'TB_D',text:C_CANCEL_AUDIT,iconCls:'renew',disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='1',scope:this,handler:this.renew},'-',
			{itemId:'TB_E',text:C_INVALID,iconCls:'cancel',disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M)||p.get('voucStatus')!='1',scope:this,handler:this.cancel},'-',
			/*{text:C_EXPORT,disabled:NR(M1_SET+(p.get('voucType')=='R'?S_VOUC_R:S_VOUC_P)+F_M),iconCls:'print',scope:this,						//核销输出
				handler:function(){
					EXPC('VOUC_LIST','&id='+p.get('id'));}
			},*/
			'->','-',
			{itemId:'TB_M',disabled:true,text:C_STATUS_C+HTStore.getVOST(p.get('voucStatus'))+'/'+HTStore.getWRST(p.get('voucWriteOffStatus'))},'-'
		],
		items:[{title:p.get('voucType')=='R'?C_VOUC_R_INFO:C_VOUC_P_INFO,
			region:'north',height:200,layout:'column',layoutConfig:{columns:4},deferredRender:false,
			collapsible:true,frame:false,padding:5,
	    	items:[{columnWidth:.25,layout:'form',border:false,
	        	items:[{fieldLabel:p.get('voucType')=='R'?C_VOUC_NO_R:C_VOUC_NO_P,tabIndex:1,name:'voucNo',disabled:true,value:p.get('voucNo'),xtype:'textfield',anchor:'95%'},
					{fieldLabel:C_SETTLE_OBJECT,itemCls:'required',tabIndex:5,ref:'../../custName',
					   	 name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
						 xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
						 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
						 anchor:'95%',
						 listeners:{scope:this,select:function(c,r,i){
								p.set('custId',r.get('id'));
								p.set('custName',r.get('custNameCn'));
							},
							keydown:{fn:function(f,e){LC(f,e,p.get('voucType')=='R'?'custArFlag':'custApFlag');},buffer:500}}
					 },	
		             {fieldLabel:p.get('voucType')=='R'?C_VOUC_R_AMOUNT:C_VOUC_P_AMOUNT,itemCls:'required',tabIndex:9,name:'voucAmount',value:p.get('voucAmount'),xtype:'numberfield',anchor:'95%',
		                	listeners:{scope:this,change:function(f,nv,ov){
								p.set('voucAmount',nv);
								var v = HTUtil.round2(nv-p.get('voucWriteOffAmount')-p.get('voucFixAmount'));
								this.find('name','voucWriteOffAmountR')[0].setValue(v);
							}}
					  },
				     {fieldLabel:C_BANK,tabIndex:13,name:'voucBank',value:p.get('voucBank'),store:HTStore.getCOBA_S(),
				     	xtype:'combo',displayField:'cobaBank',valueField:'cobaBank',typeAhead:true,editable:false,
				     	mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		                	listeners:{scope:this,select:function(c,r,i){
		                		this.find('name','voucAccount')[0].setValue(r.get('cobaAccount'));}}
					  }
				]},
	            {columnWidth:.25,layout:'form',border:false,
	                items: [
	                {fieldLabel:C_CURR,itemCls:'required',disabled:true,tabIndex:4,name:'currCode',
	                	value:p.get('currCode'),store:HTStore.getCURR_S(),xtype:'combo',displayField:'currCode',
	                	valueField:'currCode',typeAhead: true,mode:'remote',
	                	triggerAction: 'all',selectOnFocus:true,anchor:'95%'}, 
	                {fieldLabel:C_BANK_BILL_NO,tabIndex:2,name:'voucBankReciptNo',value:p.get('voucBankReciptNo'),
	                	xtype:'textfield',format:DATEF,anchor:'95%'},
	                {fieldLabel:C_WRITEOFF_AMOUNT,tabIndex:10,name:'voucWriteOffAmount',value:p.get('voucWriteOffAmount'),disabled:true,xtype:'numberfield',anchor:'95%',
	                listeners:{scope:this,change:function(f,nv,ov){
	                		var v = HTUtil.round2(p.get('voucAmount')-p.get('voucFixAmount')-nv);
							this.find('name','voucWriteOffAmountR')[0].setValue(v);
					}}},
					{fieldLabel:C_BANK_ACCOUNT,tabIndex:14,name:'voucAccount',value:p.get('voucAccount'),xtype:'textfield',anchor:'95%'}]},
	            {columnWidth:.25,layout:'form',border:false,
	                items:[
	                {fieldLabel:C_CHECK_NO,tabIndex:3,name:'voucCheckNo',value:p.get('voucCheckNo'),xtype:'textfield',format:DATEF,anchor:'95%'},
	                {fieldLabel:C_EX_RATE,tabIndex:7,name:'voucExRate',value:p.get('voucExRate'),
	                	 disabled:p.get('currCode')=='CNY',xtype:'numberfield',decimalPrecision:4,anchor:'95%',
	                listeners:{scope:this,change:function(f,nv,ov){
						p.set('voucExRate',nv);
						var d=store.getRange();
						for(var i=0;i<d.length;i++){						
							d[i].set('voucExRate',nv);
							if(d[i].get('invoCurrCode')==p.get('currCode'))
								d[i].set('voitExRate',nv);
						}
					}}},
	                {fieldLabel:C_FIX_AMOUNT,tabIndex:11,name:'voucFixAmount',value:p.get('voucFixAmount'),xtype:'numberfield',anchor:'95%',
						listeners:{scope:this,change:function(f,nv,ov){		
							p.set('voucFixAmount',nv);
							var v = HTUtil.round2(p.get('voucAmount')-p.get('voucWriteOffAmount')-nv);
							this.find('name','voucWriteOffAmountR')[0].setValue(v);
					}}},
	                {fieldLabel:C_WRITEOFF_NO,tabIndex:15,name:'voucWriteOffNo',value:p.get('voucWriteOffNo'),xtype:'textfield',anchor:'95%',
						listeners:{scope:this,change:function(f,nv,ov){	
							var a = this.grid.getStore().getRange();
							if(a.length>0){for(var i=0;i<a.length;i++){a[i].set('voitWriteOffNo',nv);};};
					}}}]},
	            {columnWidth:.25,layout:'form',border:false,
	                items: [{fieldLabel:p.get('voucType')=='R'?C_VOUC_DATE_R:C_VOUC_DATE_P,tabIndex:4,name:'voucDate',value:p.get('voucDate'),xtype:'datefield',format:DATEF,anchor:'95%'},
	                {fieldLabel:'结算方式',itemCls:'required',tabIndex:8,name:'voucPaymentType',
	                	value:p.get('voucPaymentType'),store:HTStore.getSEWA_S(),xtype:'combo',
	                	displayField:'sewaName',valueField:'id',typeAhead: true,mode: 'local',
	                	triggerAction: 'all',selectOnFocus:true,anchor:'95%',editable:false
	                },
	                {fieldLabel:C_REMAIN_AMOUNT,tabIndex:12,name:'voucWriteOffAmountR',value:p.get('voucAmount')-p.get('voucWriteOffAmount')-p.get('voucFixAmount'),disabled:true,xtype:'numberfield',anchor:'95%'}
	                ]},
	            {columnWidth:.99,layout:'form',border:false,items:[{fieldLabel:C_REMARKS,name:'voucRemarks',value:p.get('voucRemarks'),xtype:'textarea',anchor:'99%'}]}
	            ]},
			{title:C_WRITEOFFED_LINE,region:'center',layout:'fit',deferredRender:false,items:this.grid}]
	});
};
Ext.extend(Fos.VoucherTab,Ext.FormPanel);

//付款申请
Fos.PrGrid = function(t){
	HTStore.getSEWA_S();//初始化结算方式
    var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PR_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SPr',id:'id'},SPr),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    
	var a=[];var op=1;a[0]={key:'prType',value:t,op:1};
	var bp={_A:'PR_X',_mt:'json',xml:HTUtil.QATJ(a)};
	store.baseParams=bp;
	store.load({params:{start:0,limit:C_PS30}});
	this.reset=function(){store.baseParams=bp;store.reload({params:{start:0,limit:C_PS30}});};
	this.showPr= function(p){
		var tab = this.ownerCt.getComponent("T_PR_" + p.get("id"));
    	if(tab) {this.ownerCt.setActiveTab(tab);}
    	else {
    		tab = this.ownerCt.add(new Fos.PrTab(p));
    		this.ownerCt.setActiveTab(tab);
    		tab.doLayout();
    	}
	};
	this.add = function(){
		var currCode='CNY';
		/*var w=new Fos.CurrencyWin();
		w.addButton({text:C_OK,scope:this,handler:function(){
			currCode = w.findById('currCode').getValue();
			w.close();
			var e = new SPr({prNo:'N'+id,prType:t,prDate:new Date(),
			currCode:currCode,prExRate:HTStore.getExRate(currCode,'CNY'),prStatus:'0',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			var tab = this.ownerCt.add(new Fos.PrTab(e));
			this.ownerCt.setActiveTab(tab);
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();*/
		var e = new SPr({prNo:'N'+id,prType:t,prDate:new Date(),
			currCode:currCode,prExRate:HTStore.getExRate(currCode,'CNY'),prStatus:'0',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)
		});
		var tab = this.ownerCt.add(new Fos.PrTab(e));
		this.ownerCt.setActiveTab(tab);
	};
	this.edit = function(){
		var p=sm.getSelected();
		if(p){
			this.showPr(p);
		} 
		else 
			XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.removePr = function(){
		var a =sm.getSelections();
       	if(a.length) {
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){var b = false;
               	for(var i=0;i<a.length;i++){
               		if(a[i].get('prStatus')!='0') 
               			b=true;
               	}
               	if(b) 
               		XMG.alert(SYS,M_NO_REMOVE_COMMITED+(t=='R'?C_PR_R:C_PR_P));
               	else {
               		var xml =HTUtil.SMTX4R(sm,'SPr');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'PR_S'},
					success: function(){
               			sm.each(function(p){store.remove(p);});
               			XMG.alert(SYS,M_S);
               		},
					failure: function(r,o){
               			XMG.alert(SYS,M_F+r.responseText);
               		},
					xmlData:HTUtil.HTX(xml)});
               	}}});}
       else XMG.alert(SYS,M_R_P);
    };
    //付款申请-复杂查询
	this.search = function(){
    	var win = new Fos.PrLookupWin(t);
		win.addButton({text:C_OK,iconCls:'ok',handler:function(){
			var xml = '';			
        	var tab = Fos.PrLookupWin.superclass.findById.call(win,'T_PR_LOOK');
        	var at = tab.getActiveTab();
        	var a=[];var op=1;a[0]={key:'prType',value:t,op:1};
        	if(at.getId()=='T_PR_LOOK_1'){
        		var prNo=at.find('name','prNo')[0].getValue();
        		var prNoM=at.find('name','prNoM')[0].getValue();
        		var c=prNo.indexOf(',');
        		var b=prNo.indexOf('..');
        		if(c>=0){a[1]={key:'prNo',value:prNo,op:IN};}
        		else if(b>=0){
        			var ra=prNo.split('..');
        			a[1]={key:'prNo',value:ra[0],op:GE};
        			a[2]={key:'prNo',value:ra[1],op:LE};
        		}
        		else if(prNoM){a[1]={key:'prNo',value:prNo,op:LI};}
        	}
        	else if(at.getId()=='T_PR_LOOK_2'){
        		var invoNo=at.find('name','invoNo')[0].getValue();
        		var invoNoM=at.find('name','invoNoM')[0].getValue();
        		var c=invoNo.indexOf(',');
        		var b=invoNo.indexOf('..');
        		if(c>=0){a[1]={key:'invoNo',value:invoNo,op:IN};}
        		else if(b>=0){
        			var ra=invoNo.split('..');
        			a[1]={key:'invoNo',value:ra[0],op:GE};
        			a[2]={key:'invoNo',value:ra[1],op:LE};
        		}
        		else if(invoNoM){a[1]={key:'invoNo',value:invoNo,op:LI};}
        	}
        	else if(at.getId()=='T_PR_LOOK_3'){
        		var invoTaxNo=at.find('name','invoTaxNo')[0].getValue();
        		var invoTaxNoM=at.find('name','invoTaxNoM')[0].getValue();
        		var c=invoTaxNo.indexOf(',');
        		var b=invoTaxNo.indexOf('..');
        		if(c>=0){a[1]={key:'invoTaxNo',value:invoTaxNo,op:IN};}
        		else if(b>=0){
        			var ra=invoTaxNo.split('..');
        			a[1]={key:'invoTaxNo',value:ra[0],op:GE};
        			a[2]={key:'invoTaxNo',value:ra[1],op:LE};
        		}
        		else if(invoTaxNoM){a[1]={key:'invoTaxNo',value:invoTaxNo,op:LI};}
        	}
        	else if(at.getId()=='T_PR_LOOK_4'){
        		var custId=at.find('name','custName')[0].getValue();
        		if(custId) a[a.length]={key:'custName',value:custId,op:op};
        		var currCode=at.find('name','currCode')[0].getValue();        		
        		if(currCode) a[a.length]={key:'currCode',value:currCode,op:op};
        		var prStatus=at.find('name','prStatus')[0].getValue();        		
        		if(prStatus) a[a.length]={key:'prStatus',value:prStatus,op:op};        		
        		var prDate=at.find('name','prDate')[0].getValue();
        		var prDate2=at.find('name','prDate2')[0].getValue();
        		if(prDate && prDate2){
        			a[a.length]={key:'prDate',value:prDate.format('Y-m-d H:i:s'),op:5};
        			a[a.length]={key:'prDate',value:prDate2.format('Y-m-d H:i:s'),op:3};
        		}
        		else if(prDate) a[a.length]={key:'prDate',value:prDate,op:op};        		
        		var prAmount=at.find('name','prAmount')[0].getValue();
        		var prAmount2=at.find('name','prAmount2')[0].getValue();
        		if(prAmount && prAmount2){
        			a[a.length]={key:'prAmount',value:prAmount,op:5};
        			a[a.length]={key:'prAmount',value:prAmount2,op:3};
        		}
        		else if(prAmount) a[a.length]={key:'prAmount',value:prAmount,op:op};
        	}
        	store.baseParams={_A:'PR_X',_mt:'json',xml:HTUtil.QATJ(a)};     		
     		store.reload({params:{start:0,limit:C_PS30},callback:function(r){
     			if(r.length==0) 
     			XMG.alert(SYS,M_NOT_FOUND);
     		}});
     		win.close();
		}},this);
		win.addButton({text:C_CANCEL,iconCls:'cancel',handler:function(){win.close();}},this);
		win.show();
    };
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,dataIndex:"prStatus",renderer:t=='R'?HTStore.getERST:HTStore.getPRST},				//审核状态
		{header:t=='R'?C_PR_NO_R:C_PR_NO_P,width:130,dataIndex:"prNo"},												
		{header:C_SETTLE_OBJECT,width:150,dataIndex:"custName"},		
		{header:C_AMOUNT,align:'right',width:80,renderer:numRender,dataIndex:"prAmount"},
		{header:C_CURR,dataIndex:"currCode"},
		{header:t=='R'?C_PR_DATE_R:C_PR_DATE_P,width:100,dataIndex:"prDate",renderer:formatDate},
		{header:C_SEWA,dataIndex:"prPaymentType",renderer:HTStore.getSEWA},											//结算方式
		{header:t=='R'?C_BANK_R:C_BANK_P,width:120,dataIndex:"prBank"},	
		{header:t=='R'?C_ACCOUNT_R:C_ACCOUNT_P,width:120,align:'right',dataIndex:"prAccount"},			
		{header:C_BILL_BY,dataIndex:"createBy",renderer:HTStore.getUSER},
		{header:C_BILL_DATE,dataIndex:"createTime",renderer:formatDate,width:120},
		{header:C_AUDIT_BY,dataIndex:"prChecker",renderer:HTStore.getUSER},
		{header:C_AUDIT_TIME,dataIndex:"prCheckDate",renderer:formatDate,width:120},
		{header:C_REMARKS,width:200,dataIndex:"prRemarks"}
		],defaults:{sortable:false,width:100}});
	var rowCtxEvents={
		rowdblclick:function(grid, rowIndex, event){
			var c= grid.getSelectionModel().getSelected();if(c){this.showPr(c);}
		}
	};
	var kw = new Ext.form.TextField({
		emptyText:'请输入付款申请号..',
		listeners:{scope:this,
			specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();
			}
		}
	});
    this.fastSearch=function(){
         var prNo=kw.getValue();
        if(!prNo){
        	XMG.alert(SYS,t=='R'?M_INPUT_PR_R_NO:M_INPUT_PR_P_NO,function(b){kw.focus();});
        	return;
        };
        var a=[];        
        var c=prNo.indexOf(',');
        var b=prNo.indexOf('..');
        if(c>=0){
            a[a.length]={key:'prNo',value:prNo,op:IN};
        }
        else if(b>=0){
            var ra=prNo.split('..');
            a[a.length]={key:'prNo',value:ra[0],op:GE};
            a[a.length]={key:'prNo',value:ra[1],op:LE};
        }
        a[a.length]={key:'prNo',value:prNo,op:LI};
        store.baseParams={_A:'PR_X',_A:'PR_X',_mt:'json',xml:HTUtil.QATJ(a)};
        store.reload({params:{start:0,limit:C_PS30},callback:function(r){
        	if(r.length==0) 
        		XMG.alert(SYS,M_NOT_FOUND);
        	}
        });
    };
    var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch}; 
    var b9={text:C_RESET,iconCls:'refresh',handler:this.reset};
   
	Fos.PrGrid.superclass.constructor.call(this, {
	    id:'G_PR_'+t,iconCls:'gen',store: store,title:t=='R'?C_PR_R_MGT:C_PR_P_MGT,header:false,autoScroll:true,height:300,
		sm:sm,cm:cm,stripeRows:true,closable:true,listeners:rowCtxEvents,
		tbar:[{text:C_ADD,iconCls:'add',disabled:NR(M1_SET+(t=='R'?S_PR_R:S_PR_P)+F_ADD),scope:this,handler:this.add}, '-', 
			{text:C_EDIT,iconCls:'option',disabled:NR(M1_SET+(t=='R'?S_PR_R:S_PR_P)+F_UP),scope:this,handler:this.edit},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(M1_SET+(t=='R'?S_PR_R:S_PR_P)+F_M),handler:this.removePr},'-',
			{text:C_COMPLAX_SEARCH,iconCls:'search',handler:this.search},'-',
			kw,b8,'-',
			b9,'-'],
		bbar:PTB(store,C_PS30)
	});
};    
Ext.extend(Fos.PrGrid,Ext.grid.GridPanel);

//付款申请-账单列表
Fos.PrItemGrid = function(p){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PRIT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SPrItem',id:'id'},SPrItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	if(p.get('rowAction')!='N') store.load({params:{prId:p.get('id')}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_INVO_NO,width:120,dataIndex:'invoNo'},
		{header:C_TAX_NO,width:100,dataIndex:'invoTaxNo'},		
		{header:C_INVO_AMOUNT,width:100,align:'right',renderer:numRender,dataIndex:'invoAmount'},
		{header:C_WRITEOFFED_AMOUNT,width:100,align:'right',renderer:numRender,dataIndex:'invoAmountWriteOff'},
		{header:C_PAY_AMOUNT_C,width:120,align:'right',renderer:numRender,dataIndex:'prAmount',editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''})},
		{header:C_CURR,dataIndex:'currCode'},
		{header:C_EX_RATE,dataIndex:'invoExRate',renderer:rateRender},
		{header:C_INVO_DATE,dataIndex:'invoDate',renderer:formatDate,width:120},
		{header:C_DUE_DATE,dataIndex:'invoDueDate',renderer:formatDate,width:120},
		{header:C_BILL_BY,dataIndex:'invoIssuer'},
		{header:C_BILL_DATE,dataIndex:'invoIssueDate',renderer:formatDate,width:120},
		{header:C_AUDIT_BY,dataIndex:'invoChecker'},
		{header:C_AUDIT_TIME,dataIndex:'invoCheckDate',renderer:formatDate,width:120}
		],defaults:{sortable:false,width:80}});
	this.recalculate=function(){
		var t = Ext.getCmp('T_PR_'+ p.get('id'));
		var total = 0;var d=store.getRange();
		for(var i=0;i<d.length;i++){
			if(d[i].get('currCode')==p.get('currCode')) total=total+d[i].get('prAmount');
			else total=total+HTUtil.round2(d[i].get('prAmount')*d[i].get('invoExRate')/p.get('prExRate'));
		};
		t.find('name','prAmount')[0].setValue(total);
	};
	
	this.add=function(){
		if(p.get('custId') && p.get('currCode')){
    		var win = new Fos.PrItemLookupWin(p.get('custId'),p.get('prType'),p.get('currCode'));
			win.addButton({text:C_OK,scope:this,handler:function(){
				var g = win.findById('G_PRIT_LOOKUP');
				var r = g.getSelectionModel().getSelections();
				if(r.length==0){
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
					return ;
				}
				if(r){
					var rn = store.getCount();
					for(var i=0;i<r.length;i++){
						if(store.findBy(function(rec,id){return rec.get('invoId')==r[i].get('id');})==-1){
							var amount = HTUtil.round2(r[i].get('invoAmount'));
							var item = new SPrItem({
								prId:p.get('id'),
								invoId:r[i].get('id'),
								invoNo:r[i].get('invoNo'),
								invoTaxNo:r[i].get('invoTaxNo'),
								invoDate:r[i].get('invoDate'),
								invoDueDate:r[i].get('invoDueDate'),
								invoAmount:r[i].get('invoAmount'),
								invoAmountWriteOff:r[i].get('invoAmountWriteOff'),
								prAmount:r[i].get('invoAmount')-r[i].get('invoAmountWriteOff'),
								currCode:r[i].get('currCode'),invoExRate:r[i].get('invoExRate'),
								custName:r[i].get('custName'),custSname:r[i].get('custSname'),
								invoIssuer:r[i].get('invoIssuer'),invoIssueDate:r[i].get('invoIssueDate'),
								invoChecker:r[i].get('invoChecker'),invoCheckDate:r[i].get('invoCheckDate'),
								uuid:HTUtil.UUID(32)
							});
							store.insert(0,item);
							item.set('rowAction','N');
						}
					};
					this.recalculate();
					win.close();
				}else{
					Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
				}
			}},this);
			win.addButton({text:C_CANCEL,handler : function(){win.close();}},this);
			win.show();
		}
		else{XMG.alert(SYS,M_SEL_SETTLE_OBJ_CURR);}
	};
	this.removePrit=function(){
		var r = sm.getSelections();
		if(r.length){				
			for(var i=0;i<r.length;i++){					
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				store.remove(r[i]);}
			this.recalculate();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	Fos.PrItemGrid.superclass.constructor.call(this,{id:'G_PR_I',border:false,autoScroll:true,clicksToEdit:1,store:store,sm:sm,cm:cm,height:350,
    listeners:{scope:this,afteredit:function(e){
    	var f=e.field;var r=e.record;
    	if(f=='prAmount'){
			if(e.value>r.get('invoAmount')-r.get('invoAmountWriteOff')){
				XMG.alert(SYS,M_PR_OVER,function(){
				r.set('prAmount',e.originalValue);
				e.grid.stopEditing();e.grid.startEditing(e.row,e.column);});
			}
			else{r.set('prAmount',e.value);this.recalculate();}
    	}
    }},
    tbar:[{text:C_ADD,iconCls:'add',disabled:p.get('prStatus')!='0',scope:this,handler:this.add}, '-', 		
		{text:C_REMOVE,iconCls:'remove',disabled:p.get('prStatus')!='0',scope:this,handler:this.removePrit
	}]});
};    
Ext.extend(Fos.PrItemGrid,Ext.grid.EditorGridPanel);

//账单列表选择项
Fos.PrItemLookupWin = function(c,t,curr) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'INVO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoice',id:'id'},SInvoice),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
    store.load({params:{custId:c,invoType:t,currCode:curr,invoPrFlag:'0'}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
		{header:C_INVO_NO,dataIndex:"invoNo"},
		{header:C_TAX_NO,dataIndex:"invoTaxNo"},
		{header:C_SETTLE_OBJECT,dataIndex:"custName"},		
		{header:C_AMOUNT,width:80,dataIndex:"invoAmount"},		
		{header:C_CURR,dataIndex:'currCode'},
		{header:C_INVO_DATE,dataIndex:'invoDate',renderer:formatDate},	
		{header:C_DUE_DATE,dataIndex:'invoDueDate',renderer:formatDate},	
		{header:C_BANK,dataIndex:'invoBank'},
		{header:C_BANK_ACCOUNT,dataIndex:'invoAccount'},
		{header:C_REMARKS,dataIndex:"invoRemarks"}
		],defaults:{sortable:false,width:100}});
    var g = new Ext.grid.GridPanel({
    	id:'G_PRIT_LOOKUP',iconCls:'gen',header:false,height:400,width:800,store:store,sm:sm,cm:cm,loadMask:true
    });	
    Fos.PrItemLookupWin.superclass.constructor.call(this,{title:C_SEL_INVO,modal:true,layout:'fit',width:800,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:[{layout:'fit',border:false,
        items: [g]}]});
};
Ext.extend(Fos.PrItemLookupWin,Ext.Window);

//新增付款申请
Fos.PrTab = function(p) {
    this.grid=new Fos.PrItemGrid(p);
	this.save=function(){
		if(p.get('custId')==''){
			XMG.alert(SYS,M_SETTLE_OBJECT_REQUIRED);
			return;
		};
		p.beginEdit();
		this.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('custName'))){
			Ext.Msg.alert(SYS,M_SEL_SETTLE_OBJ,function(){this.custName.focus();},this);return;};
		p.endEdit();
   	 	var xml = HTUtil.RTX(p,'SPr',SPr);
   	 	var a = this.grid.getStore().getModifiedRecords();
		if(a.length>0){
			var x = HTUtil.ATX(a,'SPrItem',SPrItem);
			xml=xml+x;
		};
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'PR_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'SPr',SPr);
				var ra=p.get('rowAction');
				var f = SPr.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){				
					this.setTitle((p.get('prType')=='R'?C_PR_R:C_PR_P)+'-'+p.get("prNo"));
					this.find('name','prNo')[0].setValue(p.get('prNo'));
					p.set('rowAction','M');
				}
				p.endEdit();
				var sa = this.grid.getStore();
				var a = HTUtil.XTRA(res.responseXML,'SPrItem',SPrItem);
				HTUtil.RUA(sa,a,SPrItem);
				this.updateToolBar();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
	};
	this.removePr=function(){
		p.set('rowAction','R');
		var xml = HTUtil.RTX(p,'SPr',SPr);
   	 	var a = this.grid.getStore().getRange();
		if(a.length>0){
			for(var i=0;i<a.length;i++){
				a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
			};
			var x = HTUtil.ATX(a,'SPrItem',SPrItem);
			xml=xml+x;
		};
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'PR_S'},
			success: function(r){XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(xml)
		});
	};
	this.submit=function(){this.updateStatus('1');};
	this.uncheck0=function(){this.updateStatus('0');};
	this.check=function(){this.updateStatus('2');};
	this.uncheck=function(){this.updateStatus('1');};	
	this.check1=function(){this.updateStatus('3');};
	this.uncheck1=function(){this.updateStatus('2');};	
	this.cancel=function(){this.updateStatus('5');};
	this.send=function(){this.updateStatus('1');};
	this.back=function(){this.updateStatus('2');};
	this.arrive=function(){this.updateStatus('3');};
	this.fail=function(){this.updateStatus('4');};	
	this.pay=function(){
		var rid=getNextId();
		var e = new SVoucher({voucNo:'N'+rid,currCode:p.get('currCode'),
			voucType:p.get('prType'),voucDate:new Date(),voucExRate:HTStore.getExRate(p.get('currCode'),'CNY'),
			custId:p.get('custId'),custName:p.get('custName'),custSname:p.get('custSname'),custBank:p.get('custBank'),custAccount:p.get('custAccount'),
			voucBank:p.get('prBank'),voucAccount:p.get('prAccount'),voucAmount:p.get('prAmount'),voucWriteOffAmount:p.get('prAmount'),voucFixAmount:0,
			voucPaymentType:p.get('prPaymentType'),voucUploadFlag:'0',
			voucStatus:'0',voucWriteOffStatus:'0',version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			createWindow('VOCU_'+e.get("id"),(p.get('prType')=='R'?C_VOUC_R:C_VOUC_P)+e.get('voucNo'),new Fos.VoucherTab(e,p.get('prId')),true);		
	};	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'PR_U',prId:p.get('id'),prStatus:s},
			success: function(r){
				p.beginEdit();p.set('prStatus',s);p.set('version',p.get('version')+1);p.endEdit();
				this.updateToolBar();XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};
	var b1={itemId:'TB_1',text:C_SAVE,iconCls:'save',
			disabled:NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')!='0',
			scope:this,handler:this.save};
	var b2={itemId:'TB_2',text:C_REMOVE,iconCls:'remove',
			disabled:NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')!='0'||p.get('rowAction')=='N',
			scope:this,handler:this.removePr};
	var b3={itemId:'TB_3',text:C_SEND_BANK,iconCls:'out',
			disabled:NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='0',
			scope:this,handler:this.send};
	var b4={itemId:'TB_4',text:C_BACK_BANK,iconCls:'in',
			disabled:NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1',
			scope:this,handler:this.back};
	var b5={itemId:'TB_5',text:C_ARRIVE_BANK,iconCls:'dollar',
			disabled:NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1',
			scope:this,handler:this.arrive};
	var b6={itemId:'TB_6',text:C_RECEIPT_FAILED,iconCls:'cancel',
			disabled:NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1',
			scope:this,handler:this.fail};
	var b7={itemId:'TB_7',text:C_COMMIT,iconCls:'check',
			disabled:NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='0'||p.get('rowAction')=='N',
			scope:this,handler:this.submit};
	var b8={itemId:'TB_8',text:C_FIN_CHECK,iconCls:'check',
			disabled:NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='1',
			scope:this,handler:this.check};
	var b9={itemId:'TB_9',text:C_CANCEL_AUDIT,tooltip:C_FIN_CHECK_CANCEL,iconCls:'renew',
			disabled:NR(M1_SET+S_PR_P)||p.get('prStatus')!='2',
			scope:this,handler:this.uncheck};
	var b10={itemId:'TB_10',text:C_MANAGER_CHECK,iconCls:'check',
			disabled:NR(M1_SET+S_PR_P)||p.get('prStatus')!='2',
			scope:this,handler:this.check1};
	var b11={itemId:'TB_11',text:C_CANCEL_AUDIT,tooltip:C_MANAGER_CHECK_CANCEL,iconCls:'renew',
			disabled:NR(M1_SET+S_PR_P)||p.get('prStatus')!='3',
			scope:this,handler:this.uncheck1};
	var b12={itemId:'TB_12',text:p.get('prType')=='R'?C_WRITEOFF_P:C_WRITEOFF_P,iconCls:'dollar',
			disabled:NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P))||p.get('prStatus')!='3',
			scope:this,handler:this.pay};
	var b13={itemId:'TB_13',text:C_INVALID,iconCls:'cancel',
			disabled:NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')=='0',
			scope:this,handler:this.cancel};
	var b14={itemId:'TB_14',text:C_EXPORT,iconCls:'print',												//付款申请输出
				disabled:NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)
			};
	var b15={itemId:'TB_15',
			disabled:true,text:C_STATUS_C+HTStore.getPRST(p.get('prStatus'))};
	var b16={itemId:'TB_16',text:C_COMMIT_CANCEL,tooltip:C_COMMIT_CANCEL,iconCls:'renew',
			disabled:NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='1',
			scope:this,handler:this.uncheck0};
	this.updateToolBar = function(){
		tb=this.getTopToolbar();
		tb.getComponent('TB_1').setDisabled(NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')!='0');
    	tb.getComponent('TB_2').setDisabled(NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')!='0'||p.get('rowAction')=='N');
    	if(p.get('prType')=='R'){
	    	tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='0');
	    	tb.getComponent('TB_4').setDisabled(NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1');
	    	tb.getComponent('TB_5').setDisabled(NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1');
	    	tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_PR_R+F_M)||p.get('prStatus')!='1');
    	}
    	if(p.get('prType')=='P'){
	    	tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='0'||p.get('rowAction')=='N');
	    	tb.getComponent('TB_8').setDisabled(NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='1');
	    	tb.getComponent('TB_9').setDisabled(NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='2');
	    	tb.getComponent('TB_10').setDisabled(NR(M1_SET+S_PR_P)||p.get('prStatus')!='2');
	    	tb.getComponent('TB_11').setDisabled(NR(M1_SET+S_PR_P)||p.get('prStatus')!='3');
	    	tb.getComponent('TB_16').setDisabled(NR(M1_SET+S_PR_P+F_M)||p.get('prStatus')!='1');
    	}
    	tb.getComponent('TB_12').setDisabled(NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P))||p.get('prStatus')!='3');
    	tb.getComponent('TB_13').setDisabled(NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M)||p.get('prStatus')!='0');
    	tb.getComponent('TB_14').setDisabled(NR(M1_SET+(p.get('prType')=='R'?S_PR_R:S_PR_P)+F_M));
    	tb.getComponent('TB_15').setText(C_STATUS_C+p.get('prType')=='R'?HTStore.getERST(p.get('prStatus')):HTStore.getPRST(p.get('prStatus')));
    };
	Fos.PrTab.superclass.constructor.call(this, {id:'T_PR_'+p.get('id'),
		title:(p.get('rowAction')=='N'?'新增':'编辑')+(p.get('prType')=='R'?C_PR_R:C_PR_P),
		autoScroll:true,labelAlign:'right',closable:true,labelWidth:80,border:false,width:800,layout:'border',iconCls:'gen',
		tbar:p.get('prType')=='R'?[b1,'-',b2,'-',b3,'-',b4,'-',b5,'-',b6,'-',b12,'-',b13,'-',b14,'-','->','-',b15,'-']:
			[b1,'-',b2,'-',b7,b16,'-',b8,b9,'-',b10,b11,'-',b12,'-',b13,'-',b14,'-','->','-',b15,'-'],
		items:[{region:'north',height:180,layout:'column',layoutConfig:{columns:4},
				title:p.get('prType')=='R'?C_PR_R_INFO:C_PR_P_INFO,collapsible:true,frame:true,
	    	items:[{columnWidth:.5,layout:'form',border:false,items:[
		        	{fieldLabel:C_SETTLE_OBJECT,itemCls:'required',tabIndex:1,ref:'../../custName',
					   	 name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
						 xtype:'customerLookup',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
						 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
						 anchor:'95%',
						 listeners:{scope:this,select:function(c,r,i){
						p.set('custId',r.get('id'));
						p.set('custName',r.get('custNameCn'));
						p.set('custBankCny',r.get('custBankCny'));
						p.set('custAccountCny',r.get('custAccountCny'));
						p.set('custBankUsd',r.get('custBankUsd'));
						p.set('custAccountUsd',r.get('custAccountUsd'));
						if(this.find('name','currCode')[0].getValue()=='CNY'){
							this.find('name','custBank')[0].setValue(p.get('custBankCny'));
							this.find('name','custAccount')[0].setValue(p.get('custAccountCny'));
						}
						else if(this.find('name','currCode')[0].getValue()=='USD'){
							this.find('name','custBank')[0].setValue(p.get('custBankUsd'));
							this.find('name','custAccount')[0].setValue(p.get('custAccountUsd'));
						};
					},
					keydown:{fn:function(f,e){LC(f,e,p.get('prType')=='R'?'custArFlag':'custApFlag');},buffer:500}}}
				]},
				{columnWidth:.25,layout:'form',labelWidth:100,border:false,items:[{fieldLabel:p.get('prType')=='R'?C_PR_NO_R:C_PR_NO_P,tabIndex:2,name:'prNo',value:p.get('prNo'),xtype:'textfield',anchor:'90%'}]},
	        	{columnWidth:.25,layout:'form',labelWidth:100,border:false,items: [{fieldLabel:p.get('prType')=='R'?C_PR_DATE_R:C_PR_DATE_P,tabIndex:3,name:'prDate',value:p.get('prDate'),xtype:'datefield',format:DATEF,anchor:'90%'}]},
	    		{columnWidth:.25,layout:'form',border:false,items:[
	         		{fieldLabel:C_CURR,itemCls:'required',disabled:true,tabIndex:4,name:'currCode',
	         			value:p.get('currCode'),store:HTStore.getCURR_S(),xtype:'combo',displayField:'currCode',
	         			valueField:'currCode',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	           		{fieldLabel:C_BANK,tabIndex:8,name:'prBank',value:p.get('prBank'),
	         				store:HTStore.getCOBA_S(),xtype:'combo',displayField:'cobaBank',
	         				valueField:'cobaBank',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	            		listeners:{scope:this,select:function(c,r,i){
	         			this.find('name','prAccount')[0].setValue(r.get('cobaAccount'));}}}]},
	         	{columnWidth:.25,layout:'form',border:false,
	                items: [{fieldLabel:C_EX_RATE,tabIndex:5,name:'prExRate',value:p.get('prExRate'),disabled:p.get('currCode')=='CNY',xtype:'numberfield',decimalPrecision:4,anchor:'90%'},
	                {fieldLabel:C_BANK_ACCOUNT,tabIndex:9,name:'prAccount',value:p.get('prAccount'),xtype:'textfield',anchor:'90%'}]},
	            {columnWidth:.25,layout: 'form',border : false,labelWidth:100,
	                items: [{fieldLabel:HL(C_AMOUNT),tabIndex:6,name:'prAmount',value:p.get('prAmount'),xtype:'numberfield',anchor:'90%'},
	                        {fieldLabel:C_CUST_BANK,tabIndex:10,name:'custBank',value:p.get('custBank'),xtype:'textfield',anchor:'90%'}]
	             },
	            {columnWidth:.25,layout: 'form',border : false,labelWidth:100,
	                items: [{fieldLabel:C_SEWA,tabIndex:7,name:'prPaymentType',
	                	value:p.get('prPaymentType'),store:HTStore.getSEWA_S(),xtype:'combo',
	                	displayField:'sewaName',valueField:'id',typeAhead:true,mode:'local',
	                	triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	                {fieldLabel:C_CUST_BANK_ACCOUNT,tabIndex:11,name:'custAccount',value:p.get('custAccount'),xtype:'textfield',format:DATEF,anchor:'90%'}]},
	            {columnWidth:.99,layout:'form',border:false,items:[{fieldLabel:C_REMARKS,name:'prRemarks',value:p.get('prRemarks'),tabIndex:12,xtype:'textarea',anchor:'99%'}]}
	            ]},
			{title:C_INVO_LIST,layout:'fit',region:'center',deferredRender:false,items:this.grid}			//付款申请-账单列表
	        ]
	});
};
Ext.extend(Fos.PrTab, Ext.FormPanel);

//发票号码管理
Fos.InvoNoGrid = function() {
	var bp={_A:'INNO_Q',_mt:'json'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInvoiceNo',id:'id'},SInvoiceNo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load();
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_INNO_PREFIX,dataIndex:'innoPrefix',editor:new Ext.form.TextField()},
	{header:C_INNO_START,dataIndex:'innoStartNo',editor:new Ext.form.NumberField()},
	{header:C_INNO_END,dataIndex:'innoEndNo',editor:new Ext.form.NumberField()},
	{header:C_INNO_NEXT,dataIndex:'innoNextNo',editor:new Ext.form.NumberField(),width:150},
	{header:C_ACTIVE,dataIndex:'active',renderer:function(v){return v==1?'Y':'N';}},
	{header:C_ACTIVE_DATE,dataIndex:'innoStartDate',renderer:formatDate}],defaults:{sortable:false,width:120}});
	this.add=function(){
		var r = new SInvoiceNo({innoPrefix:'',innoStartNo:'',innoEndNo:'',innoNextNo:'',
		innoStartDate:'',active:'0',version:'0',uuid:HTUtil.UUID(32)});
		store.insert(0,r);
		r.set('rowAction','N');
		sm.selectFirstRow();
		this.startEditing(0,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save=function(){
		HTUtil.POST(store,'SInvoiceNo',SInvoiceNo,'INNO_S');
	};
	this.active=function(){
		var b =sm.getSelected();
		if(b){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'INNO_U',id:b.get('id')},
			success: function(r){store.reload();XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	Fos.InvoNoGrid.superclass.constructor.call(this,{
		id:'G_INNO',title:C_INNO_MGT,closable:true,iconCls:'gen',
			border:false,height:200,autoScroll:true,sm:sm,cm:cm,store:store,
			sortInfo:{field:'id',direction:'DESC'},
			tbar:[{text:C_ADD,disabled:NR(M1_SET+S_INNO+F_M),iconCls:'add',scope:this,handler:this.add},'-',
				{text:C_REMOVE,disabled:NR(M1_SET+S_INNO+F_M),iconCls:'remove',scope:this,handler:this.del},'-',
				{text:C_SAVE,disabled:NR(M1_SET+S_INNO+F_M),iconCls:'save',
					handler:this.save},'-',
				{text:C_ACTIVE,disabled:NR(M1_SET+S_INNO+F_M),iconCls:'check',scope:this,handler:this.active},'-',
				{text:C_RESET,iconCls:'refresh',handler:this.reset},'-'
			]
	});
};
Ext.extend(Fos.InvoNoGrid, Ext.grid.EditorGridPanel);

//财务接口导出-被调用
Fos.ExhiWin = function() {
	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',items:[
    	{fieldLabel:C_EXHI_TYPE,id:'exhiType',xtype:'combo',store:EXHI_T_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
    	{fieldLabel:C_START_DATE,id:'exhiCheckDateF',xtype:'datefield',format:DATEF,anchor:'90%'},
    	{fieldLabel:C_END_DATE,id:'exhiCheckDateT',xtype:'datefield',format:DATEF,anchor:'90%'}]
    });
    Fos.ExhiWin.superclass.constructor.call(this, {title:C_EXHI_BATCH,modal:true,width:300,
        height:150,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm});
};
Ext.extend(Fos.ExhiWin,Ext.Window);

//财务接口导出
Fos.ExhiGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXHI_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TExportHistory',id:'id'},TExportHistory),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	store.load({params:{start:0,limit:C_PS30}});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
	{header:C_BATCH_NO,dataIndex:'id',width:80},
	{header:C_EXHI_TYPE,dataIndex:'exhiType',width:100,renderer:getEXHI_T},
	{header:C_START_DATE,dataIndex:'exhiCheckDateF',width:80},
	{header:C_END_DATE,dataIndex:'exhiCheckDateT',width:80},
	{header:C_EXHI_FILE,dataIndex:'exhiFileName',width:200,renderer:exhiRender},
	{header:C_CREATE_TIME,dataIndex:'createTime',width:80}],defaults:{sortable:false,width:100}});
	this.add=function(){
		var w = new Fos.ExhiWin();																	//财务接口导出
		w.addButton({text:C_OK,handler:function(){
			exhiType = w.findById('exhiType').getValue();
			exhiCheckDateF = w.findById('exhiCheckDateF').getValue().format(DATEF);
			exhiCheckDateT = w.findById('exhiCheckDateT').getValue().format(DATEF);	
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXHI_E',
				exhiType:exhiType,exhiCheckDateF:exhiCheckDateF,exhiCheckDateT:exhiCheckDateT},
				success: function(r){XMG.alert(SYS,M_S);store.reLoad({params:{start:0,limit:C_PS30}});},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
			});
			w.close();
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();
	};
	Fos.ExhiGrid.superclass.constructor.call(this,{
	id:'G_EXHI',title:C_EXHI_BATCH,closable:true,border:false,autoScroll:true,cm:cm,store:store,
	tbar:[{text:C_ADD,disabled:NR(M1_SET+S_INNO+F_M),iconCls:'add',scope:this,handler:this.add}],
	bbar:PTB(store,C_PS30)});
};
Ext.extend(Fos.ExhiGrid, Ext.grid.GridPanel);

//客户账户余额
Fos.BalaGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'BALA_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SBalance',id:'id'},SBalance),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	store.load({params:{start:0,limit:C_PS30}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:C_CUST_NAME,dataIndex:'custName',width:150},
	{header:C_CUST_SNAME,dataIndex:'custSname',width:120},
	{header:C_CURR,dataIndex:'currCode',width:80},
	{header:C_BALANCE,dataIndex:'balaAmount',width:100,renderer:numRender}],defaults:{sortable:false,width:100}});
	this.list=function(){
        var b = sm.getSelected();
        if(b){
        	var frm = new Fos.BaliWin(b);												//余额明细
        	frm.show();
        }else{
        	XMG.alert(SYS,M_NO_DATA_SELECTED);
        }
	};
	var rowCtxEvents = {rowdblclick: this.list};
	Fos.BalaGrid.superclass.constructor.call(this,{id:'G_BALA',iconCls:'gen',
		title:C_CUST_BALANCE,closable:true,border:false,autoScroll:true,cm:cm,sm:sm,store:store,
		listeners:rowCtxEvents,
		//tbar:[{text:C_BALA_LIST,iconCls:'',scope:this,handler:this.list}],
		bbar:PTB(store,C_PS30)
	});
};
Ext.extend(Fos.BalaGrid, Ext.grid.GridPanel);

//余额明细
Fos.BaliWin = function(b){
    var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VOUC_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SVoucher',id:'id'},SVoucher),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    
    var a=[];
    a[0]={key:'voucFixAmount',value:0,op:NE};
    a[1]={key:'custId',value:b.get('custId'),op:EQ};
    a[2]={key:'currCode',value:b.get('currCode'),op:EQ};
    var bp={_mt:'json',xml:HTUtil.QATJ(a)};
    store.baseParams=bp;
    store.load({params:{start:0,limit:C_PS30}});
    var cm=new Ext.grid.ColumnModel({columns:[
        new Ext.grid.RowNumberer(),
        {header:C_VOUC_NO,width:120,dataIndex:"voucNo"},
        {header:C_DATE,dataIndex:"voucDate",renderer:formatDate},
        {header:C_CHAR_TYPE,dataIndex:"voucType",renderer:function(v){return v=='R'?C_R:C_P;}},        
        {header:C_CURR,width:60,dataIndex:"currCode"},
        {header:C_FIX_AMOUNT,align:'right',renderer:numRender,dataIndex:"voucFixAmount"},
        {header:C_INVO_NO,dataIndex:"voucInvoiceNo"},
        {header:C_TAX_NO,dataIndex:"voucTaxInvoiceNo"},
        {header:C_REMARKS,dataIndex:"voucRemarks"}
        ],defaults:{sortable:false,width:80}});
    var g=new Ext.grid.GridPanel({store:store,autoScroll:true,cm:cm,stripeRows:true});
    Fos.BaliWin.superclass.constructor.call(this, {title:C_FIX_LIST,modal:true,width:600,
        height:400,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',layout:'fit',items:g}); 
};
Ext.extend(Fos.BaliWin,Ext.Window);

//费用分摊
Fos.ExalWin = function(store,p) {
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
			{header:C_CONS_NO,width:120,dataIndex:"consNo"},
          {header:C_SETTLE_OBJECT,width:120,dataIndex:"custSname"},
          {header:C_CHAR,dataIndex:"charName"},
          {header:C_UNIT,dataIndex:"unitName"},
          {header:C_QUANTITY,dataIndex:"expeNum",align:'right',renderer:rateRender},
          {header:C_UNIT_PRICE,dataIndex:"expeUnitPrice",align:'right',renderer:rateRender,width:100},
          {header:C_CURR,dataIndex:'currCode'},
          {header:C_EX_RATE,dataIndex:"expeExRate",align:'right',renderer:rateRender},
          {header:C_AMOUNT,dataIndex:"expeTotalAmount",align:'right',renderer:numRender},
          {header:C_COST_PRICE,dataIndex:"expeInnerPrice",align:'right',renderer:numRender},
          {header:C_COST_TOTAL,dataIndex:"expeInnerAmount",align:'right',renderer:numRender},
          {header:C_PPCC,dataIndex:'pateCode',width:40},
          {header:C_COMMISION_RATE,dataIndex:"expeCommissionRate",align:'right',renderer:rateRender},
          {header:C_COMMISION,dataIndex:"expeCommission",align:'right',renderer:numRender}],
          defaults:{sortable:false,width:80}});
	var expeGrid = new Ext.grid.GridPanel({region:'north',split:true,collapsible:true,title:C_EXPE_FOR_ALLOCATION,border:true,height:100,
		autoScroll:true,store:store,sm:sm,cm:cm});
	var consS = new Ext.data.Store({url: SERVICE_URL+'?A=CONS_X',baseParams:{mt:'JSON'},
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FConsign'}, FConsign)});
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm2=new Ext.grid.ColumnModel({columns:[sm,
 		{header:C_CONS_NO,width:120,dataIndex:"consNo"},
 		{header:C_BOOKER,width:200,dataIndex:"custSname"},
 		{header:C_CONS_DATE,dataIndex:"consDate",renderer:formatDate},	
 		{header:C_PACKAGES,width:60,dataIndex:"consTotalPackages",align:'right',css:'font-weight:bold;'},
 		{header:C_GROSS_WEIGHT,dataIndex:"consTotalGrossWeight",align:'right',css:'font-weight:bold;'},
 		{header:C_CBM,dataIndex:"consTotalMeasurement",align:'right',css:'font-weight:bold;'},
 		{header:C_VESS,dataIndex:"vessName"},
 		{header:C_VOYA,dataIndex:"voyaName"},
 		{header:C_MBL_NO,dataIndex:"consMblNo"},
 		{header:C_HBL_NO,dataIndex:"consHblNo"},
 		{header:C_SAIL_DATE,dataIndex:"consShipDate",renderer:formatDate},	
 		{header:C_POL,width:100,dataIndex:"consPolEn"},
 		{header:C_POD,width:100,dataIndex:"consPodEn"},
 		{header:C_POT,width:100,dataIndex:"consPotEn"},
 		{header:C_CARRIER,width:200,dataIndex:"consCarrierName"},
 		{header:C_BOOK_AGENCY,width:200,dataIndex:"consBookingAgencyName"},
 		{header:C_M_CONS_NO,dataIndex:"consMasterConsNo"},
 		{header:C_REMARKS,dataIndex:"consRemarks"}],defaults:{sortable:false,width:80}});
 	this.impChild=function(){
		var s = new Ext.data.Store({url: SERVICE_URL+'?_A=CONS_X',baseParams:{_mt:'json'},
	    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FConsign'}, FConsign)});
		s.load({params:{consMasterFlag:0,consMasterId:p.get('id')},scope:this,callback:function(r){
			if(r.length){
				for(var i=0;i<r.length;i++){
					if(store.findBy(function(rec,id){return rec.get('id')==r[i].get('id');})==-1&&
					   consS.findBy(function(rec,id){return rec.get('id')==r[i].get('id');})==-1){
						consS.insert(exalS.getTotalCount(),r[i]);
					}
				}
				this.reCalculate();
			} 
			else XMG.alert(SYS,M_NOT_FOUND);}});
	};
	this.impVoyCons=function(){
		var s = new Ext.data.Store({url: SERVICE_URL+'?_A=CONS_X',baseParams:{_mt:'json'},
	    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FConsign'}, FConsign)});
		s.load({params:{vessName:p.get('vessName'),voyaName:p.get('voyaName')},scope:this,callback:function(r){
			if(r.length){
				for(var i=0;i<r.length;i++){
					if(store.findBy(function(rec,id){return rec.get('id')==r[i].get('id');})==-1
						&&consS.findBy(function(rec,id){return rec.get('id')==r[i].get('id');})==-1){
						consS.insert(0,r[i]);
					}
				}
				this.reCalculate();
			} 
			else XMG.alert(SYS,M_NOT_FOUND);}});
	};
	sumC = new Ext.form.TextField({width:120,disabled:true});
	sumG = new Ext.form.TextField({width:120,disabled:true});
	sumP = new Ext.form.TextField({width:120,disabled:true});
	sumM = new Ext.form.TextField({width:120,disabled:true});
	this.c=0;this.g=0;this.p=0;this.m=0;
	this.reCalculate=function(){
		var c=0;var g=0;var p=0;var m=0;
		var a=consS.getRange();
		for(var i=0;i<a.length;i++){
			c=c+1;
			g=g+a[i].get('consTotalGrossWeight');
			p=p+a[i].get('consTotalPackages');
			m=m+a[i].get('consTotalMeasurement');
		}
		sumC.setValue(c);
		sumG.setValue(g);
		sumP.setValue(p);
		sumM.setValue(m);
		this.c=c;this.p=p;this.g=g;this.m=m;
	};
	this.removeCons=function(){
		var r = sm2.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){consS.remove(r[i]);this.reCalculate();}			
		}
		else XMG.alert(SYS,M_R_P);
	};
	this.allocate=function(t){
		var a=store.getRange();
		var r=consS.getRange();
		if(r.length){
			var unitPrice=0;var unm=0;var totalAmount=0;var innerPrice=0;var innerAmount=0;var base=0;			
			for(var j=0;j<r.length;j++){				
				if(t=='C'){
					num=1;base=this.c;
				}
				else if(t=='G'){
					num=r[j].get('consTotalGrossWeight');base=this.g;
				}
				else if(t=='P'){
					num=r[j].get('consTotalPackages');base=this.p;
				}
				else if(t=='M'){
					num=r[j].get('consTotalMeasurement');base=this.m;
				}
				unitPrice=a[0].get('expeTotalAmount')/base;
				innerPrice=a[0].get('expeInnerAmount')/base;
				totalAmount=unitPrice*num;					
				innerAmount=innerPrice*num;
				var e = new SExpense({});
				var f = SExpense.prototype.fields;
				for (var i=0;i<f.keys.length;i++){var fn=''+f.keys[i];e.set(fn,a[0].get(fn));}
				e.set('id','');
				e.set('expeUnitPrice',unitPrice);e.set('expeNum',num);e.set('expeTotalAmount',totalAmount);e.set('expeNum2',1);
				e.set('expeInnerPrice',innerPrice);e.set('expeInnerAmount',innerAmount);				
				e.set('consId',r[j].get('consId'));e.set('consNo',r[j].get('consNo'));
				e.set('consMblNo',r[j].get('consMblNo'));e.set('consHblNo',r[j].get('consHblNo'));
				e.set('consVessel',r[j].get('consVessel'));e.set('consVoyage',r[j].get('consVoyage'));
				e.set('consSailDate',r[j].get('consSailDate'));e.set('consBizClass',r[j].get('consBizClass'));
				e.set('consBizType',r[j].get('consBizType'));e.set('consShipType',r[j].get('consShipType'));
				e.set('consCustId',r[j].get('custId'));e.set('consCustName',r[j].get('custName'));
				e.set('version','1');e.set('expeInvoiceNo','');e.set('expeInvoiceDate','');
				e.set('expeInvoiceAmount',0);e.set('expeWriteOffAmount',0);
				e.set('expeWriteOffRcAmount',0);e.set('expeStatus',0);e.set('expeBillStatus',0);e.set('expeInvoiceStatus',0);
				e.set('expeWriteoffStatus',0);e.set('expeAllocationFlag',0);e.set('expeAllocatedFlag',1);
				e.set('expeIdM',p.get('expeId'));e.set('consIdM',p.get('consId'));e.set('consNoM',p.get('consNo'));
				e.set('uuid',HTUtil.UUID(32));
				exalS.insert(exalS.getTotalCount(),e);e.set('rowAction','N');
			}			
		}
		else XMG.alert(SYS,C_SEL_ALLOCATION_CONS);
	};
	this.save=function(){
		var a = exalS.getRange();
		if(a.length){
			var x = HTUtil.ATX(a,'SExpense',SExpense);
			var ra=store.getRange();
			var r=ra[0];
			r.set('expeAllocationFlag',1);
			r.set('rowAction','M');
			x=x+HTUtil.RTX(r,'SExpense',SExpense);
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
				success: function(res){
					var ra = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
					HTUtil.RUA(exalS,ra,SExpense);
					XMG.alert(SYS,M_S);},
				failure: function(res){XMG.alert(SYS,M_F+res.responseText);},
				xmlData:HTUtil.HTX(x)
			});
		}
		else XMG.alert(SYS,M_NC);
	};
	var tb1={xtype:'tbtext',text:C_SUM_CONS};
	var tb2={xtype:'tbtext',text:C_SUM_PACK};
	var tb3={xtype:'tbtext',text:C_SUM_GW};
	var tb4={xtype:'tbtext',text:C_SUM_CBM};
 	var consGrid = new Ext.grid.GridPanel({region:'center',collapsible:true,title:C_CONS_FOR_ALLOCATION,border:true,height:100,
		autoScroll:true,store:consS,sm:sm2,cm:cm2,
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addCons},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeCons},'-',
			{text:C_IMP_CHILD,iconCls:'save',scope:this,handler:this.impChild},'-',
			{text:C_IMP_VOY_CONS,iconCls:'save',scope:this,handler:this.impVoyCons},'-',
			{text:C_ALLOCATION,iconCls:'copy',scope:this,menu: {items: [
              	{text:C_BY_CONS,iconCls:'copy',disabled:false,scope:this,handler:function(){this.allocate('C');}},
  				{text:C_BY_GW,iconCls:'copy',disabled:false,scope:this,handler:function(){this.allocate('G');}},
  				{text:C_BY_PACK,iconCls:'copy',disabled:false,scope:this,handler:function(){this.allocate('P');}},
  				{text:C_BY_CBM,iconCls:'copy',disabled:false,scope:this,handler:function(){this.allocate('M');}}
              	]}}
			],
		bbar:[tb1,sumC,'-',tb2,sumP,'-',tb3,sumG,'-',tb4,sumM]
 	});
 	
 	this.removeExal=function(){
		var r = sm3.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){exalS.remove(r[i]);this.reCalculate();}			
		}
		else XMG.alert(SYS,M_R_P);
	};
 	var exalS= new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
 	
 	var sm3=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm3=new Ext.grid.ColumnModel({columns:[sm,
	       {header:C_CONS_NO,width:120,dataIndex:"consNo"},
          {header:C_SETTLE_OBJECT,width:100,dataIndex:"custSname"},
          {header:C_CHAR,width:80,dataIndex:"charName"},
          {header:C_UNIT,dataIndex:"unitName"},
          {header:C_QUANTITY,dataIndex:"expeNum",align:'right',renderer:rateRender},
          {header:C_UNIT_PRICE,width:100,dataIndex:"expeUnitPrice",align:'right',renderer:rateRender},
          {header:C_CURR,dataIndex:'currCode'},
          {header:C_EX_RATE,dataIndex:"expeExRate",align:'right',renderer:rateRender},
          {header:C_AMOUNT,width:80,dataIndex:"expeTotalAmount",align:'right',renderer:numRender},
          {header:C_COST_PRICE,width:80,dataIndex:"expeInnerPrice",align:'right',renderer:numRender},
          {header:C_COST_TOTAL,width:80,dataIndex:"expeInnerAmount",align:'right',renderer:numRender},
          {header:C_PPCC,dataIndex:'pateCode',width:40},
          {header:C_COMMISION_RATE,dataIndex:"expeCommissionRate",align:'right',renderer:rateRender},
          {header:C_COMMISION,dataIndex:"expeCommission",align:'right',renderer:numRender}],defaults:{sortable:false,width:60}});
	var exalGrid = new Ext.grid.GridPanel({region:'south',collapsible:true,split:true,title:C_EXPE_ALLOCATED,border:true,height:200,
		autoScroll:true,store:exalS,sm:sm3,cm:cm3,
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addCons},'-',
				{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeExal},'-',
				{text:C_SAVE,iconCls:'save',scope:this,handler:this.save}
				]});
	
	Fos.ExalWin.superclass.constructor.call(this, {title:C_EXPE_ALLOCATION,modal:true,width:800,height:600,maximizable:true,
		plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',layout:'border',items:[expeGrid,consGrid,exalGrid
		    ]}); 
};
Ext.extend(Fos.ExalWin, Ext.Window);

//选择币种弹出框
Fos.CurrencyWin = function(){
    Fos.CurrencyWin.superclass.constructor.call(this, {title:C_CURR_P,modal:true,width:185,resizable:false,
    	height:85,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:[
        {fieldLabel:C_CURR,id:'currCode',value:'CNY',allowBlank:false,store:HTStore.getCURR_S(),xtype:'combo',
        	displayField:'currCode',valueField:'currCode',typeAhead:true,mode:'remote',triggerAction:'all',
        	selectOnFocus:true,anchor:'99%'}]});
};
Ext.extend(Fos.CurrencyWin, Ext.Window);

//账单查询
Fos.InvoLookupWin = function(t) {
	var frmLookup = new Ext.form.FormPanel({labelWidth:70,labelAlign:"right",
    	items:[{id:'T_INVO_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:200,defaults:{bodyStyle:'padding:10px'},
            items:[{id:'T_INVO_LOOK_1',title:C_LOOK_BY_INVO_NO,layout:'form',
				items:[{fieldLabel:C_INVO_NO,name:'invoNo',xtype:'textarea',anchor:'90%'},
            	{boxLabel:C_LOOK_SMART,name:'invoNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
       			]},
       			{id:'T_INVO_LOOK_2',title:C_LOOK_BY_TAX_NO,layout:'form',
				items: [
					{fieldLabel:C_TAX_NO,name:'invoTaxNo',xtype:'textarea',anchor:'90%'},
					{boxLabel:C_LOOK_SMART,name:'invoTaxNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
				]},
        		{id:'T_INVO_LOOK_3',title:C_LOOK_COMPLEX,layout:'column',items:[
        			{columnWidth:.33,layout:'form',border:false,
	             	items:[
	             	{fieldLabel:C_SETTLE_OBJECT,tabIndex:1,name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
	             	xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	             	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,t='R'?'custArFlag':'custApFlag');},buffer:500}}},
	             	{fieldLabel:C_CURR,tabIndex:4,name:'currCode',store:HTStore.getCURR_S(),xtype:'combo',displayField:'currCode',
	             		valueField:'currCode',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
        			{fieldLabel:C_CONS_NO,name:'consNo',xtype:'textfield',anchor:'90%'},
        			{fieldLabel:C_BL_NO,name:'consMblNo',xtype:'textfield',anchor:'90%'},
        			{fieldLabel:C_INVO_STATUS,tabIndex:10,name:'invoStatus',store:HTStore.IVST_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
        			{fieldLabel:C_WRITEOFF_STATUS,name:'invoWriteOffStatus',xtype:'combo',store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'}
	             	]},
	             	{columnWidth:.33,layout:'form',border:false,
	             	items:[
	             	{fieldLabel:C_INVO_DATE,name:'invoDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_DUE_DATE,name:'invoDueDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_SAIL_DATE,name:'consSailDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_VESS,name:'vessName',store:HTStore.getVES(),enableKeyEvents:true,
	             		xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',
	             		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'90%',
	             		listeners:{scope:this,keydown:{fn:function(f,e){LV(f,e);},buffer:500}}},
	             	{fieldLabel:C_INVO_AMOUNT,name:'invoAmount',xtype:'numberfield',anchor:'90%'}
	             	]},
	             	{columnWidth:.34,layout:'form',border:false,
	             	items:[	             	
	             	{fieldLabel:C_TO,name:'invoDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_TO,name:'invoDueDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_TO,name:'consSailDate2',xtype:'datefield',format:DATEF,anchor:'90%'}	,
	             	{fieldLabel:C_VOYA,tabIndex:10,name:'voyaName',xtype:'textfield',anchor:'90%'},
	             	{fieldLabel:C_TO,name:'invoAmount2',xtype:'numberfield',anchor:'90%'}
	             	]}
	        	]}
        	]}
        ]
    });
    Fos.InvoLookupWin.superclass.constructor.call(this, {title:C_INVO_QUERY,iconCls:'search',modal:true,width:600,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmLookup}); 
};
Ext.extend(Fos.InvoLookupWin, Ext.Window);

//付款申请查询
Fos.PrLookupWin = function(t) {
	var frmLookup = new Ext.form.FormPanel({labelWidth:70,labelAlign:"right",
    	items:[{id:'T_PR_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:200,defaults:{bodyStyle:'padding:10px'},
            items:[{id:'T_PR_LOOK_1',title:t=='R'?C_LOOK_BY_PR_NO_R:C_LOOK_BY_PR_NO_P,layout:'form',
				items:[{fieldLabel:t=='R'?C_PR_NO_R:C_PR_NO_P,name:'prNo',xtype:'textarea',anchor:'90%'},
            	{boxLabel:C_LOOK_SMART,name:'prNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
       			]},
       			{id:'T_PR_LOOK_2',title:C_LOOK_BY_INVO_NO,layout:'form',
				items: [
					{fieldLabel:C_INVO_NO,name:'invoNo',xtype:'textarea',anchor:'90%'},
					{boxLabel:C_LOOK_SMART,name:'invoNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
				]},
				{id:'T_PR_LOOK_3',title:C_LOOK_BY_TAX_NO,layout:'form',
				items: [
					{fieldLabel:C_TAX_NO,name:'invoTaxNo',xtype:'textarea',anchor:'90%'},
					{boxLabel:C_LOOK_SMART,name:'invoTaxNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
				]},
        		{id:'T_PR_LOOK_4',title:C_LOOK_COMPLEX,layout:'column',items:[
        			{columnWidth:.33,layout:'form',border:false,
		             	items:[
			             	{fieldLabel:C_SETTLE_OBJECT,tabIndex:1,name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
			             	xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
			             	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,listeners:{scope:this,
								keydown:{fn:function(f,e){LC(f,e,t='R'?'custArFlag':'custApFlag');},buffer:500}}},
			             	{fieldLabel:C_CURR,tabIndex:4,name:'currCode',store:HTStore.getCURR_S(),xtype:'combo',
									displayField:'currCode',valueField:'currCode',typeAhead: true,
									mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
			             	{fieldLabel:C_SEWA,tabIndex:3,name:'prPaymentType',
			             		store:HTStore.getSEWA_S(),xtype:'combo',displayField:'sewaName',
			             		valueField:'sewaId',typeAhead: true,mode: 'local',triggerAction: 'all',
			             		selectOnFocus:true,anchor:'90%'},
			             	{fieldLabel:C_STATUS,tabIndex:3,name:'prStatus',store:t=='R'?HTStore.ERST_S:HTStore.PRST_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}
		             	]
	             	},
	             	{columnWidth:.33,layout:'form',border:false,
		             	items:[
			             	{fieldLabel:t=='R'?C_PR_DATE_R:C_PR_DATE_P,name:'prDate',xtype:'datefield',format:DATEF,anchor:'90%'},
			             	{fieldLabel:C_AMOUNT,name:'prAmount',xtype:'numberfield',anchor:'90%'},
			             	{fieldLabel:C_BANK,tabIndex:5,name:'prBank',store:HTStore.getCOBA_S(),
			             		xtype:'combo',displayField:'cobaBank',valueField:'cobaBank',
			             		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}
		             	]
	             	},
	             	{columnWidth:.34,layout:'form',border:false,
	             	items:[    	
		             	{fieldLabel:C_TO,name:'prDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
		             	{fieldLabel:C_TO,name:'prAmount2',xtype:'numberfield',anchor:'90%'},
		             	{fieldLabel:C_BANK_ACCOUNT,tabIndex:6,name:'prAccount',xtype:'textfield',anchor:'90%'}
	             	]}
	        	]}
        	]}
        ]
    });
    Fos.PrLookupWin.superclass.constructor.call(this,{title:t=='R'?C_PR_R_QUERY:C_PR_P_QUERY,iconCls:'search',
    	modal:true,width:700,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmLookup
    }); 
};
Ext.extend(Fos.PrLookupWin, Ext.Window);

//核销查询
Fos.VoucLookupWin = function(t) {
	var frmLookup = new Ext.form.FormPanel({labelWidth:70,labelAlign:"right",
    	items:[{id:'T_VOUC_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:200,defaults:{bodyStyle:'padding:10px'},
            items:[{id:'T_VOUC_LOOK_1',title:t=='R'?C_LOOK_BY_VOUC_NO_R:C_LOOK_BY_VOUC_NO_P,layout:'form',
				items:[{fieldLabel:'R'?C_VOUC_NO_R:C_VOUC_NO_P,name:'voucNo',xtype:'textarea',anchor:'90%'},
            	{boxLabel:C_LOOK_SMART,name:'voucNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
       			]},
       			{id:'T_VOUC_LOOK_2',title:C_LOOK_BY_INVO_NO,layout:'form',
				items: [
					{fieldLabel:C_INVO_NO,name:'invoNo',xtype:'textarea',anchor:'90%'},
					{boxLabel:C_LOOK_SMART,name:'invoNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
				]},
				{id:'T_VOUC_LOOK_3',title:C_LOOK_BY_TAX_NO,layout:'form',
				items: [
					{fieldLabel:C_TAX_NO,name:'invoTaxNo',xtype:'textarea',anchor:'90%'},
					{boxLabel:C_LOOK_SMART,name:'invoTaxNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
				]},
        		{id:'T_VOUC_LOOK_4',title:C_LOOK_COMPLEX,layout:'column',items:[
        			{columnWidth:.33,layout:'form',border:false,
	             	items:[
	             	{fieldLabel:C_SETTLE_OBJECT,tabIndex:1,name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
	             		xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',
	             		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	             		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,t='R'?'custArFlag':'custApFlag');},buffer:500}}},
	             	{fieldLabel:C_CURR,tabIndex:4,name:'currCode',store:HTStore.getCURR_S(),xtype:'combo',
	             			displayField:'currCode',valueField:'currCode',typeAhead: true,
	             			mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
	             	{fieldLabel:C_SEWA,tabIndex:7,name:'voucPaymentType',
	             		store:HTStore.getSEWA_S(),xtype:'combo',displayField:'sewaName',valueField:'sewaId',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'},
	             	{fieldLabel:C_CHECK_NO,tabIndex:10,name:'voucCheckNo',xtype:'textfield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_STATUS,tabIndex:13,name:'voucStatus',store:HTStore.VOST_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}]},
	             	{columnWidth:.33,layout:'form',border:false,
	             	items:[
	             	{fieldLabel:t=='R'?C_VOUC_DATE_R:C_VOUC_DATE_P,tabIndex:2,name:'voucDate',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_AMOUNT,name:'voucAmount',tabIndex:5,xtype:'numberfield',anchor:'90%'},
	             	{fieldLabel:C_WRITEOFF_AMOUNT,tabIndex:8,name:'voucWriteOffAmount',xtype:'numberfield',anchor:'90%'},
	             	{fieldLabel:C_BANK_RECEIPT_NO,tabIndex:11,name:'voucBankReciptNo',xtype:'textfield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_BANK,tabIndex:14,name:'voucBank',store:HTStore.getCOBA_S(),
	             		xtype:'combo',displayField:'cobaBank',valueField:'cobaBank',
	             		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}
	             	]},
	             	{columnWidth:.34,layout:'form',border:false,
	             	items:[
	             	{fieldLabel:C_TO,tabIndex:3,name:'voucDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
	             	{fieldLabel:C_TO,tabIndex:6,name:'voucAmount2',xtype:'numberfield',anchor:'90%'},
	             	{fieldLabel:C_TO,tabIndex:9,name:'voucWriteOffAmount2',xtype:'numberfield',anchor:'90%'},
	             	{fieldLabel:C_BANK_ACCOUNT,tabIndex:12,name:'voucAccount',xtype:'textfield',anchor:'90%'},
	             	{fieldLabel:C_WRITEOFF_NO,tabIndex:15,name:'voucWriteOffNo',xtype:'textfield',anchor:'90%'}
	             	]}
	        	]}
        	]}
        ]
    });
    Fos.VoucLookupWin.superclass.constructor.call(this, {title:t=='R'?C_VOUC_R_QUERY:C_VOUC_P_QUERY,iconCls:'search',modal:true,width:600,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmLookup}); 
};
Ext.extend(Fos.VoucLookupWin,Ext.Window);

//对账单查询
Fos.BillLookupWin = function(store,t) {
	var t1={id:'T_BILL_LOOK_1',title:C_LOOK_BY_BILL_NO,layout:'form',items:[
		{fieldLabel:C_BILL_NO,name:'billNo',xtype:'textarea',anchor:'90%'},
    	{boxLabel:C_LOOK_SMART,name:'billNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};
    var t2={id:'T_BILL_LOOK_2',title:C_LOOK_COMPLEX,layout:'column',items:[
		{columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
			{fieldLabel:C_BILL_OBJECT,tabIndex:1,name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
		    	xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',
		    	typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
		    	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,t=='R'?'custArFlag':'custApFlag');},buffer:500}}},		 	
			{fieldLabel:C_BILL_DATE,name:'billDate',xtype:'datefield',format:DATEF,anchor:'90%'},
			{fieldLabel:C_SAIL_DATE,name:'billSailDate',xtype:'datefield',format:DATEF,anchor:'90%'},
			{fieldLabel:C_CONS_NO,name:'billConsNo',xtype:'textfield',anchor:'90%'},
			{fieldLabel:C_VESS,tabIndex:5,name:'billVessel',store:HTStore.getVES(),enableKeyEvents:true,
		    	xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',
		    	typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'90%',
	     		listeners:{scope:this,keydown:{fn:function(f,e){LV(f,e);},buffer:500}}},
	     	{fieldLabel:C_STATUS,tabIndex:3,name:'billStatus',store:BIST_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}]},
		{columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
			{fieldLabel:C_CURR,tabIndex:4,name:'currCode',store:HTStore.getCURR_S(),xtype:'combo',
				displayField:'currCode',valueField:'currCode',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'},
			{fieldLabel:C_TO,name:'billDate2',xtype:'datefield',format:DATEF,anchor:'90%'},
			{fieldLabel:C_TO,name:'billSailDate2',xtype:'numberfield',anchor:'90%'},			
			{fieldLabel:C_BL_NO,name:'billBlNo',xtype:'textfield',anchor:'90%'},
			{fieldLabel:C_VOYA,tabIndex:35,name:'billVoyage',xtype:'textfield',anchor:'90%'}]}
		]};
	var tab = new Ext.TabPanel({id:'T_BILL_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:340,
		defaults:{bodyStyle:'padding:10px'},items:[t1,t2]});
	this.reload=function(){
		var xml = '';
     	var at = tab.getActiveTab();
     	var a=[];var op=1;
		a[0]={key:'billType',value:t,op:1};
       	if(at.getId()=='T_BILL_LOOK_1'){
       		var billNo=at.find('name','billNo')[0].getValue();
       		var billNoM=at.find('name','billNoM')[0].getValue();
       		var c=billNo.indexOf(',');
    		var b=billNo.indexOf('..');
    		if(c>=0){
    			a[1]={key:'billNo',value:billNo,op:IN};
    		}
    		else if(b>=0){
    			var ra=billNo.split('..');
    			a[1]={key:'billNo',value:ra[0],op:GE};
    			a[2]={key:'billNo',value:ra[1],op:LE};
    		}
    		else if(billNoM){
       			a[1]={key:'billNo',value:billNo,op:LI};
    		}
       	}
       	else if(at.getId()=='T_BILL_LOOK_2'){
       		var custId=at.find('name','custId')[0].getValue();
       		if(custId) a[a.length]={key:'custId',value:custId,op:op};
       		var currCode=at.find('name','currCode')[0].getValue();        		
       		if(currCode) a[a.length]={key:'currCode',value:currCode,op:op};
       		var billStatus=at.find('name','billStatus')[0].getValue();        		
       		if(billStatus) a[a.length]={key:'billStatus',value:billStatus,op:op};
       		var billConsNo=at.find('name','billConsNo')[0].getValue();        		
       		if(billConsNo) a[a.length]={key:'billConsNo',value:billConsNo,op:op};
       		var billBlNo=at.find('name','billBlNo')[0].getValue();        		
       		if(billBlNo) a[a.length]={key:'billBlNo',value:billBlNo,op:op};
       		var billVessel=at.find('name','billVessel')[0].getValue();        		
       		if(billVessel) a[a.length]={key:'billVessel',value:billVessel,op:op};
       		var billVoyage=at.find('name','billVoyage')[0].getValue();        		
       		if(billVoyage) a[a.length]={key:'billVoyage',value:billVoyage,op:op};
       		
       		var billDate=at.find('name','billDate')[0].getValue();
       		var billDate2=at.find('name','billDate2')[0].getValue();
       		if(billDate && billDate2){
       			a[a.length]={key:'billDate',value:billDate.format(DATEF),op:5};
       			a[a.length]={key:'billDate',value:billDate2.format(DATEF),op:3};
       		}
       		else if(billDate) a[a.length]={key:'billDate',value:billDate,op:op};        		
       		var billSailDate=at.find('name','billSailDate')[0].getValue();
       		var billSailDate2=at.find('name','billSailDate')[0].getValue();
       		if(billSailDate && billSailDate2){
       			a[a.length]={key:'billSailDate',value:billSailDate.format(DATEF),op:5};
       			a[a.length]={key:'billSailDate',value:billSailDate2.format(DATEF),op:3};
       		}
       		else if(billSailDate) a[a.length]={key:'billSailDate',value:billSailDate,op:op};       		
       	}
       	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};
    Fos.BillLookupWin.superclass.constructor.call(this, {title:C_BILL_QUERY,iconCls:'search',modal:true,width:600,height:300,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:tab,
		buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.BillLookupWin, Ext.Window);

//对账单-费用查询
Fos.ExSearchWin = function(c,t) {
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
    this.store.load({params:{custId:c,expeType:t,expeBillStatus:'0'}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:'费用类型',dataIndex:"expeType",width:80,renderer:function(v){if(v=='R'){return '收款'}else{return '付款'}}},
		{header:C_SETTLE_OBJECT,width:150,dataIndex:"custName"},
		{header:C_CONS_NO,width:130,dataIndex:"consNo"},
		{header:'手工单号',width:130,dataIndex:"consNoHandler"},
		{header:C_CHAR,width:80,dataIndex:"charName"},
		{header:C_UNIT,width:80,dataIndex:"unitName"},
		{header:C_QUANTITY,width:60,dataIndex:"expeNum"},
		{header:C_UNIT_PRICE,width:100,dataIndex:"expeUnitPrice"},		
		{header:C_AMOUNT,width:80,dataIndex:"expeTotalPrice"},
		{header:C_TOTAL_AMOUNT,width:80,dataIndex:"expeTotalAmount"},
		//{header:C_CURR,dataIndex:'currCode',width:100},	
		//{header:C_EX_RATE,width:80,dataIndex:"expeExRate"},
		{header:C_INVO_NO,width:100,dataIndex:"expeInvoiceNo"},
		{header:C_INVOICED_AMOUNT,width:100,dataIndex:"expeInvoiceAmount"},
		{header:C_WRITEOFFED_AMOUNT,width:100,dataIndex:"expeWriteOffAmount"},
		{header:C_REMARKS,width:100,dataIndex:"expeRemarks"}
		],defaults:{sortable:false,width:100}});
    this.grid = new Ext.grid.GridPanel({autoScroll:true,store:this.store,sm:sm,cm:cm,loadMask:true});	
	this.search=function(){
      	var a=[];var op=1;
		var custName=this.find('name','custName')[0].getValue();
		if(custName){
			a[a.length]={key:'custName',value:custName,op:op};
		}
		var consCustName=this.find('name','consCustName')[0].getValue();
		if(consCustName){
			a[a.length]={key:'consCustName',value:consCustName,op:op};
		}
		var consDate=this.find('name','consDate')[0].getValue();
		var consDate2=this.find('name','consDate2')[0].getValue();
		if(consDate && consDate2){
			a[a.length]={key:'consDate',value:consDate.format(DATEF),op:5};
			a[a.length]={key:'consDate',value:consDate2.format(DATEF),op:3};
		}else if(consDate){
			a[a.length]={key:'consDate',value:consDate,op:op};
		}
		var charId=this.find('name','charId')[0].getValue();
		if(charId){
			a[a.length]={key:'charId',value:charId,op:op};
		}
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
   		this.store.baseParams={_A:'EXPE_X',_mt:'json',xml:HTUtil.QATJ(a)};
     	this.store.reload({params:{start:0,limit:C_PS30},
     		callback:function(r){
     			if(r.length==0){
     				XMG.alert(SYS,M_NOT_FOUND);
     			}
     		}
     	});
	};
	//清空FORM
	this.clear=function(){this.form.getForm().reset();};
	this.form = new Ext.FormPanel({title:'',layout:'column',name:'sf',xtype:'form',height:60,padding:5,
				layoutConfig:{columns:4},region:'north',collapsible:false,frame:false,labelAlign:'right',
				items:[{columnWidth:.25,layout:'form',labelWidth:58,border:false,items:[
	            	{fieldLabel:C_BOOKER,tabIndex:1,name:'consCustName',store:HTStore.getCS(),enableKeyEvents:true,
		            	xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',
		            	typeAhead: true,mode: 'remote',triggerAction:'all',selectOnFocus:true,anchor:'90%',
		            	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		            	listeners:{scope:this,
		            		keydown:{
		            			fn:function(f,e){
		            				LC(f,e,t='R'?'custArFlag':'custApFlag');
		            			},buffer:500}
		            		}
	            	},
     				{fieldLabel:C_CHAR,tabIndex:5,name:'charId',store:HTStore.getCHAR_S(),
	            		xtype:'combo',displayField:'charName',valueField:'charId',
	            		typeAhead: true,tpl:charTpl,itemSelector:'div.list-item',editable:false,
	            		listWidth:300,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'}
     			]},
	        	{columnWidth:.25,layout:'form',labelWidth:58,border:false,items:[
	            	{fieldLabel:C_SETTLE_OBJECT,tabIndex:2,name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
	             	xtype:'combo',displayField:'custNameCn',valueField:'custNameCn',
	             	typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	             	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	             		listeners:{scope:this,
	             			keydown:{
	             				fn:function(f,e){
	             					LC(f,e,t='R'?'custArFlag':'custApFlag');
	             				},buffer:500
	             			}
	             		}
	             	}
	            ]},
	            {columnWidth:.25,layout:'form',labelWidth:58,border:false,items:[
	            	{fieldLabel:C_CONS_DATE,tabIndex:3,name:'consDate',xtype:'datefield',format:DATEF,anchor:'90%'}
	            ]},
	            {columnWidth:.25,layout:'form',labelWidth:58,border:false,items:[
	            	{fieldLabel:C_TO,tabIndex:4,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'90%'}
	            ]}
	    	]});
    Fos.ExSearchWin.superclass.constructor.call(this,{title:C_EXPE_QUERY,modal:true,width:1200,height:550,
    	listeners:{
    		maximize:function(w){
    			w.doLayout();
    		}
    	},
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',layout:'border',
        tbar:[{text:C_COMPLAX_SEARCH,iconCls:'refresh',scope:this,handler:this.search},'-',
		 	{text:C_CLEAR_FILTER,iconCls:'rotate',scope:this,handler:this.clear},'-'
		],
        items:[this.form,
        {title:'',layout:'fit',region:'center',deferredRender:false,bodyStyle:'padding:0px',items:[this.grid]}]
     }); 
};
Ext.extend(Fos.ExSearchWin,Ext.Window);

//汇率
Fos.RateTab = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=EXRA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExRate',id:'id'},SExRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{active:1}});
    
    this.save = function(){
		HTUtil.POST(store,'SExRate',SExRate,'EXRA_S');
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
	    {header:C_CURR_BASE,dataIndex:'exraBaseCurrency'},
		{header:C_CURR_EX,dataIndex: 'exraExCurrency'},
		{header:C_EX_RATE,renderer:rateRender,dataIndex:'exraRate',width:150,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
		{header:C_EFFECT_DATE,dataIndex:"exraStartDate"},
		{header:C_EXPIRY_DATE,dataIndex:"exraEndDate"}
		],defaults:{sortable:false,width:100}});
    var grid = new  Ext.grid.EditorGridPanel({clicksToEdit:1,store:store,sm:sm,cm:cm,border:false,
    tbar:[{text:C_SAVE,iconCls:'save',scope:this,handler:this.save}]});    
    
    var store2 = new Ext.data.Store({url:SERVICE_URL+'?_A=EXRA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExRate',id:'id'},SExRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store2.load({params:{active:0}});
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm2=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),{header:C_CURR_BASE,dataIndex:'exraBaseCurrency'},
		{header:C_CURR_EX,dataIndex: 'exraExCurrency',width:150},
		{header:C_EX_RATE,renderer:rateRender,dataIndex: 'exraRate',width: 150,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
		{header:C_EFFECT_DATE,dataIndex:"exraStartDate"},
		{header:C_EXPIRY_DATE,dataIndex:"exraEndDate"}],
		defaults:{sortable:false}});
	var t1=new Ext.form.ComboBox({width:80,displayField:'currCode',valueField:'currCode',triggerAction:'all',
         	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()});
    var t2=new Ext.form.ComboBox({width:80,displayField:'currCode',valueField:'currCode',triggerAction:'all',
         	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()});
    var t3=new Ext.form.DateField();
    var t4=new Ext.form.DateField();
    var grid2 = new  Ext.grid.GridPanel({header:false,store:store2,sm:sm2,cm:cm2,border:false,
    	tbar:[
    	{xtype:'tbtext',text:C_CURR_BASE+'：'},t1,'-',
    	{xtype:'tbtext',text:C_CURR_EX+'：'},t2,'-',
    	{xtype:'tbtext',text:C_EFFECT_DATE+'：'},t3,'-',
    	{xtype:'tbtext',text:C_EXPIRY_DATE+'：'},t4,'-',
    	{text:C_COMPLAX_SEARCH,iconCls:'search',handler:this.search}]
    });   
	Fos.RateTab.superclass.constructor.call(this, { 
		id:'G_RATE',title:C_EX_RATE,header:false,deferredRender:false,
		autoScroll:true,closable:true,border:false,width:800,
		items:[{xtype:'tabpanel',plain:true,activeTab:0,height:500,
            items:[
            {layout:'fit',title:C_EX_ACTIVE,items:grid},
            {layout:'fit',title:C_EX_HISTORY,items:grid2}]}
        ]});
};
Ext.extend(Fos.RateTab, Ext.FormPanel);

//利率
Fos.InraGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=INRA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInterestRate',id:'id'},SInterestRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{active:1}});
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
    {header:C_CURR,dataIndex:'inraCurrency'},
    {header:C_INRA_TYPE,dataIndex:"inraType",renderer:HTStore.getIRTY},
	{header:C_INTEREST_RATE,renderer:rateRender,dataIndex: 'inraRate',width: 150,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})}
	],defaults:{sortable:false,width:100}});
    
    this.save = function(){
		HTUtil.POST(store,'SInterestRate',SInterestRate,'INRA_S');
	};
	
    Fos.InraGrid.superclass.constructor.call(this, {id:'G_INRA',title:C_INRA_SETTING,
    	clicksToEdit:1,store:store,sm:sm,cm:cm,border:false,closable:true,
        tbar:[{text:C_SAVE,iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.InraGrid, Ext.grid.EditorGridPanel);
