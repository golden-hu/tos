﻿var getGeneralPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});		
	//业务相关
	var items=[];
	if(HR(M1_GEN+G_VESS))
		items[items.length]=FosMenu(panel,C_VESS,'VESS',function(){return new Fos.GVessGrid();});
	if(HR(M1_GEN+G_DOTY))
		items[items.length]=FosMenu(panel,C_DOTY,'DOTY',function(){return new Fos.GDotyGrid();});
	if(HR(M1_GEN+G_SHLI))
		items[items.length]=FosMenu(panel,C_SHLI,'SHLI',function(){return new Fos.GShliGrid();});
	if(HR(M1_GEN+G_TRTE))
		items[items.length]=FosMenu(panel,C_TRTE,'TRTE',function(){return new Fos.GTrteGrid();});
	if(HR(M1_GEN+G_TTER))
		items[items.length]=FosMenu(panel,C_TTER,'TTER',function(){return new Fos.GTterGrid();});
	if (HR(M1_COMPLAINTS))
		items[items.length] = FosMenu(panel,C_COMPLAINTS_TYPE,'C_COMTYPE',function(){return new Fos.CComplaintsTypeGrid();});
	if(HR(M1_EXPRESS)) 
		items[items.length]=FosMenu(panel,C_NETWORK,'NETWORK',function(){return new Fos.NetworkGrid();});
	var bizPanel=new Ext.Panel({title:C_BIZ_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//地点相关
	items=[];
	if(HR(M1_GEN+G_PORT))
		items[items.length]=FosMenu(panel,C_PORT,'PORT',function(){return new Fos.GPortGrid(0);});
	if(HR(M1_GEN+G_PORT))
		items[items.length]=FosMenu(panel,C_AIRP,'AIRP',function(){return new Fos.GPortGrid(1);});
	if(HR(M1_GEN+G_PLAC))
		items[items.length]=FosMenu(panel,C_PLAC,'PLAC',function(){return new Fos.GPlacGrid();});
	if(HR(M1_GEN+G_COUN))
		items[items.length]=FosMenu(panel,C_COUN,'COUN',function(){return new Fos.GCounGrid();});
	var placePanel=new Ext.Panel({title:C_PLAC_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//货物相关
	items=[];
	if(HR(M1_GEN+G_UNIT))
		items[items.length]=FosMenu(panel,C_UNIT,'UNIT',function(){return new Fos.GUnitGrid();});
	if(HR(M1_GEN+G_PACK))
		items[items.length]=FosMenu(panel,C_PACK,'PACK',function(){return new Fos.GPackGrid();});
	if(HR(M1_GEN+G_COCL))
		items[items.length]=FosMenu(panel,C_COCL,'COCL',function(){return new Fos.GCoclGrid();});
	if(HR(M1_GEN+G_COTY))
		items[items.length]=FosMenu(panel,C_COTY,'COTY',function(){return new Fos.GCotyGrid();});
	if(HR(M1_GEN+G_CACL))
		items[items.length]=FosMenu(panel,C_CACL,'CACL',function(){return new Fos.GCaclGrid();});
	if(HR(M1_GEN+G_CATY))
		items[items.length]=FosMenu(panel,C_CATY,'CATY',function(){return new Fos.GCatyGrid();});
	var cargoPanel=new Ext.Panel({title:C_CARO_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//报关相关
	items=[];
	if(HR(M1_GEN+G_PATE))
		items[items.length]=FosMenu(panel,C_PATE,'PATE',function(){return new Fos.GPateGrid();});
	if(HR(M1_GEN+G_TRTY))
		items[items.length]=FosMenu(panel,C_TRTY,'TRTY',function(){return new Fos.GTrtyGrid();});
	if(HR(M1_GEN+G_USAG))
		items[items.length]=FosMenu(panel,C_USAG,'USAG',function(){return new Fos.GUsagGrid();});
	if(HR(M1_GEN+G_LETY))
		items[items.length]=FosMenu(panel,C_LETY,'LETY',function(){return new Fos.GLetyGrid();});
	if(HR(M1_GEN+G_EXSE))
		items[items.length]=FosMenu(panel,C_EXSE,'EXSE',function(){return new Fos.GExseGrid();});
	if(HR(M1_GEN+G_TRAT))
		items[items.length]=FosMenu(panel,C_TRAT,'TRAT',function(){return new Fos.GTratGrid();});
	if(HR(M1_GEN+G_ISTY))
		items[items.length]=FosMenu(panel,C_ISTY,'ISTY',function(){return new Fos.GIstyGrid();});
	var cudePanel=new Ext.Panel({title:C_CUDE_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	//结算相关
	items=[];
	if(HR(M1_GEN+G_SEWA))
		items[items.length]=FosMenu(panel,C_SEWA,'SEWA',function(){return new Fos.GSewaGrid();});
	if(HR(M1_GEN+G_CURR))
		items[items.length]=FosMenu(panel,C_CURR,'CURR',function(){return new Fos.GCurrGrid();});
	if(HR(M1_GEN+G_CHCL))
		items[items.length]=FosMenu(panel,C_CHCL,'CHCL',function(){return new Fos.GChclGrid();});
	if(HR(M1_GEN+G_CHAR))
		items[items.length]=FosMenu(panel,C_CHAR,'CHAR',function(){return new Fos.GCharGrid();});
	if(HR(M1_GEN+G_COBA))
		items[items.length]=FosMenu(panel,C_COBA,'COBA',function(){return new Fos.GCobaGrid();});		
	var setPanel=new Ext.Panel({title:C_SETTLE_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});	
	var menuPanel = new Ext.Panel({region:"west",width:130,collapsible:true,layout:'accordion',collapseMode:'mini',split:true,
		items:[bizPanel,placePanel,cargoPanel,cudePanel,setPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	return contPanel;
};

Fos.GVessGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VESS_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GVessel',id:'id'},GVessel),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0, limit:100}});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var k=kw.getValue();
		if(!k){
			XMG.alert(SYS,M_NO_QUERY_P);return;
		};
     	var a=[];
     	a[0]={key:'vessNameEn',value:k,op:7};
     	store.baseParams={_A:'VESS_X',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
     	store.reload({params:{start:0,limit:100}});
	};
	var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_ENAME,dataIndex:'vessNameEn',width:150,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:C_CNAME,dataIndex:'vessNameCn',width:130,editor:new Ext.form.TextField()},
		{header:C_VESS_TYPE,dataIndex:'vessType',renderer:HTStore.getVETY,width:130,
			editor:new Ext.form.ComboBox({displayField: 'NAME',valueField:'CODE',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.VETY_S})},
        {header:C_CARRIER,dataIndex:'vessLiner',width:130,editor:new Ext.form.TextField()},
        {header:C_REMARKS,dataIndex:'vessDesc',width:130,editor:new Ext.form.TextField()},
		{header:C_COUN,dataIndex:'counCode',
			editor:new Ext.form.ComboBox({displayField: 'counNameEn',valueField:'counCode',triggerAction: 'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})},
		{header:C_VESS_CALL,dataIndex: 'vessCode',editor:new Ext.form.TextField()},
		ac],defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var p = new GVessel({uuid:HTUtil.UUID(32),vessCode:'',vessNameEn:'',vessNameCn:'',vessLiner:'',
			vessDesc:'',vessType:'',active:1,version:0,rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){HTUtil.REMOVE_SM(sm,store);};
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'GVessel',GVessel,'VESS_S');
	};
	Fos.GVessGrid.superclass.constructor.call(this,{
		id:'G_VESS',iconCls:'gen',title:C_VESS,header:false,plugins:ac,clicksToEdit:1,closable:true,	
		store:store,sm:sm,cm:cm,loadMask: true,
		bbar:PTB(store,100),
		tbar:[{
			text:C_ADD,disabled:NR(M1_GEN+G_VESS+F_M),iconCls:'add',scope:this,handler:this.add},'-',
			{text:C_REMOVE,disabled:NR(M1_GEN+G_VESS+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
			{text:C_SAVE,disabled:NR(M1_GEN+G_VESS+F_M),iconCls:'save',scope:this,handler:this.save},
			kw,{text:C_SEARCH,iconCls:'search',handler:this.search}
			,'->',new Ext.PagingToolbar({width:200,pageSize:100,store:store})]
    });
};
Ext.extend(Fos.GVessGrid, Ext.grid.EditorGridPanel);

Fos.GDotyGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'DOTY_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GDocumentType',id:'id'},GDocumentType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
            {header:C_CODE,dataIndex:'dotyCode',editor:new Ext.form.TextField()},
            {header:C_DOC_NAME,dataIndex:'dotyName',editor:new Ext.form.TextField()},
			ac],defaults:{sortable:false,width:180}});
	this.add=function(){
		var p = new GDocumentType({uuid:HTUtil.UUID(32),dotyCode:'',dotyName:'',
			active:1,version:'0',rowAction:'N'});
		this.stopEditing();
		store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'GDocumentType',GDocumentType,'DOTY_S');
	};
	
	Fos.GDotyGrid.superclass.constructor.call(this,{
    id:'G_DOTY',iconCls:'gen',title:C_DOTY,header:false,plugins:ac,clicksToEdit:1,closable:true,	
    store: store,sm:sm,cm:cm,loadMask:true,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_DOTY+F_M),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_DOTY+F_M),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_DOTY+F_M),iconCls:'save',scope:this,handler:this.save}]
    }); 
};
Ext.extend(Fos.GDotyGrid, Ext.grid.EditorGridPanel);

