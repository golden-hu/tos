//import
Fos.CargoGrid = function(p) {	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CARG_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FCargo',id:'id'},FCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{consId:p.get('id')}});	
	var quitFlag=new Ext.grid.CheckColumn({header:C_CARG_QUIT,dataIndex:'cargQuitFlag',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var c1={header:C_MARKS,dataIndex:'cargMarks',editor:new Ext.form.TextField({})};
	var c2={header:C_CARGO_NAME_EN,dataIndex:'cargNameEn',editor:new Ext.form.TextField({allowBlank:false})};
	var c3={header:C_CARGO_NAME_CN,dataIndex:'cargNameCn',editor:new Ext.form.TextField({})};
	var c4={header:C_PACKAGES,dataIndex:'cargPackageNum',editor:new Ext.form.NumberField({allowBlank:false})};
	var c5={header:C_PACK,dataIndex:'packName',
			editor:new Ext.form.ComboBox({store:HTStore.getPACK_S(),
    	displayField:'packName',valueField:'packName',typeAhead: true,mode: 'local',
    	triggerAction: 'all',selectOnFocus:true})};
	var c6={header:C_GROSS_WEIGHT+(p.get('consShipType')==ST_B?C_MT:C_KGS),dataIndex:'cargGrossWeight',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})};
	var c7={header:C_NET_WEIGHT+(p.get('consShipType')==ST_B?C_MT:C_KGS),dataIndex:'cargNetWeight',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,invalidText:''})};
	var c8={header:C_UNIT,dataIndex:'unitName',
			editor:new Ext.form.ComboBox({displayField:'unitName',valueField:'unitName',triggerAction:'all',
		        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S()})};
	var c9={header:C_CBM,dataIndex:'cargMeasurement',renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})};
	var c10={header:C_MANU_NO,dataIndex:'cargManuNo',editor:new Ext.form.TextField()};
	var c11={header:C_SPEC,dataIndex:'cargSpec',editor:new Ext.form.TextField()};
	var c12={header:C_HS_CODE,dataIndex:'cargNo',editor:new Ext.form.TextField()};
	var cm=new Ext.grid.ColumnModel({columns:[sm,quitFlag,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12],defaults:{sortable:true,width:80}});
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_CONS;	
	/*this.addMBl = function(){
	    var b = sm.getSelected();
		if(b){
			createWindow('BL_'+p.get("id"),C_BL+p.get('consNo'),new Fos.BLTab(p),true);				
			var t=Ext.getCmp('T_BL_'+p.get("id"));
			t.addBlByCargo('MB/L',b);
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.addHBl = function(){
		var b = sm.getSelected();
		if(b){
			createWindow('BL_'+p.get("id"),C_BL+p.get('consNo'),new Fos.BLTab(p),true);	
			var t=Ext.getCmp('T_BL_'+p.get("id"));
			t.addBlByCargo('HB/L',b);
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.addCude = function(){
		var b = sm.getSelected();
		if(b){
			createWindow('CUDE_'+p.get("id"),C_CUDE+p.get('consNo'),new Fos.CustomsTab(p),true);	
			var t=Ext.getCmp('T_CUDE_'+p.get("id"));
			t.addCudeByCargo(b);
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.genCons = function(){		
		var b = sm.getSelected();
		if(b){
			EXPC('CONS_B_CARG','&id='+b.get('id'));
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};*/
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'FCargo',FCargo,'CARG_S');
	};
	
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,
		handler:function(){
			var c = new FCargo({consId:p.get('id'),consNo:p.get('consNo'),
			consMasterId:p.get('consMasterId'),consMasterNo:p.get('consMasterNo'),cargMarks:'N/M',cargSpec:'',
			packId:'',
			cargPackageNum:'',
			cargNameCn:'',
			cargNameEn:'',
			cargGrossWeight:'',
			cargNetWeight:'',
			cargMeasurement:'',
			cargUnit:'',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			
        	store.insert(0,c);
        	sm.selectFirstRow();
        	this.startEditing(0, 2);
        }
	});
	
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),iconCls:'remove',scope:this,
		handler:function(){
			var r = sm.getSelections();
			if(r){
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
				}
				//this.reCalculate();
			}
		}
	});
	
	var btnSave = new Ext.Button({text:C_SAVE,disabled:NR(m+F_M),iconCls:'save',scope:this,handler:this.save});
	
	Fos.CargoGrid.superclass.constructor.call(this,{plugins:[quitFlag],
		title:C_CARGO_LIST,border:true,autoScroll:true,
		clicksToEdit:1,height:150,store:store,sm:sm,cm:cm,
	    tbar:[btnAdd,'-',btnRemove,'-',btnSave]
	});
};
Ext.extend(Fos.CargoGrid, Ext.grid.EditorGridPanel);

Fos.ContainerGrid = function(p,store) {
	var checkSOC = new Ext.grid.CheckColumn({header: "SOC",dataIndex:'contSocFlag',width:55});
	var checkPOF = new Ext.grid.CheckColumn({header: "Part Of",dataIndex:'contPartOfFlag',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var c1={header:C_COTY,dataIndex:'cotyId',width:60,renderer:getCOTY,
			editor:new Ext.form.ComboBox({displayField:'cotyCode',valueField:'cotyId',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:getCOTY_S()})};
	var c2={header:C_QUANTITY,dataIndex:'contNum',width:60,editor:new Ext.form.NumberField({})};
	var c3={header:C_FL,dataIndex:'contFl',width:40,
			editor:new Ext.form.ComboBox({displayField:'CODE',valueField:'CODE',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.FL_S})};
    var c4={header:C_M_CONS_NO,dataIndex:'contMConsNo',editor:new Ext.form.TextField()};
    var c5={header:C_PACK,hidden:true,dataIndex:'packName',renderer:getPACK,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})};
    var c6={header:C_PACKAGES,hidden:true,dataIndex:'contPackageNum',width:60,editor:new Ext.form.NumberField({})};
    var c7={header:C_GROSS_WEIGHT+C_KGS,hidden:true,dataIndex:'contGrossWeight',width:60,editor:new Ext.form.NumberField({})};
    var c8={header:C_CBM,hidden:true,dataIndex:'contMeasurement',width:60,editor:new Ext.form.NumberField({})};
    var c9={header:C_CARGO_NAME_EN,hidden:true,dataIndex:'contCargoNameEn',editor:new Ext.form.TextField()};
    var c10={header:C_CARGO_NAME_EN,hidden:true,dataIndex:'contCargoNameEn',editor:new Ext.form.TextField()};
    var c11={header:C_REMARKS,dataIndex:'contRemarks',editor:new Ext.form.TextField({})};	
	var c12={header:C_CONT_NO,dataIndex:'contNo',validator:HTUtil.checkContainerNo,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:'集装箱编码格式不正确，前四位应为字母，后七位为数字，请重新输入！'})};
	var c13={header:C_SEAL_NO,dataIndex:'contSealNo',editor:new Ext.form.TextField()};
	var cm=new Ext.grid.ColumnModel({columns:p.get('consBizClass')==BC_I?[sm,c1,c2,c12,c13,c3,checkSOC,c5,c6,c7,c8,c9,c10,c11]:
		[sm,c1,c2,c3,checkSOC,checkPOF,c4,c5,c6,c7,c8,c9,c10,c11],defaults:{sortable:true,width:100}});
	
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_CONS;	
	Fos.ContainerGrid.superclass.constructor.call(this, { 
	itemId:'C_CONT',title:C_CONT_INFO,border:true,plugins:[checkSOC,checkPOF],autoScroll:true,clicksToEdit:1,height:400,
    store: store,sm:sm,cm:cm,
    tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:function(){
			var c = new FContainer({contNum:1,contNo:'',contSealNo:'',contSealNo2:'',contSealNo3:'',
			contPreFlag:p.get('consBizClass')==BC_I?'N':'Y',consId:p.get('id'),consNo:p.get('consNo'),
			contMConsNo:'',contPackageNum:'',contGrossWeight:'',contMeasurement:'',
			contCargoNameEn:'',contCargoNameCn:'',contRemarks:'',			
			cotyId:'',contFl:p.get('consShipType')==ST_L?ST_L:ST_F,packId:'',contSocFlag:0,
			contPartOfFlag:p.get('consShipType')==ST_L?1:0,version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
        		store.insert(0,c);
        		this.startEditing(0, 1);}},'-',
		{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,
        			handler:function(){HTUtil.REMOVE_SM(sm,store);}}
		]
	});
};
Ext.extend(Fos.ContainerGrid, Ext.grid.EditorGridPanel);

