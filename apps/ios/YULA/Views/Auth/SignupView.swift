import SwiftUI

struct SignupView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var error: String?
    @State private var loading = false

    var body: some View {
        VStack(spacing: 24) {
            Text("Create Account")
                .font(.title)
                .fontWeight(.bold)

            VStack(spacing: 16) {
                TextField("Name", text: $name)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.name)

                TextField("Email", text: $email)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)

                SecureField("Password", text: $password)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.newPassword)

                SecureField("Confirm Password", text: $confirmPassword)
                    .textFieldStyle(.roundedBorder)
                    .textContentType(.newPassword)

                if let error {
                    Text(error)
                        .font(.caption)
                        .foregroundStyle(.red)
                }

                Button(action: signup) {
                    if loading {
                        ProgressView()
                            .frame(maxWidth: .infinity)
                    } else {
                        Text("Create Account")
                            .frame(maxWidth: .infinity)
                    }
                }
                .buttonStyle(.borderedProminent)
                .disabled(loading || name.isEmpty || email.isEmpty || password.isEmpty)
            }
            .padding(.horizontal, 32)

            Spacer()
        }
        .padding(.top, 40)
        .navigationBarBackButtonHidden(false)
    }

    private func signup() {
        guard password == confirmPassword else {
            error = "Passwords do not match"
            return
        }
        guard password.count >= 8 else {
            error = "Password must be at least 8 characters"
            return
        }
        loading = true
        error = nil
        Task {
            do {
                try await AuthService.shared.signup(email: email, password: password, name: name)
            } catch {
                self.error = error.localizedDescription
            }
            loading = false
        }
    }
}
