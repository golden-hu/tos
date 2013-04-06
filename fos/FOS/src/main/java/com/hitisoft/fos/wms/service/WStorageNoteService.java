package com.hitisoft.fos.wms.service;

import java.math.BigDecimal;
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
import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WAssetsDao;
import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.dao.WPickedCargoDao;
import com.hitisoft.fos.wms.dao.WPlacedCargoDao;
import com.hitisoft.fos.wms.dao.WRateDao;
import com.hitisoft.fos.wms.dao.WReceivedCargoDao;
import com.hitisoft.fos.wms.dao.WSmartExpenseDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WAssets;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WSmartExpense;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class WStorageNoteService {
	@Autowired
	private WStorageNoteDao dao;
	@Autowired
	private WStorageNoteCargoDao cdao;
	
	@Autowired
	private WRateDao wrdao;
	
	@Autowired
	private WAssetsDao asdao;
	
	@Autowired
	private WCargoDao cadao;
	
	@Autowired
	private WReceivedCargoDao rcdao;
	
	@Autowired
	private WPickedCargoDao wpcdao;
	
	@Autowired
	private WPlacedCargoDao pcdao;
	
	@Autowired
	private SExpenseDao expenseDao;
	
	@Autowired
	private WSmartExpenseDao wseDao;
	
	@Autowired
	private WCommonService wcs;
	@Autowired
	private TConsignDao tcdao;
	
	@Autowired
	private TConsignCargoDao tccdao;
	
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private SerialFactory serialFactory;
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WSTORAGE_NOTE_S<p>
	 * 出入库保存当是出库移库时生成委托编号
	 * @param entityList  
	 * @return
	 */
	//WSTORAGE_NOTE_S
	@Transactional
	public List<WStorageNote> save(List<WStorageNote> entityList) {
		//用于获取入库单或者出库单的单号
		String no="";
		String ENo="";
		for (WStorageNote entity : entityList) {
			RowAction ra = entity.getRowAction();
			//如果是新增状态的话，需要去获得一个入库单号或出库单号
			if (ra == RowAction.N) {
				
				if (entity.getStorageType()==0)
				{
					no = serialFactory.getSerial("in_storage_note_no");
				}
				if (entity.getStorageType()==1)
				{
					no = serialFactory.getSerial("out_storage_note_no");
					if(entity.getActionGategory().equals("移库")){
						ENo = serialFactory.getSerial("entrust_no");
						entity.setEntrustNo(ENo);
					}
				}
				entity.setStorageNoteNo(no);
			}
			
			//如果是删除状态的话，就把该入库单或出库单下的货物明细一并删除
			if (ra==RowAction.R)
			{
				List<WStorageNoteCargo> wsnCargo=cdao.findByProperty("storageNoteId", ""+entity.getId());
				List<WAssets> asList=asdao.findByProperty("storageNoteId", ""+entity.getId());
				
				List<WReceivedCargo> rcCargo=rcdao.findByProperty("storageNoteId", ""+entity.getId());
				List<WPlacedCargo> pcCargo=pcdao.findByProperty("storageNoteId", ""+entity.getId());
				List<WPickedCargo> wpcCargo=wpcdao.findByProperty("outStorageNoteId", ""+entity.getId());
				
				for (WStorageNoteCargo wStorageNoteCargo : wsnCargo) {
					wStorageNoteCargo.setRowAction(RowAction.R);
				}
				
				for(WAssets as:asList){
					as.setRowAction(RowAction.R);
				}
				
				for(WReceivedCargo rc:rcCargo){
					rc.setRowAction(RowAction.R);
				}
				
				for(WPlacedCargo pc:pcCargo){
					pc.setRowAction(RowAction.R);
				}
				
				for(WPickedCargo wpc:wpcCargo){
					wpc.setRowAction(RowAction.R);
				}
				rcdao.saveByRowAction(rcCargo);
				pcdao.saveByRowAction(pcCargo);
				cdao.saveByRowAction(wsnCargo);
				asdao.saveByRowAction(asList);
				wpcdao.saveByRowAction(wpcCargo);
			}
			
				
		}
		return dao.saveByRowAction(entityList);
	}
	/** Action : WSTORAGE_NOTE_ST<p>
	 * 出库单出运保存
	 * @param entity
	 * @return
	 */
	@Transactional
	public WStorageNote saveTrans(WStorageNote entity){
		if(entity!=null){
			entity.setRowAction(RowAction.M);
			entity=dao.saveByRowActionSolo(entity);
			
			List<WPickedCargo> wpcList=wpcdao.findByProperty("outStorageNoteId", ""+entity.getId());
			for(WPickedCargo wpc:wpcList){
				wpc.setSendQuantity(wpc.getPickedQuantity());
				wpc.setSendGrossWeight(wpc.getPickedGrossWeight());
				wpc.setSendNetWeight(wpc.getNetWeight());
				wpc.setSendVolume(wpc.getPickedVolume());
				wpc.setSendMeasurement(wpc.getPickedMeasurement());
				wpc.setRowAction(RowAction.M);
				wpc=wpcdao.saveByRowActionSolo(wpc);
			}
		}
		
		return entity;
	};

	/**Action : WSTORAGE_NOTE_Q<p>
	 * 出（入）库单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageNote> query() {
		return dao.findByProperties();
	}
	/**Action : WSTORAGE_NOTE_E<p>
	 * 根据条件查询入库单
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageNote> storageNoteCondition(List<HtQuery> conditions){
		
		List<WStorageNote> objList = dao.storageNoteCondition(conditions);
		
		return objList;
	}
	
	private WStorageNote getAddress(String str){
		String name = "";		
		int idx = str.indexOf("\n");				
		if(idx==-1){
			name = str;
		}
		else{
			name = str.substring(0,idx);
		}
		if(StringUtil.isNotBlank(name)){
			WStorageNote wsn = new WStorageNote();
			wsn.setLoadAddress(name);
			wsn.setTransCarrier(name);
			return wsn;
		}
		return null;
	}
	
	/**Action : WSTORAGE_NOTE_F<p>
	 * 获取收货地址
	 * @return
	 */
	//
	@Transactional(readOnly = true)
	public List<WStorageNote> getLoadAddress(){
		List<WStorageNote> retlist=new ArrayList<WStorageNote>();
		List<WStorageNote> objList = dao.getLoadAddress();
		if(objList.size()>0){
			for(Object obj: objList){
				if(obj instanceof Object){
					String wsn=(String) obj;
					WStorageNote wn = getAddress(wsn);
					if(wn!=null){
						retlist.add(wn);
					}
				}
			  }
		}
		return retlist;
	}
	
	/**Action : WSTORAGE_NOTE_F_CARRIER<p>
	 * 获取承运商
	 * @return
	 */
	    //WSTORAGE_NOTE_F_CARRIER
		@Transactional(readOnly = true)
		public List<WStorageNote> findTransCarrier(){
			List<WStorageNote> retlist=new ArrayList<WStorageNote>();
			List<WStorageNote> objList = dao.getTransCarrier();
			if(objList.size()>0){
				for(Object obj: objList){
					if(obj instanceof Object){
						String wsn=(String) obj;
						WStorageNote wn = getAddress(wsn);
						if(wn!=null){
							retlist.add(wn);
						}
					}
				  }
			}
			return retlist;
		}
	
		/**Action : WSTORAGE_NOTE_SCC<p>
		 * 多条件查询
		 * @param conditions
		 * @return
		 */
	@SuppressWarnings({ })
	@Transactional(readOnly = true)
	public List<WStorageNote> searchConditionsCargo(List<HtQuery> conditions){
		//List list= new ArrayList();
		List<WStorageNote> objList = dao.searchConditionsCargo(conditions);
		return objList;
	}
	
	/**Action : WSTORAGE_NOTE_U<p>
	 * 更新出（入）库单状态
	 * @return
	 */
	//WSTORAGE_NOTE_U
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public List updateStatus() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));//将要设置的状态
		List reList=new ArrayList();
		if(status==-1){
			WStorageNote entity=dao.findById(id);
			if(entity!=null){
				List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+id);
				double qTotal=0.00;
				double rqTotal=0.00;
				double pqTotal=0.00;
				double aqTotal=0.00;
				for(WStorageNoteCargo snc:sncList){
					qTotal+=NumberUtil.null2Zero(snc.getPlanedQuantity());
					rqTotal+=NumberUtil.null2Zero(snc.getReceivedQuantity());
					pqTotal+=NumberUtil.null2Zero(snc.getPlacedQuantity());
					aqTotal+=NumberUtil.null2Zero(snc.getAdjustQuantity());
				}
				
				if(qTotal<=pqTotal+aqTotal){
					entity.setStatus(5);
					entity.setActureTime(new Date());
				}
				else if(pqTotal>0&&qTotal>pqTotal&&qTotal<=rqTotal+aqTotal){
					entity.setStatus(4);
				}
				else if(qTotal>pqTotal&&qTotal>rqTotal+aqTotal){
					entity.setStatus(2);
				}
				else if(qTotal>rqTotal+aqTotal&&rqTotal+aqTotal>0){
					entity.setStatus(2);
				}
				else if(rqTotal+aqTotal==0){
					entity.setStatus(1);
				}
				entity.setRowAction(RowAction.M);
				entity=dao.update(entity);
				reList.add(entity);
			}
		}
		else{			
			WStorageNote entity = dao.findById(id);
			if (entity != null) {
				
				boolean isSetStatus=true;
				List<WStorageNoteCargo> listSnc=cdao.findByProperty("storageNoteId", ""+id);
				
				//如果将状态更改为0，即新增，则要判断上架数，或者拣货数
				//如果是入库，则要求上架数量必须为空
				//如果是出库，则要求拣货数量必须为空
				//首先
				if(status==0){
					//如果状态为配货中，则判断是不是存在已拣货数量，如果存在，则不允许取消提交。
					if(entity.getStatus()==2&&entity.getStorageType()==1){
						for(WStorageNoteCargo c:listSnc){
							if(c.getPickedQuantity()>0){
								isSetStatus=false;
								throw new BusinessException(FosExceptionEnum.WMS_EXIST_PICKED_CARGO);
							}
						}
					}
					else if(entity.getStatus()==2 && entity.getStorageType()==0){
						for(WStorageNoteCargo c:listSnc){
							if(c.getPlacedQuantity()>0){
								isSetStatus=false;
								throw new BusinessException(FosExceptionEnum.WMS_EXIST_PLACED_CARGO);
							}
						}
					}
				}
				
				if(status==5){
					//如果状态改为完成状态，
					//如果是入库刚要判断上架数量是不是等于计划数量，如果不是则不允许为完成
					//如果是出库则要判断拣货数量是不是等于计划数量，如果不是则不允许完成
					if(entity.getStorageType()==1){
						for(WStorageNoteCargo c:listSnc){
							if(c.getPlanedQuantity()!=(c.getPickedQuantity()+NumberUtil.null2Zero(c.getAdjustQuantity()))){
								isSetStatus=false;
								throw new BusinessException(FosExceptionEnum.WMS_PICKED_UN_EQ_PLANED_CARGO,c.getCargoName());
							}
						}
					}
					else if(entity.getStorageType()==0){
						for(WStorageNoteCargo c:listSnc){
							if(c.getPlanedQuantity()!=(c.getPlacedQuantity()+NumberUtil.null2Zero(c.getAdjustQuantity()))){
								isSetStatus=false;
								throw new BusinessException(FosExceptionEnum.WMS_PLACED_UN_EQ_PLANED_CARGO,c.getCargoName());
							}
						}
					}
				}
				if(isSetStatus){
					for(WStorageNoteCargo c : listSnc){
						c.setRowAction(RowAction.M);
						c.setStatus(status);
						c=cdao.saveByRowActionSolo(c);
						reList.add(c);
					}
					
					entity.setStatus(status);
					if(requestContext.get("actureTime") != null){
						entity.setActureTime(new Date());
					}
					entity=dao.update(entity);
					reList.add(entity);
				}
			}
		}
		
		return reList;
	}

	
	
	/**Action : WSTORAGE_NOTE_O<p>
	 * 空单栈板出库
	 * @return
	 */
	@Transactional
	public List updateStatusOnOne() {
		Long id = Long.valueOf(requestContext.get("id"));
		Integer status = Integer.valueOf(requestContext.get("status"));//将要设置的状态
		List reList=new ArrayList();
		
		WStorageNote entity = dao.findById(id);
		if (entity != null) {
			
			boolean isSetStatus=true;
			List<WStorageNoteCargo> listSnc=cdao.findByProperty("storageNoteId", ""+id);
			if(status==5){
				if(entity.getStorageType()==1){
					for(WStorageNoteCargo c:listSnc){
						if(c.getPlanedQuantity()>0){
							isSetStatus=false;
							throw new BusinessException(FosExceptionEnum.WMS_EXIST_PICKED_CARGO);
						}
					}
				}
				else if(entity.getStorageType()==0){
					for(WStorageNoteCargo c:listSnc){
						if(c.getPlacedQuantity()>0){
							isSetStatus=false;
							throw new BusinessException(FosExceptionEnum.WMS_EXIST_PLACED_CARGO);
						}
					}
				}
			}
			if(isSetStatus){
				for(WStorageNoteCargo c : listSnc){
					c.setRowAction(RowAction.M);
					c.setStatus(status);
					c=cdao.saveByRowActionSolo(c);
					reList.add(c);
				}
				
				entity.setStatus(status);
				entity=dao.update(entity);
				reList.add(entity);
			}
		}
		
		return reList;
	}
	
	
	
	/**Action : WSTORAGE_NOTE_A<p>
	 * 入库WStorageNote和WStorageNoteCargo报表查询
	 * @return
	 */
	@SuppressWarnings({"rawtypes", "unchecked" })
	@Transactional(readOnly=true)
	public List storageNoteAndCargo(){
		List storageNoteAndcarg =new ArrayList();
		Long id = Long.valueOf(requestContext.get("id"));
		WStorageNote objlist1=dao.findById(id);
		storageNoteAndcarg.add(objlist1);
		Map<String, String> map = new HashMap<String, String>();
		map.put("storageNoteId", requestContext.get("id"));
		storageNoteAndcarg.addAll(cdao.findByProperties(map));
		return storageNoteAndcarg;
	}
	/**Action : WSTORAGE_NOTE_CQCSN<p>
	 * 出入库单审核时的复杂查询
	 * @param conditions
	 * @return
	 */
	@SuppressWarnings({"unchecked", "rawtypes" })
	@Transactional(readOnly=true)
	public List complexQueryCheckStorageNote(List<HtQuery> conditions)
	{
		
		
		List storageNoteList=new ArrayList();
		
		List objList=dao.complexQueryCheck(conditions);
		
		checkMergeStatistics(storageNoteList,objList);
		
		//List ll= dao.queryByNativeSql("select * from w_placed_cargo");
		return storageNoteList;
	}
	
	/**
	 * 将出入库单审核时的复杂查询结果转换成WStorageNote对象，并同时算出毛利和毛利率
	 * @param retList
	 * @param objList
	 */
	@SuppressWarnings({"unchecked", "rawtypes" })
	private void checkMergeStatistics(List<WStorageNote> retList,List objList)
	{
		//遍历objList
		for(Object obj: objList)
		{
			//判断obj是不是一个数组
			if (obj instanceof Object[])
			{
				//将obj转成对象数组
				Object[] objArray=  (Object[]) obj;
				//将数组的第一个元素转成WStorageNote对象
				WStorageNote wsn=(WStorageNote) objArray[0];
				
				//获得应收和应付的值，转成BigDecimal
				BigDecimal r=(BigDecimal) objArray[1];
				BigDecimal p=(BigDecimal) objArray[2];
				
				//判断如果应收应付为null,则赋为0
				if (r==null)
				{
					r=new BigDecimal(0);
				}
				
				if (p==null)
				{
					p=new BigDecimal(0);
				}
				
				//应收应付赋值
				wsn.setSumR(r.doubleValue());
				wsn.setSumP(p.doubleValue());
				
				//计算毛利 ,毛利为r减p, BigDecimal的subtract方法
				BigDecimal grossProfit=r.subtract(p);
				
				wsn.setGrossProfit(grossProfit.doubleValue()); //毛利赋值
				
				//应收美元合计
				BigDecimal sumRUsd=(BigDecimal) objArray[3];
				if (sumRUsd==null)
				{
					sumRUsd=new BigDecimal(0);
				}
				wsn.setSumRUsd(sumRUsd.doubleValue());
				
				//应收人民币合计
				BigDecimal sumRCny=(BigDecimal) objArray[4];
				if (sumRCny==null)
				{
					sumRCny=new BigDecimal(0);
				}
				wsn.setSumRCny(sumRCny.doubleValue());
				
				//应付美元合计
				BigDecimal sumPUsd=(BigDecimal) objArray[5];
				if (sumPUsd==null)
				{
					sumPUsd=new BigDecimal(0);
				}
				wsn.setSumPUsd(sumPUsd.doubleValue());
				
				//应付人民币合计
				BigDecimal sumPCny=(BigDecimal) objArray[6];
				if (sumPCny==null)
				{
					sumPCny=new BigDecimal(0);
				}
				wsn.setSumPCny(sumPCny.doubleValue());
				
				//应收美元已开帐单合计
				BigDecimal sumRUsdInvoice=(BigDecimal) objArray[7];
				if (sumRUsdInvoice==null)
				{
					sumRUsdInvoice=new BigDecimal(0);
				}
				wsn.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());
				
				//应收人民币已开帐单合计
				BigDecimal sumRCnyInvoice=(BigDecimal) objArray[8];
				if (sumRCnyInvoice==null)
				{
					sumRCnyInvoice=new BigDecimal(0);
				}
				wsn.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());
				
				//应付美元已开帐单合计
				BigDecimal sumPUsdInvoice=(BigDecimal) objArray[9];
				if (sumPUsdInvoice==null)
				{
					sumPUsdInvoice=new BigDecimal(0);
				}
				wsn.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());
				
				//应付人民币已开帐单合计
				BigDecimal sumPCnyInvoice=(BigDecimal) objArray[10];
				if (sumPCnyInvoice==null)
				{
					sumPCnyInvoice=new BigDecimal(0);
				}
				wsn.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());
				
				//应收美元已核销合计
				BigDecimal sumRUsdWriteOff = (BigDecimal)objArray[11];
				if(sumRUsdWriteOff==null) sumRUsdWriteOff=new BigDecimal(0);				
				wsn.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());
				
				//应收人民币已核销合计
				BigDecimal sumRCnyWriteOff = (BigDecimal)objArray[12];
				if(sumRCnyWriteOff==null) sumRCnyWriteOff=new BigDecimal(0);				
				wsn.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());
				
				//应付美元已核销合计
				BigDecimal sumPUsdWriteOff = (BigDecimal)objArray[13];
				if(sumPUsdWriteOff==null) sumPUsdWriteOff=new BigDecimal(0);				
				wsn.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());
				
				//应付人民币已核销合计
				BigDecimal sumPCnyWriteOff = (BigDecimal)objArray[14];
				if(sumPCnyWriteOff==null) sumPCnyWriteOff=new BigDecimal(0);				
				wsn.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				//应收其他币种合计(非美元,人民币)
				BigDecimal sumROther = (BigDecimal)objArray[15];
				if(sumROther==null) sumROther=new BigDecimal(0);
				wsn.setSumROther(sumROther.doubleValue());
				
				
				//应付其他币种合计(非美元,人民币)
				BigDecimal sumPOther = (BigDecimal)objArray[16];
				if(sumPOther==null) sumPOther=new BigDecimal(0);
				wsn.setSumPOther(sumPOther.doubleValue());
				
				//如果应收不为0，计算毛利率,毛利率为毛利*100/应收
				if (!r.equals(new BigDecimal(0)))
				{
					Double grossProfitRate=grossProfit.doubleValue()*100/r.doubleValue();
					wsn.setGrossProfitRate(grossProfitRate.toString());
				}
				else
				{
					wsn.setGrossProfitRate("0");
				}
				
				retList.add(wsn);
			}  //if结束
			
		}  //for结束
		
	}
	
	/**
	 * 更新审核状态
	 */
	@Transactional
	public void updateAudiStatus()
	{
		Long id=Long.valueOf(requestContext.get("id"));
		Integer audiStatus=Integer.valueOf(requestContext.get("audiStatus"));
		
		WStorageNote wsn=  dao.findById(id);
		
		if (wsn!=null)
		{
			wsn.setAudiStatus(audiStatus);
			dao.update(wsn);
		}
		
		
	}
	/**Action : WSTORAGE_NOTE_RCRC<p>
	 * 重新计算件毛重
	 * @return
	 */
	@Transactional
	public List reCalcReceivedCargo(){
		List retList=new ArrayList();
		
		Long id=Long.valueOf(requestContext.get("id"));
		List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+id);
		for(WStorageNoteCargo snc:sncList){
			WCargo ca=cadao.findById(snc.getCargoId().longValue());
			//标准数量 从商品表中取得
			Double standardQuantity=NumberUtil.null2Zero(ca.getPQuantity());			
			Double standardGrossWeight=NumberUtil.null2Zero(ca.getGrossWeight());
			Double standardNetWeight=NumberUtil.null2Zero(ca.getNetWeight());
			Double standardVolume=NumberUtil.null2Zero(ca.getVolume());
			Double standardMeasure=NumberUtil.null2Zero(ca.getMeasure());
			
			String unitName=ca.getNumUnitName();
			Long unitId=ca.getNumUnitId();
			String pUnitName=ca.getpUnitName();
			Integer pUnitId=ca.getpUnitId();
			String wUnitName=ca.getWeightUnitName();
			Long wUnitId=ca.getWUnitId();
			String vUnitName=ca.getVUnitName();
			Integer vUnitId=ca.getVUnitId();
			String mUnitName=ca.getmUnit();
			Integer mUnitId=ca.getmUnitId();
			
			
			//用于存储合计数
			Double sumPlacedPackages=0.00;
			Double sumPlacedGrossWeight=0.00;
			Double sumPlacedNetWeight=0.00;
			Double sumPlacedVolume=0.00;
			Double sumPlacedMeasure=0.00;
			Double sumPlacedQuantity=0.00;
			
			Double sumReceivedPackages=0.00;
			Double sumReceivedGrossWeight=0.00;
			Double sumReceivedNetWeight=0.00;
			Double sumReceivedVolume=0.00;
			Double sumReceivedMeasure=0.00;
			Double sumReceivedQuantity=0.00;
			
			List<WPlacedCargo> pcList=pcdao.findByProperty("storageNoteCargoId", ""+snc.getId());
			for(WPlacedCargo pc:pcList){
				//赋值标准数量
				pc.setStandardGrossWeight(standardGrossWeight);
				pc.setStandardNetWeight(standardNetWeight);
				pc.setStandardQuantity(standardQuantity);
				pc.setStandardVolume(standardVolume);
				pc.setStandardMeasure(standardMeasure);
				
				//上架数量
				Double pcQuantity=NumberUtil.null2Zero(pc.getQuantity());
				
				//计算上架的件毛体面数量
				pc.setPackages(pcQuantity/(standardQuantity==0?1:standardQuantity));
				pc.setGrossWeight(pcQuantity*standardGrossWeight);
				pc.setNetWeight(pcQuantity*standardNetWeight);
				pc.setVolume(standardVolume*pcQuantity);
				pc.setMeasure(standardMeasure*pcQuantity);
				
				pc.setpUnitId(pUnitId);
				pc.setpUnitName(pUnitName);
				pc.setwUnitId(wUnitId!=null?wUnitId.intValue():0);
				pc.setWUnitName(wUnitName);
				pc.setvUnitId(vUnitId);
				pc.setVUnitName(vUnitName);
				pc.setmUnitId(mUnitId);
				pc.setmUnitName(mUnitName);
				
				pc.setRowAction(RowAction.M);
				
				sumPlacedPackages+=NumberUtil.null2Zero(pc.getPackages());
				sumPlacedGrossWeight+=NumberUtil.null2Zero(pc.getGrossWeight());
				sumPlacedNetWeight+=NumberUtil.null2Zero(pc.getNetWeight());
				sumPlacedVolume+=NumberUtil.null2Zero(pc.getVolume());
				sumPlacedMeasure+=NumberUtil.null2Zero(pc.getMeasure());
				sumPlacedQuantity+=NumberUtil.null2Zero(pc.getQuantity());
				
				pc=pcdao.saveByRowActionSolo(pc);
				retList.add(pc);
			}
			
			List<WReceivedCargo> rcList=rcdao.findByProperty("storageNoteCargoId", ""+snc.getId());
			for(WReceivedCargo rc:rcList){
				//用于存储合计数
				Double sumRCPlacedPackages=0.00;
				Double sumRCPlacedGrossWeight=0.00;
				Double sumRCPlacedNetWeight=0.00;
				Double sumRCPlacedVolume=0.00;
				Double sumRCPlacedMeasure=0.00;
				Double sumRCPlacedQuantity=0.00;
				
				//计算上架货物合计数
				List<WPlacedCargo> pcList2=pcdao.findByProperty("receivedCargoId", ""+rc.getId());
				for(WPlacedCargo pc2:pcList2){
					sumRCPlacedPackages+=NumberUtil.null2Zero(pc2.getPackages());
					sumRCPlacedGrossWeight+=NumberUtil.null2Zero(pc2.getGrossWeight());
					sumRCPlacedNetWeight+=NumberUtil.null2Zero(pc2.getNetWeight());
					sumRCPlacedVolume+=NumberUtil.null2Zero(pc2.getVolume());
					sumRCPlacedMeasure+=NumberUtil.null2Zero(pc2.getMeasure());
					sumRCPlacedQuantity+=NumberUtil.null2Zero(pc2.getQuantity());
				}
				
				rc.setStandardQuantity(standardQuantity);
				rc.setStandardGrossWeight(standardGrossWeight);
				rc.setStandardNetWeight(standardNetWeight);
				rc.setStandardVolume(standardVolume);
				rc.setStandardMeasure(standardMeasure);
				
				//赋值上架数
				rc.setPlacedQuantity(sumRCPlacedQuantity);
				rc.setPlacedGrossWeight(sumRCPlacedGrossWeight);
				rc.setPlacedPackages(sumRCPlacedPackages);
				rc.setPlacedNetWeight(sumRCPlacedNetWeight);
				rc.setPlacedVolume(sumRCPlacedVolume);
				rc.setPlacedMeasure(sumRCPlacedMeasure);
				
				rc.setpUnitId(pUnitId);
				rc.setpUnit(pUnitName);
				
				rc.setwUnitId(wUnitId!=null?wUnitId.intValue():0);
				rc.setwUnitName(wUnitName);
				
				rc.setvUnitId(vUnitId);
				rc.setvUnitName(vUnitName);
				rc.setmUnitId(mUnitId);
				rc.setmUnitName(mUnitName);
				
				Double rcQuantity=rc.getReceivedQuantity();
				
				//根据商品表转换件毛体面等数量
				rc.setReceivedPackages(rcQuantity/(standardQuantity==0?1:standardQuantity));
				rc.setReceivedGrossWeight(rcQuantity*standardGrossWeight);
				rc.setReceivedNetWeight(rcQuantity*standardNetWeight);
				rc.setReceivedVolume(rcQuantity*standardVolume);
				rc.setReceivedMeasure(rcQuantity*standardMeasure);
				
				rc.setRowAction(RowAction.M);
				
				//计算收货总数
				sumReceivedQuantity+=NumberUtil.null2Zero(rc.getReceivedQuantity());
				sumReceivedPackages+=NumberUtil.null2Zero(rc.getReceivedPackages());
				sumReceivedGrossWeight+=NumberUtil.null2Zero(rc.getReceivedGrossWeight());
				sumReceivedNetWeight+=NumberUtil.null2Zero(rc.getReceivedNetWeight());
				sumReceivedVolume+=NumberUtil.null2Zero(rc.getReceivedVolume());
				sumReceivedMeasure+=NumberUtil.null2Zero(rc.getReceivedMeasure());
				
				
				rc=rcdao.saveByRowActionSolo(rc);
				retList.add(rc);
				
			}
			
			snc.setPlacedQuantity(sumPlacedQuantity);
			snc.setPlacedPackages(sumPlacedPackages);
			snc.setPlacedGrossWeight(sumPlacedGrossWeight);
			snc.setPlacedNetWeight(sumPlacedNetWeight);
			snc.setPlacedVolume(sumPlacedVolume);
			snc.setPlacedMeasure(sumPlacedMeasure);
			
			snc.setReceivedQuantity(sumReceivedQuantity);
			snc.setReceivedPackages(sumReceivedPackages);
			snc.setReceivedGrossWeight(sumReceivedGrossWeight);
			snc.setReceivedNetWeight(sumReceivedNetWeight);
			snc.setReceivedVolume(sumReceivedVolume);
			snc.setReceivedMeasure(sumReceivedMeasure);
			
			Double sncQuantity=snc.getPlanedQuantity();
			
			//根据商品表转换件毛体面等数量
			snc.setPlanedPackages(standardQuantity==0?0:sncQuantity/standardQuantity);
			snc.setPlanedGrossWeight(sncQuantity*standardGrossWeight);
			snc.setPlanedNetWeight(sncQuantity*standardNetWeight);
			snc.setPlanedVolume(sncQuantity*standardVolume);
			snc.setPlanedMeasure(sncQuantity*standardMeasure);
			
			snc.setRowAction(RowAction.M);
			snc=cdao.saveByRowActionSolo(snc);
			retList.add(snc);
		}
		
		return retList;
		
	};
	/**Action : WSTORAGE_NOTE_RCPC<p>
	 * 重新计算上架资料
	 */
	@Transactional
	public void reCalcPickedCargo(){
		Long id=Long.valueOf(requestContext.get("id"));
		
		//List<WPickedCargo> wpc=wpcdao.findByProperty("outStorageNoteId", ""+id);
		List<WPlacedCargo> pcList=pcdao.findByProperty("storageNoteId", ""+id);
		for(WPlacedCargo pc:pcList){
			//List<WPickedCargo> wpcList=wpcdao.findByProperty("placedCargoId", ""+pc.getId());
			//calcTotelPickedQuantity4PlacedCargo(pc);
			List<WPickedCargo> wpcList=wpcdao.findByProperty("placedCargoId", ""+pc.getId());
			
			Double pickedQuantity=0.00;
			Double pickedPackages=0.00;
			Double pickedGrossWeight=0.00;
			Double pickedNetWeight=0.00;
			Double pickedVolume=0.00;
			Double pickedMeasure=0.00;
			Double pickedPackQuantity=0.00;
			
			
			
			for(WPickedCargo wpc:wpcList){
				pickedQuantity+=NumberUtil.null2Zero(wpc.getQuantity());
				pickedPackages+=NumberUtil.null2Zero(wpc.getPackages());
				pickedGrossWeight+=NumberUtil.null2Zero(wpc.getGrossWeight());
				pickedNetWeight+=NumberUtil.null2Zero(wpc.getNetWeight());
				pickedVolume+=NumberUtil.null2Zero(wpc.getVolume());
				pickedMeasure+=NumberUtil.null2Zero(wpc.getMeasurement());
				pickedPackQuantity+=NumberUtil.null2Zero(wpc.getPackQuantity());
			}
					
				
				//重新上架表的出库数量
				pc.setPickedQuantity(pickedQuantity);
				pc.setPickedPackages(pickedPackages);
				pc.setPickedGrossWeight(pickedGrossWeight);
				pc.setPickedNetWeight(pickedNetWeight);
				pc.setPickedVolume(pickedVolume);
				//pc.setPickedMeas(pickedMeasure);
				pc.setPickedMeasurement(pickedMeasure);
			pc.setRowAction(RowAction.M);
			pcdao.saveByRowActionSolo(pc);
		}
	};
	
	/**
	 * 从新计算上架
	 * @param pc
	 */
	public void calcTotelPickedQuantity4PlacedCargo(WPlacedCargo pc){
		
		List<WPickedCargo> pcList=wpcdao.findByProperty("placedCargoId", ""+pc.getId());
		
		Double pickedQuantity=0.00;
		Double pickedPackages=0.00;
		Double pickedGrossWeight=0.00;
		Double pickedNetWeight=0.00;
		Double pickedVolume=0.00;
		Double pickedMeasure=0.00;
		Double pickedPackQuantity=0.00;
		
		//计算总的出库数量
		for (int i=0;i<pcList.size();i++)
		{
			pickedQuantity+=NumberUtil.null2Zero(pcList.get(i).getQuantity());
			pickedPackages+=NumberUtil.null2Zero(pcList.get(i).getPackages());
			pickedGrossWeight+=NumberUtil.null2Zero(pcList.get(i).getGrossWeight());
			pickedNetWeight+=NumberUtil.null2Zero(pcList.get(i).getNetWeight());
			pickedVolume+=NumberUtil.null2Zero(pcList.get(i).getVolume());
			pickedMeasure+=NumberUtil.null2Zero(pcList.get(i).getMeasurement());
			pickedPackQuantity+=NumberUtil.null2Zero(pcList.get(i).getPackQuantity());
			
		}
				
			
			//重新上架表的出库数量
			pc.setPickedQuantity(pickedQuantity);
			pc.setPickedPackages(pickedPackages);
			pc.setPickedGrossWeight(pickedGrossWeight);
			pc.setPickedNetWeight(pickedNetWeight);
			pc.setPickedVolume(pickedVolume);
			//pc.setPickedMeas(pickedMeasure);
			pc.setPickedMeasurement(pickedMeasure);
	};
	
	/**Action : WSTORAGE_NOTE_VEO<p>
	 * 验证客户订单号
	 * @return
	 */
	@Transactional
	public List<WStorageNote> validationEntrustNo(){
		String entrustNo=requestContext.get("entrustNo");
		List<WStorageNote> snList=dao.findByProperty("entrustNo", entrustNo);
		return snList;
	}
	
	/**Action : WSTORAGE_NOTE_VRO<p>
	 * 验证订单号
	 * @return
	 */
		@Transactional
		public List<WStorageNote> validationOrderNo(){
			String orderNo=requestContext.get("orderNo");
			List<WStorageNote> snList=dao.findByProperty("orderNo", orderNo);
			return snList;
		}
		
		/**Action : WSTORAGE_NOTE_X<p>
		 * 复杂查询
		 * @param conditions
		 * @return
		 */
		@Transactional
		public List<WStorageNote> complexQuery(List<HtQuery> conditions){
			List<WStorageNote> snList=dao.complexQuery(conditions);
			return snList;
		}
		/**Action : WSTORAGE_NOTE_XBG<p>
		 * 出入库单审核时的复杂查询
		 * @param conditions
		 * @return
		 */
		//WSTORAGE_NOTE_XBG
		@Transactional
		public List<WStorageNote> complexQueryByGroup(List<HtQuery> conditions){
			List<WStorageNote> snList=dao.complexQueryByGroup(conditions);
			return snList;
		}
	
		
		@SuppressWarnings({ "unchecked", "rawtypes" })
		@Transactional(readOnly = true)
		public List complexQueryBill(List<HtQuery> conditions) {

			List retList = new ArrayList();
			List<WStorageNote> objList = dao.query(conditions);
			String custIds = "";
			for (WStorageNote consign : objList) {
				custIds += consign.getCustId() + ConstUtil.COMMA;
			}
			if(custIds.length()>0){
				List<HtQuery> expenseConditions = new ArrayList<HtQuery>();
				expenseConditions.add(new HtQuery("custId", SqlOp.in, custIds));
				expenseConditions.add(new HtQuery("consBizType", SqlOp.equal, "W"));
				List<SExpense> expenseList = expenseDao.query(expenseConditions);
				retList.addAll(expenseList);
			}else{
				throw new BusinessException(FosExceptionEnum.SYS_NO_ENTRY_EXPENSE);
			}
			
			return retList;
		}
		/**Action : WSTORAGE_NOTE_CC<p>
		 * 单票计费
		 * @return
		 */
	public List computeCost(){
		List retList=new ArrayList();
		Long id=Long.valueOf(requestContext.get("id"));
		//List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId", ""+id);
		//List<WAssets> asList=asdao.findByProperty("storageNoteId", ""+id);
		//List<WStorageRate> srList=wsrdao.findByProperty("storageNoteid", ""+id);
		
		HtQuery ht=new HtQuery();
		ht.setKey("storageNoteIdList");
		ht.setValue(""+id);
		ht.setOp(SqlOp.equal);
		List<HtQuery> conditions=new ArrayList<HtQuery>();
		conditions.add(ht);
		
		//获得所有对应的货物列表
				List<WStorageNoteCargo>sncList=cdao.excelQueryStorageNoteCargo(conditions);
				//获得所有对应的托盘数列表
				List<WAssets> asList=asdao.excelQueryAssetsList(conditions);
		List<WRate> wrList=wrdao.excelQueryRateAndSheet(conditions);
		List<WSmartExpense> wseList=wseDao.excelQuerySmartExpenseList(conditions);
		List<WSmartExpense> resList=new ArrayList<WSmartExpense>();
		
		wcs.autoComputeCostByCargoList(resList, sncList, wrList, wseList);
		wcs.autoComputeCostByAssetsList(resList, asList, wrList, wseList);
		
		retList=wcs.createCost(resList);
		
		return retList;
	}

	/**Action : WSTORAGE_NOTE_T<p>
	 * 生成派车单
	 * @return
	 */
	@Transactional
	public TConsign generateTrans() {
		TConsign con= new TConsign();
		Integer sumPackageValue= 0;
		if(StringUtil.isNotBlank(requestContext.get("id"))){
			Long id = Long.valueOf(requestContext.get("id"));
			WStorageNote sn=dao.findById(id);
			List<WStorageNoteCargo> sncList=cdao.findByProperty("storageNoteId",String.valueOf(id));
			con.setSalesRepName(sessionContext.getUsername());
			con.setSalesRepId(sessionContext.getUserid());
			con.setRowAction(RowAction.N);
			con.setConsNo(serialFactory.getSerial("tran_no"));
			con.setUuid(ConstUtil.getUUID());
			con.setStartStation("上海");
			con.setConsBizClass("O");
			con.setPayMethod("4");
			con.setGrouName("物流部");
			con.setConsigneeAddress(sn.getLoadAddress());
			con.setConsigneeContact(sn.getCustContact());
			con.setConsigneeMobile(sn.getCustTel());
			con.setCustName(sn.getCargoOwnerName());
			con.setCustId(sn.getCargoOwnerId());
			con.setConsigneeName(sn.getCustName());
			con.setConsigneeId(sn.getCustId());
			con.setConsDate(new Date());
			con.setShipperName(sn.getCargoOwnerName());
			con.setShipperId(sn.getCargoOwnerId());
			con=tcdao.saveByRowActionSolo(con);
			
			if(sncList!=null&&sncList.size()>0){
				WStorageNoteCargo snc=sncList.get(0);
				List<WStorageNoteCargo> sncList2= cdao.gentTConsignCargo(snc.getStorageNoteId());
				for (Object obj: sncList2){
						TConsignCargo tc =new TConsignCargo();
						Object[] objArray=(Object[]) obj;
						tc.setConsId(con.getId());
						tc.setRowAction(RowAction.N);
						tc.setUuid(ConstUtil.getUUID());
						tc.setOrderNo(sn.getOrderNo());
						tc.setConsNo(con.getConsNo());
						tc.setConsBizClass(con.getConsBizClass());
						tc.setCargoName((String) objArray[0]);  		 							//货物名称
						tc.setConsCargoId((long) objArray[1].hashCode());							//货物id
						tc.setPackName((String) objArray[2]);										//单位名称
						tc.setGrossWeight( (BigDecimal) BigDecimal.valueOf((Double) objArray[3]));	//毛重
						tc.setCargoClassId(Integer.valueOf(objArray[4].toString()));				//货物类别ID
						tc.setCargoClassName((String) objArray[5]);									//货物类别名称
						tc.setRemarks((String) objArray[6]);										//备注
						tc.setPackages(Integer.parseInt(objArray[7].toString().substring(0,objArray[7].toString().indexOf("."))));//件数
						tc.setVolume((BigDecimal) BigDecimal.valueOf((Double) objArray[8]));		//体积
						tccdao.saveByRowActionSolo(tc);
						sumPackageValue+=Integer.parseInt(objArray[7].toString().substring(0,objArray[7].toString().indexOf(".")));
				}
			}
			
			con.setPackages(sumPackageValue);
			con.setRowAction(RowAction.M);
			con.setVersion(con.getVersion()+1);
			//TConsign 
			//con=tcdao.update(con);
			con=tcdao.saveByRowActionSolo(con);
		}
		return con;
	}
}
