/**
 * 
 */
package com.hitisoft.fw.web;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author guo
 * 
 */
public class HtRequest {
	@SuppressWarnings({ "rawtypes" })
	private List data = new ArrayList();
	private Collection<MultipartFile> fileItems;

	@SuppressWarnings({ "rawtypes" })
	public List getData() {
		return data;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void setData(List serviceData) {
		this.data.addAll(serviceData);
	}

	public void setFileItems(Collection<MultipartFile> fileItems) {
		this.fileItems = fileItems;
	}

	public Collection<MultipartFile> getFileItems() {
		return fileItems;
	}
}
