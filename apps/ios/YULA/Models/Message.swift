import Foundation

struct Message: Codable, Identifiable {
    let id: String
    let role: MessageRole
    let content: String
    let createdAt: String

    enum MessageRole: String, Codable {
        case user
        case assistant
        case system
    }
}