Fos.GShliGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=SHLI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GShippingLine',id:'id'},GShippingLine),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var bulk=CHKCLM(C_BULK_USABLE,'shliBulkFlag');
    var cont=CHKCLM(C_CONT_USABLE,'shliContFlag');
   
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CODE,dataIndex:'shliCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:C_CNAME,dataIndex:'shliName',editor:new Ext.form.TextField({allowBlank:true,blankText:'',invalidText:''})},
		{header:C_ENAME,dataIndex:'shliNameEn',width:150,editor:new Ext.form.TextField({allowBlank:true,blankText:'',invalidText:''})},
		bulk,cont],defaults:{sortable:false,width:150}});
    this.add=function(){
    	var p = new GShippingLine({uuid:HTUtil.UUID(32),shliCode:'',shliName:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
    };
    this.del=function(){HTUtil.REMOVE_SM(sm,store);};
    this.save=function(){
    	HTUtil.POST(store,'GShippingLine',GShippingLine,'SHLI_S');
    };
    
    Fos.GShliGrid.superclass.constructor.call(this,{ 
    id:'G_SHLI',iconCls:'gen',title:C_SHLI,header:false,clicksToEdit:1,closable:true,	
    plugins:[bulk,cont],store: store,sm:sm,cm:cm,loadMask:true,
	tbar:[{text:C_ADD+'(N)',disabled:NR(M1_GEN+G_SHLI+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE+'(R)',disabled:NR(M1_GEN+G_SHLI+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE+'(S)',disabled:NR(M1_GEN+G_SHLI+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GShliGrid, Ext.grid.EditorGridPanel);

Fos.GTrteGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TRTE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTradeTerm',id:'id'},GTradeTerm),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'trteCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'trteName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac],defaults:{sortable:false,width:100}});
    this.add=function(){
    	var p=new GTradeTerm({uuid:HTUtil.UUID(32),trteCode:'',trteName:'',active:1,version:'0',rowAction:'N'});            
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'GTradeTerm',GTradeTerm,'TRTE_S');
    };
    Fos.GTrteGrid.superclass.constructor.call(this,{
    id:'G_TRTE',iconCls:'gen',title:C_TRTE,
	header:false,plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_TRTE+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_TRTE+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_TRTE+F_M),iconCls:'save',scope:this,handler:this.save}]
    }); 
};
Ext.extend(Fos.GTrteGrid, Ext.grid.EditorGridPanel);

Fos.GTterGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TTER_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTransTerm',id:'id'},GTransTerm),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	
    var bulk=CHKCLM(C_BULK_USABLE,'tranBulkFlag',90);
    var cont=CHKCLM(C_CONT_USABLE,'tranContFlag',90);
    var air=CHKCLM(C_AIR_USABLE,'tranAirFlag',90);
    
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'tranCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'tranName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	ac,bulk,cont,air],defaults:{sortable:false,width:150}});
    
    this.add=function(){
    	var p = new GTransTerm({uuid:HTUtil.UUID(32),tranCode:'',tranName:'',active:1,version:'0',rowAction:'N'});            
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST_CALLBACK(store,'GTransTerm',GTransTerm,'TTER_S',function(){HTStore.getTRAN_S().reload();});
    };
    Fos.GTrteGrid.superclass.constructor.call(this,{id:'G_TTER',
	iconCls:'gen',title:C_TTER,header:false,plugins:[ac,bulk,cont,air],clicksToEdit:1,   
	closable:true,store:store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_TTER+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_TTER+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_TTER+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GTterGrid, Ext.grid.EditorGridPanel);

Fos.GPortGrid = function(pt) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PORT_X',
		baseParams:{_mt:'json',portType:pt},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPort',id:'id'},GPort),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:100}});
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var c1={header:C_COUN,dataIndex: 'counCode',
			editor:new Ext.form.ComboBox({displayField:'counCode',valueField:'counCode',triggerAction: 'all',
				tpl:counTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',selectOnFocus:true,
				listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})};
    var c2={header:C_CODE,dataIndex: 'portCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})};
    var c3={header:C_ENAME,dataIndex: 'portNameEn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})};
    var c4={header:C_CNAME,dataIndex: 'portNameCn',editor:new Ext.form.TextField({allowBlank:true,blankText:'',invalidText:''})};
	var cm=new Ext.grid.ColumnModel({columns:[sm,c1,c2,c3,c4,ac],defaults:{sortable:false,width:130}});
	
	var ts=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['portCode',C_CODE],['portNameEn',C_ENAME],['portNameCn',C_CNAME],['counCode',C_COUN_CODE]]});
	var st = new Ext.form.ComboBox({width:80,store:ts,value:'portNameEn',displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',forceSelection: true,triggerAction:'all',selectOnFocus:true});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var t=st.getValue();
		var k=kw.getValue();
		if(!t||!k){XMG.alert(SYS,M_NO_QUERY_P);return;};
     	var a=[];
     	a[0]={key:t,value:k,op:7};
     	store.baseParams={_mt:'json',portType:pt,xml:HTUtil.QATJ(a)};
     	store.reload({params:{start:0,limit:100}});
	};
	this.add=function(){
		var p = new GPort({uuid:HTUtil.UUID(32),
			portCode:'',portNameEn:'',portNameCn:'',counCode:'CN',portType:pt,
			active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GPort',GPort,'PORT_S');
	};
	this.exp=function(){
		EXP('C','PORT','');
	};
	Fos.GPortGrid.superclass.constructor.call(this,{
    id:pt==0?'G_PORT':'G_AIRP',iconCls:'gen',title:pt==0?C_PORT:C_AIRP,header:false,plugins:ac,clicksToEdit:1,closable:true,	
    store: store,sm:sm,cm:cm,loadMask:true,
	bbar:PTB(store,100),
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_PORT),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PORT),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PORT),iconCls:'save',scope:this,handler:this.save},'-',
        {text:C_EXPORT,disabled:NR(M1_GEN+G_PORT),iconCls:'print',scope:this,handler:this.exp},'-', 
        st,kw,{text:C_SEARCH,iconCls:'search',scope:this,handler:this.search},
		'->',new Ext.PagingToolbar({pageSize:100,store:store})]
    });
};
Ext.extend(Fos.GPortGrid, Ext.grid.EditorGridPanel);

