package app.yula.android.data.repository

import app.yula.android.data.api.ApiClient
import app.yula.android.data.models.Conversation
import app.yula.android.data.models.Message

class ConversationRepository {
    suspend fun list(): List<Conversation> {
        return ApiClient.service.getConversations().data ?: emptyList()
    }

    suspend fun create(title: String): Conversation {
        val response = ApiClient.service.createConversation(mapOf("title" to title))
        return response.data ?: throw Exception("Failed to create conversation")
    }

    suspend fun messages(conversationId: String): List<Message> {
        return ApiClient.service.getMessages(conversationId).data ?: emptyList()
    }

    suspend fun delete(id: String) {
        ApiClient.service.deleteConversation(id)
    }
}
