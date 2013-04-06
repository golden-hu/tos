TConsign = HTUtil.createRecord([
 	{name:'consDate',type:'date',dateFormat:DATEF},'consNo','consNoHandler',
 	'grouId','grouName','salesRepId','salesRepName','consOperatorId',
 	'consOperatorName','contractNo','editable',
 	'sumMonth','sumConsNo','sumPackages','sumGrossWeight',
 	{name:'contractDate',type:'date',dateFormat:DATEF},
	'custId','custName','custSname','custContact','custMobile','custTel','custFax',
	{name:'loadDate',type:'date',dateFormat:DATEF},
	'loadContact','loadTel','loadAddress','loadPlaceName','shipperFax',
	'shipperId','shipperName','shipperContact','shipperTel','shipperMobile',
	'shipperAddress','consigneeId','consigneeName','consigneeContact',
	'consigneeTel','consigneeMobile','consigneeFax','consigneeAddress','driverTel',
    'startStation','routeStation','endStation','driverId','driverName','heavyMiles',
    'vehicleId','vehicleNo','transportWay','transportVehicle','emptyMiles',
	'motorcadeId','motorcadeName','motorcadeContact','motorcadeTel','motorcadeFax',	
	'motorcadeAddress','motorcadeNo',{name:'arNewDate',type:'date',dateFormat:DATEF},
	{name:'startDate',type:'date',dateFormat:DATEF},
	{name:'endDate',type:'date',dateFormat:DATEF},
	{name:'requArrivalDate',type:'date',dateFormat:DATEF},'distrMethod',
	{name:'expcArrivalDate',type:'date',dateFormat:DATEF},
	'signInContact',{name:'signInDate',type:'date',dateFormat:DATEF},
	{name:'signInStatus',type:'boolean',convert:function(v){return v==1;}},
	'feedbackTel',{name:'feedbackDate',type:'date',dateFormat:DATEF},
	'feedbackWay','feedbackNumber','demageStatus','receiptStatus','cargoRemarks',
	'remarks',{name:'premiumRate',type:'float'},'premiumNumber','status',
	{name:'premiumDateFrom',type:'date',dateFormat:DATEF},'consBizType',
	{name:'premiumDateTo',type:'date',dateFormat:DATEF},'consBizClass',
	{name:'premiumExpense',type:'float'},'premiumCompany',
	{name:'packages',type:'int'},{name:'dispatchPackages',type:'int'},
	{name:'departurePackages',type:'int'},{name:'stationPackages',type:'int'},
	{name:'signPackages',type:'int'},{name:'grossWeight',type:'float'},
	{name:'measurement',type:'float'},{name:'volume',type:'float'},
	{name:'netWeightProvider',type:'float'},'orderNo','cargoName','packName',
	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
	'payMethod','expeSubmitStatus','consStatusExp',	
	{name:'premiumExpense',type:'float'},{name:'loadExpense',type:'float'},
	{name:'storehouseExpense',type:'float'},'deliveryPlaceId','deliveryPlaceName',
	'deliveryAddress','deliveryCity','deliveryCityId',
	{name:'agencyReceiveExpense',type:'float'},
	{name:'otherExpense',type:'float'},	{name:'expenseSpot',type:'float'},
	{name:'expenseFreight',type:'float'},{name:'expenseReceipt',type:'float'},
	{name:'expenseMonth',type:'float'},	{name:'expenseDiscount',type:'float'},
	{name:'expenseTotal',type:'float'},
	'consStatusInvoP','consStatusAud','consStatusLock',
	'consStatus','consStatusAr','consStatusAp','consStatusInvoR',
  	'sumR','sumP','grossProfit','cnyGrossProfit','usdGrossProfit','otherGrossProfit',
  	'grossProfitRate','sumRUsd','sumRCny','sumROther','sumPUsd','sumPCny','sumPOther',
  	'sumRUsdInvoice','sumRCnyInvoice','sumPUsdInvoice','sumPCnyInvoice',
  	'sumRUsdWriteOff','sumRCnyWriteOff','sumPUsdWriteOff','sumPCnyWriteOff']);

