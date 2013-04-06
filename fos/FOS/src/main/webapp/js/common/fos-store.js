Ext.namespace('HT.store');
Ext.namespace('TMS');
QParam = Ext.data.Record.create(['key','op','value']); 


CShipper = Ext.data.Record.create(['shipperName','shipperAddress','shipperContact',
   'shipperTel','shipperMobile','shipperProvince','shipperCity']);

FWarehouse = HTUtil.createRecord([
	'wareNo','consId','consNo','wareVessel','wareVoyage','wareMblNo',	
	'wareTotalPackages','wareTotalGrossWeight','wareTotalMeasurement','packName',
	'wareType',{name:'wareDate',type:'date',dateFormat:DATEF},
	{name:'wareBookDate',type:'date',dateFormat:DATEF},
	'wareVendorId','wareVendorName','wareVendorContact','wareVendorTel','wareVendorFax',
	'wareOperator','wareOperatorTel','wareOperatorFax',
	'wareCustomerContact','wareCustomerTel','wareCustomerFax',
	'wareAcceptStatus',{name:'wareAcceptDate',type:'date',dateFormat:DATEF},'wareRefNo',
	'wareTransVendor','wareTransVendorName','wareTrackNo',
	{name:'wareLoadFlag',type:'boolean',convert:function(v){return v==1;}},
	'wareContainerNo','wareRemarks','warePackageNum','wareCargoName','wareGrossWeight',
	'wareNetWeight','wareMeasurement']);
FWarehouseCargo = HTUtil.createRecord([
	'wareId','consId','wacaCargoName','wacaCargoMarks',
	'packName','wacaPackagesNum','wacaGrossWeight','wacaNetWeight','wacaMeasurement']);
