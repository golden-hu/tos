//System management
var getSystemPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});
	var items=[];
	//部门
	if(HR(M1_SYS+A_GROU+F_V))
		items[items.length]=FosMenu(panel,C_GROU,'T_GROU',function(){return new Fos.GroupTab();});
	//角色权限
	if(HR(M1_SYS+A_ROLE+F_V)) 
		items[items.length]=FosMenu(panel,C_FUNC_PERMISSION,'T_ROLE',function(){return new Fos.RoleTab();});
	//用户管理
	if(HR(M1_SYS+A_USER+F_V)) 
		items[items.length]=FosMenu(panel,C_USER_MGT,'T_USER',function(){return new Fos.UserTab();});
	//模版管理
	if(HR(M1_SYS+A_TEMP+F_V)) 
		items[items.length]=FosMenu(panel,C_TEMP_MGT,'G_TEMP',function(){return new Fos.TempTab();});
	//系统参数
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(panel,'系统参数','G_COCO',function(){return new Fos.CocoTab();});
	//任务分配
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(panel,C_TASK_CFG,'T_TATY',function(){return new Fos.TatyTab();});
	//操作日志
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(panel,C_ACT_LOG,'G_ACLO',function(){return new Fos.AcloGrid();});
	//消息订阅
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(panel,C_MSG_TOPIC_SUB,'T_METO',function(){return new Fos.MetoTab();});
		
	var menuPanel = new Ext.Panel({region:"west",width:"130",collapsible:true,layout:'fit',collapseMode:'mini',split:true,
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	return contPanel;
};
//部门
Fos.GroupTab = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'GROU_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PGroup',id:'id'},PGroup),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load();
	
	this.save = function(){
		this.stopEditing();
		HTUtil.POST(store,'PGroup',PGroup,'GROU_S');
	};
	this.add=function(){
		var p = new PGroup({uuid:HTUtil.UUID(32),grouName:'',grouDesc:'',active:'1',version:'0',rowAction:'N'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var active = new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',sortable:false,width:55});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_NAME,dataIndex:'grouName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:C_DESC,dataIndex:'grouDesc',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		active],defaults:{sortable:false,width:100}});
	
	Fos.GroupTab.superclass.constructor.call(this,{id:'T_GROU',title:C_GROU,closable:true,	
		plugins:[active],clicksToEdit:1,store:store,sm:sm,cm:cm,
		tbar:[{itemId:'TB_N',text:C_ADD,disabled:MR(M1_SYS+A_GROU+F_M),iconCls:'add',scope:this,handler:this.add}, '-', 		
			{itemId:'TB_R',text:C_REMOVE,disabled:MR(M1_SYS+A_GROU+F_M),iconCls:'remove',scope:this,handler:this.del},'-', 
			{itemId:'TB_S',text:C_SAVE,disabled:MR(M1_SYS+A_GROU+F_M),iconCls:'save',scope:this,handler:this.save}]
		});
};
Ext.extend(Fos.GroupTab, Ext.grid.EditorGridPanel);

