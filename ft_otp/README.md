#########################################
# Dechiffrement de la clef hexadecimal: #
#########################################

Fichier ft_otp.key:

{
    "salt": "3Bd9sB2BfrQeB8sonXX3oQ==",
    "iv": "bvpBz/UUlJRpmhSZb9tWLw==",
    "data": "Jba4TWGZ954J1tW3Mjk95Y8vDjYaWJ4gbU7mGDF2T8KWaethpstBtGRqxgoQK0sb"
}

                ___
               |  ┌────────────────────┐
               |  │  Mot de passe      │
               |  └─────────┬──────────┘
               |            │
               |            ▼
               |  ┌────────────────────┐     ┌────────────┐
Premiere etape-|  │      Argon2id      │◄────│   Salt     │
               |  └─────────┬──────────┘     └────────────┘
               |            │
               |            ▼
               |___  Clé AES (32 bytes)
                            │
                ___         ▼
               |  ┌────────────────────┐     ┌────────────┐
               |  │   AES-256-CBC      │◄────│    IV      │
               |  │   (déchiffrement)  │     └────────────┘
Deuxieme etape-|  └─────────┬──────────┘
               |            │
               |            ▼
               |     Clé secrète TOTP
               |___  (en clair)


NB: IV (Initialization Vector)


# Premiere etape:

Mot de passe (celui que le prompt demande apres ./ft_otp -k ft_otp.key)
              +
salt = 3Bd9sB2BfrQeB8sonXX3oQ==
              │
              ▼
         [ Argon2id ]
              │
              ▼
        Clé AES (32 octets)


# Deuxieme etape:

data = Jba4TWGZ954J1tW3Mjk95Y8vDjYaWJ4gbU7mGDF2T8KWaethpstBtGRqxgoQK0sb
                              │
                              ▼
                 Décodage Base64 → bytes
                              │
          ┌───────────────────┼───────────────────┐─ ─ ─ ─ ─ ─ ─ ─ ─┐
          ▼                   ▼                   ▼                 ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   ┌─────────────┐
   │ Bloc chiffré│     │ Bloc chiffré│     │ Bloc chiffré│   │             │
   │      1      │     │      2      │     │      3      │   │     ...     │
   │  (16 bytes) │     │  (16 bytes) │     │  (16 bytes) │   │             │
   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   └──────┬──────┘
          │                   │                   │                 │
          ▼                   ▼                   ▼                 ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   ┌─────────────┐
   │ AES Déchiffr│     │ AES Déchiffr│     │ AES Déchiffr│   │             │
   │  (Clé AES)  │     │  (Clé AES)  │     │  (Clé AES)  │   │     ...     │
   │  (16 bytes) │     │  (16 bytes) │     │  (16 bytes) │   │             │
   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   └──────┬──────┘
          │                   │                   │                 │
          ▼                   ▼                   ▼                 ▼
        XOR                 XOR                 XOR                ...
          ▲                   ▲                   ▲                 ▲
          │                   │                   │                 │
   ┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐   ┌──────┴──────┐
   │     IV      │     │ Bloc chiffré│     │ Bloc chiffré│   │             │
   │bvpBz/UUlJ...│     │      1      │     │      2      │   │     ...     │
   │  (16 bytes) │     │  (16 bytes) │     │  (16 bytes) │   │             │
   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   └──────┬──────┘
          │                   │                   │                 │
          ▼                   ▼                   ▼                 ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   ┌─────────────┐
   │ Bloc clair 1│     │ Bloc clair 2│     │ Bloc clair 3│   │     ...     │
   │  (16 bytes) │     │  (16 bytes) │     │  (16 bytes) │   │             │
   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘   └──────┬──────┘
          │                   │                   │                 │
          └───────────────────┼───────────────────┘─ ─ ─ ─ ─ ─ ─ ─ ─┘
                              ▼
                   Assemblage des blocs clairs
                              │
                              ▼
                   Suppression du padding PKCS7
                              │
                              ▼
                   Clé secrète TOTP (en clair)


################################################
# Processus d'obtention de la cle a 6 chiffres #
################################################

1. compteur = temps actuel // 30
2. hmac = HMAC-SHA1(clé_secrète, compteur)          → 20 bytes
3. offset = dernier_byte_du_hmac & 0x0F              → nombre entre 0 et 15
4. extraire 4 bytes à partir de hmac[offset]
5. transformer ces 4 bytes en entier
6. entier = entier & 0x7FFFFFFF                      → on force le bit fort à 0
7. code = entier % 1_000_000
8. afficher le code sur 6 chiffres (avec des zéros devant si besoin)
