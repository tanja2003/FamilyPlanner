const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wtpqeysqinwdabppwhzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0cHFleXNxaW53ZGFicHB3aHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NDcxMzIsImV4cCI6MjA4MTUyMzEzMn0.OvQWjxidb1ZBLmnYGzp7anZ9APJXhBGf4X1Ar9w_xbM';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
