//statistics
var getStatPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items:[]});
	var items=[];
	/*if(HR(M1_STAT+T_BUSI))
	items[items.length]=FosMenu(panel,C_STAT_BIZ_SUM,'TRA',function(){return new Fos.TransSumGrid();});
	if(HR(M1_STAT+T_VEHI))
	items[items.length]=FosMenu(panel,C_STAT_VEHICLE_SUM,'VEHI',function(){return new Fos.VehicleSumGrid();});
	if(HR(M1_STAT+T_DRIV))
	items[items.length]=FosMenu(panel,C_STAT_DRIVER_SUM,'DRIV',function(){return new Fos.DriverSumGrid();});*/
	if(HR(M1_STAT+T_SHIP))	//发货统计
		items[items.length]=FosMenu(panel,C_STAT_SHIPPING_COUNT,'SHIP',function(){return new Fos.ShipCountGrid();});
	if(HR(M1_STAT+T_RECE))	//回单统计
		items[items.length]=FosMenu(panel,C_STAT_RECEIPT_COUNT,'RECEIPT',function(){return new Fos.ReceiptCountGrid();});
	if(HR(M1_STAT+T_DISC))	//回扣统计
		items[items.length]=FosMenu(panel,C_STAT_DISCOUNT_COUNT,'DISCOUNT',function(){return new Fos.DiscountCountGrid();});
	if(HR(M1_STAT+T_ACCO))	//收款统计
		items[items.length]=FosMenu(panel,C_STAT_ACCOUNTDUE_COUNT,'ACCOUNTDUE',function(){return new Fos.AccountDueCountGrid();});
	var statPanel = new Ext.Panel({title:'业务统e计',collapsible:false,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	items=[];
	if(HR(M1_STAT+T_CUEX)) 				//应收费用统计表
		items[items.length]=FosMenu(panel,C_STAT_AR,'T_CUEX',function(){return new Fos.StatArTab('CUEX');});
	if(HR(M1_STAT+T_VEEX)) 				//应付费用统计表
		items[items.length]=FosMenu(panel,C_STAT_AP,'T_VEEX',function(){return new Fos.StatApTab();});
	if(HR(M1_STAT+T_WROF)){ 			//核销明细统计表
		items[items.length]=FosMenu(panel,C_STAT_WRITEOFF,'T_WROF',function(){return new Fos.StatWOTab();});
	}
	if(HR(M1_STAT+T_ACAR)||HR(M1_STAT+T_ACAP)){
		items[items.length]='-';
	}
	if(HR(M1_STAT+T_ACAR)) 				//应收账款账龄分析表
		items[items.length]=FosMenu(panel,C_STAT_AR_AC,'T_ACAR',function(){return new Fos.StatACTab('AR');});
	if(HR(M1_STAT+T_ACAP)) 				//应付账款账龄分析表
		items[items.length]=FosMenu(panel,C_STAT_AP_AC,'T_ACAP',function(){return new Fos.StatACTab('AP');});
		
	var accountPanel = new Ext.Panel({title:'账款统计',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
		
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,
		layout:'accordion',split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[statPanel,accountPanel]});
	
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	createWindow('STAT',C_STAT,contPanel);//C_STAT
};

//单票统计
Fos.TransSumGrid = function() {
	var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TConsign"
		}, TConsign);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TCON_X',_mt:'xml'},
		reader:myReader
	});
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:SUM_MONTH,dataIndex:'sumMonth',width:100},
	 {header:SUM_CONSNO,dataIndex:'sumConsNo',width:100},
	 {header:SUM_PACKAGES,dataIndex:'sumPackages',width:100},
	 {header:C_GW_S,dataIndex:'sumGrossWeight',width:100}
	/* ,
	 {header:C_SUM_AR,dataIndex:'',width:100},
	 {header:C_SUM_AP,dataIndex:'',width:100},
	 {header:SUM_PROFITS,dataIndex:'',width:100},*/
	],defaults:{sortable:true,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[0]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[1]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
 		store.baseParams={_A:'TCON_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},callback:function(r){
 			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
 		});
	};
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_BIZ_SUM,
    id:'G_TRAN',iconCls:'stats',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS100),
	tbar:[
	      {text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_FAST_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.TransSumGrid, Ext.grid.GridPanel);

//车辆统计
Fos.VehicleSumGrid = function() {
	 var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TTransTask"
		}, TTransTask);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TTRT_X',_mt:'xml'},
		reader:myReader
	});
	
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:C_VEHICLE_NO,dataIndex:'sumT',width:100},
	 {header:SUM_C_V,dataIndex:'sumStartDate',width:100},
	 {header:SUM_LOAD,dataIndex:'sumGrossWeight',width:100},
	 {header:SUM_MiLES,dataIndex:'sumDistance',width:100}
	 /*,
	 {header:'油耗（升）',dataIndex:'consNo',width:100},
	 {header:'维修次数',dataIndex:'consNo',width:100},
	 {header:'维修金额',dataIndex:'consNo',width:100},
	 {header:'事故次数',dataIndex:'consNo',width:100},*/
	],defaults:{sortable:true,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
			a[0]=new QParam({key:'startDate',value:t2.getValue().format(DATEF),op:GE});
			a[1]=new QParam({key:'startDate',value:t3.getValue().format(DATEF),op:LE});
			a[2]=new QParam({key:'status',value:'0',op:EQ});
	 		store.baseParams={_A:'TTRT_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},callback:function(r){
 			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
 		});
	};
	
	Fos.VehicleSumGrid.superclass.constructor.call(this,{title:C_STAT_VEHICLE_SUM,
    id:'T_TASK',iconCls:'stats',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS100),
	tbar:[
	      {text:C_TRAN_START_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_FAST_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.VehicleSumGrid, Ext.grid.GridPanel);

//驾驶员统计
Fos.DriverSumGrid = function() {
	 var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record:"TTransTask"
		}, TTransTask);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TTRT_X',_mt:'xml'},
		reader:myReader
	});
	
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:C_DRIVER,dataIndex:'sumT',width:100},
	 {header:SUM_C_V,dataIndex:'sumStartDate',width:100},
	 {header:SUM_LOAD,dataIndex:'sumGrossWeight',width:100},
	 {header:SUM_MiLES,dataIndex:'sumDistance',width:100}
	 /*,
	 {header:'油耗（升）',dataIndex:'consNo',width:100},
	 {header:'维修次数',dataIndex:'consNo',width:100},
	 {header:'维修金额',dataIndex:'consNo',width:100},
	 {header:'事故次数',dataIndex:'consNo',width:100},*/
	],defaults:{sortable:true,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
			a[0]=new QParam({key:'startDate',value:t2.getValue().format(DATEF),op:GE});
			a[1]=new QParam({key:'startDate',value:t3.getValue().format(DATEF),op:LE});
			a[2]=new QParam({key:'status',value:'1',op:EQ});
	 		store.baseParams={_A:'TTRT_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
		store.reload({params:{start:0,limit:C_PS100},callback:function(r){
			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
		});
	};
	
	Fos.DriverSumGrid.superclass.constructor.call(this,{title:C_STAT_VEHICLE_SUM,
    id:'G_DRIV',iconCls:'stats',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS100),
	tbar:[
	      {text:C_TRAN_DRIVER_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_FAST_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.DriverSumGrid, Ext.grid.GridPanel);

//发货统计
Fos.ShipCountGrid=function(){
	var bp={_A:'TCONS_SHIP',_mt:'xml'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
		//store.load({params:{start:0,limit:C_PS100}});
	var resetStatus;
	this.reset=function(){								//刷新
		resetStatus=1;
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS100},
				callback:function(){
					txtSumR.setValue('');
					txtSumP.setValue('');
					txtSumHk.setValue('');
					txtSumMargin.setValue('');
				}
		});
	};
	//费用合计
	this.expeSum=function(){
		if(store.baseParams.typeKey==1)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'1'};
		else if(store.baseParams.typeKey==2)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'2'};
		else
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml'};
		store.reload({params:{},callback:function(){reCalculate();}});
	}
	//合计
	var reCalculate = function(){
		var d=store.getRange();
		this.sumR=0;
		this.sumHk=0;
		this.sumP=0;
		this.sumMargin=0;
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
		}
		txtSumR.setValue(HTUtil.numRender(this.sumR));
		txtSumHk.setValue(HTUtil.numRender(this.sumHk));
		txtSumP.setValue(HTUtil.numRender(this.sumP));
		txtSumMargin.setValue(HTUtil.numRender(this.sumMargin));
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	 new Ext.grid.RowNumberer(),sm,
	 {header:'委托日期',dataIndex:'consDate',renderer:formatDate,width:100},
	 {header:'手工单号',dataIndex:'consNoHandler',width:100},
	 {header:'委托单位',dataIndex:'custName',width:130},
	 {header:'总运费',dataIndex:'expenseTotal2',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'物流运费',dataIndex:'motorcadeExpense2',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'利润',dataIndex:'margin',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'应收费用',dataIndex:'sumR',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'应付费用',dataIndex:'sumP',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'中转回扣',dataIndex:'sumHk',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
	 {header:'收货单位',dataIndex:'consigneeName',width:130},
	 {header:'收货人',dataIndex:'consigneeContact',width:100},
	 {header:'收货人电话',dataIndex:'consigneeMobile',width:100},
	 {header:'物流商',dataIndex:'motorcadeName',width:130},
	 {header:'物流单号',dataIndex:'motorcadeNo',width:130},
	 {header:'√现付',dataIndex:'expenseXff',width:70,renderer:function(v,m,r){if(v!=''&&v>0){m.css='green-b';return '√';}}},
	 {header:'√到付',dataIndex:'expenseDff',width:70,renderer:function(v,m,r){if(v!=''&&v>0){m.css='green-b';return '√';}}},
	 {header:'√月结',dataIndex:'expenseYjf',width:70,renderer:function(v,m,r){if(v!=''&&v>0){m.css='green-b';return '√';}}},
	 {header:'√回单付',dataIndex:'expenseHdf',width:70,renderer:function(v,m,r){if(v!=''&&v>0){m.css='green-b';return '√';}}},
	 {header:'备注',dataIndex:'remarks',width:300}
	],defaults:{sortable:true,width:100}});
	
	var txtSumR = new Ext.form.TextField({width:120,disabled:true});		//实收合计
	var txtSumHk = new Ext.form.TextField({width:120,disabled:true});		//中转回扣合计
	var txtSumP = new Ext.form.TextField({width:120,disabled:true});		//实付合计
	var txtSumMargin = new Ext.form.TextField({width:120,disabled:true});	//利润合计
	
	var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	var kw = new Ext.form.TextField({emptyText:'手工单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t4 = new Ext.form.TextField({emptyText:'物流商...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t5 = new Ext.form.TextField({emptyText:'物流单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	//快速查询
	this.fastSearch=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[a.length]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[a.length]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
		if(kw.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:kw.getValue(),op:LI});
		if(t4.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeName',value:t4.getValue(),op:LI});
		if(t5.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeNo',value:t5.getValue(),op:LI});
 		store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},
 			callback:function(){}
 		});
	};
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store,txtSumR,txtSumHk,txtSumP,txtSumMargin);
		w.show();
	};
	//发货统计表-鑫信
	this.expExcel=function(){
		if(store.baseParams.typeKey==1)									//复杂查询-订单查询类型
			EXPC('TCONSIGN','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)							//复杂查询-综合查询类型
			EXPC('TCONSIGN','&sort=id&dir=DESC&orderNo=' + store.baseParams.orderNo);
		else if(store.baseParams.xml)
			EXPC('TCONSIGN','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(resetStatus=='1'){
			EXPC('TCONSIGN','&sort=id&dir=DESC&');
		}else{
			Ext.Msg.alert(SYS,'没有数据可以输出！');
		}
	};
	var exp={text:'发货统计表',scope:this,iconCls:'right',handler:this.expExcel};
	
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
	
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_SHIPPING_COUNT,
	    id:'SHIP',iconCls:'stats',header:false,closable:true,
	    store:store,sm:sm,cm:cm,stripeRows:true,
	    listeners:{
			rowdblclick:function(g,r,e){this.showExpense();}
		},
		//bbar:PTB(store,C_PS100),
	    bbar:['->',
		      {text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
		      {xtype:'tbtext',text:'应收合计：'},txtSumR,'-',
		      {xtype:'tbtext',text:'应付合计：'},txtSumP,'-',
		      {xtype:'tbtext',text:'中转回扣合计'},txtSumHk,'-',
			  {xtype:'tbtext',text:'利润合计：'},txtSumMargin
		],
		tbar:new Ext.Panel({border:false,items:[{
				xtype:'toolbar',items:[
        	      {text:C_COMPLAX_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
        	      {text:C_EXPORT,iconCls:'print',scope:this,
        	    	  menu:{items:[exp]}},'-',
        	      {text:C_REFRESH,iconCls:'refresh',handler:this.reset},'-',
        	      '->',//PTB(store,C_PS100)
        	      new Ext.PagingToolbar({pageSize:C_PS100,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
	      	        	doLoad : function(start){
	      	                var o = {}, pn = this.getParams();
	      	                o[pn.start] = start;
	      	                o[pn.limit] = this.pageSize;
	      	                if(this.fireEvent('beforechange', this, o) !== false){
	      	                    this.store.load({params:o,callback:function(){}});
	      	                }
	      	            }
      	        	})
        	      ]
			},{
				xtype:'toolbar',items:[
				{text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
				{text:C_TO,xtype:'tbtext'},t3,'-',
				{text:C_CONS_NO_HANDLER+':',xtype:'tbtext'},kw,
				{text:C_CARRIER_UNIT+':',xtype:'tbtext'},t4,
				{text:'物流单号'+':',xtype:'tbtext'},t5,
				{text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch},'-'
				]
			}]
		})
    });
};
Ext.extend(Fos.ShipCountGrid,Ext.grid.GridPanel);

//回单统计界面
Fos.ReceiptCountGrid=function(){
	var bp={_A:'TCONS_SHIP',_mt:'xml'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		//store.load({params:{start:0,limit:C_PS100}});
	var resetStatus;
	this.reset=function(){								//刷新
		resetStatus=1;
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS100},
				callback:function(){
					txtSumP.setValue('');
				}
		});
	};
	
	//费用合计
	this.expeSum=function(){
		if(store.baseParams.typeKey==1)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'1'};
		else if(store.baseParams.typeKey==2)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'2'};
		else
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml'};
		store.reload({params:{},callback:function(){reCalculate();}});
	}
	
	var reCalculate = function(){
		var d=store.getRange();
		this.sumR=0;
		this.sumHk=0;
		this.sumP=0;
		this.sumMargin=0;
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
		}
		txtSumR.setValue(HTUtil.numRender(this.sumR));
		txtSumHk.setValue(HTUtil.numRender(this.sumHk));
		txtSumP.setValue(HTUtil.numRender(this.sumP));
		txtSumMargin.setValue(HTUtil.numRender(this.sumMargin));
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	    new Ext.grid.RowNumberer(),sm,
		{header:'委托日期',dataIndex:'consDate',renderer:formatDate,width:100},
		{header:'手工单号',dataIndex:'consNoHandler',width:100},
		{header:'物流商',dataIndex:'motorcadeName',width:130},
		{header:'应付运费',dataIndex:'sumP',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
		{header:'件数',dataIndex:'packages',width:100,renderer:function(v,m,r){m.css='green-b';if(v==''){return '0';}else{return v;}}},
		{header:'物流运费',dataIndex:'motorcadeExpense2',width:100,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)},hidden:true},
		{header:'物流单号',dataIndex:'motorcadeNo',width:130},
		{header:'收货地址',dataIndex:'deliveryAddress',width:150},
		{header:'核销状态',dataIndex:'motoWriteOfStatusP',width:80,renderer:function(v,m,r){if(v!=0){m.css='green-b';return '已核销';}}},
		{header:'备注',dataIndex:'remarks',width:300}
	],defaults:{sortable:true,width:100}});
	
	var txtSumR = new Ext.form.TextField({width:120,disabled:true});		//实收合计
	var txtSumHk = new Ext.form.TextField({width:120,disabled:true});	//中转回扣合计
	var txtSumP = new Ext.form.TextField({width:120,disabled:true});		//实付合计
	var txtSumMargin = new Ext.form.TextField({width:120,disabled:true});//利润合计
	
	var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	var kw = new Ext.form.TextField({emptyText:'手工单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t4 = new Ext.form.TextField({emptyText:'物流商...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t5 = new Ext.form.TextField({emptyText:'物流单号...',
		width:100,	
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t6 = new Ext.form.ComboBox({store:HTStore.WRITE_OFF_STATUS,width:80,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true
	});
	
	this.fastSearch=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[a.length]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[a.length]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
		if(kw.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:kw.getValue(),op:LI});
		if(t4.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeName',value:t4.getValue(),op:LI});
		if(t5.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeNo',value:t5.getValue(),op:LI});
		if(t6.getValue()!='')
			a[a.length]=new QParam({key:'motoWriteOfStatusP',value:t6.getValue(),op:1});
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},
 			callback:function(){}
 		});
	};
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store,txtSumR,txtSumHk,txtSumP,txtSumMargin);
		w.show();
	};
	//回单统计表-鑫信
	this.expExcel=function(){
		if(store.baseParams.typeKey==1)									//复杂查询-订单查询类型
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)							//复杂查询-综合查询类型
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=DESC&orderNo=' + store.baseParams.orderNo);
		else if(store.baseParams.xml)
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(resetStatus=='1'){
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=DESC&');
		}else{
			Ext.Msg.alert(SYS,'没有数据可以输出！');
		}
	};
	var exp={text:'回单统计表',scope:this,iconCls:'right',handler:this.expExcel};
	
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
	
	//付款核销
    this.writeOff = function(){
    	var r = sm.getSelections();
    	if(r.length>0){
    		for(var i=0;i<r.length;i++){
				if(r[i].get('sumP')<1||r[i].get('motoWriteOfStatusP')==1){
					Ext.Msg.alert(SYS,'只能选择‘应付运费’大于零，并且是‘未核销’的记录！');
					return ;
				}
			}
    		Ext.Msg.confirm(SYS,'确定核销所选记录吗？',function(btn){
				if(btn == 'yes') {
					var xml = HTUtil.ATX(r,'TConsign',TConsign);
					Ext.Ajax.request({
						scope: this,
						url: SERVICE_URL,
						method:'POST',
						params:{
							_A:'EXPE_VOUC_P'
						},
						success: function(r, o) {
							store.reload();
							Ext.Msg.alert(SYS,M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			});
    	}else{
			Ext.Msg.alert(SYS,'请选择要核销的记录！');
		}
    };
    
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_RECEIPT_COUNT,
	    id:'RECEIPT',iconCls:'stats',header:false,closable:true,
	    store:store,sm:sm,cm:cm,loadMask:true,stripeRows:true,
	    listeners:{
			rowdblclick:function(g,r,e){this.showExpense();}
		},
		//bbar:PTB(store,C_PS100),
	    bbar:['->',
	    	  {text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
		      /*{xtype:'tbtext',text:'应收合计：'},txtSumR,'-',*/
		      {xtype:'tbtext',text:'应付合计：'},txtSumP,'-'
		     /* {xtype:'tbtext',text:'中转回扣合计'},txtSumHk,'-',
			  {xtype:'tbtext',text:'利润合计：'},txtSumMargin*/
		],
		tbar:new Ext.Panel({border:false,items:[{
			xtype:'toolbar',
			items:[{text:C_COMPLAX_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
        	      {text:C_EXPORT,iconCls:'print',scope:this,
        	    	  menu:{items:[exp]}},'-',
        	    	  {text:'应付核销',iconCls:'check',handler:this.writeOff,disabled:NR(M1_STAT+T_RECE+F_MOTO_P)},'-',
        	      {text:C_REFRESH,iconCls:'refresh',handler:this.reset},'-',
        	      '->',//PTB(store,C_PS100)
        	      new Ext.PagingToolbar({pageSize:C_PS100,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
	      	        	doLoad : function(start){
	      	                var o = {}, pn = this.getParams();
	      	                o[pn.start] = start;
	      	                o[pn.limit] = this.pageSize;
	      	                if(this.fireEvent('beforechange', this, o) !== false){
	      	                    this.store.load({params:o,callback:function(){}});
	      	                }
	      	            }
    	        	})
        	      ]
			},
			{
				xtype:'toolbar',
				items:[{text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
				{text:C_TO,xtype:'tbtext'},t3,'-',
				{text:C_CONS_NO_HANDLER+':',xtyp:'tbtext'},kw,
				{text:C_CARRIER_UNIT+':',xtype:'tbtext'},t4,
				{text:'物流单号'+':',xtype:'tbtext'},t5,
				{text:'核销状态'+':',xtype:'tbtext'},t6,
				{text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch},'-'
				]
			}]
		})
    });
};
Ext.extend(Fos.ReceiptCountGrid,Ext.grid.GridPanel);

//回扣统计界面
Fos.DiscountCountGrid=function(){
	var bp={_A:'TCONS_SHIP',_mt:'xml'};
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		//store.load({params:{start:0,limit:C_PS100}});
	var resetStatus;
	this.reset=function(){								//刷新
		resetStatus=1;
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS100},
				callback:function(){
					txtSumHk.setValue('');
				}
		});
	};
	//费用合计
	this.expeSum=function(){
		if(store.baseParams.typeKey==1)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'1'};
		else if(store.baseParams.typeKey==2)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'2'};
		else
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml'};
		store.reload({params:{},callback:function(){reCalculate();}});
	}
	var reCalculate = function(){
		var d=store.getRange();
		this.sumR=0;
		this.sumHk=0;
		this.sumP=0;
		this.sumMargin=0;
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
		}
		txtSumR.setValue(HTUtil.numRender(this.sumR));
		txtSumHk.setValue(HTUtil.numRender(this.sumHk));
		txtSumP.setValue(HTUtil.numRender(this.sumP));
		txtSumMargin.setValue(HTUtil.numRender(this.sumMargin));
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
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	    new Ext.grid.RowNumberer(),sm,
	    {header:'ID',dataIndex:'id',width:20,hidden:true},
   		{header:'委托日期',dataIndex:'consDate',renderer:formatDate,width:100},
   		{header:'手工单号',dataIndex:'consNoHandler',width:100},
   		{header:'物流商',dataIndex:'motorcadeName',width:130},
   		{header:'中转回扣',dataIndex:'sumHk',width:120,renderer:function(v,m,r){m.css='green-b';return '￥'+HTUtil.numRender(v)}},
   		{header:'件数',dataIndex:'packages',width:100,renderer:function(v,m,r){m.css='green-b';if(v==''){return '0';}else{return v;}}},
   		{header:'物流单号',dataIndex:'motorcadeNo',width:130},
   		{header:'收货地址',dataIndex:'deliveryAddress',width:150},
   		{header:'核销状态',dataIndex:'motoWriteOfStatusR',renderer:function(v,m,r){if(v!='0'){m.css='green-b'; return '已核销';}},width:80},
   		{header:'备注',dataIndex:'remarks',width:300}
   	],defaults:{sortable:true,width:100}});

	var txtSumR = new Ext.form.TextField({width:120,disabled:true});		//实收合计
	var txtSumHk = new Ext.form.TextField({width:120,disabled:true});		//中转回扣合计
	var txtSumP = new Ext.form.TextField({width:120,disabled:true});		//实付合计
	var txtSumMargin = new Ext.form.TextField({width:120,disabled:true});	//利润合计
	
	var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	var kw = new Ext.form.TextField({emptyText:'手工单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t4 = new Ext.form.TextField({emptyText:'物流商...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t5 = new Ext.form.TextField({emptyText:'物流单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t6 = new Ext.form.ComboBox({store:HTStore.WRITE_OFF_STATUS,width:80,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true
	});
	this.fastSearch=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[a.length]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[a.length]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
		if(kw.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:kw.getValue(),op:LI});
		if(t4.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeName',value:t4.getValue(),op:LI});
		if(t5.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeNo',value:t5.getValue(),op:LI});
		if(t6.getValue()!='')
			a[a.length]=new QParam({key:'motoWriteOfStatusR',value:t6.getValue(),op:1});
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},
 			callback:function(){}
 		});
	};
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store,txtSumR,txtSumHk,txtSumP,txtSumMargin);
		w.show();
	};
	//回扣统计表-鑫信
	this.expExcel=function(){
		if(store.baseParams.typeKey==1)									//复杂查询-订单查询类型
			EXPC('TCONS_HK','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)							//复杂查询-综合查询类型
			EXPC('TCONS_HK','&sort=id&dir=DESC&orderNo=' + store.baseParams.orderNo);
		else if(store.baseParams.xml)
			EXPC('TCONS_HK','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(resetStatus=='1'){
			EXPC('TCONS_HK','&sort=id&dir=DESC&');
		}else{
			Ext.Msg.alert(SYS,'没有数据可以输出！');
		}
	};
	var exp={text:'回扣统计表',scope:this,iconCls:'right',handler:this.expExcel};
	
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
	//核销
	this.writeOff=function(){
		var r = sm.getSelections();
		if(r.length>0){
			for(var i=0;i<r.length;i++){
				if(r[i].get('sumHk')<1||r[i].get('motoWriteOfStatusR')==1){
					Ext.Msg.alert(SYS,'只能选择‘中转回扣’大于零，并且是‘未核销’的记录！');
					return ;
				}
			}
			Ext.Msg.confirm(SYS,'确定核销所选记录吗？',function(btn){
				if(btn == 'yes') {
					var xml = HTUtil.ATX(r,'TConsign',TConsign);
					Ext.Ajax.request({
						scope: this,
						url: SERVICE_URL,
						method:'POST',
						params:{
							_A:'EXPE_VOUC_H'
						},
						success: function(r, o) {
							store.reload();
							Ext.Msg.alert(SYS,M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			});
		}else{
			Ext.Msg.alert(SYS,'请选择要核销的记录！');
		}
	};
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_DISCOUNT_COUNT,
	    id:'DISCOUNT',iconCls:'stats',header:false,closable:true,
	    store:store,sm:sm,cm:cm,loadMask:true,stripeRows:true,
	    listeners:{
			rowdblclick:function(g,r,e){this.showExpense();}
		},
		//bbar:PTB(store,C_PS100),
	    bbar:['->',
	    	  {text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
		      /*{xtype:'tbtext',text:'应收合计：'},txtSumR,'-',
		      {xtype:'tbtext',text:'应付合计：'},txtSumP,'-',*/
		      {xtype:'tbtext',text:'中转回扣合计'},txtSumHk,'-'
			  /*{xtype:'tbtext',text:'利润合计：'},txtSumMargin*/
		],
		tbar:new Ext.Panel({border:false,items:[
               {xtype:'toolbar',items:[
	        	      {text:C_COMPLAX_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
	        	      {text:C_EXPORT,iconCls:'print',scope:this,
	        	    	  menu:{items:[exp]}},'-',
	        	      {text:'中转回扣核销',iconCls:'check',handler:this.writeOff,disabled:NR(M1_STAT+T_DISC+F_MOTO_R)},'-',
	        	      {text:C_REFRESH,iconCls:'refresh',handler:this.reset},'-',
	        	      '->',//PTB(store,C_PS100)
	        	      new Ext.PagingToolbar({pageSize:C_PS100,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
		      	        	doLoad : function(start){
		      	                var o = {}, pn = this.getParams();
		      	                o[pn.start] = start;
		      	                o[pn.limit] = this.pageSize;
		      	                if(this.fireEvent('beforechange', this, o) !== false){
		      	                    this.store.load({params:o,callback:function(){}});
		      	                }
		      	            }
	      	        	})
	        	      ]
				},{
					xtype:'toolbar',items:[
						{text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
						{text:C_TO,xtype:'tbtext'},t3,'-',
						{text:C_CONS_NO_HANDLER+':',xtyp:'tbtext'},kw,
						{text:C_CARRIER_UNIT+':',xtype:'tbtext'},t4,
						{text:'物流单号'+':',xtype:'tbtext'},t5,
						{text:'核销状态'+':',xtype:'tbtext'},t6,
						{text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch},'-'       
					 ]
				}
			]
		})
    });
};
Ext.extend(Fos.DiscountCountGrid,Ext.grid.GridPanel);

//应收款统计
Fos.AccountDueCountGrid=function(){
	var bp={_A:'TCONS_SHIP',_mt:'xml'};
	var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TConsign",
		   id:'id'
		}, TConsign);
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:myReader,remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	//store.load({params:{start:0,limit:C_PS100}});
	var resetStatus;
	this.reset=function(){								//刷新
		resetStatus=1;
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS100},
				callback:function(){
					txtSumShipR.setValue('');
					txtSumConsR.setValue('');
				}
		});
	};
	//费用合计
	this.expeSum=function(){
		if(store.baseParams.typeKey==1)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'1'};
		else if(store.baseParams.typeKey==2)
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:store.baseParams.xml,typeKey:'2'};
		else
			store.baseParams={_A:'TCONS_SHIP',_mt:'xml'};
		store.reload({params:{},callback:function(){reCalculate();}});
	}
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
		txtSumR.setValue(HTUtil.numRender(this.sumR));
		txtSumHk.setValue(HTUtil.numRender(this.sumHk));
		txtSumP.setValue(HTUtil.numRender(this.sumP));
		txtSumMargin.setValue(HTUtil.numRender(this.sumMargin));
		txtSumShipR.setValue(HTUtil.numRender(this.sumShipR));
		txtSumConsR.setValue(HTUtil.numRender(this.sumConsR));
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	   	new Ext.grid.RowNumberer(),sm,
	    {header:'委托日期',dataIndex:'consDate',renderer:formatDate,width:100},
	    {header:'手工单号',dataIndex:'consNoHandler',width:100},
	    {header:'委托单位',dataIndex:'custName',width:130,hidden:true},
	    {header:'发货单位',dataIndex:'shipperName',width:130},
	    {header:'发货方运费',dataIndex:'sumShipperAmount',width:100,
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	}
	    },
	    {header:'发货方核销状态',dataIndex:'shipWriteOfStatusR',
	    	renderer:function(v,m,r){
	    		if(v!='0'){
	    			m.css='green-b'; 
	    			return '已核销';}
	    	},
	    	width:120
	    },
	    {header:'收货单位',dataIndex:'consigneeName',width:130},
	    {header:'收货方运费',dataIndex:'sumConsAmount',width:100,
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	}
	    },
	    {header:'收货方核销状态',dataIndex:'consWriteOfStatusR',
	    	renderer:function(v,m,r){
	    		if(v!='0'){
	    			m.css='green-b'; 
	    			return '已核销';}
	    	},
	    	width:120
	    },
	    {header:'收货地址',dataIndex:'deliveryAddress',width:150},
	    {header:'件数',dataIndex:'packages',width:100,
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		if(v==''){return '0';}
	    		else{return v;}}
	    },
	    {header:'备注',dataIndex:'remarks',width:300},
	    {header:'应收运费',dataIndex:'sumR',width:100,
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	},
	    	hidden:true
	    },
	    {header:'总运费',dataIndex:'expenseTotal2',width:100,
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	},
	    	hidden:true
	    },
	    {header:'收货人',dataIndex:'consigneeContact',width:80,hidden:true},
	    {header:'收货人电话',dataIndex:'consigneeMobile',width:100,hidden:true},
	    {header:'物流单号',dataIndex:'motorcadeNo',width:130,hidden:true},
	    {header:'物流商',dataIndex:'motorcadeName',width:130,hidden:true}
	],defaults:{sortable:true,width:100}});

	var txtSumR = new Ext.form.TextField({width:120,disabled:true});			//实收合计
	var txtSumHk = new Ext.form.TextField({width:120,disabled:true});			//中转回扣合计
	var txtSumP = new Ext.form.TextField({width:120,disabled:true});			//实付合计
	var txtSumMargin = new Ext.form.TextField({width:120,disabled:true});		//利润合计
	var txtSumShipR = new Ext.form.TextField({width:120,disabled:true});		//实收发货方合计
	var txtSumConsR = new Ext.form.TextField({width:120,disabled:true});		//实收收货方合计
	
	var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF,width:105});
	var t3=new Ext.form.DateField({value:new Date(),format:DATEF,width:105});
	var kw = new Ext.form.TextField({emptyText:'手工单号...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t4 = new Ext.form.TextField({emptyText:'物流商...',
		width:100,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	var t5 = new Ext.form.TextField({emptyText:'物流单号...',
		width:100,	
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	//发货方核销状态
	var t6 = new Ext.form.ComboBox({store:HTStore.WRITE_OFF_STATUS,width:70,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true
	});
	//收货方核销状态
	var t7 = new Ext.form.ComboBox({store:HTStore.WRITE_OFF_STATUS,width:70,
		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true
	});
	this.fastSearch=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[a.length]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[a.length]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
		if(kw.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:kw.getValue(),op:LI});
		if(t4.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeName',value:t4.getValue(),op:LI});
		if(t5.getValue()!='')
			a[a.length]=new QParam({key:'motorcadeNo',value:t5.getValue(),op:LI});
		if(t6.getValue()!='')
			a[a.length]=new QParam({key:'shipWriteOfStatusR',value:t6.getValue(),op:1});
		if(t7.getValue()!='')
			a[a.length]=new QParam({key:'consWriteOfStatusR',value:t7.getValue(),op:1});
		
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'TCONS_SHIP',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS100},
 			callback:function(){}
 		});
	};
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store,txtSumR,txtSumHk,txtSumP,txtSumMargin,txtSumShipR,txtSumConsR);
		w.show();
	};
	//应收统计表-鑫信
	this.expExcel=function(){
		if(store.baseParams.typeKey==1)									//复杂查询-订单查询类型
			EXPC('TSHIP_R','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)							//复杂查询-综合查询类型
			EXPC('TSHIP_R','&sort=id&dir=DESC&orderNo=' + store.baseParams.orderNo);
		else if(store.baseParams.xml)
			EXPC('TSHIP_R','&sort=id&dir=DESC&xml=' + store.baseParams.xml);
		else if(resetStatus=='1'){
			EXPC('TSHIP_R','&sort=id&dir=DESC&');
		}else{
			Ext.Msg.alert(SYS,'没有数据可以输出！');
		}
	};
	var exp={text:'应收统计表',scope:this,iconCls:'right',handler:this.expExcel};
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
	var transSumGrid  =  new Ext.grid.GridPanel({header:false,region:'north',
	    store:store,sm:sm,cm:cm,height:360,stripeRows:true,
	    listeners:{
	    	scope:this,
			rowdblclick:function(g,r,e){
				this.showExpense();
			},
			rowclick:function(g,r,e){
				expeStore.removeAll();
				expeStore.reload({params:{expeType:'R',consId:sm.getSelected().get('id')}});
			}
		}
	});
	var expeStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',_mt:'json',consBizType:'T'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	var expeSm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var expeCm=new Ext.grid.ColumnModel({columns:[
	   	new Ext.grid.RowNumberer(),sm,
	   	{header:'单位归属',dataIndex:'custNameFlag',
	   		renderer:function(v,m,r){
		    	var s="";
		    	if(v=='1'){
		    		s="发货方";
		    	}else if(v=='2'){
		    		s="收货方";
		    	}else if(v=='3'){
		    		s="物流商";
		    	}
		    	m.css='red-b';
		    	return s;
	    	}
	    },
	    {header:'结算单位',dataIndex:'custName',width:150},
	    {header:'付款方式',dataIndex:'charName'},
	    {header:'金额',dataIndex:'expeTotalAmount',
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	}
	    },
	    {header:'已核销金额',dataIndex:'expeWriteOffAmount',
	    	renderer:function(v,m,r){
	    		m.css='green-b';
	    		return '￥'+HTUtil.numRender(v)
	    	}
	    },
	    {header:'核销日期',dataIndex:'expeWriteOffDate',renderer:formatDate,width:100},
	    {header:'核销人',dataIndex:'expeWriteOffBy',width:100}
	],defaults:{sortable:true,width:100}});
	var expeGrid = new Ext.grid.GridPanel({title:C_EXPE_R,region:'center',
	 store:expeStore,sm:expeSm,cm:expeCm
	});
	//发货方核销
	this.shipWriteOff=function(){
		var r = sm.getSelections();
		if(r.length>0){
			for(var i=0;i<r.length;i++){
				if(r[i].get('sumShipperAmount')<1||r[i].get('shipWriteOfStatusR')==1){
					Ext.Msg.alert(SYS,'只能选择‘发货方运费’大于零，并且是‘未核销’的记录！');
					return ;
				}
			}
			Ext.Msg.confirm(SYS,'确定核销所选记录吗？',function(btn){
				if(btn == 'yes') {
					var xml = HTUtil.ATX(r,'TConsign',TConsign);
					Ext.Ajax.request({
						scope: this,
						url: SERVICE_URL,
						method:'POST',
						params:{
							_A:'EXPE_VOUC_R',
							custNameFlag:'1'			//发货方
						},
						success: function(r, o) {
							store.reload();
							expeStore.reload({params:{expeType:'R',consId:sm.getSelected().get('id')}});
							Ext.Msg.alert(SYS,M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			});
		}else{
			Ext.Msg.alert(SYS,'请选择要核销的记录！');
		}
	};
	//收货方核销
	this.consWriteOff=function(){
		var r = sm.getSelections();
		if(r.length>0){
			for(var i=0;i<r.length;i++){
				if(r[i].get('sumConsAmount')<1||r[i].get('consWriteOfStatusR')==1){
					Ext.Msg.alert(SYS,'只能选择‘收货方运费’大于零，并且是‘未核销’的记录！');
					return ;
				}
			}
			Ext.Msg.confirm(SYS,'确定核销所选记录吗？',function(btn){
				if(btn == 'yes') {
					var xml = HTUtil.ATX(r,'TConsign',TConsign);
					Ext.Ajax.request({
						scope: this,
						url: SERVICE_URL,
						method:'POST',
						params:{
							_A:'EXPE_VOUC_R',
							custNameFlag:'2'			//收货方
						},
						success: function(r, o) {
							store.reload();
							expeStore.reload({params:{expeType:'R',consId:sm.getSelected().get('id')}});
							Ext.Msg.alert(SYS,M_S);
						},
						failure: function(r, o) {
							Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
						},
						xmlData: HTUtil.HTX(xml)
					});
				}
			});
		}else{
			Ext.Msg.alert(SYS,'请选择要核销的记录！');
		}
	};
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_ACCOUNTDUE_COUNT,
	    id:'ACCOUNTDUE',iconCls:'stats',closable:true,layout:'border',
	    layoutConfig:{columns:2},frame:false,header:false,
		border:false,autoScroll:false,
		items:[transSumGrid,expeGrid
		],
	    bbar:['->',
	    	  {text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
		      /*{xtype:'tbtext',text:'应收合计：'},txtSumR,'-',
		      {xtype:'tbtext',text:'应付合计：'},txtSumP,'-',
		      {xtype:'tbtext',text:'中转回扣合计'},txtSumHk,'-',
			  {xtype:'tbtext',text:'利润合计：'},txtSumMargin*/
		      {xtype:'tbtext',text:'发货方运费合计：'},txtSumShipR,'-',
		      {xtype:'tbtext',text:'收货方运费合计：'},txtSumConsR,'-'
		],
		tbar:new Ext.Panel({border:false,items:[{
		      xtype:'toolbar',
		      items:[{text:C_COMPLAX_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
            	      {text:C_EXPORT,iconCls:'print',scope:this,menu:{items:[exp]}},'-',
            	      {text:'发货方运费核销',iconCls:'check',handler:this.shipWriteOff,disabled:NR(M1_STAT+T_ACCO+F_SHIP_R)},'-',
            	      {text:'收货方运费核销',iconCls:'check',handler:this.consWriteOff,disabled:NR(M1_STAT+T_ACCO+F_COMS_R)},'-',
            	      {text:C_REFRESH,iconCls:'refresh',handler:this.reset},'-',
            	      '->',//PTB(store,C_PS100)
            	      new Ext.PagingToolbar({pageSize:C_PS100,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
  	      	        	doLoad : function(start){
  	      	                var o = {}, 
  	      	                pn = this.getParams();
  	      	                o[pn.start] = start;
  	      	                o[pn.limit] = this.pageSize;
  	      	                if(this.fireEvent('beforechange', this, o) !== false){
  	      	                    this.store.load({params:o,callback:function(){}});
  	      	                }
  	      	            }
        	        })
            	]
			},
			{
				xtype:'toolbar',
				items:[
					{text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
					{text:C_TO,xtype:'tbtext'},t3,
					{text:C_CONS_NO_HANDLER+':',xtyp:'tbtext'},kw,
					{text:C_CARRIER_UNIT+':',xtype:'tbtext'},t4,
					{text:'物流单号'+':',xtype:'tbtext'},t5,
					{text:'发货方'+':',xtype:'tbtext'},t6,
					{text:'收收方'+':',xtype:'tbtext'},t7,
					{text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch},'-'
			    ]
			}]
		})
    });
};
Ext.extend(Fos.AccountDueCountGrid,Ext.Panel);

//应收费用统计 settlement_expense.rptdesign
Fos.StatArTab = function(T){
	var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STAT_NO_GROUP],
		      ['1',C_BOOKER],
		      ['7',C_GROU],
		      ['6',C_SALES],
		      ['3',C_CONS_NO]
		]});
	var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE]
		]});
	
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
    var t4=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
    var doc=new Ext.ux.IFrameComponent({id:T, url:''});
 	var check=function(){
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);
			return;
		}
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);
			return;
		}
	};
	
	this.getUrl=function(fmt){
		var charName=this.find('name','charName')[0].getValue();
		var custId=this.find('name','custId')[0].getValue();		
		var consSalesRepId=this.find('name','consSalesRepId')[0].getValue();		
		var expeBillStatus=this.find('name','expeBillStatus')[0].getValue();
		var expeInvoiceStatus=this.find('name','expeInvoiceStatus')[0].getValue();
		var expeWriteoffStatus=this.find('name','expeWriteoffStatus')[0].getValue();
		
		var url = REPORT_URL;
		
		if(T=='CUEX'){
			url = url+'&__report=reports/cust_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value+'&g='+t1.value;
		}
		else{
			url = url+'&__report=reports/settlement_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value;		
		}
			
		if(charName) url+='&charName='+charName;
		if(custId) url+='&custId='+custId;
		if(consSalesRepId) url+='&consSalesRepId='+consSalesRepId;
		if(expeBillStatus) url+='&expeBillStatus='+expeBillStatus;
		if(expeInvoiceStatus) url+='&expeInvoiceStatus='+expeInvoiceStatus;
		if(expeWriteoffStatus) url+='&expeWriteoffStatus='+expeWriteoffStatus;
		return url;
	};
	
	this.report=function(){
		check();
		Ext.get('IF_'+T).dom.src=this.getUrl();
	};
	this.clear=function(){
		this.find('name','sf')[0].getForm().reset();
	};
	this.expExcel=function(){
		check();
		OWW(this.getUrl()+'&__format=xls');
	};
	
	var b1={text:C_GEN_REPORT,disabled:NR(M1_STAT+T_CUEX),iconCls:'stats',scope:this,handler:this.report};
	var b2={text:C_EXPORT,disabled:NR(M1_STAT+T_CUEX),iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}};
	var b3={text:C_CLEAR_FILTER,iconCls:'rotate',scope:this,handler:this.clear};
	var tg={xtype:'tbtext',text:C_GROUP_TYPE};
	var tf={xtype:'tbtext',text:C_FROM};
	var tt={xtype:'tbtext',text:C_TO};
	Fos.StatArTab.superclass.constructor.call(this, {layout:'border',
		id:T=='CUEX'?'T_CUEX':'T_SEEX',
    	title:T=='CUEX'?C_STAT_AR:C_STAT_ARC,iconCls:'stats',closable:true,autoScroll:true,
     tbar:T=='CUEX'?[tg,t1,'-',t4,tf,t2,tt,t3,'-',b1,'-',b2,'->','-',b3]:[t4,tf,t2,tt,t3,'-',b1,'-',b2,'->','-',b3],
		items:[
			{region:'north',title:C_FILTER_MORE,name:'sf',xtype:'form',layout:'column',layoutConfig:{columns:4},
				height:92,frame:false,deferredRender:false,collapsible:true,collapsed:true,padding:5,items:[
	        	{columnWidth:.4,layout:'form',tabIndex:1,labelWidth:80,labelAlign:'right',border:false,items:[
	            	{fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),
		        		xtype:'combo',displayField:'custCode',valueField:'custId',
		        		typeAhead:true,enableKeyEvents:true,
		        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		        		triggerAction:'all',selectOnFocus:true,anchor:'95%',
		              	listeners:{scope:this,
		              		keydown:{fn:function(f,e){
		              			LC(f,e,'custBookerFlag');
		              			},buffer:500}
		              	}
	            	},     				
     				{fieldLabel:'对账状态',name:'expeBillStatus',xtype:'combo',editable:false,
	            		store:HTStore.BILL_STATUS_S,displayField:'NAME',valueField:'CODE',
	            		typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
     				]},
	        	{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
					{fieldLabel:C_CHAR,tabIndex:4,name:'charName',store:HTStore.getCHAR_S(),
						xtype:'combo',displayField:'charName',valueField:'charName',editable:false,
						typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:'账单状态',name:'expeInvoiceStatus',xtype:'combo',store:HTStore.INST_S,
	            		displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',editable:false,
	            		triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]},
    			{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[	            	
	           		{fieldLabel:C_SALES,tabIndex:6,name:'consSalesRepId',
            			value:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1)?sessionStorage.getItem("USER_ID"):'',
    	    	        readOnly:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1),
	            		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userLoginName',
	            		valueField:'userId',typeAhead: true,mode: 'remote',triggerAction:'all',editable:false,
	            		selectOnFocus:true,anchor:'95%'},
	           		{fieldLabel:'核销状态',name:'expeWriteoffStatus',xtype:'combo',
	            		store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',editable:false,
	            		triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]}
	    	]},
	    	{layout:'fit',region:'center',items:[doc]}]});
};
Ext.extend(Fos.StatArTab, Ext.Panel);

