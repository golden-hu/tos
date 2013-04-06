package com.hitisoft.fos.stat.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.stat.entity.BusinessSummaryItem;
import com.hitisoft.fos.tran.dao.TConsignDao;

import com.hitisoft.fos.express.dao.TExpressDao;
import com.hitisoft.fos.ffop.dao.FConsignDao;
import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.session.RequestContext;

@Service
public class ReportService {
	@Autowired
	private RequestContext requestContext;
	
	@Autowired
	private FConsignDao fcdao;

	@Autowired
	private TConsignDao tcdao;
	
	@Autowired
	private TExpressDao ecdao;
	
	@Autowired
	private SExpenseDao edao;
	
	@Transactional(readOnly = true)
	public List<BusinessSummaryItem> getBusinessSummary() {
		List<BusinessSummaryItem> list = new ArrayList<BusinessSummaryItem>();		
		String consDateF = requestContext.get("consDateF");
		String consDateT = requestContext.get("consDateT");
		
		BusinessSummaryItem mItem = getBusinessSummaryItem("M","海运",consDateF,consDateT);
		list.add(mItem);
		
		BusinessSummaryItem aItem = getBusinessSummaryItem("A","空运",consDateF,consDateT);
		list.add(aItem);
		
		BusinessSummaryItem gItem = getBusinessSummaryItem("G","报关",consDateF,consDateT);
		list.add(gItem);
		
		BusinessSummaryItem iItem = getBusinessSummaryItem("I","报检",consDateF,consDateT);
		list.add(iItem);
		
		BusinessSummaryItem tItem = getBusinessSummaryItem("T","陆运",consDateF,consDateT);
		list.add(tItem);
		
		BusinessSummaryItem eItem = getBusinessSummaryItem("E","快件",consDateF,consDateT);
		list.add(eItem);
		
		BusinessSummaryItem totalItem = new BusinessSummaryItem();
		totalItem.setConsBizType("TT");
		totalItem.setConsBizTypeName("总计：");
		totalItem.setConsNum(mItem.getConsNum()+aItem.getConsNum()+gItem.getConsNum()
				+iItem.getConsNum()+tItem.getConsNum()+eItem.getConsNum());
		totalItem.setTotalAR(mItem.getTotalAR()+aItem.getTotalAR()+gItem.getTotalAR()
				+iItem.getTotalAR()+tItem.getTotalAR()+eItem.getTotalAR());
		totalItem.setTotalR(mItem.getTotalR()+aItem.getTotalR()+gItem.getTotalR()
				+iItem.getTotalR()+tItem.getTotalR()+eItem.getTotalR());
		totalItem.setTotalAP(mItem.getTotalAP()+aItem.getTotalAP()+gItem.getTotalAP()
				+iItem.getTotalAP()+tItem.getTotalAP()+eItem.getTotalAP());
		totalItem.setTotalP(mItem.getTotalP()+aItem.getTotalP()+gItem.getTotalP()
				+iItem.getTotalP()+tItem.getTotalP()+eItem.getTotalP());
		totalItem.setGrossProfit(totalItem.getTotalR()-totalItem.getTotalP());
		totalItem.setGrossProfitA(totalItem.getTotalAR()-totalItem.getTotalAP());
		list.add(totalItem);
		return list;
	}
	
