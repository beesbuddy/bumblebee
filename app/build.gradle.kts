object Constants {
    const val JAVA_LANG_VERSION = 21
    const val APP_MAIN_CLASS = "bumblebee.AppKt"
}

object Versions {
    const val CLICKT = "4.2.1"
    const val LOGBACK = "1.2.9"
    const val JUPITER = "5.8.1"
    const val JUPITER_ENGINE = "5.9.3"
    const val MOCKITO_KOTLIN = "3.2.0"
    const val MOCKITO_CORE = "5.5.0"
    const val KOTLIN_LOGGING = "2.0.11"
    const val JAXB = "2.3.1"
    const val NETTY = "4.1.121.Final"
    const val HUTOOL = "5.8.21"
    const val JERSEY = "3.1.3"
    const val FASTJSON = "2.0.9"
    const val JJWT = "0.12.6"
    const val GLASSFISH = "4.0.3"
    const val JBCRYPT = "0.4"
    const val RS_API = "2.1.1"
    const val GUAVA = "32.1.1-jre"
    const val PAHO = "1.2.5"
    const val INFLUXDB = "6.10.0"
    const val JDBI3 = "3.41.3"
    const val H2 = "1.3.148"
    const val RESTASSURED = "5.4.0"
}

plugins {
    // Apply the org.jetbrains.kotlin.jvm Plugin to add support for Kotlin.
    id("org.jetbrains.kotlin.jvm") version "2.1.0"

    // Apply the application plugin to add support for building a CLI application in Java.
    application
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:${Versions.JUPITER}")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")

    implementation("com.google.guava:guava:${Versions.GUAVA}")
    implementation("cn.hutool:hutool-core:${Versions.HUTOOL}")
    implementation("cn.hutool:hutool-crypto:${Versions.HUTOOL}")
    implementation("cn.hutool:hutool-setting:${Versions.HUTOOL}")
    implementation("cn.hutool:hutool-system:${Versions.HUTOOL}")
    implementation("com.alibaba:fastjson:${Versions.FASTJSON}")
    implementation("io.netty:netty-codec-mqtt:${Versions.NETTY}")
    implementation("io.netty:netty-codec-http:${Versions.NETTY}")
    implementation("io.netty:netty-handler:${Versions.NETTY}")
    implementation("io.netty:netty-transport-native-epoll:${Versions.NETTY}")
    implementation("io.netty:netty-buffer:${Versions.NETTY}")
    implementation("org.mindrot:jbcrypt:${Versions.JBCRYPT}")
    implementation("io.jsonwebtoken:jjwt:${Versions.JJWT}")

//    implementation("org.glassfish.jersey.connectors:jersey-netty-connector:${Versions.JERSEY}")
    implementation("org.glassfish.jaxb:jaxb-runtime:${Versions.GLASSFISH}")
    implementation("org.glassfish.jersey.core:jersey-server:${Versions.JERSEY}")
    implementation("org.glassfish.jersey.containers:jersey-container-servlet:${Versions.JERSEY}")
    implementation("org.glassfish.jersey.media:jersey-media-json-jackson:${Versions.JERSEY}")
    implementation("org.glassfish.jersey.media:jersey-media-multipart:${Versions.JERSEY}")
    implementation("org.glassfish.jersey.inject:jersey-hk2:${Versions.JERSEY}")

    implementation("javax.xml.bind:jaxb-api:${Versions.JAXB}")
    implementation("javax.ws.rs:javax.ws.rs-api:${Versions.RS_API}")

    implementation("io.github.microutils:kotlin-logging-jvm:${Versions.KOTLIN_LOGGING}")
    implementation("ch.qos.logback:logback-classic:${Versions.LOGBACK}")
    implementation("com.github.ajalt.clikt:clikt:${Versions.CLICKT}")
    implementation("com.influxdb:influxdb-client-kotlin:${Versions.INFLUXDB}")

    implementation("org.eclipse.paho:org.eclipse.paho.client.mqttv3:${Versions.PAHO}")

    implementation("org.jdbi:jdbi3-core:${Versions.JDBI3}")
    implementation("org.jdbi:jdbi3-kotlin:${Versions.JDBI3}")
    implementation("org.jdbi:jdbi3-kotlin-sqlobject:${Versions.JDBI3}")
    implementation("org.jdbi:jdbi3-jackson2:${Versions.JDBI3}")
    implementation("com.h2database:h2:${Versions.H2}")

    implementation("org.xerial:sqlite-jdbc:3.49.1.0")
    implementation("org.jooq:jooq:3.20.4")

    implementation(kotlin("reflect"))

    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:${Versions.JUPITER_ENGINE}")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    testImplementation("org.mockito:mockito-core:${Versions.MOCKITO_CORE}")
    testImplementation("org.mockito.kotlin:mockito-kotlin:${Versions.MOCKITO_KOTLIN}")

    testImplementation("io.rest-assured:rest-assured:${Versions.RESTASSURED}")
    testImplementation("io.rest-assured:kotlin-extensions:${Versions.RESTASSURED}")

    testImplementation("org.mockito:mockito-inline:5.2.0") // for mocking final classes
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(Constants.JAVA_LANG_VERSION))
    }
}

application {
    mainClass.set(Constants.APP_MAIN_CLASS)
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
