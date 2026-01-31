import Foundation

@Observable
final class ChatViewModel {
    var messages: [Message] = []
    var inputText = ""
    var isStreaming = false
    var streamingContent = ""

    private let conversationId = UUID().uuidString

    func sendMessage() {
        let text = inputText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }

        let userMessage = Message(
            id: UUID().uuidString,
            role: .user,
            content: text,
            createdAt: ISO8601DateFormatter().string(from: Date())
        )
        messages.append(userMessage)
        inputText = ""
        isStreaming = true
        streamingContent = ""

        Task {
            do {
                let stream = APIClient.shared.streamChat(
                    conversationId: conversationId,
                    message: text
                )
                for try await chunk in stream {
                    streamingContent += chunk
                }
                let assistantMessage = Message(
                    id: UUID().uuidString,
                    role: .assistant,
                    content: streamingContent,
                    createdAt: ISO8601DateFormatter().string(from: Date())
                )
                messages.append(assistantMessage)
            } catch {
                let errorMessage = Message(
                    id: UUID().uuidString,
                    role: .assistant,
                    content: "Error: \(error.localizedDescription)",
                    createdAt: ISO8601DateFormatter().string(from: Date())
                )
                messages.append(errorMessage)
            }
            isStreaming = false
            streamingContent = ""
        }
    }
}
