package com.hitisoft.fos.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.mysql.jdbc.PreparedStatement;

public class InitData {
	
	/*read initialize sql file*/
    public List <String> readSqlFiles(String compCode,String sqlPath) {
	    List <String> sqlList = new ArrayList <String>();
		    File file = new File(sqlPath);
		    String encoding="UTF-8";
		    if (file.exists()) {
		    StringBuffer temp = new StringBuffer();
		    try {
		    	InputStreamReader myFile = new InputStreamReader(
		    			new FileInputStream(file), encoding);
		    BufferedReader in = new BufferedReader(myFile);
		    String str;
		    while ((str = in.readLine()) != null) {
		    	if(str.contains("{CC}")){str=str.replace("{CC}",compCode);}
		    	temp.append(new String(str));
		    }
		    in.close();
		    } catch (IOException e) {
		    	e.getStackTrace();
		    }
		    String sqls[] = temp.toString().split(";");
		    for (String sql : sqls) {
		    	sqlList.add(sql);
		    }
	    }else{
	    //	throw new BusinessException(ExceptionEnum.INIT_FILE_NOT_EXIST);
	    }
	    return sqlList;
    }
    /*initialize sql file into databases*/
    public void intoDate(String compCode,String sqlPath,
    		String mysqlDriver,String mysqlUrl,String mysqlUserName,String mysqlPassword){
    	List<String> sqlList=readSqlFiles(compCode,sqlPath);
    	java.sql.Connection conn = null;
    	try {
				Class.forName(mysqlDriver);
			}catch (ClassNotFoundException e) {
				e.printStackTrace();
			//	throw new BusinessException(ExceptionEnum.INIT_DRIVER_NOT_EXIST);
			}
			try {
	    		String url = mysqlUrl; 
	    		String username = mysqlUserName;
	    		String password = mysqlPassword;
				conn = java.sql.DriverManager.getConnection(url,username,password);
			} catch (SQLException e) {
				//throw new BusinessException(ExceptionEnum.INIT_CONN_NOT_EXIST);
			}
			try {
				 for (String sql : sqlList) {
		       	    	PreparedStatement pstmt = (PreparedStatement) conn.prepareStatement(
		       	    	sql,
		       		    ResultSet.TYPE_SCROLL_INSENSITIVE,
		       		    ResultSet.CONCUR_READ_ONLY);
		       		    pstmt.execute();
		       	    }
				 conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
    }
   /* public static void main(String[] args){
    	  String compCode="SHHT";
    	  List<String> sqlList=new InitData().readSqlFiles(compCode);
    	  for(int i=0;i<sqlList.size();i++){
    		  System.out.println(sqlList.get(i));
    	  }
    	  new InitData().intoDate(compCode);
      }*/
}
