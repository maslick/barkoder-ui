#!/bin/sh -eu
if [[ -z "${KC_URL:-}" ]]; then KC_URL="undefined"; else KC_URL=$KC_URL; fi
if [[ -z "${REALM:-}" ]]; then REALM="undefined"; else REALM=$REALM; fi
if [[ -z "${CLIENT_ID:-}" ]]; then CLIENT_ID="undefined"; else CLIENT_ID=$CLIENT_ID; fi
if [[ -z "${KC_ROLE:-}" ]]; then KC_ROLE="undefined"; else KC_ROLE=$KC_ROLE; fi
if [[ -z "${BACKEND_URL:-}" ]]; then BACKEND_URL="undefined"; else BACKEND_URL=$BACKEND_URL; fi

cat <<EOF
window.kcUrl="$KC_URL";
window.realm="$REALM";
window.clientId="$CLIENT_ID";
window.kcRole="$KC_ROLE";
window.baseUrl="$BACKEND_URL";
EOF