Fos.RoleTab = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ROLE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PRole',id:'id'},PRole),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    HTStore.getFUNC_S().load();
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var active = new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',sortable:false,width:55});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_NAME,dataIndex:'roleName',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		{header:C_DESC,dataIndex:'roleDesc',editor:new Ext.form.TextField()},
		active],defaults:{sortable:false,width:100}});
	this.add=function(){
		var p = new PRole({uuid:HTUtil.UUID(32),active:'1',rowAction:'N',version:'0'});
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save = function(){	
    	this.stopEditing();
		HTUtil.POST(store,'PRole',PRole,'ROLE_S');
	};
	this.setPermission=function(){
		var b=sm.getSelected();
		if(b){
			if(b.get('rowAction')=='N')
				XMG.alert(SYS,M_SAVE_FIRST);
			else{
				var w=new Fos.RoleFuncWin(b);
				w.show();
			}
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};

	Fos.RoleTab.superclass.constructor.call(this,{id:'T_ROLE',title:C_ROLE_MGT,closable:true,
		plugins:active,clicksToEdit:1,store:store,sm:sm,cm:cm,
		tbar:[{itemId:'TB_N',text:C_ADD,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'add',scope:this,handler:this.add},'-',
		{itemId:'TB_R',text:C_REMOVE,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'remove',handler:this.del},'-',
		{itemId:'TB_S',text:C_SAVE,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'save',scope:this,handler:this.save},'-',
		{itemId:'TB_P',text:C_PERMISSION_SET,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'key',scope:this,handler:this.setPermission}]
	});
};
Ext.extend(Fos.RoleTab, Ext.grid.EditorGridPanel);

Fos.RoleFuncWin = function(role) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ROFU_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PRoleFunction',id:'id'},PRoleFunction),
		remoteSort:true,sortInfo:{field:'funcCode', direction:'ASC'}});
	
	var funcStore=HTStore.getFUNC_S();
	funcStore.load();
	
	var bChildCheck=false;
	this.reload = false;
	
	var nl = {scope:this,
			checkchange:function(n,c){
				if(!this.reload){
					var a = store.getRange();
					b=false;
					for(var i=0;i<a.length;i++){
						if(a[i].get('roleId')==role.get('id') && n.id == a[i].get('funcCode')){
							b=true;
							if(c){
								if(a[i].get('rowAction')=='R') a[i].set('rowAction','M');
								if(a[i].get('rowAction')=='D') a[i].set('rowAction','N');
							}
							else a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
							break;
						}
					}
					if(b==false && c){
						var rf = new PRoleFunction({roleId:role.get('id'),
							funcCode:n.id,uuid:HTUtil.UUID(32)});
						store.add(rf);rf.set('rowAction','N');
					}	
					if(c && n.childNodes.length>0){					
						if(!bChildCheck){
							n.expand(true);
							var cn = n.childNodes;
							for(var i=0;i<cn.length;i++){cn[i].getUI().toggleCheck(true);}
						}
					}
					if(c && n.parentNode && !n.parentNode.getUI().isChecked()){
						bChildCheck=true;n.parentNode.getUI().toggleCheck(true);bChildCheck=false;
					}
					if(!c && n.childNodes.length>0){
						var cn = n.childNodes;
						for(var i=0;i<cn.length;i++){cn[i].getUI().toggleCheck(false);}
					}
				}
				else{
					if(!c && n.childNodes.length>0){
						var cn = n.childNodes;
						for(var i=0;i<cn.length;i++){cn[i].getUI().toggleCheck(false);}
					}
				}
			}
		};
	
	var tree = new Ext.tree.TreePanel({
		animate:true,enableDD:false,autoScroll:true,containerScroll: true,height:475,
		selModel:new Ext.tree.MultiSelectionModel(),
		listeners:nl
	});
	
	fp = {};
	var maxDep = 0;
	var root;
	var a = funcStore.getRange();
	for(var i=0;i<a.length;i++){
		var fc=a[i].get('funcCode');
		var n = new Ext.tree.TreeNode({text:a[i].get('funcName'),id:fc,leaf:a[i].get('funcType')=='M'?false:true,
				checked:false,expanded:false});
		if(fc=='00') root=n;
		
		var dep = fc.length/2;
		maxDep=maxDep>dep?maxDep:dep;
		var na = fp[dep];
		if(na) na[na.length]=n;
		else{na=[];na[0]=n;fp[dep]=na;}
	}
	for(var i=1;i<maxDep;i++){
		var na = fp[i];
		var ca = fp[i+1];
		for(var j=0;j<na.length;j++){
			if(!na[j].isLeaf()) addChiledNode(na[j],ca);
		}
	}
	tree.setRootNode(root);	
	
	function addChiledNode(n,a){
		var nid = n.id;
		for(var i=0;i<a.length;i++){
			var cid=a[i].id;
			if(cid.substr(0,nid.length)==nid){
				n.appendChild(a[i]);
			}
		}
	};
	
	store.load({params:{_mt:'json',roleId:role.get('id')},callback:function(ra,o,s){
		if(s&&ra.length>0){
			for(var i=0;i<ra.length;i++){
				var n=tree.getNodeById(ra[i].get('funcCode'));				
				if(n){
					this.reload = true;
					if(n.hasChildNodes()) n.expand();
					n.getUI().toggleCheck(true);
					this.reload = false;
				}
			}
		}
	},scope:this});
	
	this.save = function(){
		HTUtil.POST(store,'PRoleFunction',PRoleFunction,'ROFU_S');
	};

	Fos.RoleFuncWin.superclass.constructor.call(this,{iconCls:'key',title:C_PERMISSION_SET+'-'+C_ROLE+'-'+role.get('roleName'),modal:true,width:600,
       height:500,layout:'fit',plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:tree,
       tbar:[
          {itemId:'TB_S',text:C_SAVE,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'save',scope:this,handler:this.save}]
       }); 
};
Ext.extend(Fos.RoleFuncWin, Ext.Window);
//用户管理
Fos.UserTab = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'USER_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PUser',id:'id'},PUser),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});	
    store.load();

	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	
	var active = new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});
	var sales = new Ext.grid.CheckColumn({header:C_SALES,dataIndex:'userSalesFlag',width:55});
	var operator = new Ext.grid.CheckColumn({header:C_OPERATOR,dataIndex:'userOperatorFlag',width:55});
	
	var va = new Ext.grid.CheckColumn({header:C_VIEW_ALL_CONS,dataIndex:'userAllViewFlag',width:100});
	var ea = new Ext.grid.CheckColumn({header:C_EDIT_ALL_CONS,dataIndex:'userAllEditFlag',width:100});
	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_FNAME,dataIndex:'userName',editor:new Ext.form.TextField()},
		{header:C_SYS_USER_NAME,dataIndex:'userLoginName',width:80,editor:new Ext.form.TextField()},
		{header:C_DEFAULT_GROU,dataIndex:'grouName',width:80,
			editor:new Ext.form.ComboBox({displayField:'grouName',valueField:'grouName',triggerAction: 'all',
            allowBlank:false,mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getGROU_S(),
            listeners:{select:function(c,r,v){
            	var user = sm.getSelected();
            	if(user)
					user.set('grouId',r.get('id'));
			}}})},
		{header:'所属办事处',dataIndex:'siteName',width:80,
			editor:new Ext.form.ComboBox({displayField:'name',valueField:'name',triggerAction: 'all',
				allowBlank:false,mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
				store:HTStore.getSITE_S(),
				listeners:{select:function(c,r,v){
				var user = sm.getSelected();
				if(user)
					user.set('siteId',r.get('id'));
			}}})},
        sales,operator,va,ea,
		{header:C_TEL,dataIndex:'userTel',editor:new Ext.form.TextField()},
		{header:C_MOBILE,dataIndex:'userMobile',editor:new Ext.form.TextField()},
		{header:C_EMAIL,dataIndex:'userEmail',editor:new Ext.form.TextField()},		
		{header:C_DEFAULT_ROLE,dataIndex:'roleName',width:80,
			editor:new Ext.form.ComboBox({displayField:'roleName',valueField:'roleName',triggerAction: 'all',
            allowBlank:false,mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getROLE_S(),
            listeners:{select:function(c,r,v){sm.getSelected().set('roleId',r.get('id'));}}})},
		{header:"Msn",dataIndex:'userMsn',editor:new Ext.form.TextField()},
		{header:"QQ",dataIndex:'userQq',editor:new Ext.form.TextField()},
		active],defaults:{sortable:false,width:100}});
	
	this.add=function(){
		var r = new PUser({uuid:HTUtil.UUID(32),userName:'',userLoginName:'',userPassword:'123456',userTel:'',userMobile:'',
		userEmail:'',userMsn:'',userQq:'',grouName:'',roleName:'',userSalesFlag:'0',
		userOperatorFlag:'0',active:'1',version:'0',rowAction:'N'});
		this.stopEditing();
    	store.insert(0,r);
    	this.startEditing(0,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	
	this.save = function(){
		this.stopEditing();
		HTUtil.POST(store,'PUser',PUser,'USER_S');
	};
	this.reset = function(){
		var b=sm.getSelected();
		if(b){
			Ext.Ajax.request({url:SERVICE_URL,method:'POST',
				params:{A:'USER_UA',id:b.get('id'),newPassword:'123456',newPassword2:'123456'},
				success: function(r){XMG.alert(SYS,C_RESET_PASS_INFO);},
				failure: function(r){XMG.alert(SYS,M_F);},scope:this});
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.showRole=function(){
		var p=sm.getSelected();
		if(p){
			var win = new Fos.UserRoleWin(p);
			win.show();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	
    Fos.UserTab.superclass.constructor.call(this,{id:'T_USER',title:C_USER_MGT,iconCls:'user',closable:true,    	
		clicksToEdit:1,border:false,store:store,sm:sm,cm:cm,
		plugins:[sales,operator,va,ea,active],
		tbar:[{itemId:'TB_N',text:C_ADD,disabled:MR(M1_SYS+A_USER+F_M),iconCls:'add',scope:this,handler:this.add}, '-', 		
		{itemId:'TB_R',text:C_REMOVE,disabled:MR(M1_SYS+A_USER+F_M),iconCls:'remove',handler:this.del},	'-', 		
		{itemId:'TB_S',text:C_SAVE,disabled:MR(M1_SYS+A_USER+F_M),iconCls:'save',scope:this,handler:this.save},'-', 	
		{itemId:'TB_P',text:C_RESET_PASS,disabled:MR(M1_SYS+A_USER+F_M),iconCls:'save',scope:this,handler:this.reset},'-',
		{itemId:'TB_E',text:C_USER_ROLE_LIST,disabled:MR(M1_SYS+A_USER+F_M),iconCls:'save',scope:this,handler:this.showRole}]
	});
};
Ext.extend(Fos.UserTab, Ext.grid.EditorGridPanel);

Fos.UserRoleWin = function(user) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'USRO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PUserRole',id:'id'},PUserRole),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});	
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,
		listeners:{scope:this,
			rowselect:function(sm,row,record){
				var a = store.getRange();
				b=false;
				for(var i=0;i<a.length;i++){
					if(record.get('id') == a[i].get('roleId')){
						b=true;
						if(a[i].get('rowAction')=='R')
							a[i].set('rowAction','M');
						break;
					}
				}
				if(b==false){
					var ur = new PUserRole({uuid:HTUtil.UUID(32),userId:user.get('id'),roleId:record.get('id')});
					store.add(ur);
					ur.set('rowAction','N');
				}
			},
			rowdeselect:function(sm,row,record){
				var a = store.getRange();
				for(var i=0;i<a.length;i++){				
					if(record.get('id') == a[i].get('roleId')){
						a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
						break;
					};
				};
			}
		}
	});	
    var grid = new  Ext.grid.GridPanel({border:false,store:HTStore.getROLE_S(),sm:sm,
    	cm:new Ext.grid.ColumnModel([sm,{header:C_ROLE_NAME,dataIndex:'roleName',width:100}])
    	});
    
    this.save = function(){
		grid.stopEditing();
		HTUtil.POST(store,'PUserRole',PUserRole,'USRO_S');
	};
	
	Fos.UserRoleWin.superclass.constructor.call(this,{iconCls:'key',title:C_USER_ROLE_LIST+'-'+user.get('userName'),
		modal:true,width:300,height:400,layout:'fit',plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',
       items:grid,
       listeners:{scope:this,
		show:function(){
			store.load({params:{userId:user.get('id')},callback:function(a,o,s){
				if(s&&a.length>0){
					var ra = grid.getStore().getRange();
					for(var i=0;i<a.length;i++){
						for(var j=0;j<ra.length;j++){
							if(ra[j].get('id') == a[i].get('roleId')){
								grid.getSelectionModel().selectRecords([ra[j]],true);
							}
						}
					}
				}
			},scope:this});
		}
		},
       tbar:[
          {itemId:'TB_S',text:C_SAVE,disabled:MR(M1_SYS+A_ROLE+F_M),iconCls:'save',scope:this,handler:this.save}]
       }); 
	
};
Ext.extend(Fos.UserRoleWin, Ext.Window);

