package com.hitisoft.fos.flight.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.flight.ANAHtml;
import com.hitisoft.fos.flight.dao.FFlightDao;
import com.hitisoft.fos.flight.entity.FFlight;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;

@Service
public class FFlightService {
	@Autowired
	private FFlightDao dao;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private SessionContext sessionContext;
	@Transactional
	public List<FFlight> save(List<FFlight> itemList) {
		return dao.saveByRowAction(itemList);
	}

	@Transactional(readOnly = true)
	public List<FFlight> query() {
		return dao.findByProperties();
	}
	
	@Transactional
	public List<FFlight> getVoyage() {
		String D_LETTER=requestContext.get("dePort");
		String A_LETTER=requestContext.get("arPort");
		String COM_CODE=sessionContext.getCompCode();
		Date sdfDate=new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String D_DATE=sdf.format(sdfDate);
		//String D_DATE="20111116";
    	String D_A_FLAG="A";//A:Arrival D:Departure
    	//String D_LETTER="PVG";
    	//String A_LETTER="NRT";
    	//String COM_CODE="021";
    	String FLIGHT_CODE="MU";
		ANAHtml ht=new ANAHtml();
		List<FFlight> list = ht.save(D_DATE,D_A_FLAG,D_LETTER,A_LETTER,COM_CODE,FLIGHT_CODE,dao);
		for(int i=0;i<list.size();i++){
			System.out.println(list.get(i).getFlightNo()+":"+list.get(i).getStatus());
		}
		return dao.saveByRowAction(list);
	}
}
