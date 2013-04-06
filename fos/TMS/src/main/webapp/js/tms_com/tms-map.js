//车辆跟踪（地图）
var getMapPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: [new Fos.mapPanle()]});
	//var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	
	var items=[];
	/*if(HR(M1_TRACK)){
		items[items.length]={text:'发送信息测试',iconCls:'application_view_list',scope:this,
			handler:function(){
				var sendWin=new Fos.simSendInfo();
				sendWin.show();
			}
		};
	}*/
	//车辆树
	if(HR(M1_TRACK)) items[items.length]=createSimEquiTree(panel);
	
	var posiPanel = new Ext.Panel({title:'车辆跟踪',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})
	});
	
	var menuPanel = new Ext.Panel({title:'车辆跟踪',region:"west",width:"180",collapsible:false,
		layout:'accordion',split:true,collapseMode:'mini',iconCls:'',maxSize:220,
		items:[posiPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	
	createWindow('TRACK','车辆跟踪',contPanel);
};
//版本2
var getMapPanel_v2=function(){
	createWindow('TRACK','车辆跟踪',new Fos.mapPanle());
};

//车辆树
var createSimEquiTree=function(panel){
	/*Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'SIM_EQUI_Q'},
				success: function(r){
					var doc = r.responseXML;
					var r = doc.documentElement || doc;	
					var q = Ext.DomQuery;
					var ns = q.select('TSimEquipment', r);
					if(ns.length>0){
						for(var i=0;i<ns.length;i++){
							//var simEquiNo=HTUtil.XTS(ns[i],'simEquiNo');
							var vehicleNo=HTUtil.XTS(ns[i],'vehicleNo');
							alert(vehicleNo);
						}
					}
				},
				failure: function(r){
					Ext.MessageBox.alert(SYS,'请求失败!');
				}
			});*/
	var root= new Ext.tree.TreeNode({text:'车辆跟踪',leaf:false,expanded:true});
	var tree = new Ext.tree.TreePanel({title:'',rootVisible:true,height:300,frame:false,border:false,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true
	});
	var treeNode1 = CreateNode('沪A2047','NODE1',panel,'online',function(){return new Fos.mapPanle();});
	root.appendChild(treeNode1);
	var treeNode2 = CreateNode('沪BH8523','NODE2',panel,'online',function(){return new Fos.mapPanle();});
	root.appendChild(treeNode2);
	
	tree.on('click',function(node,event){
		var id=node.attributes.id;						//被点击的ID
		var name=node.attributes.text;					//被点击文本
		if(!node.hasChildNodes()){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'SIM_POSI_Q',vehicleNo:name},
				success: function(r){
					var c = HTUtil.XTRLAST(r.responseXML,'TSimPosition',TSimPosition);
					if(c){
						var mkr_point = new GLatLng(c.get('lat'),c.get('lng'));
                		panel.getActiveTab().map.addMarker(mkr_point,{title:name},false,false,{
		                    click: function(e){
			                	
		                    }
		                });
					}else{
						XMG.alert(SYS,'车牌号与设备还没有绑定!');
					}
				},
				failure: function(r){
					Ext.MessageBox.alert(SYS,'请求失败!');
				}
			});
		}
	});
	tree.setRootNode(root);
	return tree;
}

