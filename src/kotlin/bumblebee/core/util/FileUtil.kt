package bumblebee.core.util

import bumblebee.core.Constants
import java.io.File
import java.io.IOException
import java.io.InputStream
import java.io.RandomAccessFile


object FileUtil {
    @Throws(IOException::class)
    fun toRandomAccessFile(inputStream: InputStream): RandomAccessFile {
        val raf = RandomAccessFile(File.createTempFile(Constants.APP_NAME, Constants.TMP_NAME), "rwd")
        val buffer = ByteArray(2048)
        var tmp: Int
        while (inputStream.read(buffer).also { tmp = it } != -1) {
            raf.write(buffer, 0, tmp)
        }
        raf.seek(0)
        return raf
    }
}

