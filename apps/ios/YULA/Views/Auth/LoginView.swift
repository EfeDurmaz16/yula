import SwiftUI

struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var error: String?
    @State private var loading = false
    @State private var showSignup = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Spacer()

                Text("YULA")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("Your AI assistant with memory")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                VStack(spacing: 16) {
                    TextField("Email", text: $email)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.emailAddress)
                        .autocapitalization(.none)

                    SecureField("Password", text: $password)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.password)

                    if let error {
                        Text(error)
                            .font(.caption)
                            .foregroundStyle(.red)
                    }

                    Button(action: login) {
                        if loading {
                            ProgressView()
                                .frame(maxWidth: .infinity)
                        } else {
                            Text("Sign In")
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(loading || email.isEmpty || password.isEmpty)
                }
                .padding(.horizontal, 32)

                Button("Don't have an account? Sign up") {
                    showSignup = true
                }
                .font(.footnote)

                Spacer()
            }
            .navigationDestination(isPresented: $showSignup) {
                SignupView()
            }
        }
    }

    private func login() {
        loading = true
        error = nil
        Task {
            do {
                try await AuthService.shared.login(email: email, password: password)
            } catch {
                self.error = error.localizedDescription
            }
            loading = false
        }
    }
}
