package com.hitisoft.fos.tran.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;

@Repository
public class TConsignDaoImpl extends JpaDao<TConsign, Long> implements
		TConsignDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private PUserDao userDao;

	public TConsignDaoImpl() {
		super(TConsign.class);
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TConsign> complexQuery(final List<HtQuery> conditions) {
		Class<TConsign> t1 = TConsign.class;
		/*
		 * requestContext.put("t1.removed","0"); HtQuery hq = new
		 * HtQuery("removed",SqlOp.equal,"0"); conditions.add(hq);
		 */
		String str = "";
		for (HtQuery list : conditions) {
			str += list.getValue() + "@";
		}
		String date[] = str.split("@");
		StringBuffer sb = new StringBuffer();
		sb.append(" concat(year(t1.consDate)");
		sb.append(",'-'");
		sb.append(",month(t1.consDate)) as sumMonth");
		sb.append(",count(t1.consNo) as sumConsNo");
		sb.append(",sum(t1.packages) as sumPackages");
		sb.append(",sum(t1.grossWeight) as sumGrossWeight");
		String fieldSql = sb.toString();
		String w = "";
		if (date.length == 2) {
			w = " (t1.consDate>='" + date[0] + "' and t1.consDate<='" + date[1]
					+ "') and ";
		}
		w += " t1.removed=0 group by month(t1.consDate) ";
		List<TConsign> retList = query(null, requestContext, fieldSql, w, t1);
		/*
		 * String rowCount = String.valueOf(querySize(conditions,
		 * requestContext, "distinct t1", w, t1));
		 * requestContext.put(ContextKey.rowCount.get(), rowCount);
		 */
		return retList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TConsign> complexTransSearch(final List<HtQuery> conditions) {
		requestContext.put("compCode", sessionContext.getCompCode());
		requestContext.put("removed", 0 + "");
		// 权限管理
		PUser myself = userDao.findById(sessionContext.getUserid());
		String uid = sessionContext.getUserid() + "";
		String joinSql = "";
		joinSql += " t1.consBizClass='T' ";
		if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
			;
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
				&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "(t1.salesRepId = " + uid + " or t1.consOperatorId = "
					+ uid + ") ";
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
			joinSql += "t1.salesRepId = " + uid;
		} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "t1.consOperatorId = " + uid;
		}
		Class<TConsign> t1 = TConsign.class;
		List<TConsign> retList = query(conditions, requestContext, "t1",
				joinSql, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,
				"t1", joinSql, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TConsign> complexSearch(final List<HtQuery> conditions) {
		requestContext.put("compCode", sessionContext.getCompCode());
		requestContext.put("removed", 0 + "");

		PUser myself = userDao.findById(sessionContext.getUserid());
		String uid = sessionContext.getUserid() + "";
		String joinSql = "";
		joinSql += " t1.consBizClass='O' ";
		if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
			;
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
				&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "(t1.salesRepId = " + uid + " or t1.consOperatorId = "
					+ uid + ") ";
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
			joinSql += "t1.salesRepId = " + uid;
		} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += "t1.consOperatorId = " + uid;
		}
		Class<TConsign> t1 = TConsign.class;
		List<TConsign> retList = query(conditions, requestContext, "t1",
				joinSql, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,
				"t1", joinSql, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TConsign> orderNoSearch(List<HtQuery> conditions) {
		String str = "";
		for (HtQuery list : conditions) {
			str += list.getValue() + "@";
		}
		String data[] = str.split("@");
		String orderNo = data[0];
		String compCode = sessionContext.getCompCode();
		String joinSql = " t1.consId=t2.id and t1.orderNo like '%" + orderNo
				+ "%' ";
		joinSql += " and t1.removed=0 and t1.compCode='" + compCode + "'";
		joinSql += " and t2.removed=0 and t2.compCode='" + compCode + "'";

		PUser myself = userDao.findById(sessionContext.getUserid());
		String uid = sessionContext.getUserid() + "";
		if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
			;
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
				&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += " and (t2.salesRepId = " + uid
					+ " or t2.consOperatorId = " + uid + ") ";
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
			joinSql += " and t2.salesRepId = " + uid;
		} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			joinSql += " and t2.consOperatorId = " + uid;
		}
		List<TConsign> retList = query(null, null, "t2", joinSql,
				TConsignCargo.class, TConsign.class);
		String rowCount = String.valueOf(querySize(null, null, "t2", joinSql,
				TConsignCargo.class, TConsign.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<TConsign> tconsSearch(final List<HtQuery> conditions) {
		requestContext.put("compCode", sessionContext.getCompCode());
		Class<TConsign> t1 = TConsign.class;
		String str = "";
		for (HtQuery list : conditions) {
			str += list.getValue() + "@";
		}
		String date[] = str.split("@");
		String w = "";
		if (date.length == 1) {
			w = " (t1.consNo like '%" + date[0] + "%') and ";
		}
		w += " t1.removed=0 ";
		w += " and t1.consBizClass='P' ";
		List<TConsign> retList = query(conditions, requestContext, null, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,
				"distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<Object> queryConsignee() {
		String compCode = sessionContext.getCompCode();
		String consigneeName = requestContext.get("consigneeName");
		StringBuffer sb = new StringBuffer();

		if (consigneeName != null) {
			sb.append("distinct consigneeName,consigneeAddress,consigneeContact,"
					+ "consigneeMobile "
					+ "from TConsign where consigneeName is not null ");
			sb.append("and removed=0 and compCode='" + compCode + "' ");
			sb.append("and consigneeName like '" + consigneeName + "%' ");
			sb.append("order by id DESC ");
			final String queryString = sb.toString();
			return query(null, null, queryString, "", TConsign.class);
		} else {
			sb.append("distinct t1.consigneeName, t1.consigneeAddress,t1.consigneeContact,"
					+ "t1.consigneeMobile ");
			String where = " t1.consigneeName is not null and t1.removed=0 and t1.compCode='"
					+ compCode + "' ";
			final String requestString = sb.toString();
			return query(null, null, requestString, where, TConsign.class);
		}
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryStartStation() {
		String compCode = sessionContext.getCompCode();
		String startStation = requestContext.get("startStation");
		StringBuffer sb = new StringBuffer();
		if (requestContext.get("startStation") != null) {
			sb.append(" distinct startStation from TConsign where startStation is not null ");
			sb.append(" and removed=0 and compCode='" + compCode + "' ");
			sb.append(" and startStation like '" + startStation + "%' ");
			sb.append(" order by id DESC ");
			final String requestString = sb.toString();
			return query(null, null, requestString, "", TConsign.class);
		} else {
			sb.append(" distinct t1.startStation ");
			String where = " t1.startStation is not null and t1.removed=0 and t1.compCode='"
					+ compCode + "' ";
			final String requestString = sb.toString();
			return query(null, null, requestString, where, TConsign.class);
		}
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryEndStation() {
		String compCode = sessionContext.getCompCode();
		String endStation = requestContext.get("endStation");
		StringBuffer sb = new StringBuffer();
		if (requestContext.get("endStation") != null) {
			sb.append(" distinct endStation from TConsign where endStation is not null ");
			sb.append(" and removed=0 and compCode='" + compCode + "' ");
			sb.append(" and endStation like '" + endStation + "%' ");
			sb.append(" order by id DESC ");
			final String requestString = sb.toString();
			return query(null, null, requestString, "", TConsign.class);
		} else {
			sb.append(" distinct t1.endStation ");
			String where = " t1.endStation is not null and t1.removed=0 and t1.compCode='"
					+ compCode + "' ";
			final String requestString = sb.toString();
			return query(null, null, requestString, where, TConsign.class);
		}
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryDriverName() {
		String compCode = sessionContext.getCompCode();
		String driverName = requestContext.get("driverName");
		StringBuffer sb = new StringBuffer();
		if (driverName != null) {
			sb.append(" distinct driverName,vehicleNo,driverTel from TConsign where driverName is not null ");
			sb.append(" and removed=0 and compCode='" + compCode + "' ");
			sb.append(" and driverName like '" + driverName + "%' ");
			sb.append(" order by id DESC ");
			final String requestString = sb.toString();
			return query(null, null, requestString, "", TConsign.class);
		} else {
			sb.append(" distinct t1.driverName,t1.vehicleNo,t1.driverTel ");
			String where = " t1.driverName is not null and t1.removed=0 and t1.compCode='"
					+ compCode + "' ";
			final String requestString = sb.toString();
			return query(null, null, requestString, where, TConsign.class);
		}
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryVehicleNo() {
		String compCode = sessionContext.getCompCode();
		String vehicleNo = requestContext.get("vehicleNo");
		StringBuffer sb = new StringBuffer();
		if (vehicleNo != null) {
			sb.append(" distinct vehicleNo from TConsign where vehicleNo is not null ");
			sb.append(" and removed=0 and compCode='" + compCode + "' ");
			sb.append(" and vehicleNo like '" + vehicleNo + "%' ");
			sb.append(" order by id DESC ");
			final String requestString = sb.toString();
			return query(null, null, requestString, "", TConsign.class);
		} else {
			sb.append(" distinct t1.vehicleNo ");
			String where = " t1.vehicleNo is not null and t1.removed=0 and t1.compCode='"
					+ compCode + "' ";
			final String requestString = sb.toString();
			return query(null, null, requestString, where, TConsign.class);
		}
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<TConsign> complexQueryCheck(final List<HtQuery> conditions) {
		final Class t1 = TConsign.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1");
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		sb.append(", (select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsd");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCny");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsd");
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCny");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdInvoice");
		sb.append(", (select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyInvoice");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='USD') as sumRUsdWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode='CNY') as sumRCnyWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='USD') as sumPUsdWriteOff");
		sb.append(", (select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode='CNY') as sumPCnyWriteOff");

		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='P' and e.currCode!='CNY' and e.currCode!='USD') as sumPOther");

		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.removed='0'");
		sb.append(" and e.expeType='R' and e.currCode!='CNY' and e.currCode!='USD') as sumROther");

		String fieldSql = sb.toString();
		String compCode = sessionContext.getCompCode();
		String w = " removed=0 and compCode='" + compCode + "' ";

		List retList = query(conditions, requestContext, fieldSql, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,
				"distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	@Override
	public Long querySize(final List<HtQuery> conditions,
			final Map<String, String> propertyMap) {
		return querySize(conditions, propertyMap, "", "", TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<Object> querySalesSummary(String consDateF, String consDateT) {
		String compCode = sessionContext.getCompCode();
		String fsql = "t1.salesRepId,t1.salesRepName,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='" + compCode + "'";
		wsql += " and t1.consDate>='" + consDateF + "' and t1.consDate<='"
				+ consDateT + "' ";
		wsql += " group by t1.salesRepId";
		return query(null, null, fsql, wsql, TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<Object> queryMonthlySummary(String yy) {
		String compCode = sessionContext.getCompCode();
		String fsql = "MONTH(t1.consDate) as mm,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='" + compCode + "'";
		wsql += " and YEAR(t1.consDate)='" + yy + "'";
		wsql += " group by MONTH(t1.consDate)";
		return query(null, null, fsql, wsql, TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<Object> queryDailySummary(String yy, String mm) {
		String compCode = sessionContext.getCompCode();
		String fsql = "DAY(t1.consDate) as dd,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='" + compCode + "'";
		wsql += " and YEAR(t1.consDate)='" + yy + "' and MONTH(t1.consDate)='"
				+ mm + "'";
		wsql += " group by DAY(t1.consDate)";
		return query(null, null, fsql, wsql, TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<TConsign> queryTcons(List<HtQuery> conditions) {
		String compCode = sessionContext.getCompCode();
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		sb.append("t1");
		String sql = sb.toString();
		String where = "t1.removed=0 and t1.compCode='" + compCode + "'";
		where += " and t1.consBizClass='O' ";
		for (HtQuery ht : conditions) {
			if (ht.getKey().equals("custName"))
				where += "and t1.custName=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("consDate"))
				where += "and t1.consDate>=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("consDate2"))
				where += "and t1.consDate<=" + "'" + ht.getValue() + "'";
		}

		list = query(null, null, sql, where, TConsign.class);
		String rowCount = String.valueOf(querySize(null, null, "t1", where,
				TConsign.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<TConsign> queryTrans(List<HtQuery> conditions) {
		String compCode = sessionContext.getCompCode();
		List list = new ArrayList();
		StringBuffer sb = new StringBuffer();
		sb.append("t1");
		String sql = sb.toString();
		String where = "t1.removed=0 and t1.compCode='" + compCode + "'";
		where += " and t1.consBizClass='T' ";
		for (HtQuery ht : conditions) {
			if (ht.getKey().equals("motorcadeName"))
				where += "and t1.motorcadeName=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("startDate"))
				where += "and t1.startDate>=" + "'" + ht.getValue() + "'";
			else if (ht.getKey().equals("startDate2"))
				where += "and t1.startDate<=" + "'" + ht.getValue() + "'";
		}

		list = query(null, null, sql, where, TConsign.class);
		String rowCount = String.valueOf(querySize(null, null, "t1", where,
				TConsign.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return list;
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryListTT() {
		String compCode = sessionContext.getCompCode();
		StringBuffer sb = new StringBuffer();

		sb.append(" distinct t1 ");
		String where = " t1.consBizClass = 'T' and t1.removed=0 and t1.compCode='"
				+ compCode + "' ";
		final String requestString = sb.toString();
		return query(null, null, requestString, where, TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryListTC() {
		String compCode = sessionContext.getCompCode();
		StringBuffer sb = new StringBuffer();

		sb.append(" distinct t1 ");
		String where = " t1.consBizClass = 'O' and t1.removed=0 and t1.compCode='"
				+ compCode + "' ";
		final String requestString = sb.toString();
		return query(null, null, requestString, where, TConsign.class);
	}

	@Override
	@SuppressWarnings({ "unchecked" })
	public List<TConsign> queryDistr() {
		String compCode = sessionContext.getCompCode();
		StringBuffer sb = new StringBuffer();

		sb.append(" distinct t1 ");
		String where = " t1.consBizClass = 'P'  and t1.removed=0 and t1.compCode='"
				+ compCode + "' ";
		final String requestString = sb.toString();
		return query(null, null, requestString, where, TConsign.class);
	}
}
