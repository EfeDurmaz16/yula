import Foundation

@Observable
final class ConversationService {
    static let shared = ConversationService()

    struct CreateConversationRequest: Encodable {
        let title: String
    }

    func list() async throws -> [Conversation] {
        let response: APIResponse<[Conversation]> = try await APIClient.shared.request(
            path: "/api/conversations"
        )
        return response.data ?? []
    }

    func create(title: String) async throws -> Conversation {
        let response: APIResponse<Conversation> = try await APIClient.shared.request(
            path: "/api/conversations",
            method: "POST",
            body: CreateConversationRequest(title: title)
        )
        guard let data = response.data else {
            throw NSError(domain: "Conversation", code: 500)
        }
        return data
    }

    func messages(for conversationId: String) async throws -> [Message] {
        let response: APIResponse<[Message]> = try await APIClient.shared.request(
            path: "/api/conversations/\(conversationId)/messages"
        )
        return response.data ?? []
    }

    func delete(id: String) async throws {
        let _: APIResponse<Bool> = try await APIClient.shared.request(
            path: "/api/conversations/\(id)",
            method: "DELETE"
        )
    }
}
