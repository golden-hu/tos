Fos.GoodsNoteListCargo = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_X',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WReceivedCargo',id:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var storageNoteStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    //if(p){
		//store.load({params:{storageNoteId:p.get('id'),start:0,limit:C_PS20}});
	//}
	store.load();
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm, 
	        {header:'状态',align:'center',width:80,dataIndex:'status',renderer:HTStore.getInWarehouseNoteStatus},
        	{header:'入库单编号',align:'center',dataIndex:'storageNoteNo',width:125},
        	{header:'商品编号',width:100,dataIndex:'skuNo'},
        	{header:'商品名称',align:'center',width:80,dataIndex:'cargoName'},
        	{header:'生产日期',width:100,dataIndex:'productDate',renderer:formatDate},
        	{header:'数量单位',width:70,dataIndex:'unitName'},
        	{header:'入库数量',width:100,dataIndex:'quantity'},
        	{header:'上架数量',width:100,dataIndex:'placedQuantity'},
        	{header:'件数单位',width:100,dataIndex:'pUnit'},
        	{header:'件数',width:100,dataIndex:'packages'},
        	{header:'重量单位',width:100,dataIndex:'wUnitName'},
        	{header:'毛重',width:100,dataIndex:'grossWeight'},
        	{header:'净重',width:100,dataIndex:'netWeight'},
        	{header:'体积单位',width:100,dataIndex:'vUnitName'},
        	{header:'体积',width:100,dataIndex:'volume'},
        	{header:'面积单位',width:100,dataIndex:'mUnitName'},
        	{header:'面积',width:100,dataIndex:'measure'},
        	{header:'品质',width:100,dataIndex:'qualityType',renderer:WHTStore.getQualityContuol()},
        	{header:'仓库名称',align:'center',width:80,dataIndex:'warehouseName'},
        	{header:'库区名称',align:'center',width:80,dataIndex:'areaName'},
        	{header:'库位名称',width:80,dataIndex:'blockName'}
            ],defaults:{sortable:true,width:60}});
    this.editGoodsNote=function(){
    	//先根据所选择的storagenoteId，获得主表的数值
    	//再将第一条纪录做为P传过去。
    	var p=sm.getSelected();
    	if(p){
    		//alert("id="+p.get('storageNoteId'));
    		//var a='';
    		var tab = this.ownerCt;
    		storageNoteStore.load({params:{id:p.get('storageNoteId')},
    			callback:function(r){
    				if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);
    				else{
    						//a=r[0];
    						
    						var tb = 'RECEIVED_CARGO_NOTE'+r[0].get('uuid');
    			        	tab.setActiveTab(tab.getComponent(tb)?tab.getComponent(tb):tab.add(new Fos.WPlacedCargoTab(r[0])));
    					}
    			}});    		
    	}
    };
    this.addGoodsNote=function(){
        	
        	var p = new WReceivedCargo({uuid:HTUtil.UUID(32),status:0,
        		rowAction:'N'});
        	var tab = this.ownerCt;
        	tab.setActiveTab(tab.add(new Fos.GoodsNotePanel(p)));
    };
    
    Fos.GoodsNoteListCargo.superclass.constructor.call(this,{id:'GOODS_NOTE_LIST',
    	iconCls:'gen',title:'货物列表',
    	closable:true,store:store,sm:sm,cm:cm,
    	tbar:[{text:'添加',iconCls:'add',ref:'../Add',scope:this,handler:this.addGoodsNote},'-',
    	      {text:'编辑',iconCls:'edit',ref:'../Edit',scope:this,handler:this.editGoodsNote}],
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			
    		}},bbar:PTB(store,20)
    });
};
Ext.extend(Fos.GoodsNoteListCargo, Ext.grid.GridPanel);

