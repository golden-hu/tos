//基础数据
var getGeneralPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	//陆运相关
	items=[];
	if(HR(M1_GEN+P_PATE))//运费条款(付款方式)
		items[items.length]=FosMenu(panel,'付款方式','PATE',function(){return new Fos.GPateGrid();});
	if(HR(M1_GEN+P_TRAT))//运输方式
		items[items.length]=FosMenu(panel,'运输方式','TRANS_TYPE',function(){return new Fos.TransTypeGrid();});
	var traPanel=new Ext.Panel({title:C_TRANSPORTATION_RELATED,collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//地点相关
	items=[];
	if(HR(M1_GEN+P_PLAC))//地点
		items[items.length]=FosMenu(panel,C_PLAC,'PLAC',function(){return new Fos.GPlacGrid();});
	/*if(HR(M1_GEN+P_COUN))//国家
		items[items.length]=FosMenu(panel,C_COUN,'COUN',function(){return new Fos.GCounGrid();});*/
	var placePanel=new Ext.Panel({title:C_PLAC_RELATED,collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//结算相关
	items=[];
	if(HR(M1_GEN+P_UNIT))//计量单位
		items[items.length]=FosMenu(panel,C_UNIT,'UNIT',function(){return new Fos.GUnitGrid();});
	if(HR(M1_GEN+P_SEWA))//结算方式
		items[items.length]=FosMenu(panel,C_SEWA,'SEWA',function(){return new Fos.GSewaGrid();});
	if(HR(M1_GEN+P_CHCL))//费用类别
		items[items.length]=FosMenu(panel,C_CHCL,'CHCL',function(){return new Fos.GChclGrid();});
	if(HR(M1_GEN+P_CHAR))//费用名称
		items[items.length]=FosMenu(panel,C_CHAR,'CHAR',function(){return new Fos.GCharGrid();});
	if(HR(M1_GEN+P_COBA))//银行账户
		items[items.length]=FosMenu(panel,C_COBA,'COBA',function(){return new Fos.GCobaGrid();});
	/*if(HR(M1_GEN+P_CURR))//币种
		items[items.length]=FosMenu(panel,C_CURR,'CURR',function(){return new Fos.GCurrGrid();});*/
	var setPanel=new Ext.Panel({title:C_SETTLE_RELATED,collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//客户相关
	items=[];
	if(HR(M1_GEN+P_CUCA))//客户类别
		items[items.length]=FosMenu(panel,C_CUCA,'COBA',showCustomerCategory);
	var cusPanel=new Ext.Panel({title:'客户相关',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",collapsible:true,
		layout:'accordion',split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		layoutConfig:{
			titleCollapse:true,
			animate:false,
			activeOnTop:false
		},
		items:[traPanel,placePanel,setPanel,cusPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});

	createWindow('GEN',C_MASTER_DATA,contPanel);//C_MASTER_DATA
};

//地点
Fos.GPlacGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PLAC_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPlace',id:'id'},GPlace),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	    {header:boldFont('省市类型'),dataIndex:'placType',renderer:HTStore.getPLTY,
			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
        	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.PLTY_S})},
	    {header:boldFont('省市代码'),dataIndex:'placCode',editor:new Ext.form.TextField()},
	    {header:boldFont('省市名称'),dataIndex:'placName',editor:new Ext.form.TextField()},
		{header:boldFont(C_ENAME),dataIndex:'placNameEn',editor:new Ext.form.TextField()},
		{header:boldFont(C_STATE),dataIndex:'placProvinceName',
			editor:new Ext.form.ComboBox({displayField:'placName',valueField:'placName',triggerAction: 'all',
			mode:'remote',selectOnFocus:true,
			store:HTStore.getPROVINCE_S(),
			listeners:{select:function(c,r,v){
				var p = sm.getSelected();
				p.beginEdit();
				p.set('placProvinceId',r.get("id"));
				p.endEdit();
			}}})},
		{header:boldFont(C_COUN),dataIndex:'counCode',
			editor:new Ext.form.ComboBox({displayField:'counCode',valueField:'counCode',triggerAction: 'all',
			tpl:counTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',
			selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})},
        /*{header:C_ADDRESS,dataIndex:'placAddress',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'}),hidden:true},
        {header:C_PACKING_STATION,dataIndex:'placStation',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'})},*/
        {header:boldFont(C_REMARKS),dataIndex:'placDesc',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'})}
		],defaults:{sortable:false,width:100}});
	this.add=function(){
		var p = new GPlace({uuid:HTUtil.UUID(32),placCode:'',placName:'',placNameEn:'',counCode:'CN',placType:'1',
			placProvinceId:'',placCityId:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		var bl=true;
		var a = store.getRange();
		for(var i=0;i<a.length;i++){
			if(a[i].get('placType')==''){
				XMG.alert(SYS,'省市类型不能为空！');
				bl=false;
				break;
			}else if(a[i].get('placCode')==''){
				XMG.alert(SYS,'省市代码不能为空！');
				bl=false;
				break;
			}else if(a[i].get('placName')==''){
				XMG.alert(SYS,'省市名称不能为空！');
				bl=false;
				break;
			}else if(a[i].get('placNameEn')==''){
				XMG.alert(SYS,'省市英文名称不能为空！');
				bl=false;
				break;
			}
		}
		if(bl){
			HTUtil.POST(store,'GPlace',GPlace,'PLAC_S');
		}
	};
	
	Fos.GPlacGrid.superclass.constructor.call(this,{
    id:'P_PLAC',iconCls:'gen',title:C_PLAC,header:false,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,loadMask:true,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_PLAC),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_PLAC),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_PLAC),iconCls:'save',scope:this,handler:this.save}, '-'
        ]
    });
};
Ext.extend(Fos.GPlacGrid, Ext.grid.EditorGridPanel);

