package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hitisoft.fos.wms.dao.WPackageDao;
import com.hitisoft.fos.wms.entity.WPackage;
import com.hitisoft.fw.session.RequestContext;

@Service
public class WPackageService {
	@Autowired
	private WPackageDao dao;
	
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WPACKAGE_S<p>
	 * 包装信息保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WPackage> save(List<WPackage> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WPACKAGE_Q<p>
	 * 包装信息查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WPackage> query() {
		return dao.findByProperties();
	}
	

	/**Action : <p>
	 * 读取包装名称
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WPackage> getPackageName(){
		List<WPackage> retList=dao.getPackageName();
		return retList;
	}
	
	/**Action : WPACKAGE_V<p>
	 * 包装名称验证
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WPackage> validationPackageName(){
		String packageName=requestContext.get("packageName");
		List<WPackage> retList=dao.findByProperty("packageName",packageName);
		return retList;
	}
}
