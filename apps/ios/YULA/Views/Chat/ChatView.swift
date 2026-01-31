import SwiftUI

struct ChatView: View {
    @State private var viewModel = ChatViewModel()

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollViewReader { proxy in
                    ScrollView {
                        LazyVStack(spacing: 12) {
                            ForEach(viewModel.messages) { message in
                                MessageBubble(message: message)
                                    .id(message.id)
                            }

                            if viewModel.isStreaming {
                                MessageBubble(
                                    message: Message(
                                        id: "streaming",
                                        role: .assistant,
                                        content: viewModel.streamingContent,
                                        createdAt: ""
                                    )
                                )
                            }
                        }
                        .padding()
                    }
                    .onChange(of: viewModel.messages.count) {
                        if let last = viewModel.messages.last {
                            proxy.scrollTo(last.id, anchor: .bottom)
                        }
                    }
                }

                ChatInputBar(
                    text: $viewModel.inputText,
                    isStreaming: viewModel.isStreaming,
                    onSend: { viewModel.sendMessage() }
                )
            }
            .navigationTitle("Chat")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}
