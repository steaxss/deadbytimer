!macro customUnInstall
  DetailPrint "Removing Dead by Timer user data"
  RMDir /r "$APPDATA\dbdtimer-steaxs"
  RMDir /r "$LOCALAPPDATA\dbdtimer-steaxs"
  RMDir /r "$LOCALAPPDATA\dbdtimer-steaxs-updater"
!macroend