Fos.TempTab = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TEMP_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PTemplate',id:'id'},PTemplate),
		remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});	
    store.load();
       
    var tetyStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TETY_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PTemplateType',id:'id'},PTemplateType),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});	
    tetyStore.load();
    
	var checkColumn = new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',sortable:false,width:55});
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_TEMP_NAME,dataIndex:'tempName',width:200,editor:new Ext.form.TextField()},
	{header:C_TEMP_DESC,dataIndex:'tempDesc',width:150,editor:new Ext.form.TextField()},
	{header:C_FILE_TYPE,dataIndex:'tempType',width:150,
		editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
    	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.TFTY_S})},
	{header:C_TEMP_TYPE,dataIndex:'tetyName',width:150,
    	editor:new Ext.form.ComboBox({displayField:'tetyName',valueField:'tetyName',triggerAction:'all',
        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:tetyStore,
        listeners:{scope:this,select:function(c,r,i){
           sm.getSelected().set('tetyCode',r.get('tetyCode'));
           sm.getSelected().set('tetyId',r.get('id'));}}})},
	checkColumn],defaults:{sortable:false,width:100}});
	this.add=function(){
		var p = new PTemplate({uuid:HTUtil.UUID(32),tempName:'',tempType:'xls',tempClass:'B',
			tempDesc:'',tetyName:'',active:1,version:'0',rowAction:'N'});            
    	this.stopEditing();
    	store.insert(0,p);
    	this.startEditing(0,1);
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save=function(){
		this.stopEditing();
		HTUtil.POST_CALLBACK(store,'PTemplate',PTemplate,'TEMP_S',function(){
			store.load();	
			});
	};
	this.upload = function(){
    	var b =sm.getSelected();
    	if(b){
			if(b.get('rowAction')!='N'){
	    		var win = new Fos.FileUploadWin(C_TEMP_UP,C_TEMP_FILE_P);
	    		win.addButton({text:C_UPLOAD,handler:function(){
					var f = Fos.FileUploadWin.superclass.findById.call(win,'F_UP');
					if(f.getForm().isValid()){
	                	f.getForm().submit({
	                    	url: SERVICE_URL,
	                    	params: {_mt:Ext.isIE?'json':'form',_uf:1,_A:'TEMP_U',tempId:b.get('id')},
	                    	waitMsg:'Uploading...',
	                    	success: function(f, o){
	                    		XMG.alert(SYS,C_UPLOAD_SUCCESS);
	                    		win.close();
	                    	}
	                	});
	            }}});
	            win.addButton({text:C_CANCEL,handler:function(){win.close();}},this);
	    		win.show();
	    	}    	
	    	else{XMG.alert(SYS,M_SAVE_FIRST);}
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
    this.download=function(){
    	var b =sm.getSelected();
    	if(b){
	    	var url = SERVICE_URL+'?_A='+'TEMP_D&tempId='+b.get('id');
	    	window.open(url,'download','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no,status=no');
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
    
    Fos.TempTab.superclass.constructor.call(this,{id:'G_TEMP',title:C_TEMP_MGT,iconCls:'gen',closable:true,    	
    	plugins:checkColumn,clicksToEdit:1,store:store,sm:sm,cm:cm,
    	tbar:[{itemId:'TB_N',text:C_ADD,disabled:NR(M1_SYS+A_TEMP+F_M),iconCls:'add',scope:this,handler:this.add},'-',
            {itemId:'TB_R',text:C_REMOVE,disabled:NR(M1_SYS+A_TEMP+F_M),iconCls:'remove',scope:this,handler:this.del},
            {itemId:'TB_S',text:C_SAVE,disabled:NR(M1_SYS+A_TEMP+F_M),iconCls:'save',scope:this,handler:this.save},
            {itemId:'TB_D',text:C_TEMP_DOWNLOAD,disabled:NR(M1_SYS+A_TEMP+F_M),iconCls:'down',scope:this,handler:this.download},
            {itemId:'TB_U',text:C_TEMP_UPLOAD,disabled:NR(M1_SYS+A_TEMP+F_M),iconCls:'up',scope:this,handler:this.upload}
            ]
        });
};
Ext.extend(Fos.TempTab, Ext.grid.EditorGridPanel);

Fos.CocoTab = function() {
	var store = new Ext.data.GroupingStore({url:SERVICE_URL,baseParams:{_A:'COCO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompanyConfig',id:'id'},PCompanyConfig),
		groupField:'cocoGroup',remoteSort:true,
		sortInfo:{field:'cocoGroup', direction:'ASC'}});	
	store.load();
	var cm=new Ext.grid.ColumnModel({columns:[
     	new Ext.grid.RowNumberer(),
     	{header:C_COCO_CODE,dataIndex:'cocoCode',width:200},
 		{header:C_COCO_NAME,dataIndex: 'cocoName',width:200},
 		{header:C_COCO_VALUE,dataIndex:'cocoValue',width:150,
 			editable:true,renderer:function(v,m,r){
 				if(r.get('cocoDesc')) 
 					return r.get('cocoDesc'); 
 				else return v;
 			}},
 		{header:C_COCO_GROU,dataIndex: 'cocoGroup',width:100}
 	],
 	editors: {
		'text': new Ext.grid.GridEditor(new Ext.form.TextField({})),
		'number': new Ext.grid.GridEditor(new Ext.form.NumberField({})),
		'date': new Ext.grid.GridEditor(new Ext.form.DateField({})),
		'bool':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
			store:new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['Y','Yes'],['N','No']]}),displayField:'NAME',valueField:'CODE'})),
		'color':new Ext.grid.GridEditor(new Ext.form.ColorField()),
		'port':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
			tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,store:HTStore.getPS(),displayField:'portNameEn',valueField:'id',
			listeners:{scope:this,select:function(c,r,i){
        	var b =sm.getSelected();
        	b.set('cocoDesc',r.get('portNameEn'));
        }}})),
		'char':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
			tpl:charTpl,itemSelector:'div.list-item',listWidth:C_LW,store:HTStore.getCHAR_S(),displayField:'charCode',valueField:'id',
			listeners:{scope:this,select:function(c,r,i){
        		var b =sm.getSelected();
        		b.set('cocoDesc',r.get('charName'));
        	}}})),
    	'grou':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
			store:HTStore.getGROU_S(),displayField:'grouName',valueField:'id',
			listeners:{scope:this,select:function(c,r,i){
        		var b =sm.getSelected();
        		b.set('cocoDesc',r.get('grouName'));
        	}}})),
    	'dateT':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
			store:new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['1','系统日期'],['2','开航日期'],['3','委托日期']]}),displayField:'NAME',valueField:'CODE',
			listeners:{scope:this,select:function(c,r,i){
        		var b =sm.getSelected();
        		b.set('cocoDesc',r.get('NAME'));
        	}}
    	})),
    	'fdoc':new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,
    		mode:'remote',triggerAction:'all',selectOnFocus:true,
			store:HTStore.getDOTY_S(),displayField:'dotyName',valueField:'id',
			listeners:{scope:this,select:function(c,r,i){
        		var b =sm.getSelected();
        		b.set('cocoDesc',r.get('dotyName'));
        	}}})),
        'cust':new Ext.grid.GridEditor(new Fos.CustomerLookup({typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'id',
			
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					var b =sm.getSelected();
					b.set('cocoValue','');
					b.set('cocoDesc','');				
				}},
			select:function(c,r,i){
				var b =sm.getSelected();
				b.set('cocoValue',r.get('id'));
				b.set('cocoDesc',r.get('custNameCn'));
				
				
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		}))
	},
	getCellEditor: function(colIndex, rowIndex) {
		var field = this.getDataIndex(colIndex);
		if (field == 'cocoValue') {
			var rec = store.getAt(rowIndex);
			if(rec.get('cocoValueType')==1) 
				return this.editors['number'];
			else if(rec.get('cocoValueType')==2) 
				return this.editors['bool'];
			else if(rec.get('cocoValueType')==3){
				var a=rec.get('cocoValueOptions').split('|');
				var b=[];
				for(var i=0;i<a.length;i++){
					b[i]=[a[i]];
				}
				var s = new Ext.data.SimpleStore({
			        fields: [{name:'CODE'}],
			        data:b
			    });
				return new Ext.grid.GridEditor(new Ext.form.ComboBox({typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
					store:s,displayField:'CODE',valueField:'CODE'}));
			}
			else if(rec.get('cocoValueType')==9) 
				return this.editors['color'];
			else if(rec.get('cocoValueType')==10) 
				return this.editors['port'];
			else if(rec.get('cocoValueType')==11) 
				return this.editors['char'];
			else if(rec.get('cocoValueType')==12) 
				return this.editors['grou'];
			else if(rec.get('cocoValueType')==13) 
				return this.editors['fdoc'];
			else if(rec.get('cocoValueType')==14) 
				return this.editors['dateT'];
			else if(rec.get('cocoValueType')==15) 
				return this.editors['cust'];
			else
				return this.editors['text'];
		}
		return Ext.grid.ColumnModel.prototype.getCellEditor.call(this, colIndex, rowIndex);
	},defaults:{sortable:false,width:100}});
    var sm=new Ext.grid.RowSelectionModel({singleSelect:true});  
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'PCompanyConfig',PCompanyConfig,'COCO_S');
	};
	Fos.CocoTab.superclass.constructor.call(this,{
    id:'G_COCO',iconCls:'gen',title:C_COCO,header:false,clicksToEdit:1,closable:true,
    store: store,sm:sm,cm:cm,view:new Ext.grid.GroupingView(groupViewCfg),
    tbar:[{itemId:'TB_S',text:C_SAVE,disabled:NR(M1_SYS+A_COCO+F_M),iconCls:'save',scope:this,handler:this.save}]}); 
};
Ext.extend(Fos.CocoTab, Ext.grid.EditorGridPanel);

