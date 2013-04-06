var GUID=0;
var GGUID=function(k){if(!k) GUID=GUID-1;return GUID;};
var CUSER=loadSession('USER_ID');
var CCUST=loadSession('CUST_ID');

var COMP_CODE='JAH';
var SYS= 'FOS2008网上服务系统';
var M_NO_DATA_SELECTED='请先选择一条记录!';

var C_BC='业务类型';
var C_BT='运输方式';
var C_ST='装运方式';

var C_ADD='新增';
var C_REMOVE='删除';
var C_EDIT='编辑';
var C_SAVE='保存';
var C_REFRESH='刷新';
var C_CONFIRM='确认';
var C_CANCEL_CONFIRM='取消确认';
var C_OK='确定';
var C_CANCEL='取消';
var C_SEARCH='查询';
var C_RESET='重置';
var C_EXPORT='输出';
var C_STATUS='状态';
var C_POD='卸货港';
var C_POL='装货港';
var C_CONS_NO='业务号';
var C_WS_USR_NAME='用户名';
var C_WS_USR_PASS='密码';
var C_WS_EMAIL='电子邮件';
var C_WS_COMPANY='公司名称';
var C_WS_TEL='联系电话';
var C_WS_FAX='传真';
var C_WS_FIRST_NAME='姓名';
var C_WS_TITLE='职位';
var C_WS_DEPT='部门';
var C_WS_MOBILE='手机';
var C_WS_ADDRESS='地址';
var C_WS_CITY='城市';
var C_WS_PROVINCE='省';
var C_WS_ZIP='邮编';
var C_WS_URL='公司网址';

