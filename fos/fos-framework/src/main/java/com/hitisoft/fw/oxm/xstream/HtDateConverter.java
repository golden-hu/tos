package com.hitisoft.fw.oxm.xstream;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.thoughtworks.xstream.converters.ConversionException;
import com.thoughtworks.xstream.converters.basic.AbstractSingleValueConverter;
import com.thoughtworks.xstream.converters.extended.SqlTimestampConverter;
import com.thoughtworks.xstream.core.util.ThreadSafeSimpleDateFormat;

public class HtDateConverter extends AbstractSingleValueConverter {

	private final ThreadSafeSimpleDateFormat defaultFormat;
	private final ThreadSafeSimpleDateFormat[] acceptableFormats;
	private SqlTimestampConverter sqlTimestampConverter = new SqlTimestampConverter();

	/**
	 * Construct a DateConverter with standard formats and lenient set off.
	 */
	public HtDateConverter() {
		this(false);
	}

	/**
	 * Construct a DateConverter with standard formats.
	 * 
	 * @param lenient
	 *            the lenient setting of
	 *            {@link SimpleDateFormat#setLenient(boolean)}
	 * @since 1.3
	 */
	public HtDateConverter(boolean lenient) {
		this("yyyy-MM-dd", new String[] {
				"yyyy-MM-dd HH:mm:ss" }, lenient);
	}

	/**
	 * Construct a DateConverter with lenient set off.
	 * 
	 * @param defaultFormat
	 *            the default format
	 * @param acceptableFormats
	 *            fallback formats
	 */
	public HtDateConverter(String defaultFormat, String[] acceptableFormats) {
		this(defaultFormat, acceptableFormats, false);
	}

	/**
	 * Construct a DateConverter.
	 * 
	 * @param defaultFormat
	 *            the default format
	 * @param acceptableFormats
	 *            fallback formats
	 * @param lenient
	 *            the lenient setting of
	 *            {@link SimpleDateFormat#setLenient(boolean)}
	 * @since 1.3
	 */
	public HtDateConverter(String defaultFormat, String[] acceptableFormats,
			boolean lenient) {
		this.defaultFormat = new ThreadSafeSimpleDateFormat(defaultFormat, 4,
				20, lenient);
		this.acceptableFormats = new ThreadSafeSimpleDateFormat[acceptableFormats.length];
		for (int i = 0; i < acceptableFormats.length; i++) {
			this.acceptableFormats[i] = new ThreadSafeSimpleDateFormat(
					acceptableFormats[i], 1, 20, lenient);
		}
	}

	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type.equals(Date.class) || type.equals(java.sql.Date.class);
	}

	@Override
	public Object fromString(String str) {
		try {
			if(str.length() > 10) {
				return sqlTimestampConverter.fromString(str);
			}else {
				return defaultFormat.parse(str);
			}
		} catch (ParseException e) {
			for (int i = 0; i < acceptableFormats.length; i++) {
				try {
					return acceptableFormats[i].parse(str);
				} catch (ParseException e2) {
					// no worries, let's try the next format.
				}
			}
			// no dateFormats left to try
			throw new ConversionException("Cannot parse date " + str);
		}
	}

	public String toString(Object obj) {
		return defaultFormat.format((Date) obj);
	}

}
