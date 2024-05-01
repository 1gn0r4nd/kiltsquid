
npm install

#docker run --rm -e DB_HOST=host.docker.internal --env-file=.env my-squid npx squid-typeorm-migration apply

#Edit typegen.json
#https://docs.subsquid.io/sdk/reference/schema-file/entities/
#https://spiritnet.subscan.io/runtime/Attestation?version=11210
rm db/migrations/*
npx squid-substrate-typegen typegen.json

npx squid-typeorm-codegen
npx squid-typeorm-migration generate
npx tsc

npx squid-typeorm-migration apply

npx tsc && node -r dotenv/config lib/main.js

#PostGraphile
npx tsc && node -r dotenv/config lib/api.js

#https://docs.subsquid.io/subsquid-network/reference/substrate-networks/
npx squid-graphql-server