////////////////////////////
//收货单编辑界面
Fos.GoodsNotePanel=function(p,store)
{
	var storageNoteId = new Ext.form.TextField({name:'storageNoteId',hidden:true});
	//入库单号
	var storageNoteNo=new Fos.StorageNoteLookUp({fieldLabel:'入库单号',name:'storageNoteNo',
			store:WHTStore.getInventory(),enableKeyEvents:true,anchor:'95%',tabIndex:1,
			tpl:goodsTpl,itemSelector:'div.list-item',listWidth:C_LW,status:'status',
			xtype:'customerLookupGood',
			displayField:'storageNoteNo',valueField:'storageNoteNo',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
					}},
					select:function(c,r,i){var storageNoteNo=form.find('name','storageNoteNo');
					if(storageNoteNo){
						storageNoteId.setValue(r.get('storageNoteId'));
						storageNoteNo[0].setValue(r.get('storageNoteNo'));
						skuNo.setValue(r.get('skuNo'));
						orderNo.setValue(r.get('orderNo'));
						cargoOwnerName.setValue(r.get('cargoOwnerName'));
						cargoName.setValue(r.get('cargoName'));
						cargoOwnerName.setValue(r.get('cargoOwnerName'));
						blockName.setValue(r.get('blockName'));
						unitName.setValue(r.get('unitName'));
						pUnit.setValue(r.get('pUnit'));
						if(parseFloat(r.get('receivedQuantity'))){
						quantity.setValue(parseFloat(r.get('receivedQuantity')));}
						leavePlanedQuantity.setValue(parseInt(r.get('placedQuantity'))-parseInt(r.get('receivedQuantity')));
						if(parseFloat(r.get('packages'))){
						packages.setValue(parseFloat(r.get('packages')));}
						packsupp.setValue(r.get('leavePackages'));
						wUnitName.setValue(r.get('wUnitName'));
						if(parseFloat(r.get('grossWeight'))){
						grossWeight.setValue(parseFloat(r.get('grossWeight')));}
						leavePlanedGrossWeight.setValue(r.get('leaveGrossWeight'));
						if(parseFloat(r.get('netWeight'))){
						netWeight.setValue(parseFloat(r.get('netWeight')));}
						leavePlanedNetWeight.setValue(r.get('leaveNetWeight'));
						vUnitName.setValue(r.get('vUnitName'));
						if(parseFloat(r.get('volume'))){
						volume.setValue(parseFloat(r.get('volume')));}
						leavePlanedVolume.setValue(r.get('leaveVolume'));
						packName.setValue(r.get('c1UnitName'));
						if(parseFloat(r.get('casing1'))){
						unitNum.setValue(parseFloat(r.get('casing1')));}
						packNameTwo.setValue(r.get('c2UnitName'));
						if(parseFloat(r.get('casing2'))){
						unitNumTwo.setValue(parseFloat(r.get('casing2')));}
						packNameThree.setValue(r.get('c3UnitName'));
						if(parseFloat(r.get('casing3'))){
						unitNumThree.setValue(parseFloat(r.get('casing3')));}
						packNameFour.setValue(r.get('c4UnitName'));
						if(r.get('casing4')){
						unitNumFour.setValue(parseFloat(r.get('casing4')));}
						packNameFive.setValue(r.get('c5UnitName'));
						if(parseFloat(r.get('casing5'))){
						unitNumFive.setValue(parseFloat(r.get('casing5')));}
					}},
					keydown:{fn:function(f,e){GOODSCARGO(f,e,1);},buffer:600}}
	});
	//
	var skuNo=new Fos.StorageNoteCargoLookUp({fieldLabel:'商品编号',tabIndex:4,name:'skuNo',anchor:'95%'});
	//
	var orderNo=new Ext.form.TextField({fieldLabel:'订单号',name:'orderNo',tabIndex:2,anchor:'95%'});
	//
	var cargoName=new Ext.form.TextField({fieldLabel:'商品名称',name:'cargoName',tabIndex:5,anchor:'95%'});
	//
	var cargoOwnerName=new Ext.form.TextField({fieldLabel:'货主名称',tabIndex:3,name:'cargoOwnerName',anchor:'95%'});
	//
	var blockName=new Ext.form.TextField({fieldLabel:'收货库位',name:'blockName',tabIndex:6,anchor:'95%'});
	//
	var unitName=new Ext.form.TextField({fieldLabel:'数量单位',name:'unitName',tabIndex:7,anchor:'95%'});
	//
	var leavePlanedQuantity=new Ext.form.TextField({fieldLabel:'未收货数量',tabIndex:12,anchor:'95%'});
	//
	//var quantity=new Ext.Container({fieldLabel:'收货数量',layout:'column',items:[{xtype:'textfield',anchor:'95%'},{xtype:'displayfield',value:'个'}]});
	var quantity=new Ext.form.TextField({fieldLabel:'收货数量',name:'quantity',tabIndex:17,anchor:'95%'});
	//
	var LeaveQuantity=new Ext.form.TextField({fieldLabel:'剩余数量',name:'LeaveQuantity',tabIndex:22,anchor:'95%'});
	//
	var pUnit=new Ext.form.TextField({fieldLabel:'件数单位',tabIndex:8,name:'pUnit',anchor:'95%'});
	//
	var notpack=new Ext.form.TextField({fieldLabel:'未收货件数',tabIndex:13,anchor:'95%'});
	//
	var packages=new Ext.form.TextField({fieldLabel:'收货件数',name:'packages',tabIndex:18,anchor:'95%'});
	//
	var packsupp=new Ext.form.TextField({fieldLabel:'剩余件数',name:'leavePlanedPackages',tabIndex:23,anchor:'95%'});
	//
	var wUnitName=new Ext.form.TextField({fieldLabel:'重量单位',name:'wUnitName',tabIndex:9,anchor:'95%'});
	//
	var notgrossweight=new Ext.form.TextField({fieldLabel:'未收货毛重',tabIndex:14,anchor:'95%'});
	//
	var grossWeight=new Ext.form.TextField({fieldLabel:'收货毛重',name:'grossWeight',tabIndex:19,anchor:'95%'});
	//
	var leavePlanedGrossWeight=new Ext.form.TextField({fieldLabel:'剩余毛重',name:'leavePlanedGrossWeight',tabIndex:24,anchor:'95%'});
	
	var wUnitName2=new Ext.form.TextField({fieldLabel:'重量单位',name:'wUnitName',tabIndex:10,anchor:'95%',disabled:true});
	//
	var notnetweight=new Ext.form.TextField({fieldLabel:'未收货净重',tabIndex:15,anchor:'95%'});
	//
	var netWeight=new Ext.form.TextField({fieldLabel:'收货净重',name:'netWeight',tabIndex:20,anchor:'95%'});
	//
	var leavePlanedNetWeight=new Ext.form.TextField({fieldLabel:'剩余净重',name:'leavePlanedNetWeight',tabIndex:25,anchor:'95%'});
	//
	var vUnitName=new Ext.form.TextField({fieldLabel:'体积单位',name:'vUnitName',tabIndex:11,anchor:'95%'});
	//
	var notvolume=new Ext.form.TextField({fieldLabel:'未收货体积',tabIndex:16,anchor:'95%'});
	//
	var volume=new Ext.form.TextField({fieldLabel:'收获体积',name:'volume',tabIndex:21,anchor:'95%'});
	//
	var leavePlanedVolume=new Ext.form.TextField({fieldLabel:'剩余体积',name:'leavePlanedVolume',tabIndex:26,anchor:'95%'});
	//
	var packName=new Ext.form.TextField({fieldLabel:'包装一单位',tabIndex:27,name:'packName',anchor:'95%'});
	//
	var bao11=new Ext.form.TextField({fieldLabel:'未收货包装一数量',tabIndex:32,anchor:'95%'});
	//
	var unitNum=new Ext.form.TextField({fieldLabel:'包装一数量',name:'unitNum',tabIndex:37,anchor:'95%'});
	//
	var bao1111=new Ext.form.TextField({fieldLabel:'剩余外包装一数量',tabIndex:42,anchor:'95%'});
	//
	var packNameTwo=new Ext.form.TextField({fieldLabel:'包装二单位',name:'packNameTwo',tabIndex:28,anchor:'95%'});
	//
	var bao22=new Ext.form.TextField({fieldLabel:'未收货包装二数量',tabIndex:33,anchor:'95%'});
	//
	var unitNumTwo=new Ext.form.TextField({fieldLabel:'包装二数量',name:'unitNumTwo',tabIndex:38,anchor:'95%'});
	//
	var bao2222=new Ext.form.TextField({fieldLabel:'剩余外包装二数量',tabIndex:43,anchor:'95%'});
	//
	var packNameThree=new Ext.form.TextField({fieldLabel:'包装三单位',name:'packNameThree',tabIndex:29,anchor:'95%'});
	//
	var bao33=new Ext.form.TextField({fieldLabel:'未收货包装三数量',tabIndex:34,anchor:'95%'});
	//
	var unitNumThree=new Ext.form.TextField({fieldLabel:'包装三数量',name:'unitNumThree',tabIndex:39,anchor:'95%'});
	//
	var bao3333=new Ext.form.TextField({fieldLabel:'剩余外包装三数量',tabIndex:44,anchor:'95%'});
	//
	var packNameFour=new Ext.form.TextField({fieldLabel:'包装四单位',name:'packNameFour',tabIndex:30,anchor:'95%'});
	//
	var bao44=new Ext.form.TextField({fieldLabel:'未收货包装四数量',tabIndex:35,anchor:'95%'});
	//
	var unitNumFour=new Ext.form.TextField({fieldLabel:'包装四数量',name:'unitNumFour',tabIndex:40,anchor:'95%'});
	//
	var bao4444=new Ext.form.TextField({fieldLabel:'剩余外包装四数量',tabIndex:45,anchor:'95%'});
	//
	var packNameFive=new Ext.form.TextField({fieldLabel:'包装五单位',name:'packNameFive',tabIndex:31,anchor:'95%'});
	//
	var bao55=new Ext.form.TextField({fieldLabel:'未收货包装五数量',tabIndex:36,anchor:'95%'});
	//
	var unitNumFive=new Ext.form.TextField({fieldLabel:'包装五数量',name:'unitNumFive',tabIndex:41,anchor:'95%'});
	//
	var bao5555=new Ext.form.TextField({fieldLabel:'剩余外包装五数量',tabIndex:46,anchor:'95%'});
	
	var base0=new Ext.Panel({region:'center',layout:'column',title:'单位数量',height:200,
		items:[
		       {columnWidth:0.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,
		    	   items:[unitName,leavePlanedQuantity,quantity,LeaveQuantity]},
		       {columnWidth:0.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,
			   	   items:[pUnit,notpack,packages,packsupp]},
			   {columnWidth:0.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,
				   items:[wUnitName,notgrossweight,grossWeight,leavePlanedGrossWeight]}, 
			   {columnWidth:0.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,
				   items:[wUnitName2,notnetweight,netWeight,leavePlanedNetWeight]}, 
			   {columnWidth:0.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,
				   items:[vUnitName,notvolume,volume,leavePlanedVolume]}
		       ]
	});
	
	var base=new Ext.Panel({region:'south',height:200,title:'包装数量',
		layout:'column',
		items:[
	    	{columnWidth:.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[
             packName,bao11,unitNum,bao1111
	    	]},
  	    	{columnWidth:.2,labelAlign:'right',labelWidth:118,layout:'form',border:false,items:[
             packNameTwo,bao22,unitNumTwo,bao2222,storageNoteId
  	        ]},
  	    	{columnWidth:.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[
	         packNameThree,bao33,unitNumThree,bao3333
  	    	]},
  	        {columnWidth:.2,labelAlign:'right',labelWidth:118,layout:'form',border:false,items:[
             packNameFour,bao44,unitNumFour,bao4444
  	       ]},
  	     {columnWidth:.2,labelAlign:'right',labelWidth:118,layout:'form',border:false,items:[
              packNameFive,bao55,unitNumFive,bao5555,
   	       ]}
	    ]
	});
	
	
	
	var condition=new Ext.Panel({region:'north',height:60,title:'基本信息',
		layout:'column',
		items:[
	    	{columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[
	    	storageNoteNo]},
  	    	{columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[
            orderNo]},
  	    	{columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[
            cargoOwnerName]},
  	    	{columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[skuNo
  	    	]},
  	       {columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[cargoName
	    	]},
	       {columnWidth:.16,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[blockName
    	   ]}
	    ]
	});
	
	/*var fieldset1=new Ext.form.FieldSet({
		autoHeight:true,items:[condition]
	});
	var fieldset2=new Ext.form.FieldSet({
		title:'收货信息',autoHeight:true,items:[base0]
	});
	
	var fieldset3=new Ext.form.FieldSet({
		title:'包装信息',autoHeight:true,items:[base]
	});*/
	//var form = new Ext.form.FormPanel({region:'center',items:[fieldset1,fieldset2,fieldset3]});
	
	this.save=function(){
		p.beginEdit();
		form.getForm().updateRecord(p);
		p.endEdit();
		var xml = HTUtil.RTX(p,'WReceivedCargo',WReceivedCargo);
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_V'},
		success: function(r){
			Ext.Msg.alert(SYS,M_S);
			store.reload();
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	
	};
	
	Fos.GoodsNotePanel.superclass.constructor.call(this,{id:'Goods_Note_Panel',
		title:'新增收货单',layout:'border',closable:true,height:700,
		//width:1000,height:500,modal:true,
		autoScroll:true,
	  	items:[condition,base0,base],
	  	tbar:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save}]
	});
};
Ext.extend(Fos.GoodsNotePanel,Ext.Panel);

