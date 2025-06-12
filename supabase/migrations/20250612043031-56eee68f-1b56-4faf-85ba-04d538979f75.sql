
-- Create enum for user roles (if it doesn't exist)
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('mentor', 'mentee');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the existing profiles table to use the enum and ensure proper structure
ALTER TABLE public.profiles 
  ALTER COLUMN role TYPE user_role USING role::user_role;

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Create or replace function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    role, 
    department, 
    bio, 
    skills, 
    availability
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    (NEW.raw_user_meta_data ->> 'role')::user_role,
    NEW.raw_user_meta_data ->> 'department',
    COALESCE(NEW.raw_user_meta_data ->> 'bio', ''),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'skills' IS NOT NULL 
      THEN string_to_array(NEW.raw_user_meta_data ->> 'skills', ',')
      ELSE ARRAY[]::TEXT[]
    END,
    NEW.raw_user_meta_data ->> 'availability'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