FInspection = HTUtil.createRecord(['consNo','consBizClass','consBizType',
	{name:'consDate',type:'date',dateFormat:DATEF},
	'oriConsId','oriConsNo',
	'custId','custName','custSname','custContact','custTel','custFax','custCustomsCode',
	'grouId','grouName','salesRepId','salesRepName','operatorId','operatorName',
	'inspNo','inspRefNo','inspVendorId','inspVendorName','inspVendorContact','inspVendorTel','inspVendorFax',
	{name:'inspDate',type:'date',dateFormat:DATEF},
	'inspShipperEn','inspShipperCn','inspConsigneeEn','inspConsigneeCn','cargoName','inspHsNo',
	'inspMadeIn','inspNum','inspValue','inspRequirement','inspCargoName',
	'inspPackages','inspConveyance','inspTradeType','inspCargoAddress','inspContractNo','inspCreditNo','inspUsage',
	{name:'inspShippingDate',type:'date',dateFormat:DATEF},
	{name:'inspClaimDate',type:'date',dateFormat:DATEF},
	'inspTradeCountry','inspCertificateNo','inspPol','inspPod','inspPot',
	'inspRegisterNo','inspContainerInfo','inspSpecialTerm','inspMarks',
	{name:'inspReceiveDate',type:'date',dateFormat:DATEF},'inspReceiver','inspStatus',	
	'inspPassNo','inspNoteNo',
	{name:'inspStartDate',type:'date',dateFormat:DATEF},
	{name:'inspCompleteDate',type:'date',dateFormat:DATEF},'inspCheckFlag','inspRemarks',
	{name:'contractReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'invoiceReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'packingListReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'factoryInspReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'creditReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'blReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'licenceReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'packagesInspReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'qualityRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'weightRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'quantityRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'veterinaryRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'healthRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'sanitationRequired',type:'boolean',convert:function(v){return v==1;}},	
	{name:'animalRequired',type:'boolean',convert:function(v){return v==1;}},
	{name:'docReceivedDate',type:'date',dateFormat:DATEF},
	'cudeAttachedDocs','otherDocs','cudeRequirement','remarks']);
FDo = HTUtil.createRecord(['doNo','hblNo','consId','consNo',
  	'doConsignee','doPort','doHarbour',
  	{name:'doArriveDate',type:'date',dateFormat:DATEF},
  	'doVessel','doVoyage','doWarehouseId',
  	'doWarehouseName','doWarehouseContact','doWarehouseTel','doWarehouseAddress',
  	{name:'doInDate',type:'date',dateFormat:DATEF},
  	{name:'doOutDate',type:'date',dateFormat:DATEF},
  	'doContainerNo','doMarks','doCargoName','doCargoDirection','packName',
  	'doPackages','doGrossWeight','doNetWeight','doMeasurement','doRemarks','doStatus']);
FDoc = HTUtil.createRecord(['fdocNo','consId','exprNo','consNo','consBizClass','consShipType',
    'dotyId','dotyClass','dotyName','fdocTitle',
	'fdocOriginalNum','fdocCopyNum','fdocStatus',		
	{name:'fdocRecvDate',type:'date',dateFormat:DATEF},
	{name:'fdocSendDate',type:'date',dateFormat:DATEF},
	'fdocSendTo','fdocSendType','fdocSendSigner',
	{name:'fdocReturnDate',type:'date',dateFormat:DATEF},
	{name:'fdocBackDate',type:'date',dateFormat:DATEF},
	'fdocBackType','fdocBackSigner',
	{name:'fdocReturnFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'fdocBackFlag',type:'boolean',convert:function(v){return v==1;}},	
	{name:'fdocReleasableFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'alertFlag',type:'boolean',convert:function(v){return v==1;}},
	'vessName','voyaName','consSailDate','consMblNo','custName','consCargoOwnerName']);
FCustomsDeclaration= HTUtil.createRecord(['consNo','consBizClass','consBizType',
	{name:'consDate',type:'date',dateFormat:DATEF},
	'oriConsId','oriConsNo',
	'custId','custName','custSname','custContact','custTel','custFax','custCustomsCode',
	'grouId','grouName','salesRepId','salesRepName','operatorId','operatorName',
	'cudeVendorId','cudeVendorName','cargoName','hsCode',
	'cudeVendorContact','cudeVendorTel','cudePreNo','cudeCustomsNo','cudePortDomestic','cudeRecordNo',
	{name:'cudeEntryDate',type:'date',dateFormat:DATEF},
	{name:'cudeDeclarDate',type:'date',dateFormat:DATEF},
	'cudeCustomer','cudeShipper','tratCode','cudeConveyance','cudeBlNo','trtyCode','letyCode',
	'exseCode','usagCode','cudeCertificateNo','cudeLevyPercent','cudeApprovalNo',
	'consContractNo','cudeContainerNo','cudeCountry','cudePortForeign',
	'cudePlace','trteCode','cudeFreight','cudeInsurance','cudeCharge',
	'cudePackageNum','packCode','cudeGrossWeight','cudeNetWeight',
	'cudeManu','cudeMarks','cudeAttachment','cudeTaxLevy','cudeCreator','cudeCompany',
	'cudeCompanyAddress','cudeCompanyTel','cudeCompanyZip','cudeDeclarent',
	{name:'cudeCreateDate',type:'date',dateFormat:DATEF},
	{name:'cudeDocSendDate',type:'date',dateFormat:DATEF},
	{name:'cudeDocRecvDate',type:'date',dateFormat:DATEF},
	{name:'cudeRefundDate',type:'date',dateFormat:DATEF},{name:'cudeReleaseDate',type:'date',dateFormat:DATEF},
	{name:'cudeShutoutDate',type:'date',dateFormat:DATEF},
	'cudeDocNum','cudeDocColor','cudeRefundDocNum',
	{name:'cudeTransitedFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'cudeRefundFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'cudeInspectionFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'cudeOpenFlag',type:'boolean',convert:function(v){return v==1;}},	
	'cudeRemarks','cudeStatus','cudeDocStatus','cudeDocReleaseBy',
	{name:'cudeDocReleaseTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'cudeDocReceiver','cudeType',
	{name:'contractReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'invoiceReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'packingListReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'blReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'manualReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'licenceReceived',type:'boolean',convert:function(v){return v==1;}},	
	{name:'docReceivedDate',type:'date',dateFormat:DATEF},
	'cudeAttachedDocs','otherDocs','cudeRequirement','remarks']);
FCustomsEntry= HTUtil.createRecord([
	'consId','cuenNo','cuenCargoNo','cuenManuNo',
	'cuenCargoNameCn','cuenCargoNameEn','cuenCargoSpec','cuenCargoNum',
	'cuenCargoUnit','cuenCountry','cuenUnitPrice','cuenTotalPrice',
	'currCode','cuenLevyType','cuenRemarks']);
FTask= HTUtil.createRecord([
	'tatyId','tatyName','tatyDId','tatyDName','tatyOrder','consId','consNo',
	'consBizType','taskOwner','taskOwnerName',
	{name:'taskEstimatedDate',type:'date',dateFormat:DATEF},
	{name:'taskFinishedDate',type:'date',dateFormat:DATEF},
	'taskFinishedFlag','active']);
FSecondShip = HTUtil.createRecord(['consId','consNo','seshCarrier','seshVessel',
	'seshVoyage','seshBlNo','seshPot','seshPotAgency',
	{name:'seshEta',type:'date',dateFormat:DATEF},
	{name:'seshEtd',type:'date',dateFormat:DATEF},
	'seshTransNo','seshSealNo','seshRemarks']);
FRailwayBl = HTUtil.createRecord([
	'rablNo','consId','consNo','rablContractNo','custId','custName',
	'rablShipper','rablConsignee','rablNotifyParty','rablShipperNotes',
	'rablAgencyName','rablDeliveryPlace','rablStationD','rablStationT',
	{name:'rablEtd',type:'date',dateFormat:DATEF},
	'rablContainerNo','rablContainerNoO','rablContainerType','rablContainerDesc','rablContainerWeight',
	'rablChargeRemarks','rablSealNo','rablSealNo2','rablRailwayNotes','rablHsCode',
	{name:'rablSocFlag',type:'boolean',convert:function(v){return v==1;}},
	'rablInvoicePrice','rablCargoNameCn','rablCargoNameEn',
	{name:'rablBulkFlag',type:'boolean',convert:function(v){return v==1;}},
	'rablContainerStatus',
	'rablReturnPlace','currCode','rablCountry','rablPackages','packName',
	'rablCargoMarks','rablGrossWeight','rablMeasurement','rablRemarks','rablStatus']);
FFlight=HTUtil.createRecord(['flightNo','deScheduleTime','deNewTime','dePort','arScheduleTime',
    'arNewTime','arPort','flightLine','flightCode','status',{name:'fightDate',type:'date',dateFormat:'Y-m-d H:i:s'}]);
SBalance = HTUtil.createRecord(['custId','custName','custSname','currCode','balaAmount']);

SExpenseTemplate = HTUtil.createRecord(['consBizType','exteName']);
SExpenseTemplateItem = HTUtil.createRecord(['exteId','chclId','chclCode','charId','charName','charNameEn',
	{name:'expeUnitPrice',type:'float'},'expeType','currCode','settlementObjectType','chargeType'
	]);

SExpense = HTUtil.createRecord([
	'consId','consNo','consMblNo','consHblNo','vessName','voyaName','consPolEn','consPodEn',
	{name:'consSailDate',type:'date',dateFormat:DATEF},
	{name:'consDate',type:'date',dateFormat:DATEF},
	'consBizClass','consBizType','consShipType',
	'consCustId','consCustName',
	'consSalesRepId','consSalesRepName','consOperatorId','consOperatorName','grouId','grouName',
	'shliCode',
	'chclId','chclCode','charId','charName','charNameEn',
	'unitName','currCode','custId','custName','custSname',
	'expeType','pateCode',
	{name:'expeDate',type:'date',dateFormat:DATEF},	
	{name:'expeUnitPrice',type:'float'},
	{name:'expeNum',type:'float'},
	{name:'expeNum2',type:'float'},
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
	'expeIdM','consIdM','consNoM','editable','objectType','objectId1','objectName1','objectId2','objectName2']);
SExRate = HTUtil.createRecord([
	'exraBaseCurrency','exraExCurrency','exraStartDate','exraEndDate','exraRate','active','editable']);
SInterestRate = HTUtil.createRecord([
	'inraCurrency','inraStartDate','inraEndDate','inraRate','inraType','active','editable']);
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
	'consNo','consMblNo','consHblNo','consVessel','consVoyage']);
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
	'voucNo',{name:'invoDebitnoteFlag',type:'boolean',convert:function(v){return v==1;}},
	'invoUploadFlag',{name:'invoUploadTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'consBizType']);
SInvoiceEntry = HTUtil.createRecord(['id',
	'invoId','charName','charNameEn','unitName','currCode',
	{name:'inenUnitPrice',type:'float'},{name:'inenNum',type:'float'},
	{name:'inenTotalAmount',type:'float'},{name:'inenExRate',type:'float'},
	{name:'expeCommission',type:'float'},{name:'expeCommissionRate',type:'float'},
	{name:'inenInvoiceAmount',type:'float'},'inenPaymentType',
	'expeId','consId','consNo','consMblNo','consHblNo','consVessel','consVoyage',
	'consBizType']);
SInvoiceItem = HTUtil.createRecord(['invoId','invoNo','invoTaxNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	'expeId','expeType','consId','consNo','consMblNo','consHblNo',
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
SInvoiceNo = HTUtil.createRecord([
	'innoPrefix','innoStartNo','innoEndNo','innoNextNo','innoNumLen',
	{name:'innoStartDate',type:'date',dateFormat:DATEF},
	'active']);
SPr =  HTUtil.createRecord([
	'prNo','prType','custId','custName','custSname','custBank','custAccount',
	'prAmount','currCode','prExRate','prPayType','prPaymentType','prBank','prAccount',
	'prRemarks',
	'prFinApproveBy',{name:'prFinApproveDate',type:'date',dateFormat:DATEF},
	'prApproveBy',{name:'prApproveDate',type:'date',dateFormat:DATEF},	
	'prStatus',
	{name:'prDate',type:'date',dateFormat:DATEF},'prPrintFlag']);
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
SVoucherItem = HTUtil.createRecord([
	'initId','invoId','invoNo','invoTaxNo',
	{name:'invoDate',type:'date',dateFormat:DATEF},
	'expeId','expeType','consId','consNo','consMblNo','consHblNo',
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
PActionLog = Ext.data.Record.create(['acloId','acloActName','acloActRemark','acloTable','acloTid',
	'acloTno','acloUserId','acloUserName','acloIp','compCode','createTime']);
PCompany = HTUtil.createRecord(['compMyCode','compNameCn','compNameEn','compAccount','compAddress','compBank'
                                ,'compContact','compEmail','compContMsn','compContQq','compTel','compFax','compLoginUser','compLoginPsw'
                                ,'compLicenseNumber','compServiceLeve','compActive'
                                ,{name:'compStartDate',type:'date',dateFormat:'Y-m-d'}
                                ,{name:'compEndDate',type:'date',dateFormat:'Y-m-d'}]);
PCompanyBankAccount= HTUtil.createRecord(['cobaName','cobaBank','cobaAccount','currCode','active']);
PCompanyConfig = HTUtil.createRecord(['cocoName','cocoCode',
	'cocoValue','cocoValueType','cocoValueOptions','cocoGroup','cocoType','cocoDesc']);
PFunction = Ext.data.Record.create(['funcCode','funcName','funcType','active']); 
PGroup = HTUtil.createRecord(['grouName','grouDesc','active']);
PGroupUser = HTUtil.createRecord(['grouId','userId']); 
PMessage = HTUtil.createRecord(['messType','messTo','messCc','messBcc',
	'messSubject','messBody','messAttachment','messFrom',
	{name:'messCreateTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'messSendFlag','messFromUserId','messFromUserName','messToUserId','messToUserName']); 
PMessageSubscribe = HTUtil.createRecord(['metoId',
	{name:'mesuMailFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'mesuImFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'mesuSmFlag',type:'boolean',convert:function(v){return v==1;}},
	'mesuSubscriberType','mesuSubscriberId','mesuSubscriberName','mesuSubscriberEmail',
	'mesuSubscriberMobile','mesuCustomerType']); 
PMessageTopic = HTUtil.createRecord(['metoName','metoDesc','metoTemplate','metoRule',
	'actName','tetyId','active']); 
PRole = HTUtil.createRecord(['roleName','roleDesc','active']); 
PRoleFunction = HTUtil.createRecord(['roleId','funcCode']); 
PTaskType = HTUtil.createRecord(['tatyName','tatyDId',
	'tatyDName','tatyOrder','tatyDesc','tatyDateType','tatyDateEstimated',
	'tatyAction','tatyClass','tatyProperty','tatyDefaultOwner',
	'consBizType','consBizClass','consShipType']); 
PTemplate = HTUtil.createRecord(['tempName','tempClass','tempType',
	'tetyId','tetyCode','tetyName','tempFileName','tempDesc','active']);
PTemplateType = HTUtil.createRecord(['tetyName','tetyCode','tetyDesc']);
PUser = HTUtil.createRecord(['userName','userLoginName','userPassword',
	'userTel','userMobile','userEmail','userMsn','userQq',
	'grouId','grouName','roleId','roleName','userSalesFlag','userOperatorFlag',
	'userAllViewFlag','userAllEditFlag',
	{name:'userPasswordModifyDate',type:'date',dateFormat:'Y-m-d'},'active',
	'siteId','siteName']);
PUserExpePermission = HTUtil.createRecord(['userId','chclId','chclName','expeType',
	{name:'usepEditable',type:'boolean',convert:function(v){return v==1;}},
	{name:'usepViewAll',type:'boolean',convert:function(v){return v==1;}},
	{name:'usepEditAll',type:'boolean',convert:function(v){return v==1;}}]);
PUserRole = HTUtil.createRecord(['userId','roleId']);
PUserSetting = Ext.data.Record.create(['usseId','userId','usseName','usseValue','compCode']);
PEventType = HTUtil.createRecord(['typeName','bizType','active']);
PEvent = HTUtil.createRecord(['peId','consignId','transId',
    'typeNameId','typeName','bizType',
    {name:'trackDate',type:'date',dateFormat:DATEF}, 'trackTime',
    'status','operatorName']);
PSms = HTUtil.createRecord(['mobile','content','bizType','consId','consNo',
	  {name:'sendDate',type:'date',dateFormat:DATEF},
	  'status']);

CAttach = HTUtil.createRecord(['attachName','attachFileName','attachExtName','attachDesc',
         'consId','consNo','consBizType']);
CCommission = HTUtil.createRecord(['commName']);
CCommissionItem = HTUtil.createRecord(['commId','coitLower','coitLimit','coitRate']);
CCustomer = HTUtil.createRecord(['custCode','custClass','id','parentId',//添加字段  id , parentId, ADD by Yongzhixiang 2012-07-02
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
CContract = HTUtil.createRecord([
	'contractNo','contractName',
	{name:'fromDate',type:'date',dateFormat:DATEF},
	{name:'endDate',type:'date',dateFormat:DATEF},'checkBy',
	{name:'checkTime',type:'date',dateFormat:DATEF},
	'checkStatus','enableFlag']);
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
CSalesCommission = HTUtil.createRecord(['sacoSalesId','sacoSalesName','commId','commName']);
GCargoClass = HTUtil.createRecord(['caclCode','caclNameCn','caclNameEn','premiumRate','active']);
GCargoType = HTUtil.createRecord(['caclId','catyCode','catyNameCn','catyNameEn','catyManuNo',
    'catySpec','catyCargoType','catyDanagerFlag','catyDanagerNo','catyDanagerProperty','catyRemarks','active']);
GCharge = HTUtil.createRecord(['charCode','charName',
	'charNameEn','currCode','unitId','unitName','chclId','chclName','charCnyP',
	'charCnyR','charUsdP','charUsdR','active','chclCode',
	'attr1','attr2','attr3','attr4','attr5','attr6','attr7','attr8',
	{name:'marineFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'airFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'expressFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'customsFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'wmsFlag',type:'boolean',convert:function(v){return v==1;}},
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
GSite = HTUtil.createRecord(['siteName','siteTel','siteFax','siteAddress',
    'siteContact','siteType','provinceId','provinceName','cityId','cityName']);
GSettlementWay = HTUtil.createRecord(['sewaCode','sewaName','active']);
GShippingLine = HTUtil.createRecord(['shliCode','shliName',
	'shliNameEn','shliBulkFlag','shliContFlag','active']);
GTradeTerm = HTUtil.createRecord(['trteCode','trteName','active']);
GTradeType = HTUtil.createRecord(['trtyCode','trtyName','active']);
GTransTerm = HTUtil.createRecord(['tranCode','tranName','tranBulkFlag','tranContFlag','tranAirFlag','active']);
GTransType = HTUtil.createRecord(['tratCode','tratName','active']);
GUnit = HTUtil.createRecord(['unitCode','unitName','unitClassId','unitClassName','active']);
GUsage = HTUtil.createRecord(['usagCode','usagName','active']);
GVehicleType = HTUtil.createRecord(['vehtName','active']);
GVessel = HTUtil.createRecord(['vessNameEn','vessNameCn','vessCode',
	'vessLiner','vessDesc','counCode','vessType','active']);
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

WUser = HTUtil.createRecord(['wusrId','wusrName','wusrPassword','wusrFirstName','wusrLastName',
	'wusrTitle','wusrDept','wusrMobile','wusrEmail','wusrCompanyName','wusrAddress','wusrCity','wusrProvice',
	'wusrZip','wusrCountry','wusrTel','wusrFax','wusrUrl','wusrStatus','wusrLastLoginTime']);
WInquiry = HTUtil.createRecord(['winqId','winqCargoDesc','winqCargoPackages','winqCargoGw','winqCargoMeasurement',
        'winqReceiptPlace','winqDeliveryPlace','winqPol','winqPolEn','winqPod','winqPodEn',
        'tranId','tranCode','pateId','pateName','winqBizType','winqRemarks',
     	'winqStatus','wusrId','wusrFirstName','wusrMobile','wusrCompanyName','wusrTel']);
 
TExportHistory=Ext.data.Record.create(['exhiId','exhiType','exhiCheckDateF','exhiCheckDateT','exhiFileName','createTime']);


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
	//付款类型
	PAYTYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	            ['0','PP'],['1','CC']]}),
	getPayType: function(v){return HTStore.getNameById(HTStore.PAYTYPE_S,v);},
	//EXPENSE type 费用类型
	EXPE_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['R','应收'],['P','应付']]}),
	getExpenseType : function(v){return HTStore.getNameById(HTStore.EXPE_TYPE_S,v);},
	
	//BIll type 付费类型
	BILL_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['0',C_EXPR_SHIPPER_BILL],['1',C_EXPR_CONSIGNEE_BILL]]}),
	getBILL : function(v){return HTStore.getNameById(HTStore.BILL_S,v);},
	
	//快件体积换算
	EVC_S : new Ext.data.ArrayStore({id:0,fields:['CODE'],data:[
	            [5000],[6000]]}),
	getEVC: function(v){return HTStore.getNameById(HTStore.EVC_S,v);},
		
	//快件结算对象
	SET_OBJ : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	         ['0',C_CUSTOMER],['1',C_AGENCY]]}),
   	getSET_OBJ: function(v){return HTStore.getNameById(HTStore.SET_OBJ,v);},
	
	//TNetwork
	getNetwork_S : function(){
		if(Ext.StoreMgr.containsKey('TNETWORK_S')){
			return Ext.StoreMgr.get('TNETWORK_S');
		}
		else {		
			var store = this.createStore('TNETWORK_S','TNETWORK_Q','TNetwork',TNetwork);
			return store;
		}
	},
	
	vehicleStatusStore : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
		[0,'正常'],[1,'修理'],[2,'停用']]}),
	vehicleStatusRender : function(v){
		if(v>=0) return HTStore.vehicleStatusStore.getAt(v).get('N');},
	//库位使用
	LocationUsing:new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[[0,'箱拣货库位'],[1,'件拣货库位'],[2,'箱件拣货库位'],[3,'理货站']]}),
	LocationUsingRender:function(v){
		if(v>=0) return HTStore.LocationUsing.getAt(v).get('N');},
	//库位属性
	LocationAttribute:new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[[0,'正常'],[1,'封存'],[2,'损坏']]}),
	LocationAttributeRender:function(v){
		if(v>=0) return HTStore.LocationAttribute.getAt(v).get('N');},
	
	//库存环境
	InventoryCondition:new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[[0,'常温'],[1,'冷冻']]}),
	InventoryConditionReader:function(v){
		if(v>=0) return HTStore.InventoryCondition.getAt(v).get('N');},
		
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
	
	//ship type 装载类型
	SHTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['FCL',C_FCL],['LCL',C_LCL],['BULK',C_BULK]]}),
	getSHTY : function(v){return HTStore.getNameById(HTStore.SHTY_S, v);},
	         
	//business type 业务类型
	BT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['M',C_MARINE],['A',C_AIR],['G',C_CUDE],['I',C_INSP],['T',C_TRAN],['W',C_WARE],['E',SYS_EXPRESS]]}),
	getBT : function(v){return HTStore.getNameById(HTStore.BT_S, v);},
	
	//business class 业务性质
	BC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['E',C_EXP],['I',C_IMP],['D',C_DOM]]}),
	getBC : function(v){return HTStore.getNameById(HTStore.BC_S, v);},
	
	//place type 地点类型
	PLTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	         ['1',C_PROVINCE],['2',C_CITY],['3',C_HARBOUR]]}),
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
	
	//整拼
	FL_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['FCL'],['LCL']]}),         
 	getFL : function(v){return HTStore.getNameById(HTStore.FL_S, v);}, 	         
 	         
 	//性别
 	GEND_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['M',C_MALE],['F',C_FEMALE]]}),         
	getGEND : function(v){return HTStore.getNameById(HTStore.GEND_S, v);},
	
	//客户投诉处理状态
  	COMPLAINT_STATUS_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
  	    ['0','未处理'],['1','处理中'],['2','已处理']]}),
	getComplaintStatus : function(v){return HTStore.getNameById(HTStore.COMPLAINT_TYPE_S, v);},
	
	//模板文件类型
	TFTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
 	         ['xls','xls'],['doc','doc']]}), 
 	         
	//单证颜色
	DC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['R',C_COLOR_RED],['G',C_COLOR_GREEN],['B',C_COLOR_BLUE],['W',C_COLOR_WHITE]]}),  
	       
     //集装箱长度
	COLE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	       ['20'],['40'],['45'],['10'],['53'],['12'],['38'],['48']]}),  
   	       
	//换单类型
   	SWIT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	   	    ['0',C_NONE],['1',C_INSP_SWITHC],['2',C_FACT_SWITHC]]}),  
   	   	    
	//船舶类型
	VETY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['1',C_CONT_VESSEL],['2',C_BULK_VESSEL],['3',C_BARGE_VESSEL]]}),  
	getVETY : function(v){return HTStore.getNameById(HTStore.VETY_S, v);},
	
	//出口单票状态
	COST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_NOT_BOOKED],['1',C_BOOK_START],['2',C_BOOK_CONFIRM],['3',C_BOOK_EXIT],
             ['4',C_BOOK_REASSIGN],['5',C_STATUS_SHUT],['6',C_STATUS_CANCELED],['7',C_STATUS_FINISHED]]}),  
	getCOST : function(v){return HTStore.getNameById(HTStore.COST_S, v);},
	
	//进口单票状态
	CIST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_NOT_ARRIVED],['1',C_ARRIVED],['2',C_SWITCH],['3',C_RELEASE],
             ['4',C_SEND_CARGO],['6',C_STATUS_CANCELED],['7',C_STATUS_FINISHED]]}),  
	getCIST : function(v){return HTStore.getNameById(HTStore.CIST_S, v);},
	
	//提单状态
	BLST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['1',C_STATUS_NOT_CONFIRMED],['2',C_STATUS_CONFIRMED],
             ['3',C_PRINT_OFFICIAL],['4',C_DOC_RELEASABLE_FLAG],['5',C_DOC_BACK]]}),  
	getBLST : function(v){return HTStore.getNameById(HTStore.BLST_S, v);},
	
	//提单状态
	TRST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_START],['1',C_STATUS_FINISHED]]}),  
	getTRST : function(v){return HTStore.getNameById(HTStore.TRST_S, v);},
	
		
	//分拨状态
	SPST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_START],['1',C_STATUS_SPLIT_GEN],
   	    	 ['2',C_STATUS_SPLIT_PASS],['3',C_STATUS_MOCK_DECLARANCE]]}),  
   	getSPST : function(v){return HTStore.getNameById(HTStore.SPST_S, v);},
   	
    //仓储联系单状态
   	WAST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_ACCEPTED],['1',C_STATUS_ACCEPTED],['2',C_STATUS_FINISHED]]}),  
	getWAST : function(v){return HTStore.getNameById(HTStore.WAST_S, v);},
   	
	//仓储联系单类型
	WATY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['I',C_WARE_IN],['O',C_WARE_OUT]]}),  
   	getWATY : function(v){return HTStore.getNameById(HTStore.WATY_S, v);},
   	
    //报检单状态
   	INSPST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_DECLARED],['1',C_STATUS_DECLARED],['2',C_STATUS_FINISHED]]}),  
	getINSPST : function(v){return HTStore.getNameById(HTStore.INSPST_S, v);},
	
	//报关单状态
	CDST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	    	 ['0',C_STATUS_NOT_DECLARED],['1',C_STATUS_DECLARED],['2',C_STATUS_DECLARANCE],['3',C_STATUS_SHUT]]}),  
	getCDST : function(v){return HTStore.getNameById(HTStore.CDST_S, v);},
	
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
	INST_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0',C_STATUS_NOT_INVOICED],['1',C_STATUS_PART_INVOICED],['2',C_STATUS_INVOICED]]}),  
	getINST : function(v){return HTStore.getNameById(HTStore.INST_S, v);},
	
	BIST_S : new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0','未对账'],['1','已对账'],['2','已作废']]}),
	getBIST : function(v){return HTStore.getNameById(HTStore.BIST_S, v);},

	//费用确认状态
	EXPC_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0',C_STATUS_NOT_CONFIRMED],['1',C_STATUS_CONFIRMED]]}),  
	getEXPC : function(v){return HTStore.getNameById(HTStore.EXPC_S, v);},
	
	//财务导出类型
	EXHI_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['0',C_INVO_R],['1',C_INVO_P],['2',C_WRITEOFF_R],['3',C_WRITEOFF_P]]}),  
	getEXHI_T : function(v){return HTStore.getNameById(HTStore.EXHI_T_S, v);},
	
	//消息订阅类型
	MESU_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['1',C_MESU_TYPE_I],['2',C_MESU_TYPE_E],['3',C_MESU_TYPE_S]]}),  
	getMESU_T : function(v){return HTStore.getNameById(HTStore.MESU_T_S, v);},
	
	//角色类型
	ROLE_T_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	 	['1',C_OPERATOR],['2',C_SALES],['3',C_DISPATCHER]]}),  
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
	
	//拼箱类型
	LCLT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	['A',C_INNER_CONSOLIDATE],['B',C_OUTER_CONSOLIDATE],['C',C_CUST_CONSOLIDATE]]}),  
	getLCLT : function(v){return HTStore.getNameById(HTStore.LCLT_S, v);},
	
	//报关类型
	CUTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,C_LOCAL_CD],[1,C_PORT_CD]]}),  
	getCUTY : function(v){return HTStore.getNameById(HTStore.CUTY_S, v);},
	
	//网点类型
	SITE_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,'自营站点'],[1,'合作站点']]}),  
    getSITE_TYPE : function(v){
    	return HTStore.getNameById(HTStore.SITE_TYPE_S, v);
    },
    
	//仓库类型
	WAREHOUSE_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,'平面仓'],[1,'恒温仓'],[2,'货架仓'],[3,'高架仓']]}),  
    getWAREHOUSE_TYPE : function(v){return HTStore.getNameById(HTStore.WAREHOUSE_TYPE_S, v);},
	
    //盘点类型
	CHECK_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,'抽查'],[1,'全盘']]}),  
    getCHECK_TYPE : function(v){
    	return HTStore.getNameById(HTStore.CHECK_TYPE_S, v);
    },
    
    //计费类型
	CHARGE_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[0,'票'],[1,'件数'],[2,'毛重'],[3,'体积'],[4,'计费重量'],[5,'净重'],[6,'箱型箱量']]}),  
    getChargeType : function(v){return HTStore.getNameById(HTStore.CHARGE_TYPE_S, v);},
    
    //包装方式
    PACKAGES_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],
    	data:[
        [0,'尺寸'],[1,'件数'],[2,'重量'],[3,'体积'],[4,'面积']
        ]}),
    getPackages : function(v){return WHTStore.getNameById(WHTStore.PACKAGES_S, v);},
    
    SETTLEMENT_OBJECT_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	[0,'客户'],[1,'承运人'],[2,'车队'],[3,'仓储公司'],
    	[4,'报关行'],[5,'报检公司'],[6,'海外代理'],[7,'海外代理']]}),  
    getSettlementObjectType : function(v){
    	return HTStore.getNameById(HTStore.SETTLEMENT_OBJECT_TYPE_S, v);
    },
    
    QA_TYPE_S  : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	[0,'不质检'],[1,'全部质检'],[2,'部分质检']]}),  
    getQA_TYPE : function(v){return HTStore.getNameById(HTStore.QA_TYPE_S, v);},
    //品质
    QUALITY_TYPE_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	[0,'---'],[1,'良品'],[2,'次品'],[3,'退货']]}),  
    getQualityType : function(v){return HTStore.getNameById(HTStore.QUALITY_TYPE_S, v);},
    	
    //入库单状态
    IN_WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	[0,'新增'],[1,'已提交'],[2,'收货中'],[3,'收货完成'],[4,'上架中'],[5,'上架完成'],[6,'已作废'],[7,'质检中'],[8,'质检完成']]}),  
    getInWarehouseNoteStatus : function(v){return HTStore.getNameById(HTStore.IN_WAREHOUSE_NOTE_S, v);},
    
    //库存状态
    WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
       [0,'新增'],[1,'上架中'],[2,'上架完成']]}),  
       getWarehouseNoteStatus : function(v){return HTStore.getNameById(HTStore.WAREHOUSE_NOTE_S, v);},
    	
    //出库单状态
    OUT_WAREHOUSE_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'新增'],[1,'已提交'],[2,'配货中'],[3,'配货完成'],[4,'出库中'],[5,'出库完成'],[6,'已作废']]}),
    getOutWarehouseNoteStatus : function(v){return HTStore.getNameById(HTStore.OUT_WAREHOUSE_NOTE_S, v);},
    
    //移库单状态
    TRANS_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	[0,'未提交'],[1,'已提交'],[2,'审核通过'],[3,'审核不通过'],[4,'已执行']]}),
    getTransNoteStatus:function(v){return HTStore.getNameById(HTStore.TRANS_NOTE_S,v);},
    
    //盘点单状态
    CHECK_NOTE_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'新增'],[1,'已提交'],[2,'已审核'],[3,'已完成']]}),
    getCheckNoteStatus : function(v){return HTStore.getNameById(HTStore.CHECK_NOTE_S, v);},
    
	//信用期类型
	IRTY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[1,C_TERM_3M],[2,C_TERM_6M],[3,C_TERM_1Y]]}),  
	getIRTY : function(v){return HTStore.getNameById(HTStore.IRTY_S, v);},
		
	//内贸运费条款
	innerPaymentTermStore : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	[1,'预付'],[2,'到付']]}),  
	getInnerPaymentTerm: function(v){return HTStore.getNameById(HTStore.innerPaymentTermStore, v);},
	
	
	//操作日志表类型
	ACLO_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
    	 	['FConsign',C_CONSIGN],['FBl',C_BL],['SExpense',C_EXPE],
    	 	['SInvoice',C_INVO],['SVoucher',C_T_VOUC],['SPr',C_T_PR]]}),  
	getACLO : function(v){return HTStore.getNameById(HTStore.ACLO_S, v);},
	
	YY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['2008','2008'+C_YEAR],['2009','2009'+C_YEAR],
	       ['2010','2010'+C_YEAR],['2011','2011'+C_YEAR],
	       ['2012','2012'+C_YEAR],['2013','2013'+C_YEAR],
	       ['2014','2014'+C_YEAR],['2015','2015'+C_YEAR]]}),  
	                                                        	
	MM_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	       ['01',C_JAN],['02',C_FEB],['03',C_MAR],['04',C_APR],
	       ['05',C_MAY],['06',C_JUN],['07',C_JUL],['08',C_AUG],
	       ['09',C_SEP],['10',C_OCT],['11',C_NOV],['12',C_DEC]]}), 
	       
    //快件文件类型
	EFT_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	        ['0',C_ATTACH],['1',C_PACKAGE]]}),
    getEFT : function(v){return HTStore.getNameById(HTStore.EFT_S, v);},  
    
	createStore:function(storeId,actionCode,typeName,recordType,bp){
		 var store = new Ext.data.Store({storeId:storeId,url:SERVICE_URL,baseParams:Ext.isEmpty(bp)?{_A:actionCode,_mt:'json'}:bp,
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:typeName,id:'id'},recordType),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		 store.load();
		 return store;
	},
	//飞航状态
	flightStatusStore : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
  		[0,'未起飞'],[1,'飞行中'],[2,'已到达']]}),
  	flightStatusRender : function(v){
  		if(v>=0) return HTStore.flightStatusStore.getAt(v).get('N');},
	
  	//陆运货物状态
	loadStatus : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
  		[0,'新增'],[1,'已提货'],[2,'部分派车'],[3,'全部派车'],[4,'部分发车'],[5,'全部发车'],
  		[6,'部分到站'],[7,'全部到站'],[8,'部分签收'],[9,'全部签收']]}),
  	loadStatusRender : function(v){
  		if(Ext.isEmpty(v)){
  			return '';
		}
		else{
			return HTStore.loadStatus.getAt(v).get('N');
		}
  	},
  	
  	//回单跟踪里判断货物状况：是否破损
	getDEMAGE_S : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
        [0,''],[1,'破损'],[2,'异常']]}),
	getCheckDemage : function(v){
		if(Ext.isEmpty(v)){
			return '';
		}
		else{
			return HTStore.getDEMAGE_S.getAt(v).get('N');
		}
	},
	
	//回单跟踪里回单状况
	loadReceiptStatus : new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
        [0,'新增'],[1,'回单已签收'],[2,'回单已返回']]}),
	loadReceiptStatusRender : function(v){
		if(Ext.isEmpty(v)){
			return '';
		}
		else{
			return HTStore.loadReceiptStatus.getAt(v).get('N');
		}
	},
	
	//配送方式
	getDISTR : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,''],[1,'自取'],[2,'派送']]}),
	getCheckDistr : function(v){return HTStore.getNameById(HTStore.getDISTR, v);},
	
	//报关方式
	getCUST:new Ext.data.ArrayStore({id:0,fields:['C','N'],data:[
        [0,''],[1,'进口'],[2,'出口'],[3,'其它']]}),
	getCheckCust : function(v){
		if(Ext.isEmpty(v)){
			return '';
		}
		else{
			return HTStore.getCUST.getAt(v).get('N');
		}
	},
        
	//付款方式
	getPAY_S : new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
        [0,'多付'],[1,'现付'],[2,'到付'],[3,'回单付'],[4,'月结']]}),
	getCheckPay : function(v){return HTStore.getNameById(HTStore.getPAY_S, v);},
	
	//Cargo Class
	getCACL_S : function(){
		if(Ext.StoreMgr.containsKey('CACL_S')){
			return Ext.StoreMgr.get('CACL_S');
		}
		else {
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
	
	getCATY_S : function(){
		if(Ext.StoreMgr.containsKey('CATY_S')){
			return Ext.StoreMgr.get('CATY_S');
		}
		else {		
			var store = this.createStore('CATY_S','CATY_Q','GCargoType',GCargoType);
			store.load({params:{active:1}});
			return store;
		}
	},
	
	//GSettlementWay
	getSEWA_S:function(){
		if(Ext.StoreMgr.containsKey('SEWA_S')){
			return Ext.StoreMgr.get('SEWA_S');
		}else {
			var store = this.createStore('SEWA_S','SEWA_Q','GSettlementWay',GSettlementWay);
			store.load({params:{active:1}});
			return store;
		}
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
	
	getSEWA : function(v){
		var _cs=HTStore.getSEWA_S();
		if(Ext.isEmpty(v))
			return '';
		else
			return _cs.getById(v)?_cs.getById(v).get('vehtName'):v; 
	},
	
	//GTransTerm
	getTRAN_S : function(){
		if(Ext.StoreMgr.containsKey('TTER_S')){
			return Ext.StoreMgr.get('TTER_S');
		}
		else {		
			var store = this.createStore('TTER_S','TTER_Q','GTransTerm',GTransTerm);
			return store;
		}
	},
	
	//散货运输条款
	getTTB_S : function(){
		if(Ext.StoreMgr.containsKey('TTER_S')){
			return Ext.StoreMgr.get('TTER_S');
		}
		else {		
			var store = this.createStore('TTER_S','TTER_Q','GTransTerm',GTransTerm,{_A:'TTER_Q',_mt:'json',tranBulkFlag:1});
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
	
	//空运运输条款
	getTTA_S : function(){
		if(Ext.StoreMgr.containsKey('TTER_S')){
			return Ext.StoreMgr.get('TTER_S');
		}
		else {		
			var store = this.createStore('TTER_S','TTER_Q','GTransTerm',GTransTerm,{_A:'TTER_Q',_mt:'json',tranAirFlag:1});
			return store;
		}
	},
	
	//GPaymentTerm
	getPATE_S : function(){
		if(Ext.StoreMgr.containsKey('PATE_S')){
			return Ext.StoreMgr.get('PATE_S');
		}
		else {		
			var store = this.createStore('PATE_S','PATE_Q','GPaymentTerm',GPaymentTerm);
			return store;
		}
	},
	
	//GUnit
	getUNIT_S : function(){
		if(Ext.StoreMgr.containsKey('UNIT_S')){
			return Ext.StoreMgr.get('UNIT_S');
		}
		else {
			var store = this.createStore('UNIT_S','UNIT_Q','GUnit',GUnit);
			return store;
		}
	},
	
	//件数单位+箱型
	getUNIT_C : function(){
		if(Ext.StoreMgr.containsKey('UNIT_C_S')){
			return Ext.StoreMgr.get('UNIT_C_S');
		}
		else {		
			var store = this.createStore('UNIT_C_S','UNIT_Q','GUnit',GUnit);
			return store;
		}
	},
	
	//GCurrency
	getCURR_S : function(){
		if(Ext.StoreMgr.containsKey('CURR_S')){
			return Ext.StoreMgr.get('CURR_S');
		}else {
			var store = this.createStore('CURR_S','CURR_Q','GCurrency',GCurrency);
			return store;
		}
	},
	getCURR : function(v){var _cs= HTStore.getCURR_S();if(v) return _cs.getById(v)?_cs.getById(v).get('currName'):v; else return '';}, 

	//CCustomerCategory
	getCUCA_S : function(){
		if(Ext.StoreMgr.containsKey('CUCA_S')){
			return Ext.StoreMgr.get('CUCA_S');
		}
		else {
			var store = this.createStore('CUCA_S','CUCA_Q','CCustomerCategory',CCustomerCategory);
			return store;
		}
	},
	
	//GContainerClass
	getCOCL_S : function(){
		if(Ext.StoreMgr.containsKey('COCL_S')){
			return Ext.StoreMgr.get('COCL_S');
		}
		else {		
			var store = this.createStore('COCL_S','COCL_Q','GContainerClass',GContainerClass);
			return store;
		}
	},
	
	//GContainerType
	getCOTY_S : function(){
		if(Ext.StoreMgr.containsKey('COTY_S')){
			return Ext.StoreMgr.get('COTY_S');
		}
		else {		
			var store = this.createStore('COTY_S','COTY_Q','GContainerType',GContainerType);
			return store;
		}
	},
	
	getCOTY : function(v){
		var _cs=HTStore.getCOTY_S();
		if(Ext.isEmpty(v))
			return '';
		else
			return _cs.getById(v)?_cs.getById(v).get('cotyCode'):v; 
	},
	//GShippingLine
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
	
	//GCountry
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
	
	//express
	getECITY_S : function(counCode){
		if(Ext.StoreMgr.containsKey('PLAC_S')){
			return Ext.StoreMgr.get('PLAC_S');
		}
		else {
			var store = this.createStore('PLAC_S','PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'json',placType:2,counCode:counCode});
			return store;
		}
	},
	
	//GPackage
	getPACK_S : function(){
		if(Ext.StoreMgr.containsKey('PACK_S')){
			return Ext.StoreMgr.get('PACK_S');
		}
		else {		
			var store = this.createStore('PACK_S','PACK_Q','GPackage',GPackage);
			return store;
		}
	},
	
	//GDocumentType
	getDOTY_S : function(){
		if(Ext.StoreMgr.containsKey('DOTY_S')){
			return Ext.StoreMgr.get('DOTY_S');
		}
		else {
			var store = this.createStore('DOTY_S','DOTY_Q','GDocumentType',GDocumentType);
			return store;
		}
	},
	
	//GCharge
	getCHAR_S : function(p){
		if(Ext.StoreMgr.containsKey('CHAR_S')){
			return Ext.StoreMgr.get('CHAR_S');
		}
		else {
			var store = this.createStore('CHAR_S','CHAR_Q','GCharge',GCharge);
			return store;
		}
	},
	
	//GChargeClass
	getCHCL_S : function(){
		if(Ext.StoreMgr.containsKey('CHCL_S')){
			return Ext.StoreMgr.get('CHCL_S');
		}
		else {
			var store = this.createStore('CHCL_S','CHCL_Q','GChargeClass',GChargeClass);
			return store;
		}
	},
	
	//GTradeType
	getTRTY_S : function(){
		if(Ext.StoreMgr.containsKey('TRTY_S')){
			return Ext.StoreMgr.get('TRTY_S');
		}
		else {		
			var store = this.createStore('TRTY_S','TRTY_Q','GTradeType',GTradeType);
			return store;
		}
	},
	
	//GTransType
	getTRAT_S : function(){
		if(Ext.StoreMgr.containsKey('TRAT_S')){
			return Ext.StoreMgr.get('TRAT_S');
		}
		else {		
			var store = this.createStore('TRAT_S','TRAT_Q','GTransType',GTransType);
			return store;
		}
	},
	
	//GVehicleType
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
		}
		else {
			var store = this.createStore('GSITE_S','GSITE_Q','GSite',GSite);
			return store;
		}
	},
	
	//GTradeTerm
	getTRTE_S : function(){
		if(Ext.StoreMgr.containsKey('TRTE_S')){
			return Ext.StoreMgr.get('TRTE_S');
		}
		else {		
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
		}
		else {		
			var store = this.createStore('EXSE_S','EXSE_Q','GExchangeSettlement',GExchangeSettlement);
			return store;
		}
	},
	
	//PCompanyBankAccount
	getCOBA_S : function(){
		if(Ext.StoreMgr.containsKey('COBA_S')){
			return Ext.StoreMgr.get('COBA_S');
		}
		else {		
			var store = this.createStore('COBA_S','COBA_Q','PCompanyBankAccount',PCompanyBankAccount);
			return store;
		}
	},
	
	//PTaskType
	getTATY_S : function(){
		if(Ext.StoreMgr.containsKey('TATY_S')){
			return Ext.StoreMgr.get('TATY_S');
		}
		else {		
			var store = this.createStore('TATY_S','COBA_Q','PTaskType',PTaskType);
			return store;
		}
	},
		
	//PFunction
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
	
	//PRole
	getROLE_S : function(){
		if(Ext.StoreMgr.containsKey('ROLE_S')){
			return Ext.StoreMgr.get('ROLE_S');
		}
		else {		
			var store = this.createStore('ROLE_S','ROLE_Q','PRole',PRole);
			return store;
		}
	},
	
	//PGroup
	getGROU_S : function(){
		if(Ext.StoreMgr.containsKey('GROU_S')){
			return Ext.StoreMgr.get('GROU_S');
		}
		else {		
			var store = this.createStore('GROU_S','GROU_Q','PGroup',PGroup);
			return store;
		}
	},
	
	//PUser
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
	
	//Sales
	getSALE_S : function(){
		if(Ext.StoreMgr.containsKey('SALE_S')){
			return Ext.StoreMgr.get('SALE_S');
		}
		else {		
			var store = this.createStore('SALE_S','USER_Q','PUser',PUser,{_A:'USER_Q',_mt:'json',userSalesFlag:1});
			return store;
		}
	},
	
	//Operator
	getOP_S : function(){
		if(Ext.StoreMgr.containsKey('OP_S')){
			return Ext.StoreMgr.get('OP_S');
		}
		else {		
			var store = this.createStore('OP_S','USER_Q','PUser',PUser,{_A:'USER_Q',_mt:'json',userOperatorFlag:1});
			return store;
		}
	},
	
	//SExRate
	getEXRA_S : function(){
		if(Ext.StoreMgr.containsKey('EXRA_S')){
			return Ext.StoreMgr.get('EXRA_S');
		}
		else {		
			var store = this.createStore('EXRA_S','EXRA_Q','SExRate',SExRate,{_A:'EXRA_Q',_mt:'json',active:1});
			store.load();
			return store;
		}
	},
	
	getExRate : function(cs,ct){
		if(cs==ct) return 1;
		var s = this.getEXRA_S();
		var d=s.getRange();
		var rs = 0;
		var rt = 0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('exraBaseCurrency')==cs && d[i].get('exraExCurrency')==ct) {
				return d[i].get('exraRate');
			}
				
			else if(d[i].get('exraBaseCurrency')==cs && d[i].get('exraExCurrency')=='CNY') {
				rs=d[i].get('exraRate');
			}
				
			else if(d[i].get('exraBaseCurrency')=='CNY' && d[i].get('exraExCurrency')==ct) {
				rt=d[i].get('exraRate');		
			}
				
		}
		return rs*rt;
	},
	
	//PCompanyConfig
	getCOCO_S : function(){
		if(Ext.StoreMgr.containsKey('COCO_S')){
			return Ext.StoreMgr.get('COCO_S');
		}
		else {
			var store = new Ext.data.Store({storeId:'COCO_S',url:SERVICE_URL,baseParams:{_A:'COCO_Q',_mt:'json'},
					reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PCompanyConfig',id:'cocoCode'},PCompanyConfig),
					remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
				 store.load();
				 return store;
		}
	},
	
	getCFG : function(v){
		var _cs= this.getCOCO_S();
		return _cs.getById(v)?_cs.getById(v).get('cocoValue'):'';
	},
	
	getCFGD : function(v){
		var _cs= this.getCOCO_S();
		return _cs.getById(v)?_cs.getById(v).get('cocoDesc'):'';
	},
	
	//PTemplate
	getTEMP_S : function(){
		if(Ext.StoreMgr.containsKey('TEMP_S')){
			return Ext.StoreMgr.get('TEMP_S');
		}
		else {		
			var store = this.createStore('TEMP_S','TEMP_Q','PTemplate',PTemplate);
			return store;
		}
	},

	getTemplates : function(t){	
		var a = this.getTEMP_S().getRange();var c=[];
		for(var i=0;i<a.length;i++){
			
			if(a[i].get('tetyCode')==t) 
				c[c.length]=[a[i].get('id'),a[i].get('tempName')];
		}
		return new Ext.data.SimpleStore({id:0,fields:['id','tempName'],data:c});
	},
	
	createXMLStore : function(actionCode,typeName,recordType,bp){
		return new Ext.data.Store({url:SERVICE_URL,
			baseParams:Ext.isEmpty(bp)?{_A:actionCode,_mt:'xml'}:bp,
			reader:new Ext.data.XmlReader({record:typeName}, recordType),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	},
	
	//GPort
	getPS : function(){
		return this.createXMLStore('PORT_Q','GPort',GPort,{_A:'PORT_Q',_mt:'xml',portType:0});
	},
	
	//GPort
	getAirPortStore : function(){
		return this.createXMLStore('PORT_Q','GPort',GPort,{_A:'PORT_Q',_mt:'xml',portType:1});
	},
	
	//GVessel
	getVES : function(){
			return this.createXMLStore('VESS_X','GVessel',GVessel);
	},
		
	getPROVINCE_S : function(){
		return this.createXMLStore('PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'xml',placType:1});
	},
	
	getCITY_S : function(provinceId){
		if(provinceId)
			return this.createXMLStore('PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'xml',placType:2,
				placProvinceId:provinceId});
		else
			return this.createXMLStore('PLAC_Q','GPlace',GPlace,{_A:'PLAC_Q',_mt:'xml',placType:2});
	},
    
	//CCustomerContact
	getCUCOS : function(){
		return this.createStore('','CUCO_Q','CCustomerContact',CCustomerContact);
	},
		
	//客户信息
	getCS : function(){
		//return this.createXMLStore('CUST_X','CCustomer',CCustomer);
		return new Ext.data.Store({url:SERVICE_URL+'?_A=CUST_X&_mt=xml',
			reader:new Ext.data.XmlReader({record:'CCustomer'}, CCustomer),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
		
	},
	//根据客户id获取客户名称 
	getCSNameById : function(value,metadata ,record ,rowIndex ,colIndex ,store ){
		if(value==''||value==undefined||value==null){
			return '';
		}
		else{
			var r=store.getById(value);
			return r==undefined?'':r.data.custNameCn;
		}
	},
	
	getComplaintTypeStore:function(){
		return this.createXMLStore('CCOMTYPE_Q','CComplaintType',CComplaintType,{_A:'CCOMTYPE_Q',_mt:'xml'});
	},
	
	getShipperStore : function(action){//CShipper
		return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
			reader:new Ext.data.XmlReader({record:'TConsign'}, TConsign )});},
	
	getStation : function(action){
		return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
			reader:new Ext.data.XmlReader({record:'TConsign'}, TConsign)});},
	
	getDriverName : function(action){
		return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
			reader:new Ext.data.XmlReader({record:'TConsign'}, TConsign)});},
	
	getVehicleNo : function(action){
		return new Ext.data.Store({url:SERVICE_URL+'?_A='+action+'&_mt=xml',
			reader:new Ext.data.XmlReader({record:'TConsign'}, TConsign)});},
	
	ENABLED_FLAG_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
	           ['0','否'],['1','是']]}),
	getEnableFlag:function(v){
		return HTStore.getNameById(HTStore.ENABLED_FLAG_S, v);
	},
	
	TIME_UNIT_S:new Ext.data.ArrayStore({id:0,fields:['CODE','NAME'],data:[
   	           ['0','年'],['1','季'],['2','月'],['3','周'],['4','天'],['5','时'],['6','分']]}),
   	getTimeUnit:function(v){
   		return HTStore.getNameById(HTStore.TIME_UNIT_S, v);
   	},
	
	iniStore : function(){
		this.getCOCO_S();
		this.getROLE_S();
		this.getTEMP_S();
		this.getCHAR_S();
		this.getPACK_S();
		this.getEXRA_S();
		HTStore.getNetwork_S().load();
		HTStore.getCOUN_S().load();
	}
};


