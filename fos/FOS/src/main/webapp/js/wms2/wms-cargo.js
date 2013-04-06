
//构建商品维护的panel,左边是商品类别的树，右边是商品信息grid
Fos.CargoPanel = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',id:'id'},WCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var categoryStore = new Ext.data.Store({url:SERVICE_URL+'?_A=CATEGORY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WCargoCategory',id:'id'},WCargoCategory),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	
	var root=new Ext.tree.TreeNode({id:'0',text:'',leaf:false,expanded:true});	
	
	//a : Ext.data.Record[] 所加载的Record数组。 
	//options : 调用load方法时的配置对象。 
	//success : 布尔值，加载是否成功标识位。 
	categoryStore.load({scope:this,callback:function(a,o,s){
		//如果成功，并返回了数据
		if(s&&a.length>0){
			
			for(var i=0;i<a.length;i++){
				//取得当前数据的id
				var id=a[i].get('id');
				//取得当前数据的名称+代码
				var name=a[i].get('categoryName')+"("+a[i].get('categoryCode')+")";
				//取得当前数据的父节点id
				var pid=a[i].get('parentId');
				//以以前的变量构建出一个TreeNode,后面经过判断来决定是作为一级节点添加，还是作为子结点添加
				var n = new Ext.tree.TreeNode({iconCls:'res_type_D',text:name,id:id,leaf:false,expanded:true});		
				//如果取到数据的parentId为空或为0，表示此节点为一节结点
				//则直接添加在tree的root上
				if(!pid||pid==0){ 
					root.appendChild(n);
				}
				else{
					//否则的话，在tree中找寻此数据parentId对应的I的那个结点
					//如果找到，就把此数据添加到它的父节点下去。
					var pn=tree.getNodeById(pid);
					if(pn) {
						pn.appendChild(n);
					}
				}
			}
			
		}	
	}
	});    
    
    var tree = new Ext.tree.TreePanel({title:C_CARGO_CATEGORY,rootVisible:false,
    	region:"west",width:"130",collapsible:true,collapseMode:'mini',split:true,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true,root:root,
		//树节点的点击事件
		listeners:{scope:this,
    		click:function(n,e){
    			store.removeAll(); 
    			//取得当前节点的id
    			var categoryId = n.id;
    			//根据id从相应的store中返回一个record
    			var category = categoryStore.getById(categoryId);
    			//设置grid的title
    			grid.setTitle(C_CARGO_LIST+"-"+category.get("categoryName"));
    			ComCargoType.setValue(category.get("categoryName"));
    			store.load({params:{categoryId:categoryId,start:0,limit:17}});
    		}
    	}
	});
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	
	{header:C_SKU_NO,width:120,dataIndex:'skuNo'},
	{header:C_CARGO_NAME,width:120,dataIndex:'cargoName',width:150},
	{header:C_CARGO_CATEGORY,width:120,dataIndex:'categoryName'},
	{header:C_CARGO_OWNER,dataIndex:'cargoOwnerName',width:150},
	{header:C_AREA,dataIndex:'areaName'},
	{header:C_BLOCK,dataIndex:'blockName'},
	{header:C_PRICE,dataIndex:'price'},
	{header:C_STOCK_MAX,dataIndex:'stockMax'},
	{header:C_STOCK_MIN,dataIndex:'stockMin'},
	{header:C_APPEND_NUM,dataIndex:'appendNum'},
	{header:C_TEMPERATURE_MIN,dataIndex:'temperatureMin'},
	{header:C_TEMPERATURE_MAX,dataIndex:'temperatureMax'},
	{header:C_IS_DANGEROUS,dataIndex:'isDangerous'},
	{header:C_IS_REFRIGERATION,dataIndex:'isRefrigeration'}
    ],defaults:{sortable:true,width:100}});    
    
    var addCargo=function(){
    	var n = tree.getSelectionModel().getSelectedNode();
    	if(n){
    		var categoryId = n.id;
    		var category = categoryStore.getById(categoryId);
    		var p = new WCargo({uuid:HTUtil.UUID(32),
    			categoryId:categoryId,
    			categoryCode:category.get('categoryCode'),
    			categoryName:category.get('categoryName'),    			
    			rowAction:'N'});
            var win = new Fos.WCargoWin(p,store);
            win.show();
    	}
    };
    
    var addCargo2=function(){
    	var n = tree.getSelectionModel().getSelectedNode();
    	if(n){
    		var categoryId = n.id;
    		var category= categoryStore.getById(categoryId);
    		var p = new WCargo({uuid:HTUtil.UUID(32),
    			categoryId:categoryId,
    		    categoryCode:category.get('categoryCode'),
    		    categoryName:category.get('categoryName'),
    		    inUnitValue:1,
    		    outUnitValue:1,
    		    pQuantity:1,
    			rowAction:'N'});
    		var tab = this.ownerCt;
    		var c = 'W_Cargo_Detail';
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WCargoDetailPanel(p,store)));
    	}
    };
    var changeCargoType=function(){
    	var n = tree.getSelectionModel().getSelectedNode();
    	var b =sm.getSelected();
    	if(n&&b){
    		var win = new Fos.cargoTypeWin(b,store);
            win.show();
    	}else{
    		Ext.Msg.alert(SYS,'请选择商品类别和商品！',function(){});
    	}
    };
    
    this.eidtCargo=function(){
    	var b =sm.getSelected();	//test
		if(b){
			var tab = this.ownerCt;
    		var c = 'W_Cargo_Detail';
			tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WCargoDetailPanel(b,store)));
		}
    };
    var deleteCargo=function(){
    	var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'WCargo');
	        		HTUtil.REQUEST('WCARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
    };
    var TxtSkuNo=new Ext.form.TextField({fieldLabel:'商品编号',name:'skuNo',anchor:'95%'});
    
    /*var ComCargoType= new Ext.form.ComboBox({fieldLabel:'商品类别',name:'categoryName',anchor:'95%',
    	story:WHTStore.getCargoType('CATEGORY_Q'),displayField:'categoryName',valueField:'categoryName',
    	mode:'local',
    	listeners:{scope:this,
    		select:function(c,r,i){}}
    });*/
    var ComCargoType=new Ext.form.ComboBox({fieldLabel:'商品类别',name:'categoryName',
	    store:WHTStore.getCargoType('CATEGORY_Q'),
	    displayField:'categoryName',valueField:'categoryName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
				},
				keyup:{fn:function(f,e){
					listCargoType(f,e);
				},buffer:800}
		 	}
     });
	//商品名称
    var ccboCargoName=new Fos.CargoLookUp({fieldLabel:'商品名称',tabIndex:61,
	    name:'CargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'CargoName',valueField:'skuNo',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BFL
		}
	}});
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
    var search=function (){
		var a=[];
		var op=1;
		var cargoName=ccboCargoName.getValue();//商品
		if(cargoName){
			a[a.length]=new QParam({key:'cargoName',value:cargoName,op:op});
		}
		var txtSkuNo=TxtSkuNo.getValue();//sku编号
		if(txtSkuNo){
			a[a.length]=new QParam({key:'skuNo',value:txtSkuNo,op:op});
		}
		var cargoType = ComCargoType.getValue();//商品类型
		if(cargoType){
			a[a.length]=new QParam({key:'categoryName',value:cargoType,op:op});
		}
		var cargoOwenrNa = cargoOwenrName.getValue();//货主
		if(cargoOwenrNa){
			a[a.length]=new QParam({key:'cargoOwenrName',value:cargoOwenrNa,op:op});
		}
		if(a.length>0){
			store.reload({params:{start:0,limit:20,xml:HTUtil.HTX(HTUtil.QTX(a))},
				callback:function(r){
	 			if(r.length==0) XMG.alert(SYS_W,M_NOT_FOUND);}
	 		});
			
	    }
	};
	var reset = function (){
		TxtSkuNo.setValue('');
		ComCargoType.setValue('');
		ccboCargoName.setValue('');
		cargoOwenrName.setValue('');
	};
    var btnSearch=new Ext.Button({fieldLabel:'&nbsp',text:'查询',labelSeparator:'',iconCls:'search',scope:this,handler:search});
    var btnReset=new Ext.Button({fieldLabel:'&nbsp',text:'重置',labelSeparator:'',iconCls:'search',scope:this,handler:reset});
    var fPanel = new Ext.form.FormPanel({
		title:'查询条件',layout:'column',name:'sf',collapsible:true,collapsed:false,
        height:60,padding:5,frame:false,deferredRender:true,
		items:[
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	  items:[TxtSkuNo]},
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                	   items:[ComCargoType]},
                 {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[ccboCargoName]},
     		     {columnWidth:.2,layout:'form',labelWidth:80,labelAlign:'right',border:false,
                    	items:[cargoOwenrName]},
            	 {columnWidth:.1,layout:'form',labelWidth:30,labelAlign:'right',border:false,
            		    items:[btnSearch]},
            	 {columnWidth:.1,layout:'form',labelWidth:30,labelAlign:'right',border:false,
            		    items:[btnReset]}
     		]});
    
    
    var grid = new Ext.grid.GridPanel({iconCls:'gen',title:C_CARGO_LIST,region:"center",height:480,
	store:store,sm:sm,cm:cm,
	listeners:{scope:this,
		rowdblclick: function(grid, rowIndex, event){
    		this.eidtCargo();
		}},
    	bbar:PTB(store,17),
		//{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this,handler:addCargo},'-',
	tbar:[
	      {text:'添加',iconCls:'add',ref:'../btnAdd',hidden:NR(M1_WMS+WM_BASE+M2_CARGO+WF_ADD),scope:this,handler:addCargo2},'-',
        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',hidden:NR(M1_WMS+WM_BASE+M2_CARGO+WF_EDIT),scope:this,handler:this.eidtCargo},'-',
        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',hidden:NR(M1_WMS+WM_BASE+M2_CARGO+WF_DEL),scope:this,handler:deleteCargo},'-',
        {text:'更改商品类别',iconCls:'docpass',ref:'../docpass',hidden:NR(M1_WMS+WM_BASE+M2_CARGO+WF_DEL),scope:this,handler:changeCargoType}]
    });
    var basePanel=new Ext.form.FormPanel({layout:'form',region:'center',items:[fPanel,grid]});
    Fos.CargoPanel.superclass.constructor.call(this,{id:'G_CARGO',iconCls:'gen',title:C_CARGO,
	closable:true,layout:"border",items:[tree,basePanel]
    });
};
Ext.extend(Fos.CargoPanel, Ext.Panel);
//================================================ 分页符 =============================================================================


