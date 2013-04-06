package com.hitisoft.fos.wms.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WPackageDao;
import com.hitisoft.fos.wms.entity.WPackage;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Repository
public class WPackageDaoImpl extends JpaDao<WPackage, Long> implements WPackageDao {
	public WPackageDaoImpl() {
		super(WPackage.class);
	}
	@Autowired
	private RequestContext requestContext;
	@Autowired
	 private SessionContext sessionContext;
	
	/**
	 * 根据requestContext中得到的包装名称查询
	 * @param requestContextPackageName
	 * @return ListWpackage
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<WPackage> getPackageName() {
		String compCode=sessionContext.getCompCode();
		String packageName=requestContext.get("packageName");
		StringBuffer sb=new StringBuffer();
		if(requestContext.get("packageName") != null){
			sb.append(" packageName is not null ");
			sb.append(" and removed=0 and compCode='"+compCode+"' ");
			sb.append(" and packageName like '" + packageName + "%' ");
			//sb.append(" order by id DESC ");
			final String requestString=sb.toString();
			return query(null,null,"distinct t1",requestString,WPackage.class);
		}else{
				sb.append("distinct  t1");
				String where=" t1.packageName is not null and t1.removed=0 and t1.compCode='"+compCode+"' ";
				final String requestString=sb.toString();
				return query(null,null,requestString,where,WPackage.class);
		}
	}
}
