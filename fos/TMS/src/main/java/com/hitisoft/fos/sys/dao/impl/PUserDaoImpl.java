package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class PUserDaoImpl extends JpaDao<PUser, Long> implements PUserDao {
	@Autowired
	private SessionContext sessionContext;

	public PUserDaoImpl() {
		super(PUser.class);
	}

	@Override
	public List<?> queryFuncCode() {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct rf.funcCode from PUserRole u, PRoleFunction rf ");
		sb.append("where u.roleId = rf.roleId and u.removed=0 ");
		sb.append("and u.userId = :userId order by rf.funcCode ASC ");
		final String queryString = sb.toString();
		@SuppressWarnings("rawtypes")
		List<?> retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("userId", sessionContext.getUserid().intValue());
				return query.getResultList();
			}
		});
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<PUser> queryByNameOrEmail(final String name, final String password) {
		StringBuffer sb = new StringBuffer();
		sb.append("select t1 from PUser t1 ");
		sb.append("where t1.removed = 0 ");
		sb.append("and t1.userPassword = :password ");
		sb.append("and t1.userLoginName = :loginname ");
		final String queryString = sb.toString();
		List retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				query.setParameter("password", password);
				query.setParameter("loginname", name);
				return query.getResultList();
			}
		});
		return retList;
	}

}
