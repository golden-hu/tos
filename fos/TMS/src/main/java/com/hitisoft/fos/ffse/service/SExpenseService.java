package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.sys.dao.PUserExpePermissionDao;
import com.hitisoft.fos.sys.entity.PUserExpePermission;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SExpenseService {
	@Autowired
	private SExpenseDao dao;
	@Autowired
	private PUserExpePermissionDao permDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private RequestContext requestContext;
	
	@Transactional
	public List<SExpense> save(List<SExpense> entityList) {
		List<SExpense> retList = new ArrayList<SExpense>();
		for (SExpense entity : entityList) {
			entity.setExpeUpdateBy(sessionContext.getUsername());
			entity.setExpeUpdateTime(TimeUtil.getNow());
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				dao.add(entity);
				entity.setEditable(ConstUtil.TrueShort);
				retList.add(entity);
				//backupExpense(entity);
				break;
			case M:
				SExpense retEntity = dao.update(entity);
				retEntity.setEditable(ConstUtil.TrueShort);
				//backupExpense(retEntity);
				retList.add(retEntity);
				break;
			case R:
				SExpense delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				//backupExpense(delEntity);
				// 被分摊的费用, 在删除的时候, 同时要删除分摊的费用
				if (ConstUtil.TrueByte.equals(delEntity.getExpeAllocationFlag())) {
					Map<String, String> queryMap = new HashMap<String, String>();
					queryMap.put("expeIdM", "" + delEntity.getId());
					queryMap.put("expeAllocatedFlag", ConstUtil.TrueStr);
					List<SExpense> allocatedList = dao.findByProperties(queryMap);
					for (SExpense expense : allocatedList) {
						expense.setRowAction(RowAction.R);
						dao.update(expense);
						//backupExpense(expense);
					}
				}
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	/*private void backupExpense(SExpense bakEntity) {
		SExpenseB bakEntityB = new SExpenseB();
		BeanUtils.copyProperties(bakEntity, bakEntityB);
		bakDao.add(bakEntityB);
	}*/

	@Transactional(readOnly = true)
	public List<SExpense> query() {
		return dao.findByProperties();
	}


	public Map<String, PUserExpePermission> getExpePermissionMap() {
		Map<String, String> map = new HashMap<String, String>();
		map.put("userId", "" + sessionContext.getUsername());
		List<PUserExpePermission> permList = permDao.findByProperties(map);
		Map<String, PUserExpePermission> permMap = new HashMap<String, PUserExpePermission>();
		for (PUserExpePermission perm : permList) {
			permMap.put(perm.getExpeType() + perm.getChclId(), perm);
		}
		return permMap;
	}

	
	@Transactional(readOnly = true)
	public List<SExpense> invoiceCreateQuery() {
		return dao.complexQueryInvoiceCreate(null);
	}

	@Transactional(readOnly = true)
	public List<SExpense> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	@Transactional(readOnly = true)
	public List<SExpense> queryWriteOff() {
		return dao.complexQueryWriteOff(null);
	}
	
	/**
	 * @author ly
     * 统计中操作
     * 收款核销(不包含中转回扣)
     * 发货方核销
     * ACTION:EXPE_VOUC_R
     * @author liuyong
	 */
	@Transactional
	public void voucherReceive(List<TConsign>  entityList) {
		TConsign cons = null;
		String flag=requestContext.get("custNameFlag");
		Integer  custNameFlag=0;
		if(flag.equals("1")){
			custNameFlag=Integer.valueOf(1);//费用表结算对象标记1=‘发货方’
		}else if(flag.equals("2")){
			 custNameFlag=Integer.valueOf(2);//费用表结算对象标记2=‘收货方’
		}
		String expeType="R";									//收款
		boolean bl=false;
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				long consId=cons.getId();
				bl=dao.updateExpenseWriteOff(consId, custNameFlag, expeType);
				if(bl){
					if(flag.equals("1")){
						cons.setShipWriteOfStatusR(1);	//更新委托表发货方核销状态
					}else if(flag.equals("2")){
						cons.setConsWriteOfStatusR(1);	//更新委托表收货方核销状态
					}
					consDao.update(cons);
				}
			}
		}
	}
	
	/**
	 * @author ly
     *统计中操作
     *付款核销
     *ACTION:EXPE_VOUC_P
     *@author liuyong
	 */	
	@Transactional
	public void voucherPay(List<TConsign>  entityList) {
		TConsign cons = null;
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				long consId=cons.getId();
				Integer  custNameFlag=Integer.valueOf(3);//费用表结算对象标准3=‘物流商’
				String expeType="P";												//付款
				boolean bl=false;
				bl=dao.updateExpenseWriteOff(consId, custNameFlag, expeType);
				if(bl){
					cons.setMotoWriteOfStatusP(1);
					consDao.update(cons);
				}
			}
		}
	}
	
	/**
	 * @author ly
     *统计中操作
     *中转回扣核销
     *ACTION:EXPE_VOUC_H
     *@author liuyong
	 */	
	@Transactional
	public void voucherHk(List<TConsign>  entityList) {
		TConsign cons = null;
		for (Object obj : entityList){
			if (obj instanceof TConsign){
				cons = (TConsign) obj;
				long consId=cons.getId();
				Integer  custNameFlag=Integer.valueOf(3);//费用表结算对象标准3=‘物流商’
				String expeType="R";												//收款
				boolean bl=false;
				bl=dao.updateExpenseWriteOff(consId, custNameFlag, expeType);
				if(bl){
					cons.setMotoWriteOfStatusR(1);
					consDao.update(cons);
				}
			}
		}
	}
	
}