//国家
Fos.GCounGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COUN_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCountry',id:'id'},GCountry),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:100}});
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
    {header:boldFont(C_CODE),dataIndex:'counCode',width:80},
	{header:boldFont(C_ENAME),dataIndex:'counNameEn'},
	{header:boldFont(C_CNAME),dataIndex:'counNameCn'},ac],defaults:{sortable:false,width:150}});
    
    this.save = function(){
    	HTUtil.POST(store,'GCountry',GCountry,'COUN_S');
    };
    this.exp=function(){
    	EXP('C','COUN','');
    };
    Fos.GCounGrid.superclass.constructor.call(this,{id:'P_COUN',iconCls:'gen',title:C_COUN,header:false,
    plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,loadMask:true,
    bbar:PTB(store,100),
    tbar:[{text:C_SAVE,disabled:NR(M1_GEN+P_COUN),iconCls:'save',handler:this.save},'-'
        /*{text:C_EXPORT,disabled:NR(M1_GEN+P_COUN),iconCls:'print',handler:this.exp}*/					//输出
    ]
    });
};
Ext.extend(Fos.GCounGrid, Ext.grid.EditorGridPanel);

//计量单位
Fos.GUnitGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=UNIT_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GUnit',id:'id'},GUnit),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'unitCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'unitName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},ac],
	defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var p = new GUnit({uuid:HTUtil.UUID(32),unitCode:'',unitName:'',active:1,version:'0',rowAction:'N'}); 
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST_CALLBACK(store,'GUnit',GUnit,'UNIT_S',function(){getUNIT_S().reload();});
	};
	Fos.GUnitGrid.superclass.constructor.call(this,{
    id:'P_UNIT',iconCls:'gen',title:C_UNIT,header:false,plugins:ac,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+P_UNIT),iconCls:'add',scope:this,handler:this.add},'-',
		{text:C_REMOVE,disabled:NR(M1_GEN+P_UNIT),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_UNIT),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GUnitGrid, Ext.grid.EditorGridPanel);

//包装种类
Fos.GPackGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PACK_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPackage',id:'id'},GPackage),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'packCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'packName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GPackage({uuid:HTUtil.UUID(32),packCode:'',packName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST_CALLBACK(store,'GPackage',GPackage,'PACK_S',function(){getPACK_S().reload();});
	};
    Fos.GPackGrid.superclass.constructor.call(this,{id:'G_PACK',
	iconCls:'gen',title:C_PACK,header:false,plugins:ac,clicksToEdit:1,closable:true,
    store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_PACK),iconCls:'add',scope:this,handler:this.add}, '-', 
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PACK),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PACK),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GPackGrid, Ext.grid.EditorGridPanel);

//箱类
Fos.GCoclGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COCL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GContainerClass',id:'id'},GContainerClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'coclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'coclName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var p = new GContainerClass({uuid:HTUtil.UUID(32),coclCode:'',coclName:'',active:1,version:'0',rowAction:'N'}); 
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GContainerClass',GContainerClass,'COCL_S');
	};
	Fos.GCoclGrid.superclass.constructor.call(this,{
    id:'G_COCL',iconCls:'gen',title:C_COCL,header:false,plugins:ac,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_COCL),iconCls:'add',scope:this,handler:this.add},'-',
		{text:C_REMOVE,disabled:NR(M1_GEN+G_COCL),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_COCL),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCoclGrid, Ext.grid.EditorGridPanel);