Fos.MesuWin = function(T) {
	this.mesuSubscriberId='';
	this.mesuSubscriberName='';
	this.mesuSubscriberEmail='';
	
	this.mesuMailFlag=new Ext.form.Checkbox({fieldLabel:C_MSG_EMAIL,name:'mesuMailFlag',checked:true,anchor:'90%'});
	this.mesuImFlag=new Ext.form.Checkbox({fieldLabel:C_MSG_INNER,name:'mesuImFlag',checked:false,anchor:'90%'});
	var sub=[];
	var userComb=new Ext.form.ComboBox({fieldLabel:C_MESU_TYPE_I,
		store:HTStore.getUSER_S(),xtype:'combo',displayField:'userLoginName',valueField:'id',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				this.mesuSubscriberId=r.get('userId');
				this.mesuSubscriberName=r.get('userName');
				this.mesuSubscriberEmail=r.get('userEmail');
			}}});
	var custComb=new Ext.form.ComboBox({fieldLabel:C_CUSTOMER,store:HTStore.getCS(),
		xtype:'combo',displayField:'custCode',valueField:'id',typeAhead:true,enableKeyEvents:true,
		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		triggerAction:'all',selectOnFocus:true,anchor:'95%',
      	listeners:{scope:this,select:function(c,r,i){
			this.mesuSubscriberId=r.get('custId');
			this.mesuSubscriberName=r.get('custNameCn');
			this.mesuSubscriberEmail=r.get('custEmail');
		},				
		keydown:{fn:function(f,e){LC(f,e,'');},buffer:BF}}});
	var roleComb=new Ext.form.ComboBox({fieldLabel:C_MESU_TYPE_S,
		store:ROLE_T_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,select:function(c,r,i){
			this.mesuSubscriberId=r.get('CODE');
			this.mesuSubscriberName=r.get('NAME');
		}}});
	if(T==1) 
		sub=[userComb,this.mesuMailFlag,this.mesuImFlag];
	else if(T==2) 
		sub=[custComb,this.mesuMailFlag,this.mesuImFlag];
	else 
		sub=[roleComb,this.mesuMailFlag,this.mesuImFlag];
	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',items:sub});
	Fos.MesuWin.superclass.constructor.call(this, {title:C_MESU_ADD,modal:true,width:300,
        height:150,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm});
};
Ext.extend(Fos.MesuWin,Ext.Window);
//消息订阅
Fos.MetoTab = function(p){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'METO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PMessageTopic',id:'id'},PMessageTopic),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
    store.load();
    
	this.save = function(){
		var p =sm.getSelected();
		if(p){
			var t=Ext.getCmp('MSG_TEMP');
			p.set('metoTemplate',t.getValue());
		}
		HTUtil.POST(store,'PMessageTopic',PMessageTopic,'METO_S');
	};
	this.showSubscriber = function(){
		var p =sm.getSelected();
		if(p){
			var win = new Fos.SubscriberWin(p);
			win.show();
		}
	};
	var re = {scope:this,
		rowselect:function(sm,row,r){
			var t=Ext.getCmp('MSG_TEMP');
			t.setValue(r.get('metoTemplate'));
		},
		rowdeselect:function(sm,row,r){
			var t=Ext.getCmp('MSG_TEMP');
			r.set('metoTemplate',t.getValue());
		}
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,listeners:re});
	var active =ACTIVE();
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_NAME,dataIndex:'metoName',width:150},
		{header:C_DESC,dataIndex:'metoDesc',width:180},
		active],defaults:{sortable:false,width:150}});
	var grid = new Ext.grid.EditorGridPanel({plugins:[active],clicksToEdit:1,border:true,store:store,sm:sm,cm:cm});	    
	
	Fos.MetoTab.superclass.constructor.call(this,{id:'T_METO',title:C_MSG_TOPIC,iconCls:'gen',
		header:false,deferredRender:false,autoScroll:true,labelAlign:'right',
		closable:true,labelWidth:80,border:false,width:800,layout:'border',
		items: [
		    {title:C_MSG_TOPIC_LIST,region:'center',width:400,minSize:200,maxSize:600,layout:'fit',items:[grid]},
		    {title:C_MSG_TEMP,region:'east',split:true,width:400,minSize:200,maxSize:600,layout:'fit',
	    	items:[{id:'MSG_TEMP',xtype:'htmleditor',anchor:'95%'}]}
		],
	tbar:[{text:C_SAVE,disabled:false,iconCls:'save',scope:this,handler:this.save},
	      {text:C_SUBSCRIBER_LIST,disabled:false,iconCls:'compile',scope:this,handler:this.showSubscriber}]});
};
Ext.extend(Fos.MetoTab, Ext.Panel);

