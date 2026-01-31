package app.yula.android.data.repository

import app.yula.android.data.api.StreamingClient
import kotlinx.coroutines.flow.Flow

class ChatRepository(private val streamingClient: StreamingClient) {
    fun streamMessage(conversationId: String, message: String): Flow<String> {
        return streamingClient.streamChat(conversationId, message)
    }
}