//地图
Fos.mapPanle=function(){
	var destroyFlag=0;
	/*Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
		params:{_A:'SIM_EQUI_Q'},
		success: function(r){
			var doc = r.responseXML;
			var r = doc.documentElement || doc;	
			var q = Ext.DomQuery;
			var ns = q.select('TSimEquipment', r);
			if(ns.length>0){
				var bl=false;
				for(var i=0;i<ns.length;i++){
					var vehicleNo=HTUtil.XTS(ns[i],'vehicleNo');
					if(vehicleNo!=''){
						Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
							params:{_A:'SIM_POSI_Q',vehicleNo:vehicleNo},
							success: function(r){
								bl=true;
								var c = HTUtil.XTRLAST(r.responseXML,'TSimPosition',TSimPosition);
								if(c){
									var mkr_point = new GLatLng(c.get('lat'),c.get('lng'));
			                		this.map.addMarker(mkr_point,{title:vehicleNo+'\n'+c.get('address')},false,true,{
					                    click:function(e){
						                	
					                    }
					                });
								}
							},
							failure: function(r){
								Ext.MessageBox.alert(SYS,'请求失败!');
							}
						});
					}
				}
			}
		},
		failure: function(r){
			Ext.MessageBox.alert(SYS,'请求失败!');
		}
	});*/
		
	this.map = new Ext.ux.GMapPanel({
    	xtype: 'gmappanel',
        region: 'center',
        zoomLevel: 14,
        gmapType: 'map',
        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
        mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
        setCenter:{//31.2638224 121.5376618
            geoCodeAddr:'上海市平凉路1380号',
            marker: {title:comAddress},
			listeners:{
	            click:function(e){
            		window.open(comWeb);
	            }
	        }
        }
    });
    //选择车牌号
	var cboVehicleNo = new Ext.form.ComboBox({fieldLabel:'选择跟踪的车辆',anchor:'95%',
		name:'vehicleNo',value:'',itemCls:'red-b',editable:false,
		tabIndex:2,store:HTStore.getSimEqui(),displayField:'vehicleNo',valueField:'vehicleNo',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,v){
				var vehicleNo=r.get('vehicleNo');
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
					params:{_A:'SIM_POSI_CURR',vehicleNo:vehicleNo},
					success: function(r){
						var c = HTUtil.XTR(r.responseXML,'TSimPosition',TSimPosition);
						if(c){
							//alert(c.get('simEquiNo')+':'+c.get('lat')+':'+c.get('lng'));
							var mkr_point = new GLatLng(c.get('lat'),c.get('lng'));
	                		this.map.addMarker(mkr_point,{title:vehicleNo+'\n'+c.get('address')},false,true,{
			                    click:function(e){
				                	getTransTaskWin(vehicleNo);
			                    }
			                });
						}else{
							XMG.alert(SYS,'车牌号与设备还没有绑定!');
						}
					},
					failure: function(r){
						Ext.MessageBox.alert(SYS,'请求失败!');
					}
				});
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	this.panel=new Ext.Panel({layout:'fit',
		items:this.map,
		tbar:new Ext.FormPanel({border:false,layout:'column',height:28,padding:2,labelAlign:'right',
			items:[{border:false,layout:'form',columnWidth:'.2',labelWidth:100,items:[cboVehicleNo]}]
		})
	});
	
	function updateMarkPosition(temMap,destroyFlag){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'SIM_POSI_CURR'},
			success: function(r){
				var doc = r.responseXML;
				var r = doc.documentElement || doc;	
				var q = Ext.DomQuery;
				var ns = q.select('TSimPosition', r);
				if(ns.length>0){
					if(destroyFlag==0){
						temMap.addMarker(new GLatLng('',''),{},true);
					}
					for(var i=0;i<ns.length;i++){
						var vehicleNo=HTUtil.XTS(ns[i],'vehicleNo');
						var lat=HTUtil.XTS(ns[i],'lat');
						var lng=HTUtil.XTS(ns[i],'lng');
						var address=HTUtil.XTS(ns[i],'address');
						if(!address){address='';}
						var mkr_point = new GLatLng(lat,lng);
						//var marker=new GMarker(mkr_point);
                		temMap.addMarker(mkr_point,{title:vehicleNo+'\n'+address},false,false,{
		                    click:function(e){
			                	getTransTaskWin(vehicleNo);
		                    }
		                });
					}
				}
			},
			failure: function(r){
				Ext.MessageBox.alert(SYS,'请求失败!');
			}
		});
	}
	var temMap=this.map;
	var task = {
	    run:function(){
	        updateMarkPosition(temMap,destroyFlag);
	    },
	    interval:15*1000
	}
	Ext.TaskMgr.start(task);
	
	Fos.mapPanle.superclass.constructor.call(this, {
		iconCls:'gen',
		id:'T_RACK',
		title:'',
		layout: 'fit',
		//closable:true,
		items: [this.panel],
		listeners:{scope:this,
			destroy:function(c){
				if(destroyFlag==0){
					Ext.TaskMgr.stop(task);
				}
			}
		}
	});
}
Ext.extend(Fos.mapPanle, Ext.Panel);

