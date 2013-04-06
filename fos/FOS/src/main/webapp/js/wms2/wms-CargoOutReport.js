Fos.CargoOutReportTab = function(t,b,n){
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',idProperty:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var cargoOwenrName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,name:'cargoOwnerName',
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',
		displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
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

	var status=new Ext.form.ComboBox({fieldLabel:'状 态',value:WHTStore.getNameById(WHTStore.OUT_WAREHOUSE_NOTE_SS, 3),
		store:WHTStore.OUT_WAREHOUSE_NOTE_S,displayField:'NAME',valueField:'NAME',tabIndex:7,
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
	});
	var storageDate=new Ext.form.ComboBox({fieldLabel:'接单/出货日期',name:'storageDate',tabIndex:5,value:WHTStore.getNameById(WHTStore.OUT_REPORT_CONDITION,1),
		triggerAction:'all',store:WHTStore.OUT_REPORT_CONDITION,displayField:'NAME',valueField:'NAME',listClass:'x-combo-list-small',selectOnFocus:true,
		mode:'local',typeAhead:false,anchor:'95%'		
	});
	var cargoId=new Ext.form.TextField({name:'cargoId',anchor:'95%'});
	var cargoName=new Fos.CargoLookUp({fieldLabel:'商品名称',tabIndex:1,
		name:'cargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'cargoName',valueField:'cargoName',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
				select:function(c,r,i){
					cargoId.setValue(r.get('id'));
				},
				keydown:{
					fn:function(f,e){
						WCargoLC(f,e);
					},
					buffer:BF
				}
		}});

	var cargoType=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,
		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryName',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});

	
    //开始日期
    var fromDate=new Ext.form.DateField({
    		value:new Date(),fieldLabel:'接单起始日期',altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
    		format:DATEF,anchor:'95%'
    });
    
    //结束日期
    var toDate=new Ext.form.DateField({
    	value:new Date(),fieldLabel:'接单结束日期',altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
    	format:DATEF,anchor:'95%'
    });
    var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:65,
		store:blockStore,enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
				}
			},
			select:function(c,r,i){
				ccboAreaName.setValue(r.get('areaName'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
			},
			keyup:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});
	
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',ref:'../areaName',store:areaStore,xtype:'combo',
			displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:66,
			listeners:{scope:this,
				select:function(c,r,i){
					frm.warehouseName.setValue(r.get('warehouseName'));	
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						areaId='';	
						frm.warehouseName.setValue('');
					}
				}
			}});
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',
			ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:67,
			listeners:{scope:this,
				select:function(c,r,i){
	    			frm.areaName.setValue('');
	    			frm.areaName.store.removeAll();
	    			frm.areaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
	    			frm.areaName.store.reload();

				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
					}}
			}});
    
    
    var doc=new Ext.ux.IFrameComponent({id:'AB'+t, url:''});
    
	this.report=function(n){		
		var url = REPORT_URL;
		switch(t){
		case 1:
			url+='&__report=reports/wms_CargoOutReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 2:
			url+='&__report=reports/wms_StorageOutCargoTotal.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 3:
			url += '&__report=reports/wms_StorageOutCargoStatistics.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		default:
			break;
		}
		if(storageDate.getValue()){
			url+='&storageDate='+storageDate.getValue();
		}
		if (fromDate.getValue())
		{
			url+='&pDate='+fromDate.value;
		}
		if (toDate.getValue())
		{
			url+='&pDateEnd='+toDate.value;
		}
		if(cargoOwenrName.getValue()){
			url +=	'&cargoOwenrName='+cargoOwenrName.getValue();
		}
		if(cargoType.getValue()){
			url +=	'&cargoType='+cargoType.getValue();
		}
		if(cargoName.getValue()){
			url+='&cargoName='+cargoId.getValue();
		}
		if(ccboBlockName.getValue()){
			url+='&blockName='+ccboBlockName.getValue();
		}
		if(ccboAreaName.getValue()){
			url+='&areaName='+ccboAreaName.getValue();
		}
		if(ccboWarehouseName.getValue()){
			url+='&warehouseName='+ccboWarehouseName.getValue();
		}
		var statuss=5;
		if(status.getValue()){
			if(status.getValue()=='配货中'){
				statuss=2;
			}else if(status.getValue()=='配货完成'){
				statuss=3;
			}else if(status.getValue()=='出库中'){
				statuss=4;
			}else if(status.getValue()=='出库完成'){
				statuss=5;
			}else if(status.getValue()=='已作废'){
				statuss=6;
			}
			url+='&status='+statuss;
		}
		
		if(n=='S'){
			Ext.get('IF_AB'+t).dom.src=url;
		}
		else {
			url+="&__format=xls";
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		
		}
	};


var btnSearch=new Ext.Button({text:'生成报表',iconCls:'stats',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SEARCH)),
	handler:function(){this.report('S');},anchor:'95%'});
var btnExcel=new Ext.Button({text:'输出',iconCls:'print',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EXPORT)),
	handler:function(){this.report('E');}});


var frm=new Ext.form.FormPanel({title:'综合过滤条件',layout:'column',name:'sf',xtype:'form',layoutConfig:{columns:3},
	height:100,padding:5,
	frame:false,deferredRender:true,collapsible:true,collapsed:true,
	items:[
             {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
            	  items:[cargoOwenrName,ccboBlockName]},
             {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
            	   items:[status,ccboAreaName]},
             {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	items:[cargoType,ccboWarehouseName]},
 		     {columnWidth:.25,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	items:[cargoName]}
 		]});
	Fos.CargoOutReportTab.superclass.constructor.call(this, {    
    	id:n,title:b,iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
     	tbar:[{xtype:'tbtext',text:'日  期:'},'-',storageDate,'-',fromDate,'-',toDate,'-',
     	       btnSearch,'-',btnExcel],
		items:[frm,{layout:'fit',height:465,deferredRender:false,items:[doc]}]});
};
Ext.extend(Fos.CargoOutReportTab, Ext.Panel);
