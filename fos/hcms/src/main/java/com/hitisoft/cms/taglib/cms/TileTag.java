package com.hitisoft.cms.taglib.cms;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.hitisoft.fw.util.ConstUtil;

public class TileTag extends BodyTagSupport {
	private static final long serialVersionUID = 3510449541797020439L;
	protected String tileId = null;

	public String getTileId() {
		return tileId;
	}

	public void setTileId(String string) {
		tileId = string;
	}

	public int doStartTag() throws JspException {
		return (EVAL_BODY_INCLUDE);
	}

	public int doEndTag() throws JspException {
		String uri = "";

		try {
			uri = tileId + ConstUtil.STRING_DOT + "jsp";
			pageContext.include(uri);
		} catch (IOException ex) {
			processException(ex, "Can't insert page '" + uri + "' : "
					+ ex.getMessage());
		} catch (IllegalArgumentException ex) {
			if (!(uri == null)) {
				processException(ex, "Tag 'insert' can't insert page '" + uri
						+ "'. Check if it exists.\n" + ex.getMessage());
			}
		} catch (ServletException ex) {
			Throwable realEx = ex;
			if (ex.getRootCause() != null) {
				realEx = ex.getRootCause();
			}
			processException(realEx, "[ServletException in:" + uri + "] "
					+ realEx.getMessage() + "'");
		} catch (Exception ex) {
			processException(ex, "[Exception in:" + uri + "] "
					+ ex.getMessage());
		}
		return EVAL_PAGE;
	}

	protected void processException(Throwable ex, String msg)
			throws JspException {
		try {
			if (msg == null) {
				msg = ex.getMessage();
			}
			pageContext.getOut().println(msg);
		} catch (IOException ioex) {
			throw new JspException(msg);
		}
	}

}
