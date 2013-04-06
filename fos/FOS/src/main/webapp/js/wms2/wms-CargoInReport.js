Fos.CargoInReportTab = function(t,b){
	var skuNo=null;
	
	
	var cargoOwenrName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,name:'cargoOwnerName',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'id',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
			select:function(c,r,i){
			},
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		}
	);
	
	var storageClass=new Ext.form.ComboBox({fieldLabel:'来源类型',
			store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'CODE',tabIndex:2,
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'55%'
	});

	
	var cargoName=new Fos.CargoLookUp({fieldLabel:'商品名称',tabIndex:1,
	    name:'cargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'skuNo',valueField:'cargoId',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				skuNo=null;
			}},
		select:function(c,r,i){
			skuNo=r.get('skuNo');
		},
		keyup:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BFL
		}
		
	}});
	

	var storageDate=new Ext.form.ComboBox({name:'storageDate',tabIndex:5,value:WHTStore.getNameById(WHTStore.IN_REPORT_CONDITION,1),
		triggerAction:'all',store:WHTStore.IN_REPORT_CONDITION,displayField:'NAME',valueField:'NAME',
		listClass:'x-combo-list-small',selectOnFocus:true,
		mode:'local',typeAhead:false,anchor:'55%'		
	});
	
	var cargoType=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,
		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryCode',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});
	
	var fromDate=new Ext.form.DateField({fieldLabel:'起始时间',
		value:new Date(),altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		format:DATEF,
		anchor:'95%'
	});
	
    var toDate=new Ext.form.DateField({fieldLabel:'截止时间',
		value:new Date(),altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		format:DATEF,
		anchor:'95%'
    });
    
    var txtEntrustNo=new Ext.form.TextField({fieldLabel:'订单号',anchor:'95%'});
  
    var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:65,ref:'../blockName',
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockCode',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
				}
			},
			select:function(c,r,i){
				ccboAreaName.setValue(r.get('areaName'));
				ccboAreaName.setValue(r.get('areaCode'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
				ccboWarehouseName.setValue(r.get('warehouseCode'));
			},
			keyup:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});
	
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',ref:'../areaName',
		    store:WHTStore.getArea(),xtype:'combo',
			displayField:'areaName',valueField:'areaCode',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:66,
			listeners:{scope:this,
				select:function(c,r,i){
					ccboWarehouseName.setValue(r.get('warehouseName'));
					ccboWarehouseName.setValue(r.get('warehouseCode'));
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						areaId='';	
						
					}
				}
			}});
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',
			ref:'../warehouseName',store:WHTStore.getWarehouse(),xtype:'combo',displayField:'warehouseName',valueField:'warehouseCode',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:67,
			listeners:{scope:this,
				select:function(c,r,i){
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
					}}
			}});
   
 
    
    var doc=new Ext.ux.IFrameComponent({id:'AC'+t, url:'',title:'明细',labeAction:'right',padding:5,height:465,width:'100%'});
    
 	var report=function(v){ 
 
		var url = REPORT_URL;		
		switch(t){
		case 1:
			url += '&__report=reports/wms_CargoInReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 2:
			url += '&__report=reports/wms_StorageInCargoTotal.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 3:			
			url += '&__report=reports/wms_StorageInCargoStatistics.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 4:
			url += '&__report=reports/wms_MovementSummary.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 5:	
			url += '&__report=reports/wms_ImportCargo.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 6:
			url += '&__report=reports/wms_ImportCargoSummary.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 7:
			url += '&__report=reports/wms_DatabaseProcess.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 8:
			url += '&__report=reports/wms_DatabaseProcessSummary.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		default:
			url += '&__report=reports/wms_CargoInReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		}
		
		var params='';
		if(fromDate.getValue()){
			params +=	'&newDate='+fromDate.value;
		}
		if(toDate.getValue()){
			params +=	'&dateEnd='+toDate.value;
		}
		if(cargoOwenrName.getValue()){
			params +=	'&cargoOwenrName='+cargoOwenrName.getValue();
		}/*
		if(cargoType.getValue()){
			params +=	'&cargoType='+cargoType.getValue();
		}*/
		if(storageClass.getValue()){
			params +=	'&storageClass='+storageClass.getValue();
		}
		if(storageDate.getValue()){
			params +=	'&storageDate='+storageDate.getValue();
		}
		if(skuNo != null){
			params+='&cargoName='+skuNo;
		}
		if(txtEntrustNo.getValue()){
			params+='&entrustNo='+txtEntrustNo.getValue();
		}
		if(ccboWarehouseName.getValue()){
			params+='&warehouseName='+ccboWarehouseName.getValue();
		}
		if(ccboAreaName.getValue()){
			params+='&areaName='+ccboAreaName.getValue();
		}		
		if(ccboBlockName.getValue()){
			params+='&blockName='+ccboBlockName.getValue();
		}
		
		url=url+params;				
		if(v=='S'){			
			Ext.get('IF_AC'+t).dom.src=url;			
		}
		else{
			url+="&__format=xls";
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
			
		}	
		
	};
	
	var btnSearch=new Ext.Button({text:"生成报表",iconCls:'stats',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SEARCH),
		scope:this,handler:function(){report('S');}});
	var btnExpExcel=new Ext.Button({text:"输出",iconCls:'print',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),
		scope:this,handler:function(){report('E');}});
	
	var frm1=new Ext.form.FormPanel({title:'综合过滤条件',layout:'column',name:'sf',
		layoutConfig:{columns:2},padding:5,collapsed:true,
		frame:false,deferredRender:true,autoHeight:true,collapsible:true,height:'20%',
		items:[
                 {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	  items:[cargoOwenrName,ccboWarehouseName]},
                 {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	   items:[cargoType,ccboAreaName]},
                 {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[cargoName,ccboBlockName]},
     		     {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[txtEntrustNo]}
     		]});
	
	var ChangStorageClass=function(){
		switch(t){
		case 1:
		case 2:
		case 3:
		case 4:
			storageClass.setValue('成品');
			break;
		case 5:
		case 6:
			storageClass.setValue('进出口');
			break;
		case 7:
		case 8:
			storageClass.setValue('外加工');
			break;
		default:
			storageClass.setValue('成品');
			break;
		}
	};
	
	Fos.CargoInReportTab.superclass.constructor.call(this, {    
    	id:'CargoInReport'+t,title:b,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
     	tbar:[{xtype:'tbtext',text:'日  期:'},/*storageDate,{text:'来源类型:'},storageClass,*/'-',fromDate,'-',toDate,'-',btnSearch,'-',
     			btnExpExcel],
		items:[frm1,doc]}/*,ChangStorageClass()*/);
};
Ext.extend(Fos.CargoInReportTab, Ext.Panel);

