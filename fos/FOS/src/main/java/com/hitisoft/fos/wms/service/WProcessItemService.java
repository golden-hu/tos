package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WProcessItemDao;
import com.hitisoft.fos.wms.entity.WProcessItem;
import com.hitisoft.fos.wms.entity.WReceivedCargo;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class WProcessItemService {
	
	@Autowired
	private WProcessItemDao dao;
	
	/**Action : WPROCESSITEMS_S<p>
	 * 加工作业保存单
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WProcessItem> save(List<WProcessItem> entityList) {
		for(WProcessItem c : entityList){
			if(c.getRowAction()==RowAction.R||c.getRowAction()==RowAction.M){
				WProcessItem oc = dao.findById(c.getId());
				if(oc.getId()==null)
					throw new BusinessException(FosExceptionEnum.WMS_ACTION_DENYED);
			}
		}
		return dao.saveByRowAction(entityList);
	}

	/**Action : WPROCESSITEMS_Q<p>
	 * 加工作业查询单
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WProcessItem> query() {
		return dao.findByProperties();
	}
	
	/**Action : WPROCESSITEMS_X<p>
	 * 加工作业复杂查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WProcessItem> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
