import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

// Backend NestJS
const backend = builder
    .addExecutable("backend", "npm", "../../apps/backend", ["run", "start:dev"])
    .withEnvironment("PORT", "3001")
    .withHttpEndpoint({ 
        env: "PORT",
        port: 3001,
    })
    .withExternalHttpEndpoints();

// Frontend Next.js
const nextjs = builder
    .addExecutable("nextjs", "npm", "../../apps/frontend", ["run", "dev"])
    .withEnvironment("PORT", "3000")
    .withEnvironment("NEXT_PUBLIC_API_URL", "http://localhost:3001")
    .withHttpEndpoint({ 
        env: "PORT",
        port: 3000,
    })
    .withExternalHttpEndpoints()
    .waitFor(backend);

// Aguardar as promises
await backend;
await nextjs;

await builder.build().run();