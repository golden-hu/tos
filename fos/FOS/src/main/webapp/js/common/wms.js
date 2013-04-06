//warehouse management system
WStorageRate=HTUtil.createRecord(
		['storageNoteId', 'storageNoteNo','storageNoteCargoId','cargoId','skuNo','cargoName',
		 'rateId','rateCode','rateName', 'charCode', 'charName', 
		 'unit','unitName', 'unitId', 'unitPrice','quantity','amount','taskTime',
		 'cargoQuantity','qUnitName','qUnitId','cargoWeight','wUnitName','wUnitId','cargoVolume','vUnitName','vUnitId',
		 'costInFlag', 'accountName', 'accountCode','accountId'
]);
WAssets=HTUtil.createRecord(
	['storageNoteNo','storageNoteId','atClassId','atClassName',
	 'quantity','atId','atCode','atName','atBrand','atSpec','atType','atColor',
	//@Transient
	'custId','custName',{name:'actureTime',type:'date',dataFormat:'Y-m-d'},'orderNo','entrustNo','status']);

WQualityControlItem=HTUtil.createRecord([
    'storageNoteId','storageNoteNo','receivedId',
    'cargoName','skuNO','specification','cargoType','cargoColor','qualityType','qaFlagType','qaFlagQuantity','qaFlagQuantityUnit',
    'qaFlagPackages','qaFlagPackagesUnit','qaFlagGrossWeight','qaFlagNetWeight','qaFlagWeightUnit','qaFlagVolume','qaFlagVolumeUnit',
    'qaFlagCasingQuantity','qaFlagCasingUnit','trayType','trayQuantity','qaFlagData','qaFlagOperatorName',
    'planQuantity','planPackages','planGrossWeight','planNetWeight','planVolume','planPack','planPackTwo','planPackThree',
    'planPackFour','planPackFive','cargoId','qaFlagMeasure','qaFlagMeasureUnit','orderNo','cargoOwnerName',
    'qaFlagCasingQuantityTwo','qaFlagCasingUnitTwo','qaFlagCasingQuantityThree','qaFlagCasingUnitThree','qaFlagCasingQuantityFour',
    'qaFlagCasingUnitFour','qaFlagCasingQuantityFive','qaFlagCasingUnitFive','placedQuantityNot','placedPackagesNot','placedGrossWeightNot',
    'placedNetWeightNot','placedVolumeNot','placedPackQuantityNot','placedPackQuantityTwoNot','placedPackQuantityThreeNot','placedPackQuantityFourNot',
    'placedPackQuantityFiveNot','warehouseId','warehouseCode','warehouseName','areaId',
    'areaCode','areaName','blockId','blockCode','blockName'
    ]);

WWarehouse=HTUtil.createRecord(
	['warehouseCode','warehouseName','description','location','area',
	'volume','custodian','contact','tel','fax','status']);
WArea=HTUtil.createRecord(
	['areaCode','areaName','areaType',
	 'warehouseId','warehouseCode','warehouseName']);
WBlock=HTUtil.createRecord(
		['blockCode','blockName','blockNameEn','areaId','areaCode',
		'areaName','inAreaId','inAreaCode','inAreaName','outAreaId','outAreaCode','outAreaName',
		'blockType','blockLength','blockWidth','blockHeight','blockRow','blockCol','blockLayer',
		'blockX','blockY','blockZ','blockGroup','maxWeight','maxQuantity','maxVolume','maxPallet',
		'cargoMixFlag','batchMixFlag','remark',
		'shelvesOrder','pickOrder','locationUsing','locationAttribute','locationProcessing','turnoverDemand','inventoryCondition',
		'localGroup1','localGroup2','maxWeight','maxArea','coordinateZ','storeTypeId','storeTypeName','locationBarCode','status',
		'warehouseId','warehouseCode','warehouseName',
		'nowQuantity','nowPackages','nowGrossWeight','nowNetWeight','nowVolume','nowMeasure']);

WCargo=HTUtil.createRecord(
	['skuNo','cargoName','cargoNameEn','categoryId','categoryCode','categoryName',
	 'p1UnitId','p1UnitName','p1Quantity','p1L','p1W','p1H','p1GW','p1NW','p1V',
	 'p2UnitId','p2UnitName','p2Quantity','p2L','p2W','p2H','p2GW','p2NW','p2V',
	 'p3UnitId','p3UnitName','p3Quantity','p3L','p3W','p3H','p3GW','p3NW','p3V',
	 'p4UnitId','p4UnitName','p4Quantity','p4L','p4W','p4H','p4GW','p4NW','p4V','inUnitValue','outUnitValue',
	 'cargoOwnerId','cargoOwnerName','specification',
	 'packageId','packageName','packageEn','packageCh',
	 'length','width','height','measure','grossWeight',
	 'netWeight','price','pickRule','allotRule','preAllotRule','warehouseId','warehouseCode','warehouseName','areaId',
	 'areaCode','areaName','blockId','blockCode','blockName','stockMax','stockMin','appendNum',
	 'hsCode','temperatureMin','temperatureMax','msdsCode',
	 {name:'isDangerous',type:'boolean',convert:function(v){return v==1;}},
	 {name:'isRefrigeration',type:'boolean',convert:function(v){return v==1;}},
	 {name:'isEntity',type:'boolean',convert:function(v){return v==1;}},
	 {name:'isDisabled',type:'boolean',convert:function(v){return v==1;}},
	 'numUnitId','numUnitName','wUnitId','wUnitName','lUnitId','lUnitName',
	 'inUnitId','inUnitName','outUnitId','outUnitName',
	 'printUnitId','printUnitName','unitId','unitName','unitNum','chargeType','remark',
	 'vUnitId','vUnitName','volume','mUnitId','mUnit','pUnitId','pUnitName','pQuantity','cargoAttribute','cargoBrand','safeDays','cargoColor','cargoType'
	 ]);
