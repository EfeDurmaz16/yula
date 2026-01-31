import Foundation

enum APIClient {
    private static var baseURL: String {
        AppConfig.apiBaseURL
    }

    private static var token: String? {
        KeychainHelper.readString(for: "auth_token")
    }

    static func request<T: Codable>(
        path: String,
        method: String = "GET",
        body: (any Encodable)? = nil
    ) async throws -> APIResponse<T> {
        guard let url = URL(string: "\(baseURL)\(path)") else {
            throw URLError(.badURL)
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let token {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        if let body {
            request.httpBody = try JSONEncoder().encode(body)
        }

        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(APIResponse<T>.self, from: data)
    }

    static func streamChat(conversationId: String, message: String) -> AsyncThrowingStream<String, Error> {
        AsyncThrowingStream { continuation in
            Task {
                guard let url = URL(string: "\(baseURL)/api/chat") else {
                    continuation.finish(throwing: URLError(.badURL))
                    return
                }

                var request = URLRequest(url: url)
                request.httpMethod = "POST"
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                if let token {
                    request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
                }

                let payload = ["conversationId": conversationId, "message": message]
                request.httpBody = try? JSONEncoder().encode(payload)

                do {
                    let (bytes, _) = try await URLSession.shared.bytes(for: request)
                    for try await line in bytes.lines {
                        if line.hasPrefix("0:") {
                            let text = String(line.dropFirst(2))
                                .trimmingCharacters(in: .init(charactersIn: "\""))
                            continuation.yield(text)
                        }
                    }
                    continuation.finish()
                } catch {
                    continuation.finish(throwing: error)
                }
            }
        }
    }
}
