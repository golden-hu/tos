package com.hitisoft.fos.wms.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WCheckCargoDao;
import com.hitisoft.fos.wms.entity.WCheckCargo;
import com.hitisoft.fos.wms.entity.WCheckNote;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class WCheckCargoDaoImpl extends JpaDao<WCheckCargo, Long> implements WCheckCargoDao {
	@Autowired
    private RequestContext requestContext;
	
	public WCheckCargoDaoImpl() {
		super(WCheckCargo.class);
	}
	
}
