
Fos.WsStorageNoteGrid = function(t) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
     
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	
    //renderer可以用来对数据进行一定的格式化
    var cm=new Ext.grid.ColumnModel({columns:[sm,
      {header:'类别',align:'left',width:50,dataIndex:'actionGategory',renderer:WHTStore.ACTION_GATEGORY,align:'center'},
      {header:C_STATUS,dataIndex:'status',align:'left',width:80,
    	renderer:function(v,cma,r){
    		if(r.get('storageType')==0){
    			return WHTStore.getInWarehouseNoteStatus(v);
    		}
    		else{
    			return WHTStore.getOutWarehouseNoteStatus(v);
    		}
    		
    	}},
 	{header:C_IN_STORAGE_NOTE_NO,align:'center',dataIndex:'storageNoteNo',width:125},	
 	{header:'货主',dataIndex:'cargoOwnerName',width:200,align:'center'},
 	{header:'供应商',align:'center',dataIndex:'custName',width:200},
 	{header:'采购订单号',dataIndex:'orderNo',width:120,align:'left'},
 	{header:'委托编号',dataIndex:'entrustNo',width:100,align:'center'},
 	{header:C_PLANED_IN_DATE,width:100,dataIndex:'planedTime',renderer:formatDate}, 	
 	{header:C_STORAGE_DATE,align:'center',dataIndex:'storageDate',width:100,renderer:formatDate},
 	{header:C_ACTURE_IN_TIME,width:100,dataIndex:'actureTime',renderer:formatDate}
     ],defaults:{sortable:true,width:60}});
    
    //新增
    var addNote=function(){
    	var p = new WStorageNote({uuid:HTUtil.UUID(32),
    		status:0,
    		storageDate:new Date(),
    		planedTime:new Date(),
    		compCode:sessionStorage.getItem('COMP_CODE'),
    		userName:sessionStorage.getItem("USER_NAME"),
    		cargoOwnerId:HTStore.getCFG('IN_CARGO_OWNER_NAME'),
			cargoOwnerName:HTStore.getCFGD('IN_CARGO_OWNER_NAME'),
    		storageType:t,
    		rowAction:'N'});
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.StorageNotePanel(p)));
    };
    
    //删除
    var deleteNote=function(){
    	var a = sm.getSelected();
    	if(a){
    		if(a.get('status')!=0){
    			Ext.MessagesBox.alert(SYS,'该入库单不是新增状态，不能删除，请先取消提交！');
    			return ;
    		}
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.SMTX4R(sm,'WStorageNote');
	            	HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,function(){store.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    
    //编辑
    this.editNote=function(){
    	var p = sm.getSelected();
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'STORAGE_NOTE_'+p.get('uuid');
    		if(p.get('storageType')==0){
    			tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WsStorageTab(p)));
    		}else if (p.get('storageType')==1){
    			tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WSOutPanel(p)));
    		}
        	
    	
    		this.changeBtnStatus(p);
    	}
    };
    
    //质检完成调用方法
    function qcComplete()
    {
    	var p=sm.getSelected();
    	if (p)
    	{
    		if(p.get('status')!=7){
    			XMG.alert(SYS,'请入库单还未质检，不能整单质检完成！');
    			return ;
    		}
    	    Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'QC_COMPLETE',storageNoteId:p.get('id')},
				success:function(r){
					p.beginEdit();
					p.set('status',8);
					this.changeBtnStatus(p);
					p.endEdit();
					XMG.alert(SYS,"质检完成处理成功");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			});
    	}
    	
    }
    
    //整单上架调用方法
    function notePlaced()
    {
    	var p=sm.getSelected();
    	if (p)
    	{
    		var tab = this.ownerCt;
    		var c = 'RECEIVED_CARGO_GRID'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WReceivedCargoGrid(p,0)));
    		this.changeBtnStatus(p);
    	}
    }
    
    var setAddEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD)){
    		btnAdd.enable();
    	}
    	else{
    		btnAdd.disable();
    	}
    };
    
    var setEditEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)){
    		btnEdit.enable();
    	}
    	else{
    		btnEdit.disable();
    	}
    };
    
    var setRemoveEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)){
    		btnRemove.enable();
    	}
    	else{
    		btnRemove.disable();
    	}
    };
    
    var setPlacedEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_PLACED)){
    		
    	}
    	else{
    		
    	}
    };
    //根据单据状态改变工具栏按钮状态
    this.changeBtnStatus=function(p)
    {
    	//新增状态
    	if (p.get('status')==0)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(true);
    		setPlacedEnable(false);
    	}
    	
    	//已提交状态
    	if (p.get('status')==1)
    	{
    		setAddEnable(true);
    		setEditEnable(false);
    		setRemoveEnable(false);
    		setPlacedEnable(false);
    	}
    	
    	//收货中状态
    	if (p.get('status')==2)
    	{
    		setAddEnable(true);
    		setEditEnable(false);
    		setRemoveEnable(false);
    		setPlacedEnable(true);
    	}
    	
    	//收货完成状态
    	if (p.get('status')==3)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setPlacedEnable(true);
    	}
    	
    	//质检中状态
    	if (p.get('status')==7)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setPlacedEnable(false);
    	}
    	
    	//质检完成状态
    	if (p.get('status')==8)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setPlacedEnable(true);
    	}
    	
    	//上架中状态
    	if (p.get('status')==4)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setPlacedEnable(true);
    	}
    	//上架完成
    	if (p.get('status')==5)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setPlacedEnable(false);
    	}
    };

    //新增
    var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../btnAdd',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD),scope:this,handler:addNote});
    //编辑
    var btnEdit=new Ext.Button({text:C_EDIT,iconCls:'option',ref:'../btnEdit',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT),scope:this,handler:this.editNote});
    //删除
    var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL),scope:this,handler:deleteNote});

    Fos.WsStorageNoteGrid.superclass.constructor.call(this,{id:t==0?'IN_NOTE_LIST':'OUT_NOTE_LIST',
    	iconCls:'gen',title:t==0?C_IN_NOTE_LIST:C_OUT_NOTE_LIST,
    	closable:true,store:store,sm:sm,cm:cm,stripeRows:true,columnLines:true,
    	listeners:{scope:this,
    		//双击进入编辑
    		rowdblclick: function(grid, rowIndex, event){
    			this.editNote();
    		},
    		
    		//单击后根据单据状态改变toolbar按钮
    		rowclick:function(grid,rowIndex,event){
    			var p = sm.getSelected();
    			this.changeBtnStatus(p);
    		}
    	},
    	loadMask: true,
    	bbar:PTB(store,20),
    	tbar:[          btnAdd,'-',
    	    	        btnEdit,'-',
    	    	        btnRemove
    	    ]
    });
};
Ext.extend(Fos.WsStorageNoteGrid, Ext.grid.GridPanel);



