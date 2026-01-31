import Foundation

@Observable
final class ChatService {
    static let shared = ChatService()

    func streamMessage(conversationId: String, message: String) -> AsyncThrowingStream<String, Error> {
        APIClient.shared.streamChat(conversationId: conversationId, message: message)
    }
}
