package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.wms.dao.WAreaDao;
import com.hitisoft.fos.wms.entity.WArea;

@Service
public class WAreaService {
	@Autowired
	private WAreaDao dao;
	
	/** Action名： AREA_S  
	 * 根据rowAction判断操作
	 * <b>N=新增
	 * <b>M=修改
	 * <b>R=删除
	 *@param 	entityList
	 *@return entityList 
	 */
	@Transactional
	public List<WArea> save(List<WArea> entityList) {
		return dao.saveByRowAction(entityList);
	}
	
	/** Action名： AREA_Q  
	 *  查询所有的数据
	 * @return WareaList
	 */
	@Transactional(readOnly = true)
	public List<WArea> query() {
		return dao.findByProperties();
	}
	
}
