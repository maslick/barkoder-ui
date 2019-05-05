#!/bin/bash -eu
cat <<EOF
window.kcEnabled="${KC_ENABLED:=true}";
window.kcUrl="${KC_URL:=https://keycloak-maslick-io.1d35.starter-us-east-1.openshiftapps.com/auth}";
window.realm="${REALM:=barkoder}";
window.clientId="${CLIENT_ID:=barkoder-frontend}";
window.kcRole="${KC_ROLE:=craftroom}";
window.baseUrl="${BACKEND_URL:=https://koder-api.maslick.ru}";
EOF