Fos.GPlacGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PLAC_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPlace',id:'id'},GPlace),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:C_TYPE,dataIndex:'placType',renderer:HTStore.getPLTY,
		editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.PLTY_S})},
	    {header:C_CODE,dataIndex:'placCode',editor:new Ext.form.TextField()},
	    {header:C_NAME,dataIndex:'placName',width:150,editor:new Ext.form.TextField()},
		{header:C_ENAME,dataIndex:'placNameEn',editor:new Ext.form.TextField()},
		{header:C_PROVINCE,dataIndex:'placProvinceName',
			editor:new Ext.form.ComboBox({displayField:'placName',valueField:'placName',triggerAction: 'all',
			mode:'remote',selectOnFocus:true,
			store:HTStore.getPROVINCE_S(),
			listeners:{select:function(c,r,v){
				var p = sm.getSelected();
				p.beginEdit();
				p.set('placProvinceId',r.get("id"));
				p.endEdit();
			}}})},
			{header:C_COUN,dataIndex:'counCode',
				editor:new Ext.form.ComboBox({displayField:'counCode',valueField:'counCode',triggerAction: 'all',
				tpl:counTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',
				selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})},
        {header:C_ADDRESS,dataIndex:'placAddress',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'})},
        {header:C_PACKING_STATION,dataIndex:'placStation',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'})},
        {header:C_REMARKS,dataIndex:'placDesc',editor:new Ext.form.TextArea({grow:true,height:'400',width:'400'})}
		],defaults:{sortable:false,width:100}});
	this.add=function(){
		var p = new GPlace({uuid:HTUtil.UUID(32),placCode:'',placName:'',placNameEn:'',counCode:'CN',placType:'3',
			placProvinceId:'',placCityId:'',active:1,version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0, 1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){
		HTUtil.POST(store,'GPlace',GPlace,'PLAC_S');
	};
	
	Fos.GPlacGrid.superclass.constructor.call(this,{
    id:'G_PLAC',iconCls:'gen',title:C_PLAC,header:false,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,loadMask:true,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_PLAC),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PLAC),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PLAC),iconCls:'save',scope:this,handler:this.save
        }]
    });
};
Ext.extend(Fos.GPlacGrid, Ext.grid.EditorGridPanel);

