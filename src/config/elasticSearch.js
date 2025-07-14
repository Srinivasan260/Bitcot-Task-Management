// src/config/elasticsearch.js
import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: process.env.ELASTIC_URL || 'http://localhost:9200',
});


