#!/bin/bash

# Read from .env.local and add each variable to Vercel
while IFS='=' read -r key value || [ -n "$key" ]; do
  # Skip comments and empty lines
  if [[ $key =~ ^#.*$ ]] || [[ -z $key ]]; then
    continue
  fi

  # Remove any quotes from the value
  value="${value%\"}"
  value="${value#\"}"

  echo "Adding $key..."
  echo "$value" | vercel env add "$key" production >/dev/null 2>&1 && echo "✓ $key added" || echo "✗ $key failed or already exists"

done < .env.local

echo ""
echo "Done! All environment variables processed."