///===============================================================================

//查看入库列表与出库情况
Fos.ShowPlacedAndPickedCargoTab = function(){

	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WPLACED_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	 var pickedCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WPICKED_CARGO_Q',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPickedCargo',idProperty:'id'},WPickedCargo),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	 
	 var storageNoteStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_XBG',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',idProperty:'id'},WStorageNote),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	 
	 var storageNoteCargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',idProperty:'id'},WStorageNoteCargo),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var cargoOwenrName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,name:'cargoOwnerName',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
			select:function(c,r,i){
			},
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		}
	);
	
	var storageClass=new Ext.form.ComboBox({fieldLabel:'来源类型',
			store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'NAME',tabIndex:2,
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
	});


	var cargoName=new Fos.CargoLookUp({fieldLabel:'商品名称',tabIndex:1,
	    name:'cargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'skuNo',valueField:'cargoName',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				
			}},
		select:function(c,r,i){					
			
		},
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BFL
		}
		
	}});
	

	
	var cargoType=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,
		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryName',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});

    
    var txtEntrustNo=new Ext.form.TextField({fieldLabel:'客户订单号',anchor:'95%'});

    
  //仓库
	var cboWarehouse=new Ext.form.ComboBox(
				{fieldLabel:C_WAREHOUSE,name:'warehouseName',tabIndex:2,
					ref:'../warehouseName',store:WHTStore.getWarehouse(),xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
					typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
						},
						afterrender:function(t){
						}
					}
				}
		);	
		
	
	//库区
	var cboArea=new Ext.form.ComboBox({fieldLabel:C_AREA,name:'areaName',tabIndex:2,
					ref:'../areaName',store:WHTStore.getArea(),xtype:'combo',
					displayField:'areaName',valueField:'areaName',
					typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
						},
						afterrender:function(t){
						}
					
					}
				}
	);
		
				
	//库位
	var cboBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:11,
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
				}
			},
			select:function(c,r,i){
				cboArea.setValue(r.get('areaName'));
				cboWarehouse.setValue(r.get('warehouseName'));
			},
			keydown:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});
   
  
    
    var re3={
    		scope:this,
    		rowselect: function (sm,row,record){
    			if(record){
    				storageNoteCargoStore.load({params:{storageNoteId:record.get('id')}});
    			}
    		}
    };
    
    
    var sm3=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re3});    
    var cm3=new Ext.grid.ColumnModel({columns:[sm3,
           {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
           {header:'接单时间',dataIndex:'storageDate',width:100,renderer:formatDate,align:'center'},
           {header:'委托编号',dataIndex:'entrustNo',width:200},
           {header:'客户订单号',dataIndex:'orderNo',width:200,align:'center'},
           {header:'来源类型',dataIndex:'storageClass',width:80,align:'center'},
           {header:'类别',dataIndex:'actionGategory',align:'center'}
           
          ],defaults:{sortable:true,width:100}});
    var grid3=new Ext.grid.GridPanel({iconCls:'gen',title:'入库单列表',
    	layout:'fit',autoscoll:'true',height:200,region:'west',
    	closable:false,store:storageNoteStore,sm:sm3,cm:cm3
    });
    
    var re4={
    	scope:this,
		rowselect: function (sm,row,record){
			if(record){
				store.load({params:{storageNoteCargoId:record.get('id')}});
			}
		}
    };
    
    var sm4=new Ext.grid.CheckboxSelectionModel({singleSelect:true,listeners:re4});    
    var cm4=new Ext.grid.ColumnModel({columns:[sm4,
           {header:'货物编号',dataIndex:'skuNo',width:100,align:'center'},
           {header:'货物名称',dataIndex:'cargoName',width:200,align:'center'},
           /*{header:'生产编号',dataIndex:'productNo',width:80,align:'center'},*/
           {header:'计划数量',dataIndex:'planedQuantity',align:'center'},
           {header:'收货数量',dataIndex:'receivedQuantity',align:'center'},
           {header:'入库数量',dataIndex:'placedQuantity',align:'center'},
           {header:'数量单位',dataIndex:'unitName',align:'center'},
           {header:'入库时间',dataIndex:'receivedDate',renderer:formatDate}
          ],defaults:{sortable:true,width:100}});
    var grid4=new Ext.grid.GridPanel({iconCls:'gen',title:'货物列表',
    	layout:'fit',autoscoll:'true',height:200,region:'center',
    	closable:false,store:storageNoteCargoStore,sm:sm4,cm:cm4
    });
    
    var re={
    		scope:this,
    		rowselect: function (sm,row,record){
    			if(record){
    				pickedCargoStore.load({params:{placedCargoId:record.get('id')}});
    			}
    		}
    };
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,listeners:re});    
    var cm= new Ext.grid.ColumnModel({columns:[sm,
           {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
           {header:'货物编号',dataIndex:'skuNo',width:100,align:'center'},
           {header:'货物名称',dataIndex:'cargoName',width:200,align:'center'},
          /* {header:'生产编号',dataIndex:'productNo',width:80,align:'center'},*/
           {header:'入库数量',dataIndex:'quantity',align:'center'},
           {header:'出库数量',dataIndex:'pickedQuantity',align:'center'},
           {header:'数量单位',dataIndex:'unitName',align:'center'},
           {header:'库位',dataIndex:'blockName',align:'center'},
           {header:'入库时间',dataIndex:'placedDate',renderer:formatDate,align:'center'}
          ],defaults:{sortable:true,width:100}});
    var grid=new Ext.grid.GridPanel({iconCls:'gen',title:'入库货物明细',
    	layout:'fit',autoscoll:'true',height:200,region:'center',
    	closable:false,store:store,sm:sm,cm:cm
    });
    
    //入库单明细
    var sm1=new Ext.grid.CheckboxSelectionModel({singleSelect:true});    
    var cm1= new Ext.grid.ColumnModel({columns:[sm1,
           {header:'商品编号',dataIndex:'skuNo',align:'center'},
           {header:'商品名称',dataIndex:'cargoName',width:200,align:'center'},
           {header:'计划数量',dataIndex:'quantity',renderer:HTUtil.round2,align:'center'},
           {header:'已出库数量',dataIndex:'pickedQuantity',renderer:HTUtil.round2,align:'center'},
           {header:'数量单位',dataIndex:'unitName',align:'center'},
           {header:'库位',dataIndex:'blockName',align:'center'},
           {header:'库区',dataIndex:'areaName',align:'center'},
           {header:'仓库',dataIndex:'warehouseName',align:'center'},
          /* {header:'生产编号',dataIndex:'productNo',align:'center'},*/
           {header:'出库单号',dataIndex:'outStorageNoteNo',width:140,align:'center'},
           {header:'入库单号',dataIndex:'inStorageNoteNo',width:120},
           {header:'拣货时间',dataIndex:'pickedDate',renderer:formatDate}
           
          ],defaults:{sortable:true,width:100}});
    var grid1=new Ext.grid.GridPanel({iconCls:'gen',title:'出库货物明细',region:'north',
    	layout:'fit',autoscoll:'true',height:200,
    	closable:false,store:pickedCargoStore,sm:sm1,cm:cm1
    });
    
   

	this.search=function(){
		var a=[];
		var op=1;
		
		if(cargoOwenrName.getValue()){
			a[a.length]=new QParam({key:'custName',value:cargoOwenrName.getValue(),op:op});
		}/*
		if(cargoType.getValue()){
			a[a.length]=new QParam({key:'categoryName',value:cargoType.getValue(),op:op});
		}*/
		if(cargoName.getValue()){
			a[a.length]=new QParam({key:'cargoName',value:cargoName.getValue(),op:op});
		}
		if(txtEntrustNo.getValue()){
			a[a.length]=new QParam({key:'entrustNo',value:txtEntrustNo.getValue(),op:op});
		}
		//cboBlock
		if(cboBlock.getValue()){
			a[a.length]=new QParam({key:'blockName',value:cboBlock.getValue(),op:LI});
		}
		if(cboArea.getValue()){
			a[a.length]=new QParam({key:'areaName',value:cboArea.getValue(),op:LI});
		}
		if(cboWarehouse.getValue()){
			a[a.length]=new QParam({key:'warehouseName',value:cboWarehouse.getValue(),op:LI});
		}
		if(a.length>=1){
			storageNoteStore.baseParams={_A:'WSTORAGE_NOTE_XBG',_ml:'xml',xml:HTUtil.QATX(a)};
			
		}
		else
			storageNoteStore.baseParams={_A:'WSTORAGE_NOTE_XBG',_ml:'xml'};
		storageNoteStore.load({
			callback:function(r,p,succ){
				if(r.length==0)
	     			XMG.alert(SYS_W,M_NOT_FOUND);
				
			}
		});
		
	};
	
	var search=new Ext.Button({text:'搜索',iconCls:'search',scope:this,hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SEARCH),handler:this.search,lableWidth:'right',anchor:'50%'});
	
	var frm1=new Ext.form.FormPanel({
		title:'查询条件',
		layout:'column',
		name:'sf',collapsible:true,
        height:110,padding:5,
		frame:false,
		deferredRender:true,
		tbar:[search],
		items:[
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	  items:[cargoOwenrName,txtEntrustNo]},
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	   items:[storageClass,cboWarehouse]},
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[cargoType,cboArea]},
     		     {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[cargoName,cboBlock]}
     		]});

	
	var tab2=new Ext.TabPanel({activeTab:0,region:'center',height:300,
		items:[grid,grid1]});
	
	var frm=new Ext.Panel({
		title:'主信息',height:400,
		layout:'column',
		items:[{columnWidth:.3,layout:'form',labelWidth:80,labelAlign:'right',border:false,
        	items:[grid3]},
        	{columnWidth:.7,layout:'form',labelWidth:80,labelAlign:'right',border:false,
            	items:[grid4]},
        	{columnWidth:1,layout:'form',labelWidth:80,labelAlign:'right',border:false,
            	items:[tab2]}]});


	
	Fos.ShowPlacedAndPickedCargoTab.superclass.constructor.call(this, {    
    	id:'SHOW_PLACED_AND_PICKED',title:'查看入库出库表',iconCls:'search',
    	deferredRender:false,closable:true,autoScroll:true,
     	
		items:[frm1,frm]});
};
Ext.extend(Fos.ShowPlacedAndPickedCargoTab, Ext.Panel);

