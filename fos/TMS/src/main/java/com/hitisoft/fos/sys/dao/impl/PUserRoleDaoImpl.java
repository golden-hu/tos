package com.hitisoft.fos.sys.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PUserRoleDao;
import com.hitisoft.fos.sys.entity.PRole;
import com.hitisoft.fos.sys.entity.PUserRole;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class PUserRoleDaoImpl extends JpaDao<PUserRole, Long> implements PUserRoleDao {
	@Autowired
	private RequestContext requestContext;

	public PUserRoleDaoImpl() {
		super(PUserRole.class);
	}

	@Override
	public List<PUserRole> findByProperties() {
		List<PUserRole> retList = new ArrayList<PUserRole>();
		@SuppressWarnings("unchecked")
		List<?> list = query(null, requestContext, "t1,t2.roleName", "t1.roleId = t2.id", PUserRole.class,
				PRole.class);
		for (Object obj : list) {
			Object[] array = (Object[]) obj;
			PUserRole ur = (PUserRole) array[0];
			String roleName = (String) array[1];
			ur.setRoleName(roleName);
			retList.add(ur);
		}
		return retList;
	}
}
