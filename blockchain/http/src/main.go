package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"

    "github.com/gorilla/mux"
)

type Claim struct {
    Id        int `json:"id"`
    Title     string `json:"title"`
    Name      string `json:"name"`
	Picture   string `json:"picture"`
    Validity  string `json:"validity"`
	Format    string  `json:"format"`
	Signature string  `json:"signature"`
}

var err error

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/http", createClaim).Methods("POST")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		fmt.Printf("Error listening "+ "8080" +" , %+v\n", err)
	}
}

func createClaim(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, _ := ioutil.ReadAll(r.Body)
    var claim Claim 
    json.Unmarshal(reqBody, &claim)
	var Claims []Claim
    Claims = append(Claims, claim)
	file, _ := json.Marshal(Claims)
	err = ioutil.WriteFile("../../src/http.json", file, 0644)
	if err != nil {
		fmt.Printf("Error " +" , %+v\n", err)
	}
    json.NewEncoder(w).Encode(claim)
}


