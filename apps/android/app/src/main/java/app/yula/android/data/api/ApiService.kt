package app.yula.android.data.api

import app.yula.android.data.models.*
import retrofit2.http.*

interface ApiService {
    @POST("api/auth/login")
    suspend fun login(@Body body: Map<String, String>): ApiResponse<AuthResponse>

    @POST("api/auth/signup")
    suspend fun signup(@Body body: Map<String, String>): ApiResponse<AuthResponse>

    @POST("api/auth/logout")
    suspend fun logout(): ApiResponse<Unit>

    @GET("api/auth/me")
    suspend fun me(): ApiResponse<User>

    @GET("api/conversations")
    suspend fun getConversations(): ApiResponse<List<Conversation>>

    @POST("api/conversations")
    suspend fun createConversation(@Body body: Map<String, String>): ApiResponse<Conversation>

    @DELETE("api/conversations/{id}")
    suspend fun deleteConversation(@Path("id") id: String): ApiResponse<Unit>

    @GET("api/conversations/{id}/messages")
    suspend fun getMessages(@Path("id") conversationId: String): ApiResponse<List<Message>>

    @GET("api/memory")
    suspend fun getMemories(): ApiResponse<PaginatedResponse<Memory>>

    @GET("api/memory/search")
    suspend fun searchMemories(@Query("query") query: String): ApiResponse<Map<String, Any>>

    @DELETE("api/memory/{id}")
    suspend fun deleteMemory(@Path("id") id: String): ApiResponse<Unit>
}
