package app.yula.android.data.models

data class Memory(
    val id: String,
    val content: String,
    val source: String,
    val metadata: Map<String, Any>? = null,
    val createdAt: String,
    val updatedAt: String? = null
)
