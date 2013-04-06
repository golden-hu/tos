
QParam = Ext.data.Record.create(['key','op','value']); 
CShipper = Ext.data.Record.create(['shipperName','shipperAddress','shipperContact',
   'shipperTel','shipperMobile','shipperProvince','shipperCity']);
//上传文件
CAttach = HTUtil.createRecord(['attachName','attachFileName','attachExtName','attachDesc',
                               'consId','consNo','consBizType']);
SBalance = HTUtil.createRecord(['custId','custName','custSname','currCode','balaAmount']);
//费用
SExpense = HTUtil.createRecord([
	'consId','consNo','consNoHandler','consMblNo','consHblNo','vessName','voyaName','consPolEn','consPodEn',
	{name:'consSailDate',type:'date',dateFormat:DATEF},
	{name:'consDate',type:'date',dateFormat:DATEF},
	'consBizClass','consBizType','consShipType',
	'consCustId','consCustName',
	'consSalesRepId','consSalesRepName','consOperatorId','consOperatorName','grouId','grouName',
	'shliCode',
	'chclId','chclCode','charId','charName','charNameEn',
	'unitName','currCode','custId','custName','custNameFlag','custSname',
	'expeType','pateCode',
	{name:'expeDate',type:'date',dateFormat:DATEF},	
	{name:'expeUnitPrice',type:'float'},
	{name:'expeNum',type:'float'},
	{name:'expeCommission',type:'float'},
	{name:'expeCommissionRate',type:'float'},
	{name:'expeTotalAmount',type:'float'},
	{name:'expeExRate',type:'float'},
	{name:'expeRcAmount',type:'float'},
	'expeInvoiceNo','expeTaxInvoiceNo',
	{name:'expeInvoiceDate',type:'date',dateFormat:DATEF},
	{name:'expeInvoiceAmount',type:'float'},
	'expeInvoiceStatus',
	{name:'expeWriteOffAmount',type:'float'},{name:'expeWriteOffRcAmount',type:'float'},
	{name:'expeWriteOffDate',type:'date',dateFormat:DATEF},	
	'expeStatus','expeWriteoffStatus','expeRemarks','expeForwardFlag',	
	'expeUpdateBy','expeUpdateTime','expeInvoiceBy','expeWriteOffBy','expeAllocationFlag','expeAllocatedFlag',
	'expeIdM','consIdM','consNoM','editable','objectType','objectId1','objectName1','objectId2','objectName2',
	'expeBillStatus','expeBillNo']);
//汇率
SExRate = HTUtil.createRecord([
	'exraBaseCurrency','exraExCurrency','exraStartDate','exraEndDate','exraRate','active','editable']);
SInterestRate = HTUtil.createRecord([
	'inraCurrency','inraStartDate','inraEndDate','inraRate','inraType','active','editable']);
//对账单
SBill = HTUtil.createRecord([
	'billNo','custId','custName','custSname','billType',
	{name:'billDate',type:'date',dateFormat:DATEF},'currCode',
	{name:'billAmount',type:'float'},
	{name:'billAmountCny',type:'float'},
	{name:'billAmountUsd',type:'float'},
	'billVessel','billVoyage','billBlNo',
	{name:'billSailDate',type:'date',dateFormat:DATEF},
	'billPol','billPod','billDeliveryPlace','billRemarks','billIssuer',
	{name:'billIssueDate',type:'date',dateFormat:DATEF},
	'billConsNo','billCargoName','billCargoQwm','billContainersInfo','billStatus'
	]);
SBillItem = HTUtil.createRecord(['billId',
	'expeId','custId','custName','charId','charName','custSname','unitId','unitName','currCode',
	'expeType','pateId',{name:'expeDate',type:'date',dateFormat:DATEF},
	{name:'expeUnitPrice',type:'float'},{name:'expeNum',type:'float'},
	{name:'expeTotalAmount',type:'float'},{name:'expeExRate',type:'float'},
	'expeStatus','expeRemarks','expeForwardFlag',
	'consNo','consNoHandler','consMblNo','consHblNo','consVessel','consVoyage']);
	
