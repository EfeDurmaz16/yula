import Foundation

@Observable
final class MemoryViewModel {
    var memories: [Memory] = []
    var searchResults: [Memory] = []
    var isLoading = false

    func load() async {
        isLoading = true
        do {
            memories = try await MemoryService.shared.list()
        } catch {
            memories = []
        }
        isLoading = false
    }

    func search(query: String) async {
        isLoading = true
        do {
            searchResults = try await MemoryService.shared.search(query: query)
        } catch {
            searchResults = []
        }
        isLoading = false
    }

    func delete(at offsets: IndexSet) async {
        for index in offsets {
            let memory = memories[index]
            try? await MemoryService.shared.delete(id: memory.id)
        }
        memories.remove(atOffsets: offsets)
    }
}