var C_SHIPPER='发货人';
var C_CONSIGNEE='收货人';
var C_NOTIFIER='通知人';
var C_MARKS='唛头';
var C_CARGO_DESC='货物描述';
var C_PACKAGES='件数';
var C_WS_WCON_ACCEPTED='已受理';
var C_WS_WCON_NOT_ACCEPTED='未受理';
var C_TRADE_CONTRACT_NO='贸易合同号';
var C_VESS='船名';
var C_VESS_NAME_CN='中文船名';
var C_VOYA='航次';
var C_VESS_VOYA='船名航次';
var C_CARRIER='船公司';
var C_CONT_NO='箱号';
var C_SAIL_DATE='开航日期';
var C_CONS_DATE='委托日期';
var C_ETD_V='预计开船日期';
var C_ETD_T='预计开船时间';
var C_ETA_V='预计到港日期';
var C_ETA_T='预计到港时间';
var C_BERTHING_DATE='实际到港日期';
var C_BERTHING_DATE_T='实际到港时间';
var C_SAIL_DATE_V='实际开船日期';
var C_SAIL_DATE_T='实际开船时间';
var C_LOAD_DATE_F='装船日期(从)';
var C_LOAD_DATE_T='装船日期(到)';
var C_VOYA_PORTS='挂港';
var C_HARBOUR='港区';
var C_SHLI='航线';
var C_BL_NO='提单号';
var C_TO='至';
var BIST_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['0','未对账'],['1','已对账'],['2','已作废']]});
getBIST = function(v){if(v>=0) return BIST_S.getById(v).get('NAME'); else return ''};
var C_BILL_NO='对账单号';
var C_BILL_OBJECT='对账单位';
var C_AMOUNT='金额';
var C_CURR='币种';
var C_BILL_DATE='制单日期';
var C_BILL_BY='制单人';
var C_REMARKS='备注';
var C_TASK_NAME='任务名称';
var C_TASK_ESTIMATED_DATE='预计完成日期';
var C_TASK_FINISHED_DATE='实际完成日期';
var C_FINISHED='已完成';
var C_SETTLE_OBJECT='结算单位';
var C_BILL_INFO='对账单信息';
var C_SUM_CNY='人民币合计';
var C_SUM_USD='美元合计';
var C_SUM_LOC='本位币合计';
var C_EXPE_LINE='费用明细';
var C_UNIT_PRICE='单价';
var C_UNIT='计量单位';
var C_QUANTITY='数量';
var C_UNIT_PRICE='单价';
var C_CHAR='费用名称';
var C_EX_RATE='汇率';
var C_EX_AMOUNT='折算金额';
var C_MBL_NO='M B/L No.';
var C_HBL_NO='H B/L No.';
var M_NOT_FOUND = '没有找到数据！';
var SR_TRAN='B';var SR_WARE='E';var SR_INSP='D';var SR_CUDE='C';
var DATEF='Y-m-d';
var C_LW=400;
var BF=500;var EQ=1;var LT=2;var LE=3;var GT=4;var GE=5;var NE=6;var LI=7;var IN=8;
var formatDate = function(v){return v ? v.dateFormat(DATEF) : '';};
formatDateTime = function(v){return v ? v.dateFormat('Y-m-d H:i') : '';};
QParam = Ext.data.Record.create(['key','op','value']);
WUser = Ext.data.Record.create(['id','wusrId','wusrName','wusrPassword','wusrFirstName','wusrLastName',
        'wusrTitle','wusrDept','wusrMobile','wusrEmail','wusrCompanyName','wusrAddress','wusrCity','wusrProvice',
        'wusrZip','wusrCountry','wusrTel','wusrFax','wusrUrl','wusrStatus','wusrLastLoginTime',
     	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	{name:'wusrLastLoginTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	'custId','compCode','version','rowAction']);
WInquiry = Ext.data.Record.create(['id','winqId','winqCargoDesc','winqCargoPackages','winqCargoGw','winqCargoMeasurement',
        'winqReceiptPlace','winqDeliveryPlace','winqPol','winqPolEn','winqPod','winqPodEn',
        'tranId','tranCode','pateId','pateName','winqBizType','winqRemarks',
     	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	{name:'modiryTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	'winqStatus','wusrId','wusrFirstName','wusrMobile','wusrCompanyName','wusrTel','compCode','version','rowAction']);
GTransTerm = Ext.data.Record.create(['id','tranId','tranCode','tranName','tranBulkFlag','tranContFlag','compCode','active','version','rowAction']);
GPaymentTerm = Ext.data.Record.create(['id','pateId','pateCode','pateName','compCode','active','version','rowAction']);
GPort = Ext.data.Record.create(['id','portId','portCode','portNameEn','portNameCn','counCode','portType','portCnty','portArea','compCode','active','version','rowAction']); 
GPackage = Ext.data.Record.create(['id','packId','packCode','packName','packName','compCode','active','version','rowAction']); 
WConsign = Ext.data.Record.create(['id','wconId','wconNo',
	'consId','consNo','consShipType','consBizClass','consBizType',
	'consRefNo','consContractNo',{name:'consDate',type:'date',dateFormat:DATEF},
	'custId','custName','consShipper','consConsignee','consNotifyParty','consNotifyParty2',	
	'consPol','consPolEn','consReceiptPlace','consPod','consPodEn',
	'consPot','consPotEn','consDeliveryPlace','consDestination','consTradeCountry','consPrecarriage',
	'vessId','vessName','vessNameCn','voyaId','voyaName',
	'consMblNo','consCargoDesc','consCargoMarks','consTotalPackages',
	{name:'consTotalGrossWeight',type:'float'},		
	{name:'consTotalMeasurement',type:'float'},	
	{name:'cargBigFlag',type:'boolean',convert:function(v){return v==1;}},	
	{name:'cargReeterFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'cargDanagerFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'consTransFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'consPartialFlag',type:'boolean',convert:function(v){return v==1;}},
	'tranId','tranCode','packId','packName','pateId','pateName','consContainerInfo',
	'consOriginalBlNum','consRemarks','consServiceRequired','consStatus',
	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'wusrId','compCode','version','rowAction']);
FConsign = Ext.data.Record.create(['id',
	'consId','consNo','consShipType','consBizClass','consBizType',
	'consRefNo','consContractNo',{name:'consDate',type:'date',dateFormat:DATEF},
	{name:'consSailDate',type:'date',dateFormat:DATEF},'consOperatorName',
	'custId','custName','consShipper','consConsignee','consNotifyParty','consNotifyParty2',	
	'consPol','consPolEn','consReceiptPlace','consPod','consPodEn',
	'consPot','consPotEn','consDeliveryPlace','consDestination','consTradeCountry','consPrecarriage',
	'vessId','vessName','vessNameCn','voyaId','voyaName',
	'consMblNo','consCargoDesc','consCargoMarks','consTotalPackages',
	{name:'consTotalGrossWeight',type:'float'},		
	{name:'consTotalMeasurement',type:'float'},
	'tranId','tranCode','packId','packName','pateId','pateName','consContainerInfo',
	'consOriginalBlNum','consRemarks','consServiceRequired','consStatus',
	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'compCode']);
FBl = Ext.data.Record.create(['id',
	'blId','blNo','blType','consId','consNo','consBizClass','consTradeContractNo','consChargeRemarks','consBizType','custId','custName',
	'blShipper','blConsignee','blNotifyParty','blNotifyParty2','blOverseaAgency',	
	'blPreCarriage','blCarrier','blCarrierName','blVessel','blVoyage','blPol','blPod','blPot',
	{name:'blLoadDate',type:'date',dateFormat:'Y-m-d H:i:s'},{name:'blEtd',type:'date',dateFormat:'Y-m-d H:i:s'},{name:'blEta',type:'date',dateFormat:'Y-m-d H:i:s'},
	'blReceiptPlace','blDeliveryPlace','blContainerNo',
	'blPackages','blCargoDesc','blGrossWeight','blNetWeight','blMeasurement','blTotalSay',
	'blMarks','packId','packName','unitId','unitName',
	{name:'cargGrossWeight',type:'float'},{name:'cargNetWeight',type:'float'},
    {name:'cargMeasurement',type:'float'},'cargPackages','blMBlId','blMBlNo',
	'blPaymentTerm','blPaidAt','blTransTerm','blShipType','blContainerInfo',
	'blOriginalNum','istyId','blIssueBy',{name:'blIssueDate',type:'date',dateFormat:DATEF},'blIssuePlace','blRemarks',
	{name:'blMergeFlag',type:'boolean',convert:function(v){return v==1;}},	
	{name:'blSplitFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'blMasterFlag',type:'boolean',convert:function(v){return v==1;}},
	'blStatus',	
	'createBy','modifyBy',{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'compCode','version','rowAction']);
FTask= Ext.data.Record.create(['id',
	'taskId','tatyId','tatyName','tatyDId','tatyDName','consId','consNo','consMasterId','consMasterNo','taskOwner','taskOwnerName',
	{name:'taskEstimatedDate',type:'date',dateFormat:DATEF},{name:'taskFinishedDate',type:'date',dateFormat:DATEF},
	'taskFinishedFlag','tatyBizType','tatyBizClass',
	'active','compCode','version','rowAction']);
SBill = Ext.data.Record.create(['id',
	'billId','billNo','custId','custName','custSname','billType',{name:'billDate',type:'date',dateFormat:DATEF},'currCode',{name:'billAmount',type:'float'},{name:'billAmountCny',type:'float'},{name:'billAmountUsd',type:'float'},'billVessel','billVoyage',
	'billBlNo',{name:'billSailDate',type:'date',dateFormat:DATEF},'billPol','billPod','billDeliveryPlace',
	'billRemarks','billIssuer',{name:'billIssueDate',type:'date',dateFormat:DATEF},
	'billConsNo','billCargoName','billCargoQwm','billContainersInfo','billStatus',
	'userId','grouId','createBy','modifyBy',{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'compCode','version','rowAction','attr1','attr2','attr3','attr4','attr5','attr6','attr7','attr8','attr9','attr10']);
SBillItem = Ext.data.Record.create(['id','biitId','billId',
	'expeId','custId','custName','charId','charName','custSname','unitId','unitName','currCode',
	'expeType','pateId',{name:'expeDate',type:'date',dateFormat:DATEF},
	{name:'expeUnitPrice',type:'float'},{name:'expeNum',type:'float'},
	{name:'expeTotalAmount',type:'float'},{name:'expeExRate',type:'float'},
	'expeStatus','expeRemarks','expeForwardFlag',
	'consNo','consMblNo','consHblNo','consVessel','consVoyage',
	'userId','grouId','createBy','modifyBy',{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'compCode','version','rowAction']);
WBlM=Ext.data.Record.create(['id','wblmId','blId','blNo','consId','consNo','custId','custName','wblmField','wblmValueOld','wblmValueNew','wblmReason','wblmStatus','wblmRejectReason','wblmReplyBy',
	{name:'replyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},'wusrId','compCode','version','rowAction']);

GVoyage = Ext.data.Record.create(
	['id','voyaId','voyaName','vessId','vessName','vessNameCn','voyaClass','voyaType',
	 'voyaCarrier','voyaCarrierName','voyaHarbourId','voyaHarbourName','voyaPorts','shliId','shliName','voyaCarrierLine',
	{name:'voyaQuantity',type:'float'},
	{name:'voyaShippedQuantity',type:'float'},
	{name:'voyaFactQuantity',type:'float'},
	{name:'voyaShipDateF',type:'date',dateFormat:DATEF},
	{name:'voyaShipDateT',type:'date',dateFormat:DATEF},
	{name:'voyaLoadDateF',type:'date',dateFormat:DATEF},
    {name:'voyaLoadDateT',type:'date',dateFormat:DATEF},
	{name:'voyaEtd',type:'date',dateFormat:DATEF},'voyaEtdT',
	{name:'voyaEta',type:'date',dateFormat:DATEF},'voyaEtaT',
	{name:'voyaBerthingDate',type:'date',dateFormat:DATEF},'voyaBerthingDateT',
	{name:'voyaSailDate',type:'date',dateFormat:DATEF},'voyaSailDateT',
	'voyaSailedFlag','voyaShipMapFlag',
	'voyaDispatcherId','voyaDispatcherName','voyaOperatorId','voyaOperatorName',
	'compCode','active','version','rowAction']);
GShippingLine = Ext.data.Record.create(['id','shliId','shliCode','shliName','shliNameEn','shliBulkFlag','shliContFlag','active','compCode','version','rowAction']);
var getElapsed=function(d){if(!d) return -1;return Math.abs((new Date()).getTime()-d.getTime());};
var numRender = function(v){v=parseFloat(v);v=v.toFixed(2);if(v=='NaN') v='0.00';return v;};

Ext.grid.CheckColumn = function(config){
	this.addEvents({click:true});
	Ext.grid.CheckColumn.superclass.constructor.call(this);
	Ext.apply(this,config,{
		init:function(grid){
			this.grid = grid;
			this.grid.on('render', function(){var view = this.grid.getView();view.mainBody.on('mousedown', this.onMouseDown,this);},this);
		},
		onMouseDown:function(e, t){
			if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex,record.data[this.dataIndex]==1?0:1);
			this.fireEvent('click', this, e, record);
		}},
		renderer:function(v, p, record){
			p.css += ' x-grid3-check-col-td';
			return '<div class="x-grid3-check-col'+(v==1?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
		}
	});
	if(!this.id){this.id = Ext.id();};
	this.renderer = this.renderer.createDelegate(this);
};
Ext.extend(Ext.grid.CheckColumn, Ext.util.Observable);
var S_BC=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['E','出口'],['I','进口']]});
var S_ST=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['FCL','整箱'],['LCL','拼箱'],['BULK','散货']]});
var S_BT=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['C','海运'],['A','空运']]});

var getWS_BC=function(v){if(v) return S_BC.getById(v).get('NAME'); else return ''};
var getWS_BT=function(v){if(v) return S_BT.getById(v).get('NAME'); else return ''};
var getWS_ST=function(v){if(v) return S_ST.getById(v).get('NAME'); else return ''};
var getWCON_ST=function(v){if(v==0) return C_WS_WCON_ACCEPTED; else return C_WS_WCON_NOT_ACCEPTED;};
function CHKCLM(t,d,w){return new Ext.grid.CheckColumn({header:t,dataIndex:d,width:w?w:55});};
var QTX=function(a){
	var x='';
	for(var i=0;i<a.length;i++)
	{
		x+='<fosQuery><key>'+a[i].get('key')+'</key>'+'<op>'+a[i].get('op')+'</op>'+'<value>'+a[i].get('value')+'</value></fosQuery>\n'
	}
	return x;
};
var QTJ=function(a){return {fosQuery:a};};
var portTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{portCode}</span>{portNameEn}</h3></div></tpl>');
function getPS(){return new Ext.data.Store({url: SERVICE_URL+'?A=PORT_X',reader: new Ext.data.JsonReader({root:'GPort'}, GPort),sortInfo:{field:'portNameEn',direction:'ASC'}});};
var tranStore=new Ext.data.Store({url:SERVICE_URL+'?A=TTER_Q',reader: new Ext.data.JsonReader({root:'GTransTerm'},GTransTerm),sortInfo:{field:'tranId',direction:'ASC'}});
tranStore.load();
var pateStore=new Ext.data.Store({url:SERVICE_URL+'?A=PATE_Q',reader: new Ext.data.JsonReader({root:'GPaymentTerm'},GPaymentTerm),sortInfo:{field:'pateId',direction:'ASC'}});
pateStore.load();

var packStore=new Ext.data.Store({url:SERVICE_URL+'?A=PACK_Q',reader: new Ext.data.JsonReader({root:'GPackage'},GPackage),sortInfo:{field:'packId',direction:'ASC'}});
packStore.load();

var LP=function(f,e){
	if(e.getKey()!=e.ENTER){	
		var q=f.getRawValue();
		if(q.length>1 && !f.isExpanded()){
			var a=[];var op=1;
			a[a.length]={key:'portNameEn',value:q+'%',op:LI};
			f.store.baseParams=a.length>0?{mt:'JSON',xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))}:{mt:'JSON'};
     		f.store.reload();f.expand();
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};


Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){tabs = tp;tabs.on('contextmenu', onContextMenu);};
    function onContextMenu(ts, item, e){
        if(!menu){
            menu = new Ext.menu.Menu([
            {id: tabs.id + '-close',text: 'Close Tab',handler : function(){tabs.remove(ctxItem);}},
            {id: tabs.id + '-close-others',text: 'Close Other Tabs',handler : function(){
            	tabs.items.each(function(item){if(item.closable && item != ctxItem){tabs.remove(item);}});}
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){disableOthers = false;return false;}
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};
var RTJ = function(r,rt){
	f=rt.prototype.fields;	
	if(r.get('rowAction') == ''||r.get('rowAction') == undefined) r.set('rowAction','M');
	v={};
	for(var i=0;i<f.length;i++){
		var item = f.items[i];
		var n = item.name;
		var ty = item.type;		
		if(n!=undefined && r.get(n)!=undefined && r.get(n)!==''){			
			if(ty=='date'){
				v[n]=r.get(n)?r.get(n).format('Y-m-d H:i:s'):'';
			}
			else if(ty=='boolean'){
				v[n]=r.get(n)?'1':'0';
			}
			else{
				v[n]=Ext.util.Format.htmlEncode(r.get(n));
			}
		}
	}
	return v;
};
var FOSJ=function(x){return {FosRequest:{data:x}}};

LoginWin = function(fn) {
	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',items:[
    	{fieldLabel:C_WS_USR_NAME,name:'wusrName',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_USR_PASS,name:'wusrPassword',xtype:'textfield',inputType:'password',anchor:'90%',enableKeyEvents:true,listeners:{scope:this,
				keydown:function(f,e){if(e.getKey()==Ext.EventManager.ENTER){alert(e.getKey());this.login();}}
	        	}}
    	]});    	
	this.login = function(){	
		var wusrName=frm.find('name','wusrName')[0].getValue();
		var wusrPassword=frm.find('name','wusrPassword')[0].getValue();	
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,params:{A:'WS_LOGIN',mt:'JSON',wusrName:wusrName,wusrPassword:wusrPassword},
			success: function(r){
				var user=Ext.util.JSON.decode(r.responseText);
				saveSession('USER_ID',user.WUser[0].wusrId);
				saveSession('CUST_ID',user.WUser[0].custId);
				CUSER=user.WUser[0].wusrId;
				CCUST=user.WUser[0].custId;
				alert('登录成功！');
				this.close();
				fn();
			},
			failure: function(r){
				var user=Ext.util.JSON.decode(r.responseText);alert(user.FosResponse.msg);frm.find('name','wusrName')[0].focus();}
		});
	};
	this.reg=function(){
		var w= new RegWin();
		w.show();
		this.close();
	};
    LoginWin.superclass.constructor.call(this, {title:'用户登录',modal:true,width:300,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"登录",scope:this,handler:this.login},{text:"注册新用户",scope:this,handler:this.reg},{text:"取消",scope:this,handler:this.close}]
        }); 
};

Ext.extend(LoginWin,Ext.Window);

