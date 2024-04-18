npm install

#Edit typegen.json
#https://spiritnet.subscan.io/runtime/Attestation?version=11210
npx squid-substrate-typegen typegen.json

npx tsc
npx squid-typeorm-codegen
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply

npx tsc
node -r dotenv/config lib/main.js

#https://docs.subsquid.io/subsquid-network/reference/substrate-networks/
npx squid-graphql-server