Fos.GCounGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COUN_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCountry',id:'id'},GCountry),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:100}});
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
    {header:C_CODE,dataIndex:'counCode',width:80},
	{header:C_ENAME,dataIndex:'counNameEn'},
	{header:C_CNAME,dataIndex:'counNameCn'},ac],
	defaults:{sortable:false,width:180}});
    
    this.save = function(){
    	HTUtil.POST(store,'GCountry',GCountry,'COUN_S');
    };
    this.exp=function(){
    	EXP('C','COUN','');
    };
    Fos.GCounGrid.superclass.constructor.call(this,{id:'G_COUN',iconCls:'gen',title:C_COUN,header:false,
    plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,loadMask:true,
    bbar:PTB(store,100),
    tbar:[{text:C_SAVE,disabled:NR(M1_GEN+G_COUN),iconCls:'save',handler:this.save},'-',
        {text:C_EXPORT,disabled:NR(M1_GEN+G_COUN),iconCls:'print',handler:this.exp}]
    });
};
Ext.extend(Fos.GCounGrid, Ext.grid.EditorGridPanel);

Fos.GUnitGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=UNIT_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GUnit',id:'id'},GUnit),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var cboUnitClassName=new Ext.form.ComboBox({name:'unitClassName',store:HTStore.PACKAGES_S,mode:'local',
    	displayField:'NAME',valueField:'NAME',typeAhead: true,triggerAction:'all',selectOnFocus:true,anchor:'95%',
    	listeners:{
    		scope:this,
    		select:function(c,r,i){
    			
    			var re=sm.getSelected();
    			if(re){
    				
    				re.set('unitClassId',r.get('CODE'));
    				
    			}
    			
    		}
    	}
    	});
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'unitCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'unitName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:"类别",dataIndex:'unitClassName',editor:cboUnitClassName},
	ac],
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
		//HTUtil.POST_CALLBACK(store,'GUnit',GUnit,'UNIT_S',function(){getUNIT_S().reload();});
		HTUtil.POST(store,'GUnit',GUnit,'UNIT_S');
	};
	Fos.GUnitGrid.superclass.constructor.call(this,{
    id:'G_UNIT',iconCls:'gen',title:C_UNIT,header:false,plugins:ac,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_UNIT),iconCls:'add',scope:this,handler:this.add},'-',
		{text:C_REMOVE,disabled:NR(M1_GEN+G_UNIT),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_UNIT),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GUnitGrid, Ext.grid.EditorGridPanel);

