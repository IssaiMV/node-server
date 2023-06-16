const { series } = require('nps-utils')

module.exports = {
    scripts: {
        db: {
            migrate: {
                script: series(
                    runTypeorm('migration:run -d src/infrastructure/database/pg.migration.ts')
                ),
                description: 'Migrates the database to newest version available',
                create: {
                    script: series(
                        runTypeorm(`migration:create migrations/${getMigrationName()} -t`)
                    ),
                    description: 'Create new migration create file',
                }
            },
            seed: {
                script: series(
                    runFast('./node_modules/typeorm-extension/dist/cli/index.js seed -r src/infrastructure/database -d pg.migration.ts')
                ),
                description: 'Seeds generated records into the database',
            }
        }
    }
}

function getMigrationName() {
    const args = process.argv.slice(2)
    return args[1] ? args[1] : 'migration'
}

function runFast(path) {
    return `ts-node ${path}`
}

function runTypeorm(path) {
    return `typeorm-ts-node-commonjs ${path}`
}

