package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CPriceLineDao;
import com.hitisoft.fos.sys.entity.CPriceLine;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CPriceLineDaoImpl extends JpaDao<CPriceLine, Long> implements CPriceLineDao {
	public CPriceLineDaoImpl() {
		super(CPriceLine.class);
	}
}