Fos.GPackGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PACK_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPackage',id:'id'},GPackage),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'packCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'packName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
		text:C_ADD,disabled:NR(M1_GEN+G_PACK+F_M),iconCls:'add',scope:this,handler:this.add}, '-', 
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PACK+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PACK+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GPackGrid, Ext.grid.EditorGridPanel);

Fos.GCoclGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COCL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GContainerClass',id:'id'},GContainerClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'coclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'coclName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_COCL+F_M),iconCls:'add',scope:this,handler:this.add},'-',
		{text:C_REMOVE,disabled:NR(M1_GEN+G_COCL+F_M),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_COCL+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCoclGrid, Ext.grid.EditorGridPanel);

Fos.GCotyGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GContainerType',id:'id'},GContainerType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_CODE,dataIndex: 'cotyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:C_COCL,dataIndex: 'coclCode',
			editor:new Ext.form.ComboBox({displayField:'coclName',valueField:'coclCode',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOCL_S()})},
		{header:C_SIZE,dataIndex: 'cotyLength',
			editor:new Ext.form.ComboBox({displayField: 'CODE',valueField: 'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.COLE_S})},		
		{header:C_TEU,dataIndex: 'cotyTeu',editor:new Ext.form.NumberField()},
		{header:C_ISO_CODE,dataIndex: 'cotyIsoCode',editor:new Ext.form.TextField()},
		{header:C_UN_CODE,dataIndex: 'cotyUnCode',editor:new Ext.form.TextField()},
		{header:C_TARE_W,dataIndex: 'cotyTareWeight',editor:new Ext.form.NumberField()},
		{header:C_MAX_W,dataIndex: 'cotyMaxWeight',editor:new Ext.form.NumberField()},
		{header:C_MAX_C,dataIndex: 'cotyMaxWeight',editor:new Ext.form.NumberField()},
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
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_COTY+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_COTY+F_M),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_COTY+F_M),iconCls:'save',scope:this,handler:this.save}]});
};
Ext.extend(Fos.GCotyGrid, Ext.grid.EditorGridPanel);