Fos.ImpHblGrid = function(p,store) {
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_HBL_NO,dataIndex:'blNo',editor:new Ext.form.TextField()},
	{header:C_MARKS,dataIndex:'blCargoMarks',editor:new Ext.form.TextField()},
	{header:C_CARGO_NAME,dataIndex:'blCargoDesc',editor:new Ext.form.TextField()},
	{header:C_PACKAGES,dataIndex:'blPackages',width:60,editor:new Ext.form.NumberField({})},
	{header:C_PACK,dataIndex:'packName',width:80,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()
            })},
	{header:C_GROSS_WEIGHT,dataIndex:'blGrossWeight',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NET_WEIGHT,dataIndex:'blNetWeight',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CBM,dataIndex:'blMeasurement',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CONSIGNEE,dataIndex:'blConsignee',editor:new Ext.form.TextField()}],defaults:{sortable:true,width:100}});
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_CONS;
	Fos.ImpHblGrid.superclass.constructor.call(this, { 
	border:true,autoScroll:true,clicksToEdit:1,height:400,store: store,sm:sm,cm:cm,
    tbar:[{text:C_ADD,disabled:NR(m+F_M),iconCls:'add',scope:this,handler:function(){
			var c = new FBl({consId:p.get('id'),consNo:p.get('consNo'),blContainersNo:p.get('consContainersNo'),
			blNo:'',blType:'H/BL',blCargoDesc:p.get('consCargoDesc'),blPackages:p.get('consTotalPackages'),
			packId:p.get('packId'),packName:p.get('packName'),blCargoMarks:'',
			blGrossWeight:p.get('consTotalGrossWeight'),blNetWeight:p.get('consTotalNetWeight'),
			blMeasurement:p.get('consTotalMeasurement'),blConsignee:p.get('consConsignee'),
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
        	store.insert(0,c);this.startEditing(0, 1);}},'-',
		{text:C_REMOVE,disabled:NR(m+F_M),iconCls:'remove',scope:this,handler:function(){HTUtil.REMOVE_SM(sm,store);}}]
	});
};
Ext.extend(Fos.ImpHblGrid, Ext.grid.EditorGridPanel);

Fos.DoGrid = function(p,store,frm) {
	var sel = -1000;
	var re = {
		rowselect:function(sm,row,record){
			if(sel!=record.get('id')){
				frm.find('name','doWarehouseName')[0].setValue(record.get('doWarehouseName'));
				frm.find('name','doWarehouseContact')[0].setValue(record.get('doWarehouseContact'));
				frm.find('name','doWarehouseTel')[0].setValue(record.get('doWarehouseTel'));
				frm.find('name','doWarehouseAddress')[0].setValue(record.get('doWarehouseAddress'));
				frm.find('name','doRemarks')[0].setValue(record.get('doRemarks'));
				frm.find('name','doContainerNo')[0].setValue(record.get('doContainerNo'));
				frm.find('name','doInDate')[0].setValue(record.get('doInDate'));
				frm.find('name','doOutDate')[0].setValue(record.get('doOutDate'));
				sel=record.get('id');
			};
		},
		rowdeselect:function(sm,row,record){
			record.beginEdit();			
			record.set('doWarehouseName',frm.find('name','doWarehouseName')[0].getValue());
			record.set('doWarehouseAddress',frm.find('name','doWarehouseAddress')[0].getValue());
			record.set('doWarehouseContact',frm.find('name','doWarehouseContact')[0].getValue());
			record.set('doWarehouseTel',frm.find('name','doWarehouseTel')[0].getValue());
			record.set('doRemarks',frm.find('name','doRemarks')[0].getValue());
			record.set('doContainerNo',frm.find('name','doContainerNo')[0].getValue());
			record.set('doInDate',frm.find('name','doInDate')[0].getValue());
			record.set('doOutDate',frm.find('name','doOutDate')[0].getValue());
			record.endEdit();
		}
	};		
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_HDO_NO,dataIndex:'doNo'},
	{header:C_HBL_NO,dataIndex:'hblNo'},
	{header:C_MARKS,dataIndex:'doMarks'},
	{header:C_CARGO_NAME,dataIndex:'doCargoName'},
	{header:C_PACKAGES,dataIndex:'doPackages'},
	{header:C_PACK,dataIndex:'packName',renderer:getPACK,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	{header:C_GROSS_WEIGHT,dataIndex:'doGrossWeight',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NET_WEIGHT,dataIndex:'doNetWeight',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CBM,dataIndex:'doMeasurement',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CONSIGNEE,dataIndex:'doConsignee'}
	],defaults:{sortable:true,width:100,editor:new Ext.form.TextField()}});
	this.add=function(){
		var r = new FDo({doNo:'',consId:p.get('id'),consNo:p.get('consNo'),
    		hblNo:p.get('consHblNo'),doVessel:p.get('vessName'),
    		doVoyage:p.get('voyaName'),doDonsignee:'',doPort:p.get('consPolEn'),doHarbour:p.get('consHarbour'),
    		doWarehouseId:p.get('consWarehouse'),
    		doWarehouseName:p.get('consWarehouseName'),
    		doWarehouseContact:p.get('consWarehouseContact'),
    		doWarehouseTel:p.get('consWarehouseTel'),doWarehouseAddress:p.get('consWarehouseAddress'),
    		doContainerNo:p.get('consContainerNo'),doMarks:p.get('consCargoMarks'),
    		doCargoName:p.get('consCargoNameEn'),packId:p.get('packId'),packName:p.get('packName'),
    		doPackages:'',doGrossWeight:'',doMeasurement:'',doNetWeight:'',doRemarks:'',
    		doStatus:'0',version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	this.stopEditing();store.insert(0,r);sm.selectFirstRow();this.startEditing(0,1);
	};
	this.removeDo=function(){HTUtil.REMOVE_SM(sm,store);};
	this.imp=function(){
		var hbl_s = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'BL_Q',_mt:'json'},
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FBl',id:'id'},FBl),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});		
		hbl_s.load({params:{consId:p.get('id'),blType:'H/BL'},scope:this,callback:function(r,o,s){
			for(var j=0;j<r.length;j++){
				var d = new FDo({doNo:p.get('consMblNo')+'*'+(j+1),
					blId:r[j].get('id'),
					hblNo:r[j].get('blNo'),
					doConsignee:r[j].get('blConsignee'),
					consId:r[j].get('consId'),consNo:r[j].get('consNo'),doMarks:r[j].get('blCargoMarks'),
					doCargoName:r[j].get('blCargoDesc'),doContainerNo:r[j].get('blContainersNo'),
					packId:r[j].get('packId'),packName:r[j].get('packName'),
					doPackages:r[j].get('blPackages'),doGrossWeight:r[j].get('blGrossWeight'),
					doNetWeight:r[j].get('blNetWeight'),
					doMeasurement:r[j].get('blMeasurement'),doRemarks:'',
					doPort:p.get('consPolEn'),doHarbour:p.get('consHarbour'),doArriveDate:p.get('consSailDate'),
					doVessel:p.get('vessName'),doVoyage:p.get('voyaName'),
					doWarehouseId:p.get('consWarehouse'),
    				doWarehouseName:p.get('consWarehouseName'),
    				doWarehouseContact:p.get('consWarehouseContact'),
    				doWarehouseTel:p.get('consWarehouseTel'),
    				doWarehouseAddress:p.get('consWarehouseAddress'),
					doStatus:'0',version:'0',uuid:HTUtil.UUID(32)});
				store.addSorted(d);
				d.set('rowAction','N');
			}
		}});
	};
	 this.expExcel=function(){var b = sm.getSelected();if(b){EXPC('DO','&id='+b.get('id'));}};
	this.expEmail=function(){
		var b = sm.getSelected();
		if(b){
			var to='';var cc='';var sub=C_DO_APPLICATION;
			var msg='';
			EXPM(to,cc,sub,msg,'DO','id='+b.get('id'));
		}
	};
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_DO;
	Fos.DoGrid.superclass.constructor.call(this, { 
	id:'G_DO'+p.get('id'),border:true,autoScroll:true,clicksToEdit:1,height:150,store: store,sm:sm,cm:cm,
    tbar:[
    	{text:C_GEN_FROM_HBL,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.imp}, '-', 
    	{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.add}, '-',
    	{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeDo}, '-',
    	{text:C_SWITCH_BL,iconCls:'refresh',disabled:NR(m+F_M),scope:this,handler:function(){}},'-',
		{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,
			menu: {items: [		   		
				{text:C_DO,menu:{items:[
		   		{text:'Excel',scope:this,handler:this.expExcel},
		   		{text:C_EMAIL,scope:this,handler:this.expEmail},
		   		{text:C_FAX,scope:this,handler:function(){}}]}}]}}
		]
	});
};
Ext.extend(Fos.DoGrid, Ext.grid.EditorGridPanel);
Fos.SplitTab = function(p) {
	var do_s = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'DO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FDo',id:'id'},FDo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0, limit:100}});
	
	if(p.get('consStatusSplit')!=0){do_s.load({params:{consId:p.get('id')}});}	
	this.doGrid = new Fos.DoGrid(p,do_s,this);	
	this.save=function(){
		p.set('consStatusSplit',1);
		p.set('consSplitNo',this.find('name','consSplitNo')[0].getValue());
		p.set('consShipCode',this.find('name','consShipCode')[0].getValue());
		p.set('consSplitContact',this.find('name','consSplitContact')[0].getValue());
		p.set('consSplitTel',this.find('name','consSplitTel')[0].getValue());
		p.set('consSplitConsignee',this.find('name','consSplitConsignee')[0].getValue());
		p.set('consSplitConsignee',this.find('name','consSplitConsignee')[0].getValue());
		p.set('consSplitConsigneeTel',this.find('name','consSplitConsigneeTel')[0].getValue());
	 			
		var xml = HTUtil.RTX(p,'FConsign',FConsign);
		var c =this.doGrid.getStore().getModifiedRecords();
		if(c.length>0){
			var x = HTUtil.ATX(c,'FDo',FDo);
			xml=xml+x;
		};		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_S'},
			success: function(res){						
				var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
				p.set('version',c.get('version'));
				p.set('consStatusSplit',c.get('consStatusSplit'));
				this.updateToolBar('1');
				var a = HTUtil.XTRA(res.responseXML,'FDo',FDo);
				HTUtil.RUA(do_s,a,FDo);
				XMG.alert(SYS,M_S);
			},
			failure: function(res){XMG.alert(SYS,M_F+res.responseText);},
			xmlData:HTUtil.HTX(xml)
		});
	};
	this.docPass=function(){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_U',id:p.get('id'),consStatusSplit:'2'},
			success: function(r){p.set('consStatusSplit','2');this.updateToolBar('2');XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});	
    };
    this.pass=function(){
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONS_U',consId:p.get('id'),consStatusSplit:'3'},
			success: function(r){p.set('consStatusSplit','3');this.updateToolBar('3');XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});	
    };
    this.expExcel=function(){EXPC('SPLI','&id='+p.get('id'));};
	this.expEmail=function(){
		var to='';var cc='';var sub=C_DO_APPLICATION;
		var msg='您好！<BR>附件是我司的分拨申请，船名/航次:'+p.get('vessName')+'/'+p.get('voyaName')+',我司业务号：'+p.get('consNo')+'；<BR>请查收。谢谢！';
		EXPM(to,cc,sub,msg,'SPLI','id='+p.get('id'));
	};
	this.updateToolBar = function(s){  
		var tb = this.getTopToolbar();
		tb.getComponent('TB_S').setDisabled(s>1);
    	tb.getComponent('TB_B').setDisabled(s!=1);
    	tb.getComponent('TB_C').setDisabled(s!=2);
    	tb.getComponent('TB_M').setText(C_STATUS_C+HTStore.getSPST(s));        				
    };
    var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_DO;
	Fos.SplitTab.superclass.constructor.call(this, { 
	id:'T_SPLIT_'+p.get('id'),title:C_SWITCH+'(F10)',header:false,deferredRender:false,autoScroll:true,
	labelAlign:'right',labelWidth:70,border : false,width:800,
	tbar:[{text:C_SAVE,itemId:'TB_S',iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save},'-',
			{text:C_DOC_PASS,itemId:'TB_B',disabled:NR(m+F_M)||p.get('consStatusSplit')!=1,iconCls:'docpass',scope:this,handler:this.docPass},'-',
			{text:C_CUSTOM_PASS,itemId:'TB_C',disabled:NR(m+F_M)||p.get('consStatusSplit')!=2,iconCls:'pass',scope:this,handler:this.pass},'-',
			{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,
				menu: {items: [		   		
		   		{text:C_DO_APPLICATION,menu:{items:[
		   			{text:'Excel',scope:this,handler:this.expExcel},
		   			{text:C_EMAIL,scope:this,handler:this.expEmail},
		   			{text:C_FAX,scope:this,handler:function(){}}]}}]}},'->',
			{itemId:'TB_M',disabled:true,text:C_STATUS_C+HTStore.getSPST(p.get('consStatusSplit'))},'-'
			],
	items: [{layout:'column',layoutConfig: {columns:4},deferredRender:false,title:C_DO_APPLICATION_INFO,labelWidth:100,collapsible:true,
            items:[{columnWidth:.25,layout: 'form',border:false,
                items: [{fieldLabel:C_CUSTOM_CODE,tabIndex:1,name:'consSplitNo',value:p.get('consSplitNo'),xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_VESS_CODE,tabIndex:5,name:'consShipCode',value:p.get('consShipCode'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_SPLIT_CONSIGNEE,tabIndex:9,name:'consSplitConsignee',value:p.get('consSplitConsignee'),xtype:'textfield',anchor:'95%'}]},
				{columnWidth:.25,layout: 'form',border : false,
                items: [{fieldLabel:C_VESS,tabIndex:2,disabled:true,name:'vessName',value:p.get('vessName'),xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_POL,tabIndex:6,disabled:true,name:'consPolEn',value:p.get('consPolEn'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_PHONE,tabIndex:10,name:'consSplitConsigneeTel',value:p.get('consSplitConsigneeTel'),xtype:'textfield',anchor:'95%'}]},
				{columnWidth:.25,layout: 'form',border : false,
                items: [{fieldLabel:C_VOYA,tabIndex:3,disabled:true,name:'voyaName',value:p.get('voyaName'),xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_HARBOUR,tabIndex:6,disabled:true,name:'consHarbour',value:p.get('consHarbour'),xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_SPLIT_CONTACT,tabIndex:11,name:'consSplitContact',value:p.get('consSplitContact'),xtype:'textfield',anchor:'95%'}]},
				{columnWidth:.25,layout: 'form',border : false,
                items: [{fieldLabel:'M/BL No.',tabIndex:4,disabled:true,name:'consMblNo',value:p.get('consMblNo'),xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_ETA,tabIndex:7,disabled:true,name:'consSailDate',value:p.get('consSailDate'),xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_PHONE,tabIndex:12,name:'consSplitTel',value:p.get('consSplitTel'),xtype:'textfield',anchor:'95%'}]},
				{columnWidth:.99,layout: 'form',border : false,
                items: [{fieldLabel:C_CONT_NO,tabIndex:13,disabled:true,name:'consContainerNo',value:p.get('consContainerNo'),height:40,xtype:'textarea',anchor:'95%'}
               	]}]
			},
			{layout:'form',title: "House D/O",deferredRender:false,collapsible:true,
			items: [{layout:'fit',border:false,items:[this.doGrid]}]},
			{layout:'column',layoutConfig: {columns:4},deferredRender:false,labelWidth:60,labelAlign:'top',title:C_DO_INFO,collapsible:true,
 			items:[{columnWidth:.2,layout: 'form',labelAlign:'left',border:false,labelWidth:40,
         		items: [{fieldLabel:C_WAREHOUSE,tabIndex:19,name:'doWarehouseName',
         			store:HTStore.getCS(),enableKeyEvents:true,
         			xtype:'customerLookup',custType:'custWarehouseFlag',bizType:'M',
         			displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
         			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
					blur:function(f){
						if(f.getRawValue()==''){
							f.clearValue();
							p.set('doWarehouseId','');
							p.set('doWarehouseName','');
						}
					},
					select:function(c,r,i){
						this.find('name','doWarehouseContact')[0].setValue(r.get('custContact'));
						this.find('name','doWarehouseTel')[0].setValue(r.get('custTel'));
						this.find('name','doWarehouseAddress')[0].setValue(r.get('custAddress'));
						var b =this.doGrid.getSelectionModel().getSelected();
						if(b){
							b.set('doWarehouseId',r.get('id'));
							b.set('doWarehouseContact',r.get('custContact'));
							b.set('doWarehouseName',r.get('custNameCn'));
							b.set('doWarehouseTel',r.get('custTel'));
							b.set('doWarehouseAddress',r.get('custAddress'));
						}
					},
					keydown:{fn:function(f,e){
						loadCustomer(f,e,'custWarehouseFlag','M',1);
						},buffer:BF}
					}}]},
         		{columnWidth:.2,layout: 'form',labelAlign:'left',border:false,labelWidth:70,items: [{fieldLabel:C_WARE_CONTACT,tabIndex:20,name:'doWarehouseContact',xtype:'textfield',anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doWarehouseContact',nv);}
         			}}}]},
         		{columnWidth:.2,layout: 'form',labelAlign:'left',border:false,items:[{fieldLabel:C_PHONE,tabIndex:17,name:'doWarehouseTel',xtype:'textfield',anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doWarehouseTel',nv);}
         			}}}]},
         		{columnWidth:.4,layout: 'form',labelAlign:'left',border:false,items: [{fieldLabel:C_WARE_ADDRESS,tabIndex:21,name:'doWarehouseAddress',xtype:'textfield',anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doWarehouseAddress',nv);}
         			}}}]},   	
         		{columnWidth:.2,labelWidth:40,layout: 'form',labelAlign:'left',border:false,items: [{fieldLabel:C_CONT_NO,tabIndex:20,name:'doContainerNo',xtype:'textfield',anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doContainerNo',nv);}}}}]},
         		{columnWidth:.2,layout: 'form',labelAlign:'left',border:false,labelWidth:70,items: [{fieldLabel:C_WARE_DATE_IN,tabIndex:20,name:'doInDate',xtype:'datefield',format:DATEF,anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doInDate',nv);}}}}]},
         		{columnWidth:.2,layout: 'form',labelAlign:'left',border:false,items: [{fieldLabel:C_WARE_DATE_OUT,tabIndex:20,name:'doOutDate',xtype:'datefield',format:DATEF,anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doOutDate',nv);}}}}]},
         		{columnWidth:.4,layout: 'form',labelAlign:'left',border:false,items: [{fieldLabel:C_REMARKS,tabIndex:21,name:'doRemarks',xtype:'textfield',anchor:'95%',
         			listeners:{scope:this,change:function(f,nv,ov){
         				var b =this.doGrid.getSelectionModel().getSelected();
         				if(b){b.set('doRemarks',nv);}}}}]}
			]}
		]
	});
};
Ext.extend(Fos.SplitTab, Ext.FormPanel);

Fos.WarehouseTab = function(p) {
	this.sel =-1000;	
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WARE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FWarehouse',id:'id'},FWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.cargoStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WACA_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FWarehouseCargo',id:'id'},FWarehouseCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
    if(p.get('rowAction')!='N'){
    	this.store.load({params:{consId:p.get('id')}});
    	this.cargoStore.load({params:{consId:p.get('id')}});
	}
	var re = {scope:this,
		rowselect:function(sm,row,record){
			if(this.sel!=record.get('id')){
				this.sel=record.get('id');
				this.getForm().reset();
				this.getForm().loadRecord(record);
				sumPK.setValue(record.get('wareTotalPackages'));
				sumGW.setValue(record.get('wareTotalGrossWeight'));
				sumMM.setValue(record.get('wareTotalMeasurement'));
				var s = this.cargoGrid.getStore();
				s.removeAll();
				var a = this.cargoStore.getRange();
				for(var i=0;i<a.length;i++){
					if(a[i].get('id')==this.sel) 
						s.add(a[i]);
					}
			}},
		rowdeselect:function(sm,row,record){
			if(this.getForm().isDirty()){
				record.beginEdit();
				this.getForm().updateRecord(record);
				record.endEdit();
			}			
		}
	};
	var sumPK = new Ext.form.TextField({name:'tranTotalPackages',disabled:true});
	var sumGW = new Ext.form.TextField({name:'tranTotalGrossWeight',disabled:true});
	var sumMM = new Ext.form.TextField({name:'tranTotalMeasurement',disabled:true});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_WARE_NO,dataIndex:'wareNo',width:100},
	{header:C_WARE_TYPE,dataIndex:'wareType',renderer:HTStore.getWATY,width:150},
	{header:C_WARE_DATE_IN,dataIndex:'wareDate',renderer:formatDate,width:100},
	{header:C_WAREHOUSE,dataIndex:'wareVendorName',width:100},
	{header:C_WARE_ACCEPT_STATUS,dataIndex:'wareAcceptStatus',renderer:HTStore.getWAST,width:100},
	{header:C_WARE_ACCEPT_TIME,dataIndex:'wareAcceptDate',renderer:formatDate,width:100}],defaults:{sortable:true,width:100}});
	this.wareGrid = new Ext.grid.GridPanel({header:false,border:true,height:150,viewConfig:{forceFit:true},autoScroll:true,
		store:this.store,sm:sm,cm:cm});	
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
	{header:C_MARKS,dataIndex:'wacaCargoMarks',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CATY,dataIndex:'wacaCargoName',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_PACKAGES,dataIndex:'wacaPackagesNum',width:80,editor:new Ext.form.NumberField({allowBlank:false,allowDecimals:false,blankText:'',invalidText:''})},	
	{header:C_PACK,dataIndex:'packName',width:80,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	{header:C_GROSS_WEIGHT,dataIndex:'wacaGrossWeight',width:80,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_NET_WEIGHT,dataIndex:'wacaNetWeight',width:80,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},	
	{header:C_CBM,dataIndex:'wacaMeasurement',width:80,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})}
	],defaults:{sortable:true,width:100}});
	this.cargoGrid = new Ext.grid.EditorGridPanel({border:false,height:200,autoScroll:true,sm:sm2,cm:cm2,
		store:new Ext.data.Store({reader:new Ext.data.XmlReader({id:'id',record:'FWarehouseCargo'},FWarehouseCargo),sortInfo:{field:'id',direction:'ASC'}}),
		listeners:{scope:this,afteredit:function(e){
    		var f=e.field;
    		if(f=='wacaPackagesNum'||f=='wacaGrossWeight'||f=='wacaMeasurement'){this.reCalculate();}
    	}},
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:function(){
			var r = this.wareGrid.getSelectionModel().getSelected();
			if(r){				
				var win = new Fos.CargoLookupWin('CARG_Q',p.get('id'));
				win.addButton({text:C_OK,scope:this,handler:function(){
					var g = win.findById('G_CARG_LOOKUP');
					var a = g.getSelectionModel().getSelections();
					if(a){
						for(var i=0;i<a.length;i++){
							if(this.cargoGrid.getStore().findBy(function(rec,id){return rec.get('cargId')==a[i].get('id');})==-1){
								var t = new FWarehouseCargo({wareId:r.get('wareId'),consId:r.get('consId'),
									cargId:a[i].get('id'),wacaCargoName:a[i].get('cargNameEn'),wacaCargoMarks:a[i].get('cargMarks'),
									packName:a[i].get('packName'),wacaPackagesNum:a[i].get('cargPackageNum'),
									wacaGrossWeight:a[i].get('cargGrossWeight'),wacaNetWeight:a[i].get('cargNetWeight'),
									wacaMeasurement:a[i].get('cargMeasurement'),
									trcaRemarks:'',verson:0,uuid:HTUtil.UUID(32)});
								this.cargoStore.add(t);t.set('rowAction','N');
								this.cargoGrid.getStore().add(t);
							}
						}
    					this.reCalculate();
					}
					win.close();
				}},this);
				win.addButton({text:C_CANCEL,handler : function(){win.close();}},this);
				win.show();
			}
			else XMG.alert(SYS,M_NO_DATA_SELECTED);
			}},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:function(){
				var r = this.cargoGrid.getSelectionModel().getSelections();
				if(r){for(var i=0;i<r.length;i++){r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				this.cargoGrid.getStore().remove(r[i]);this.reCalculate();}
			}}
		},'->',
		{xtype:'tbtext',text:C_SUM_PACK},sumPK,'-',
		{xtype:'tbtext',text:C_SUM_GW},sumGW,'-',
		{xtype:'tbtext',text:C_SUM_CBM},sumMM
		]
	});
	this.reCalculate=function(){
		var sumP=0,sumG=0,sumM=0;
		var a=this.cargoStore.getRange();		
		for(var i=0;i<a.length;i++){
			if(a[i].get('wacaPackagesNum')) sumP=sumP+a[i].get('wacaPackagesNum');
			if(a[i].get('wacaGrossWeight')) sumG=sumG+a[i].get('wacaGrossWeight');
			if(a[i].get('wacaMeasurement')) sumM=sumM+a[i].get('wacaMeasurement');
		}		
		sumPK.setValue(round2(sumP));
		sumGW.setValue(round2(sumG));
		sumMM.setValue(round2(sumM));
		var b =this.wareGrid.getSelectionModel().getSelected();
		b.set('wareTotalPackages',sumP);
		b.set('wareTotalGrossWeight',sumG);
		b.set('wareTotalMeasurement',sumM);
	};
	this.addWare = function(){
		var b = new FWarehouse({
					consId:p.get('id'),consNo:p.get('consNo'),
					wareVessel:p.get('vessName'),wareVoyage:p.get('voyaName'),
					wareMblNo:p.get('consMblNo'),
					wareVendorId:p.get('consWarehouse'),wareVendorName:p.get('consWarehouseName'),
					wareVendorContact:p.get('consWarehouseContact'),wareVendorTel:p.get('consWarehouseTel'),wareVendorFax:p.get('consWarehouseFax'),
					wareCustomerContact:p.get('custContact'),wareCustomerTel:p.get('custTel'),wareCustomerFax:p.get('custFax'),
					wareOperator:'',wareOperatorTel:HTStore.getCFG('COMPANY_TEL'),wareOperatorFax:HTStore.getCFG('COMPANY_FAX'),
					wareType:'I',wareDate:new Date(),
					wareBookDate:new Date(),wareAcceptDate:new Date(),
					wareTransVendor:p.get('consTrackVendor'),wareTransVendorName:p.get('consTrackVendorName'),wareLoadFlag:0,
					wareTrackNo:'',wareContainerNo:p.get('consContainerNo'),wareRemarks:p.get('consWarehouseRemarks'),
					wareAcceptStatus:0,version:0,uuid:HTUtil.UUID(32)});
		this.store.insert(0,b);b.set('rowAction','N');
		this.resel=true;
		this.wareGrid.getSelectionModel().selectFirstRow();
	};
	this.removeWare = function(){
		var b =this.wareGrid.getSelectionModel().getSelected();
		if(b){
	    	if(b.get('wareAcceptStatus')!=0) XMG.alert(SYS,M_WARE_CONFIRMED);
	    	else{
	    		b.set('rowAction',b.get('rowAction')=='N'?'D':'R');
	    		this.store.remove(b);
	    		this.getForm().reset();
	    		var s = this.cargoGrid.getStore();
				var a = s.getRange();
				for(var i=0;i<a.length;i++){
					a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
					this.cargoStore.remove(a[i]);s.remove(a[i]);
				}
	    	}
    	}
		else XMG.alert(SYS,M_R_P);
	};
	this.save = function(){
		this.wareGrid.stopEditing();
		this.cargoGrid.stopEditing();
		var b =this.wareGrid.getSelectionModel().getSelected();
		if(b){
			b.beginEdit();
			this.getForm().updateRecord(b);
			b.endEdit();
		};
		var xml='';
		var a =this.store.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'FWarehouse',FWarehouse);};		
		var cc=[];
		var ca =this.cargoStore.getRange();
		for(var i=0;i<ca.length;i++){
			if(ca[i].dirty) cc[cc.length]=ca[i];
		}
		if(cc.length>0){
			var x = HTUtil.ATX(cc,'FWarehouseCargo',FWarehouseCargo);
			xml=xml+x;
		};
		
		if(xml!=''){
		 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WARE_S'},
			success: function(res){
				var a = HTUtil.XTRA(res.responseXML,'FWarehouse',FWarehouse);
				HTUtil.RUA(this.store,a,FWarehouse);
				var b = HTUtil.XTRA(res.responseXML,'FWarehouseCargo',FWarehouseCargo);
				HTUtil.RUA(this.cargoStore,b,FWarehouseCargo);
				XMG.alert(SYS,M_S);
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(xml)});
		}
	};
	this.expExcel=function(){
    	var b =this.wareGrid.getSelectionModel().getSelected();
    	if(b) EXPC('WARE','&id='+b.get('id'));
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.expEmail=function(){		
		var b =this.wareGrid.getSelectionModel().getSelected();
		if(b){
			var to='',cc='',sub='',msg='';
			EXPM(to,cc,sub,msg,'WARE','id='+b.get('id'));
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	var updateStatus=function(s){
		var b =this.wareGrid.getSelectionModel().getSelected();
		if(b)
    	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WARE_U',id:b.get('id'),wareStatus:s},
			success: function(r){b.set('wareStatus',s);this.updateToolbar();XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.start=function(){updateStatus('1');};
	this.end=function(){updateStatus('2');};
	
	var m=M3_WARE;
	this.updateToolbar=function(){
    	var b = this.wareGrid.getSelectionModel().getSelected();
    	var tb= this.getTopToolbar();
    	var s=b.get('wareStatus');
    	if(b){
	    	tb.getComponent('TB_A').setDisabled(NR(m+F_M));
    		tb.getComponent('TB_B').setDisabled(NR(m+F_M)||s!='0');
    		tb.getComponent('TB_C').setDisabled(NR(m+F_M));
		}
    };
	var menu=CREATE_E_MENU(C_WARE_BILL,this.expExcel,this.expEmail,function(){},this);
	Fos.WarehouseTab.superclass.constructor.call(this,{itemId:'C_WARE',title:C_WARE,header:false,deferredRender:false,autoScroll:true,	
		labelAlign:'right',labelWidth:90,bodyStyle:'padding:0px 0px 0px',border:true,layout:'border',
	tbar:[{text:C_ADD,itemId:'TB_A',iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.addWare},'-',
			{text:C_REMOVE,itemId:'TB_B',iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeWare},'-',
			{text:C_SAVE,itemId:'TB_C',iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save},'-',
			{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,menu:{items:[menu]}}
		],
	items: [{layout:'fit',region:'north',title:C_WARE_LIST,border:false,height:150,collapsible:true,items:[this.wareGrid]},
			{xtype:'tabpanel',region:'center',plain:true,activeTab:0,defaults:{bodyStyle:'padding:0px'},
          		listeners:{scope:this,tabchange:function(m,a){a.doLayout();}},
            	items:[
            {layout:'column',title:C_WARE_INFO,tabIndex:1,layoutConfig:{columns:4},deferredRender:false,collapsible:true,
			items:[{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_WARE_NO,name:'wareNo',tabIndex:5,xtype:'textfield',anchor:'99%'},
				{fieldLabel:C_WAREHOUSE,name:'wareVendorName',tabIndex:9,store:HTStore.getCS(),enableKeyEvents:true,
					tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
					xtype:'customerLookup',custType:'custWarehouseFlag',bizType:'M',
					displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'99%',
					listeners:{scope:this,
					blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('wareVendorId','');p.set('wareVendorName','');}},
					select:function(c,r,i){
						this.find('name','wareVendorContact')[0].setValue(r.get('custContact'));
						this.find('name','wareVendorTel')[0].setValue(r.get('custTel'));
						this.find('name','wareVendorFax')[0].setValue(r.get('custFax'));
						var b =this.wareGrid.getSelectionModel().getSelected();
						if(b){
							b.set('wareVendorId',r.get('id'));
							b.set('wareVendorContact',r.get('custContact'));
							b.set('wareVendorTel',r.get('custTel'));
						}
					},
					keydown:{fn:function(f,e){
						loadCustomer(f,e,'custWarehouseFlag','M',1);
					},buffer:BF}}},
				{fieldLabel:C_WARE_ACCEPT_STATUS,name:'wareAcceptStatus',tabIndex:17,store:HTStore.WAST_S,
						xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,
						mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'99%'},
				{fieldLabel:C_WARE_ACCEPT_TIME,name:'wareAcceptDate',tabIndex:14,xtype:'datefield',format:DATEF,anchor:'99%'},
				{fieldLabel:C_VESS,name:'wareVessel',tabIndex:5,xtype:'textfield',anchor:'99%'}]},
			{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_WARE_TYPE,name:'wareType',tabIndex:2,xtype:'textfield',store:HTStore.WATY_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'99%'},
				{fieldLabel:C_WARE_CONTACT,name:'wareVendorContact',tabIndex:6,xtype:'textfield',anchor:'99%'},
				{fieldLabel:C_CUST_CONTACT,name:'wareCustomerContact',tabIndex:10,xtype:'textfield',anchor:'99%'},
				{fieldLabel:C_WARE_OPERATOR,name:'wareOperator',tabIndex:13,
					store:HTStore.getUSER_S(),xtype:'combo',displayField:'userLoginName',
					valueField:'userId',typeAhead: true,mode: 'remote',triggerAction: 'all',
					selectOnFocus:true,anchor:'99%'},
				{fieldLabel:C_VOYA,name:'wareVoyage',tabIndex:5,xtype:'textfield',anchor:'99%'}]},				
			{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_WARE_DATE_IN,name:'wareDate',tabIndex:3,xtype:'datefield',format:DATEF,anchor:'99%'},
				{fieldLabel:C_WARE_TEL,name:'wareVendorTel',tabIndex:7,xtype:'textfield',anchor:'99%'},				
				{fieldLabel:C_CUST_TEL,name:'wareCustomerTel',tabIndex:11,xtype:'textfield',anchor:'99%'},				
				{fieldLabel:C_WARE_OPERATOR_TEL,name:'wareOperatorTel',tabIndex:11,xtype:'textfield',anchor:'99%'},	
				{fieldLabel:C_BL_NO,name:'wareMblNo',tabIndex:5,xtype:'textfield',anchor:'99%'}]},				
			{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_WARE_BOOK_DATE,name:'wareBookDate',tabIndex:4,xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_WARE_FAX,name:'wareVendorFax',tabIndex:8,xtype:'textfield',anchor:'95%'},				
				{fieldLabel:C_CUST_FAX,name:'wareCustomerFax',tabIndex:12,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_WARE_OPERATOR_FAX,name:'wareOperatorFax',tabIndex:16,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_WARE_LOAD_FLAG,name:'wareLoadFlag',tabIndex:20,xtype:'checkbox',anchor:'60%'}]},
          {columnWidth:.5,layout:'form',border : false,items:[
				{fieldLabel:C_MOTORCADE,name:'wareTransVendorName',tabIndex:17,store:HTStore.getCS(),enableKeyEvents:true,
					tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
					xtype:'customerLookup',custType:'custTrackFlag',bizType:'M',
					displayField:'custCode',valueField:'custNameCn',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'99%',
					listeners:{scope:this,
					blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('wareTransVendor','');p.set('wareTransVendorName','');}},
					select:function(c,r,i){
						var b =this.wareGrid.getSelectionModel().getSelected();
						if(b){b.set('wareTransVendor',r.get('id'));}
					},
					keydown:{fn:function(f,e){
						loadCustomer(f,e,'custTrackFlag','M',1);
					},buffer:BF}}}]},
		  {columnWidth:.5,layout:'form',border : false,items:[
				{fieldLabel:C_VEHICLE_NO,name:'wareTrackNo',tabIndex:18,xtype:'textfield',anchor:'99%'}]},				
           {columnWidth:.5,layout:'form',border : false,items:[
				{fieldLabel:C_CONT_NO,name:'wareContainerNo',tabIndex:19,xtype:'textarea',anchor:'99%'}]},
			{columnWidth:.5,layout:'form',border : false,items:[
				{fieldLabel:C_REMARKS,name:'wareRemarks',tabIndex:20,xtype:'textarea',anchor:'99%'}]}
            ]},           
			{layout:'fit',border:false,collapsible:true,title:C_CARGO_LIST,items:[this.cargoGrid]}]}
		]
	});
};
Ext.extend(Fos.WarehouseTab, Ext.FormPanel);

