package app.yula.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import app.yula.android.ui.navigation.AppNavHost
import app.yula.android.ui.theme.YulaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            YulaTheme {
                AppNavHost()
            }
        }
    }
}
