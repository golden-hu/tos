package com.hitisoft.fos.wms.dao;

import java.util.List;

import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface WCargoDao extends BaseDao<WCargo, Long> {
	List<WCargo> FindByIdUnit(Integer cargoId);
}
