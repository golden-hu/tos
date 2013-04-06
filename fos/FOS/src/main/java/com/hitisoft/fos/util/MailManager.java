package com.hitisoft.fos.util;

import java.io.File;
import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.PMessageDao;
import com.hitisoft.fos.sys.entity.PMessage;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.FileUtil;
import com.hitisoft.fw.util.StringUtil;

@Component
public class MailManager {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private JavaMailSender sender;
	@Autowired
	private PMessageDao dao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private ConfigUtil configUtil;

	public void setSender(JavaMailSender sender) {
		this.sender = sender;
	}

	@Transactional
	public void sendEmail(PMessage message) {
		sessionContext.setCompCode(message.getCompCode());
		send(message);
		message.setMessSendFlag(ConstUtil.TrueByte);
		dao.updateSendFlag(message);
		logger.info("message id = {}, send flag update success!", message.getId());
	}

	public void send(PMessage pmsg) {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(message, true, ConstUtil.ENCODING_UTF8);
			String[] to = splitEmailAddress(pmsg.getMessTo());
			String[] cc = splitEmailAddress(pmsg.getMessCc());
			String[] bcc = splitEmailAddress(pmsg.getMessBcc());
			helper.setTo(to);
			if (cc != null) {
				helper.setCc(cc);
			}
			if (bcc != null) {
				helper.setBcc(bcc);
			}
			String subject = pmsg.getMessSubject();
			if (StringUtil.isBlank(subject)) {
				subject = "no subject";
			}
			helper.setFrom("fos");
			helper.setReplyTo(pmsg.getMessFrom());
			helper.setSubject(subject);
			helper.setText(pmsg.getMessBody(), pmsg.getMessType() == Constants.MESS_TYPE_FAX ? false : true);
			if (StringUtil.isNotBlank(pmsg.getMessAttachment())) {
				String fileName = pmsg.getMessAttachment();
				FileUtil.createDirs(configUtil.getRealTempDir());
				fileName = configUtil.getRealTempDir() + ConstUtil.DIR_SEP + fileName;
				FileSystemResource file = new FileSystemResource(new File(fileName));
				helper.addAttachment(MimeUtility.encodeWord(file.getFilename()), file);
			}
		} catch (MessagingException e) {
			logger.error("mail id = {}, send failed", pmsg.getId(), e);
			throw new BusinessException(ExceptionEnum.FW_MAIL_SEND_FAIL, e);
		} catch (UnsupportedEncodingException e) {
			logger.error("mail id = {}, send failed", pmsg.getId(), e);
			throw new BusinessException(ExceptionEnum.FW_ENCODING_NOT_SUPPORT, e);
		}
		sender.send(message);
	}

	private String[] splitEmailAddress(String s) {
		if (StringUtil.isBlank(s)) {
			return null;
		}
		s = s.replaceAll(",", ";");
		s = s.replaceAll("，", ";");
		s = s.replaceAll("；", ";");
		return s.split(";");
	}

}