function getRM(bizClass,bizType,shipType){
	var m1='',m2='';
	if(bizClass=='E') 
		m2=M2_E; 
	else if(bizClass=='I') 
		m2=M2_I;	
	if(bizType=='M'){
		m1 = M1_MARINE;
		if(shipType=='FCL' && bizClass=='I') 
			m2='01';
		else if(shipType=='LCL' && bizClass=='I') 
			m2='02';
		else if(shipType=='FCL' && bizClass=='E') 
			m2='03';
		else if(shipType=='LCL' && bizClass=='E') 
			m2='04';
		else if(shipType=='BULK' && bizClass=='I') 
			m2='05';
		else if(shipType=='BULK' && bizClass=='E') 
			m2='06';
	}
	else if(bizType=='A')
		m1 = M1_AIR;
	else if(bizType=='E')
		m1 = M1_EXPRESS;
	else if(bizType=='W')
		m1 = M1_WMS;
	else if(bizType=='T')
		m1 = M1_TMS;
	else if(bizType=='G'){
		m1 = M1_CUSTOMS;
		m2='01';
	}		
	else if(bizType=='I'){
		m1 = M1_CUSTOMS;
		m2='02';
	}		
	else
		m1=eval('M1_'+bizType);
	return m1+m2;
};

var F_V='01';//查看
var F_M='02';//编辑
var F_R='03';//删除
var F_UL='04';//解锁
var F_F='05';//作废
var F_E='06';//导出

