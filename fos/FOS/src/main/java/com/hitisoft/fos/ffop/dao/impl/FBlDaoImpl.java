package com.hitisoft.fos.ffop.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FBlDao;
import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;

@Repository
public class FBlDaoImpl extends JpaDao<FBl, Long> implements FBlDao {
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	public FBlDaoImpl() {
		super(FBl.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateStatusById(final Long id, final Byte blStatus) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FBl t1 set t1.blStatus = :blStatus, t1.version = t1.version + 1 where ");
		sb.append("t1.id = :blId and t1.compCode= :compCode");
		final String queryString = sb.toString();
		Integer affectRows = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("blStatus", blStatus);
				query.setParameter("blId", id);
				query.setParameter("compCode", sessionContext.getCompCode());
				return Integer.valueOf(query.executeUpdate());
			}
		});
		if (affectRows != 1) {
			throw new BusinessException(ExceptionEnum.DB_ENTITY_NOT_FOUND, "FBl", id);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FBl> complexQuery(final List<HtQuery> conditions) {
		final Class t1 = FConsign.class;
		final Class t2 = FBl.class;
		String joinSql = "t1.id = t2.consId";
		List retList = query(conditions, requestContext, "t2", joinSql, t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t2", joinSql, t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<FBl> complexQueryForWs(final List<HtQuery> conditions) {
		final Class t1 = FBl.class;
		List retList = query(conditions, requestContext, "t1", "", t1);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public void updateConsNoByConsId(final Long consId, final String consNo) {
		StringBuffer sb = new StringBuffer();
		sb.append("update FBl t1 set ");
		sb.append("t1.consNo = ?, t1.version = t1.version + 1 ");
		sb.append("where t1.consId = ? and t1.removed = 0");
		final String queryString = sb.toString();
		getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter(1, consNo);
				query.setParameter(2, consId);
				return query.executeUpdate();
			}
		});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.hitisoft.fos.ffop.dao.FBlDao#queryShipper()
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
		
		String f = "c.blShipper";
		if(shipperType.equalsIgnoreCase("C"))
			f = "c.blConsignee";
		else if(shipperType.equalsIgnoreCase("N"))
			f = "c.blNotifyParty";
		else if(shipperType.equalsIgnoreCase("O"))
			f = "c.blCarrierName";
		else if(shipperType.equalsIgnoreCase("A"))
		    f = "c.blAccountingInfo";
		else if(shipperType.equalsIgnoreCase("H"))
			f = "c.blHandlingInfo";
		StringBuffer sb = new StringBuffer();
		
		sb.append("distinct "+f+" from FBl c ");
		sb.append("where c.removed=0 and compCode='"+compCode+"' ");
		
		/*if(StringUtil.isNotBlank(custId))
			sb.append("and c.custId = " + custId + " ");*/
		if(StringUtil.isNotBlank(bizType))
			sb.append("and c.consBizType = '" + bizType + "' ");		
		
		sb.append("and "+f+" like '" + shipperName + "%' ");
		
		sb.append(" order by id DESC ");
		final String queryString = sb.toString();
		return query(null, null, queryString, "", FBl.class);
	}	

}
