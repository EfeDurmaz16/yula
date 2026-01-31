import Foundation

@Observable
final class ConversationListViewModel {
    var conversations: [Conversation] = []
    var isLoading = false

    func load() async {
        isLoading = true
        do {
            conversations = try await ConversationService.shared.list()
        } catch {
            conversations = []
        }
        isLoading = false
    }
}
