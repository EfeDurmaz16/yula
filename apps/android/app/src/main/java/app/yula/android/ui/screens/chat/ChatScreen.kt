package app.yula.android.ui.screens.chat

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import app.yula.android.data.api.StreamingClient
import app.yula.android.data.local.TokenManager
import app.yula.android.data.models.Message
import app.yula.android.data.repository.ChatRepository
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch
import java.util.UUID

@Composable
fun ChatScreen(tokenManager: TokenManager) {
    val streamingClient = remember { StreamingClient(tokenManager) }
    val chatRepo = remember { ChatRepository(streamingClient) }
    val scope = rememberCoroutineScope()
    val listState = rememberLazyListState()

    var messages by remember { mutableStateOf(listOf<Message>()) }
    var inputText by remember { mutableStateOf("") }
    var isStreaming by remember { mutableStateOf(false) }
    var streamingContent by remember { mutableStateOf("") }
    val conversationId = remember { UUID.randomUUID().toString() }

    Column(modifier = Modifier.fillMaxSize()) {
        // Messages
        LazyColumn(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            contentPadding = PaddingValues(vertical = 16.dp)
        ) {
            items(messages) { message ->
                MessageBubble(message = message)
            }
            if (isStreaming && streamingContent.isNotEmpty()) {
                item {
                    MessageBubble(
                        message = Message(
                            id = "streaming",
                            role = "assistant",
                            content = streamingContent,
                            createdAt = ""
                        )
                    )
                }
            }
        }

        // Input bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("Message...") },
                maxLines = 5
            )
            Spacer(modifier = Modifier.width(8.dp))
            IconButton(
                onClick = {
                    val text = inputText.trim()
                    if (text.isEmpty()) return@IconButton
                    val userMsg = Message(UUID.randomUUID().toString(), "user", text, "")
                    messages = messages + userMsg
                    inputText = ""
                    isStreaming = true
                    streamingContent = ""

                    scope.launch {
                        chatRepo.streamMessage(conversationId, text)
                            .catch {
                                val errMsg = Message(UUID.randomUUID().toString(), "assistant", "Error: ${it.message}", "")
                                messages = messages + errMsg
                            }
                            .collect { chunk ->
                                streamingContent += chunk
                            }
                        if (streamingContent.isNotEmpty()) {
                            val assistantMsg = Message(UUID.randomUUID().toString(), "assistant", streamingContent, "")
                            messages = messages + assistantMsg
                        }
                        isStreaming = false
                        streamingContent = ""
                        listState.animateScrollToItem(messages.size)
                    }
                },
                enabled = inputText.isNotBlank() && !isStreaming
            ) {
                Icon(Icons.AutoMirrored.Filled.Send, contentDescription = "Send")
            }
        }
    }
}

@Composable
private fun MessageBubble(message: Message) {
    val isUser = message.role == "user"
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
    ) {
        Box(
            modifier = Modifier
                .widthIn(max = 280.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    if (isUser) MaterialTheme.colorScheme.primary
                    else MaterialTheme.colorScheme.surfaceVariant
                )
                .padding(12.dp)
        ) {
            Text(
                text = message.content,
                color = if (isUser) MaterialTheme.colorScheme.onPrimary
                else MaterialTheme.colorScheme.onSurface
            )
        }
    }
}
