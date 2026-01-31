import SwiftUI

struct SettingsView: View {
    @State private var authService = AuthService.shared

    var body: some View {
        NavigationStack {
            List {
                if let user = authService.currentUser {
                    Section("Account") {
                        LabeledContent("Name", value: user.name)
                        LabeledContent("Email", value: user.email)
                        LabeledContent("Plan", value: user.tier.capitalized)
                    }
                }

                Section {
                    Button("Sign Out", role: .destructive) {
                        authService.logout()
                    }
                }
            }
            .navigationTitle("Settings")
            .task { await authService.fetchCurrentUser() }
        }
    }
}
