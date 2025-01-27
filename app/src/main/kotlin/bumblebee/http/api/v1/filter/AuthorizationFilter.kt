package bumblebee.http.api.v1.filter

import bumblebee.core.security.AccessControl
import bumblebee.core.security.AuthenticatedUserDetails
import bumblebee.core.security.Permission
import bumblebee.core.util.ScopeUtil
import jakarta.annotation.Priority
import jakarta.annotation.security.DenyAll
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.ws.rs.Priorities
import jakarta.ws.rs.container.ContainerRequestContext
import jakarta.ws.rs.container.ContainerRequestFilter
import jakarta.ws.rs.container.ResourceInfo
import jakarta.ws.rs.core.Context
import jakarta.ws.rs.ext.Provider
import java.io.IOException
import java.nio.file.AccessDeniedException
import javax.ws.rs.HttpMethod


@Provider
@Priority(Priorities.AUTHORIZATION)
class AuthorizationFilter : ContainerRequestFilter {
    @Context
    lateinit var resourceInfo: ResourceInfo

    @Throws(IOException::class)
    override fun filter(requestContext: ContainerRequestContext) {
        val method = resourceInfo.resourceMethod

        if (method.isAnnotationPresent(DenyAll::class.java)) {
            throw AccessDeniedException("You don't have permissions to perform this action.")
        }

        var rolesAllowed = method.getAnnotation(RolesAllowed::class.java)

        if (rolesAllowed != null) {
            performAuthorization(rolesAllowed.value, requestContext)
            return
        }
        if (method.isAnnotationPresent(PermitAll::class.java)) {
            return
        }
        rolesAllowed = resourceInfo.resourceClass.getAnnotation(RolesAllowed::class.java)

        if (rolesAllowed != null) {
            performAuthorization(rolesAllowed.value, requestContext)
        }

        if (resourceInfo.resourceClass.isAnnotationPresent(PermitAll::class.java)) {
            return
        }

        if (isNotAuthenticated(requestContext)) {
            throw AccessDeniedException("Authentication is required to perform this action.")
        }
    }

    @Throws(AccessDeniedException::class)
    private fun performAuthorization(rolesAllowed: Array<String>, requestContext: ContainerRequestContext) {
        if (rolesAllowed.isNotEmpty() && isNotAuthenticated(requestContext)) {
            throw AccessDeniedException("Authentication is required to perform this action.")
        }

        for (roleName in rolesAllowed) {
            if (canAccess(requestContext, roleName)) return
        }

        throw AccessDeniedException("You don't have permissions to perform this action.")
    }

    private fun isNotAuthenticated(requestContext: ContainerRequestContext): Boolean {
        return requestContext.securityContext.userPrincipal == null
    }

    private fun canAccess(
        requestContext: ContainerRequestContext,
        roleName: String
    ): Boolean {
        if (requestContext.securityContext.isUserInRole(roleName)) {
            val userDetails = requestContext.securityContext.userPrincipal as AuthenticatedUserDetails
            val role = userDetails.role

            if (role.name == roleName) {
                val scopes = role.acl
                    .filter { it.type == AccessControl.Type.WEB }
                    .filter { canAccessAction(it.permission, requestContext.method) }
                    .map { it.scope }

                if (ScopeUtil.exactMatch(scopes, ScopeUtil.getScopeList(requestContext.uriInfo.path))) {
                    return true
                }
            }
        }

        return false
    }

    private fun canAccessAction(permission: Permission?, method: String): Boolean {
        if (method == HttpMethod.GET) {
            return permission == Permission.READ || permission == Permission.WRITE || permission == Permission.DELETE || permission == Permission.UPDATE
        }

        if (method == HttpMethod.POST) {
            return permission == Permission.WRITE || permission == Permission.DELETE || permission == Permission.UPDATE
        }

        if (method == HttpMethod.PUT || method == HttpMethod.PATCH) {
            return permission == Permission.UPDATE
        }

        if (method == HttpMethod.DELETE) {
            return permission == Permission.DELETE || permission == Permission.UPDATE
        }

        return false
    }
}