//应付费用统计 vendor_expense.rptdesign
Fos.StatApTab = function(){
	var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STAT_NO_GROUP],
		      ['1',C_VENDOR],
		      ['7',C_GROU],
		      ['6',C_SALES],
		      ['3',C_CONS_NO]
		]});
	var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE]
		]});	
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
    var t4=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
    var doc=new Ext.ux.IFrameComponent({id:'VEEX', url:''});
   	var check=function(){
		if(!t2.getValue()){XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
	};
	this.getUrl=function(){
		var charName=this.find('name','charName')[0].getValue();		
		var custId=this.find('name','custId')[0].getValue();		
		var consSalesRepId=this.find('name','consSalesRepId')[0].getValue();
		var consNo=this.find('name','consNo')[0].getValue();
		var expeBillStatus=this.find('name','expeBillStatus')[0].getValue();
		var expeInvoiceStatus=this.find('name','expeInvoiceStatus')[0].getValue();
		var expeWriteoffStatus=this.find('name','expeWriteoffStatus')[0].getValue();
		
		var url = REPORT_URL+'&__report=reports/vendor_expense.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		url += '&dt='+t4.value+'&F='+t2.value+'&T='+t3.value;
		
		if(charName) url+='&charName='+charName;
		if(custId) url+='&custId='+custId;		
		if(consSalesRepId) url+='&consSalesRepId='+consSalesRepId;
		if(consNo) url+='&consNo='+consNo;
		if(expeBillStatus) url+='&expeBillStatus='+expeBillStatus;
		if(expeInvoiceStatus) url+='&expeInvoiceStatus='+expeInvoiceStatus;
		if(expeWriteoffStatus) url+='&expeWriteoffStatus='+expeWriteoffStatus;
		return url;
	};
	this.report=function(){
		check();
		Ext.get('IF_VEEX').dom.src=this.getUrl();
	};
	this.clear=function(){
		this.find('name','sf')[0].getForm().reset();
	};
	this.expExcel=function(){
		check();
		OWW(this.getUrl()+'&__format=xls');
	};
	
	Fos.StatApTab.superclass.constructor.call(this, {    
    id:'T_VEEN',title:C_STAT_AP,iconCls:'stats',closable:true,autoScroll:true,layout:'border',
     tbar:[
		{xtype:'tbtext',text:C_GROUP_TYPE},t1,'-',
		t4,{xtype:'tbtext',text:C_FROM},t2,{xtype:'tbtext',text:C_TO},t3,'-',
		{text:C_GEN_REPORT,disabled:NR(M1_STAT+T_VEEX),iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,disabled:NR(M1_STAT+T_VEEX),iconCls:'print',scope:this,
			menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}},'->','-',
		{text:C_CLEAR_FILTER,iconCls:'rotate',scope:this,handler:this.clear}],
		items:[
			{region:'north',title:C_FILTER_MORE,layout:'column',name:'sf',xtype:'form',layoutConfig:{columns:4},
				height:120,frame:false,deferredRender:false,collapsible:true,collapsed:true,padding:5,items:[
	        	{columnWidth:.4,layout:'form',labelWidth:80,labelAlign:'right',border:false,items:[
	            	{fieldLabel:C_VENDOR,name:'custId',tabIndex:1,store:HTStore.getCS(),
		        		xtype:'combo',displayField:'custCode',valueField:'custId',typeAhead:true,enableKeyEvents:true,
		        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'95%',
		              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custApFlag');},buffer:500}}},
					{fieldLabel:'对账状态',name:'expeBillStatus',xtype:'combo',
						store:HTStore.BILL_STATUS_S,displayField:'NAME',valueField:'CODE',editable:false,
						typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
     			]},
	        	{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
					{fieldLabel:C_CHAR,tabIndex:4,name:'charName',store:HTStore.getCHAR_S(),
						xtype:'combo',displayField:'charName',valueField:'charName',editable:false,
						typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:'开票状态',name:'expeInvoiceStatus',xtype:'combo',
	            		store:HTStore.INST_S,displayField:'NAME',valueField:'CODE',typeAhead:true,editable:false,
	            		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}	            	
	            ]},
    			{columnWidth:.3,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
	           		{fieldLabel:C_SALES,tabIndex:6,name:'consSalesRepId',
            			value:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1)?sessionStorage.getItem("USER_ID"):'',
    	    	        readOnly:(sessionStorage.getItem("USER_ALL_VIEW_FLAG")==0&&sessionStorage.getItem("USER_IS_SAL")==1),
	            		store:HTStore.getSALE_S(),xtype:'combo',displayField:'userLoginName',editable:false,
	            		valueField:'userId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	           		{fieldLabel:'业务号',name:'consNo',tabIndex:12,xtype:'textfield',anchor:'95%'},
	           		{fieldLabel:'核销状态',name:'expeWriteoffStatus',xtype:'combo',
	           			store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,editable:false,
	           			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}
	            ]}]},
	    	{region:'center',layout:'fit',deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatApTab, Ext.Panel);

//核销明细统计表 write_off.rptdesign
Fos.StatWOTab = function(t){
    var G_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
    	data:[['0',C_STAT_NO_GROUP],
    	      ['1',C_SETTLE_OBJECT],
    	      ['2',C_CONS_NO],
    	      ['4',C_WRITEOFF_DATE]
    	]});
	var T_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_WRITEOFF_R],
		      ['1',C_WRITEOFF_P]
		]});
	var t1=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:G_S});
    var t2=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
         	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:T_S});
    var t3=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t4=new Ext.form.DateField({value:new Date(),format:DATEF});
    var doc=new Ext.ux.IFrameComponent({id:'STWO', url:''});
 	this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_SEL_WRITEOFF_DATE,function(){t3.focus();},this);
			return;
		};
		var url = REPORT_URL+'&__report=reports/write_off.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		Ext.get('IF_STWO').dom.src=url+'&g='+t1.value+'&dt='+t2.value+'&F='+t3.value+'&T='+t4.value;
	};
	this.exp=function(){
		var url = REPORT_URL+'&__report=reports/write_off.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		OWW(url+'&__format=xls&g='+t1.value+'&dt='+t2.value+'&F='+t3.value+'&T='+t4.value);
	};
	
	Fos.StatWOTab.superclass.constructor.call(this, {    
    id:'T_WROF',title:C_STAT_WRITEOFF,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    tbar:[{xtype:'tbtext',text:C_GROUP_TYPE},t1,'-',
		{xtype:'tbtext',text:C_WRITEOFF_TYPE},t2,'-',
		{xtype:'tbtext',text:C_WRITEOFF_DATE+C_FROM},t3,'-',
		{xtype:'tbtext',text:C_TO},t4,'-',
		{text:C_GEN_REPORT,iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.exp}]}}],
		items:[{layout:'fit',height:600,deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatWOTab, Ext.Panel);

//账款帐龄分析表t:AR应收 AP应付
Fos.StatACTab = function(t){
    var t1=new Ext.form.DateField({value:new Date(),format:DATEF});
    var doc=new Ext.ux.IFrameComponent({id:'AC'+t, url:''});
 	
    this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t2.focus();},this);
			return;
		};
		var url = REPORT_URL;
		if(t=='AR')
			url += '&__report=reports/account_age_r.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		else
			url += '&__report=reports/account_age_p.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
				
		Ext.get('IF_AC'+t).dom.src=url+'&cd=30&d='+t1.value;
	};
	
	this.expExcel=function(){
		var url = REPORT_URL;
		if(t=='AR')
			url += '&__report=reports/account_age_r.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
		else
			url += '&__report=reports/account_age_p.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	Fos.StatACTab.superclass.constructor.call(this, {
    	id:'T_AC'+t,title:t=='AR'?C_STAT_AR_AC:C_STAT_AP_AC,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
     	tbar:[{xtype:'tbtext',text:C_STAT_END_DATE},t1,'-',
		{text:C_GEN_REPORT,iconCls:'stats',scope:this,handler:this.report},'-',
		{text:C_EXPORT,iconCls:'print',scope:this,menu:{items:[{text:'Excel',scope:this,handler:this.expExcel}]}}],
		items:[{layout:'fit',height:600,deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.StatACTab, Ext.Panel);
