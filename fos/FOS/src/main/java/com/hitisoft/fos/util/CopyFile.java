package com.hitisoft.fos.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Vector;

public class CopyFile {
    String  filePath="",aimFilePath="";
	Vector<String> vec=null;
	public CopyFile(){
	    filePath="";
	    aimFilePath="";
	    vec=new Vector<String>();
    }
	
    public CopyFile(String filePath,String aimFilePath){
	    this.filePath=filePath;
	    this.aimFilePath=aimFilePath;
	    vec=new Vector<String>();
    }
    
    private void getFileName(){
	    File f=new File(filePath);
	    String str[]=f.list();
	    for(int i=0;i<str.length;i++){
	    	vec.addElement(str[i]);
	    }
    }
    
    private boolean bakFile(String fileName){
	    try{
	    	File inFile=new File(filePath+fileName);
	    	 InputStreamReader isr = new InputStreamReader(
		    			new FileInputStream(inFile),"UTF-8");
		    BufferedReader buff = new BufferedReader(isr);
		    String detail="";
		    String temp=buff.readLine();
		    while(temp!=null){
			    detail+=temp+"\n";
			    temp=buff.readLine();
		    }
		    isr.close();
		    System.out.println(detail);
		    File file=new File(aimFilePath+fileName);
		    PrintWriter out=new PrintWriter(new FileWriter(file));
		    out.print(detail);
		    out.close();
	    }catch(FileNotFoundException e){
	    	System.out.println( "文件没有找到 ");
	    } catch (IOException e){
	    	System.out.println( "copyFile 出错 ");
	    }
	    return true;
    }
    
	public static void main(String[] args){
    	CopyFile confile= new CopyFile("C:\\Users\\JOHN\\Desktop\\date\\JAH\\template\\",
    			"E:\\backFile\\template\\");
	    confile.getFileName();
	    Vector<String> ve=new Vector<String>();
	    ve =confile.vec;
	    if(ve!=null)
	    for(int i=0;i<ve.size();i++){
	    	confile.bakFile((String) ve.elementAt(i));
	    }
    }
}
