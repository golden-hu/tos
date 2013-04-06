
Fos.PackagePanel = function(p) {
	
	this.sel=-1000;
	var b;
	var puuid='';
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WPACKAGE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPackage',id:'id'},WPackage),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load();
	var listen={scope:this,
			rowselect:function(sm,row,record){
				if(this.sel!=record.get('id'))
				{
					this.sel=record.get('id');
					frm.getForm().reset();
					frm.getForm().loadRecord(record);
					
				}
			}
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:listen});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'包装名称',dataIndex:'packageName'},
	    {header:'中文名称',dataIndex:'packageCh'},
      	{header:'英文名称',dataIndex:'packageEn'}
          ],defaults:{sortable:true,width:100}});
	
	 var gridPanel = new Ext.grid.GridPanel({title:'列表',
		    region:'west',width:270,
		    split:true,iconCls:'gen',autoScroll:true,
			store:store,sm:sm,cm:cm
		    });
	
	this.validationPackageName=function(f){
		if(f!=null){
			Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'WPACKAGE_V',_mt:'xml',packageName:f.getRawValue()},
				success: function(r){
					var a=HTUtil.XTRA(r.responseXML,'WPackage',WPackage);
					if(a.length>0){
						f.setValue('');
						Ext.Msg.alert(SYS,'此包装名称已经存在！');
						return;
					}
				}
			});
		}
	};
	
	var packageName=new Ext.form.TextField({fieldLabel:'包装',name:'packageName',
		value:p.get('packageName'),tabIndex:7,
		itemCls:'required',anchor:'50%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				this.validationPackageName(field);
			}
		}
	});
	
	
	var packageCh=new Ext.form.TextField({fieldLabel:'中文名称',name:'packageCh',value:p.get('packageCh'),anchor:'70%'});
	
	var packageEn=new Ext.form.TextField({fieldLabel:'英文名称',name:'packageEn',value:p.get('packageEn'),anchor:'70%'});
	
	//主信息
	var mainQuantity =new Ext.form.NumberField({fieldLabel:'主信息',name:'mainQuantity',value:p.get('mainQuantity'),bodyStyle:"padding-top:80px",anchor:'95%'});
	//描述
	var discriptionMainType=new Ext.form.ComboBox({name:'discriptionMainType',value:p.get('discriptionMainType'),anchor:'95%',
		store:HTStore.getUNIT_C(),displayField:'unitName',valueField:'unitName',mode:'remot',triggerAction:'all',selectOnFocus:true
	});
	//补货
	var replenishMain= new Ext.form.Checkbox({name:'replenishMain',value:p.get('replenishMain'),anchor:'95%'});
	//装箱
	var containerMain= new Ext.form.Checkbox({name:'containerMain',value:p.get('replenishMain'),anchor:'95%'});
	//收货标签单元
	var inLabelMain= new Ext.form.Checkbox({name:'inLabelMain',value:p.get('inLabelMain'),anchor:'95%'});
	//出库标签单元
	var outLabelMain= new Ext.form.Checkbox({name:'outLabelMain',value:p.get('outLabelMain'),anchor:'95%'});
	
	
	//内包装数量
	var innerQuantity=new Ext.form.TextField({fieldLabel:'内包装数量',name:'innerQuantity',value:p.get('innerQuantity'),bodyStyle:"padding-top:80px",anchor:'95%'});
	//内包装描述
	var discriptionInnerType= new Ext.form.ComboBox({name:'discriptionInnerType',value:p.get('discriptionInnerType'),anchor:'95%',
		store:HTStore.getUNIT_C(),displayField:'unitName',valueField:'unitName',mode:'remot',triggerAction:'all',selectOnFocus:true
		});
	//内包装补货
	var replenishInner= new Ext.form.Checkbox({name:'replenishInner',value:p.get('replenishInner'),anchor:'95%'});
	//内包装装箱
	var containerInner= new Ext.form.Checkbox({name:'containerInner',value:p.get('containerInner'),anchor:'95%'});
	//内包装收货标签单元
	var inLabelInner= new Ext.form.Checkbox({name:'inLabelInner',value:p.get('inLabelInner'),anchor:'95%'});
	//内包装出库标签单元
	var outLabelInner= new Ext.form.Checkbox({name:'outLabelInner',value:p.get('outLabelInner'),anchor:'95%'});
	
	
	//箱
	var boxQuantity=new Ext.form.NumberField({name:'boxQuantity',value:p.get('boxQuantity'),anchor:'95%'});
	//箱包装描述
	var discriptionBoxType= new Ext.form.ComboBox({name:'discriptionBoxType',value:p.get('discriptionBoxType'),anchor:'95%',
		store:HTStore.getUNIT_C(),displayField:'unitName',valueField:'unitName',mode:'remot',triggerAction:'all',selectOnFocus:true
	});
	//箱装补货
	var replenishBox= new Ext.form.Checkbox({name:'replenishBox',value:p.get('replenishBox'),anchor:'95%'});
	//箱装装箱
	var containerBox= new Ext.form.Checkbox({name:'containerBox',value:p.get('containerBox'),anchor:'95%'});
	//箱收货标签单元
	var inLabelBox= new Ext.form.Checkbox({name:'inLabelBox',value:p.get('inLabelBox'),anchor:'95%'});
	//箱标签单元
	var outLabelBox= new Ext.form.Checkbox({name:'outLabelBox',value:p.get('outLabelBox'),anchor:'95%'});
	
	
	//栈板
	var palletQuantity=new Ext.form.NumberField({name:'palletQuantity',value:p.get('palletQuantity'),anchor:'95%'});
	//栈板描述
	var discriptionPalletType= new Ext.form.ComboBox({name:'discriptionPalletType',value:p.get('discriptionPalletType'),anchor:'95%',
		store:HTStore.getUNIT_C(),displayField:'unitName',valueField:'unitName',mode:'remot',triggerAction:'all',selectOnFocus:true
	});
	//栈板补货
	var replenishPallet= new Ext.form.Checkbox({name:'replenishPallet',value:p.get('replenishPallet'),anchor:'95%'});
	//栈板装箱
	var containerPallet= new Ext.form.Checkbox({name:'containerPallet',value:p.get('containerPallet'),anchor:'95%'});
	//栈板收货标签单元
	var inLabelPallet= new Ext.form.Checkbox({name:'inLabelPallet',value:p.get('inLabelPallet'),anchor:'95%'});
	//栈板标签单元
	var outLabelPallet= new Ext.form.Checkbox({name:'outLabelPallet',value:p.get('outLabelPallet'),anchor:'95%'});
	
	
	//其他
	var otherQuantity=new Ext.form.NumberField({name:'otherQuantity',value:p.get('otherQuantity'),anchor:'95%'});
	//其他描述
	var discriptionOtherType= new Ext.form.ComboBox({name:'discriptionOtherType',value:p.get('discriptionOtherType'),anchor:'95%',
		store:HTStore.getUNIT_C(),displayField:'unitName',valueField:'unitName',mode:'remot',triggerAction:'all',selectOnFocus:true
		});
	//其他补货
	var replenishOther= new Ext.form.Checkbox({name:'replenishOther',value:p.get('replenishOther'),anchor:'95%'});
	//其他装箱
	var containerOther= new Ext.form.Checkbox({name:'containerOther',value:p.get('containerOther'),padding:56,anchor:'95%'});
	//其他收货标签单元
	var inLabelOther= new Ext.form.Checkbox({name:'inLabelOther',value:p.get('inLabelOther'),anchor:'95%'});
	//其他收货标签单元
	var outLabelOther= new Ext.form.Checkbox({name:'outLabelOther',value:p.get('outLabelOther'),anchor:'95%'});


	var nullLabel= new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:'',name:'nullLabel',anchor:'95%'});
	
	var nullLabel1= new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:'',name:'nullLabel1',anchor:'95%'});
	
	var mainLabel= new Ext.form.Label({fieldLabel:'主单位',name:'mainLabel',itemCls:'required',anchor:'95%'});

	var innerLabel= new Ext.form.Label({fieldLabel:'内装单位',name:'innerLabel',anchor:'95%'});

	var boxLabel= new Ext.form.Label({fieldLabel:'箱',name:'boxLabel',anchor:'95%'});

	var palletLabel= new Ext.form.Label({fieldLabel:'栈板',name:'palletLabel',anchor:'95%'});

	var otherLabel= new Ext.form.Label({fieldLabel:'其他',name:'otherLabel',anchor:'95%'});


	var quantityLabel= new Ext.form.Label({fieldLabel:'数量',labelSeparator:'',name:'quantityLabel',anchor:'95%'});
	
	var discriptionLabel= new Ext.form.Label({fieldLabel:'描述',labelSeparator:'',name:'replenishLabel',anchor:'95%'});
	
	var replenishLabel= new Ext.form.Label({fieldLabel:'补货',labelSeparator:'',name:'replenishLabel',anchor:'95%'});
	
	var containerLabel= new Ext.form.Label({fieldLabel:'装箱',labelSeparator:'',name:'containerLabel',anchor:'95%'});
	
	var inLabel= new Ext.form.Label({fieldLabel:'收货标签单元',labelSeparator:'',name:'inLabel',anchor:'95%'});
	
	var outLabel= new Ext.form.Label({fieldLabel:'出库标签单元',labelSeparator:'',name:'outLabel',anchor:'95%'});
	
	
	var sheet1=new Ext.Panel({
		labelWidth:80,layout:'form',layoutConfig:{columns:4},height:110,padding:5,
		items:[packageName,packageCh,packageEn]
	});
	
	
	var sheet2=new Ext.Panel({
		labelWidth:80,layout:'column',layoutConfig:{columns:1},
		items:[{columnWidth:.2,layout:'form',border:false,labelAlign:'top',
			       items:[nullLabel]},
		       {columnWidth:.18,layout:'form',border:false,labelAlign:'top',
			       items:[quantityLabel]},
		       {columnWidth:.2,layout:'form',border:false,labelAlign:'top',
		    	   items:[discriptionLabel]},
	    	   {columnWidth:.11,layout:'form',border:false,labelAlign:'top',
	    		   items:[replenishLabel]},
    		   {columnWidth:.1,layout:'form',border:false,labelAlign:'top',
    			   items:[containerLabel]},
			   {columnWidth:.1,layout:'form',border:false,labelAlign:'top',
				   items:[inLabel]},
		       {columnWidth:.1,layout:'form',border:false,labelAlign:'top',
			       items:[outLabel]}]
	});


	var sheet3=new Ext.Panel({
		labelWidth:80,layout:'column',layoutConfig:{columns:7},autoHeight:true,
		items:[{columnWidth:.14,layout:'form',border:false,labelAlign:'right',autoHeight:true,
			       items:[mainLabel,innerLabel,boxLabel,palletLabel,otherLabel]},
		       {columnWidth:.18,layout:'anchor',border:false,height:150,autoHeight:true,
			       items:[{padding:2},mainQuantity,{padding:2},innerQuantity,{padding:2},boxQuantity,{padding:2},palletQuantity,{padding:2},otherQuantity]},
		       {columnWidth:.18,layout:'anchor',border:false,autoHeight:true,
		    	   items:[{padding:2},discriptionMainType,{padding:2},discriptionInnerType,{padding:2},discriptionBoxType,{padding:2},discriptionPalletType,{padding:2},discriptionOtherType]},
	    	   {columnWidth:.12,layout:'form',border:false,autoHeight:true,
	    		   items:[{padding:2},replenishMain,{padding:2},replenishInner,{padding:2},replenishBox,{padding:2},replenishPallet,{padding:2},replenishOther]},
    		   {columnWidth:.12,layout:'form',border:false,autoHeight:true,
    			   items:[{padding:2},containerMain,{padding:2},containerInner,{padding:2},containerBox,{padding:2},containerPallet,{padding:2},containerOther]},
			   {columnWidth:.12,layout:'form',border:false,autoHeight:true,
				   items:[{padding:2},inLabelMain,{padding:2},inLabelInner,{padding:2},inLabelBox,{padding:2},inLabelPallet,{padding:2},inLabelOther]},
		       {columnWidth:.12,layout:'form',border:false,autoHeight:true,
			       items:[{padding:2},outLabelMain,{padding:2},outLabelInner,{padding:2},outLabelBox,{padding:2},outLabelPallet,{padding:2},outLabelOther]}]
	});

	var base = new Ext.Panel({title:'基础信息',
		labelWidth:90,autoHeight:true,
		height:220,
		items:[sheet2,sheet3]
	});
	
	
	var lengthMain=new Ext.form.NumberField({fieldLabel:'主单位长',name:'lengthMain',value:p.get('lengthMain'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(widthMain.getValue()) || Ext.isEmpty(heightMain.getValue())){
					volumeMain.setValue(0);
				}else{
					volumeMain.setValue(field.getRawValue()*widthMain.getValue()*heightMain.getValue());
				}
			}
		}
	});
	
	var widthMain=new Ext.form.NumberField({fieldLabel:'主单位宽',name:'widthMain',value:p.get('widthMain'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(lengthMain.getValue()) || Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(heightMain.getValue())){
					volumeMain.setValue(0);
				}else{
					volumeMain.setValue(lengthMain.getValue()*field.getRawValue()*heightMain.getValue());
				}
			}
		}
	});
	
	var heightMain=new Ext.form.NumberField({fieldLabel:'主单位高',name:'heightMain',value:p.get('heightMain'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(lengthMain.getValue()) || Ext.isEmpty(widthMain.getValue()) || Ext.isEmpty(field.getRawValue())){
					volumeMain.setValue(0);
				}else{
					volumeMain.setValue(lengthMain.getValue()*widthMain.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var volumeMain=new Ext.form.NumberField({fieldLabel:'主单位体积',name:'volumeMain',value:p.get('volumeMain'),anchor:'95%'});
	
	var weightMain=new Ext.form.NumberField({fieldLabel:'主单位重量',name:'weightMain',value:p.get('weightMain'),anchor:'95%'});
	
	
	var lengthInner=new Ext.form.NumberField({fieldLabel:'内装长',name:'lengthInner',value:p.get('lengthInner'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthInner.getValue()) || Ext.isEmpty(heightInner.getValue()) || Ext.isEmpty(field.getRawValue())){
					volumeInner.setValue(0);
				}else{
					volumeInner.setValue(widthInner.getValue()*heightInner.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var widthInner=new Ext.form.NumberField({fieldLabel:'内装宽',name:'widthInner',value:p.get('widthInner'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(heightInner.getValue()) || Ext.isEmpty(lengthInner.getValue())){
					volumeInner.setValue(0);
				}else{
					volumeInner.setValue(field.getRawValue()*heightInner.getValue()*lengthInner.getValue());
				}
			}
		}
	});
	
	var heightInner=new Ext.form.NumberField({fieldLabel:'内装高',name:'heightInner',value:p.get('heightInner'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthInner.getValue()) || Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(lengthInner.getValue())){
					volumeInner.setValue(0);
				}else{
					volumeInner.setValue(widthInner.getValue()*field.getRawValue()*lengthInner.getValue());
				}
			}
		}
	});
	
	var volumeInner=new Ext.form.NumberField({fieldLabel:'内装体积',name:'volumeInner',value:p.get('volumeInner'),anchor:'95%'});
	
	var weightInner=new Ext.form.NumberField({fieldLabel:'内装重量',name:'weightInner',value:p.get('weightInner'),anchor:'95%'});
	
	
	
	var lengthBox=new Ext.form.NumberField({fieldLabel:'箱长',name:'lengthBox',value:p.get('lengthBox'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthBox.getValue()) || Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(heightBox.getValue())){
					volumeBox.setValue(0);
				}else{
					volumeBox.setValue(widthBox.getValue()*field.getRawValue()*heightBox.getValue());
				}
			}
		}
	});
	
	var widthBox=new Ext.form.NumberField({fieldLabel:'箱宽',name:'widthBox',value:p.get('widthBox'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(lengthBox.getValue()) || Ext.isEmpty(heightBox.getValue())){
					volumeBox.setValue(0);
				}else{
					volumeBox.setValue(field.getRawValue()*lengthBox.getValue()*heightBox.getValue());
				}
			}
		}
	});
	
	var heightBox=new Ext.form.NumberField({fieldLabel:'箱高',name:'heightBox',value:p.get('heightBox'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthBox.getValue()) || Ext.isEmpty(lengthBox.getValue()) || Ext.isEmpty(field.getRawValue())){
					volumeBox.setValue(0);
				}else{
					volumeBox.setValue(widthBox.getValue()*lengthBox.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var volumeBox=new Ext.form.NumberField({fieldLabel:'箱体积',name:'volumeBox',value:p.get('volumeBox'),anchor:'95%'});
	
	var weightBox=new Ext.form.NumberField({fieldLabel:'箱重量',name:'weightBox',value:p.get('weightBox'),anchor:'95%'});
	
	
	
	var lengthPallet=new Ext.form.NumberField({fieldLabel:'栈板长',name:'lengthPallet',value:p.get('lengthPallet'),anchor:'95%'});
	
	var widthPallet=new Ext.form.NumberField({fieldLabel:'栈板宽',name:'widthPallet',value:p.get('widthPallet'),anchor:'95%'});
	
	var heightPallet=new Ext.form.NumberField({fieldLabel:'栈板高',name:'heightPallet',value:p.get('heightPallet'),anchor:'95%'});
	
	var palletCargoLength=new Ext.form.NumberField({fieldLabel:'栈板货物长',name:'palletCargoLength',value:p.get('palletCargoLength'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(palletCargoWeight.getValue()) || Ext.isEmpty(palletCargoHeight.getValue()) || Ext.isEmpty(field.getRawValue())){
					volumePallet.setValue(0);
				}else{
					volumePallet.setValue(palletCargoWeight.getValue()*palletCargoHeight.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var palletCargoWeight=new Ext.form.NumberField({fieldLabel:'栈板货物宽',name:'palletCargoWeight',value:p.get('palletCargoWeight'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(palletCargoHeight.getValue()) || Ext.isEmpty(palletCargoLength.getValue())){
					volumePallet.setValue(0);
				}else{
					volumePallet.setValue(field.getRawValue()*palletCargoHeight.getValue()*palletCargoLength.getValue());
				}
			}
		}
	});
	
	var palletCargoHeight=new Ext.form.NumberField({fieldLabel:'栈板货物高',name:'palletCargoHeight',value:p.get('palletCargoHeight'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(palletCargoWeight.getValue()) || Ext.isEmpty(field.getValue()) || Ext.isEmpty(palletCargoLength.getValue())){
					volumePallet.setValue(0);
				}else{
					volumePallet.setValue(palletCargoWeight.getValue()*field.getValue()*palletCargoLength.getValue());
				}
			}
		}
	});
	
	var volumePallet=new Ext.form.NumberField({fieldLabel:'栈板体积',name:'volumePallet',value:p.get('volumePallet'),anchor:'95%'});
	
	var weightPallet=new Ext.form.NumberField({fieldLabel:'栈板重量',name:'weightPallet',value:p.get('weightPallet'),anchor:'95%'});
	
	
	
	var lengthOther=new Ext.form.NumberField({fieldLabel:'其他长',name:'lengthOther',value:p.get('lengthOther'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthOther.getValue()) || Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(heightOther.getValue())){
					volumeOther.setValue(0);
				}else{
					volumeOther.setValue(widthOther.getValue()*field.getRawValue()*heightOther.getValue());
				}
			}
		}
	});
	
	var widthOther=new Ext.form.NumberField({fieldLabel:'其他板宽',name:'widthOther',value:p.get('widthOther'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(lengthOther.getValue()) || Ext.isEmpty(heightOther.getValue())){
					volumeOther.setValue(0);
				}else{
					volumeOther.setValue(field.getRawValue()*lengthOther.getValue()*heightOther.getValue());
				}
			}
		}
	});
	
	var heightOther=new Ext.form.NumberField({fieldLabel:'其他高',name:'heightOther',value:p.get('heightOther'),anchor:'95%',
		listeners:{scope:this,
			change:function(field,newValue,oldValue){
				if(Ext.isEmpty(widthOther.getValue()) || Ext.isEmpty(lengthOther.getValue()) || Ext.isEmpty(field.getRawValue())){
					volumeOther.setValue(0);
				}else{
					volumeOther.setValue(widthOther.getValue()*lengthOther.getValue()*field.getRawValue());
				}
			}
		}
	});
	
	var volumeOther=new Ext.form.NumberField({fieldLabel:'其他体积',name:'volumeOther',value:p.get('volumeOther'),anchor:'95%'});
	
	var weightOther=new Ext.form.NumberField({fieldLabel:'其他重量',name:'weightOther',value:p.get('weightOther'),anchor:'95%'});
	
	var HI=new Ext.form.NumberField({fieldLabel:'HI',name:'hi',value:p.get('hi'),anchor:'95%'});
	
	var TI=new Ext.form.NumberField({fieldLabel:'TI',name:'ti',value:p.get('ti'),anchor:'95%'});
	
	
	var lengthLabel=new Ext.form.Label({fieldLabel:'长',labelSeparator:'',name:'lengthLabel',anchor:'95%'});
	var wiethLabel=new Ext.form.Label({fieldLabel:'宽',labelSeparator:'',name:'wiethLabel',anchor:'95%'});
	var heightLabel=new Ext.form.Label({fieldLabel:'高',labelSeparator:'',name:'heightLabel',anchor:'95%'});
	var volumeLabel=new Ext.form.Label({fieldLabel:'体积',labelSeparator:'',name:'volumeLabel',anchor:'95%'});
	var weightLabel=new Ext.form.Label({fieldLabel:'重量',labelSeparator:'',name:'weightLabel',anchor:'95%'});
	var THLabel=new Ext.form.Label({fieldLabel:'TI*HI',labelSeparator:'',name:'weightLabel',anchor:'95%'});
	
	var nullLabel1= new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:'',name:'nullLabel',anchor:'95%'});
	var nullLabel2= new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:'',name:'nullLabel2',anchor:'95%'});
	var mainLabel1= new Ext.form.Label({fieldLabel:'主单位',name:'mainLabel',anchor:'95%'});
	var innerLabel1= new Ext.form.Label({fieldLabel:'内装单位',name:'innerLabel',anchor:'95%'});
	var boxLabel1= new Ext.form.Label({fieldLabel:'箱',name:'boxLabel',anchor:'95%'});
	var palletLabel1= new Ext.form.Label({fieldLabel:'栈板',name:'palletLabel',anchor:'95%'});
	var otherLabel1= new Ext.form.Label({fieldLabel:'其他',name:'otherLabel',anchor:'95%'});
	
	
	var sheet5=new Ext.Panel({
		labelWidth:80,layout:'column',layoutConfig:{columns:7},
		items:[{columnWidth:.16,layout:'form',border:false,labelAlign:'top',
			       items:[nullLabel1]},
		       {columnWidth:.13,layout:'form',border:false,labelAlign:'top',
		    	   items:[lengthLabel]},
		       {columnWidth:.13,layout:'form',border:false,labelAlign:'top',
			       items:[wiethLabel]},
		       {columnWidth:.12,layout:'form',border:false,labelAlign:'top',
		    	   items:[heightLabel]},
	    	   {columnWidth:.13,layout:'form',border:false,labelAlign:'top',
	    		   items:[volumeLabel]},
    		   {columnWidth:.14,layout:'form',border:false,labelAlign:'top',
    			   items:[weightLabel]},
		       {columnWidth:.14,layout:'form',border:false,labelAlign:'top',
			       items:[THLabel]}]
	});
	
	
	
	var sheet6=new Ext.Panel({
		labelWidth:80,layout:'column',layoutConfig:{columns:7},
		items:[{columnWidth:.125,layout:'form',border:false,labelAlign:'right',
			       items:[mainLabel1,innerLabel1,boxLabel1,palletLabel1,nullLabel2,otherLabel1]},
		       {columnWidth:.125,layout:'anchor',border:false,
			       items:[{padding:2},lengthMain,{padding:2},lengthInner,{padding:2},lengthBox,{padding:2},palletCargoLength,{padding:2},lengthPallet,{padding:2},lengthOther]},
		       {columnWidth:.125,layout:'anchor',border:false,
		    	   items:[{padding:2},widthMain,{padding:2},widthInner,{padding:2},widthBox,{padding:2},palletCargoWeight,{padding:2},widthPallet,{padding:2},widthOther]},
	    	   {columnWidth:.125,layout:'anchor',border:false,
	    		   items:[{padding:2},heightMain,{padding:2},heightInner,{padding:2},heightBox,{padding:2},palletCargoHeight,{padding:2},heightPallet,{padding:2},heightOther]},
    		   {columnWidth:.125,layout:'anchor',border:false,
    			   items:[{padding:2},volumeMain,{padding:2},volumeInner,{padding:2},volumeBox,{padding:2},volumePallet,{padding:15},volumeOther]},
		       {columnWidth:.125,layout:'anchor',border:false,
			       items:[{padding:2},weightMain,{padding:2},weightInner,{padding:2},weightBox,{padding:2},weightPallet,{padding:15},weightOther]},
		       {columnWidth:.1,layout:'anchor',border:false,
    			   items:[{padding:41},TI]},
		       {columnWidth:.1,layout:'anchor',border:false,
    			   items:[{padding:41},HI]}]
	});
	
	
	
	var addition = new Ext.Panel({title:'附加',
		labelWidth:90,
		height:220,
		items:[sheet5,sheet6]
	});
	
	
	var tab=new Ext.TabPanel({activeTab:0,
		items:[base,addition]});
	
	var add=function(){
		var r=new WPackage({uuid:HTUtil.UUID(32),
			rowAction:'N',
			mainQuantity:1});
		store.insert(0,r);
		sm.selectFirstRow();
		frm.getForm().reset();
	};
	
	this.save=function(){
		var b =sm.getSelected();
		if(packageName.getValue()==''){
			XMG.alert(SYS,"包装名称不能为空！",function(){packageName.focus();});
			return;
		};
		if(mainQuantity.getValue()==''){
			XMG.alert(SYS,"主信息数量不能为空！",function(){mainQuantity.focus();});
			return;
		};
		
		if(b){
			//this.validationPackageName(packageName);
			b.beginEdit();
			var f = WPackage.prototype.fields;
			for (var i = 0; i < f.keys.length; i++) {
	        	var fn = ''+f.keys[i];
	        	var fc = this.find('name',fn);
	        	if(fc!=undefined&&fc.length>0){
	        		b.set(fn,fc[0].getValue());
	        	}
	   	 	}
			b.endEdit();
			var xml = HTUtil.RTX(b,'WPackage',WPackage);
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPACKAGE_S'},
				success: function(res){
					var c = HTUtil.XTR(res.responseXML,'WPackage',WPackage);
					var ra=b.get('rowAction');
					var f = WPackage.prototype.fields;
					b.beginEdit();
						for (var i = 0; i < f.keys.length; i++) {
							var fn = ''+f.keys[i];
							b.set(fn,c.get(fn));
						};
					if(ra=='N'){
						b.set('rowAction','M');
					}
					b.endEdit();
					store.reload();
					XMG.alert(SYS,M_S);
				},
				failure: function(res){
					XMG.alert(SYS,M_F+res.responseText);
				},
				xmlData:HTUtil.HTX(xml)
			});
		}
		
	};
	
	
	
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	this.removePackage=function(){
		Ext.getCmp('removeBtn').setDisabled(true);
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.RTX4R(p,'WPackage');
            	HTUtil.REQUEST('WPACKAGE_S', xml,this.removeTab,this);
        	}
		},this);
		Ext.getCmp('removeBtn').setDisabled(false);
	};
	
	var btnAdd=new Ext.Button({text:C_ADD,id:'btnAdd',iconCls:'add',scope:this,handler:add});
	var btnSave=new Ext.Button({text:C_SAVE,id:'btnSave',iconCls:'save',ref:'../saveBtn',scope:this,handler:this.save});
	
	
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',ref:'../removeBtn',scope:this,handler:this.removePackage});
	
	var frm = new Ext.form.FormPanel({
		labelWidth:80,frame:true,
		region:'center',height:220,
		items:[sheet1,tab]
	});
	
	Fos.PackagePanel.superclass.constructor.call(this, {
	id: 'PACKAGE_PANEL',title:'包装信息',
	closable:true,layout:'border',autoScroll:true,
	tbar:[btnAdd,
	      btnSave,
	      btnRemove],
	items: [gridPanel,frm]
	});
};
Ext.extend(Fos.PackagePanel, Ext.Panel);