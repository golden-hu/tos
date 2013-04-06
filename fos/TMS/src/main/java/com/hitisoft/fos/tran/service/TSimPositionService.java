package com.hitisoft.fos.tran.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.service.DaemonService;

import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.tran.dao.TSimEquipmentDao;
import com.hitisoft.fos.tran.dao.TSimPositionDao;
import com.hitisoft.fos.tran.dao.TSimPositionOlderDao;
import com.hitisoft.fos.tran.entity.TSimEquipment;
import com.hitisoft.fos.tran.entity.TSimPosition;
import com.hitisoft.fos.tran.entity.TSimPositionOlder;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;
@Service
public class TSimPositionService  extends DaemonService{
	@Autowired
	private TSimPositionDao dao; 
	@Autowired
	private TSimPositionOlderDao olderDao; 
	@Autowired
	private TSimEquipmentDao equiDao; 
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private PCompanyConfigDao companyConfigDao;
	
	@Transactional
	/**
	 * 页面添加位置
	 * @param itemList
	 * @return
	 */
	public List<TSimPosition> save(List<TSimPosition> itemList) {
		String factoryName=requestContext.get("factoryName");
		String simEquiNo=requestContext.get("simEquiNo");
		String speed=requestContext.get("speed");
		String direction=requestContext.get("direction");
		String lat=requestContext.get("lat");
		String lng=requestContext.get("lng");
		TSimPosition p=new TSimPosition();
		p.setFactoryName(factoryName);
		p.setSimEquiNo(simEquiNo);
		p.setSpeed(speed);
		p.setDirection(direction);
		p.setLat(lat);
		p.setLng(lng);
		dao.add(p);
		
		return null;
	}

    @Transactional(readOnly = true)
	public List<TSimPosition> query() {
		return dao.findByProperties();
	}
	
	//获取车辆最新位置
	@Transactional(readOnly = true)
	public List<BaseDomain> getCurruntPosition(List<HtQuery> conditions){
		List<BaseDomain> retList = new ArrayList<BaseDomain>();
		List<Object> objList=dao.getCurruntPosition(conditions);
		for(Object obj:objList){
			if(obj instanceof Object[]){
				Object[] objArray = (Object[]) obj;
				TSimPosition p=(TSimPosition) objArray[0];
				String vehicleNo=(String) objArray[1];
				p.setVehicleNo(vehicleNo);
				retList.add(p);
			}
		}
		return retList;
	}
	
	/**
	 * 获取纬度经度
	 * 石易科技公司提供协议
	 * @return json
	 * @author liuyong
	 */
	public String getBackValue(String simEquiUrl){
		 String temp="",str="";
	        try{
	            URL url = new URL(simEquiUrl);
	            HttpURLConnection conn=(HttpURLConnection)url.openConnection();
	            InputStreamReader isr=new InputStreamReader(conn.getInputStream());   
	            BufferedReader br=new BufferedReader(isr);
	            while((temp=br.readLine())!=null){
	            	str+=temp+"\r\n";
	            }
	            br.close();
	            isr.close();
	            conn.disconnect();
	        }catch(Exception e){
	            e.printStackTrace();
	        }
			return str;
	}
	