Fos.SubscriberWin = function(topic) {	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'MESU_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PMessageSubscribe',id:'id'},PMessageSubscribe),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
    store.load();
    
    var mail=CHKCLM(C_MSG_EMAIL,'mesuMailFlag',100);
	var im=CHKCLM(C_MSG_INNER,'mesuImFlag',100);
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_MESU_TYPE,dataIndex:'mesuSubscriberType',renderer:getMESU_T},
		{header:C_MESU_NAME,dataIndex:'mesuSubscriberName'},
		{header:C_MESU_EMAIL,dataIndex:'mesuSubscriberEmail',editor:new Ext.form.TextField()},
		mail,im],defaults:{sortable:false,width:80}});
	var grid = new Ext.grid.EditorGridPanel({plugins:[mail,im],
		clicksToEdit:1,border:true,store:store,sm:sm,cm:cm});
	var showSub=function(t){				
		var w = new Fos.MesuWin(t);
		w.addButton({text:C_OK,handler:function(){
			mesuSubscriberId = w.mesuSubscriberId;
			mesuSubscriberName = w.mesuSubscriberName;
			mesuSubscriberEmail = w.mesuSubscriberEmail;
			mesuMailFlag=w.mesuMailFlag.getValue()?1:0;
			mesuImFlag=w.mesuImFlag.getValue()?1:0;
			var p = new PMessageSubscribe({uuid:HTUtil.UUID(32),metoId:topic.get('id'),
				mesuSubscriberType:t,mesuSubscriberName:mesuSubscriberName,
				mesuSubscriberId:mesuSubscriberId,mesuSubscriberEmail:mesuSubscriberEmail,
				mesuMailFlag:mesuMailFlag,mesuImFlag:mesuImFlag,mesuSmFlag:0});
			store.add(p);
			p.set('rowAction','N');
			w.close();
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);
		w.show();
	};
    
    this.save = function(){
		grid.stopEditing();
		HTUtil.POST(store,'PMessageSubscribe',PMessageSubscribe,'MESU_S');
	};
	this.del=function(){HTUtil.REMOVE_SM(sm,store);};
	
	Fos.SubscriberWin.superclass.constructor.call(this,{iconCls:'key',title:C_SUBSCRIBER_LIST,
		modal:true,width:500,height:400,layout:'fit',plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',
       items:grid,       
       tbar:[
          {text:C_ADD,iconCls:'add',scope:this,menu: {items: [
          	{text:C_MESU_TYPE_I,iconCls:'user',disabled:false,scope:this,handler:function(){showSub(1);}},
          	{text:C_MESU_TYPE_E,iconCls:'user',disabled:false,scope:this,handler:function(){showSub(2);}},
          	{text:C_MESU_TYPE_S,iconCls:'user',disabled:false,scope:this,handler:function(){showSub(3);}}]
          }},'-',
          {text:C_REMOVE,disabled:false,iconCls:'remove',scope:this,handler:this.del},'-',
          {itemId:'TB_S',text:C_SAVE,disabled:NR(M1_SYS+A_ROLE+F_M),iconCls:'save',scope:this,handler:this.save}]
      });
};
Ext.extend(Fos.SubscriberWin, Ext.Window);



Fos.TaskWin = function(p) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TASK_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FTask',id:'id'},FTask),
		remoteSort:true,sortInfo:{field:'tatyOrder', direction:'ASC'}});	
	
	store.load({params:{consId:p.get('id')},scope:this});
	
	var saveT=function(r){
		var x=HTUtil.RTX(r,'FTask',FTask);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TASK_S'},
			success: function(res){
				var e = HTUtil.XTR(res.responseXML,'FTask',FTask);
				var fields = FTask.prototype.fields;
				for(var k = 0;k < fields.length;k++){
					var f = fields.items[k];
					var fn=f.name;
					r.set(fn,e.get(fn));
				}},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(x)
		});
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var c1={header:C_TASK_NAME,width:200,dataIndex:"tatyName"};
	var c2={header:C_TASK_ESTIMATED_DATE,dataIndex: 'taskEstimatedDate',width:120,renderer:formatDate};
	var c3={header:C_TASK_FINISHED_DATE,dataIndex: 'taskFinishedDate',width:120,
			renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})};
	var ff=CHKCLM(C_FINISHED,'taskFinishedFlag',60);
	ff.on('click',function(c,e,r){
		r.set('taskFinishedDate',r.get('taskFinishedFlag')==1?(new Date()):'');
		saveT(r);
	},this);
	var cm=new Ext.grid.ColumnModel({columns:[sm,c1,c2,ff,c3],defaults:{sortable:false,width:100}});
	
	this.saveTask=function(e){saveT(e.record);};
	var gv=new Ext.grid.GridView({
		getRowClass: function(record, index) {			   
            if (record.get('taskFinishedFlag')) return 'green-font-row';
            else if (record.get('taskFinishedFlag')==0&&getElapsed(record.get('taskEstimatedDate'))>=0) return 'red-font-row';
            else return '';
        }});
	var grid=new Ext.grid.EditorGridPanel({id:'G_TASK',	border:true,height:400,autoScroll:true,clicksToEdit:1,plugins:[ff],
	    stripeRows:true,store:store,sm:sm,cm:cm, view:gv,
	    listeners:{scope:this,afteredit:this.saveTask}
		});	
	Fos.TaskWin.superclass.constructor.call(this,{iconCls:'task',title:C_TASK_LIST+'-'+p.get('consMasterNo'),modal:true,width:600,
       height:400,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:grid}); 
};
Ext.extend(Fos.TaskWin, Ext.Window);