//入库单主界面
Fos.WsStorageTab = function(p) {
	this.sel=-1000;
	var storageClassId=p.get('storageClassId');
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var atStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WASSETS_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WAssets',id:'id'},WAssets),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  var rateStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_RATE_Q',baseParams:{_mt:'xml'},
  	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageRate',id:'id'},WStorageRate),
  	remoteSort:true,sortInfo:{field:'id',direction:'desc'}
  });
  
  var receivedCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WReceivedCargo',idProperty:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  
  var cargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'}, WCargo),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  
  if(p.get('rowAction')!='N'){
  	store.load({params:{storageNoteId:p.get('id')}});
  	atStore.load({params:{storageNoteId:p.get('id')}});
  	rateStore.load({params:{storageNoteId:p.get('id')}});
  }
  

	
	
  //这个函数应该这样理解
	//这个函数是在执行HTUtil.REQUEST时传的第三个参数，
	//这个参数是一个函数，会有请求成功时调用，r表示request返回的response
	//s表示scope,因此意思就是获得当前对象的容器，用该容器删除当前对象。
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	

	//单据状态改为提交或未提交时的处理函数
  this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				var sn = HTUtil.XTR(r.responseXML,'WStorageNote',WStorageNote);
              HTUtil.RU(sn,p,WStorageNote);
              
              var rs = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
              HTUtil.RUA(store,rs,WStorageNoteCargo);
             
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				var status=tab.find('name','status');
				
				//如果改为了未提交
				if(status){
					if (s==0)
					{
							if (p.get('storageType')==0)
							{
								status[0].setValue(HTStore.getInWarehouseNoteStatus(0));
							}
							
							if (p.get('storageType')==1)
							{
								status[0].setValue(HTStore.getOutWarehouseNoteStatus(0));
							}
							
							grid.addButton.enable();
							grid.editButton.enable();
							grid.removeButton.enable();
							
						
					}
					//如果改为了提交
					if (s==1)
					{
						if (p.get('storageType')==0)
						{
							status[0].setValue(HTStore.getInWarehouseNoteStatus(1));
						}
						
						if (p.get('storageType')==1)
						{
							status[0].setValue(HTStore.getOutWarehouseNoteStatus(1));
						}
						
				
						grid.addButton.disable();
						grid.editButton.disable();
						grid.removeButton.disable();
						
					}
				}
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};

	
	//根据单据状态改变主界面工具栏上的按钮状态
	this.updateToolBar = function(){
		btnSave.setDisabled(p.get('status')>5);
		btnRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
	};
	
	
	//入库单号
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:C_IN_STORAGE_NOTE_NO,
			name:'storageNoteNo',value:p.get('storageNoteNo'),tabIndex:1,
			ref:'../storageNoteNo',readOnly:true,xtype:'textfield',anchor:'95%'});
	
		//货主
	var lkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,tabIndex:5,name:'cargoOwnerName',value:p.get('cargoOwnerName'),itemCls:'required',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',readOnly:true,
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoOwnerId','');				
				}},
			select:function(c,r,i){
				p.set('cargoOwnerId',r.get('id'));
				
				
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});

	var cboActionGategory=new Ext.form.ComboBox({fieldLabel:'入库类别',name:'actionGategory',value:p.get('actionGategory'),
		    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:3,itemCls:'required',
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				//=r.get('CODE');
				p.set('actionGategoryId',r.get('CODE'));
			}}
	});
	
	//预计时间
	var c13=new Ext.form.DateField({fieldLabel:C_PLANED_IN_DATE,
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d|Y.m.d',
			tabIndex:6,name:'planedTime',value:p.get('planedTime'),
			ref:'../planedTime',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//状态
	var ccboStatus=new Ext.form.ComboBox({fieldLabel:'入库单状态',name:'status',
			value:HTStore.getInWarehouseNoteStatus(p.get('status')),mode:'local',
			store:WHTStore.IN_WAREHOUSE_NOTE_S,displayField:'NAME',valueField:'CODE',
			disabled:true,ref:'../status',
			style:'{font-weight:bold;color:green;}',anchor:'95%'});

	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'采购订单号',name:'orderNo',value:p.get('orderNo'),tabIndex:7,
			ref:'../orderNo',xtype:'textfield',itemCls:'required',anchor:'95%',
			listeners:{scope:this,
				blur:function(f){/*
					if(ORDER_NO_ONLY){
						if(f.getRawValue()!=''){
							if(p.get('rowAction')=='M'||p.get('rowAction')==''){
								if(f.getRawValue()!=p.get('orderNo')){
									validationOrderNo(f);
								}
							}
							else if(p.get('rowAction')=='N'){
								validationOrderNo(f);
							}
						}
					}
				*/}
			}
	});
	
	//客户订单号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'委托编号',xtype:'textfield',name:'entrustNo',tabIndex:4,
			value:p.get('entrustNo'),anchor:'95%'
	});			
			
	//接单日期
	var cdteStorageDate=new Ext.form.DateField({fieldLabel:C_STORAGE_DATE,tabIndex:8,name:'storageDate',value:p.get('storageDate'),altFormats:'Ymd|Y/m/d|Y-m-d|Y.m.d',
			ref:'../storageDate',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//出入库要求
	var ctxtRequirement=new Ext.form.TextField({fieldLabel:p.get('storageType')==0?C_IN_STORAGE_REQUIREMENT:C_OUT_STORAGE_REQUIREMENT,name:'custRequirement',
			value:p.get('custRequirement'),tabIndex:17,anchor:'97%'});

	
	//供应商
	var ccluCustName=new Fos.CustomerLookup({fieldLabel:'供应商',tabIndex:10,name:'custName',value:p.get('custName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('custId','');
					
					var custContact=tab.find('name','custContact');
					var custTel=tab.find('name','custTel');
					var custFax=tab.find('name','custFax');
					if(custContact)
						custContact[0].setValue('');
					if(custTel)
						custTel[0].setValue('');
					if(custFax)
						custFax[0].setValue('');
				}},
			select:function(c,r,i){
				p.set('custId',r.get('id'));
				var cargoOwnerName = tab.find('name','cargoOwnerName');
				if(cargoOwnerName)
				{
					if(cargoOwnerName[0].getValue()==''||cargoOwnerName[0].getValue()==null){
						cargoOwnerName[0].setValue(r.get('custNameCn'));
						p.set('cargoOwnerId',r.get('id'));
					}
						
				}
				var custContact=tab.find('name','custContact');
				var custTel=tab.find('name','custTel');
				var custFax=tab.find('name','custFax');
				var loadAddress=tab.find('name','loadAddress');
				if(loadAddress)
					loadAddress[0].setValue(r.get('custAddress'));
				if(custContact)
					custContact[0].setValue(r.get('custContact'));
				if(custTel)
					custTel[0].setValue(r.get('custTel'));
				if(custFax)
					custFax[0].setValue(r.get('custFax'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	

	
	//供应商联系人
	var ctxtCustContact=new Ext.form.TextField({fieldLabel:C_CONTACT,name:'custContact',value:p.get('custContact'),tabIndex:10,
			anchor:'95%'});	
			
	//供应商电话
	var ctxtCustTel=new Ext.form.TextField({fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),tabIndex:11,
			anchor:'95%'});
			
	//货主传真
	var ctxtCustFax=new Ext.form.TextField({fieldLabel:C_FAX,name:'custFax',value:p.get('custFax'),tabIndex:12,
			ref:'../custFax',xtype:'numberfield',anchor:'95%'});
	
	var listConsignee=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();			
			if(q.length>=1 ){				
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F',_mt:'xml',loadAddress:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
					
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){				
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	//收货地址
	var loadAddress=new Ext.form.ComboBox({fieldLabel:'收货地址',name:'loadAddress',value:p.get('loadAddress'),tabIndex:13,
			xtype:'combo',anchor:'97%',
				store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F'),
				displayField:'loadAddress',valueField:'loadAddress',
				typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
				listeners:{scope:this,
					keyup:{fn:function(f,e){
						listConsignee(f,e);
					},buffer:600}
			 	}
	});			
	
	
	//入库单据信息sheet
	var masterInfoPanel=new Ext.Panel({
		title:'基本信息',labelAlign:'right',padding:5,
		layout:'column',layoutConfig:{columns:4},
		items:[
			{columnWidth:.25,layout:'form',labelWidth:70,border:false,items:[
				txtStorageNoteNo,lkpCargoOwnerName/*,cboStorageClass*/]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
cboActionGategory,txtOrderNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
c13,txtEntrustNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[				
cdteStorageDate,ccboStatus]},
			{columnWidth:.5,layout:'form',labelWidth:70,border:false,items:[
ctxtRequirement ]}
			]
	});
	
	
	//*****************客户信息sheet********************/
	var pnlCustInfo=new Ext.Panel({
		title:'供应商',labelAlign:'right',padding:5,
		labelWidth:90,layout:'column',
		items:[{columnWidth:.25,layout:'form',border:false,
			items:[ccluCustName]},
		       {columnWidth:.25,layout:'form',border:false,
				items:[ctxtCustContact]},
		       {columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustTel]},
				{columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustFax]},
		       {columnWidth:.5,layout:'form',border:false,
						items:[loadAddress]}]
	});
	
	
	
	var ctxtOriginCountry=new Ext.form.ComboBox({fieldLabel:'原产国',name:'countryOfOrigin',value:p.get('countryOfOrigin'),
			xtype:'textfield',tabIndex:4,anchor:'95%',xtype:'combo',
			store:HTStore.getCOUN_S(),
			displayField:'counNameCn',valueField:'counNameCn',
			typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
			enableKeyEvents:true,
			listeners:{scope:this,
			 	keydown:{fn:function(f,e){
			 		if(e.getKey()==e.ENTER){
			 			ctxtRequirement.focus();
					} 
			 	},buffer:200}
		 	}
	});
	
	var ctxtDestinationCountry=new Ext.form.TextField({fieldLabel:'进口国',
		tabIndex:1,anchor:'95%'});
	var ctxtTruckType=new Ext.form.TextField({fieldLabel:'车型',
		tabIndex:1,anchor:'95%'});
	var ctxtTruckNo=new Ext.form.TextField({fieldLabel:'车号',
		tabIndex:1,anchor:'95%'});
	var ctxtOrigin=new Ext.form.TextField({fieldLabel:'装货地',
		tabIndex:1,anchor:'95%'});
	var ctxtDestination=new Ext.form.TextField({fieldLabel:'卸货地',name:'destination',value:p.get('destination'),
		tabIndex:1,anchor:'95%'});
	var ctxtDeliveryPoint =new Ext.form.TextField({fieldLabel:'交货地',
		tabIndex:1,anchor:'95%'});
	var ctxtDriver=new Ext.form.TextField({fieldLabel:'司机',
		tabIndex:1,anchor:'95%'});
	var ccboPaymentClause=new Ext.form.ComboBox({fieldLabel:'付款条款',name:'pateName',value:p.get('pateName'),store:HTStore.getPATE_S(),tabIndex:6,
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtPaymentRemarks=new Ext.form.TextField({fieldLabel:'付款描述',
		tabIndex:1,anchor:'95%'});
	var ccboDeliveryClause=new Ext.form.ComboBox({fieldLabel:'交货条款',store:HTStore.getPATE_S(),tabIndex:6,
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtDeliveryRemarks=new Ext.form.TextField({fieldLabel:'交货描述',
		tabIndex:1,anchor:'95%'});

	
	//运单信息sheet
	var pnlTransInfo=new Ext.Panel({
		title:'运单信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtOriginCountry,ctxtOrigin,ccboPaymentClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtDestinationCountry,ctxtDestination,ctxtPaymentRemarks]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckType,ctxtDeliveryPoint,ccboDeliveryClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckNo,ctxtDriver,ctxtDeliveryRemarks]}]
	});

	var ctxtMasterTransNo=new Ext.form.TextField({fieldLabel:'主单号',name:'masterTransNo',value:p.get('masterTransNo'),
		tabIndex:1,xtype:'textfield',anchor:'95%'});
	var cnumQuantity=new Ext.form.NumberField({fieldLabel:'总件数',name:'quantity',value:p.get('quantity'),
		tabIndex:7,anchor:'95%'});	
	var ctxtTransNo=new Ext.form.TextField({fieldLabel:'分单号',name:'transNo',value:p.get('transNo'),
		tabIndex:2,anchor:'95%'});
	var cnumGW=new Ext.form.NumberField({fieldLabel:'总毛重',name:'grossWeight',value:p.get('grossWeight'),
		tabIndex:9,anchor:'95%'});
	var cnumNW=new Ext.form.NumberField({fieldLabel:'总净重',name:'netWeight',value:p.get('netWeight'),
		tabIndex:10,anchor:'95%'});
	var cnumV=new Ext.form.NumberField({fieldLabel:'总体积',name:'volume',value:p.get('volume'),
		tabIndex:11,anchor:'95%'});

	
	
	var numTankNum=new Ext.form.NumberField({fieldLabel:'箱量',name:'tankNum',value:p.get('tankNum'),tabIndex:15,anchor:'95%'});
	var cboTankType=new Ext.form.ComboBox({fieldLabel:'箱型',name:'tankType',value:p.get('tankType'),
			store:HTStore.getCOTY_S(),tabIndex:16,
  		displayField:'cotyCode',valueField:'cotyCode',typeAhead:true,
  		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	
	var otherInfoPanel=new Ext.Panel({
		title:'其他信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtMasterTransNo,cnumQuantity]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTransNo,cnumGW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[numTankNum,cnumNW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[cboTankType,cnumV]}]
	});
	
	
	
	
	
	var cnumPackages=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
		listeners:{scope:this,    			
			blur:function(f){
				var r=smRCargo.getSelected();
				if(r){
  				if(f.getRawValue()==''){
  					f.clearValue();
  				}
  				else{
  					var sq=HTUtil.round2(r.get('standardQuantity'));
  					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
  					var snw=HTUtil.round2(r.get('standardNetWeight'));
  					var sv=HTUtil.round4(r.get('standardVolume'));
  					var stm=HTUtil.round2(r.get('standardMeasure'));
  					var packages=HTUtil.round2(f.getValue());
  					var quantity=HTUtil.round2(packages*sq);
  					
  					r.set('receivedQuantity',quantity);
  					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
  					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
  					r.set('receivedVolume',HTUtil.round4(packages*sv));
  					r.set('receivedMeasure',HTUtil.round2(packages*stm));
  					
  					}
				}
				
			}
		}
	
	});
	var cnumQuantity=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
			listeners:{scope:this,    			
				blur:function(f){
					var r=smRCargo.getSelected();
					if(r){
	    				if(f.getRawValue()==''){
	    					f.clearValue();
	    				}
	    				else{
	    					var sq=HTUtil.round2(r.get('standardQuantity'));
	    					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
	    					var snw=HTUtil.round2(r.get('standardNetWeight'));
	    					var sv=HTUtil.round4(r.get('standardVolume'));
	    					var stm=HTUtil.round2(r.get('standardMeasure'));
	    					var quantity=numRender(f.getValue());
	    					var packages=HTUtil.round2(quantity/sq);
	    					if(Ext.isEmpty(r.get('receivedPackages'))){
	    						r.set('receivedPackages',packages);
	    					}
	    					
	    					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
	    					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
	    					r.set('receivedVolume',HTUtil.round4(packages*sv));
	    					r.set('receivedMeasure',HTUtil.round2(packages*stm));
	    					
	    					}
					}
					
				}
			}
	
	});
	var cnumGrossWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumNetWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumVolume=new Ext.form.NumberField({
		decimalPrecision:4,allowNegative:false,selectOnFocus:true
	});
	
	var ccboPUnitName=new Ext.form.ComboBox({align:'center',	      
	  displayField:'unitName',valueField:'unitName',triggerAction:'all',
    mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
    store:HTStore.getUNIT_C(),anchor:'95%',
    listeners:{scope:this,select:function(c,r,i){
  	  smRCargo.getSelected().set('pUnitId',r.get('id'));
		}}});
	
	var ccboQualityType=new Ext.form.ComboBox({align:'center',
		displayField:'NAME',valueField:'NAME',triggerAction:'all',
      mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:WHTStore.QUALITY_TYPE_S,anchor:'95%'});
	//收货表选择事件
	var rsRCargo={scope:this,
  		rowselect:function(sm,row,record){
  	}
  		
  };
	
	var smRCargo=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:rsRCargo});
	var cmRCargo=new Ext.grid.ColumnModel({columns:[smRCargo,
	        new Ext.grid.RowNumberer(),
	        {header:'品质',
					dataIndex:'qualityType',
					editor:ccboQualityType,
					width:70,
					align:'center'},	        
          {header:'SKU',
					dataIndex:'skuNo',
					width:90,
					align:'center'},          	
        	/*{header:'生产编号',dataIndex:'productNo',width:75,align:'center'},*/
        	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
      	{header:'收货EA',
        			dataIndex:'receivedQuantity',
        			editor:cnumQuantity,
        			width:75,
        			align:'center'},
        	{header:'收货件数',
        				dataIndex:'receivedPackages',
        				editor:cnumPackages,
        				width:75,
        				align:'center'},
        	{header:'件数ID',dataIndex:'pUnitId',width:70,align:'center',hidden:true},
        	{header:'件数单位',
        		dataIndex:'pUnit',
        		editor:ccboPUnitName,
        		width:70,
        		align:'center'},
        	{header:'收货毛重',
        			dataIndex:'receivedGrossWeight',
        			editor:cnumGrossWeight,
        			width:75,
        			align:'center'},
        	{header:'收货净重',
        				dataIndex:'receivedNetWeight',
        				editor:cnumNetWeight,
        				width:75,
        				align:'center'},
        	{header:'收货体积',
        					dataIndex:'receivedVolume',
        					editor:cnumVolume,
        					width:75,
        					align:'center'},          	
        	{header:'商品名称',dataIndex:'cargoName',width:200,align:'center'},
        	{header:'上架数量',dataIndex:'placedQuantity',width:75,align:'center'},
        	{header:'库位',dataIndex:'blockName',width:75,align:'center'},
        	{header:'库区',dataIndex:'areaName',width:75,align:'center'},
        	{header:'仓库',dataIndex:'warehouseName',width:90,align:'center'},
        	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
        	{header:'重量单位',dataIndex:'wUnitName',width:75,align:'center'},	                                      	
        	{header:'体积单位',dataIndex:'vUnitName',width:75,align:'center'},	                                      	
        	{header:'商品规格',width:120,dataIndex:'specification',width:75,align:'center'},
        	{header:'商品型号',width:120,dataIndex:'cargoType',width:75,align:'center'},
        	{header:'商品颜色',width:120,dataIndex:'cargoColor',width:75,align:'center'},
        	{header:'拆零数量',dataIndex:'openStockNum',width:75,align:'center'},
        	{header:'收货序号',dataIndex:'id',width:95,align:'center'},
          {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
          {header:'入库ID',dataIndex:'storageNoteId',width:75,align:'center'},
          {header:'货物明细ID',dataIndex:'storageNoteCargoId',width:95,align:'center'},
      	{header:'最小单位数量',dataIndex:'standardQuantity',width:95,align:'center'},
      	{header:'最小单位毛重',dataIndex:'standardGrossWeight',width:95,align:'center'},
      	{header:'最小单位净重',dataIndex:'standardNetWeight',width:95,align:'center'},
      	{header:'最小单位体积',dataIndex:'standardVolume',width:95,align:'center'},
      	{header:'最小单位面积',dataIndex:'standardMeas',width:95,align:'center'},
      	 {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:70,align:'center'}
            ],defaults:{sortable:true,width:100}}); 
	var addReceivedCargo=function(){
		var r = sm.getSelected();
		if(r){
			if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity'))){
				var newR=createReceivedCargo(r);
				grdReceivedCargo.insert(0,newR);
				smRCargo.selectFirstRow();
			}
			else{
				Ext.Msg.alert(SYS,"您选择的货物已经全部收货，请确认！");
			}
		}
		else{
			Ext.Msg.alert(SYS,"请确认是否已经选中上方表格中的货物！");
		}
	};
	
	var saveReceivedCargo=function(){
		var mRCRows=receivedCargoStore.getModifiedRecords();
		var xml='';
		if(mRCRows.length){
			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
		}
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
				success: function(r){
					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
					HTUtil.RUA(store,a,WStorageNoteCargo);
					var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
					HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
					Ext.Msg.alert(SYS,M_S);
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
				});
		}
		else{
			
		}
	};
	var delReceivedCargo=function(){
		var rows=smRCargo.getSelections();
		var cc=[];
		if(rows.length){
			for(var i=0;i<rows.length;i++){
				var r=rows[i];
				if(HTUtil.round2(r.get('placedQuantity'))>0){
					Ext.Msg.alert(SYS,r.get("cargoName")+"已上架,数据为："+r.get('placedQuantity')+"，不能删除");
					return ;
				}
				if(r.get('rowAction')=='N'){
					r.set('rowAction','D');
					receivedCargoStore.remove(r);
				}
				else{
					r.set('rowAction','R');
					cc[cc.length]=r;
				}
			}
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(cc,'WReceivedCargo');
	        		if(xml){
	    				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
	        				success: function(r){
	        					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
	    						HTUtil.RUA(store,a,WStorageNoteCargo);
	    						receivedCargoStore.remove(cc);
	        				},
	        				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	        				xmlData:HTUtil.HTX(xml)
	        				});
	    			}
	    			else{
	    				alert("xml is empty！");
	    			}
	        	}
			},this);
		}
		else{
			alert("rows length=0!");
		}
	};
	
	var btnAddRC=new Ext.Button({text:"新增收货",iconCls:'add',disabled:p.get('status')>=5,
		scope:this,handler:addReceivedCargo}
	);
	//保存按钮
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',id:'btnSave',disabled:p.get('status')>5,
		scope:this,handler:saveReceivedCargo}
	);
	var btnDelRC=new Ext.Button({text:'删除',iconCls:'remove',disabled:p.get('status')>=5,
		scope:this,handler:delReceivedCargo});

	var grdReceivedCargo=new Ext.grid.EditorGridPanel({iconCls:'gen',title:'收货',
		layout:'fit',region:'south',height:230,
  	closable:true,columnLines:true,stripeRows: true,
  	store:receivedCargoStore,sm:smRCargo,cm:cmRCargo,
  	clicksToEdit:1,
  	tbar:[btnDelRC,btnSave],
  	listeners:{scope:this,			
			afterrender:function(){
				
			},
			beforeedit:function(e){
				
			},
			afteredit:function(e){
				if(cargoStore.getTotalCount()>0){
					var cargo=cargoStore.getAt(0);					
					var f=e.field;
					var r=e.record;
					var unitId=r.get('pUnitId');
					var standardQ=Fos.getStdQuantity(unitId,cargo);
					
					var sq=HTUtil.round2(standardQ[0]);
					var sgw=HTUtil.round2(standardQ[1]);
					var snw=HTUtil.round2(standardQ[2]);
					var sv=HTUtil.round4(standardQ[3]);
					var stm=0;
					var quantity=r.get('receivedQuantity');
					var packages=r.get('receivedPackages');	
			    	if(f=='receivedQuantity'){			    							
			    		quantity=HTUtil.round2(e.value);						
						packages=HTUtil.round2(quantity/sq);
						
			    	}
			    	if(f=='receivedPackages'){
			    		packages=HTUtil.nulltoZero(e.value);			    		
			    		quantity=HTUtil.round2(packages*sq);
			    	}
			    	if(f=='pUnit'){
			    		
			    		packages=HTUtil.round2(quantity/sq);
			    	}
			    	
			    	r.beginEdit();					
					r.set('receivedQuantity',quantity);
					r.set('receivedPackages',packages);
					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
					r.set('receivedVolume',HTUtil.round2(packages*sv));
					r.set('receivedMeasure',HTUtil.round2(packages*stm));
					
					r.set('standardQuantity',sq);
					r.set('standardGrossWeight',sgw);
					r.set('standardNetWeight',snw);
					r.set('standardVolume',sv);
					
					
		    		r.endEdit();
				}
			}
  	}
  	
	});
	
	//货物表选择事件
	var re={scope:this,
  		rowselect:function(sm,row,record){
  				if(this.sel!=record.get('id')){
  				this.sel=record.get('id');
  				receivedCargoStore.removeAll();
  				cargoStore.removeAll();
  				receivedCargoStore.load({params:{storageNoteCargoId:record.get('id')}});    				
  				cargoStore.load({params:{id:record.get('cargoId')}});    				
  			}
  		}
  		
  };
  //入库单货物明细grid	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:re});
  var cmIn=new Ext.grid.ColumnModel({columns:[sm,
  new Ext.grid.RowNumberer({header:'序号',width:36}),
  {header:'商品编号',dataIndex:'skuNo',width:85,align:'center'},
	{header:'商品名称',dataIndex:'cargoName',align:'center'},
	/*{header:'生产编号',dataIndex:'productNo',width:80,align:'center'},*/
	{header:'件数单位ID',dataIndex:'pUnitId',width:70,align:'center'},
	{header:'包装单位',dataIndex:'pUnit',width:70,align:'center'},
	{header:'包装数量',dataIndex:'planedPackages',width:70,align:'center'},
	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
	{header:'EA数量',dataIndex:'planedQuantity',width:70,align:'center'},
	{header:'收货数量',dataIndex:'receivedQuantity',width:70,align:'center'},
	{header:'调整数量',dataIndex:'adjustQuantity ',width:70,align:'center'},
	{header:'上架数量',dataIndex:'placedQuantity',width:70,align:'center'},
	{header:'重量单位',dataIndex:'wUnitName',width:70,align:'center'},
	{header:'计划毛重',dataIndex:'planedGrossWeight',width:80,align:'center'},
	{header:'计划净重',dataIndex:'planedNetWeight',width:80,align:'center'},
	{header:'收货毛重',dataIndex:'receivedGrossWeight',width:80,align:'center'},
	{header:'收货净重',dataIndex:'receivedNetWeight',width:80,align:'center'},
	{header:'体积单位',dataIndex:'vUnitName',width:70,align:'center'},
	{header:'计划体积',dataIndex:'planedVolume',width:90,align:'center'},
	{header:'收货体积',dataIndex:'receivedVolume',width:90,align:'center'},
	{header:'面积单位',dataIndex:'mUnitName',width:80,align:'center'},
	{header:'计划面积',dataIndex:'planedMeasure',width:80,align:'center'},
	{header:'收货面积',dataIndex:'receivedMeasure',width:80,align:'center'},
	
	{header:'单价',dataIndex:'unitPrice',width:80,align:'center'},
	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
	{header:'批次号',dataIndex:'batchNo',width:80,align:'center'},
	{header:'仓库',dataIndex:'warehouseName',width:80,align:'center'},
	{header:'库区',dataIndex:'areaName',width:80,align:'center'},
	{header:'库位',dataIndex:'blockName',width:80,align:'center'},	
	{header:'商品规格',width:120,dataIndex:'specification',align:'center'},
	{header:'商品型号',width:120,dataIndex:'cargoType',align:'center'},
	{header:'商品颜色',width:120,dataIndex:'cargoColor',align:'center'},
	{header:'备注',dataIndex:'remarks',width:80,align:'center'},
	{header:'质检标志',dataIndex:'qAFlag',width:80,align:'center'},
	{header:'质检类型',dataIndex:'qAType',width:80,align:'center'}
  ],defaults:{sortable:true,width:100}});    
  
  //新增商品
  var addCargo = function(){
  	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
  	else{
  		var c = new WStorageNoteCargo({uuid:HTUtil.UUID(32),
  			storageNoteId:p.get('id'),storageNoteNo:p.get('storageNoteNo'),
  			compCode:p.get('compCode'),
  			warehouseId:p.get('warehouseId'),warehouseCode:p.get('warehouseCode'),
  			warehouseName:p.get('warehouseName'), batchNo:p.get('batchNo'),storageType:p.get('storageType'),			
  			rowAction:'N'});
      	var win = new Fos.WNoteCargoWin(c,store);
      	win.show();
  	}    	
  };
  
  //编辑商品
  var editCargo = function(){
  	var c = sm.getSelected();
  	if(c.get('status')==5){
  		Ext.Msg.alert(SYS,"已经上架完成！不允许再编辑！");
  		return;
  	}
  	c.set('rowAction','M');
  	var win = new Fos.WNoteCargoWin(c,store);
  	win.show();
  };
  
  //删除商品
  var deleteCargo = function(){
  	if(p.get('status')==5){
  		Ext.Msg.alert(SYS,'该入库单的状态是完成状态，不能删除！');
  		return;
  	}
  	var b =sm.getSelections();
		if(b.length>0){
			for(var i=0;i<b.length;i++){
	    		if(!Ext.isEmpty(b[i].get('receivedQuantity'))&&b[i].get('receivedQuantity')!=0){
	    			Ext.Msg.alert(SYS,b[i].get('cargoName')+"已经收货，不能删除！");
	    			return ;
	    		}
			}
			
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WStorageNoteCargo');
	        		HTUtil.REQUEST('WSTORAGE_NOTE_CARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
  	
  };
  
  var autoReceived=function(){
  	var rows=sm.getSelections();
  	if(rows.length){
  		for(var i=0;i<rows.length;i++){
  			var r=rows[i];
  			if(r.get('rowAction')=='N'||r.get('rowAction')=='n'){
  				Ext.Msg.alert(SYS,"当前记录是新增状态，请先保存！");
  				return ;
  			}
  		}
  		for(var i=0;i<rows.length;i++){
  			var r=rows[i];
  			if(r.get('rowAction')==''||r.get('rowAction')=='M'){
  				if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity')))
  					createReceivedCargo(r);
  			}
  		}
  		
  		var mRCRows=receivedCargoStore.getModifiedRecords();
  		var xml='';
  		if(mRCRows.length){
  			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
  		}
  		if(xml){
  			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
  				success: function(r){
  					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
  					
						HTUtil.RUA(store,a,WStorageNoteCargo);
						var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
						HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
						Ext.Msg.alert(SYS,M_S);
  				},
  				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
  				xmlData:HTUtil.HTX(xml)
  				});
  		}
  		else{
  			
  		}
  		
  	}
  	else{
  		Ext.Msg.alert(SYS,"没有获得数据！");
  	}
  };
  
  var createReceivedCargo=function(r){
  	var t=new WReceivedCargo({
			storageNoteCargoId:r.get('id'),
			storageNoteNo:r.get('storageNoteNo'),
			storageNoteId:r.get('storageNoteId'),
			skuNo:r.get('skuNo'),
			cargoId:r.get('cargoId'),
			cargoName:r.get('cargoName'),
			specification:r.get('specification'),
			cargoType:r.get('cargoType'),
			cargoColor:r.get('cargoColor'),
			orderNo:r.get('orderNo'),
			cargoOwnerName:p.get('cargoOwnerName'),
			cargoOwnerId:p.get('cargoOwnerId'),
			standardQuantity:r.get('standardQuantity'),
			standardGrossWeight:r.get('standardGrossWeight'),
			standardNetWeight:r.get('standardNetWeight'),
			standardVolume:r.get('standardVolume'),
			standardMeasure:r.get('standardMeasure'),
			palletQuantity:1,
			status:0,
			verson:0,
			rowAction:'N',
			uuid:HTUtil.UUID(32)});
		
		t.set('warehouseId',r.get('warehouseId'));
		t.set('warehouseCode',r.get('warehouseCode'));
		t.set('warehouseName',r.get('warehouseName'));
		
		t.set('areaId',r.get('areaId'));
		t.set('areaCode',r.get('areaCode'));
		t.set('areaName',r.get('areaName'));
		
		t.set('blockId',r.get('blockId'));
		t.set('blockCode',r.get('blockCode'));
		t.set('blockName',r.get('blockName'));
		t.set('batchNo',r.get('batchNo'));
		t.set('productNo',r.get('productNo'));
		t.set('productDate',r.get('productDate'));
		//有效期至
		
		t.set('qaFlayType','待检测');
		t.set('qualityType',r.get('qualityType'));
		
		t.set('quantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('packages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('grossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('netWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('volume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('measure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedQuantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('receivedPackages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('receivedGrossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('receivedNetWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('receivedVolume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('receivedMeasure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedDate',new Date());
		
		t.set('unitName',r.get('unitName'));
		t.set('unitId',r.get('unitId'));
		t.set('pUnitId',r.get('pUnitId'));
		t.set('pUnit',r.get('pUnit'));
		t.set('wUnitName',r.get('wUnitName'));
		t.set('vUnitName',r.get('vUnitName'));
		t.set('mUnitName',r.get('mUnitName'));
		t.set('wUnitId',r.get('wUnitId'));
		t.set('vUnitId',r.get('vUnitId'));
		t.set('mUnitId',r.get('mUnitId'));
		
		t.set('dismantlingQuantity',0);
		receivedCargoStore.add(t);
		return r;
  };
  var btnAutoRCargo=new Ext.Button({text:'批量收货',iconCls:'compile',
  	disabled:p.get('status')>=5,
  	scope:this,handler:autoReceived});
  var btnAddCargo=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../addButton',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),disabled:p.get('status')>=5,
		 scope:this,handler:addCargo});
  var btnEditCargo=new Ext.Button({text:C_EDIT,ref:'../editButton',iconCls:'option',
		 hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)),
		 scope:this,handler:editCargo});
  var btnRemoveCargo=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeButton',
  	    	  hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),
  	    	  scope:this,handler:deleteCargo});
  //货物明细的grid
	var grid=new Ext.grid.GridPanel({
  	iconCls:'gen',title:C_CARGO_LIST,layout:'fit',autoscoll:'true',region:'center',
  	closable:false,store:store,sm:sm,cm:cmIn,
  	listeners:{scope:this,
  		rowdblclick: function(grid, rowIndex, event){    				
      		editCargo();
  		}},
  	tbar:[btnAddCargo,
  	      btnEditCargo,
  	      btnRemoveCargo,
  	      btnAddRC,
  	      btnAutoRCargo]
	});

	//只有在订单状态为新增的情况下面，才能新增保存
	this.save=function(){
		btnSave.suspendEvents();
		var cargoOwner=tab.find('name','cargoOwnerName');		
		var planedTime=tab.find('name','planedTime');
		
		//货主不可为空
		if(cargoOwner==null||cargoOwner[0].getValue()==''){
			XMG.alert(SYS,C_CARGO_OWNER_REQUIRED,function(){cargoOwner[0].focus();});
			return;
		};
		
		//客户订单号不可为空
		if(txtOrderNo.getValue()==''){
			XMG.alert(SYS,"订单号不能为空",function(){txtOrderNo.focus();});
			return;
		};
		
		//预计提货时间不可为空
		if(planedTime==null||planedTime[0].getValue()==''){
			XMG.alert(SYS,C_PLANED_IN_DATE_REQUIRED,function(){planedTime[0].focus();});
			return;
		};
		//cboActionGategory
		if(Ext.isEmpty(cboActionGategory.getValue())){
			XMG.alert(SYS,"类别不能为空！",function(){cboActionGategory.focus();});
			return ;
		}
		p.beginEdit();
		
		var f = WStorageNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
      	var fn = ''+f.keys[i];
      	var fc = this.find('name',fn);
      	if(fc!=undefined&&fc.length>0){
      		p.set(fn,fc[0].getValue());
      	}
 	 	}
		
		var status=p.get('status');
		switch(status){
			case '新增':
				p.set('status','0');
				break;
			case '已提交':
				p.set('status','1');
				break;
			case '收货中':
				p.set('status','2');
				break;
			case '收货完成':
				p.set('status','3');
				break;
			case '上架中':
				p.set('status','4');
				break;
			case '上架完成':
				p.set('status','5');
				break;
			case '已作废':
				p.set('status','6');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				break;
			default:				
				break;
		}
		
		p.set('storageClassId',storageClassId);
		p.endEdit();
 	 	var xml = HTUtil.RTX(p,'WStorageNote',WStorageNote);
 	 	btnSave.disable();
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WStorageNote',WStorageNote);
				var ra=p.get('rowAction');
				var f = WStorageNote.prototype.fields;
				p.beginEdit();
 				for (var i = 0; i < f.keys.length; i++) {
 					var fn = ''+f.keys[i];
 					p.set(fn,c.get(fn));
 				};
				if(ra=='N'){
					this.find('name','storageNoteNo')[0].setValue(p.get('storageNoteNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				btnSave.enable();
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				btnSave.enable();
			},
			
			//在xml文档外面封装HtRequest标签
			xmlData:HTUtil.HTX(xml)
		});
		btnSave.resumeEvents();
	};
	
	//删除单据
	this.removeNote=function(){
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
      	if(btn == 'yes') {
      		if(p.get('status')==0){
      			p.set('rowAction',p.get('rowAction')=='N'?'D':'R');
	        		var xml = HTUtil.RTX4R(p,'WStorageNote');
	        		
	            	//HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,this.removeTab,this);
	        		//Ext.getCmp('removeBtn').setDisabled(true);
	        		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
	        			success: function(res){
	        				p.beginEdit();           				
	        				p.set('rowAction','R');        				
	        				p.endEdit();
	        				this.updateToolBar();
	        				this.removeTab(res,this);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			failure: function(res){
	        				XMG.alert(SYS,M_F+res.responseText);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			
	        			//在xml文档外面封装HtRequest标签
	        			xmlData:HTUtil.HTX(xml)
	        		});
      		}
      		else{
      			XMG.alert(SYS,'该入库单不是新增状态，不能删除！');
      		}
      	}
		},this);
	};

	var title = p.get('rowAction')=='N'?(C_ADD+C_IN_STORAGE_NOTE):(C_IN_STORAGE_NOTE+'-'+p.get('storageNoteNo'));
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',ref:'../saveBtn',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),scope:this,handler:this.save});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),scope:this,handler:this.removeNote});

	var basicPanel=new Ext.form.FormPanel({title:'主信息',
		
		items:[masterInfoPanel,pnlCustInfo,pnlTransInfo,otherInfoPanel]
	});
	
	var cargoPanel=new Ext.Panel({title:'货物信息',
		layout:'border',
		items:[grid,grdReceivedCargo]
	});
	var tab=new Ext.TabPanel({activeTab:0,region:'center',height:200,
		items:[basicPanel,cargoPanel]});
	
	Fos.WsStorageTab.superclass.constructor.call(this, {
	id: 'STORAGE_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',
	tbar:
		[btnSave,'-',
		 btnRemove],
	items: [tab]
	},this.updateToolBar());
};
Ext.extend(Fos.WsStorageTab, Ext.Panel);






