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
import com.hitisoft.fw.util.StringUtil;

@Repository
public class TConsignDaoImpl extends JpaDao<TConsign, Long> implements TConsignDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private PUserDao userDao;
	
	public TConsignDaoImpl() {
		super(TConsign.class);
	}
	//业务量汇总
	@SuppressWarnings("unchecked")
	@Override
	public List<TConsign> complexQuery(final List<HtQuery> conditions) {
		Class<TConsign> t1 = TConsign.class;
		/*requestContext.put("t1.removed","0");
		HtQuery hq = new HtQuery("removed",SqlOp.equal,"0");
		conditions.add(hq);*/
		String str = "";
		for(HtQuery list:conditions){
			str+=list.getValue()+"@";
		}
		String date[]=str.split("@");
		StringBuffer sb=new StringBuffer();
		sb.append(" concat(year(t1.consDate)");
		sb.append(",'-'");
		sb.append(",month(t1.consDate)) as sumMonth");
		sb.append(",count(t1.consNo) as sumConsNo");
		sb.append(",sum(t1.packages) as sumPackages");
		sb.append(",sum(t1.grossWeight) as sumGrossWeight");
		String fieldSql=sb.toString();
		String w="";
		if(date.length==2){
			w=" (t1.consDate>='"+date[0]+"' and t1.consDate<='"+date[1]+"') and ";
		}
		w+=" t1.removed=0 group by month(t1.consDate) ";
		List<TConsign> retList = query(null, requestContext, fieldSql, w, t1);
		/*String rowCount = String.valueOf(querySize(conditions, requestContext, "distinct t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);*/
		return retList;
	}
	
	//复杂查询、快速查询
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Object> complexSearch(final List<HtQuery> conditions) {
		Class<TConsign> t1 = TConsign.class;
		requestContext.put("compCode",sessionContext.getCompCode());
		requestContext.put("removed",0+"");
		StringBuffer sb = new StringBuffer();
		sb.append("t1,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and e.consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql=sb.toString();
		
		//权限管理
		PUser myself = userDao.findById(sessionContext.getUserid());
		Long  uid =  sessionContext.getUserid();
		String w="";
		if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
			;
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
				&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			w += "(t1.salesRepId = " + uid + " or t1.consOperatorId = " + uid + ") ";
		} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
			w += "t1.salesRepId = " + uid;
		} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
			w += "t1.consOperatorId = " + uid;
		} 
		List  retList = query(conditions, requestContext,fieldSql,w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
	
	//陆运-订单编号查询
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Object> orderNoSearch(List <HtQuery>conditions) {
		StringBuffer sb = new StringBuffer();
		sb.append("t2,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t2.id and e.consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t2.id and e.consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t2.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t2.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t2.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql=sb.toString();
		
		String compCode = sessionContext.getCompCode();
		String w =" t1.consId=t2.id ";
		w+=" and t1.removed=0 and t1.compCode='"+compCode+"'";
		w+=" and t2.removed=0 and t2.compCode='"+compCode+"'";
		//权限管理
				PUser myself = userDao.findById(sessionContext.getUserid());
				Long  uid =  sessionContext.getUserid();
				if (ConstUtil.TrueByte.equals(myself.getUserAllViewFlag())) {
					;
				} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())
						&& ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
					w += " and (t2.salesRepId = " + uid + " or t2.consOperatorId = " + uid + ") ";
				} else if (ConstUtil.TrueByte.equals(myself.getUserSalesFlag())) {
					w += " and t2.salesRepId = " + uid;
				} else if (ConstUtil.TrueByte.equals(myself.getUserOperatorFlag())) {
					w += " and t2.consOperatorId = " + uid;
				} 
		List  retList = query(conditions, null,fieldSql, w, TConsignCargo.class, TConsign.class);
		String rowCount = String.valueOf(querySize(conditions, null,"t2", w, TConsignCargo.class, TConsign.class));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}

	/**
	 * 中转回扣
	 * 应收发货方金额
	 * 应收收货方金额
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Object> excelConsList(final List<HtQuery> conditions) {
		String orderNo=requestContext.get("orderNo");
		final Class t1 = TConsign.class;
		StringBuffer sb = new StringBuffer();
		
		sb.append("t1,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql = sb.toString();
		String compCode = sessionContext.getCompCode();
		List retList=new ArrayList();
		String w=" removed=0 and compCode='"+compCode+"' ";
		if(orderNo==null){
			retList = query(conditions, requestContext, fieldSql,w, t1);
			String rowCount = String.valueOf(querySize(conditions, requestContext, "t1.id",w, t1));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		else{
			w+=" and t1.id=t2.consId and t2.orderNo like '%"+orderNo+"%'";
			retList = query(null, null, fieldSql, w, t1,TConsignCargo.class);
			String rowCount = String.valueOf(querySize(null, null, "t1.id", w, t1,TConsignCargo.class));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		
		return retList;
	}
	
	//付款账单模版输出
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Object> excelConsPList(final List<HtQuery> conditions) {
		String orderNo=requestContext.get("orderNo");
		final Class t1 = TConsign.class;
		final Class t2 = TConsignCargo.class;
		StringBuffer sb = new StringBuffer();
		
		sb.append("t1,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql = sb.toString();
		List retList=new ArrayList<Object>();
		String compCode = sessionContext.getCompCode();
		String w=" removed=0 and compCode='"+compCode+"' ";
		if(orderNo==null){
			retList = query(conditions, requestContext, fieldSql, w, t1);
			String rowCount = String.valueOf(querySize(conditions, requestContext, "t1.id", w, t1));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		else{
			 w+=" and t1.id=t2.consId and t2.orderNo like '%"+orderNo+"%'";
			retList = query(null, null, fieldSql, w, t1,TConsignCargo.class);
			String rowCount = String.valueOf(querySize(null, null, "t1.id", w, t1,t2));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		return retList;
	}

	//发货统计表模版输出
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	@Override
	public List<Object> excelSumma(final List<HtQuery> conditions) {
		String orderNo=requestContext.get("orderNo");
		final Class t1 = TConsign.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql = sb.toString();
		String compCode = sessionContext.getCompCode();
		List retList=new ArrayList();
		//String w=" removed=0 and compCode='"+compCode+"' ";
		if(orderNo==null){
			retList = query(conditions, requestContext, fieldSql,"", t1);
			String rowCount = String.valueOf(querySize(conditions, requestContext, "t1.id","", t1));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		else{
			String w=" and t1.id=t2.consId and t2.orderNo like '%"+orderNo+"%'";
			retList = query(null, null, fieldSql, w, t1,TConsignCargo.class);
			String rowCount = String.valueOf(querySize(null, null, "t1.id", w, t1,TConsignCargo.class));
			requestContext.put(ContextKey.rowCount.get(), rowCount);
		}
		
		return retList;
	}
	
	//收货人联系方式
	@Override
	@SuppressWarnings({ "unchecked"})
	public List<Object> queryConsignee(){
		String compCode = sessionContext.getCompCode();
		String custId = requestContext.get("custId");
		String consigneeName = requestContext.get("consigneeName");
		String bizType = requestContext.get("bizType");
		/*,c.consigneeContact,c.consigneeTel,c.consigneeMobile,c.deliveryAddress*/
		StringBuffer sb = new StringBuffer();
		sb.append("distinct c.consigneeName,c.consigneeContact,c.consigneeTel," +
				"c.consigneeMobile,c.deliveryAddress,c.deliveryPlaceName,c.deliveryCity from TConsign c ");
		sb.append("where c.removed=0 and compCode='"+compCode+"' ");
		if(StringUtil.isNotBlank(custId))
			sb.append("and c.custId = " + custId + " ");
		if(StringUtil.isNotBlank(bizType))
			sb.append("and c.consBizType = '" + bizType + "' ");
		
		sb.append("and c.consigneeName like '" + consigneeName + "%' ");
		sb.append(" order by id DESC ");
		final String queryString = sb.toString();
		return query(null, null, queryString, "", TConsign.class);
	}
	
	//单票审核
	@SuppressWarnings({ "unchecked", "rawtypes"})
	@Override
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
		String w=" removed=0 and compCode='"+compCode+"' ";
		
		List retList = query(conditions, requestContext, fieldSql, w, t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext, "t1.id", w, t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
	
	@Override
	public Long querySize(final List<HtQuery> conditions, final Map<String, String> propertyMap){
		return querySize(conditions,propertyMap,"","",TConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> querySalesSummary(String consDateF, String consDateT){
		String compCode = sessionContext.getCompCode();		
		String fsql = "t1.salesRepId,t1.salesRepName,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and t1.consDate>='"+consDateF+"' and t1.consDate<='"+consDateT+"' ";
		wsql +=" group by t1.salesRepId";		
		return query(null,null,fsql,wsql,TConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> queryMonthlySummary(String yy){
		String compCode = sessionContext.getCompCode();		
		String fsql = "MONTH(t1.consDate) as mm,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and YEAR(t1.consDate)='"+yy+"'";
		wsql +=" group by MONTH(t1.consDate)";		
		return query(null,null,fsql,wsql,TConsign.class);
	}
	
	@Override
	@SuppressWarnings({"unchecked"})
	public List<Object> queryDailySummary(String yy,String mm){
		String compCode = sessionContext.getCompCode();
		String fsql = "DAY(t1.consDate) as dd,count(t1.id) as consNum";
		String wsql = "t1.removed=0 and t1.compCode='"+compCode+"'";
		wsql +=" and YEAR(t1.consDate)='"+yy+"' and MONTH(t1.consDate)='" + mm + "'";
		wsql +=" group by DAY(t1.consDate)";
		return query(null,null,fsql,wsql,TConsign.class);
	}
	
	//统计
	@Override
	@SuppressWarnings({"unchecked", "rawtypes"})
	public List<Object> consShipSum(final List<HtQuery> conditions){
		requestContext.put("compCode",sessionContext.getCompCode());
		requestContext.put("removed",0+"");
		Class<TConsign> t1 = TConsign.class;
		StringBuffer sb = new StringBuffer();
		sb.append("t1,");
		sb.append(" (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and chclCode='ZHHK') as sumHk");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='1') as sumShipperAmount");
		
		sb.append(", (select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id and consBizType='T'");
		sb.append(" and e.expeType='R' and e.removed='0' and custNameFlag='2') as sumConsAmount");
		
		String fieldSql=sb.toString();
		
		List retList = query(conditions,requestContext,fieldSql,null,t1);
		String rowCount = String.valueOf(querySize(conditions, requestContext,"t1.id", "", t1));
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		return retList;
	}
	
}