WStorageNote=HTUtil.createRecord(
	['consBizType','storageNoteNo',
	 {name:'storageDate',type:'date',dateFormat:'Y-m-d'},
	 'storageType','orderNo','contractNo','cargoOwnerId','cargoOwnerCode','cargoOwnerName',
	'refNo','consId','consNo','custId','custName',
	'custContact','custTel','custFax','settlementObjectId','settlementObjectName',
	'settlementObjectContact','settlementObjectTel',
	{name:'planedTime',type:'date',dateFormat:'Y-m-d'},
	{name:'actureTime',type:'date',dateFormat:'Y-m-d'},
	'operatorId','operatorName','warehouseId','warehouseCode','warehouseName','productionNo','batchNo','unitId',
	'unitName','quantity','wUnitId','wUnitName','grossWeight',
	'netWeight','measure','custRequirement','loadAddress','masterTransNo',
	'transNo','blNo','pol','pod','destination','countryOfOrigin','countryOfGoal',
	'tankNum','tankType',
	{name:'loadDate',type:'date',dateFormat:'Y-m-d'},
	'pateId','pateName','pateRemark','deliName','deliRemark',
	'cargoValue','currCode','status','remark',
	'storageClassId','storageClass','entrustNo',
	'orderStatus','audiStatus', 'containerQuantity','accountId','accountCode','accountName','accountContact',
	'invoiceNo','volume','vUnitId','vUnitName','storageFlag',
	'sumR','sumP','grossProfit','grossProfitRate','sumRUsd',
	'sumRUsdInvoice','sumRUsdWriteOff','sumRCny',
	'sumRCnyInvoice','sumRCnyWriteOff','sumPUsd','sumPUsdInvoice','sumPUsdWriteOff','sumROther','sumPOther',
	'sumPCny','sumPCnyInvoice','sumPCnyWriteOff','editable','actionGategoryId','actionGategory',
	'truckType','truckNumber','driver','transCarrierId','transCarrier','transRemarks'
	
	]);
WStorageNoteCargo=HTUtil.createRecord([
    'storageNoteId','storageNoteNo','cargoId','skuNo','cargoName','specification','cargoType','cargoColor',
   	'warehouseId','warehouseCode','warehouseName','areaId','areaCode','areaName','blockId','blockCode','blockName',
   	'receivedId','receivedNo','batchNo','unitPrice','cargoOwnerName','status','storageType',
   	//@Transient
	'custId','custName',{name:'actureTime',type:'date',dataFormat:'Y-m-d'},'orderNo','entrustNo',
	
	'unitId','unitName','quantity','planedQuantity','adjustQuantity','receivedQuantity','placedQuantity',
	'allotQuantity','pickedQuantity','sendQuantity','damageQuantity',
	'pUnit','pUnitId','planedPackages','packages','pickedPackages','damagePackages','sendPackages',
    'wUnitId','wUnitName','grossWeight','netWeight','planedGrossWeight','planedNetWeight',    
    'pickedGrossWeight','pickedNetWeight','damageGrossWeight','damageNetWeight','sendGrossWeight','sendNetWeight',
    'vUnitName','vUnitId','planedVolume','volume','pickedVolume','damageVolume','sendVolume',
    'mUnitName','mUnitId','planedMeasure','measure','receivedMeasure','pickedMeaSure',
    'damageMeaSure','sendMeaSure',
    'distGrossWeight','distNetWeight','distMeasure','distVolume','distQuantity','distPackages',
    'packId','packName','planPack','planPackTwo','planPackThree','planPackFour','planPackFive',
    'dismantlingQuantity','standardQuantity','standardGrossWeight','standardNetWeight','standardVolume','standardMeasure',
    
	'brand','inChargesUnit','inChargesUnitId','outChargesUnit', 'outChargesUnitId',
	 
	 'planedCasing1','casing1','c1UnitName','c1UnitId',
	 'planedCasing2','casing2','c2UnitName','c2UnitId',
	 'planedCasing3', 'casing3','c3UnitName','c3UnitId',
	 'planedCasing4','casing4','c4UnitName','c4UnitId',
	 'planedCasing5','casing5','c5UnitName','c5UnitId',
	 'leavePlanedQuantity','leavePlanedPackages','leavePlanedGrossWeight','leavePlanedNetWeight','leavePlanedMeasure','leavePlanedVolume',
	 'leaveQuantity','leavePackages','leaveGrossWeight','leaveNetWeight','leaveMeasure','leaveVolume',
	 'qualityVontrolId','qualityVontrolNo','placedId','placedNo','qaFlagType','barCode',
	 'qaFlagQuantity','qaFlagPackages','qaFlagGrossWeight','qaFlagNetWeight','qaFlagVolume','qaFlagCasingQuantity','qaFlagCasingUnit',
	 'trayType','trayQuantity','qaFlagData','qaFlagOperatorName',
	 'placedPackages','placedGrossWeight','placedNetWeight','placedVolume',
	 'placedPackQuantity','placedPackQuantityTwo','placedPackQuantityThree','placedPackQuantityFour','placedPackQuantityFive',
	 
	 'receivedPackages','receivedGrossWeight','receivedNetWeight','receivedVolume',
	 'receivedPackQuantity','receivedPackQuantityTwo','receivedPackQuantityThree','receivedPackQuantityFour','receivedPackQuantityFive',
	 'storageNoteOutQuantity','storageNoteOutPackages','storageNoteOutWeight','storageNoteOutNetWeight','storageNoteOutVolume',
	 'storageNoteOutpack','storageNoteOutpackTwo','storageNoteOutpackThree','storageNoteOutpackFour','storageNoteOutpackFive',
	 'productNo',
	{name:'productDate',type:'date',dateFormat:'Y-m-d'},
	{name:'qaFlag',type:'boolean',convert:function(v){return v==1;}},
	'qaType','qualityType','qaDescription','qaNo','sampleRate',
	'sampleNum','loadingaddress','unloadingaddress','typepayment','loadingaddress','unloadingaddress','typepayment','goodsrule','remarks'
   ]);