//车辆跟踪位置发送测试
Fos.simSendInfo = function(){
	var txtFoctoryName=new Ext.form.TextField({
		fieldLabel:'制造商',tabIndex:1,itemCls:'required',allowBlank:false,
		name:'factoryName',anchor:'95%'
	});
	var txtSimEquiNo = new Ext.form.TextField({
		fieldLabel:'设备号',tabIndex:1,itemCls:'required',allowBlank:false,
		name:'simEquiNo',anchor:'95%'
	});
	var txtDirection = new Ext.form.TextField({
		fieldLabel:'方位',tabIndex:1,itemCls:'required',allowBlank:false,
		name:'direction',anchor:'95%'
	});
	var numSpeed = new Ext.form.NumberField({
		fieldLabel:'超速(Km/h)',tabIndex:1,itemCls:'required',allowBlank:false,
		name:'speed',anchor:'95%'
	});
	var numLat = new Ext.form.NumberField({
		fieldLabel:'纬度',tabIndex:1,itemCls:'required',allowBlank:false,
		name:'lat',anchor:'95%'
	});
	var numLng = new Ext.form.NumberField({
		fieldLabel:'经度',tabIndex:2,itemCls:'required',allowBlank:false,
		name:'lng',anchor:'95%'
	});
	
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,layout:'form',items:[
			txtFoctoryName,txtSimEquiNo,txtDirection,numSpeed,numLat,numLng
	    ]});
	    
	this.save = function(){
		if(txtFoctoryName.getValue()==''){
			Ext.Msg.alert(SYS,'请填写制造商！',function(){txtFoctoryName.focus();},this);
			return;
		};
		if(txtSimEquiNo.getValue()==''){
			Ext.Msg.alert(SYS,'请填写设备号！',function(){txtSimEquiNo.focus();},this);
			return;
		};
		if(txtDirection.getValue()==''){
			Ext.Msg.alert(SYS,'请填写方位！',function(){txtDirection.focus();},this);
			return;
		};
		if(numSpeed.getValue()==''){
			Ext.Msg.alert(SYS,'请填写超速！',function(){numSpeed.focus();},this);
			return;
		};
		if(numLat.getValue()==''){
			Ext.Msg.alert(SYS,'请填写纬度！',function(){numLat.focus();},this);
			return;
		};
		if(numLng.getValue()==''){
			Ext.Msg.alert(SYS,'请填写经度！',function(){numLng.focus();},this);
			return;
		};
		var name=txtFoctoryName.getValue();
		var simEquiNo=txtSimEquiNo.getValue();
		var direction=txtDirection.getValue();
		var speed=numSpeed.getValue();
		var lat=numLat.getValue();
		var lng=numLng.getValue();
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'SIM_POSI_S',foctoryName:name,simEquiNo:simEquiNo,direction:direction,
					speed:speed,lat:lat,lng:lng},
			success: function(r){
					Ext.MessageBox.alert(SYS,'发送成功!');
					this.close();
			},
			failure: function(r){
				Ext.MessageBox.alert(SYS,'发送失败!');
			}
		});
	};
	
	Fos.simSendInfo.superclass.constructor.call(this,{buttonAlign:'right',
		title:'发送信息测试',layout:'fit',
		width:400,height:270,modal:true,
	  	items:[frm],
	  	buttons:[{text:'发送',iconCls:'ok',scope:this,handler:this.save},
	  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.simSendInfo,Ext.Window);

//车辆跟踪设备管理
Fos.EquiGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'SIM_EQUI_Q',_mt:'json'},
		reader: new Ext.data.JsonReader({totalProperty:'rowCount',root:'TSimEquipment',id:'id'},TSimEquipment),
		remoteSort: true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start:0,limit:C_PS30}});
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect: true
	});
	var cm = new Ext.grid.ColumnModel({
		columns:[new Ext.grid.RowNumberer(),sm,
		{header:boldFont('车辆名称'),dataIndex:'vehicleName'},
		{header:boldFont('车牌号'),dataIndex:'vehicleNo'},
		{header:boldFont('设备号'),dataIndex:'simEquiNo'},
		{header:boldFont('开通日期'),dataIndex:'simStartDate',renderer: formatDate},
		{header:boldFont('到期日期'),dataIndex:'simEndDate',renderer: formatDate},
		{header:boldFont('最后位置'),dataIndex:'address',width:200}],
		defaults: {sortable:true,width:180}
	});
	this.showEqui = function(p) {
		var win = new Fos.EquiWin(p, store);
		win.show();
	};
	this.add = function() {
		var p = new TSimEquipment({
			uuid: HTUtil.UUID(32),
			rowAction: 'N'
		});
		this.showEqui(p);
	};
	this.del = function() {
		var b = sm.getSelected();
		if (b) {
			Ext.Msg.confirm(SYS, M_R_C,
			function(btn) {
				if (btn == 'yes') {
					var xml = HTUtil.RTX4R(b,'TSimEquipment');
					HTUtil.REQUEST('SIM_EQUI_S', xml,
					function() {
						store.remove(b);
					});
				}
			},
			this);
		}
		 else Ext.Msg.alert(SYS, M_R_P);
	};
	this.edit = function() {
		var p = sm.getSelected();
		if (p) {
			this.showEqui(p);
		}
		 else Ext.Msg.alert(SYS, M_NO_DATA_SELECTED);
	};
	
	Fos.EquiGrid.superclass.constructor.call(this,{title:'设备管理',
		header:false,id:'T_EQUI',closable:true,store:store,sm:sm,cm:cm,loadMask:true,iconCls:'gen',
		listeners: {
			scope: this,
			rowdblclick:function(grid, rowIndex, event) {
				var p = sm.getSelected();
				if (p) {
					this.showEqui(p);
				}
			}
		},
		bbar:PTB(store,C_PS30),
		tbar:[{text: C_ADD,iconCls: 'add',scope: this,handler: this.add},'-', 
			{text: C_EDIT,iconCls: 'option',scope: this,handler:this.edit},'-',
			{text: C_REMOVE,iconCls: 'remove',scope: this,handler:this.del},'-']
	});
};
Ext.extend(Fos.EquiGrid, Ext.grid.GridPanel);