Fos.ContainerTab = function(p) {
	this.sel =-1000;
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CONT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FContainer',id:'id'},FContainer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.cargoStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'COCA_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FContainerCargo',id:'id'},FContainerCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	if(p.get('rowAction')!='N'){
		this.store.load({params:{consId:p.get('id'),contPreFlag:'N'},scope:this,callback:function(r,o,sc){if(sc){this.reCalculate();}}});
		this.cargoStore.load({params:{consId:p.get('id')}});
	}
	var totalPackages = new Ext.form.TextField({width:80,disabled:true});
	var totalGrossWeight = new Ext.form.TextField({width:80,disabled:true});
	var totalMeasurement = new Ext.form.TextField({width:80,disabled:true});
	this.reCalculate = function(){
		var pkg=0;gw=0;me=0;
		var a=this.store.getRange();
		for(var i=0;i<a.length;i++){
			if(a[i].get('contPackageNum')>0) pkg=pkg+parseFloat(a[i].get('contPackageNum'));
			if(a[i].get('contGrossWeight')>0) gw=gw+parseFloat(a[i].get('contGrossWeight'));
			if(a[i].get('contMeasurement')>0) me=me+parseFloat(a[i].get('contMeasurement'));			
		}
		totalPackages.setValue(round2(pkg)); 
		totalGrossWeight.setValue(round2(gw));
		totalMeasurement.setValue(round2(me));
	};
	this.calContainer = function(){		
		var pkg=0;gw=0;me=0;
		var a=this.cargoGrid.getStore().getRange();
		for(var i=0;i<a.length;i++){
			if(a[i].get('cocaPackageNum')>0) pkg=pkg+parseFloat(a[i].get('cocaPackageNum'));
			if(a[i].get('cocaGrossWeight')>0) gw=gw+parseFloat(a[i].get('cocaGrossWeight'));
			if(a[i].get('cocaMeasurement')>0) me=me+parseFloat(a[i].get('cocaMeasurement'));			
		}
		var r = this.grid.getSelectionModel().getSelected();		
		r.set('contPackageNum',round2(pkg)); 
		r.set('contGrossWeight',round2(gw));
		r.set('contMeasurement',round2(me));
	};
	this.autoShip=function(){
		
	};
	var re = {scope:this,
		rowselect:function(sm,row,record){
			if(this.sel!=record.get('id')){
				this.sel=record.get('id');
				var s = this.cargoGrid.getStore();s.removeAll();
				var a = this.cargoStore.getRange();
				for(var i=0;i<a.length;i++){if(a[i].get('id')==this.sel && a[i].get('rowAction')!='D' && a[i].get('rowAction')!='R') s.add(a[i]);}
			}}
	};		
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});	
	var soc = new Ext.grid.CheckColumn({header: "SOC",dataIndex:'contSocFlag',width:55});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CONT_NO,dataIndex:'contNo',width:80,validator:HTUtil.checkContainerNo,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:'集装箱编码格式不正确，前四位应为字母，后七位为数字，请重新输入！'})},
	{header:C_SEAL_NO,dataIndex:'contSealNo',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_COTY,dataIndex:'cotyId',width:60,renderer:HTStore.getCOTY,
			editor:new Ext.form.ComboBox({displayField:'cotyCode',valueField:'cotyId',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOTY_S()})},
	{header:C_FL,dataIndex:'contFl',width:40,
			editor:new Ext.form.ComboBox({displayField:'CODE',valueField:'CODE',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.FL_S})},
    soc,
	{header:C_CARGO_NAME_EN,dataIndex:'contCargoNameEn',width:100,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_PACKAGES,dataIndex:'contPackageNum',width:60,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_PACK,dataIndex:'packName',width:80,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	{header:C_GROSS_WEIGHT,dataIndex:'contGrossWeight',width:60,renderer:rateRender,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_CBM,dataIndex:'contMeasurement',width:60,renderer:rateRender,editor:new Ext.form.TextField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},
	{header:C_REMARKS,dataIndex:'contRemarks',width:100,editor:new Ext.form.TextField()}],defaults:{sortable:true,width:100}});
	this.grid = new Ext.grid.EditorGridPanel({title:C_CONT_LIST,border:true,plugins:soc,autoScroll:true,clicksToEdit:1,height:200,
		store:this.store,sm:sm,cm:cm,listeners:{scope:this,
    	afteredit:function(e){var f=e.field;if(f=='contPackageNum'||f=='contGrossWeight'||f=='contMeasurement'){this.reCalculate();}}}
    });	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
	{header:C_BL_NO,dataIndex:'consMblNo',width:80,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
	{header:C_MARKS,dataIndex:'cocaMarks',width:80,editor:new Ext.form.TextField({})},	
	{header:C_CARGO_NAME_EN,dataIndex:'cocaCargoName',width:80,editor:new Ext.form.TextField({})},	
	{header:C_PACKAGES,dataIndex:'cocaPackageNum',width:60,editor:new Ext.form.NumberField({allowBlank:false})},
	{header:C_PACK,dataIndex:'packName',width:80,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	{header:C_GROSS_WEIGHT,dataIndex:'cocaGrossWeight',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})},	
	{header:C_CBM,dataIndex:'cocaMeasurement',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,blankText:'',invalidText:''})}
	],defaults:{sortable:true,width:120}});
	this.addCargo=function(){
		var r = this.grid.getSelectionModel().getSelected();
		if(r){
			var win = new Fos.CargoLookupWin(p.get('consShipType')=='FCL'?'CARG_Q':'CARG_MID_Q',p.get('id'));
			win.addButton({text:C_OK,scope:this,handler:function(){
				var g = win.findById('G_CARG_LOOKUP');
				var a = g.getSelectionModel().getSelections();
				if(a){
					for(var i=0;i<a.length;i++){
						if(this.cargoGrid.getStore().findBy(function(rec,id){return rec.get('cargId')==a[i].get('id');})==-1){
							var t = new FContainerCargo({contId:r.get('id'),
								consId:p.get('id'),consNo:p.get('consNo'),cargId:a[i].get('id'),
								consMblNo:p.get('consMblNo'),consHbl:p.get('consHbl'),consCustName:'',
								cocaMarks:a[i].get('cargMarks'),cocaCargoName:a[i].get('cargNameEn'),packId:a[i].get('packId'),
								packName:getPACK(a[i].get('packId')),cocaPackageNum:a[i].get('cargPackageNum'),
								cocaGrossWeight:a[i].get('cargGrossWeight'),cocaMeasurement:a[i].get('cargMeasurement'),
								compCode:'',verson:0,uuid:HTUtil.UUID(32)});
							this.cargoStore.add(t);t.set('rowAction','N');
							this.cargoGrid.getStore().add(t);								
							if(a[i].get('cargReeterFlag')) r.set('cargTemperature',a[i].get('cargTemperature'));
							if(a[i].get('cargDanagerFlag')){
								r.set('cargDanagerClass',a[i].get('cargDanagerClass'));
								r.set('cargUnNo',a[i].get('cargUnNo'));
								r.set('cargImdgPage',a[i].get('cargImdgPage'));
								r.set('cargFlashPoint',a[i].get('cargFlashPoint'));
							}								
						}
					}
					this.calContainer();
					this.reCalculate();
				}
				win.close();
			}},this);
			win.addButton({text:C_CANCEL,handler : function(){win.close();}},this);
			win.show();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.removeCargo=function(){
		var r = this.cargoGrid.getSelectionModel().getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');				
				this.cargoGrid.getStore().remove(r[i]);
			};
			this.calContainer();
			this.reCalculate();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.cargoGrid = new Ext.grid.EditorGridPanel({title:C_CONT_SHIP_LIST,border:true,autoScroll:true,sm:sm2,cm:cm2,
		store:new Ext.data.Store({reader:new Ext.data.XmlReader({id:'id',record:'FContainerCargo'},FContainerCargo),sortInfo:{field:'id',direction:'ASC'}}),
		listeners:{scope:this,afteredit:function(e){
    		var f=e.field;
    		if(f=='cocaPackageNum'||f=='cocaGrossWeight'||f=='cocaMeasurement'){
    			this.calContainer();this.reCalculate();}}},
		tbar:[
			{text:C_ADD+'(A)',iconCls:'add',scope:this,handler:this.addCargo},'-',
		{text:C_REMOVE+'(D)',iconCls:'remove',scope:this,handler:this.removeCargo},'-'
	]});
	this.addCont = function(){
		var c = new FContainer({consId:p.get('id'),consNo:p.get('consNo'),contPreFlag:'N',contPartOfFlag:'N',
		consMblNo:p.get('consMblNo'),consHblNo:p.get('consHblNo'),contMConsId:p.get('consId'),contNum:1,
		contVessel:p.get('vessName'),contVoyage:p.get('voyaName'),contPol:p.get('consPolEn'),contPod:p.get('consPodEn'),contDeliveryPlace:p.get('consDeliveryPlace'),
		contMConsNo:p.get('consNo'),contMMblNo:p.get('consMblNo'),contHBlNo:p.get('consHblNo'),
		contNo:'',contSealNo:'',cotyId:'',contFl:'FCL',packId:'',contPackageNum:'',
		contCargoNameEn:'',contGrossWeight:'',contMeasurement:'',contSocFlag:'0',contLoadDate:new Date(),
		contRemarks:'',version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
       	this.store.insert(0,c);
       	this.grid.getSelectionModel().selectFirstRow();
       	this.grid.startEditing(0,1);
	};
	this.removeCont=function(){
    	var b =this.grid.getSelectionModel().getSelected();
		if(b){
    		b.set('rowAction',b.get('rowAction')=='N'?'D':'R');
    		this.store.remove(b);
    		var s = this.cargoGrid.getStore();
			var a = s.getRange();
			for(var i=0;i<a.length;i++){
				a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
				this.cargoStore.remove(a[i]);s.remove(a[i]);
			}
			this.reCalculate();
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.save=function(){
		this.grid.stopEditing();
		this.cargoGrid.stopEditing();
		var a =this.store.getModifiedRecords();
		if(a.length){
			var xml = HTUtil.ATX(a,'FContainer',FContainer);
			var cc=HTUtil.getDirty(this.cargoStore);
			if(cc.length>0){
				var x = HTUtil.ATX(cc,'FContainerCargo',FContainerCargo);
				xml=xml+x;
			};		
			if(xml!=''){
			 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CONT_S'},
				success: function(res){				
					var a = HTUtil.XTRA(res.responseXML,'FContainerCargo',FContainerCargo);
					HTUtil.RUA(this.cargoStore,a,FContainerCargo);
					var b = HTUtil.XTRA(res.responseXML,'FContainer',FContainer);
					HTUtil.RUA(this.store,b,FContainer);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
			}
		}
		else XMG.alert(SYS,M_NC);
	};
	this.expExcel=function(){
		var b = this.grid.getSelectionModel().getSelected();
		if(b){
			b.beginEdit();
			this.getForm().updateRecord(b);
			b.endEdit();
			if(b.dirty){
				XMG.alert(SYS,M_DIRTY_PROMPT);
				return;
			}
			else EXPC('CONT','&id='+b.get('id'));
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.expEmail=function(){		
		var b =this.grid.getSelectionModel().getSelected();
		if(b){
			var to=p.get('custEmail');
			var cc='',sub='',msg='';
			EXPM(to,cc,sub,msg,'CONT','id='+b.get('id'));
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_CONT;
	var menu=CREATE_E_MENU(C_CONT_BILL,this.expExcel,this.expEmail,function(){},this);
	
	Fos.ContainerTab.superclass.constructor.call(this, {
	id:'C_CONT',title:C_CONT,border:true,autoScroll:true,header:false,deferredRender:false,autoScroll:true,	
	labelAlign:'right',labelWidth:80,layout:'border',
    tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.addCont},'-',
		{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeCont}, '-', 
		{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save},'-',
		{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,menu:{items:[menu]}},'->',
		{xtype:'tbtext',text:C_SUM_PACK},totalPackages,'-',
		{xtype:'tbtext',text:C_SUM_GW},totalGrossWeight,'-',
		{xtype:'tbtext',text:C_SUM_CBM},totalMeasurement],
	items: [{layout:'fit',region:'north',height:200,border:false,items:this.grid},
		{layout:'fit',region:'center',border:false,items:this.cargoGrid}]});
};
Ext.extend(Fos.ContainerTab, Ext.FormPanel);

Fos.NumWin = function(T) {
    var frm = new Ext.form.FormPanel({labelWidth:100,bodyStyle:'padding:5px',items:[
        {fieldLabel:T,id:'NUM',xtype:'numberfield',anchor:'95%'}]
    });
    Fos.NumWin.superclass.constructor.call(this, {title:SYS,modal:true,width:300,
        height:100,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm});
};
Ext.extend(Fos.NumWin,Ext.Window);

Fos.BLTab = function(p){
	this.store = new Ext.data.GroupingStore({url: SERVICE_URL+'?_A=BL_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FBl'}, FBl),remoteSort:true,
    	sortInfo:{field:'id', direction:'DESC'}});	
	this.store.load({params:{_mt:'json',consId:p.get('id')}});
	
	var showBlWin = function(b,store){
		if(p.get('consBizType')==BT_A){
			var win = new Fos.AirBlWin(p,b,store);
			win.show();
		}
		else{
			var win = new Fos.BlWin(p,b,store);		
			win.show();
		}
	};
	
    this.edit=function(){
    	var b = sm.getSelected();
    	if(b){
			showBlWin(b,this.store);
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	var re = {scope:this,
		rowdblclick: function(grid, rowIndex, event){
			var b=grid.getSelectionModel().getSelected();
			if(p.get('consBizType')==BT_A){
				var win = new Fos.AirBlWin(p,b,this.store);   	
				win.show();
			}else{
				var win = new Fos.BlWin(p,b,this.store);   	
				win.show();
			}
		}
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this}); 
	var mf =CHKCLM(C_BL_MERGE,'blMergeFlag');
	var sf =CHKCLM(C_BL_SPLIT,'blSplitFlag');
	var maf =CHKCLM(C_BL_MASTER,'blMasterFlag');
	var cm=new Ext.grid.ColumnModel({columns:[sm,maf,mf,sf,
	{header:C_BL_TYPE,dataIndex:'blType',width:40},
	{header:C_H_CONS_NO,dataIndex:'blNo'},
	{header:C_M_CONS_NO,dataIndex:'blMBlNo'},
	{header:C_CONS_NO,dataIndex:'consNo'},
	{header:C_CONTRACT_NO,dataIndex:'consTradeContractNo'},
	{header:C_BL_PACKAGES,width:80,dataIndex:"blCargoPackages",align:'right',render:rateRender,css:'font-weight:bold;'},
	{header:C_BL_GW,width:80,dataIndex:"blCargoGrossWeight",align:'right',renderer:rateRender,css:'font-weight:bold;'},
	{header:C_BL_CBM,width:80,dataIndex:"blCargoMeasurement",renderer:rateRender,align:'right',css:'font-weight:bold;'},
	{header:C_ISTY,dataIndex:'istyId',renderer:HTStore.getISTY},
	{header:C_ISSUE_PLACE,dataIndex:'blIssuePlace'},
	{header:C_ISSUE_DATE,dataIndex:'blIssueDate',renderer:formatDate},
	{header:C_DOC_ORI_NUM,dataIndex:'blOriginalNum'},
	{header:C_STATUS,dataIndex:'blStatus',renderer:HTStore.getBLST},
	{header:C_CREATE_BY,dataIndex:'createBy'},
	{header:C_BILL_DATE,dataIndex:'createTime',renderer:formatDateTime},
	{header:C_MODIFY_BY,dataIndex:'modifyBy'},
	{header:C_MODIFY_DATE,dataIndex:'modifyTime',renderer:formatDateTime}
	],defaults:{sortable:true,width:80}});	
	var newBl = function(t){
		var bl = new FBl({
		blNo:t=='HB/L'?p.get('consHblNo'):'',
		blMBlNo:p.get('consMblNo'),
		consId:p.get('id'),
		consNo:p.get('consNo'),
		blType:t,
		consMasterId:p.get('consMasterId'),
		consMasterNo:p.get('consMasterNo'),
		consBizClass:p.get('consBizClass'),
		consBizType:p.get('consBizType'),
		consShipType:p.get('consShipType'),
		consTradeContractNo:p.get('consTradeContractNo'),
		consChargeRemarks:p.get('consChargeRemarks'),
		custId:p.get('custId'),
		custName:p.get('custName'),		
		blShipper:t=='MB/L'?p.get('consShipper'):p.get('consFShipper'),
		blConsignee:t=='MB/L'?p.get('consConsignee'):p.get('consFConsignee'),
		blNotifyParty:'',
		blNotifyParty2:'',		
		blAccountingInfo:p.get('consNotifyParty'),
		blCarrier:p.get('consCarrier'),
		blCarrierName:"SHANGHAI U-INT'L FREIGHT FORWARDING CO.,LTD.",
		blVessel:p.get('vessName'),
		blVoyage:p.get('voyaName'),
		blPol:p.get('consPolCode'),
		blPod:p.get('consPodEn'),
		blPot:p.get('consPotEn'),
		blToFirst:p.get('consPodCode'),
		blByFirst:p.get('consCarrierCode'),
		blToSecond:p.get('consPotCode'),
		blLoadDate:p.get('consShipDate'),
		blEtd:p.get('consSailDate'),
		blEta:p.get('consEta'),
		blReceiptPlace:p.get('consReceiptPlace'),
		blDeliveryPlace:p.get('consDeliveryPlace'),
		blContainersNo:p.get('consContainersNo'),		
		blCargoDesc:p.get('consCargoDesc'),
		blTotalSay:'SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+'ONLY',
		blCargoMarks:p.get('consCargoMarks'),
		packName:p.get('packName'),
		unitName:p.get('unitCode'),
		blCargoGrossWeight:t=='MB/L'?p.get('consTotalGrossWeight'):p.get('consTotalGrossWeightCustomer'),
		blCargoNetWeigth:p.get('consTotalNetWeight'),
		blCargoMeasurement:t=='MB/L'?p.get('consTotalMeasurement'):p.get('consTotalMeasurementCustomer'),
		blChargeWeight:t=='MB/L'?p.get('consChargeWeightCarrier'):p.get('consChargeWeightCustomer'),
		blCargoPackages:p.get('consTotalPackages'),
		blTotalCharge:'AS ARRAGED',
		blPaymentTerm:p.get('pateCode'),
		blPaidAt:p.get('consPaidAt'),
		blTransTerm:p.get('tranCode'),
		blContainersInfo:p.get('consContainerInfo'),
		blOriginalNum:HTUtil.N2EW(p.get('consOriginalBlNum')),
		istyId:p.get('istyId'),
		blAmountInsurance:'NIL',
		blDvCarriage:'N.V.D',
		blDvCustoms:'AS PER INV',
		blValuePayment:'PP',
		blOtherPayment:'PP',
		currCode:'CNY',
		blRemarks:'AS ARRANGED',
		blIssuePlace:p.get('consPolCode'),
		blIssueDate:p.get('consSailDate'),
		blContainersInfo:p.get('consContainersInfo'),
		blMergeFlag:0,
		blSplitFlag:0,
		blMasterFlag:1,		
		blStatus:'1',
		version:'0',
		rowAction:'N',
		uuid:HTUtil.UUID(32)});
		return bl;
	};
	
	var newMarineBl = function(t){
		var bl = new FBl({
		blNo:t=='HB/L'?p.get('consHblNo'):'',
		blMBlNo:p.get('consMblNo'),
		consId:p.get('id'),
		consNo:p.get('consNo'),
		blType:t,
		consMasterId:p.get('consMasterId'),
		consMasterNo:p.get('consMasterNo'),
		consBizClass:p.get('consBizClass'),
		consBizType:p.get('consBizType'),
		consShipType:p.get('consShipType'),
		custId:p.get('custId'),
		custName:p.get('custName'),		
		blShipper:p.get('consShipper'),
		blConsignee:p.get('consConsignee'),
		blNotifyParty:'',
		blNotifyParty2:'',		
		blCarrier:p.get('consCarrier'),
		blCarrierName:"",
		blVessel:p.get('vessName'),
		blVoyage:p.get('voyaName'),
		blPol:p.get('consPolCode'),
		blPod:p.get('consPodEn'),
		blPot:p.get('consPotEn'),
		blLoadDate:p.get('consShipDate'),
		blEtd:p.get('consSailDate'),
		blEta:p.get('consEta'),
		blReceiptPlace:p.get('consReceiptPlace'),
		blDeliveryPlace:p.get('consDeliveryPlace'),
		blContainersNo:p.get('consContainersNo'),		
		blCargoDesc:p.get('consCargoDesc'),
		blTotalSay:'SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+'ONLY',
		blCargoMarks:p.get('consCargoMarks'),
		packName:p.get('packName'),
		unitName:p.get('unitCode'),
		blCargoGrossWeight:p.get('consTotalGrossWeight'),
		blCargoNetWeigth:p.get('consTotalNetWeight'),
		blCargoMeasurement:p.get('consTotalMeasurement'),
		blChargeWeight:p.get('consChargeWeightCarrier'),
		blCargoPackages:p.get('consTotalPackages'),
		blPaymentTerm:p.get('pateCode'),
		blPaidAt:p.get('consPaidAt'),
		blTransTerm:p.get('tranCode'),
		blContainersInfo:p.get('consContainerInfo'),
		istyId:p.get('istyId'),
		currCode:'CNY',
		blRemarks:'AS ARRANGED',
		blIssuePlace:p.get('consPolCode'),
		blIssueDate:p.get('consSailDate'),
		blContainersInfo:p.get('consContainersInfo'),
		blMergeFlag:0,
		blSplitFlag:0,
		blMasterFlag:1,		
		blStatus:'1',
		version:'0',
		rowAction:'N',
		uuid:HTUtil.UUID(32)});
		return bl;
	};
	var reloadCons=function(){
		var sc = new Ext.data.Store({url: SERVICE_URL+'?_A='+'CONS_Q',
		reader: new Ext.data.XmlReader({record:'FConsign'}, FConsign)});					
		sc.load({params:{consId:p.get('consId')},callback:function(r,o,s){
			if(s&&r.length>0){
				var c=r[0];
				p.beginEdit();
				p.set('blCargoPackages',c.get('blCargoPackages'));
				p.set('blCargoGrossWeight',c.get('blCargoGrossWeight'));
				p.set('blCargoNetWeight',c.get('blCargoNetWeight'));
				p.set('blCargoMeasurement',c.get('blCargoMeasurement'));
				p.set('version',c.get('version'));	
				p.endEdit();
				var t=Ext.getCmp('T_CONS_'+p.get("id"));
				t.find('name','blCargoPackages')[0].setValue(p.get('blCargoPackages'));
				t.find('name','blCargoGrossWeight')[0].setValue(p.get('blCargoGrossWeight'));
				t.find('name','blCargoNetWeight')[0].setValue(p.get('blCargoNetWeight'));
				t.find('name','blCargoMeasurement')[0].setValue(p.get('blCargoMeasurement'));
				XMG.alert(SYS,M_S);
			}
		},scope:this});
	};
	this.addMBl = function(){
		var b = newBl('MB/L');
		var mb =  newMarineBl('MB/L');
		showBlWin(p.get('consBizType')=='A'?b:mb,this.store);
	};
	this.addHBl = function(t){
		var b = newBl('HB/L');
		var mb =  newMarineBl('HB/L');
		showBlWin(p.get('consBizType')=='A'?b:mb,this.store);
	};
	this.merge=function(){
		var a=sm.getSelections();
		if(a.length<2){XMG.alert(SYS,M_NOT_LT_TWO_BL);return;}
		for(var i=0;i<a.length;i++){
			if(a[i].get('blMergeFlag')==1){
				XMG.alert(SYS,M_BL_MERGED);
				return;
			}
		}		
		var xml=HTUtil.ATX(a,'FBl',FBl);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BL_M'},
			success: function(res){
					this.store.reload({params:{_mt:'json',consId:p.get('id')}});
				reloadCons();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){XMG.alert(SYS,M_F+res.responseText);},
			xmlData:HTUtil.HTX(xml)});
	};
	this.cancelMerge=function(){
		var r=sm.getSelected();
		if(r.get('blMergeFlag')!=1||r.get('blMasterFlag')!=1){
			XMG.alert(SYS,M_SEL_BL_MERGED);
			return;
		}
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'BL_M_C',blId:r.get('id')},
			success: function(res){
					this.store.reload({params:{_mt:'json',consId:p.get('id')}});
				reloadCons();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);}});
	};
	this.split=function(){
		var r=sm.getSelected();
		if(r.get('blMergeFlag')==1||r.get('blSplitFlag')==1){
			XMG.alert(SYS,M_BL_MERGED);
			return;
		}
		var w = new Fos.NumWin(C_SPLIT_NUM);			
		w.addButton({text:C_OK},function(){
			n = w.findById('NUM').getValue();
			var a=[];
			for(var i=0;i<n;i++){
				var bl=r.copy();
				bl.set('id','');
				bl.set('blSplitFlag',1);
				bl.set('blMBlId',r.get('id'));
				bl.set('blMBlNo',r.get('blMBlNo'));
				bl.set('blMasterFlag',0);
				bl.set('blNo',r.get('blNo')+'-'+(i+1));
				bl.set('rowAction','N');
				bl.set('uuid',HTUtil.UUID(32));
				if(i>0){
					bl.set('blPackages','');
					bl.set('blGrossWeight','');
					bl.set('blNetWeight','');
					bl.set('blMeasurement','');
					bl.set('cargPackages','');
					bl.set('cargGrossWeight','');
					bl.set('cargNetWeight','');
					bl.set('cargMeasurement','');
				}
				a[i]=bl;
			}
			r.set('blSplitFlag',1);
			r.set('blMasterFlag',1);
			r.set('blMBlId',r.get('id'));
			r.set('blMBlNo',r.get('blMBlNo'));
			a[a.length]=r;
			var xml=HTUtil.ATX(a,'FBl',FBl);
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BL_S'},
			success: function(res){
					this.store.reload({params:{_mt:'json',consId:p.get('id')}});
				reloadCons();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){XMG.alert(SYS,M_F+res.responseText);},
			xmlData:HTUtil.HTX(xml)});
			w.close();
		},this);
		w.addButton({text:C_CANCEL},function(){w.close();},this);
		w.show();
	};
	this.cancelSplit=function(){
		var r=sm.getSelected();
		if(r.get('blSplitFlag')!=1||r.get('blMasterFlag')!=1){XMG.alert(SYS,M_SEL_BL_SPLIT);return;}
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BL_SP_C',blId:r.get('id')},
			success: function(res){
					this.store.reload({params:{_mt:'json',consId:p.get('id')}});
				reloadCons();
				XMG.alert(SYS,M_S);
			},
			failure: function(res){XMG.alert(SYS,M_F+res.responseText);}});
	};
	this.addBlByCargo = function(t,c){
		var bl = newBl(t);
		this.store.insert(0,bl);
		bl.set('blNo','');		
		bl.set('blCargoMarks',c.get('cargMarks'));
		bl.set('blPackages',''+c.get('cargPackageNum')+c.get('packName'));
		bl.set('blMeasurement',''+c.get('cargMeasurement')+'CBM');
		bl.set('blGrossWeight',''+c.get('cargGrossWeight')+(p.get('consBizType')=='C'?'KGS':'MT'));
		bl.set('cargPackages',c.get('cargPackageNum'));
		bl.set('cargGrossWeight',c.get('cargGrossWeight'));
		bl.set('cargMeasurement',c.get('cargMeasurement'));
		bl.set('cargNetWeight',c.get('cargNetWeight'));
		bl.set('unitId',c.get('unitId'));
		bl.set('unitName',c.get('unitName'));
		bl.set('packId',c.get('packId'));
		bl.set('packName',c.get('packName'));
		bl.set('rowAction','N');
		bl.set('uuid',HTUtil.UUID(32));
		bl.set('blTotalSay','SAY TOTAL '+HTUtil.N2EW(c.get('cargPackageNum'))+' '+c.get('packName')+'ONLY');
		showBlWin(bl,store);
	};
	this.removeBl = function(){
		var a =sm.getSelections();
       	if(a.length){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var b = false;
               	for(var i=0;i<a.length;i++){
               		if(a[i].get('blStatus')!=1){
               			b=true;
               			break;
               		}
               	}
               	if(b) 
               		XMG.alert(SYS,M_BL_CONFIRMED);
               	else {
               		var xml = HTUtil.SMTX4R(sm,'FBl','blId');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,params:{_A:'BL_S'},
					success: function(){
						sm.each(function(R){
							this.store.remove(R);},this);
						reloadCons();
						XMG.alert(SYS,M_S);
					},
					failure: function(r,o){
						XMG.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
               	}
           }},this);
		}
       	else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};	
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_BL;
	
	Fos.BLTab.superclass.constructor.call(this, {
	itemId:'C_BL',title:C_BL,header:false,autoScroll:true,listeners:re,
	labelAlign:'right',labelWidth:70,border:true,store:this.store,sm:sm,cm:cm,
	tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M)||p.get('rowAction')=='N',scope:this,
		   	menu: new Ext.menu.Menu({items: [
		   		{text:p.get('consBizType')==BT_A?'MAWB(M)':'MB/L(N)',scope:this,handler:this.addMBl},
		   		{text:p.get('consBizType')==BT_A?'HAWB(H)':'HB/L(H)',scope:this,handler:this.addHBl}]})
			},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeBl},'-',
			{text:C_EDIT,iconCls:'option',disabled:NR(m+F_M),scope:this,handler:this.edit},'-',
			{text:C_BL_MERGE,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.merge},'-',
			{text:C_BL_MERGE_C,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.cancelMerge},'-',
			{text:C_BL_SPLIT,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.split},'-',
			{text:C_BL_SPLIT_C,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.cancelSplit},'-'
		   	]});
};
Ext.extend(Fos.BLTab, Ext.grid.GridPanel);

