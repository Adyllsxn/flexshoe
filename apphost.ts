import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

// Seu Backend NestJS (substituindo o Express do template)
const backend = await builder
    .addNodeApp("backend", "../../apps/backend", "start:dev")  // Ajuste o caminho
    .withHttpEndpoint({ env: "PORT", targetPort: 3001 })
    .withExternalHttpEndpoints();

// Seu Frontend Next.js (substituindo o Vite do template)
const frontend = await builder
    .addNodeApp("frontend", "../../apps/frontend", "dev")  // Next.js usa dev, não vite
    .withHttpEndpoint({ env: "PORT", targetPort: 3000 })
    .withReference(backend)
    .waitFor(backend);

await builder.build().run();