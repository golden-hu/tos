package com.hitisoft.fos.util;


import com.hitisoft.fos.wms.entity.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Constants {
	public static final String SYS_USEP_FEE_ALL = "所有费用";
	public static final String PARAM_EAGER = "aggressive";
	public static final String CURRENCY_BASE_DEFAULT = "CNY";
	public static final String ACTIVE = "active";
	public static final String COMP_CODE = "compCode";
	// 委托业务类型
	public static final String CONS_BIZ_CLASS_EXP = "E";
	public static final String CONS_BIZ_CLASS_IMP = "I";
	
	public static final String CONS_BIZ_TYPE_MARINE = "M";
	public static final String CONS_BIZ_TYPE_AIR = "A";
	public static final String CONS_BIZ_TYPE_BAOGUAN = "G";
	public static final String CONS_BIZ_TYPE_BAOJIAN = "I";
	public static final String CONS_BIZ_TYPE_TMS = "T";
	public static final String CONS_BIZ_TYPE_WMS = "W";
	public static final String CONS_BIZ_TYPE_EXPRESS = "E";
	
	public static final String CONS_SHIP_TYPE_FCL = "FCL";
	public static final String CONS_SHIP_TYPE_LCL = "LCL";
	public static final String CONS_SHIP_TYPE_BULK = "BULK";
	
	public static final String CONS_NO_LCL = "P";
	public static final String CONS_NO_WAIGUA = "W";
	// Action
	public static final String ACT_LOGIN = "LOGIN";
	public static final String ACT_LOGOUT = "LOGOUT";
	public static final String ACT_DAEMON = "DAEMON";
	public static final String ACT_REPORT_RUN = "REPT_";
	public static final String ACT_CACHE_CLEAR = "CACHE_C";
	// 打印模板
	public static final String TEMP_SUFFIX_EXCEL = "xls";
	public static final String TEMP_SUFFIX_WORD = "doc";
	public static final String TEMP_PARAM_ID = "tempId";
	public static final String TEMP_PARAM_CODE = "tetyCode";
	public static final String TEMP_PARAM_TYPE = "type";
	public static final String TEMP_PARAM_TYPE_CODE = "C";
	// 公司配置
	public static final String COMCF_KEY = "cocoCode";
	public static final String COMCF_VALUE = "cocoValue";
	public static final String COMCF_FDOC_BL = "FDOC_BL";
	public static final String COMCF_FDOC_CC = "FDOC_CC";
	public static final String COMCF_CONS_LOCK_DAYS = "CONS_LOCK_DAYS";
	public static final String COMCF_FDOC_AUTOUP_RLS = "FDOC_AUTO_UPDATE_RELEASABLE";
	public static final String COMCF_PASSWORD_EXPIRY_DAYS = "PASSWORD_EXPIRY_DAYS";
	public static final String COMCF_CONS_AR_OVERDUE_DAYS = "CONS_AR_OVERDUE_DAYS";

	// 费用的开票状态:未开票;部分开票;全部开票
	public static final Byte EXPENSE_INVOICE_STATUS_NONE = new Byte("0");
	public static final Byte EXPENSE_INVOICE_STATUS_PART = new Byte("1");
	public static final Byte EXPENSE_INVOICE_STATUS_FULL = new Byte("2");

	// 发票状态:0:未审核 ; 1:已审核; 2:已作废
	public static final Byte INVOICE_STATUS_NONE = new Byte("0");
	public static final Byte INVOICE_STATUS_CHECKED = new Byte("1");
	public static final Byte INVOICE_STATUS_CANCELLED = new Byte("2");

	// 托收单状态:0:未提交;1:已提交;2:已托收;3:已回单登记;4:已作废
	public static final Byte ENTRUST_STATUS_NONE = new Byte("0");
	public static final Byte ENTRUST_STATUS_SUBMIT = new Byte("1");
	public static final Byte ENTRUST_STATUS_SEND = new Byte("2");
	public static final Byte ENTRUST_STATUS_BACK = new Byte("3");
	public static final Byte ENTRUST_STATUS_CANCELLED = new Byte("4");

	// 付款申请状态:0:未提交;1:已提交;2:已审批;3:已付款;4:已作废
	public static final Byte PR_STATUS_NONE = new Byte("0");
	public static final Byte PR_STATUS_SUBMIT = new Byte("1");
	public static final Byte PR_STATUS_CHECKED = new Byte("2");
	public static final Byte PR_STATUS_PAYED = new Byte("3");
	public static final Byte PR_STATUS_CANCELLED = new Byte("4");

	// 账单状态:0:未对帐;1:已对帐;2:已作废
	public static final Byte BILL_STATUS_NONE = new Byte("0");
	public static final Byte BILL_STATUS_CHECKED = new Byte("1");
	public static final Byte BILL_STATUS_CANCELLED = new Byte("2");

	public static final String FCONTRACT_UNIT_TON = "TON";
	public static final String FCONTRACT_UNIT_CBM = "CBM";

	public static final String PR_TYPE_PAY = "P";
	public static final String PR_TYPE_RECEIVE = "R";
	public static final String CELL_TYPE_NUMBER = "isNumber";
	public static final String CELL_TYPE_STRING = "isString";
	public static final String CELL_TYPE_BOOL = "isBool";
	public static final String CELL_TYPE_BLANK = "isBlank";
	public static final String CELL_TYPE_ERROR = "isError";
	public static final String CELL_TYPE_DATE = "isDate";

	public static final String CMS_TYPE_ARTICLE = "A";
	public static final String CMS_TYPE_CATEGORY = "C";
	public static final String CMS_TYPE_DIRECTORY = "D";
	public static final String CMS_TYPE_FILE = "F";

	public static final String TABLE_FIELD_TYPE_ID = "id";
	public static final String TABLE_FIELD_TYPE_NO = "no";
	public static final String TABLE_FIELD_TYPE_OP = "op";
	public static final String TABLE_FIELD_TYPE_SALES = "sales";
	public static final String TABLE_FIELD_TYPE_DISPATCHER = "dispatcher";

	public static final byte MESS_TYPE_EMAIL = 1;
	public static final byte MESS_TYPE_IM = 2;
	public static final byte MESS_TYPE_FAX = 3;

	public static final byte INRA_TYPE_MONTH_3 = 1;
	public static final byte INRA_TYPE_MONTH_6 = 2;
	public static final byte INRA_TYPE_MONTH_12 = 3;

	public static final byte HIST_TYPE_AR_INVOICE = 0;
	public static final byte HIST_TYPE_AP_INVOICE = 1;
	public static final byte HIST_TYPE_AR_RECEIPT = 2;
	public static final byte HIST_TYPE_AP_PAYMENT = 3;

	public static final byte MESU_TYPE_USER = 1;
	public static final byte MESU_TYPE_CUST = 2;
	public static final byte MESU_TYPE_ROLE = 3;

	public static final int ROLE_OP = 1;
	public static final int ROLE_SALES = 2;
	public static final int ROLE_DISPATCHER = 3;

	public static final String QUARTZ_FDOC_ALERT_WRITEOFF = "QUARTZ_FDOC_ALERT_WRITEOFF";
	public static final String QUARTZ_CONS_ALERT_SALES = "QUARTZ_CONS_ALERT_SALES_OVERDUE";
	public static final String USEP_CHCL_ALL = "0";

	public static final String TASK_DATE_TYPE_CONS_DATE = "CONS_DATE";
	public static final String TASK_DATE_TYPE_CONS_ETA = "CONS_ETA";
	public static final String TASK_DATE_TYPE_CONS_SAIL_DATE = "CONS_SAIL_DATE";
	public static final String TASK_DATE_TYPE_BASE_TASK_D = "BASE_TASK_D";
	
	public static String getUUID(){
		Random r = new Random();
		String chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String[] uuids; 
		String uuid = "";
		for (int i=0;i<chars.length();i++){
			uuids=chars.split("");
			uuid=uuids[r.nextInt(32)]+String.format("%08d", r.nextInt(9999));
		}
		return uuid;
	}
	
	/**
     * 中文转unicode
     * @param str
     * @return 反回unicode编码
     */
    public static String  chinaToUnicode(String str)
    {
        String result ="";
        for (int i = 0; i < str.length(); i++)
        {
            int chr1 = (char) str.charAt(i);
            result  += "//u" + Integer.toHexString(chr1);           
        }
        return result;
    }
    
    
	//根据cargo类中描述的换算关系，取得传入的源单位转到目标单位的系数
	//如果源单位或目标单位在cargo中没有描述过，则系数为1
	//判断的方法是先找到传入的源单位和目标单位哪一个是cargo类中描述的默认单位，然后判断另一个
	//是不是最小单位，如果都能找到，则根据默认单位和最小单位之间的换算关系算出系数，
	//如果默认单位或最小单位有其中一个未能匹配上，则系数返回1
	public static double getRateBySourceToTarget(WCargo wc,String sourceUnit,String targetUnit){
		
		
		//如果源单位是默认单位并且目标单位是最小单位
		if (wc.getpUnitName().equals(sourceUnit) && wc.getNumUnitName().equals(targetUnit))
		{
			return wc.getNumUnitId();
		}
		//如果源单位是最小单位并且目标单位是默认单位
		else if(wc.getpUnitName().equals(targetUnit) && wc.getNumUnitName().equals(sourceUnit))
		{
			return 1.0/wc.getNumUnitId();
			
		}
		else
		{
			return 1.0;
		}

	}
	
	
	
	//获得指定单位转换到的净毛体面的系数
	//如果指定单位是默认单位，就直接取原来设定好的值，如果原来没有值，则为0
	//如果指定单位是最小单位，先换算成默认单位的系数，再乘以原来设定好的净毛体面的值。
	//如果都不是，则为0
	public static List<Double> getRateByNGVM(WCargo wc,String sourceUnit)
	{
		
		List<Double> rate=new ArrayList<Double>();
		
		//如果指定单位是默认单位
		if (wc.getpUnitName().equals(sourceUnit))
		{
			
			if (wc.getNetWeight()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(wc.getNetWeight());
			}
			
			if (wc.getGrossWeight()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(wc.getGrossWeight());
			}
			
			if (wc.getVolume()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(wc.getVolume());
			}
			
			if (wc.getMeasure()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(wc.getMeasure());
			}
			
			return rate;
		}
		//如果指定单位是最小单位
		else if (wc.getNumUnitName().equals(sourceUnit))
		{
			double dblRate=getRateBySourceToTarget(wc,sourceUnit,wc.getpUnitName());
			
			if (wc.getNetWeight()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(dblRate*wc.getNetWeight());
			}
			
			if (wc.getGrossWeight()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(dblRate*wc.getGrossWeight());
			}
			
			if (wc.getVolume()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(dblRate*wc.getVolume());
			}
			
			if (wc.getMeasure()==null)
			{
				rate.add(0.0);
			}
			else
			{
				rate.add(dblRate*wc.getMeasure());
			}
			
			return rate;
			
		}
		else
		{
			rate.add(0.0);
			rate.add(0.0);
			rate.add(0.0);
			rate.add(0.0);
			return rate;
		}
		
	}
	
}