var F_A='03';//
var F_A2='04';//
var F_A3='06';//财务审核
var F_A4='07';//经理审核
var F_CV='08';//
var F_CM='09';//
var F_WO='10';//
var F_IM='11';//
var F_SH='12';//

var F_MERGE='05';//

var M1_MARINE='0001';//海运
var MARINE_I_FCL = '01';
var MARINE_I_LCL = '02';
var MARINE_I_BULK = '05';
var MARINE_E_FCL = '03';
var MARINE_E_LCL = '04';
var MARINE_E_BULK = '06';
var MARINE_VOY = '07';
var M2_DOC='08';

var M2_I='01';
var M2_E='02';


var M1_AIR='0002';//空运
var M1_CUSTOMS='0004';//关务
var M1_WMS='0005';//WMS

var M1_DOC='0006';//单证跟踪
var M1_SET='0007';//商务结算
var M1_STAT='0008';//统计分析
var M1_CRM='0009';//客户供应商管理
var M1_GEN='0010';//基础数据
var M1_SYS='0011';//系统管理
var M1_WEB='0012';//网上服务
var M1_EXPRESS='0014';//快件
var M1_COMPLAINTS='0015';//客户投诉

var M2_A='01';
var M2_AE='04';

var M2_F='02';
var M2_L='03';
var M2_FE='05';
var M2_LE='06';