TConsignCargo = HTUtil.createRecord([
  	'consId','consNo','cargoName','packName','orderNo','consCargoId','tconsId',
	{name:'packages',type:'int'},{name:'dispatchPackages',type:'int'},
	{name:'departurePackages',type:'int'},{name:'stationPackages',type:'int'},
	{name:'signPackages',type:'int'},'deliveryPlaceId','deliveryPlaceName',
	'deliveryAddress','deliveryCity','deliveryCityId',
	{name:'grossWeight',type:'float'},{name:'dispatchGrossWeight',type:'float'},
	{name:'departureGrossWeight',type:'float'},{name:'stationGrossWeight',type:'float'},
	{name:'signGrossWeight',type:'float'},
	{name:'measurement',type:'float'},{name:'dispatchVolume',type:'float'},
	{name:'departureVolume',type:'float'},{name:'stationVolume',type:'float'},
	{name:'signVolume',type:'float'},{name:'deliveryDate',type:'date',dateFormat:DATEF},
	{name:'volume',type:'float'},'consigneeId','consBizClass',
	'loadFactory','loadAddress','loadContact','loadTel','loadPlaceId','loadPlaceName',
	'consigneeName','consigneeContact','consigneeTel','distrAddress',
	'remarks','cargoStatus','cargoClassName','cargoClassId',
	{name:'premiumValue',type:'float'},{name:'premiumExpense',type:'float'},
	{name:'premiumRate',type:'float'},{name:'netWeightProvider',type:'float'},
	{name:'surplusPackages',type:'int'},{name:'surplusGrossWeight',type:'float'},
	{name:'surplusVolume',type:'float'},'transportPlace', 
	{name:'consDate',type:'date',dateFormat:DATEF},'transportWay',
	{name:'loadDate',type:'date',dateFormat:DATEF},
	{name:'arNewDate',type:'date',dateFormat:DATEF},
	{name:'notPachagesOut',type:'int'},{name:'pachagesOut',type:'int'}]);
  	
TTransTask = HTUtil.createRecord([
	'transTaskNo','placeFromId','placeFromName','placeToId','placeToName',
	'vehicleId','vehicleNo','driverId','driverName','driverTel',
	'motorcadeId','motorcadeName','motorcadeContact','motorcadeTel',
	'cotyCode','containerNo','sealNo',
	{name:'arriveTimeDemand',type:'date',dateFormat:'Y-m-d H:i'},
  	{name:'arriveTime',type:'date',dateFormat:'Y-m-d H:i'},
  	{name:'loadTime',type:'date',dateFormat:'Y-m-d H:is'},
  	{name:'leaveTime',type:'date',dateFormat:'Y-m-d H:i'},
  	{name:'backTime',type:'date',dateFormat:'Y-m-d H:i'},
  	'packName','packages','grossWeight','measurement',
  	'remarks','status','consBizType','consStatusExp','consBizClass',
  	'heavyMiles','pateName','cargoName','emptyMiles',
  	{name:'startDate',type:'date',dateFormat:'Y-m-d H:i:s'},
  	{name:'endDate',type:'date',dateFormat:'Y-m-d H:i:s'},
  	'sumT','sumStartDate','sumGrossWeight','sumDistance',
  	'premiumNumber','expeSubmitStatus',
	{name:'premiumDateFrom',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumDateTo',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumExpense',type:'float'},'premiumCompany',
	{name:'expenseXff',type:'float'},{name:'expenseDff',type:'float'},
  	{name:'expenseHdf',type:'float'},{name:'expenseYjf',type:'float'},
  	{name:'expenseHkf',type:'float'}]);
  	
TReceipt=HTUtil.createRecord([
	'consId','consNo','transTaskNo','transTaskId','signatureBy','signatureRemarks',
	'receiptBy','receiptStatus','custName','consDate',
	'demageFlag','demageRemarks',{name:'demageQuantity',type:'float'}, 
	{name:'signatureDate',type:'date',dateFormat:'Y-m-d'},
	{name:'signatureTime',type:'date',dateFormat:'Y-m-d H:i'},
	{name:'receiptDate',type:'date',dateFormat:'Y-m-d'},
	{name:'receiptTime',type:'date',dateFormat:'Y-m-d H:i'},
	{name:'loadDate',type:'date',dateFormat:'Y-m-d'},
	{name:'loadTime',type:'date',dateFormat:'Y-m-d H:i'},
	{name:'deliveryDate',type:'date',dateFormat:'Y-m-d'},
	{name:'deliveryTime',type:'date',dateFormat:'Y-m-d H:i'}]);
  	