Fos.TatyGrid = function(title,bizType,bizClass,shipType) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TATY_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PTaskType',id:'id'},PTaskType),
		remoteSort:true,sortInfo:{field:'id', direction:'asc'}});	
	var ss=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TATY_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PTaskType',id:'id'},PTaskType),
		remoteSort:true,sortInfo:{field:'id', direction:'asc'}});
	
	var params = {consBizType:bizType,consBizClass:bizClass,consShipType:shipType};
	if(shipType=='')
		params = {consBizType:bizType,consBizClass:bizClass};
	store.load({params:params,
		callback:function(re,o,s){		
		var sa=store.getRange();
		var ra=[];
		for(var i=0;i<sa.length;i++){
			var rr=new PTaskType({});
			rr.set('tatyId',sa[i].get('tatyId'));
			rr.set('tatyName',sa[i].get('tatyName'));
			ra[i]=rr;			
		}
		ss.add(ra);
		var r=new PTaskType({tatyId:'',tatyName:'  '});
		ss.insert(0,r);
	}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var c1={header:C_TASK_NAME,width:150,dataIndex:"tatyName",editor:new Ext.form.TextField()};
	var c2={header:C_TASK_DATE_TYPE,dataIndex: 'tatyDateType',renderer:HTStore.getDATY,
			editor:new Ext.form.ComboBox({xtype:'combo',
				store:HTStore.DATY_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
				mode:'local',triggerAction:'all',selectOnFocus:true})};
	var c3={header:C_TASK_DATE_ESTIMATED,dataIndex:"tatyDateEstimated",align:'right',editor:new Ext.form.NumberField()};
	var c4={header:C_TASK_D,dataIndex: 'tatyDName',editor:new Ext.form.ComboBox({xtype:'combo',store:ss,
		displayField:'tatyName',valueField:'tatyName',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,select:function(c,r,i){
	            	var b=sm.getSelected();
	            	if(b){b.set('tatyDId',r.get('tatyId'));}}}
				})};
	
	var cm=new Ext.grid.ColumnModel({columns:[sm,c1,c2,c3,c4],defaults:{sortable:false,width:100}});
	this.add=function(){
		var e = new PTaskType({uuid:HTUtil.UUID(32),
    		consBizType:bizType,consBizClass:bizClass,consShipType:shipType,active:'1',version:'0'});
    	this.stopEditing();
    	store.add(e);
    	e.set('rowAction','N');
	};
	this.del=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'PTaskType',PTaskType,'TATY_S');
	};	
	Fos.TatyGrid.superclass.constructor.call(this, {id:'G_TATY_'+bizType+bizClass+shipType,title:title,iconCls:'class',
		border:true,autoScroll:true,clicksToEdit:1,
	    stripeRows:true,store:store,sm:sm,cm:cm,
	    tbar:[{text:C_ADD,iconCls:'add',disabled:false,scope:this,handler:this.add}, '-', 
			{text:C_REMOVE,iconCls:'remove',disabled:false,scope:this,handler:this.del},'-',
			{text:C_SAVE,iconCls:'save',disabled:false,scope:this,handler:this.save},'-'
			]
	});
};
Ext.extend(Fos.TatyGrid, Ext.grid.EditorGridPanel);

Fos.TatyTab = function(){	
	var gCE=new Fos.TatyGrid(C_EXP_F,BT_M,BC_E,ST_F);
	var gCI=new Fos.TatyGrid(C_IMP_F,BT_M,BC_I,ST_F);
	var gLCE=new Fos.TatyGrid(C_EXP_L,BT_M,BC_E,ST_L);
	var gLCI=new Fos.TatyGrid(C_IMP_L,BT_M,BC_I,ST_L);
	var gBE=new Fos.TatyGrid(C_EXP_BULK,BT_M,BC_E,ST_B);
	var gBI=new Fos.TatyGrid(C_IMP_BULK,BT_M,BC_I,ST_B);
	var gAE=new Fos.TatyGrid(C_EXP_AIR,BT_A,BC_E,'');
	var gAI=new Fos.TatyGrid(C_IMP_AIR,BT_A,BC_I,'');
	
	Fos.TatyTab.superclass.constructor.call(this,{id:'T_TATY',
	title:C_TASK_CFG,iconCls:'class',deferredRender:false,closable:true,activeTab:0,autoScroll:true,
	items:[gCE,gCI,gLCE,gLCI,gBE,gBI,gAE,gAI],
	listeners:{scope:this,tabchange:function(m,a){a.doLayout();}}
	});
};
Ext.extend(Fos.TatyTab,Ext.TabPanel);

Fos.TaskList = function(cn,store) {	
	var c1={header:C_TASK_NAME,width:200,dataIndex:"tatyName"};
	var c2={header:C_TASK_DATE_TYPE,dataIndex: 'taskEstimatedDate',width:120,renderer:formatDate};
	var c3={header:C_TASK_FINISHED_DATE,dataIndex: 'taskFinishedDate',width:120,renderer:formatDate};
	var ff=CHKCLM(C_FINISHED,'taskFinishedFlag',60);	
	var list = new Ext.ListView({
    	store: store,
    	emptyText: 'No images to display',
    	reserveScrollOffset: true,
    	columns: [c1,c2,c3,ff]
	});
	Fos.TaskList.superclass.constructor.call(this,{iconCls:'task',title:cn,width:425,
    	height:250,collapsible:true,layout:'fit',items: listView});
};
Ext.extend(Fos.TaskList, Ext.Panel);