//设备管理窗口
Fos.EquiWin = function(p, listStore) {
	//车牌号
	var vehicleStore = new Ext.data.Store({
		url: SERVICE_URL + '?_A=VEHI_Q',
		baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort: true,
		sortInfo:{field:'id',direction: 'desc'}
	});
	
	var txtSimEquiType= new Ext.form.TextField({
		fieldLabel:'设备类型',
		name: 'simEquiType',
		value: p.get('simEquiType'),
		tabIndex: 1,
		itemCls:'required',
		anchor: '95%'
	});
	var dateSimStartDate=new Ext.form.DateField({
			fieldLabel:'开通日期',
			name:'simStartDate',
			value:p.get('simStartDate'),
			tabIndex:3,
			format:DATEF,
			itemCls:'required',
			anchor:'95%'
	});
	var cboVehicleNo=new Ext.form.ComboBox({
			fieldLabel:'车牌号',
			tabIndex:5,
			name: 'vehicleNo',
			value: p.get('vehicleNo'),
			store: vehicleStore,
			enableKeyEvents: true,
			displayField: 'vehicleNo',
			valueField: 'vehicleNo',
			typeAhead: true,
			mode: 'remote',
			triggerAction: 'all',
			selectOnFocus: true,
			anchor: '95%',
			itemCls:'required',
			editable:false,
			listeners: {
				scope: this,
				select: function(c, r, i) {
					p.set('vehicleId', r.get('id'));
				}
			}
		});
	var txtDriverName=new Ext.form.Field({
			fieldLabel:'车主',
			name:'driverName',
			value:p.get('driverName'),
			tabIndex:7,
			anchor:'95%'
	});
	var txtVechicleName=new Ext.form.TextField({
			fieldLabel:'车辆名称',
			name:'vehicleName',
			value:p.get('vehicleName'),
			tabIndex:9,
			anchor:'95%'
		});
	var txtSimNum=new Ext.form.NumberField({
			fieldLabel:'SIM卡号',
			name:'simNum',
			value:p.get('simNum'),
			tabIndex:2,
			itemCls:'required',
			anchor:'95%'
		});
	var dateSimEndDate=new Ext.form.DateField({
			fieldLabel:'到期日期',
			name:'simEndDate',
			value:p.get('simEndDate'),
			tabIndex:4,
			format:DATEF,
			itemCls:'required',
			anchor:'95%'
		});
	var txtSimEquiNo=new Ext.form.TextField({
			fieldLabel:'设备号',
			name:'simEquiNo',
			value:p.get('simEquiNo'),
			itemCls:'required',
			tabIndex:6,
			anchor:'95%'
		});
	var numDriverMobile=new Ext.form.NumberField({
			fieldLabel:'手机',
			name:'driverMobile',
			value:p.get('driverMobile'),
			tabIndex:8,
			anchor:'95%'
		});
	var numSpeed=new Ext.form.NumberField({
		fieldLabel:'超速(Km/h)',
		name:'vehicleSpeed',
		value:p.get('vehicleSpeed'),
		tabIndex:10,
		anchor:'95%'
	});
	
	var radio1=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'1',
		boxLabel:iconFont('01'),
		checked:p.get('vehicleIcon')=='1'
	});
	var radio2=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'2',
		boxLabel:iconFont('02'),
		checked:p.get('vehicleIcon')=='2'
	});
	var radio3=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'3',
		boxLabel:iconFont('03'),
		checked:p.get('vehicleIcon')=='3'
	});
	var radio4=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'4',
		boxLabel:iconFont('04'),
		checked:p.get('vehicleIcon')=='4'
	});
	var radio5=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'5',
		boxLabel:iconFont('05'),
		checked:p.get('vehicleIcon')=='5'
	});
	var radio6=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'6',
		boxLabel:iconFont('06'),
		checked:p.get('vehicleIcon')=='6'
	});
	var radio7=new Ext.form.Radio({
		name:'vehicleIcon',
		inputValue:'7',
		boxLabel:iconFont('07'),
		checked:p.get('vehicleIcon')=='7'
	});
	
	var radionGroup=new Ext.form.RadioGroup({
		fieldLabel:'位置图标',
		itemCls:'required',
		items:[radio1,radio2,radio3,radio4,radio5,radio6,radio7]
	});
	
	var txtRemark=new Ext.form.TextArea({
			fieldLabel: C_REMARKS,
			name: 'remark',
			value: p.get('remark'),
			tabIndex: 18,
			anchor: '97.5%'
		});
	
	this.save = function() {
		if(!HTUtil.checkFieldNotNull('设备类型',txtSimEquiType))			//设备类型
			return;
		if(!HTUtil.checkFieldNotNull('SIM卡号',txtSimNum))				//sim卡
			return;
		if(!HTUtil.checkFieldNotNull('开通日期',dateSimStartDate))		//开通日期
			return;
		if(!HTUtil.checkFieldNotNull('到期日期',dateSimEndDate))			//到期日期
			return;
		if(!HTUtil.checkFieldNotNull('车牌号',cboVehicleNo))				//车牌号
			return;
		if(!HTUtil.checkFieldNotNull('设备号',txtSimEquiNo))				//设备号
			return;
		
		p.beginEdit();
		frm.getForm().updateRecord(p);
		p.endEdit();
		/*if(radio1.getValue()){
			p.set('vehicleIcon',radio1.getRawValue());
		}else if(radio2.getValue()){
			p.set('vehicleIcon',radio2.getRawValue());
		}else if(radio3.getValue()){
			p.set('vehicleIcon',radio3.getRawValue());
		}else if(radio4.getValue()){
			p.set('vehicleIcon',radio4.getRawValue());
		}else if(radio5.getValue()){
			p.set('vehicleIcon',radio5.getRawValue());
		}else if(radio6.getValue()){
			p.set('vehicleIcon',radio6.getRawValue());
		}else if(radio7.getValue()){
			p.set('vehicleIcon',radio7.getRawValue());
		}
		if(!p.get('vehicleIcon')){
			XMG.alert(SYS,'请选择位置图标');
			return ;
		}*/
		var rowAction = (p.get('rowAction')=='N');
		var a=listStore.getModifiedRecords();
		var xml = HTUtil.RTX(p, 'TSimEquipment', TSimEquipment);
		Ext.Ajax.request({scope:this,url: SERVICE_URL,method:'POST',
			params:{_A: 'SIM_EQUI_S'},
			success: function(r) {
				var c = HTUtil.XTR(r.responseXML, 'TSimEquipment', TSimEquipment);
				HTUtil.RU(c, p, TSimEquipment);
				if (rowAction) listStore.insert(0, p);
				listStore.load();
				vehicleStore.load();
				Ext.Msg.alert(SYS, M_S);
				this.close();
			},
			failure: function(r) {
				listStore.load();
				Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
			},
			xmlData: HTUtil.HTX(xml)
		});
	};
	
	var frm = new Ext.form.FormPanel({labelWidth:75,frame:false,layout:'column',
		layoutConfig:{columns:2},padding:5,labelAlign:'right',
		items:[
			{columnWidth:.5,layout:'form',border:false,items:[txtSimEquiType,dateSimStartDate,cboVehicleNo,txtDriverName,txtVechicleName]},
			{columnWidth:.5,layout:'form',border:false,items:[txtSimNum,dateSimEndDate,txtSimEquiNo,numDriverMobile,numSpeed]},
			//{columnWidth:1,layout:'form',border:false,items:[radionGroup]},
			{columnWidth:1,layout:'form',border:false,items:[txtRemark]}
		]
	});
	Fos.EquiWin.superclass.constructor.call(this,{buttonAlign:'right',
		title: p.get('rowAction') == 'N'?'新增设备信息':'编辑设备信息',
		width: 700,height:320,modal:true,
		items: [frm],
		layout:'fit',
		buttons:[{
			text: C_SAVE,
			iconCls: 'ok',
			scope: this,
			handler: this.save
		},
		{
			text: C_CANCEL,
			iconCls: 'cancel',
			scope: this,
			handler: this.close
		}]
	});
};
Ext.extend(Fos.EquiWin, Ext.Window);

