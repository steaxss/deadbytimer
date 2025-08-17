!macro customInstall
  SetShellVarContext current
  !define DATA_PURGE_SCHEMA "2"

  ReadRegStr $0 HKCU "Software\${PRODUCT_NAME}" "DataPurgedToSchema"
  StrCmp $0 "${DATA_PURGE_SCHEMA}" done 0

  ${If} ${FileExists} "$APPDATA\dbdoverlaytools-free\*.*"
    DetailPrint "Removing %APPDATA%\dbdoverlaytools-free"
    RMDir /r "$APPDATA\dbdoverlaytools-free"
  ${EndIf}

  ${If} ${FileExists} "$LOCALAPPDATA\dbdoverlaytools-free\*.*"
    DetailPrint "Removing %LOCALAPPDATA%\dbdoverlaytools-free"
    RMDir /r "$LOCALAPPDATA\dbdoverlaytools-free"
  ${EndIf}

  ; ${If} ${FileExists} "$APPDATA\DBD Timer Overlay\*.*"
  ;   DetailPrint "Removing legacy %APPDATA%\DBD Timer Overlay"
  ;   RMDir /r "$APPDATA\DBD Timer Overlay"
  ; ${EndIf}

  WriteRegStr HKCU "Software\${PRODUCT_NAME}" "DataPurgedToSchema" "${DATA_PURGE_SCHEMA}"

done:
!macroend
