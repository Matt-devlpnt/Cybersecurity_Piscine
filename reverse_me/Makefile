.PHONY: lev1 lev2 lev3 clean re

lev1:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level1/source.c -o ./level1/source

lev2:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level2/source.c -o ./level2/source

lev3:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level3/source.c -o ./level3/source

clean:
	rm ./level1/source ./level2/source ./level3/source

re: clean lev1 lev2 lev3
