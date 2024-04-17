npm install
npx tsc
npx squid-typeorm-codegen
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply
npx tsc
#node -r dotenv/config lib/main.js

npx squid-graphql-server