Fos.GCaclGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CACL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCargoClass',id:'id'},GCargoClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:C_CUSTOM_CODE,dataIndex:'caclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
    {header:C_CSNAME,dataIndex:'caclNameCn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ENAME,dataIndex:'caclNameEn',editor:new Ext.form.TextField()},
	{header:C_PREMIUM_RATE,dataIndex:'premiumRate',editor:new Ext.form.NumberField()},
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
		text:C_ADD,disabled:NR(M1_GEN+G_CACL+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CACL+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CACL+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCaclGrid, Ext.grid.EditorGridPanel);

Fos.GCatyGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CATY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCargoType',id:'id'},GCargoType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
    var df = new Ext.grid.CheckColumn({header:C_IS_DANAGER,dataIndex:'catyDanagerFlag',sortable:false,width:55});
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:C_CSNAME,dataIndex:'catyNameCn',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ENAME,dataIndex:'catyNameEn',editor:new Ext.form.TextField()},
	{header:C_MANU_NO,dataIndex:'catyManuNo',editor:new Ext.form.TextField()},
	{header:C_SPEC,dataIndex:'catySpec',editor:new Ext.form.TextField()},
	{header:C_CACL,dataIndex:'catyCargoType',editor:new Ext.form.ComboBox({
		store:HTStore.getCACL_S(),displayField:'caclNameCn',valueField:'caclNameCn',typeAhead:true,
  		mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'50%',
  		listeners:{
  			scope:this,
  			select:function(c,r,v){
  				var record = sm.getSelected();
  				record.set('catyCode',r.get('caclCode'));
  			}
  		}
	})},
	{header:C_CUSTOM_CODE,dataIndex:'catyCode',editor:new Ext.form.TextField()},
	df,
	{header:C_DANAGER_NO,dataIndex:'catyDanagerNo',editor:new Ext.form.TextField()},
	{header:C_DANAGER_P,dataIndex:'catyDanagerProperty',editor:new Ext.form.TextField()},
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
		text:C_ADD,disabled:NR(M1_GEN+G_CATY+F_M),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CATY+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CATY+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCatyGrid, Ext.grid.EditorGridPanel);

Fos.GPateGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PATE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPaymentTerm',id:'id'},GPaymentTerm),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'pateCode',sortable:false,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'pateName',sortable:false,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''}),width:180},
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
    id:'G_PATE',iconCls:'gen',title:C_PATE,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store: store,sm:sm,cm:cm,	
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_PATE),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PATE),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PATE),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GPateGrid, Ext.grid.EditorGridPanel);

Fos.GTrtyGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TRTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTradeType',id:'id'},GTradeType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'trtyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'trtyName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
		text:C_ADD,disabled:NR(M1_GEN+G_TRTY+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_TRTY+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_TRTY+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GTrtyGrid, Ext.grid.EditorGridPanel);

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
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_USAG+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_USAG+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_USAG+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GUsagGrid, Ext.grid.EditorGridPanel);

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
		text:C_ADD,disabled:NR(M1_GEN+G_LETY+F_M),iconCls:'add',scope:this,handler:this.add},'-',
         {text:C_REMOVE,disabled:NR(M1_GEN+G_LETY+F_M),iconCls:'remove',scope:this,handler:this.del},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_LETY+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GLetyGrid, Ext.grid.EditorGridPanel);

Fos.GExseGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=EXSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GExchangeSettlement',id:'id'},GExchangeSettlement),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'exseCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'exseName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
	tbar:[{text:C_ADD,disabled:NR(M1_GEN+G_EXSE+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_EXSE+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_EXSE+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GExseGrid, Ext.grid.EditorGridPanel);

Fos.GTratGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TRAT_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GTransType',id:'id'},GTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex: 'tratCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex: 'tratName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
		text:C_ADD,disabled:NR(M1_GEN+G_TRAT+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_TRAT+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_TRAT+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GTratGrid, Ext.grid.EditorGridPanel);

Fos.GIstyGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=ISTY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GIssueType',id:'id'},GIssueType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:C_CODE,dataIndex: 'istyCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'istyName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
		text:C_ADD,disabled:NR(M1_GEN+G_ISTY+F_M),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_ISTY+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_ISTY+F_M),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GIstyGrid, Ext.grid.EditorGridPanel);

Fos.GSewaGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=SEWA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GSettlementWay',id:'id'},GSettlementWay),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'sewaCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'sewaName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
    Fos.GSewaGrid.superclass.constructor.call(this,{id:'G_SEWA',iconCls:'gen',title:C_SEWA,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_SEWA),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_SEWA),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_SEWA),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GSewaGrid, Ext.grid.EditorGridPanel);

Fos.GCurrGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CURR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCurrency',id:'id'},GCurrency),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'currCode',editor:new Ext.form.TextField({maxLength:3,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'currName',editor:new Ext.form.TextField({maxLength:16,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_SYMBOL,dataIndex:'currSymbol',editor:new Ext.form.TextField({maxLength:1,allowBlank: true})},
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
    id:'G_CURR',iconCls:'gen',title:C_CURR,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_CURR),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CURR),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CURR),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCurrGrid, Ext.grid.EditorGridPanel);

