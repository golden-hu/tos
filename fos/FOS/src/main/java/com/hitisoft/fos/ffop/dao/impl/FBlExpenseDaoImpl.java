/**
 * 
 */
package com.hitisoft.fos.ffop.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FBlExpenseDao;
import com.hitisoft.fos.ffop.entity.FBl;
import com.hitisoft.fos.ffop.entity.FBlExpense;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;


/**
 * @author Gordon
 *
 */
@Repository
public class FBlExpenseDaoImpl extends JpaDao<FBlExpense, Long> implements FBlExpenseDao{
	
	@Autowired
	private RequestContext requestContext;
	
	public FBlExpenseDaoImpl() {
		super(FBlExpense.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<FBlExpense> complexQuery(final List<HtQuery> conditions) {
		final Class t1 = FBl.class;
		final Class t2 = FBlExpense.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1.consId = t2.consId");
		sb.append("and t1.blMBlNo = t2.consMblNo");
		List retList = query(conditions, requestContext, "t2", sb.toString(), t1, t2);

		String rowCount = String.valueOf(querySize(conditions, requestContext, "t2", sb.toString(), t1, t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
}