//车辆跟踪-跟踪货物
Fos.TransTaskPosition = function(r,transTaskId) {
	this.store = new Ext.data.Store({url:SERVICE_URL,
		baseParams:{_A:'TCAR_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TCargo',id:'id'},TCargo),
		remoteSort: true,
		sortInfo: {field:'id',direction:'desc'}
	});
	if(transTaskId){
		this.store.load({
			params:{transTaskId:transTaskId}
		});
	}
	//派车单号
	var txtTaskNo=new Ext.form.TextField({
				fieldLabel: C_TRANS_TASK_NO,
				name: 'transTaskNo',
				disabled: true,
				tabIndex: 1,
				xtype: 'textfield',
				anchor: '95%'
			});
	//车牌号
	var txtVehicleNo=new Ext.form.TextField({
				fieldLabel: C_VEHICLE_NO,
				name: 'vehicleNo',
				tabIndex: 5,
				xtype: 'textfield',
				anchor: '95%'
			});
	//发货地点
	var txtPlaceFromName=new Ext.form.TextField({
				fieldLabel: C_PLACE_FROM,
				name: 'placeFromName',
				tabIndex: 9,
				xtype: 'textfield',
				anchor: '95%'
			});
	//货物名称
	var txtCargoName=new Ext.form.TextField({
		fieldLabel: C_CARGO_NAME,
			name: 'cargoName',
			tabIndex: 13,
			xtype: 'textfield',
			anchor: '95%'
		});
	var txtMotorcadeName=new Ext.form.TextField({
				fieldLabel: C_MOTORCADE,
				name: 'motorcadeName',
				xtype: 'textfield',
				anchor: '95%'
			});
	var txtDriverName=new Ext.form.TextField({
				fieldLabel: C_DRIVER,
				name: 'driverName',
				xtype: 'textfield',
				anchor: '95%'
			});
	var txtPremiumNumber=new Ext.form.TextField(
		{fieldLabel: '保单号',
			name: 'premiumNumber',
			tabIndex: 17,
			xtype: 'textfield',
			anchor: '95%'
		}
	);
	var txtplaceToName=new Ext.form.TextField({
				fieldLabel: C_PLACE_TO,
				name: 'placeToName',
				tabIndex: 10,
				xtype: 'textfield',
				anchor: '95%'
			});
	var numPackages=new Ext.form.NumberField({
				fieldLabel: C_SUM_PACK,
				name: 'packages',
				tabIndex: 14,
				xtype: 'numberfield',
				anchor: '95%'
			});
	var txtPremiumCompan= new Ext.form.TextField({
			fieldLabel: '保险公司',
			name: 'premiumCompany',
			tabIndex: 18,
			xtype: 'textfield',
			anchor: '95%'
		});
	var datePremiumDateTo=new Ext.form.DateField({
			fieldLabel: '保险期(到)',
			name: 'premiumDateTo',
			tabIndex: 20,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var txtMotorcadeContact=new Ext.form.TextField({
			fieldLabel: C_MOTORCADE_CONTACT,
			ref: '../motorcadeContact',
			name: 'motorcadeContact',
			tabIndex: 3,
			xtype: 'textfield',
			anchor: '95%'
		});
	var numPremiumExpense=new Ext.form.NumberField({
			fieldLabel: '保险费',
			name: 'premiumExpense',
			//value: p.get('premiumExpense'),
			tabIndex: 21,
			xtype: 'numberfield',
			anchor: '95%'
		});
	var txtDriverTel=new Ext.form.TextField({
				fieldLabel: C_DRIVER_TEL,
				name: 'driverTel',
				tabIndex: 7,
				xtype: 'textfield',
				anchor: '95%'
			});
	var txtEmptyMiles=new Ext.form.NumberField({
				fieldLabel: C_EMPTY_MILES,
				name: 'emptyMiles',
				tabIndex: 11,
				xtype: 'numberfield',
				anchor: '95%'
			});
	var txtGrossWeight=new Ext.form.NumberField({
				fieldLabel: C_SUM_GW,
				name: 'grossWeight',
				tabIndex: 15,
				ref: '../grossWeight',
				xtype: 'numberfield',
				anchor: '95%'
			});
	var txtMotorcadeTel=new Ext.form.TextField({
				fieldLabel: C_MOTORCADE_TEL,
				ref: '../motorcadeTel',
				name: 'motorcadeTel',
				tabIndex: 4,
				xtype: 'textfield',
				anchor: '95%'
			});
	var txtPateName=new Ext.form.TextField({
				fieldLabel: C_PATE,
				tabIndex: 8,
				name: 'pateName',
				xtype: 'textfield',
				anchor: '95%'
			});
	var datePremiumDateFrom=new Ext.form.DateField({
			fieldLabel: '保险期(从)',
			name: 'premiumDateFrom',
			//value: p.get('premiumDateFrom'),
			tabIndex: 19,
			xtype: 'datefield',
			format: DATEF,
			anchor: '95%'
		});
	var numHeavyMiles=new Ext.form.NumberField({
				fieldLabel: C_HEAVY_MILES,
				name: 'heavyMiles',
				tabIndex: 12,
				xtype: 'numberfield',
				anchor: '95%'
			});
	var numMeasurement=new Ext.form.NumberField({
				fieldLabel: C_SUM_CBM,
				name: 'measurement',
				tabIndex: 16,
				ref: '../measurement',
				xtype: 'numberfield',
				anchor: '95%'
			});
	var dateStartDate=new Ext.form.DateField({
				fieldLabel: C_TRAN_START_DATE,
				name: 'startDate',
				tabIndex: 17,
				xtype: 'datefield',
				format: DATEF,
				anchor:'95%'
			});
	var dateEndDate=new Ext.form.DateField({
				fieldLabel: C_TRAN_END_DATE,
				name: 'endDate',
				tabIndex: 18,
				xtype: 'datefield',
				format: DATEF,
				anchor: '95%'
			});
	var txtRemark=new Ext.form.TextField({
				fieldLabel: C_REMARKS,
				name: 'remarks',
				tabIndex: 19,
				xtype: 'textarea',
				anchor: '98%'
			});
	this.frm = new Ext.form.FormPanel({
		region:'north',height:130,layout:'column',layoutConfig:{columns:4},
		frame: true,
		items: [
			{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
				items: [txtTaskNo,txtCargoName,txtPremiumNumber]
			},
			{columnWidth:.25,layout: 'form',border: false,labelWidth:60,
				items: [txtVehicleNo,numPackages,txtPremiumCompan]
			},
			{columnWidth:.25,layout: 'form',border: false,labelWidth:65,
				items: [txtDriverName,txtGrossWeight,datePremiumDateFrom]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:65,
				items: [txtDriverTel,numMeasurement,datePremiumDateTo]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
				items: [numPremiumExpense]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:60,
				items: [dateStartDate]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:65,
				items: [dateEndDate]
			},
			{columnWidth: .25,layout: 'form',border: false,labelWidth:65,
				items: [txtRemark]
			}]
	});
	this.frm.getForm().loadRecord(r)
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	//货物清单
	var cm = new Ext.grid.ColumnModel({
		columns: [new Ext.grid.RowNumberer(),sm, 
		{header:'签收状态',dataIndex:'signInStatus',width:70,
				renderer:function(v){
					var str='';
					if(v==0){
						str='未签收';
					}else if(v==1){
						str='已签收';
					}
					return str;
				}
			},
		{header: '陆运单号',dataIndex:'consNo'},
		{header:'手工单号',dataIndex:'consNoHandler',width:120},
		{header:'收货单位',dataIndex:'consigneeName',width:130},
		{header:'联系人',dataIndex:'consigneeContact',width:80,hidden:true},
		{header:'联系电话',dataIndex:'consigneeTel',width:120,hidden:true},
		{header:'交货地址',dataIndex:'deliveryAddress',width:120},
		{header:'货名',dataIndex:'cargoName',width:100,editor: new Ext.form.TextField()},
		{header:'包装种类',dataIndex: 'packName',width: 100,
			editor: new Ext.form.ComboBox({
				displayField: 'packName',
				valueField: 'packName',
				triggerAction: 'all',
				mode: 'remote',
				selectOnFocus: true,
				listClass: 'x-combo-list-small',
				store: HTStore.getPACK_S()
			})
		},
		{header:'装车件数',dataIndex:'packages',width:80,css:ffaa66,
			editor:new Ext.form.NumberField({
				allowBlank:false
			})
		},
		{header:'装车毛重(KGS)',dataIndex:'grossWeight',width:120,css:ffaa66,renderer:rateRender,
			editor:new Ext.form.NumberField({
				allowBlank:false
			})
		},
		{header:'装车体积(CBM)',dataIndex:'measurement',width:120,css:ffaa66,renderer:rateRender,
			editor:new Ext.form.NumberField({
				allowBlank:false
			})
		},
		{header:'到货件数',dataIndex:'packageArrival',width:80,css:ffdd66,renderer:numRenderColor,
			editor:new Ext.form.NumberField({
				allowBlank:false
			})
		},
  		{header:'到货毛重(KGS)',dataIndex:'grossWeightArrival',width:120,css:ffdd66,renderer:numRenderColor,
  			editor:new Ext.form.NumberField({
				allowBlank:false
			})
  		},
  		{header:'到货体积(CBM)',dataIndex:'measurementArrival',width:120,css:ffdd66,renderer:numRenderColor,
  			editor:new Ext.form.NumberField({
				allowBlank:false
			})
  		},
  		{header:'缺少件数',dataIndex:'packagesLack',width:80,css:ffaa88,renderer:numRenderColor,
			editor:new Ext.form.NumberField({
				allowBlank:false
			})
		},
  		{header:'缺少毛重(KGS)',dataIndex:'grossWeightLack',width:120,css:ffaa88,renderer:numRenderColor,
  			editor:new Ext.form.NumberField({
				allowBlank:false
			})
  		},
  		{header:'缺少体积(CBM)',dataIndex:'measurementLack',width:120,css:ffaa88,renderer:numRenderColor,
  			editor:new Ext.form.NumberField({
				allowBlank:false
			})
  		},
		{header: C_REMARKS,dataIndex: 'remarks',width:120}],
		defaults: {sortable: true,width:100}
	});
	var grid = new Ext.grid.GridPanel({title:'装货清单',region: 'center',
		autoScroll: true,sm: sm,cm: cm,store: this.store,iconCls:'gen'
	});
	var menu = CREATE_E_MENU(C_TRANS_BILL, this.expExcelTR, this.expEmailTR,
		function() {},
		this);
	Fos.TransTaskPosition.superclass.constructor.call(this, {
		title:C_TRANS_TASK,
		modal: true,
		layout: 'border',
		width:1000,
		height: 500,
		items: [this.frm, grid]
	});
};
Ext.extend(Fos.TransTaskPosition, Ext.Window);

/*	
 * 点击地图中车辆
 * 1,车辆是运输状态就显示车辆配载信息
 * 2,否则是车辆的管理信息
 */
function getTransTaskWin(vehicleNo){
	Ext.Ajax.request({url: SERVICE_URL,method: 'POST',
		params: {_A: 'TTRT_Q',vehicleNo:vehicleNo,status:1},//0:装车 1:开始发车 2:运输结束
		success: function(r) {
			var A = HTUtil.XTRA(r.responseXML, 'TTransTask', TTransTask);
			var c = A[0];
			if (c == null) {
				Ext.Ajax.request({url:SERVICE_URL,method:'POST',
					params: {_A: 'VEHI_Q',vehicleNo:vehicleNo},
					success: function(r) {
						var A = HTUtil.XTRA(r.responseXML, 'TVehicle', TVehicle);
						var c = A[0];
						var win = new Fos.VehicleWin(c,'',1);
						win.show();
					},
					failure: function(r, o) {
						Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
					}
				});
			}else{
				var win = new Fos.TransTaskPosition(c,c.get('id'));
				win.show();
			}
		},
		failure: function(r, o) {
			Ext.Msg.alert(SYS, HTUtil.XTM(r.responseXML));
		}
	});
};
