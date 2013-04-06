package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface PUserDao extends BaseDao<PUser, Long> {

	List<?> queryFuncCode();

	List<PUser> queryByNameOrEmail(String name, String password);
}
