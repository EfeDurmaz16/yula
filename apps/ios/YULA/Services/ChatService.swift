import Foundation

@Observable
final class ChatService {
    static let shared = ChatService()

    func streamMessage(conversationId: String, message: String) async -> AsyncThrowingStream<String, Error> {
        await APIClient.shared.streamChat(conversationId: conversationId, message: message)
    }
}
