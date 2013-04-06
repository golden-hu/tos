package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.hitisoft.fos.sys.dao.CContractDao;
import com.hitisoft.fos.sys.entity.CContract;
import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WContractRateDao;
import com.hitisoft.fos.wms.dao.WRateCustDao;
import com.hitisoft.fos.wms.dao.WRateDao;
import com.hitisoft.fos.wms.dao.WRateRecordDao;
import com.hitisoft.fos.wms.dao.WRateSheetDao;
import com.hitisoft.fos.wms.entity.WContractRate;
import com.hitisoft.fos.wms.entity.WRate;
import com.hitisoft.fos.wms.entity.WRateCust;
import com.hitisoft.fos.wms.entity.WRateRecord;
import com.hitisoft.fos.wms.entity.WRateSheet;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
//import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class WContractRateService {
	
	@Autowired
	private SessionContext sessionContext;
	
	@Autowired
	private RequestContext requestContext;
	
	@Autowired
	private WContractRateDao dao;
	@Autowired
	private CContractDao cdao;
	
	@Autowired
	private SerialFactory serialFactory;
	
	@Autowired
	private WRateCustDao rateCustDao;
	
	/**Action : WCONTRACT_RATE_S
	 * 保存仓储费率
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List save(List entityList) {
		List retList=new ArrayList();
		Long contractId=null;
		Map<Long, Long> idMap = new HashMap<Long, Long>();
		
		for(Object obj : entityList){
			if(obj instanceof CContract){
				CContract entity = (CContract) obj;
				
				RowAction ra = entity.getRowAction();
				if(ra==RowAction.N){					
					entity.setContractNo(serialFactory.getSerial("contract_no"));
				}
				entity = cdao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				contractId=entity.getId();
			}
		}
	
		for(Object obj:entityList){
			if(obj instanceof WContractRate){
				WContractRate entity=(WContractRate) obj;
				RowAction ra=entity.getRowAction();
				if(ra==RowAction.N){
					entity.setContractId(contractId);					
				}
				entity=dao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		for(Object obj:entityList){
			if(obj instanceof WRateCust){
				WRateCust entity=(WRateCust) obj;
				RowAction ra=entity.getRowAction();
				if(ra==RowAction.N){
					entity.setContractId(contractId);
				}
				entity=rateCustDao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		return retList;
	}

	/**Action : 查询仓储费率<p>
	 * WCONTRACT_RATE_Q
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WContractRate> query() {
		return dao.findByProperties();
	}
	/**Action : WRATE_QR
	 * 综合查询费率
	 * @param conditions
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<WRate> queryRateByStorageNote(List<HtQuery> conditions){
		 List<WRate> rateList=dao.queryRateByCust(conditions);
		return rateList;
	}
	
	/**Action : WRATE_C<p>
	 * 费率提交
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<CContract> check(List<CContract> entityList) {
		List<CContract> resList=new ArrayList<CContract>();
		Integer type=Integer.valueOf(requestContext.get("type"));
		for(CContract entity:entityList){
			if(type==1){
				entity.setCheckBy(sessionContext.getUsername());
				entity.setCheckTime(TimeUtil.getNow());
				
				entity=cdao.update(entity);
				resList.add(entity);
			}
			else{
				entity.setCheckBy("");
				entity.setCheckTime(TimeUtil.getNow());
				
				entity=cdao.update(entity);
				resList.add(entity);
			}
		}
		return resList;
	}
}
