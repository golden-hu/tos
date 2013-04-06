package com.hitisoft.fos.flight;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import com.hitisoft.fos.flight.dao.FFlightDao;
import com.hitisoft.fos.flight.entity.FFlight;
import com.hitisoft.fw.orm.util.RowAction;
//全日空
public class ANAHtml  {
	 public String parserHtml(String D_DATE,String D_A_FLAG,String D_LETTER,String A_LETTER){
	        String temp="",str="";
	        try{
	        	String d="http://fli.ana.co.jp/fs/inten?D_DATE="+D_DATE
	        		+"&D_A_FLAG="+D_A_FLAG+"&D_LETTER="+D_LETTER+"&A_LETTER="+A_LETTER;
	        	//String d="http://fli.ana.co.jp/fs/inten?D_DATE=20111028&D_A_FLAG=A&D_LETTER=PVG&A_LETTER=NRT";
	            URL url = new URL(d);
	            HttpURLConnection conn=(HttpURLConnection)url.openConnection();
	            InputStreamReader isr=new InputStreamReader(conn.getInputStream());   
	            BufferedReader br=new BufferedReader(isr);
	            while((temp=br.readLine())!=null){
	            	str+=temp+"\r\n";
	            }
	            br.close();
	            isr.close();
	        }catch(Exception e){
	            e.printStackTrace();
	        }
			return str;
	    }
	    
		public List<FFlight> parserList(String D_DATE,String D_A_FLAG,String D_LETTER,
				String A_LETTER,String COM_CODE,String FLIGHT_CODE,FFlightDao dao){
	    	String str=this.parserHtml(D_DATE,D_A_FLAG,D_LETTER,A_LETTER);
	    	String a[]=str.split("\r\n");
	    	List<FFlight> list=new ArrayList<FFlight>();
	    	for(int i=0;i<a.length;i++){
	    		if(a[i].contains("nowrap>")){
	    			System.out.println("----航班次"+a[i].substring(a[i].indexOf("nowrap>")+7,a[i].indexOf("</")));
	    			System.out.println("----预定起航时"+a[i+3].substring(a[i+3].indexOf("BR>")+3,a[i+3].indexOf("</")));
	    			System.out.println("----实际起航时"+a[i+5].substring(a[i+5].indexOf("BR>")+3,a[i+5].indexOf("</")));
	    			System.out.println("----预定到达时"+a[i+39].substring(a[i+39].indexOf("BR>")+3,a[i+39].indexOf("</")));
	    			System.out.println("----实际到达时"+a[i+41].substring(a[i+41].indexOf("BR>")+3,a[i+41].indexOf("</")));
	    			if(a[i+11].contains("b.gif")){System.out.println("----未起飞");}
	    			if(a[i+11].contains("a.gif")){System.out.println("----飞行中");}
	    			if(a[i+11].contains("c.gif")){System.out.println("----已到达");}
	    			System.out.println("========================================");
	    			String flightNo=a[i].substring(a[i].indexOf("nowrap>")+7,a[i].indexOf("</"));
	    			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date sdfDate = new Date();
					String fightDate = sdf.format(sdfDate);
					/*final Map<String, String> propertyMap = new HashMap<String, String>();
	    			propertyMap.put(SqlOp.equal.toString(), flightNo);
	    			propertyMap.put(SqlOp.equal.toString(), fightDate);
	    			List<FFlight> l=dao.findByProperties(propertyMap);
	    			FFlight fp=null;
	    			if(l!=null&&l.size()>0){
	    				fp=(FFlight) l.get(0);
	    				fp.setRowAction(RowAction.M);
	    			}else{
	    				fp=new FFlight();
	    				fp.setRowAction(RowAction.N);
	    			}*/
					FFlight fp=new FFlight();
					fp.setRowAction(RowAction.N);
	    			fp.setFlightNo(flightNo);
	    			fp.setCompCode(COM_CODE);
	    			fp.setDeScheduleTime(a[i+3].substring(a[i+3].indexOf("BR>")+3,a[i+3].indexOf("</")));
	    			fp.setDeNewTime(a[i+5].substring(a[i+5].indexOf("BR>")+3,a[i+5].indexOf("</")));
	    			fp.setArScheduleTime(a[i+39].substring(a[i+39].indexOf("BR>")+3,a[i+39].indexOf("</")));
	    			fp.setArNewTime(a[i+41].substring(a[i+41].indexOf("BR>")+3,a[i+41].indexOf("</")));
	    			if(a[i+11].contains("b.gif")){fp.setStatus(0);}//未起飞
	    			if(a[i+11].contains("a.gif")){fp.setStatus(1);}//飞行中
	    			if(a[i+11].contains("c.gif")){fp.setStatus(2);}//已到达
	    			try {
						fp.setFightDate(sdf.parse(fightDate));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					fp.setDePort(D_LETTER);
					fp.setArPort(A_LETTER);
					fp.setFlightCode(FLIGHT_CODE);
					fp.setFlightLine(D_LETTER+"-"+A_LETTER);
	    			list.add(fp);
	    		}
	    	}
	    	return list;
	    }
	    
	    public List<FFlight> save(String D_DATE,String D_A_FLAG,String D_LETTER,
	    		String A_LETTER,String COM_CODE,String FLIGHT_CODE,FFlightDao dao){
	    	List<FFlight> list=parserList(D_DATE,D_A_FLAG,D_LETTER,A_LETTER,COM_CODE,FLIGHT_CODE,dao);
	    	return list;
	    }
	    
	    /*public static void main (String[] args){
	    	System.out.println(new ANAHtml().save().size());
	    	//http://localhost:8080/FOS4/front?_A=FVOYAGE_SV
	    }*/
}
