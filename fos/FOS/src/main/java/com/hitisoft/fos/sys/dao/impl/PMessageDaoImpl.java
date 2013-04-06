package com.hitisoft.fos.sys.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PMessageDao;
import com.hitisoft.fos.sys.entity.PMessage;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;

@Repository
public class PMessageDaoImpl extends JpaDao<PMessage, Long> implements PMessageDao {
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;

	public PMessageDaoImpl() {
		super(PMessage.class);
	}

	@Transactional
	@Override
	public PMessage updateSendFlag(PMessage entity) {
		return getJpaTemplate().merge(entity);
	}

	@Override
	public List<PMessage> queryOwn() {
		Long uid = sessionContext.getUserid();
		String tid = requestContext.get("userId");
		String joinSql = null;
		if (StringUtil.isBlank(tid)) {
			joinSql = "(t1.messFromUserId = " + uid + " or t1.messToUserId = " + uid + ")";
		} else {
			joinSql = "((t1.messFromUserId = " + uid + " and t1.messToUserId = " + tid + ") or (t1.messFromUserId = "
					+ tid + " and t1.messToUserId = " + uid + "))";
		}
		Class<PMessage> clazz = PMessage.class;
		@SuppressWarnings("unchecked")
		List<PMessage> retList = query(null, null, "t1", joinSql, clazz);
		String rowCount = String.valueOf(querySize(null, null, "t1", joinSql, clazz));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

}
