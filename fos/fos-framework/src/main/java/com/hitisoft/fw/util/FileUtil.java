package com.hitisoft.fw.util;

import java.io.File;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;

public class FileUtil {

	public static void createDirs(String dir) {
		if (StringUtil.isBlank(dir))
			return;
		File fdir = new File(dir);
		if (!fdir.exists() && !fdir.mkdirs())
			throw new BusinessException(ExceptionEnum.FW_MKDIR_ERROR, dir);
	}

	public static String getDir(String fileName) {
		if (StringUtil.contains(fileName, "/")) {
			fileName = fileName.substring(0, fileName.lastIndexOf("/") + 1);
		} else {
			fileName = fileName.substring(0, fileName.lastIndexOf("\\") + 1);
		}
		return fileName;
	}

	public static String getFileNameOnly(String fileName) {
		if (StringUtil.contains(fileName, "/")) {
			fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
		} else {
			fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
		}
		return fileName;
	}

	public static String getFileExt(String fileName) {
		if (StringUtil.isBlank(fileName))
			return "";
		return fileName.substring(fileName.lastIndexOf(".") + 1);
	}

	public static String getThumbnailName(String fileName) {
		if (StringUtil.isBlank(fileName))
			return "";
		int i = fileName.lastIndexOf(".");
		return fileName.substring(0, i) + "_t." + fileName.substring(i + 1);
	}

	public static void main(String[] args) {
		System.out.println(getThumbnailName("19.png"));
		System.out.println(getDir("/data/111/1.png"));
		System.out.println(getFileNameOnly("/data/111/1.png"));
	}
}
