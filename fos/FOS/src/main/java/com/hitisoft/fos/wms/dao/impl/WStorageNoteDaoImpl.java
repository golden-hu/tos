package com.hitisoft.fos.wms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WStorageNoteDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WPickedCargo;
import com.hitisoft.fos.wms.entity.WPlacedCargo;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class WStorageNoteDaoImpl extends JpaDao<WStorageNote, Long> implements WStorageNoteDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	 private SessionContext sessionContext;
	
	public WStorageNoteDaoImpl() {
		super(WStorageNote.class);
	}
	
	/**
	 * 收货地址的智能查询，如果有参数传入，则根据这个参数模糊查询，如果没参数传入，则查询所有地址
	 * @return ListWStorageNote
	 * @param requestContextLoadAddress
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNote> getLoadAddress() {
		String compCode=sessionContext.getCompCode();
		String loadAddress=requestContext.get("loadAddress");
		StringBuffer sb=new StringBuffer();
		if(requestContext.get("loadAddress") != null){
			sb.append(" distinct loadAddress from WStorageNote where loadAddress is not null ");
			sb.append(" and removed=0 and compCode='"+compCode+"' ");
			sb.append(" and loadAddress like '" + loadAddress + "%' ");
			sb.append(" order by id DESC ");
			final String requestString=sb.toString();
			return query(null,null,requestString,"",WStorageNote.class);
		}else{
				sb.append(" distinct t1.loadAddress ");
				String where=" t1.loadAddress is not null and t1.removed=0 and t1.compCode='"+compCode+"' ";
				final String requestString=sb.toString();
				return query(null,null,requestString,where,WStorageNote.class);
		}
		
	}
	
	/**
	 * 承运商的智能查询，如果有参数传入，则根据参数模糊查询如果没参数传入，则查询全部。
	 * @param requestContextTransCarrier
	 * return ListWStorageNote
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNote> getTransCarrier() {
		String compCode=sessionContext.getCompCode();
		String transCarrier=requestContext.get("transCarrier");
		StringBuffer sb=new StringBuffer();
		if(requestContext.get("transCarrier") != null){
			sb.append(" distinct transCarrier from WStorageNote where transCarrier is not null ");
			sb.append(" and removed=0 and compCode='"+compCode+"' ");
			sb.append(" and transCarrier like '" + transCarrier + "%' ");
			sb.append(" order by id DESC ");
			final String requestString=sb.toString();
			return query(null,null,requestString,"",WStorageNote.class);
		}else{
				sb.append(" distinct t1.transCarrier ");
				String where=" t1.transCarrier is not null and t1.removed=0 and t1.compCode='"+compCode+"' ";
				final String requestString=sb.toString();
				return query(null,null,requestString,where,WStorageNote.class);
		}
	}
	
	/**
	 * 查询出入库的应收和应付的统计
	 * @param conditions
	 * @return ListWStorageNOte
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<WStorageNote> complexQueryCheck(List<HtQuery> conditions) {
		// TODO Auto-generated method stub
		
		final Class t1=WStorageNote.class;
		StringBuffer sb=new StringBuffer();
		
		sb.append("t1");
		
		//应收合计
		sb.append(",(select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0') as sumR");
		
		//应付合计
		sb.append(",(select sum(e.expeTotalAmount*e.expeExRate)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0') as sumP");
		
		//应收美元合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='USD') as sumRUsd");
		
		//应收人民币合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='CNY') as sumRCny");
		
		//应付美元合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='USD') as sumPUsd");
		
		//应付人民币合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='CNY') as sumPCny");
		
		//应收美元已开帐单合计
		sb.append(",(select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='USD') as sumRUsdInvoice");
		
		//应收人民币已开帐单合计
		sb.append(",(select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='CNY') as sumRCnyInvoice");
		
		//应付美元已开帐单合计
		sb.append(",(select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='USD') as sumPUsdInvoice");
		
		//应付人民币已开帐单合计
		sb.append(",(select sum(e.expeInvoiceAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='CNY') as sumPCnyInvoice");
		
		//应收美元已核销合计
		sb.append(",(select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='USD') as sumRUsdWriteOff");
		
		//应收人民币已核销合计
		sb.append(",(select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode='CNY') as sumRCnyWriteOff");
		
		
		//应付美元已核销合计
		sb.append(",(select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='USD') as sumPUsdWriteOff");
		
		//应付人民币已核销合计
		sb.append(",(select sum(e.expeWriteOffAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode='CNY') as sumPCnyWriteOff");
		
		//应收其他币种合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='R' and e.removed='0' and e.currCode!='USD' and e.currCode!='CNY') as sumROther");
		
		//应付其他币种合计
		sb.append(",(select sum(e.expeTotalAmount)");
		sb.append(" from SExpense e where e.consId=t1.id");
		sb.append(" and e.expeType='P' and e.removed='0' and e.currCode!='USD' and e.currCode!='CNY') as sumPOther ");
		
		
		String fieldSql=sb.toString();
		
		List retList=query(conditions,requestContext,fieldSql,"t1.removed=0",t1);
		
		String rowCount=String.valueOf(querySize(conditions,requestContext,"distinct t1","t1.removed=0",t1));
		
		requestContext.put(ContextKey.rowCount.get(), rowCount);
		
		return retList;
	}

	/**
	 * 根据传入的条件出入库主表。和从表，货物表中查询出入库主信息
	 * @param conditions
	 * @return ListWStorageNote
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<WStorageNote> storageNoteCondition(List<HtQuery> conditions) {
		List list = new ArrayList();
		StringBuffer sql= new StringBuffer();
	    sql.append("t1");
		String sql1=sql.toString();
		String where=" t2.storageNoteId=t1.id and t2.cargoId=t3.id";
		where+=" and t1.removed=0 and t2.removed=0 ";
		for(HtQuery a:conditions)
		{
			if (a.getKey().equals("cargoOwenrName")){//货主
				where+=" and t1.cargoOwnerName like"+"'%"+a.getValue()+"'";
			}
			else if (a.getKey().equals("cargoType")){//产品类型
				where+=" and t3.categoryName="+"'"+a.getValue()+"'";
			}
			else if (a.getKey().equals("storageClass")){//来源类型
				where+=" and t1.storageClass="+"'"+a.getValue()+"'";
			}
			else if(a.getKey().equals("storageDateStart")){
				where+=" and t1.storageDate>="+"'"+a.getValue()+"'";
			}
			else if(a.getKey().equals("storageDateEnd")){
				where+=" and t1.storageDate<="+"'"+a.getValue()+"'";
			}
			else if(a.getKey().equals("receivedDateStart")){
				where+=" and t1.actureTime>="+"'"+a.getValue()+"'";
			}
			else if(a.getKey().equals("receivedDateEnd")){
				where+=" and t1.actureTime<="+"'"+a.getValue()+"'";
			}			
			else if (a.getKey().equals("cargoName")){//商品名称
				where+=" and t2.cargoName="+"'"+a.getValue()+"'";
			}
			else if (a.getKey().equals("txtEntrustNo")){//客户订单号
				where+=" and t2.entrustNo like "+"'%"+a.getValue()+"'";
			}
		}
		list=query(null,null,sql1,where,WStorageNote.class,WStorageNoteCargo.class,WCargo.class);
		return list;
	}


	/**
	 * 根据条件查询出货物主单信息（客户和出库单号可模糊查询）
	 * @param conditions
	 * @return ListWstorageNote
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
	@Override
	public List<WStorageNote> searchConditionsCargo(List<HtQuery> conditions) {

		List list=new ArrayList();
		String sql="t1";
		String where =" t2.outStorageNoteId=t1.id ";
		for(HtQuery htq: conditions){//订单号
			if(htq.getKey().equals("orderNo")){
				where +=" and t1.orderNo='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("actionGategory")){//类别
				where +=" and t1.actionGategory='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("custName")){//客户
				where +=" and t2.custName like '%"+htq.getValue()+"%'";
			}
			if(htq.getKey().equals("placedDateStart")){//接单起始时间
				where +=" and t1.storageDate>='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("placedDateEnd")){//接单截止时间
				where +=" and t1.storageDate<='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("pickedDateStart")){//出库时间
				where +=" and t2.pickedDate>='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("pickedDateEnd")){//出库时间
				where +=" and t2.pickedDate<='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("storageClass")){//来源类型
				where +=" and t1.storageClass='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("cargoOwnerName")){//货 主
				where +=" and t1.cargoOwnerName='"+htq.getValue()+"'";
			}
			if(htq.getKey().equals("storageNoteCargoNo")){//出库单号
				where +=" and t2.outStorageNoteNo like '%"+htq.getValue()+"'";
			}
		}
		return list=query(null,null,sql,where,WStorageNote.class,WPickedCargo.class);
		//return list=query(conditions,null,sql,where,WPickedCargo.class,WPlacedCargo.class,WStorageNote.class);
	
	}


	/**
	 * 根据给定的收货日期的范围查询出出入库主单信息
	 * @param conditions
	 * @return ListWStorageNote
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNote> complexQuery(List<HtQuery> conditions) {
		
		StringBuffer sb=new StringBuffer();
		sb.append(" t1 ");
		String requestString=sb.toString();
		
		String where=" t1.removed=0 ";
		for(HtQuery a:conditions)
		{
			if(a.getKey().equals("df")){
				
				if(a.getValue()!=null){
					
					where+=" and t1.storageDate>='"+a.getValue()+"'";
				}
			}
			else if(a.getKey().equals("de")){
				
				if(a.getValue()!=null){
					
					where+=" and t1.storageDate<='"+a.getValue()+"'";
				}
				
			}
			if(a.getKey().equals("storageNoteNoF")){
				where+=" and t1.storageNoteNo>="+"'"+a.getValue()+"'";
			}
			else if(a.getKey().equals("storageNoteNoE")){
				where+=" and t1.storageNoteNo<="+"'"+a.getValue()+"'";
			}
			
		}
		return query(conditions,null,requestString,where,WStorageNote.class);
	}
	
	/**
	 * 根据条件查询上架表、货物主表、货物表上的信息上的信息。按主信息ID分组
	 * @param conditions
	 * @return ListWStorageNote
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNote> complexQueryByGroup(List<HtQuery> conditions) {
		StringBuffer sb=new StringBuffer();
		sb.append(" t1 ");
		String where=" t1.removed=0 ";
		where+=" and t1.id=t2.storageNoteId ";
		where+=" and t2.cargoId=t3.id ";
		for(HtQuery ht:conditions){
			if(ht.getKey().equals("cargoOwnerName")){
				where +=" and t1.cargoOwnerName='"+ht.getValue()+"'";
			}
			else if(ht.getKey().equals("storageNoteNo")){
				where+=" and t1.storageNoteNo like'%"+ht.getValue()+"%'";
			}
			else if(ht.getKey().equals("categoryName")){
				where+=" and t3.categoryName='"+ht.getValue()+"'";
			}
			else if(ht.getKey().equals("cargoName")){
				where+=" and t2.cargoName='"+ht.getValue()+"'";
			}
			else if(ht.getKey().equals("entrustNo")){
				where+=" and t1.entrustNo like '%"+ht.getValue()+"%'";
			}
			else if(ht.getKey().equals("orderNo")){
				where+=" and t1.orderNo like '%"+ht.getValue()+"%'";
			}
			else if(ht.getKey().equals("warehouseName")){
				where+=" and t2.warehouseName='"+ht.getValue()+"'";
			}
			else if(ht.getKey().equals("areaName")){
				where+=" and t2.areaName='"+ht.getValue()+"'";
			}
			else if(ht.getKey().equals("blockName")){
				where+=" and t2.blockName='"+ht.getValue()+"'";
			}
		}
		
		where+=" group by t1.id";
		String requestString=sb.toString();
		return query(null,null,requestString,where,WStorageNote.class,WPlacedCargo.class,WCargo.class);
	}


	/**
	 * 查询订单号是否存在
	 * @param  requestContextOrderNo
	 * @return ListWStorageNotes
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WStorageNote> validationOrderNo() {
		// TODO Auto-generated method stub
		String orderNo=requestContext.get("orderNo");
		Integer storageType=Integer.parseInt(requestContext.get("storageType"));
		String sql =" select wsn.ORDER_NO from W_STORAGE_NOTE wsn where wsn.ORDER_NO='"+orderNo+"'"+"and wsn.STORAGE_TYPE='"+storageType+"'";
		return (List<WStorageNote>) this.queryByNativeSql(sql);
	}


	
}
