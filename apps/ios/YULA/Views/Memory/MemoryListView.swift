import SwiftUI

struct MemoryListView: View {
    @State private var viewModel = MemoryViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.memories.isEmpty && !viewModel.isLoading {
                    ContentUnavailableView(
                        "No Memories",
                        systemImage: "brain.head.profile",
                        description: Text("Memories from your conversations will appear here.")
                    )
                } else {
                    List {
                        ForEach(viewModel.memories) { memory in
                            VStack(alignment: .leading, spacing: 4) {
                                Text(memory.content)
                                    .lineLimit(3)
                                Text(memory.source)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .onDelete { indexSet in
                            Task { await viewModel.delete(at: indexSet) }
                        }
                    }
                }
            }
            .navigationTitle("Memory")
            .toolbar {
                NavigationLink(destination: MemorySearchView()) {
                    Image(systemName: "magnifyingglass")
                }
            }
            .task { await viewModel.load() }
        }
    }
}
