package app.yula.android.data.models

data class User(
    val id: String,
    val email: String,
    val name: String,
    val tier: String,
    val billingCycle: String,
    val createdAt: String,
    val updatedAt: String
)
