package com.hitisoft.fos.general.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.general.dao.GPlaceDao;
import com.hitisoft.fos.general.dao.GSiteDao;
import com.hitisoft.fos.general.entity.GPlace;
import com.hitisoft.fos.general.entity.GSite;
import com.hitisoft.fw.session.SessionContext;


@Service
public class GSiteService {
	@Autowired
	private GSiteDao dao;
	
	@Autowired
	private GPlaceDao gplaceDao;
	
	@Autowired
	EntityManagerFactory entityManagerFactory;
	
	@Autowired
	SessionContext sessionContext;
	
	@Transactional
	public List<GSite> save(List<GSite> entityList) {
		//添加省市的自动存储功能
		//1、只要省字段名称不为空将自动检测并保存
		//2、只有在省市两个字段同时存在时，才可以保存市信息，并同时检测维护省信息，否则市信息将不能被自动维护
		try{
			for(GSite site:entityList){//添加市
				EntityManager entityManager=entityManagerFactory.createEntityManager();
				String placProvinceName=site.getProvinceName();
				String placCityName=site.getCityName();
				List<GPlace> plist=null;
				String hql="";
				if(!placProvinceName.isEmpty()&&!placCityName.isEmpty()){
					hql="from GPlace gp where gp.placProvinceName='"+placProvinceName+"' and gp.placCityName='"+placCityName+"'";
					plist=entityManager.createQuery(hql).getResultList();
					if(plist==null||plist.size()<=0){
						GPlace  newPlace=new GPlace();
						newPlace.setPlacCityName(placCityName);
						newPlace.setPlacProvinceName(placProvinceName);
						newPlace.setPlacCode("placeCode");
						newPlace.setPlacName(placCityName);
						newPlace.setPlacNameEn("placeNameEn");
						newPlace.setCompCode(sessionContext.getCompCode());
						newPlace.setVersion(0);
						newPlace.setRemoved(Byte.valueOf("0"));
						newPlace.setActive(Byte.valueOf("1"));
						newPlace.setPlacType(Byte.valueOf("2"));
						
						gplaceDao.add(newPlace);
					}
				}
			    if(!placProvinceName.isEmpty()){//添加省
					hql="from GPlace gp where gp.placProvinceName='"+placProvinceName+"'and gp.placType='"+1+"'";
					plist=entityManager.createQuery(hql).getResultList();
					if(plist==null||plist.size()<=0){
						GPlace  newPlace=new GPlace();
						newPlace.setPlacProvinceName(placProvinceName);
						newPlace.setPlacCode("placeCode");
						newPlace.setPlacName(placProvinceName);
						newPlace.setPlacNameEn("placeNameEn");
						newPlace.setCompCode(sessionContext.getCompCode());
						newPlace.setVersion(0);
						newPlace.setRemoved(Byte.valueOf("0"));
						newPlace.setActive(Byte.valueOf("1"));
						newPlace.setPlacType(Byte.valueOf("1"));
						gplaceDao.add(newPlace);
					}
				}
			}
		}
		catch(Exception e){
			System.out.println("自动保存省市信息失败");
		}
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GSite> query() {
		return dao.findByProperties();
	}
}
