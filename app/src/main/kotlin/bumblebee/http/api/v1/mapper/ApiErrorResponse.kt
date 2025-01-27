package bumblebee.http.api.v1.mapper


data class ApiErrorResponse(
    val status: Int? = null,
    val title: String? = null,
    val message: String? = null,
    val path: String? = null,
)