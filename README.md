npm install
npx tsc
npx squid-typeorm-codegen
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply

npx tsc
node -r dotenv/config lib/main.js

#https://docs.subsquid.io/subsquid-network/reference/substrate-networks/
npx squid-graphql-server