//箱型
Fos.GCotyGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GContainerType',id:'id'},GContainerType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:boldFont(C_CODE),dataIndex: 'cotyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:boldFont(C_COCL),dataIndex: 'coclCode',
			editor:new Ext.form.ComboBox({displayField:'coclName',valueField:'coclCode',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOCL_S()})},
		{header:boldFont(C_SIZE),dataIndex: 'cotyLength',
			editor:new Ext.form.ComboBox({displayField: 'CODE',valueField: 'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.COLE_S})},		
		{header:boldFont(C_TEU),dataIndex: 'cotyTeu',editor:new Ext.form.NumberField()},
		{header:boldFont(C_ISO_CODE),dataIndex: 'cotyIsoCode',editor:new Ext.form.TextField()},
		{header:boldFont(C_UN_CODE),dataIndex: 'cotyUnCode',editor:new Ext.form.TextField()},
		{header:boldFont(C_TARE_W),dataIndex: 'cotyTareWeight',editor:new Ext.form.NumberField()},
		{header:boldFont(C_MAX_W),dataIndex: 'cotyMaxWeight',editor:new Ext.form.NumberField()},
		{header:boldFont(C_MAX_C),dataIndex: 'cotyMaxWeight',editor:new Ext.form.NumberField()},
		ac],defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var p = new GContainerType({uuid:HTUtil.UUID(32),active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GContainerType',GContainerType,'COTY_S');
	};
	Fos.GCotyGrid.superclass.constructor.call(this,{ 
    id:'G_COTY',iconCls:'gen',title:C_COTY,header:false,plugins:ac,clicksToEdit:1,closable:true,	
    store: store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_COTY),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_COTY),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_COTY),iconCls:'save',scope:this,handler:this.save}]});
};
Ext.extend(Fos.GCotyGrid, Ext.grid.EditorGridPanel);

//货物种类
Fos.GCaclGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CACL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCargoClass',id:'id'},GCargoClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:boldFont(C_CUSTOM_CODE),dataIndex:'caclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
    {header:boldFont(C_CSNAME),dataIndex:'caclNameCn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_ENAME),dataIndex:'caclNameEn',editor:new Ext.form.TextField()},
	{header:boldFont(C_PREMIUM_RATE),dataIndex:'premiumRate',editor:new Ext.form.NumberField()},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GCargoClass({uuid:HTUtil.UUID(32),active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GCargoClass',GCargoClass,'CACL_S');
	};
    Fos.GCaclGrid.superclass.constructor.call(this,{id:'G_CACL',iconCls:'gen',title:C_CACL,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_CACL),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CACL),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CACL),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCaclGrid, Ext.grid.EditorGridPanel);

//品名
Fos.GCatyGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CATY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCargoType',id:'id'},GCargoType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
    var df = new Ext.grid.CheckColumn({header:boldFont(C_IS_DANAGER),dataIndex:'catyDanagerFlag',sortable:false,width:55});
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:boldFont(C_CUSTOM_CODE),dataIndex:'catyCode',editor:new Ext.form.TextField()},
    {header:boldFont(C_CSNAME),dataIndex:'catyNameCn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_ENAME),dataIndex:'catyNameEn',editor:new Ext.form.TextField()},
	df,
	{header:boldFont(C_DANAGER_NO),dataIndex:'catyDanagerNo',editor:new Ext.form.TextField()},
	{header:boldFont(C_DANAGER_P),dataIndex:'catyDanagerProperty',editor:new Ext.form.TextField()},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GCargoType({uuid:HTUtil.UUID(32),catyCode:'',catyNameCn:'',catyNameEn:'',
    		catyDanagerFlag:'0',catyDanagerNo:'',catyDanagerProperty:'',active:1,version:'0',rowAction:'N'});            
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GCargoType',GCargoType,'CATY_S');
	};
    Fos.GCatyGrid.superclass.constructor.call(this,{
    id:'G_CATY',iconCls:'gen',title:C_CATY,
	plugins:[ac,df],clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_CATY),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CATY),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CATY),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCatyGrid, Ext.grid.EditorGridPanel);

//运费条款(付款方式)
Fos.GPateGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PATE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPaymentTerm',id:'id'},GPaymentTerm),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'pateCode',sortable:false,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'pateName',sortable:false,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''}),width:180},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p=new GPaymentTerm({uuid:HTUtil.UUID(32),pateCode:'',pateName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST_CALLBACK(store,'GPaymentTerm',GPaymentTerm,'PATE_S',function(){HTStore.getPATE_S().reload();});
	};
    Fos.GCatyGrid.superclass.constructor.call(this,{
    id:'G_PATE',iconCls:'gen',title:'付款方式',header:false,
	plugins:ac,clicksToEdit:1,closable:true,store: store,sm:sm,cm:cm,	
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_PATE),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_PATE),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_PATE),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GPateGrid, Ext.grid.EditorGridPanel);

