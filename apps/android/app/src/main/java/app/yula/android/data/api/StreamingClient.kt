package app.yula.android.data.api

import app.yula.android.BuildConfig
import app.yula.android.data.local.TokenManager
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.sse.EventSource
import okhttp3.sse.EventSourceListener
import okhttp3.sse.EventSources
import org.json.JSONObject

class StreamingClient(private val tokenManager: TokenManager) {
    private val client = OkHttpClient.Builder().build()

    fun streamChat(conversationId: String, message: String): Flow<String> = callbackFlow {
        val json = JSONObject().apply {
            put("conversationId", conversationId)
            put("message", message)
        }

        val requestBuilder = Request.Builder()
            .url("${BuildConfig.API_BASE_URL}/api/chat")
            .post(json.toString().toRequestBody("application/json".toMediaType()))

        tokenManager.getToken()?.let { token ->
            requestBuilder.addHeader("Authorization", "Bearer $token")
        }

        val request = requestBuilder.build()
        val eventSource = EventSources.createFactory(client)
            .newEventSource(request, object : EventSourceListener() {
                override fun onEvent(eventSource: EventSource, id: String?, type: String?, data: String) {
                    trySend(data)
                }

                override fun onFailure(eventSource: EventSource, t: Throwable?, response: Response?) {
                    close(t ?: Exception("Stream failed"))
                }

                override fun onClosed(eventSource: EventSource) {
                    close()
                }
            })

        awaitClose { eventSource.cancel() }
    }
}