Fos.BlWin = function(p,b,store) {
	this.copyFrom=function(){		
		XMG.prompt(SYS,C_BL_NO,function(btn,v){
			if(btn=='ok'){
				var sc = new Ext.data.Store({url: SERVICE_URL+'?_A='+'BL_Q',
					reader: new Ext.data.XmlReader({record:'FBl'}, FBl)});
				sc.load({params:{blNo:v},callback:function(r,o,s){
					if(s&&r.length>0){
						var c=r[0];
						b.beginEdit();
						var f = FBl.prototype.fields;
						for (var i = 0; i < f.keys.length; i++) {
							var fn = ''+f.keys[i];
							if(fn=='id'||fn=='blNo'||fn=='consId'||fn=='consNo'||fn=='version'
								||fn=='consBizClass'||fn=='consBizType'||fn=='consShipType'
								||fn=='consTradeContractNo'||fn=='consChargeRemarks'||fn=='custId'
								||fn=='custName'||fn=='blStatus'||fn=='removed'){}
							else b.set(fn,c.get(fn));
						};
						b.endEdit();
						this.getForm().loadRecord(b);
					}    						
				},scope:this});
			}
		},this);
    };
	this.save = function(){			
		if(this.find('name','blNo')[0].getValue()==''){
			XMG.alert(SYS,M_BL_REQUIRED,function(){this.find('name','blNo')[0].focus();},this);
			return;
		};		
		//this.frm.getForm().updateRecord(b);
		
		var f = FBl.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		b.set(fn,fc[0].getValue());
        	}
   	 	}
		
		var xml = HTUtil.RTX(b,'FBl',FBl);
		
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BL_S'},
			success: function(res){				
				var c = HTUtil.XTR(res.responseXML,'FBl',FBl);
				var f = FBl.prototype.fields;
				var ac = b.get('rowAction');
				b.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					b.set(fn,c.get(fn));
   				};   				
				b.set('rowAction','M');
				b.endEdit();
				if(ac=='N'){
					store.add(b);
				}
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)});
	};
	this.check = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'2',blType:b.get('blType')},
		success: function(r){
			b.set('blStatus','2');
			XMG.alert(SYS,M_S);
		},
		failure: function(r){
			XMG.alert(SYS,M_F+r.responseText);
		}		
		});
	};
	this.uncheck = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'1',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','1');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}});
	};
	this.printOffical = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'3',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','3');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	this.release = function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'BL_U',id:b.get('id'),consId:p.get('id'),blStatus:'5',blType:b.get('blType')},
			success: function(r){
				b.set('blStatus','5');
				XMG.alert(SYS,M_S);
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};	
	this.expExcel=function(){
		EXPC('BL','&id='+b.get('id'));
	};
	this.expEmail=function(){
		var to='',cc='',sub='',msg='';
		EXPM(to,cc,sub,msg,'BL','id='+b.get('id'));
	};		
	this.genCons = function(){EXPC('CONS_B_BL','&id='+b.get('id'));};
	var t2={layout:'column',title:C_BL_INFO,layoutConfig: {columns:4},deferredRender:false,frame:true,
			items: [{columnWidth:.25,layout:'form',labelWidth:80,border : false,items:[
				{fieldLabel:C_BL_NO,name:'blNo',itemCls:'required',tabIndex:1,
					value:b.get('blNo'),xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CARRIER,name:'blCarrierName',value:b.get('blCarrierName'),tabIndex:5,
						store:HTStore.getCS(),enableKeyEvents:true,
					tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
					xtype:'customerLookup',custType:'custCarrierFlag',bizType:'M',
					displayField:'custCode',valueField:'custCode',typeAhead: true,
					mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
					blur:function(f){
						if(f.getRawValue()==''){
							f.clearValue();
							b.set('blCarrier','');
						}
					},
					select:function(c,r,i){
						b.set('blCarrier',r.get('id'));
						this.find('name','blCarrierName')[0].setValue(r.get('custNameCn'));

					},
					keydown:{fn:function(f,e){
						loadCustomer(f,e,'custCarrierFlag','M',1);
					},buffer:BF}}},
                {fieldLabel:C_RECEIPT_PLACE,name:'blReceiptPlace',value:b.get('blReceiptPlace'),tabIndex:9,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_POT,name:'blPot',value:b.get('blPot'),tabIndex:13,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_PACKAGES,name:'blCargoPackages',value:b.get('blCargoPackages'),tabIndex:17,xtype:'numberfield',anchor:'95%',
					listeners:{scope:this,change:function(f,nv,ov){
						b.set('blPackages',''+nv+b.get('packName'));
						this.find('name','blPackages')[0].setValue(b.get('blPackages'));
						b.set('blTotalSay','SAY TOTAL '+HTUtil.N2EW(nv)+' '+b.get('packName')+' ONLY');
						this.find('name','blTotalSay')[0].setValue(b.get('blTotalSay'));
					}}
				}
				]},
			{columnWidth:.25,layout:'form',labelWidth:80,border : false,items:[
				{fieldLabel:C_PRECARRIAGE,name:'blPrecarriage',value:b.get('blPrecarriage'),tabIndex:2,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_VESS,name:'blVessel',value:b.get('blVessel'),tabIndex:6,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_POL,name:'blPol',value:b.get('blPol'),tabIndex:10,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_BL_SHIP_DATE,name:'blLoadDate',value:b.get('blLoadDate'),tabIndex:14,xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_PACK,tabIndex:18,name:'packName',value:b.get('packName'),xtype:'combo',
                	store:HTStore.getPACK_S(),displayField:'packName',valueField:'packName',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,select:function(c,r,i){
						b.set('blTotalSay','SAY TOTAL '+HTUtil.N2EW(b.get('blPackages'))+' '+r.get('packName')+' ONLY');
						this.find('name','blTotalSay')[0].setValue(b.get('blTotalSay'));
						}}}]},
			{columnWidth:.25,layout:'form',labelWidth:80,border : false,items:[
            	{fieldLabel:C_BL_PATE,name:'blPaymentTerm',value:b.get('blPaymentTerm'),tabIndex:3,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_VOYA,name:'blVoyage',value:b.get('blVoyage'),tabIndex:7,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_POD,name:'blPod',value:b.get('blPod'),tabIndex:11,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_SAIL_DATE,name:'blEtd',value:b.get('blEtd'),tabIndex:15,xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_GROSS_WEIGHT,name:'blCargoGrossWeight',value:b.get('blCargoGrossWeight'),tabIndex:19,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%',
                	listeners:{scope:this,change:function(f,nv,ov){
						b.set('blGrossWeight',''+nv+(p.get('consBizType')=='C'?'KGS':'MT'));
						this.find('name','blGrossWeight')[0].setValue(b.get('blGrossWeight'));
					}}
                }]},
			{columnWidth:.25,layout:'form',labelWidth:90,border : false,items:[
                {fieldLabel:C_PAID_AT,name:'blPaidAt',value:b.get('blPaidAt'),tabIndex:4,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_TTER,name:'blTransTerm',value:b.get('blTransTerm'),tabIndex:8,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_DELIVERY_STATION,name:'blDeliveryPlace',value:b.get('blDeliveryPlace'),tabIndex:12,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_ETA,name:'blEta',value:b.get('blEta'),tabIndex:16,xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_CBM,name:'blCargoMeasurement',value:b.get('blCargoMeasurement'),tabIndex:19,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%',
                	listeners:{scope:this,change:function(f,nv,ov){
						b.set('blMeasurement',''+nv+('CBM'));
						this.find('name','blMeasurement')[0].setValue(b.get('blMeasurement'));
					}}
                }]},
            {columnWidth:.5,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_SHIPPER,name:'blShipper',value:b.get('blShipper'),tabIndex:17,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',
                items:[{fieldLabel:C_CONSIGNEE,name:'blConsignee',value:b.get('blConsignee'),tabIndex:18,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_NOTIFIER,name:'blNotifyParty',value:b.get('blNotifyParty'),tabIndex:19,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.5,layout: 'form',border : false,labelAlign:'top',
                items: [{fieldLabel:C_OVERSEA_AGENCY,name:'blOverseaAgency',value:b.get('blOverseaAgency'),tabIndex:20,xtype:'textarea',height:100,anchor:'95%'}]},			
			{columnWidth:.3,layout: 'form',border :false,labelAlign:'top',
                items: [{fieldLabel:C_MARKS,name:'blCargoMarks',value:b.get('blCargoMarks'),tabIndex:21,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.1,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_NUM_PACK,name:'blPackages',value:b.get('blPackages'),tabIndex:22,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.4,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_CATY,name:'blCargoDesc',value:b.get('blCargoDesc'),tabIndex:23,xtype:'textarea',height:100,anchor:'95%'}]},
			{columnWidth:.1,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_GROSS_WEIGHT,name:'blGrossWeight',value:b.get('blGrossWeight'),tabIndex:24,xtype:'textarea',height:100,anchor:'95%'}]},
            {columnWidth:.1,layout: 'form',border : false,labelAlign:'top',
                items: [{fieldLabel:C_CBM,name:'blMeasurement',value:b.get('blMeasurement'),tabIndex:25,xtype:'textarea',height:100,anchor:'95%'}]},
            {columnWidth:.5,layout: 'form',labelAlign: 'left',labelWidth:100,border : false,
                items: [{fieldLabel:C_TOTAL_SAY,name:'blTotalSay',value:b.get('blTotalSay'),tabIndex:26,xtype:'textfield',anchor:'95%'}]},
            {columnWidth:.5,layout: 'form',labelAlign: 'left',labelWidth:80,border : false,
                items: [{fieldLabel:C_CONT_INFO,name:'blContainersInfo',value:b.get('blContainersInfo'),tabIndex:13,xtype:'textfield',anchor:'95%'}]}
            ]};
            
		
	var t3={layout:'form',title:C_ISSUE_INFO,frame:true,
		items: [
			{fieldLabel:C_ISTY,name:'istyId',value:b.get('istyId'),
				store:HTStore.ISTY_S,tabIndex:50,xtype:'combo',displayField:'NAME',
				valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'30%'},
				{fieldLabel:C_ISSUE_DATE,name:'blIssueDate',value:b.get('blIssueDate'),tabIndex:53,xtype:'datefield',format:DATEF,anchor:'30%'},
				{fieldLabel:C_DOC_ORI_NUM,name:'blOriginalNum',value:b.get('blOriginalNum'),tabIndex:54,xtype:'textfield',anchor:'30%'},
			{fieldLabel:C_ISSUE_BY,name:'blIssueBy',value:b.get('blIssueBy'),tabIndex:51,xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_ISSUE_PLACE,name:'blIssuePlace',value:b.get('blIssuePlace'),tabIndex:52,xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_THIRD_PLACE,name:'blThirdPlaceFlag',value:b.get('blThirdPlaceFlag'),xtype:'checkbox',labelSeparator:'',anchor:'95%'},
			{fieldLabel:C_ADVANCED_FLAG,name:'blAdvancedFlag',value:b.get('blAdvancedFlag'),xtype:'checkbox',labelSeparator:'',anchor:'95%'},
			{fieldLabel:C_BL_BACK_FLAG,name:'blBackFlag',value:b.get('blBackFlag'),xtype:'checkbox',labelSeparator:'',anchor:'95%'},
			{fieldLabel:C_CLEAN_FLAG,name:'blCleanFlag',value:b.get('blCleanFlag'),xtype:'checkbox',labelSeparator:'',anchor:'95%'},
			{fieldLabel:C_REMARKS,name:'blRemarks',value:b.get('blRemarks'),tabIndex:55,xtype:'textarea',anchor:'95%'}
	]};			
	var t4={layout:'column',title:C_BASE_INFO,layoutConfig: {columns:4},bodyStyle:'padding:2px 2px 2px',deferredRender:false,collapsible:true,
			items: [
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',items: [
				{fieldLabel:"Shipper's Name and Address",name:'blShipper',value:b.get('blShipper'),tabIndex:1,xtype:'textarea',height:100,anchor:'95%'},
				{fieldLabel:"Consignee's Name and Address",name:'blConsignee',value:b.get('blConsignee'),tabIndex:2,xtype:'textarea',height:100,anchor:'95%'},
				{fieldLabel:"Issuing Carrier's Agent Name",name:'blNotifyParty',value:b.get('blNotifyParty'),tabIndex:3,xtype:'textarea',height:100,anchor:'95%'}
			]},
			{columnWidth:.5,layout:'form',border:false,labelAlign:'top',items: [                
                {fieldLabel:"Accounting Information",name:'blAccountingInfo',value:b.get('blAccountingInfo'),tabIndex:4,xtype:'textarea',height:100,anchor:'95%'},
                {fieldLabel: 'Also Notify',name:'blNotifyParty2',value:b.get('blNotifyParty2'),tabIndex:5,xtype:'textarea',height:100,anchor:'95%'},            	
            	{layout:'column',layoutConfig: {columns:2},border:false,items: [
	            	{columnWidth:.5,layout:'form',border : false,labelAlign:'top',items:[
	            	{fieldLabel:'AWB No.',name:'blNo',value:b.get('blNo'),tabIndex:6,xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:"Agent IATA Code",name:'blAgentIataCode',value:b.get('blAgentIataCode'),tabIndex:8,xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:'Declared Value for Carriage',name:'blDvCarriage',value:b.get('blDvCarriage'),tabIndex:10,xtype:'textfield',anchor:'95%'}
		            ]},
		            {columnWidth:.5,layout:'form',border : false,labelAlign:'top',items:[
		            	{fieldLabel:'Air Port of Departure',name:'blPol',value:b.get('blPol'),tabIndex:7,xtype:'textfield',anchor:'95%'},
		            	{fieldLabel:'Account No.',name:'blAccountNo',value:b.get('blAccountNo'),tabIndex:9,xtype:'textfield',anchor:'95%'},            	
		            	{fieldLabel:'Declared Value for Customs',name:'blDvCustoms',value:b.get('blDvCustoms'),tabIndex:11,xtype:'textfield',anchor:'95%'}
		            ]}
            	]}
            ]},            
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'To',name:'blToFirst',value:b.get('blToFirst'),tabIndex:12,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'By First Carrier',name:'blByFirst',value:b.get('blByFirst'),tabIndex:13,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'To',name:'blToSecond',value:b.get('blToSecond'),tabIndex:14,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'By',name:'blBySecond',value:b.get('blBySecond'),tabIndex:15,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'To',name:'blToThird',value:b.get('blToThird'),tabIndex:16,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'By',name:'blByThird',value:b.get('blByThird'),tabIndex:17,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Currency',name:'currCode',value:b.get('currCode'),tabIndex:18,value:p.get('currCode'),
            	store:HTStore.getCURR_S(),xtype:'combo',displayField:'currCode',
            	valueField:'currCode',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Weight/VAL',name:'blWeightPayment',value:b.get('blWeightPayment'),tabIndex:19,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Other',name:'blOtherPayment',value:b.get('blOtherPayment'),tabIndex:20,xtype:'textfield',anchor:'80%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Air Port of Destination',name:'blPod',value:b.get('blPod'),tabIndex:21,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Flight',name:'blVoyage',value:b.get('blVoyage'),tabIndex:22,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Date',name:'blEtd',value:b.get('blEtd'),tabIndex:23,xtype:'datefield',format:DATEF,anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Amount of Insurance',name:'blAmountInsurance',value:b.get('blAmountInsurance'),tabIndex:24,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'T/S Remarks',name:'blTsRemarks',value:b.get('blTsRemarks'),tabIndex:25,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.99,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:"Handling information and Others",name:'blHandlingInfo',value:b.get('blHandlingInfo'),tabIndex:26,xtype:'textarea',height:100,anchor:'95%'}]}
          ]};
    var t5={layout:'column',title:C_CARGO_INFO,layoutConfig: {columns:4},deferredRender:false,collapsible:true,
			items: [
			 {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'No of Packages',name:'blPackages',value:b.get('blPackages'),tabIndex:27,xtype:'numberfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Gross Weight',name:'blGrossWeight',value:b.get('blGrossWeight'),tabIndex:28,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'}
            ]},            
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Rate Class',name:'blRateClass',value:b.get('blRateClass'),tabIndex:29,xtype:'textfield',anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Chargeable Weight',name:'blChargeWeight',value:b.get('blChargeWeight'),tabIndex:30,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'}
            ]},
            {columnWidth:.1,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Rate',name:'blChargeRate',value:b.get('blChargeRate'),tabIndex:31,xtype:'numberfield',allowDecimals:true,decimalPrecision:4,anchor:'95%'}
            ]},
            {columnWidth:.2,layout:'form',border : false,labelAlign:'top',items:[
            {fieldLabel:'Total',name:'blTotalCharge',value:b.get('blTotalCharge'),tabIndex:32,xtype:'numberfield',anchor:'95%'}
            ]},
			{columnWidth:.99,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:"Description of Goods",name:'blCargoDesc',value:b.get('blCargoDesc'),tabIndex:33,xtype:'textarea',height:100,anchor:'95%'}]}
			]};
	var t6={layout:'column',title:C_EXPE_INFO,layoutConfig: {columns:2},deferredRender:false,collapsible:true,
			items: [
			{columnWidth:.6,layout:'column',layoutConfig: {columns:2},labelWidth:180,border:false,items:[            	
            	{columnWidth:.7,layout:'form',border:false,items:[
            		{hideLabels:true,text:'Prepaid',xtype:'label',anchor:'95%'},
            		{fieldLabel:'Weight Charge',name:'blWeightChargePp',value:b.get('blWeightChargePp'),tabIndex:34,xtype:'numberfield',anchor:'95%'},
            		{fieldLabel:'Valuation Charge',name:'blValuationChargePp',value:b.get('blValuationChargePp'),tabIndex:36,xtype:'numberfield',anchor:'95%'},
            		{fieldLabel:'Tax',name:'blTaxPp',value:b.get('blTaxPp'),tabIndex:38,xtype:'numberfield',anchor:'95%'},
            		{fieldLabel:'Total Other Charges Due Agent',name:'blOtherDaPp',value:b.get('blOtherDaPp'),tabIndex:40,xtype:'numberfield',anchor:'95%'},
            		{fieldLabel:'Total Other Charges Due Carrier',name:'blOtherDcPp',value:b.get('blOtherDcPp'),tabIndex:42,xtype:'numberfield',anchor:'95%'},
            		{fieldLabel:'Total',name:'blTotalPp',value:b.get('blTotalPp'),tabIndex:44,xtype:'numberfield',anchor:'95%'}]},
            	{columnWidth:.3,layout:'form',border:false,hideLabels:true,items:[
            		{text:'Collect:',xtype:'label',anchor:'95%'},
            		{name:'blWeightChargeCc',value:b.get('blWeightChargeCc'),tabIndex:35,xtype:'numberfield',anchor:'95%'},
            		{name:'blValuationChargeCc',value:b.get('blValuationChargeCc'),tabIndex:37,xtype:'numberfield',anchor:'95%'},
            		{name:'blTaxCc',value:b.get('blTaxCc'),tabIndex:39,xtype:'numberfield',anchor:'95%'},
            		{name:'blOtherDaCc',value:b.get('blOtherDaCc'),tabIndex:41,xtype:'numberfield',anchor:'95%'},
            		{name:'blOtherDcCc',value:b.get('blOtherDcCc'),tabIndex:43,xtype:'numberfield',anchor:'95%'},
            		{name:'blTotalCc',value:b.get('blTotalCc'),tabIndex:45,xtype:'numberfield',anchor:'95%'}]}            		
            ]},           
			{columnWidth:.4,layout:'form',border:false,labelAlign:'top',
                items: [{fieldLabel:"Other Charges",name:'consChargeRemarks',value:b.get('consChargeRemarks'),tabIndex:46,xtype:'textarea',height:100,anchor:'95%'}]}
			]};
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_BL;
	this.frm = new Ext.form.FormPanel({labelWidth:80,height:600,autoScroll:true,		
            items:{xtype:'tabpanel',plain:true,activeTab:0,height:600,
            	items:p.get('consBizType')==BT_A?[t4,t5,t6,t3]:[t2,t3]}
    });
    Fos.BlWin.superclass.constructor.call(this, {title:b.get('blNo')==''?C_NEW_BL:C_BL+'-'+b.get('blNo'),modal:true,
    	width:C_DEFAULT_WW,height:C_DEFAULT_WH,autoScroll:true,maximizable:true,layout:'fit',
        plain:false,items:this.frm,
        tbar:[
  			{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save},'-',
  			{text:C_CONFIRM,iconCls:'check',disabled:NR(m+F_M),scope:this,handler:this.check},'-',
  			{text:C_CANCEL_CONFIRM,iconCls:'renew',disabled:NR(m+F_M),scope:this,handler:this.uncheck},'-',
  			{text:C_PRINT_OFFICIAL,disabled:NR(m+F_M),iconCls:'star',scope:this,handler:this.printOffical},'-',
  			{text:C_BL_RELEASE,iconCls:'release',scope:this,handler:this.release},'-',
  			{text:C_COPY_FROM,iconCls:'copy',disabled:NR(m+F_M),scope:this,handler:this.copyFrom},'-',			
  			{text:C_EXPORT,iconCls:'print',disabled:NR(m+F_M),scope:this,
  				menu: {items: [
  		   		{text:C_BL_CONFIRM,menu:{items:[
  		   			{text:'Excel',scope:this,handler:this.expExcel},
  		   			{text:C_EMAIL,scope:this,handler:this.expEmail},
  		   			{text:C_FAX,scope:this,handler:function(){}}]}},
  		   		{text:M_BOOK,scope:this,handler:this.genCons}
  		   		]}},'->'
  		   	]});
};
Ext.extend(Fos.BlWin, Ext.Window);