var M2_BV='04';
var M2_BC='05';
var M2_BP='06';
var M2_V='04';
var M2_R='05';



var CUSTOMS_CUDE = '01';
var CUSTOMS_INSP = '02';

var CRM_CUST='01';//客户供应商
var CRM_CATETORY='02';//客户供应商类别
var CRM_PRICE='03';//海运运价
var CRM_COMMISSION='04';//佣金

var M1_TMS='0013';//TMS
var TMS_TCON='01';//陆运单var MARINE_I_FCL = '01';
var TMS_TTASK='02';//派车单
var TMS_RELO='03';//车辆维修记录
var TMS_OILO='04';//车辆加油记录
var TMS_ACCI='05';//事故记录
var TMS_OICA='06';//加油卡管理
var TMS_TRACING_SETTING = '07';//货物跟踪设置
var TMS_PRICE='08';//运价管理
var TMS_DRIV='09';//驾驶员管理
var TMS_VEHI='10';//车辆管理
var TMS_SITE='11';//网点设置
var TMS_GEN='12';//基础数据
var TMS_EXPE='13';//费用
var TMS_TRANS_SETTING='14';//车辆跟踪
var TMS_RECEIPT_SETTING='15';//回单跟踪
var TMS_REPORT_SETTING='16';//货物日报表
var TMS_TCON_SETTING='17';//陆运日报表
var TMS_TTRANS_SETTING='18';//派车日报表
var TMS_DISTRIBUTION='19';//配送单


