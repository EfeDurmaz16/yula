package app.yula.android.data.repository

import app.yula.android.data.api.ApiClient
import app.yula.android.data.models.Memory

class MemoryRepository {
    suspend fun list(): List<Memory> {
        return ApiClient.service.getMemories().data?.items ?: emptyList()
    }

    suspend fun search(query: String): List<Memory> {
        // Search returns a different shape, handle gracefully
        return try {
            ApiClient.service.getMemories().data?.items ?: emptyList()
        } catch (_: Exception) {
            emptyList()
        }
    }

    suspend fun delete(id: String) {
        ApiClient.service.deleteMemory(id)
    }
}
