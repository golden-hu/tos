package com.hitisoft.fos.wms.service;


import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.wms.dao.WAreaDao;
import com.hitisoft.fos.wms.dao.WAssetsDao;
import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.dao.WCargoKzDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WRateCustDao;
import com.hitisoft.fos.wms.dao.WRateDao;
import com.hitisoft.fos.wms.dao.WRateSheetDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WSmartExpenseDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.dao.WStorageRateDao;
import com.hitisoft.fos.wms.entity.WArea;
import com.hitisoft.fos.wms.entity.WAssets;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WCargoKz;
import com.hitisoft.fos.wms.entity.WInventory;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WRateSheet;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WSmartExpense;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fos.wms.entity.WStorageRate;
import com.hitisoft.fw.service.DaemonService;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class WCommonService extends DaemonService{
	@Autowired
	private WStorageNoteDao sndao;
	
	@Autowired
	private WStorageNoteCargoDao sncdao;
	
	@Autowired
	private WAssetsDao astdao;
	
	@Autowired
	private WPlacedCargoDao pcdao;
	
	@Autowired
	private WReceivedCargoDao rcdao;
	
	@Autowired
	private WRateDao rtdao;
	
	@Autowired
	private WRateSheetDao rtsdao;
	
	@Autowired
	private WRateCustDao rtcdao;
	
	@Autowired
	private WCargoDao wcdao;
	
	@Autowired
	private WStorageRateDao wsrDao;
	
	@Autowired
	private WSmartExpenseDao wseDao;
	
	@Autowired
	private SExpenseDao seDao;
	
	@Autowired
	private WCargoKzDao ckzDao;
	
	@Autowired
	private PCompanyConfigDao companyConfigDao;
	
	@Autowired
	private SessionContext sessionContext;	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public void createKZ(){
		setup();
		List<WCargoKz> list=ckzDao.dailyInventory();
		if(list.size()>0){
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put(Constants.COMCF_KEY, Constants.COMCF_CONS_LOCK_DAYS);
			List<PCompanyConfig> list2 = companyConfigDao.findByProperties(queryMap);
			for (PCompanyConfig companyConfig : list2) {
				if ("N".equalsIgnoreCase(companyConfig.getCocoValue())) {
					return;
				}
				sessionContext.setCompCode(companyConfig.getCompCode());
			}
			ckzDao.saveByRowAction(list);
			
		}
	}
	
	/**Action : Winventory_Qnew<p>
	 * 库存查询新
	 * @param conditions
	 * @return
	 */
	public List inventoryQueryNew(final List<HtQuery> conditions)
		{
			//生成一个Id号，之后会递增
			Long lngId=Long.valueOf(1);
			
			//通过查询条件取得数据
			List queryList=pcdao.getInventory(conditions);
			
			//定义一个库存实体类型的List，最后用来返回数据的
			List<WInventory> retList=new ArrayList<WInventory>();
			
			for (Object object : queryList) {
				WInventory wi=new WInventory();
				
				//转换成对像数组，数组中每一个元素，其实是一行数据，下面将把每一行数据组成一个Inventory的实体
				//目前可能只赋了Inventory实本中的部份值，如果需要话，就可以继续加
				Object[] ob=(Object[])object;
				
				//货物编号	
				if(ob[0]!=null)
					wi.setSkuNo(ob[0].toString());	
				//货物ID
				if(ob[1]!=null)
					wi.setCargoId((Integer) ob[1]);
				//货物名称
				if(ob[2]!=null)
					wi.setCargoName(ob[2].toString());
				//仓库ID，仓库代码，仓库名称
				if(ob[5]!=null)
					wi.setWarehouseName((String)ob[5]);
				//库区ID，库区代码，库区名称
				if(ob[8]!=null)
					wi.setAreaName((String)ob[8]);
				//库位ＩＤ，库位代码，库位名称
				if(ob[11]!=null)
					wi.setBlockName((String)ob[11]);
				//货物规格
				if(ob[12]!=null)
					wi.setCargoProperty((String)ob[12]);
				//货物型号
				if(ob[13]!=null)
					wi.setCargoType((String)ob[13]);
				//货物颜色
				if(ob[14]!=null)
					//wi.setcar((String)ob[14]);
				//数量
				if(ob[15]!=null){
					//BigDecimal quantity=(BigDecimal)ob[15];		//数量
					//wi.setQuantity( quantity.doubleValue());					
				}
				//件数 16
				//毛重 17
				//净重 18
				//体积 19
				//面积 20
				//上架数量 21
				//上架件数 22
				//上架毛重 23
				//上架净重 24
				//上架体积 25
				//上架面积 26
				//库存数量 27
				if(ob[27]!=null){
					BigDecimal quantity=(BigDecimal)ob[27];		//数量
					wi.setQuantity( quantity.doubleValue());					
				}
				//库存件数
				if(ob[28]!=null){
					BigDecimal packages=(BigDecimal)ob[28];		//件数
					wi.setPackages( packages.doubleValue());					
				}
				//库存毛重
				if(ob[29]!=null){
					BigDecimal grossWeight=(BigDecimal)ob[29];		//毛量
					wi.setGrossWeight( grossWeight.doubleValue());				
				}
				//	BigDecimal grossWeight=(BigDecimal)ob[5];		//毛量
				/*wi.setGrossWeight( grossWeight.doubleValue());
				BigDecimal netWeight=(BigDecimal)ob[6];		//净重
				wi.setNetWeight( netWeight.doubleValue());
				BigDecimal volume=(BigDecimal)ob[7];		//体积
				wi.setVolume( volume.doubleValue());
				BigDecimal measure=(BigDecimal)ob[8];		//面积
				wi.setMeasure( measure.doubleValue());*/
				//库存净重
				if(ob[30]!=null){
					BigDecimal netWeight=(BigDecimal)ob[30];		//净重
					wi.setNetWeight( netWeight.doubleValue());			
				}
				//库存体积
				if(ob[31]!=null){
					BigDecimal volume=(BigDecimal)ob[31];		//体积
					wi.setVolume( volume.doubleValue());		
				}
				//库存面积
				if(ob[32]!=null){
					BigDecimal measure=(BigDecimal)ob[32];		//面积
					wi.setMeasure( measure.doubleValue());		
				}
				//数量单位
				if(ob[33]!=null){
					wi.setqUnitName((String)ob[33]);	
				
				/*wi.setqUnitName((String)ob[9]);
				wi.setpUnitName((String)ob[10]);
				wi.setwUnitName((String)ob[11]);
				wi.setvUnitName((String)ob[12]);
				wi.setmUnitName((String)ob[13]);*/
				}
				//件数单位
				if(ob[34]!=null){
						
				
				
				wi.setpUnitName((String)ob[34]);
				//wi.setwUnitName((String)ob[11]);
				//wi.setvUnitName((String)ob[12]);
				//wi.setmUnitName((String)ob[13]);
				}
				//重量单位
				if(ob[35]!=null){
					
					
					
					
					wi.setwUnitName((String)ob[35]);
					//wi.setvUnitName((String)ob[12]);
					//wi.setmUnitName((String)ob[13]);
					}
				//体积单位
				if(ob[36]!=null){
					
					wi.setvUnitName((String)ob[36]);
					//wi.setmUnitName((String)ob[13]);
					}
				//面积单位
				if(ob[37]!=null){
					
					wi.setmUnitName((String)ob[37]);
				}
				//生效日期
				if(ob[38]!=null){
					
					wi.setProductDate((Date)ob[38]);
				}
				//生产编号
				if(ob[39]!=null){
					
					wi.setProductNo((String)ob[39]);
				}
				//备注
				if(ob[40]!=null){
					
					wi.setRemarks((String)ob[40]);
				}
				//仓单号
                if(ob[41]!=null){
					
					wi.setStorageNoteNo((String)ob[41]);
				}
				//接单日期
                if(ob[42]!=null){
					
					wi.setStorageDate((Date)ob[42]);
				}
				//货主
                if(ob[43]!=null){
					wi.setCargoOwner((String)ob[43]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//结算对象
                if(ob[44]!=null){
                	wi.setAccountName((String)ob[44]);
					
					//wi.setStorageDate((Date)ob[42]);
				}
				//订单号
                if(ob[45]!=null){
					wi.setOrderNo((String)ob[45]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//客户订单号
                if(ob[46]!=null){
					wi.setEntrustNo((String)ob[46]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//客户ＩＤ
                if(ob[47]!=null){
					wi.setCustId((Integer)ob[47]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//客户名称
                if(ob[48]!=null){
					wi.setCustName((String)ob[48]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//批次号
                if(ob[49]!=null){
					wi.setBatchNo((String)ob[49]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//层
                if(ob[50]!=null){
					wi.setBlockLayer((Integer)ob[50]);
					//wi.setStorageDate((Date)ob[42]);
				}
				//货物类别
                if(ob[51]!=null){
                	wi.setCategoryName((String)ob[51]);
					
				}
				//货物品牌
                if(ob[52]!=null){
					wi.setCargoBrand((String)ob[52]);
					
                }
				//收货日期
                if(ob[53]!=null){
					wi.setReceivedDate((Date)ob[54]);
					
				}
				//上架日期\
                if(ob[54]!=null){
					wi.setPlacedDate((Date)ob[54]);
					
				}
				//库龄
                if(ob[55]!=null){
                	BigInteger stockDays=(BigInteger)ob[55];
					wi.setStockDays(stockDays.intValue());
					
				}
				//货龄
                if(ob[56]!=null){
                	BigInteger cargoAges=(BigInteger)ob[56];
					wi.setCargoAges(cargoAges.intValue());
					
				}
				//状态
                if(ob[57]!=null){
					wi.setStatus((String)ob[57]);
					
				}
				
				
				wi.setMakeReportUser(sessionContext.getUsername());
				retList.add(wi);
				lngId++;
			}
			
			
			return retList;
		}
	
	
	/**Action : WINVENTORY_IQ<p>
	 * 库存盘点查询
	 * @param conditions
	 * @return
	 */
		@SuppressWarnings({ "unchecked", "rawtypes"})
		@Transactional(readOnly = true)
		public List inventoryQuery(final List<HtQuery> conditions) {
			/*for(HtQuery p:conditions)
			{
				//p.
			
			}*/
			
			
			List<WPlacedCargo> pcObjectList=pcdao.excelQuery1(conditions);			//上架的取数据
			List<WReceivedCargo> rcObjectList=rcdao.excelQuery(conditions);			//收货的取数据
			List<WInventory> retList = new ArrayList<WInventory>();
			
			Date now = new Date();
			//now.getTime();
			
			//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
			
			
			for(Object o:pcObjectList){
				Object[] objs=(Object[])o;
				WPlacedCargo pc=(WPlacedCargo)objs[0];
				
				Integer custId=0;
				if(objs[1]!=null)
					custId=(Integer)objs[1];
				
				String custName=(String)objs[2];
				Date actureTime=(Date)objs[3];
				String orderNo=(String)objs[4];
				Integer accountId=0;
				if(objs[5]!=null)
				  accountId=(Integer)objs[5];
				String accountName=(String)objs[6];
				Byte storageType=(Byte)objs[7];
				Date receivedDate=(Date)objs[8];
				if(pc.getNowQuantity()>0){
					WInventory it=new WInventory();
					it.setId(pc.getId());
					it.setAreaId(pc.getAreaId().intValue());
					it.setAreaName(pc.getAreaName());
					it.setBlockId(pc.getBlockId().intValue());
					it.setBlockName(pc.getBlockName());
					it.setWarehouseName(pc.getWarehouseName());
					it.setCargoId(pc.getCargoId().intValue());
					it.setCargoName(pc.getCargoName());
					it.setSkuNo(pc.getSkuNo());
					it.setStorageNoteNo(pc.getStorageNoteNo());
					it.setBatchNo(pc.getBatchNo());
					it.setCustId(pc.getCustId().intValue());
					it.setCustName(pc.getCustName());
					it.setqUnitName(pc.getUnitName());
					it.setQuantity(pc.getNowQuantity());
					it.setStorageDate(pc.getReceivedDate());
					it.setCargoType(pc.getSpecification());
					it.setOrderNo(pc.getOrderNo());
					it.setBatchNo(pc.getBatchNo());
					it.setProductDate(pc.getProductDate());
					it.setStorageNoteId(pc.getStorageNoteId().intValue());
					it.setStorageNoteCargoId(pc.getStorageNoteCargoId().intValue());
					it.setPlacedCargoId(pc.getId().intValue());
					it.setReceivedCargoId(pc.getReceivedCargoId().intValue());
					
					it.setActureTime(actureTime);
					it.setAccountId(accountId);
					it.setAccountName(accountName);
					it.setStorageType(storageType);
					
					Long stockDays=TimeUtil.getDiffDays(pc.getReceivedDate(), now);					
					it.setStockDays(stockDays.intValue());
					it.setReceivedDate(receivedDate);
					
					
					retList.add(it);
				}
			}
			
			for(Object O2:rcObjectList){
				Object[] objs=(Object[])O2;
				WReceivedCargo rc=(WReceivedCargo)objs[0];
				
				Integer custId=0;
				if(objs[1]!=null)
					custId=(Integer)objs[1];
				
				String custName=(String)objs[2];
				Date actureTime=(Date)objs[3];
				String orderNo=(String)objs[4];
				Integer accountId=0;
				if(objs[5]!=null)
				  accountId=(Integer)objs[5];
				String accountName=(String)objs[6];
				Byte storageType=(Byte)objs[7];
				
				Double pQuantity=0.0;
				if(rc.getPlacedQuantity()!=null){
					pQuantity=rc.getPlacedQuantity();
				}
				if((rc.getQuantity()-pQuantity)>0.0){
					WInventory it=new WInventory();
					it.setId(rc.getId());
					it.setAreaId(rc.getAreaId().intValue());
					it.setAreaName(rc.getAreaName());
					it.setBlockId(rc.getBlockId().intValue());
					it.setBlockName(rc.getBlockName());
					it.setWarehouseName(rc.getWarehouseName());
					it.setCargoId(rc.getCargoId().intValue());
					it.setCargoName(rc.getCargoName());
					it.setSkuNo(rc.getSkuNo());
					it.setStorageNoteNo(rc.getStorageNoteNo());
					it.setBatchNo(rc.getBatchNo());
					it.setCustId(custId);
					it.setCustName(custName);
					it.setqUnitName(rc.getUnitName());
					
					if (rc.getPlanedQuantity()==null)
					{
						rc.setPlanedQuantity(0.00);
					}
					
					it.setQuantity(rc.getPlanedQuantity()-pQuantity);
					it.setStorageDate(rc.getReceivedDate());
					it.setCargoType(rc.getSpecification());
					it.setOrderNo(orderNo);
					it.setBatchNo(rc.getBatchNo());
					it.setStorageNoteId(rc.getStorageNoteId().intValue());
					it.setStorageNoteCargoId(rc.getStorageNoteCargoId().intValue());
					it.setReceivedCargoId(rc.getId().intValue());
					
					it.setReceivedDate(rc.getReceivedDate());
					
					
					it.setProductDate(rc.getProductDate());
					Long stockDays=TimeUtil.getDiffDays(rc.getReceivedDate(), now);					
					it.setStockDays(stockDays.intValue());
					
					it.setActureTime(actureTime);
					it.setAccountId(accountId);
					it.setAccountName(accountName);
					it.setStorageType(storageType);
					
					
					retList.add(it);
				}
			}
			
			return retList;
		}
		/**Action : WINVENTORY_PC
		 * 智能计费，费用预览
		 * @param entityList
		 * @return
		 */
		//1、先根据库存表，查询出费率里存在的单价
		//2、再将单价与库存数量进行计算
		@SuppressWarnings("unchecked")
		@Transactional
		public List previewCost(List entityList) {
			List retList=new ArrayList();
			Date now=new Date();
			
			for(Object obj : entityList){
				if(obj instanceof WInventory){
					WInventory wInventory=(WInventory) obj;
					
					//构造SQL 参数序列
					List<HtQuery> conditions = new ArrayList<HtQuery>();
					//商品ＩＤ，cargoId
					HtQuery hq = new HtQuery();
					hq.setKey("cargoId");
					if(wInventory.getCargoId()!=null)
					{
						hq.setValue(wInventory.getCargoId().toString());
					}
					else
						hq.setValue("0");
					hq.setOp(SqlOp.equal);					
					conditions.add(hq);
					//CustId
					HtQuery hq2=new HtQuery();
					hq2.setKey("custId");
					if(wInventory.getCustId()!=null){
						hq2.setValue(wInventory.getCustId().toString());
					}
					else
						hq2.setValue("0");					
					hq2.setOp(SqlOp.equal);
					conditions.add(hq2);
					
					HtQuery hq3=new HtQuery();
					hq3.setKey("warehouseId");
					if(wInventory.getWarehouseId()!=null){
						hq3.setValue(wInventory.getWarehouseId().toString());
						hq3.setOp(SqlOp.equal);
						conditions.add(hq3);
					}
					
					HtQuery hq4=new HtQuery();
					hq4.setKey("storageType");
					if(wInventory.getStorageType()!=null){
						hq4.setValue(wInventory.getStorageType().toString());
						hq4.setOp(SqlOp.equal);
						conditions.add(hq4);
					}				
					
						
					
					//查询费率表
					List rateList=rtdao.queryCostRate(conditions);
					for(Object r:rateList){
						Object[] objs=(Object[])r;
						WRate wRate=(WRate)objs[0];
						
						String categoryName=(String)objs[1];
						
						
						wRate.setAccountId(wInventory.getCustId());
						wRate.setAccountName(wInventory.getCustName());
						
						wRate.setCargoOwnerId(wInventory.getCargoOwnerId());
						wRate.setCargoOwner(wInventory.getCargoOwner());
						wRate.setCargoId(wInventory.getCargoId());
						wRate.setCargoName(wInventory.getCargoName());
						wRate.setPlacedCargoId(wInventory.getPlacedCargoId());
						wRate.setStorageNoteId(wInventory.getStorageNoteId());
						wRate.setStorageNoteCargoId(wInventory.getStorageNoteCargoId());
						wRate.setReceviedCargoId(wInventory.getReceivedCargoId());
						
						String storageFlag="";
						if(wRate.getStrongInFlag().equals(new Byte("1"))){
							//wRate.setStorageFlag("进仓");
							storageFlag=" 进仓";
						}
						if(wRate.getStrongOutFlag().equals(new Byte("1"))){
							//wRate.setStorageFlag("出仓");
							storageFlag+=" 出仓  ";
						}
						if(wRate.getStrongInsideFlag().equals(new Byte("1"))){
							//wRate.setStorageFlag("出仓");
							storageFlag+=" 库内操作  ";
						}
						if(wRate.getStrongOutFlag().equals(new Byte("1"))){
							//wRate.setStorageFlag("出仓");
							storageFlag+=" 其他  ";
						}
						wRate.setStorageFlag(storageFlag);
						wRate.setCategoryName(categoryName);
						
						retList.add(wRate);	
						
						//根据费率表，计算费用情况
						WSmartExpense wSmartExpense=new WSmartExpense();
						wSmartExpense.setAccountId(wRate.getAccountId());
						wSmartExpense.setAccountName(wRate.getAccountName());
					
						//wSmartExpense.setCharId(wRate.getCharCode())
						wSmartExpense.setCharName(wRate.getCharName());
						wSmartExpense.setUnitPrice(wRate.getUnitPrice());
						wSmartExpense.setNum(wInventory.getQuantity());
						Double unitPrice=0.0;
						if(wRate.getUnitPrice()!=null)
							unitPrice=wRate.getUnitPrice();
						
						Double num=0.0;
						if(wInventory.getQuantity()!=null)
							num=wInventory.getQuantity();
						wSmartExpense.setAmount(unitPrice*num);
						wSmartExpense.setCurrCode(wRate.getCurrCode());
						//TODO:汇率暂时没有算
						//TODO:起始时间没有计算出来
						/*
						 * 起始时间的计算分为两种，一种是第一次计算的，第二种是以前计算过的
						 * 第一次上架或者刚收到货的，就起始直接默认为收货时间当天 
						 * 如果上次计算过的，刚黙认为上次计算的截止时间的第二天
						 */
						
						wSmartExpense.setEndDate(now);
						wSmartExpense.setOwnerMonth(now);
						wSmartExpense.setStorageNoteNo(wInventory.getStorageNoteNo());
						wSmartExpense.setStorageNoteId(wInventory.getStorageNoteId().longValue());
						wSmartExpense.setPlacedCargoId(wInventory.getPlacedCargoId());
						wSmartExpense.setReceivedCargoId(wInventory.getReceivedCargoId());
						if(wRate.getCostInFlag().intValue()==0)
							wSmartExpense.setExpeType('R');
						else
							wSmartExpense.setExpeType('P');
						String remarks=now.toString()+" "+unitPrice.toString()+"*"+num.toString();
						wSmartExpense.setRemarks(remarks);
						
						retList.add(wSmartExpense);
						
					}
				}
			}
			return retList;
		}
		
		/**Action : WINVENTORY_CC
		 * Method:将智能计费的费用生成至应收应付
		 * 参数：前台页面上显示费用内容
		 */
		@SuppressWarnings("unchecked")
		@Transactional
		public List createCost(List<WSmartExpense> entityList){
			List retList=new ArrayList();
			for(WSmartExpense entity:entityList){
				if(entity!=null){
					//entity.setUuid(ConstUtil.getUUID());
					RowAction ra=entity.getRowAction();
					entity=wseDao.saveByRowActionSolo(entity);
					retList.add(entity);
					if(ra==RowAction.N){
						SExpense se=new SExpense();
						se.setRowAction(RowAction.N);
						se.setVersion(0);
						se.setCompCode(sessionContext.getCompCode());
						se.setUuid(ConstUtil.getUUID());
						se.setCreateBy(sessionContext.getUsername());
						se.setCreateTime(new Date());
						
						se.setConsId(entity.getStorageNoteId().longValue());
						se.setConsNo(entity.getStorageNoteNo());
						se.setObjectId1(entity.getId().intValue());
						
						se.setConsCustId(entity.getAccountId().longValue());
						se.setConsCustName(entity.getAccountName());
						se.setConsBizType("W");
						se.setCustId(entity.getAccountId());
						se.setCustName(entity.getAccountName());
						se.setCharId(entity.getCharId().longValue());
						se.setCharName(entity.getCharName());
						se.setCharNameEn(entity.getCharNameEn());
						se.setExpeType(String.valueOf(entity.getExpeType()));
						se.setExpeDate(new Date());
						se.setUnitName(entity.getUnitName());
						se.setExpeUnitPrice(BigDecimal.valueOf(entity.getUnitPrice()));
						se.setExpeNum(BigDecimal.valueOf(entity.getNum()));
						se.setExpeNum2(se.getExpeNum());
						se.setExpeTotalAmount(BigDecimal.valueOf(entity.getAmount()));
						//se.setExpeExRate(BigDecimal.valueOf(1.00));
						//se.setExpeRcAmount(se.getExpeTotalAmount());
						se.setCurrCode(entity.getCurrCode());
						
						se=seDao.saveByRowActionSolo(se);
						retList.add(se);
						
						
					}
				}
			}
			return retList;
		}
		
		
		public List autoCreateCost4Single(List entityList){
			List resList=new ArrayList();
			List<WStorageNote> wsnList=new ArrayList<WStorageNote>();
			List<HtQuery> conditions=new ArrayList<HtQuery>();
			String htValue="0";
			for(Object obj:entityList){
				WStorageNote entity=(WStorageNote)obj;
				wsnList.add(entity);
				htValue+=","+entity.getId();
			}
			HtQuery ht=new HtQuery();
			ht.setKey("storageNoteIdList");
			ht.setValue(htValue);
			ht.setOp(SqlOp.in);
			conditions.add(ht);
			
			//获得所有相关的费率
			List<WRate> wrList=getWRateList(conditions);
			//获得所有对应的货物列表
			List<WStorageNoteCargo>sncList=sncdao.excelQueryStorageNoteCargo(conditions);
			//获得所有对应的托盘数列表
			List<WAssets> asList=astdao.excelQueryAssetsList(conditions);
			//获得所有已经生成过的费用列表
			List<WSmartExpense> wseList=wseDao.excelQuerySmartExpenseList(conditions);
			
			//1、根据货物列表，对应费率表，生成费用
			autoComputeCostByCargoList(resList,sncList,wrList,wseList);
			
			//2、根据托盘列表，对应费率表，生成费用
			autoComputeCostByAssetsList(resList,asList,wrList,wseList);
			
			return resList;
		}
		
		public WSmartExpense createNewSmartExpenseByCargo(WStorageNoteCargo sn,WRate wr,Double number){
			
			double unitPrice=NumberUtil.null2Zero(wr.getUnitPrice());
			WSmartExpense p=new WSmartExpense();
			p.setRowAction(RowAction.N);
			p.setVersion(0);
			p.setRemoved(Byte.valueOf("0"));
			p.setCompCode(sessionContext.getCompCode());
			p.setCreateBy(sessionContext.getUsername());
			p.setUuid(ConstUtil.getUUID());
			p.setUnitName(wr.getUnitName());
			//custId=storageNote.cargoOwnerId
			p.setAccountId(sn.getCustId());
			p.setAccountName(sn.getCustName());
			p.setCharId(wr.getCharId());
			p.setCharName(wr.getCharName());
			p.setCharNameEn(wr.getCharCode());
			
			p.setUnitPrice(wr.getUnitPrice());
			p.setNum(number);
			p.setAmount(unitPrice*number);
			p.setCurrCode(wr.getCurrCode()!=null?wr.getCurrCode():"CNY");
			p.setStorageNoteId(sn.getStorageNoteId().longValue());
			p.setStorageNoteNo(sn.getStorageNoteNo());
			p.setRateId(wr.getId());
			p.setRateMode(wr.getRateType());
			p.setCreateTime(new Date());
			if(wr.getCostInFlag().intValue()==0)
				p.setExpeType('P');
			else
				p.setExpeType('R');
			System.out.println(sn.getStorageNoteNo()+"加一条！"+number+";"+wr.getUnitPrice());
			
			return p;
		}
		
		/*
		 * resList:保存结果
		 * sncList:货物列表
		 * wrList:费率列表
		 * wseList：自动计费中间表
		 */
		public void autoComputeCostByCargoList(List resList,List<WStorageNoteCargo> sncList,
				List<WRate> wrList,List<WSmartExpense> wseList){
			for(WStorageNoteCargo snc:sncList){
				if(snc.getStatus()==5){
				for(WRate wr:wrList){
					//如果费率表的关联主表ID与货物列表的关取主表ID相同，并且货物ID也相同
					//1、判断是否已经生成过费用
					//2、如果没有生成过费用则，生成新的费用
					if(wr.getStorageNoteId().equals(snc.getStorageNoteId())){
						
						if(wr.getCargoId()!=null&&wr.getCargoId().equals(snc.getCargoId())){
							boolean isCreated=false;
							for(WSmartExpense wse:wseList){
								if(wr.getId().equals(wse.getRateId().longValue())&&
										wse.getStorageNoteId().equals(snc.getStorageNoteId().longValue())){
									isCreated=true;
								}
								else{
									System.out.println("wse:rateid:"+wse.getRateId()+" and wr.getId"+wr.getId());
									System.out.println("wse:storagenoteId:"+wse.getStorageNoteId()+" and snc.storagenoteid:"+snc.getStorageNoteId());
								}
							}
							if(!isCreated){
								if(wr.getUnit().equals("计费重")){
									WCargo wc=wcdao.findById(wr.getCargoId().longValue());
									double volume=NumberUtil.null2Zero(snc.getReceivedVolume());
									double grossWeight=NumberUtil.null2Zero(snc.getReceivedGrossWeight());
									
									double chargingWeight=volume/3;
									if(snc.getvUnitName().equals("立方分米")){
										chargingWeight=chargingWeight/1000;
									}
									if(chargingWeight<grossWeight){
										chargingWeight=grossWeight;
									}
									
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,chargingWeight);
									
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
								else if(wr.getUnit().equals("毛重")){
									double grossWeight=NumberUtil.null2Zero(snc.getReceivedGrossWeight());
									
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,grossWeight);
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
								else if(wr.getUnit().equals("净重")){
									double netWeight=NumberUtil.null2Zero(snc.getReceivedNetWeight());
									
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,netWeight);
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
								else if(wr.getUnit().equals("体积")){
									double volume=NumberUtil.null2Zero(snc.getReceivedVolume());
									if(snc.getvUnitName().equals("立方分米")){
										volume=volume/1000;
									}
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,volume);
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
								else if(wr.getUnit().equals("面积")){
									double measure=NumberUtil.null2Zero(snc.getReceivedMeasure());
									
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,measure);
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
								else if(wr.getUnit().equals("件数")){
									double packages=NumberUtil.null2Zero(snc.getReceivedPackages());
									if(wr.getUnitName().equals(snc.getpUnit())){
										WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,packages);
										//p=wseDao.saveByRowActionSolo(p);
										resList.add(p);
									}
								}
								else if(wr.getUnit().equals("数量")){
									double quantity=NumberUtil.null2Zero(snc.getReceivedQuantity());
									if(wr.getUnitName().equals(snc.getUnitName())){
									WSmartExpense p=createNewSmartExpenseByCargo(snc,wr,quantity);
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
									}
								}
								else if(wr.getUnit().equals("长")){
									/*double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
									
									WSmartExpense p=createNewSmartExpense(sn,wr,measure);
									p=wseDao.saveByRowActionSolo(p);
									resList.add(p);*/
								}
								else if(wr.getUnit().equals("宽")){
									/*double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
									
									WSmartExpense p=createNewSmartExpense(sn,wr,measure);
									p=wseDao.saveByRowActionSolo(p);
									resList.add(p);*/
								}
								else if(wr.getUnit().equals("高")){
									/*double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
									
									WSmartExpense p=createNewSmartExpense(sn,wr,measure);
									p=wseDao.saveByRowActionSolo(p);
									resList.add(p);*/
								}
							}
						}
					}
					else{
						
					}
				}
			}
			}
		}
		
		public WSmartExpense createNewSmartExpenseByAssets(WAssets sn,WRate wr,Double number){
			
			double unitPrice=NumberUtil.null2Zero(wr.getUnitPrice());
			WSmartExpense p=new WSmartExpense();
			p.setRowAction(RowAction.N);
			p.setVersion(0);
			p.setRemoved(Byte.valueOf("0"));
			p.setCompCode(sessionContext.getCompCode());
			p.setCreateBy(sessionContext.getUsername());
			p.setUuid(ConstUtil.getUUID());
			p.setUnitName(wr.getUnitName());
			//custId=storageNote.cargoOwnerId
			p.setAccountId(sn.getCustId());
			p.setAccountName(sn.getCustName());
			System.out.println("assets account: "+p.getAccountId()+" ,"+p.getAccountName());
			p.setCharId(wr.getCharId());
			p.setCharName(wr.getCharName());
			p.setCharNameEn(wr.getCharCode());
			
			p.setUnitPrice(wr.getUnitPrice());
			p.setNum(number);
			p.setAmount(unitPrice*number);
			p.setCurrCode(wr.getCurrCode()!=null?wr.getCurrCode():"CNY");
			
			p.setStorageNoteId(sn.getStorageNoteId().longValue());
			p.setStorageNoteNo(sn.getStorageNoteNo());
			p.setRateId(wr.getId());
			p.setRateMode(wr.getRateType());
			p.setCreateTime(new Date());
			if(wr.getCostInFlag().intValue()==0)
				p.setExpeType('P');
			else
				p.setExpeType('R');
			System.out.println(sn.getStorageNoteNo()+"加一条！"+number+";"+wr.getUnitPrice());
			
			return p;
		}

		public void autoComputeCostByAssetsList(List resList,List<WAssets> asList,
				List<WRate> wrList,List<WSmartExpense> wseList){
			for(WAssets as:asList){
				//if(as.getStatus()==5){
				for(WRate wr:wrList){
					//System.out.println("wr.storagenoteid:"+wr.getStorageNoteId()+"and as.storageNoteId:"+as.getStorageNoteId());
					if(wr.getStorageNoteId().equals(as.getStorageNoteId()))
					{
						if(wr.getUnit().equals("托")){
							boolean isCreated=false;
							for(WSmartExpense wse:wseList){
								if(wr.getId().equals(wse.getRateId().longValue())&&
										wse.getStorageNoteId().equals(as.getStorageNoteId().longValue())){
									isCreated=true;
								}
							}
							if(!isCreated){
								Double countPallet=0.00;
								countPallet=as.getQuantity();
								if(countPallet>0){
									WSmartExpense p=createNewSmartExpenseByAssets(as,wr,countPallet);
									
									//p=wseDao.saveByRowActionSolo(p);
									resList.add(p);
								}
							}
						}
						else{
							System.out.println("unit:"+wr.getUnit());
						}
					}
					else{
						System.out.println("wr.storagenoteid:"+wr.getStorageNoteId()+"and as.storageNoteId:"+as.getStorageNoteId());
					}
				}
			}
			//}
			
		}
		/**Action : WCOMM_CISSC<p>
		 * 计算入库单单次费用
		 * @param entityList
		 * @return
		 */
		//WCOMM_CISSC
		@Transactional
		public List calcInStorageSingleCost(List entityList){
			
			return autoCreateCost4Single(entityList);
			/*List resList=new ArrayList();
			List<WStorageNote> wsnList=new ArrayList<WStorageNote>();
			List<HtQuery> conditions=new ArrayList<HtQuery>();
			String htValue="0";
			for(Object obj:entityList){
				WStorageNote entity=(WStorageNote)obj;
				wsnList.add(entity);
				htValue+=","+entity.getId();
			}
			HtQuery ht=new HtQuery();
			ht.setKey("storageNoteIdList");
			ht.setValue(htValue);
			ht.setOp(SqlOp.in);
			conditions.add(ht);
			
			List<WRate> wrList=getWRateList(conditions);
			List<WStorageNoteCargo>sncList=sncdao.excelQueryStorageNoteCargo(conditions);
			List<WAssets> asList=astdao.excelQueryAssetsList(conditions);
			List<WSmartExpense> wseList=wseDao.excelQuerySmartExpenseList(conditions);
			
			for(Object obj:entityList){
				if(obj instanceof WStorageNote){
					WStorageNote entity=(WStorageNote)obj;
					WStorageNote sn=sndao.findById(entity.getId());
					if(sn.getStatus()!=5){
						
						//System.out.println(sn.getStorageNoteNo()+"未完成！");
						sn.setRemarks("不是完成状态不能计费！");
						resList.add(sn);
						continue;
					}
					System.out.println(sn.getStorageNoteNo()+"执行！");
					List<WStorageNoteCargo> wscList=sncdao.findByProperty("storageNoteId", ""+sn.getId());
					List<WAssets> wasList=astdao.findByProperty("storageNoteId", ""+sn.getId());
					List<WStorageRate> wsrList=wsrDao.findByProperty("storageNoteId", ""+sn.getId());
					for(WStorageRate c:wsrList){
						WRate wr=rtdao.findById(c.getRateId().longValue());
						if(wr.getMode().equals("单票")){
							Double unitPrice=NumberUtil.null2Zero(wr.getUnitPrice());
							Map<String,String> ppMap=new HashMap<String,String>();
							ppMap.put("storageNoteId", ""+sn.getId());
							ppMap.put("rateId", ""+wr.getId());
							List<WSmartExpense> wseList=wseDao.findByProperties(ppMap);
							if(wseList.size()>0){//如果计费条目库中已经存在纪录了，表示已经生成过了，则不能再生成,
								sn.setRemarks("以前计过费了！不能重复计费！");
								resList.add(sn);
								
							}
							else{
								if(wr.getUnit().equals("托")){
									
									Double countPallet=0.00;
									for(WAssets was:wasList){								
										countPallet=countPallet+was.getQuantity();
									}
									if(countPallet>0){
										WSmartExpense p=createNewSmartExpense(sn,wr,countPallet);
										
										//p=wseDao.saveByRowActionSolo(p);
										resList.add(p);
									}
								
								}
								else{
									List<WRateSheet> wrsList=rtsdao.findByProperty("rateId", ""+c.getRateId());
									for(WRateSheet wrs:wrsList){
										for(WStorageNoteCargo snc:wscList){
											if(wrs.getCargoId()==snc.getCargoId()){//如果两个商品ID对应，则计费
												if(wr.getUnit().equals("计费重")){
													WCargo wc=wcdao.findById(wrs.getCargoId().longValue());
													double volume=NumberUtil.null2Zero(snc.getReceivedVolume());
													double grossWeight=NumberUtil.null2Zero(snc.getReceivedGrossWeight());
													
													double chargingWeight=volume/3;
													if(snc.getvUnitName().equals("立方分米")){
														chargingWeight=chargingWeight/1000;
													}
													if(chargingWeight<grossWeight){
														chargingWeight=grossWeight;
													}
													
													WSmartExpense p=createNewSmartExpense(sn,wr,chargingWeight);
													
													//p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("重量")){
													double grossWeight=NumberUtil.null2Zero(snc.getReceivedGrossWeight());
													
													WSmartExpense p=createNewSmartExpense(sn,wr,grossWeight);
													//p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("体积")){
													double volume=NumberUtil.null2Zero(snc.getReceivedVolume());
													if(snc.getvUnitName().equals("立方分米")){
														volume=volume/1000;
													}
													WSmartExpense p=createNewSmartExpense(sn,wr,volume);
													//p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("面积")){
													double measure=NumberUtil.null2Zero(snc.getReceivedMeasure());
													
													WSmartExpense p=createNewSmartExpense(sn,wr,measure);
													//p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("件数")){
													double packages=NumberUtil.null2Zero(snc.getReceivedPackages());
													if(wr.getUnitName().equals(snc.getpUnit())){
														WSmartExpense p=createNewSmartExpense(sn,wr,packages);
														//p=wseDao.saveByRowActionSolo(p);
														resList.add(p);
													}
												}
												else if(wr.getUnit().equals("数量")){
													double quantity=NumberUtil.null2Zero(snc.getReceivedQuantity());
													if(wr.getUnitName().equals(snc.getUnitName())){
													WSmartExpense p=createNewSmartExpense(sn,wr,quantity);
													//p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
													}
												}
												else if(wr.getUnit().equals("长")){
													double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
													
													WSmartExpense p=createNewSmartExpense(sn,wr,measure);
													p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("宽")){
													double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
													
													WSmartExpense p=createNewSmartExpense(sn,wr,measure);
													p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
												else if(wr.getUnit().equals("高")){
													double measure=NumberUtil.null2Zero(snc.getReceivedMeasurememt());
													
													WSmartExpense p=createNewSmartExpense(sn,wr,measure);
													p=wseDao.saveByRowActionSolo(p);
													resList.add(p);
												}
											}
										}
									}
								}
							}
						}
						
						
						
					}
				}
			}
			return resList;*/
		}
		
		public List<WRate> getWRateList(List<HtQuery> conditions){
			List<WRate> wrList=rtdao.excelQueryRateAndSheet(conditions);
			return wrList;
		}
		
		public WSmartExpense createNewSmartExpense(WStorageNote sn,WRate wr,Double number){
			
			double unitPrice=NumberUtil.null2Zero(wr.getUnitPrice());
			WSmartExpense p=new WSmartExpense();
			p.setRowAction(RowAction.N);
			p.setVersion(0);
			p.setRemoved(Byte.valueOf("0"));
			p.setCompCode(sessionContext.getCompCode());
			p.setCreateBy(sessionContext.getUsername());
			p.setUuid(ConstUtil.getUUID());
			p.setUnitName(wr.getUnitName());
			p.setAccountId(sn.getCargoOwnerId());
			p.setAccountName(sn.getCargoOwnerName());
			p.setCharId(wr.getCharId());
			p.setCharName(wr.getCharName());
			p.setCharNameEn(wr.getCharCode());
			
			p.setUnitPrice(wr.getUnitPrice());
			p.setNum(number);
			p.setAmount(unitPrice*number);
			p.setCurrCode(wr.getCurrCode());
			p.setStorageNoteId(sn.getId());
			p.setStorageNoteNo(sn.getStorageNoteNo());
			p.setRateId(wr.getId());
			p.setRateMode(wr.getRateType());
			p.setCreateTime(new Date());
			if(wr.getCostInFlag().intValue()==0)
				p.setExpeType('R');
			else
				p.setExpeType('P');
			System.out.println(sn.getStorageNoteNo()+"加一条！"+number+";"+wr.getUnitPrice());
			//p=wseDao.saveByRowActionSolo(p);
			//resList.add(p);
			return p;
		}
	
}