TCargo = HTUtil.createRecord([
	'transTaskId','consId','consNo','cargoName','packName',
  	{name:'packages',type:'int'},'cargoStatus',
	{name:'grossWeight',type:'float'},
	{name:'deliveryTime',type:'date',dateFormat:DATEF},'distrAddress',
	{name:'measurement',type:'float'},{name:'volume',type:'float'},
  	'loadPlaceId','loadPlaceName','loadFactory','loadAddress','loadContact','loadTel',
  	'consigneeId','consigneeName','consigneeContact','consigneeTel',
  	'deliveryPlaceId','deliveryPlaceName','deliveryAddress',
  	'remarks','deliveryCity','deliveryCityId','consCargoId',
  	'cargoClassName','cargoClassId',{name:'premiumValue',type:'float'},
  	{name:'premiumExpense',type:'float'},{name:'premiumRate',type:'float'},
  	{name:'grossWeightProvider',type:'float'},{name:'measurementProvider',type:'float'},
  	{name:'netWeightProvider',type:'float'}]);

TContainer=HTUtil.createRecord([
	'consNo','custName','custNo','custContact','custMobile','custFax','custAddress',
	'factoryName','factoryContact',{name:'custDate',type:'date',dateFormat:DATEF},
	'factoryTel','stuffing','loadPlace','voyage','departureOffice',
	'customsBrokerName','customsBrokerFun','shippingCompanies','vessel',
	{name:'cabinetDate',type:'date',dateFormat:DATEF},'cabinetPoint',
	{name:'feedingDate',type:'date',dateFormat:DATEF},'cabinetLocations',
	{name:'freeDate1',type:'date',dateFormat:DATEF},'cabinetContact',
	{name:'freeDate2',type:'date',dateFormat:DATEF},'cabinetTel',
	{name:'arrivedDate',type:'date',dateFormat:DATEF},'consBizClass',
	{name:'saillingDate',type:'date',dateFormat:DATEF},
	{name:'closingDate',type:'date',dateFormat:DATEF},
	{name:'cutDate',type:'date',dateFormat:DATEF},'arriveOffice','containerType',
	'bookingNumber','containerNumber','loadNumber','containerCompany',
	'departurePort','transshipmentPort','destinationPort',
	'sealNumber','bookingNumber2','containerNumber2','sealNumber2',
	{name:'dualTorr',type:'boolean',convert:function(v){return v==1;}},
  	{name:'pierQuery',type:'boolean',convert:function(v){return v==1;}},
  	'mentionCounterYear','mentionCounterLocation','alsoCounterYear',
  	'alseCounterLocation','vehicleNo','driverName','rRemarks','pRemarks',
  	'motorcadeName','bayNumber','driverTel','deparTments','consignRemarks',
  	'vRemarks',{name:'releaseDate',type:'date',dateFormat:DATEF},
  	{name:'alsoCabineDate',type:'date',dateFormat:DATEF},
	{name:'sceneDate',type:'date',dateFormat:DATEF},'merchanRemarks',
	{name:'departureDate',type:'date',dateFormat:DATEF},
	{name:'miles',type:'float'},{name:'actualFuelConsumption',type:'float'},
	{name:'rFreight',type:'float'},{name:'rPressureFare',type:'float'},
	{name:'rDeclarationCharges',type:'float'},{name:'rPortConstructionFee',type:'float'},
	{name:'rSecurityCharge',type:'float'},{name:'rSingleCharge',type:'float'},
	{name:'rWarehousingFee',type:'float'},{name:'rOverweightCharges',type:'float'},
	{name:'rMentionFees',type:'float'},{name:'rFedCharges',type:'float'},
	{name:'rPressureFare2',type:'float'},{name:'rOtherCharges',type:'float'},
	{name:'pFreight',type:'float'},{name:'pPressureFare',type:'float'},
	{name:'pDeclarationCharges',type:'float'},{name:'pPortConstructonFee',type:'float'},
	{name:'pSecurityCharge',type:'float'},{name:'pSingleCharge',type:'float'},
	{name:'pFedCharges',type:'float'},{name:'pOverweightCharges',type:'float'},
	{name:'pHighFees',type:'float'},{name:'pOtherCharges',type:'float'},
	{name:'pBoxFee',type:'float'},{name:'pRoadToll',type:'float'},
	{name:'vFare',type:'float'},{name:'vSuitcaseFee',type:'float'},
	{name:'vDeduct',type:'float'},{name:'vRoadToll',type:'float'},
	{name:'vFuelCosts',type:'float'},{name:'vPendingCharges',type:'float'},
	{name:'vtireFee',type:'float'},{name:'vRepairs',type:'float'},
	{name:'vOtherCharges',type:'float'},{name:'vDriverValue',type:'float'},
	{name:'rExpenseTotal',type:'float'},{name:'pExpenseTotal',type:'float'},
	{name:'vExpenseTotal',type:'float'},'cargoName',{name:'volume',type:'float'},
	{name:'packages',type:'int'},{name:'grossWeight',type:'float'}]);
  	