Fos.RailwayBlTab = function(p) {		
	this.sel = -1000;
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'RABL_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FRailwayBl',id:'id'},FRailwayBl),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	if(p.get('rowAction')!='N') this.store.load({params:{consId:p.get('id')}});
	var re = {scope:this,
		rowselect:function(sm,row,record){
			if(this.sel!=record.get('id')){
				this.sel=record.get('id');this.getForm().reset();this.getForm().loadRecord(record);}},
		rowdeselect:function(sm,row,record){
			if(this.getForm().isDirty()){
				record.beginEdit();
				this.getForm().updateRecord(record);
				record.endEdit();
			}
		}
	};
	var soc=new Ext.grid.CheckColumn({header:C_SOC,dataIndex:'rablSocFlag',width:55});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_RABL_NO,dataIndex:'rablNo'},
	{header:C_CONT_NO,dataIndex:'rablContainerNo',width:40},
	{header:C_PACKAGES,dataIndex:'rablPackages'},
	{header:C_GROSS_WEIGHT,dataIndex:'rablGrossWeight'},
	{header:C_TRAN_DATE,dataIndex:'rablEtd',renderer:formatDate},
	soc],defaults:{sortable:true,width:80}});
	this.grid = new Ext.grid.GridPanel({title:C_RABL_LIST,border:true,autoScroll:true,plugins:[soc],height:150,store:this.store,sm:sm,cm:cm});
	this.addRecord = function(){
		var r = new FRailwayBl({uuid:HTUtil.UUID(32),consId:p.get('id'),consNo:p.get('consNo'),custId:p.get('custId'),custName:p.get('custName')});
		this.store.insert(0,r);r.set('rowAction','N');
		this.grid.getSelectionModel().selectFirstRow();
	};
	this.removeRecord = function(){
		var b =this.grid.getSelectionModel().getSelected();
		if(b){b.set('rowAction',b.get('rowAction')=='N'?'D':'R');this.store.remove(b);}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.save = function(){
		this.grid.stopEditing();
		var b =this.grid.getSelectionModel().getSelected();
		if(b){
			b.beginEdit();
			this.getForm().updateRecord(b);
			b.endEdit();
		};
		var xml='';
		var a =this.store.getModifiedRecords();
		if(a.length>0){
			xml = HTUtil.ATX(a,'FRailwayBl',FRailwayBl);};				
		if(xml!=''){
		 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'RABL_S'},
			success: function(res){
				var a = HTUtil.XTRA(res.responseXML,'FRailwayBl',FRailwayBl);
				HTUtil.RUA(this.store,a,FRailwayBl);
				XMG.alert(SYS,M_S);
			},
			failure: function(res){XMG.alert(SYS,M_F+res.responseText);},
			xmlData:HTUtil.HTX(xml)});
		}
	};
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_RABL;
	
	Fos.RailwayBlTab.superclass.constructor.call(this, { 
	itemId:'C_RABL',title:C_RABL,header:false,deferredRender:false,autoScroll:true,	
	labelAlign:'right',labelWidth:80,bodyStyle:'padding:0px 0px 0px',border:true,trackResetOnLoad:true,
	tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.addRecord},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeRecord},'-',
			{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save}],
	items: [{layout:'fit',border:false,items:[this.grid]},
            {layout:'column',title:C_BASE_INFO,layoutConfig: {columns:4},deferredRender:false,collapsible:true,
			items: [{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_RABL_NO,name:'rablNo',tabIndex:1,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_CONT_NO,name:'rablContainerNo',tabIndex:5,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_SEAL_NO+'1',name:'rablSealNo',tabIndex:9,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_PACKAGES,name:'rablPackages',tabIndex:13,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_CONT_WEIGHT,name:'rablContainerWeight',tabIndex:17,xtype:'numberfield',anchor:'95%'},
				{fieldLabel:C_CONT_BACK_PLACE,name:'rablReturnPlace',tabIndex:21,xtype:'textfield',anchor:'95%'}
				]},				
			{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_CONTRACT_NO,name:'rablContractNo',tabIndex:2,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_COTY,name:'rablContainerType',tabIndex:6,xtype:'combo',displayField:'cotyCode',valueField:'cotyId',triggerAction:'all',
            		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:getCOTY_S(),anchor:'95%'},
                {fieldLabel:C_SEAL_NO+'2',name:'rablSealNo2',tabIndex:10,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_PACK,name:'packName',tabIndex:14,xtype:'combo',displayField:'packName',valueField:'packName',triggerAction:'all',
            		mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S(),anchor:'95%'},
            	{fieldLabel:C_INVOICE_PRICE,name:'rablInvoicePrice',tabIndex:18,xtype:'numberfield',anchor:'95%'}
                ]},
			{columnWidth:.25,layout:'form',border : false,items:[
            	{fieldLabel:C_TRAN_DATE,name:'rablEtd',tabIndex:3,xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_CONT_NO_ORI,name:'rablContainerNoO',tabIndex:7,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_HS_CODE,name:'rablHsCode',tabIndex:11,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_CARGO_WEIGHT,name:'rablGrossWeight',tabIndex:15,xtype:'numberfield',anchor:'95%'},
                {fieldLabel:C_CURR,tabIndex:19,name:'currCode',store:HTStore.getCURR_S(),
                	xtype:'combo',displayField:'currCode',valueField:'currCode',typeAhead: true,
                	mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
                ]},
			{columnWidth:.25,layout:'form',border : false,items:[
                {fieldLabel:C_BULK_FLAG,name:'rablBulkFlag',tabIndex:4,xtype:'checkbox',anchor:'50%'},
                 {fieldLabel:C_SOC_FLAG,name:'rablSocFlag',tabIndex:8,xtype:'checkbox',anchor:'50%'},
                 {fieldLabel:C_MARKS,name:'rablCargoMarks',tabIndex:12,xtype:'textfield',anchor:'95%'},
                 {fieldLabel:C_CBM,name:'rablMeasurement',tabIndex:16,xtype:'numberfield',anchor:'95%'},
                 {fieldLabel:C_CONT_AGENCY,name:'rablAgencyName',tabIndex:20,xtype:'textfield',anchor:'95%'}
                 ]}
			]},
			{layout:'column',title:C_RABL_INFO,layoutConfig:{columns:3},deferredRender:false,collapsible:true,labelAlign:'top',
			items: [{columnWidth:.33,layout:'form',border : false,items:[
				{fieldLabel:C_SHIPPER,name:'rablShipper',tabIndex:22,xtype:'textarea',anchor:'95%'},
                {fieldLabel:C_SHIPPER_NOTES,name:'rablShipperNotes',tabIndex:25,xtype:'textarea',anchor:'95%'},
				{fieldLabel:C_STATION_T,name:'rablStationT',tabIndex:28,xtype:'textarea',anchor:'95%'},
				{fieldLabel:C_RA_CHARGE_REMARK,name:'rablChargeRemarks',tabIndex:31,xtype:'textarea',anchor:'95%'}
				]},				
			{columnWidth:.33,layout:'form',border : false,items:[
				{fieldLabel:C_CONSIGNEE,name:'rablConsignee',tabIndex:23,xtype:'textarea',anchor:'95%'},
				{fieldLabel:C_RA_NOTES,name:'rablRailwayNotes',tabIndex:26,xtype:'textarea',anchor:'95%'},
                {fieldLabel:C_STATION_D,name:'rablStationD',tabIndex:29,xtype:'textarea',anchor:'95%'},
            	{fieldLabel:C_CARGO_NAME_EN,name:'rablCargoNameEn',tabIndex:32,xtype:'textarea',anchor:'95%'}
                ]},
			{columnWidth:.34,layout:'form',border : false,items:[
            	{fieldLabel:C_NOTIFIER,name:'rablNotifyParty',tabIndex:24,xtype:'textarea',anchor:'95%'},
                {fieldLabel:C_DELIVERY_STATION,name:'rablDeliveryPlace',tabIndex:27,xtype:'textarea',anchor:'95%'},
                {fieldLabel:C_CONT_DESC,name:'rablContainerDesc',tabIndex:30,xtype:'textarea',anchor:'95%'},
                {fieldLabel:C_CARGO_NAME_CN,name:'rablCargoNameCn',tabIndex:33,xtype:'textarea',anchor:'95%'}
                ]}
			]}
		]
	});
};
Ext.extend(Fos.RailwayBlTab,Ext.FormPanel);