	/**
	 * 定时程序
	 * @return
	 */
	@Transactional
	public  void parseBackValue(){
		setup();
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(Constants.COMCF_KEY, "SIM_EQUI_URL");
		List<PCompanyConfig> simEquiRrlList = companyConfigDao.findByProperties(queryMap);
		String simEquiAdd="",simEquiCustId="";
		//服务器地址
		for (PCompanyConfig companyConfig : simEquiRrlList) {
			String simEquiUrl = companyConfig.getCocoValue();
			if (StringUtil.isBlank(simEquiUrl) || "0".equals(simEquiUrl)) {
				continue;
			}else{
				simEquiAdd=companyConfig.getCocoValue();
				sessionContext.setCompCode(companyConfig.getCompCode());
			}
		}
		//石易公司提供的客户ID
		queryMap.remove(Constants.COMCF_KEY);
		queryMap.put(Constants.COMCF_KEY, "SIM_EQUI_ID");
		List<PCompanyConfig> simEquiCustIdlist = companyConfigDao.findByProperties(queryMap);
		for (PCompanyConfig companyConfig : simEquiCustIdlist) {
			String custId = companyConfig.getCocoValue();
			if (StringUtil.isBlank(custId) || "0".equals(custId)) {
				continue;
			}else{
				simEquiCustId=companyConfig.getCocoValue();
				sessionContext.setCompCode(companyConfig.getCompCode());
			}
		}
		if(!simEquiAdd.equals("")&&!simEquiCustId.equals("")){
			//取设备号
			queryMap.remove(Constants.COMCF_KEY);
			queryMap.put("removed", 0+"");
			queryMap.put("COMP_CODE",sessionContext.getCompCode() );
			List <TSimEquipment>simEquiList=equiDao.findByProperties(queryMap);
			if(simEquiList!=null&&simEquiList.size()>0){
				for(TSimEquipment simEqui:simEquiList){
					String simEquiNo=simEqui.getSimEquiNo();
					if(StringUtil.isNotBlank(simEquiNo)){
						String simEquiUrl="http://"+
								simEquiAdd+"/getGps/gpsServlet?method=getMonitorGpsInfo&version=0&customID="+
								simEquiCustId+"&mapType=G_SATELLITE_MAP&serviceKey="+simEquiNo;
						String str=this.getBackValue(simEquiUrl);
						if(!str.equals("")){
							try {
					        	JSONObject jsonObj = new JSONObject(str);
								 String speed= (String) jsonObj.get("sudu");
								 String lat= (String) jsonObj.get("weidu");
								 String lng= (String) jsonObj.get("jingdu");
								 Date sendTime=StringUtil.string2Date((String)jsonObj.get("systime"));
								 String online=(String) jsonObj.get("online");
								 String addUrl="http://maps.google.cn/maps/geo?output=csv&key=abcdef&q="+lat+","+lng;
								 String addStr=this.getBackValue(addUrl);
								 String address="";
								 if(!addStr.equals("")){
									 String addArray[]=addStr.split(",");
									 if(addArray.length>0){
										 address=addArray[addArray.length-1];
									 }
								 }
								 TSimPosition p=new TSimPosition();
									p.setSimEquiNo(simEquiNo);
									p.setSpeed(speed);
									p.setLat(lat);
									p.setLng(lng);
									p.setSendTime(sendTime);
									p.setOnline(online);
									p.setAddress(address);
									p.setCreateTime(new Date());
									p.setVersion(0);
									p.setRemoved((byte)0);
									p.setCompCode(sessionContext.getCompCode());
									if(StringUtil.isNotBlank(p.getLat())){
										Map <String,String> map=new HashMap<String,String>();
										map.put("removed",0+"");
										map.put("simEquiNo",simEquiNo);
										List<TSimPosition> pList=dao.findByProperties(map);
										if(pList!=null&&pList.size()>0){
											p=(TSimPosition) pList.get(0);
											p.setSpeed(speed);
											p.setLat(lat);
											p.setLng(lng);
											p.setSendTime(sendTime);
											p.setOnline(online);
											p.setAddress(address);
											p.setCreateTime(new Date());
											dao.update(p);
										}else{
											dao.add(p);
										}
										TSimPositionOlder olderPosi=new TSimPositionOlder();
										 olderPosi.setSimEquiNo(simEquiNo);
										 olderPosi.setSpeed(speed);
										 olderPosi.setLat(lat);
										 olderPosi.setLng(lng);
										 olderPosi.setSendTime(sendTime);
										 olderPosi.setOnline(online);
										 olderPosi.setAddress(address);
										 olderPosi.setCreateTime(new Date());
										 olderPosi.setVersion(0);
										 olderPosi.setRemoved((byte)0);
										 olderPosi.setCompCode(sessionContext.getCompCode());
										olderDao.add(olderPosi);
									}
					        } catch (JSONException e) {
						        e.printStackTrace();
					        }
						}
					}
				}
			}
		}
	}
}
