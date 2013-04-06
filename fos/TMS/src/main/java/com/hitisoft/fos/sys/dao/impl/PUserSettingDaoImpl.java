package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PUserSettingDao;
import com.hitisoft.fos.sys.entity.PUserSetting;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PUserSettingDaoImpl extends JpaDao<PUserSetting, Long> implements PUserSettingDao {
	public PUserSettingDaoImpl() {
		super(PUserSetting.class);
	}
}