//(陆运)运输方式
Fos.TransTypeGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=T_TRANS_TYPE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransType',id:'id'},TTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  store.load();
  
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	    {header:boldFont(C_TRAT),dataIndex:'transTypeName',editor:new Ext.form.TextField()}
		],defaults:{sortable:false,width:150}});
  
  this.add=function(){
  	var p = new TTransType({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
      this.stopEditing();
      store.insert(0,p);
      this.startEditing(0,1);
  };
  this.del=function(){
  	HTUtil.REMOVE_SM(sm,store);
  };
  this.save=function(){
  	HTUtil.POST(store,'TTransType',TTransType,'T_TRANS_TYPE_S');
  };
  
  btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_GEN+P_TRAT),
  	scope:this,handler:this.add});
  btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_GEN+P_TRAT),
  	scope:this,handler:this.del});
  btnSave = new Ext.Button({text:C_SAVE,iconCls:'option',disabled:NR(M1_GEN+P_TRAT),
  	scope:this,handler:this.save});
  btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
  
  Fos.TransTypeGrid.superclass.constructor.call(this,{id:'G_TRANS_TYPE',iconCls:'gen',
  	title:C_TRAT,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
		tbar:[btnAdd,'-',btnRemove, '-',btnSave,'-']
  });
};
Ext.extend(Fos.TransTypeGrid, Ext.grid.EditorGridPanel);

//贸易方式
Fos.GTrtyGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TRTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTradeType',id:'id'},GTradeType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'trtyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'trtyName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:120}});
    
    this.add=function(){
    	var p = new GTradeType({uuid:HTUtil.UUID(32),trtyCode:'',trtyName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GTradeType',GTradeType,'TRTY_S');
	};
    Fos.GTrtyGrid.superclass.constructor.call(this,{
    id:'G_TRTY',iconCls:'gen',title:C_TRTY,
	header:false,plugins:ac,clicksToEdit:1,closable:true,store: store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_TRTY),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_TRTY),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_TRTY),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GTrtyGrid, Ext.grid.EditorGridPanel);

//用途
Fos.GUsagGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=USAG_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GUsage',id:'id'},GUsage),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'usagCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'usagName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GUsage({uuid:HTUtil.UUID(32),usagCode:'',usagName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GUsage',GUsage,'USAG_S');
	};
    Fos.GTrtyGrid.superclass.constructor.call(this,{
    id:'G_USAG',iconCls:'gen',title:C_USAG,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_USAG),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_USAG),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_USAG),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GUsagGrid, Ext.grid.EditorGridPanel);

//征免性质
Fos.GLetyGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=LETY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GLevyType',id:'id'},GLevyType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'letyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'letyName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p=new GLevyType({uuid:HTUtil.UUID(32),letyCode:'',letyName:'',letyDesc:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GLevyType',GLevyType,'LETY_S');
	};
    Fos.GLetyGrid.superclass.constructor.call(this,{id:'G_LETY',iconCls:'gen',title:C_LETY,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_LETY),iconCls:'add',scope:this,handler:this.add},'-',
         {text:C_REMOVE,disabled:NR(M1_GEN+G_LETY),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_LETY),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GLetyGrid, Ext.grid.EditorGridPanel);

//结汇方式
Fos.GExseGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=EXSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GExchangeSettlement',id:'id'},GExchangeSettlement),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'exseCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'exseName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GExchangeSettlement({uuid:HTUtil.UUID(32),exseCode:'',exseName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GExchangeSettlement',GExchangeSettlement,'EXSE_S');
	};
    Fos.GExseGrid.superclass.constructor.call(this,{
    id:'G_EXSE',iconCls:'gen',title:C_EXSE,
	header:false,plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_EXSE),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_EXSE),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_EXSE),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GExseGrid, Ext.grid.EditorGridPanel);

//运输类型查询
Fos.GTratGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TRAT_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTransType',id:'id'},GTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex: 'tratCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex: 'tratName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});    
    this.add=function(){
    	var p = new GTransType({uuid:HTUtil.UUID(32),tratCode:'',tratName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GTransType',GTransType,'TRAT_S');
	};
    Fos.GTratGrid.superclass.constructor.call(this,{
    id:'G_TRAT',iconCls:'gen',title:C_TRAT,
	header:false,plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_TRAT),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_TRAT),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_TRAT),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GTratGrid, Ext.grid.EditorGridPanel);

//签单方式
Fos.GIstyGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=ISTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GIssueType',id:'id'},GIssueType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:boldFont(C_CODE),dataIndex: 'istyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'istyName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GIssueType({uuid:HTUtil.UUID(32),istyCode:'',istyName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST_CALLBACK(store,'GIssueType',GIssueType,'ISTY_S',function(){getISTY_S().reload();});
	};
    Fos.GIstyGrid.superclass.constructor.call(this,{id:'G_ISTY',iconCls:'gen',title:C_ISTY,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store: store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_ISTY),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_ISTY),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_ISTY),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GIstyGrid, Ext.grid.EditorGridPanel);

