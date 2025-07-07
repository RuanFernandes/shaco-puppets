import { glob } from 'glob';
import { minify } from 'terser';
import fs from 'fs/promises';
import path from 'path';

async function minifyFiles() {
    try {
        // Find all .js files in dist
        const files = await glob('dist/**/*.js');

        console.log(`🔄 Minifying ${files.length} files...`);

        for (const file of files) {
            const code = await fs.readFile(file, 'utf8');

            const result = await minify(code, {
                module: true, // For ES modules
                compress: {
                    drop_console: false, // Keep console.log for debugging
                    drop_debugger: true,
                    pure_funcs: ['console.debug', 'console.trace'],
                },
                mangle: {
                    keep_classnames: true, // Keep class names
                    keep_fnames: true, // Keep function names
                },
                format: {
                    comments: false,
                    beautify: false,
                },
            });

            if (result.code) {
                await fs.writeFile(file, result.code);
                console.log(`✅ Minified: ${path.relative('.', file)}`);
            }
        }

        console.log(
            `🎉 Minification complete! ${files.length} files processed.`,
        );
    } catch (error) {
        console.error('❌ Minification error:', error);
        process.exit(1);
    }
}

minifyFiles();