Fos.GChclGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CHCL_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GChargeClass',id:'id'},GChargeClass),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'chclCode',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NAME,dataIndex:'chclName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
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
    Fos.GChclGrid.superclass.constructor.call(this,{id:'G_CHCL',iconCls:'gen',title:C_CHCL,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_CHCL),iconCls:'add',scope:this,handler :this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CHCL),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CHCL),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GChclGrid, Ext.grid.EditorGridPanel);

Fos.GCharGrid = function() {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CHAR_X',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCharge',id:'id'},GCharge),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:100}});
    
    var marineFlag=new Ext.grid.CheckColumn({header:'海运',dataIndex:'marineFlag',width:70});
    var airFlag=new Ext.grid.CheckColumn({header:'空运',dataIndex:'airFlag',width:70});    
    var expressFlag=new Ext.grid.CheckColumn({header:'快递',dataIndex:'expressFlag',width:70});
    var customsFlag=new Ext.grid.CheckColumn({header:'关务',dataIndex:'customsFlag',width:70});
    var wmsFlag=new Ext.grid.CheckColumn({header:'仓储',dataIndex:'wmsFlag',width:70});
    var tmsFlag=new Ext.grid.CheckColumn({header:'陆运',dataIndex:'tmsFlag',width:70});
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:60});

    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CODE,dataIndex:'charCode',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CNAME,dataIndex:'charName',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ENAME,dataIndex:'charNameEn',width:80,editor:new Ext.form.TextField()},
	{header:C_CURR_DEFAULT,dataIndex: 'currCode',width:80,
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()})},		
	{header:C_ACCOUNT_AR_CNY,hidden:true,dataIndex:'chclCnyR',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ACCOUNT_AP_CNY,hidden:true,dataIndex:'chclCnyP',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ACCOUNT_AR_USD,hidden:true,dataIndex:'chclUsdR',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_ACCOUNT_AP_USD,hidden:true,dataIndex:'chclUsdP',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CHCL,dataIndex:'chclName',width:80,
		editor:new Ext.form.ComboBox({displayField:'chclName',valueField:'chclName',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCHCL_S(),
        listeners:{select:function(c,r,v){
        	sm.getSelected().set('chclId',r.get('id'));
        	sm.getSelected().set('chclCode',r.get('chclCode'));
        }}
	})},
	marineFlag,airFlag,expressFlag,customsFlag,wmsFlag,tmsFlag,
	{header:C_UNIT_DEFAULT,dataIndex:'unitName',width:60,
		editor:new Ext.form.ComboBox({displayField:'unitName',valueField:'unitName',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S(),
        listeners:{select:function(c,r,v){sm.getSelected().set('unitId',r.get('id'));}}
		})},
	ac],defaults:{sortable:false,width:100}});
	var ts=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['charCode',C_CODE],['charNameEn',C_ENAME],['charName',C_CNAME]]});
	var st = new Ext.form.ComboBox({width:80,store:ts,value:'charCode',displayField:'NAME',valueField:'CODE',typeAhead:true,mode:'local',forceSelection: true,triggerAction:'all',selectOnFocus:true});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var t=st.getValue();var k=kw.getValue();
		if(!t||!k){XMG.alert(SYS,M_NO_QUERY_P);return;};
     	var a=[];
     	a[0]={key:t,value:k,op:7};
     	store.baseParams={mt:'JSON',xml:HTUtil.QATJ(a)};
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
	Fos.GCharGrid.superclass.constructor.call(this,{id:'G_CHAR',iconCls:'gen',title:C_CHAR,header:false,
	plugins:[marineFlag,airFlag,expressFlag,customsFlag,wmsFlag,tmsFlag,ac],clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,bbar:PTB(store,100),
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_CHAR),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_CHAR),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_CHAR),iconCls:'save',scope:this,handler:this.save},'-',
        st,kw,{text:C_SEARCH,iconCls:'search',handler:this.search},
        '->',new Ext.PagingToolbar({pageSize:100,store:store})]
    });
};
Ext.extend(Fos.GCharGrid, Ext.grid.EditorGridPanel);