//结算方式
Fos.GSewaGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=SEWA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GSettlementWay',id:'id'},GSettlementWay),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'sewaCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'sewaName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GSettlementWay({uuid:HTUtil.UUID(32),sewaCode:'',sewaName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST_CALLBACK(store,'GSettlementWay',GSettlementWay,'SEWA_S',function(){getSEWA_S().reload();});
	};
    Fos.GSewaGrid.superclass.constructor.call(this,{id:'P_SEWA',iconCls:'gen',title:C_SEWA,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_SEWA),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_SEWA),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_SEWA),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GSewaGrid, Ext.grid.EditorGridPanel);

//币种
Fos.GCurrGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CURR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCurrency',id:'id'},GCurrency),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'currCode',editor:new Ext.form.TextField({maxLength:3,allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'currName',editor:new Ext.form.TextField({maxLength:16,allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_SYMBOL),dataIndex:'currSymbol',editor:new Ext.form.TextField({maxLength:1,allowBlank: true})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GCurrency({uuid:HTUtil.UUID(32),currCode:'',currName:'',currSymbol:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GCurrency',GCurrency,'CURR_S');
	};
    Fos.GCurrGrid.superclass.constructor.call(this,{
    id:'P_CURR',iconCls:'gen',title:C_CURR,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_CURR),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_CURR),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_CURR),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GCurrGrid, Ext.grid.EditorGridPanel);

//费用类别
Fos.GChclGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CHCL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GChargeClass',id:'id'},GChargeClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'chclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_NAME),dataIndex:'chclName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new GChargeClass({uuid:HTUtil.UUID(32),chclCode:'',chclName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GChargeClass',GChargeClass,'CHCL_S');
	};
    Fos.GChclGrid.superclass.constructor.call(this,{id:'P_CHCL',iconCls:'gen',title:C_CHCL,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_CHCL),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_CHCL),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_CHCL),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GChclGrid, Ext.grid.EditorGridPanel);

//费用名称
Fos.GCharGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CHAR_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'GCharge',id:'id'},GCharge),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:100}});
    
    var tmsFlag=new Ext.grid.CheckColumn({header:boldFont('陆运'),dataIndex:'tmsFlag',width:55});
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});

    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_CODE),dataIndex:'charCode',width:60,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_CNAME),dataIndex:'charName',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:boldFont(C_ENAME),dataIndex:'charNameEn',width:100,editor:new Ext.form.TextField()},
	{header:boldFont(C_CURR_DEFAULT),dataIndex: 'currCode',width:80,
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()})},		
	{header:boldFont(C_CHCL),dataIndex:'chclName',width:80,
		editor:new Ext.form.ComboBox({displayField:'chclName',valueField:'chclName',triggerAction: 'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCHCL_S(),
        listeners:{
        	select:function(c,r,v){
        	sm.getSelected().set('chclId',r.get('id'));
        	sm.getSelected().set('chclCode',r.get('chclCode'));
        }}
	})},
	{header:boldFont(C_UNIT_DEFAULT),dataIndex:'unitName',width:100,
		editor:new Ext.form.ComboBox({displayField:'unitName',valueField:'unitName',triggerAction: 'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S(),
        listeners:{select:function(c,r,v){sm.getSelected().set('unitId',r.get('id'));}}
		})},tmsFlag,
	ac],defaults:{sortable:false,width:100}});
	var ts=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['charCode',C_CODE],['charNameEn',C_ENAME],['charName',C_CNAME]]});
	var st = new Ext.form.ComboBox({width:80,store:ts,value:'charCode',displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',forceSelection: true,triggerAction:'all',selectOnFocus:true});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var t=st.getValue();var k=kw.getValue();
		if(!t||!k){XMG.alert(SYS,M_NO_QUERY_P);return;};
     	var a=[];
     	a[0]=new QParam({key:t,value:k,op:7});
     	store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
     	store.reload({params:{start:0,limit:100}});
	};
	
	this.add=function(){
		var p = new GCharge({uuid:HTUtil.UUID(32),charCode:'',charName:'',
			currCode:'CNY',unitId:'',chclId:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GCharge',GCharge,'CHAR_S');
	};
	Fos.GCharGrid.superclass.constructor.call(this,{id:'P_CHAR',iconCls:'gen',title:C_CHAR,header:false,
	plugins:[ac,tmsFlag],clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,bbar:PTB(store,100),
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_CHAR),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_CHAR),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+P_CHAR),iconCls:'save',scope:this,handler:this.save},'-',
        st,kw,{text:C_SEARCH,iconCls:'search',handler:this.search},'-',
        '->',new Ext.PagingToolbar({pageSize:100,store:store})]
    });
};
Ext.extend(Fos.GCharGrid, Ext.grid.EditorGridPanel);

