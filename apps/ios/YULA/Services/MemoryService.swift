import Foundation

@Observable
final class MemoryService {
    static let shared = MemoryService()

    func list() async throws -> [Memory] {
        let response: APIResponse<PaginatedResponse<Memory>> = try await APIClient.shared.request(
            path: "/api/memory"
        )
        return response.data?.items ?? []
    }

    func search(query: String) async throws -> [Memory] {
        struct SearchResult: Codable {
            let items: [Memory]
            let query: String
        }
        let response: APIResponse<SearchResult> = try await APIClient.shared.request(
            path: "/api/memory/search?query=\(query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query)"
        )
        return response.data?.items ?? []
    }

    func delete(id: String) async throws {
        let _: APIResponse<Bool> = try await APIClient.shared.request(
            path: "/api/memory/\(id)",
            method: "DELETE"
        )
    }
}
