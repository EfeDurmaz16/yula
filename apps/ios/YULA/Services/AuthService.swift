import Foundation

@Observable
final class AuthService {
    static let shared = AuthService()

    private(set) var currentUser: User?
    private(set) var isAuthenticated = false

    private init() {
        isAuthenticated = KeychainHelper.readString(for: "auth_token") != nil
    }

    struct LoginRequest: Encodable {
        let email: String
        let password: String
    }

    struct SignupRequest: Encodable {
        let email: String
        let password: String
        let name: String
    }

    func login(email: String, password: String) async throws {
        let response: APIResponse<AuthResponse> = try await APIClient.shared.request(
            path: "/api/auth/login",
            method: "POST",
            body: LoginRequest(email: email, password: password)
        )
        guard let data = response.data else {
            throw NSError(domain: "Auth", code: 401, userInfo: [NSLocalizedDescriptionKey: response.error?.message ?? "Login failed"])
        }
        KeychainHelper.saveString(data.accessToken, for: "auth_token")
        currentUser = data.user
        isAuthenticated = true
    }

    func signup(email: String, password: String, name: String) async throws {
        let response: APIResponse<AuthResponse> = try await APIClient.shared.request(
            path: "/api/auth/signup",
            method: "POST",
            body: SignupRequest(email: email, password: password, name: name)
        )
        guard let data = response.data else {
            throw NSError(domain: "Auth", code: 400, userInfo: [NSLocalizedDescriptionKey: response.error?.message ?? "Signup failed"])
        }
        KeychainHelper.saveString(data.accessToken, for: "auth_token")
        currentUser = data.user
        isAuthenticated = true
    }

    func logout() {
        KeychainHelper.delete(for: "auth_token")
        currentUser = nil
        isAuthenticated = false
    }

    func fetchCurrentUser() async {
        do {
            let response: APIResponse<User> = try await APIClient.shared.request(path: "/api/auth/me")
            currentUser = response.data
        } catch {
            logout()
        }
    }
}
