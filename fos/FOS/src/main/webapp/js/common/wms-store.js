//初始化Store

var WHTStore = {
		getNameById : function(store,v){
			if(Ext.isEmpty(v))
				return '';
			else 
				return store.getById(v).get('NAME'); 
		},
		
		REMOVED_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
	    	data:[
	        [0,'正常'],[1,'已删除']
	        ]}),
	    getRemoved : function(v){return WHTStore.getNameById(WHTStore.REMOVED_S, v);},
	    
		//包装方式
	    PACKAGES_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
	    	data:[
	        [0,'长'],[1,'宽'],[2,'高'],[3,'件数'],[4,'毛重'],[5,'净重'],[6,'体积'],[7,'面积'],[8,'计费重'],
	        [9,'托'],[10,'数量']
	        ]}),
	    getPackages : function(v){return WHTStore.getNameById(WHTStore.PACKAGES_S, v);},
	    
	    //移库操作类型
	    AT_CLASS:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        [0,'入库'],[1,'出仓'],[2,'损坏']]}),
	    getAtClass:function(v){return WHTStore.getNameById(WHTStore.AT_CLASS,v);},
	    
	    //移库操作类型
	    
	    //移库操作类型
	    BIZ_TYPE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        [0,'入库'],[1,'出仓'],[2,'加工作业'],[3,'其他']]}),
	    getBizType:function(v){return WHTStore.getNameById(WHTStore.BIZ_TYPE_S,v);},
	    
	    //移库操作类型
	    TRANS_TYPE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        [0,'移库'],[1,'倒库']]}),
	    getTransType:function(v){return WHTStore.getNameById(WHTStore.TRANS_TYPE_S,v);},
		
	    QA_TYPE_S  : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        	[0,'不质检'],[1,'全部质检'],[2,'部分质检']]}),  
        getQA_TYPE : function(v){return WHTStore.getNameById(WHTStore.QA_TYPE_S, v);},
        
        //品质
        QUALITY_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
           [0,''],[1,'良品'],[2,'次品'],[3,'退货'],[4,'破损']]}),   
        getQualityType : function(v){return WHTStore.getNameById(WHTStore.QUALITY_TYPE_S, v);},
        	
        //入库单状态
        IN_WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        	[0,'新增'],[1,'已提交'],[2,'收货中'],[3,'收货完成'],[4,'上架中'],[5,'上架完成'],[6,'已作废'],[7,'质检中'],[8,'质检完成']]}),  
        getInWarehouseNoteStatus : function(v){return WHTStore.getNameById(WHTStore.IN_WAREHOUSE_NOTE_S, v);},
        
        //库存状态
        WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
           [0,'新增'],[1,'上架中'],[2,'上架完成']]}),  
           getWarehouseNoteStatus : function(v){return WHTStore.getNameById(WHTStore.WAREHOUSE_NOTE_S, v);},
        	
        //出库单状态
        OUT_WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
            [0,'新增'],[1,'已提交'],[2,'配货中'],[3,'配货完成'],[4,'出库中'],[5,'出库完成'],[6,'已作废']]}),
        getOutWarehouseNoteStatus : function(v){return WHTStore.getNameById(WHTStore.OUT_WAREHOUSE_NOTE_S, v);},
        
        getWarehouseStatus:function(t,v){
        	if(t==0){
        		return WHTStore.getNameById(WHTStore.IN_WAREHOUSE_NOTE_S, v);
        	}
        	else{
        		return WHTStore.getNameById(WHTStore.OUT_WAREHOUSE_NOTE_S, v);
        	}
        },
      //出库单状态报表查询
        OUT_WAREHOUSE_NOTE_SS:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
            [0,'配货中'],[1,'配货完成'],[2,'出库中'],[3,'出库完成'],[4,'已作废']]}),
        getOutWarehouseNoteStatuss : function(v){return WHTStore.getNameById(WHTStore.OUT_WAREHOUSE_NOTE_SS, v);},
        
        RECEVED_PLACED_DATE:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'接单日期'],[1,'出库日期']]}),
        recevedPlacedDate:function(v){return WHTStore.getNameById(WHTStore.RECEVED_PLACED_DATE,v);},
        
        //移库单状态
        TRANS_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        	[0,'未提交'],[1,'已提交'],[2,'审核通过'],[3,'审核不通过'],[4,'已执行']]}),
        getTransNoteStatus:function(v){return WHTStore.getNameById(WHTStore.TRANS_NOTE_S,v);},
        
        //盘点单状态
        CHECK_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
            [0,'新增'],[1,'已提交'],[2,'已审核'],[3,'已完成']]}),
        getCheckNoteStatus : function(v){return WHTStore.getNameById(WHTStore.CHECK_NOTE_S, v);},
        
        CHECK_TYPE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
            [0,'盘亏'],[1,'盘盈'],[2,'改批号'],[3,'其他']]}),
        getCheckType : function(v){return WHTStore.getNameById(WHTStore.CHECK_TYPE_S, v);},
       
	    //质检状态
	    QUALITY_TYPE:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'已质检完成'],[1,'待质检']]}),
	    getQualityType:function(v){return WHTStore.getNameById(WHTStore.QUALITY_TYPE,v);},

	
	    
		//费率方式
	    MODE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        [0,'票结'],[1,'月结']]}),
	    getMode : function(v){return WHTStore.getNameById(WHTStore.MODE_S, v);},
	    
	    //费率类别
	    RATE_TYPE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        [0,'自动计费'],[1,'一次计费']]}),
	    getRateType_S:function(v){return WHTStore.getNameById(WHTStore.RATE_TYPE_S, v);},
	    
	    //仓库类型
	    WAREHOUSE_TYPE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	        [0,'恒温'],[1,'冷冻']]}),
   	    getWarehouseType_S:function(v){return WHTStore.getNameById(WHTStore.WAREHOUSE_TYPE_S, v);},
   	    
   	    //来源类型
	   STORAGE_CLASS_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	        [0,'成品'],[1,'宣传品'],[2,'外加工'],[3,'进出口']]}),
   	    getStorageClass:function(v){return WHTStore.getNameById(WHTStore.STORAGE_CLASS_S, v);},
   	    
   	    //入库类别
   	 ACTION_GATEGORY:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
         [0,'移库'],[1,'出货'],[2,'入库'],[3,'换货'],[4,'退货'],[5,'盘点'],[6,'破损入库']]}),
         getActionGategory:function(v){return WHTStore.getNameById(WHTStore.ACTION_GATEGORY, v);},
         
         
     FROZEN_HOLD:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
         [0,'Hold_A质量问题'],[1,'Hold_B超货架期(上线)'],[2,'Hold_C破损'],[3,'Hold_D超货架期(下线)'],[4,'Hold_E报废品']]}),
         getHold:function(v){return WHTStore.getNameById(WHTStore.FROZEN_HOLD, v);},
     
   	    //体积单位
	    VOLUME_UNIT:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'立方米'],[1,'升'],[2,'分升'],[3,'厘升'],[4,'立方厘米'],[5,'立方毫米']]}),
	    getVolumeUnit:function(v){return WHTStore.getNameById(WHTStore.VOLUME_UNIT,v);},
	    
	  //面积单位
	    MOMENT_UNIT:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'平方千米(km²)'],[1,'公顷'],[2,'公亩'],[3,'平方米'],[4,'平方分米'],[5,'平方厘米'],[6,'平方毫米']]}),
	    getMomentUnit:function(v){return WHTStore.getNameById(WHTStore.MOMENT_UNIT,v);},
	    
	  //长度单位
	    LENGHT_UNIT:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'千米（km）'],[1,'米（m）'],[2,'分米（dm）'],[3,'厘米（cm）'],[4,'毫米（mm）']]}),
	    getLenght:function(v){return WHTStore.getNameById(WHTStore.LENGHT_UNIT,v);},
	        //重量单位
	    WEIGHT_UNIT:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'吨'],[1,'千克'],[2,'克'],[3,'毫克'],[4,'微克']]}),
	    getWeightUnit:function(v){return WHTStore.getNameById(WHTStore.WEIGHT_UNIT,v);},

	  //托盘类型
	    TRAY_TYPE:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'木盘1.1'],[1,'木盘1.2'],[2,'塑料1.1'],[3,'塑料1.2'],[4,'铁盘1.1'],[5,'铁盘1.2']]}),
	    getTrayType:function(v){return WHTStore.getNameById(WHTStore.TRAY_TYPE,v);},
	    
	    IN_REPORT_CONDITION:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	    [0,'接单日期'],[1,'收货日期']]}),
	    getInreportCondition:function(v){return WHTStore.getNameById(WHTStore.IN_REPORT_CONDITION,v);},
	    
	    OUT_REPORT_CONDITION:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'接单日期'],[1,'出货日期']]}),
	    getOutreportCondition:function(v){return WHTStore.getNameById(WHTStore.OUT_REPORT_CONDITION,v);},

	    REPORTS_SOURCE:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'入库明细报表'],[1,'进口明细报表'],[2,'外加工明细报表'],[3,'外加细报表汇总'],[4,'进口报表汇总'],[5,'移库报表汇总']]}),
        reportsSource:function(v){return WHTStore.getNameById(WHTStore.REPORTS_SOURCE,v);},
	    
        
        IN_UNIT_NAME:new Ext.data.ArrayStore({id:1,fields:['CODE','NAME'],data:[
        [1,'单品包装'],[2,'包装二'],[3,'包装三'],[4,'包装四'],[5,'包装五']]}),
        getInAndOutName:function(v){return WHTStore.getInUnitName(WHTStore.IN_UNIT_NAME,v);},
                                                                                
        TRANS_CARRIER:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'保事达'],[1,'嘉琼'],[2,'自提'],[3,'快递']]}),
        getTransCarrier:function(v){return WHTStore.getNameById(WHTStore.TRANS_CARRIER,v);},
        
	  //集装箱类型
	    TANK_TYPE:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,'20GP'],[1,'20HC'],[2,'40GP'],[3,'40HC'],[4,'20HT'],[5,'40HT']]}),
	    getTankType:function(v){return WHTStore.getNameById(WHTStore.TANK_TYPE,v);},
	    
	    //hazardous 
	    HAZARDOUS_CLASS:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	      [0,''],[1,'第1类 爆炸品'],[2,'第2类 压缩气体和液化气体'],[3,'第3类 易燃液体'],
	      [4,'第4类 易燃固体、自然物品和遇湿易燃物品'],[5,'第5类 氧化剂和有机过氧化物'],
	      [6,'第6类 毒害品和感染性物品'],[7,'第7类 放射性物品'],[8,'第8类 腐蚀品'],[9,'第9类 杂类']
	      ]}),
	    getHazardousClass:function(v){return WHTStore.getNameById(WHTStore.HAZARDOUS_CLASS,v);},
	    
	    //商口类别
	    getCATEGORY_S : function(){
   			if(Ext.StoreMgr.containsKey('CATEGORY_S')){
   				return Ext.StoreMgr.get('CATEGORY_S');
   			}
   			else {		
   				var store = HTStore.createStore('CATEGORY_S','CATEGORY_Q','WCargoCategory',WCargoCategory);
   				store.load();
   				return store;
   			}
   		},
   		
   		getWCargoCategory: function(){
   			return new Ext.data.Store({url:SERVICE_URL+'?_A=CATEGORY_Q&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WCargoCategory'}, WCargoCategory),
   			    remoteSort:true,sortInfo:{field:'id',direction:'desc'}
   			});
   		},
   		
   		//countryOfOrigin
   		getCountryOfOrigin :function(){
   			if(Ext.StoreMgr.containsKey('WSTORAGE_NOTE_S')){
   				return Ext.StoreMgr.get('WSTORAGE_NOTE_S');
   			}
   			else{
   				var store=HTStore.createStore('WSTORAGE_NOTE_S', 'WSTORAGE_NOTE_Q', 'WStorageNote', WStorageNote);
   				store.load();
   				return store;
   			}
   		},
   		
   		//comboBoxProperty
   		getLoadAddress : function(action){
   			return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WStorageNote'}, WStorageNote)});
   		},
   		getCargoType : function(action){
   			return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WCargoCategory'}, WCargoCategory)});
   		},
   		//包装信息
   		getPackage : function(action){
   			return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WPackage'}, WPackage),
   				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
   			
   		},
   		
   		//
   		getWAssets : function(action){
   			return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WAssets'}, WAssets)});
   		},
   		
   		//装货地址
   		getLoadingaddress :function(){
   			if(Ext.StoreMgr.containsKey('WSTORAGE_NOTE_CARGO_X')){
   				return Ext.StoreMgr.get('WSTORAGE_NOTE_CARGO_X');
   			}
   			else{
   				var store=HTStore.createStore('WSTORAGE_NOTE_CARGO_X', 'WSTORAGE_NOTE_CARGO_X', 'WStorageNoteCargo', WStorageNoteCargo);
   				store.load();
   				return store;
   			}
   				
   		},

   		
   	//商品信息
   		getWCargo : function(){   			
   			return new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WCargo'}, WCargo),
   				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
   			
   		},
   		
   		//warehouse
   		getWarehouse:function(){
   			if(Ext.StoreMgr.containsKey('WAREHOUSE_S')){
   				return Ext.StoreMgr.get('WAREHOUSE_S');
   			}
   			else{
   				var store=HTStore.createStore('WAREHOUSE_S', 'WAREHOUSE_Q', 'WWarehouse', WWarehouse);
   				store.load();
   				return store;
   			}
   		},
   		
   		//area
   		getArea:function(){
   			if(Ext.StoreMgr.containsKey('WArea_S')){
   				return Ext.StoreMgr.get('WArea_S');
   			}
   			else{
   				var store=HTStore.createStore('WArea_S', 'AREA_Q', 'WArea', WArea);
   				store.load();
   				return store;
   			}
   			
        },
        
        //block
        getBlock:function(){
        	return new Ext.data.Store({url:SERVICE_URL+'?_A=WBLOCK_SQ&_mt=xml',
   				reader:new Ext.data.XmlReader({record:'WBlock'}, WBlock),
   				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
        	
       
        	
        },

    	//库存信息
    	getInventory : function(){
    		return new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_G&_mt=xml&S=1',
    			reader:new Ext.data.XmlReader({record:'WStorageNoteCargo'}, WStorageNoteCargo),
    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    		
    	},
        //质检信息
        getQualityControl : function(){
    		return new Ext.data.Store({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_A&_mt=xml&S=1',
    			reader:new Ext.data.XmlReader({record:'WQualityControlItem'}, WQualityControlItem),
    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    		
    	},
    	//尺寸单位
    	getUNIT_L : function(){
    		if(Ext.StoreMgr.containsKey('UNIT_L')){
    			return Ext.StoreMgr.get('UNIT_L');
    		}
    		else{
	    		
	    		var store=new Ext.data.Store({storeId:'UNIT_L',url:SERVICE_URL+'?_A=UNIT_Q&_mt=xml',baseParams:{unitClassId:'0'},
	    			reader:new Ext.data.XmlReader({record:'GUnit'}, GUnit),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    		}
    	},
    	
    	//件数单位
    	getUNIT_P : function(){
    		if(Ext.StoreMgr.containsKey('UNIT_P')){
    			return Ext.StoreMgr.get('UNIT_P');
    		}
    		else{
    			var store=new Ext.data.Store({storeId:'UNIT_P',url:SERVICE_URL+'?_A=UNIT_Q&_mt=xml',baseParams:{unitClassId:'1'},
	    			reader:new Ext.data.XmlReader({record:'GUnit'}, GUnit),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    		}
    	},
    	//重量单位
    	getUNIT_W : function(){
    		if(Ext.StoreMgr.containsKey('UNIT_W')){
    			return Ext.StoreMgr.get('UNIT_W');
    		}
    		else{
    			var store=new Ext.data.Store({storeId:'UNIT_W',url:SERVICE_URL+'?_A=UNIT_Q&_mt=xml',baseParams:{unitClassId:'2'},
	    			reader:new Ext.data.XmlReader({record:'GUnit'}, GUnit),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    		}
    	},
    	//体积单位
    	getUNIT_V : function(){
    		if(Ext.StoreMgr.containsKey('UNIT_V')){
    			return Ext.StoreMgr.get('UNIT_V');
    		}
    		else{
    			var store=new Ext.data.Store({storeId:'UNIT_V',url:SERVICE_URL+'?_A=UNIT_Q&_mt=xml',baseParams:{unitClassId:'3'},
	    			reader:new Ext.data.XmlReader({record:'GUnit'}, GUnit),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    		}
    	},
    	
    	//面积单位
    	getUNIT_M : function(){
    		if(Ext.StoreMgr.containsKey('UNIT_M')){
    			return Ext.StoreMgr.get('UNIT_M');
    		}
    		else{
    			var store=new Ext.data.Store({storeId:'UNIT_M',url:SERVICE_URL+'?_A=UNIT_Q&_mt=xml',baseParams:{unitClassId:'4'},
	    			reader:new Ext.data.XmlReader({record:'GUnit'}, GUnit),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    		}
    	},
    	
    	//GCharge仓储费用名称
    	getCHAR_S : function(p){
    		if(Ext.StoreMgr.containsKey('CHAR_S')){
    			return Ext.StoreMgr.get('CHAR_S');
    		}
    		else {
    			
    			var store=new Ext.data.Store({storeId:'CHAR_S',url:SERVICE_URL+'?_A=CHAR_Q&_mt=xml',baseParams:{wmsFlag:'1'},
	    			reader:new Ext.data.XmlReader({record:'GCharge'}, GCharge),
	    			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	    		store.load();
	    		return store;
    			return store;
    		}
    	}
};


//货物列表查询
var GOODSCARGO=function(f,e,t){
	if(e.getKey()!=e.ENTER){	
		var q=f.getRawValue();
		if(q.length>1){
			var a=[];
			a[0]=new QParam({key:'storageNoteNo',value:q,op:LI});
			if(t!='') 
				a[a.length]=new QParam({key:'status',value:t,op:EQ});
			
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_G&_mt=xml&S=1',method:'POST',
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				f.expand();
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
	}
};

var QualityControlList=function(f,e,t){
	if(e.getKey()!=e.ENTER){	
		var q=f.getRawValue();
		if(q.length>1){
			var a=[];
			a[0]=new QParam({key:'storageNoteNo',value:q,op:LI});
			if(t!='') 
				a[a.length]=new QParam({key:'status',value:t,op:EQ});
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_A&_mt=xml&S=1',method:'POST',
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				f.expand();
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
	}
};

var WCargoLC=function(f,e,t,s){
	if(e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN){	
		var q=f.getRawValue();
		if(q.length>=2 ){
			var a=[];
			a[0]=new QParam({key:'skuNo',value:q,op:LI});
			if(t!='') {
				a[1]=new QParam({key:t,value:'1',op:EQ});
			}
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:s==1?{_A:'WCARGO_X',_mt:'XML',S:1}:{_A:'WCARGO_X'},
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				if(!f.isExpanded()){
						f.expand();
					}
	   				
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if((q.length==0||q.lenght<=1) && f.isExpanded()){
			
			f.store.removeAll();
			f.collapse();
		}
	}
};
//f:控件，e:t:1表示空库位，0表示所有库位，r:库区,w:仓库
var WBlockLC=function(f,e,t,s,r,w){
	if(e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN){	
		var q=f.getRawValue();
		if(q.length>1){
			var a=[];
			a[0]=new QParam({key:'blockName',value:q,op:LI});
			if(t!='') {
				a[1]=new QParam({key:'all',value:t,op:EQ});
			}
			if(r!=''&&r!=undefined){
				a[a.length]=new QParam({key:'areaId',value:r,op:EQ});
			}
			if(w!=''&&w!=undefined){
				a[a.length]=new QParam({key:'warehouseId',value:w,op:EQ});
			}
			
			
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'WBLOCK_SQ'},
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				if(!f.isExpanded()){
						f.expand();
					}
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if((q.length==0||q.lenght<=1) && f.isExpanded()){
			
			f.store.removeAll();
			f.collapse();
		}
	}
};

var CostInFlagToString=function(v){
	if(!Ext.isEmpty(v)){
		if(v=='0')
			return '收入';
		if(v=='1')
			return '支出';
	}
	else return '未知';
};

var ExpeType=function(v){
	if(v=='R')
		return '收入';
	else
		return '支出';
};
