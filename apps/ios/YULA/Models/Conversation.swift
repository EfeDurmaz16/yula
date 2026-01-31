import Foundation

struct Conversation: Codable, Identifiable {
    let id: String
    let title: String
    let summary: String?
    let messageCount: Int
    let lastMessageAt: String?
    let createdAt: String
    let updatedAt: String
}
