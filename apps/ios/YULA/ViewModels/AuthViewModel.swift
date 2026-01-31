import SwiftUI

@Observable
final class AuthViewModel {
    var email = ""
    var password = ""
    var name = ""
    var error: String?
    var isLoading = false

    func login() async {
        isLoading = true
        error = nil
        do {
            try await AuthService.shared.login(email: email, password: password)
        } catch {
            self.error = error.localizedDescription
        }
        isLoading = false
    }

    func signup() async {
        isLoading = true
        error = nil
        do {
            try await AuthService.shared.signup(email: email, password: password, name: name)
        } catch {
            self.error = error.localizedDescription
        }
        isLoading = false
    }
}
