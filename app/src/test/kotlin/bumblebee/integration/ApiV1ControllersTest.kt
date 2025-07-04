package bumblebee.integration

import bumblebee.core.Constants
import bumblebee.core.config.Config
import bumblebee.core.config.SecurityConfig
import bumblebee.core.security.*
import bumblebee.core.security.token.AuthenticationTokenIssuer
import bumblebee.core.security.token.AuthenticationTokenParser
import bumblebee.core.security.token.AuthenticationTokenService
import bumblebee.http.HttpServer
import io.restassured.RestAssured.given
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test


object ApiV1ControllersTest {
    private lateinit var httpServer: HttpServer
    private lateinit var authManager: IAuthManager

    @BeforeEach
    fun setUp() {
        val config = Config(
            securityConfig = SecurityConfig(
                users = (
                        (0..8).map {
                            User(
                                userId = "clientId$it",
                                password = PasswordEncoder.hashPassword("password"),
                                userName = "username",
                                role = Role.createReadOnly()
                            )

                        } +
                                User(userName = "bumblebee", password = PasswordEncoder.hashPassword("password"), role = Role(
                                    name = "superadmin",
                                    acl = listOf(
                                        AccessControl(scope = "#", type = AccessControl.Type.MQTT, permission = Permission.UPDATE),
                                        AccessControl(scope = "#", type = AccessControl.Type.WEB, permission = Permission.UPDATE)
                                    )
                                ))
                        ).toMutableList(),
                authManagerClass = Constants.AUTH_MANAGER_FILE_BASED_CLASSNAME
            )
        )

        authManager = AuthManagerProvider.initialize(config.securityConfig)

        val jwtConfig = JWTTokenConfig()
        val authenticationTokenService = AuthenticationTokenService(
            config = jwtConfig,
            tokenParser = AuthenticationTokenParser(jwtConfig, authManager),
            tokenIssuer = AuthenticationTokenIssuer(jwtConfig),
        )

        httpServer =
            HttpServer.create(
                config, authManager, authenticationTokenService = authenticationTokenService,
                enableAdmin = true
            )
        httpServer.start()
    }

    @AfterEach
    fun cleanUp() {
        httpServer.stop()
    }

    @Test
    fun `when dashboard sever started then admin controller is accessible`() {
        val jwtConfig = JWTTokenConfig()
        val authenticationTokenService = AuthenticationTokenService(
            config = jwtConfig,
            tokenParser = AuthenticationTokenParser(jwtConfig, authManager),
            tokenIssuer = AuthenticationTokenIssuer(jwtConfig),
        )

        val authorizationToken = authenticationTokenService.issueToken(
            Constants.SUPER_USERNAME,
            Role(name = "superadmin")
        )

        given().header("Authorization", "Bearer $authorizationToken").`when`().get("/api/v1/admin")
            .then()
            .statusCode(200)
            .body("module", equalTo("ADMIN"))
            .body("version", equalTo("0.0.0"))
    }

    @Test
    fun `when dashboard sever started then admin controller is not accessible`() {
        val jwtConfig = JWTTokenConfig()
        val authenticationTokenService = AuthenticationTokenService(
            config = jwtConfig,
            tokenParser = AuthenticationTokenParser(jwtConfig, authManager),
            tokenIssuer = AuthenticationTokenIssuer(jwtConfig),
        )

        val authorizationToken = authenticationTokenService.issueToken(
            Constants.SUPER_USERNAME,
            Role(name = "noexisting")
        )

        given().header("Authorization", "Bearer $authorizationToken").`when`().get("/api/v1/admin")
            .then()
            .statusCode(403)
    }
}
