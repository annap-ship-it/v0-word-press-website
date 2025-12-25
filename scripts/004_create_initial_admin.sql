-- Create initial admin user
-- NOTE: This creates a user directly in auth.users
-- You will need to set a password for this user through Supabase dashboard
-- or use this email to reset password: admin@ideateam.dev

DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if admin already exists
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@ideateam.dev' LIMIT 1;
  
  -- Only create if doesn't exist
  IF admin_user_id IS NULL THEN
    -- Insert into auth.users (this requires superuser access)
    -- In production, you should create the first user through Supabase Auth API
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@ideateam.dev',
      crypt('ChangeThisPassword123!', gen_salt('bf')), -- Default password, CHANGE THIS!
      NOW(),
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    ) RETURNING id INTO admin_user_id;
    
    -- Create profile for admin
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (admin_user_id, 'Administrator', null);
    
    RAISE NOTICE 'Admin user created with email: admin@ideateam.dev';
    RAISE NOTICE 'Default password: ChangeThisPassword123!';
    RAISE NOTICE 'PLEASE CHANGE THIS PASSWORD IMMEDIATELY!';
  ELSE
    RAISE NOTICE 'Admin user already exists';
  END IF;
END $$;