RegWin = function() {
	var frm = new Ext.form.FormPanel({labelWidth:80,bodyStyle:'padding:5px',items:[
    	{fieldLabel:C_WS_USR_NAME,itemCls:'required',name:'wusrName',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_USR_PASS,itemCls:'required',name:'wusrPassword',xtype:'textfield',inputType:'password',anchor:'90%'},    	
    	{fieldLabel:C_WS_EMAIL,itemCls:'required',name:'wusrEmail',xtype:'textfield',vtype:'email',vtypeText:'邮件地址不合法！·',anchor:'90%'},
    	{fieldLabel:C_WS_COMPANY,itemCls:'required',name:'wusrCompanyName',xtype:'textfield',anchor:'90%'},    	
    	{fieldLabel:C_WS_TEL,itemCls:'required',name:'wusrTel',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_FAX,name:'wusrFax',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_FIRST_NAME,name:'wusrFirstName',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_TITLE,name:'wusrTitle',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_DEPT,name:'wusrDept',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_MOBILE,name:'wusrMobile',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_ADDRESS,name:'wusrAddress',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_CITY,name:'wusrCity',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_PROVINCE,name:'wusrProvince',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_ZIP,name:'wusrZip',xtype:'textfield',anchor:'90%'},
    	{fieldLabel:C_WS_URL,name:'wusrUrl',xtype:'textfield',anchor:'90%'}
    	]});
    	
	this.reg = function(){	
		var r=new WUser({});
		r.beginEdit();frm.getForm().updateRecord(r);r.set('compCode',COMP_CODE);r.set('rowAction','N');r.endEdit();
		if(!r.get('wusrName')){alert('用户名不能为空');frm.find('name','wusrName')[0].focus();return;}
		if(!r.get('wusrPassword')){alert('密码不能为空');frm.find('name','wusrPassword')[0].focus();return;}
		if(!r.get('wusrEmail')){alert('Email不能为空');frm.find('name','wusrEmail')[0].focus();return;}
		if(!r.get('wusrCompanyName')){alert('公司名称不能为空');frm.find('name','wusrCompanyName')[0].focus();return;}
		if(!r.get('wusrTel')){alert('联系电话不能为空');frm.find('name','wusrTel')[0].focus();return;}
		var rj=RTJ(r,WUser);
		var data=FOSJ({'WUser':rj});
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_REG',mt:'JSON'},
			success: function(r){
				var user=Ext.util.JSON.decode(r.responseText);
				saveSession('USER_ID',user.WUser[0].wusrId)
				CUSER=user.WUser[0].wusrId;
				alert('注册成功！');
			},
			failure: function(r){
				var user=Ext.util.JSON.decode(r.responseText);alert(user.FosResponse.msg);},
		jsonData:data});
	};	
    RegWin.superclass.constructor.call(this, {title:'用户注册',modal:true,width:400,
        height:470,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"注册",scope:this,handler:this.reg},{text:"取消",scope:this,handler:this.close}]
        }); 
};
Ext.extend(RegWin,Ext.Window);
InquiryWin = function(p) {
	var frm = new Ext.form.FormPanel({labelWidth:80,bodyStyle:'padding:5px',items:[    	
    	{fieldLabel:C_POL,itemCls:'required',name:'winqPolEn',value:p.get('winqPolEn'),store:getPS(),xtype:'combo',displayField:'portNameEn',valueField:'portNameEn',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
    		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
    		listeners:{scope:this,
    			blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('winqPol','');}},
            	select:function(c,r,i){p.set('winqPol',r.get('portId'));
            	this.find('name','winqReceiptPlace')[0].setValue(r.get('portNameEn'));},
             	keydown:{fn:LP,buffer:BF}}},
        {fieldLabel:'出发地',name:'winqReceiptPlace',value:p.get('winqReceiptPlace'),xtype:'textfield',anchor:'95%'},
        {fieldLabel:C_POD,itemCls:'required',name:'winqPodEn',value:p.get('winqPodEn'),store:getPS(),xtype:'combo',displayField:'portNameEn',valueField:'portNameEn',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
			listeners:{scope:this,
				blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('winqPod','');}},
	        	select:function(c,r,i){
	        		p.set('winqPod',r.get('portId'));
	            	this.find('name','winqDeliveryPlace')[0].setValue(r.get('portNameEn'));},
	         	keydown:{fn:LP,buffer:BF}}},
    	{fieldLabel:'目的地',name:'winqDeliveryPlace',value:p.get('winqDeliveryPlace'),xtype:'textfield',anchor:'95%'},    		
    	{fieldLabel:'运输条款',itemCls:'required',tabIndex:17,name:'tranId',value:p.get('tranId'),store:tranStore,xtype:'combo',displayField:'tranCode',valueField:'tranId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('tranId','');}},
    		select:function(c,r,i){p.set('tranCode',r.get('tranCode'));}}},    	
    	{fieldLabel:'货物描述',itemCls:'required',name:'winqCargoDesc',value:p.get('winqCargoDesc'),xtype:'textarea',height:100,anchor:'95%'},
    	{fieldLabel:'货物毛重',itemCls:'required',name:'winqCargoGw',value:p.get('winqCargoGw'),xtype:'textfield',anchor:'95%'},
    	{fieldLabel:'货物体积',name:'winqCargoMeasurement',value:p.get('winqCargoMeasurement'),xtype:'textfield',anchor:'95%'},
    	{fieldLabel:'备注',name:'winqRemarks',value:p.get('tranId'),xtype:'textarea',height:100,anchor:'95%'}
    	]});
    	
	this.save = function(){			
		p.beginEdit();frm.getForm().updateRecord(p);p.endEdit();
		if(!p.get('winqPolEn')){alert('装货港不能为空');frm.find('name','winqPolEn')[0].focus();return;}
		if(!p.get('winqPodEn')){alert('卸货港不能为空');frm.find('name','winqPodEn')[0].focus();return;}
		if(!p.get('tranId')){alert('运输条款不能为空');frm.find('name','tranId')[0].focus();return;}
		if(!p.get('winqCargoDesc')){alert('货物描述不能为空');frm.find('name','winqCargoDesc')[0].focus();return;}
		if(!p.get('winqCargoGw')){alert('货物毛重不能为空');frm.find('name','winqCargoGw')[0].focus();return;}
		
		var rj=RTJ(p,WInquiry);
		var data=FOSJ({'WInquiry':rj});
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WINQ_S',mt:'JSON'},
			success: function(r){
				var res=Ext.util.JSON.decode(r.responseText);
				var inq=res.WInquiry[0];
				p.set('version',inq.version);
				p.set('winqId',inq.prshId);
				alert('操作成功！');
			},
			failure: function(r){
				var res=Ext.util.JSON.decode(r.responseText);alert(res.FosResponse.msg);},
		jsonData:data});
	};	
    InquiryWin.superclass.constructor.call(this, {title:'网上询价',modal:true,width:500,
        height:470,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"保存",scope:this,handler:this.save},{text:"取消",scope:this,handler:this.close}]
        }); 
};
Ext.extend(InquiryWin,Ext.Window);

var T_MAIN = new Ext.TabPanel({id:'T_MAIN',region:'center',margins:'0 5 5 0',layoutOnTabChange:true,plugins:new Ext.ux.TabCloseMenu(),enableTabScroll:true,activeTab:0});

InquiryGrid = function() {	
    var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_WINQ_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WInquiry'}, WInquiry),remoteSort:true,
    	sortInfo:{field:'winqId', direction:'DESC'}});
    store.load({params:{start:0,limit:20}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),sm,
		{header:'询价时间',dataIndex:'createTime',width:80,renderer:formatDateTime},
		{header:'状态',dataIndex:'winqStatus',width:100},
		{header:'装货港',dataIndex:'winqPolEn',width: 80},
		{header:'卸货港',dataIndex:'winqPodEn',width:100},
		{header:'交货地',dataIndex:'winqDeliveryPlace',width:80},
		{header:'收货地',dataIndex:'winqReceiptPlace',width:100},
		{header:'运输条款',dataIndex:'tranCode',width:100},
		{header:'运费条款',dataIndex:'pateName',width:100},
		{header:'业务类型',dataIndex:'winqBizType',width:100},
		{header:'货物毛重',dataIndex:'winqCargoGw',width:100},
		{header:'货物体积',dataIndex:'winqCargoMeasurement',width:100}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){this.edit();}};   
    this.add = function(){
    	var p = new WInquiry({winqId:0,winqPolEn:'',winqPodEn:'',winqDeliveryPlace:'',winqReceiptPlace:'',tranCode:'',pateName:'',
		winqBizType:1,winqCargoGw:'',winqCargoMeasurement:'',compCode:COMP_CODE,wusrId:CUSER,rowAction:'N'});
       	var win = new InquiryWin(p);    	
		win.show();
    };
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){var win = new InquiryWin(p);win.show();}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	this.remove=function(){
		if (sm.getSelections().length > 0)
        	XMG.confirm(SYS,M_R_C,function(btn){
            	if(btn == 'yes') {
            	var json=SMTJ4R(sm,'WInquiry','winqId');
        		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WINQ_S',mt:'JSON'},
					success: function(){sm.each(function(p){store.remove(p);});XMG.alert(SYS,M_S);},
					failure: function(r,o){XMG.alert(SYS,M_F+r.responseText);},
					jsonData:FOSJ(json)});
            	}
        	});
        else XMG.alert(SYS,M_R_P);
	};
	
	new Ext.KeyMap(Ext.getDoc(), {
		key:'nmrbf',ctrl:true,
		handler: function(k, e) {
		 	var tc = T_MAIN.getComponent('G_CUST');
		 	if(tc&&tc==T_MAIN.getActiveTab()){			 	
			 		switch(k) {
					case Ext.EventObject.N:
						if(!NR(M1_V+V_CUST+F_M)) this.add();break;
					case Ext.EventObject.R:
						if(!NR(M1_V+V_CUST+F_R)) this.remove();break;
					case Ext.EventObject.M:
						if(!NR(M1_V+V_CUST+F_V)) this.edit();break;
			 		}
		 	}
		},stopEvent:true,scope:this});
    InquiryGrid.superclass.constructor.call(this, {
    id:'G_WINQ',store: store,iconCls:'grid',width:600,height:300,title:'询价列表',header:false,closable:true,
    sm:sm,cm:cm,listeners:re,loadMask:true,
	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'}),
	tbar:[{text:C_ADD+'(N)',iconCls:'add',handler:this.add}, '-', 
		{text:C_EDIT+'(M)',iconCls:'option',handler:this.edit}, '-',
		{text:C_REMOVE+'(R)',iconCls:'remove',handler:this.remove},'->',
		new Ext.PagingToolbar({pageSize:20,store:store})]
    }); 
};
Ext.extend(InquiryGrid,Ext.grid.GridPanel);
WconGrid = function() {	
    var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_WCON_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WConsign'}, WConsign),remoteSort:true,
    	sortInfo:{field:'wconId', direction:'DESC'}});
    store.load({params:{start:0,limit:20}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),sm,
		{header:'订单号',dataIndex:'wconNo',width:80},
		{header:'委托日期',dataIndex:'consDate',width:80,renderer:formatDateTime},
		{header:'状态',dataIndex:'consStatus',width:100,renderer:getWCON_ST},
		{header:'装货港',dataIndex:'consPolEn',width: 80},
		{header:'卸货港',dataIndex:'consPodEn',width:100},
		{header:'交货地',dataIndex:'consDeliveryPlace',width:80},
		{header:'收货地',dataIndex:'consReceiptPlace',width:100},
		{header:'运输条款',dataIndex:'tranCode',width:100},
		{header:'运费条款',dataIndex:'pateName',width:100},
		{header:C_BT,dataIndex:'consBizType',width:100,renderer:getWS_BT},
		{header:C_BC,dataIndex:'consBizClass',width:100,renderer:getWS_BC},
		{header:C_ST,dataIndex:'consShipType',width:100,renderer:getWS_ST},
		{header:'货物毛重',dataIndex:'consTotalGrossWeight',width:100},
		{header:'货物体积',dataIndex:'consTotalMeasurement',width:100}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){this.edit();}};   
    this.add = function(){
    	var rid=GGUID();
    	var p = new WConsign({wconId:rid,wconNo:'N'+rid,consDate:new Date(),consBizClass:'E',consShipType:'FCL',consServiceRequired:'',
		consBizType:'C',compCode:COMP_CODE,wusrId:CUSER,rowAction:'N'});
       	var win = new WconWin(p,store);    	
		win.show();
    };
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){var win = new WconWin(p,store);win.show();}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	this.remove=function(){
		if (sm.getSelections().length > 0)
        	XMG.confirm(SYS,M_R_C,function(btn){
            	if(btn == 'yes') {
            	var json=SMTJ4R(sm,'WConsign','wconId');
        		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WCON_S',mt:'JSON'},
					success: function(){sm.each(function(p){store.remove(p);});XMG.alert(SYS,M_S);},
					failure: function(r,o){XMG.alert(SYS,M_F+r.responseText);},
					jsonData:FOSJ(json)});
            	}
        	});
        else XMG.alert(SYS,M_R_P);
	};	
    WconGrid.superclass.constructor.call(this, {
    id:'G_WCON',store: store,iconCls:'grid',width:600,height:300,title:'网上订舱列表',header:false,closable:true,
    sm:sm,cm:cm,listeners:re,loadMask:true,
	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'}),
	tbar:[{text:C_ADD+'(N)',iconCls:'add',handler:this.add}, '-', 
		{text:C_EDIT+'(M)',iconCls:'option',handler:this.edit}, '-',
		{text:C_REMOVE+'(R)',iconCls:'remove',handler:this.remove},'->',
		new Ext.PagingToolbar({pageSize:20,store:store})]
    }); 
};
Ext.extend(WconGrid,Ext.grid.GridPanel);

