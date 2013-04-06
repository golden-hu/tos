package com.hitisoft.fos.ffse.dao.impl;

import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffse.dao.SVoucherDao;
import com.hitisoft.fos.ffse.entity.SVoucher;
import com.hitisoft.fos.ffse.entity.SVoucherItem;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class SVoucherDaoImpl extends JpaDao<SVoucher, Long> implements SVoucherDao {
	@Autowired
	private RequestContext requestContext;

	public SVoucherDaoImpl() {
		super(SVoucher.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SVoucher> complexQuery(final List<HtQuery> conditions) {
		Class<SVoucher> clazz = SVoucher.class;
		Class<FConsign> clazz2 = FConsign.class;
		Class<SVoucherItem> clazz3 = SVoucherItem.class;
		List<SVoucher> retList = query(conditions, requestContext, "distinct t1",
				"t1.voucId=t3.voucId and t2.id=t3.consId", clazz, clazz2, clazz3);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1",
				"t1.voucId=t3.voucId and t2.id=t3.consId", clazz, clazz2, clazz3));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Double getBalance(final List<HtQuery> conditions, Map<String,String> queryMap) {
		List retList = query(conditions, queryMap, "sum(t1.voucFixAmount)", null, SVoucher.class);
		Double amount = new Double(0);
		if (retList.size() == 1) {			
			amount = ((BigDecimal) retList.get(0)).doubleValue();
		}
		return amount;
	}
}
