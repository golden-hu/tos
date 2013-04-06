package com.hitisoft.fos.tran.dao.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TSimPositionOlderDao;
import com.hitisoft.fos.tran.entity.TSimEquipment;
import com.hitisoft.fos.tran.entity.TSimPositionOlder;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;
@Repository
public class TSimPositionOlderDaoImpl extends JpaDao<TSimPositionOlder, Long> implements TSimPositionOlderDao {
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	
	public TSimPositionOlderDaoImpl() {
		super(TSimPositionOlder.class);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
    @Override
	public List <Object> getCurruntPosition(List<HtQuery> conditions){
		String vehicleNo=requestContext.get("vehicleNo");
		
		String compCode = sessionContext.getCompCode();
		final Class t1 = TSimPositionOlder.class;
		final Class t2 = TSimEquipment.class;
		StringBuffer sb=new StringBuffer();
		sb.append("  t1,t2.vehicleNo ");
		String sqlField=sb.toString();
		String w=" t1.simEquiNo=t2.simEquiNo ";
		if(StringUtil.isNotBlank(vehicleNo)){
			w+=" and t2.vehicleNo='"+vehicleNo+"' ";
		}
		w+=" and t1.id in (";
		w+=" select max(p.id) ";
		w+=" from  TSimPosition p,TSimEquipment e ";
		w+=" where p.removed=0 and e.removed=0 ";
		//w+=" and p.compCode='"+ compCode +"' ";
		w+=" and e.compCode= '"+ compCode +"' ";
		w+=" and p.simEquiNo=e.simEquiNo ";
		w+=" group by p.simEquiNo )";
		
        List  retList = query(null, null,sqlField, w, t1,t2);
		/*String rowCount = String.valueOf(querySize(conditions, requestContext,"t1.id",w, t1,t2));
		requestContext.put(ContextKey.rowCount.get(), rowCount);*/
		return retList;
	}
}
