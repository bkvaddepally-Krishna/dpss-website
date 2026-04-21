const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function debugSchema() {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing keys in .env.local');
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('scholarship_applicants').select('*').limit(1);
  
  if (error) {
    console.error('Error fetching data:', error);
  } else if (data && data.length > 0) {
    console.log('--- ACTUAL COLUMN NAMES ---');
    console.log(JSON.stringify(Object.keys(data[0]), null, 2));
    console.log('---------------------------');
  } else {
    // If no data, try to query the RPC if available or just list columns using a trick
    // Since we don't have rpc, let's just try to insert a single dummy row and see what happens? No.
    console.log('No data found in scholarship_applicants to inspect columns.');
  }
}

debugSchema();