var TMS_VEHT='01';//车辆类型
var TMS_ACTY='02';//事故类型
var TMS_OITY='03';//油品类型
var TMS_OIST='04';//加油站
var TMS_TRANT='05';//运输类型

var TMS_M_E='04';//运维费用

var TMS_Q_QUERY='07';//快速查询
var TMS_C_QUERY='08';//复杂查询
var TMS_EXPORT='09';//输出
var TMS_SENDCAR_TASK='10';//生成派车单
var TMS_DELIVERY='11';//提货
var TMS_DEPARTURE='12';//发车
var TMS_STATION='13';//到站
var TMS_SIGN='14';//签收
var TMS_COST_SUB='15';//费用提交
var TMS_TTRANS_TRACING='16';//车辆跟踪
var TMS_RECEIPT='17';//生成回单 


var M3_CONS='01';
var M3_DOC='02';
var M3_EXPE='03';
var M3_TRAN='04';
var M3_WARE='05';
var M3_CUDE='06';
var M3_INSP='07';
var M3_BL='08';
var M3_CONT='09';
var M3_BBOOK='10';
var M3_SESH='11';
var M3_RABL='12';
var M3_DO='13';

//Express
var E_EXPRESS='01';
var E_NETWORK='02';
//M1_J 0010  基础数据
var G_VESS='01';
var G_COUN='02';//国家
var G_SHLI='03';
var G_PORT='04';//港口
var G_AIRP='05';
var G_UNIT='06';//计量单位
var G_PACK='07';
var G_COCL='08';
var G_COTY='09';
var G_VEHT='10';
var G_CACL='11';
var G_CATY='12';
var G_TRTE='13';
var G_TTER='14';
var G_TRTY='15';
var G_USAG='16';
var G_LETY='17';
var G_EXSE='18';
var G_TRAT='19';
var G_ISTY='20';
var G_SEWA='21';//结算方式
var G_CURR='22';//币种
var G_CHCL='23';//费用类别
var G_CHAR='24';//费用名称
var G_COBA='25';//银行账户
var G_DOTY='26';
var G_PATE='27';
var G_PLAC='28';//地点

