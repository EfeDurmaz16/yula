import Foundation

enum AppConfig {
    static var apiBaseURL: String {
        #if DEBUG
        return "http://localhost:3001"
        #else
        return "https://api.yula.app"
        #endif
    }
}
