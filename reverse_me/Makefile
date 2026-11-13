.PHONY: lev1 lev2 lev3 clean re

lev1:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level1/source.c -o ./level1/source

lev2:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level2/source.c -o ./level2/source

lev3:
	gcc -m32 -O0 -fno-builtin-printf -fPIE -pie ./level3/source.c -o ./level3/source

clean:
	@if [ -e ./level1/source ]; then \
		rm ./level1/source; \
	fi

	@if [ -e ./level2/source ]; then \
		rm ./level2/source; \
	fi

	@if [ -e ./level3/source ]; then \
		rm ./level3/source; \
	fi

re: clean lev1 lev2 lev3
