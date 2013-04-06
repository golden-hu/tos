package com.hitisoft.fos.ffop.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.ffop.dao.FContainerDao;
import com.hitisoft.fos.ffop.entity.FConsign;
import com.hitisoft.fos.ffop.entity.FContainer;
import com.hitisoft.fos.general.entity.GVoyage;
import com.hitisoft.fw.orm.jpa.JpaDao;
import com.hitisoft.fw.session.RequestContext;

@Repository
public class FContainerDaoImpl extends JpaDao<FContainer, Long> implements FContainerDao {
	@Autowired
	private RequestContext requestContext;

	public FContainerDaoImpl() {
		super(FContainer.class);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public List<Object> complexQueryByVoyaId() {
		final Class t1 = FConsign.class;
		final Class t2 = FContainer.class;
		final Class t3 = GVoyage.class;
		String joinSql = "t1.id = t2.consId and t1.voyaId = t3.id";
		List objList = query(null, requestContext, "t1,t2,t3", joinSql, t1, t2, t3);
		List retList = new ArrayList();
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				FConsign consign = (FConsign) objArray[0];
				FContainer container = (FContainer) objArray[1];
				GVoyage voyage = (GVoyage) objArray[2];
				// 导出的报表, 需要箱子上有这两个临时字段, 从委托上复制过来
				container.setConsPodEn(consign.getConsPodEn());
				container.setConsMblNo(consign.getConsMblNo());
				retList.add(container);
				if (!retList.contains(voyage)) {
					retList.add(voyage);
				}
			}
		}

		return retList;
	}
}
