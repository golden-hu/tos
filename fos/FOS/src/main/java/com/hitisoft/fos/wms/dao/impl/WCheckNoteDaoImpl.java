package com.hitisoft.fos.wms.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.hitisoft.fos.wms.dao.WCheckNoteDao;
import com.hitisoft.fos.wms.entity.WCheckNote;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class WCheckNoteDaoImpl extends JpaDao<WCheckNote, Long> implements WCheckNoteDao {
	
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public WCheckNoteDaoImpl() {
		super(WCheckNote.class);
	}
	/**
	 * 根据条件查询拣货表
	 * @param HtQueryConditions
	 * @return ListWCheckNote
	 */
	//复杂查询
	@SuppressWarnings("unchecked")
	@Override
	public List<WCheckNote> complexSearch(final List<HtQuery> conditions) {
		requestContext.put("compCode",sessionContext.getCompCode());
		requestContext.put("removed",0+"");
		Class<WCheckNote> t1 = WCheckNote.class;
		List<WCheckNote> retList = query(conditions, requestContext,"t1", "", t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", "", t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
