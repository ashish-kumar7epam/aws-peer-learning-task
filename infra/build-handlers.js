const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Ensure output directory exists
const outDir = path.join(__dirname, 'dist', 'handlers');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Bundle handlers
const handlers = [
  {
    name: 'getProductList',
    entry: path.join(__dirname, './handlers/getProductList/getProductListHandler.ts'),
    output: path.join(outDir, 'getProductList', 'getProductListHandler.js'),
  },
  {
    name: 'getProductsById',
    entry: path.join(__dirname, './handlers/getProductsById/getProductsByIdHandler.ts'),
    output: path.join(outDir, 'getProductsById', 'getProductsByIdHandler.js'),
  },
];

async function bundle() {
  try {
    for (const handler of handlers) {
      console.log(`Bundling ${handler.name}...`);
      
      // Ensure output directory exists
      fs.mkdirSync(path.dirname(handler.output), { recursive: true });

      await esbuild.build({
        entryPoints: [handler.entry],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'cjs',
        outfile: handler.output,
        external: ['aws-sdk'], // AWS SDK is provided by Lambda runtime
        minify: false,
      });

      console.log(`✓ ${handler.name} bundled successfully`);
    }
    console.log('\n✓ All handlers bundled successfully');
  } catch (error) {
    console.error('Bundling failed:', error);
    process.exit(1);
  }
}

bundle();

//build handler for mock data
