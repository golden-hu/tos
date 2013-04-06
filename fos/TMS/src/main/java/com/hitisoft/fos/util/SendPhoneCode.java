package com.hitisoft.fos.util;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

import com.hitisoft.fw.util.CryptoUtil;
 
public class SendPhoneCode {
	public SendPhoneCode(){}
	@SuppressWarnings("deprecation")
	public String sendPost(String sendUrl,String sendUsername,String sendPssword,
			String mobile,String sendKey,String sendContent,String param) {
		String inline="";
		 try {
		      URL httpurl = new URL(sendUrl);
		      URLConnection connection = (URLConnection) httpurl.openConnection();
		      connection.setDoOutput(true);
		      OutputStreamWriter out = new OutputStreamWriter(connection.
		          getOutputStream(), "GB2312");
		      out.write(param);
		      out.flush();
		      out.close();
		      DataInputStream in = new DataInputStream(connection.getInputStream());
		      inline = in.readLine();
		      in.close();
		    }
		    catch (IOException ex2) {
		      System.out.println(" exe IOException:" + ex2.toString());
		    }
		return inline;
	}
	
	public String sendCodePhone(String sendUrl,String sendUsername,String sendPssword,
			String mobile,String sendKey,String sendContent) throws Exception{
		//int roandCode=Math.round(new Random().nextFloat()*(999999 - 100000))+100000; //获取验证编码
		String content = sendContent;		    //发送的信息
		String keyword = CryptoUtil.MD5Encode(mobile.substring(0,8)+mobile.substring(mobile.length()-10,mobile.length())+sendKey).toUpperCase();			//加密字符串
		String param = "Username="+ sendUsername +"&Password="+ sendPssword +"&Mobile="+ mobile +"&Content="+content+"&Keyword="+keyword;
		//System.out.println(sendUrl+param);
		String sendCode=this.sendPost(sendUrl,sendUsername,
				sendPssword,mobile,sendKey,sendContent,param);
		return sendCode;
	}
}
