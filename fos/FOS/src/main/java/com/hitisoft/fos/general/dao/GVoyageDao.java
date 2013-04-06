package com.hitisoft.fos.general.dao;

import com.hitisoft.fos.general.entity.GVoyage;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface GVoyageDao extends BaseDao<GVoyage, Long> {
	public abstract void updateVessName(final Long vessId, final String vessName, final String vessNameCn);

}
