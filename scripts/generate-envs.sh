#!/bin/bash

ENV_PATH="apps/frontend/.env"

if [ -f "$ENV_PATH" ]; then
  echo ".env already exists in apps/frontend"
else
  cat <<EOF > "$ENV_PATH"
VITE_API_URL=http://localhost:8000
# Add other env vars here
EOF
  echo "Created default .env file in apps/frontend"
fi
