
TConsign = HTUtil.createRecord(['consNo','consNoHandler',
    {name:'consDate',type:'date',dateFormat:DATEF},
    'oriConsId','oriConsNo','consBizType',
    'custId','custName','custSname','custContact','custTel','custFax',
    'grouId','grouName','salesRepId','salesRepName','contractNo',
  	'motorcadeId','motorcadeName','motorcadeContact','motorcadeTel','motorcadeFax',	
  	'tranType','pateName','operationType',
  	{name:'icFlag',type:'boolean',convert:function(v){return v==1;}},'icDays',
  	{name:'preFlag',type:'boolean',convert:function(v){return v==1;}},
  	{name:'inspFlag',type:'boolean',convert:function(v){return v==1;}},
  	{name:'rearFlag',type:'boolean',convert:function(v){return v==1;}},
  	{name:'contFlag',type:'boolean',convert:function(v){return v==1;}},
  	{name:'signInStatus',type:'boolean',convert:function(v){return v==1;}},
  	'loadPlaceId','loadPlaceName','loadFactory','loadContact','loadTel','loadAddress',
  	{name:'startDate',type:'date',dateFormat:DATEF},
  	{name:'endDate',type:'date',dateFormat:DATEF},
  	{name:'loadDate',type:'date',dateFormat:DATEF},'loadTime',
  	'deliveryPlaceId','deliveryPlaceName',
  	{name:'deliveryDate',type:'date',dateFormat:DATEF},'deliveryTime',
  	'deliveryAddress','customsBroker','customsBrokerName','customsContact','customsTel','customsAddress',
  	'containerCompany','containerCompanyName','containerInfo','vessel','voyage',
  	{name:'sailDate',type:'date',dateFormat:DATEF},
  	{name:'expiryDate',type:'date',dateFormat:DATEF},
  	'soNo','soNo2','pol','cyDraw',{name:'drawDate',type:'date',dateFormat:DATEF},'cyBack',
  	{name:'backDate',type:'date',dateFormat:DATEF},'emptyMiles','heavyMiles',
  	'packages','grossWeight','measurement','cargoName','packName',
  	'driverId','driverName','vehicleId','vehicleNo','remarks',
  	'status','transTaskStatus','cargoArrivalStatus','consStatusExp',
  	'sumMonth','sumConsNo','sumPackages','sumGrossWeight','loadCityId',
  	'loadCity','deliveryCityId','deliveryCity','shipperId','shipperName','shipperContact',
  	'shipperTel','consigneeId','consigneeName','consigneePateName','consigneeContact','consigneeTel',
  	{name:'contractDate',type:'date',dateFormat:DATEF},
  	{name:'arScheduleDate',type:'date',dateFormat:DATEF},
  	{name:'arNewDate',type:'date',dateFormat:DATEF},
  	'orderNo','custGrouName',
  	'signInContact',{name:'signInDate',type:'date',dateFormat:DATEF},
  	'feedbackTel',{name:'feedbackDate',type:'date',dateFormat:DATEF},
  	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
  	{name:'premiumExpense',type:'float'},{name:'premiumRate',type:'float'},
  	{name:'premiumValueProvider',type:'float'},{name:'premiumExpenseProvider',type:'float'},
  	{name:'premiumRateProvider',type:'float'},'premiumCompany',
  	{name:'grossWeightProvider',type:'float'},{name:'measurementProvider',type:'float'},
  	'motorcadeProvinceId','motorcadeProvince','motorcadeCityId','motorcadeCity','motorcadeAddress','motorcadeNo','motorcadePateName',
  	{name:'motorcadeExpense',type:'float'},{name:'motorcadeExpense2',type:'float'},
  	{name:'motorcadeExpenseXff',type:'float'},
  	{name:'motorcadeExpenseDff',type:'float'},{name:'motorcadeExpenseYjf',type:'float'},
  	{name:'motorcadeExpenseHdf',type:'float'},{name:'motorcadeExpenseHkf',type:'float'},
  	'motorcade2Id','motorcade2Name','motorcade2No','motorcade2Contact',
  	'motorcade2Tel','motorcade2Fax','motorcade2ProvinceId','motorcade2Province','motorcade2CityId',
  	'motorcade2City','motorcade2Address',{name:'motorcade2Expense',type:'float'},
  	'motorcade3Id','motorcade3Name','motorcade3No','motorcade3Contact','motorcade3Tel','motorcade3Fax',
  	'motorcade3ProvinceId','motorcade3Province','motorcade3CityId','motorcade3City','motorcade3Address',
  	{name:'motorcade3Expense',type:'float'},
  	{name:'motorcade2StartDate',type:'date',dateFormat:DATEF},
  	{name:'motorcade2EndDate',type:'date',dateFormat:DATEF},
  	{name:'motorcade3StartDate',type:'date',dateFormat:DATEF},
  	{name:'motorcade3EndDate',type:'date',dateFormat:DATEF},
  	'transportWay','transportVehicle','cargoStatus','transportPlace',
  	'smsStatus','startSite','startStation','routeStation','endStation',
  	'endSite','custMobile','consigneeMobile','serviceWay','feedbackWay',
  	'feedbackNumber','operateWay','serviceItems',
  	'consOperatorId','consOperatorName','deliveryDoor','replaceLoad',
  	'consStatus','consStatusAr','consStatusAp','consStatusInvoR','consStatusInvoP','consStatusAud','consStatusLock',
  	'sumR','sumP','grossProfit','cnyGrossProfit','usdGrossProfit','otherGrossProfit','grossProfitRate','sumRUsd','sumRCny',
  	'sumROther','sumPUsd','sumPCny','sumPOther','sumRUsdInvoice','sumRCnyInvoice','sumPUsdInvoice','sumPCnyInvoice',
  	'sumRUsdWriteOff','sumRCnyWriteOff','sumPUsdWriteOff','sumPCnyWriteOff','editable',
  	'packagesNo','packagesOut','packagesNumber','receiveTotalExpense',
  	'expeUnitPriceR','expeUnitPriceP','receiveTotalExpenseP','dispatchExpenseP','margin','transportExpenseP','otherExpenseP','receiptType',
  	{name:'expenseBf',type:'float'},{name:'expenseDdf',type:'float'},{name:'expenseShf',type:'float'},
  	{name:'expenseYf',type:'float'},{name:'expenseThf',type:'float'},{name:'expenseCcf',type:'float'},
  	{name:'expenseXff',type:'float'},{name:'expenseDff',type:'float'},{name:'expenseYjf',type:'float'},
  	{name:'expenseHdf',type:'float'},{name:'expenseDsf',type:'float'},
  	{name:'expenseTotal',type:'float'},{name:'expenseTotal2',type:'float'},{name:'expenseTotal3',type:'float'},
  	'expeSubmitStatus','expeSubmitStatus2','sumMargin','sumHk','consBelong','arrivePayId','arrivePayName','shipperMobile',
  	'shipWriteOfStatusR','consWriteOfStatusR','motoWriteOfStatusR','motoWriteOfStatusP','sumShipperAmount','sumConsAmount',
  	'consColorStatus','expeSubmitDate','expeSubmitDate2',
  	'consMblNo','consHblNo','contType','contType2','contNo','contNo2','contSealNo','contSealNo2',
  	'versionFlag'
  ]);
