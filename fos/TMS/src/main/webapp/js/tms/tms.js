
var getConsPanel=function (){
	createWindow('TCONSIGN','托运管理',new Fos.TConsignGrid());//托运管理
};

//托运单
Fos.TConsignGrid = function() {
	var bp={_A:'TCON_Q',_mt:'xml',versionFlag:0};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//费用合计
	this.expeSum=function(){
		if(store.baseParams.typeKey==1)
			store.baseParams={_A:'TCON_Q',_mt:'xml',xml:store.baseParams.xml,typeKey:'1'};
		else if(store.baseParams.typeKey==2)
			store.baseParams={_A:'TCON_Q',_mt:'xml',xml:store.baseParams.xml,typeKey:'2'};
		else
			store.baseParams={_A:'TCON_Q',_mt:'xml'};
		store.reload({params:{},callback:function(){sum();}});
	}
	var txtSumTotal = new Ext.form.TextField({disabled:true,width:120});
	var txtSumShip = new Ext.form.TextField({disabled:true,width:120});
	var txtSumCons = new Ext.form.TextField({disabled:true,width:120});
	var txtSumHk = new Ext.form.TextField({disabled:true,width:120});
	var txtSumMoto = new Ext.form.TextField({disabled:true,width:120});
	var txtSumPack = new Ext.form.TextField({disabled:true,width:120});
	
	var sum = function(){
		var r=store.getRange();
		var sumTotal = 0;
		var sumShip = 0;
		var sumCons = 0;
		var sumHK = 0;
		var sumMoto = 0;
		var sumPack = 0;
		if(r.length==0) {
			XMG.alert(SYS,M_NOT_FOUND);
		}else{
			for(var i = 0;i < r.length;i++){
				var record = r[i];
				if(record.get('expenseTotal2')){
					sumTotal += record.get('expenseTotal2');
				}
				if(record.get('expenseTotal')){
					sumShip += record.get('expenseTotal');
				}
				if(record.get('expenseTotal3')){
					sumCons += record.get('expenseTotal3');
				}
				if(record.get('motorcadeExpenseHkf')){
					sumHK += record.get('motorcadeExpenseHkf');
				}
				if(record.get('motorcadeExpense2')){
					sumMoto += record.get('motorcadeExpense2');
				}
				if(parseInt(record.get('packages'))){
					sumPack += parseInt(record.get('packages'));
				}
			};
		}
		txtSumTotal.setValue(HTUtil.numRender(sumTotal));
		txtSumShip.setValue(HTUtil.numRender(sumShip));
		txtSumCons.setValue(HTUtil.numRender(sumCons));
		txtSumHk.setValue(HTUtil.numRender(sumHK));
		txtSumMoto.setValue(HTUtil.numRender(sumMoto));
		txtSumPack.setValue(HTUtil.numRender(sumPack));	
	};
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30},callback:function(){}});
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	new Ext.grid.RowNumberer(),sm,
	{header:boldFont('提货状态'),dataIndex:'status',renderer:HTStore.loadStatusRender,width:80},
	{header:boldFont('托运单号'),dataIndex:'consNo',width:140},
	//renderer:function(v){return "<span style='color:red;font-weight:bold;'>"+ v + "</span>";}
	{header:boldFont('手工单号'),dataIndex:'consNoHandler',width:110},
	{header:boldFont('委托日期'),dataIndex:'consDate',renderer:formatDate},
	{header:boldFont(C_BOOKER),dataIndex:'custName',width:140},
	{header:boldFont('委托人'),dataIndex:'custContact',width:60},
	{header:boldFont('委托人手机'),dataIndex:'custMobile',width:120},
	//{header:'操作员',dataIndex:'consOperatorName'},
	{header:boldFont('始发站'),dataIndex:'startStation',width:60},
	{header:boldFont('目的站'),dataIndex:'endStation',width:60},
	{header:boldFont('总运费'),dataIndex:'expenseTotal2',renderer:function(v,m,r){m.css='green-b';return '￥'+v;}},
	{header:boldFont('发货方付'),dataIndex:'expenseTotal',renderer:function(v,m,r){m.css='green-b';return '￥'+v;}},
	{header:boldFont('收货方付'),dataIndex:'expenseTotal3',renderer:function(v,m,r){m.css='green-b';return '￥'+v;}},
	{header:boldFont('中转回扣'),dataIndex:'motorcadeExpenseHkf',renderer:function(v,m,r){m.css='green-b';return '￥'+v;}},
	{header:boldFont('物流运费'),dataIndex:'motorcadeExpense2',renderer:function(v,m,r){m.css='green-b';return '￥'+v;}},
	{header:boldFont('货品件数'),dataIndex:'packages',renderer:function(v,m,r){m.css='green-b';if(v==''){return 0;}else{return v;}}},
	{header:boldFont('签收'),dataIndex:'signInStatus',width:60,renderer:function(v,m,r){if(v==false){return "否";}else{m.css='green-b';return '√';}}},
	{header:boldFont('收货地址'),dataIndex:'deliveryAddress',width:150},
	//{header:'驾驶员',dataIndex:'driverName'},
	//{header:'车牌号',dataIndex:'vehicleNo'},
	{header:boldFont('物流商'),dataIndex:'motorcadeName'},
	{header:boldFont('物流单号'),dataIndex:'motorcadeNo'},
	{header:boldFont('物流联系人'),dataIndex:'motorcadeContact'},
	{header:boldFont('物流电话'),dataIndex:'motorcadeTel'},
	{header:boldFont('操作员帐号'),dataIndex:'consOperatorName'},
	{header:boldFont('收款提交'),dataIndex:'expeSubmitStatus',renderer:function (v){if(v=='1') return '已提交'; else return '未提交'; },width:70},
	{header:boldFont('收款提交日期'),dataIndex:'expeSubmitDate',type:'date',format:DATEF},
	{header:boldFont('付款提交'),dataIndex:'expeSubmitStatus2',renderer:function (v){if(v=='1') return '已提交'; else return '未提交'; },width:70},
	{header:boldFont('付款提交日期'),dataIndex:'expeSubmitDate',type:'date',format:DATEF},
	{header:boldFont('备注'),dataIndex:'remarks',width:200}
	],defaults:{sortable:false,width:100}});
	
	this.showTConsign = function(p){
		var consignTab = new Fos.TConsTab(p,store);
    	createWindow('TRAN_'+p.get("uuid"),p.get('rowAction')=='N'?'新增托运单':'编辑托运单'+'-'+p.get('consNoHandler'),
    			consignTab,true);
    };
    //添加
	this.add=function(){
		var r = new TConsign({uuid:HTUtil.UUID(32),
			rowAction:'N',
			consBizType:BT_T,consDate:new Date(),
			grouId:HTStore.getCFG('DEFAULT_DEPT'),
			grouName:HTStore.getCFGD('DEFAULT_DEPT'),
			consOperatorId:sessionStorage.getItem("USER_ID"),
			consOperatorName:sessionStorage.getItem("USER_NAME"),
			salesRepId:sessionStorage.getItem("USER_ID"),
			salesRepName:sessionStorage.getItem("USER_NAME"),
			/*motorcadeExpense:'0.00',motorcadeExpense2:'0.00',
			motorcadeExpenseXff:'0.00',motorcadeExpenseDff:'0.00',
			motorcadeExpenseYjf:'0.00',motorcadeExpenseHdf:'0.00',
			motorcadeExpenseHkf:'0.00',
			emptyMiles:'0.00',heavyMiles:'0.00',
			packages:'0.00',
			grossWeight:'0.00',grossWeightProvider:'0.00',
			measurement:'0.00',measurementProvider:'0.00',
			expenseBf:'0.00',expenseDdf:'0.00',expenseShf:'0.00',expenseYf:'0.00',expenseThf:'0.00',
			expenseCcf:'0.00',expenseXff:'0.00',expenseDff:'0.00',expenseYjf:'0.00',expenseHdf:'0.00',
			expenseDsf:'0.00',
			expenseTotal:'0.00',expenseTotal2:'0.00',*/
			signInStatus:0,									//签收状态
			status:0, 										//提货状态
			//pateName:0									//付款方式
			consBelong:0,									//委托所属
			versionFlag:0									//业务版本1
			});
		this.showTConsign(r);
	};
	//删除
	this.del=function(){
		var r = sm.getSelections();
		if(r.length>0){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
				if(btn == 'yes') {
					for(var i=0;i<r.length;i++){
						var xml = HTUtil.RTX4R(r[i],'TConsign');
		        		HTUtil.REQUEST('TCON_S', xml, function(){store.remove(r);});
					}
				}
			});
		}else{
			Ext.Msg.alert(SYS,M_R_P);
		}
		
		/*var b =sm.getSelected();
		if(b){
	    	if(b.get('status')=='1') Ext.Msg.alert(SYS,'该托运单已提货，不可以删除!');
	    	else if(b.get('status')=='2') Ext.Msg.alert(SYS,'该托运单已到门，不可以删除!');
	    	else{
	    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
		        	if(btn == 'yes') {
		        		var xml = HTUtil.RTX4R(b,'TConsign');
		        		HTUtil.REQUEST('TCON_S', xml, function(){store.remove(b);});
		        	}
				},this);
	    	}
    	}
		else Ext.Msg.alert(SYS,M_R_P);*/
	};
	//颜色标记
	var addColorStatus=new Ext.form.ComboBox({store:HTStore.COLOR_STATUS,width:85,editable:false,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
			select:function(c,r,v){
				var r = sm.getSelections();
				if(r.length>0){
					var xml = HTUtil.ATX(r,'TConsign',TConsign);
					Ext.Ajax.request({
						scope: this,
						url: SERVICE_URL,
						method:'POST',
						params:{
							_A:'TCON_COLOR_STATUS',
							consColorStatusFlag:c.getValue()			//添加标记
						},
						success: function(r, o) {
							store.reload();
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}else{
					Ext.Msg.alert(SYS,'请选择要标记的记录！');
					addColorStatus.setValue('');
				}
			}
		}
	});
	//接单-编辑
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showTConsign(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({fieldLabel:'手工单号',anchor:'99%',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			}/*,
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}*/
		}
	});
	
	var t2 = new Ext.form.TextField({fieldLabel:'收货地址',anchor:'99%',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			}/*,
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}*/
		}
	});
	var t3 = new Ext.form.TextField({fieldLabel:'物流单号',anchor:'99%',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			}/*,
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}*/
		}
	});
	var cboSubmitRe = new Ext.form.ComboBox({fieldLabel:'收款提交状态',store:HTStore.SUBMIT_STATUS,anchor:'99%',
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	var cboSubmitPe = new Ext.form.ComboBox({fieldLabel:'付款提交状态',store:HTStore.SUBMIT_STATUS,anchor:'99%',
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	var cboColorStatus = new Ext.form.ComboBox({fieldLabel:'单票标记',store:HTStore.COLOR_STATUS,anchor:'99%',
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	var submDate=new Ext.form.DateField({fieldLabel:'收提交日期',format:DATEF,width:130,height:18,anchor:'99%'});
	var submDateTo=new Ext.form.DateField({fieldLabel:'至',format:DATEF,width:130,height:18,anchor:'99%'});
	var submDate2=new Ext.form.DateField({fieldLabel:'付提交日期',format:DATEF,width:130,height:18,anchor:'99%'});
	var submDate2To=new Ext.form.DateField({fieldLabel:'至',format:DATEF,width:130,height:18,anchor:'99%'});
	
	//快速查询
	this.fastSearch=function(){
		var a=[];
		
		if(kw.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:kw.getValue(),op:LI});
		if(t2.getValue()!='')
			a[a.length]=new QParam({key:'deliveryAddress',value:t2.getValue(),op:LI});
		if(t3.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeNo',value:t3.getValue(),op:LI});
		if(cboSubmitRe.getValue()!=''){
			a[a.length] = new QParam({key:'expeSubmitStatus',value:cboSubmitRe.getValue(),op:1});
		}
		if(cboSubmitPe.getValue()!=''){
			a[a.length] = new QParam({key:'expeSubmitStatus2',value:cboSubmitPe.getValue(),op:1});
		}
		if(cboColorStatus.getValue()!=''){
			a[a.length] = new QParam({key:'consColorStatus',value:cboColorStatus.getValue(),op:1});
		}
		if(submDate.getValue()){
			a[a.length]=new QParam({key:'expeSubmitDate',value:submDate.getValue().format(DATEF),op:GE});
		}
		if(submDateTo.getValue()){
			a[a.length]=new QParam({key:'expeSubmitDate',value:submDateTo.getValue().format(DATEF),op:LE});
		}
		if(submDate2.getValue()){
			a[a.length]=new QParam({key:'expeSubmitDate2',value:submDate2.getValue().format(DATEF),op:GE});
		}
		if(submDate2To.getValue()){
			a[a.length]=new QParam({key:'expeSubmitDate2',value:submDate2To.getValue().format(DATEF),op:LE});
		}
		
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'TCON_SEARCH',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
 		store.reload({params:{start:0,limit:C_PS30},callback:function(){}});
	};
	
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store);
		w.show();
	};

	//单票货物跟踪状态
	this.event=function(){
		var p =sm.getSelected();
		if(p){
			createWindow(new Fos.PEventWin(p),true);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	//客户对账表
	this.expExcel1=function(){
		if(store.baseParams.typeKey==1)
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC');
	};
	var exp1={text:'客户对账表',scope:this,handler:this.expExcel1};
	
	store.load({params:{start:0,limit:C_PS30},callback:function(){}});
	//stripeRows:true 条纹
	Fos.TConsignGrid.superclass.constructor.call(this,{title:'',stripeRows:true,
	    id:'G_TRAN',iconCls:'grid',header:false,closable:true,store:store,sm:sm,cm:cm,loadMask:true,plain:true,modal:true,
	    view:new Ext.grid.GridView({
	    	getRowClass: function(record,rowIndex,p,ds) {
	    		var colorStatus=record.get('consColorStatus');
	    		if(colorStatus=='1'){
	    			return 'red-row';
	    		}else if(colorStatus=='2'){
	    			return 'orange-row';
	    		}else if(colorStatus=='3'){
	    			return 'yellow-row';
	    		}else if(colorStatus=='4'){
	    			return 'green-row';
	    		}else if(colorStatus=='5'){
	    			return 'blue-row';
	    		}
	    	 }
	    }),
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p && HR(M1_CONS)){
					this.showTConsign(p);
				}
	    }},
		bbar:[
			  {text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
			  {xtype:'label',text:'总运费合计'},txtSumTotal,'-',
		      {xtype:'label',text:'发货方付合计'},txtSumShip,'-',
		      {xtype:'label',text:'收货方付合计'},txtSumCons,'-',
		      {xtype:'label',text:'中转回扣合计'},txtSumHk,'-',
		      {xtype:'label',text:'物流运费合计'},txtSumMoto,'-',
		      {xtype:'label',text:'件数合计'},txtSumPack
		],
		tbar:new Ext.Panel({border:false,
			items:[{xtype:'toolbar',items:[
				{text:C_ADD,iconCls:'add',disabled:NR(M1_CONS+F_ADD),scope:this,handler:this.add},'-',
				{text:C_EDIT,iconCls:'option',disabled:NR(M1_CONS+F_UP),scope:this,handler:this.edit},'-',
		        {text:C_REMOVE,iconCls:'remove',disabled:NR(M1_CONS+F_R),scope:this,handler:this.del}, '-', 
		        {text:C_COMPLAX_SEARCH,iconCls:'search',scope:this,handler:this.search}, '-',
		        {text:C_CARGO_TRACING,iconCls:'add',disabled:NR(M1_CONS),scope:this,handler:this.event},'-',
		        /*{text:C_EXPORT,iconCls:'print',scope:this,
		        	menu:{items:[exp6]},hidden:true},'-',*/
		        {xtype:'label',text:'运单标记'},addColorStatus,'-',
		        {text:C_RESET,iconCls:'refresh',handler:this.reset},'-',								//刷新
		        '->',//PTB(store,C_PS30)
		        new Ext.PagingToolbar({pageSize:C_PS30,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
		        	doLoad : function(start){
		                var o = {}, pn = this.getParams();
		                o[pn.start] = start;
		                o[pn.limit] = this.pageSize;
		                if(this.fireEvent('beforechange', this, o) !== false){
		                    this.store.load({params:o,callback:function(){}});
		                }
		            }
		        })
	        ]},
	       new Ext.form.FormPanel(
		       	{frame:false,height:60,collapsible:false,border:false,layout:'column',
		       	layoutConfig:{columns:6},deferredRender:true,collapsible:false,padding:5,labelAlign:'right',
		       		items:[
		       			{frame:false,columnWidth:.17,layout:'form',labelWidth:65,border:false,
				          items:[kw,submDate]},
					    {frame:false,columnWidth:.17,layout:'form',labelWidth:55,border:false,
					      items:[t2,submDateTo]},
					    {frame:false,columnWidth:.17,layout: 'form',labelWidth:65,border:false,
					      items: [t3,submDate2]},
					    {frame:false,columnWidth:.16,layout: 'form',labelWidth:55,border:false,
						  items:[cboColorStatus,submDate2To]},
						{frame:false,columnWidth:.16,layout: 'form',labelWidth:78,border:false,
						  items:[cboSubmitRe,{xtype:'button',text:C_FAST_SEARCH,iconCls:'',width:65,handler:this.fastSearch}]},
						{frame:false,columnWidth:.16,layout: 'form',labelWidth:78,border:false,
						  items:[cboSubmitPe]}
		       		]
		       	}
	       )
	   ]})
    });
};
Ext.extend(Fos.TConsignGrid, Ext.grid.GridPanel);

//新增编辑
Fos.TConsTab = function(p,listStore){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCON_CAR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TConsignCargo',id:'id'},TConsignCargo),
		remoteSort:false,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		store.load({params:{consId:p.get('id')}});
	
	var driverStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var vehicleStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var transTypeStore = new Ext.data.Store({url:SERVICE_URL+'?_A=T_TRANS_TYPE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransType',id:'id'},TTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	  	{header:'订单编号',dataIndex:'orderNo',width:150,editor:new Ext.form.TextField()},
	  	{header:'货名',dataIndex:'cargoName',width:150,editor:new Ext.form.TextField()},
	  	{header:C_PACK,dataIndex:'packName',width:150,
	  			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',editable:false,//必须选择产生，禁止手工输入 
	              mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	  	{header:'件数',dataIndex:'packages',width:100,renderer:numRender,editor:new Ext.form.NumberField({allowBlank:false})},
	  	{header:'台数',dataIndex:'packagesNo',width:100,editor:new Ext.form.NumberField({allowBlank:false}),hidden:true},
	  	{header:'出货数量',dataIndex:'pachagesOut',width:100,editor:new Ext.form.NumberField({allowBlank:false}),hidden:true},
	  	{header:'包装件数',dataIndex:'packagesNumber',width:100,editor:new Ext.form.NumberField({allowBlank:false}),hidden:true},
	  	//decimalPrecision:4,
	  	{header:'毛重(KGS)',dataIndex:'grossWeight',width:120,renderer:numRender,
	  		editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''})},	
	  	{header:'体积(CBM)',dataIndex:'measurement',width:120,renderer:numRender,
	  		editor:new Ext.form.NumberField({allowBlank:false,emptyText:'',invalidText:''})},
	  	{header:'毛重(KGS)(承运人)',dataIndex:'grossWeightProvider',width:140,renderer:rateRender,
	  		editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},	
	  	{header:'体积(CBM)(承运人)',dataIndex:'measurementProvider',width:140,renderer:rateRender,
	  		editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
	  	{header:'货物类别',dataIndex:'cargoClassName',width:100,
	  		editor:new Ext.form.ComboBox({displayField:'caclNameCn',valueField:'caclNameCn',triggerAction:'all',
	          mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCACL_S()
	  		}),hidden:true},
	  	{header:'货物价值',dataIndex:'premiumValue',width:150,renderer:rateRender,
          	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
        {header:'保险费率',dataIndex:'premiumRate',width:100,renderer:rateRender,
          	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
        {header:'保险费',dataIndex:'premiumExpense',width:100,
          		renderer:function(v,m,r){
  			    	v=parseFloat(v);
  			    	v=v.toFixed(4);
  			    	if(v=='NaN'){
  			    		v='0.00';
  			    	};
  			    	m.css='green-b';
  			    	return v;
  			    },
          	editable:false,//保险费由系统自动计算 产生 ，无需录入
          	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
        {header:'货物价值(承运人)',dataIndex:'premiumValueProvider',width:120,renderer:rateRender,
              editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
        {header:'保险费率(承运人)',dataIndex:'premiumRateProvider',width:120,renderer:rateRender,
              editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
        {header:'保险费(承运人)',dataIndex:'premiumExpenseProvider',width:120,
              	renderer:function(v,m,r){
  			    	v=parseFloat(v);
  			    	v=v.toFixed(4);
  			    	if(v=='NaN'){
  			    		v='0.00';
  			    	};
  			    	m.css=(v==5?'red-b':'green-b');
  			    	return v;
  			    },
              editable:false,//保险费由系统自动计算 产生 ，无需录入
              editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''}),hidden:true},
	  	 {header:C_REMARKS,dataIndex:'remarks',width:200,editor:new Ext.form.TextField()}
	  	],defaults:{sortable:false,width:100}});
    	
	this.addConsignCargo = function(){
		var tc = new TConsignCargo({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'
		});
		grid.stopEditing();
    	store.insert(0,tc);
    	grid.startEditing(0,2);
	};
	this.del = function(){
		HTUtil.REMOVE_SM(sm,store);this.reCalculate();//删除记录后重新计算合计项目 ADD BY YONGZHIXIANG 2012-07-11
	};
	
	var txtSumPackages = new Ext.form.TextField({width:80,value:p.get('packages'),disabled:true});
	var txtSumGrossWeight = new Ext.form.TextField({width:80,value:p.get('grossWeight'),disabled:true});
	var txtSumMeasurement = new Ext.form.TextField({width:80,value:p.get('measurement'),disabled:true});
	var txtSumGrossWeightP = new Ext.form.TextField({width:80,value:p.get('grossWeightProvider'),disabled:true});
	var txtSumMeasurementP = new Ext.form.TextField({width:80,value:p.get('measurementProvider'),disabled:true});	
	var txtSumCargoValue = new Ext.form.TextField({width:80,value:p.get('premiumValue'),disabled:true});
	var txtSumPremiumExpense = new Ext.form.TextField({width:80,value:p.get('premiumExpense'),disabled:true});
	var txtSumCargoValueP = new Ext.form.TextField({width:80,value:p.get('premiumValueProvider'),disabled:true});
	var txtSumPremiumExpenseP = new Ext.form.TextField({width:80,value:p.get('premiumExpenseProvider'),disabled:true});
	
	this.reCalculate = function(){
		var a=store.getRange();
		var sumPackages=0;
		var sumGrossWeight=0;
		var sumMeasurement=0;
		var sumGrossWeightP=0;
		var sumMeasurementP=0;
		var sumCargoValue=0;
		var sumPremiumExpense=0;
		var sumCargoValueP=0;
		var sumPremiumExpenseP=0;
		
		for(var i=0;i<a.length;i++){
			sumPackages+=parseInt(a[i].get('packages'));
			if(a[i].get('grossWeight'))
				sumGrossWeight+=parseFloat(a[i].get('grossWeight'));
			if(a[i].get('measurement'))
				sumMeasurement+=parseFloat(a[i].get('measurement'));
			if(a[i].get('grossWeightProvider'))
				sumGrossWeightP+=parseFloat(a[i].get('grossWeightProvider'));
			if(a[i].get('measurementProvider'))
				sumMeasurementP+=parseFloat(a[i].get('measurementProvider'));
			if(a[i].get('premiumValue'))
				sumCargoValue+=parseFloat(a[i].get('premiumValue'));
			if(a[i].get('premiumExpense'))
				sumPremiumExpense+=parseFloat(a[i].get('premiumExpense'));
			if(a[i].get('premiumValueProvider'))
				sumCargoValueP+=parseFloat(a[i].get('premiumValueProvider'));
			if(a[i].get('premiumExpenseProvider'))
				sumPremiumExpenseP+=parseFloat(a[i].get('premiumExpenseProvider'));
		}
		p.set('packages',sumPackages);
		p.set('grossWeight',sumGrossWeight);
		p.set('measurement',sumMeasurement);
		p.set('grossWeightProvider',sumGrossWeightP);
		p.set('measurementProvider',sumMeasurementP);
		p.set('premiumValue',sumCargoValue);
		p.set('premiumExpense',sumPremiumExpense);
		p.set('premiumValueProvider',sumCargoValueP);
		p.set('premiumExpenseProvider',sumPremiumExpenseP);
		
		txtSumPackages.setValue(sumPackages);
		txtSumGrossWeight.setValue(HTUtil.round2(sumGrossWeight));
		txtSumMeasurement.setValue(HTUtil.round2(sumMeasurement));
		txtSumGrossWeightP.setValue(HTUtil.round2(sumGrossWeightP));
		txtSumMeasurementP.setValue(HTUtil.round2(sumMeasurementP));
		txtSumCargoValue.setValue(HTUtil.round2(sumCargoValue));
		txtSumPremiumExpense.setValue(HTUtil.round2(sumPremiumExpense));
		txtSumCargoValueP.setValue(HTUtil.round2(sumCargoValueP));
		txtSumPremiumExpenseP.setValue(HTUtil.round2(sumPremiumExpenseP));
	};
	
	var grid = new Ext.grid.EditorGridPanel({title:'货物列表',height:200,iconCls:'gen',region:'center',
		clicksToEdit:1,autoScroll:true,sm:sm,cm:cm,store:store,
		/*listeners:{scope:this,
			afteredit:function(e){
			var f=e.field;
    		if(f=='packages'||f=='grossWeight'||f=='measurement'||f=='grossWeightProvider'||f=='measurementProvider'||
    		   f=='premiumValueProvider'||f=='premiumExpenseProvider'){reCalculate();}
    	}},*/
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addConsignCargo},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del},
			'-','->',
			{xtype:'tbtext',text:'件数合计：'},txtSumPackages,
		    {xtype:'tbtext',text:'毛重合计(KGS)：'},txtSumGrossWeight,
		    {xtype:'tbtext',text:'体积合计(CBM)：'},txtSumMeasurement
		    /*{xtype:'tbtext',text:'货物价值：'},txtSumCargoValue,
		    {xtype:'tbtext',text:'保险费：'},txtSumPremiumExpense*/
		],
		/*bbar:[
		      '->','-',
		      {xtype:'tbtext',text:'毛重合计-承运人(KGS)：'},txtSumGrossWeightP,
		      {xtype:'tbtext',text:'体积合计-承运人(CBM)：'},txtSumMeasurementP,
		      {xtype:'tbtext',text:'货物价值-承运人：'},txtSumCargoValueP,
			  {xtype:'tbtext',text:'保险费-承运人：'},txtSumPremiumExpenseP
		],*/
		listeners:{scope:this,
			afteredit:function(e){
				var f=e.field;
				var r=e.record;
		    	if(f=='packages'){
		    		r.set('packages',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='grossWeight'){
		    		r.set('grossWeight',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='measurement'){
		    		r.set('measurement',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='grossWeightProvider'){
		    		r.set('grossWeightProvider',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='measurementProvider'){
		    		r.set('measurementProvider',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumValue'){
		    		r.set('premiumValue',e.value);
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumRate'){
		    		r.set('premiumRate',e.value);
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumExpense'){
		    		r.set('premiumExpense',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='cargoClassName'){
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumValueProvider'){
		    		r.set('premiumValueProvider',e.value);
		    		//当货物价值（承运人）*保险费率（承运人）小于5时，保险费为5
		    		var prp=r.get('premiumRateProvider')*r.get('premiumValueProvider');
		    		if(prp>0&&prp<5){
		    			prp=5;
		    		}
		    		r.set('premiumExpenseProvider',prp);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumRateProvider'){
		    		r.set('premiumRateProvider',e.value);
		    		var prp=r.get('premiumRateProvider')*r.get('premiumValueProvider');
		    		if(prp>0&&prp<5){
		    			prp=5;
		    		}
		    		r.set('premiumExpenseProvider',prp);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumExpenseProviderProvider'){
		    		r.set('premiumExpenseProvider',e.value);
		    		this.reCalculate();
		    	}
			}
		}
	});
	
	//托运单号
	var txtConsNo = new Ext.form.TextField({fieldLabel:'托运单号',anchor:'95%',
		name:'consNo',value:p.get('consNo'),itemCls:'red-b',
		enableKeyEvents:true,disabled:true,tabIndex:1,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsNoHandler.focus();
				}
			}
		}
	});
	
	//业务部门
	var cboGrouName = new Ext.form.ComboBox({fieldLabel:'业务部门',anchor:'95%',
		name:'grouName',value:p.get('grouName'),itemCls:'red-b',editable:false,
		tabIndex:2,store:HTStore.getGROU_S(),displayField:'grouName',valueField:'grouName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,v){
				p.set('grouId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboSalesRepName.focus();
				}
			}
			/*afterRender:function(combo){
				//var firstValue = ;
				//combo.setValue(firstValue);
			}*/
		}
	});
	
	//业务员
	var cboSalesRepName = new Ext.form.ComboBox({fieldLabel:'业务员',anchor:'95%',
		name:'salesRepName',value:p.get('salesRepName'),itemCls:'red-b',editable:false,
		tabIndex:3,store:HTStore.getSALE_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode: 'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('salesRepId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsOperatorName.focus();
				} 
			}
		}
	});
	
	//操作员
	var cboConsOperatorName = new Ext.form.ComboBox({fieldLabel:'操作员',anchor:'95%',
		name:'consOperatorName',value:p.get('consOperatorName'),itemCls:'red-b',editable:false,
		tabIndex:4,store:HTStore.getOP_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('consOperatorId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboStartSite.focus();
				} 
			}
		}
	});
	
	//委托日期
	var dtConsDate = new Ext.form.DateField({fieldLabel:'委托日期',anchor:'95%',
		name:'consDate',value:p.get('consDate'),enableKeyEvents:true,
		itemCls:'red-b',format:DATEF,tabIndex:5,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//手工单号
	var txtConsNoHandler = new Ext.form.TextField({fieldLabel:'手工单号',anchor:'95%',
		name:'consNoHandler',value:p.get('consNoHandler'),
		itemCls:'red-b',enableKeyEvents:true,tabIndex:6,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//始发站
	var txtStartStation = new Ext.form.TextField({fieldLabel:'始发站',anchor:'95%',
		name:'startStation',value:p.get('startStation'),itemCls:'red-b',
		enableKeyEvents:true,tabIndex:7,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//目的站
	var txtEndStation = new Ext.form.TextField({fieldLabel:'目的站',anchor:'95%',
		name:'endStation',value:p.get('endStation'),
		itemCls:'red-b',enableKeyEvents:true,tabIndex:8,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//运输状态(提货状态)
    var cboStatus = new Ext.form.ComboBox({fieldLabel:'提货状态',anchor:'95%',
    	name:'status',value:p.get('status'),editable:false,
		store:HTStore.loadStatus,displayField:'N',valueField:'C',enableKeyEvents:true,
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,tabIndex:9,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
    
    //提货日期
    var dtLoadDate = new Ext.form.DateField({fieldLabel:'提货日期',anchor:'95%',
    	name:'loadDate',value:p.get('loadDate'),
    	enableKeyEvents:true,format:DATEF,tabIndex:10,
    	listeners:{scope:this,
    		select:function(c,r,i){
    			//把承运商信息中‘到货信息’同步
    			//dtStartDate.setValue(r.format(DATEF));发货日期-物流商
        	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
    //到货日期-托运单
    var dtArNewDate = new Ext.form.DateField({fieldLabel:'到货日期',anchor:'95%',
    	name:'arNewDate',value:p.get('arNewDate'),
    	enableKeyEvents:true,tabIndex:11,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
    });
    
    //签收日期
    var dtSignInDate = new Ext.form.DateField({fieldLabel:'签收日期',anchor:'95%',
    	name:'signInDate',value:p.get('signInDate'),
    	enableKeyEvents:true,tabIndex:12,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
    //返单确认（返单类型）
    var cboFeedbackWay = new Ext.form.ComboBox({fieldLabel:'返单类型',anchor:'95%',
    	name:'feedbackWay',value:p.get('feedbackWay'),
		store:HTStore.T_FEEDBACK_S,displayField:'N',valueField:'N',
		enableKeyEvents:true,tabIndex:13,
		typeAhead:true,mode: 'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
    //返单份数
    var cboFeedbackNumber = new Ext.form.TextField({fieldLabel:'返单份数',anchor:'95%',
    	name:'feedbackNumber',value:p.get('feedbackNumber'),
    	enableKeyEvents:true,tabIndex:14,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
    //是否签收
    var ckbSignInStatus = new Ext.form.Checkbox({fieldLabel:'是否签收',anchor:'95%',
    	name:'signInStatus',value:p.get('signInStatus'),
    	tabIndex:15,checked:p.get('signInStatus')==1});
    
    //签收人
    var txtSignInContact = new Ext.form.TextField({fieldLabel:'签收人',anchor:'95%',
    	name:'signInContact',value:p.get('signInContact'),
    	enableKeyEvents:true,tabIndex:16,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
	//委托单位
	var cboCustName = new Fos.CustomerLookup({fieldLabel:'委托单位',anchor:'95%',
		name:'custName',value:p.get('custName'),itemCls:'red-b',
		tabIndex:17,store:HTStore.getCS(),enableKeyEvents:true,
		displayField:'custNameCn',valueField:'custNameCn',xtype:'customerLookup',custType:'custBookerFlag',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,bizType:BT_T,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		 listeners:{scope:this,
		 	blur:function(f){
		 		if(f.getRawValue()==''){
		 			//f.clearValue();
		 			cboCustContact.setValue('');
		 			txtCustTel.setValue('');
		 			txtCustMobile.setValue('');
		 			txtLoadAddress.setValue('');
		 			p.set('custId','');
		 			p.set('custName','');
		 			p.set('custTel','');
		 			p.set('custContact','');
		 			p.set('loadAddress','');
		 		}},
		 	select:function(c,r,i){
		 		p.set('custId',r.get('id'));
		 		p.set('custSname',r.get('custSname'));
		 		//添加上级公司id--parentId
		 		p.set('parentId',r.get('parentId'));
		 		var custId=p.get('custId');
		 		var parentId=p.get('parentId');
		 		var store=cboCustContact.getStore();
		 		store.removeAll(); 
		 		store.load({params:{custId:custId,parentId:parentId},
		 			callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				cboCustContact.setValue(record.get('cucoName'));
				 			txtCustTel.setValue(record.get('cucoTel'));
				 			txtLoadAddress.setValue(record.get('cucoAddress1'));
				 			txtCustMobile.setValue(record.get('cucoMobile'));
				 			if(cboConsBelong.getValue()=='0'){
				 				p.set('shipperId',p.get('custId'));
				 				txtShipperName.setValue(cboCustName.getValue());
				 				txtShipperContact.setValue(record.get('cucoName'));
				 				txtShipperTel.setValue(record.get('cucoTel'));
				 				txtLoadAddress.setValue(record.get('cucoAddress1'));
					 			txtShipperMobile.setValue(record.get('cucoMobile'));
					 			if(p.get('rowAction')=='N'){//新增情况下执行清空移位
					 				p.set('consigneeId','');
					 				cboConsigneeName.setValue('');
					 				txtConsigneeContact.setValue('');
					 				txtConsigneeTel.setValue('');
					 				txtDeliveryAddress.setValue('');
					 				txtConsigneeMobile.setValue('');
					 			}
				 			}else{
				 				p.set('consigneeId',p.get('custId'));
				 				cboConsigneeName.setValue(cboCustName.getValue());
				 				txtConsigneeContact.setValue(record.get('cucoName'));
				 				txtConsigneeTel.setValue(record.get('cucoTel'));
				 				txtDeliveryAddress.setValue(record.get('cucoAddress1'));
				 				txtConsigneeMobile.setValue(record.get('cucoMobile'));
				 				if(p.get('rowAction')=='N'){//新增情况下执行清空移位
				 					p.set('shipperId','');
					 				txtShipperName.setValue('');
					 				txtShipperContact.setValue('');
					 				txtShipperTel.setValue('');
					 				txtLoadAddress.setValue('');
						 			txtShipperMobile.setValue('');
				 				}
				 			}
			 			}else{
			 				cboCustContact.setValue('');
				 			txtCustTel.setValue('');
				 			txtLoadAddress.setValue('');
				 			txtCustMobile.setValue('');
			 			}
			 		}
		 		}});
		 		cboSalesRepName.setValue(r.get('custSalesName'));
		 		//cboCustContact.setValue(r.get('custContact'));
	 			//txtCustTel.setValue(r.get('custTel'));
	 			//txtLoadAddress.setValue(r.get('custAddress'));	
		 	},
		 	keydown:{fn:function(f,e){
		 		LC(f,e,'custBookerFlag');
		 		if(e.getKey()==e.ENTER){
		 			
				}
		 	},buffer:BF}
		 }
	});
	//委托归属
	var cboConsBelong = new Ext.form.ComboBox({fieldLabel:'委托归属',anchor:'95%',
		name:'consBelong',value:p.get('consBelong'),itemCls:'red-b',editable:false,
		tabIndex:18,store:HTStore.consBelong,displayField:'N',valueField:'C',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				if(v=='0'){
					if(cboCustName.getValue()!=''){
						p.set('shipperId',p.get('custId'));
		 				txtShipperName.setValue(cboCustName.getValue());
		 				txtShipperContact.setValue(cboCustContact.getValue());
		 				txtShipperTel.setValue(txtCustTel.getValue());
		 				txtLoadAddress.setValue(txtLoadAddress.getValue());
			 			txtShipperMobile.setValue(txtCustMobile.getValue());
			 			
			 			p.set('consigneeId','');
		 				cboConsigneeName.setValue('');
		 				txtConsigneeContact.setValue('');
		 				txtConsigneeTel.setValue('');
		 				txtDeliveryAddress.setValue('');
		 				txtConsigneeMobile.setValue('');
					}
	 			}else if(v=='1'){
	 				if(cboCustName.getValue()!=''){
	 					p.set('consigneeId',p.get('custId'));
		 				cboConsigneeName.setValue(cboCustName.getValue());
		 				txtConsigneeContact.setValue(cboCustContact.getValue());
		 				txtConsigneeTel.setValue(txtCustTel.getValue());
		 				txtDeliveryAddress.setValue(txtLoadAddress.getValue());
		 				txtConsigneeMobile.setValue(txtCustMobile.getValue());
		 				
		 				p.set('shipperId','');
		 				txtShipperName.setValue('');
		 				txtShipperContact.setValue('');
		 				txtShipperTel.setValue('');
		 				txtLoadAddress.setValue('');
			 			txtShipperMobile.setValue('');
	 				}
	 			}
			},
			keydown:function(f,e){
				
			}
		}
	});
	
	//委托人
	var cboCustContact = new Ext.form.ComboBox({fieldLabel:'委托人',anchor:'95%',
		name:'custContact',value:p.get('custContact'),tabIndex:19,
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtCustMobile.setValue(r.get('cucoMobile'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	
	//手机-委托方
	var txtCustMobile = new Ext.form.TextField({fieldLabel:'手机',anchor:'95%',
		name:'custMobile',value:p.get('custMobile'),
		enableKeyEvents:true,tabIndex:20,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//货物状况
    var txtCargoStatus = new Ext.form.TextArea({fieldLabel:'货物状况',anchor:'97%',
    	name:'cargoStatus',value:p.get('cargoStatus'),
    	enableKeyEvents:true,tabIndex:21,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    //备注
    var txtRemarks = new Ext.form.TextArea({fieldLabel:'备注',anchor:'97%',
    	name:'remarks',value:p.get('remarks'),
    	enableKeyEvents:true,tabIndex:22
    });
	
  //发货单位-发货方
    var txtShipperName = new Ext.form.TextField({fieldLabel:'发货单位',anchor:'95%',
    	name:'shipperName',value:p.get('shipperName'),
    	itemCls:'red-b',enableKeyEvents:true,tabIndex:23,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
    //发货人-发货方
    var txtShipperContact = new Ext.form.TextField({fieldLabel:'发货人',anchor:'95%',
    	name:'shipperContact',value:p.get('shipperContact'),
    	enableKeyEvents:true,tabIndex:24
    });
   //座机电话-发货方
    var txtShipperTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
    	name:'shipperTel',value:p.get('shipperTel'),
    	enableKeyEvents:true,tabIndex:25,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //手机号码-发货方
    var txtShipperMobile = new Ext.form.TextField({fieldLabel:'手机号码',anchor:'95%',
    	name:'shipperMobile',value:p.get('shipperMobile'),
    	enableKeyEvents:true,tabIndex:26
    });
    
   //提货地址
	var txtLoadAddress = new Ext.form.TextField({fieldLabel:'提货地址',anchor:'97.3%',
		name:'loadAddress',value:p.get('loadAddress'),
		enableKeyEvents:true,tabIndex:27,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//座机电话-委托方
	var txtCustTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
		name:'custTel',value:p.get('custTel'),
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//收货单位-手工填写
	var cboConsigneeName = new Ext.form.ComboBox({fieldLabel:'收货单位',anchor:'95%',
		name:'consigneeName',value:p.get('consigneeName'),itemCls:'red-b',
		tabIndex:28,store:HTStore.getShipperStore('TMS_CONSIGNEE_Q'),
		displayField:'shipperName',valueField:'shipperName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
		enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,i){
		    	c.setValue(r.get('shipperName'));
		    	txtConsigneeContact.setValue(r.get('shipperContact'));
		    	txtConsigneeTel.setValue(r.get('shipperTel'));
		    	txtConsigneeMobile.setValue(r.get('shipperMobile'));
		    	cboDeliveryPlaceName.setValue(r.get('shipperProvince'));
		    	cboDeliveryCity.setValue(r.get('shipperCity'));
		    	txtDeliveryAddress.setValue(r.get('shipperAddress'));
		 	},
		 	keydown:{fn:function(f,e){
		 		listConsignee(f,e);
		 		if(e.getKey()==e.ENTER){
		 			
				} 
		 	},buffer:200}
	 	}
	});
	/*var cboConsigneeName = new Fos.CustomerLookup({fieldLabel:'收货单位',anchor:'95%',
		name:'consigneeName',value:p.get('consigneeName'),
		tabIndex:9,store:HTStore.getCS(),enableKeyEvents:true,
		displayField:'custNameCn',valueField:'custNameCn',xtype:'customerLookup',custType:'custBookerFlag',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,bizType:BT_T,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('consigneeId',r.get('id'));
			},
			keydown:{fn:function(f,e){
				LC(f,e,'custBookerFlag');
		 		if(e.getKey()==e.ENTER){
		 			txtConsigneeTel.focus();
				}
		 	},buffer:200}
		}
	});*/
	
	//收货方-收货人
	var txtConsigneeContact = new Ext.form.TextField({fieldLabel:'收货人',anchor:'95%',
		name:'consigneeContact',value:p.get('consigneeContact'),enableKeyEvents:true,tabIndex:29,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-座机电话
	var txtConsigneeTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
		name:'consigneeTel',value:p.get('consigneeTel'),enableKeyEvents:true,tabIndex:30,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-手机号码
	var txtConsigneeMobile = new Ext.form.TextField({fieldLabel:'手机号码',anchor:'95%',
		name:'consigneeMobile',value:p.get('consigneeMobile'),enableKeyEvents:true,tabIndex:31,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-收货地址
    var txtDeliveryAddress = new Ext.form.TextField({fieldLabel:'收货地址',anchor:'97.3%',
    	name:'deliveryAddress',value:p.get('deliveryAddress'),
    	enableKeyEvents:true,tabIndex:32,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
    });
	//收货方-省
	var cboDeliveryPlaceName = new Ext.form.ComboBox({fieldLabel:'省份',anchor:'95%',
		name:'deliveryPlaceName',value:p.get('deliveryPlaceName'),
		store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,v){
		   	 	p.set('deliveryPlaceId',r.get('id'));
		   	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
		   	 	cboDeliveryCity.store.baseParams= bp;
		   	 	cboDeliveryCity.store.reload();
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//收货方-市/县
    var cboDeliveryCity = new Ext.form.ComboBox({fieldLabel:'市/县',anchor:'95%',
    	name:'deliveryCity',value:p.get('deliveryCity'),
		store:HTStore.getCITY_S(p.get('placProvinceId')),
		displayField:'placName',valueField:'placName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('deliveryCityId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
    });
    
    
    //设置费用
    var txtSetDisabled=function(){
    	txtExpenseXff.setDisabled(true);
    	txtExpenseXff.setValue('');
    	txtExpenseDff.setDisabled(true);
    	txtExpenseDff.setValue('');
    	txtExpenseYjf.setDisabled(true);
    	txtExpenseYjf.setValue('');
    	txtExpenseHdf.setDisabled(true);
    	txtExpenseHdf.setValue('');
    };
    //付款方式
    var cboPateName = new Ext.form.ComboBox({fieldLabel:'付款方式',anchor:'95%',editable:false,
    	name:'pateName',value:p.get('pateName'),itemCls:'red-b',disabled:p.get('expeSubmitStatus')=='1'?true:false,
		tabIndex:33,store:HTStore.getPATE_S(),displayField:'pateName',valueField:'pateName',enableKeyEvents:true,
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,forceSeletion:true,
		listeners:{scope:this,
			select:function(c,r,i){
    			/*if(r.get('pateName')=='现付'){
    				txtSetDisabled();
    				if(txtExpenseTotal.getValue()!==''){
    					txtExpenseXff.setValue(txtExpenseTotal.getValue());
    				}
    			}*/
        	}
		}
	});
    //总运费（单票运费）
    var txtExpenseTotal2 = new Ext.form.NumberField({fieldLabel:'总运费',anchor:'95%',itemCls:'green-b',
    	name:'expenseTotal2',value:p.get('expenseTotal2'),disabled:p.get('expeSubmitStatus')=='1'?true:false,
    	enableKeyEvents:true,tabIndex:34,emptyText:'0000.00',allowBlank:true
    	/*listeners:{scope:this,
    		blur:function(f){
    			if(cboPateName.getValue()=='现付'&&f.getRawValue()!=''){
    				txtExpenseXff.setValue(f.getRawValue());
    			}else if(cboPateName.getValue()=='到付'&&f.getRawValue()!=''){
    				txtExpenseDff.setValue(f.getRawValue());
    			}else if(cboPateName.getValue()=='月结'&&f.getRawValue()!=''){
    				txtExpenseYjf.setValue(f.getRawValue());
    			}else if(cboPateName.getValue()=='回单付'&&f.getRawValue()!=''){
    				txtExpenseHdf.setValue(f.getRawValue());
    			}
    		}
    	}*/
    });
    //发货方付费
    var txtExpenseTotal = new Ext.form.NumberField({fieldLabel:'发货方付',anchor:'95%',
    	name:'expenseTotal',value:p.get('expenseTotal'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:35,emptyText:'0000.00',allowBlank:true,disabled:p.get('expeSubmitStatus')=='1'
    });
    //收货方付费
    var txtExpenseTotal3 = new Ext.form.NumberField({fieldLabel:'收货方付',anchor:'95%',
    	name:'expenseTotal3',value:p.get('expenseTotal3'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:36,emptyText:'0000.00',allowBlank:true,disabled:p.get('expeSubmitStatus')=='1'
    });
    //现付费
    var txtExpenseXff = new Ext.form.NumberField({fieldLabel:'现付',anchor:'95%',
    	name:'expenseXff',value:p.get('expenseXff'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:37,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //到付费
    var txtExpenseDff = new Ext.form.NumberField({fieldLabel:'到付',anchor:'95%',
    	name:'expenseDff',value:p.get('expenseDff'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:38,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //到付对象
	var cboArrivePayName = new Fos.CustomerLookup({fieldLabel:'到付对象',anchor:'95%',
		name:'arrivePayName',value:p.get('arrivePayName'),itemCls:'green-b',disabled:p.get('expeSubmitStatus')=='1'?true:false,
		store:HTStore.getCS(),enableKeyEvents:true,tabIndex:39,
		displayField:'custNameCn',valueField:'custNameCn',xtype:'customerLookup',custType:'custBookerFlag',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,bizType:BT_T,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		 listeners:{scope:this,
			 blur:function(f){
		 		if(f.getRawValue()==''){
		 			f.clearValue();
		 			p.set('arrivePayId','');
		 			p.set('consigneePateName','');
		 			cboConsigneePateName.setValue('');
		 			cboConsigneePateName.setDisabled(true);
		 		}},
		 	select:function(c,r,i){
		 		p.set('arrivePayId',r.get('id'));
		 		p.set('arrivePayName',r.get('custSname'));
		 		cboConsigneePateName.setDisabled(false);
		 	},
		 	keydown:{fn:function(f,e){
		 		LC(f,e,'custBookerFlag');
		 		if(e.getKey()==e.ENTER){
		 			
				}
		 	},buffer:BF}
		 }
	});
    
	//付款方式-收获单位付款给‘第三方物流’的付款方式‘到付’‘月结’
	var cboConsigneePateName = new Ext.form.ComboBox({fieldLabel:'到付款方式',anchor:'95%',
		name:'consigneePateName',value:p.get('consigneePateName'),itemCls:'green-b',disabled:true,
		tabIndex:40,store:HTStore.consigneePateName,displayField:'N',valueField:'C',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true
	});
	
    //回单付费
    var txtExpenseHdf = new Ext.form.NumberField({fieldLabel:'回单付',anchor:'95%',
    	name:'expenseHdf',value:p.get('expenseHdf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:41,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //月结费
    var txtExpenseYjf = new Ext.form.NumberField({fieldLabel:'月结',anchor:'95%',
    	name:'expenseYjf',value:p.get('expenseYjf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:42,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //仓储费
    var txtExpenseCcf = new Ext.form.NumberField({fieldLabel:'仓储费',anchor:'95%',
    	name:'expenseCcf',value:p.get('expenseCcf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:43,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'
    });
    //代收款
    var txtExpenseDsf = new Ext.form.NumberField({fieldLabel:'代收款',anchor:'95%',
    	name:'expenseDsf',value:p.get('expenseDsf'),itemCls:'green-b',
    	enableKeyEvents:true,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1',tabIndex:44
    });
   
    //服务项目
    var txtServiceItems = new Ext.form.TextField({fieldLabel:'服务项目',anchor:'95%',								//注释
    	name:'serviceItems',value:p.get('serviceItems'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //客户部门
    var txtCustGrouName = new Ext.form.TextField({fieldLabel:'客户部门',anchor:'95%',								//注释
    	name:'custGrouName',value:p.get('custGrouName'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //装货人
    var txtLoadContact = new Ext.form.TextField({fieldLabel:'装货人',anchor:'95%',								//注释
    	name:'loadContact',value:p.get('loadContact'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //装货电话
    var txtLoadTel = new Ext.form.TextField({fieldLabel:'装货电话',anchor:'95%',									//注释
    	name:'loadTel',value:p.get('loadTel'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
    //操作要求
    var cboOperateWay = new Ext.form.ComboBox({fieldLabel:'操作要求',anchor:'95%',									//注释
    	name:'operateWay',value:p.get('operateWay'),
		store:HTStore.T_OPERATE_S,displayField:'N',valueField:'N',
		enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
    //服务方式
    var cboServiceWay = new Ext.form.ComboBox({fieldLabel:'服务方式',anchor:'95%',									//注释
    	name:'serviceWay',value:p.get('serviceWay'),
		store:HTStore.T_SERVICE_S,displayField:'N',valueField:'N',
		enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
	//运输方式:自提/到货送货
	var cboTransportWay = new Ext.form.ComboBox({fieldLabel:'送货方式',anchor:'95%',								//注释
		name:'transportWay',value:p.get('transportWay'),
		store:transTypeStore,displayField:'transTypeName',
		valueField:'transTypeName',enableKeyEvents:true,
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
	});
	
	//路由站
	var txtRouteStation = new Ext.form.TextField({fieldLabel:'路由站',anchor:'95%',								//注释
		name:'routeStation',value:p.get('routeStation'),
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
	//到达网点
	var cboEndSite = new Ext.form.TextField({fieldLabel:'到达网点',anchor:'95%',									//注释
		name:'endSit',value:p.get('endSit'),
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
	//发运网点
	var cboStartSite = new Ext.form.TextField({fieldLabel:'发运网点',anchor:'95%',									//注释
		name:'startSite',value:p.get('startSite'),
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
	//工厂
	var cboTransportPlace = new Ext.form.TextField({fieldLabel:'工厂',anchor:'95%',							//注释
		name:'transportPlace',value:p.get('transportPlace'),
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
	});
	//送货上楼-是：否
    var cboDeliveryDoor = new Ext.form.ComboBox({fieldLabel:'送货上楼',anchor:'95%',								//注释
    	name:'deliveryDoor',value:p.get('deliveryDoor'),
    	store:HTStore.T_BOOLEAN_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
  //代客装卸-是：否
    var cboReplaceLoad = new Ext.form.ComboBox({fieldLabel:'代客装卸',anchor:'95%',								//注释
    	name:'replaceLoad',value:p.get('replaceLoad'),
    	store:HTStore.T_BOOLEAN_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //合同号
    var txtContractNo = new Ext.form.TextField({fieldLabel:'合同号',anchor:'95%',								//注释
    	name:'contractNo',value:p.get('contractNo'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
    //车辆类型
    var cboTransportVehicle = new Ext.form.ComboBox({fieldLabel:'车辆类型',anchor:'95%',
    	name:'transportVehicle',value:p.get('transportVehicle'),
    	enableKeyEvents:true,store:HTStore.getVETY_S(),
    	displayField:'vehicleClassName',valueField:'vehicleClassName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
	});
    //合同时效
    var dtContractDate = new Ext.form.DateField({fieldLabel:'合同时效',anchor:'95%',								//注释
    	name:'contractDate',value:p.get('contractDate'),
    	enableKeyEvents:true,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //保险公司
    var txtPremiumCompany = new Fos.CustomerLookup({fieldLabel:'保险公司',anchor:'95%',						   //注释
    	name:'premiumCompany',value:p.get('premiumCompany'),
    	enableKeyEvents:true,store:HTStore.getCS(),tpl:custTpl,itemSelector:'div.list-item',
    	listWidth:C_LW,displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
    	triggerAction:'all',selectOnFocus:true,custType:'custInsuranceFlag',bizType:BT_T,
    	listeners:{scope:this,
    		keydown:{fn:function(f,e){
		 		LC(f,e,'custInsuranceFlag');
		 		if(e.getKey()==e.ENTER){
		 			
				} 
		 	},buffer:BF}
		}
    });
    //回访电话
    var txtFeedbackTel = new Ext.form.TextField({fieldLabel:'回访电话',anchor:'95%',							//注释
    	name:'feedbackTel',value:p.get('feedbackTel'),
    	enableKeyEvents:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
    
    var frm = new Ext.form.FormPanel({
    	title:'托运单信息',layout:'fit',frame:true,iconCls:'list-items',autoScroll:true,
    	items:[
    	  {title:'单票信息',xtype:'fieldset',checkboxToggle:false,autoWidth:true,autoHeight:true,layout:'column',items:[
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtConsNo,dtConsDate,cboStatus,cboFeedbackWay]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboGrouName,txtConsNoHandler,dtLoadDate,cboFeedbackNumber]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboSalesRepName,txtStartStation,dtArNewDate,ckbSignInStatus]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboConsOperatorName,txtEndStation,dtSignInDate,txtSignInContact]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboCustName]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboConsBelong]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboCustContact]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtCustMobile]},
    	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtCargoStatus]},
    	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtRemarks]}
    	  ]},
    	  {layout:'column',items:[
         	 {title:'发  货 方',xtype:'fieldset',columnWidth:.5,layout:'column',bodyStyle:'padding:10px; 10px; 10px; 0px;',items:[
             {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtShipperName]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtShipperContact]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtShipperTel]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtShipperMobile]},
       	     {layout:'form',columnWidth:1,border:false,labelWidth:58,items:[txtLoadAddress]}
             ]},
             {title:'收  货 方',xtype:'fieldset',columnWidth:.5,layout:'column',bodyStyle:'padding:10px; 10px; 10px; 0px;',items:[
        	 {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[cboConsigneeName]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtConsigneeContact]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtConsigneeTel]},
       	     {layout:'form',columnWidth:.5,border:false,labelWidth:58,items:[txtConsigneeMobile]},
       	     {layout:'form',columnWidth:1,border:false,labelWidth:58,items:[txtDeliveryAddress]}
       	     ]}
    	  ]},
    	  {title:'运费信息',xtype:'fieldset',checkboxToggle:false,autoWidth:true,autoHeight:true,layout:'column',items:[
       	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboPateName]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseTotal2]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseTotal]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseTotal3]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseXff]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseDff]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[cboArrivePayName]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:78,items:[cboConsigneePateName]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseHdf]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseYjf]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseCcf]},
    	     {layout:'form',columnWidth:.25,border:false,labelWidth:58,items:[txtExpenseDsf]}
    	  ]}
    	]
    });
    
	var cboMotorcadeName = new Fos.CustomerLookup({
		fieldLabel:C_CARRIER_UNIT,name:'motorcadeName',value:p.get('motorcadeName'),
	 	tabIndex:1,store:HTStore.getCS(),enableKeyEvents:true,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'local',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcadeId','');
					p.set('motorcadeName','');
					txtMotorcadeContact.setValue('');
					txtMotorcadeTel.setValue('');
					txtMotorcadeFax.setValue('');
				}
			},
			select:function(c,r,i){
				p.set('motorcadeId',r.get('id'));
				txtMotorcadeContact.setValue(r.get('custContact'));
				txtMotorcadeTel.setValue(r.get('custTel'));

		 		var custId=r.get('id');
				var store=txtMotorcadeContact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcadeContact.setValue(record.get('cucoName'));

					 		txtMotorcadeTel.setValue(record.get('cucoMobile'));
					 		txtMotorcadeFax.setValue(record.get('cucoAddress1'));
					 		txtMotorcadeFax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcadeContact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');		//承运商
					if(e.getKey()==e.ENTER){
						txtMotorcadeContact.focus();
					}
				},buffer:BF
			}
		}
	});
	
	/*var txtMotorcadeContact = new Ext.form.TextField({fieldLabel:'联系人',enableKeyEvents:true,
		name:'motorcadeContact',value:p.get('motorcadeContact'),tabIndex:2,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeTel.focus();
				} 
			}
		}
	});*/
	var txtMotorcadeContact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:2,anchor:'95%',
		name:'motorcadeContact',value:p.get('motorcadeContact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcadeTel.setValue(r.get('cucoMobile'));
		 		txtMotorcadeFax.setValue(r.get('cucoAddress1'));
		 		txtMotorcadeFax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	var txtMotorcadeTel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcadeTel',value:p.get('motorcadeTel'),tabIndex:3,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeFax.focus();
				} 
			}
		}
	});
	var txtMotorcadeFax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcadeTel',value:p.get('motorcadeFax'),tabIndex:4,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeNo.focus();
				} 
			}
		}
	});
	var txtMotorcadeNo = new Ext.form.TextField({fieldLabel:'物流单号',enableKeyEvents:true,
		name:'motorcadeNo',value:p.get('motorcadeNo'),tabIndex:5,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtEmptyMiles.focus();
				}
			}
		}
	});
	//空载公里数-物流商
	var txtEmptyMiles = new Ext.form.NumberField({fieldLabel:C_EMPTY_MILES,enableKeyEvents:true,
		name:'emptyMiles',value:p.get('emptyMiles'),tabIndex:6,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtHeavyMiles.focus();
				} 
			}
		}
	});
	//重载公里数-物流商
	var txtHeavyMiles = new Ext.form.NumberField({fieldLabel:C_HEAVY_MILES,enableKeyEvents:true,
		name:'heavyMiles',value:p.get('heavyMiles'),tabIndex:7,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDriver.focus();
				} 
			}
		}
	});
	//驾驶员-物流商
	var cboDriver = new Ext.form.ComboBox({fieldLabel:C_DRIVER,enableKeyEvents:true,
			name:'driverName',value:p.get('driverName'),tabIndex:8,store:driverStroe,		
			displayField:'driverName',valueField:'driverName',typeAhead:true,mode:'remote',
			triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('driverId',r.get('id'));
				},
				keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						cboVehicle.focus();
					} 
				}
			}
		});
	//车牌号-物流商
	var cboVehicle = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,enableKeyEvents:true,
		name:'vehicleNo',value:p.get('vehicleNo'),tabIndex:9,store:vehicleStroe,
		displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtStartDate.focus();
				}
			}
		}
	 });
	//发货日期-物流商
	var dtStartDate = new Ext.form.DateField({fieldLabel:'发货日期',anchor:'95%',
		enableKeyEvents:true,name:'startDate',value:p.get('startDate'),tabIndex:10,format:DATEF,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2Name.focus();
				}
			}
		}
	});
	//物流商-付款方式
	var cboPayWay = new Ext.form.ComboBox({fieldLabel:'付款方式',enableKeyEvents:true,
    	name:'motorcadePateName',value:p.get('motorcadePateName'),itemCls:'green-b',
		tabIndex:11,store:HTStore.getPATE_S(),displayField:'pateName',valueField:'pateName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		disabled:p.get('expeSubmitStatus2')=='1',
		listeners:{scope:this,
			select:function(c,r,i){
    			/*if(r.get('motorcadePateName')=='现付'){
    				if(motorcadeExpense.getValue()!==''){
    					motorcadeExpenseXff.setValue(motorcadeExpense.getValue());
    				}
    			}*/
        	}
		}
	});
    //第一物流商(物流运费）
    var motorcadeExpense2 = new Ext.form.NumberField({fieldLabel:'物流运费',itemCls:'green-b',
    	enableKeyEvents:true,name:'motorcadeExpense2',value:p.get('motorcadeExpense2'),
    	tabIndex:17,emptyText:'0000.00',allowBlank:true,anchor:'95%',disabled:p.get('expeSubmitStatus2')=='1'
    });
    //第一物流商-现付
    var motorcadeExpenseXff = new Ext.form.NumberField({fieldLabel:'现付',enableKeyEvents:true,itemCls:'green-b',
    	name:'motorcadeExpenseXff',value:p.get('motorcadeExpenseXff'),
    	disabled:p.get('expeSubmitStatus2')=='1'?true:false,
    	tabIndex:12,emptyText:'0000.00',allowBlank:true,anchor:'95%',
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    
    //第一物流商-到付
    var motorcadeExpenseDff = new Ext.form.NumberField({fieldLabel:'到付',enableKeyEvents:true,itemCls:'green-b',
    	name:'motorcadeExpenseDff',value:p.get('motorcadeExpenseDff'),
    	disabled:p.get('expeSubmitStatus2')=='1'?true:false,
    	tabIndex:13,emptyText:'0000.00',allowBlank:true,anchor:'95%',
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    
    //第一物流商-月结
    var motorcadeExpenseYjf = new Ext.form.NumberField({fieldLabel:'月结',enableKeyEvents:true,
    	name:'motorcadeExpenseYjf',value:p.get('motorcadeExpenseYjf'),itemCls:'green-b',
    	disabled:p.get('expeSubmitStatus2')=='1'?true:false,
    	tabIndex:15,emptyText:'0000.00',allowBlank:true,anchor:'95%',
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    
    //第一物流商-回单付
    var motorcadeExpenseHdf = new Ext.form.NumberField({fieldLabel:'回单付',enableKeyEvents:true,itemCls:'green-b',
    	name:'motorcadeExpenseHdf',value:p.get('motorcadeExpenseHdf'),
    	disabled:p.get('expeSubmitStatus2')=='1'?true:false,
    	tabIndex:14,emptyText:'0000.00',allowBlank:true,anchor:'95%',
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //第一物流商-中转回扣
    var motorcadeExpenseHkf = new Ext.form.NumberField({fieldLabel:'中转回扣',enableKeyEvents:true,itemCls:'green-b',
    	name:'motorcadeExpenseHkf',value:p.get('motorcadeExpenseHkf'),
    	tabIndex:16,emptyText:'0000.00',allowBlank:true,anchor:'95%',
    	disabled:p.get('expeSubmitStatus2')=='1'
    });
    
	var cboMotorcade2Name = new Fos.CustomerLookup({fieldLabel:C_CARRIER_UNIT,enableKeyEvents:true,
		name:'motorcade2Name',value:p.get('motorcade2Name'),
	 	tabIndex:11,store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'local',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcade2Id','');
					p.set('motorcade2Name','');
				}
			},
			select:function(c,r,i){
				p.set('motorcade2Id',r.get('id'));
				txtMotorcade2Contact.setValue(r.get('custContact'));
				txtMotorcade2Tel.setValue(r.get('custTel'));
				var custId=r.get('id');
				var store=txtMotorcade3Contact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcade2Contact.setValue(record.get('cucoName'));

					 		txtMotorcade2Tel.setValue(record.get('cucoMobile'));
					 		txtMotorcade2Fax.setValue(record.get('cucoAddress1'));
					 		txtMotorcade2Fax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcade2Contact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');		//承运商
					if(e.getKey()==e.ENTER){
						txtMotorcade2Contact.focus();
					} 
				},buffer:BF
			}
		}
	});
	
	/*var txtMotorcade2Contact = new Ext.form.TextField({fieldLabel:'联系人',enableKeyEvents:true,
		name:'motorcade2Contact',value:p.get('motorcade2Contact'),tabIndex:12,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Tel.focus();
				} 
			}
		}
	});	*/
	var txtMotorcade2Contact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:12,anchor:'95%',
		name:'motorcade2Contact',value:p.get('motorcade2Contact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcade2Tel.setValue(r.get('cucoMobile'));
		 		txtMotorcade2Fax.setValue(r.get('cucoAddress1'));
		 		txtMotorcade2Fax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				}
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	var txtMotorcade2Tel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcade2Tel',value:p.get('motorcade2Tel'),tabIndex:13,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Fax.focus();
				} 
			}
		}
	});
	var txtMotorcade2Fax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcade2Fax',value:p.get('motorcade2Fax'),tabIndex:14,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2No.focus();
				} 
			}
		}
	});
	var txtMotorcade2No = new Ext.form.TextField({fieldLabel:'承运单号',enableKeyEvents:true,
		name:'motorcade2No',value:p.get('motorcade2No'),tabIndex:15,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2Province.focus();
				} 
			}
		}
	});
	
	var cboMotorcade2Province = new Ext.form.ComboBox({fieldLabel:'省',tabIndex:16,
		name:'motorcade2Province',value:p.get('motorcade2Province'),enableKeyEvents:true,
      	store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
      	typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
      	listeners:{scope:this,
      		select:function(c,r,v){
	     		p.set('motorcade2ProvinceId',r.get('id'));
	     	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
	     	 	cboMotorcade2City.store.baseParams= bp;
	     	 	cboMotorcade2City.store.reload();
	      	},
	      	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2City.focus();
				} 
			}
      	 }
	});
	var cboMotorcade2City = new Ext.form.ComboBox({fieldLabel:'市/县',tabIndex:17,name:'motorcade2City',
    	value:p.get('motorcade2City'),enableKeyEvents:true,
     	store:HTStore.getCITY_S(p.get('motorcade2ProvinceId')),xtype:'combo',displayField:'placName',valueField:'placName',
     	typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
     	listeners:{
     		select:function(c,r,v){
	     		p.set('motorcade2CityId',r.get('id'));
	     	},
	     	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Address.focus();
				} 
			}
     	 }
	});
	var txtMotorcade2Address = new Ext.form.TextField({fieldLabel:'地址',enableKeyEvents:true,
		name:'motorcade2Address',value:p.get('motorcade2Address'),tabIndex:18,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade2StartDate.focus();
				} 
			}
		}
	});
	var dtMotorcade2StartDate = new Ext.form.DateField({fieldLabel:'起运日期',enableKeyEvents:true,
		name:'motorcade2StartDate',value:p.get('motorcade2StartDate'),tabIndex:19,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade2EndDate.focus();
				} 
			}
		}
	});
	//到货日期-物流商2
	var dtMotorcade2EndDate = new Ext.form.DateField({fieldLabel:'到货日期',enableKeyEvents:true,
		name:'motorcade2EndDate',value:p.get('motorcade2EndDate'),tabIndex:20,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3Name.focus();
				} 
			}
		}
	});
	
	var cboMotorcade3Name = new Fos.CustomerLookup({fieldLabel:C_CARRIER_UNIT,enableKeyEvents:true,
		name:'motorcade3Name',value:p.get('motorcade3Name'),
	 	tabIndex:21,store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcade3Id','');
					p.set('motorcade3Name','');
				}
			},
			select:function(c,r,i){
				p.set('motorcade3Id',r.get('id'));
				txtMotorcade3Contact.setValue(r.get('custContact'));
				txtMotorcade3Tel.setValue(r.get('custTel'));
				var custId=r.get('id');
				var store=txtMotorcade3Contact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcade3Contact.setValue(record.get('cucoName'));

					 		txtMotorcade3Tel.setValue(record.get('cucoMobile'));
					 		txtMotorcade3Fax.setValue(record.get('cucoAddress1'));
					 		txtMotorcade3Fax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcade3Contact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');
					if(e.getKey()==e.ENTER){
						txtMotorcade3Contact.focus();
					} 
				},buffer:BF
			}
		}
	});
	var txtMotorcade3Contact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:22,anchor:'95%',
		name:'motorcade3Contact',value:p.get('motorcade3Contact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcade3Tel.setValue(r.get('cucoMobile'));
		 		txtMotorcade3Fax.setValue(r.get('cucoAddress1'));
		 		txtMotorcade3Fax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	
	var txtMotorcade3Tel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcade3Tel',value:p.get('motorcade3Tel'),tabIndex:23,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3Fax.focus();
				} 
			}
		}
	});
	
	var txtMotorcade3Fax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcade3Fax',value:p.get('motorcade3Fax'),tabIndex:24,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3No.focus();
				} 
			}
		}
	});
	var txtMotorcade3No = new Ext.form.TextField({fieldLabel:'承运单号',enableKeyEvents:true,
		name:'motorcade3No',value:p.get('motorcade3No'),tabIndex:25,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3Province.focus();
				} 
			}
		}
	});
	var cboMotorcade3Province = new Ext.form.ComboBox({fieldLabel:'省份',tabIndex:26,
		name:'motorcade3Province',value:p.get('motorcade3Province'),enableKeyEvents:true,
      	store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
      	typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
      	listeners:{scope:this,
      		select:function(c,r,v){
	     	 	p.set('motorcade2ProvinceId',r.get('id'));
	     	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
	     	 	cboMotorcade3City.store.baseParams= bp;
	     	 	cboMotorcade3City.store.reload();
	      	},
	      	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3City.focus();
				} 
			}
      	}
	});
	var cboMotorcade3City = new Ext.form.ComboBox({fieldLabel:'市/县',tabIndex:27,
		name:'motorcade3City',value:p.get('motorcade3City'),enableKeyEvents:true,
     	store:HTStore.getCITY_S(p.get('motorcade3ProvinceId')),
     	displayField:'placName',valueField:'placName',
     	typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
     	listeners:{
     		select:function(c,r,v){
     			p.set('motorcade3CityId',r.get('id'));
     		},
     		keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3Address.focus();
				} 
			}
     	}
	});
	var txtMotorcade3Address = new Ext.form.TextField({fieldLabel:'地址',enableKeyEvents:true,
		name:'motorcade3Address',value:p.get('motorcade3Address'),tabIndex:28,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade3StartDate.focus();
				}
			}
		}
	});
	var dtMotorcade3StartDate = new Ext.form.DateField({fieldLabel:'起运日期',enableKeyEvents:true,
		name:'motorcade3StartDate',value:p.get('motorcade3StartDate'),tabIndex:29,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade3EndDate.focus();
				}
			}
		}
	});
	//到货日期-物流商3
	var dtMotorcade3EndDate = new Ext.form.DateField({fieldLabel:'到货日期',
		name:'motorcade3EndDate',value:p.get('motorcade3EndDate'),tabIndex:30,format:DATEF,anchor:'95%'});
	
	var vendorPanel = new Ext.Panel({title:'物流商信息',layout:'border',iconCls:'list-items',items:[
	      {title:'物流商',layout:'column',layoutConfig:{columns:5},border:false,frame:true,region:'north',height:170,padding:5,iconCls:'',
	    	  items:[
		      {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[cboMotorcadeName,txtEmptyMiles,cboPayWay,motorcadeExpenseHkf]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcadeContact,txtHeavyMiles,motorcadeExpenseXff,motorcadeExpense2]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:40,items:[txtMotorcadeTel,cboDriver,motorcadeExpenseDff]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:46,items:[txtMotorcadeFax,cboVehicle,motorcadeExpenseHdf]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:54,items:[txtMotorcadeNo,dtStartDate,motorcadeExpenseYjf]}
	        ]},grid
	        /*{title:'第二程承运商',layout:'column',
	    		layoutConfig:{columns:5},border:false,frame:false,padding:5,items:[
	     	    {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[cboMotorcade2Name,cboMotorcade2Province]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Contact,cboMotorcade2City]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Tel,txtMotorcade2Address]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Fax,dtMotorcade2StartDate]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2No,dtMotorcade2EndDate]}
	     	]},
	     	{title:'第三程承运商',layout:'column',
	    		layoutConfig:{columns:5},border:false,frame:false,padding:5,items:[
	     	    {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[cboMotorcade3Name,cboMotorcade3Province]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Contact,cboMotorcade3City]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Tel,txtMotorcade3Address]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Fax,dtMotorcade3StartDate]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3No,dtMotorcade3EndDate]}
	     	]}*/
	     ]});
	
	this.save = function(){
		if(!HTUtil.checkFieldNotNull(C_CONS_DATE,dtConsDate))			//委托日期
			return;
		if(!HTUtil.checkFieldNotNull(C_BIZ_DEPARTMENT,cboGrouName))		//业务部门
			return;
		if(!HTUtil.checkFieldNotNull(C_SALES,cboSalesRepName))			//业务员
			return;
		if(!HTUtil.checkFieldNotNull(C_OPERATOR,cboConsOperatorName))	//操作员
			return;
		if(!HTUtil.checkFieldNotNull('手工单号',txtConsNoHandler))		//手工单号
			return;
		if(!HTUtil.checkFieldNotNull('始发站',txtStartStation))		 	//始发站
			return;
		if(!HTUtil.checkFieldNotNull('目的站',txtEndStation))			//目的站
			return;
		if(!HTUtil.checkFieldNotNull('委托单位',cboCustName))			//委托单位
			return;
		if(!p.get('custId')){
			Ext.Msg.alert(SYS,'请选择委托单位！',function(){cboCustName.focus();});
			return;
		}
		if(!HTUtil.checkFieldNotNull('发货单位',txtShipperName))			//发货单位
			return;
		if(!HTUtil.checkFieldNotNull('收货单位',cboConsigneeName))		//收货单位
			return;
		if(!HTUtil.checkFieldNotNull('付款方式',cboPateName))			//付款方式
			return;
		
		HTUtil.saveToRecord(this,p);									//将一个容器内的字段的值更新到一条record对象中
		var xml = HTUtil.RTX(p,'TConsign',TConsign);
		var a = store.getModifiedRecords();
		xml += HTUtil.ATX(a,'TConsignCargo',TConsignCargo);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TCON_S'},
			success: function(r){
				var rowAction = p.get('rowAction');
				var c = HTUtil.XTR(r.responseXML,'TConsign',TConsign);
				HTUtil.RU(c, p,TConsign);
				var a = HTUtil.XTRA(r.responseXML,'TConsignCargo',TConsignCargo);
				HTUtil.RUA(store, a, TConsignCargo);
				if (rowAction=='N'){
					listStore.insert(0,p);
					listStore.reload();
					txtConsNo.setValue(p.get('consNo'));
				}else{
					listStore.reload();
				}
				this.updateToolbar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
			xmlData:HTUtil.HTX(xml)});
	};
	
	//费用
	this.showExp = function(){
    	createWindow('EXPE_'+p.get("uuid"),C_EXPE+'-'+p.get('consNo'),new Fos.ExpenseTab(p),true);
    };

    //收款提交
    this.expenseSubmitRe = function(){
    	Ext.Msg.confirm(SYS,'您确定收款提交吗？',function(btn){
        	if(btn == 'yes') {
        		var hk=0;
        		var df=0;
        		var mdf=0;
        		if(motorcadeExpenseHkf){
        			hk=motorcadeExpenseHkf.getValue();
        		}
        		if(txtExpenseDff){
        			df=txtExpenseDff.getValue();
        		}
        		if(motorcadeExpenseDff){
        			mdf=motorcadeExpenseDff.getValue();
        		}
        		if(hk==0){
        			if(df>mdf){
        				if(cboArrivePayName.getValue()==''){
        					Ext.Msg.alert(SYS,'请确认是否有中转回扣，并选择到付对象以及到付款方式！',function(){cboArrivePayName.focus();});
        					return;
        				}
        				if(!p.get('arrivePayId')){
        					Ext.Msg.alert(SYS,'不要手工输入到付对象，请选择到付对象！',function(){cboArrivePayName.focus();});
        					return;
        				}
        				if(cboConsigneePateName.getValue()==''||cboConsigneePateName.getValue()==0){
        					Ext.Msg.alert(SYS,'请选择到付款方式！',function(){cboConsigneePateName.focus();});
        					return;
        				}
        				
        			}
        		}else{
        			if(!HTUtil.checkFieldNotNull('物流商',cboMotorcadeName))				//物流商
        			return;
        		}
        		var xml = HTUtil.RTX(p,'TConsign',TConsign);
        		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TCONS_EXPE_R'},
        			success: function(r){
        				var c = HTUtil.XTR(r.responseXML,'TConsign',TConsign);
        				HTUtil.RU(c, p,TConsign);
        				btnExpenseSubmitRe.setDisabled(p.get('rowAction')=='N'||p.get('expeSubmitStatus')=='1');
        				Ext.Msg.alert(SYS,M_S);
        				txtExpenseTotal.setDisabled(true);
        				txtExpenseTotal2.setDisabled(true);
        				txtExpenseTotal3.setDisabled(true);
        				txtExpenseXff.setDisabled(true);
        		    	txtExpenseDff.setDisabled(true);
        		    	cboPateName.setDisabled(true);
        				cboConsigneePateName.setDisabled(true);
        		    	txtExpenseYjf.setDisabled(true);
        		    	txtExpenseHdf.setDisabled(true);
        		    	txtExpenseCcf.setDisabled(true);
        		    	txtExpenseDsf.setDisabled(true);
        		    	listStore.reload();
        			},
        			failure:function(r){Ext.Msg.alert(SYS,'提交失败！');},
        			xmlData:HTUtil.HTX(xml)});
        	}
		},this)
    };
    //付款提交
    this.expenseSubmitPa = function(){
    	Ext.Msg.confirm(SYS,'您确定付款提交吗？',function(btn){
    		if(btn == 'yes') {
    			if(!HTUtil.checkFieldNotNull('物流商',cboMotorcadeName))				//物流商
        			return;
    			
    			var xml = HTUtil.RTX(p,'TConsign',TConsign);
        		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TCONS_EXPE_P'},
        			success: function(r){
        				var c = HTUtil.XTR(r.responseXML,'TConsign',TConsign);
        				HTUtil.RU(c, p,TConsign);
        				btnExpenseSubmitPa.setDisabled(p.get('rowAction')=='N'||p.get('expeSubmitStatus2')=='1');
        				Ext.Msg.alert(SYS,M_S);
        				cboPayWay.setDisabled(true);
        				motorcadeExpense2.setDisabled(true);
        				motorcadeExpenseXff.setDisabled(true);
        				motorcadeExpenseDff.setDisabled(true);
        				motorcadeExpenseYjf.setDisabled(true);
        				motorcadeExpenseHdf.setDisabled(true);
        				motorcadeExpenseHkf.setDisabled(true);
        				listStore.reload();
        			},
        			failure:function(r){Ext.Msg.alert(SYS,'提交失败！');},
        			xmlData:HTUtil.HTX(xml)});
    		}
    	},this)
    };
    //运费修改
    this.expenseUpdate = function(){
    	txtExpenseTotal.setDisabled(false);
    	txtExpenseTotal2.setDisabled(false);
    	txtExpenseTotal3.setDisabled(false);
    	txtExpenseXff.setDisabled(false);
    	txtExpenseDff.setDisabled(false);
    	cboPateName.setDisabled(false);
		cboConsigneePateName.setDisabled(false);
    	cboArrivePayName.setDisabled(false);
    	txtExpenseHdf.setDisabled(false);
    	txtExpenseYjf.setDisabled(false);
    	txtExpenseCcf.setDisabled(false);
    	txtExpenseDsf.setDisabled(false);
    	
    	cboPayWay.setDisabled(false);
		motorcadeExpenseHkf.setDisabled(false);
		motorcadeExpenseXff.setDisabled(false);
		motorcadeExpenseDff.setDisabled(false);
		motorcadeExpenseHdf.setDisabled(false);
		motorcadeExpenseYjf.setDisabled(false);
    	motorcadeExpense2.setDisabled(false);
    };
    //短信通知
    this.sms=function(){
		var a = store.getRange();
		var orderNo='';
		for(var i=0;i<a.length;i++){
			if(a.length<4){
				orderNo+=a[i].get('orderNo')+',';
			}else{
				orderNo=a[0].get('orderNo')+'....'+a[a.length-1].get('orderNo')+',';
			}
		}
		var mobile=p.get('custMobile');
		var consigneeName=p.get('consigneeName');
		var signDate = p.get('signInDate');
		var content='您好！订单'+orderNo+'发往'+consigneeName;
		/*
		content += '，于'+signDate.format('m')+'月'+signDate.format('d')+'日已签收，如有疑问请联系：';*/
		content += p.get('consOperatorName') + '，谢谢！';
		var consId=p.get('id');
		var consNo=p.get('consNo');
		var bizType=BT_T;
		var consNoHandler=p.get('consNoHandler');
		var win = new Fos.SMSWin(mobile,content,consId,consNo,bizType,consNoHandler);
		win.show();
    };
    //单票货物跟踪状态
	this.showTracing = function(){
		var win = new Fos.PEventWin(p);
		win.show();
	};
	//更新Toolbar
    this.updateToolbar = function(){
    	btnSave.setDisabled(NR(M1_CONS+F_M));
    	btnTracing.setDisabled(NR(M1_CONS)||p.get('rowAction')=='N');
    	btnExpenseSubmitRe.setDisabled(NR(M1_CONS+F_S_R)||p.get('rowAction')=='N'||p.get('expeSubmitStatus')=='1');
    	btnExpenseSubmitPa.setDisabled(NR(M1_CONS+F_S_P)||p.get('rowAction')=='N'||p.get('expeSubmitStatus2')=='1');
    	btnExpenseUpdate.setDisabled(NR(M1_CONS+F_S_U));
    	btnShowExpense.setDisabled(NR(M1_CONS+F_EXPE));
    	//btnSendMessage.setDisabled(NR(M1_CONS)||p.get('rowAction')=='N'||p.get('smsStatus')=='1');
    };
    //附件上传
    this.showAttach = function(){
    	var win = new Fos.AttachWin('T',p.get('id'),p.get('consNo'));
    	win.show();
    };
    //按钮-保存
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_CONS+F_M)||p.get('editable')=='0',
		scope:this,handler:this.save});
	//按钮-费用
	var btnShowExpense = new Ext.Button({text:C_EXPE,iconCls:'dollar',
		disabled:NR(M1_CONS+F_EXPE)||p.get('rowAction')=='N',
		scope:this,handler:this.showExp});
	//按钮-短信发送
	var btnSendMessage = new Ext.Button({text:MSG_NOTICE,itemId:'TB_NE',iconCls:'mail',
		disabled:NR(M1_CONS)||p.get('rowAction')=='N'||p.get('smsStatus')=='1',
		scope:this,handler:this.sms});
	//按钮-货物跟踪
	var btnTracing = new Ext.Button({text:C_CARGO_TRACING,iconCls:'add',
		disabled:NR(M1_CONS)||p.get('rowAction')=='N',
		scope:this,handler:this.showTracing});
	//按钮-文件上传
	var bAttach = new Ext.Button({text:C_ATTACH,iconCls:'news',
		disabled:NR(M1_CONS)||p.get('rowAction')=='N',
		scope:this,handler:this.showAttach});
	//按钮-收款结算
	var btnExpenseSubmitRe = new Ext.Button({text:'收款提交',iconCls:'dollar',
		disabled:NR(M1_CONS+F_S_R)||p.get('rowAction')=='N'||p.get('expeSubmitStatus')=='1',
		scope:this,handler:this.expenseSubmitRe});
	//按钮-收款结算
	var btnExpenseSubmitPa = new Ext.Button({text:'付款提交',iconCls:'dollar',
		disabled:NR(M1_CONS+F_S_P)||p.get('rowAction')=='N'||p.get('expeSubmitStatus2')=='1',
		scope:this,handler:this.expenseSubmitPa});
	//按钮-运费修改
	var btnExpenseUpdate = new Ext.Button({text:'运费修改',iconCls:'dollar',
		disabled:NR(M1_CONS+F_S_U)||p.get('rowAction')=='N',
		scope:this,handler:this.expenseUpdate});
	//再次添加
    this.reAdd = function(){
    	new Fos.TConsignGrid().add();
    };
	//按钮-添加
	var btnReAdd = new Ext.Button({text:'新增',iconCls:'add',
		disabled:NR(M1_CONS+F_ADD)||p.get('rowAction')=='N',
		scope:this,handler:this.reAdd});
	//输出托运单
	this.expConsignTemplate = function(n){
		EXPC(n,'&id='+p.get('id'));
	};
	var exportConsigneeTemplate={text:"普通货托运单",scope:this,iconCls:'right',handler:function(){this.expConsignTemplate("TCONSIGN_TEMPLATE");}};
	var exportReceiptTemplate={text:"货物运输回单",scope:this,iconCls:'right',handler:function(){this.expConsignTemplate("TRECEIPT_TEMPLATE");}};
	var exportTemplate = {text:"模板输出",iconCls:'print',menu:{items:[exportConsigneeTemplate,exportReceiptTemplate]}};
	Fos.TConsTab.superclass.constructor.call(this,{layout:'fit',
		tbar:[btnSave,'-',btnExpenseSubmitRe,'-',btnExpenseSubmitPa,'-',btnExpenseUpdate,'-',
			//btnSendMessage,'-',
			btnTracing,'-',btnShowExpense,'-',exportTemplate,'-'],
		items:[{activeTab:0,xtype:'tabpanel',items:[frm,vendorPanel]}],
		bbar:[getMB(p)]
	});
};
Ext.extend(Fos.TConsTab, Ext.Panel);

