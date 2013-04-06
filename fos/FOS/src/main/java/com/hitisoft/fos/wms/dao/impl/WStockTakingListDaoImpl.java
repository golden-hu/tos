package com.hitisoft.fos.wms.dao.impl;


import org.springframework.stereotype.Repository;



import com.hitisoft.fos.wms.dao.WStockTakingListDao;


import com.hitisoft.fos.wms.entity.WStockTakingList;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WStockTakingListDaoImpl extends JpaDao<WStockTakingList, Long> implements WStockTakingListDao{
	public WStockTakingListDaoImpl()
	{
		super(WStockTakingList.class);
	}

}
