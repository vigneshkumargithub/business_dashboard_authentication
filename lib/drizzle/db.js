// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './schema';

// const queryClient = postgres(process.env.DATABASE_URL);
// export const db = drizzle(queryClient, { schema });



import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const queryClient = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
});

export const db = drizzle(queryClient, { schema });
