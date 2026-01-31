package app.yula.android.ui.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChatBubble
import androidx.compose.material.icons.filled.Memory
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import app.yula.android.data.local.TokenManager
import app.yula.android.ui.screens.auth.LoginScreen
import app.yula.android.ui.screens.chat.ChatScreen
import app.yula.android.ui.screens.memory.MemoryScreen
import app.yula.android.ui.screens.settings.SettingsScreen

@Composable
fun AppNavHost() {
    val context = LocalContext.current
    val tokenManager = remember { TokenManager(context) }
    var isLoggedIn by remember { mutableStateOf(tokenManager.hasToken()) }

    if (!isLoggedIn) {
        LoginScreen(
            tokenManager = tokenManager,
            onLoginSuccess = { isLoggedIn = true }
        )
    } else {
        val navController = rememberNavController()
        var selectedTab by remember { mutableIntStateOf(0) }
        val tabs = listOf("Chat", "Memory", "Settings")
        val icons = listOf(Icons.Default.ChatBubble, Icons.Default.Memory, Icons.Default.Settings)

        Scaffold(
            bottomBar = {
                NavigationBar {
                    tabs.forEachIndexed { index, title ->
                        NavigationBarItem(
                            icon = { Icon(icons[index], contentDescription = title) },
                            label = { Text(title) },
                            selected = selectedTab == index,
                            onClick = {
                                selectedTab = index
                                navController.navigate(title.lowercase()) {
                                    popUpTo(navController.graph.startDestinationId)
                                    launchSingleTop = true
                                }
                            }
                        )
                    }
                }
            }
        ) { padding ->
            NavHost(
                navController = navController,
                startDestination = "chat",
                modifier = Modifier.padding(padding)
            ) {
                composable("chat") { ChatScreen(tokenManager = tokenManager) }
                composable("memory") { MemoryScreen() }
                composable("settings") {
                    SettingsScreen(
                        tokenManager = tokenManager,
                        onLogout = { isLoggedIn = false }
                    )
                }
            }
        }
    }
}
