package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.hitisoft.fos.wms.dao.WRateCustDao;
import com.hitisoft.fos.wms.dao.WRateDao;
import com.hitisoft.fos.wms.dao.WRateRecordDao;
import com.hitisoft.fos.wms.dao.WRateSheetDao;
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
public class WRateService {
	
	@Autowired
	private SessionContext sessionContext;
	
	@Autowired
	private RequestContext requestContext;
	
	@Autowired
	private WRateDao dao;
	
	@Autowired
	private WRateSheetDao rateSheetDao;
	
	@Autowired
	private WRateRecordDao rateRecordDao;
	
	@Autowired
	private WRateCustDao rateCustDao;
	
	/**Action : WRATE_S
	 * 保存仓储费率
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List save(List entityList) {
		List retList=new ArrayList();
		//Long parentId = 0L;
		//String pUuid=null;
		Map<String, Long> idMap = new HashMap<String, Long>();
		
		for(Object obj : entityList){
			if(obj instanceof WRate){
				WRate entity = (WRate) obj;
				String oldId=entity.getUuid().toString();
				RowAction ra = entity.getRowAction();
				entity = dao.saveByRowActionSolo(entity);
				if (ra != RowAction.R) {
					retList.add(entity);
				}
				idMap.put(oldId, entity.getId());
				//pUuid=entity.getUuid().toString();
			}
		}
	
		
		
		/*//费用类别
		for (Object obj : entityList) {
			if(obj instanceof WRateSheet){
				WRateSheet entity=(WRateSheet) obj;
				RowAction ra = entity.getRowAction();
				if (ra == RowAction.N) {
					//entity.setContId(NumberUtil.frontId2DbId(idMap, entity.getContId().longValue()).intValue());
					//entity.setRateId(NumberUtil.frontId2DbId(idMap, entity.getContId().longValue()).intValue())
					Long newId = idMap.get(entity.getPUuid());
					if(newId!=null){
						entity.setRateId(newId);
					}
					//如果为空，则出错，回滚
				}				
				entity=rateSheetDao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		//仓租算法
		for (Object obj : entityList) {
			if(obj instanceof WRateRecord){
				WRateRecord entity=(WRateRecord) obj;
				RowAction ra = entity.getRowAction();
				if(ra==RowAction.N){
					Long newId = idMap.get(entity.getPUuid());
					if(newId!=null){
						entity.setRateId(newId);
					}
					//如果为空，则出错，回滚
				}
				entity=rateRecordDao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}
		
		//客户名称
		for (Object obj : entityList) {
			if(obj instanceof WRateCust){
				WRateCust entity=(WRateCust) obj;
				RowAction ra = entity.getRowAction();
				if(ra==RowAction.N){
					Long newId = idMap.get(entity.getPuuid());
					if(newId!=null){
						entity.setRateId(newId);
					}
					//如果为空，则出错，回滚
				}
				entity=rateCustDao.saveByRowActionSolo(entity);
				if(ra!=RowAction.R){
					retList.add(entity);
				}
			}
		}*/
		
		return retList;
	}

	/**Action : 查询仓储费率<p>
	 * WRATE_Q
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WRate> query() {
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
	public List<WRate> check(List<WRate> entityList) {
		List<WRate> resList=new ArrayList<WRate>();
		Integer type=Integer.valueOf(requestContext.get("type"));
		for(WRate entity:entityList){
			if(type==1){
				entity.setCheckBy(sessionContext.getUsername());
				entity.setCheckTime(TimeUtil.getNow());
				
				entity=dao.update(entity);
				resList.add(entity);
			}
			else{
				entity.setCheckBy("");
				entity.setCheckTime(TimeUtil.getNow());
				
				entity=dao.update(entity);
				resList.add(entity);
			}
		}
		return resList;
	}
}
