package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WArea;
import com.hitisoft.fos.wms.entity.WCargoKz;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface WCargoKzDao extends BaseDao<WCargoKz, Long> {

	List<WCargoKz> dailyInventory();
}
