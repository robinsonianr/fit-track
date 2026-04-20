import {defineConfig} from "vite";

export default defineConfig({
    fitTrack: {
        input: { target:
                '../../openapi/api.json' },
        output: {
            mode: 'tags-split',
            target: 'src/api/generated/endpoints',
            schemas: 'src/api/generated/models',
            client: 'axios',
            override: {
                mutator: {
                    path: 'src/services/client.ts',
                    name: 'customInstance'
                } },
            clean: true,
        },
    },
});