	@Transactional(readOnly = true)
	private BusinessSummaryItem getBusinessSummaryItem(String bizType,String bizTypeName,String consDateF,String consDateT){
		BusinessSummaryItem item = new BusinessSummaryItem();
		item.setConsBizType(bizType);
		item.setConsBizTypeName(bizTypeName);
		
		List<HtQuery> conditions = new ArrayList<HtQuery>();
		HtQuery hq = new HtQuery();
		hq.setKey("consDate");
		hq.setValue(consDateF);
		hq.setOp(SqlOp.moreEqual);
		conditions.add(hq);
		HtQuery hq2 = new HtQuery();
		hq2.setKey("consDate");
		hq2.setValue(consDateT);
		hq2.setOp(SqlOp.lessEqual);
		conditions.add(hq);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("consBizType", bizType);
		Long num = 0L;
		if(bizType.equals("M") || bizType.equals("A") || bizType.equals("G") || bizType.equals("I")){
			num = fcdao.querySize(conditions, map);			
		}
		else if(bizType.equals("T"))
			num = tcdao.querySize(conditions, map);
		else if(bizType.equals("E"))
			num = ecdao.querySize(conditions, map);
		
		item.setConsNum(num);
		BigDecimal totalAR = new BigDecimal(0);
		BigDecimal totalR = new BigDecimal(0);
		BigDecimal totalAP = new BigDecimal(0);
		BigDecimal totalP = new BigDecimal(0);
		
		List<Object> objList = edao.queryBusinessSummary(bizType,consDateF,consDateT);
		Object obj = objList.get(0);
		if (obj instanceof Object[]) {
			Object[] objArray = (Object[]) obj;			
			totalAR = (BigDecimal)objArray[0];
			if(totalAR==null) totalAR=new BigDecimal(0);
			totalR = (BigDecimal)objArray[1];
			if(totalR==null) totalR=new BigDecimal(0);
		}
		
		Object obj2 = objList.get(1);
		if (obj2 instanceof Object[]) {
			Object[] objArray = (Object[]) obj2;
			
			totalAP = (BigDecimal)objArray[0];	
			if(totalAP==null) totalAP=new BigDecimal(0);
			totalP = (BigDecimal)objArray[1];	
			if(totalP==null) totalP=new BigDecimal(0);
		}
		
		item.setTotalAR(totalAR.doubleValue());
		item.setTotalR(totalR.doubleValue());
		item.setTotalAP(totalAP.doubleValue());
		item.setTotalP(totalP.doubleValue());
		
		item.setGrossProfitA(totalAR.doubleValue()-totalAP.doubleValue());
		item.setGrossProfit(totalR.doubleValue()-totalP.doubleValue());
		return item;
	}
	