WReceivedCargo=HTUtil.createRecord(
 ['storageNoteId','storageNoteNo','storageNoteCargoId',
   'cargoId','skuNo','cargoName','specification',
   	'warehouseId','warehouseCode','warehouseName',
   	'areaId','areaCode','areaName','blockId','blockCode','blockName',
   	'batchNo','status','orderNo','qualityType',
   	'cargoOwnerId','cargoOwnerName',
   	
 	'unitId','unitName','wUnitId','mUnitId','vUnitId','pUnitId','pUnit','wUnitName','mUnitName',
 	'vUnitName','packUnitId','packUnitName',
 	'quantity','packages','grossWeight','netWeight','volume','measure','packQuantity',
 	'damagedQuantity',
 	'placedQuantity','placedGrossWeight','placedNetWeight','placedVolume','placedMeasure','placedPackages','placedPackQuantity',
 	
 	'unQaQuntity','unQaPackages','unQaGrossWeight','unQaNetWeight','unQaVolume','unQaMeasure',
 	'qaQuntity','qaPackages','qaGrossWeight','qaNetWeight','qaVolume','qaMeasure',
 	'planedQuantity','planedPackages','planedGrossWeight','planedNetWeight','planedVolume','planedMeasure','planedPackQuantity',
 	'receivedQuantity','receivedGrossWeight','receivedNetWeight','receivedVolume','receivedMeasure','receivedPackages','receivedPackQuantity',
 	'packName','packNameTwo','packNameThree','packNameFour','packNameFive',
 	'unitNum','unitNumTwo','unitNumThree','unitNumFour','unitNumFive',
 	'unReceviedQuantiy','unReceviedPackages','unReceviedGrossWeight','unReceviedNetWeight','unReceviedVolume',
 	'unReceivedUnitNum1','unReceivedUnitNum2','unReceivedUnitNum3','unReceivedUnitNum4','unReceivedUnitNum5',
 	'leavePlanedQuantity','leavePlanedPackages','leavePlanedGrossWeight','leavePlanedNetWeight','leavePlanedVolume',
 	'leaveUnitNum1','leaveUnitNum2','leaveUnitNum3','leaveUnitNum4','leaveUnitNum5',
 	'standardPackages','standardGrossWeight','standardNetWeight','standardVolume','standardMeasure','standardQuantity',
 	'palletQuantity',
 	'productNo',{name:'productDate',type:'date',dateFormat:'Y-m-d'},
 	{name:'effectiveDate',type:'date',dateFormat:'Y-m-d'},
 	{name:'receivedDate',type:'date',dateFormat:'Y-m-d'},
 	{name:'placedDate',type:'date',dateFormat:'Y-m-d'},
 	'remarks']);
