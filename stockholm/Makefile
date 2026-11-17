SHELL:=/bin/bash

VIOLET=\033[1;38;5;141m
GREEN=\033[1;38;5;79m
NC=\033[0m

HOME_DIR := $$HOME
INFECTION_FOLDER := infection
WANNACRY_EXTENSION := .123 .jpeg .rb .602 .jpg .rtf .doc .js .sch .3dm .jsp .sh .3ds .key .sldm .3g2 .lay .sldm .3gp .lay6 .sldx .7z .ldf .slk .accdb .m3u .sln .aes .m4u .snt .ai .max .sql .ARC .mdb .sqlite3 .asc .mdf .sqlitedb .asf .mid .stc .asm .mkv .std .asp .mml .sti .avi .mov .stw .backup .mp3 .suo .bak .mp4 .svg .bat .mpeg .swf .bmp .mpg .sxc .brd .msg .sxd .bz2 .myd .sxi .c .myi .sxm .cgm .nef .sxw .class .odb .tar .cmd .odg .tbk .cpp .odp .tgz .crt .ods .tif .cs .odt .tiff .csr .onetoc2 .txt .csv .ost .uop .db .otg .uot .dbf .otp .vb .dch .ots .vbs .der\" .ott .vcd .dif .p12 .vdi .dip .PAQ .vmdk .djvu .pas .vmx .docb .pdf .vob .docm .pem .vsd .docx .pfx .vsdx .dot .php .wav .dotm .pl .wb2 .dotx .png .wk1 .dwg .pot .wks .edb .potm .wma .eml .potx .wmv .fla .ppam .xlc .flv .pps .xlm .frm .ppsm .xls .gif .ppsx .xlsb .gpg .ppt .xlsm .gz .pptm .xlsx .h .pptx .xlt .hwp .ps1 .xltm .ibd .psd .xltx .iso .pst .xlw .jar .rar .zip .java .raw
NON_INFECT_EXTENSION := .ooo


.PHONY: help infection_folder

all: help

help:
	@echo -e '${VIOLET}You can use these followings command:${NC}'
	@echo -e '    ${GREEN}infection_folder${NC}: Create infection folder in home folder of user.'
	@echo -e '    ${GREEN}clean_infection_folder${NC}: Remove infection folder in home folder of user.'

infection_folder:
	@if [ ! -d $(HOME_DIR)/$(INFECTION_FOLDER) ]; then \
		mkdir $(HOME_DIR)/$(INFECTION_FOLDER); \
	fi

	@COUNTER=0; \
	for extension in $(WANNACRY_EXTENSION); do \
        RANDOM_STRING=$$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | dd bs=100 count=1 2>/dev/null); \
		echo $$RANDOM_STRING > $(HOME_DIR)/$(INFECTION_FOLDER)/$$COUNTER$$extension; \
		COUNTER=$$((COUNTER + 1)); \
	done

	@RANDOM_STRING=$$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | dd bs=100 count=1 2>/dev/null); \
    echo $$RANDOM_STRING > $(HOME_DIR)/$(INFECTION_FOLDER)/non_infect_file_$(NON_INFECT_EXTENSION);

	@echo "Folder is created"

clean_infection_folder:
	@rm -rf $(HOME_DIR)/$(INFECTION_FOLDER)
	@echo "Folder is removed"
