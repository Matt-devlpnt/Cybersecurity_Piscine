# stockholm
## Description
Stockholm is an educational project that simulates ransomware concept by implementing file encryption and decryption in Python.

The project uses Fernet, provided by the Python cryptography library, to perform symmetric authenticated encryption.

The choice of Fernet is based on the following properties:

    Security: It relies on AES-128 in CBC mode combined with HMAC-SHA256 to provide confidentiality and data integrity.
    Authentication: It verifies that encrypted data has not been modified before allowing decryption.
    Simplicity: It provides a high-level API that handles cryptographic operations internally, reducing the risk of implementation errors.

This project demonstrates how symmetric encryption works, how cryptographic keys are generated and managed, and why protecting the encryption key is essential for data recovery.

## Instructions
All available commands and build instructions can be found in the `Makefile`.
### Create infection and infection_copy folder in home user folder
> infection_copy directory is used to compare encrypted files with their original, unencrypted versions.
```make
make infection_folder
```
### Remove infection and infection_copy folder in home user folder and remove key.txt file in common directory
```make
make clean_infection_folder
```
### Encrypting files
```make
make run
```
### Silent encrypting files
```make
make run OPTION=-s
```
### Unencrypting files
> Cipher key is in key.txt
```make
make run OPTION=-r KEY=<cipher_key>
```
### Software help
```make
make run OPTION=-h
```
### Software version
```make
make run OPTION=-v
```
