import Foundation

struct User: Codable, Identifiable {
    let id: String
    let email: String
    let name: String
    let tier: String
    let billingCycle: String
    let createdAt: String
    let updatedAt: String
}
