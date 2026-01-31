package app.yula.android.data.models

data class Conversation(
    val id: String,
    val title: String,
    val summary: String? = null,
    val messageCount: Int = 0,
    val lastMessageAt: String? = null,
    val createdAt: String,
    val updatedAt: String
)
