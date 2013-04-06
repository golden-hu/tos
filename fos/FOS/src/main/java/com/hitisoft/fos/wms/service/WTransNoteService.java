package com.hitisoft.fos.wms.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.util.SerialFactory;
import com.hitisoft.fos.wms.dao.WTransListDao;
import com.hitisoft.fos.wms.dao.WTransNoteDao;

import com.hitisoft.fos.wms.entity.WTransList;
import com.hitisoft.fos.wms.entity.WTransNote;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class WTransNoteService {
	@Autowired
	private WTransNoteDao dao;
	@Autowired
	private WTransListDao wtlDao;
	
	@Autowired
	private SerialFactory serialFactory;
	
	@Autowired
	private RequestContext requestContext;
	
	/**Action : WTRANS_NOTE_S<p>
	 * 移库单保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WTransNote> save(List<WTransNote> entityList) {
		
		String no="";
		for (WTransNote entity : entityList) {
			RowAction ra=entity.getRowAction();
			
			if (ra == RowAction.N) {
				no=serialFactory.getSerial("trans_note_no");
				entity.setTransNoteNo(no);
			}
			
			if (ra==RowAction.R)
			{
				
				List<WTransList> wtList=wtlDao.findByProperty("transNoteId", ""+entity.getId());
				
				
				for (WTransList wTransList : wtList) {
					wTransList.setRowAction(RowAction.R);
					System.out.println(wTransList.getCargoName());
				}
				
				wtlDao.saveByRowAction(wtList);
				
			}
			
		}

		return dao.saveByRowAction(entityList);
	}

	/**Action : WTRANS_NOTE_CS<p>
	 * 计费条目保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List complexSave(List entityList) {
		List resList=new ArrayList();
		String no="";
		Map<String,Long> idMap=new HashMap<String,Long>();
		for(Object obj:entityList){
			if(obj instanceof WTransNote){
				WTransNote tn=(WTransNote) obj;
				String oldUuid=tn.getUuid();
				RowAction ra=tn.getRowAction();
				no=serialFactory.getSerial("trans_note_no");
				tn.setTransNoteNo(no);
				tn=dao.saveByRowActionSolo(tn);
				if(ra!=RowAction.R){
					resList.add(tn);
				}
				idMap.put(oldUuid, tn.getId());
			}
		}
		
		for(Object obj:entityList){
			if(obj instanceof WTransList){
				WTransList tl=(WTransList)obj;
				if(tl.getRowAction()==RowAction.N){
					Long transNoteId=idMap.get(tl.getUuid());
					tl.setTransNoteId(transNoteId.intValue());
				}
				tl=wtlDao.saveByRowActionSolo(tl);
				if(tl.getRowAction()!=RowAction.R)
					resList.add(tl);
			}
		}
		
		return resList;
	}
	
	/**Action : WTRANS_NOTE_Q<p>
	 * 移库单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WTransNote> query() {
		return dao.findByProperties();
	}
	
	
	/**Action : WTRANS_NOTE_U<p>
	 * 移库单状态变列
	 */
	@Transactional
	public void updateStatus()
	{
		Long id=Long.valueOf(requestContext.get("id"));		
		Integer status=Integer.valueOf(requestContext.get("status"));		
		
		WTransNote entity=dao.findById(id);
		
		if (entity!=null)
		{
			if(status==2)
			{

				String checkerName=requestContext.get("checkerName");
				Date checkTime=new Date();
				DateFormat format1=new SimpleDateFormat("yyyy-MM-dd"); 				
				try {
					checkTime=format1.parse(requestContext.get("checkTime"));
				} catch (ParseException e) {					
				}
				entity.setCheckerName(checkerName);
				entity.setCheckTime(checkTime);
			}
			entity.setStatus(status);
			dao.update(entity);
			
		}

	}
}