//陆运复杂查询
Fos.TConsignSearchWin = function(action,store,txtSumR,txtSumHk,txtSumP,txtSumMargin,txtSumShipR,txtSumConsR){
	var pageLimit=C_PS30;
	if(txtSumR){
		pageLimit=C_PS100;
	}
	//回单核销状态
	var cboMotoWriteOfStatusP = new Ext.form.ComboBox({fieldLabel:'回单核销',store:HTStore.WRITE_OFF_STATUS,width:158,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	var cboMotoWriteOfStatusR = new Ext.form.ComboBox({fieldLabel:'回扣核销',store:HTStore.WRITE_OFF_STATUS,width:162,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	//发货方核销状态
	var cboShipWriteOfStatusR = new Ext.form.ComboBox({fieldLabel:'收发货方款',store:HTStore.WRITE_OFF_STATUS,width:158,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	//收货方核销状态
	var cboConsWriteOfStatusR = new Ext.form.ComboBox({fieldLabel:'收收货方款',store:HTStore.WRITE_OFF_STATUS,width:158,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,editable:false
	});
	var panel = new Ext.Panel({plain:true,height:340,layout:'column',title:'综合查询',id:'T_CONS_LOOK_1',
		padding:5,items:[
			{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	    	items:[
		    	{fieldLabel:'托运单号',name:'consNo',xtype:'textfield',tabIndex:1,anchor:'95%',
		    		listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
		    	},
		    	{fieldLabel:'提货状态',name:'status',tabIndex:4,
					store:HTStore.loadStatus,xtype:'combo',
					displayField:'N',valueField:'C',typeAhead:true,mode:'local',triggerAction:'all',
					selectOnFocus:true,anchor:'95%',editable:false,
					listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
		    	},
				{fieldLabel:'物流商',name:'motorcadeName',
					store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custCarrierFlag',bizType:BT_T,
					 displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',tabIndex:7,
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},buffer:500}}
		    	},
	            {fieldLabel:'收货单位',name:'consigneeName',xtype:'textfield',anchor:'95%',tabIndex:10,
	            	listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
	             },
	             {fieldLabel:'操作帐号',name:'consOperatorName',xtype:'textfield',anchor:'95%',tabIndex:13,
	            	listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
	             },
	             cboShipWriteOfStatusR
          ]},
	      	{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	   		items:[
	   		    {fieldLabel:'委托单位',name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custBookerFlag',bizType:BT_T,
					 displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',tabIndex:2,
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:500}}},
	   		    {fieldLabel:'委托日期',name:'consDate',xtype:'datefield',format:DATEF,tabIndex:5,anchor:'95%'},
	   		    {fieldLabel:'提货日期',name:'loadDate',xtype:'datefield',format:DATEF,tabIndex:8,anchor:'95%'},
	   		    {fieldLabel:'收货人',name:'consigneeContact',anchor:'95%',tabIndex:11,xtype:'textfield',
	   		    	listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
	   		    },
	   		    cboMotoWriteOfStatusP,
	   		    cboConsWriteOfStatusR
		       ]},
			{columnWidth:.34,layout:'form',border:false,labelWidth:80,labelAlign:"right",
			items:[
			    {fieldLabel:'委托人',name:'custContact',xtype:'textfield',tabIndex:3,anchor:'95%',
			    	listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
			    },
			    {fieldLabel:'日期'+C_TO,name:'consDate2',xtype:'datefield',format:DATEF,tabIndex:6,anchor:'95%'},
			    {fieldLabel:'日期'+C_TO,name:'loadDate2',xtype:'datefield',format:DATEF,tabIndex:9,anchor:'95%'},
			    {fieldLabel:'物流单号',name:'motorcadeNo',xtype:'textfield',tabIndex:12,anchor:'95%',
			    	listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
			    },
			    cboMotoWriteOfStatusR
			]}
	]});
	var panel2 = new Ext.Panel({plain:true,height:340,layout:'column',title:'订单编号',
		defaults:{bodyStyle:'padding:10px'},id:'T_CONS_LOOK_2',items:[
			{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
				items:[{fieldLabel:'订单编号',name:'orderNo',xtype:'textfield',tabIndex:1,anchor:'95%',
					listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
				}]
			},
			{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
				items:[{fieldLabel:'货物名称',name:'cargoName',xtype:'textfield',tabIndex:2,anchor:'95%',
					listeners:{scope:this,
						specialkey:function(c,e){
							if(e.getKey()==Ext.EventObject.ENTER){
								this.reload();
							}
						}
					}
				}]
			}
	]});
	this.reload=function(){
		var a=[];var op=1;
		var at = tp.getActiveTab();
		if(at.getId()=='T_CONS_LOOK_1'){
	     	var consNo = panel.find('name','consNo')[0].getValue();
	     	if(consNo!=''){
	     		a[a.length] = new QParam({key:'consNo',value:consNo,op:LI});
	     	}
	     	var custName = panel.find('name','custName')[0].getValue();
	     	if(custName!=''){
	     		a[a.length] = new QParam({key:'custName',value:custName,op:LI});
	     	}
	     	var custContact = panel.find('name','custContact')[0].getValue();
	     	if(custContact!=''){
	     		a[a.length] = new QParam({key:'custContact',value:custContact,op:op});
	     	}
	 		var st=panel.find('name','status')[0].getValue();
	 		if(st=='0'||st=='1'||st=='2'||st=='3'){
	 			a[a.length]=new QParam({key:'status',value:st,op:op}); 
	 		}
	 		var consDate = panel.find('name','consDate')[0].getValue();
	 		var consDate2 = panel.find('name','consDate2')[0].getValue();
	 		if(consDate!='' && consDate2!=''){
	 			a[a.length] = new QParam({key:'consDate',value:consDate.format(DATEF),op:GE});
	 			a[a.length] = new QParam({key:'consDate',value:consDate2.format(DATEF),op:LE});
	 		}else if(consDate!=''){
	 			a[a.length] = new QParam({key:'consDate',value:consDate.format(DATEF),op:GE});
	 		}else if(consDate2!=''){
	 			a[a.length] = new QParam({key:'consDate',value:consDate2.format(DATEF),op:LE});
	 		}
	 		var loadDate = panel.find('name','loadDate')[0].getValue();
	 		var loadDate2 = panel.find('name','loadDate2')[0].getValue();
	 		if(loadDate!='' && loadDate2!=''){
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate.format(DATEF),op:GE});
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate2.format(DATEF),op:LE});
	 		}else if(loadDate!=''){
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate.format(DATEF),op:GE});
	 		}else if(loadDate2!=''){
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate2.format(DATEF),op:GE});
	 		}
	 		var motorcadeName = panel.find('name','motorcadeName')[0].getValue();
	 		if(motorcadeName!=''){
	 			a[a.length]=new QParam({key:'motorcadeName',value:motorcadeName,op:LI});
	 		}
	 		var consigneeName = panel.find('name','consigneeName')[0].getValue();
	 		if(consigneeName!=''){
	 			a[a.length]=new QParam({key:'consigneeName',value:consigneeName,op:LI});
	 		}
	 		var consOpeName = panel.find('name','consOperatorName')[0].getValue();
	 		if(consOpeName!=''){
	 			a[a.length]=new QParam({key:'consOperatorName',value:consOpeName,op:LI});
	 		}
	 		var consigneeContact=panel.find('name','consigneeContact')[0].getValue();
	 		if(consigneeContact!=''){
	 			a[a.length]=new QParam({key:'consigneeContact',value:consigneeContact,op:LI});
	 		}
	 		var motorcadeNo=panel.find('name','motorcadeNo')[0].getValue();
	 		if(motorcadeNo!=''){
	 			a[a.length]=new QParam({key:'motorcadeNo',value:motorcadeNo,op:LI});
	 		}
	 		if(cboMotoWriteOfStatusP.getValue()!='')
				a[a.length]=new QParam({key:'motoWriteOfStatusP',value:cboMotoWriteOfStatusP.getValue(),op:1});
			if(cboMotoWriteOfStatusR.getValue()!='')
				a[a.length]=new QParam({key:'motoWriteOfStatusR',value:cboMotoWriteOfStatusR.getValue(),op:1});
	 		if(cboShipWriteOfStatusR.getValue()!='')
				a[a.length]=new QParam({key:'shipWriteOfStatusR',value:cboShipWriteOfStatusR.getValue(),op:1});
			if(cboConsWriteOfStatusR.getValue()!='')
				a[a.length]=new QParam({key:'consWriteOfStatusR',value:cboConsWriteOfStatusR.getValue(),op:1});
			
	 		if(a.length<1){
	 			Ext.Msg.alert(SYS,'请输入查询条件！');
	 			return ;
	 		}
	 		store.baseParams={_A:action,_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
	 		store.reload({params:{start:0,limit:pageLimit},
	     		callback:function(r){
	     			if(r.length==0){XMG.alert(SYS,M_NOT_FOUND);}
 	     			else if(txtSumR){
 	     				//reCalculate();
 	     			}
	     		}
	     	});
	 		this.close();
		}else if(at.getId()=='T_CONS_LOOK_2'){
			var orderNo=panel2.find('name','orderNo')[0].getValue();
			var cargoName=panel2.find('name','cargoName')[0].getValue();
	 		if(orderNo!=''){
	 			a[a.length]=new QParam({key:'orderNo',value:orderNo,op:LI});
	 		}
	 		if(cargoName!=''){
	 			a[a.length]=new QParam({key:'cargoName',value:cargoName,op:LI});
	 		}
	 		if(a.length<1){
	 			Ext.Msg.alert(SYS,'请输入查询条件！');
	 			return ;
	 		}
 			store.baseParams={_A:action,_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'2'};
 			store.reload({params:{start:0,limit:pageLimit},
 	     		callback:function(r){
 	     			if(r.length==0){XMG.alert(SYS,M_NOT_FOUND);}
 	     			else if(txtSumR){
 	     				//reCalculate();
 	     			}
 	     		}
 	     	});
 			this.close();
		}
	};
	//计算合计
	var reCalculate = function(){
		var d=store.getRange();
		this.sumR=0;
		this.sumHk=0;
		this.sumP=0;
		this.sumMargin=0;
		this.sumShipR=0;
		this.sumConsR=0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('sumR')){
				this.sumR+=parseFloat(d[i].get('sumR'));
			}
			if(d[i].get('sumHk')){
				this.sumHk+=parseFloat(d[i].get('sumHk'));
			}
			if(d[i].get('sumP')){
				this.sumP+=parseFloat(d[i].get('sumP'));
			}
			if(d[i].get('margin')){
				this.sumMargin+=parseFloat(d[i].get('margin'));
			}
			if(d[i].get('sumShipperAmount')){
				this.sumShipR+=parseFloat(d[i].get('sumShipperAmount'));
			}
			if(d[i].get('sumConsAmount')){
				this.sumConsR+=parseFloat(d[i].get('sumConsAmount'));
			}
		}
		if(txtSumR){
			txtSumR.setValue(HTUtil.round2(this.sumR));
		}
		if(txtSumHk){
			txtSumHk.setValue(HTUtil.round2(this.sumHk));
		}
		if(txtSumP){
			txtSumP.setValue(HTUtil.round2(this.sumP));
		}
		if(txtSumMargin){
			txtSumMargin.setValue(HTUtil.round2(this.sumMargin));
		}
		if(txtSumShipR){
			txtSumShipR.setValue(HTUtil.numRender(this.sumShipR));
		}
		if(txtSumConsR){
			txtSumConsR.setValue(HTUtil.numRender(this.sumConsR));
		}
	};
  var tp = new Ext.TabPanel({id:'T_CONS_LOOK',xtype:'tabpanel',plain:true,activeTab:0,
	defaults:{bodyStyle:'padding:10px'},items:[panel,panel2]});
  Fos.TConsignSearchWin.superclass.constructor.call(this,{title:'托运单查询',iconCls:'search',modal:true,
  	width:800,height:320,buttonAlign:'right',items:tp,
  	buttons:[{text:C_OK,scope:this,iconCls:'ok',handler:this.reload},{text:C_CANCEL,scope:this,iconCls:'cancel',handler:this.close}]
	});
};
Ext.extend(Fos.TConsignSearchWin, Ext.Window);

//显示收货人
var listConsignee=function(f,e){
	if(e.getKey()!=e.ENTER){
		var q=f.getRawValue();
		if(q.length>0 && !f.isExpanded()){
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'TMS_CONSIGNEE_Q',_mt:'xml',consigneeName:q},
				success: function(r,o){
					f.store.loadData(r.responseXML,false);
					f.expand();
				}
			});
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};
