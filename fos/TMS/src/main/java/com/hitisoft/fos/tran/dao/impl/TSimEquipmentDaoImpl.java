package com.hitisoft.fos.tran.dao.impl;


import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TSimEquipmentDao;
import com.hitisoft.fos.tran.entity.TSimEquipment;
import com.hitisoft.fw.orm.jpa.JpaDao;
@Repository
public class TSimEquipmentDaoImpl extends JpaDao<TSimEquipment, Long> implements TSimEquipmentDao {
	public TSimEquipmentDaoImpl() {
		super(TSimEquipment.class);
	}
}