//M1_S 0007 商务结算
var S_COAU='01';
var S_BILL_R='02';
var S_INVO_R='03';//应收账单
var S_PR_R='04';//托收单
var S_VOUC_R='05';//收款核销
var S_BILL_P='06';
var S_INVO_P='07';//应付账单
var S_PR_P='08';//付款申请
var S_VOUC_P='09';//付款核销
var S_INNO='10';//发票号码管理
var S_EXRA='11';//汇率
var S_GL='12';
var S_EXPE='13';//费用管理
var S_INRA='14';//利率
var S_EXHI='15';//财务接口
var S_BALA='16';//客户账户余额
var S_EXTE='17';//费用模板管理

var S_AR='01';
var S_AP='02';
var S_AC='03';

//COAU
var COAU_M = '01';
var COAU_A = '02';
var COAU_T = '03';
var COAU_E = '04';
var COAU_C = '05';

//M1_V 0009 供应商
var V_CUST='01';
var V_CUCA='02';
var V_PRSH='03';
var V_SAQU='04';

var W_WUSR='01';
var W_WINQ='02';
var W_CONS='03';
var W_BL='04';
var W_BILL='05';

//M1_T 0008 统计分析
var T_BUSI='01';//业务量汇总表
var T_BUEX='02';//利润汇总表
var T_BUDE='03';//业务明细统计表
var T_PROF='04';//利润分析表
var T_ACAR='05';//应收账款账龄分析表
var T_ACAP='06';//应付账款账龄分析表
var T_CUEX='07';//应收费用统计表
var T_VEEX='08';//应付费用统计表
var T_WROF='09';//核销明细统计表
var T_SALES='10';
var T_ARA='11';//应收账款回收情况分析表
var T_APA='12';//应付账款支付情况分析表
var T_PRCO='13';
var T_PRCH='14';
var T_PAY_PLAN='15';
var T_PROF_SALES='16';
var T_PTEU='17';//集装箱单箱利润统计表
var T_VEHI='18';//车辆业务汇总表
var T_DRIV='19';//驾驶员业务汇总表

