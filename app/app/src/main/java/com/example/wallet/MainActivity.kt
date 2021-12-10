package com.example.wallet

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import org.mindrot.jbcrypt.BCrypt

class MainActivity : AppCompatActivity() {

    private val salt = "\$2a\$10\$e9kAuRN/PARzXnNdnghiSO"
    private val hashPassword = "C3jb7sDLMJ6qvrP2RbYzJ/wXr6HiLz6"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        val pwd: EditText = findViewById(R.id.editTextTextPassword)
        val button: Button = findViewById(R.id.button)
        button.setOnClickListener {
            //AFEGIR FUNCIO QUE COMPROVA HASH
            val hashPassword2 = BCrypt.hashpw(pwd.text.toString(), salt)
            if (hashPassword2 == salt + hashPassword) {
                val intent = Intent(this, HomeActivity::class.java)
                startActivity(intent)
            }
            else{
                Toast.makeText(this, "Wrong password", Toast.LENGTH_SHORT).show()
            }
        }
    }
}