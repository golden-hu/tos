
var getRecePanel=function (){
	createWindow('RECEIPT','回单管理',new Fos.TReceiptGrid());
};

//回单
Fos.TReceiptGrid = function() {
	var bp={_A:'RECE_SH',_mt:'xml'};
	var store = new Ext.data.Store({url: SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TReceipt',id:'id'},TReceipt),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start:0,limit:C_PS30},callback:function(){}});
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30}});
	};
	
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		columns: [
		new Ext.grid.RowNumberer(),
		sm,
		{header:boldFont('派车单号'),dataIndex: 'transTaskNo',width:120},
		{header:boldFont('托运单号'),dataIndex: 'consNo',width:120},
		{header:boldFont('手工单号'),dataIndex: 'consNoHandler',width:120},
		{header:boldFont('货物名称'),dataIndex: 'cargoName'},
		{header:boldFont('装车件数'),dataIndex: 'packages'},
		{header:boldFont('签收人'),dataIndex: 'signInContact'},
		{header:boldFont('签收日期'),dataIndex: 'signInDate',renderer:formatDate,width:120},
		{header:boldFont('签收件数'),dataIndex: 'packagesArrival'},
		{header:boldFont('异常件数'),dataIndex: 'packagesLack'},
		{header:boldFont('返单签收人'),dataIndex: 'returnSignInContact'},
		{header:boldFont('返单签收日期'),dataIndex: 'returnSignInDate',renderer:formatDate,width:120},
		{header:boldFont('备注'),dataIndex: 'remarks',width:200}
		],defaults:{sortable:false,width:100}
	});
	var consNoSh = new Ext.form.TextField({fieldLabel:'托运单号',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var consNoHandlerSh = new Ext.form.TextField({fieldLabel:'手工单号',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var transTaskNoSh = new Ext.form.TextField({fieldLabel:'派车单号',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var signInContactSh = new Ext.form.TextField({fieldLabel:'签收人',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var signInDateSh=new Ext.form.DateField({fieldLabel:'签收日期',format:DATEF,width:130,height:20});
	var signInDateShTo=new Ext.form.DateField({fieldLabel:'至',format:DATEF,width:130,height:20});
	this.showReceipt = function(p) {
		var win = new Fos.ReceiptWin(p, store);
		win.show();
	};
	//编辑
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showReceipt(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	//快速查询
	this.fastSearch=function(){
		var a=[];
		if(consNoSh.getValue()!='')
			a[a.length]=new QParam({key:'consNo',value:consNoSh.getValue(),op:LI});
		if(consNoHandlerSh.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:consNoHandlerSh.getValue(),op:LI});
		if(transTaskNoSh.getValue()!='')
			a[a.length]=new QParam({key:'transTaskNo',value:transTaskNoSh.getValue(),op:LI});
		if(signInContactSh.getValue()!=''){
			a[a.length] = new QParam({key:'signInContack',value:signInContactSh.getValue(),op:1});
		}
		if(signInDateSh.getValue()){
			a[a.length]=new QParam({key:'signInDate',value:signInDateSh.getValue().format(DATEF),op:GE});
		}
		if(signInDateShTo.getValue()){
			a[a.length]=new QParam({key:'signInDate',value:signInDateShTo.getValue().format(DATEF),op:LE});
		}
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'RECE_SH',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS30},callback:function(){}});
	};
	var fastSearchBt=new Ext.Button({xtype:'button',text:C_FAST_SEARCH,iconCls:'',width:65,handler:this.fastSearch});
	
	Fos.TReceiptGrid.superclass.constructor.call(this, {
		autoScroll:true,sm:sm,cm:cm,store:store,closable:true,stripeRows:true,
		listeners:{
			scope:this,
			rowdblclick: function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showReceipt(p);
				}
			}
		},
		tbar:new Ext.form.FormPanel({frame:false,height:55,collapsible:false,border:false,layout:'column',
	       		deferredRender:true,collapsible:false,padding:5,labelAlign:'right',
	       		items:[
	       			{frame:false,columnWidth:.15,layout:'form',labelWidth:58,border:false,
			          items:[consNoSh]},
				    {frame:false,columnWidth:.15,layout:'form',labelWidth:58,border:false,
				      items:[consNoHandlerSh]},
				    {frame:false,columnWidth:.15,layout: 'form',labelWidth:58,border:false,
				      items:[transTaskNoSh]},
				    {frame:false,columnWidth:.15,layout: 'form',labelWidth:58,border:false,
					  items:[signInContactSh]},
					{frame:false,columnWidth:.15,layout: 'form',labelWidth:58,border:false,
					  items:[signInDateSh]},
					{frame:false,columnWidth:.13,layout: 'form',labelWidth:30,border:false,
					  items:[signInDateShTo]},
					{frame:false,columnWidth:.1,layout: 'form',labelWidth:30,border:false,
					  items:[fastSearchBt]}
	       		],
	       		tbar:[
	       			{text:C_EDIT,iconCls:'option',scope: this,handler: this.edit},'-',
	       			{text:C_RESET,iconCls:'refresh',handler:this.reset},'-'
	       			
	       			]
	    }),
		bbar:PTB(store,C_PS30)
	});
};
Ext.extend(Fos.TReceiptGrid, Ext.grid.GridPanel);
//回单窗口
Fos.ReceiptWin=function(p, listStore){
	var store = new Ext.data.Store({url: SERVICE_URL + '?_A=TCAR_Q',baseParams:{_mt: 'json'},
		reader: new Ext.data.JsonReader({totalProperty: 'rowCount',root:'TCargo',id: 'id'},TCargo),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{transTaskId:p.get('transTaskId'),consId:p.get('consId')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:'签收状态',dataIndex:'signInStatus',width:70,
				renderer:function(v,m,r){
					var str='';
					if(v==0){
						str='未签收';
					}else if(v==1){
						str='已签收';
						m.css=('green-b');
					}
					return str;
				}
			},
			{header:C_TRAN_NO,dataIndex:'consNo',width:120},
			{header:'手工单号',dataIndex:'consNoHandler',width:120},
			{header:'派车单号',dataIndex:'transTaskNo'},
			{header:'收货单位',dataIndex:'consigneeName',width:130},
			{header:'联系人',dataIndex:'consigneeContact',width:80,hidden:true},
			{header:'联系电话',dataIndex:'consigneeTel',width:120,hidden:true},
			{header:'收获地址',dataIndex:'deliveryAddress',width:120},
			{header:'货名',dataIndex:'cargoName',width:100},
			{header:'包装种类',dataIndex: 'packName',width:100},
			{header:'装车件数',dataIndex:'packages',width:80,css:ffaa66},
			{header:'装车毛重(KGS)',dataIndex:'grossWeight',width:120,css:ffaa66,renderer:rateRender},
			{header:'装车体积(CBM)',dataIndex:'measurement',width:120,css:ffaa66,renderer:rateRender},
			{header:'签收件数',dataIndex:'packageArrival',width:80,css:ffdd66,renderer:numRenderColor,
				editor:new Ext.form.NumberField({
					allowBlank:false
				})
			},
	  		{header:'签收毛重(KGS)',dataIndex:'grossWeightArrival',width:120,css:ffdd66,renderer:numRenderColor},
	  		{header:'签收体积(CBM)',dataIndex:'measurementArrival',width:120,css:ffdd66,renderer:numRenderColor},
	  		{header:'异常件数',dataIndex:'packagesLack',width:80,css:ffaa88,renderer:numRenderColor},
	  		{header:'异常毛重(KGS)',dataIndex:'grossWeightLack',width:120,css:ffaa88,renderer:numRenderColor},
	  		{header:'异常体积(CBM)',dataIndex:'measurementLack',width:120,css:ffaa88,renderer:numRenderColor},
		{header:'备注',dataiIndex:'remarks'}
		],
		defaults:[{sortable:false,width:100}]
	});
	
	var txtSignInContact=new Ext.form.TextField({fieldLabel:'签收人',
		name: 'signInContact',
		value: p.get('signInContact'),
		tabIndex:1,
		itemCls: 'required',
		anchor: '95%'
	});
	var dateSignInDate=new Ext.form.DateField({fieldLabel:'签收日期',
		name: 'signInDate',
		value: p.get('signInDate'),
		tabIndex:2,
		format:DATEF,
		itemCls: 'required',
		anchor: '95%'
	});
	//返单确认（返单类型）
    var cboReceiptType = new Ext.form.ComboBox({fieldLabel:'返单类型',anchor:'95%',
    	name:'receiptType',value:p.get('receiptType'),
		store:HTStore.T_FEEDBACK_S,displayField:'N',valueField:'N',
		enableKeyEvents:true,tabIndex:3,editable:false,
		typeAhead:true,mode: 'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	 //返单份数
    var cboReceiptNum = new Ext.form.TextField({fieldLabel:'返单份数',anchor:'95%',
    	name:'receiptNum',value:p.get('receiptNum'),
    	enableKeyEvents:true,tabIndex:4,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
	var txtReSignInContact=new Ext.form.TextField({fieldLabel:'返单签收人',
		name: 'returnSignInContact',
		value: p.get('returnSignInContact'),
		tabIndex:5,
		anchor: '95%'
	});
	var dateReSignInDate=new Ext.form.DateField({fieldLabel:'返单签收日期',
		name: 'returnSignInDate',
		value: p.get('returnSignInDate'),
		tabIndex:6,
		format:DATEF,
		anchor: '95%'
	});
	var txtRemarks=new Ext.form.TextArea({fieldLabel:'备注',
		name:'remarks',
		value:p.get('remarks'),
		tabIndex:7,
		anchor:'97.5%'
	});
	
	var receFram = new Ext.form.FormPanel({
		region:'north',height:150,layout:'column',layoutConfig:{columns:2},labelWidth:78,
		labelAlign:'right',frame: false,padding:8,
		items: [
			{columnWidth:.5,layout: 'form',border: false,
				items: [txtSignInContact,cboReceiptType,txtReSignInContact]
			},
			{columnWidth: .5,layout: 'form',border: false,
				items: [dateSignInDate,cboReceiptNum,dateReSignInDate]
			},
			{columnWidth:1,layout: 'form',border: false,
				items: [txtRemarks]
			}
		]
	});
	//客户签收
	this.custSignIn = function(){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;r++){
				if(r[i].get('signInStatus')=='1'){
					XMG.alert(SYS,'请选择未签收的货物！');
					return ;
				}
			}
			Ext.Msg.confirm(SYS,'您确认所签收的货物吗？',
			function(btn) {
				if (btn == 'yes') {
					r = sm.getSelections();
					if(!HTUtil.checkFieldNotNull('签收人',txtSignInContact))			//委托日期
						return;
					if(!HTUtil.checkFieldNotNull('签收日期',dateSignInDate))			//业务部门
						return;
					HTUtil.saveToRecord(receFram,p);
					var xml = HTUtil.RTX(p, 'TReceipt', TReceipt);
					xml += HTUtil.ATX(r, 'TCargo', TCargo);
					Ext.Ajax.request({
						xmlData: HTUtil.HTX(xml),
						scope:this,	
						url: SERVICE_URL,
						method: 'POST',
						params: {_A:'TCAR_U'},
						success: function(r, o) {
							var c = HTUtil.XTR(r.responseXML, 'TReceipt', TReceipt);
							HTUtil.RU(c, p, TReceipt);
							var a = HTUtil.XTRA(r.responseXML, 'TCargo', TCargo);
							HTUtil.RUA(store, a, TCargo);
							listStore.reload();
							store.reload();
							Ext.Msg.alert(SYS, M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						}
					});
				}
			},
			this);
		}else{
			Ext.MessageBox.alert(SYS,'请选择要签收的货物！');
		}
	};
	this.custSignInBt=new Ext.Button({
		text:'客户签收',iconCls:'tag',handler:this.custSignIn
	});
	var receiptSaveBt=new Ext.Button({text:C_SAVE,iconCls:'ok',scope:this,handler:this.save});
	var receiptCancelBt=new Ext.Button({text: C_CANCEL,iconCls: 'cancel',scope: this,handler: this.close});
	var receGrid = new Ext.grid.EditorGridPanel({title:'装货清单',region:'center',
		sm:sm,cm:cm,store:store,autoScroll:true,iconCls:'gen',
		listeners:{
			scope:this,
			beforeedit:function(e){
				e.cancel = e.record.get('signInStatus')==1;
				var f=e.field;
				var r=e.record;
				if(f=='packageArrival'){
					if(r.get('packageArrival')==0){
						r.set('packageArrival',r.get('packages'));
					}
					if(r.get('grossWeightArrival')==0){
						r.set('grossWeightArrival',r.get('grossWeight'));
					}
					if(r.get('measurementArrival')==0){
						r.set('measurementArrival',r.get('measurement'));
					}
				}
			},
			afteredit: function(e) {
				var f=e.field;
				var r=e.record;
				if(f == 'packageArrival'){
					if(r.get('packageArrival')<r.get('packages')&&r.get('packageArrival')>0){
						var grossWeightArrival=(r.get('grossWeight')/r.get('packages'))*r.get('packageArrival');
						r.set('grossWeightArrival',grossWeightArrival);
						var measurementArrival=(r.get('measurement')/r.get('packages'))*r.get('packageArrival');
						r.set('measurementArrival',measurementArrival);
						
						r.set('packagesLack',r.get('packages')-r.get('packageArrival'));
						r.set('grossWeightLack',r.get('grossWeight')-grossWeightArrival);
						r.set('measurementLack',r.get('measurement')-measurementArrival);
					}else if(r.get('packageArrival')==r.get('packages')){
						r.set('packageArrival',r.get('packages'));
						r.set('grossWeightArrival',r.get('grossWeight'));
						r.set('measurementArrival',r.get('measurement'));
						
						r.set('packagesLack',0);
						r.set('grossWeightLack',0.00);
						r.set('measurementLack',0.00);
					}else{
						r.set('packageArrival',0);
						r.set('grossWeightArrival',0.00);
						r.set('measurementArrival',0.00);
						
						r.set('packagesLack',0);
						r.set('grossWeightLack',0.00);
						r.set('measurementLack',0.00);
					}
				}
			}
		},
		bbar:[getMB(p),'->','-',
			this.custSignInBt,
			/*receiptSaveBt,*/'-',
			receiptCancelBt,'-']
	});
	this.save = function(){
		if(!HTUtil.checkFieldNotNull('签收人',txtSignInContact))			//委托日期
			return;
		if(!HTUtil.checkFieldNotNull('签收日期',dateSignInDate))			//业务部门
			return;
		HTUtil.saveToRecord(receFram,p);
		var xml = HTUtil.RTX(p, 'TReceipt', TReceipt);
		Ext.Ajax.request({
			xmlData: HTUtil.HTX(xml),
			scope: this,
			url: SERVICE_URL,
			method: 'POST',
			params: {_A: 'RECE_S'},
			success: function(r, o) {
				var c = HTUtil.XTR(r.responseXML, 'TReceipt', TReceipt);
				HTUtil.RU(c, p, TReceipt);
				listStore.reload();
				Ext.Msg.alert(SYS, M_S);
				receFram.getForm().loadRecord(p);
				//this.close();
			},
			failure: function(r, o) {
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			}
		});
	};
	Fos.ReceiptWin.superclass.constructor.call(this, {
		buttonAlign:'right',
		title:p.get('rowAction')=='N'?'新增回单':'编辑回单',layout:'fit',
		modal:true,layout:'border',width:850,height:450,
		items: [receFram,receGrid]
	});
};
Ext.extend(Fos.ReceiptWin, Ext.Window);

Fos.receiptStatus = function(value, metadata, record, rowIndex, colIndex, store) {
	if (value == "0") {
		return "<span style='color:red;font-weight:bold;'>未上传</span>";
	}
	 else {
		return "<span style='color:green;font-weight:bold;'>已上传</span>";
	}
};