//陆运单对应的货物明细
TConsignCargo = HTUtil.createRecord([
   	'consId','consNo','consNoHandler','consNoHandler','cargoName','packName',
 	{name:'packages',type:'int'},{name:'packagesRemainder',type:'int'},{name:'packageArrival',type:'int'},
 	{name:'grossWeight',type:'float'},{name:'grossWeightRemainder',type:'float'},{name:'grossWeightArrival',type:'float'},
 	{name:'measurement',type:'float'},{name:'measurementRemainder',type:'float'},{name:'measurementArrival',type:'float'},
 	{name:'packagesLack',type:'int'},{name:'grossWeightLack',type:'float'},{name:'measurementLack',type:'float'},
 	'loadPlaceId','loadPlaceName','loadFactory','loadAddress','loadContact','loadTel',
 	'consigneeId','consigneeName','consigneeContact','consigneeTel',
 	'deliveryPlaceId','deliveryPlaceName','deliveryAddress',
 	'remarks','deliveryCity','deliveryCityId','status','transTaskStatus','cargoArrivalStatus',
 	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
   	{name:'premiumExpense',type:'float'},{name:'premiumRate',type:'float'},
   	{name:'premiumValueProvider',type:'float'},
   	{name:'premiumExpenseProvider',type:'float'},{name:'premiumRateProvider',type:'float'},
   	{name:'grossWeightProvider',type:'float'},{name:'measurementProvider',type:'float'},
   	'orderNo','packagesNo','pachagesOut','packagesNumber','receiveTotalExpense',
   	'transportPlace'
   ]);