Fos.TaskTab = function(bc,bt) {	
	this.page=1;
	this.totalPage=1;
	
	this.moveFirst=function(){
		this.page=1;
		this.reLoad();
	};
	this.moveNext=function(){
		this.page=this.page+1;
		this.reLoad();
	};
	this.movePrev=function(){
		this.page=this.page-1;
		this.reLoad();
	};
	this.moveLast=function(){
		this.page=this.totalPage;
		this.reLoad();
	};
	
	this.reLoad=function(){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{A:'CONS_T_X',consMasterFlag:1,mt:'XML',dir:'DESC',consBizClass:bc,consBizType:bt,voyaSailedFlag:0,
				start:((this.page-1)*10),limit:10,sort:'consNo'},
				success: function(res){				
					this.totalPage=Math.ceil(XRC(res.responseXML)/10);					
					var a = XTRA(res.responseXML,'FConsign',FConsign);
					var ta = XTRA(res.responseXML,'FTask',FTask);
					for(var i=0;i<ta.length;i++){
						var cid=ta[i].get('consId');
						for(var j=0;j<a.length;j++){
							if(cid==a[j].get('consId')){
								var d;
								var ed=ta[i].get('taskEstimatedDate');
								ed=ed?ed.format('Y-m-d'):'';							
								var fd=ta[i].get('taskFinishedDate');
								fd=fd?fd.format('Y-m-d'):'';
								var ff=ta[i].get('taskFinishedFlag');
								if(ff==1){
									d=ta[i].get('taskFinishedDate');
									d=d?d.format('Y-m-d'):'';
									d=GL(d);
								}
								else{
									d=ta[i].get('taskEstimatedDate');
									d=d?d.format('Y-m-d'):'';
									if(getElapsed(ta[i].get('taskEstimatedDate'))>=0)
										d=HL(d);
								}
								a[j].set('TATY_'+ta[i].get('tatyId'),d);
								break;
							}
						}
					}
					store.removeAll();
					store.add(a);
					tb=this.getBottomToolbar();
					if(tb.getComponent('TB_F')) tb.getComponent('TB_F').setDisabled(this.page==1);
					if(tb.getComponent('TB_P')) tb.getComponent('TB_P').setDisabled(this.page==1);
					if(tb.getComponent('TB_N')) tb.getComponent('TB_N').setDisabled(this.page==this.totalPage);
					if(tb.getComponent('TB_L')) tb.getComponent('TB_L').setDisabled(this.page==this.totalPage);
					tb.getComponent('TB_M').setText('Page '+this.page+' of '+this.totalPage);
				},
				failure: function(res){XMG.alert(SYS,M_F+res.responseText);}
		});
	};
	
	var ts=getTATY_S();
	var store = new Ext.data.GroupingStore({
   		reader:new Ext.data.ArrayReader({idIndex: 0},FConsign),
   		sortInfo:{field:'consNo', direction:'DESC'},
   		groupField:'voyaName'});
	var ca=ts.getRange();
	var cols=[];
	cols[0]={header:C_VESS,width:100,dataIndex:"vessName"};
    cols[1]={header:C_VOYA,width:80,dataIndex:"voyaName"};
    cols[2]={header:C_CONS_NO,width:120,dataIndex:"consNo"};
    cols[3]={header:C_BOOKER,width:200,dataIndex:"custName"};
    for(var i=0;i<ca.length;i++){
    	cols[cols.length]={header:ca[i].get('tatyName'),width:100,dataIndex:'TATY_'+ca[i].get('tatyId')};
    }
    var cm=new Ext.grid.ColumnModel(cols);
    var sm=new Ext.grid.RowSelectionModel({singleSelect:true});
	Fos.TaskTab.superclass.constructor.call(this, {
    id:'TASK_B',iconCls:'task',store: store,title:C_TASK_LIST,
	sm:sm,cm:cm,stripeRows:true,closable:true,border:true,autoScroll:true,
	view:new Ext.grid.GroupingView(groupViewCfg),
	bbar:[{itemId:'TB_F',disabled:this.page==1,iconCls:'page-first',scope:this,handler:this.moveFirst},'-',
        {itemId:'TB_P',disabled:this.page==1,iconCls:'page-prev',scope:this,handler:this.movePrev},'-',
        {itemId:'TB_M',text:'Page '+this.page+' of '+this.totalPage},'-',
        {itemId:'TB_N',disabled:this.page==this.totalPage,iconCls:'page-next',scope:this,handler:this.moveNext},'-',
        {itemId:'TB_L',disabled:this.page==this.totalPage,iconCls:'page-last',scope:this,handler:this.moveLast},'-']
    });
	this.reLoad();
	
};
Ext.extend(Fos.TaskTab, Ext.grid.GridPanel);

