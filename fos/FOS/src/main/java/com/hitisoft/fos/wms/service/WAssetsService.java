package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hitisoft.fos.wms.dao.WAssetsDao;
import com.hitisoft.fos.wms.entity.WAssets;
import com.hitisoft.fw.util.StringUtil;

@Service
public class WAssetsService {
	@Autowired
	private WAssetsDao dao;
	
	/**Action : WASSETS_S<p>
	 * 保存栈板信息
	 * @param entityList
	 * @return ListWAssets
	 */
	@Transactional
	public List<WAssets> save(List<WAssets> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WASSETS_Q
	 * 栈板信息查询
	 * @return ListWAssets
	 */
	@Transactional(readOnly = true)
	public List<WAssets> query() {
		return dao.findByProperties();
	}
	
	private WAssets getByname(String str){
		String name = "";		
		int idx = str.indexOf("\n");
		if(idx==-1){
			name = str;
		}
		else{
			name = str.substring(0,idx);
		}
		if(StringUtil.isNotBlank(name)){
			WAssets wsn = new WAssets();
			wsn.setAtBrand(name);
			wsn.setAtName(name);
			return wsn;
		}
		return null;
	}
	/**Action : WASSETS_F
	 * 栈板名称查询
	 * @return ListWAssers
	 */
	@Transactional(readOnly = true)
	public List<WAssets> findByname() {
		List<WAssets> retlist=new ArrayList<WAssets>();
		List<WAssets> objList = dao.getByname();
		if(objList.size()>0){
			for(Object obj: objList){
				if(obj instanceof Object){
					String wsn=(String) obj;
					WAssets wn = getByname(wsn);
					if(wn!=null){
						retlist.add(wn);
					}
				}
			}
		}
		return retlist;
	}
	
	/**Action ： WASSETS_E
	 * 栈板品牌查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WAssets> findByBland() {
		List<WAssets> retlist=new ArrayList<WAssets>();
		List<WAssets> objList = dao.findByBland();
		if(objList.size()>0){
			for(Object obj: objList){
				if(obj instanceof Object){
					String wsn=(String) obj;
					WAssets wn = getByname(wsn);
					if(wn!=null){
						retlist.add(wn);
					}
				}
			}
		}
		return retlist;
	}
}
