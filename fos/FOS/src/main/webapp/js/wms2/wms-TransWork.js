Fos.TransWorkPanel = function(a){
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//杂作业单号
	var nn1={fieldLabel:'杂作业编号',xtype:'textfield',name:'homeworkNo',tabIndex:1,
			ref:'../homeworkNo',readOnly:true,value:a.get('homeworkNo'),anchor:'95%'};
	//审批人
	var nn2={fieldLabel:'审批人',xtype:'textfield',name:'approver',value:a.get('approver'),tabIndex:5,anchor:'95%'};
	//出入库单号
	var nn3={fieldLabel:'出库单号',xtype:'textfield',name:'singleNo',value:a.get('singleNo'),tabIndex:2,anchor:'95%'};
	//审批状态
	var nn4={fieldLabel:'审批状态',xtype:'textfield',disabled:true,name:'approverType',ref:'../approverType',tabIndex:6,
			value:HTStore.getVOST(a.get('approverType')),anchor:'95%',style:'{font-weight:bold;color:blue;}'};
	//仓库
	var c7={fieldLabel:'仓库',name:'storageName',value:a.get('storageName'),tabIndex:3,
			ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',itemCls:'required',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					a.set('storageName',r.get('storageName'));
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						a.set('storageName','');
					}}
			}};
	//审批意见
	var nn6={fieldLabel:'审批意见',xtype:'textfield',tabIndex:7,name:'approverIdea',value:a.get('approverIdea'),anchor:'95%'};
	//货主
	var c2={fieldLabel:C_CARGO_OWNER,tabIndex:4,name:'shipper',value:a.get('shipper'),itemCls:'required',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../shipper',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					a.set('wprocessClassId','');				
				}},
			select:function(c,r,i){
				a.set('wprocessClassId',r.get('id'));
				var shipper = tab.find('name','shipper');
				if(shipper){
					if(shipper[0].getValue()==''||shipper[0].getValue()==null){
						p.set('wprocessClassId',r.get('id'));
						shipper[0].setValue(r.get('custNameCn'));
					}
				}
			},
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		};
	//审批时间
	var nn8={fieldLabel:'审批时间',xtype:'datefield',name:'approverTime',tabIndex:8,format:DATEF,
			altFormats:'Ymd|Y-m-d|Y/m/d|Y/m/d',value:a.get('approverTime'),anchor:'95%'};
	//作业类型
	var nn9={fieldLabel:'作业类型',name:'homeworkType',value:a.get('homeworkType'),
			store:HTStore.TROT_S,xtype:'combo',tabIndex:9,
			displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',
			selectOnFocus:true,anchor:'95%'};
	
	//备注
	var nn10={fieldLabel:'备注',layout:'right',xtype:'textarea',name:'remarks',tabIndex:10,value:a.get('remarks'),anchor:'98%'};
	
	var sheet1= new Ext.Panel({scope:this,padding:5,height:150,
		title:'基础信息',labelWidth:100,labelAlign:'right',layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[nn1,nn2,nn9]},
		{columnWidth:0.25,layout:'form',border:false,items:[nn3,nn4]},
		{columnWidth:0.25,layout:'form',border:false,items:[c7,nn6]},
		{columnWidth:0.25,layout:'form',border:false,items:[c2,nn8]},
		{columnWidth:0.5,layout:'form',border:false,items:[nn10]}
		]
	});
	//得到WprocessItem的数据
	var wprocessItemStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WPROCESSITEMS_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WProcessItem',id:'id'},WProcessItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	if(a.get('rowAction')!='N')
	wprocessItemStore.load({params:{wProcessId:a.get('id')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	
	//grid头部信息
	var cm= new Ext.grid.ColumnModel({columns:[sm,
	   {header:'合同号',dataIndex:'contractNo'},
	   {header:'产品名称',dataIndex:'prodectName'},
	   {header:'产品编号',dataIndex:'prodectNo'},
	   {header:'作业名称',dataIndex:'homeworkName'},
	   {header:'作业代码',dataIndex:'homeworkCode'},
	   {header:'杂作业费率',dataIndex:'homeworkRate'},
	   {header:'杂作业单位',dataIndex:'homeworkUnit'},
	   {header:'杂作业数量',dataIndex:'homeworkQuantity'},
	   {header:'工时',dataIndex:'workHours'},
	   {header:'金额',dataIndex:'sumNum'},
	   {header:'数量',dataIndex:'quantity'},
	   {header:'数量单位',dataIndex:'unitQuantity'},
	   {header:'重量',dataIndex:'weight'},
	   {header:'重量单位',dataIndex:'unitWeight'},
	   {header:'体积',dataIndex:'bulk'},
	   {header:'体积单位',dataIndex:'unitBulk'},
	   {header:'件数',dataIndex:'number'},
	   {header:'件数单位',dataIndex:'unitNumber'},
	   {header:'供货单位',dataIndex:'unitProvide'}
	 ],defaults:{sortable:true,width:100}});

	//保存数据
	this.save=function(){
		
		//非空验证
		
		//仓库名称
		var storageName=frm.find('name','storageName');
		//货主
		var shipper=frm.find('name','shipper');
		if(storageName==null || storageName[0].getValue()==''){
			XMG.alert(SYS,'仓库名称不能为空',function(){storageName[0].focus();});
			return;
		}
		if (shipper==null || shipper[0].getValue()==''){
			XMG.alert(SYS,'货主不能为空',function(){shipper[0].focus();});
			return;
		}
		
		a.beginEdit();
		
		var f = WProcess.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		a.set(fn,fc[0].getValue());
        	}
   	 	}
		var approverType=a.get('approverType');
		switch(approverType){
			case '未审核':
				a.set('approverType','0');
				break;
			case '已审核':
				a.set('approverType','1');
				break;
			case '已作废':
				a.set('approverType','2');
				break;
			case '0':
			case '1':
			case '2':
				break;
			default:				
				break;
		}
		a.endEdit();
		var xml='';
		xml=HTUtil.RTX(a,'WProcess',WProcess);
		
		var a2=wprocessItemStore.getModifiedRecords();
		if(a2.length>0){xml+=HTUtil.ATX(a2,'WProcessItem',WProcessItem);};
		if(xml!=''){
			Ext.getCmp('btnSave').setDisabled(true);
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPROCESS_S'},
				success: function(res){
					var c = HTUtil.XTR(res.responseXML,'WProcess',WProcess);
					var ra=a.get('rowAction');
					var f = WProcess.prototype.fields;
					a.beginEdit();
	   				for (var i = 0; i < f.keys.length; i++) {
	   					var fn = ''+f.keys[i];
	   					a.set(fn,c.get(fn));
	   				};
					if(ra=='N'){
						this.find('name','homeworkNo')[0].setValue(a.get('homeworkNo'));
						a.set('rowAction','M');
					}
					a.endEdit();
					this.updateToolBar();
					XMG.alert(SYS,M_S);
					
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
		}	
		
	};

	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
		};
	//删除主表记录
	this.removePorcess=function(){
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.RTX4R(a,'WProcess');
            	HTUtil.REQUEST('WPROCESS_M', xml,this.removeTab,this);
        	}
		},this);
	};
	
	this.updateToolBar = function(){
				this.saveBtn.setDisabled();
				this.removeBtn.setDisabled();
	};
	//向子表添加内容
	this.addWProcessItem=function()
    {
		if(a.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WProcessItem({uuid:HTUtil.UUID(32),wProcessId:a.get('id'),
    			rowAction:'N'});
        	var win = new Fos.WWin(c,wprocessItemStore);
        	win.show();
    	}
		
    };
    //编辑选中grid内容
    var editWPro = function(){
    	var c = sm.getSelected();
    	if(!c){Ext.Msg.alert(SYS,'请选择要编辑的内容！'); return;}
    	c.set('rowAction','M');
    	var win = new Fos.WWin(c,wprocessItemStore);
    	win.show();
    };
    //删除选中内容
    var deleteWPro = function(){
    	var b =sm.getSelections();
    	if(!b){Ext.Msg.alert(SYS,M_R_P); return;}
		if(b.length>0){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WProcessItem');
	        		HTUtil.REQUEST('WPROCESS_S', xml, function(){wprocessItemStore.remove(b);});
	        	}
			},this);
	    }
		else
			Ext.Msg.alert(SYS,M_R_P);
    };
	
	var grid=new Ext.grid.GridPanel({iconCls:'gen',title:'杂加工作业项目明细',layout:'fit',region:'center',
    	closable:true,store:wprocessItemStore,sm:sm,cm:cm,
    	tbar:[{text:C_ADD,iconCls:'add',disabled:a.get('approverType')!=0,ref:'../btnAdd',scope:this,handler:this.addWProcessItem},'-',
  	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this,handler:editWPro},'-',
  	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this,handler:deleteWPro}]
	});
	var tab=new Ext.TabPanel({activeTab:0,scope:this,
		items:[sheet1]}
			);
	
	var frm= new Ext.form.FormPanel({labelWidth:80,
		labelWidth:90,frame:true,height:200,scope:this,
		region:'north',
		items:[tab]
	});

	
	Fos.TransWorkPanel.superclass.constructor.call(this, {id:'TASKWORK_'+a.get('uuid'),
		title:'加工作业',
		closable:true,layout:'border',
		tbar:
			[{text:C_SAVE,iconCls:'save',id:'btnSave',ref:'../saveBtn',scope:this,handler:this.save},'-',
	        {text:C_REMOVE,iconCls:'remove',ref:'../removeBtn',disabled:(a.get('rowAction')=='N'),scope:this,handler:this.removePorcess},
	        ],
		items: [frm,grid]
		});
};
Ext.extend(Fos.TransWorkPanel,Ext.Panel);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Fos.WWin=function(a,wprocessItemStore)
{
	//
	var n1={fieldLabel:'合同号',xtype:'textfield',name:'contractNo',value:a.get('contractNo'),anchor:'95%'};
	//
	var n2={fieldLabel:'产品名称',xtype:'textfield',name:'prodectName',value:a.get('prodectName'),anchor:'95%'};
	//
	var n3={fieldLabel:'产品编号',xtype:'textfield',name:'prodectNo',value:a.get('prodectNo'),anchor:'95%'};
	//
	var n4={fieldLabel:'作业名称',xtype:'textfield',name:'homeworkName',value:a.get('homeworkName'),anchor:'95%'};
	//
	var n5={fieldLabel:'作业代码',xtype:'textfield',name:'homeworkCode',value:a.get('homeworkCode'),anchor:'95%'};
	//
	var n6={fieldLabel:'杂作业费率',xtype:'numberfield',name:'homeworkRate',value:a.get('homeworkRate'),anchor:'95%'};
	//
	var n7={fieldLabel:'杂作业单位',xtype:'textfield',name:'homeworkUnit',value:a.get('homeworkUnit'),anchor:'95%'};
	//
	var n8={fieldLabel:'杂作业数量',xtype:'numberfield',name:'homeworkQuantity',value:a.get('homeworkQuantity'),anchor:'95%'};
	//
	var n9={fieldLabel:'工时',xtype:'numberfield',name:'workHours',value:a.get('workHours'),anchor:'95%'};
	//
	var n10={fieldLabel:'金额',xtype:'numberfield',name:'sumNum',value:a.get('sumNum'),anchor:'95%'};
	//
	var n11={fieldLabel:'数量',xtype:'numberfield',name:'quantity',value:a.get('quantity'),anchor:'95%'};
	//
	var n12={fieldLabel:'数量单位',name:"unitQuantity",value:a.get("unitQuantity"),
			align:'center',tabIndex:5,
			ref:'../unitQuantity',xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
			}}};
	//
	var n13={fieldLabel:'重量',xtype:'numberfield',name:'weight',value:a.get('weight'),anchor:'95%'};
	//
	var n14={fieldLabel:'重量单位',name:"unitWeight",value:a.get("unitWeight"),
			align:'center',tabIndex:5,
			ref:'../unitWeight',xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
			}}};
	//
	var n15={fieldLabel:'体积',xtype:'numberfield',name:'bulk',value:a.get('bulk'),anchor:'95%'};
	//
	var n19={fieldLabel:'体积单位',name:"unitBulk",value:a.get("unitBulk"),
			align:'center',tabIndex:5,
			ref:'../unitBulk',xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
			}}};
	//
	var n16={fieldLabel:'件数',xtype:'numberfield',name:'number',value:a.get('number'),anchor:'95%'};
	//
	var n17={fieldLabel:'件数单位',name:"unitNumber",value:a.get("unitNumber"),
			align:'center',tabIndex:5,
			ref:'../unitNumber',xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
			}}};
	//
	var n18={fieldLabel:'供货单位',xtype:'textfield',name:'unitProvide',value:a.get('unitProvide'),anchor:'95%'};
	
	this.save = function(){
		a.beginEdit();
		var f = WProcessItem.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		a.set(fn,fc[0].getValue());
        	}
   	 	}
		a.endEdit();
		var xml = HTUtil.RTX(a,'WProcessItem',WProcessItem);		
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPROCESSITEMS_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WProcessItem',WProcessItem);
			var ra=a.get('rowAction');
			if(ra=='N'){
				wprocessItemStore.add(c);
			}
			else{
				var f = WProcessItem.prototype.fields;
				a.beginEdit();
				for (var i = 0; i < f.keys.length; i++) {
					var fn = ''+f.keys[i];
					a.set(fn,c.get(fn));
				};  
				a.endEdit();
			}
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,
		layout:'column',labelAlign:'right',layoutConfig:{columns:4},items:[
            {columnWidth:.25,layout:'form',border:false,items:[n1,n2,n4,n15,n8]},
            {columnWidth:.25,layout:'form',border:false,items:[n5,n3,n7,n19,n6]},
            {columnWidth:.25,layout:'form',border:false,items:[n9,n13,n11,n16]},
            {columnWidth:.25,layout:'form',border:false,items:[n10,n14,n12,n17,n18]}
	    ]});
	
	Fos.WWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:'新增作业项目明细',width:1000,height:280,modal:true,
	  	items:[frm],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
		{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
	
	
};
Ext.extend(Fos.WWin,Ext.Window);