WconWin = function(p,store) {
	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',layout:'column',border:false,items:[
		{columnWidth:.6,layout:'form',border:false,defaultType:'textfield',items: [
			{fieldLabel:C_SHIPPER,itemCls:'required',name:'consShipper',value:p.get('consShipper'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_CONSIGNEE,itemCls:'required',name:'consConsignee',value:p.get('consConsignee'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_NOTIFIER,name:'consNotifyParty',value:p.get('consNotifyParty'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_MARKS,name:'consCargoMarks',value:p.get('consCargoMarks'),xtype:'textarea',height:100,anchor:'95%'},		
			{fieldLabel:C_CARGO_DESC,itemCls:'required',name:'consCargoDesc',value:p.get('consCargoDesc'),xtype:'textarea',height:100,anchor:'95%'}
		]},            
		{columnWidth:.4,layout:'form',border:false,items:[            
			{fieldLabel:C_BC,name:'consBizClass',value:p.get('consBizClass'),xtype:'combo',store:S_BC,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
			{fieldLabel:C_BT,name:'consBizType',value:p.get('consBizType'),xtype:'combo',store:S_BT,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
			{fieldLabel:C_ST,name:'consShipType',value:p.get('consShipType'),xtype:'combo',store:S_ST,displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
			{fieldLabel:C_POL,itemCls:'required',name:'consPolEn',value:p.get('consPolEn'),store:getPS(),xtype:'combo',displayField:'portNameEn',valueField:'portNameEn',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
				tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
					listeners:{scope:this,
					blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('consPol','');}},
					select:function(c,r,i){p.set('consPol',r.get('portId'));
					this.find('name','consReceiptPlace')[0].setValue(r.get('portNameEn'));},
				keydown:{fn:LP,buffer:BF}}},
			{fieldLabel:C_POD,itemCls:'required',name:'consPodEn',value:p.get('consPodEn'),store:getPS(),xtype:'combo',displayField:'portNameEn',valueField:'portNameEn',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
				tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
				listeners:{scope:this,
				blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('consPod','');}},
				select:function(c,r,i){
					p.set('consPod',r.get('portId'));
					this.find('name','consDeliveryPlace')[0].setValue(r.get('portNameEn'));},
				keydown:{fn:LP,buffer:BF}}},
			{fieldLabel:'出发地',name:'consReceiptPlace',value:p.get('consReceiptPlace'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:'目的地',name:'consDeliveryPlace',value:p.get('consDeliveryPlace'),xtype:'textfield',anchor:'95%'}, 
			{fieldLabel:'运输条款',itemCls:'required',tabIndex:17,name:'tranId',value:p.get('tranId'),store:tranStore,xtype:'combo',displayField:'tranCode',valueField:'tranId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('tranId','');}},
				select:function(c,r,i){p.set('tranCode',r.get('tranCode'));}}},			
			{fieldLabel:'运费条款',itemCls:'required',tabIndex:17,name:'pateId',value:p.get('pateId'),store:pateStore,xtype:'combo',displayField:'pateName',valueField:'pateId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){if(f.getRawValue()==''){f.clearValue();p.set('pateId','');}},
				select:function(c,r,i){p.set('pateName',r.get('pateName'));}}},    	
			{fieldLabel:C_PACKAGES,name:'consTotalPackages',value:p.get('consTotalPackages'),xtype:'numberfield',anchor:'95%'},
			{fieldLabel:'包装种类',name:'packId',value:p.get('packId'),xtype:'combo',store:packStore,displayField:'packName',valueField:'packId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,select:function(c,r,i){
				p.set('packName',r.get('packName'));
				}}},
			{fieldLabel:'货物毛重',itemCls:'required',name:'consTotalGrossWeight',value:p.get('consTotalGrossWeight'),xtype:'numberfield',anchor:'95%'},
			{fieldLabel:'货物体积',name:'consTotalMeasurement',value:p.get('ConsTotalMeasurement'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:'备注',name:'consRemarks',value:p.get('consRemarks'),xtype:'textarea',anchor:'95%'},
			{fieldLabel:'箱量(如：<br>20GP*3;<br>40GP*1)',name:'consContainerInfo',value:p.get('consContainerInfo'),xtype:'textarea',anchor:'95%'},
			{xtype: 'checkboxgroup',fieldLabel: '延伸服务',itemCls: 'x-check-group-alt',columns: 4,items: [
        		{boxLabel: '拖车', id: 'SR_TRAN',checked:p.get('consServiceRequired').indexOf(SR_TRAN)!=-1},
        		{boxLabel: '仓储', id: 'SR_WARE', checked:p.get('consServiceRequired').indexOf(SR_WARE)!=-1},
        		{boxLabel: '报关', id: 'SR_CUDE',checked:p.get('consServiceRequired').indexOf(SR_CUDE)!=-1},
        		{boxLabel: '报检', id: 'SR_INSP',checked:p.get('consServiceRequired').indexOf(SR_INSP)!=-1}
    			]}
		]}
      ]
     });
	this.save = function(){			
		var consServiceRequired = '';
  	 	if(Ext.getCmp('SR_TRAN')) consServiceRequired+=Ext.getCmp('SR_TRAN').getValue()?SR_TRAN:'';
  	 	if(Ext.getCmp('SR_WARE')) consServiceRequired+=Ext.getCmp('SR_WARE').getValue()?SR_WARE:'';
  	 	if(Ext.getCmp('SR_INSP')) consServiceRequired+=Ext.getCmp('SR_INSP').getValue()?SR_INSP:'';
  	 	if(Ext.getCmp('SR_CUDE')) consServiceRequired+=Ext.getCmp('SR_CUDE').getValue()?SR_CUDE:'';  	 	
  	 	p.set('consServiceRequired',consServiceRequired);		
		p.beginEdit();frm.getForm().updateRecord(p);p.endEdit();
		if(!p.get('consShipper')){alert(C_SHIPPER+'不能为空');frm.find('name','consShipper')[0].focus();return;}
		if(!p.get('consConsignee')){alert(C_CONSIGNEE+'不能为空');frm.find('name','consConsignee')[0].focus();return;}
		if(!p.get('consCargoDesc')){alert(C_CARGO_DESC+'不能为空');frm.find('name','consCargoDesc')[0].focus();return;}
		if(!p.get('consPolEn')){alert('装货港不能为空');frm.find('name','consPolEn')[0].focus();return;}
		if(!p.get('consPodEn')){alert('卸货港不能为空');frm.find('name','consPodEn')[0].focus();return;}
		if(!p.get('tranId')){alert('运输条款不能为空');frm.find('name','tranId')[0].focus();return;}
		if(!p.get('consCargoDesc')){alert('货物描述不能为空');frm.find('name','consCargoDesc')[0].focus();return;}
		if(!p.get('consTotalGrossWeight')){alert('货物毛重不能为空');frm.find('name','consTotalGrossWeight')[0].focus();return;}
	  	
		var rj=RTJ(p,WConsign);
		var data=FOSJ({'WConsign':rj});
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WCON_S',mt:'JSON'},
			success: function(r){
				var res=Ext.util.JSON.decode(r.responseText);
				var o=res.WConsign[0];
				p.set('version',o.version);
				p.set('wconId',o.wconId);
				p.set('wconNo',o.wconNo);
				var ra=p.get('rowAction');
				p.set('rowAction','M');
				if(ra=='N') store.addSorted(p);
				alert('操作成功！');
			},
			failure: function(r){
				var res=Ext.util.JSON.decode(r.responseText);alert(res.FosResponse.msg);},
		jsonData:data});
	};	
    WconWin.superclass.constructor.call(this, {title:'网上订舱-'+p.get('wconNo'),modal:true,width:800,
        height:600,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"保存",scope:this,handler:this.save},{text:"取消",scope:this,handler:this.close}]
        }); 
};
Ext.extend(WconWin,Ext.Window);

