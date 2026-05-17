#!/bin/bash

# 1. 설정
FOLDER_NAME=$(basename "$PWD")
DOMAIN="${FOLDER_NAME}.test"
PORT=${2:-5173} # 포트가 지정되지 않은 경우 기본값으로 5173 사용

# Herd 또는 Valet 경로 감지
if [ -d "$HOME/Library/Application Support/Herd/config/valet/Nginx" ]; then
    NGINX_CONF="$HOME/Library/Application Support/Herd/config/valet/Nginx/$DOMAIN"
    SERVER_TYPE="herd"
elif [ -d "$HOME/.config/valet/Nginx" ]; then
    NGINX_CONF="$HOME/.config/valet/Nginx/$DOMAIN"
    SERVER_TYPE="valet"
else
    SERVER_TYPE="none"
fi

# 출력을 위해 서버 유형을 대문자로 변환 (모든 쉘 호환)
SERVER_DISPLAY=$(echo "$SERVER_TYPE" | tr '[:lower:]' '[:upper:]')

# 2. 메인 로직
if [ "$1" == "start" ] || [ -z "$1" ]; then
    
    # [CASE A] macOS에 Herd 또는 Valet이 설치되어 있는 경우
    if [ "$SERVER_TYPE" != "none" ]; then
        if [ -f "$NGINX_CONF" ]; then
            echo "📝 [${SERVER_DISPLAY}] ${DOMAIN} (포트: ${PORT})에 대한 프록시 설정을 주입하는 중..."
            
            if grep -q "proxy_pass" "$NGINX_CONF"; then
                sed -i '' "s|proxy_pass http://127.0.0.1:[0-9]*/;|proxy_pass http://127.0.0.1:${PORT}/;|g" "$NGINX_CONF"
            else
                PROXY_BLOCK="    map \$sent_http_content_type \$expires {\n        \"text/html\"                 epoch;\n        \"text/html; charset=utf-8\"  epoch;\n        default                     off;\n    }\n\n    location / {\n        expires \$expires;\n        proxy_redirect                      off;\n        proxy_set_header Host               \$host;\n        proxy_set_header X-Real-IP          \$remote_addr;\n        proxy_set_header X-Forwarded-For    \$proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto  \$scheme;\n        proxy_read_timeout          1m;\n        proxy_connect_timeout       1m;\n        proxy_pass                          http://127.0.0.1:${PORT};\n    }"
                sed -i '' "s|location / {|${PROXY_BLOCK}\n\n    #_VALET_PROXY_DISABLED_# location / {|g" "$NGINX_CONF"
            fi
            
            ${SERVER_TYPE} restart > /dev/null
            echo "🌐 [${SERVER_DISPLAY}] 프록시 설정이 완료되었습니다. 도메인: https://${DOMAIN}"
        else
            echo "⚠️ [${SERVER_DISPLAY}] ${DOMAIN} Nginx 설정 파일을 찾을 수 없습니다. 표준 로컬 모드로 실행합니다."
            echo "💡 팁: 도메인 매핑을 원하시면 먼저 '${SERVER_TYPE} link && ${SERVER_TYPE} secure' 명령어를 실행하세요."
        fi
    else
        # [CASE B] Herd/Valet을 찾을 수 없는 경우 (Windows, Linux 또는 표준 Mac 환경)
        echo "ℹ️ Herd 또는 Valet이 감지되지 않았습니다. 표준 로컬 모드로 시작합니다."
    fi

    # 지정된 포트와 함께 안전하게 Vite 서버 실행
    echo "⚡ Vite 개발 서버를 시작하는 중..."
    npx vite --port "$PORT" --strictPort

    # --- 실행 후 처리 (개발자가 Ctrl + C를 눌러 Vite를 중지할 때 자동 실행됨) ---
    echo ""
    if [ "$SERVER_TYPE" != "none" ] && [ -f "$NGINX_CONF" ] && grep -q "#_VALET_PROXY_DISABLED_#" "$NGINX_CONF"; then
        echo "🛑 Nginx 설정을 기본값으로 되돌리는 중..."
        sed -i '' '/map \$sent_http_content_type \$expires {/,/#_VALET_PROXY_DISABLED_#/d' "$NGINX_CONF"
        ${SERVER_TYPE} restart > /dev/null
        echo "✨ Nginx가 성공적으로 복구되었습니다."
    fi

elif [ "$1" == "stop" ]; then
    # 만약을 대비한 수동 롤백 명령어
    if [ "$SERVER_TYPE" != "none" ] && [ -f "$NGINX_CONF" ] && grep -q "#_VALET_PROXY_DISABLED_#" "$NGINX_CONF"; then
        sed -i '' '/map \$sent_http_content_type \$expires {/,/#_VALET_PROXY_DISABLED_#/d' "$NGINX_CONF"
        ${SERVER_TYPE} restart > /dev/null
        echo "✨ Nginx 설정이 기본값으로 성공적으로 복구되었습니다."
    else
        echo "ℹ️ 복구할 커스텀 프록시 설정을 찾을 수 없습니다."
    fi
else
    echo "❌ 잘못된 옵션입니다. 시작하려면 './herd.sh'를, 수동으로 복구하려면 './herd.sh stop'을 사용하세요."
fi