//派车单
TTransTask = HTUtil.createRecord([
  	'transTaskNo','placeFromId','placeFromName','placeToId','placeToName',
  	'vehicleId','vehicleNo','driverId','driverName','driverTel',
  	'motorcadeId','motorcadeName','motorcadeContact','motorcadeTel',
  	'cotyCode','containerNo','sealNo',
  	{name:'arriveTimeDemand',type:'date',dateFormat:'Y-m-d H:i'},
	{name:'arriveTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'leaveTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'backTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'packName','packages','grossWeight','measurement',
	'remarks','status','cargoName','emptyMiles','heavyMiles','pateName',
	{name:'startDate',type:'date',dateFormat:'Y-m-d'},
	{name:'endDate',type:'date',dateFormat:'Y-m-d'},'endTime',
	'sumT','sumStartDate','sumGrossWeight','sumDistance',
	'premiumNumber','receiptStatus',
  	{name:'premiumDateFrom',type:'date',dateFormat:'Y-m-d'},
  	{name:'premiumDateTo',type:'date',dateFormat:'Y-m-d'},
  	{name:'premiumExpense',type:'float'},'premiumCompany',
  	'editable','dispatchFlag',
  	{name:'loadDate',type:'date',dateFormat:'Y-m-d'},'loadTime','startTime',
  	{name:'expiryDate',type:'date',dateFormat:'Y-m-d'},'expiryTime'
  ]);
//派车对应的陆运单（一次派车对应一个或多个陆运单）
TTaskConsign = HTUtil.createRecord([
  	'transTaskId','consId','consNo','consNoHandler','cargoName','packName',
    	{name:'packages',type:'int'},
    	{name:'grossWeight',type:'float'},
    	{name:'measurement',type:'float'},'loadPlaceId','loadPlaceName',
    	'loadFactory','loadAddress','loadContact','loadTel',
    	'consigneeId','consigneeName','consigneeContact','consigneeTel',
    	'deliveryPlaceId','deliveryPlaceName','deliveryAddress',
    	'remarks','deliveryCity','deliveryCityId',
    	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
    	{name:'premiumExpense',type:'float'},{name:'premiumRate',type:'float'},
    	{name:'grossWeightProvider',type:'float'},{name:'measurementProvider',type:'float'},
    	'custId','custName','custContact','custTel','custMobile','custFax',
    	'startStation','routeStation','endStation','contractNo','pol','cyBack','cyDraw',
    	{name:'drawDate',type:'date',dateFormat:DATEF},
    	'containerCompany','containerCompanyName','containerInfo',
    	{name:'expiryDate',type:'date',dateFormat:DATEF},
    	{name:'backDate',type:'date',dateFormat:DATEF},{name:'sailDate',type:'date',dateFormat:DATEF},
    	'soNo','soNo2','consMblNo','consHblNo','contType','contType2',
    	'contNo','contNo2','contSealNo','contSealNo2','vessel','voyage',
		{name:'contractDate',type:'date',dateFormat:DATEF},'icDays',
    	'customsBroker','customsBrokerName','customsAddress','customsContact','customsTel'
   ]);
//货物
TCargo = HTUtil.createRecord([
	'transTaskId','transTaskNo','consId','consNo','consNoHandler','cargoName','packName',
  	{name:'packages',type:'int'},{name:'packageArrival',type:'int'},
  	{name:'grossWeight',type:'float'},{name:'grossWeightArrival',type:'float'},
  	{name:'measurement',type:'float'},{name:'measurementArrival',type:'float'},
  	{name:'packagesLack',type:'int'},{name:'grossWeightLack',type:'float'},{name:'measurementLack',type:'float'},
  	{name:'consPackages',type:'int'},{name:'consGrossWeight',type:'float'},{name:'consMeasurement',type:'float'},
  	'loadPlaceId','loadPlaceName',
  	'loadFactory','loadAddress','loadContact','loadTel',
  	'consigneeId','consigneeName','consigneeContact','consigneeTel',
  	'deliveryPlaceId','deliveryPlaceName','deliveryAddress',
  	'remarks','deliveryCity','deliveryCityId','consCargoId',
  	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
  	{name:'premiumExpense',type:'float'},{name:'premiumRate',type:'float'},
  	{name:'grossWeightProvider',type:'float'},{name:'measurementProvider',type:'float'},
  	'signInStatus'
  ]);
//加油记录
TOilLog = HTUtil.createRecord([
	'vehicleId','vehicleNo','driverId','driverName',
	 {name:'refuelDate',type:'date',dateFormat:'Y-m-d'},
	'oilStationId','oilStationName',
	{name:'isPoint',type:'boolean',convert:function(v){return v==1;}},
	'oilTypeId','oilTypeName','num','price',
	'amount','remark',
	'cardId','cardNumber',
	{name:'startAmount',type:'float'},
	{name:'endAmount',type:'float'},
	{name:'cardPaid',type:'float'},
	{name:'currencyPaid',type:'float'},
	{name:'currentMiles',type:'float'},
	'signInContact'
 ]);
//车辆
TVehicle=HTUtil.createRecord([
	'vehicleNo','vehicleName','vehicleClassId','vehicleClassName','palletNo','engineNo',
	'icNo','customsNo','palletType',
	{name:'inspectDateFrom',type:'date',dateFormat:'Y-m-d'},
	{name:'inspectDateTo',type:'date',dateFormat:'Y-m-d'},
	{name:'madeDate',type:'date',dateFormat:'Y-m-d'},
	'length','height','width','maxLoad','motorcadeId','motorcadeName',
	'status','transTaskStatus','remark',
	'premiumNumber',
	{name:'premiumDateFrom',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumDateTo',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumExpense',type:'float'},'premiumCompany',
	{name:'oilNumberAmount',type:'float'},'oilNumber',
	'simEquiNo','simNum'
	]);
//回单
TReceipt = HTUtil.createRecord([
	'transTaskId','transTaskNo','consId','consNo','consNoHandler','cargoName',
  	{name:'packages',type:'int'},{name:'packagesArrival',type:'int'},
  	{name:'packagesLack',type:'int'},
  	'signInContact',{name:'signInDate',type:'date',dateFormat:'Y-m-d'},
  	'returnSignInContact',{name:'returnSignInDate',type:'date',dateFormat:'Y-m-d'},
  	'remarks','receiptType','receiptNum'
  ]);
//车辆类型
TVehicleClass = HTUtil.createRecord(['vehicleClassName']);
//事故类型
TAccidentType = HTUtil.createRecord(['accidentTypeName']);
//加油类型
TOilType = HTUtil.createRecord(['oilTypeName']);
//加油站
TOilStation = HTUtil.createRecord(['oilStationName',
	{name:'isPoint',type:'boolean',convert:function(v){return v==1;}}
]);
TDriver = HTUtil.createRecord(
	['driverCode','driverName','mobile','homeTel','idNo','gender','licenseNo','deposit', 
	 {name:'licenseDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'effectiveDateFrom',type:'date',dateFormat:'Y-m-d'},
	 {name:'effectiveDateTo',type:'date',dateFormat:'Y-m-d'},
	 {name:'inspectDateFrom',type:'date',dateFormat:'Y-m-d'},
	 {name:'inspectDateTo',type:'date',dateFormat:'Y-m-d'},	
	 {name:'joinDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'leaveDate',type:'date',dateFormat:'Y-m-d'},
	 'motorcadeId','motorcadeName','vehicleId','vehicleNo','remark',
	 'transTaskStatus']);
TAccident=HTUtil.createRecord(
	['accidentTypeId','accidentTypeName','vehicleId','vehicleNo','driverId','driverName','policeOffice','policeTel',	 
	{name:'accidentDate',type:'date',dateFormat:'Y-m-d'},
	{name:'reportTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'auditDate',type:'date',dateFormat:'Y-m-d H:i:s'},
	'place','responsible','reportor','lossAmount',
	'compensateAmount','personAmount','injuryNum','deathNum','accidentReson',
	'accidentDescription','result','auditComments','auditor','remark']);
TRepairLog=HTUtil.createRecord(
	['repairNo','vehicleId','vehicleNo','driverId','driverName','factoryId','factoryName',
	{name:'repairDate',type:'date',dateFormat:'Y-m-d'},
	{name:'isPoint',type:'boolean',convert:function(v){return v==1;}},
	'invoiceNo','invoiceAmount','remark']);
TRepairItem=HTUtil.createRecord(
	['repairLogId','itemName','partsNum','partsPrice','partsFee',
	'hours','hoursPrice','hoursFee','totalAmount','remark']);
TPrice=HTUtil.createRecord(
	['loadProvinceId','loadProvinceName','loadCityId','loadCityName',
	 'dischargeProvinceId','dischargeProvinceName','dischargeCityId','dischargeCityName',
	'miles','duration','price1','price2','price3','price4',
	{name:'startDate',type:'date',dateFormat:'Y-m-d'},
	{name:'endDate',type:'date',dateFormat:'Y-m-d'},
	{name:'active',type:'boolean',convert:function(v){return v==1;}}
	]);

TTransType = HTUtil.createRecord(['transTypeName']);

//加油卡
TOilCard=HTUtil.createRecord(['cardNumber','cardType','balance']);

//加油卡记录
TOilCardTransaction=HTUtil.createRecord(
		['cardId','cardNumber','transactionType','amount',
		 'vehicleId','vehicleNo','driverId','driverName',
		{name:'transactionDate',type:'date',dateFormat:'Y-m-d'}
	]);

//车辆跟踪设备
TSimEquipment=HTUtil.createRecord(
		['simEquiType','simEquiNo','simNum','vehicleName','vehicleId',
		'vehicleNo','vehicleSpeed','vehicleIcon','driverName','driverMobile','driverTel','remark',
		{name:'simStartDate',type:'date',dateFormat:'Y-m-d'},
		{name:'simEndDate',type:'date',dateFormat:'Y-m-d'}
	]);

//车辆跟踪
TSimPosition=HTUtil.createRecord(
		['factoryName','speed','simEquiNo','direction','address','online',
		'lat','lng',{name:'sendTime',type:'date',dateFormat:'Y-m-d H:i:s'},
		'vehicleNo'
	]);

