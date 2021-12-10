package com.example.wallet

import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONException
import org.json.JSONObject
import java.io.BufferedWriter
import java.io.IOException
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection

class QuadreDialeg(stringExtra: String) : DialogFragment() {
    val str = stringExtra
    @Throws(JSONException::class)
    private fun buildJsonObject2(): JSONObject {
        val jsonObject = JSONObject()
        jsonObject.accumulate("id", 0)
        jsonObject.accumulate("title", "Over 18")
        jsonObject.accumulate("name", "over-18")
        jsonObject.accumulate("picture", "images/pegi18.png")
        jsonObject.accumulate("validity", "∞")
        jsonObject.accumulate("format", "basic")
        jsonObject.accumulate("signature", "0xC05F1284A4C04043379856AAB4B9210FAC7736B36AFD10FD245E5DD0199281E0")
        return jsonObject
    }
    @Throws(IOException::class, JSONException::class)
    private suspend fun httpPost2(myUrl: String): String {

        val result = withContext(Dispatchers.IO) {
            val url = URL(myUrl)
            // 1. create HttpURLConnection
            val conn = url.openConnection() as HttpURLConnection
            conn.requestMethod = "POST"
            conn.setRequestProperty("Content-Type", "application/json; charset=utf-8")

            // 2. build JSON object
            val jsonObject = buildJsonObject2()

            // 3. add JSON content to POST request body
            setPostRequestContent(conn, jsonObject)

            // 4. make POST request to the given URL
            conn.connect()

            // 5. return response message
            conn.responseMessage + ""


        }
        return result
    }
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {

        return activity?.let {
            val builder = AlertDialog.Builder(it)
            builder.setTitle(R.string.dialog_title)
                .setItems(R.array.items_array,
                    DialogInterface.OnClickListener { dialog, which ->
                        // The 'which' argument contains the index position
                        // of the selected item
                    })
            builder.apply {
                setPositiveButton(R.string.ok,
                    DialogInterface.OnClickListener { dialog, id ->
                        // User clicked OK button
                        lifecycleScope.launch {
                            val result = httpPost2("http://192.168.43.167:8080/http")
                        }
                        lifecycleScope.launch {
                            val result = httpPost(str)

                        }
                    })
                setNegativeButton(R.string.cancel,
                    DialogInterface.OnClickListener { dialog, id ->
                        // User cancelled the dialog
                    })
            }


            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }

    @Throws(IOException::class, JSONException::class)
    private suspend fun httpPost(myUrl: String): String {

        val result = withContext(Dispatchers.IO) {
            val url = URL(myUrl)
            // 1. create HttpURLConnection
            val conn = url.openConnection() as HttpsURLConnection
            conn.requestMethod = "POST"
            conn.setRequestProperty("Content-Type", "application/json; charset=utf-8")

            // 2. build JSON object
            val jsonObject = buildJsonObject()

            // 3. add JSON content to POST request body
            setPostRequestContent(conn, jsonObject)

            // 4. make POST request to the given URL
            conn.connect()

            // 5. return response message
            conn.responseMessage + ""


        }
        return result
    }

    @Throws(JSONException::class)
    private fun buildJsonObject(): JSONObject {

        val jsonObject = JSONObject()
        //jsonObject.accumulate("post", etTitle.text.toString())
        print(jsonObject.toString())
        return jsonObject
    }

    @Throws(IOException::class)
    private fun setPostRequestContent(conn: HttpURLConnection, jsonObject: JSONObject) {



        val os = conn.outputStream
        val writer = BufferedWriter(OutputStreamWriter(os, "UTF-8"))
        writer.write(jsonObject.toString())
        Log.i(MainActivity::class.java.toString(), jsonObject.toString())
        writer.flush()
        writer.close()
        os.close()
    }

}