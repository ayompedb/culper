package main

import (
	"fmt"
	"log"
	"net/http"

	middleware "github.com/truetandem/e-QIP-prototype/api/middleware"
)

var (
	// APIName ...
	APIName = "equip"

	// APIVersion ...
	APIVersion = "v1"
)

func main() {
	r := middleware.NewRouter().Inject(LoggerHandler)
	r.HandleFunc("/", rootHandler)

	s := r.PathPrefix("/").Subrouter().Inject(SessionHandler)
	s.HandleFunc("/2fa", twofactorHandler)
	s.HandleFunc("/2fa/verify", twofactorVerifyHandler)
	s.HandleFunc("/2fa/email", twofactorEmailHandler)
	s.HandleFunc("/form", rootHandler)

	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/{service}", authServiceHandler)
	o.HandleFunc("/{service}/callback", authCallbackHandler)

	log.Println("Starting API mock server")
	fmt.Println(http.ListenAndServe(":3000", r))
}
