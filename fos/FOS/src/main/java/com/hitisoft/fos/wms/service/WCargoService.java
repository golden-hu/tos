package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class WCargoService {
	@Autowired
	private WCargoDao dao;
	@Autowired
	private RequestContext requestContext;
	/**Action : WCARGO_S<p>
	 * 商品保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WCargo> save(List<WCargo> entityList) {
		
		if (entityList.get(0).getRowAction()==RowAction.N)
		{
			String strSkuNo=entityList.get(0).getSkuNo();
			
			List<WCargo> listCargo =dao.findByProperty("skuNo", strSkuNo);
			
			if (listCargo.size()>0)
			{
				
				throw new BusinessException(FosExceptionEnum.WMS_SKUNO_MUST_UNIQUE);
			}
			
		}
		
		
		return dao.saveByRowAction(entityList);
	}

	/**Action : WCARGO_Q<p>
	 * 商品查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WCargo> query() {
		return dao.findByProperties();
	}
	
	/**Action : WCARGO_X<p>
	 * 商品复杂查询
	 * @param conditions
	 * @return
	 */
	public List<WCargo> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
	
	/**Action : WCARGO_FU<p>
	 * 根据ID查询货物表中的包装单位
	 * @param ListHtQUery
	 * @return ListWCargo
	 */
	@Transactional
	public List<WCargo> FindByIdUnit(){
		Integer cargoId = Integer.parseInt(requestContext.get("id"));
		//Integer unitId = Integer.parseInt(requestContext.get("pUnitId"));
		return dao.FindByIdUnit(cargoId);
	}
	
}
