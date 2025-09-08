package org.sqlite.nativeimage;

public class SqliteJdbcFeatureException extends RuntimeException {
    public SqliteJdbcFeatureException(String message, Throwable cause) {
        super(message, cause);
    }

    public SqliteJdbcFeatureException(Throwable cause, Void unused) {
        super(cause);
    }
}
