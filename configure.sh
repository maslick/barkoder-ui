#!/bin/bash -eu
cat <<EOF
window.kcEnabled="${KC_ENABLED:=true}";
window.kcUrl="${KC_URL:=https://auth.maslick.ru/auth}";
window.realm="${REALM:=barkoder}";
window.clientId="${CLIENT_ID:=barkoder-frontend}";
window.kcRole="${KC_ROLE:=craftroom}";
window.baseUrl="${BACKEND_URL:=https://koder-api.maslick.ru}";
EOF