//出库单主界面
Fos.WSOutPanel = function(p) {
	
	var storageClassId=p.get('storageClassId');
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var atStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WASSETS_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WAssets',id:'id'},WAssets),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	 var rateStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_RATE_Q',baseParams:{_mt:'xml'},
	    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageRate',id:'id'},WStorageRate),
	    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	    });
    if(p.get('rowAction')!='N'){
    	store.load({params:{storageNoteId:p.get('id')}});
       atStore.load({params:{storageNoteId:p.get('id')}});
       rateStore.load({params:{storageNoteId:p.get('id')}});
    }
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});

    //构建出库单grid
    var cmOut=new Ext.grid.ColumnModel({columns:[sm,new Ext.grid.RowNumberer({header:'序号',width:36}),
    {header:C_SKU_NO,dataIndex:'skuNo'},
	{header:C_CARGO_NAME,dataIndex:'cargoName'},
	{header:C_QUANTITY_UNIT,dataIndex:'unitName'},
	{header:C_QUANTITY,dataIndex:'planedQuantity'},
	{header:C_PICKED_QUANTITY,dataIndex:'pickedQuantity'},
	{header:"调整数量",dataIndex:'AdjustQuantity'},
	{header:C_WEIGHT_UNIT,dataIndex:'wUnitName'},
	{header:C_GROSS_WEIGHT,dataIndex:'planedGrossWeight'},
	{header:C_NET_WEIGHT,dataIndex:'planedNetWeight'},
	{header:C_CBM_S,dataIndex:'plademeasurement'},
	{header:C_UNIT_PRICE,dataIndex:'unitPrice'},
	{header:C_PRODUCT_DATE,dataIndex:'productDate',renderer:formatDate},
	
	{header:C_SPECIFICATION,width:120,dataIndex:'specification'},
	{header:C_BATCH_NO,dataIndex:'batchNo'},
	{header:'备注',dataIndex:'remarks'}
	
    ],defaults:{sortable:true,width:100}});
    
    var addCargo = function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WStorageNoteCargo({uuid:HTUtil.UUID(32),
    			storageNoteId:p.get('id'),storageNoteNo:p.get('storageNoteNo'),
    			warehouseId:p.get('warehouseId'),warehouseCode:p.get('warehouseCode'),
    			warehouseName:p.get('warehouseName'), batchNo:p.get('batchNo'),storageType:p.get('storageType'),			
    			rowAction:'N'});
        	var win = new Fos.WNoteCargoOutWin(c,store);
        	win.show();
    	}    	
    };
    var editCargo = function(){
    	var c = sm.getSelected();
    	c.set('rowAction','M');
    	var win = new Fos.WNoteCargoOutWin(c,store);
    	win.show();
    };
    var deleteCargo = function(){
    	var b =sm.getSelections();
		if(b.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WStorageNoteCargo');
	        		HTUtil.REQUEST('WSTORAGE_NOTE_CARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
	var grid=new Ext.grid.GridPanel({
    	title:C_CARGO_LIST,layout:'fit',
    	closable:false,store:store,sm:sm,cm:cmOut,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			if (p.get('status')!=0){
    				return;
    			}
        		editCargo();
    		}},
    		
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),disabled:p.get('status')!=0,handler:addCargo},'-',
    	      {text:C_EDIT,ref:'../editButton',iconCls:'option',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EDIT)),disabled:p.get('status')!=0,handler:editCargo},'-',
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),disabled:p.get('status')!=0,scope:this,handler:deleteCargo}]
    		
	});

	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				p.beginEdit();
				p.set('status',s);
				p.set('version',p.get('version')+1);
				p.endEdit();
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				var status=frm.find('name','status');
				//如果改为了未提交
				if(status){
					if (s==0)
					{
							status[0].setValue(HTStore.getOutWarehouseNoteStatus(0));
							grid.addButton.enable();
							grid.editButton.enable();
							grid.removeButton.enable();
					}
					//如果改为了提交
					if (s==1)
					{
						status[0].setValue(HTStore.getOutWarehouseNoteStatus(1));
						grid.addButton.disable();
						grid.editButton.disable();
						grid.removeButton.disable();
					}
				}
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};
	
	
	//出库单号
	var txtOutStorageNoteNo={fieldLabel:C_OUT_STORAGE_NOTE_NO,
			name:'storageNoteNo',value:p.get('storageNoteNo'),tabIndex:1,
			ref:'../storageNoteNo',readOnly:true,xtype:'textfield',anchor:'95%'};
	//客户订单号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'委托编号',name:'entrustNo',value:p.get('entrustNo'),
		tabIndex:6,ref:'../entrustNo',anchor:'95%'});
	
	//类别
	var cboActionGategory=new Ext.form.ComboBox({fieldLabel:'类别',name:'actionGategory',value:p.get('actionGategory'),
	    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:12,itemCls:'required',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,select:function(c,r,i){
			p.set('actionGategoryId',r.get('CODE'));
		}}
     });
	
	

	
	var validationOrderNo=function(f){
		if(f!=null){
			Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'WSTORAGE_NOTE_VRO',_mt:'xml',orderNo:f.getRawValue(),storageType:1},
				success: function(r){
					var a=HTUtil.XTRA(r.responseXML,'WStorageNote',WStorageNote);
					if(a.length>0){
						f.setValue('');
						Ext.Msg.alert(SYS,'该订单号已经存在不能重复录入！');
					}
				}
				
			});
		}
	};
	
	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:C_ORDER_NO,name:'orderNo',value:p.get('orderNo'),tabIndex:7,
			ref:'../orderNo',xtype:'textfield',itemCls:'required',anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(ORDER_NO_ONLY){
						if(f.getRawValue()!=''){
							if(p.get('rowAction')=='M'||p.get('rowAction')==''){
								if(f.getRawValue()!=p.get('orderNo')){
									validationOrderNo(f);
								}
							}
							else if(p.get('rowAction')=='N'){
								validationOrderNo(f);
							}
						}
					}
				}
			}
	});
	var txtCargoOwner= new Ext.form.TextField({fieldLabel:'货主名称',name:'cargoOwnerName',readOnly:true,value:p.get('cargoOwnerName'),anchor:'95%'});
	//货主
	var cboCargoOwnerCode={fieldLabel:'货主代码',tabIndex:5,name:'cargoOwnerCode',value:p.get('cargoOwnerCode'),itemCls:'required',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerCode',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custCode',readOnly:true,
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoOwnerId','');
				}},
			select:function(c,r,i){
				p.set('cargoOwnerId',r.get('id'));
				txtCargoOwner.setValue(r.get('custNameCn'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		};
	
	
	var listTransCarrier=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F_CARRIER',_mt:'xml',transCarrier:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	var txtCarrier11= new Ext.form.TextField({fieldLabel:'承运人名称',name:'transCarrier',value:p.get('transCarrier'),anchor:'95%'});
	var cboCarrier22=new Ext.form.ComboBox({fieldLabel:'承运人代码',name:'transCarrier',itemCls:'required',
	    store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F_CARRIER'),tabIndex:12,value:p.get('transCarrier'),
	    displayField:'transCarrier',valueField:'transCarrier',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,anchor:'95%',
			listeners:{scope:this,
				keyup:{fn:function(f,e){
					listTransCarrier(f,e);
				},buffer:800},
				select : function(f,r,i){
					txtCarrier11.setValue(r.get('transCarrier'));
				}
		 	}
     });

	//接单日期
	var dteStorageDate={fieldLabel:C_STORAGE_DATE,tabIndex:4,name:'storageDate',value:p.get('storageDate'),altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
			ref:'../storageDate',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'};
	
	//预计出库时间
	var dtePlanedTime={fieldLabel:'预计出库时间',tabIndex:3,name:'planedTime',value:p.get('planedTime'),altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
			ref:'../planedTime',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'};
	
	//状态
	var txtStatus={fieldLabel:C_STATUS,name:'status',value:HTStore.getOutWarehouseNoteStatus(p.get('status')),tabIndex:7,
			disabled:true,ref:'../status',xtype:'textfield',style:'{font-weight:bold;color:green;}',anchor:'95%'};
	
	
	//客户
	var txtCustNamer=new Ext.form.TextField({fieldLabel:'收货人名称',tabIndex:1,name:'custName',value:p.get('custName'),xtype:'textfield',anchor:'95%'});
	//客户
	var txtCustName=new Fos.CustomerLookup({fieldLabel:'收货人代码',tabIndex:5,name:'custName',value:p.get('custName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custCode',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			select:function(c,r,i){
				p.set('custId',r.get('id'));
				var custContact=tab.find('name','custContact');
				var custTel=tab.find('name','custTel');
				/*var custFax=tab.find('name','custFax');*/
				var loadAddress=tab.find('name','loadAddress');
				if(custContact)
					custContact[0].setValue(r.get('custContact'));
				if(custTel)
					custTel[0].setValue(r.get('custTel'));
				if(loadAddress)
					loadAddress[0].setValue(r.get('custAddress'));
				txtCustNamer.setValue(r.get('custNameCn'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});

	//联系电话
	var txtCustTel={fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),tabIndex:2,
			ref:'../custTel',xtype:'textfield',anchor:'95%'};
	
	//费用联系人
	var txtAccountContact={fieldLabel:C_CONTACT,name:'accountContact',value:p.get('accountContact'),tabIndex:6,
			xtype:'textfield',anchor:'95%'};
	
	//收货联系人
	var txtCustContact={fieldLabel:'联系人',name:'custContact',value:p.get('custContact'),tabIndex:3,
			ref:'../custContact',xtype:'textfield',anchor:'95%'};
	
	var listConsignee=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F',_mt:'xml',loadAddress:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){
				
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	//送货地址
	var loadAddress=new Ext.form.ComboBox({fieldLabel:'送货地址',name:'loadAddress',value:p.get('loadAddress'),tabIndex:4,anchor:'95%',
		store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F'),
		displayField:'loadAddress',valueField:'loadAddress',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			keyup:{fn:function(f,e){
				listConsignee(f,e);
			},buffer:600},
			select:function(c,r,i){
		}
	 	}
	});
	
	//客户要求
	var txtCustRequirement={fieldLabel:'客户要求',name:'custRequirement',value:p.get('custRequirement'),
			xtype:'textfield',
			tabIndex:8,anchor:'95%'};

	//装货地址
	var c27={fieldLabel:'装货地址',name:'loadingaddress',value:p.get('loadingaddress'),tabIndex:13,xtype:'textfield',anchor:'95%'};
	
	//卸货地址
	var c28={fieldLabel:'卸货地址',name:'unloadingaddress',value:p.get('unloadingaddress'),xtype:'textfield',tabIndex:2,anchor:'95%'};
	
	//目的地
	var c32={fieldLabel:'目的地',name:'destination',value:p.get('destination'),tabIndex:3,xtype:'textfield',anchor:'95%'};
	
	//付款方式
	var c33={fieldLabel:'付款方式',tabIndex:7,name:'pateName',value:p.get('pateName'),store:HTStore.getPATE_S(),
    		xtype:'combo',displayField:'pateName',valueField:'pateName',typeAhead:true,
    		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
	
	var ccboTrans=new Ext.form.ComboBox({fieldLabel:'运输方式',name:'inUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('inUnitValue'),displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	var ccboGaveCargo=new Ext.form.ComboBox({fieldLabel:'交货条款',name:'inUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('inUnitValue'),displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	var txtPayment=new Ext.form.TextField({fieldLabel:'付款描述',anchor:'95%'});
	
	var txtGaveGargo=new Ext.form.TextField({fieldLabel:'交货描述',anchor:'95%'});
	
	var txtNumber=new Ext.form.TextField({fieldLabel:'总件数',anchor:'95%'});
	
	var txtGW=new Ext.form.TextField({fieldLabel:'总毛重',anchor:'95%'});
	
	var txtGN=new Ext.form.TextField({fieldLabel:'总净重',anchor:'95%'});
	
	var txtVolume=new Ext.form.TextField({fieldLabel:'总体积',anchor:'95%'});
	
	var txtCost=new Ext.form.TextField({fieldLabel:'总价值',anchor:'95%'});
	
	var basePanel=new Ext.Panel({
		layout:'column',labelAlign:'right',layoutConfig:{columns:5},padding:5,title:'出库基本信息',
		items:[
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,
				items:[txtOutStorageNoteNo]},
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,
					items:[cboActionGategory]},
			{columnWidth:.25,labelWidth:95,layout:'form',border:false,items:[
			    dtePlanedTime]},
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
			    dteStorageDate]},
		    {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
		         cboCargoOwnerCode]}, 
	        {columnWidth:.5,labelWidth:80,layout:'form',border:false,items:[				
	             txtCargoOwner]}, 
            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
                 txtOrderNo]}, 
            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
 		         txtEntrustNo]}, 
 	        {columnWidth:.5,labelWidth:80,layout:'form',border:false,items:[				
 	             txtCustRequirement]}, 
             {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
                  txtStatus]}
			]
	});
	
	var receiverPanel=new Ext.Panel({
		title:'收货人信息',padding:5,height:100,labelAlign:'right',
		labelWidth:90,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[txtCustName,txtCustTel ]},
		       {columnWidth:.5,layout:'form',border:false,
		    	   items:[txtCustNamer,loadAddress]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtCustContact ]}
				]
	});
	
	
	var carrierPanel=new Ext.Panel({
		title:'承运人信息',height:150,padding:5,labelAlign:'right',
		labelWidth:80,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[cboCarrier22]},
		       {columnWidth:.5,layout:'form',border:false,
				   items:[txtCarrier11]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtAccountContact]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtCustTel]},
			   {columnWidth:.5,layout:'form',border:false,
				   items:[c27]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[ccboTrans]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c33]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtPayment]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[ccboGaveCargo]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtGaveGargo]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c28]}, 
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c32]}
	    	  ]
	});

	var OtherPanel=new Ext.Panel({
		title:'其他信息',height:110,padding:5,labelAlign:'right',
		labelWidth:80,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[txtNumber,txtCost]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[txtGW]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtGN]},
	          {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtVolume]}
				]
	});
	
	
	
	this.updateToolBar = function(){
		btnSave.setDisabled(p.get('status')!=0);
		btnRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
	};
	var noteName =C_OUT_STORAGE_NOTE;
	var title = p.get('rowAction')=='N'?(C_ADD+noteName):(noteName+'-'+p.get('storageNoteNo'));
	
	//保存
	this.save=function(){
		btnSave.suspendEvents();
		var cargoOwner=frm.find('name','cargoOwnerName');
		var storageDate=frm.find('name','storageDate');
		var planedTime=frm.find('name','planedTime');
		var txtCustName=frm.find('name','custName');
		var transCarrier=frm.find('name','transCarrier');
		
		//货主不可为空
		if(cargoOwner==null||cargoOwner[0].getValue()==''){
			XMG.alert(SYS,C_CARGO_OWNER_REQUIRED,function(){cargoOwner[0].focus();});
			return;
		};
		//承运商
		if(transCarrier==null || transCarrier[0].getValue()==''){
			XMG.alert(SYS,'承运商不能为空！',function(){transCarrier[0].focus();});
			return ;
		}
		//接单日期不可为空
		if(storageDate==null||storageDate[0].getValue()==''){
			XMG.alert(SYS,C_STORAGE_DATE_REQUIRED,function(){storageDate[0].focus();});
			return;
		};
		//预计提货时间不可为空
		if(planedTime==null||planedTime[0].getValue()==''){
			XMG.alert(SYS,C_PLANED_OUT_DATE_REQUIRED,function(){planedTime[0].focus();});
			return;
		};  
		
		//订单号不能为空
		if(txtOrderNo.getValue()==''){
			XMG.alert(SYS,"订单号不能为空！",function(){txtOrderNo.focus();});
			return;
		};  
		if(txtCustName==null||txtCustName[0].getValue()==''){
			XMG.alert(SYS,"客户不能为空！",function(){txtCustName[0].focus();});
			return;
		};  
		
		if(Ext.isEmpty(cboActionGategory.getValue())){
			XMG.alert(SYS,"类别不能为空！",function(){cboActionGategory.focus();});
			return ;
		}
		p.beginEdit();
		//frm.getForm().updateRecord(p);
		var f = WStorageNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		var status=p.get('status');
		switch(status){
			case '新增':
				p.set('status','0');
				break;
			case '已提交':
				p.set('status','1');
				break;
			case '配货中':
				p.set('status','2');
				break;
			case '配货完成':
				p.set('status','3');
				break;
			case '出库中':
				p.set('status','4');
				break;
			case '出库完成':
				p.set('status','5');
				break;
			case '已作废':
				p.set('status','6');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				break;
			default:				
				break;
		}
		p.set('storageClassId',storageClassId);
		p.endEdit();
   	 	var xml = HTUtil.RTX(p,'WStorageNote',WStorageNote);
   	 	Ext.getCmp('btnSave').setDisabled(true);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WStorageNote',WStorageNote);
				var ra=p.get('rowAction');
				var f = WStorageNote.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){
					this.find('name','storageNoteNo')[0].setValue(p.get('storageNoteNo'));
					this.find('name','entrustNo')[0].setValue(p.get('entrustNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				this.updateToolBar();
				

				
				XMG.alert(SYS,M_S);
				Ext.getCmp('btnSave').setDisabled(false);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				Ext.getCmp('btnSave').setDisabled(false);
			},
			
			//在xml文档外面封装HtRequest标签
			xmlData:HTUtil.HTX(xml)
		});
		
		btnSave.resumeEvents();
	};
	
	
	//删除出库单
	this.removeNote=function(){
		Ext.getCmp('removeBtn').setDisabled(true);
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.RTX4R(p,'WStorageNote');
            	HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,this.removeTab,this);
        	}
		},this);
		Ext.getCmp('removeBtn').setDisabled(false);
	};

	var btnSave=new Ext.Button({text:C_SAVE,id:'btnSave',iconCls:'save',ref:'../saveBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),scope:this,handler:this.save});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',ref:'../removeBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),scope:this,handler:this.removeNote});
	
	var frm = new Ext.form.FormPanel({title:'主信息',
		frame:false,autoScroll:true,
		items:[basePanel,receiverPanel,carrierPanel,OtherPanel]
	});
	
	var tab=new Ext.TabPanel({activeTab:0,region:'center',
		items:[frm,grid]});
	
	Fos.WSOutPanel.superclass.constructor.call(this, {
	id: 'STORAGE_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',autoScroll:true,
	tbar:
		[btnSave,'-',
		 btnRemove
		 ],
	items: [tab]
	},this.updateToolBar());
};
Ext.extend(Fos.WSOutPanel, Ext.Panel);




