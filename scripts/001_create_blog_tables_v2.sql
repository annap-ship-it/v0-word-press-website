-- Step 1: Create categories table FIRST (no dependencies)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#FF6B35',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create tags table (no dependencies)
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create profiles table (depends on auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create posts table (depends on categories and auth.users)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL,
  featured_image TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create post_tags junction table (depends on posts and tags)
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts
CREATE POLICY "Anyone can view published posts" 
  ON public.posts FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Authors can view their own posts" 
  ON public.posts FOR SELECT 
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can insert their own posts" 
  ON public.posts FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts" 
  ON public.posts FOR UPDATE 
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" 
  ON public.posts FOR DELETE 
  USING (auth.uid() = author_id);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" 
  ON public.categories FOR SELECT 
  TO public USING (true);

CREATE POLICY "Authenticated users can manage categories" 
  ON public.categories FOR ALL 
  TO authenticated USING (true);

-- RLS Policies for tags
CREATE POLICY "Anyone can view tags" 
  ON public.tags FOR SELECT 
  TO public USING (true);

CREATE POLICY "Authenticated users can manage tags" 
  ON public.tags FOR ALL 
  TO authenticated USING (true);

-- RLS Policies for post_tags
CREATE POLICY "Anyone can view post tags" 
  ON public.post_tags FOR SELECT 
  TO public USING (true);

CREATE POLICY "Authenticated users can manage post tags" 
  ON public.post_tags FOR ALL 
  TO authenticated USING (true);

-- RLS Policies for profiles
CREATE POLICY "Anyone can view profiles" 
  ON public.profiles FOR SELECT 
  TO public USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);