//银行账户
Fos.GCobaGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COBA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompanyBankAccount',id:'id'},PCompanyBankAccount),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:boldFont(C_ACTIVE),dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:boldFont(C_ACCOUNT_NAME),dataIndex:'cobaName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''}),width:150},
	{header:boldFont(C_BANK),dataIndex:'cobaBank',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''}),width:150},
	{header:boldFont(C_BANK_ACCOUNT),dataIndex:'cobaAccount',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''}),width:200},
	{header:boldFont(C_CURR),dataIndex: 'currCode',
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()})},
	ac],defaults:{sortable:false,width:100}});
    
    this.add=function(){
    	var p = new PCompanyBankAccount({uuid:HTUtil.UUID(32),cobaName:'',cobaBank:'',cobaAccount:'',currCode:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'PCompanyBankAccount',PCompanyBankAccount,'COBA_S');
	};
    Fos.GCobaGrid.superclass.constructor.call(this,{
    id:'P_COBA',iconCls:'gen',title:C_COBA,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+P_COBA),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+P_COBA),iconCls:'remove',scope:this,handler:this.del},'-',
        {text:C_SAVE,disabled:NR(M1_GEN+P_COBA),iconCls:'save',scope:this,handler:this.save},'-']
    });
};
Ext.extend(Fos.GCobaGrid, Ext.grid.EditorGridPanel);