/*
 * name:WCargoDetailPanel
 * 货物的详细编辑界面
 */
Fos.WCargoDetailPanel=function(p,store){
	
	var save=function(){
		if (Ext.isEmpty(ctxtSkuNo.getValue()))
		{
			Ext.Msg.alert(SYS,C_SKU_NOT_NO,function(){ctxtSkuNo.focus();},this);
			return;
		}
		
		if (Ext.isEmpty(ctxtCargoName.getValue()))
		{
			Ext.Msg.alert(SYS,C_GOODS_NAME_NOT_NO,function(){ctxtCargoName.focus();},this);
			return;
		}
		if (Ext.isEmpty(ccboOutUnitName.getValue()))
		{
			Ext.Msg.alert(SYS,'默认出库单位不能为空！',function(){ccboOutUnitName.focus();},this);
			return;
		}
		if (Ext.isEmpty(ccboInUnitName.getValue()))
		{
			Ext.Msg.alert(SYS,'默认如库单位不能为空！',function(){ccboInUnitName.focus();},this);
			return;
		}
		var unitName1=ccboNumUnitName.getValue();
		var unitName2=ccboNumUnitNameP1.getValue();
		var unitName3=ccboNumUnitNameP2.getValue();
		var unitName4=ccboNumUnitNameP3.getValue();
		var unitName5=ccboNumUnitNameP4.getValue();
		if ((unitName1==unitName2 && unitName2!='' && unitName1!='') || (unitName1==unitName3 && unitName1!='' && unitName3!='') || 
			(unitName1==unitName4 && unitName1!='' && unitName4!='') || (unitName1==unitName5 && unitName5!='' && unitName1!='') || 
			(unitName2==unitName3 && unitName2!='' && unitName3!='') || (unitName2==unitName4 && unitName2!='' && unitName4!='') || 
			(unitName2==unitName5 && unitName2!='' && unitName5!='') || (unitName3==unitName4 && unitName3!='' && unitName4!='') ||	
			(unitName3==unitName5 && unitName3!='' && unitName5!='') ||	(unitName4==unitName5 && unitName4!='' && unitName5!=''))
		{
			Ext.Msg.alert(SYS,'包装单位不能重复！',function(){ctxtCargoName.focus();},this);
			return;
		}
		if(!Ext.isEmpty(ccboNumUnitName.getValue())){
			if(Ext.isEmpty(numPQuantity.getValue())){
				Ext.Msg.alert(SYS,'没有维护最小单位数量',function(){numPQuantity.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(ccboNumUnitNameP1.getValue())){
			if(Ext.isEmpty(numP1Quantity.getValue())){
				Ext.Msg.alert(SYS,'没有维护第二单位数量',function(){numP1Quantity.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(ccboNumUnitNameP2.getValue())){
			if(Ext.isEmpty(numP2Quantity.getValue())){
				Ext.Msg.alert(SYS,'没有维护第三单位数量',function(){numP2Quantity.focus();},this);
				return ;
			}
		}
		if(!Ext.isEmpty(ccboNumUnitNameP3.getValue())){
			if(Ext.isEmpty(numP3Quantity.getValue())){
				Ext.Msg.alert(SYS,'没有维护第四单位数量',function(){numP3Quantity.focus();},this);
				return ;
			}
		}
		if(!Ext.isEmpty(ccboNumUnitNameP4.getValue())){
			if(Ext.isEmpty(numP4Quantity.getValue())){
				Ext.Msg.alert(SYS,'没有维护第五单位数量',function (){numP4Quantity.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(numPQuantity.getValue())){
			if(Ext.isEmpty(ccboNumUnitName.getValue())){
				Ext.Msg.alert(SYS,'没有维护最小单位',function(){ccboNumUnitName.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(numP1Quantity.getValue())){
			if(Ext.isEmpty(ccboNumUnitNameP1.getValue())){
				Ext.Msg.alert(SYS,'没有维护第二单位',function (){ccboNumUnitNameP1.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(numP2Quantity.getValue())){
			if(Ext.isEmpty(ccboNumUnitNameP2.getValue())){
				Ext.Msg.alert(SYS,'没有维护第三单位',function(){ccboNumUnitNameP2.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(numP3Quantity.getValue())){
			if(Ext.isEmpty(ccboNumUnitNameP3.getValue())){
				Ext.Msg.alert(SYS,'没有维护第四单位',function (){ccboNumUnitNameP3.focus();},this);
				return;
			}
		}
		if(!Ext.isEmpty(numP4Quantity.getValue())){
			if(Ext.isEmpty(ccboNumUnitNameP4.getValue())){
				Ext.Msg.alert(SYS,'没有维护第五单位',function(){ccboNumUnitNameP4.focus();},this);
				return;
			}
		}
		
		//判断最小温度不能大于最大温度
		if (!Ext.isEmpty(cnumTemperatureMin.getValue()) && !Ext.isEmpty(cnumTemperatureMax.getValue())) 
		{
			if (cnumTemperatureMin.getValue()>cnumTemperatureMax.getValue())
			{
				Ext.Msg.alert(SYS,C_TEMPERATURE_MIN_MORETHAN_MIN,
					function(){
					cnumTemperatureMin.focus();
					},
					this
				);
				return;
			}
		}
		p.beginEdit();
		basePanel.getForm().updateRecord(p);
		fieldSetPanel.getForm().updateRecord(p);
		p.endEdit();
		
		var xml = HTUtil.RTX(p,'WCargo',WCargo);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WCARGO_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WCargo',WCargo);
			var ra=p.get('rowAction');
			var f = WCargo.prototype.fields;
			p.beginEdit();
			for (var i = 0; i < f.keys.length; i++)
			{
				var fn = ''+f.keys[i];
				p.set(fn,c.get(fn));

			};
			if(ra=='N'){
				this.setTitle(C_CARGO+'-'+p.get("cargoName"));
				p.set('rowAction','M');
			}
			p.endEdit();
			store.reload();
			Ext.Msg.alert(SYS,M_S);
			
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	
	
	var ccboNumUnitName=new Ext.form.ComboBox({fieldLabel:'单品单位',name:'pUnitName',store:WHTStore.getUNIT_P(),value:p.get('pUnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',itemCls:'required',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('pUnitId',r.get('id'));
			}}});
	var ccboNumUnitNameP1=new Ext.form.ComboBox({fieldLabel:'单位',name:'p1UnitName',store:WHTStore.getUNIT_P(),value:p.get('p1UnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('p1UnitId',r.get('id'));
			}}});
	var ccboNumUnitNameP2=new Ext.form.ComboBox({fieldLabel:'单位',name:'p2UnitName',store:WHTStore.getUNIT_P(),value:p.get('p2UnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('p2UnitId',r.get('id'));
			}}});
	var ccboNumUnitNameP3=new Ext.form.ComboBox({fieldLabel:'单位',name:'p3UnitName',store:WHTStore.getUNIT_P(),value:p.get('p3UnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('p3UnitId',r.get('id'));
			}}});
	var ccboNumUnitNameP4=new Ext.form.ComboBox({fieldLabel:'单位',name:'p4UnitName',store:WHTStore.getUNIT_P(),value:p.get('p4UnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('p4UnitId',r.get('id'));
			}}});
	
	var numPQuantity=new Ext.form.NumberField({fieldLabel:'单品比率',name:'pQuantity',value:1,disabled:true,anchor:'95%'});
	var numP1Quantity=new Ext.form.NumberField({fieldLabel:'单品比率',name:'p1Quantity',value:p.get('p1Quantity'),anchor:'95%'});
	var numP2Quantity=new Ext.form.NumberField({fieldLabel:'单品比率',name:'p2Quantity',value:p.get('p2Quantity'),anchor:'95%'});
	var numP3Quantity=new Ext.form.NumberField({fieldLabel:'单品比率',name:'p3Quantity',value:p.get('p3Quantity'),anchor:'95%'});
	var numP4Quantity=new Ext.form.NumberField({fieldLabel:'单品比率',name:'p4Quantity',value:p.get('p4Quantity'),anchor:'95%'});
	
	var numLength=new Ext.form.NumberField({fieldLabel:'长',name:'length',value:p.get('length'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numWidth.getValue()) || Ext.isEmpty(numHeight.getValue()) || Ext.isEmpty(field.getRawValue())){
					numVolume.setValue(0);
				}else{
					numVolume.setValue(numWidth.getValue()*numHeight.getValue()*field.getRawValue());
				}
			}
		}
	});
	var nump1L=new Ext.form.NumberField({fieldLabel:'长',name:'p1L',value:p.get('p1L'),anchor:'95%',
		listeners:{scope:this,
			changes:function(field,newValue,oldValue){
				if(Ext.isEmpty(numP1W.getValue()) || Ext.isEmpty(numP1H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP1V.setValue(0);
				}else{
					numP1V.setValue(field.getRawValue()*numP1W.getValue()*numP1H.getValue());
				}
			}
		}
	});
	var nump2L=new Ext.form.NumberField({fieldLabel:'长',name:'p2L',value:p.get('p2L'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numP2W.getValue()) || Ext.isEmpty(numP2H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP2V.setValue(0);
				}else{
					numP2V.setValue(numP2W.getValue()*numP2H.getValue()*field.getRawValue());
				}
			}
		}
	});
	var nump3L=new Ext.form.NumberField({fieldLabel:'长',name:'p3L',value:p.get('p3L'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numP3W.getValue()) || Ext.isEmpty(numP3H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP3V.setValue(0);
				}else{
					numP3V.setValue(numP3W.getValue()*numP3H.getValue()*field.getRawValue());
				}
			}
		}
	});
	var nump4L=new Ext.form.NumberField({fieldLabel:'长',name:'p4L',value:p.get('p4L'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numP4W.getValue()) || Ext.isEmpty(numP4H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP4V.setValue(0);
				}else{
					numP4V.setValue(numP4W.getValue()*numP4H.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var numWidth=new Ext.form.NumberField({fieldLabel:'宽',name:'width',value:p.get('width'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numLength.getValue()) || Ext.isEmpty(numHeight.getValue()) || Ext.isEmpty(field.getRawValue())){
					numVolume.setValue(0);
				}else{
					numVolume.setValue(numLength.getValue()*numHeight.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP1W=new Ext.form.NumberField({fieldLabel:'宽',name:'p1W',value:p.get('p1W'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump1L.getValue()) || Ext.isEmpty(numP1H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP1V.setValue(0);
				}else{
					numP1V.setValue(nump1L.getValue()*numP1H.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP2W=new Ext.form.NumberField({fieldLabel:'宽',name:'p2W',value:p.get('p2W'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump2L.getValue()) || Ext.isEmpty(numP2H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP2V.setValue(0);
				}else{
					numP2V.setValue(nump2L.getValue()*numP2H.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP3W=new Ext.form.NumberField({fieldLabel:'宽',name:'p3W',value:p.get('p3W'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump3L.getValue()) || Ext.isEmpty(numP3H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP3V.setValue(0);
				}else{
					numP3V.setValue(nump3L.getValue()*numP3H.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP4W=new Ext.form.NumberField({fieldLabel:'宽',name:'p4W',value:p.get('p4W'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump4L.getValue()) || Ext.isEmpty(numP4H.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP4V.setValue(0);
				}else{
					numP4V.setValue(nump4L.getValue()*numP4H.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var numHeight=new Ext.form.NumberField({fieldLabel:'高',name:'height',value:p.get('height'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(numLength.getValue()) || Ext.isEmpty(numWidth.getValue()) || Ext.isEmpty(field.getRawValue())){
					numVolume.setValue(0);
				}else{
					numVolume.setValue(numLength.getValue()*numWidth.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP1H=new Ext.form.NumberField({fieldLabel:'高',name:'p1H',value:p.get('p1H'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump1L.getValue()) || Ext.isEmpty(numP1W.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP1V.setValue(0);
				}else{
					numP1V.setValue(nump1L.getValue()*numP1W.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP2H=new Ext.form.NumberField({fieldLabel:'高',name:'p2H',value:p.get('p2H'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump2L.getValue()) || Ext.isEmpty(numP2W.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP2V.setValue(0);
				}else{
					numP2V.setValue(nump2L.getValue()*numP2W.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP3H=new Ext.form.NumberField({fieldLabel:'高',name:'p3H',value:p.get('p3H'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump3L.getValue()) || Ext.isEmpty(numP3W.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP3V.setValue(0);
				}else{
					numP3V.setValue(nump3L.getValue()*numP3W.getValue()*field.getRawValue());
				}
			}
		}
	});
	var numP4H=new Ext.form.NumberField({fieldLabel:'高',name:'p4H',value:p.get('p4H'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(nump4L.getValue()) || Ext.isEmpty(numP4W.getValue()) || Ext.isEmpty(field.getRawValue())){
					numP4V.setValue(0);
				}else{
					numP4V.setValue(nump4L.getValue()*numP4W.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var numGrossWeight=new Ext.form.NumberField({fieldLabel:'毛重',name:'grossWeight',value:p.get('grossWeight'),anchor:'95%'});
	var numP1GW=new Ext.form.NumberField({fieldLabel:'毛重',name:'p1GW',value:p.get('p1GW'),anchor:'95%'});
	var numP2GW=new Ext.form.NumberField({fieldLabel:'毛重',name:'p2GW',value:p.get('p2GW'),anchor:'95%'});
	var numP3GW=new Ext.form.NumberField({fieldLabel:'毛重',name:'p3GW',value:p.get('p3GW'),anchor:'95%'});
	var numP4GW=new Ext.form.NumberField({fieldLabel:'毛重',name:'p4GW',value:p.get('p4GW'),anchor:'95%'});
	
	var numNetWeight=new Ext.form.NumberField({fieldLabel:'净重',name:'netWeight',value:p.get('netWeight'),anchor:'95%'});
	var numP1NW=new Ext.form.NumberField({fieldLabel:'净重',name:'p1NW',value:p.get('p1NW'),anchor:'95%'});
	var numP2NW=new Ext.form.NumberField({fieldLabel:'净重',name:'p2NW',value:p.get('p2NW'),anchor:'95%'});
	var numP3NW=new Ext.form.NumberField({fieldLabel:'净重',name:'p3NW',value:p.get('p3NW'),anchor:'95%'});
	var numP4NW=new Ext.form.NumberField({fieldLabel:'净重',name:'p4NW',value:p.get('p4NW'),anchor:'95%'});
	
	var numVolume=new Ext.form.NumberField({fieldLabel:'体积',name:'volume',value:p.get('volume'),decimalPrecision:4,anchor:'95%'});
	var numP1V=new Ext.form.NumberField({fieldLabel:'体积',name:'p1V',value:p.get('p1V'),decimalPrecision:4,anchor:'95%'});
	var numP2V=new Ext.form.NumberField({fieldLabel:'体积',name:'p2V',value:p.get('p2V'),decimalPrecision:4,anchor:'95%'});
	var numP3V=new Ext.form.NumberField({fieldLabel:'体积',name:'p3V',value:p.get('p3V'),decimalPrecision:4,anchor:'95%'});
	var numP4V=new Ext.form.NumberField({fieldLabel:'体积',name:'p4V',value:p.get('p4V'),decimalPrecision:4,anchor:'95%'});

	var filedSetUnitName1=new Ext.form.FieldSet({
		labelWidth:90,layout:'column',layoutConfig:{columns:4},title:'单品包装',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboNumUnitName,numLength
			              ]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[numPQuantity,numWidth
		    	          ]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[numGrossWeight,numHeight
	    		          ]},
    		   {columnWidth:.25,layout:'form',border:false,
    			   items:[numNetWeight,numVolume
    			          ]}
				]
	
	});
	var filedSetUnitName2=new Ext.form.FieldSet({
		labelWidth:90,layout:'column',layoutConfig:{columns:4},title:'包装二',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboNumUnitNameP1,nump1L
			              ]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[numP1Quantity,numP1W
		    	          ]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[numP1GW,numP1H
	    		          ]},
    		   {columnWidth:.25,layout:'form',border:false,
    			   items:[numP1NW,numP1V
    			          ]}
				]
	});
	var filedSetUnitName3=new Ext.form.FieldSet({
		labelWidth:90,layout:'column',layoutConfig:{columns:4},title:'包装三',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboNumUnitNameP2,nump2L
			              ]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[numP2Quantity,numP2W
		    	          ]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[numP2GW,numP2H
	    		          ]},
    		   {columnWidth:.25,layout:'form',border:false,
    			   items:[numP2NW,numP2V
    			          ]}
				]
	});
	var filedSetUnitName4=new Ext.form.FieldSet({
		labelWidth:90,layout:'column',layoutConfig:{columns:4},title:'包装四',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboNumUnitNameP3,nump3L
			              ]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[numP3Quantity,numP3W
		    	          ]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[numP3GW,numP3H
	    		          ]},
    		   {columnWidth:.25,layout:'form',border:false,
    			   items:[numP3NW,numP3V
    			          ]}
				]
	});
	var filedSetUnitName5=new Ext.form.FieldSet({
		labelWidth:90,layout:'column',layoutConfig:{columns:4},title:'包装五',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboNumUnitNameP4,nump4L
			              ]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[numP4Quantity,numP4W
		    	          ]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[numP4GW,numP4H
	    		          ]},
    		   {columnWidth:.25,layout:'form',border:false,
    			   items:[numP4NW,numP4V
    			          ]}
				]
	});
	
	var fieldSetPanel=new Ext.form.FormPanel({title:'包装信息',padding:5,height:535,layout:'form',region:'center',
	items:[filedSetUnitName1,filedSetUnitName2,filedSetUnitName3,filedSetUnitName4,filedSetUnitName5]
	});
	
	var ctxtSkuNo=new Ext.form.TextField({fieldLabel:'SKU',name:'skuNo',value:p.get('skuNo'),itemCls:'required',anchor:'95%'});
	var ctxtCargoName=new Ext.form.TextField({fieldLabel:'商品名称',name:'cargoName',itemCls:'required',value:p.get('cargoName'),anchor:'95%'});
	var ctxtCargoNameEn=new Ext.form.TextField({fieldLabel:'商品英文名称',name:'cargoNameEn',value:p.get('cargoNameEn'),anchor:'95%'});
	var ctxtSpecification=new Ext.form.TextField({fieldLabel:'商品规格',name:'specification',value:p.get('specification'),anchor:'95%'});
	var ctxtCargoType=new Ext.form.TextField({fieldLabel:'商品型号',name:'cargoType',value:p.get('cargoType'),anchor:'95%'});
	var ctxtCargoColor=new Ext.form.TextField({fieldLabel:'商品颜色',anchor:'95%',name:'cargoColor',value:p.get('cargoColor')});
	var ctxtCargoAttribute=new Ext.form.TextField({fieldLabel:'商品属性',name:'cargoAttribute',valule:p.get('cargoAttribute'),anchor:'95%'});
	var ctxtCargoBrand=new Ext.form.TextField({fieldLabel:'商品品牌',name:'cargoBrand',value:p.get('cargoBrand'),anchor:'95%'});
	var ctxtHsCode=new Ext.form.TextField({fieldLabel:'海关编码',name:'hsCode',value:p.get('hsCode'),anchor:'95%'});
	var clkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,tabIndex:4,name:'cargoOwnerName',value:p.get('cargoOwnerName'),
  	  store:HTStore.getCS(),enableKeyEvents:true,
	  tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
	  xtype:'customerLookup',custType:'custBookerFlag',
	  displayField:'custCode',valueField:'custNameCn',
	  typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
	  listeners:{scope:this,
		  	blur:function(f){
		  		if(f.getRawValue()==''){
		  			f.clearValue();
		  			p.set('cargoOwnerId','');
		  		}
		  	},
		  			
		  	select:function(c,r,i){
		  		p.set('cargoOwnerId',r.get('id'));
		  	},
		  				
		  	keydown:{fn:function(f,e){
		  		LC(f,e,'custBookerFlag');
		  		},buffer:BF
		  	}
	}
});
	var ccboInUnitName=new Ext.form.ComboBox({fieldLabel:'默认入库包装',name:'inUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('inUnitValue'),displayField:'NAME',
		valueField:'CODE',typeAhead: true,mode:'local',itemCls:'required',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	
	var ccboOutUnitName=new Ext.form.ComboBox({fieldLabel:'默认出库包装',name:'outUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('outUnitValue'),displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',itemCls:'required',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	
	var cnumStorageMin=new Ext.form.NumberField({fieldLabel:'最低库存',name:'stockMin',value:p.get('stockMin'),anchor:'95%'});
	var cnumStorageMax=new Ext.form.NumberField({fieldLabel:'最高库存',name:'stockMax',value:p.get('stockMax'),anchor:'95%'});
	var cnumShelfLife=new Ext.form.NumberField({fieldLabel:'保质期天数',name:'safeDays',value:p.get('safeDays'),anchor:'95%'});
	var cnumTemperatureMin=new Ext.form.NumberField({fieldLabel:'最低温度',name:'temperatureMin',value:p.get('temperatureMin'),anchor:'95%'}); 
	var cnumTemperatureMax=new Ext.form.NumberField({fieldLabel:'最高温度',name:'temperatureMax',value:p.get('temperatureMax'),anchor:'95%'});
	var ccboDanerousClass=new Ext.form.ComboBox({fieldLabel:'危险品分类',displayField:'NAME',valueField:'NAME',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,store:WHTStore.HAZARDOUS_CLASS,
		anchor:'95%'});
	
	var cckbDetail=new Ext.form.Checkbox({fieldLabel:'具体',name:'isEntity',checked:p.get('isEntity')=='1',anchor:'99%'});
	var cckbIsEnabledFlag=new Ext.form.Checkbox({fieldLabel:'禁用',name:'isDisabled',checked:p.get('isDisabled')=='1',anhcor:'99%'});
	var cckbIsDangerous=new Ext.form.Checkbox({fieldLabel:'是否危险品',name:'isDangerous',checked:p.get('isDangerous')=='1',anchor:'99%'});
	var ccbkIsRefrigeration=new Ext.form.Checkbox({fieldLabel:'是否是冷藏品',name:'isRefrigeration',checked:p.get('isDangerous')=='1',anchor:'99%'});
	
	var ccboLengthUnitName=new Ext.form.ComboBox({fieldLabel:'长度单位',name:'lUnitName',store:WHTStore.getUNIT_L(),
		value:p.get('lUnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('lUnitId',r.get('id'));
			}
		}});
	
	var ccboWeightUnitName=new Ext.form.ComboBox({fieldLabel:'重量单位',name:'wUnitName',store:WHTStore.getUNIT_W(),
		value:p.get('wUnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('wUnitId',r.get('id'));
			}}});

	var ccboVolumeUnitName=new Ext.form.ComboBox({fieldLabel:'体积单位',name:'vUnitName',store:WHTStore.getUNIT_V(),
		value:p.get('vUnitName'),displayField:'unitName',valueField:'unitName',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vUnitId',r.get('id'));
			}}});
	
	//布局
	// sku,      商品型号，商品属性， 货主,     库存控制单位,最低温度
	//商品名称 ,   商品规格，商品品牌，保质期天数, 最低库存,最高温度
	//商品英文名称, 商品颜色，海关编码，危险品分类,最高库存,
	//具体,       禁用,    是否危险品,  是否是冷藏品,周转库存
	
	var basePanel=new Ext.form.FormPanel({region:'north',
		layout:'column',padding:5,height:195,aotoScroll:true,
		items:[{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
			 items:[ctxtSkuNo,ctxtCargoType,ctxtCargoAttribute,clkpCargoOwnerName,cnumStorageMin,ccboLengthUnitName,ccboInUnitName
			        ]},
		{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
			  items:[ctxtCargoName,ctxtSpecification,ctxtCargoBrand,cnumShelfLife,cnumStorageMax,ccboWeightUnitName,ccboOutUnitName
			         ]},
		{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
			 items:[ctxtCargoNameEn,ctxtCargoColor,ctxtHsCode,ccboDanerousClass,cnumTemperatureMin,ccboVolumeUnitName
			        ]},
		{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
			  items:[cckbDetail,cckbIsEnabledFlag,cckbIsDangerous,ccbkIsRefrigeration,cnumTemperatureMax
			         ]}]
	});
	

	var mainPanel=new Ext.Panel({region:'center',autoScroll:true,
		items:[basePanel,fieldSetPanel]
	});
	
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,handler:save});
	
	Fos.WCargoDetailPanel.superclass.constructor.call(this,{
		id:'W_Cargo_Detail',title:'商品信息',width:1000,iconCls:'gen',
		closable:true,layout:'border',autoScroll:true,border:false,
		items:[mainPanel],
		tbar:[btnSave]
	}
			);
};
Ext.extend(Fos.WCargoDetailPanel,Ext.Panel);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

Fos.CargoLookUp=Ext.extend(Ext.form.ComboBox,{
	triggerClass:'x-form-search-trigger',
	
	constructor:function(config){
		Fos.CargoLookUp.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.CargoLookUp.superclass.initComponent.call(this);        
	},
	selectCargo:function(cargo,scope){
		scope.setValue(cargo.data['cargoName']);
		scope.fireEvent('select', this, cargo, 0);
	},
	onTriggerClick:function(event){
		var win = new Fos.CargoLookWin(this.selectCargo,this);
		win.show();
	}
});
Ext.reg('cargoLookUp', Fos.CargoLookUp);

Fos.CargoLookWin = function(fn,scope) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WCARGO_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'},WCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
   
    //{
    //这里加入查询参数
    //}
	
    store.load({params:{start:0,limit:15}});
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:'商品代码',dataIndex:'skuNo',width:80},
		{header:'商品名称',dataIndex:'cargoName',width:100},
		{header:'英文名称',dataIndex:'cargoNameEn',width: 80},
		{header:'规格',dataIndex:'specification',width: 80},
		{header:'型号',dataIndex:'cargoType',width: 80},
		{header:'颜色',dataIndex:'cargoColor',width: 80},
		{header:'类别',dataIndex:'categoryName',width: 80},
		{header:'品牌',dataIndex:'cargoBrand',width: 80}
		],defaults:{sortable:true,width:100}});
	

	this.sel = function(){
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
	};
	
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,height:385,autoScroll:true,
		listeners:{scope:this,
			rowdblclick:this.sel
		},
		loadMask: true,
		bbar:PTB(store,15)
	});
	
	var search=function(){
		var a=[];
		var sValue=txtFilter.getValue();
		var radGet=radgType.getValue();
		var sName=radGet.inputValue;
		
		if(sValue){
			a[a.length]=new QParam({key:sName,value:sValue,op:7});
		}
		
		if(a.length<=0){
			store.baseParams={_mt:'xml',_A:'WCARGO_X'};
		}
		else{
			store.baseParams={_mt:'xml',_A:'WCARGO_X',xml:HTUtil.QATX(a)};
		}
		store.reload({
			params:{start:0,limit:15},
			callback:function(r){
				if (r.length==0)
				{
					XMG.alert(SYS,M_NOT_FOUND);
				}
				
			}
		});
	};
	
	var txtFilter=new Ext.form.TextField({fieldLabel:'查询条件',name:'filter',anchor:'95%'});
	var radCode=new Ext.form.Radio({checked:true,name:'type',inputValue:'skuNo',boxLabel:'编码'});
	var radName=new Ext.form.Radio({name:'type',inputValue:'cargoName',boxLabel:'名称'});
	var radgType=new Ext.form.RadioGroup({fieldLabel:'查询方式',items:[radCode,radName]});
	var btnSearch=new Ext.Button({text:'查询',iconCls:'search',scope:this,handler:search});
	
	var panel=new Ext.Panel({frame:true,border:false,height:50,
		layout:'column',
		items:[
    	    	{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[txtFilter]},
    	    	{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[radgType]},
    	    	{columnWidth:.15,labelAlign:'right',labelWidth:10,layout:'form',border:false,items:[btnSearch]}
    	    ]});
	Fos.CargoLookWin.superclass.constructor.call(this,{title:'选择商品',width:700,height:500,layout:'form',modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 

};
Ext.extend(Fos.CargoLookWin,Ext.Window);

Fos.MultipleSelectCargoWin = function(fn,scope){
	//var rs;
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WCARGO_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'},WCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
    store.load({params:{start:0,limit:15}});
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:'商品代码',dataIndex:'skuNo',width:80},
		{header:'商品名称',dataIndex:'cargoName',width:100},
		{header:'英文名称',dataIndex:'cargoNameEn',width: 80},
		{header:'规格',dataIndex:'specification',width: 80},
		{header:'型号',dataIndex:'cargoType',width: 80},
		{header:'颜色',dataIndex:'cargoColor',width: 80},
		{header:'类别',dataIndex:'categoryName',width: 80},
		{header:'品牌',dataIndex:'cargoBrand',width: 80}
		],defaults:{sortable:true,width:100}});
	
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,height:385,autoScroll:true,
		loadMask: true,
		bbar:PTB(store,15)
	});
	
	
	this.sel = function(){
		var re = grid.getSelectionModel().getSelections();
		if(re.length>0){
			fn(re,scope);
			//rs=re;
			this.close();
		}
		else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
		
	};
	var search=function(){
		var a=[];
		var sValue=txtFilter.getValue();
		var radGet=radgType.getValue();
		var sName=radGet.inputValue;
		if(sValue){
			a[a.length]=new QParam({key:sName,value:sValue,op:7});
		}
		if(a.length<=0){
			store.baseParams={_mt:'xml',_A:'WCARGO_X'};
		}
		else{
			store.baseParams={_mt:'xml',_A:'WCARGO_X',xml:HTUtil.QATX(a)};
		}
		store.reload({
			params:{start:0,limit:15},
			callback:function(r){
				if (r.length==0)
				{
					XMG.alert(SYS,M_NOT_FOUND);
				}
			}
		});
	};
	
	var txtFilter=new Ext.form.TextField({fieldLabel:'查询条件',name:'filter',anchor:'95%'});
	var radCode=new Ext.form.Radio({checked:true,name:'type',inputValue:'skuNo',boxLabel:'编码'});
	var radName=new Ext.form.Radio({name:'type',inputValue:'cargoName',boxLabel:'名称'});
	var radgType=new Ext.form.RadioGroup({fieldLabel:'查询方式',items:[radCode,radName]});
	var btnSearch=new Ext.Button({text:'查询',iconCls:'search',scope:this,handler:search});
	
	var panel=new Ext.Panel({frame:true,border:false,height:50,
		layout:'column',
		items:[{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[txtFilter]},
    	    	{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[radgType]},
    	    	{columnWidth:.15,labelAlign:'right',labelWidth:10,layout:'form',border:false,items:[btnSearch]}
    	    ]});
	
	Fos.MultipleSelectCargoWin.superclass.constructor.call(this,{title:'商品选择',
		 width:700,height:500,layout:'form',modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 

};
Ext.extend(Fos.MultipleSelectCargoWin, Ext.Window);


Fos.cargoTypeWin = function(p,store) {
	var categoryCode='';
	var categoryName='';
	var categoryId='';
	this.save = function(){
		p.beginEdit();
		p.set('categoryCode',categoryCode);
	    p.set('categoryName',categoryName);
	    p.set('categoryId',categoryId);
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('categoryName'))){
			Ext.Msg.alert(SYS,'请选择商品类别！',function(){transCarrier.focus();},this);
			return;
		};
		if(categoryCode==''){
			Ext.Msg.alert(SYS,'商品代码是空的！',function(){transCarrier.focus();},this);
			return;
		};
		if(categoryName==''){
			Ext.Msg.alert(SYS,'商品名称是空的！',function(){transCarrier.focus();},this);
			return;
		};
		var xml = HTUtil.RTX(p,'WCargo',WCargo);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CATEGORY_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WCargo',WCargo);
			var f = WCargo.prototype.fields;
			for (var i = 0; i < f.keys.length; i++) {var fn = ''+f.keys[i];p.set(fn,c.get(fn));}; 
			p.set('rowAction','M');
			p.endEdit();
			store.reload();
			this.close();
			Ext.Msg.alert(SYS,M_S);
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	var listCargoType=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'CATEGORY_Q',_mt:'xml',transCarrier:q},
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
	var transCarrier=new Ext.form.ComboBox({fieldLabel:'商品类别',name:'categoryName',
	    store:WHTStore.getCargoType('CATEGORY_Q'),itemCls:'required',
	    displayField:'categoryName',valueField:'categoryName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					categoryName=r.get('categoryName');
					categoryCode=r.get('categoryCode');
					categoryId=r.get('id');
				},
				keyup:{fn:function(f,e){
					listCargoType(f,e);
				},buffer:800}
		 	}
     });
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,
		items:[transCarrier]});
	                                                                                		                                                                
	Fos.cargoTypeWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('cargoName')+'—更改商品类别',
		width:300,height:120,modal:true,
	  	items:[frm],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.cargoTypeWin, Ext.Window);