Fos.SecondShipTab = function(p) {		
	this.sel = -1000;
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'SESH_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FSecondShip',id:'id'},FSecondShip),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	if(p.get('rowAction')!='N') this.store.load({params:{consId:p.get('id')}});
	
	var re = {scope:this,
		rowselect:function(sm,row,record){
			if(this.sel!=record.get('id')){
				this.sel=record.get('id');this.getForm().reset();this.getForm().loadRecord(record);}},
		rowdeselect:function(sm,row,record){
			if(this.getForm().isDirty()){
				record.beginEdit();
				this.getForm().updateRecord(record);
				record.endEdit();
			}
		}
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_BL_NO,dataIndex:'seshBlNo'},
	{header:C_SECOND_CARRIER,dataIndex:'seshCarrier',width:40},
	{header:C_SECOND_VESS,dataIndex:'seshVessel'},
	{header:C_SECOND_VOYA,dataIndex:'seshVoyage'},
	{header:C_POT,dataIndex:'seshPot'},
	{header:C_ETA,dataIndex:'seshEta',renderer:formatDate},
	{header:C_ETD,dataIndex:'seshEtd',renderer:formatDate}
	],defaults:{sortable:true,width:80}});
	this.grid = new Ext.grid.GridPanel({title:C_SECOND_SHIP_LIST,border:true,autoScroll:true,height:150,store:this.store,sm:sm,cm:cm});
	this.addSesh = function(){
		var r = new FSecondShip({consId:p.get('id'),consNo:p.get('consNo'),
			seshPot:p.get('consPotEn'),rowAction:'N',uuid:HTUtil.UUID(32)});
		this.store.insert(0,r);
		this.grid.getSelectionModel().selectFirstRow();
	};	
	this.removeSesh = function(){
		var b =this.grid.getSelectionModel().getSelected();
		if(b){b.set('rowAction',b.get('rowAction')=='N'?'D':'R');this.store.remove(b);}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.save = function(){
		this.grid.stopEditing();
		var b =this.grid.getSelectionModel().getSelected();
		if(b){
			b.beginEdit();
			this.getForm().updateRecord(b);
			b.endEdit();
		}
		var a =this.store.getModifiedRecords();
		if(a.length){
			var xml = HTUtil.ATX(a,'FSecondShip',FSecondShip);
		};
		if(xml!=''){
		 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'SESH_S'},
			success: function(res){
		 		var a = HTUtil.XTRA(res.responseXML,'FSecondShip',FSecondShip);
		 		HTUtil.RUA(this.store,a,FSecondShip);XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(xml)});
		}
	};
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_SESH;
	
	Fos.SecondShipTab.superclass.constructor.call(this, { 
	itemId:'C_SESH',title:C_SECOND_SHIP,header:false,deferredRender:false,autoScroll:true,	
	labelAlign:'right',labelWidth:80,bodyStyle:'padding:0px 0px 0px',border:true,trackResetOnLoad:true,
	tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.addSesh},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.removeSesh},'-',
			{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save}],
	items: [{layout:'fit',border:false,items:[this.grid]},
            {layout:'column',title:C_SECOND_SHIP_INFO,layoutConfig: {columns:4},items:[
            {columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_BL_NO,name:'seshBlNo',tabIndex:1,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_POT_AGENCY,name:'seshPotAgency',tabIndex:5,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_TRANS_NO,name:'seshTransNo',tabIndex:9,xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.25,layout:'form',border : false,items:[
				{fieldLabel:C_SECOND_CARRIER,name:'seshCarrier',tabIndex:2,xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_POT,name:'seshPot',tabIndex:6,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_CUSTOM_SNO,name:'seshSealNo',tabIndex:10,xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.25,layout:'form',border : false,items:[
            	{fieldLabel:C_SECOND_VESS,name:'seshVessel',tabIndex:3,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_ETA,name:'seshEta',tabIndex:7,xtype:'datefield',format:DATEF,anchor:'95%'}]},
			{columnWidth:.25,layout:'form',border : false,items:[
                {fieldLabel:C_SECOND_VOYA,name:'seshVoyage',tabIndex:4,xtype:'textfield',anchor:'95%'},
                 {fieldLabel:C_ETD,name:'seshEtd',tabIndex:8,xtype:'datefield',format:DATEF,anchor:'95%'}]},
            {columnWidth:.5,layout:'form',border : false,items:[
                {fieldLabel:C_REMARKS,name:'seshRemarks',tabIndex:11,xtype:'textfield',anchor:'95%'}]}
			]}
		]
	});
};
Ext.extend(Fos.SecondShipTab, Ext.FormPanel);