Ext.extend(WconGrid,Ext.grid.GridPanel);

VoyaTab = function(){
	var shliStore=new Ext.data.Store({url:SERVICE_URL+'?A=SHLI_Q',reader: new Ext.data.JsonReader({root:'GShippingLine'},GShippingLine),sortInfo:{field:'shliId',direction:'ASC'}});
	shliStore.load();	
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_VOYA_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GVoyage'}, GVoyage),remoteSort:true,
    	sortInfo:{field:'voyaId', direction:'DESC'}});
    //store.load({params:{start:0,limit:20}});
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),
		{header:C_VESS,dataIndex:'vessName',width:120},
        {header:C_VESS_NAME_CN,dataIndex:'vessNameCn',width:80},
		{header:C_VOYA,dataIndex:'voyaName',width:80},
		{header:C_SHLI,dataIndex:'shliName',width:100},
		{header:C_HARBOUR,dataIndex: 'voyaHarbourName',width:100},
		{header:C_CARRIER,dataIndex: 'voyaCarrierName',width:100},
		{header:C_ETA_V,dataIndex:'voyaEta',width:90,renderer:formatDate},
		{header:C_ETA_T,dataIndex: 'voyaEtaT',width:90},
		{header:C_ETD_V,dataIndex:'voyaEtd',width:90,renderer:formatDate},
		{header:C_ETD_T,dataIndex: 'voyaEtdT',width:90},
		{header:C_BERTHING_DATE,dataIndex:'voyaBerthingDate',width:90,renderer:formatDate},
		{header:C_BERTHING_DATE_T,dataIndex: 'voyaBerthingDateT',width:90},		
		{header:C_SAIL_DATE_V,dataIndex:'voyaSailDate',width:90,renderer:formatDate},
		{header:C_SAIL_DATE_T,dataIndex: 'voyaSailDateT',width:90},		
        {header:C_LOAD_DATE_F,dataIndex: 'voyaLoadDateF',width:90,renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})},
        {header:C_LOAD_DATE_T,dataIndex: 'voyaLoadDateT',width:90,renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})},
		{header:C_VOYA_PORTS,dataIndex: 'voyaPorts',width:100}]);
	cm.defaultSortable=true;	
	var g=new Ext.grid.GridPanel({store: store,iconCls:'grid',height:350,header:false,closable:true,cm:cm,loadMask:true,
    	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'})
    	});
    this.search=function(){
   		a=[];
    	var vessName=this.find('name','vessName')[0].getValue();
   		if(vessName) a[a.length]={key:'vessName',value:vessName,op:LI};
   		var voyaName=this.find('name','voyaName')[0].getValue();
   		if(voyaName) a[a.length]={key:'voyaName',value:voyaName,op:EQ};
   		var voyaCarrier=this.find('name','voyaCarrier')[0].getValue();        		
   		if(voyaCarrier) a[a.length]={key:'voyaCarrier',value:voyaCarrier,op:EQ};
   		var shliId=this.find('name','shliId')[0].getValue();        		
   		if(shliId) a[a.length]={key:'shliId',value:shliId,op:EQ};
   		var voyaEta=this.find('name','voyaEta')[0].getValue();
   		var voyaEta2=this.find('name','voyaEta2')[0].getValue();
   		if(voyaEta && voyaEta2){
   			a[a.length]={key:'voyaEta',value:voyaEta.format(DATEF),op:GE};
   			a[a.length]={key:'voyaEta',value:voyaEta2.format(DATEF),op:LE};
   		}
   		else if(voyaEta) a[a.length]={key:'voyaEta',value:voyaEta.format(DATEF),op:EQ};   		
     	var voyaBerthingDate=this.find('name','voyaBerthingDate')[0].getValue();
     	var voyaBerthingDate2=this.find('name','voyaBerthingDate2')[0].getValue();
     	if(voyaBerthingDate && voyaBerthingDate2){
   			a[a.length]={key:'voyaBerthingDate',value:voyaBerthingDate.format(DATEF),op:GE};
   			a[a.length]={key:'voyaBerthingDate',value:voyaBerthingDate2.format(DATEF),op:LE};
   		}
   		else if(voyaBerthingDate) a[a.length]={key:'voyaBerthingDate',value:voyaBerthingDate.format(DATEF),op:EQ};
     	
     	var voyaEtd=this.find('name','voyaEtd')[0].getValue();
     	var voyaEtd2=this.find('name','voyaEtd2')[0].getValue();
     	if(voyaEtd && voyaEtd2){
   			a[a.length]={key:'voyaEtd',value:voyaEtd.format(DATEF),op:GE};
   			a[a.length]={key:'voyaEtd',value:voyaEtd2.format(DATEF),op:LE};
   		}
   		else if(voyaEtd) a[a.length]={key:'voyaEtd',value:voyaEtd.format(DATEF),op:EQ};
   		
   		var voyaSailDate=this.find('name','voyaSailDate')[0].getValue();
   		var voyaSailDate2=this.find('name','voyaSailDate2')[0].getValue();
   		if(voyaSailDate && voyaSailDate2){
   			a[a.length]={key:'voyaSailDate',value:voyaSailDate.format(DATEF),op:GE};
   			a[a.length]={key:'voyaSailDate',value:voyaSailDate2.format(DATEF),op:LE};
   		}
   		else if(voyaSailDate) a[a.length]={key:'voyaSailDate',value:voyaSailDate.format(DATEF),op:EQ};   		
   		
   		store.baseParams={mt:'JSON',xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) alert(M_NOT_FOUND);}});
	};
	this.clear=function(){this.find('name','sf')[0].getForm().reset();};
	
	VoyaTab.superclass.constructor.call(this, {    
    id:'T_VOYA',title:'船期查询',iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    items:[{layout:'column',name:'sf',xtype:'form',title:'船期查询',layoutConfig:{columns:4},labelWidth:60,labelAlign:'right',frame:true,deferredRender:false,collapsible:true,collapsed:false,items:[	        	
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
					{fieldLabel:C_VESS,tabIndex:1,name:'vessName',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_ETA_V,tabIndex:3,name:'voyaEta',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_SAIL_DATE_V,tabIndex:3,name:'voyaSailDate',xtype:'datefield',format:DATEF,anchor:'95%'}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
    			    {fieldLabel:C_VOYA,tabIndex:2,name:'voyaName',xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaEta2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaSailDate2',xtype:'datefield',format:DATEF,anchor:'95%'}]},
	           {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	           		{fieldLabel:C_CARRIER,tabIndex:5,name:'voyaCarrier',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_ETD_V,tabIndex:3,name:'voyaEtd',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_BERTHING_DATE,tabIndex:3,name:'voyaBerthingDate',xtype:'datefield',format:DATEF,anchor:'95%'}]},
	            {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	            	{fieldLabel:C_SHLI,tabIndex:6,name:'shliId',store:shliStore,xtype:'combo',displayField:'shliName',valueField:'shliId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaEtd2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaBerthingDate2',xtype:'datefield',format:DATEF,anchor:'95%'}],
	            	buttons:[{text:C_SEARCH,scope:this,handler:this.search},{text:C_RESET,scope:this,handler:this.clear}]
	            	}
	    	]},
	{layout:'fit',deferredRender:false,items:[g]}]});
};
Ext.extend(VoyaTab, Ext.Panel);

TaskWin = function(consId) {
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_TASK_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FTask'}, FTask),remoteSort:true,
    	sortInfo:{field:'tatyOrder', direction:'DESC'}});
	store.load({params:{mt:'JSON',consId:consId},scope:this});
	var c1={header:C_TASK_NAME,width:200,dataIndex:"tatyName"};
	var c2={header:C_TASK_ESTIMATED_DATE,dataIndex: 'taskEstimatedDate',width:120,renderer:formatDate};
	var c3={header:C_TASK_FINISHED_DATE,dataIndex: 'taskFinishedDate',width:120,renderer:formatDate};
	var ff=CHKCLM(C_FINISHED,'taskFinishedFlag',60);
	var cm=new Ext.grid.ColumnModel([c1,c2,ff,c3]);
	cm.defaultSortable = true;
	cm.defaultWidth=100;		
	var gv=new Ext.grid.GridView({
		getRowClass: function(record, index) {			   
            if (record.get('taskFinishedFlag')) return 'green-font-row';
            else if (record.get('taskFinishedFlag')==0&&getElapsed(record.get('taskEstimatedDate'))>=0) return 'red-font-row';
            else return '';
        }});
	var grid=new Ext.grid.GridPanel({id:'G_TASK',border:true,height:400,autoScroll:true,plugins:[ff],
	    stripeRows:true,store:store,cm:cm, view:gv});	
		
	TaskWin.superclass.constructor.call(this,{iconCls:'task',title:'单票状态',modal:true,width:600,
       height:400,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:grid}); 
};
Ext.extend(TaskWin, Ext.Window);

