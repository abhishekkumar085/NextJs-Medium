import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import fs from 'fs';
import process from 'process';
import configJson from '@/config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};

// ✅ Use Absolute Path to Models Directory
const modelsDir = path.join(process.cwd(), 'models'); // Ensures proper resolution
console.log('Models directory:', modelsDir);

// ✅ Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: console.log, // Enable SQL query logging
  });
}

// ✅ Load Models
const modelFiles = fs
  .readdirSync(modelsDir)
  .filter((file) => file.endsWith('.js') && file !== 'index.js');

console.log('Detected models:', modelFiles);

async function loadModels() {
  for (const file of modelFiles) {
    const modelPath = path.join(modelsDir, file);
    console.log(`Loading model: ${modelPath}`);

    // ✅ Use Dynamic `import()` for ES Modules
    const modelDef = await import(`file://${modelPath}`);

    const model = modelDef.default
      ? modelDef.default(sequelize, DataTypes)
      : modelDef(sequelize, DataTypes);

    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  }

  // ✅ Setup Associations
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

await loadModels(); // Ensure models load before exporting

// ✅ Export Sequelize and Models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
