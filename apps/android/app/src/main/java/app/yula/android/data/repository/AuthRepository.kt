package app.yula.android.data.repository

import app.yula.android.data.api.ApiClient
import app.yula.android.data.local.TokenManager
import app.yula.android.data.models.User

class AuthRepository(private val tokenManager: TokenManager) {
    suspend fun login(email: String, password: String): User {
        val response = ApiClient.service.login(mapOf("email" to email, "password" to password))
        val data = response.data ?: throw Exception(response.error?.message ?: "Login failed")
        tokenManager.saveToken(data.accessToken)
        return data.user
    }

    suspend fun signup(email: String, password: String, name: String): User {
        val response = ApiClient.service.signup(mapOf("email" to email, "password" to password, "name" to name))
        val data = response.data ?: throw Exception(response.error?.message ?: "Signup failed")
        tokenManager.saveToken(data.accessToken)
        return data.user
    }

    suspend fun me(): User? {
        return try {
            ApiClient.service.me().data
        } catch (_: Exception) {
            null
        }
    }

    fun logout() {
        tokenManager.clearToken()
    }

    fun isLoggedIn(): Boolean = tokenManager.hasToken()
}