ConsTab = function(){	
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_CONS_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FConsign'}, FConsign),remoteSort:true,
    	sortInfo:{field:'consId', direction:'DESC'}});
    //store.load({params:{start:0,limit:20}});
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([
    	sm,
    	{header:'单票号',dataIndex:'consNo',width:80},
		{header:'委托日期',dataIndex:'consDate',width:80,renderer:formatDateTime},
		{header:'装货港',dataIndex:'consPolEn',width: 80},
		{header:'卸货港',dataIndex:'consPodEn',width:100},
		{header:'交货地',dataIndex:'consDeliveryPlace',width:80},
		{header:'收货地',dataIndex:'consReceiptPlace',width:100},
		{header:'运输条款',dataIndex:'tranCode',width:100},
		{header:'运费条款',dataIndex:'pateName',width:100},
		{header:C_BT,dataIndex:'consBizType',width:100,renderer:getWS_BT},
		{header:C_BC,dataIndex:'consBizClass',width:100,renderer:getWS_BC},
		{header:C_ST,dataIndex:'consShipType',width:100,renderer:getWS_ST},
		{header:'货物毛重',dataIndex:'consTotalGrossWeight',width:100},
		{header:'货物体积',dataIndex:'consTotalMeasurement',width:100}]);
	cm.defaultSortable=true;
	
	var re={rowdblclick:function(g,r,e){
		var p = sm.getSelected();
    	if(p){var win = new TaskWin(p.get('consId'));win.show();}
    	else alert(M_NO_DATA_SELECTED);
	}};    
	var g=new Ext.grid.GridPanel({store: store,iconCls:'grid',height:345,header:false,closable:true,cm:cm,sm:sm,loadMask:true,
    	listeners:re,bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'})
    	});
    this.search=function(){
   		if(CCUST=='null') return;   		
   		a=[];
   		a[a.length]={key:'custId',value:CCUST,op:EQ};
    	var consNo=this.find('name','consNo')[0].getValue();
    	if(consNo) a[a.length]={key:'consNo',value:consNo,op:LI};
    	var contNo=this.find('name','contNo')[0].getValue();
    	if(contNo) a[a.length]={key:'contNo',value:contNo,op:LI};
    	var consMblNo=this.find('name','consMblNo')[0].getValue();
    	if(consMblNo) a[a.length]={key:'consMblNo',value:consMblNo,op:LI};
    	var consHblNo=this.find('name','consHblNo')[0].getValue();
    	if(consHblNo) a[a.length]={key:'consHblNo',value:consHblNo,op:LI};
    	var consTradeContractNo=this.find('name','consTradeContractNo')[0].getValue();
    	if(consTradeContractNo) a[a.length]={key:'consTradeContractNo',value:consTradeContractNo,op:LI};
    	var vessName=this.find('name','vessName')[0].getValue();
    	if(vessName) a[a.length]={key:'vessName',value:vessName,op:LI};
    	var voyaName=this.find('name','voyaName')[0].getValue();
    	if(voyaName) a[a.length]={key:'voyaName',value:voyaName,op:EQ};
    	var consPod=this.find('name','consPod')[0].getValue();
    	if(consPod) a[a.length]={key:'consPod',value:consPodEn,op:LI};
    	var consDate=this.find('name','consDate')[0].getValue();
   		var consDate2=this.find('name','consDate2')[0].getValue();
   		if(consDate && consDate2){
   			a[a.length]={key:'consDate',value:consDate.format(DATEF),op:5};
   			a[a.length]={key:'consDate',value:consDate2.format(DATEF),op:3};
   		}
   		else if(consDate) a[a.length]={key:'consDate',value:consDate,op:op};
   		var consEtd=this.find('name','consEtd')[0].getValue();
   		var consEtd2=this.find('name','consEtd2')[0].getValue();
   		if(consEtd && consEtd2){
   			a[a.length]={key:'consEtd',value:consEtd.format(DATEF),op:5};
   			a[a.length]={key:'consEtd',value:consEtd2.format(DATEF),op:3};
   		}
   		else if(consEtd) a[a.length]={key:'consEtd',value:consEtd,op:op};
   		store.baseParams={mt:'JSON',xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) alert(M_NOT_FOUND);}});
	};
	this.clear=function(){this.find('name','sf')[0].getForm().reset();};
	
	ConsTab.superclass.constructor.call(this, {    
    id:'T_CONS',title:'单票跟踪',iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    items:[{layout:'column',name:'sf',xtype:'form',title:'单票查询',layoutConfig:{columns:4},labelWidth:60,labelAlign:'right',frame:true,collapsible:true,collapsed:false,
    		listeners:{scope:this,
					collapse:function(p){g.setHeight(470);},
					expand:function(p){g.setHeight(345);}},
    		items:[	        	
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
					{fieldLabel:C_CONS_NO,name:'consNo',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_TRADE_CONTRACT_NO,name:'consTradeContractNo',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_SAIL_DATE,name:'consEtd',xtype:'datefield',format:DATEF,anchor:'95%'}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
    			    {fieldLabel:C_CONT_NO,name:'contNo',xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:C_VESS,name:'vessName',xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:C_TO,name:'consEtd2',xtype:'datefield',format:DATEF,anchor:'95%'}]},
	           {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	           		{fieldLabel:'M/BL No.',name:'consMblNo',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_VOYA,name:'voyaName',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'95%'}]},
	            {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	            	{fieldLabel:'H/BL No.',name:'consHblNo',xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:C_POD,name:'consPod',xtype:'textfield',anchor:'95%'},
	            	{fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'95%'}],
	            	buttons:[{text:C_SEARCH,scope:this,handler:this.search},{text:C_RESET,scope:this,handler:this.clear}]
	            	}
	    	]},
	{layout:'fit',deferredRender:false,items:[g]}]});
};
Ext.extend(ConsTab, Ext.Panel);

