#!/bin/bash -eu
cat <<EOF
window.kcUrl="${KC_URL:-}";
window.realm="${REALM:-}";
window.clientId="${CLIENT_ID:-}";
window.kcRole="${KC_ROLE:-}";
window.baseUrl="${BACKEND_URL:-}";
EOF
