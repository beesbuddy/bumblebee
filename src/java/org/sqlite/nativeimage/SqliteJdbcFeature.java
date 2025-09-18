package org.sqlite.nativeimage;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.graalvm.nativeimage.hosted.Feature;
import org.graalvm.nativeimage.hosted.RuntimeClassInitialization;
import org.graalvm.nativeimage.hosted.RuntimeJNIAccess;
import org.sqlite.BusyHandler;
import org.sqlite.Collation;
import org.sqlite.Function;
import org.sqlite.ProgressHandler;
import org.sqlite.SQLiteJDBCLoader;
import org.sqlite.core.DB;
import org.sqlite.core.NativeDB;
import org.sqlite.jdbc3.JDBC3DatabaseMetaData;
import org.sqlite.util.LibraryLoaderUtil;
import org.sqlite.util.OSInfo;
import org.sqlite.util.ProcessRunner;

public class SqliteJdbcFeature implements Feature {
    public void beforeAnalysis(Feature.BeforeAnalysisAccess a) {
        RuntimeClassInitialization.initializeAtBuildTime(SQLiteJDBCLoader.VersionHolder.class);
        RuntimeClassInitialization.initializeAtBuildTime(JDBC3DatabaseMetaData.class);
        RuntimeClassInitialization.initializeAtBuildTime(OSInfo.class);
        RuntimeClassInitialization.initializeAtBuildTime(ProcessRunner.class);
        RuntimeClassInitialization.initializeAtBuildTime(LibraryLoaderUtil.class);
        a.registerReachabilityHandler(this::nativeDbReachable, method(SQLiteJDBCLoader.class, "initialize"));
    }

    private void nativeDbReachable(Feature.DuringAnalysisAccess a) {
        registerJNICalls();
    }

    private void registerJNICalls() {
        RuntimeJNIAccess.register(NativeDB.class);
        RuntimeJNIAccess.register(
                fields(NativeDB.class, "pointer", "busyHandler", "commitListener", "updateListener", "progressHandler"));
        RuntimeJNIAccess.register(method(DB.class, "onUpdate", new Class[] { int.class, String.class, String.class, long.class }));
        RuntimeJNIAccess.register(method(DB.class, "onCommit", new Class[] { boolean.class }));
        RuntimeJNIAccess.register(method(NativeDB.class, "stringToUtf8ByteArray", new Class[] { String.class }));
        RuntimeJNIAccess.register(method(DB.class, "throwex", new Class[0]));
        RuntimeJNIAccess.register(method(DB.class, "throwex", new Class[] { int.class }));
        RuntimeJNIAccess.register(method(NativeDB.class, "throwex", new Class[] { String.class }));
        RuntimeJNIAccess.register(Function.class);
        RuntimeJNIAccess.register(fields(Function.class, new String[] { "context", "value", "args" }));
        RuntimeJNIAccess.register(method(Function.class, "xFunc", new Class[0]));
        RuntimeJNIAccess.register(Collation.class);
        RuntimeJNIAccess.register(method(Collation.class, "xCompare", new Class[] { String.class, String.class }));
        RuntimeJNIAccess.register(Function.Aggregate.class);
        RuntimeJNIAccess.register(method(Function.Aggregate.class, "xStep", new Class[0]));
        RuntimeJNIAccess.register(method(Function.Aggregate.class, "xFinal", new Class[0]));
        RuntimeJNIAccess.register(method(Function.Aggregate.class, "clone", new Class[0]));
        RuntimeJNIAccess.register(Function.Window.class);
        RuntimeJNIAccess.register(method(Function.Window.class, "xInverse", new Class[0]));
        RuntimeJNIAccess.register(method(Function.Window.class, "xValue", new Class[0]));
        RuntimeJNIAccess.register(DB.ProgressObserver.class);
        RuntimeJNIAccess.register(method(DB.ProgressObserver.class, "progress", new Class[] { int.class, int.class }));
        RuntimeJNIAccess.register(ProgressHandler.class);
        RuntimeJNIAccess.register(method(ProgressHandler.class, "progress", new Class[0]));
        RuntimeJNIAccess.register(BusyHandler.class);
        RuntimeJNIAccess.register(method(BusyHandler.class, "callback", new Class[] { int.class }));
        RuntimeJNIAccess.register(Throwable.class);
        RuntimeJNIAccess.register(method(Throwable.class, "toString", new Class[0]));
        RuntimeJNIAccess.register(boolean[].class);
    }

    private Method method(Class<?> clazz, String methodName, Class<?>... args) {
        try {
            return clazz.getDeclaredMethod(methodName, args);
        } catch (NoSuchMethodException e) {
            throw new SqliteJdbcFeatureException(e, null);
        }
    }

    private Field[] fields(Class<?> clazz, String... fieldNames) {
        try {
            Field[] fields = new Field[fieldNames.length];
            for (int i = 0; i < fieldNames.length; i++)
                fields[i] = clazz.getDeclaredField(fieldNames[i]);
            return fields;
        } catch (NoSuchFieldException e) {
            throw new SqliteJdbcFeatureException(e, null);
        }
    }
}

