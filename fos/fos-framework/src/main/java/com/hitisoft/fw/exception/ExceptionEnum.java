package com.hitisoft.fw.exception;


public enum ExceptionEnum implements Messageable{
	FW_SUCCESS("fw.success"),
	FW_UNKNOWN_ERROR("fw.unknown"),
	FW_CLASS_NOT_FOUND("fw.class_not_found"),
	FW_SERVICE_NAME_NULL("fw.service_name_null"),
	FW_MESSAGE_TYPE_ERROR("fw.message_type_error"),
	FW_SERVICE_NOT_FOUND("fw.service_not_found"),
	FW_SERVICE_NEED_LOGIN("fw.service_need_login"),
	FW_ROWACTION_NULL("fw.rowaction_null"),
	FW_MD5_ALGORITHM_NOT_FOUND("fw.md5_algorithm_not_found"),
	FW_ENCODING_NOT_SUPPORT("fw.encoding_not_support"),
	FW_UPLOAD_FILE_ERROR("fw.upload_file_error"),
	FW_MKDIR_ERROR("fw.mkdir_error"),
	FW_PARSE_INPUT_ERROR("fw.parse_input_error"),
	FW_INIT_FAIL("fw.init_fail"),
	FW_LOGIN_FAIL("fw.login_fail"),
	FW_PASSWORD_EXPIRE("fw.password_expire"),
	FW_LOGIN_REPEAT("fw.login_repeat"),
	FW_LOGIN_USER_NOT_EXIST("fw.login_user_not_exist"),
	FW_LOGIN_USER_DEACTIVED("fw.login_user_deactived"),
	FW_SESSION_EXPIRED("fw.session_expired"),
	FW_LICENSE_LOAD("fw.license_load"),
	FW_LICENSE_IP("fw.license_ip"),
	FW_LICENSE_MAC("fw.license_mac"),
	FW_LICENSE_KEY("fw.license_key"),
	FW_LICENSE_USERS_EXCEED("fw.license_users"),
	FW_LICENSE_EXPIRED("fw.license_expired"),
	FW_PASSWORD_NOT_CORRECT("fw.password_not_correct"),
	FW_PASSWORD_NEW_NOT_MATCH("fw.password_new_not_match"),
	FW_MAIL_SEND_FAIL("fw.mail_send_fail"),
	
	DB_ENTITY_EXIST("db.entity_exists"),
	DB_OPTIMISTIC_LOCK("db.optimistic_lock"),
	DB_DATA_TRUNCATION("db.data_truncation"),
	DB_CONSTRAINT_VIOLATION("db.constraint_violation"),
	DB_ENTITY_NOT_FOUND("db.entity_not_found"),
	DB_UNKNOWN_ERROR("db.unknown_error"),
		
	JOIN_FIELD_VIOLATION("join.field_violation"),
	JOIN_CODE_EXIST("join.code_exist"),
	JOIN_USER_EXIST("join.user_exist"),
	
	INIT_FILE_NOT_EXIST("init.file.not_exist"),
	INIT_DRIVER_NOT_EXIST("init.driver.not_exist"),
	INIT_CONN_NOT_EXIST("init.connect.not_exist"),
	USER_NO_ACTIVE("user_no_active"),
	EQUIPMENT_VEHICLENO_BOUND("equipment_vehicleNo_bound"),
	VEHICLE_NO_EXIST("vehicle_no_exist"),
	REG_MAIL_ALREADY_EXISTS("reg_mail_already_exists")
	;
	private String key;

	ExceptionEnum(String s) {
		this.key = s;
	}

	public String get() {
		return key;
	}

}
