package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

type Tx struct {
	FromAddress string `json:"fromAddress"`
	TxHash      string `json:"txHash"`
}

func main() {
	if _, err := os.Stat("txdb.db"); os.IsNotExist(err) {
		file, err := os.Create("txdb.db")
		if err != nil {
			log.Fatal(err.Error())
		}
		file.Close()
	}

	http.HandleFunc("/savetx", Handler)
	log.Fatal(http.ListenAndServe(":5050", nil))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL.Path)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	db, _ := sql.Open("sqlite3", "txdb.db")
	defer db.Close()
	createTable(db)

	var tx Tx
	err := json.NewDecoder(r.Body).Decode(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	insertTransaction(db, tx)
	fmt.Fprint(w, true)
}

func createTable(db *sql.DB) {
	sql := "CREATE TABLE IF NOT EXISTS txStore (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, txHash TEXT, fromAddress TEXT)"
	statement, _ := db.Prepare(sql)
	statement.Exec()
}

func insertTransaction(db *sql.DB, tx Tx) {
	sql := "INSERT INTO txStore(txHash, fromAddress) VALUES (?, ?)"
	statement, _ := db.Prepare(sql)
	statement.Exec(tx.TxHash, tx.FromAddress)
}
