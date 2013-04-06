package com.hitisoft.fos.wms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WProcessDao;
import com.hitisoft.fos.wms.dao.WProcessItemDao;
import com.hitisoft.fos.wms.entity.WProcess;
import com.hitisoft.fos.wms.entity.WProcessItem;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class WProcessService {
	
	@Autowired
	private WProcessDao dao;
	@Autowired
	private WProcessItemDao wdao;
	@Autowired
	private SerialFactory serialFactory;
	/**Action : WPROCESS_S<p>
	 * 加工作业保存
	 * @param entityList
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public List save(List entityList) {
		List retList= new ArrayList();
		WProcess entity  = null;
		String no="";
		//Long mId=null;
		
		for (Object obj: entityList){
			if(obj instanceof WProcess){
				entity=(WProcess) obj;
				if (entity.getRowAction() == RowAction.N){
					no=serialFactory.getSerial("homework_No");
					entity.setHomeworkNo(no);
					entity.setId(null);
					dao.saveByRowActionSolo(entity);
					retList.add(entity);
			    }
				else if(entity.getRowAction() == RowAction.M){
					WProcess retEntity = dao.update(entity);
				    retList.add(retEntity);
			    }
				else if(entity.getRowAction() == RowAction.R){
					WProcess delEntity = dao.findById(entity.getId());
					delEntity.setRowAction(RowAction.R);
					dao.update(delEntity);
			    }

		   }
		}
		
		for (Object obj: entityList){
			if(obj instanceof WProcessItem){
				WProcessItem item=(WProcessItem) obj;
				if(item.getRowAction()==RowAction.N){
					item.setwProcessId(entity.getId().longValue());
					item = wdao.saveByRowActionSolo(item);
					retList.add(item);
				}
				else if (item.getRowAction() == RowAction.M) {
					retList.add(wdao.update(item));
				}
				else if (item.getRowAction() == RowAction.R) {
					WProcessItem delCargoEntity = wdao.findById(item.getId());
					delCargoEntity.setRowAction(RowAction.R);
					wdao.update(delCargoEntity);
				}
			}
		}
		
		return retList;
	}

	/**Action : WPROCESS_Q<p>
	 * 加工作业查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WProcess> query() {
		return dao.findByProperties();
	}
	
	/**Action : WPROCESS_M<p>
	 * 加工作业删除 并删除从表的记录
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WProcess> delete(List<WProcess> entityList) {
				//WProcess entit=new WProcess();
		for (WProcess entity : entityList) {
			RowAction ra = entity.getRowAction();
			if(ra==RowAction.R)
			{
				//首先删 除从表的纪录
				List<WProcessItem> wpiEntity=wdao.findByProperty("wProcessId", ""+entity.getId());
				
				for(WProcessItem wProcessItem : wpiEntity){
					wProcessItem.setRowAction(RowAction.R);
				}				
				wdao.saveByRowAction(wpiEntity);
			}		

		}		
		return dao.saveByRowAction(entityList);
	}
	
	/**Action : WPROCESS_X<p>
	 * 加工作业复杂查询
	 * @param conditions
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WProcess> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