TContainerCargo = HTUtil.createRecord([
  	'consId','consNo','consCargoId','cargoName','packName',
	{name:'packages',type:'int'},{name:'dispatchPackages',type:'int'},
	{name:'departurePackages',type:'int'},{name:'stationPackages',type:'int'},
	{name:'signPackages',type:'int'},
	{name:'grossWeight',type:'float'},{name:'dispatchGrossWeight',type:'float'},
	{name:'departureGrossWeight',type:'float'},
	{name:'signGrossWeight',type:'float'},{name:'stationGrossWeight',type:'float'},
	{name:'measurement',type:'float'},{name:'dispatchVolume',type:'float'},
	{name:'departureVolume',type:'float'},{name:'stationVolume',type:'float'},
	{name:'signVolume',type:'float'},
	{name:'surplusPackages',type:'int'},{name:'surplusGrossWeight',type:'float'},
	{name:'surplusVolume',type:'float'},'packagesNumber',
	{name:'volume',type:'float'},'loadPlaceId','loadPlaceName','consigneeId',
	'loadFactory','loadAddress','loadContact','loadTel',
	'consigneeName','consigneeContact','consigneeTel','deliveryPlaceId',
	'deliveryPlaceName','deliveryAddress',{name:'premiumRate',type:'float'},
	'remarks','deliveryCity','deliveryCityId','status','cargoClassName','cargoClassId',
	{name:'premiumValue',type:'float'},{name:'premiumExpense',type:'float'},
  	{name:'premiumValueProvider',type:'float'},
  	{name:'premiumExpenseProvider',type:'float'},
  	{name:'premiumRateProvider',type:'float'},{name:'grossWeightProvider',type:'float'},
  	{name:'measurementProvider',type:'float'},'orderNo','packagesNo','pachagesOut',
  	'receiveTotalExpense','transportPlace',{name:'netWeightProvider',type:'float'}]); 	
 
TOilLog = HTUtil.createRecord(
	['vehicleId','vehicleNo','driverId','driverName',
	 {name:'refuelDate',type:'date',dateFormat:'Y-m-d'},
	'oilStationId','oilStationName',
	{name:'isPoint',type:'boolean',convert:function(v){return v==1;}},
	'oilTypeId','oilTypeName','num','price','amount','remark','cardId','cardNumber',
	{name:'startAmount',type:'float'},{name:'endAmount',type:'float'},
	{name:'cardPaid',type:'float'},{name:'currencyPaid',type:'float'},
	{name:'currentMiles',type:'float'},'signInContact']);

