package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PTemplateMapDao;
import com.hitisoft.fos.sys.entity.PTemplateMap;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PTemplateMapDaoImpl extends JpaDao<PTemplateMap, Long> implements PTemplateMapDao {
	public PTemplateMapDaoImpl() {
		super(PTemplateMap.class);
	}
	
	@SuppressWarnings("unchecked")
	public List<PTemplateMap> getTemplateMap(String tetyId){
		StringBuffer sb = new StringBuffer();
		sb.append("select t1 from PTemplateMap t1 ");
		sb.append("where t1.tetyId = " +tetyId);
		final String queryString = sb.toString();
		List retList = getJpaTemplate().executeFind(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(queryString);
				return query.getResultList();
			}
		});
		return retList;
	}
}
