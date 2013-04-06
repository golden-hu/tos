package com.hitisoft.fos.wms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.hitisoft.fos.wms.dao.WSmartExpenseDao;
import com.hitisoft.fos.wms.entity.WSmartExpense;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;

@Repository
public class WSmartExpenseDaoImpl extends JpaDao<WSmartExpense, Long> implements WSmartExpenseDao {
	public WSmartExpenseDaoImpl() {
		super(WSmartExpense.class);
	}
	
		/**
		 * 根据出入库单ID进行智能计费系统查询
		 * @param conditions
		 * @return ListWSmartExpense
		 */
		@SuppressWarnings("unchecked")
		@Override
		public List<WSmartExpense> excelQuerySmartExpenseList(final List<HtQuery> conditions) {
			StringBuffer sb=new StringBuffer();
			List<WSmartExpense> list=new ArrayList<WSmartExpense>();
			sb.append("t1");
			String sqlField=sb.toString();
			String w=" t1.storageNoteId=t2.id and t1.removed=0 and t2.removed=0 ";
			for(HtQuery q:conditions){
				if(q.getKey().equalsIgnoreCase("storageNoteIdList")){
					w+=" and t2.id in ("+q.getValue()+") ";
				}
			}
			list=query(conditions,null,sqlField,w,WSmartExpense.class,WStorageNote.class);
			return list;
		}
}