	@Transactional(readOnly = true)
	public List<BusinessSummaryItem> getSalesBusinessSummary(){
		String consDateF = requestContext.get("consDateF");
		String consDateT = requestContext.get("consDateT");
		
		List<BusinessSummaryItem> list = new ArrayList<BusinessSummaryItem>();		
		Map<String, BusinessSummaryItem> map = new HashMap<String, BusinessSummaryItem>();		
		List<Object> objList = edao.querySalesSummary(consDateF, consDateT);
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer salesId = (Integer)objArray[0];
				String expeType = (String)objArray[1];
				BigDecimal totalAmount = (BigDecimal)objArray[2];
				if(totalAmount==null) totalAmount=new BigDecimal(0);
				BigDecimal totalWriteoff = (BigDecimal)objArray[3];
				if(totalWriteoff==null) totalWriteoff=new BigDecimal(0);
				
				BusinessSummaryItem item = new BusinessSummaryItem();
				item.setConsSalesRepId(salesId);
				item.setExpeType(expeType);
				item.setTotalAR(totalAmount.doubleValue());
				item.setTotalR(totalWriteoff.doubleValue());
				map.put(""+salesId+"_"+expeType, item);
			}
		}
		
		Map<String, BusinessSummaryItem> smap = new HashMap<String, BusinessSummaryItem>();
		List<Object> fosList = fcdao.querySalesSummary(consDateF, consDateT);
		buildSalesSummary(fosList,map,smap);
		
		List<Object> tmsList = tcdao.querySalesSummary(consDateF, consDateT);
		buildSalesSummary(tmsList,map,smap);
		
		List<Object> exprList = ecdao.querySalesSummary(consDateF, consDateT);
		buildSalesSummary(exprList,map,smap);
		
		Set<Entry<String,BusinessSummaryItem>> set = smap.entrySet();
		for(Entry<String,BusinessSummaryItem> e : set){
			BusinessSummaryItem i = e.getValue();
			list.add(i);
		}
		return list;
		
	}
	
	@Transactional(readOnly = true)
	private void buildSalesSummary(List<Object> objList,Map<String, BusinessSummaryItem> map,Map<String, BusinessSummaryItem> smap){
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer salesId = (Integer)objArray[0];
				String salesName = (String)objArray[1];
				Long consNum = (Long)objArray[2];
				
				BusinessSummaryItem item = new BusinessSummaryItem();
				item.setConsSalesRepId(salesId);
				item.setConsSalesRepName(salesName);
				item.setConsNum(consNum);
				
				String k1 = ""+salesId+"_R";
				BusinessSummaryItem er = map.get(k1);
				if(er!=null){
					item.setTotalAR(er.getTotalAR());
					item.setTotalR(er.getTotalR());
				}
				else{
					item.setTotalAR(0.00);
					item.setTotalR(0.00);
				}
				
				String k2 = ""+salesId+"_P";
				BusinessSummaryItem ep = map.get(k2);
				if(ep!=null){
					item.setTotalAP(ep.getTotalAR());
					item.setTotalP(ep.getTotalR());
				}
				else{
					item.setTotalAP(0.00);
					item.setTotalP(0.00);
				}
					
				item.setGrossProfitA(item.getTotalAR()-item.getTotalAP());
				item.setGrossProfit(item.getTotalR()-item.getTotalP());
				if(smap.containsKey(""+salesId)){
					BusinessSummaryItem oi = smap.get(""+salesId);
					oi.setConsNum(oi.getConsNum()+item.getConsNum());
					oi.setTotalAR(oi.getTotalAR()+item.getTotalAR());
					oi.setTotalR(oi.getTotalR()+item.getTotalR());
					oi.setTotalAP(oi.getTotalAP()+item.getTotalAP());
					oi.setTotalP(oi.getTotalP()+item.getTotalP());
				}
				else
					smap.put(""+salesId, item);
			}
		}
	}
	
	@Transactional(readOnly = true)
	public List<BusinessSummaryItem> getMonthlySummary(){
		String yy = requestContext.get("yy");
		
		List<BusinessSummaryItem> list = new ArrayList<BusinessSummaryItem>();		
		Map<String, BusinessSummaryItem> map = new HashMap<String, BusinessSummaryItem>();
		
		List<Object> objList = edao.queryMonthlySummary(yy);
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer mm = (Integer)objArray[0];
				String expeType = (String)objArray[1];
				BigDecimal totalAmount = (BigDecimal)objArray[2];
				if(totalAmount==null) totalAmount=new BigDecimal(0);
				BigDecimal totalWriteoff = (BigDecimal)objArray[3];
				if(totalWriteoff==null) totalWriteoff=new BigDecimal(0);
				
				BusinessSummaryItem item = new BusinessSummaryItem();
				item.setMm(mm);
				item.setExpeType(expeType);
				item.setTotalAR(totalAmount.doubleValue());
				item.setTotalR(totalWriteoff.doubleValue());
				map.put(""+mm+"_"+expeType, item);
			}
		}
		
		Map<String, BusinessSummaryItem> smap = new HashMap<String, BusinessSummaryItem>();
		List<Object> fosList = fcdao.queryMonthlySummary(yy);
		buildMonthlySummary(fosList,map,smap);
		
		List<Object> tmsList = tcdao.queryMonthlySummary(yy);
		buildMonthlySummary(tmsList,map,smap);
		
		
		List<Object> exprList = ecdao.queryMonthlySummary(yy);
		buildMonthlySummary(exprList,map,smap);
		
		Set<Entry<String,BusinessSummaryItem>> set = smap.entrySet();
		for(Entry<String,BusinessSummaryItem> e : set){
			BusinessSummaryItem i = e.getValue();
			list.add(i);
		}
		return list;
		
	}
	
	@Transactional(readOnly = true)
	private void buildMonthlySummary(List<Object> objList,Map<String, BusinessSummaryItem> map,Map<String, BusinessSummaryItem> smap){
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer mm = (Integer)objArray[0];
				Long consNum = (Long)objArray[1];
				
				BusinessSummaryItem item = new BusinessSummaryItem();				
				item.setMm(mm);
				item.setConsNum(consNum);
				
				String k1 = ""+mm+"_R";
				BusinessSummaryItem er = map.get(k1);
				if(er!=null){
					item.setTotalAR(er.getTotalAR());
					item.setTotalR(er.getTotalR());
				}
				else{
					item.setTotalAR(0.00);
					item.setTotalR(0.00);
				}
				
				String k2 = ""+mm+"_P";
				BusinessSummaryItem ep = map.get(k2);
				if(ep!=null){
					item.setTotalAP(ep.getTotalAR());
					item.setTotalP(ep.getTotalR());
				}
				else{
					item.setTotalAP(0.00);
					item.setTotalP(0.00);
				}
					
				item.setGrossProfitA(item.getTotalAR()-item.getTotalAP());
				item.setGrossProfit(item.getTotalR()-item.getTotalP());
				if(smap.containsKey(""+mm)){
					BusinessSummaryItem oi = smap.get(""+mm);
					oi.setConsNum(oi.getConsNum()+item.getConsNum());
					oi.setTotalAR(oi.getTotalAR()+item.getTotalAR());
					oi.setTotalR(oi.getTotalR()+item.getTotalR());
					oi.setTotalAP(oi.getTotalAP()+item.getTotalAP());
					oi.setTotalP(oi.getTotalP()+item.getTotalP());
				}
				else
					smap.put(""+mm, item);
			}
		}
	}
	
	@Transactional(readOnly = true)
	public List<BusinessSummaryItem> getDailySummary(){
		String yy = requestContext.get("yy");
		String mm = requestContext.get("mm");
		
		List<BusinessSummaryItem> list = new ArrayList<BusinessSummaryItem>();		
		Map<String, BusinessSummaryItem> map = new HashMap<String, BusinessSummaryItem>();
		
		List<Object> objList = edao.queryDailySummary(yy,mm);
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer dd = (Integer)objArray[0];
				String expeType = (String)objArray[1];
				BigDecimal totalAmount = (BigDecimal)objArray[2];
				if(totalAmount==null) totalAmount=new BigDecimal(0);
				BigDecimal totalWriteoff = (BigDecimal)objArray[3];
				if(totalWriteoff==null) totalWriteoff=new BigDecimal(0);
				
				BusinessSummaryItem item = new BusinessSummaryItem();
				item.setDd(dd);
				item.setExpeType(expeType);
				item.setTotalAR(totalAmount.doubleValue());
				item.setTotalR(totalWriteoff.doubleValue());
				map.put(""+dd+"_"+expeType, item);
			}
		}
		
		Map<String, BusinessSummaryItem> smap = new HashMap<String, BusinessSummaryItem>();
		List<Object> fosList = fcdao.queryDailySummary(yy,mm);
		buildDailySummary(fosList,map,smap);
		
		List<Object> tmsList = tcdao.queryDailySummary(yy,mm);
		buildDailySummary(tmsList,map,smap);
		
		
		List<Object> exprList = ecdao.queryDailySummary(yy,mm);
		buildDailySummary(exprList,map,smap);
		
		Set<Entry<String,BusinessSummaryItem>> set = smap.entrySet();
		for(Entry<String,BusinessSummaryItem> e : set){
			BusinessSummaryItem i = e.getValue();
			list.add(i);
		}
		return list;
		
	}
	
	@Transactional(readOnly = true)
	private void buildDailySummary(List<Object> objList,Map<String, BusinessSummaryItem> map,Map<String, BusinessSummaryItem> smap){
		for(Object obj : objList){
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;			
				Integer dd = (Integer)objArray[0];
				Long consNum = (Long)objArray[1];
				
				BusinessSummaryItem item = new BusinessSummaryItem();				
				item.setDd(dd);
				item.setConsNum(consNum);
				
				String k1 = ""+dd+"_R";
				BusinessSummaryItem er = map.get(k1);
				if(er!=null){
					item.setTotalAR(er.getTotalAR());
					item.setTotalR(er.getTotalR());
				}
				else{
					item.setTotalAR(0.00);
					item.setTotalR(0.00);
				}
				
				String k2 = ""+dd+"_P";
				BusinessSummaryItem ep = map.get(k2);
				if(ep!=null){
					item.setTotalAP(ep.getTotalAR());
					item.setTotalP(ep.getTotalR());
				}
				else{
					item.setTotalAP(0.00);
					item.setTotalP(0.00);
				}
					
				item.setGrossProfitA(item.getTotalAR()-item.getTotalAP());
				item.setGrossProfit(item.getTotalR()-item.getTotalP());
				if(smap.containsKey(""+dd)){
					BusinessSummaryItem oi = smap.get(""+dd);
					oi.setConsNum(oi.getConsNum()+item.getConsNum());
					oi.setTotalAR(oi.getTotalAR()+item.getTotalAR());
					oi.setTotalR(oi.getTotalR()+item.getTotalR());
					oi.setTotalAP(oi.getTotalAP()+item.getTotalAP());
					oi.setTotalP(oi.getTotalP()+item.getTotalP());
				}
				else
					smap.put(""+dd, item);
			}
		}
	}
	
}
