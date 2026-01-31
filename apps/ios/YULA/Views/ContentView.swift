import SwiftUI

struct ContentView: View {
    @State private var authService = AuthService.shared

    var body: some View {
        if authService.isAuthenticated {
            TabView {
                ChatView()
                    .tabItem {
                        Label("Chat", systemImage: "bubble.left.and.bubble.right")
                    }

                MemoryListView()
                    .tabItem {
                        Label("Memory", systemImage: "brain.head.profile")
                    }

                SettingsView()
                    .tabItem {
                        Label("Settings", systemImage: "gear")
                    }
            }
            .tint(.primary)
        } else {
            LoginView()
        }
    }
}
