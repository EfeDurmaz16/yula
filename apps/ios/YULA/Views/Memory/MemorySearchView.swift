import SwiftUI

struct MemorySearchView: View {
    @State private var viewModel = MemoryViewModel()
    @State private var query = ""

    var body: some View {
        List {
            ForEach(viewModel.searchResults) { memory in
                VStack(alignment: .leading, spacing: 4) {
                    Text(memory.content)
                        .lineLimit(3)
                    Text(memory.source)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .searchable(text: $query, prompt: "Search memories...")
        .onSubmit(of: .search) {
            Task { await viewModel.search(query: query) }
        }
        .navigationTitle("Search")
    }
}