WPlacedCargo=HTUtil.createRecord(
	['selectFlag','storageNoteId','storageNoteNo','storageNoteCargoId','receivedCargoId',
	 'cargoId','skuNo','cargoName','specification','cargoType','cargoColor',
	 'custId','custName','orderNo',
	 'blockId','blockCode','blockName','warehouseId','warehouseCode','warehouseName','areaId','areaCode','areaName',
	 
	 'notPlacedQuantity',
	 'unitId','unitName','quantity','pUnitName','pUnitId','packages','wUnitName','wUnitId','grossWeight','netWeight',
	 'vUnitName','vUnitId','volume','mUnitName','mUnitId','measure','packUnitName','packUnitId','packQuantity',
	 'placedGrossWeight','placedNetWeight','placedMeasure','placedVolume','placedQuantity','placedPackages',
	 'distGrossWeight','distNetWeight','distMeasure','distVolume','distQuantity','distPackages',
	 'pickedQuantity','pickedGrossWeight','pickedNetWeight','pickedMeasurement','pickedVolume','pickedPackages','pickedPackQuantity',
	 'lastPickedQuantity','lastPickedGrossWeight','lastPickedNetWeight','lastPickedMeasure','lastPickedVolume','lastPickedPackages','lastPickedPackQuantity',
	 'sendQuantity',
	 'nowQuantity','nowGrossWeight','nowNetWeight','nowMeasurement','nowVolume',
	 'standardQuantity','standardGrossWeight','standardNetWeight','standardVolume','standardMeasure',
	 'barCode','cargoNo','containerNo','status','placedType','batchNo',
	 'palletNo','palletQuantity','qualityType',
	 {name:'qaFlagDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'placedDate',type:'date',dateFormat:'Y-m-d'},
	 'productNo',{name:'productDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'effectiveDate',type:'date',dateFormat:'Y-m-d'},
	 {name:'receivedDate',type:'date',dateFormat:'Y-m-d'},
	 'transNoteId','transListId','custContact','planedMeasure',
	 'planedVolume','planedGrossWeight','planedNetWeight','safeDays','frozenCategoryCode','frozenCategory',
	 {name:'lastSmartCostDate',type:'date',dateFormat:'Y-m-d'},
	 'freezeName','freezeCancelName',{name:'freezetime',type:'date',dateFormat:'Y-m-d'},'statusFrozen',
	 {name:'freezeCancelTime',type:'date',dateFormat:'Y-m-d' },
	 'remarks','fromWarehouseCode',
	 'fromWarehouseId',
	 'fromWarehouseName',
	 'fromAreaCode',
	 'fromAreaId',
	 'fromAreaName',
	 'fromBlockCode',
	 'fromBlockId',
	 'fromBlockName',
	 'fromPlacedCargoId',
	 'changeDate','adjustQuantity','overdueDays'
	 ]);
WPickedCargo=HTUtil.createRecord(
	['outStorageNoteId','outStorageNoteNo','outStorageNoteCargoId',
	 'inStorageNoteId','inStorageNoteNo','inStorageNoteCargoId','placedCargoId',
	 'custId','custName','orderNo',
	 'warehouseId','warehouseCode','warehouseName',
	 'skuNo','cargoId','cargoName','specification',
	 'areaId','areaCode','areaName','blockId','blockCode','blockName','palletNo','palletQuantity',
	'packId','packName',
	'unitId','unitName','pUnitId','pUnitName','wUnitId','wUnitName','mUnitId','mUnitName','vUnitId','vUnitName',
	'packUnitId','packUnitName',
	'quantity','grossWeight','netWeight','measurement','volume','packQuantity',
	'distGrossWeight','distNetWeight','distMeasure','distVolume','distQuantity','distPackages',
	'pickedQuantity','pickedGrossWeight','pickedNetWeight','pickedMeasurement','pickedVolume','pickedPackages','pickPackQuantity',
	'sendQuantity','sendGrossWeight','sendNetWeight','sendMeasurement','sendVolume',
	'standardQuantity','standardGrossWeight','standardNetWeight','standardVolume','standardMeasure',
	'batchNo','unitPrice','status','pickedNoteCargoQuantity',
	{name:'pickedDate',type:'date',dateFormat:'Y-m-d'},
	'productNo',{name:'productDate',type:'date',dateFormat:'Y-m-d'},
	{name:'receivedDate',type:'date',dateFormat:'Y-m-d'},
	'remarks','placedType']);
WCheckNote=HTUtil.createRecord(
	['checkNoteNo','checkType',
	 {name:'startTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	 {name:'endTime',type:'date',dateFormat:'Y-m-d H:i:s'},'custId','custName',
	 'orderNo','warehouseId','warehouseCode','warehouseName','areaId',
	 'areaCode','areaName','blockId','blockCode','blockName','batchNo',
	 {name:'productDate',type:'date',dateFormat:DATEF},
	 'checkerId','checkName','doubleCheckId','doubleCheckerName',
	'status','blockLayer','blockRow','blockCol',
	'productNo','cargoName'
	]);
WCheckList=HTUtil.createRecord(
	['storageNoteNo','checkNoteId','checkNoteNo','custId','custName',
	 'cargoId','cargoName','skuNo',
	 'warehouseId','warehouseCode','warehouseName','areaId',
	 'areaCode','areaName','blockId','blockCode','blockName','accountQuantity',
	 'checkQuantity','lossQuantity','adjustQuantity','adjustReason','adjustPerson','adjustTime',
	 'unitId','unitName','wUnitId','wUnitName','grossWeight','newProductNo','newProductNo',
	 'netWeight','batchNo','lossOrProfit','storageNoteCargoId','storageNoteId','placedCargoId','productNo','adjustOver']);

WCheckCargo=HTUtil.createRecord(
		['checkId','skuNo','cargoName','cargoNameEn','categoryName',
		'specification','cargoColor','cargoBrand','cargoType']);

WTransNote=HTUtil.createRecord(
	['transNoteNo','transType','transBy','checkerId','checkerName','checkComments',
	'status',{name:'transDate',type:'date',dateFormat:'Y-m-d'},{name:'checkTime',type:'date',dateFormat:'Y-m-d'}]);
WTransList=HTUtil.createRecord(
	['transNoteId','placedCargoId','cargoId','skuNo','cargoName',
	 'fromWarehouseId','fromWarehouseCode','fromWarehouseName',	
	'fromAreaId','fromAreaCode','fromAreaName',
	'fromBlockId','fromBlockCode','fromBlockName',
	'toWarehouseId','toWarehouseCode','toWarehouseName',	
	'toAreaId','toAreaCode','toAreaName',
	'toBlockId','toBlockCode','toBlockName',
	'status',
	{name:'oldQuantity',type:'float'},{name:'transQuantity',type:'float'}]);
WOperationForm=HTUtil.createRecord(
	['operationNo','operationType','operationDate','custId','custName',
	 'warehouseId','warehouseName','storageNoteNo',
	 'checkerId','checkName','checkTime','checkComments','remarks',
	'status']);
WOperationList=HTUtil.createRecord(
	['operationId','contractNo',
	'cargoId','skuNo','cargoName','operationTypeId','operationTypeCode','operationTypeName',
	'operationFeeRate','operationUnitId','operationUnitName','operationQuantity',
	'operationHours','feeAmount','unitId','unitName',
	'quantity','wUnitId','wUnitName','grossWeight',
	'netWeight','measurement','vendorId','vendorName','status']);
WOperationType=HTUtil.createRecord(
	['operationTypeCode','operationTypeName','unitId','unitName','feeRate']);

WRate=HTUtil.createRecord(
	['rateCode','rateName','charId','charCode','charName',{name:'minQuantity',type:'float'},
	 'unit',	'unitName','rateType',
	{name:'fromDate',type:'date',dateFormat:DATEF},
	{name:'unitPrice',type:'float'},'currCode','warehouseType',
	{name:'costInFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'strongInFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'strongOutFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'strongInsideFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'strongOtherFlag',type:'boolean',convert:function(v){return v==1;}},
	'freeTime',
	'cargoOwnerId','cargoOwner','placedCargoId','receviedCargoId','storageNoteId',
	'storageNoteCargoId','pickedCargoId','categoryName','accountId',
	'accountName','quantity','storageFlag','checkBy','checkTime']);

WRateSheet=HTUtil.createRecord([
    'cargoCategoryId','categoryCode','categoryName','cargoId','skuNo','cargoName','rateId','puuid'
     ]);

WRateRecord=HTUtil.createRecord([
	'rateId','fromDate','endDate',{name:'unitPrice',type:'float'},'recordType','puuid'
	 ]);

WRateCust=HTUtil.createRecord([
 	'contractId','custId','custCode','custName','puuid','contractNo',
 	 {name:'fromDate',type:'date',dateFormat:DATEF},
	 {name:'endDate',type:'date',dateFormat:DATEF},
	 {name:'pateDate',type:'date',dateFormat:DATEF},'remark'
 	 ]);

WCargoCategory=HTUtil.createRecord(
		['categoryCode','categoryName','parentId','parentCode','parentName','puuid']);

WStockTaking=HTUtil.createRecord(
		['stockTakingNo','stockClass','stockClassId',
		 {name:'stockDate',type:'date',dateFormat:DATEF},
		 'stockBy','warehouseId','warehouseCode','warehouseName','stockStatus',
		 'custId','custCode','custName','cargoId','cargoName','custNo','orderNo',
		 'fromBlockId','fromBlockCode','fromBlockName','endBlockId','endBlockCode','endBlockName',
		 'fromAreaId','fromAreaCode','fromAreaName','endAreaId','endAreaCode','endAreaName',
		 {name:'fromDate',type:'date',dateFormat:DATEF},
		 {name:'endDate',type:'date',dateFormat:DATEF},
		 'remarks']);

WStockTakingList=HTUtil.createRecord(
		['warehouseId','warehouseCode','warehouseName','custId','custCode','custName',
		 'cargoId','cargoName','blockId','blockCode','blockName','areaId','areaCode','areaName',
		 'bookQuantity','wUnitId','wUnitName','grossWeight','measurement',
		 'realQuantity','realWeight','realMeasurement','remarks','stockTakingId']);

WInventory=HTUtil.createRecord(
		['cargoName','cargoId','skuNo','storageNoteNo','storageNoteId',
         {name:'storageDate',type:'date',dateFormat:DATEF},
         'blockName','blockLayer',
         ' blockCode','blockId','areaCode','areaName','areaId','warehouseCode','warehouseId',
         'warehouseName','cargoOwner','cargoOwnerId','custName','custId','cargoType','cargoBrand','categoryName',
         'accountName','accountId','quantity','qUnitName','qUnitId',
         'pUnitId','pUnitName','packages','netWeight','grossWeight',
         'wUnitName','wUnitId','volume','vUnitName','vUnitId','measure',' mUnitName','mUnitId','stockDays',
         'orderNo','batchNo','warehouseProperty','entrustNo','productNo',
         {name:'productDate',type:'date',dateFormat:DATEF},'goodRule','cargoAges','cargoProperty',
         'bornQuantity','remarks','supplier','operator','placedName','opType','realSignName','bornRemarks',                                
         'retalFlag','stockDaysAnalysis',
         {name:'placedDate',type:'date',dateFormat:DATEF},
         {name:'receivedDate',type:'date',dateFormat:DATEF},
         {name:'actureTime',type:'date',dateFormat:DATEF},
         'placedCargoId','receivedCargoId','pickedCargoId','storageNoteCargoId','aaa','bbb','unitNameQuantity',
         'unitNameWeight','status']);

WSmartExpense=HTUtil.createRecord([ 
        'rateId','rateMode','accountId','accountName','custId','custName','charId','charName','charNameEn',
        'unitName',
        {name:'unitPrice',type:'float'},{name:'num',type:'float'},{name:'amount',type:'float'},'currCode',
        {name:'exRate',type:'float'},
        {name:'fromDate',type:'date',dateFormate:'Y-m-d'},
        {name:'endDate',type:'date',dateFormat:'Y-m-d'},
        {name:'ownerMonth',type:'date',dataFormat:'Y-m'},
        'storageNoteId','storageNoteNo','receivedCargoId','placedCargoId','pickedCargoId',
        'exportFlag','expenseId','expeType','remarks','cargoName']);

WProcess=HTUtil.createRecord([
	  'homeworkNo','singleNo','storageName','shipper','homeworkType','wProcessId','approver','approverType',
	  'approverIdea','wprocessClassId',{name:'approverTime',type:'date',dateFormat:DATEF},'remarks']);


WProcessItem=HTUtil.createRecord([
      'contractNo','prodectName','prodectNo','homeworkName','homeworkCode','homeworkRate','homeworkUnit',
      'homeworkQuantity','workHours','sumNum','quantity','unitQuantity','weight','unitWeight','bulk',
      'unitBulk','number','unitNumber','wProcessId','unitProvide','puuid']);

WPackage=HTUtil.createRecord([
      'packageName','packageCh','packageEn','mainQuantity','innerQuantity','boxQuantity','palletQuantity',
      'otherQuantity','discriptionMainType','discriptionInnerType','discriptionBoxType','discriptionPalletType',
      'discriptionOtherType','lengthMain','lengthInner','lengthBox','lengthPallet','lengthOther',
      'weightMain','weightInner','weightBox','weightPallet','weightOther',
      'widthMain','widthInner','widthBox','widthPallet','widthOther','heightMain','heightInner','heightBox',
      'heightPallet','heightOther','volumeMain','volumeInner','volumeBox','volumePallet','volumeOther',
      {name:'replenishMain',type:'boolean',convert:function(v){return v==1;}},{name:'replenishInner',type:'boolean',convert:function(v){return v==1;}},
      {name:'replenishBox',type:'boolean',convert:function(v){return v==1;}},{name:'replenishPallet',type:'boolean',convert:function(v){return v==1;}},
      {name:'replenishOther',type:'boolean',convert:function(v){return v==1;}},{name:'containerMain',type:'boolean',convert:function(v){return v==1;}},
      {name:'containerInner',type:'boolean',convert:function(v){return v==1;}},{name:'containerBox',type:'boolean',convert:function(v){return v==1;}},
      {name:'containerPallet',type:'boolean',convert:function(v){return v==1;}},{name:'containerOther',type:'boolean',convert:function(v){return v==1;}},
      {name:'inLabelMain',type:'boolean',convert:function(v){return v==1;}},{name:'inLabelInner',type:'boolean',convert:function(v){return v==1;}},
      {name:'inLabelBox',type:'boolean',convert:function(v){return v==1;}},{name:'inLabelPallet',type:'boolean',convert:function(v){return v==1;}},
      {name:'inLabelOther',type:'boolean',convert:function(v){return v==1;}},{name:'outLabelMain',type:'boolean',convert:function(v){return v==1;}},
      {name:'outLabelInner',type:'boolean',convert:function(v){return v==1;}},{name:'outLabelBox',type:'boolean',convert:function(v){return v==1;}},
      {name:'outLabelPallet',type:'boolean',convert:function(v){return v==1;}},{name:'outLabelOther',type:'boolean',convert:function(v){return v==1;}},
      'palletCargoLength','palletCargoWeight','palletCargoHeight','ti','hi']);

WContractRate=HTUtil.createRecord([
       'contractId','cargoId','skuNo','cargoName','charId','charCode','charName',
       {name:'costInFlag',type:'boolean',convert:function(v){return v==1;}},
       {name:'costOutFlag',type:'boolean',convert:function(v){return v==1;}},'pateName','unitId','unitCode','unitName',
       {name:'unitPrice',type:'float'},'currCode','unitTime','remark']);

/*
 *  
 */
var getWMSPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});
	var panels=[];
	
	//入库管理
	var items=[];		
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD))
		//新增入库单
		items[items.length]=FosMenu(panel,C_IN_NOTE_ADD,'IN_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				storageDate:new Date(),
				planedTime:new Date(),
				compCode:sessionStorage.getItem('COMP_CODE'),
				userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('IN_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('IN_CARGO_OWNER_NAME'),
				status:0,
				storageType:0,
				rowAction:'N'});
			return new Fos.StorageNotePanel(p);
		});	
	//
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN))
		//入库单列表
		items[items.length]=FosMenu(panel,C_IN_NOTE_LIST,'IN_NOTE_LIST',function(){return new Fos.StorageNoteGrid(0);});	
	if(HR(M1_WMS))
		//入库明细列表
		items[items.length]=FosMenu(panel,'入库查看','SHOW_PLACED_AND_PICKED',function(){return new Fos.ShowPlacedAndPickedCargoTab();});

	//冻结货物
	if(HR(M1_WMS))
		items[items.length]=FosMenu(panel,'冻结货物','FREEZE_START',function(){
			var a=new WPlacedCargo({rowAction:'M',statusFrozen:0});
			return new Fos.FrozenStoragePanel(a);});
	//取消冻结
	if(HR(M1_WMS))
		items[items.length]=FosMenu(panel,'取消冻结','FREEZE_STOP',function(){
			var a=new WPlacedCargo({rowAction:'M',statusFrozen:1});
			return new Fos.FrozenStoragePanel(a);});
	
	
	//入库panel title:入库管理
	var inPanel = new Ext.Panel({title:C_IN_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	panels[panels.length]=inPanel;
	
	//出库管理
	items=[];
	//新增出库单
	if(HR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD))
		items[items.length]=FosMenu(panel,C_OUT_NOTE_ADD,'OUT_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				planedTime:new Date(),userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('OUT_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('OUT_CARGO_OWNER_NAME'),
				storageDate:new Date(),status:0,storageType:1,rowAction:'N'});
			return new Fos.StorageNoteOutPanel(p);
		});
	//出库单列表
	if(HR(M1_WMS+WM_NOTEOUT+WMI_OUT))
		items[items.length]=FosMenu(panel,C_OUT_NOTE_LIST,'OUT_NOTE_LIST',function(){return new Fos.StorageNoteOutGrid(1);});	
	
	
	//出库panel title:出库管理
	var outPanel = new Ext.Panel({title:C_OUT_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	panels[panels.length]=outPanel;
	
	//库存管理
	items=[];
	if(HR(M1_WMS))		
		items[items.length]=FosMenu(panel,'库存交易','InventoryBusiness',function(){			
			return new Fos.InventoryBusinessTab();});
	
	if(HR(M1_WMS+WM_NOTE+WMI_CHECK+WF_ADD))		
		items[items.length]=FosMenu(panel,C_CHECK_NOTE_ADD,'CHECK_NOTE_ADD',function(){
			var p = new WCheckNote({uuid:HTUtil.UUID(32),status:0,rowAction:'N'});
			return new Fos.CheckNotePanel(p);});
	
	if(HR(M1_WMS+WM_NOTE+WMI_CHECK))
		items[items.length]=FosMenu(panel,"盘点历史",'CHECK_NOTE_LIST',function(){return new Fos.CheckNoteGrid();});
	if(HR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_ADD))		//移库单(新增部分)
		items[items.length]=FosMenu(panel,'新增移库','TRANS_NOTE_ADD2',function(){
			var p=new WTransNote({uuid:HTUtil.UUID(32),status:0,transDate:new Date(),rowAction:'N'});
			return new Fos.TransNotePanel(p,1);});	
	if(HR(M1_WMS))		//移库单
		items[items.length]=FosMenu(panel,"移库历史",'TRANS_NOTE_LIST',function(){return new Fos.TransNoteListGrid();});
	
	
	
	var checkPanel = new Ext.Panel({title:C_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	panels[panels.length]=checkPanel;

	
	//决策中心
	items=[];
	
	items[items.length]=FosMenu(panel,'入库日报表','CARGO_IN_REPORT1',function(){return new Fos.CargoInReportTab(1,'入库日报表');});
	items[items.length]=FosMenu(panel,'入库汇总表','CARGO_IN_REPORT7',function(){return new Fos.CargoInReportTab(2,'入库汇总报表');});
	items[items.length]=FosMenu(panel,'入库统计表','CARGO_IN_REPORT8',function(){return new Fos.CargoInReportTab(3,'入库统计报表');});
	items[items.length]=FosMenu(panel,'移库汇总表','CARGO_IN_REPORT6',function(){return new Fos.CargoInReportTab(4,'移库汇总报表');});
	
	items[items.length]=('————————');
	
	if(HR(M1_WMS+WM_NOTEOUT+WMI_PICKED+WF_LIST))	
	items[items.length]=FosMenu(panel,'出库日报表','CARGO_OUT_REPORT1',function(){return new Fos.CargoOutReportTab(1,'出库日报表','CARGO_OUT_REPORT1');});
	items[items.length]=FosMenu(panel,'出库汇总表','CARGO_OUT_REPORT2',function(){return new Fos.CargoOutReportTab(2,'出库汇总报表','CARGO_OUT_REPORT2');});
	items[items.length]=FosMenu(panel,'出库统计表','CARGO_OUT_REPORT3',function(){return new Fos.CargoOutReportTab(3,'出库统计报表','CARGO_OUT_REPORT3');});
	items[items.length]=('————————');
	if(HR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_SEARCH))
	
	items[items.length]=FosMenu(panel,'入库栈板查询','PALLET_SEARCH1',function(){return new Fos.PalletPanel(1,'入库栈板查询');});
	items[items.length]=FosMenu(panel,'出库栈板查询','PALLET_SEARCH2',function(){return new Fos.PalletPanel(2,'出库栈板查询');});
	items[items.length]=FosMenu(panel,'出入库栈板统计','PALLET_SEARCH3',function(){return new Fos.PalletPanel(3,'出入库栈板统计');});
	items[items.length]=('————————');
	if(HR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_SEARCH))
		items[items.length]=FosMenu(panel,'库存综合查询','INVENTORY_SEARCH',function(){return new Fos.InventorySearchPanel(1);});
	    items[items.length]=FosMenu(panel,'库存汇总表','INVENTORY_SEARCH',function(){return new Fos.InventorySummaryTab(2);});
	    items[items.length]=FosMenu(panel,'库存统计表','INVENTORY_SEARCH',function(){return new Fos.InventorySummaryTab(3);});
		
	var decisionCenterPanel=new Ext.Panel({title:W_DECISION_CENTER,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	panels[panels.length]=decisionCenterPanel;
	
	//基础资料
	items=[];
	if(HR(M1_WMS+WM_BASE+M2_WAREHOUSE+WF_LIST))
		items[items.length]=FosMenu(panel,C_WAREHOUSE,'WAREHOUSE',function(){return new Fos.WarehouseGrid();});
	if(HR(M1_WMS+WM_BASE+M2_AREA+WF_LIST))
		items[items.length]=FosMenu(panel,C_AREA,'AREA',function(){return new Fos.WAreaGrid();});
	if(HR(M1_WMS+WM_BASE+M2_BLOCK+WF_LIST))
		items[items.length]=FosMenu(panel,C_BLOCK,'BLOCK',function(){return new Fos.BlockPanel();});
	if(HR(M1_WMS+WM_BASE+M2_CATEGORY+WF_LIST))
		items[items.length]=FosMenu(panel,C_CARGO_CATEGORY,'CATEGORY',function(){return new Fos.CategoryPanel();});
	if(HR(M1_WMS+WM_BASE+M2_CARGO+WF_LIST))
		items[items.length]=FosMenu(panel,C_CARGO,'CARGO',function(){return new Fos.CargoPanel();});
	if(HR(M1_WMS+WM_BASE+M2_RATE+WF_LIST))
		items[items.length]=FosMenu(panel,'费率管理','RATE',function(){return new Fos.RatePanel();});
	
	
	var genPanel = new Ext.Panel({title:C_MASTER_DATA,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	panels[panels.length]=genPanel;
	
	var menuPanel = new Ext.Panel({region:"west",width:"130",collapsible:true,collapseMode:'mini',split:true,
		layout:'accordion',title:C_SYSTEM_MENU,items:panels});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	
	return contPanel;
};

Fos.getStdQuantity=function(unitId,r){
	var res=[];
	res[0]=1;
	res[1]=0;
	res[2]=0;
	res[3]=0;
	res[4]=-1;
	res[5]='';
	
	if(unitId!=null){
		if(unitId==r.get('pUnitId')){
			res[0]=HTUtil.round2(r.get('pQuantity'));
			res[1]=HTUtil.round2(r.get('grossWeight'));
			res[2]=HTUtil.round2(r.get('netWeight'));
			res[3]=HTUtil.round4(r.get('volume'));
			res[4]=r.get('pUnitId');
			res[5]=r.get('pUnitName');
		}
		else if(unitId==r.get('p1UnitId')){
			res[0]=HTUtil.round2(r.get('p1Quantity'));
			res[1]=HTUtil.round2(r.get('p1GW'));
			res[2]=HTUtil.round2(r.get('p1NW'));
			res[3]=HTUtil.round4(r.get('p1V'));
			res[4]=r.get('p1UnitId');
			res[5]=r.get('p1UnitName');
		}
		else if(unitId==r.get('p2UnitId')){
			res[0]=HTUtil.round2(r.get('p2Quantity'));
			res[1]=HTUtil.round2(r.get('p2GW'));
			res[2]=HTUtil.round2(r.get('p2NW'));
			res[3]=HTUtil.round4(r.get('p2V'));
			res[4]=r.get('p2UnitId');
			res[5]=r.get('p2UnitName');
		}
		else if(unitId==r.get('p3UnitId')){
			res[0]=HTUtil.round2(r.get('p3Quantity'));
			res[1]=HTUtil.round2(r.get('p3GW'));
			res[2]=HTUtil.round2(r.get('p3NW'));
			res[3]=HTUtil.round4(r.get('p3V'));
			res[4]=r.get('p3UnitId');
			res[5]=r.get('p3UnitName');
		}
		else if(unitId==r.get('p4UnitId')){
			res[0]=HTUtil.round2(r.get('p4Quantity'));
			res[1]=HTUtil.round2(r.get('p4GW'));
			res[2]=HTUtil.round2(r.get('p4NW'));
			res[3]=HTUtil.round4(r.get('p4V'));
			res[4]=r.get('p4UnitId');
			res[5]=r.get('p4UnitName');
		}			
	}
	
	return res;
};