//运价
Fos.TPriceTab = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TPRICE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TPrice',id:'id'},TPrice),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{active:1}});
    
    this.showPriceWin = function(p){
		var win = new Fos.TPriceWin(p,store);
		win.show();
    };
    this.addPrice=function(){
		var r = new TPrice({uuid:HTUtil.UUID(32),rowAction:'N'}); 
		this.showPriceWin(r);
    };
    this.del=function(){
		var b =sm.getSelected();
		if(b){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TPrice');
	        		HTUtil.REQUEST('TPRICE_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showPriceWin(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};    
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
    {header:boldFont(C_LOAD_PROVINCE),dataIndex:'loadProvinceName'},    
    {header:boldFont(C_LOAD_CITY),dataIndex:'loadCityName'},
    {header:boldFont(C_DISCHARGE_PROVINCE),dataIndex:'dischargeProvinceName'},    
    {header:boldFont(C_DISCHARGE_CITY),dataIndex:'dischargeCityName'},
    {header:boldFont(TRANS_MILES),dataIndex:'miles'},
    {header:boldFont(TRANS_DURATION),dataIndex:'duration'},
    {header:boldFont(TRANS_PRICE1),dataIndex:'price1'},
    {header:boldFont(TRANS_PRICE2),dataIndex:'price2'},
    {header:boldFont(TRANS_PRICE3),dataIndex:'price3'},
    {header:boldFont(TRANS_PRICE4),dataIndex:'price4'},
    {header:boldFont(C_EFFECT_DATE),dataIndex:"startDate",renderer:formatDate},
	{header:boldFont(C_EXPIRY_DATE),dataIndex:"endDate",renderer:formatDate}
	],defaults:{sortable:false,width:80}});
    
    var grid = new  Ext.grid.EditorGridPanel({clicksToEdit:1,store:store,sm:sm,cm:cm,border:false,
    	listeners:{scope:this,rowdblclick:function(g,r,e){this.edit();}},
    tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addPrice},'-',
		{text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}, '-']});    
    
    var store2 = new Ext.data.Store({url:SERVICE_URL+'?_A=TPRICE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TPrice',id:'id'},TPrice),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store2.load({params:{start:0,limit:C_PS,active:0}});
    
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm2=new Ext.grid.ColumnModel({columns:[
    new Ext.grid.RowNumberer(),
    {header:boldFont(C_LOAD_PROVINCE),dataIndex:'loadProvinceName'},    
    {header:boldFont(C_LOAD_CITY),dataIndex:'loadCityName'},
    {header:boldFont(C_DISCHARGE_PROVINCE),dataIndex:'dischargeProvinceName'},    
    {header:boldFont(C_DISCHARGE_CITY),dataIndex:'dischargeCityName'},
    {header:boldFont(TRANS_MILES),dataIndex:'miles'},
    {header:boldFont(TRANS_DURATION),dataIndex:'duration'},
    {header:boldFont(TRANS_PRICE1),dataIndex:'price1'},
    {header:boldFont(TRANS_PRICE2),dataIndex:'price2'},
    {header:boldFont(TRANS_PRICE3),dataIndex:'price3'},
    {header:boldFont(TRANS_PRICE4),dataIndex:'price4'},
    {header:boldFont(C_EFFECT_DATE),dataIndex:"startDate",renderer:formatDate},
	{header:boldFont(C_EXPIRY_DATE),dataIndex:"endDate",renderer:formatDate}
	],defaults:{sortable:false,width:80}});
	
    var t1=new Ext.form.ComboBox({width:80,displayField:'placName',valueField:'id',triggerAction:'all',
         	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPROVINCE_S(),
         	listeners:{scope:this,select:function(c,r,v){        	 	
        	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
        	 	t2.store.baseParams= bp;
        	 	t2.store.reload();
         	}}});
    var t2=new Ext.form.ComboBox({width:80,displayField:'placName',valueField:'id',triggerAction:'all',
         	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCITY_S()});
    
    var t3=new Ext.form.ComboBox({width:80,displayField:'placName',valueField:'id',triggerAction:'all',
     	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPROVINCE_S(),
     	listeners:{scope:this,select:function(c,r,v){        	 	
    	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
    	 	t4.store.baseParams= bp;
    	 	t4.store.reload();
     	}}});
    var t4=new Ext.form.ComboBox({width:80,displayField:'placName',valueField:'id',triggerAction:'all',
     	mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCITY_S()});

    var t5=new Ext.form.DateField({format:'Y-m-d'});
    var t6=new Ext.form.DateField({format:'Y-m-d'});
    
    this.search = function(){
    	var params = {start:0,limit:C_PS,active:0};
    	if(t1.getValue()) params.loadProvinceId= t1.getValue();
    	if(t2.getValue()) params.loadCityId= t2.getValue();
    	if(t3.getValue()) params.dischargeProvinceId= t3.getValue();
    	if(t4.getValue()) params.dischargeCityId= t4.getValue();
    	if(t5.getValue()) params.startDate= t5.getValue();
    	if(t6.getValue()) params.endDate= t6.getValue();
    	
    	store2.load({params:params,callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});
    };
    
    var grid2 = new  Ext.grid.GridPanel({header:false,store:store2,sm:sm2,cm:cm2,border:false,
    	tbar:[
    	{xtype:'tbtext',text:C_LOAD_PROVINCE+'：'},t1,'-',
    	{xtype:'tbtext',text:C_LOAD_CITY+'：'},t2,'-',
    	{xtype:'tbtext',text:C_DISCHARGE_PROVINCE+'：'},t3,'-',
    	{xtype:'tbtext',text:C_DISCHARGE_CITY+'：'},t4,'-',
    	{xtype:'tbtext',text:C_EFFECT_DATE+'：'},t5,'-',
    	{xtype:'tbtext',text:C_EXPIRY_DATE+'：'},t6,'-',
    	{text:C_SEARCH,iconCls:'search',handler:this.search},'-'],
    	bbar:PTB(store2,C_PS)
    });  
    
	Fos.TPriceTab.superclass.constructor.call(this, { 
		id:'TRANS_PRICE_LIST',title:TRANS_PRICE,header:false,deferredRender:false,
		autoScroll:true,closable:true,border:false,layout:'fit',
		items:[{xtype:'tabpanel',plain:true,activeTab:0,
            items:[
            {layout:'fit',title:TRANS_PRICE,items:grid},
            {layout:'fit',title:TRANS_PRICE_HISTORY,items:grid2}]}
        ]});
};
Ext.extend(Fos.TPriceTab, Ext.FormPanel);

