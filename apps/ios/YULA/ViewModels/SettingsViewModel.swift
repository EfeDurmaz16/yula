import Foundation

@Observable
final class SettingsViewModel {
    var user: User?

    func load() async {
        await AuthService.shared.fetchCurrentUser()
        user = AuthService.shared.currentUser
    }

    func logout() {
        AuthService.shared.logout()
    }
}
