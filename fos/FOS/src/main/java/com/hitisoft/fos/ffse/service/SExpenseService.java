package com.hitisoft.fos.ffse.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

//import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SExpenseBDao;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.ffse.entity.SExpense;
import com.hitisoft.fos.ffse.entity.SExpenseB;
import com.hitisoft.fos.sys.dao.PUserExpePermissionDao;
import com.hitisoft.fos.sys.entity.CShipper;
import com.hitisoft.fos.sys.entity.PUserExpePermission;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Service
public class SExpenseService {
	@Autowired
	private SExpenseDao dao;
	@Autowired
	private SExpenseBDao bakDao;
	@Autowired
	private PUserExpePermissionDao permDao;
	@Autowired
	private FConsignDao consignDao;
	@Autowired
	private SessionContext sessionContext;

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

	@Transactional(readOnly = true)
	public List<SExpense> queryAndFilted() {
		List<SExpense> retList = new ArrayList<SExpense>();
		// 查询出所有的费用
		List<SExpense> oriList = dao.findByProperties();
		// 得到当前用户的费用权限列表
		Map<String, PUserExpePermission> permMap = getExpePermissionMap();
		boolean editOwnerR = false;
		boolean editOwnerP = false;
		boolean viewR = false;
		boolean viewP = false;
		boolean editR = false;
		boolean editP = false;
		if (permMap.containsKey(Constants.PR_TYPE_RECEIVE + Constants.USEP_CHCL_ALL)) {
			PUserExpePermission perm = permMap.get(Constants.PR_TYPE_RECEIVE + Constants.USEP_CHCL_ALL);
			if (ConstUtil.TrueByte.equals(perm.getUsepEditable())) {
				editOwnerR = true;
			}
			if (ConstUtil.TrueByte.equals(perm.getUsepViewAll())) {
				viewR = true;
			}
			if (ConstUtil.TrueByte.equals(perm.getUsepEditAll())) {
				editR = true;
			}
		}
		if (permMap.containsKey(Constants.PR_TYPE_PAY + Constants.USEP_CHCL_ALL)) {
			PUserExpePermission perm = permMap.get(Constants.PR_TYPE_PAY + Constants.USEP_CHCL_ALL);
			if (ConstUtil.TrueByte.equals(perm.getUsepEditable())) {
				editOwnerP = true;
			}
			if (ConstUtil.TrueByte.equals(perm.getUsepViewAll())) {
				viewP = true;
			}
			if (ConstUtil.TrueByte.equals(perm.getUsepEditAll())) {
				editP = true;
			}
		}
		// 循环每一条费用, 根据费用权限列表, 判断是否可以查看, 编辑(设置可编辑字段)
		// 有全部编辑的权限, 直接设置可编辑
		// 是否有全部查看的权限, 加入返回列表
		// 查询对应委托, 判断当前用户是否此委托的owner
		// owner可以查看, 根据edit字段判断是否可编辑
		// 不是owner, 看viewAll, editAll字段
		Map<Long, Boolean> consignMap = new HashMap<Long, Boolean>();
		for (SExpense expense : oriList) {
			expense.setEditable(ConstUtil.FalseShort);
			if (Constants.PR_TYPE_RECEIVE.equals(expense.getExpeType())) {
				checkPerm(retList, permMap, editOwnerR, viewR, editR, consignMap, expense);
			} else {
				checkPerm(retList, permMap, editOwnerP, viewP, editP, consignMap, expense);
			}
		}
		return retList;
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

	private void checkPerm(List<SExpense> retList, Map<String, PUserExpePermission> permMap, boolean editOwnerAll,
			boolean viewAll, boolean editAll, Map<Long, Boolean> consignMap, SExpense expense) {
		if (editAll) {
			expense.setEditable(ConstUtil.TrueShort);
		}
		if (viewAll) {
			retList.add(expense);
		}
		Long consId = expense.getConsId().longValue();
		String key = expense.getExpeType() + expense.getChclId();
		// 如果当前用户是费用的创建人, 默认有权限
		// 否则看是不是委托的owner
		// 再否则看具体的费用权限配置
		Long uid = sessionContext.getUserid();
		String strUid = "" + uid;
		if (strUid.equals(expense.getCreateBy())) {
			expense.setEditable(ConstUtil.TrueShort);
			if (!retList.contains(expense))
				retList.add(expense);
		} else if (isOwner(consignMap, consId)) {
			if (editOwnerAll
					|| (permMap.containsKey(key) && ConstUtil.TrueByte.equals(permMap.get(key).getUsepEditable()))) {
				expense.setEditable(ConstUtil.TrueShort);
			}
			if (!retList.contains(expense))
				retList.add(expense);
		} else if (permMap.containsKey(key)) {// 不是owner,并有此费用类别的权限记录
			PUserExpePermission perm = permMap.get(key);
			if (ConstUtil.TrueByte.equals(perm.getUsepEditAll())) {
				expense.setEditable(ConstUtil.TrueShort);
			}
			if (ConstUtil.TrueByte.equals(perm.getUsepViewAll())) {
				if (!retList.contains(expense))
					retList.add(expense);
			}
		}
	}

	private boolean isOwner(Map<Long, Boolean> consignMap, Long consId) {
		boolean isOwner = false;
		Long uid = sessionContext.getUserid();
		String strUid = "" + uid;
		if (consignMap.containsKey(consId)) {
			isOwner = consignMap.get(consId);
		} else {
			FConsign consign = consignDao.findById(consId);
			if (strUid.equals(consign.getCreateBy()) || uid.equals(consign.getConsSalesRepId().longValue())) {
				isOwner = true;
			}
			consignMap.put(consId, isOwner);
		}
		return isOwner;
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
	public List<SExpenseB> complexQueryExpenseB(List<HtQuery> conditions) {
		return bakDao.query(conditions);
	}

	@Transactional(readOnly = true)
	public List<SExpense> queryWriteOff() {
		return dao.complexQueryWriteOff(null);
	}
	
	@Transactional(readOnly = true)
	public List<SExpense> complexQueryTExpress(List<HtQuery> conditions) {
		return dao.complexQueryTExpress(conditions);
	}
	
	@Transactional(readOnly = true)
	public List<SExpense> complexQueryFConsign(List<HtQuery> conditions) {
		return dao.complexQueryFConsign(conditions);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List<SExpense> complexQueryTConsign(List<HtQuery> conditions) {
		List <SExpense>retList = new ArrayList<SExpense>();
		List<SExpense> tConsigns = dao.complexQueryTConsign(conditions);
		List<SExpense> tTransTask = dao.complexQueryTTask(conditions);
		retList.addAll(tConsigns);
		retList.addAll(tTransTask);
		Map queryMap = new HashMap<String, SExpense>();
		for(SExpense expe : retList){
			queryMap.put(expe.getId(), expe);
		}
		retList.clear();
		Set<Entry<Integer, SExpense>> set =  queryMap.entrySet();		
		
        for(Entry<Integer,SExpense> entry :set){
        	retList.add(entry.getValue());
        }
		return retList;
	}
	
	@Transactional(readOnly = true)
	public List<SExpense> complexQueryWms(List<HtQuery> conditions) {
		return dao.complexQueryWms(conditions);
	}
	
}