Fos.PassWin = function() {    
	var frmPass = new Ext.form.FormPanel({labelWidth:80,frame:true,
    	items: [{fieldLabel:C_OLD_PASS,name:'oldPassword',xtype:'textfield',inputType:'password',anchor:'95%'},
    	{fieldLabel:C_NEW_PASS,name:'newPassword',xtype:'textfield',inputType:'password',anchor:'95%'},
    	{fieldLabel:C_CONFIRM_NEW_PASS,name:'newPassword2',xtype:'textfield',inputType:'password',anchor:'95%'}
    	]
    });
    this.save=function(){
		var op=frmPass.find('name','oldPassword')[0].getValue();
		var np=frmPass.find('name','newPassword')[0].getValue();
		var np2=frmPass.find('name','newPassword2')[0].getValue();
		if(op==''){XMG.alert(SYS,M_OLD_PASS_REQUIRED);frmPass.find('name','oldPassword')[0].focus();return;};
		if(np==''){XMG.alert(SYS,M_NEW_PASS_REQUIRED);frmPass.find('name','newPassword')[0].focus();return;};
		if(np2==''){XMG.alert(SYS,M_CONFIRM_NEW_PASS_REQUIRED);frmPass.find('name','newPassword2')[0].focus();return;};
		if(np!=np2){XMG.alert(SYS,M_NEW_PASS_NOT_EQ);frmPass.find('name','newPassword')[0].focus();return;};
		if(np==op){XMG.alert(SYS,M_NEW_PASS_EQ_OLD);frmPass.find('name','newPassword')[0].focus();return;};
		
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'USER_U',oldPassword:op,newPassword:np,newPassword2:np2},
			success: function(r){XMG.alert(SYS,M_CHANGE_PASS_SUCCESSED);this.close();},
			failure: function(r){XMG.alert(SYS,M_F);},scope:this
		});
    };
    
    Fos.PassWin.superclass.constructor.call(this, {title:M_CHANGE_PASS,modal:true,width:300,
        Height:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:[frmPass],        
        buttons:[{text:C_OK,scope:this,handler:this.save},
        	{text:C_CANCEL,scope:this,handler:this.close}]
        }); 
};
Ext.extend(Fos.PassWin,Ext.Window);
//操作日志
Fos.AcloGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ACLO_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PActionLog',id:'id'},PActionLog),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	store.load({params:{start:0,limit:25}});
	var c1={header:C_ACT_USER,dataIndex:"acloUserName"};
	var c2={header:C_ACT_TIME,dataIndex:"createTime",width:150};
	var c3={header:C_ACT_NAME,dataIndex:"acloActRemark"};
	var c4={header:C_ACT_TABLE,dataIndex:"acloTable",renderer:HTStore.getACLO};	
	var c5={header:C_ACT_TNO,width:100,dataIndex:"acloTno"};
	var c6={header:C_ACT_IP,width:100,dataIndex:"acloIp"};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,c1,c2,c3,c4,c5,c6],defaults:{sortable:false,width:100}});
	cm.defaultSortable = true;
	cm.defaultWidth=100;
	this.search = function(){var w=new Fos.AcloLW(store);w.show();};	
	Fos.AcloGrid.superclass.constructor.call(this, {id:'G_ACLO',title:C_ACT_LOG,
		border:true,autoScroll:true,stripeRows:true,store:store,sm:sm,cm:cm,loadMask:true,closable:true,
	    bbar:PTB(store,C_PS100),tbar:[{itemId:'TB_F',text:C_SEARCH,iconCls:'search',handler:this.search},
	    	'->',new Ext.PagingToolbar({pageSize:C_PS100,store:store})]});
};
Ext.extend(Fos.AcloGrid, Ext.grid.GridPanel);
Fos.AcloLW = function(store) {
	this.reload=function(){
		var a=[];
		var acloUserId=this.find('name','acloUserId')[0].getValue();
		if(acloUserId) a[a.length]={key:'acloUserId',value:acloUserId,op:EQ};
		var acloTno=this.find('name','acloTno')[0].getValue();
		if(acloTno) a[a.length]={key:'acloTno',value:acloTno,op:EQ};
		var createTime=this.find('name','createTime')[0].getValue();
		var createTime2=this.find('name','createTime2')[0].getValue();
		if(createTime && createTime2){
     		a[a.length]={key:'createTime',value:createTime.format('Y-m-d H:i:s'),op:GE};
     		a[a.length]={key:'createTime',value:createTime2.format('Y-m-d H:i:s'),op:LE};
     	}
     	else if(createTime) a[a.length]={key:'createTime',value:createTime,op:EQ};
		store.baseParams=a.length>0?{_A:'AXLO_X',_mt:'json',xml:HTUtil.QATJ(a)}:{_A:'AXLO_X',_mt:'json'};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};
	var frm = new Ext.form.FormPanel({labelWidth:100,bodyStyle:'padding:5px',
    	items: [{fieldLabel:C_ACT_USER,name:'acloUserId',store:HTStore.getUSER_S(),
    		xtype:'combo',displayField:'userLoginName',valueField:'userId',
			typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
			{fieldLabel:C_ACT_TNO,name:'acloTno',xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_ACT_TIME_F,name:'createTime',xtype:'datefield',format:'Y-m-d H:i:s',anchor:'95%'},
			{fieldLabel:C_ACT_TIME_T,name:'createTime2',xtype:'datefield',format:'Y-m-d H:i:s',anchor:'95%'}
        ]});
    	        
	Fos.AcloLW.superclass.constructor.call(this, {title:C_LOOK_CUST,iconCls:'search',modal:true,width:400,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',labelWidth:80,items:frm,
        buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
        }); 
};
Ext.extend(Fos.AcloLW, Ext.Window);

Fos.AttachWin = function(consBizType,consId,consNo) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ATTACH_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CAttach',id:'id'},CAttach),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
    store.load({params:{consBizType:consBizType,consId:consId}});
    
    this.upload = function(){    	
		var win = new Fos.FileUploadWin(C_ATTACH_UPLOAD,C_ATTACH_FILE_P);
		win.addButton({text:C_UPLOAD,scope:this,handler:function(){
			var f = Fos.FileUploadWin.superclass.findById.call(win,'F_UP');
			if(f.getForm().isValid()){
            	f.getForm().submit({
                	url: SERVICE_URL,
                	params: {_mt:Ext.isIE?'json':'form',_uf:1,_A:'ATTACH_U',consId:consId,consNo:consNo,consBizType:consBizType},
                	waitMsg:'Uploading...',
                	scope:this,
                	success: function(f, o){
                		Ext.Msg.alert(SYS,C_UPLOAD_SUCCESS);
                		win.close();
                		store.load({params:{consBizType:consBizType,consId:consId,consNo:consNo}});
                	}
            	});
        }}});
        win.addButton({text:C_CANCEL,handler:function(){win.close();}},this);
		win.show();	    	
    };
   this.download=function(){
    	var b =sm.getSelected();
    	if(b){
	    	var url = SERVICE_URL+'?_A='+'ATTACH_D&attachId='+b.get('id');
	    	window.open(url,'download', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
    	}
    	else 
    		Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
    };
    this.removeAttach=function(){
    	var a =sm.getSelected();
    	if(a){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var xml = HTUtil.SMTX4R(sm,'CAttach','id');	    		
	    		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	    			params:{_A:'ATTACH_R',attachId:a.get('id')},
	    		success: function(r){
	    			store.remove(a);
	    			Ext.Msg.alert(SYS,M_S);
	    		},
	    		failure: function(r){
	    			Ext.Msg.alert(SYS,M_F+r.responseText);
	    		},
	    		xmlData:HTUtil.HTX(xml)});
            }},this);
		}
    };
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_FILE_NAME,dataIndex:'attachFileName',width:200},
	{header:C_MODIFY_TIME,width:100,renderer:formatDate,dataIndex:"modifyTime"}
	],defaults:{sortable:false,width:100}});
       
	this.gird = new Ext.grid.GridPanel({store:store,sm:sm,cm:cm,region:'center',
		tbar:[
		      {itemId:'TB_U',text:C_ATTACH_UPLOAD,iconCls:'up',scope:this,handler:this.upload},'-',
		      {itemId:'TB_D',text:C_ATTACH_DOWNLOAD,iconCls:'down',scope:this,handler:this.download},'-',
	          {itemId:'TB_R',text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeAttach}
	        ]
	    });
	Fos.AttachWin.superclass.constructor.call(this, {title:consNo+'-'+C_ATTACH,modal:true,width:800,
		frame:true,height:400,layout:'fit',plain:true,items:this.gird});
};
Ext.extend(Fos.AttachWin,Ext.Window);

//短信通知
Fos.SMSWin = function(mobile,content,consId,consNo,bizType){
	this.save = function(){
		if(Ext.isEmpty(frm.mobile.getValue())){
			Ext.Msg.alert(SYS,'填写手机号码',function(){frm.mobile.focus();},this);return;};
		if(Ext.isEmpty(frm.content.getValue())){
			Ext.Msg.alert(SYS,'填写通知内容',function(){frm.content.focus();},this);return;};
		var mobile=frm.mobile.getValue();
		var content=frm.content.getValue();
		HTUtil.POST_SMS('SMS_S',smsUrl,smsUser,smsPassword,smsKey,mobile,content,consId,consNo,bizType);
		this.close();
	};
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:false,padding:10,items:[
			{fieldLabel:'手机号码',tabIndex:1,ref:'mobile',itemCls:'required',
		    	 name:'mobile',value:mobile,xtype:'textfield',anchor:'95%'
			},
			{fieldLabel:'通知内容',tabIndex:2,ref:'content',itemCls:'required',height:150,
				name:'content',value:content,xtype:'textarea',anchor:'95%'
			}
	    ]});
	Fos.SMSWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:'短信通知',width:500,height:270,modal:true,
	  	items:[frm],
	  	buttons:[{text:'发送',iconCls:'ok',scope:this,handler:this.save},
	  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.SMSWin, Ext.Window);

