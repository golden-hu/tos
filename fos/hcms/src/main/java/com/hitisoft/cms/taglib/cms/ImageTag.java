package com.hitisoft.cms.taglib.cms;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.hitisoft.cms.dao.HcmsResourceDao;
import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.ConstUtil;

public class ImageTag extends BodyTagSupport {
	private static final long serialVersionUID = -519575179748704418L;
	protected String fileId = null;
	protected String width = null;
	protected String height = null;
	protected String border = null;
	protected String alt = null;
	protected String align = null;
	protected String hspace = null;
	protected String vspace = null;

	public int doStartTag() throws JspException {
		return (EVAL_BODY_AGAIN);
	}

	public int doEndTag() throws JspException {
		JspWriter out = pageContext.getOut();
		String src = "";
		try {
			long iFileId = 0;
			try {
				iFileId = Long.valueOf(fileId);
			} catch (NumberFormatException e) {
				out.print("<img src=\"\" width=\"" + width + "\" height=\""
						+ height + "\" alt=\"" + alt + "\" align=\"" + align
						+ "\" border=\"" + border + "\" hspace=\"" + hspace
						+ "\" vspace=\"" + vspace + "\">");
				return (EVAL_PAGE);
			}
			HcmsResourceDao dao = SpringContextHolder.getBean("HcmsResourceDAO");
			HcmsResource entity = dao.findById(iFileId);
			src = entity.getPath() + ConstUtil.DIR_SEP + iFileId
					+ ConstUtil.STRING_DOT + entity.getExt();
			out
					.print("<img src=\"" + src + "\"width=\"" + width
							+ "\" height=\"" + height + "\" alt=\"" + alt
							+ "\" align=\"" + align + "\" border=\"" + border
							+ "\" hspace=\"" + hspace + "\" vspace=\"" + vspace
							+ "\">");
		}

		catch (IOException e) {
			throw new JspException(e);
		}
		return (EVAL_PAGE);
	}

	public void release() {
		this.width = null;
		this.height = null;
		this.fileId = null;
		this.alt = null;
		this.border = null;
		this.hspace = null;
		this.vspace = null;
		this.align = null;
	}

	public String getAlign() {
		return align;
	}

	public String getAlt() {
		return alt;
	}

	public String getBorder() {
		return border;
	}

	public String getHspace() {
		return hspace;
	}

	public String getFileId() {
		return fileId;
	}

	public String getVspace() {
		return vspace;
	}

	public void setAlign(String string) {
		align = string;
	}

	public void setAlt(String string) {
		alt = string;
	}

	public void setBorder(String string) {
		border = string;
	}

	public void setHspace(String string) {
		hspace = string;
	}

	public void setFileId(String string) {
		fileId = string;
	}

	public void setVspace(String string) {
		vspace = string;
	}

	public String getHeight() {
		return height;
	}

	public String getWidth() {
		return width;
	}

	public void setHeight(String string) {
		height = string;
	}

	public void setWidth(String string) {
		width = string;
	}

}