Fos.GCobaGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=COBA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompanyBankAccount',id:'id'},PCompanyBankAccount),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var ac=new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_ACCOUNT_NAME,dataIndex:'cobaName',editor:new Ext.form.TextField({allowBlank:false,emptyText:'dd',invalidText:''})},
	{header:C_BANK,dataIndex:'cobaBank',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_BANK_ACCOUNT,dataIndex:'cobaAccount',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CURR,dataIndex: 'currCode',
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()}),width:130},
	ac],defaults:{sortable:false,width:260}});
    
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
    id:'G_COBA',iconCls:'gen',title:C_COBA,header:false,
	plugins:ac,clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,disabled:NR(M1_GEN+G_COBA),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_COBA),iconCls:'remove',scope:this,handler:this.del},'-',
        {text:C_SAVE,disabled:NR(M1_GEN+G_COBA),iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.GCobaGrid, Ext.grid.EditorGridPanel);

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
	{header:C_EX_RATE,renderer:rateRender,dataIndex: 'exraRate',width: 150,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
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
	{header:C_EX_RATE,renderer:rateRender,dataIndex: 'exraRate',width: 150,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_EFFECT_DATE,dataIndex:"exraStartDate"},
	{header:C_EXPIRY_DATE,dataIndex:"exraEndDate"}],defaults:{sortable:false}});
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
    	{text:C_SEARCH,iconCls:'search',handler:this.search}]
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

Fos.InraGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=INRA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SInterestRate',id:'id'},SInterestRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{active:1}});
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
    {header:C_CURR,dataIndex:'inraCurrency'},
    {header:C_INRA_TYPE,dataIndex:"inraType",renderer:HTStore.getIRTY},
	{header:C_INTEREST_RATE,renderer:rateRender,dataIndex: 'inraRate',width: 150,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})}
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
    {header:C_LOAD_PROVINCE,dataIndex:'loadProvinceName',align:'center'},    
    {header:C_LOAD_CITY,dataIndex:'loadCityName',align:'center'},
    {header:C_DISCHARGE_PROVINCE,dataIndex:'dischargeProvinceName',align:'center'},    
    {header:C_DISCHARGE_CITY,dataIndex:'dischargeCityName',align:'center'},
    {header:TRANS_MILES,dataIndex:'miles',align:'center'},
    {header:TRANS_DURATION,dataIndex:'duration',align:'center'},
    {header:TRANS_PRICE1,dataIndex:'price1',align:'center'},
    {header:TRANS_PRICE2,dataIndex:'price2',align:'center'},
    {header:TRANS_PRICE3,dataIndex:'price3',align:'center'},
    {header:TRANS_PRICE4,dataIndex:'price4',align:'center'},
    {header:C_EFFECT_DATE,dataIndex:"startDate",renderer:formatDate,align:'center'},
	{header:C_EXPIRY_DATE,dataIndex:"endDate",renderer:formatDate,align:'center'}
	],defaults:{sortable:false,width:120}});
    
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
    {header:C_LOAD_PROVINCE,dataIndex:'loadProvinceName',align:'center'},    
    {header:C_LOAD_CITY,dataIndex:'loadCityName',align:'center'},
    {header:C_DISCHARGE_PROVINCE,dataIndex:'dischargeProvinceName',align:'center'},    
    {header:C_DISCHARGE_CITY,dataIndex:'dischargeCityName',align:'center'},
    {header:TRANS_MILES,dataIndex:'miles',align:'center'},
    {header:TRANS_DURATION,dataIndex:'duration',align:'center'},
    {header:TRANS_PRICE1,dataIndex:'price1',align:'center'},
    {header:TRANS_PRICE2,dataIndex:'price2',align:'center'},
    {header:TRANS_PRICE3,dataIndex:'price3',align:'center'},
    {header:TRANS_PRICE4,dataIndex:'price4',align:'center'},
    {header:C_EFFECT_DATE,dataIndex:"startDate",renderer:formatDate,align:'center'},
	{header:C_EXPIRY_DATE,dataIndex:"endDate",renderer:formatDate,align:'center'}
	],defaults:{sortable:false,width:120}});
	
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
    	{text:C_SEARCH,iconCls:'search',handler:this.search}],
    	bbar:PTB(store2,C_PS)
    });  
    
	Fos.TPriceTab.superclass.constructor.call(this, { 
		id:'TRANS_PRICE_LIST',title:TRANS_PRICE_MANAGEMENT,header:false,deferredRender:false,
		autoScroll:true,closable:true,border:false,modal:true,layout:'fit',
		items:[{xtype:'tabpanel',plain:false,activeTab:0,
            items:[
           {layout:'fit',title:TRANS_PRICE,items:grid},
           {layout:'fit',title:TRANS_PRICE_HISTORY,items:grid2}
           ]}
       ] });
};
Ext.extend(Fos.TPriceTab, Ext.FormPanel);

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
	
	var frm = new Ext.form.FormPanel({header:false,labelWidth:100,frame:false,border:false,
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
		width:300,height:520,//modal:false,
	  	items:[frm],
	  	buttons:[
	  	         {text:C_SAVE,iconCls:'save',scope:this,handler:this.save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.TPriceWin, Ext.Window);