//运价-显示框
Fos.TPriceWin = function(p,store) {
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('loadProvinceName'))){
			Ext.Msg.alert(SYS,C_LOAD_PROVINCE+NOT_NULL,function(){frm.loadProvince.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('loadCityName'))){
			Ext.Msg.alert(SYS,C_LOAD_CITY+NOT_NULL,function(){frm.loadCity.focus();},this);
			return;
		};
		p.endEdit();
		
		var xml = HTUtil.RTX(p,'TPrice',TPrice);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TPRICE_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'TPrice',TPrice);
			var ra=p.get('rowAction');
			var f = TPrice.prototype.fields;
			p.beginEdit();
			for (var i = 0; i < f.keys.length; i++) {
				var fn = ''+f.keys[i];
				p.set(fn,c.get(fn));
			};   				
			if(ra=='N'){
				p.set('rowAction','M');
				store.insert(0,p);
			}
			p.endEdit();
			Ext.Msg.alert(SYS,M_S);	
			this.close();					
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var frm = new Ext.form.FormPanel({header:false,labelWidth:100,frame:true,border:false,
		items:[
	    		{fieldLabel:C_LOAD_PROVINCE,name:'loadProvinceName',
            	 value:p.get('loadProvinceName'),ref:'../loadProvince',
            	 store:HTStore.getPROVINCE_S(),xtype:'combo',displayField:'placName',valueField:'placName',
            	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
            	 listeners:{scope:this,select:function(c,r,v){
	        	 	p.set('loadProvinceId',r.get('id'));
	        	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
	        	 	this.loadCity.store.baseParams= bp;
	        	 	this.loadCity.store.reload();
	         	}}},
	         	{fieldLabel:C_LOAD_CITY,name:'loadCityName',
	               	 value:p.get('loadCityName'),ref:'../loadCity',
	               	 store:HTStore.getCITY_S(p.get('placProvinceId')),xtype:'combo',displayField:'placName',valueField:'placName',
	               	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
	               	 listeners:{select:function(c,r,v){
	   	        	 	p.set('loadCityId',r.get('id'));
	   	         }}},
		   	      {fieldLabel:C_DISCHARGE_PROVINCE,name:'dischargeProvinceName',
		            	 value:p.get('dischargeProvinceName'),ref:'../dischargeProvince',
		            	 store:HTStore.getPROVINCE_S(),xtype:'combo',displayField:'placName',valueField:'placName',
		            	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
		            	 listeners:{scope:this,select:function(c,r,v){
			        	 	p.set('dischargeProvinceId',r.get('id'));
			        	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
			        	 	this.dischargeCity.store.baseParams= bp;
			        	 	this.dischargeCity.store.reload();
			         	}}},
	         	{fieldLabel:C_DISCHARGE_CITY,name:'dischargeCityName',
	               	 value:p.get('dischargeCityName'),ref:'../dischargeCity',
	               	 store:HTStore.getCITY_S(p.get('dischargeProvinceId')),xtype:'combo',displayField:'placName',valueField:'placName',
	               	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
	               	 listeners:{select:function(c,r,v){
	   	        	 	p.set('dischargeCityId',r.get('id'));
	   	         }}},
		    	{fieldLabel:TRANS_MILES,name:'miles',
			    	    value:p.get('miles'),xtype:'numberfield',anchor:'99%'},
	            {fieldLabel:TRANS_DURATION,name:'duration',
	    	            value:p.get('duration'),xtype:'numberfield',anchor:'99%'},
	    	    {fieldLabel:TRANS_PRICE1,name:'price1',
	    		        value:p.get('price1'),xtype:'numberfield',anchor:'99%'},
		        {fieldLabel:TRANS_PRICE2,name:'price2',
    		        value:p.get('price2'),xtype:'numberfield',anchor:'99%'},
		        {fieldLabel:TRANS_PRICE3,name:'price3',
    		        value:p.get('price3'),xtype:'numberfield',anchor:'99%'},
		        {fieldLabel:TRANS_PRICE4,name:'price4',
    		        value:p.get('price4'),xtype:'numberfield',anchor:'99%'}
	    ]});
	
	Fos.TPriceWin.superclass.constructor.call(this,{buttonAlign:'right',autoScroll:true,
		title:p.get('rowAction')=='N'?C_ADD+TRANS_PRICE:C_EDIT+TRANS_PRICE,
		width:300,height:520,modal:true,
	  	items:[frm],
	  	buttons:[
	  	         {text:C_SAVE,iconCls:'save',scope:this,handler:this.save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.TPriceWin, Ext.Window);

//客户类型
var showCustomerCategory = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUCA_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomerCategory',id:'id'},CCustomerCategory),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load();
    var sm=getCSM();
    var grid = '';
    grid=new Ext.grid.EditorGridPanel({id:'G_CUCA',title:C_CUCA,iconCls:'gen',
    	header:false,clicksToEdit:1,closable:true,store:store,sm:sm,
    	cm:new Ext.grid.ColumnModel([sm,
    	    {header:boldFont('ID'),hidden:true,dataIndex:'cucaId',width:50},
    	    {header:boldFont(C_NAME),dataIndex:'cucaName',width:150,sortable:false,
    		editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})
    	}]),
    	tbar:[{text:C_ADD,disabled:NR(M1_CUST),iconCls:'add',
    		handler:function(){
			var p = new CCustomerCategory({cucaName:'',
				version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			grid.stopEditing();
			store.insert(0,p);
			grid.startEditing(0, 2);
		}},'-',
		{text:C_REMOVE,disabled:NR(M1_CUST),iconCls:'remove',
			handler:function(){HTUtil.REMOVE_SM(sm,store);}}, '-', 
        {text:C_SAVE,disabled:NR(M1_CUST),iconCls:'save',handler:function(){HTUtil.POST(store,'CCustomerCategory',CCustomerCategory,'CUCA_S');}},'-'
        ]
    });
    return grid;
};