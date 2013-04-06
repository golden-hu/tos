package com.hitisoft.fos.wms.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WCheckListDao;
import com.hitisoft.fos.wms.entity.WCheckList;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WCheckListDaoImpl extends JpaDao<WCheckList, Long> implements WCheckListDao {
	public WCheckListDaoImpl() {
		super(WCheckList.class);
	}

	@Autowired
	RequestContext requestContext;
	
	/**
	 * 根据拣货单id查询拣货单列表
	 * @param requestContextcheckNoteId
	 * @return ListWCheckList
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WCheckList> findCheckIdExp() {
		String id=requestContext.get("checkNoteId");
		/*String Sql = "SELECT WCL.SKU_NO , WCL.CARGO_NAME , WCL.BLOCK_NAME , WCL.PRODUCT_NO ,WCL.ACCOUNT_QUANTITY " +
				" FROM W_CHECK_LIST WCL WHERE WCL.CHECK_NOTE_ID='"+id+"'"+" AND WCL.REMOVED=0" ;*/
		String sql="t1";
		String where =" t1.checkNoteId='"+id+"'";
		where+=" and t1.removed=0 ";
		return query(null,null,sql,where,WCheckList.class);
		/*return (List<WCheckList>) this.queryByJpql(Sql);*/
	}
}