TVehicle=HTUtil.createRecord(
	['vehicleNo','vehicleName','vehicleClassId','vehicleClassName','palletNo',
	'icNo','customsNo','palletType','remark','premiumNumber','engineNo',
	{name:'inspectDateFrom',type:'date',dateFormat:'Y-m-d'},
	{name:'inspectDateTo',type:'date',dateFormat:'Y-m-d'},
	{name:'madeDate',type:'date',dateFormat:'Y-m-d'},
	'length','height','width','maxLoad','motorcadeId','motorcadeName','status',
	{name:'premiumDateFrom',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumDateTo',type:'date',dateFormat:'Y-m-d'},
	{name:'premiumExpense',type:'float'},'premiumCompany',
	{name:'oilNumberAmount',type:'float'},'oilNumber']);
	
TVehicleClass = HTUtil.createRecord(['vehicleClassName']);

TAccidentType = HTUtil.createRecord(['accidentTypeName']);

TOilType = HTUtil.createRecord(['oilTypeName']);

TOilStation = HTUtil.createRecord(['oilStationName',
	{name:'isPoint',type:'boolean',convert:function(v){return v==1;}}]);

TDriver = HTUtil.createRecord(
	['driverCode','driverName','mobile','homeTel','idNo','gender','licenseNo','deposit', 
	 {name:'licenseDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'effectiveDateFrom',type:'date',dateFormat:'Y-m-d'},
	 {name:'effectiveDateTo',type:'date',dateFormat:'Y-m-d'},
	 {name:'inspectDateFrom',type:'date',dateFormat:'Y-m-d'},
	 {name:'inspectDateTo',type:'date',dateFormat:'Y-m-d'},	
	 {name:'joinDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'leaveDate',type:'date',dateFormat:'Y-m-d'},
	 'motorcadeId','motorcadeName','vehicleId','vehicleNo','remark']);

TAccident=HTUtil.createRecord(
	['accidentTypeId','accidentTypeName','vehicleId','vehicleNo','driverId',
	'driverName','policeOffice','policeTel',	 
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
	{name:'active',type:'boolean',convert:function(v){return v==1;}}]);

TExpress = HTUtil.createRecord([
    'consNo','exprOriginNo','exprNo','custId','custName','custSname',
    'custContact','custTel','consBizType',
    'exprCarrierId','exprCarrier','exprCarrierSname','exprCarrierName',
    'exprCarrierTel','exprNetworkId','exprConsigneeCity','exprConsigneeCountry',
    'exprNetwork','exprPostingDate', 'grouId','grouName','exprOperatorId',
    'exprOperator','exprSaleId','exprShipperCity','exprShipperCountry',
    'exprSaleName','exprCargoType','exprShipper','exprConsigneeSignature',
    'exprShipperCompany','exprShipperAddress','exprShipperTel',
    'exprConsignee','exprConsigneeCompany','exprConsigneeAddress',
    'exprConsigneeTel','exprFreightBill','exprDutiesBill','exprDeliveryPlace',
    'exprConsigneeSignatureDate','exprCargoName','exprVolumn',
    'exprVolumnConversion','exprLength','exprWidth','exprHeight',
    'exprDimensionWeight','exprPackages','exprTotalWeight','exprActualWeight',
    'exprCharge','exprAddCharge','exprTotalCharge',
    'consStatus','consStatusAr','consStatusAp','consStatusInvoR','consStatusInvoP',
    'consStatusAud','consStatusLock',
    'exprRemarks','exprSmsContent','exprActualAWeight','exprDimensionAWeight',
    'exprTotalAWeight','exprSettleStatus',
    {name:'exprReturned',type:'boolean',convert:function(v){return v==1;}},
    {name:'exprAbandoned',type:'boolean',convert:function(v){return v==1;}},
    {name:'exprPostingDate',type:'date',dateFormat:DATEF},
    {name:'exprExportDate',type:'date',dateFormat:DATEF},
    {name:'exprDeliveryDate',type:'date',dateFormat:DATEF},
    {name:'exprConsigneeSignatureDate',type:'date',dateFormat:DATEF},
    'sumR','sumP','grossProfit','grossProfitRate','sumRUsd',
	'sumRUsdInvoice','sumRUsdWriteOff','sumRCny',
	'sumRCnyInvoice','sumRCnyWriteOff','sumPUsd','sumPUsdInvoice','sumPUsdWriteOff',
	'sumPCny','sumPCnyInvoice','sumPCnyWriteOff','editable']);

TNetwork = HTUtil.createRecord(['exprNetwork']);

TExpressCargo = HTUtil.createRecord([
    'exprId','exprCargoDescription','exprCargoPackages','exprCargoWeight',
    'exprCargoValue','exprCargoOrigin']);

TTransType = HTUtil.createRecord(['transTypeName']);

TOilCard=HTUtil.createRecord(['cardNumber','cardType','balance']);

TOilCardTransaction=HTUtil.createRecord(['cardId','cardNumber','transactionType',
	'vehicleId','vehicleNo','driverId','driverName','amount',
	{name:'transactionDate',type:'date',dateFormat:'Y-m-d'}]);

CComplaint = HTUtil.createRecord([
	'custId','custName','consNo','complaintTypeId','complaintType','businessType',
	'reason','solution','custCompAmount',
	'status','damagedNum','lossNum','lossAmount','compensationAmount',
	{name:'complaintDate',type:'date',dateFormat:DATEF}]);

CComplaintType = HTUtil.createRecord(['complaintName']);

//显示收货单位
var listConsignee = function(f, e) {
	if (e.getKey() != e.ENTER) {
		var q = f.getRawValue();
		if (q.length > 0 && !f.isExpanded()) {
			Ext.Ajax.request({
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TMS_CONSIGNEE_Q',
							_mt : 'xml',
							consigneeName : q
						},
						success : function(r, o) {
							f.store.loadData(r.responseXML, false);
							f.expand();
						}
					});
		} else if (q.length == 0 && f.isExpanded()) {
			f.store.removeAll();
		}
	}
};

// 获取所有发货地
var listStartStation = function(f, e) {
	if (e.getKey() != e.ENTER) {
		var q = f.getRawValue();
		if (q.length > 0 && !f.isExpanded()) {
			Ext.Ajax.request({
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TMS_STARTSTATION_Q',
							_mt : 'xml',
							startStation : q
						},
						success : function(r, o) {
							f.store.loadData(r.responseXML, false);
							f.expand();
						}
					});
		} else if (q.length == 0 && f.isExpanded()) {
			f.store.removeAll();
		}
	}
};

// 获取所有目的地
var listEndStation = function(f, e) {
	if (e.getKey() != e.ENTER) {
		var q = f.getRawValue();
		if (q.length > 0 && !f.isExpanded()) {
			Ext.Ajax.request({
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TMS_ENDSTATION_Q',
							_mt : 'xml',
							endStation : q
						},
						success : function(r, o) {
							f.store.loadData(r.responseXML, false);
							f.expand();
						}
					});
		} else if (q.length == 0 && f.isExpanded()) {
			f.store.removeAll();
		}
	}
};

// 驾驶员维护
var listDriverName = function(f, e) {
	if (e.getKey() != e.ENTER) {
		var q = f.getRawValue();
		if (q.length > 0 && !f.isExpanded()) {
			Ext.Ajax.request({
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TTRT_DRIV_Q',
							_mt : 'xml',
							driverName : q
						},
						success : function(r, o) {
							f.store.loadData(r.responseXML, false);
							f.expand();
						}
					});
		} else if (q.length == 0 && f.isExpanded()) {
			f.store.removeAll();
		}
	}
};

// 车牌号维护
listVehicleNo = function(f, e) {
	if (e.getKey() != e.ENTER) {
		var q = f.getRawValue();
		if (q.length > 0 && !f.isExpanded()) {
			Ext.Ajax.request({
						url : SERVICE_URL,
						method : 'POST',
						params : {
							_A : 'TTRT_VEHI_Q',
							_mt : 'xml',
							vehicleNo : q
						},
						success : function(r, o) {
							f.store.loadData(r.responseXML, false);
							f.expand();
						}
					});
		} else if (q.length == 0 && f.isExpanded()) {
			f.store.removeAll();
		}
	}
};
