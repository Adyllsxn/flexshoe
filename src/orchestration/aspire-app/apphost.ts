import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

// Next.js
const nextjs = builder
    .addExecutable("nextjs", "npm", "../../apps/frontend", ["run", "dev"])
    .withEnvironment("PORT", "3000")
    .withEnvironment("NEXT_PUBLIC_API_URL", "http://localhost:5000")
    .withHttpEndpoint({ 
        env: "PORT",
        port: 3000,
    })
    .withExternalHttpEndpoints();

await builder.build().run();