package app.yula.android.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = Neutral900,
    onPrimary = White,
    primaryContainer = Neutral100,
    onPrimaryContainer = Neutral900,
    surface = White,
    onSurface = Neutral900,
    surfaceVariant = Neutral100,
    onSurfaceVariant = Neutral700,
    background = Neutral50,
    onBackground = Neutral900,
)

private val DarkColorScheme = darkColorScheme(
    primary = White,
    onPrimary = Neutral900,
    primaryContainer = Neutral700,
    onPrimaryContainer = White,
    surface = Neutral900,
    onSurface = White,
    surfaceVariant = Neutral700,
    onSurfaceVariant = Neutral200,
    background = Black,
    onBackground = White,
)

@Composable
fun YulaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content,
    )
}