BLTab = function(){	
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_BL_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FBl'}, FBl),remoteSort:true,
    	sortInfo:{field:'blId', direction:'DESC'}});
    store.load({params:{custId:CCUST,start:0,limit:20}});
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm = new Ext.grid.ColumnModel([
    	sm,
    	{header:'单票号',dataIndex:'consNo',width:80},
    	{header:'合同号',dataIndex:'consTradeContractNo',width:80},
		{header:'提单号',dataIndex:'blNo',width:80},
		{header:'提单类型',dataIndex:'blType',width:80},		
		{header:'发货人',dataIndex:'blShipper',width: 80},
		{header:'收货人',dataIndex:'blConsignee',width:100},
		{header:'通知人',dataIndex:'blNotifyParty',width:80},	
		{header:'件数',dataIndex:'blPackages',width:100},
		{header:'毛重',dataIndex:'blGrossWeight',width:100},
		{header:'体积',dataIndex:'blMeasurement',width:100}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){
		var p = sm.getSelected();
    	if(p){
    		var w=T_MAIN.getComponent('T_BL'+p.get('blId'));
    		if(w) T_MAIN.setActiveTab(w);
    		else T_MAIN.setActiveTab(T_MAIN.add(new BLPanel(p)));
    	}
    	else alert(M_NO_DATA_SELECTED);
	}};  
	
	var g=new Ext.grid.GridPanel({store: store,iconCls:'grid',height:395,header:false,closable:true,cm:cm,sm:sm,loadMask:true,
    	listeners:re,bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'})
    	});
    this.search=function(){
   		if(CCUST=='null') return;   		
   		a=[];
   		a[a.length]={key:'custId',value:CCUST,op:EQ};
    	var consNo=this.find('name','consNo')[0].getValue();
    	if(consNo) a[a.length]={key:'consNo',value:consNo,op:LI};
    	var blNo=this.find('name','blNo')[0].getValue();
    	if(blNo) a[a.length]={key:'blNo',value:blNo,op:LI};    	
    	var consTradeContractNo=this.find('name','consTradeContractNo')[0].getValue();
    	if(consTradeContractNo) a[a.length]={key:'consTradeContractNo',value:consTradeContractNo,op:LI};
    	var vessName=this.find('name','vessName')[0].getValue();
    	if(vessName) a[a.length]={key:'vessName',value:vessName,op:LI};
    	var voyaName=this.find('name','voyaName')[0].getValue();
    	if(voyaName) a[a.length]={key:'voyaName',value:voyaName,op:EQ};
    	var blPol=this.find('name','blPol')[0].getValue();
    	if(blPol) a[a.length]={key:'blPol',value:blPol,op:LI};
    	var blPod=this.find('name','blPod')[0].getValue();
    	if(blPod) a[a.length]={key:'blPod',value:blPod,op:LI};
    	
   		store.baseParams={mt:'JSON',xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) alert(M_NOT_FOUND);}});
	};
	this.clear=function(){this.find('name','sf')[0].getForm().reset();};
	
	BLTab.superclass.constructor.call(this, {    
    id:'T_BL',title:'提单确认',iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    items:[{layout:'column',name:'sf',xtype:'form',title:'提单查询',layoutConfig:{columns:4},labelWidth:60,labelAlign:'right',frame:true,deferredRender:false,collapsible:true,collapsed:false,
    		listeners:{scope:this,
					collapse:function(p){g.setHeight(475);},
					expand:function(p){g.setHeight(395);}},
    		items:[	        	
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
					{fieldLabel:C_CONS_NO,name:'consNo',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_TRADE_CONTRACT_NO,name:'consTradeContractNo',xtype:'textfield',anchor:'95%'}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
    			    {fieldLabel:C_BL_NO,name:'blNo',xtype:'textfield',anchor:'95%'},
    			    {fieldLabel:C_POL,name:'blPol',xtype:'textfield',anchor:'95%'}
	            	]},
	           {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	     			{fieldLabel:C_VESS,name:'vessName',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_POD,name:'blPod',xtype:'textfield',anchor:'95%'}
	     			]},
	            {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
	            	{fieldLabel:C_VOYA,name:'voyaName',xtype:'textfield',anchor:'95%'}
	            	],
	            	buttons:[{text:C_SEARCH,scope:this,handler:this.search},{text:C_RESET,scope:this,handler:this.clear}]
	            	}
	    	]},
	{layout:'fit',deferredRender:false,items:[g]}]});
};
Ext.extend(BLTab, Ext.Panel);
BLPanel = function(p) {	
	var html='<table cellspacing="1" cellpadding="0" border="1" width="100%">';
		html+='<tr height="120" valign="top">';
    	html+='<td colspan="6"  width="60%"><b><font size="-1">SHIPPER</font></b><br><font color="#0000ff">'+p.get('blShipper')+'</font></td>';
		html+='<td colspan="4" width="40%"><b><font size="-1">B/L NUMBER</font></b><br><font color="#0000ff">'+p.get('blNo')+'</font></td>';
		html+='</tr>';
		html+='<tr height="120" valign="top">';
		html+='<td colspan="6"><b><font size="-1">CONSIGNEE</font></b><br><font color="#0000ff">'+p.get('blConsignee')+'</font></td> ';
		html+='<td colspan="4">&nbsp;</td>';
		html+='</tr>';
		html+='<tr height="120" valign="top">';
		html+='<td colspan="6"><b><font size="-1">NOTIFY PARTY</font></b><br><font color="#0000ff">'+p.get('blNotifyParty')+'</font></td>';
		html+='<td colspan="4">&nbsp;</td>';
		html+='</tr>';
		html+='<tr valign="top">';
		html+='<td colspan="4"><b><font size="-1">PLACE OF RECEIPT</font></b><br><font color="#0000ff">'+p.get('blReceiptPlace')+'</font></td>';
		html+='<td colspan="2"><b><font size="-1">PRE-CARRIAGE BY</font></b><br><font color="#0000ff">'+p.get('blPreCarriage')+'</font></td>';
		html+='<td colspan="4">&nbsp;</td>';
		html+='</tr>';
		html+='<tr valign="top">';
		html+='<td colspan="2"><b><font size="-1">OCEAN VESSEL</font></b><br><font color="#0000ff">'+p.get('blVessel')+'</font></td>';
		html+='<td colspan="2"><b><font size="-1">VOY NO.</font></b><br><font color="#0000ff">'+p.get('blVoyage')+'</font></td>';
		html+='<td colspan="2"><b><font size="-1">PORT OF LOADING</font></b><br><font color="#0000ff">'+p.get('blPol')+'</font></td>';
		html+='<td colspan="4"><b><font size="-1">NO.OF ORIGINAL B(s)/L</font></b><br><font color="#0000ff">'+p.get('blOriginalNum')+'</font></td>';
		html+='</tr>';
		html+='<tr valign="top">';
		html+='<td colspan="4"><b><font size="-1">PORT OF DISCHARGE</font></b><br><font color="#0000ff">'+p.get('blPod')+'</font></td>';
		html+='<td colspan="2"><b><font size="-1">PLACE OF DELVIERY</font></b><br><font color="#0000ff">'+p.get('blDeliveryPlace')+'</font></td>';
		html+='<td colspan="4">&nbsp;</td>';
		html+='</tr>';
		html+='</table>';
		html+='<table cellspacing="0" cellpadding="0" border="1" bordercolor="#C0C0C0" width="100%">';
		html+='<tr valign="top" height="220" >';
		html+='<td colspan="2"><b><font size="-1">MARKS AND NUMBERS CONTAINER NO.&SEAL NO.</font></b><br><font color="#0000ff">'+p.get('blMarks')+'</font></td>';
		html+='<td colspan="2"><b><font size="-1">NO. OF CONTAINERS OR PACKAGES</font></b><br><font color="#0000ff">'+p.get('blPackages')+'</font></td>';
		html+='<td colspan="4"><b><font size="-1">TYPE OR KIND OF CONTAINERS OR PACKAGES - DESCRIPTION OF GOODS</font></b><br>'+p.get('blCargoDesc')+'</font></td>';
		html+='<td><b><font size="-1">GROSS WEIGHT</font></b><br><font color="#0000ff">'+p.get('blGrossWeight')+'</font></td>';
		html+='<td><b><font size="-1">MEASUREMENT</font></b><br><font color="#0000ff">'+p.get('blMeasurement')+'</font></td>';
		html+='</tr>';
		html+='</table>';
	
	var frm = new Ext.Panel({bodyStyle:'padding:5px',layout:'column',autoScroll:true,border:false,items:[
		{columnWidth:.6,layout:'form',labelAlign:'top',border:false,items: [
			{fieldLabel:'SHIPPER',name:'SHIPPER',value:p.get('blShipper'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:'CONSIGNEE',name:'CONSIGNEE',value:p.get('blConsignee'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:'NOTIFY PARTY',name:'NOTIFY PARTY',value:p.get('blNotifyParty'),xtype:'textarea',height:100,anchor:'95%'}
		]},
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'B/L NUMBER',name:'blNo',value:p.get('blNo'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:'&nbsp;',name:'',value:'',xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:'xx',name:'',value:'',xtype:'textarea',height:100,anchor:'95%'}
		]},
		
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[
			{fieldLabel:'PLACE OF RECEIPT',name:'blReceiptPlace',value:p.get('blReceiptPlace'),xtype:'textfield',anchor:'95%'}
		]},		
		{columnWidth:.2,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'PRE-CARRIAGE BY',name:'blPreCarriage',value:p.get('blPreCarriage'),xtype:'textfield',anchor:'95%'}
		]},   
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'xx',name:'',value:'',xtype:'textfield',anchor:'95%'}
		]},
				
		{columnWidth:.2,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'OCEAN VESSEL',name:'blVessel',value:p.get('blVessel'),xtype:'textfield',anchor:'95%'}
		]},		
		{columnWidth:.2,layout:'form',border:false,labelAlign:'top',items:[            
			{fieldLabel:'VOY NO.',name:'blVoyage',value:p.get('blVoyage'),xtype:'textfield',anchor:'95%'}
		]},
		{columnWidth:.2,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'PORT OF LOADING',name:'blPol',value:p.get('blPol'),xtype:'textfield',anchor:'95%'}
		]},
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'NO.OF ORIGINAL B(s)/L',name:'blOriginalNum',value:'blOriginalNum',xtype:'textfield',anchor:'95%'}
		]},		
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'PORT OF DISCHARGE',name:'blPod',value:p.get('blPod'),xtype:'textfield',anchor:'95%'}
		]},   
		{columnWidth:.2,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'PLACE OF DELVIERY',name:'blDeliveryPlace',value:p.get('blDeliveryPlace'),xtype:'textfield',anchor:'95%'}
		]},
		{columnWidth:.4,layout:'form',labelAlign:'top',border:false,items:[            
			{fieldLabel:'xx',name:'',value:'',xtype:'textfield',anchor:'95%'}
		]},		
		{columnWidth:.2,layout:'form',labelAlign:'top',border:false,defaultType:'textfield',items: [
			{fieldLabel:'MARKS AND NUMBERS CONTAINER NO.&SEAL NO.',name:'blMarks',value:p.get('blMarks'),xtype:'textarea',height:100,anchor:'95%'}]},          
		{columnWidth:.15,layout:'form',labelAlign:'top',border:false,defaultType:'textfield',items: [
			{fieldLabel:'NO. OF CONTAINERS OR PACKAGES',name:'blPackages',value:p.get('blPackages'),xtype:'textarea',height:100,anchor:'95%'}]},          
		{columnWidth:.35,layout:'form',labelAlign:'top',border:false,defaultType:'textfield',items: [
			{fieldLabel:'TYPE OR KIND OF CONTAINERS OR PACKAGES - DESCRIPTION OF GOODS',name:'blCargoDesc',value:p.get('blCargoDesc'),xtype:'textarea',height:100,anchor:'95%'}]},          
		{columnWidth:.15,layout:'form',labelAlign:'top',border:false,defaultType:'textfield',items: [
			{fieldLabel:'GROSS WEIGHT',name:'blGrossWeight',value:p.get('blGrossWeight'),xtype:'textarea',height:100,anchor:'95%'}]},          
		{columnWidth:.15,layout:'form',labelAlign:'top',border:false,defaultType:'textfield',items: [
			{fieldLabel:'MEASUREMENT',name:'blMeasurement',value:p.get('blMeasurement'),xtype:'textarea',height:100,anchor:'95%'}]}
      ]
     });
	
	
	this.renew=function(){
    	if(p.get('blStatus')==1){
    	var b = new WBlM({wblmId:0,blId:p.get('blId'),blNo:p.get('blNo'),consId:p.get('consId'),consNo:p.get('consNo'),custId:p.get('custId'),custName:p.get('custName'),
    	wblmField:'',wblmValueOld:'',compCode:COMP_CODE,wusrId:CUSER,rowAction:'N'});
       	var win = new BLMWin(b,p);    	
		win.show();
		}
		else alert('改提单已确认，不能修改！请和操作员联系。');
	};
	this.record=function(){
		var win = new BLMGrid(p);win.show();    	
	};
    BLPanel.superclass.constructor.call(this, {id:'T_BL'+p.get('blId'),title:'提单'+p.get('blNo'),bodyStyle:'padding:5px',
    	autoScroll:true,closable:true,items:frm,
        tbar:[       	
        	{iconCls:'add',text:"提单确认",scope:this,handler:this.save},'-',
        	{iconCls:'add',text:"改单申请",scope:this,handler:this.renew},'-',
        	{iconCls:'add',text:"改单记录",scope:this,handler:this.record}]
        }); 
};
Ext.extend(BLPanel, Ext.Panel);

BLMGrid = function(p) {
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_WBLM_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WBlM'}, WBlM),remoteSort:true,
    	sortInfo:{field:'wblmId', direction:'DESC'}});
	store.load({params:{mt:'JSON',blId:p.get('blId')},scope:this});	
	var cm=new Ext.grid.ColumnModel([
		{header:'修改项',width:200,dataIndex:"wblmField"},
		{header:'原值',dataIndex: 'wblmValueOld',width:120},
		{header:'新值',dataIndex: 'wblmValueNew',width:120},
		{header:'状态',dataIndex: 'wblmStatus',width:120},
		{header:'申请时间',dataIndex: 'createTime',width:120,renderer:formatDate},
		{header:'回复时间',dataIndex: 'replyTime',width:120,renderer:formatDate}
	]);
	cm.defaultSortable = true;
	cm.defaultWidth=100;		
	var gv=new Ext.grid.GridView({
		getRowClass: function(record, index) {			   
            if (record.get('wblmStatus')==1) return 'green-font-row';
            else if (record.get('taskFinishedFlag')==2) return 'red-font-row';
            else return '';
        }});
   	
	var grid=new Ext.grid.GridPanel({border:true,height:400,autoScroll:true,
	    stripeRows:true,store:store,cm:cm, view:gv,
	   	tbar:[{text:C_ADD+'(N)',iconCls:'add',handler:this.add}, '-', 
		{text:C_EDIT+'(M)',iconCls:'option',handler:this.edit}, '-',
		{text:C_REMOVE+'(R)',iconCls:'remove',handler:this.remove},'-']
    }); 
		
	BLMGrid.superclass.constructor.call(this,{iconCls:'task',title:'改单申请',modal:true,width:800,
       height:400,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:grid}); 
};
Ext.extend(BLMGrid, Ext.Window);
BLMWin = function(b,p) {
	var S_FIELD=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[
		['blShipper','发货人'],['blConsignee','收货人'],['blNotifyParty','通知人'],
		['blReceiptPlace','收货地'],['blDeliveryPlace','目的地'],['blPreCarriage','前程运输'],
		['blReceiptPlace','收货地'],['blDeliveryPlace','目的地'],['blVessel','船名'],['blVoyage','航次'],
		['blPol','装货港'],['blPod','卸货港'],['blMarks','唛头'],['blPackages','件数包装'],
		['blCargoDesc','货物描述'],['blGrossWeight','毛重'],['blMeasurement','体积'],['blOriginalNum','正本提单分数']
		]});

	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',border:false,items:[
	{fieldLabel:'修改项',tabIndex:1,name:'wblmField',value:p.get('wblmField'),xtype:'combo',store:S_FIELD,displayField:'NAME',
		valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,select:function(c,r,i){this.find('name','wblmValueOld')[0].setValue(p.get(r.get('CODE')));}}},
	{fieldLabel:'原值',tabIndex:1,name:'wblmValueOld',value:p.get('wblmValueOld'),readOnly:true,xtype:'textarea',height:100,anchor:'95%'},
	{fieldLabel:'新值',tabIndex:1,name:'wblmValueNew',value:p.get('wblmValueNew'),xtype:'textarea',height:100,anchor:'95%'},
	{fieldLabel:'修改原因',tabIndex:1,name:'wblmReason',value:p.get('wblmReason'),xtype:'textarea',height:100,anchor:'95%'}
	]});
	this.save=function(){
		b.beginEdit();frm.getForm().updateRecord(b);b.endEdit();
		if(!b.get('wblmField')){alert('修改项不能为空');frm.find('name','wblmField')[0].focus();return;}
		if(!b.get('wblmValueNew')){alert('新值不能为空');frm.find('name','wblmValueNew')[0].focus();return;}
		var rj=RTJ(r,WBlM);
		var data=FOSJ({'WBlM':rj});
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WBLM_S',mt:'JSON'},
			success: function(res){
				var rec=Ext.util.JSON.decode(res.responseText);
				b.set('wblmId',rec.WBlM[0].wblmId);
				alert('注册成功！');
			},
			failure: function(r){
				var user=Ext.util.JSON.decode(r.responseText);alert(user.FosResponse.msg);},
		jsonData:data});
	};	
	BLMWin.superclass.constructor.call(this,{iconCls:'task',title:'提单修改'+p.get('blNo'),modal:true,width:600,
       height:420,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',
       items:frm,buttons:[
        	{text:"保存",scope:this,handler:this.save},
        	{text:"取消",scope:this,handler:this.close}]
        }); 
};
Ext.extend(BLMWin, Ext.Window);