//发票
SInvoice = HTUtil.createRecord([
	'invoNo','invoTaxNo','custId','custName','custSname',
	'invoPaymentType','invoTitle','invoType','invoCheckNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	{name:'invoDueDate',type:'date',dateFormat:DATEF},
	'currCode',{name:'invoExRate',type:'float'},
	{name:'invoAmount',type:'float'},
	'invoAmountCapital','invoAmountCapitalEn',
	{name:'invoAmountWriteOff',type:'float'},
	'invoBank','invoAccount','invoBizClass','invoVessel','invoVoyage',	
	'invoBlNo',{name:'invoSailDate',type:'date',dateFormat:DATEF},
	'invoPol','invoPod','invoDeliveryPlace','invoOperator','invoContractNo',
	'invoRemarks','invoIssuer',{name:'invoIssueDate',type:'date',dateFormat:DATEF},	
	'invoChecker',{name:'invoCheckDate',type:'date',dateFormat:DATEF},
	'invoSigner',{name:'invoSignDate',type:'date',dateFormat:DATEF},
	'invoConsNo','invoCargoName',
	'invoCargoPackages','invoCargoGrossWeight','invoCargoMeasurement',
	'invoContainersInfo','invoEntrustNo','invoPrintTimes','invoStatus','invoWriteOffStatus',
	'invoPrFlag','invoWriteOffNo','invoWriteOffBy',
	{name:'invoWriteOffDate',type:'date',dateFormat:DATEF},
	'voucNo','invoDebitnoteFlag',
	'invoUploadFlag',{name:'invoUploadTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'consBizType']);
//发票明细
SInvoiceEntry = HTUtil.createRecord(['id',
	'invoId','charName','charNameEn','unitName','currCode',
	{name:'inenUnitPrice',type:'float'},{name:'inenNum',type:'float'},
	{name:'inenTotalAmount',type:'float'},{name:'inenExRate',type:'float'},
	{name:'expeCommission',type:'float'},{name:'expeCommissionRate',type:'float'},
	{name:'inenInvoiceAmount',type:'float'},'inenPaymentType',
	'expeId','consId','consNo','consNoHandler','consMblNo','consHblNo','consVessel','consVoyage',
	'consBizType']);
//费用明细
SInvoiceItem = HTUtil.createRecord(['invoId','invoNo','invoTaxNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	'expeId','expeType','consId','consNo','consNoHandler','consMblNo','consHblNo',
	'consVessel','consVoyage',
	{name:'consSailDate',type:'date',dateFormat:DATEF},
	'custId','custName','custSname','charName','charNameEn',
	'unitName','expeCurrCode',{name:'expeUnitPrice',type:'float'},{name:'expeNum',type:'float'},
	{name:'expeCommission',type:'float'},{name:'expeCommissionRate',type:'float'},
	{name:'expeTotalAmount',type:'float'},{name:'expeInvoiceAmount',type:'float'},
	{name:'expeExRate',type:'float'},'expeRemarks',
	{name:'initInvoiceAmountOri',type:'float'},
	{name:'initInvoiceAmount',type:'float'},
	{name:'initInvoiceAmountOriW',type:'float'},
	{name:'initInvoiceAmountW',type:'float'},
	'initCurrCode',
	{name:'initExRate',type:'float'},
	{name:'invoExRate',type:'float'},
	'voucNo','initWriteOffStatus','initWriteOffNo','initWriteOffBy',
	{name:'initWriteOffDate',type:'date',dateFormat:DATEF},
	'initCancelFlag','consBizType']);
//发票号码
SInvoiceNo = HTUtil.createRecord([
	'innoPrefix','innoStartNo','innoEndNo','innoNextNo','innoNumLen',
	{name:'innoStartDate',type:'date',dateFormat:DATEF},
	'active']);
//付款申请
SPr =  HTUtil.createRecord([
	'prNo','prType','custId','custName','custSname','custBank','custAccount',
	'prAmount','currCode','prExRate','prPayType','prPaymentType','prBank','prAccount',
	'prRemarks',
	'prFinApproveBy',{name:'prFinApproveDate',type:'date',dateFormat:DATEF},
	'prApproveBy',{name:'prApproveDate',type:'date',dateFormat:DATEF},	
	'prStatus',
	{name:'prDate',type:'date',dateFormat:DATEF},'prPrintFlag']);
//付款申请明细
SPrItem = HTUtil.createRecord([
	'prId','invoId','invoNo','invoTaxNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	{name:'invoDueDate',type:'date',dateFormat:DATEF},
	{name:'invoAmount',type:'float'},{name:'invoAmountWriteOff',type:'float'},
	{name:'prAmount',type:'float'},
	'invoBank','invoAccount','currCode',
	{name:'invoExRate',type:'float'},
	'custName','custSname',	
	'invoIssuer',{name:'invoIssueDate',type:'date',dateFormat:DATEF},
	'invoChecker',{name:'invoCheckDate',type:'date',dateFormat:DATEF}]);
//核销
SVoucher = HTUtil.createRecord([
	'voucNo','voucType','custId','custName','custSname','custBank','custAccount',
	'voucCheckNo','voucBank','voucAccount','voucAmount','voucWriteOffAmount',
	'voucCarryType','voucCarryAmount','voucFixAmount',
	{name:'voucDate',type:'date',dateFormat:DATEF},
	{name:'voucGlDate',type:'date',dateFormat:DATEF},
	'currCode','voucExRate','voucBankReciptNo',
	{name:'voucBankReciptDate',type:'date',dateFormat:DATEF},'voucPaymentType',
	'voucInvoiceNo','voucTaxInvoiceNo',
	{name:'voucInvoiceDate',type:'date',dateFormat:DATEF},
	'voucConsNo','voucVessel','voucVoyage','voucMblNo','voucHblNo',
	{name:'voucSailDate',type:'date',dateFormat:DATEF},
	'voucCheck',{name:'voucCheckDate',type:'date',dateFormat:DATEF},
	'voucStatus','voucWriteOffStatus','voucWriteOffNo','voucRemarks','voucUploadFlag',
	'consBizType']);
//核销明细
SVoucherItem = HTUtil.createRecord([
	'initId','invoId','invoNo','invoTaxNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	'expeId','expeType','consId','consNo','consNoHandler','consMblNo','consHblNo',
	'consVessel','consVoyage',
	{name:'consSailDate',type:'date',dateFormat:DATEF},
	'custId','custName','custSname','charName','unitName',
	'expeCurrCode',{name:'expeUnitPrice',type:'float'},
	{name:'expeExRate',type:'float'},
	{name:'expeNum',type:'float'},
	{name:'expeCommission',type:'float'},
	{name:'expeCommissionRate',type:'float'},
	{name:'expeTotalAmount',type:'float'},
	{name:'initInvoiceAmountOri',type:'float'},
	{name:'initInvoiceAmount',type:'float'},
	{name:'initInvoiceAmountOriW',type:'float'},
	{name:'initInvoiceAmountW',type:'float'},	
	'invoCurrCode',
	{name:'initExRate',type:'float'},
	{name:'invoExRate',type:'float'},
	'voitWriteOffNo',
	'voucId','voucNo',
	{name:'voucDate',type:'date',dateFormat:DATEF},	
	{name:'voitAmountOriW',type:'float'},
	{name:'voitAmountW',type:'float'},
	'initCurrCode',
	{name:'voitExRate',type:'float'},
	{name:'voucExRate',type:'float'},	
	{name:'voitAmountVoucW',type:'float'},
	'voitRemarks','voitCancelFlag',
	'consBizType']);
	
//登录日志
PActionLog = Ext.data.Record.create(['acloId','acloActName','acloActRemark','acloTable','acloTid',
	'acloTno','acloUserId','acloUserName','acloIp','compCode','createTime']);
	
//公司
PCompany = HTUtil.createRecord(['compMyCode','compNameCn','compNameEn','compAccount','compAddress','compBank'
                                ,'compContact','compEmail','compContMsn','compContQq','compTel','compFax','compLoginUser','compLoginPsw'
                                ,'compLicenseNumber','compServiceLeve','compActive'
                                ,{name:'compStartDate',type:'date',dateFormat:'Y-m-d'}
                                ,{name:'compEndDate',type:'date',dateFormat:'Y-m-d'}]);
                                
//公司账户
PCompanyBankAccount= HTUtil.createRecord(['cobaName','cobaBank','cobaAccount','currCode','active']);

//公司配置
PCompanyConfig = HTUtil.createRecord(['cocoName','cocoCode',
	'cocoValue','cocoValueType','cocoValueOptions','cocoGroup','cocoType','cocoDesc']);
	
//功能权限表
PFunction = Ext.data.Record.create(['funcCode','funcName','funcType','active']); 

//部门
PGroup = HTUtil.createRecord(['grouName','grouDesc','active']);

//部门用户
PGroupUser = HTUtil.createRecord(['grouId','userId']); 

//角色
PRole = HTUtil.createRecord(['roleName','roleDesc','active']); 

//角色权限
PRoleFunction = HTUtil.createRecord(['roleId','funcCode']); 

//任务类型
PTaskType = HTUtil.createRecord(['tatyName','tatyDId',
	'tatyDName','tatyOrder','tatyDesc','tatyDateType','tatyDateEstimated',
	'tatyAction','tatyClass','tatyProperty','tatyDefaultOwner',
	'consBizType','consBizClass','consShipType']); 
//模版
PTemplate = HTUtil.createRecord(['tempName','tempClass','tempType',
	'tetyId','tetyCode','tetyName','tempFileName','tempDesc','active']);
//模版类型
PTemplateType = HTUtil.createRecord(['tetyName','tetyCode','tetyDesc']);

PUser = HTUtil.createRecord(['userName','userLoginName','userPassword',
	'userTel','userMobile','userEmail','userMsn','userQq',
	'grouId','grouName','roleId','roleName','userSalesFlag','userOperatorFlag',
	'userAllViewFlag','userAllEditFlag',
	{name:'userPasswordModifyDate',type:'date',dateFormat:'Y-m-d'},'active',
	'siteId','siteName','userTypeFlag','custId','custNameCn']);
PUserExpePermission = HTUtil.createRecord(['userId','chclId','chclName','expeType',
	{name:'usepEditable',type:'boolean',convert:function(v){return v==1;}},
	{name:'usepViewAll',type:'boolean',convert:function(v){return v==1;}},
	{name:'usepEditAll',type:'boolean',convert:function(v){return v==1;}}]);
//用户角色
PUserRole = HTUtil.createRecord(['userId','roleId']);
//用户设置
PUserSetting = Ext.data.Record.create(['usseId','userId','usseName','usseValue','compCode']);

//货物跟踪类型
PEventType = HTUtil.createRecord(['typeName','bizType','active']);

//货物跟踪
PEvent = HTUtil.createRecord(['consignId','typeNameId','typeName','bizType',
    {name:'estimatedDate',type:'date',dateFormat:'Y-m-d H:i:s'},
    {name:'finishedDate',type:'date',dateFormat:'Y-m-d H:i:s'},
    'status']);

//短信通知
PSms = HTUtil.createRecord(['mobile','content','bizType','consId','consNo',
	  {name:'sendDate',type:'date',dateFormat:DATEF},
	  'status','consNoHandler']);
//客户
CCustomer = HTUtil.createRecord(['custCode','custClass',
    'custNameCn','custSnameCn','custNameEn','custSnameEn',
    'custZip','custTel','custTel2','custFax','custFax2','custEmail','custUrl',
	'custContact','custAddress','custAddress2','custAddress3',
	'custIndustry','custType','custInvoiceHeader','custRemarks','custBankCny','custAccountCny',
	'custBankUsd','custAccountUsd','custShipTo','custChargeTo',
	'custShipper',{name:'custCreditDay',type:'int'},'custCreditAmount',
	'cucaId','custCountry','custProvince','custCity',
	{name:'custArFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custApFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custCarrierFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custBookingAgencyFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custCfsFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custWarehouseFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custTrackFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custInspectionFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custCustomFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custInsuranceFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custContainerFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custOverseaAgencyFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custDoAgencyFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custBookerFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custShipperFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custConsigneeFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custNotifyFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custAirFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custExpressFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custOilFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'custFactoryFlag',type:'boolean',convert:function(v){return v==1;}},
	'custSalesId','custSalesName','custActive','attr1','attr2','attr3','attr4','attr8','attr9','attr10',
	{name:'marineFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'airFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'expressFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'customsFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'wmsFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'tmsFlag',type:'boolean',convert:function(v){return v==1;}}]);
	
CCustomerCategory = HTUtil.createRecord(['cucaName']);

CCustomerContact = HTUtil.createRecord([
    'custId','cucoName','cucoTitle','cucoAddress1','cucoAddress2','cucoTel',
	'cucoHomeTel','cucoMobile','cucoEmail','cucoGender','cucoMsn','cucoQq','cucoFax',
	'cucoZip',{name:'cucoBirthday',type:'date',dateFormat:'Y-m-d'},'cucoRemarks']);
CPriceLine = HTUtil.createRecord(['prshId','prliPodEn','prliPotEn',

	'prliCountryDName','prliCountryTName','prliPodHarbour',
	'caclName','pateName','tranName',
	'prliShipDate','prliDuration','prliRemarks']);
	
CPriceRecord = HTUtil.createRecord(['prshId','prliId','currCode','charId','charName',
	{name:'prreCommissionRate',type:'float'},
	{name:'prrePriceP20',type:'float'},{name:'prrePriceB20',type:'float'},{name:'prrePriceS20',type:'float'},
	{name:'prrePriceP40',type:'float'},{name:'prrePriceB40',type:'float'},{name:'prrePriceS40',type:'float'},
	{name:'prrePriceP40h',type:'float'},{name:'prrePriceB40h',type:'float'},{name:'prrePriceS40h',type:'float'},
	{name:'prrePricePCbm',type:'float'},{name:'prrePriceBCbm',type:'float'},{name:'prrePriceSCbm',type:'float'},
	{name:'prrePricePKgs',type:'float'},{name:'prrePriceBKgs',type:'float'},{name:'prrePriceSKgs',type:'float'},
	{name:'prrePricePTon',type:'float'},{name:'prrePriceBTon',type:'float'},{name:'prrePriceSTon',type:'float'},
	{name:'prrePricePB1',type:'float'},{name:'prrePriceBB1',type:'float'},{name:'prrePriceSB1',type:'float'},
	{name:'prrePricePB2',type:'float'},{name:'prrePriceBB2',type:'float'},{name:'prrePriceSB2',type:'float'},
	{name:'prrePricePB3',type:'float'},{name:'prrePriceBB3',type:'float'},{name:'prrePriceSB3',type:'float'},
	{name:'prrePricePB4',type:'float'},{name:'prrePriceBB4',type:'float'},{name:'prrePriceSB4',type:'float'},
	{name:'prrePricePB5',type:'float'},{name:'prrePriceBB5',type:'float'},{name:'prrePriceSB5',type:'float'},
	'prshVendorName','prshCarrierName','prshBizType','prshContractNo','prshPolEn','shliName',
	'vessName','voyaName','prshStartDate','prshEndDate','prshRemarks','prshStatus',
	'prliCountryDName','prliPodEn','prliPotEn','caclName','pateName','tranName','prliShipDate','prliDuration']);

CPriceSheet = HTUtil.createRecord(['prshVendorId','prshVendorName',
    'prshCarrier','prshCarrierName',
	'prshBizType','prshContractNo','prshPolEn','prshPolHarbour','shliName','vessName','voyaName',
	{name:'prshStartDate',type:'date',dateFormat:DATEF},
	{name:'prshEndDate',type:'date',dateFormat:DATEF},'prshRemarks','prshStatus']);

GCargoClass = HTUtil.createRecord(['caclCode','caclNameCn','caclNameEn','premiumRate','active']);

GCargoType = HTUtil.createRecord(['caclId','catyCode','catyNameCn','catyNameEn',
	'catyDanagerFlag','catyDanagerNo','catyDanagerProperty','catyRemarks','active']);

GCharge = HTUtil.createRecord(['charCode','charName',
	'charNameEn','currCode','unitId','unitName','chclId','chclName','charCnyP',
	'charCnyR','charUsdP','charUsdR','active','chclCode',
	'attr1','attr2','attr3','attr4','attr5','attr6','attr7','attr8',
	{name:'tmsFlag',type:'boolean',convert:function(v){return v==1;}}]);
GChargeClass = HTUtil.createRecord(['chclCode','chclName','active']);
GContainerClass = HTUtil.createRecord(['coclCode','coclName','active']); 
GContainerType = HTUtil.createRecord(['cotyCode','cotyLength',
	'coclCode','cotyTeu','cotyIsoCode','cotyUnCode','cotyTareWeight']); 
GCountry = HTUtil.createRecord(['counId','counCode','counNameEn','counNameCn','active']);
GCurrency = HTUtil.createRecord(['currCode','currName','currSymbol','active']);
GDocumentType = HTUtil.createRecord(['dotyCode','dotyName','dotyClass',
	'dotyReturnFlag','dotyBackFlag','active']);
GExchangeSettlement = HTUtil.createRecord(['exseCode','exseName','active']);
GIssueType = HTUtil.createRecord(['istyCode','istyName','active']);
GLevyType = HTUtil.createRecord(['letyCode','letyName','active']);
GPackage = HTUtil.createRecord(['packCode','packName','active']); 
GPaymentTerm = HTUtil.createRecord(['pateCode','pateName','active']);
GPlace = HTUtil.createRecord(['placCode','placName','placNameEn',
	'placType','placDesc','counCode','placProvinceId','placProvinceName',
	'placCityName','custId','custName','custSname',
	'placAddress','placStation','active']);

GPort = HTUtil.createRecord(['portCode','portNameEn','portNameCn',
	'portType','counCode','active']); 

GSettlementWay = HTUtil.createRecord(['sewaCode','sewaName','active']);

GShippingLine = HTUtil.createRecord(['shliCode','shliName',
	'shliNameEn','shliBulkFlag','shliContFlag','active']);
GTradeTerm = HTUtil.createRecord(['trteCode','trteName','active']);
GTradeType = HTUtil.createRecord(['trtyCode','trtyName','active']);
GTransTerm = HTUtil.createRecord(['tranCode','tranName','tranBulkFlag','tranContFlag','tranAirFlag','active']);
GTransType = HTUtil.createRecord(['tratCode','tratName','active']);
GUnit = HTUtil.createRecord(['unitCode','unitName','active']);
GUsage = HTUtil.createRecord(['usagCode','usagName','active']);

//车辆类型
GVehicleType = HTUtil.createRecord(['vehtName','active']);

//船次
GVessel = HTUtil.createRecord(['vessNameEn','vessNameCn','vessCode',
	'vessLiner','vessDesc','counCode','vessType','active']);

//航班
GVoyage = HTUtil.createRecord(
	['voyaName','vessId','vessName','vessNameCn',
	 'voyaCarrier','voyaCarrierName','voyaHarbourName','voyaPorts',
	 'shliName','voyaCarrierLine',	
	{name:'voyaEtd',type:'date',dateFormat:DATEF},'voyaEtdT',
	{name:'voyaEta',type:'date',dateFormat:DATEF},'voyaEtaT',
	{name:'voyaBerthingDate',type:'date',dateFormat:DATEF},'voyaBerthingDateT',
	{name:'voyaSailDate',type:'date',dateFormat:DATEF},'voyaSailDateT',
	{name:'voyaShipMapFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'voyaSailedFlag',type:'boolean',convert:function(v){return v==1;}},
	'voyaDispatcherId','voyaDispatcherName','voyaOperatorId','voyaOperatorName','active']);

//输出历史
TExportHistory=Ext.data.Record.create(['exhiId','exhiType','exhiCheckDateF','exhiCheckDateT','exhiFileName','createTime']);

//投诉
CComplaint = HTUtil.createRecord([
	'custId','custName','consNo','complaintTypeId','complaintType','businessType','reason','solution',
	'status','damagedNum','lossNum','lossAmount','compensationAmount','custCompAmount',
	{name:'complaintDate',type:'date',dateFormat:DATEF}]);

//投诉类型
CComplaintType = HTUtil.createRecord([
   'complaintName']);

//部门
GSite = HTUtil.createRecord(['siteName','siteTel','siteFax','siteAddress',
                             'siteContact','siteType','provinceId','provinceName','cityId','cityName']);

var getGStore=function(c,r,o,s,d,id){
	if(Ext.StoreMgr.containsKey(c+'_S')){return Ext.StoreMgr.get(c+'_S');}
	else {
		var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:c+'_Q',_mt:'json'},
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:r,id:'id'},o),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
		
		store.load({params:{active:'1'}});
		return store;
	}
};

var HTStore = {
		getNameById : function(store,v){
			if(Ext.isEmpty(v))
				return '';
			else{
				return store.getById(v).get('NAME');
			}
		},
	
	//费用提交状态
	SUBMIT_STATUS : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	                ['0','未提交'],['1','已提交']]}),
    //费用核销状态
    WRITE_OFF_STATUS : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
                    ['0','未核销'],['1','已核销']]}),
    //单票添加颜色标记
	COLOR_STATUS:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	                ['0','取消'],['1','红色-紧急'],['2','橙色'],['3','黄色'],['4','绿色-已交单'],['5','蓝色-异常']]}),
	//BIll type 付费类型
	BILL_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['0',C_EXPR_SHIPPER_BILL],['1',C_EXPR_CONSIGNEE_BILL]]}),
	getBILL : function(v){return HTStore.getNameById(HTStore.BILL_S,v);},
		
	vehicleStatusStore : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
		[0,'正常'],[1,'修理'],[2,'停用']]}),
	vehicleStatusRender : function(v){
		if(v>=0) return HTStore.vehicleStatusStore.getAt(v).get('N');},
	
	//issue type 签单类型
	ISTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         [1,C_ISTY_ORI],[2,C_ISTY_TEL],[3,C_ISTY_SEA],[4,C_ISTY_OTHER]]}),
	getISTY : function(v){return HTStore.getNameById(HTStore.ISTY_S, v);},
	
	//date type 日期类型
	DATY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['CONS_DATE',C_CONS_DATE],['CONS_ETA',C_ETA],
	         ['CONS_SAIL_DATE',C_SAIL_DATE],
	         ['BASE_TASK_D',C_BASE_TASK_FINISH_DATE]]}),
	getDATY : function(v){return HTStore.getNameById(HTStore.DATY_S, v);},
	
	//ship type 装载类型（装运方式）
	SHTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['FCL',C_FCL],['LCL',C_LCL],['BULK',C_BULK]]}),
	getSHTY : function(v){return HTStore.getNameById(HTStore.SHTY_S, v);},
	         
	//business type 业务类型
	BT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['M',C_MARINE],['A',C_AIR],['G',C_CUDE],['I',C_INSP],['T',C_TRAN],['W',C_WARE]]}),
	getBT : function(v){return HTStore.getNameById(HTStore.BT_S, v);},
	
	//business class 业务性质
	BC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['E',C_EXP],['I',C_IMP],['D',C_DOM]]}),
	getBC : function(v){return HTStore.getNameById(HTStore.BC_S, v);},
	
	//place type 地点类型
	PLTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['1','省份/直辖市'],['2','城市/市区'],['3',C_HARBOUR]]}),
	getPLTY : function(v){return HTStore.getNameById(HTStore.PLTY_S, v);},
	
	//单票来源类型
	SOUR_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['0',C_SELE_CANVASSING],['1',C_PARTNER_CANVASSING],
	         ['2',C_ASSIGNED_CANVASSING]]}),
	         
   //行业
	INDU_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['1',C_CHEMICAL],['2',C_TEXTILE],['3',C_BUILDING],['4',C_AUTOMOBILE],
 	         ['5',C_ELECTRONIC],['6',C_HUSBANDRY],['7',C_LIGHT],
 	         ['8',C_MEDICAL],['9',C_MACHINERY],['10',C_MINING],
 	         ['11',C_FOOD],['12',C_RETAIL],['13',C_LOGISTIC],
 	         ['14',C_TRANSPORT],['15',C_OTHER]]}),         
	getINDU : function(v){return HTStore.getNameById(HTStore.INDU_S, v);},
	
	//公司性质
	COPR_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['0',C_STATE_OWNED],['1',C_COOPERATIVE],['2',C_JOINT_VENTURE],
 	         ['3',C_FOREIGN_VENTURE],['4',C_COLLECTIVE_OWNSHIP],
 	         ['5',C_PRIVATE_OWNSHIP],['6',C_INDIVIDUAL_BUSINESS],['7',C_OTHER]]}),         
	getCOPR : function(v){return HTStore.getNameById(HTStore.COPR_S, v);},
	//性别
 	GEND_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['M',C_MALE],['F',C_FEMALE]]}),         
	getGEND : function(v){return HTStore.getNameById(HTStore.GEND_S, v);},
	//签收类型
	ITTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['0',C_FACE_TO_FACE],['1',C_EXPRESS_DELIVERY],['2',C_MAIL]]}),         
	getITTY : function(v){return HTStore.getNameById(HTStore.ITTY_S, v);},
	
	//作业类型
	TROT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['0',C_DRAW_CONT],['1',C_SHIP_FACTORY],['2',C_INSP_CARGO],['3',C_TRANS_CUSTOM]]}),         
	getTROT : function(v){return HTStore.getNameById(HTStore.TROT_S, v);},
	
	//陆运-操作业要求
	T_OPERATE_S : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
 	         ['0','平板车派送'],['1','箱车派送'],['2','指定__日派送']]}),
	getT_OPERATE_S : function(v){return HTStore.getNameById(HTStore.T_OPERATE_S, v);},
	
	//陆运-服务方式
	T_SERVICE_S : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
 	         ['0','仓到站'],['1','仓到仓'],['2','站到仓'],['3','站到站']]}),
	getT_SERVICE_S : function(v){return HTStore.getNameById(HTStore.T_SERVICE_S, v);},
	
	//陆运-返单方式，返单确认
	T_FEEDBACK_S : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
 	         ['0','无'],['1','普通返单'],['2','电子返单']]}),
	getT_FEEDBACK_S : function(v){return HTStore.getNameById(HTStore.T_FEEDBACK_S, v);},
	
	//选择是或否
	T_BOOLEAN_S : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
 	         ['0','是'],['1','否']]}),
	getT_BOOLEAN_S : function(v){return HTStore.T_BOOLEAN_S(HTStore.T_FEEDBACK_S, v);},
	
	//运输类型
	TANT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['0',C_TRAILER],['1',C_TRUCK],['2',C_WATER_ROUTE],['3',C_RAILWAY]]}),         
	getTANT : function(v){return HTStore.getNameById(HTStore.TANT_S, v);},
	
	
	//客户投诉业务类型
  	CCTYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
  	    ['0',C_COM_SEA],['1',C_COM_LAND],['2',C_COM_AIR],['3',C_COM_EXPRESS]]}),
	getCTYPE : function(v){return HTStore.getNameById(HTStore.CCTYPE_S, v);},
	//模板文件类型
	TFTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['xls','xls']]}), 
 	         
	//单证颜色
	DC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['R',C_COLOR_RED],['G',C_COLOR_GREEN],['B',C_COLOR_BLUE],['W',C_COLOR_WHITE]]}),  
	        	       
	//换单类型
   	SWIT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	   	    ['0',C_NONE],['1',C_INSP_SWITHC],['2',C_FACT_SWITHC]]}),  
   	
   	//车辆运输状态
	TRST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_START],['1',C_STATUS_START],['2',C_STATUS_FINISHED]]}),  
	getTRST : function(v){return HTStore.getNameById(HTStore.TRST_S, v);},   	    
	//账单状态
	IVST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_AUDIT],['1',C_STATUS_AUDIT],['2',C_STATUS_CANCELED]]}),  
	getIVST : function(v){return HTStore.getNameById(HTStore.IVST_S, v);},
	
	//核销单状态
	VOST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_AUDIT],['1',C_STATUS_AUDIT],['2',C_STATUS_CANCELED]]}),  
	getVOST : function(v){return HTStore.getNameById(HTStore.VOST_S, v);},
		
	//付款申请单状态
	PRST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_COMMIT],['1',C_STATUS_COMMIT],['2',C_STATUS_AUDIT_FIN],
   	    	 ['3',C_STATUS_AUDIT_MANAGER],['4',C_STATUS_PAID],['5',C_STATUS_CANCELED]]}),  
	getPRST : function(v){return HTStore.getNameById(HTStore.PRST_S, v);},
	
	//托收单状态
	ERST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_COLLECTED],['1',C_STATUS_COLLECTED],
             ['2',C_STATUS_RECEIVED_BILL],['3',C_STATUS_ARRIVED_MONEY],
             ['4',C_STATUS_COLLECT_FAILED],['5',C_STATUS_CANCELED]]}),  
	getERST : function(v){return HTStore.getNameById(HTStore.ERST_S, v);},
	
	//审核状态
	AUST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0',C_STATUS_NOT_AUDIT],['1',C_STATUS_AUDIT_FIN],['2',C_STATUS_AUDIT_MANAGER]]}),  
	getAUST : function(v){return HTStore.getNameById(HTStore.AUST_S, v);},
	
	//审核状态
	BILL_STATUS_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0','未对账'],['1','已对账']]}),  
	getBillStatus : function(v){return HTStore.getNameById(HTStore.BILL_STATUS_S, v);},
	
	//审核状态
	WRST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0',C_STATUS_NOT_WRITEOFF],['1',C_STATUS_PART_WRITEOFF],['2',C_STATUS_WRITEOFF]]}),  
	getWRST : function(v){return HTStore.getNameById(HTStore.WRST_S, v);},
	
	//开票状态
	INST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STATUS_NOT_INVOICED],['1',C_STATUS_PART_INVOICED],['2',C_STATUS_INVOICED]]}),  
	getINST : function(v){return HTStore.getNameById(HTStore.INST_S, v);},
	
	//对账单状态
	BIST_S : new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0','未对账'],['1','已对账'],['2','已作废']]}),
	getBIST : function(v){return HTStore.getNameById(HTStore.BIST_S, v);},
	
	//费用确认状态
	EXPC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_STATUS_NOT_CONFIRMED],['1',C_STATUS_CONFIRMED]]}),  
	getEXPC : function(v){return HTStore.getNameById(HTStore.EXPC_S, v);},
	
	//财务导出类型
	EXHI_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_INVO_R],['1',C_INVO_P],['2',C_WRITEOFF_R],['3',C_WRITEOFF_P]]}),  
	getEXHI_T : function(v){return HTStore.getNameById(HTStore.EXHI_T_S, v);},
	
	//角色类型
	ROLE_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
		data:[['1',C_OPERATOR],['2',C_SALES],['3',C_DISPATCHER]]}),  
	getROLE_T : function(v){return HTStore.getNameById(HTStore.ROLE_T_S, v);},
	
	//客户类型
	CUST_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['1',C_BOOKER],['2',C_CHARTER],['3',C_BOOK_AGENCY],
   	 	['4',C_CARRIER],['5',C_CUSTOM_AGENCY],['6',C_TRACKER],['7',C_WAREHOUSE]]}),  
   	 getCUST_T : function(v){return HTStore.getNameById(HTStore.CUST_T_S, v);},
   	 
   //PRICE SHEET STATUS
   	PSST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	['0',C_STATUS_NOT_ACTIVE],['1',C_STATUS_ACTIVE],['2',C_STATUS_DEACTIVE]]}),  
	getPSST : function(v){return HTStore.getNameById(HTStore.PSST_S, v);},
	
	//费用类型
	EXTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	['R',C_AR],['P',C_AP]]}),  
	getEXTY : function(v){return HTStore.getNameById(HTStore.EXTY_S, v);},
    
  //计量类型
	CHARGE_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,'件数'],[1,'毛重'],[2,'净重'],[3,'体积']]}),  
    getCHARGE_TYPE : function(v){return HTStore.getNameById(HTStore.CHARGE_TYPE_S, v);},
    
  //内贸运费条款
	innerPaymentTermStore : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[1,'预付'],[2,'到付']]}),
	getInnerPaymentTerm: function(v){return HTStore.getNameById(HTStore.innerPaymentTermStore, v);},
    
	//信用期类型
	IRTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[1,C_TERM_3M],[2,C_TERM_6M],[3,C_TERM_1Y]]}),  
	getIRTY : function(v){return HTStore.getNameById(HTStore.IRTY_S, v);},
	
	//操作日志表类型
	ACLO_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	['FConsign',C_CONSIGN],['FBl',C_BL],['SExpense',C_EXPE],
    	 	['SInvoice',C_INVO],['SVoucher',C_T_VOUC],['SPr',C_T_PR]]}),  
	getACLO : function(v){return HTStore.getNameById(HTStore.ACLO_S, v);},
	
	//陆运 提货状态
	loadStatus : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
  		[0,'未提货'],[1,'已提货'],[2,'已发运'],[3,'已到达']]}),
  	loadStatusRender : function(v){
  		if(v==null||v=='') return  '';
  		else return HTStore.loadStatus.getAt(v).get('N');
  	},
  		
  	//陆运 委托归属
	consBelong : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
  		[0,'发货方'],[1,'收货方']]}),
  	consBelongRender : function(v){
  		if(v==null||v=='') return  '';
  		else return HTStore.consBelong.getAt(v).get('N');
  	}, 
  	//费用-结算归属
	custNameBelong : new Ext.data.ArrayStore({id:0,fields:['C','N'],
		data:[[1,'发货方'],[2,'收货方'],[3,'物流商']]}),
  	custNameBelongRender : function(v){
  		if(v==null||v=='') return  '';
  		else{
  			return HTStore.custNameBelong.getAt(v-1).get('N');
  		}
  	}, 
  	//付款方式-收货单位付款给‘第三方物流’方式
  	consigneePateName : new Ext.data.ArrayStore({id:0,fields:['C','N'],
  		data:[[0,'无'],[1,'到付'],[2,'月结']]}),
  	consigneePateNameRender:function(v){
  		if(v==null||v==''){
  			return  '';
  		}else {
  			return HTStore.consigneePateName.getAt(v).get('N');
  		}
  	},
  	  		
	YY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['2008','2008'+C_YEAR],['2009','2009'+C_YEAR],
	       ['2010','2010'+C_YEAR],['2011','2011'+C_YEAR],
	       ['2012','2012'+C_YEAR],['2013','2013'+C_YEAR],
	       ['2014','2014'+C_YEAR],['2015','2015'+C_YEAR]]}),  
	                                                        	
	MM_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['01',C_JAN],['02',C_FEB],['03',C_MAR],['04',C_APR],
	       ['05',C_MAY],['06',C_JUN],['07',C_JUL],['08',C_AUG],
	       ['09',C_SEP],['10',C_OCT],['11',C_NOV],['12',C_DEC]]}), 
	    
	createStore:function(storeId,actionCode,typeName,recordType,bp){
		 var store = new Ext.data.Store({storeId:storeId,url:SERVICE_URL,baseParams:Ext.isEmpty(bp)?{_A:actionCode,_mt:'json'}:bp,
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:typeName,id:'id'},recordType),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		 store.load();
		 return store;
	},
	//费用状态
	EXST_S:new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['0','未确认'],['1','已确认'],['2','已开票'],['3','已核销']]}),
	getEXST:function(v){if(v>=0) return EXST_S.getById(v).get('NAME'); else return '';},

	//Cargo Class 货物类型
	getCACL_S : function(){
		if(Ext.StoreMgr.containsKey('CACL_S')){
			return Ext.StoreMgr.get('CACL_S');
		}else {
			var store = this.createStore('CACL_S','CACL_Q','GCargoClass',GCargoClass);
			store.load({params:{active:1}});
			return store;
		}
	},
	
	getCACL : function(v){
		var _cs=this.getCACL_S();
		if(Ext.isEmpty(v))
			return '';
		else
			return _cs.getById(v)?_cs.getById(v).get('caclNameCn'):v; 
	},
	
	//WWareHouse
	getWWarehouse_S:function(){
		if(Ext.StoreMgr.containsKey('WAREHOUSE_S')){
			return Ext.StoreMgr.get('WAREHOUSE_S');
		}else {
			var store = this.createStore('WAREHOUSE_S','WAREHOUSE_Q','WWarehouse',WWarehouse);
			store.load({params:{active:1}});
			return store;
		}
	},
	//结算方式
	getSEWA_S:function(){
		if(Ext.StoreMgr.containsKey('SEWA_S')){
			return Ext.StoreMgr.get('SEWA_S');
		}else {
			var store = this.createStore('SEWA_S','SEWA_Q','GSettlementWay',GSettlementWay);
			store.load({params:{active:1}});
			return store;
		}
	},
	//结算方式渲染
	getSEWA : function(v){
		var _cs=HTStore.getSEWA_S();
		if(Ext.isEmpty(v)){
			return '';
		}else{
			return _cs.getById(v)?_cs.getById(v).get('sewaName'):v;
		}
	},
	
	//GTransTerm
	getTRAN_S : function(){
		if(Ext.StoreMgr.containsKey('TTER_S')){
			return Ext.StoreMgr.get('TTER_S');
		} else {	
			var store = this.createStore('TTER_S','TTER_Q','GTransTerm',GTransTerm);
			return store;
		}
	},

	//集装箱运输条款
	getTTC_S : function(){
		if(Ext.StoreMgr.containsKey('TTER_S')){
			return Ext.StoreMgr.get('TTER_S');
		}
		else {		
			var store = this.createStore('TTER_S','TTER_Q','GTransTerm',GTransTerm,{_A:'TTER_Q',_mt:'json',tranContFlag:1});
			return store;
		}
	},
	
	//运费条款
	getPATE_S : function(){
		if(Ext.StoreMgr.containsKey('PATE_S')){
			return Ext.StoreMgr.get('PATE_S');
		}
		else {
			var store = this.createStore('PATE_S','PATE_Q','GPaymentTerm',GPaymentTerm);
			return store;
		}
	},
	
	//GUnit单位
	getUNIT_S : function(){
		if(Ext.StoreMgr.containsKey('UNIT_S')){
			return Ext.StoreMgr.get('UNIT_S');
		}
		else {
			var store = this.createStore('UNIT_S','UNIT_Q','GUnit',GUnit);
			return store;
		}
	},
	
	//单位+箱型
	getUNIT_C : function(){
		if(Ext.StoreMgr.containsKey('UNIT_C_S')){
			return Ext.StoreMgr.get('UNIT_C_S');
		}
		else {
			var store = this.createStore('UNIT_C_S','UNIT_Q','GUnit',GUnit);
			return store;
		}
	},
	
	//GCurrency币种
	getCURR_S : function(){
		if(Ext.StoreMgr.containsKey('CURR_S')){
			return Ext.StoreMgr.get('CURR_S');
		} else {
			var store = this.createStore('CURR_S','CURR_Q','GCurrency',GCurrency);
			return store;
		}
	},
	
	//CCustomerCategory 客户种类
	getCUCA_S : function(){
		if(Ext.StoreMgr.containsKey('CUCA_S')){
			return Ext.StoreMgr.get('CUCA_S');
		} else {
			var store = this.createStore('CUCA_S','CUCA_Q','CCustomerCategory',CCustomerCategory);
			return store;
		}
	},
	
	//GContainerClass 集装箱
	getCOCL_S : function(){
		if(Ext.StoreMgr.containsKey('COCL_S')){
			return Ext.StoreMgr.get('COCL_S');
		} else {
			var store = this.createStore('COCL_S','COCL_Q','GContainerClass',GContainerClass);
			return store;
		}
	},
	
	//GContainerType
	getCOTY_S : function(){
		if(Ext.StoreMgr.containsKey('COTY_S')){
			return Ext.StoreMgr.get('COTY_S');
		} else {
			var store = this.createStore('COTY_S','COTY_Q','GContainerType',GContainerType);
			return store;
		}
	},
	
	//GShippingLine 船舶线
	getSHLI_S : function(){
		if(Ext.StoreMgr.containsKey('SHLI_S')){
			return Ext.StoreMgr.get('SHLI_S');
		}
		else {		
			var store = this.createStore('SHLI_S','SHLI_Q','GShippingLine',GShippingLine);
			return store;
		}
	},
	
	//GUsage
	getUSAG_S : function(){
		if(Ext.StoreMgr.containsKey('USAG_S')){
			return Ext.StoreMgr.get('USAG_S');
		}
		else {		
			var store = this.createStore('USAG_S','USAG_Q','GUsage',GUsage);
			return store;
		}
	},
	
	//GCountry 国家
	getCOUN_S : function(){
		if(Ext.StoreMgr.containsKey('COUN_S')){
			return Ext.StoreMgr.get('COUN_S');
		}
		else {
			var store = this.createStore('COUN_S','COUN_Q','GCountry',GCountry);
			return store;
		}
	},
	
	//港区
	getHARB_S : function(){
		if(Ext.StoreMgr.containsKey('HARBOUR_S')){
			return Ext.StoreMgr.get('HARBOUR_S');
		}
		else {
			var store = this.createStore('HARBOUR_S','PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'json',placType:3});
			return store;
		}
	},
	
	//express 快递
	getECITY_S : function(counCode){
		if(Ext.StoreMgr.containsKey('PLAC_S')){
			return Ext.StoreMgr.get('PLAC_S');
		}
		else {
			var store = this.createStore('PLAC_S','PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'json',placType:2,counCode:counCode});
			return store;
		}
	},
	
	//GPackage 包装
	getPACK_S : function(){
		if(Ext.StoreMgr.containsKey('PACK_S')){
			return Ext.StoreMgr.get('PACK_S');
		} else {	
			var store = this.createStore('PACK_S','PACK_Q','GPackage',GPackage);
			return store;
		}
	},
	
	//GDocumentType 文档类型
	getDOTY_S : function(){
		if(Ext.StoreMgr.containsKey('DOTY_S')){
			return Ext.StoreMgr.get('DOTY_S');
		}
		else {
			var store = this.createStore('DOTY_S','DOTY_Q','GDocumentType',GDocumentType);
			return store;
		}
	},
	
	//GCharge费用
	getCHAR_S : function(){
		if(Ext.StoreMgr.containsKey('CHAR_S')){
			return Ext.StoreMgr.get('CHAR_S');
		}else {
			var store = this.createStore('CHAR_S','CHAR_Q','GCharge',GCharge);
			return store;
		}
	},
	
	//GChargeClass 费用类型
	getCHCL_S : function(){
		if(Ext.StoreMgr.containsKey('CHCL_S')){
			return Ext.StoreMgr.get('CHCL_S');
		}else {
			var store = this.createStore('CHCL_S','CHCL_Q','GChargeClass',GChargeClass);
			return store;
		}
	},
	
	//GTradeType 贸易类型
	getTRTY_S : function(){
		if(Ext.StoreMgr.containsKey('TRTY_S')){
			return Ext.StoreMgr.get('TRTY_S');
		}else {
			var store = this.createStore('TRTY_S','TRTY_Q','GTradeType',GTradeType);
			return store;
		}
	},
	
	//GTransType
	getTRAT_S : function(){
		if(Ext.StoreMgr.containsKey('TRAT_S')){
			return Ext.StoreMgr.get('TRAT_S');
		}else {
			var store = this.createStore('TRAT_S','TRAT_Q','GTransType',GTransType);
			return store;
		}
	},
	
	//GVehicleType车辆类型
	getVETY_S : function(){
		if(Ext.StoreMgr.containsKey('VECL_S')){
			return Ext.StoreMgr.get('VECL_S');
		}
		else {
			var store = this.createStore('VECL_S','VECL_Q','TVehicleClass',TVehicleClass);
			return store;
		}
	},
	
	//GSite 办事处
	getSITE_S : function(){
		if(Ext.StoreMgr.containsKey('GSITE_S')){
			return Ext.StoreMgr.get('GSITE_S');
		}else {
			var store = this.createStore('GSITE_S','GSITE_Q','GSite',GSite);
			return store;
		}
	},
	
	//GTradeTerm 贸易条款
	getTRTE_S : function(){
		if(Ext.StoreMgr.containsKey('TRTE_S')){
			return Ext.StoreMgr.get('TRTE_S');
		}else {
			var store = this.createStore('TRTE_S','TRTE_Q','GTradeTerm',GTradeTerm);
			return store;
		}
	},
			
	//GLevyType
	getLETY_S : function(){
		if(Ext.StoreMgr.containsKey('LETY_S')){
			return Ext.StoreMgr.get('LETY_S');
		}
		else {		
			var store = this.createStore('LETY_S','LETY_Q','GLevyType',GLevyType);
			return store;
		}
	},
	
	//GExchangeSettlement
	getEXSE_S : function(){
		if(Ext.StoreMgr.containsKey('EXSE_S')){
			return Ext.StoreMgr.get('EXSE_S');
		}else {
			var store = this.createStore('EXSE_S','EXSE_Q','GExchangeSettlement',GExchangeSettlement);
			return store;
		}
	},
	
	//公司银行帐号
	getCOBA_S : function(){
		if(Ext.StoreMgr.containsKey('COBA_S')){
			return Ext.StoreMgr.get('COBA_S');
		}else {		
			var store = this.createStore('COBA_S','COBA_Q','PCompanyBankAccount',PCompanyBankAccount);
			return store;
		}
	},
	
	//任务类型
	getTATY_S : function(){
		if(Ext.StoreMgr.containsKey('TATY_S')){
			return Ext.StoreMgr.get('TATY_S');
		}
		else {		
			var store = this.createStore('TATY_S','COBA_Q','PTaskType',PTaskType);
			return store;
		}
	},
		
	//功能权限
	getFUNC_S : function(){
		if(Ext.StoreMgr.containsKey('FUNC_S')){
			return Ext.StoreMgr.get('FUNC_S');
		}
		else {			
			var store = new Ext.data.Store({storeId:'FUNC_S',url:SERVICE_URL,baseParams:{_A:'FUNC_Q',_mt:'json'},
				reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PFunction',id:'funcCode'},PFunction),
				remoteSort:true,sortInfo:{field:'funcCode', direction:'ASC'}});
			 store.load();
			 return store;
		}
	},
	
	//角色
	getROLE_S : function(){
		if(Ext.StoreMgr.containsKey('ROLE_S')){
			return Ext.StoreMgr.get('ROLE_S');
		}else {
			var store = this.createStore('ROLE_S','ROLE_Q','PRole',PRole);
			return store;
		}
	},
	
	//部门
	getGROU_S : function(){
		if(Ext.StoreMgr.containsKey('GROU_S')){
			return Ext.StoreMgr.get('GROU_S');
		}
		else {		
			var store = this.createStore('GROU_S','GROU_Q','PGroup',PGroup);
			return store;
		}
	},
	
	//用户
	getUSER_S : function(){
		if(Ext.StoreMgr.containsKey('USER_S')){
			return Ext.StoreMgr.get('USER_S');
		}
		else {		
			var store = this.createStore('USER_S','USER_Q','PUser',PUser);
			return store;
		}
	},
	
	getUSER : function(v) {
		var _cs=HTStore.getCACL_S();		
		if(Ext.isEmpty(v))
			return '';
		else
			return _cs.getById(v)?_cs.getById(v).get('userName'):v; 
	},
	
	//销售员(业务员)
	getSALE_S : function(){
		if(Ext.StoreMgr.containsKey('SALE_S')){
			return Ext.StoreMgr.get('SALE_S');
		}
		else {		
			var store = this.createStore('SALE_S','USER_Q','PUser',PUser,{_A:'USER_Q',_mt:'json',userSalesFlag:1});
			return store;
		}
	},
	
	//操作员
	getOP_S : function(){
		if(Ext.StoreMgr.containsKey('OP_S')){
			return Ext.StoreMgr.get('OP_S');
		}else{
			var store = this.createStore('OP_S','USER_Q','PUser',PUser,{_A:'USER_Q',_mt:'json',userOperatorFlag:1});
			return store;
		}
	},
	
	//比率（汇率）
	getEXRA_S : function(){
		if(Ext.StoreMgr.containsKey('EXRA_S')){
			return Ext.StoreMgr.get('EXRA_S');
		}else {	
			var store = this.createStore('EXRA_S','EXRA_Q','SExRate',SExRate);
			store.load();
			return store;
		}
	},
	//比率（汇率）
	getExRate : function(cs,ct){
		if(cs==ct) return 1;
		var s = this.getEXRA_S();
		var d=s.getRange();
		var rs = 0;
		var rt = 0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('exraBaseCurrency')==cs && d[i].get('exraExCurrency')==ct) 
				return d[i].get('exraRate');
			else if(d[i].get('exraBaseCurrency')==cs && d[i].get('exraExCurrency')=='CNY') 
				rs=d[i].get('exraRate');
			else if(d[i].get('exraBaseCurrency')=='CNY' && d[i].get('exraExCurrency')==ct) 
				rt=d[i].get('exraRate');		
		}
		return rs*rt;
	},
	//驾驶员
	getDRIVER_S : function(){
		if(Ext.StoreMgr.containsKey('DRIV_S')){
			return Ext.StoreMgr.get('DRIV_S');
		}else{
			var store = this.createStore('DRIV_S','DRIV_Q','TDriver',TDriver);
			store.load();
			return store;
		}
	},
	//驾驶员-根据驾驶员是否空闲状态
	getDrivByStatus:function(){
		var store = this.createStore('','DRIV_Q','TDriver',TDriver,{_A:'DRIV_Q',_mt:'json',transTaskStatus:0});
		store.load();
		return store;
	},
	//车辆管理
	getVEHICLE_S : function(){
		if(Ext.StoreMgr.containsKey('VEHI_S')){
			return Ext.StoreMgr.get('VEHI_S');
		}
		else {
			var store = this.createStore('VEHI_S','VEHI_Q','TVehicle',TVehicle);
			store.load();
			return store;
		}
	},
	//车辆管理-根据车辆状态
	getVehiByStatus:function(){
		var store = this.createStore('','VEHI_Q','TVehicle',TVehicle,{_A:'VEHI_Q',_mt:'json',status:0,transTaskStatus:0});
		store.load();
		return store;
	},
	//公司配置表取值
	getCOCO_S : function(){
		if(Ext.StoreMgr.containsKey('COCO_S')){
			return Ext.StoreMgr.get('COCO_S');
		}else {
			var store = new Ext.data.Store({storeId:'COCO_S',url:SERVICE_URL,baseParams:{_A:'COCO_Q',_mt:'json'},
				reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompanyConfig',id:'cocoCode'},PCompanyConfig),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
			 store.load();
			 return store;
		}
	},
	//从系统配置获取默认配置
	getCFG : function(v){
		var _cs= this.getCOCO_S();
		return _cs.getById(v)?_cs.getById(v).get('cocoValue'):'';
	},
	//从系统配置获取默认配置
	getCFGD : function(v){
		var _cs= this.getCOCO_S();
		return _cs.getById(v)?_cs.getById(v).get('cocoDesc'):'';
	},
	
	//获取模版
	getTEMP_S : function(){
		if(Ext.StoreMgr.containsKey('TEMP_S')){
			return Ext.StoreMgr.get('TEMP_S');
		}else {
			var store = this.createStore('TEMP_S','TEMP_Q','PTemplate',PTemplate);
			return store;
		}
	},
	/**
	 * t:TETY_CODE
	 * 根据参数t从p_template取值
	 */
	getTemplates : function(t){
		var a = this.getTEMP_S().getRange();
		var c=[];
		for(var i=0;i<a.length;i++){
			if(a[i].get('tetyCode')==t) 
				c[c.length]=[a[i].get('id'),a[i].get('tempName')];
		}
		return new Ext.data.SimpleStore({id:0,fields:['id','tempName'],data:c});
	},
	//创建xmlSore
	createXMLStore : function(actionCode,typeName,recordType,bp){
		return new Ext.data.Store({url:SERVICE_URL,
			baseParams:Ext.isEmpty(bp)?{_A:actionCode,_mt:'xml'}:bp,
			reader:new Ext.data.XmlReader({record:typeName}, recordType),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	},
	
	//卸货港
	getPS : function(){
			return this.createXMLStore('PORT_Q','GPort',GPort,{_A:'PORT_Q',_mt:'xml',portType:0});
	},
	
	//装货港
	getAirPortStore : function(){
			return this.createXMLStore('PORT_Q','GPort',GPort,{_A:'PORT_Q',_mt:'xml',portType:1});
	},
	
	//船名
	getVES : function(){
			return this.createXMLStore('VESS_X','GVessel',GVessel);
	},
	//省
	getPROVINCE_S : function(){
			return this.createXMLStore('PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'xml',placType:1});
	},
	//城市
	getCITY_S : function(provinceId){
		return this.createXMLStore('PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:provinceId});
	},
    
	//客户联系人
	getCUCOS : function(){
		return this.createStore('','CUCO_Q','CCustomerContact',CCustomerContact);
	},
		
	//客户供应商
	getCS : function(){
		//return this.createXMLStore('CUST_X','CCustomer',CCustomer);
		return new Ext.data.Store({url:SERVICE_URL+'?_A=CUST_X&_mt=xml',
			reader:new Ext.data.XmlReader({record:'CCustomer'}, CCustomer),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	},
	getCT:function(){
		return this.createXMLStore('CCOMTYPE_Q','CComplaintType',CComplaintType,{_A:'CCOMTYPE_Q',_mt:'xml'});
	},
	
	//收货单位
	getShipperStore : function(action){
		return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
			reader:new Ext.data.XmlReader({record:'CShipper'}, CShipper)});	
	},
	
	//GPS设备
	getSimEqui : function(){
		var store = this.createStore('','SIM_EQUI_Q','TSimEquipment',TSimEquipment);
		return store;
	},
	
	iniStore : function(){
		this.getCOCO_S();
		this.getROLE_S();
		this.getTEMP_S();
	}
};


function getRM(bizClass,bizType,shipType){
	var m1='',m2='';
    if(bizType=='T')
		m1 = M1_TMS;
	else
		m1=eval('M1_'+bizType);
	return m1+m2;
};

var F_V='01';			//查看
var F_ADD='02';			//新增、复制
var F_UP='03';			//编辑
var F_R='04';			//删除
var F_M='05';			//保存
var F_O='06';			//输出
var F_UPL='07';			//上传
var F_DOL='08';			//下载
var F_AU='09';			//审核、取消审核
var F_FA='10';			//财务审核、取消财务审核
var F_MA='11';			//经理审核、取消经理审核
var F_P='12';			//付款核销
var F_INNO='13';		//修改税务发票号
var F_S_R='14'; 		//收款提交-托运单
var F_S_P='15'; 		//付款提交-托运单
var F_I='16';			//作废
var F_S_OK='17';		//业务确认-费用
var F_S_CAN='18';		//业务取消确认-费用
var F_AP_P='19';		//付款申请提交
var F_AC='20';			//授权
var F_AV='21';			//启用
var F_S_U='22';			//运费修改-托运单
var F_MOTO_P='23';		//应付物流商核销
var F_MOTO_R='24';		//中转回扣核销
var F_SHIP_R='25';		//应收发货方核销
var F_COMS_R='26';		//应收收货方核销
var F_EXPE='27';		//费用
var F_BILL='28';		//对账单-已对账、取消对账

var M1_SYS='0001';		//系统管理
var M1_GEN='0002';		//基础数据
var M1_CUST='0003';		//客户管理
var M1_MAINT='0004';	//运维管理
var M1_CONS='0005';		//托运管理
var M1_TRANS='0006';	//运输管理
var M1_SET='0007';		//费用结算
var M1_STAT='0008';		//统计分析
var M1_TRACK='0009';	//车辆跟踪
var M1_RECEI='0010';	//回单管理
var M1_CUST_SERV='0011';//客户服务

//系统管理M1_SYS0001
var P_GROU='01';		//部门
var P_OFFICE='02';		//办事处
var P_ROLE='03';		//角色权限
var P_USER='04';		//用户管理
var P_TEMP='05';		//模板管理
var P_COCO='06';		//系统参数
var P_ACLO='07';		//操作日志

//基础数据M1_GEN0002
var P_VECL='01';		//车辆类型
var P_VEHI='02';		//车辆管理
var P_DRIV='03';		//驾驶员管理
var P_ACTY='04';		//事故类型
var P_OITY='05';		//油品类型
var P_OIST='06';		//加油站
var P_PATE='07';		//付款方式
var P_TRAT='08';		//运输方式
var P_PLAC='09';		//地点
var P_COUN='10';		//国家
var P_UNIT='11';		//计量单位
var P_SEWA='12';		//结算方式
var P_CURR='13';		//币种
var P_CHCL='14';		//费用类别
var P_CHAR='15';		//费用名称
var P_COBA='16';		//银行账户
var P_CUCA='17';		//客户类别

//车辆运维管理M1_MAINT0004
var P_MAINT_RECORD='01';//维修记录
var P_MAINT_CHARGE='02';//运维费用
var P_ACCIDENT='03';	//事故记录
var P_OICA='04';		//加油卡
var P_OI_RECORD='05';	//加油记录

//费用结算M1_SET0007
var S_EXPE='01';		//费用
var S_COAU='02';		//单票审核
var S_BILL_R='03';		//应收对账单
var S_INVO_R='04';		//应收账单
var S_PR_R='05';		//托收单
var S_VOUC_R='06';		//收款核销
var S_BILL_P='07';		//应付对账单
var S_INVO_P='08';		//应付账单
var S_PR_P='09';		//付款申请
var S_VOUC_P='10';		//付款核销
var S_INNO='11';		//发票号码管理
var S_BALA='12';		//客户账户余额
var S_EXRA='13';		//汇率
var S_INRA='14';		//利率

var S_AR='01';			//应收-费用
var S_AP='02';			//应付-费用

//统计分析M1_STAT0008
var T_SHIP='01';		//发货统计表
var T_RECE='02';		//回单统计表
var T_DISC='03';		//回扣统计表
var T_ACCO='04';		//收款统计表
var T_CUEX='05';		//应收费用统计表
var T_VEEX='06';		//应付费用统计表
var T_WROF='07';		//核销明细统计表
var T_ACAR='08';		//应收账款账龄分析表
var T_ACAP='09';		//应付账款账龄分析表


var S_GL='';
var S_EXHI='';
var S_AC='';			//
var P_VESS='';			//船名
var P_SHLI='';			//航线
var P_PORT='';			//港口
var P_AIRP='';			//空港
var P_PACK='';			//包装种类
var P_COCL='';			//箱类
var P_COTY='';			//箱型
var P_CACL='';			//货物种类
var P_CATY='';			//品名
var P_TRTE='';			//贸易条款
var P_TTER='';			//运输条款
var P_TRTY='';			//贸易方式
var P_USAG='';			//用途
var P_LETY='';			//征免性质
var P_EXSE='';			//结汇方式
var P_ISTY='';			//签单方式
var P_DOTY='';			//单证类别
var P_ORDERS='';		//陆运单
var P_SENDCAR='';		//派车单
var P_TMAINT='';		//车辆运维记录
var V_CUST='';			//客户供应商
var V_PRSH='';			//价格单
var V_SAQU='';


//统计分析
var T_BUSI='';			//业务量汇总表
var T_BUEX='';			//利润汇总表
var T_BUDE='';			//业务明细统计表
var T_PROF='';			//利润分析表
var T_SALES='';			//业务员
var T_ARA='';			//应收账款回收情况分析表
var T_APA='';			//应付账款支付情况分析表
var T_PRCO='';			//代理费占单票利润统计表
var T_PRCH='';
var T_PAY_PLAN='';		//付款计划表
var T_PROF_SALES='';
var T_PTEU='';			//集装箱单箱利润统计表
var T_VEHI='';			//车辆业务汇总表
var T_DRIV='';			//驾驶员业务汇总表
var T_SEEX='';			//客户应收费用统计表

