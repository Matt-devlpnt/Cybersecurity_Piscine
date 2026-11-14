CLI
===
- file level1
- strings level1
- nm -n ./level1
- objdump -d -M intel level1

GDB
===
- gdb ./level1
- layout asm
- checker les registres infos registers "nom du registre"
- checker les adresses: x/s $"adresse" (NB: x/s est indicatif, car s correspond aux string mais il y a d'autres parametre pour checker les decimales, caracteres et autres)

BONUS
=====
- vim + xxd: ouvrir le binaire avec vim
- acceder au code machine: dans vim activer le plugin xxd avec l'instruction suivante => :%!xxd
- une fois dans le code machine pour revenir au code binaire => :%!xxd -r
- afin de modifier le code machine et faire le lien avec les balise assembleur il voir la table des codes operation.