BillTab = function(){	
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_BILL_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SBill'}, SBill),remoteSort:true,
    	sortInfo:{field:'billId', direction:'DESC'}});
    store.load({params:{custId:CCUST,start:0,limit:20}});
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm = new Ext.grid.ColumnModel([sm,
    	{header:C_STATUS,dataIndex:"billStatus",renderer:getBIST},
		{header:C_BILL_NO,width:100,dataIndex:"billNo"},
		{header:C_AMOUNT,align:'right',renderer:numRender,dataIndex:"billAmount"},	
		{header:C_CURR,width:40,dataIndex:"currCode"},
		{header:C_BILL_DATE,dataIndex:"billDate",renderer:formatDate},
		{header:C_REMARKS,dataIndex:"billRemarks"}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){
		var p = sm.getSelected();
    	if(p){var win = new BillWin(p);win.show();}
    	else alert(M_NO_DATA_SELECTED);
	}};	
	var g=new Ext.grid.GridPanel({store: store,iconCls:'grid',height:395,header:false,closable:true,sm:sm,cm:cm,loadMask:true,
    	listeners:re,bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'})
    	});
    this.search=function(){
   		if(CCUST=='null') return;   		
   		a=[];
   		a[a.length]={key:'custId',value:CCUST,op:EQ};
    	var billNo=this.find('name','billNo')[0].getValue();
    	if(billNo) a[a.length]={key:'billNo',value:billNo,op:LI};
    	var billStatus=this.find('name','billStatus')[0].getValue();
    	if(billStatus) a[a.length]={key:'billStatus',value:blNo,op:EQ};    	
    	
    	var billDate=this.find('name','billDate')[0].getValue();
   		var billDate2=this.find('name','billDate2')[0].getValue();
   		if(billDate && billDate2){
   			a[a.length]={key:'billDate',value:billDate.format(DATEF),op:5};
   			a[a.length]={key:'billDate',value:billDate2.format(DATEF),op:3};
   		}
   		else if(billDate) a[a.length]={key:'billDate',value:billDate,op:op};
   		
   		store.baseParams={mt:'JSON',xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) alert(M_NOT_FOUND);}});
	};
	this.clear=function(){this.find('name','sf')[0].getForm().reset();};
	
	BillTab.superclass.constructor.call(this, {    
    id:'T_BL',title:'网上对账',iconCls:'stats',deferredRender:false,closable:true,autoScroll:true,
    items:[
    	{layout:'column',name:'sf',xtype:'form',title:'对账单查询',layoutConfig:{columns:4},labelWidth:60,labelAlign:'right',frame:true,deferredRender:false,collapsible:true,collapsed:false,
    		listeners:{scope:this,
					collapse:function(p){g.setHeight(475);},
					expand:function(p){g.setHeight(395);}},
    		items:[	        	
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
					{fieldLabel:C_BILL_NO,name:'billNo',xtype:'textfield',anchor:'95%'},
	     			{fieldLabel:C_BILL_DATE,name:'billDate',xtype:'textfield',anchor:'95%'}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
    			    {fieldLabel:C_STATUS,name:'billStatus',xtype:'textfield',anchor:'95%'},
    			    {fieldLabel:C_TO,name:'billDate2',xtype:'textfield',anchor:'95%'}
	            	]}],
           	buttons:[
           		{text:C_SEARCH,scope:this,handler:this.search},
           		{text:C_RESET,scope:this,handler:this.clear}]
	      },
		{layout:'fit',deferredRender:false,items:[g]}
	]});
};
Ext.extend(BillTab, Ext.Panel);

BillWin = function(p) {
	var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WS_BIIT_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SBillItem'}, SBillItem),remoteSort:true,
    	sortInfo:{field:'biitId', direction:'DESC'}});
	store.load({params:{mt:'JSON',billId:p.get('billId')},scope:this});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel([sm,
		{header:C_SETTLE_OBJECT,width:80,dataIndex:'custSname'},
		{header:C_CHAR,width:80,dataIndex:'charName'},
		{header:C_UNIT,hidden:true,width:60,dataIndex:'unitName'},	
		{header:C_UNIT_PRICE,width:60,align:'right',renderer:numRender,dataIndex:'expeUnitPrice'},
		{header:C_QUANTITY,width:60,dataIndex:'expeNum'},
		{header:C_AMOUNT,hidden:true,width:60,align:'right',renderer:numRender,dataIndex:'expeTotalAmount'},
		{header:C_CURR,width:60,dataIndex:'currCode'},
		{header:C_EX_RATE,width:60,dataIndex:'expeExRate'},
		{header:C_EX_AMOUNT,width:60,align:'right',renderer:numRender,dataIndex:'biitAmount'},
		{header:C_CONS_NO,width:80,dataIndex:"consNo"},
		{header:C_VESS,width:80,dataIndex:"consVessel"},
		{header:C_VOYA,width:80,dataIndex:"consVoyage"},
		{header:C_MBL_NO,width:80,dataIndex:"consMblNo"},
		{header:C_HBL_NO,width:80,dataIndex:"consHblNo"},
		{header:C_REMARKS,width:120,dataIndex:'expeRemarks'}
		]);
	cm.defaultSortable = true;cm.defaultWidth=100;
	var grid = new Ext.grid.GridPanel({autoScroll:true,store:store,sm:sm,cm:cm,height:400});			
	BillWin.superclass.constructor.call(this,{iconCls:'task',title:'对账单'+p.get('billNo'),modal:true,width:800,
       height:400,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',
       items: [{region:'north',height:60,layout:'column',layoutConfig:{columns:4},frame:true,
    	items:[
    	{columnWidth:.25,layout:'form',border:false,labelWidth:60,
        	items:[
        	{fieldLabel:C_BILL_OBJECT,tabIndex:1,name:'custSname',value:p.get('custSname'),xtype:'textfield',anchor:'95%'},
            {fieldLabel:C_BILL_DATE,tabIndex:3,name:'billDate',value:p.get('billDate'),xtype:'datefield',format:DATEF,anchor:'95%'}]
             },
            {columnWidth:.25,layout:'form',border:false,labelWidth:60,
                items: [{fieldLabel:C_BILL_NO,tabIndex:4,name:'billNo',disabled:true,value:p.get('billNo'),xtype:'textfield',anchor:'95%'},                
                {fieldLabel:C_REMARKS,tabIndex:23,name:'billRemarks',value:p.get('billRemarks'),xtype:'textfield',anchor:'95%'}]
            },
            {columnWidth:.25,layout: 'form',border : false,labelWidth:60,
                items: [          
                {fieldLabel:C_SUM_USD,tabIndex:11,name:'billAmountUsd',value:p.get('billAmountUsd'),disabled:true,xtype:'textfield',anchor:'95%'},
                {fieldLabel:C_SUM_LOC,tabIndex:11,name:'billAmount',value:p.get('billAmount'),disabled:true,xtype:'textfield',anchor:'95%'}
                ]
            },
            {columnWidth:.25,layout: 'form',border : false,labelWidth:60,
                items: [{fieldLabel:C_SUM_CNY,tabIndex:11,name:'billAmountCny',value:p.get('billAmountCny'),disabled:true,xtype:'textfield',anchor:'95%'}           	
               ]
            }]
       	},
		{layout:'fit',region:'center',items:grid}
	]}); 
};
Ext.extend(BillWin, Ext.Window);

var logout=function(){	
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_LOGOUT'},
			success: function(r){				
				alert('您已退出本系统！');
				CUSER=0;
				T_MAIN.removeAll();
			},
			failure: function(r){}				
		});
	};
var checkLogin=function(fn){	
	if(CUSER!='null'&&CUSER!=0)	return 1;
	else{var w=new LoginWin(fn);w.show();return 0;}	
};
function CreateMenu(title,wid,f){
 	var fn=function(){T_MAIN.setActiveTab(T_MAIN.getComponent(wid)?T_MAIN.getComponent(wid):T_MAIN.add(f()));};
 	return {text:title,iconCls :'grid',scope:this,handler:function(){if(checkLogin(fn)==1) fn();}};
};
var menuPanel = new Ext.Panel({
	id:'MENU',title:'FOS2008网上服务',region:'west',split:true,collapsible: true,collapseMode:'mini',
	width:200,minWidth:150,maxSize: 400,bodyStyle:'padding: 10px; background-color: #f0f0f0',
	items:new Ext.menu.Menu({floating:false,items:['-',
		CreateMenu('船期查询','T_VOYA',function(){return new VoyaTab();}),'-',
		CreateMenu('网上询价','G_WINQ',function(){return new InquiryGrid();}),'-',
		CreateMenu('网上订舱','G_BOOK',function(){return new WconGrid();}),'-',
		CreateMenu('单票跟踪','T_CONS',function(){return new ConsTab();}),'-',
		CreateMenu('提单确认','T_BL',function(){return new BLTab();}),'-',
		CreateMenu('网上对账','T_BILL',function(){return new BillTab();}),'-',
		{text:'退出',iconCls :'grid',scope:this,handler:this.logout},'-'
		]})});
	
Ext.onReady(function(){	
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    var tBar=new Ext.BoxComponent({region:'north',el:'north',height:90});   
	var viewport = new Ext.Viewport({layout:'border',items:[tBar,menuPanel,T_MAIN]});
	T_MAIN.setActiveTab(T_MAIN.add(new Ext.Panel({title:new Date().format('Y-m-d')})));	
	setTimeout(function(){Ext.get('loading').remove();Ext.get('loading-mask').fadeOut({remove:true});},50);	
	viewport.doLayout();
});
