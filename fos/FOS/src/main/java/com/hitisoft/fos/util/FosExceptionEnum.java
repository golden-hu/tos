package com.hitisoft.fos.util;

import com.hitisoft.fw.exception.Messageable;

public enum FosExceptionEnum  implements Messageable {
	FFSE_INVOICE_TAX_NO_DUPLICATED("ffse.invoice_tax_no_duplicated"),
	FFSE_BL_NO_DUPLICATED("ffse.bl_no_duplicated"),
	FFSE_INVOICE_IS_WRITEOFF("ffse.invoice_is_writeoff"),
	
	SYS_FILE_NOT_EXIST("sys.file_not_exist"),
	SYS_TEMPLATE_FILE_NOT_EXIST("sys.template_file_not_exist"),
	SYS_TEMPLATE_NO_FILE_UPLOAD("sys.template_no_file_upload"),
	SYS_TEMPLATE_MISSED_PARAM_ID("sys.template_missed_param_id"),
	SYS_TEMPLATE_NOT_FOUND_BY_ID("sys.template_not_found_by_id"),
	SYS_TEMPLATE_SAVE_FAILED("sys.template_save_failed"),
	SYS_NO_ENTRY_EXPENSE("sys.no_entry_expense"),
	
	FFOP_FCON_CANT_DELETE("ffop.fcon.cant_delete"),
	
	EXPR_NO_EXIST("expr.expr_no_exist"),
	ORIGIN_NO_EXIST("expr.origin_no_exist"),
	
	WMS_IN_QUANTITY_GREAT_THAN_RECEIVABLE("wms.in_quantity_great_than_receivable"),
	WMS_PLACED_QUANTITY_OVER("wms.placed_quantity_over"),
	WMS_PICKED_QUANTITY_OVER("wms.picked_quantity_over"),
	WMS_PICKED_QUANTITY_OVER_PLANED("wms.picked_quantity_over_planed"),
	WMS_PICKED_NOTE_OVER("wms.picked_not_over"),
	WMS_ACTION_DENYED("wms.action_denyed"),
	WMS_TRANS_QUANTITY_OVER_NOWQUANTITY("wms.trans_quantity_over_nowquantity"),
	WMS_SKUNO_MUST_UNIQUE("wms.skuno_must_unique"),
	WMS_EXIST_PICKED_CARGO("wms.exist_picked_cargo"),
	WMS_NO_PLACED_CARGO("wms.no_placed_cargo"),
	WMS_NO_STORAGE_NOTE_CARGO("wms.no_storage_note_cargo"),
	WMS_EXIST_PLACED_CARGO("wms.exist_placed_cargo"),
	WMS_TRANS_FINISHED("wms.trans_finished"),
	WMS_PICKED_UN_EQ_PLANED_CARGO("wms.picked_un_eq_planed_cargo"),
	WMS_PLACED_UN_EQ_PLANED_CARGO("wms.placed_un_eq_planed_cargo"),
	WMS_EXIST_NOCARGO_PLACED("wms.exist_noCargo_placed"),
	WMS_BLOCK_IS_FULL("wms.block_is_full"),
	WMS_BLOCK_IS_HAVE_CODE("wms.block_is_have_code"),
	WMS_BLOCK_IS_HAVE_NAME("wms.block_is_have_name"),
	WMS_BLOCK_IS_HAVE_NAME_CODE_AND_NAME("wms.block_is_have_code_and_name"),
	WMS_CONS_NO_IS_UN_POST("wms.cons_no_is_un_post"),
	WMS_CARGO_DIST_NO_OVER("wms.cargo_dist_no_over");
	
	;
	private String key;
	
	FosExceptionEnum(String s) {
		this.key = s;
	}

	public String get() {
		return key;
	}

}
