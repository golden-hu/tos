package com.hitisoft.fos.ffop.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FContainer;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;

@Repository
public class FConsignDaoImpl extends JpaDao<FConsign, Long> implements FConsignDao {
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private PUserDao userDao;

	public FConsignDaoImpl() {
		super(FConsign.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateStatusById(final Long id, final Byte status) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 set t1.consStatus = :consStatus, t1.version = t1.version + 1 where ");
		sb.append("t1.id = :consId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("consStatus", status);
				query.setParameter("consId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FConsign", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateStatusById(final Long id, String statusName, final Byte statusValue) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 set t1.");
		sb.append(statusName);
		sb.append(" = :consStatus, t1.version = t1.version + 1 where ");
		sb.append("t1.id = :consId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("consStatus", statusValue);
				query.setParameter("consId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FConsign", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateStatusBookById(final Long id, final Byte status) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 ");
		sb.append("set t1.consStatusBook = :consStatusBook, t1.version = t1.version + 1 where ");
		sb.append("t1.id = :consId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("consStatusBook", status);
				query.setParameter("consId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FConsign", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateMblStatusById(final Long id, final Byte mbl) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 ");
		sb.append("set t1.consStatusMbl = :consStatusMbl, t1.version = t1.version + 1");
		sb.append("where ");
		sb.append("t1.id = :consId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("consStatusMbl", mbl);
				query.setParameter("consId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FConsign", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateFblStatusById(final Long id, final Byte fbl) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 ");
		sb.append("set t1.consStatusFbl = :consStatusFbl, t1.version = t1.version + 1 where ");
		sb.append("t1.id = :consId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("consStatusFbl", fbl);
				query.setParameter("consId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FConsign", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FConsign> complexQuery(final List<HtQuery> conditions) {
		// 权限管理
		String joinSql = "";
		PUser myself = userDao.findById(sessionContext.getUserid());
		String uid = "" + sessionContext.getUserid();
		if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
			;
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
				&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "(t1.consSalesRepId = " + uid + " or t1.consOperatorId = " + uid + ") ";
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
			joinSql += "t1.consSalesRepId = " + uid;
		} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "t1.consOperatorId = " + uid;
		} 
		Class clazz = FConsign.class;
		List<FConsign> retList = query(conditions, requestContext, "t1", joinSql, clazz);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<FConsign> complexQueryTask(final List<HtQuery> conditions) {
		String sailedFlag = requestContext.get("voyaSailedFlag");
		String joinSql = "";
		if (ConstUtil.TrueStr.equals(sailedFlag)) {
			joinSql += "t1.consSailDate < '" + TimeUtil.getDay() + "'";
		} else {
			joinSql += "(t1.consSailDate >= '" + TimeUtil.getDay() + "' or t1.consSailDate is null)";
		}
		Class clazz = FConsign.class;
		List<FConsign> retList = query(conditions, requestContext, "t1", joinSql, clazz);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", joinSql, clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FConsign> complexQueryCheck(final List<HtQuery> conditions) {
		final Class t1 = FConsign.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1");
		
		//应收合计
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		//应付合计
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		//应收美元合计
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsd");
		
		//应收人民币合计
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCny");
		
		//应付美元合计
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsd");
		
		//应付人民币合计
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCny");
		
		//应收美元已开帐单合计
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdInvoice");
		
		//应收人民币已开帐单合计
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyInvoice");
		
		//应付美元已开帐单合计
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdInvoice");	
		
		//应付人民币已开帐单合计
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyInvoice");	
		
		//应收美元已核销合计
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdWriteOff");
		
		//应收人民币已核销合计
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyWriteOff");
		
		//应付美元已核销合计
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdWriteOff");
		
		//应付人民币已核销合计
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyWriteOff");
		
		//应付其他币种合计(非美元,人民币)
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode!='CNY' and e.currCode!='USD') as sumPOther");
		
		//应收其他币种合计(非美元,人民币)
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode!='CNY' and e.currCode!='USD') as sumROther");
		
		String fieldSql = sb.toString();
		
		List retList = query(conditions, requestContext, fieldSql, "", t1);
		System.out.println(fieldSql);
		System.out.println("----------end---------");
		
		//select count(distinct fconsign0_.id) as col_0_0_ 
		// from  F_CONSIGN fconsign0_ limit
        
		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", "", t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	/**
	 * 根据箱号查询委托
	 * 
	 * @param conditions
	 * @param propertyMap
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<FConsign> complexQueryByContNo(final List<HtQuery> conditions) {
		final Class t1 = FConsign.class;
		final Class t2 = FContainer.class;
		String joinSql = "t1.id = t2.consId";
		List<FConsign> retList = query(conditions, requestContext, "distinct t1", joinSql, t1, t2);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "count(distinct t1)", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Object> complexQueryOverDueSales(int dateNum) {
		String compCode = sessionContext.getCompCode();
		String dateDue = TimeUtil.addDate(-1 * dateNum);
		final Class t1 = FConsign.class;
		final Class t2 = FBl.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1.id = t2.consId ");
		sb.append("and t1.consSalesRepId in (");
		sb.append("select distinct t3.consSalesRepId from FConsign t3 ");
		sb.append("where t3.consSailDate < '").append(dateDue).append("' ");
		sb.append("and t3.consStatusAr < 2 ");
		sb.append("and t3.compCode = '").append(compCode).append("' ");
		sb.append("and t3.removed = 0");
		sb.append(")");
		List retList = query(null, null, "t1.consSalesRepId, t1.consSalesRepName, t2.blNo", sb.toString(), t1, t2);
		return retList;
	}

	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVoyaName(final Long voyaId, final String voyaName) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 set t1.voyaName = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.voyaId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, voyaName);
				query.setParameter(2, voyaId);
				return query.executeUpdate();
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVessName(final Long vessId, final String vessName, final String vessNameCn) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 set t1.vessName = ?, t1.vessNameCn = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.vessId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, vessName);
				query.setParameter(2, vessNameCn);
				query.setParameter(3, vessId);
				return query.executeUpdate();
			}
		});
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateVessName(final Integer voyaId, final Integer newVessId, final String vessName,
			final String vessNameCn) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FConsign t1 set t1.vessId = ?, t1.vessName = ?, ");
		sb.append("t1.vessNameCn = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.voyaId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, newVessId);
				query.setParameter(2, vessName);
				query.setParameter(3, vessNameCn);
				query.setParameter(4, voyaId);
				return query.executeUpdate();
			}
		});
	}

	/*
	 * (non-Javadoc)
	 * @see com.hitisoft.fos.ffop.dao.FConsignDao#queryShipper()
	 * 通盟需求：不要将收发货人和委托单位绑定在一起，需注释custId
	 */
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryShipper(){
			
		String compCode = sessionContext.getCompCode();
		//String custId = requestContext.get("custId");
		String shipperName = requestContext.get("shipperName");
		String bizType = requestContext.get("bizType");
		String shipperType = requestContext.get("shipperType");
		
		if(StringUtil.isBlank(shipperName)){
			return null;
		}
		
		String f = "c.consShipper";
		if(shipperType.equalsIgnoreCase("C"))
			f = "c.consConsignee";
		else if(shipperType.equalsIgnoreCase("N"))
			f = "c.consNotifyParty";
		else if(shipperType.equalsIgnoreCase("O"))
			f = "c.consNotifyParty2";
		
		
		StringBuffer sb = new StringBuffer();
		
		sb.append("  "+f+" from FConsign c ");
		sb.append("where c.removed=0 and compCode='"+compCode+"' ");		
		
		if(StringUtil.isNotBlank(bizType))
			sb.append("and c.consBizType = '" + bizType + "' ");		
		
		if(shipperType.equalsIgnoreCase("S")){
			sb.append("and c.consShipper like '" + shipperName + "%' ");
		}
		if(shipperType.equalsIgnoreCase("C")){
			sb.append("and c.consConsignee like '" + shipperName + "%' ");
		}
		else 
			sb.append("and "+f+" like '" + shipperName + "%' ");
		
		sb.append(" order by id DESC ");
		final String queryString = sb.toString();
		return query(null, null, queryString, "",FConsign.class);
		
		//=====
		/*if(shipperType.equalsIgnoreCase("S") || shipperType.equalsIgnoreCase("C")){
			String f2 = "c.consFShipper";
			if(shipperType.equalsIgnoreCase("C"))
				f2 = "c.consFConsignee";
					
			sb = new StringBuffer();
			
			sb.append("  "+f2+" from FConsign c ");
			sb.append("where c.removed=0 and compCode='"+compCode+"' ");
			
			if(StringUtil.isNotBlank(bizType))
				sb.append("and c.consBizType = '" + bizType + "' ");		
			
			if(shipperType.equalsIgnoreCase("S")){
				sb.append(" and consFShipper like '" + shipperName + "%' ");
			}
			if(shipperType.equalsIgnoreCase("C")){
				sb.append(" and c.consFConsignee like '" + shipperName + "%' ");
			}
						
			sb.append(" order by id DESC ");
			final String queryString2 = sb.toString();
			retList.add(query(null, null, queryString2, "",FConsign.class));
		}*/
		
		
		
	}	
	
	
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryFShipper(){
			
		String compCode = sessionContext.getCompCode();
		//String custId = requestContext.get("custId");
		String shipperName = requestContext.get("shipperName");
		String bizType = requestContext.get("bizType");
		String shipperType = requestContext.get("shipperType");
		
		if(StringUtil.isBlank(shipperName)){
			return null;
		}
		
		String f = "c.consFShipper";
		if(shipperType.equalsIgnoreCase("C"))
			f = "c.consFConsignee";
		
		
		StringBuffer sb = new StringBuffer();
		
		sb.append("  "+f+" from FConsign c ");
		sb.append("where c.removed=0 and compCode='"+compCode+"' ");		
		
		if(StringUtil.isNotBlank(bizType))
			sb.append("and c.consBizType = '" + bizType + "' ");		
		
		if(shipperType.equalsIgnoreCase("S")){
			sb.append("and c.consFShipper like '" + shipperName + "%' ");
		}
		if(shipperType.equalsIgnoreCase("C")){
			sb.append("and c.consFConsignee like '" + shipperName + "%' ");
		}
		else 
			sb.append("and "+f+" like '" + shipperName + "%' ");
		
		sb.append(" order by id DESC ");
		final String queryString = sb.toString();
		return query(null, null, queryString, "",FConsign.class);
		
	}	
	
	@Override
	public Long querySize(final Map<String, String> propertyMap){
		return findSize(propertyMap);
	}
	
	@Override
	public Long querySize(final List<HtQuery> conditions, final Map<String, String> propertyMap){
		return querySize(conditions,propertyMap,"","",FConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> querySalesSummary(String consDateF, String consDateT){
		String compCode = sessionContext.getCompCode();		
		String fsql = "t1.consSalesRepId,t1.consSalesRepName,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and t1.consDate>='"+consDateF+"' and t1.consDate<='"+consDateT+"' ";
		wsql +=" group by t1.consSalesRepId";		
		return query(null,null,fsql,wsql,FConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> queryMonthlySummary(String yy){
		String compCode = sessionContext.getCompCode();		
		String fsql = "MONTH(t1.consDate) as mm,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and YEAR(t1.consDate)='"+yy+"'";
		wsql +=" group by MONTH(t1.consDate)";		
		return query(null,null,fsql,wsql,FConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> queryDailySummary(String yy,String mm){
		String compCode = sessionContext.getCompCode();		
		String fsql = "DAY(t1.consDate) as dd,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and YEAR(t1.consDate)='"+yy+"' and MONTH(t1.consDate)='" + mm + "'";
		wsql +=" group by MONTH(t1.consDate)";		
		return query(null,null,fsql,wsql,FConsign.class);
	}
}