var T_SEEX='20';//客户应收费用统计表

//M1_P 0011 系统管理
var A_GROU='01';//部门
var A_ROLE='02';//角色功能权限
var A_USER='03';//用户管理
var A_TEMP='04';//模板管理
var A_COCO='05';//系统参数设置
var A_ACLO='06';//操作日志


//仓储系统的菜单项及功能项M1_WMS

var WM_NOTEIN='01';				//入库单管理
var WM_NOTEOUT='02';			//出库单管理
                                //费用
var WM_NOTE='04';               //库存
var WM_WORK='05';               //作业
var WM_REPORTS='06';            //决策中心
var WM_BASE='07';               //基础数据

var WMI_IN='01';                //入库单
var WMI_RECEIVED='02';			//收货单
var WMI_QA ='03';				//检验单
var WMI_PLACED='04';			//上架
var WF_FROZEN='05';				//冻结
var WF_FROZEN_CANCEL='06';		//取消冻结
var WMI_OUT='01';				//出库
var WMI_PICKED='02';			//拣货出库
var WMI_CHECK='01';				//盘点
var WMI_TRANS_NOTE='02';		//移库
var WMI_INVENTORY='03';			//库存查询

var M2_WAREHOUSE='01';			//仓库管理
var M2_AREA='02';				//库区管理
var M2_BLOCK='03';				//库位管理
var M2_CATEGORY='04';			//商品类别
var M2_CARGO='05';				//商品维护
var M2_RATE='06';				//费率管理

var WF_LIST='00';               //查看
var WF_ADD='01';				//新增
var WF_EDIT='02';				//编辑
var WF_DEL='03';				//删除
var WF_COPY='04';				//复制
var WF_SAVE='05';				//保存
var WF_CANCEL='06';				//取消
var WF_SEARCH='07';				//查询
var WF_FILTER='08';				//过滤
var WF_EXPORT='09';				//输出
var WF_EXPENSE='10';			//费用
var WF_ADJUTS='20';				//调整
var WF_DO='22';					//执行
var WF_FINISHED='81';			//完成
var WF_CANCEL_FINISHED='82';	//取消完成
var WF_COMMIT='83';				//提交
var WF_CANCEL_COMMIT='84';		//取消提交

var WF_RECEIVED='91';			 //收货
var WF_QA='92';  				 //质检
var WF_PLACED='93';		 		 //上架
var WF_CANCELPLACED='96';		 //取消上架
var WF_PICKED='94';		    	 //拣货
var WF_TRANS='95';			     //出运
var WF_CONSIGN='98';			 //生成陆运单
var WF_CANCELlPICKED='97';		 //取消拣货

